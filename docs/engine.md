# Engine

## Overview

`engine.js` is the entire runtime — one file, no modules, no bundler. It runs on page load and manages all state, routing, and rendering.

## Boot Sequence

1. Page loads, `engine.js` executes, `showSelector()` is called immediately
2. `showSelector()` fetches `stories/manifest.yaml` and renders a card per story
3. Each card checks LocalStorage for a saved state and shows Play or Continue accordingly
4. On Play/Continue, `startStory(id)` takes over

## Data Loading

All data files are YAML. The browser has no native YAML parser so `js-yaml` is loaded from CDN before `engine.js`. A single `fetchYaml(url)` helper handles all fetches and parses.

Files loaded on demand — nothing is preloaded:
- `stories/manifest.yaml` — on selector render
- `stories/{id}/story.yaml` — on story start
- `stories/{id}/scenes/{sceneId}.yaml` — on each navigation

## State

```
{
  scene:   string        // current scene ID
  stats:   { [key]: number }  // author-defined numeric stats
  flags:   { [key]: boolean } // arbitrary boolean markers
  history: snapshot[]    // undo stack — each entry is { scene, stats, flags }
}
```

State is persisted to `localStorage` as `gamebook.state.{storyId}` after every mutation. On story start, saved state is restored if present, otherwise `story.yaml` supplies the starting stats and first scene.

## Navigation

`navigateTo(sceneId)` is the central transition function:
1. Sets `state.scene` and saves state
2. Fetches the scene YAML
3. Re-renders HUD, narrative, and choices
4. Plays audio if `scene.audio` is set

## Conditional Logic

Before rendering choices, each choice is tested against `meetsRequirements()`:
- `requires.flags` — all listed flags must be truthy in state
- `requires.stats` — each listed stat must meet the minimum value

Choices that fail are silently hidden (not greyed out).

## Effects

`applyEffects()` runs on choice selection before navigation:
- `effects.stats` — deltas applied to current stat values (can be negative)
- `effects.flags` — key/value pairs merged into flags

## Undo

Before any choice is acted on, `pushHistory()` snapshots `{ scene, stats, flags }` onto the history stack. `undo()` pops the last snapshot and restores it, then re-navigates. History is part of persisted state so undo survives a reload.

## Audio

A single `<Audio>` element is kept in `currentAudio`. On each navigation, the previous audio is stopped and replaced. Autoplay errors are silently swallowed (browser policy varies).

## Rendering

All rendering is direct DOM manipulation via `innerHTML`. There is no virtual DOM or templating library. The `#app` div is the entire mount point — `showSelector()` and `renderShell()` each replace its contents wholesale.
