---
name: new-story
description: Use when the user wants to create a new gamebook story from scratch. Scaffolds the full storycraft pipeline as sequential subagent stages.
---

# New Story

Creates a new gamebook story by dispatching each stage to a separate Claude subagent in sequence. Each subagent runs the `/storycraft` skill for its stage, then returns before the next is launched.

## What to do

1. Ask for the story ID if not provided (lowercase, hyphens, e.g. `iron-coast`)
2. Dispatch each stage as a subagent in sequence — wait for the subagent to complete and confirm output exists before launching the next

---

## Stage sequence

**Stage 0 — Discovery**
Dispatch a subagent with this prompt:
> You are working on the gamebook at `D:\Work\github\iguanaman\gamebook`. Run `/storycraft {id} stage 0`. Interview the user about setting, hook, player role, arc, endings, constraints, tone, and visual feel. Write `stories/{id}/brief.md` and `stories/{id}/theme.css`. Get palette approval before finishing.

Wait for: `stories/{id}/brief.md` and `stories/{id}/theme.css` to exist.

---

**Stage 1 — Structure**
Dispatch a subagent with this prompt:
> You are working on the gamebook at `D:\Work\github\iguanaman\gamebook`. Run `/storycraft {id} stage 1`. Read `stories/{id}/brief.md` and define acts, turning points, branch map, and endings. Write `stories/{id}/structure.md`.

Wait for: `stories/{id}/structure.md` to exist.

---

**Stage 2 — Act Breakdown (one subagent per act)**
For each act in the structure, dispatch a subagent:
> You are working on the gamebook at `D:\Work\github\iguanaman\gamebook`. Run `/storycraft {id} stage 2 act {N}`. Read `stories/{id}/structure.md` and expand Act {N} into beats, scene list, choice points, and exits. Write `stories/{id}/act-{N}.md`.

Wait for all `act-{N}.md` files before proceeding.

---

**Stage 3 — Scene Writing (one subagent per beat)**
For each beat in each act breakdown, dispatch a subagent:
> You are working on the gamebook at `D:\Work\github\iguanaman\gamebook`. Run `/storycraft {id} stage 3`. Read `stories/{id}/act-{N}.md` and write the scene YAML files for beat {B}. Place files in `stories/{id}/scenes/`. On the first beat of the first act, also create `stories/{id}/story.yaml` and register the story in `stories/manifest.yaml`. Stop after this beat for user review.

Wait for user to approve each beat's scenes before dispatching the next subagent.

---

## Rules

- Never dispatch the next stage before the previous subagent's output files exist
- Never combine stages in one subagent
- For Stage 3, pause for user review after each beat — do not batch beats
