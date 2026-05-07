# Stage 5: Scene Writing

**Goal:** Write the actual YAML scene files for one beat or act. Output is `stories/{id}/scenes/` files.

**Prerequisite:** The relevant `act-{n}.md` (beats), `act-{n}-scenes.md` (scene breakdown), AND `stories/{id}/cast.md` must all exist.

---

## Hands-off mode

Stage 0 was the question stage. From Stage 1 onward, run hands-off:

- **Do not ask the user questions.** Render the prose from upstream docs. If something is missing or ambiguous, make the most reasonable choice consistent with the brief, structure, beats, breakdown, and cast — and continue.
- **Auto-fix issues.** If validation fails or a problem is found (broken `next:` targets, missing voice prefixes, consumable choices missing their `flags_unset`/`effects` pair, scenes longer than the 15–30s budget), fix it and keep going — don't halt for confirmation.
- Only stop and surface if upstream docs are contradictory in a way no reasonable interpretation resolves.

Each Stage-5 subagent writes exactly ONE beat, then returns. The orchestrator dispatches the next beat immediately — no user check-in between beats unless the user proactively interrupts.

---

## What to do

Read `brief.md`, `structure.md`, the target act's `act-{n}.md` and `act-{n}-scenes.md`, `cast.md` (NPC voices and characterisation — load this every time, voice IDs go directly into scene YAML as block prefixes), `docs/foundation.md` for tone, and `docs/storycrafting/principles.md` for structural patterns (hubs, conversations, random events, permadeath).

Write scenes one beat at a time — not the whole act at once. The subagent writes one beat then returns; the orchestrator dispatches the next beat as a fresh subagent. No user review between beats.

**The scene breakdown (`act-{n}-scenes.md`) already specifies the choices, gating, convergent groupings, and weighted destinations.** Your job at this stage is to write the prose that earns those choices and to render the structure into YAML — not to redesign the choice set. If a scene as written doesn't fit the breakdown, raise it before deviating.

For each scene:

1. **Re-read the scene's entry in the breakdown** — choices, gates, convergent groups, effects, weighted destinations
2. **Note conditional text blocks** — which flags/stats/`visited` trigger alternate text? What does each branch say in a sentence? (These weren't necessarily fixed in Stage 3.)
3. **Write prose** — knowing the endpoint of the scene, write narrative text that earns each choice and ends at a decision point (not "do you go left or right?" as the final line). Convergent choices need genuinely distinct framings — write the cautious, blunt, and sly versions as different lines, not three rephrasings of the same sentence.
5. Use descriptive scene IDs (`forest_edge`, not `scene_03`)
6. Place files at `stories/{id}/scenes/{act-folder}/{scene-id}.yaml`

---

## Scene quality checks

After planning mechanics, before writing prose:
- Do you know what each choice leads to, and what (if anything) gates it?
- Are consumable choices accounted for — `flags_unset` on `requires` AND flag set on `effects`?
- For weighted `next`: are the destinations and odds deliberate, not accidental?
- For conditional text: is each branch worth writing, or is this texture that adds nothing?

After writing prose:
- Does the text end in a way that makes each choice feel live? (Not "do you go left or right?" as the last line)
- Are all `next:` targets either an existing file or a scene you're about to write in this batch?
- Is the text short enough to read in roughly 15–30 seconds? Prefer brevity — scenes should be tight beats that hand control back to the player quickly, not long passages of narration. If a scene runs long, split it: end on a decision, continue the rest in the next scene.
- Does the prose follow the **Prose Style** canon in `principles.md`? Specific over general; suggest don't inventory; one concrete detail over a list; show don't state. Apply to narrator text, journal entries, conditional blocks. NPC dialogue follows the cast sheet — voice can override the canon. The brief may also override (named maximalist register, kid-voice hype, etc.) — check it.

---

## One-Shot Choices

A consumable choice must have `flags_unset` on `requires` AND the same flag set on `effects`. Both halves are required — missing either leaves the option permanently available or permanently gone.

```yaml
# One-shot: the peddler only has one flask
- text: Buy the peddler's flask
  next: bought_flask
  requires:
    flags_unset: [flask_sold]
    stats:
      gold: 2
  effects:
    stats:
      gold: -2
    flags:
      flask_sold: true
```

---

## NPC Voice

Voice is the mechanic. An NPC with a distinct way of speaking rewards revisiting more than one who only delivers information.

**The cast sheet (`stories/{id}/cast.md`) is the source of truth.** Each NPC has a fixed voice (vocabulary, rhythm, contradictions, body, motives) and a fixed TTS voice ID. Hold both across every scene they appear in. An NPC's voice should be recognisable without a name tag — if you covered the speaker label, you'd still know who it was.

When an NPC speaks, write the line as a YAML block prefixed with their TTS voice ID from `cast.md`:

```yaml
text:
  - "The overseer's office smells of stale coffee."
  - male_midlife_english_posh: "Officer. You are not on the schedule."
  - "He doesn't look up from the terminal."
```

Narrator-only blocks (no prefix) use the story's narrator voice from `story.yaml`. NPC dialogue must always use the assigned voice ID — never default to narrator for an NPC line, and never invent a voice ID that isn't in `cast.md`.

**In-world computer/screen text** (a terminal readout, an AI announcement, an automated PA) uses a `robot/` voice ID as the prefix (e.g. `robot_neutral_xyz: "..."`). Pick from the `robot/` bucket in `tts_voices/voices.yaml`. These IDs are not assigned in `cast.md` — use them ad hoc whenever an in-world computer speaks.

**Written NPC text** (a letter, a journal entry, a note, an inscription) is different: it has no voice ID prefix — the narrator reads it aloud — but the prose itself must still sound like the NPC wrote it. Use their vocabulary, sentence rhythm, and contradictions from `cast.md`. A terse bureaucrat writes in clipped sentences; a paranoid scholar writes in circling qualifications. If you covered the framing ("you find a letter from X"), the writing should still be recognisable as theirs.

NPCs with opinions reward curiosity even when nothing mechanical happens. NPCs who only deliver plot do not.

---

## Journal Entries

The journal is a player-visible sidebar that records key beats in order. Three places can write to it:

1. **`story.yaml` — mandatory.** A single `journal:` field that records the opening entry on new game. Sets the player's starting situation in their own voice.
2. **`_act.yaml` — mandatory.** Every act folder's `_act.yaml` must include `journal:`, recorded once when the player first enters that act. Marks the act transition.
3. **Scene `journal:` — optional, sparing.** Individual scenes can add an entry on first visit for turning points only.

```yaml
# story.yaml
journal: "You are a security officer in Vault 34. The reactor is dying. The overseer has not told anyone."

# _act.yaml
journal: "Act One — The Sealed Door. The vault has hours. The overseer has the only key."

# scene.yaml
journal: "You met the old librarian. She knew your name before you gave it."
```

**Scene-level — use sparingly.** Add only for:
- Turning points (a betrayal, a revelation, a death)
- First meetings with named NPCs who matter later
- Choices whose consequences the player should remember sessions later
- Discoveries that recontextualise earlier scenes

Skip scene journal entries for transitional scenes, hubs the player will revisit, ambient texture, or anything the narrative will reiterate naturally. If a beat earns a journal line, every line in the journal should feel earned the same way — a wall of trivial entries dilutes the meaningful ones.

Second person, past tense, terse. One or two sentences. Match the story's voice but don't over-write — the journal is a memory aid, not a recap.

---

## Paralinguistic Tags

The TTS model accepts inline performance tags that the engine strips before display — the listener hears them, the reader doesn't. Supported tags: `[sigh]`, `[gasp]`, `[chuckle]`, `[laugh]`, `[groan]`, `[sniff]`, `[cough]`, `[clear throat]`, `[shush]`. Lowercase, square brackets, no quotes around the tag itself.

```yaml
- male_midlife_english_posh: "[sigh] You again. I told the desk no visitors."
- "She laughs — a short, bitter sound. [chuckle]"
```

**Use sparingly.** A tag earns its place when the line genuinely needs the audible beat (a real sigh of resignation, a laugh that lands the joke). A tag on every other line stops being expressive and starts sounding like a tic. Aim for one or two per scene at most, on lines where the delivery matters.

---

## Conditional Blocks

Any text block can render conditionally based on current state. Use the `if` key with the same syntax as choice `requires`.

```yaml
text:
  - "You enter the cave."
  - if: visited
    text: "The smell hits you first. You've been here before."
    else: "Everything is still and cold."
  - if: {flags: [perceptive]}
    text: "You notice scratches on the wall — tool marks, deliberate."
  - if: {stats: {strength: 8}}
    text: "The boulder looks moveable."
```

**`if: visited`** is true on any return visit to the scene. Use it for world-memory moments — the sense that the place remembers you. **Only add it to scenes the player can actually reach more than once** — hubs, conversation returns, side scenes linked from a hub. One-way entry scenes (story start, beat transitions, permadeath branches) will never trigger it; don't write it there.

**Use sparingly.** Every conditional branch is writing that must be worth the reader's time. If you write an `else`, both branches need to earn their place.

**Don't gate critical information.** If a conditional block is the only way a player learns something load-bearing, they may miss it entirely. Conditional blocks are for texture, not for plot gates — use choices with `requires` for that.

---

## First scene in an act folder

When writing the first scene in a new act subfolder (e.g. `scenes/act1/`), create `_act.yaml` in that folder (copy from `templates/act.yaml`):

```yaml
title: Act One — The Sealed Door
journal: "Act One — The Sealed Door. The vault has hours. The overseer has the only key."
```

The engine fetches this when the player first enters the folder — it clears the narrative and displays the act title with animation and audio, and writes the `journal:` entry to the journal sidebar. Both fields are mandatory. Only one `_act.yaml` per folder. Scenes themselves have no `act:` field.

---

## First scene in a story

`story.yaml` and the manifest entry were created in stage 1. When you write the first scene of the whole story, just update `story.yaml`:

- Set `start:` to the first scene's path (e.g. `act1/opening`).

Everything else on `story.yaml` (stats, narrator, description, opening `journal:`, visible flags) was already filled in at stage 1 and should not need changes here. If something is missing, that's a stage-1 gap — fix it on `story.yaml` directly, but flag it.

For reference, a good `description:` reads like:

  ```yaml
  # Good — early situation + immediate tension, no spoilers
  description: You're a vault security officer. Something is wrong, and the overseer isn't talking.

  # Bad — reveals mid-story stakes and framing the player doesn't have yet
  description: The reactor is failing. The overseer is hiding it. You have 72 hours and a vault full of people who don't know they're already dead.
  ```

---

## YAML text format

**`text` is always a list. Each list item = one paragraph on screen.** Do not put multiple paragraphs in one item — split them into separate list items instead.

**Always use `|-` for all string values** — `text:`, `else:`, `failed_text:`, choice `text:`, `journal:`. `|-` accepts any content literally (quotes, colons, apostrophes, `#`) with no escaping needed.

```yaml
# BAD — multiple paragraphs in one block
- if: {flags: [dismissed_once]}
  text: 'You step out again.\n\nMira is still there.'

# GOOD — one paragraph per list item
- if: {flags: [dismissed_once]}
  text: |-
    You step out again.
- if: {flags: [dismissed_once]}
  text: |-
    Mira is still there.
```

```yaml
# BAD — quoted strings with escaping
text: 'She can''t take it back. If it''s in her locker: trouble.'

# BAD — bare unquoted, colons break YAML parsing
- The vault runs itself: lights, locks, rations.

# GOOD — |- accepts everything, no escaping ever
- |-
  She can't take it back. If it's in her locker: trouble.
```

For NPC voice lines, `|-` goes on the value side of the voice prefix:

```yaml
- male_midlife_english_posh: |-
    Officer. You are not on the schedule.
```

Choice `text:` and `failed_text:` use `|-` too:

```yaml
- text: |-
    Reach across the desk. (Strength 7)
  failed_text: |-
    *(The maths is not in your favour.)*
```

---

## Output

One YAML file per scene. Follow the schema in `CLAUDE.md`. No extras — only fields the scene actually uses.

---

## Done when

- All scenes in the beat are written
- Every `next:` points to a real file (existing or just written)
- No choice is a dead end unless intentional (`choices: []`)
- Subagent returns after the beat is complete (no user review gate — orchestrator dispatches next beat immediately)
