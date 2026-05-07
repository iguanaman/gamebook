# Stage 1: Structure

**Goal:** Define the act structure and overall narrative shape, and lock in the concrete commitments deferred from Stage 0 (visual theme). Outputs: `stories/{id}/structure.md` and `stories/{id}/theme.css`.

**Prerequisite:** `brief.md` must exist and be complete.

---

## Hands-off mode

Stage 0 was the question stage. From Stage 1 onward, run hands-off:

- **Do not ask the user questions.** Anything fundamental should already be in `brief.md`. If something is genuinely missing and blocks progress, make the most reasonable choice consistent with the brief, note it in the output, and continue.
- **Auto-fix issues.** If validation fails or a problem is found (broken cross-references, missing pieces, internal contradictions), fix it and keep going — don't halt for confirmation.
- Only stop and surface to the user if the brief is contradictory in a way no reasonable interpretation resolves. That should be rare; if it happens, it's a Stage 0 gap.

---

## What to do

Read `brief.md`. Then produce a high-level structure: acts, major turning points, and which endings branch off where.

Don't invent scene names or write prose yet. This is a skeleton — the shape the story hangs on.

Cover:

1. **Acts** — how many, what each one covers in a sentence
2. **Turning points** — the 2–4 moments where the story pivots (player makes a big choice, revelation lands, etc.)
3. **Branch map** — where the major forks are and what they lead toward (not scene IDs, just outcomes). Also identify:
   - **Hubs** — any location the player returns to repeatedly (tavern, city square, ship deck). Name them; they need to be designed as looping structures, not linear scenes.
   - **NPC conversations** — any NPC the player can question across multiple topics. These are hubs too — plan them as named nodes ("talk to the innkeeper"), not as individual exchanges.
4. **Ending paths** — which act/fork leads to which ending and roughly why
5. **Stats/flags in play** — which mechanics gate what, and when they matter. When planning flags, mark any that gate a **consumable choice** — a choice that should disappear after being taken (the merchant sold their last potion; the door was only unlocked once). These require deliberate `flags_unset` + `effects` pairing in scene YAML. A consumable choice that isn't planned is easy to forget, leaving the option available indefinitely. Also note which flags should be **player-visible** (shown in HUD — e.g. "Lantern", "Password to the vault") and which gated choices should **grey out** vs **stay hidden** when failed — grey out when the player should know the option exists; hide when the option's existence would be a spoiler.

If something in the brief is underspecified for structure (e.g. "multiple endings" but no sense of what differentiates them), make the most reasonable choice consistent with the brief, note it inline in `structure.md`, and continue — hands-off mode applies.

---

## Output

Write `stories/{id}/structure.md`:

```markdown
# {Title} — Structure

## Acts
- **Act 1 — {name}:** ...
- **Act 2 — {name}:** ...
- **Act 3 — {name}:** ...

## Turning Points
1. ...
2. ...
3. ...

## Branch Map
- Fork A (Act 1): leads to → [outcome]
- Fork B (Act 2): leads to → [outcome]

## Endings
- **Ending 1 — {name}:** reached via ... hinging on ...
- **Ending 2 — {name}:** ...

## Mechanics Summary
Stats: ...
Flags: ...
When they matter: ...
```

---

## Theme CSS

Translate the brief's Visual Feel into `stories/{id}/theme.css`. Override all base CSS variables — a partial override lets the defaults bleed through.

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
--anim-choice-fade-fast    /* unchosen choice fade (default: 250ms) */
--anim-choice-linger-ms    /* chosen choice linger before fade (default: 1200ms) */
--anim-choice-fade-slow    /* chosen choice fade (default: 500ms) */
```

Add a Google Fonts `@import` at the top if needed. Keep fonts readable at 16px — atmosphere is secondary to legibility.

Theme guidelines:
- **Dark/post-apoc (Fallout-style):** dark desaturated bg, amber/green text, monospace or slab-serif body
- **Gothic/horror:** near-black bg, deep red accent, old-style serif
- **Fantasy:** parchment bg, ink-brown text, humanist serif
- **Sci-fi:** dark navy, cyan/blue accent, clean sans-serif body

Pick the palette that best fits the brief's Visual Feel and write it. Hands-off — no approval round-trip.

---

## Done when

- `structure.md` exists with all sections filled
- Endings are distinct and each reachable from structure
- No act is a black box — each has a one-sentence purpose
- `theme.css` exists with all variables overridden, palette consistent with the brief's Visual Feel
