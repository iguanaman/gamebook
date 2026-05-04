# Stage 4: Scene Writing

**Goal:** Write the actual YAML scene files for one beat or act. Output is `stories/{id}/scenes/` files.

**Prerequisite:** The relevant `act-{n}.md` breakdown must exist, AND `stories/{id}/cast.md` must exist (Stage 3 output).

---

## What to do

Read `brief.md`, `structure.md`, the act breakdown for the target act, `cast.md` (NPC voices and characterisation — load this every time, voice IDs go directly into scene YAML as block prefixes), `docs/foundation.md` for tone, and `docs/storycrafting/principles.md` for structural patterns (hubs, conversations, random events, permadeath).

Write scenes one beat at a time — not the whole act at once. After each beat, stop and let the user review before continuing.

**For each scene, plan mechanics before writing prose.** Prose written without knowing the choice structure often ends awkwardly or requires rewriting. Do this first:

1. **List the choices** — what options will the player see? 2–4 is the target.
2. **Note each choice's mechanics** — `requires`, `effects`, `flags_unset` (consumable?), weighted `next` (random destination?), grey-out or `hide_if_failed`
3. **Note any conditional text blocks** — which flags/stats/`visited` trigger alternate text? What does each branch say in a sentence?
4. **Then write prose** — knowing the endpoint of the scene, write narrative text that earns each choice and ends at a decision point (not "do you go left or right?" as the final line)
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
- Is the text long enough to be worth the page, but short enough to read in 30–60 seconds?

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
```

The engine fetches this when the player first enters the folder — it clears the narrative and displays the act title with animation and audio. Only one `_act.yaml` per folder. Scenes themselves have no `act:` field.

---

## First scene in a story

If this is the first scene of the whole story, also:
- Create `stories/{id}/story.yaml` (copy from `templates/story.yaml`)
- Add the story ID to `stories/manifest.yaml`
- Set `start:` to the first scene's path

---

## YAML quoting

Any text block containing a colon (`:`) must be quoted — YAML will misparse `running itself: requisitions` as a mapping key. Use double quotes or a block scalar (`|`). Single quotes work too but require escaping internal single quotes as `''`. When in doubt, quote it.

```yaml
# BAD — colon in unquoted multiline string
- The vault runs itself: lights, locks, rations.

# GOOD
- "The vault runs itself: lights, locks, rations."
```

---

## Output

One YAML file per scene. Follow the schema in `CLAUDE.md`. No extras — only fields the scene actually uses.

---

## Done when

- All scenes in the beat are written
- Every `next:` points to a real file (existing or just written)
- No choice is a dead end unless intentional (`choices: []`)
- User has reviewed and approved before moving to the next beat
