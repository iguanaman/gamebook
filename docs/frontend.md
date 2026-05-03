# Frontend

## Layout

Two distinct views share the `#app` mount point — only one is ever visible:

**Selector** — centred single-column list of story cards. Each card shows cover art (optional), title, description, and a Play or Continue button.

**Game** — two-region layout inside a fixed viewport parchment frame:
- `#narrative` — scrollable pane, fills all available height. Text accumulates across scenes within an act; cleared on act change or undo.
- `#choices-footer` — pinned at the bottom, always visible. Separated from narrative by a decorative divider (`div.choices-divider`).
- HUD — fixed top-right, outside the game layout.
- `#frame` — fixed full-viewport decorative border (`pointer-events: none`, `z-index: 100`).

Width capped at 680px for readability.

## CSS Architecture

Single `style.css` defines defaults. Stories can override via `stories/{id}/theme.css` (loaded dynamically by the engine). All visual properties are CSS custom properties so `theme.css` gets full control.

**Full variable reference** (all overridable in `theme.css`):

| Group | Variables |
|---|---|
| Colours | `--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--hover-bg`, `--accent`, `--accent-hover`, `--btn-secondary-bg`, `--btn-secondary-hover` |
| Fonts | `--font-body` (EB Garamond, narrative + choices), `--font-heading` (Cinzel, act titles + HUD labels), `--font-ui` (system sans, buttons) |
| Frame | `--border-outer`, `--border-inner`, `--border-corner-radius`, `--frame-inset` |
| Divider | `--divider-color`, `--divider-style` |
| Drop cap | `--drop-cap-color`, `--drop-cap-size` |
| Act title | `--act-title-size`, `--act-rule-color`, `--act-rule-style` |
| Animations | `--anim-block-duration`, `--anim-choice-duration`, `--anim-act-title-duration`, `--anim-choice-fade-duration` |
| Misc | `--radius` |

## HUD

Fixed-position, top-right. Renders one `hud-stat` element per stat key in `state.stats`. Re-renders on every navigation. Hidden when on the selector screen. Uses `--font-heading` for stat labels.

## Narrative

Text accumulates in `#narrative` across scenes within an act. Each scene's text is appended (not replaced). A thin separator rule (`hr.scene-separator`) is inserted between scenes. On act change or undo, the pane is cleared before new content is added.

The `text` field is rendered as `<p>` elements — double newlines (`\n\n`) become `<p>` breaks. Multi-block scenes (list `text:`) produce separate paragraphs revealed one at a time as audio plays.

The first paragraph of each scene gets class `scene-opener` — its `::first-letter` is styled as a large drop cap in the heading font.

Dialogue blocks (keyed objects, e.g. `male1: "..."`) get class `speech-block` (italic) and are wrapped in `"..."`.

All blocks start with class `block-hidden` and are revealed via `block-visible` (fade + slide up) as their audio clip starts.

## Act Titles

If a scene has an `act:` field and it differs from the current act, the engine:
1. Clears `#narrative`
2. Injects a `.act-title` block: decorative rules above and below a centered heading
3. Animates it in (fade + scale via double-rAF)
4. Plays optional act audio then waits before starting scene blocks

The act title is part of the narrative scroll area, not a separate overlay.

## Choices

Choices are rendered as full-width left-aligned buttons in the serif body font — they read like prose options, not UI buttons. Choices that fail `requires` checks are not rendered at all.

The choice list (`.choice-list`) slides up as a group when rendered (opacity + translateY animation). On click, all buttons are immediately disabled; unchosen options fade to 20% opacity, the chosen option fades to 0%, then navigation fires after `--anim-choice-fade-duration`.

The Undo button sits below choices, ghost-styled. It is disabled (not hidden) when history is empty.

When a scene has no visible choices, the end-of-story state renders: an italic "— The End —" line, a Back to Stories button, and an Undo button.

## No JavaScript Framework

No React, Vue, Svelte, or similar. All UI is produced by DOM manipulation (`createElement`, `appendChild`, `innerHTML` for static shells). Event listeners are attached after each render with `querySelector` / `querySelectorAll`. There is no component lifecycle — renders are always full replacements or appends to a container.
