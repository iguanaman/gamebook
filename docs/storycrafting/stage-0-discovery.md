# Stage 0: Discovery

**Goal:** Explore the story in broad strokes. Don't settle on specifics yet — that's Stage 1's job. Output: `stories/{id}/brief.md`.

This stage is exploratory. Capture the shape of the idea, not the final form. Specific commitments (exact narrator voice, opening journal line, CSS palette) belong in Stage 1 once the premise has solidified.

---

## Step 1: Questions

Ask the user questions — one batch, not one at a time — until you have enough to fill the brief below. If some answers suggest follow-ups, do one more round max.

Cover:

1. **Setting** — world, era, tone (dark/comic/earnest), any genre conventions in play
2. **Hook** — the inciting event or premise in one sentence
3. **Player role** — who the reader is, what they want, what stands in their way
4. **Main arc** — rough shape of the journey (rise/fall, mystery/revelation, escape, etc.)
5. **Endings** — how many, what they hinge on (a choice, a stat, a flag)
6. **Constraints** — length target (short ~30 scenes, medium ~80, long ~150+), any mechanics (stats? flags?)
   - These are *total authored scenes* across all branches — a player sees maybe 30–40% in one run
   - Short (~30) ≈ 10–15 min playthrough; medium (~80) ≈ 20–30 min; long (~150+) ≈ 45–60 min per run
7. **Tone reference** — a book, game, or film this should feel like
8. **Visual feel** — broad mood only (e.g. "amber on black like a terminal", "parchment and ink", "cold neon sci-fi"). Exact palette and fonts come in Stage 1.
9. **Narrator voice** — discuss the ideal narrator for this story (tone, age, gender, accent, delivery — e.g. "gravelly post-apoc", "cosmic-horror dread", "warm storyteller"). Then look at what's actually available under `narrator/` in `tts_voices/voices.yaml` and propose the closest matches. **Always also propose 3–5 candidate new narrators by name** — real people whose voices could be cloned from publicly available recordings (interviews, podcasts, audiobooks, actual-play streams, film/TV). Don't use vague archetypes ("warm DM voice"); name actual humans (e.g. Matthew Mercer, Brennan Lee Mulligan, Patrick Stewart, Stephen Fry, Brian Blessed, Roy Dotrice, Rob Inglis). For each, note: who they are, what kind of recording is available to clip from, register/tone, why they fit this story, and any tradeoff. Recommend one. The user can then pick an existing voice, commission cloning from a real-person clip, or compromise. Record the chosen voice ID (leaf-key from voices.yaml, or a placeholder ID for a to-be-cloned voice) in the brief, and note any gap. NPC voices are assigned later in Stage 4.

---

## Step 2: Write brief.md

Write `stories/{id}/brief.md`:

```markdown
# {Title} — Story Brief

## Setting
...

## Hook
...

## Player Role
...

## Arc Shape
...

## Endings
...

## Constraints
Length: ~N scenes
Stats: yes/no — list them
Flags: yes/no — examples

## Tone Reference
...

## Visual Feel
Broad mood — colours, atmosphere. Exact palette decided in Stage 1.

## Narrator Voice
Ideal-narrator description (tone, age, gender, accent, delivery) + chosen voice ID from `tts_voices/voices.yaml` (leaf-key under `narrator/`). Note any gap between ideal and available.

## Open Questions
Any unresolved decisions the author needs to make before Stage 1.
```

---

## Done when

- `brief.md` exists and all sections are filled
- "Open Questions" is empty or user has acknowledged they'll decide later
- Story ID and title are confirmed
- Narrator voice is chosen (or gap is acknowledged)
- **Hard confirmation from the user** that Stage 0 is complete before moving to Stage 1. Do not proceed without explicit sign-off.
