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
