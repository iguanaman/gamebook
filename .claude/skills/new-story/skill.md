---
name: new-story
description: Use when the user wants to create a new gamebook story from scratch. Runs Stage 0 in the main thread, then dispatches Stages 1+ as sequential subagents.
---

# New Story

Creates a new gamebook story. **Stage 0 (Discovery) runs in the main orchestrator thread** — it's an interactive interview with the user, where back-and-forth is constant and dispatching to a subagent only adds latency. **Stages 1 onward are HANDS-OFF and run as a continuous pipeline of Claude subagents** — the user is not consulted between stages and not asked to review outputs. Each subagent runs `/storycraft` for its stage and returns; the orchestrator immediately dispatches the next.

## What to do

1. Ask for the story ID if not provided (lowercase, hyphens, e.g. `iron-coast`)
2. **Run Stage 0 yourself in the main thread** — read `docs/storycrafting/stage-0-discovery.md` and follow it, interviewing the user directly and writing `stories/{id}/brief.md` yourself. Get hard confirmation from the user before moving on.
3. **From Stage 1 onward, run the pipeline hands-off, end-to-end, with no user check-ins.** Dispatch each stage as a subagent in sequence — wait for the subagent to complete and confirm output exists before launching the next. Do NOT pause between stages, do NOT ask the user to review intermediate outputs (`structure.md`, `theme.css`, `act-N.md`, `act-N-scenes.md`, `cast.md`), do NOT ask for permission to proceed. Just dispatch, confirm output, dispatch next. The only natural pause is at Stage 5, which the stage-5 subagent itself stops at after writing the first beat (per its own design).

**CRITICAL for Stages 1+: You (the orchestrator) MUST NOT do any stage work yourself, AND MUST NOT solicit user feedback between stages.** Your only job from Stage 1 onward is dispatching subagents via the Agent tool. If you find yourself reading `structure.md`, writing `theme.css`, producing content directly, or asking the user "want to review structure.md before I dispatch Stage 2?" — STOP, you've broken the pipeline. Every Stage-1+ stage's actual work happens inside an Agent call. The orchestrator only:
   - dispatches the next subagent,
   - confirms the output file exists,
   - immediately dispatches the next stage (no user prompt).

The user can interrupt at any time if they want to inspect or change something — that's their call, not yours to solicit.

**Subagents must not ask the user questions either.** Every Stage-1+ prompt includes "Hands-off mode: do not ask the user questions; pick the most reasonable interpretation consistent with the brief and continue." If a subagent ignores this and tries to escalate a question, dispatch a fresh subagent with the same prompt plus an explicit "make a reasonable choice and continue, do not return to the user" override. Do not relay the question to the user.

---

## Stage sequence

**Stage 0 — Discovery (main thread, NOT a subagent)**

Read `docs/storycrafting/stage-0-discovery.md` and run it yourself directly with the user. Interview them about setting, hook, player role, arc, endings, constraints, tone, visual feel, and narrator voice (broad strokes only — Stage 0 is exploratory, do not lock in CSS palette or other concrete details that belong to Stage 1). For narrator voice, follow the stage-0 doc's instructions: discuss the ideal narrator, propose closest matches from `tts_voices/voices.yaml` under `narrator/`, AND propose named real-person candidates whose voices could be cloned from public recordings. Write `stories/{id}/brief.md` yourself. Get **hard confirmation** from the user that Stage 0 is complete before moving on.

Wait for: `stories/{id}/brief.md` to exist (you wrote it).

---

**Stage 1 — Structure**
Dispatch a subagent with this prompt:
> Run `/storycraft {id} stage 1`. Read `stories/{id}/brief.md` and define acts, turning points, branch map, and endings. Also produce the concrete commitments deferred from Stage 0: `stories/{id}/theme.css` (full palette + fonts approved against the brief's visual feel) and any other specifics flagged in the brief's Open Questions. Write `stories/{id}/structure.md`. **Hands-off mode:** do not ask the user questions; if something is missing make the most reasonable choice consistent with the brief and continue. Auto-fix any validation issues — do not halt.

Wait for: `stories/{id}/structure.md` and `stories/{id}/theme.css` to exist.

---

**Stage 2 — Act Beats (one subagent per act, SEQUENTIAL)**

Acts must be expanded in order: Act 1 → Act 2 → Act 3 → ... Each act's entry depends on the previous act's exits, so the next subagent must read the previous act's `act-{N}.md` to design entry states that match. **Never dispatch acts in parallel.**

For each act, dispatch a subagent:
> Run `/storycraft {id} stage 2 act {N}`. Read `stories/{id}/structure.md`, `stories/{id}/brief.md`, and (if N > 1) all previous `stories/{id}/act-{M}.md` files. Expand Act {N} into beats only — high-level narrative units, no scene lists or choice-by-choice mapping yet. Write `stories/{id}/act-{N}.md`. CRITICAL: define each distinct exit configuration explicitly (who exited with the player, which flags are set, stat shifts) so the next act's author can branch entry cleanly. Aim for 4-6 distinct exit states. **Hands-off mode:** do not ask the user questions; pick the most reasonable interpretation consistent with the brief/structure and continue. Auto-fix any validation issues — do not halt.

Wait for `act-{N}.md` to exist before dispatching act N+1.

---

**Stage 3 — Scene Breakdown (one subagent per act)**

For each act, dispatch a subagent:
> Run `/storycraft {id} stage 3 act {N}`. Read `stories/{id}/structure.md`, `stories/{id}/brief.md`, `stories/{id}/act-{N}.md` (beats), and (if N > 1) previous `stories/{id}/act-{M}-scenes.md` files. Expand each beat into named scenes with choices, gating, convergent groupings, weighted random destinations, and an NPC roster. Target 3–6 choices per scene (convergent choices encouraged). Write `stories/{id}/act-{N}-scenes.md`. **Hands-off mode:** do not ask the user questions; pick the most reasonable interpretation and continue. Auto-fix any validation issues — do not halt.

Wait for `act-{N}-scenes.md` to exist before dispatching the next act's scene breakdown. Acts can be scene-broken sequentially or independently — but all act-{N}-scenes.md files must exist before Stage 4.

---

**Stage 4 — Cast (one subagent, runs once)**
Dispatch a subagent with this prompt:
> Run `/storycraft {id} stage 4`. Read `stories/{id}/brief.md`, `stories/{id}/structure.md`, every `stories/{id}/act-{N}.md`, every `stories/{id}/act-{N}-scenes.md`, and `tts_voices/voices.yaml`. Compile the NPC roster from each scene-breakdown's "NPCs in this act" section and write `stories/{id}/cast.md` per the stage-4 doc. Each NPC gets a TTS voice ID assigned (from non-narrator voices in `tts_voices/voices.yaml`); avoid voice reuse where possible. **Hands-off mode:** do not ask the user questions; pick the closest available voice and note any gap inline. Auto-fix any validation issues — do not halt.

Wait for: `stories/{id}/cast.md` to exist.

---

**Stage 5 — Scene Writing (one subagent per beat)**
For each beat in each act breakdown, dispatch a subagent:
> Run `/storycraft {id} stage 5`. Read `stories/{id}/act-{N}.md`, `stories/{id}/act-{N}-scenes.md`, `stories/{id}/cast.md`, and write the scene YAML files for beat {B}. The scene breakdown specifies choices, gating, and convergent groups — do not redesign them, render them. Place files in `stories/{id}/scenes/`. Use the voice IDs from cast.md as block prefixes for any NPC dialogue (e.g. `- male_midlife_english_posh: "..."`). On the first beat of the first act, also create `stories/{id}/story.yaml` and register the story in `stories/manifest.yaml`. Return after this beat completes — the orchestrator will dispatch the next beat. **Hands-off mode:** do not ask the user questions; render from the upstream docs and pick the most reasonable interpretation when something is ambiguous. Auto-fix any validation issues (broken `next:` targets, missing voice prefixes, consumable choices missing their flag pair) — do not halt.

The orchestrator dispatches Stage 5 beats back-to-back without consulting the user. The user can interrupt at any beat boundary if they want to inspect output.

---

## Rules

- Never dispatch the next stage before the previous subagent's output files exist
- Never combine stages in one subagent
