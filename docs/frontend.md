# Frontend

## Layout

Two distinct views share the `#app` mount point — only one is ever visible:

**Selector** — centred single-column list of story cards. Each card shows cover art (optional), title, description, and a Play or Continue button.

**Game** — fixed HUD top-right, centred narrative column below. No sidebar, no chrome. Width capped at 680px for readability.

## CSS Architecture

Single `style.css` file. Light theme via CSS custom properties on `:root`:

| Variable | Purpose |
|---|---|
| `--bg` | Page background |
| `--surface` | Card / button surfaces |
| `--text` | Primary text |
| `--text-muted` | Secondary / dimmed text |
| `--border` | Borders and dividers |
| `--hover-bg` | Subtle hover highlight |
| `--accent` | Primary action colour |

Two font stacks: `--font-body` (serif, used for narrative and choice buttons) and `--font-ui` (sans-serif, used for HUD, meta buttons, labels).

## HUD

Fixed-position, top-right. Renders one `hud-stat` element per stat key in `state.stats`. Re-renders on every navigation. Hidden when on the selector screen.

## Narrative

The scene `text` field is rendered as paragraphs — double newlines (`\n\n`) in the YAML become `<p>` breaks. No markdown parsing.

## Choices

Choices are rendered as full-width left-aligned buttons using the serif body font — they read like prose options, not UI buttons. Choices that fail `requires` checks are not rendered at all (no disabled state shown to the player).

The Undo button sits below choices, ghost-styled. It is disabled (not hidden) when history is empty.

When a scene has no visible choices, the end-of-story state renders: an italic "— The End —" line, a Back to Stories button, and an Undo button.

## No JavaScript Framework

No React, Vue, Svelte, or similar. All UI is produced by string interpolation into `innerHTML`. Event listeners are attached after each render with `querySelector` / `querySelectorAll`. There is no component lifecycle — renders are always full replacements of a container.
