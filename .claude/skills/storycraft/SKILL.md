---
name: storycraft
description: Use when creating a new gamebook story, adding scenes to an existing story, or editing story content in D:\Work\github\iguanaman\gamebook.
---

# Storycraft

Authoring guide for the gamebook engine at `D:\Work\github\iguanaman\gamebook`.

## Staged Authoring

Stories are built in stages. Each stage has its own guide in `docs/storycrafting/`.

**Always check which stage is being requested.** The user will specify a story ID and stage number. If either is missing, ask before proceeding.

| Stage | Doc | Output |
|---|---|---|
| 0 — Discovery | `docs/storycrafting/stage-0-discovery.md` | `stories/{id}/brief.md` + `theme.css` |
| 1 — Structure | `docs/storycrafting/stage-1-structure.md` | `stories/{id}/structure.md` |
| 2 — Act Beats | `docs/storycrafting/stage-2-act-breakdown.md` | `stories/{id}/act-{n}.md` |
| 3 — Scene Breakdown | `docs/storycrafting/stage-3-scene-breakdown.md` | `stories/{id}/act-{n}-scenes.md` |
| 4 — Cast | `docs/storycrafting/stage-4-cast.md` | `stories/{id}/cast.md` |
| 5 — Scene Writing | `docs/storycrafting/stage-5-scene-writing.md` | `stories/{id}/scenes/` files |

Read the stage doc, then follow it. Each stage requires the previous stage's output — if the prerequisite is missing, stop and tell the user.

## Before You Start

Read `docs/foundation.md` for tone and design philosophy. Read `docs/storycrafting/principles.md` for story design standards — characters, permadeath, hubs, random events, conversations. These apply to every stage.
