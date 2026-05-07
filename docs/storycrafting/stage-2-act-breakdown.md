# Stage 2: Act Beats + Principal Cast

**Goal:** Expand one act into its beats — the high-level emotional/narrative units — AND draft cast entries for every principal NPC the act introduces or significantly develops. No scene lists yet, no choice-by-choice mapping. Outputs: `stories/{id}/act-{n}.md` and updates to `stories/{id}/cast.md`.

**Prerequisite:** `structure.md` must exist. Run this stage once per act, in order (Act 1 → Act 2 → ...). Each act's entry depends on the previous act's exits.

**Why cast lives here, not Stage 4.** When a beat author commits to who's on stage — an overseer's contradiction, an ally's voice — the beat shapes itself around real people instead of placeholder roles. Casting later means reverse-engineering characterisation onto already-written beats. Stage 4 still runs, but as a reconciliation pass that folds in supporting NPCs from Stage 3 and resolves clashes.

---

## Hands-off mode

Stage 0 was the question stage. From Stage 1 onward, run hands-off:

- **Do not ask the user questions.** Everything fundamental should already be in `brief.md` / `structure.md`. If something is missing, make the most reasonable choice consistent with prior outputs, note it inline, and continue.
- **Auto-fix issues.** If validation fails or a problem is found (broken handoffs, missing pieces, internal contradictions), fix it and keep going — don't halt for confirmation.
- Only stop and surface if upstream docs are contradictory in a way no reasonable interpretation resolves.

---

## Why beats first

Stage 2 plans the *shape* of an act: what beats it contains, how the player enters and leaves, which beats branch. Scene-level detail (named scenes, individual choice points, gating) is deferred to Stage 3 — designing scenes before the beats are agreed wastes effort if a beat shifts.

Acts also have to interlock: Act N+1's entry must match Act N's exits. Locking exit configurations at this stage keeps acts independently designable downstream.

---

## What to do

Read `brief.md`, `structure.md`, `docs/storycrafting/principles.md`, `docs/storycrafting/stage-4-cast.md` (for cast entry format and voice-assignment rules), `tts_voices/voices.yaml`, and (if N > 1) all previous `act-{M}.md` files plus the existing `cast.md`. Expand the target act into:

1. **Beats** — the 4–8 narrative units that make up the act. Each beat is a clear chunk of story (an arrival, a confrontation, a discovery, a hub stay). One sentence on what happens, one on what the player decides or learns.
2. **Beat connections** — which beats follow which. Linear chain, branching, hub-and-spoke. A beat may have multiple downstream beats based on player choice — note the branch condition (flag, stat, or simply the player's pick), not the choice text yet.
3. **Hubs and conversations** — name any hub or conversation node the act needs. These will be designed as looping structures in Stage 3.
4. **Entry** — what the player arrives with (carried flags, stats, allies). Match to previous act's exits.
5. **Exits** — define each distinct exit configuration explicitly: who exited with the player, which flags are set, stat shifts, which beat/scene the player leaves from. Aim for 4–6 distinct exit states. The next act's author needs these to design clean entry branching.
6. **Flags/stats touched** — what changes in this act and why. Note which flags should be **player-visible** in the HUD.
7. **Principal cast additions** — for every named NPC the act introduces or significantly develops, append a full entry to `stories/{id}/cast.md` per the stage-4 doc's format (voice assignment, body, voice on the page, contradiction, wants, fears, first seen, recurs in). Reuse principals introduced in earlier acts rather than recasting them. Avoid voice clashes against entries already in `cast.md`. If `cast.md` does not exist yet, create it with a `# {Title} — Cast` header before adding entries. Do NOT include bit-part / one-scene cameos here — those are added in Stage 3.

Keep act content narrative, not technical. No YAML, no engine syntax, no scene names. Just the act's bones.

**Pacing context.** When considering how many beats an act needs, remember scenes will be short (~15–30 seconds of reading) with frequent choices (3–6 per scene, including convergent ones). Don't try to cram a beat's worth of story into one big set-piece — beats expand to multiple scenes in Stage 3, so a beat can be small.

---

## Output

Write `stories/{id}/act-{n}.md`:

```markdown
# {Title} — Act {N}: {Name}

## Journal Entry
One line, second person, marks this act's transition for the player. Recorded to the journal sidebar when the player first enters this act. Will be copied verbatim into `_act.yaml`'s `journal:` field at Stage 5. Mandatory.

## Entry
Arrives from: {previous act exit name(s) or story start}
Player state: which flags/stats are set entering this act

## Beats

### Beat 1 — {name}
What happens: ...
What the player decides/learns: ...
Connects to: Beat 2 (linear) | Beat 2 or Beat 3 depending on {condition}

### Beat 2 — {name}
...

### Hub — {name} (if applicable)
Purpose: ...
Returned to from: {which beats loop back here}
Exits to: {which beats can leave here, under what conditions}

### Conversation — {NPC} (if applicable)
Purpose: ...
Where it sits in the beat flow: ...

## Exits
- **Exit A — {name}:** leaves from Beat {X}; player carries {flags/allies/stats}; → Act {N+1} entry / Ending {Y}
- **Exit B — {name}:** ...
- (4–6 distinct exit states recommended)

## Flags/Stats Changed
- `flag_name` set when: ... (player-visible? Y/N)
- `stat_name` changes: ...
```

---

## Done when

- Journal Entry written (one line, second person, marks the act transition)
- All beats listed, each with a one-line purpose and at least one decision/learning point
- Beat connections form a coherent map (no orphans, no dead ends unless intentional)
- Entry aligns with previous act's exits (or story start)
- Exits are distinct, named, and specify carried state — Stage 3 and the next act can both use them
- Hubs and conversations are named (full design happens in Stage 3)
- All flags/stats changes are listed with player-visible marking
- Every principal NPC introduced or developed in this act has a full entry in `stories/{id}/cast.md` (voice assigned, characterisation filled, no placeholders), and no voice clashes with entries from earlier acts
- A scene-breakdown writer (Stage 3) could expand any beat without further clarification
