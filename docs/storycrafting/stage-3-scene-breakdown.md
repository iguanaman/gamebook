# Stage 3: Scene Breakdown

**Goal:** Take an act's beats and design the actual scenes within each beat — named scenes, choice points, gating, convergent options, weighted random destinations. Output: `stories/{id}/act-{n}-scenes.md`.

**Prerequisite:** `act-{n}.md` (beats) must exist. Run this stage once per act, after Stage 2 for that act is complete. Acts can be scene-broken in order or independently — scene breakdowns within an act are self-contained, since act-to-act handoff is fixed by the Stage 2 exits.

---

## Hands-off mode

Stage 0 was the question stage. From Stage 1 onward, run hands-off:

- **Do not ask the user questions.** Everything fundamental should already be in `brief.md` / `structure.md` / `act-{n}.md`. If something is missing, make the most reasonable choice consistent with prior outputs, note it inline, and continue.
- **Auto-fix issues.** If validation fails or a problem is found (orphan scenes, missing gates, broken NPC references, consumable choices missing their flag pair), fix it and keep going — don't halt for confirmation.
- Only stop and surface if upstream docs are contradictory in a way no reasonable interpretation resolves.

---

## Why this stage exists

Stage 2 defines beats; Stage 4 (cast) and Stage 5 (scene writing) need to know the *scenes* — how a beat splits into individual decision points, where it branches, what each choice does, what's gated, what's consumable. Doing this between beats and writing keeps each scene small and lets choice density be planned deliberately rather than ad-libbed during prose.

It also surfaces every named NPC the act needs *before* the cast sheet is written, so Stage 4 has a complete list.

---

## What to do

Read `brief.md`, `structure.md`, the act's `act-{n}.md`, `docs/storycrafting/principles.md`, and (if N > 1) all previous `act-{M}-scenes.md` files for context.

For each beat in the act:

1. **Scene list** — named scenes (descriptive names, not YAML IDs yet — `forest_edge`, `confront_overseer`, `tavern_hub`). Each scene should be a tight beat (~15–30 seconds of reading) ending in a choice. If you find yourself writing a scene that needs more than that, split it.
2. **Choices per scene** — list each choice's text intent and what it does. **Hard cap: 6 active choices per scene.** (Active = passes `requires` for a typical player at that point; gated/hidden choices that most players won't see don't count toward the cap.) If a scene naturally produces more than 6, split it into a sub-scene: pick the most natural mid-point, make the first half a scene that ends with 3–4 choices routing to sub-scenes, then continue. **Convergent choices are the default, not a bonus.** Any scene where the plot only goes one way should still get 3 convergent framings (cautious / blunt / sly, pragmatic / emotional / detached) routing to the same `next` — see `principles.md` for a worked example. Single-choice scenes are allowed as deliberate pacing beats, but they should be the minority; do not let them become the lazy default for "this scene only goes one place." Mark convergent groups explicitly so the scene writer (Stage 5) knows to write distinct framings rather than collapsing them.
3. **Gating per choice** — for each gated choice note:
   - **Requirement:** flag, flags_unset, stat minimum, or combination
   - **Grey out vs hide** — grey out when the player should know the option exists; hide (`hide_if_failed`) when its existence would be a spoiler
   - **Consumable?** — choices that should vanish after being taken (sold item, one-time action). Both `flags_unset` on `requires` AND the same flag set on `effects` are required. Easy to forget; mark them now.
4. **Effects** — flag sets, stat deltas, allies gained/lost
5. **Weighted random `next`** — choices whose destination is uncertain (travel, exploration, NPC mood). Note the destinations and rough odds.
6. **Hub structure** — if a beat is a hub, list the available actions/topics, their gates (open/close as flags change), and the always-available exit choice.
7. **Conversation structure** — if a beat is a conversation, list each topic, the flag it sets when exhausted, and the always-available walk-away choice.
8. **NPCs appearing** — every named NPC in the beat. This list feeds Stage 4 (cast).

Keep it narrative-tight, but more concrete than Stage 2: scene names, choice intents, gates. No YAML — that comes in Stage 5.

---

## Output

Write `stories/{id}/act-{n}-scenes.md`:

```markdown
# {Title} — Act {N} Scenes

## Beat 1 — {beat name from act-{n}.md}

### Scene: `{scene_name}`
Purpose: one line
Choices:
- "{choice text intent}" → `{next_scene}` | gating: {none | requires X | hide_if_failed} | effects: {flag/stat changes} | consumable: {Y/N}
- "{choice text intent}" → `{next_scene}` | (convergent with above — same `next`, different framing) | ...
- "{choice text intent}" → weighted: `{scene_a}` (3) / `{scene_b}` (1) / `{scene_c}` (2)
- ...
NPCs present: {list}

### Scene: `{scene_name}`
...

### Hub — `{scene_name}` (if applicable)
Returns from: {which scenes loop back here}
Choices: {list with gates and which exhaust on use}
Exit: {always-available choice that leaves the hub for good}

### Conversation — `{scene_name}` (if applicable)
Topics: {list each, with flag set on exhaustion}
Walk-away: {always-available exit choice}

## Beat 2 — {name}
...

## NPCs in this act
- {NPC name} — {first appears in scene `X`, recurs in `Y`, `Z`}
- ...
```

---

## Done when

- Every beat from `act-{n}.md` has a scene list
- Every scene has 3–6 active choices listed and never more than 6 (or is a justified exception — endings, forced transitions, deliberate pacing beats); scenes that would exceed 6 have been split into sub-scenes
- Convergent choice groups are marked
- **Choice density gate.** At the end of the act, count active choices across all scenes and report the average. Target ≥3.0; ≥2.5 acceptable. If the act averages below 2.5, you have defaulted to single-choice scenes — go back through every 1-choice scene and either (a) add convergent framings, (b) merge it into the previous scene, or (c) justify it inline as a pacing beat. Re-count and only proceed when the gate passes. Also flag if more than ~25% of scenes have a single choice — convergent framings are the fix.
- All gated choices specify requirement + grey-out vs hide + consumable status
- All consumable choices have both `flags_unset` planned on `requires` AND flag set on `effects`
- All weighted random destinations have intended odds
- Hubs and conversations have full topic lists with gates and an exit choice
- Every named NPC the act uses is listed in the "NPCs in this act" section
- The act-to-act handoff (entry/exits from `act-{n}.md`) is preserved — exit scenes feed the right exit configurations
