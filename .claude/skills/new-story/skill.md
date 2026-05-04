---
name: new-story
description: Use when the user wants to create a new gamebook story from scratch. Scaffolds the full storycraft pipeline as sequential subagent stages.
---

# New Story

Creates a new gamebook story by dispatching each stage to a separate Claude subagent in sequence. Each subagent runs the `/storycraft` skill for its stage, then returns before the next is launched.

## What to do

1. Ask for the story ID if not provided (lowercase, hyphens, e.g. `iron-coast`)
2. Dispatch each stage as a subagent in sequence — wait for the subagent to complete and confirm output exists before launching the next

**CRITICAL: You (the orchestrator) MUST NOT do any stage work yourself.** Your only job is dispatching subagents via the Agent tool and relaying user input between them. If you find yourself reading `brief.md`, writing `theme.css`, or producing structure content directly, STOP — you have skipped the dispatch step. Every stage's actual work happens inside an Agent call. The orchestrator never opens the storycraft skill, never reads the stage docs, never writes the outputs. It only:
   - asks the user for missing inputs (story ID),
   - dispatches the next subagent,
   - confirms the output file exists,
   - moves to the next stage.

If a subagent needs to ask the user a question, it returns to you — pass the question along, get the answer, then re-dispatch the subagent with the answer included in the prompt.

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

**Stage 2 — Act Breakdown (one subagent per act, SEQUENTIAL)**

Acts must be expanded in order: Act 1 → Act 2 → Act 3 → ... Each act's entry depends on the previous act's exits, so the next subagent must read the previous act's `act-{N}.md` to design entry states that match. **Never dispatch acts in parallel.**

For each act, dispatch a subagent:
> You are working on the gamebook at `D:\Work\github\iguanaman\gamebook`. Run `/storycraft {id} stage 2 act {N}`. Read `stories/{id}/structure.md`, `stories/{id}/brief.md`, and (if N > 1) all previous `stories/{id}/act-{M}.md` files. Expand Act {N} into beats, scene list, choice points, and exits. Write `stories/{id}/act-{N}.md`. CRITICAL: define each distinct exit configuration explicitly (who exited with the player, which flags are set, stat shifts) so the next act's author can branch entry cleanly. Aim for 4-6 distinct exit states.

Wait for `act-{N}.md` to exist before dispatching act N+1.

---

**Stage 3 — Cast (one subagent, runs once)**
Dispatch a subagent with this prompt:
> You are working on the gamebook at `D:\Work\github\iguanaman\gamebook`. Run `/storycraft {id} stage 3`. Read `stories/{id}/brief.md`, `stories/{id}/structure.md`, every `stories/{id}/act-{N}.md`, and `tts_voices/voices.yaml`. List every named NPC across all acts and write `stories/{id}/cast.md` per the stage-3 doc. Each NPC gets a TTS voice ID assigned (from non-narrator voices in `tts_voices/voices.yaml`); avoid voice reuse where possible.

Wait for: `stories/{id}/cast.md` to exist.

---

**Stage 4 — Scene Writing (one subagent per beat)**
For each beat in each act breakdown, dispatch a subagent:
> You are working on the gamebook at `D:\Work\github\iguanaman\gamebook`. Run `/storycraft {id} stage 4`. Read `stories/{id}/act-{N}.md`, `stories/{id}/cast.md`, and write the scene YAML files for beat {B}. Place files in `stories/{id}/scenes/`. Use the voice IDs from cast.md as block prefixes for any NPC dialogue (e.g. `- male_midlife_english_posh: "..."`). On the first beat of the first act, also create `stories/{id}/story.yaml` and register the story in `stories/manifest.yaml`. Stop after this beat for user review.

---

## Rules

- Never dispatch the next stage before the previous subagent's output files exist
- Never combine stages in one subagent
