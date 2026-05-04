# Intro Splash & Global Fullscreen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a one-time intro splash screen, a "How to play" re-trigger link on the selector, a globally-visible fullscreen button, and a consistent parchment frame on the selector screen.

**Architecture:** Three self-contained changes to `index.html`, `engine.js`, and `style.css`. No new files. The fullscreen button moves from dynamic HTML in `renderShell()` to a static element in `index.html`. The intro splash is a new `showIntroSplash(mode)` function that reuses existing `.story-splash` CSS classes.

**Tech Stack:** Vanilla JS, HTML, CSS. No dependencies. No build step.

---

### Task 1: Global fullscreen button + consistent parchment frame on selector

**Goal:** Move the fullscreen button to `index.html` so it's visible on all screens, align its position to the frame inset, and remove the grey `frame-neutral` override from the selector so both selector and game screens share the parchment frame.

**Files:**
- Modify: `index.html`
- Modify: `engine.js`
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] Fullscreen button appears on the selector screen, splash screens, and in-game
- [ ] Button position aligns with the frame border (uses `--frame-inset` not hardcoded `1rem`)
- [ ] Selector screen shows the parchment gold frame instead of grey
- [ ] No duplicate fullscreen button or listener when entering a story
- [ ] `fullscreenchange` listener is wired up once at boot, not per story start

**Verify:** Open `index.html` in a browser. Fullscreen button visible top-right. Selector has gold border frame. Click fullscreen — toggles. Start a story — button still there, no duplicate.

**Steps:**

- [ ] **Step 1: Add fullscreen button to `index.html`**

In `index.html`, add the button after the `<div id="frame"></div>` line:

```html
  <div id="frame"></div>
  <button id="fullscreen-btn" class="fullscreen-btn" title="Toggle fullscreen">⛶</button>
```

- [ ] **Step 2: Remove fullscreen button from `renderShell()` in `engine.js`**

In `engine.js`, find `renderShell()`. Remove the fullscreen button from the HUD template and remove its click listener and the `fullscreenchange` listener from that function.

Current `renderShell`:
```js
function renderShell(meta) {
  app.innerHTML = `
    <div class="hud-wrap">
      <button class="fullscreen-btn" id="fullscreen-btn" title="Toggle fullscreen">⛶</button>
    </div>
    ...
  `;
  ...
  document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
  document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    const btn = document.getElementById('fullscreen-btn');
    if (btn) btn.title = document.fullscreenElement ? 'Exit fullscreen' : 'Toggle fullscreen';
  });
}
```

Replace with:
```js
function renderShell(meta) {
  app.innerHTML = `
    <div class="hud-wrap">
    </div>
    <div class="game-wrap">
      <div class="narrative-area">
        <div class="narrative at-bottom" id="narrative"></div>
        <hr class="choices-divider choices-hidden" id="choices-divider">
        <div class="choices-footer" id="choices-footer"></div>
      </div>
    </div>
    <button class="btn-undo-fixed undo-disabled" id="btn-undo">↩</button>
  `;
  const narrative = document.getElementById('narrative');
  if (narrative) {
    const updateAtBottom = () => {
      const atBottom = narrative.scrollTop + narrative.clientHeight >= narrative.scrollHeight - 2;
      narrative.classList.toggle('at-bottom', atBottom);
    };
    narrative.addEventListener('scroll', updateAtBottom, { passive: true });
  }
  document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
}
```

- [ ] **Step 3: Add `initFullscreen()` and call it at boot**

Add this function near the top of `engine.js`, after the `app` constant:

```js
function initFullscreen() {
  const btn = document.getElementById('fullscreen-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    btn.title = document.fullscreenElement ? 'Exit fullscreen' : 'Toggle fullscreen';
  });
}
```

In the boot IIFE at the bottom of `engine.js`, add `initFullscreen()` as the first line:

```js
(async () => {
  initFullscreen();
  const last = localStorage.getItem('gamebook.lastStory');
  if (last && hasSave(last)) {
    startStory(last);
  } else {
    showSelector();
  }
})();
```

- [ ] **Step 4: Remove `frame-neutral` from `showSelector()`**

In `engine.js`, find `showSelector()`. Remove this line:

```js
document.getElementById('frame').classList.add('frame-neutral');
```

- [ ] **Step 5: Fix fullscreen button and HUD positioning in `style.css`**

Find `.fullscreen-btn` — it has no `position` set (it's currently inside `.hud-wrap` which is `position: fixed`). Now that it's a top-level element in `index.html`, it needs its own fixed positioning.

Add position rules to `.fullscreen-btn`:

```css
.fullscreen-btn {
  position: fixed;
  top: calc(var(--frame-inset) + 0.25rem);
  right: calc(var(--frame-inset) + 0.25rem);
  z-index: 400;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-muted);
  opacity: 0.45;
  padding: 0.25rem 0.35rem;
  line-height: 1;
  transition: opacity 0.2s;
}
```

Update `.hud-wrap` to use frame-inset-aligned positioning too:

```css
.hud-wrap {
  position: fixed;
  top: calc(var(--frame-inset) + 0.25rem);
  right: calc(var(--frame-inset) + 0.25rem);
  z-index: 10;
}
```

- [ ] **Step 6: Commit**

```bash
git add index.html engine.js style.css
git commit -m "feat: move fullscreen button to global fixture, parchment frame on selector"
```

---

### Task 2: Intro splash — CSS for paragraph layout

**Goal:** Extend `.story-splash` CSS to support a paragraph-based intro layout (the existing class assumes a single heading line).

**Files:**
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] `.intro-splash-body` styles paragraphs as readable centered text inside the splash
- [ ] `.intro-splash-btn` styles the CTA button (Begin / Close)
- [ ] `.intro-how-to-play` styles the selector "How to play" link

**Verify:** Classes exist in `style.css` — verify visually in Task 3.

**Steps:**

- [ ] **Step 1: Add intro splash CSS classes**

In `style.css`, after the `.story-splash-title` block (end of file or end of the splash section), add:

```css
/* ── Intro splash ─────────────────────────────────────────────────────────── */

.intro-splash-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 480px;
  padding: 0 2rem;
  text-align: center;
}

.intro-splash-body p {
  margin: 0;
  font-family: var(--font-body);
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.intro-splash-btn {
  margin-top: 0.5rem;
  padding: 0.6rem 1.8rem;
  font-family: var(--font-heading);
  font-size: 1rem;
  letter-spacing: 0.08em;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 0.15s;
}

.intro-splash-btn:hover {
  background: var(--accent-hover);
}

/* ── Selector how-to-play link ────────────────────────────────────────────── */

.intro-how-to-play {
  display: block;
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 2rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  cursor: pointer;
  text-decoration: none;
  background: none;
  border: none;
  font-family: var(--font-ui);
}

.intro-how-to-play:hover {
  text-decoration: underline;
}
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "feat: add intro splash and how-to-play CSS classes"
```

---

### Task 3: `showIntroSplash(mode)` function + boot gate + selector link

**Goal:** Implement the intro splash function, gate the boot sequence on `seen_intro`, and add the "How to play" link to the selector.

**Files:**
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] First-ever load shows the intro splash instead of story selector
- [ ] "Begin →" button on splash sets `gamebook.seen_intro` and transitions to selector
- [ ] Subsequent loads skip the splash and go straight to selector (or last story if saved)
- [ ] Selector shows "How to play" link beneath "Choose Your Story"
- [ ] Clicking "How to play" shows the splash with "Close ✕" button
- [ ] "Close ✕" dismisses the overlay without re-showing selector (it's already there)
- [ ] Splash fades in on show, fades out on dismiss

**Verify:** Open in browser. First load → splash visible. Click Begin → selector. Refresh → no splash. Click "How to play" → splash reappears with Close button. Click Close → returns to selector.

**Steps:**

- [ ] **Step 1: Add `showIntroSplash(mode)` to `engine.js`**

Add this function in `engine.js` in the Manifest / selector section, after `showSelector()`:

```js
function showIntroSplash(mode) {
  const isFirst = mode === 'first';
  const overlay = document.createElement('div');
  overlay.className = 'story-splash story-splash-hidden';

  const body = document.createElement('div');
  body.className = 'intro-splash-body';
  body.innerHTML = `
    <p>Stories wait for you here — each its own world, its own rules, its own consequences.</p>
    <p>Read the scene. Make your choices. Some doors close forever.</p>
    <p>Your progress is saved automatically.</p>
  `;

  const btn = document.createElement('button');
  btn.className = 'intro-splash-btn';
  btn.textContent = isFirst ? 'Begin →' : 'Close ✕';
  body.appendChild(btn);
  overlay.appendChild(body);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.remove('story-splash-hidden');
    overlay.classList.add('story-splash-visible');
  });

  function dismiss() {
    overlay.classList.remove('story-splash-visible');
    overlay.classList.add('story-splash-out');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    if (isFirst) {
      localStorage.setItem('gamebook.seen_intro', '1');
      showSelector();
    }
  }

  btn.addEventListener('click', dismiss);
}
```

- [ ] **Step 2: Gate the boot sequence on `seen_intro`**

In the boot IIFE at the bottom of `engine.js`, update so `seen_intro` is checked first — a brand-new user with no saved story should always see the splash:

```js
(async () => {
  initFullscreen();
  if (!localStorage.getItem('gamebook.seen_intro')) {
    showIntroSplash('first');
    return;
  }
  const last = localStorage.getItem('gamebook.lastStory');
  if (last && hasSave(last)) {
    startStory(last);
  } else {
    showSelector();
  }
})();
```

- [ ] **Step 3: Add "How to play" link to `showSelector()`**

In `showSelector()`, find the `app.innerHTML = ` block. Update the selector template to add the link beneath the `<h1>`:

```js
  app.innerHTML = `
    <div class="selector-bg">
      <div class="selector">
        <h1 class="selector-title">Choose Your Story</h1>
        <button class="intro-how-to-play" id="how-to-play">How to play</button>
        <div class="story-list">
          ${manifest.stories.length === 0
            ? '<p class="no-stories">No stories available yet.</p>'
            : manifest.stories.map(id => renderStoryCard(id)).join('')}
        </div>
      </div>
    </div>
  `;
```

After the `app.innerHTML` assignment (still inside `showSelector`), add the listener:

```js
  document.getElementById('how-to-play')?.addEventListener('click', () => showIntroSplash('revisit'));
```

- [ ] **Step 4: Commit**

```bash
git add engine.js
git commit -m "feat: add intro splash, first-load gate, and how-to-play link on selector"
```
