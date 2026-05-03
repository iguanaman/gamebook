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
6. **Constraints** — length target (short ~10 scenes, medium ~30, long ~60+), any mechanics (stats? flags?)
7. **Tone reference** — a book, game, or film this should feel like
8. **Visual feel** — colours, fonts, mood (e.g. "amber on black like a terminal", "parchment and ink", "cold neon sci-fi")

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
--font-body       /* serif stack — narrative and choices */
--font-ui         /* sans-serif stack — HUD, labels, buttons */
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
