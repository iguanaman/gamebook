# Engine

## Overview

`engine.js` is the entire runtime — one file, no modules, no bundler. It runs on page load and manages all state, routing, and rendering.

## Boot Sequence

1. Page loads, `engine.js` executes, `showSelector()` is called immediately
2. `showSelector()` fetches `stories/manifest.yaml` and renders a card per story
3. Each card checks LocalStorage for a saved state and shows Play or Continue accordingly
4. On Play/Continue, `startStory(id)` takes over
5. On fresh start or New Game (no save), a full-screen story title splash is shown and `story_title.opus` played before the game shell renders

## Data Loading

All data files are YAML. The browser has no native YAML parser so `js-yaml` is loaded from CDN before `engine.js`. A single `fetchYaml(url)` helper handles all fetches and parses.

Files loaded on demand — nothing is preloaded:
- `stories/manifest.yaml` — on selector render
- `stories/{id}/story.yaml` — on story start
- `stories/{id}/scenes/{sceneId}.yaml` — on each navigation
- `stories/{id}/scenes/{folder}/_act.yaml` — on first visit to a new act folder (if present)

## State

```
{
  scene:   string        // current scene ID
  stats:   { [key]: number }  // author-defined numeric stats
  flags:   { [key]: boolean } // arbitrary boolean markers
  visited: string[]      // scene IDs visited this playthrough (not including current scene)
  history: snapshot[]    // undo stack — each entry is { scene, stats, flags, visited, act }
  act:     string|null   // serialised currentAct (written by saveState, restored on load)
}
```

State is persisted to `localStorage` as `gamebook.state.{storyId}` after every mutation. On story start, saved state is restored if present, otherwise `story.yaml` supplies the starting stats and first scene. Old saves without `visited` default to `[]`.

Module-level variables that are NOT in the state object but are tracked separately:
- `storyMeta` — the parsed `story.yaml` object, including any `flags` metadata. Available after `startStory()` completes.
- `currentAct` — the act title string from the most recently loaded `_act.yaml`, or `null`. Persisted via `saveState` and restored on load. Included in `pushHistory` snapshots so undo correctly reverts act boundaries.
- `currentActFolder` — the act folder name (e.g. `"act1"`) of the current act. Runtime-only, not persisted.
- `currentNarrativeOffset` — count of `<p>` elements in `#narrative` before the current scene's blocks were appended. Used by `revealBlock` to target the right paragraph after narrative accumulation.

## Navigation

`navigateTo(sceneId)` is the central transition function:
1. Pushes the previous scene into `state.visited` (if not already present), then sets `state.scene` and saves state
2. Fetches the scene YAML
3. Re-renders HUD
4. If the scene's folder differs from `currentActFolder`: fetches `_act.yaml` from that folder. If found, updates `currentAct`/`currentActFolder`, calls `injectActTitle` (clears narrative, injects animated title block), then plays act title audio + waits `ACT_TITLE_PAUSE_MS` before starting scene blocks. Missing `_act.yaml` is silently ignored.
5. Otherwise: appends scene blocks to the narrative directly
6. `renderNarrative` appends new `<p>` elements (never replaces); records `currentNarrativeOffset` beforehand
7. `revealBlock(i)` reveals `paras[currentNarrativeOffset + i]` as each audio clip starts
8. Choices are rendered after the last clip ends

## Conditional Logic

### Choices

Each choice is tested against `meetsRequirements()`:
- `requires.flags` — all listed flags must be truthy in state
- `requires.flags_unset` — all listed flags must be falsy in state
- `requires.stats` — each listed stat must meet the minimum value

Choices that fail are rendered as disabled greyed-out buttons with failure text, unless `hide_if_failed: true` is set (which hides them entirely — the original behaviour). `failed_text` on the choice supplies author-written failure flavour; if absent, the engine auto-generates e.g. `*(Requires: gold ≥ 5)*`.

### Text blocks

Any block in a scene's `text` array can be conditional via an `if` key. Conditions use the same syntax as `requires`, plus a built-in `if: visited` that is true on any return visit to the scene.

```yaml
- if: visited
  text: "You've been here before."
  else: "You've never seen this place."
- if: {flags: [perceptive]}
  text: "You notice something odd."
- if: {stats: {strength: 8}}
  text: "The boulder looks moveable."
```

If the condition fails and no `else` is present, the block is skipped. The block count passed to `playBlocks()` reflects only the blocks that actually rendered.

## Effects

`applyEffects()` runs on choice selection before navigation:
- `effects.stats` — deltas applied to current stat values (can be negative)
- `effects.flags` — key/value pairs merged into flags

## Undo

Before any choice is acted on, `pushHistory()` snapshots `{ scene, stats, flags, visited, act, actFolder }` onto the history stack. `undo()` pops the last snapshot, restores scene/stats/flags/visited/currentAct/currentActFolder, clears `#narrative` and resets `currentNarrativeOffset`, then re-navigates. History is part of persisted state so undo survives a reload.

## Audio

**Scene blocks:** Each text block has its own `.opus` file at `audio/{act}/{scene}/{act}-{scene}_block_0.opus`, etc. `playBlocks()` plays them sequentially — each clip's `ended` event reveals the next narrative block and starts the next clip. Choices are rendered after the final clip ends. Autoplay errors skip straight to choices. The active clip is tracked in `currentAudio`; navigation calls `stopAudio()` first.

**Story title audio:** Optional. On fresh/new-game start, engine looks for `audio/story_title.opus`. If found, it plays during the splash screen. Absent or blocked → silent fallback.

**Act title audio:** Optional. Engine derives a slug from the act title string (lowercase, non-alphanumeric runs → `_`) and looks for `audio/{actDir}/{slug}.opus`. If found, it plays after the act title animation completes (delayed by `--anim-act-title-duration`). After the clip ends (or if the file is absent / autoplay blocked), the engine waits `ACT_TITLE_PAUSE_MS` (2000ms) then starts scene block audio. Act audio is also assigned to `currentAudio` so `stopAudio()` works correctly.

## Rendering

All rendering is direct DOM manipulation via `innerHTML`. There is no virtual DOM or templating library. The `#app` div is the entire mount point — `showSelector()` and `renderShell()` each replace its contents wholesale.
