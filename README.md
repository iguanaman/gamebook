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

## Stories

| ID | Title | Description |
|---|---|---|
| demo | The Crossroads | Short tech demo — a traveller at a fork in the road |

---

## Creating a new story with Claude

Paste the following prompt into Claude Code to create a new story. It runs each stage as a separate task so context stays focused.

```
I want to create a new gamebook story using the /storycraft skill.

Please create a separate task for each stage below and work through them sequentially — complete one stage fully before starting the next. Each stage should be handled as its own focused session using /storycraft.

Story ID: [your-story-id]

Tasks:
1. Stage 0 — Discovery: Run `/storycraft [your-story-id] stage 0`. Interview me about the story setting, hook, player role, arc, endings, constraints, tone, and visual feel. Then write brief.md and theme.css.

2. Stage 1 — Structure: Run `/storycraft [your-story-id] stage 1`. Define acts, turning points, branch map, and endings using brief.md.

3. Stage 2 — Act Breakdown (repeat per act): Run `/storycraft [your-story-id] stage 2 act [N]`. Expand each act into beats, scene list, choice points, and exits.

4. Stage 3 — Scene Writing (repeat per beat): Run `/storycraft [your-story-id] stage 3`. Write scene YAML files one beat at a time, stopping for review after each.

Start with Stage 0 now.
```

Replace `[your-story-id]` with a short lowercase ID (e.g. `iron-coast`, `fall-of-valdris`).
