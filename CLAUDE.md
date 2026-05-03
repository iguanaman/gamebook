# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Detailed docs

- [docs/foundation.md](docs/foundation.md) — design philosophy, story model, what this is and isn't
- [docs/engine.md](docs/engine.md) — boot sequence, state shape, navigation, effects, undo, audio
- [docs/frontend.md](docs/frontend.md) — layout, CSS variables, HUD, choices, rendering approach

## Running locally

No build step. Serve the repo root with any static file server — `fetch()` is used for YAML loading so `file://` won't work:

```
npx serve .
# or VS Code Live Server (right-click index.html → Open with Live Server)
```

## Architecture

Pure static site. No framework, no bundler. One CDN dependency: `js-yaml` (loaded via `<script>` in `index.html`).

- `index.html` — single page shell, loads js-yaml CDN then `engine.js`
- `engine.js` — entire engine in one file, runs on page load
- `style.css` — light theme, CSS variables for colours/borders
- `stories/manifest.yaml` — lists story IDs; engine fetches this on startup
- `stories/{id}/story.yaml` — story metadata: title, description, starting stats, first scene ID
- `stories/{id}/scenes/{sceneId}.yaml` — individual scenes loaded on demand
- `stories/{id}/images/cover.jpg` — optional cover art (missing image is silently hidden)
- `stories/{id}/{audio-path}` — optional audio per scene

## Engine flow

1. `showSelector()` fetches `manifest.yaml`, renders story cards, checks LocalStorage for saves
2. `startStory(id)` loads `story.yaml`, restores or initialises state, calls `navigateTo()`
3. `navigateTo(sceneId)` fetches the scene YAML, re-renders HUD + narrative + choices
4. Choices may have `effects` (stat deltas, flag sets) and `requires` (stat minimums, flag checks) — filtered before rendering
5. State shape: `{ scene, stats, flags, history }` — persisted to `localStorage` as `gamebook.state.{id}`
6. Undo pops `history` stack and re-navigates without pushing a new entry

## Adding or editing stories

Use the `/storycraft` skill — it covers new stories, adding scenes, editing existing content, and commit conventions.

Scene template at `stories/templates/scene.yaml` — copy it for each new scene.

## Scene YAML shape

```yaml
id: scene_id
text: |
  Narrative text. Blank line between paragraphs renders as <p> break.
audio: audio/scene.mp3
choices:
  - text: Choice label
    next: target_scene_id
    requires:
      flags: [flag_name]
      stats:
        gold: 5
    effects:
      stats:
        gold: -5
      flags:
        has_item: true
```

`audio`, `requires`, and `effects` are all optional. Empty `choices` list triggers the end-of-story screen.
