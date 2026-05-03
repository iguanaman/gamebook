---
name: storycraft
description: Use when creating a new gamebook story, adding scenes to an existing story, or editing story content in D:\Work\github\iguanaman\gamebook.
---

# Storycraft

Authoring guide for the gamebook engine at `D:\Work\github\iguanaman\gamebook`.

## Before You Start

Read `docs/foundation.md` for tone and design philosophy. Stories are authored prose — the engine is just delivery. Write for the reader, not the system.

## Creating a New Story

**1. Register it** — add the story ID to `stories/manifest.yaml`:
```yaml
stories:
  - existing-story
  - your-new-id      # add here
```

**2. Create story metadata** — copy `templates/story.yaml` to `stories/{id}/story.yaml`:
```yaml
id: your-story-id
title: Story Title
description: One or two sentences shown on the selector screen.
cover: images/cover.jpg   # optional
start: start              # ID of the first scene
stats:
  gold: 10                # author-defined stats; omit if none needed
```

**3. Plan the scene graph** — sketch out scenes and connections before writing. Even a napkin diagram prevents dead ends. Every scene needs at least one exit unless it's intentionally the end.

**4. Create scenes** — copy `templates/scene.yaml` for each scene. Place at `stories/{id}/scenes/{scene-id}.yaml`. For large stories, organise into subfolders (`scenes/act1/`, `scenes/act2/`, etc.) — the subfolder becomes part of the scene ID (e.g. `act1/crossroads`). Use the same path in `next:` values and in `story.yaml`'s `start` field.

## Scene Authoring Rules

- **Text**: Use `|` block scalar. Blank lines = paragraph breaks. Don't add HTML.
- **Choices**: 2–4 per scene is ideal. One choice is a corridor; five is paralysis.
- **Conditional choices**: `requires` hides the choice entirely if not met — don't reference it in the text as if it's always there.
- **Effects**: Apply sparingly. Stats and flags should change because the story demands it, not to fill a system.
- **Dead ends**: A scene with `choices: []` shows "The End". Only use this intentionally.
- **Scene IDs**: lowercase, underscores, descriptive (`forest_clearing` not `scene_14`).

## Modifying an Existing Story

1. Read `stories/{id}/story.json` to understand start scene and stats.
2. Map the scene graph by reading scene files before editing — changes to `next` targets can create orphaned scenes or broken links.
3. When adding a branch: create new scene files first, then update the choice in the branching scene.
4. When removing a scene: search all other scenes for `next: that_scene_id` first.

## Flags vs Stats

| Use flags when | Use stats when |
|---|---|
| Something happened (boolean) | A quantity changes over time |
| Unlocking a path | Gating by threshold (gold >= 5) |
| Player made a choice | Resource spending/gaining |

## Commit Convention

```
feat: add story "{title}"
feat({story-id}): add {scene description} branch
fix({story-id}): correct broken scene link in {scene-id}
content({story-id}): revise {scene-id} text
```

## File Checklist for a New Story

- [ ] `stories/manifest.yaml` — story ID added
- [ ] `stories/{id}/story.yaml` — metadata complete, `start` points to a real scene
- [ ] `stories/{id}/scenes/` — at least one scene file exists
- [ ] Every `next:` value points to a `.yaml` file that exists
- [ ] At least one scene has `choices: []` (the end)
- [ ] No scene is unreachable from `start`
