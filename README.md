# Gamebook Engine

A static-site branching fiction engine. Stories are YAML files played in the browser — no server, no build step, no framework.

Inspired by Fighting Fantasy, Fabled Lands, Lone Wolf.

## Running locally

```
npx serve .
```

Or use VS Code Live Server (right-click `index.html` → Open with Live Server). `file://` won't work — the engine uses `fetch()` to load YAML.

## How it works

- Stories are folders under `stories/{id}/`
- Each story has a `story.yaml` (metadata, starting stats) and scene files in `scenes/`
- The engine loads scenes on demand, tracks state in LocalStorage, renders choices filtered by flags/stats
- Per-story `theme.css` overrides the default palette and fonts

See `docs/` for full documentation:
- `docs/foundation.md` — design philosophy
- `docs/engine.md` — state, navigation, effects, audio
- `docs/frontend.md` — layout, CSS variables, theming

## Creating a new story with Claude

Run `/new-story` in Claude Code to start the guided story creation pipeline.

Once the story is written, generate audio:

```
python scripts/tts_server.py        # start TTS server (port 5500)
python scripts/generate_audio.py    # generate audio for all stories
```
