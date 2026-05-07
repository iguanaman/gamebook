# Frontend

## Layout

Two mode roots crossfade between each other — `#menu-root` and `#story-root`. Both share the same decorative frame (`<div class="frame">` inside each root, styled by `.mode-root .frame` in `style.css`). The frame is `pointer-events: none`, `z-index: 5`, inset from the viewport edge by `--frame-inset`, with a 3px outer border + 2px outline (inner ring) and corner rounding from `--border-corner-radius` (defined globally on `body`, **not** intended to be overridden per story — see "Frame is shared" below).

**Menu mode** — centred single-column list of story cards. Each card shows cover art (optional), title, description, and a Play or Continue button. Has a `<canvas id="dust-canvas">` particle effect inside the frame.

**Story mode** — narrative + choices inside the same frame:
- `.narrative-area` — scrollable pane, fills all available height. Cleared on every scene navigation; text starts at top, scrolls to bottom as blocks appear.
- `.choices-footer` — pinned below narrative, hidden (divider invisible) while text is streaming, revealed when choices are ready.
- HUD (`.hud-wrap`) — absolute top-right, outside the game wrap.
- Journal slides in from the left (`.journal-clip` / `.journal-panel`).

Width capped at 680px for readability.

## CSS file map

`style.css` is one file divided into 8 numbered sections. Header comments (`/* ── N. Name ── */`) mark each boundary — search for `── 4.` to jump to section 4. Use this map before scanning the file:

| § | Name | What's in it |
|---|---|---|
| 1 | Reset + body | Box-sizing reset, `html`/`body` defaults, the global CSS variables defined on `body` (fonts, frame inset, chrome offsets, radii). |
| 2 | Shared base | Typography (`h1`–`h3`), `.btn` / `.btn-secondary` / `.btn-ghost`, scrollbar styling for `.selector` and `.narrative-area`. |
| 3 | Mode roots | `.mode-root` crossfade machinery (`mode-hidden`, `mode-content`, `boot-no-fade`). |
| 4 | Frame | `.mode-root .frame` — the shared decorative screen border. **Shared between menu and story; do not override per-mode.** |
| 5 | Splash | All splash screens (menu splash, story title splash, intro splash, pre-intro). `.splash`, `.splash-title`, `.intro-splash-body`, `#dust-canvas`, splash transition classes. |
| 6 | Chrome layer | `#chrome-root` and its children: fullscreen button, back button, hint tooltips. Lives above both modes. |
| 7 | Menu mode | Everything scoped to `#menu-root`: palette overrides, `.selector`, `.story-card` and its hover/delete/fade states, commission screen, card pop-in animation. |
| 8 | Story mode | Everything scoped to `#story-root`: palette overrides, `.hud-wrap`, `.narrative` + drop cap, `.choice-list` / `.btn-choice`, `.choice-num`, undo confirm, end message, journal panel + backdrop + music toggle. |

Mode-specific palette variables (colours, accent, etc.) are defined inside §7 (`#menu-root`) and §8 (`#story-root`), not in §1. The global vars on `body` are only the ones that must stay consistent across both modes.

## CSS Architecture

Single `style.css` defines defaults. Stories can override via `stories/{id}/theme.css` (loaded dynamically by the engine, scoped to `#story-root`). All visual properties are CSS custom properties so `theme.css` gets full control — **except** the variables listed under "Frame is shared" below, which apply to the screen border and must stay consistent across menu and story.

**Full variable reference**:

| Group | Variables | Theme-overridable? |
|---|---|---|
| Colours | `--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--hover-bg`, `--accent`, `--accent-hover`, `--btn-secondary-bg`, `--btn-secondary-hover` | yes |
| Fonts | `--font-body` (EB Garamond, narrative + choices), `--font-heading` (Cinzel, act titles + HUD labels), `--font-ui` (system sans, buttons) | yes |
| Frame colour | `--border-outer`, `--border-inner` | yes |
| Frame shape | `--border-corner-radius`, `--frame-inset` | **no — shared** |
| Divider | `--divider-color`, `--divider-style` | yes |
| Drop cap | `--drop-cap-color`, `--drop-cap-size` | yes |
| Act title | `--act-title-size`, `--act-rule-color`, `--act-rule-style` | yes |
| Animations | `--anim-block-duration`, `--anim-choice-duration`, `--anim-act-title-duration`, `--anim-choice-fade-fast`, `--anim-choice-linger-ms`, `--anim-choice-fade-slow` | yes |
| Misc | `--radius` | yes |

## Frame is shared

The decorative screen border is the same element in menu and story modes — both render `<div class="frame">` inside their mode root, both styled by the single `.mode-root .frame` rule. **Do not** add a per-mode override to `.frame`, and **do not** override `--border-corner-radius` or `--frame-inset` in a story `theme.css` — that would make the screen border visually different between menu and story, which is jarring during the crossfade. Themes may recolour the frame (`--border-outer`, `--border-inner`) but corner shape and inset are app-wide.

## HUD

Fixed-position, top-right. Re-renders on every navigation. Hidden on the selector screen. Uses `--font-heading` for labels.

**Stats** — one `hud-stat` element per key in `state.stats`.

**Knowledge flags** — flags declared in `story.yaml` under `flags:` with `visible: true` that are currently `true` in state render as `hud-flag` elements to the right of stats, separated by a `hud-divider`. Each shows its `label` string. The section is absent when no visible flags are currently true.

## Narrative

Each scene clears `#narrative` and starts fresh. Text appends top-to-bottom; the pane auto-scrolls to the bottom as each block appears.

The `text` field is rendered as `<p>` elements — double newlines (`\n\n`) become `<p>` breaks. Multi-block scenes (list `text:`) produce separate paragraphs revealed one at a time as audio plays.

The first paragraph of each scene gets class `scene-opener` — its `::first-letter` is styled as a large drop cap in the heading font.

Dialogue blocks (keyed objects, e.g. `male1: "..."`) get class `speech-block` (italic) and are wrapped in `"..."`.

All blocks start with class `block-hidden` and are revealed via `block-visible` (fade + slide up) as their audio clip starts.

## Act Titles

When the engine first enters a new act folder (e.g. `act1/`), it loads `_act.yaml` from that folder and reads its `title`. If the title differs from the current act, the engine:
1. Clears `#narrative`
2. Injects a `.act-title` block: decorative rules above and below a centered heading
3. Animates it in (fade + scale via double-rAF)
4. Plays optional act audio then waits before starting scene blocks

The act title is part of the narrative scroll area, not a separate overlay.

## Choices

Choices are rendered as full-width left-aligned buttons in the serif body font — they read like prose options, not UI buttons.

Choices that fail `requires` checks are rendered as disabled greyed-out buttons (`.btn-choice-failed`) with failure text below the choice label, unless `hide_if_failed: true` hides them entirely. Failure text comes from `failed_text` on the choice, or is auto-generated from the `requires` shape (e.g. `*(Requires: gold ≥ 5)*`).

The choices-footer is hidden (divider invisible) while blocks are streaming. When choices are ready, the divider fades in and the choice list (`.choice-list`) slides up from below (opacity + translateY animation). On click, all buttons are immediately disabled; unchosen options fade out fast (`--anim-choice-fade-fast`), the chosen option lingers (`--anim-choice-linger-ms`) then fades out (`--anim-choice-fade-slow`), then navigation fires.

The Undo button sits below choices, ghost-styled. It is disabled (not hidden) when history is empty.

When a scene has no visible choices, the end-of-story state renders: an italic "— The End —" line, a Back to Stories button, and an Undo button.

## No JavaScript Framework

No React, Vue, Svelte, or similar. All UI is produced by DOM manipulation (`createElement`, `appendChild`, `innerHTML` for static shells). Event listeners are attached after each render with `querySelector` / `querySelectorAll`. There is no component lifecycle — renders are always full replacements or appends to a container.
