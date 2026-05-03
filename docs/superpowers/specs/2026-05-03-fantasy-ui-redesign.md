# Fantasy UI Redesign — Design Spec
_2026-05-03_

## Overview

Overhaul the gamebook UI to feel like a fantasy novel: parchment viewport frame, accumulating narrative, fixed choices footer, drop caps, speech formatting, act titles with audio, and a full animation pass. All visual properties exposed as CSS variables so `theme.css` can override everything.

---

## Layout

### Viewport frame

A full-viewport parchment border wraps the entire page. Implemented as a `#frame` div covering the viewport with:
- Multi-ring border effect via CSS `border` + `outline` + `box-shadow` layering (no images required by default)
- Inset ~1.5rem from viewport edges, `position: fixed`, `pointer-events: none`, `z-index: 100`
- CSS variables: `--border-outer`, `--border-inner`, `--border-corner-radius`
- Stories can replace with image-based corners via `--border-corner-image` if desired

### Two-region game layout

Inside the frame, the game area is split into two regions:

1. **Narrative pane** (`#narrative`) — takes all available height above the choices footer. Scrolls independently (`overflow-y: auto`). New scene text appends to the bottom; pane auto-scrolls to bottom as blocks appear. Text accumulates across all scenes within an act.

2. **Choices footer** (`#choices-footer`) — fixed height at the bottom of the game area, always visible. Separated from the narrative by a decorative horizontal rule (`--divider-style`).

On act change or new game start, the narrative pane is cleared before the act title is injected.

---

## Typography

### Fonts

Default fantasy fonts loaded from Google Fonts:
- **Cinzel** — headings, act titles, HUD labels, button text
- **EB Garamond** — body narrative text, choice buttons

Exposed as CSS variables:
```css
--font-heading   /* Cinzel, serif */
--font-body      /* EB Garamond, serif */
--font-ui        /* system-ui (unchanged) */
```

Stage 0 `theme.css` should override these with story-appropriate fonts and include the required `@import`.

### Drop caps

First `<p>` of each scene's first block gets class `scene-opener`. The `:first-letter` pseudo-element is styled:
- Large (~3.5em), floated left, Cinzel font
- Color: `--drop-cap-color` (defaults to `--accent`)
- Line height adjusted to sit flush with body text

### Speech text

Dialogue blocks (keyed objects in `text:` array, e.g. `male1: "..."`) are rendered as:
- `font-style: italic`
- Wrapped in `"..."` automatically by the renderer
- Class `speech-block` for per-story styling

---

## Act Titles

### Scene YAML

Add optional `act:` field to scene YAML:
```yaml
act: "Act I — The Fallen City"
```

When present, the engine injects an act title block into the narrative stream before the scene text.

### Act title block HTML

```html
<div class="act-title" data-act="Act I — The Fallen City">
  <hr class="act-rule act-rule-top">
  <h2 class="act-heading">Act I — The Fallen City</h2>
  <hr class="act-rule act-rule-bottom">
</div>
```

Styled with Cinzel, large centered text, decorative rules. CSS variables: `--act-title-size`, `--act-rule-color`, `--act-rule-style`.

### Act title audio

The engine looks for `stories/{id}/audio/act_{slug}.opus` where `{slug}` is the act string lowercased, spaces replaced with underscores (e.g. `act_i_the_fallen_city.opus`).

Sequence:
1. Act title animates in (fade + scale)
2. Act title audio plays (if file exists; silently skipped if not)
3. After audio ends, wait `ACT_TITLE_PAUSE_MS` (default: 2000ms, JS constant)
4. First scene block audio begins, blocks reveal normally

`generate_audio.py` needs a separate pass for act titles (or a manual workflow — TBD in implementation).

### Act change detection

Engine tracks `currentAct` alongside scene state. When `navigateTo()` loads a scene with an `act:` value different from `currentAct`, it:
1. Clears the narrative pane
2. Injects the act title block
3. Updates `currentAct`
4. Proceeds with normal scene rendering

On new game, `currentAct` is null, so the first scene always triggers act title injection if `act:` is present.

---

## Animations

All timings exposed as CSS variables (and matching JS constants for sequencing):

| Variable | Default | Effect |
|---|---|---|
| `--anim-block-duration` | 350ms | Per text block fade+slide in |
| `--anim-choice-duration` | 300ms | Choice list slides up |
| `--anim-act-title-duration` | 600ms | Act title fade+scale |
| `--anim-choice-fade-duration` | 250ms | Unchosen choices fade to 20% |

### Text blocks
Each block `<p>` starts `opacity: 0; transform: translateY(8px)` and transitions to `opacity: 1; transform: none` — already partially implemented, will be polished.

### Choices
The `.choice-list` container starts `opacity: 0; transform: translateY(16px)` and slides up as a group when rendered. Individual choices do not stagger.

### Choice selection
On click:
1. Unchosen buttons transition to `opacity: 0.2` (not hidden — still visible as ghost)
2. Chosen button transitions to `opacity: 0` 
3. After fade completes, navigate to next scene

### Act title
Animates in: `opacity: 0; transform: scale(1.05)` → `opacity: 1; transform: scale(1)`.

---

## CSS Variables — Full Reference

New variables added to `:root` in `style.css`. All overridable in `theme.css`:

```css
/* Fonts */
--font-heading            /* act titles, HUD */
--font-body               /* narrative, choices */

/* Parchment frame */
--border-outer            /* outer ring color */
--border-inner            /* inner ring color */
--border-corner-radius    /* corner rounding */
--frame-inset             /* gap from viewport edge */

/* Divider */
--divider-color
--divider-style           /* e.g. 2px solid var(--divider-color) */

/* Drop cap */
--drop-cap-color
--drop-cap-size           /* em units */

/* Act title */
--act-title-size
--act-rule-color
--act-rule-style

/* Animations */
--anim-block-duration
--anim-choice-duration
--anim-act-title-duration
--anim-choice-fade-duration
```

Stage 0 doc (`docs/storycrafting/stage-0-discovery.md`) will be updated to include all new variables in its reference list.

---

## Stage 0 Update

The variable reference in stage 0 will be extended to include all new variables above. Stage 0 already generates a complete `theme.css` — this ensures act titles, borders, fonts, and animations are all part of the visual identity established at story creation time.

---

## Files Affected

- `style.css` — new variables, layout restructure, all new component styles
- `engine.js` — act tracking, narrative accumulation, act title injection, act audio, choice fade-on-select
- `index.html` — add Google Fonts `<link>`, add `#frame` div
- `docs/storycrafting/stage-0-discovery.md` — extend variable reference list
- `stories/demo/theme.css` — update with new variables (if exists)
