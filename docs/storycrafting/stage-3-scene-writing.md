# Stage 3: Scene Writing

**Goal:** Write the actual YAML scene files for one beat or act. Output is `stories/{id}/scenes/` files.

**Prerequisite:** The relevant `act-{n}.md` breakdown must exist and be complete.

---

## What to do

Read `brief.md`, `structure.md`, and the act breakdown for the target act. Also read `docs/foundation.md` for tone.

Write scenes one beat at a time — not the whole act at once. After each beat, stop and let the user review before continuing.

For each scene:

1. Write the narrative text — prose, second-person, present tense (match the story's established voice)
2. Define choices — 2–4, grounded in what the player just read
3. Apply effects/requires only where the breakdown says mechanics are in play
4. Use descriptive scene IDs (`forest_edge`, not `scene_03`)
5. Place files at `stories/{id}/scenes/{act-folder}/{scene-id}.yaml`

---

## Scene quality checks

Before writing each scene:
- Does the text end in a way that makes each choice feel live? (Not "do you go left or right?" as the last line)
- Are all `next:` targets either an existing file or a scene you're about to write in this batch?
- Is the text long enough to be worth the page, but short enough to read in 30–60 seconds?
- For one-shot encounters: does this choice use `flags_unset` on `requires` and set the same flag on `effects`? If the choice should vanish after being taken, both halves must be present.

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

---

## NPC Voice

Voice is the mechanic. An NPC with a distinct way of speaking rewards revisiting more than one who only delivers information.

Before writing an NPC's first scene, decide their register:
- **Vocabulary** — do they use long words or short ones? Jargon? Contractions?
- **Sentence length** — clipped and terse, or meandering?
- **What they notice** — a merchant notices your coin purse; a scholar notices your accent
- **What they care about** — their self-interest, their fear, their pride

Hold this register across every scene they appear in. An NPC's voice should be recognisable without a name tag — if you covered the speaker label, you'd still know who it was.

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

**`if: visited`** is true on any return visit to the scene. Use it for world-memory moments — the sense that the place remembers you.

**Use sparingly.** Every conditional branch is writing that must be worth the reader's time. If you write an `else`, both branches need to earn their place.

**Don't gate critical information.** If a conditional block is the only way a player learns something load-bearing, they may miss it entirely. Conditional blocks are for texture, not for plot gates — use choices with `requires` for that.

---

## First scene in a story

If this is the first scene of the whole story, also:
- Create `stories/{id}/story.yaml` (copy from `templates/story.yaml`)
- Add the story ID to `stories/manifest.yaml`
- Set `start:` to the first scene's path

---

## Output

One YAML file per scene. Follow the schema in `CLAUDE.md`. No extras — only fields the scene actually uses.

---

## Done when

- All scenes in the beat are written
- Every `next:` points to a real file (existing or just written)
- No choice is a dead end unless intentional (`choices: []`)
- User has reviewed and approved before moving to the next beat
