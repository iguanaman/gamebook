# Stage 0: Discovery

**Goal:** Understand the story and establish its visual identity. Outputs: `stories/{id}/brief.md` and `stories/{id}/theme.css`.

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
8. **Visual feel** — colours, fonts, mood (e.g. "amber on black like a terminal", "parchment and ink", "cold neon sci-fi")
9. **Narrator voice** — pick from `narrator/` voices in `tts_voices/voices.yaml` (e.g. `narrator_male_ron_perlman` for Fallout-style gravel; `narrator_male_wayne_june` for cosmic horror). Use the leaf-key ID exactly as it appears in the file — the audio script resolves it to `tts_voices/{voice_id}.wav`. Record the chosen ID in the brief. NPC voices are assigned later in Stage 3 (cast).

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
...

## Narrator Voice
TTS voice ID from `tts_voices/voices.yaml` (must be under `narrator/`)

## Open Questions
Any unresolved decisions the author needs to make before Stage 1.
```

---

## Step 3: Write theme.css

Translate the Visual Feel into `stories/{id}/theme.css`. Override all base CSS variables — a partial override lets the defaults bleed through.

Base variables (from `style.css`):

```css
--bg              /* page background */
--surface         /* card / panel surfaces */
--text            /* primary text */
--text-muted      /* secondary / dimmed text */
--border          /* borders and dividers */
--hover-bg        /* subtle hover highlight */
--accent          /* primary action colour */
--accent-hover
--btn-secondary-bg
--btn-secondary-hover
--radius
--font-body       /* serif stack — narrative and choices (default: EB Garamond) */
--font-ui         /* sans-serif stack — HUD, labels, buttons */
--font-heading    /* heading stack — act titles, HUD keys (default: Cinzel) */

/* Parchment frame */
--border-outer          /* outer ring colour */
--border-inner          /* inner ring colour */
--border-corner-radius  /* frame corner rounding */
--frame-inset           /* gap between frame and viewport edge */

/* Narrative / choices divider */
--divider-color         /* colour of the horizontal rule between text and choices */
--divider-style         /* full border shorthand, e.g. 2px solid var(--divider-color) */

/* Drop cap */
--drop-cap-color        /* colour of the large first letter (defaults to --accent) */
--drop-cap-size         /* size in em units (default: 3.5em) */

/* Act title */
--act-title-size        /* font size of act heading (default: 2rem) */
--act-rule-color        /* colour of decorative rules around act title */
--act-rule-style        /* full border shorthand for act rules */

/* Animations — override to slow down or speed up */
--anim-block-duration       /* text block fade+slide in (default: 350ms) */
--anim-choice-duration      /* choice list slide up (default: 300ms) */
--anim-act-title-duration   /* act title fade+scale (default: 600ms) */
--anim-choice-fade-duration /* unchosen choice fade (default: 250ms) */
```

Add a Google Fonts `@import` at the top if needed. Keep fonts readable at 16px — atmosphere is secondary to legibility.

Theme guidelines:
- **Dark/post-apoc (Fallout-style):** dark desaturated bg, amber/green text, monospace or slab-serif body
- **Gothic/horror:** near-black bg, deep red accent, old-style serif
- **Fantasy:** parchment bg, ink-brown text, humanist serif
- **Sci-fi:** dark navy, cyan/blue accent, clean sans-serif body

Present the palette to the user for approval before saving. Adjust if needed.

---

## Done when

- `brief.md` exists and all sections are filled
- "Open Questions" is empty or user has acknowledged they'll decide later
- `theme.css` exists with all variables overridden, user has approved the palette
- Story ID and title are confirmed
