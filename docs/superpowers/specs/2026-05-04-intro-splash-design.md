# Intro Splash & Global Fullscreen — Design Spec

## Overview

Three related changes:
1. A one-time intro splash shown on first load explaining what the app is and how to play
2. A "How to play" link on the story selector that re-shows the splash
3. The fullscreen button promoted from in-game-only to a persistent global fixture visible on all screens

---

## 1. Global Fullscreen Button

**Current state:** The fullscreen button (`⛶`) is rendered inside `renderShell()` as part of the in-game HUD. It does not appear on the selector screen or any splash screen.

**Change:** Move the button into `index.html` as a persistent fixed-position element, alongside the existing journal toggle. Remove it from `renderShell()`.

- Position: fixed, top-right corner (or consistent with existing floating UI)
- Styling: reuse `.fullscreen-btn` — no visual change
- The `fullscreenchange` listener moves to a one-time `initFullscreen()` call on engine startup, not re-attached per story load
- The button updates its title/icon on fullscreen state change as it does today

---

## 2. Intro Splash — First Load

**Trigger:** On engine init, check `localStorage.getItem('gamebook.seen_intro')`. If absent, call `showIntroSplash('first')` instead of `showSelector()`.

**Visual:** Full-screen overlay using the existing `.story-splash` pattern — dark background, centered content, fade-in animation. No heading.

**Copy:**

> Stories wait for you here — each its own world, its own rules, its own consequences.
>
> Read the scene. Make your choices. Some doors close forever.
>
> Your progress is saved automatically.

**Button:** Single CTA — "Begin →"
- Sets `localStorage.setItem('gamebook.seen_intro', '1')`
- Fades the overlay out
- Calls `showSelector()`

---

## 3. "How to Play" Link on Selector

A subtle text link rendered directly under the "Choose Your Story" heading in `showSelector()`.

- Label: "How to play"
- Style: small, muted — `font-size: 0.85rem`, `color: var(--text-muted)`, no underline by default, underline on hover
- Click: calls `showIntroSplash('revisit')`

**Revisit mode differences:**
- Button label: "Close ✕" instead of "Begin →"
- Does NOT set `seen_intro` (already set)
- On dismiss: fades out only — `showSelector()` is already rendered behind it

---

## Implementation Shape

### `index.html`
- Add `<button class="fullscreen-btn" id="fullscreen-btn" ...>⛶</button>` as a top-level fixed element
- Remove from `renderShell()` in `engine.js`

### `engine.js`
- `initFullscreen()` — one-time setup of fullscreen button click handler + `fullscreenchange` listener
- `showIntroSplash(mode)` — renders overlay, `mode: 'first' | 'revisit'` controls button label and dismiss behaviour
- Engine init (bottom of file): check `seen_intro`, branch to `showIntroSplash('first')` or `showSelector()`
- `showSelector()`: add "How to play" link beneath the `<h1>`, wire click to `showIntroSplash('revisit')`

### `style.css`
- `.intro-how-to-play` — small muted link style for the selector text link
- `.story-splash` already handles the overlay; may need minor tweaks for paragraph text layout (currently assumes a single heading line)

---

## Non-Goals

- No animation differences between first/revisit modes
- No per-story "how to play" content
- No changes to the existing `showTitleSplash()` function
