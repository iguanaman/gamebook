# Fantasy UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the gamebook UI with a parchment viewport frame, accumulating narrative, fixed choices footer, fantasy typography, drop caps, speech formatting, act titles with audio, and polished animations — all fully overridable via CSS variables in `theme.css`.

**Architecture:** Three files change — `index.html` (font import + frame div), `style.css` (complete restyle with CSS variables), `engine.js` (narrative accumulation, act tracking, act title injection + audio, choice fade-on-select). One doc update to stage-0 discovery to expose new CSS variables to story authors.

**Tech Stack:** Vanilla JS, CSS custom properties, Google Fonts (Cinzel + EB Garamond), Web Audio API (existing pattern).

---

### Task 1: Google Fonts + CSS variables foundation

**Goal:** Add fantasy fonts to `index.html` and establish all new CSS variables in `style.css` with sensible defaults — no visual change yet beyond font swap.

**Files:**
- Modify: `index.html`
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] Cinzel and EB Garamond load from Google Fonts
- [ ] All new CSS variables defined on `:root` with defaults
- [ ] `--font-heading` uses Cinzel, `--font-body` uses EB Garamond
- [ ] Existing layout still works (no regressions)

**Verify:** Open in browser → narrative text renders in EB Garamond, no layout breakage.

**Steps:**

- [ ] **Step 1: Add Google Fonts import to `index.html`**

Replace the existing `<link rel="stylesheet" href="style.css">` line with:

```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
```

- [ ] **Step 2: Add all new CSS variables to `:root` in `style.css`**

After the existing `:root` block variables, add:

```css
  /* Fantasy typography */
  --font-heading: 'Cinzel', serif;
  --font-body: 'EB Garamond', Georgia, serif;

  /* Parchment frame */
  --border-outer: #8b6914;
  --border-inner: #c9a84c;
  --border-corner-radius: 4px;
  --frame-inset: 1.5rem;

  /* Narrative / choices divider */
  --divider-color: #c9a84c;
  --divider-style: 2px solid var(--divider-color);

  /* Drop cap */
  --drop-cap-color: var(--accent);
  --drop-cap-size: 3.5em;

  /* Act title */
  --act-title-size: 2rem;
  --act-rule-color: var(--divider-color);
  --act-rule-style: 1px solid var(--act-rule-color);

  /* Animations */
  --anim-block-duration: 350ms;
  --anim-choice-duration: 300ms;
  --anim-act-title-duration: 600ms;
  --anim-choice-fade-duration: 250ms;
```

- [ ] **Step 3: Switch existing font references to use new variables**

In `style.css`, replace:
- `font-family: Georgia, 'Times New Roman', serif;` → `font-family: var(--font-body);`
- The `--font-body` variable definition in `:root` → remove (now set above)
- `--font-ui: system-ui, -apple-system, sans-serif;` → keep as-is

Update `h1, h2, h3` selector:
```css
h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: normal;
  margin: 0 0 0.5em;
  line-height: 1.3;
}
```

Update `.hud-key`:
```css
.hud-key { font-size: 0.6rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; font-family: var(--font-heading); }
```

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add fantasy fonts and CSS variable foundation"
```

---

### Task 2: Viewport parchment frame

**Goal:** Add the fixed full-viewport decorative frame as a non-interactive overlay.

**Files:**
- Modify: `index.html`
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] `#frame` div renders as a fixed border around the entire viewport
- [ ] Frame uses multi-ring effect (outer + inner border colors)
- [ ] Frame does not intercept clicks (`pointer-events: none`)
- [ ] Frame inset controlled by `--frame-inset`
- [ ] `--border-outer`, `--border-inner`, `--border-corner-radius` control appearance

**Verify:** Open in browser → decorative gold/brown frame visible around viewport edge, all clicks pass through.

**Steps:**

- [ ] **Step 1: Add `#frame` div to `index.html`**

Add immediately inside `<body>`, before `<div id="app">`:

```html
<body>
  <div id="frame"></div>
  <div id="app"></div>
  <script src="engine.js"></script>
</body>
```

- [ ] **Step 2: Add `#frame` styles to `style.css`**

Add after the scrollbar section:

```css
/* ── Viewport frame ───────────────────────────────────────────────────────── */

#frame {
  position: fixed;
  inset: var(--frame-inset);
  border: 3px solid var(--border-outer);
  outline: 2px solid var(--border-inner);
  outline-offset: -6px;
  border-radius: var(--border-corner-radius);
  box-shadow:
    inset 0 0 0 8px var(--bg),
    0 0 0 2px var(--border-outer);
  pointer-events: none;
  z-index: 100;
}
```

- [ ] **Step 3: Commit**

```bash
git add index.html style.css
git commit -m "feat: add viewport parchment frame"
```

---

### Task 3: Two-region game layout (narrative pane + fixed choices footer)

**Goal:** Restructure the game layout so the narrative scrolls independently in its own pane and choices are always pinned at the bottom, separated by a decorative divider.

**Files:**
- Modify: `style.css`
- Modify: `engine.js` (update `renderShell` HTML structure)

**Acceptance Criteria:**
- [ ] Narrative pane fills available height and scrolls independently
- [ ] Choices footer is always visible at bottom of game area
- [ ] Decorative divider separates the two regions
- [ ] Layout is contained within the parchment frame (doesn't overflow behind it)
- [ ] `renderShell` outputs `#choices-footer` not `#choices`

**Verify:** Open in browser, navigate to a story — narrative text visible above, choices pinned at bottom with divider line between them.

**Steps:**

- [ ] **Step 1: Update `renderShell` in `engine.js`**

Replace the existing `renderShell` function:

```js
function renderShell(meta) {
  app.innerHTML = `
    <div class="game-wrap">
      <div class="narrative-area">
        <div class="narrative" id="narrative"></div>
        <div class="choices-divider"></div>
        <div class="choices-footer" id="choices-footer"></div>
      </div>
    </div>
  `;
}
```

- [ ] **Step 2: Update all references from `#choices` to `#choices-footer` in `engine.js`**

In `renderChoices`, change:
```js
const el = document.getElementById('choices-footer');
```

- [ ] **Step 3: Rewrite game layout CSS in `style.css`**

Replace the existing `.game-wrap` and `.narrative-area` rules:

```css
/* ── Game layout ──────────────────────────────────────────────────────────── */

.game-wrap {
  display: flex;
  justify-content: center;
  padding: calc(var(--frame-inset) + 1.5rem) 1rem;
  min-height: 100vh;
  box-sizing: border-box;
}

.narrative-area {
  width: min(680px, 100%);
  height: calc(100vh - (var(--frame-inset) + 1.5rem) * 2);
  display: flex;
  flex-direction: column;
}

.narrative {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  line-height: 1.85;
  font-size: 1.05rem;
}

.narrative p { margin: 0 0 1em; }

.choices-divider {
  flex-shrink: 0;
  border: none;
  border-top: var(--divider-style);
  margin: 0.75rem 0;
  opacity: 0.6;
}

.choices-footer {
  flex-shrink: 0;
  padding-bottom: 0.5rem;
}
```

- [ ] **Step 4: Remove old `.narrative` rule** (now merged above — delete the old standalone `.narrative` block from `style.css`)

- [ ] **Step 5: Commit**

```bash
git add style.css engine.js
git commit -m "feat: two-region layout with scrolling narrative and fixed choices footer"
```

---

### Task 4: Narrative accumulation across scenes

**Goal:** Text accumulates in the narrative pane across scenes within an act, instead of replacing on each navigation. Auto-scrolls to new content.

**Files:**
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] Navigating to a new scene appends text to `#narrative` rather than replacing it
- [ ] Narrative pane auto-scrolls to bottom when new blocks appear
- [ ] Narrative pane is NOT cleared between scenes within the same act
- [ ] A scene separator (thin rule) is injected between scenes within the same act

**Verify:** Play through two scenes in a row — both scenes' text visible in the pane, second scene appended below first with a separator.

**Steps:**

- [ ] **Step 1: Update `renderNarrative` in `engine.js` to append instead of replace**

Replace the existing `renderNarrative` function:

```js
function renderNarrative(scene) {
  const el = document.getElementById('narrative');
  if (!el) return;
  const blocks = Array.isArray(scene.text) ? scene.text : [scene.text];

  // Add scene separator if narrative already has content
  if (el.children.length > 0) {
    const sep = document.createElement('hr');
    sep.className = 'scene-separator';
    el.appendChild(sep);
  }

  const isFirstBlock = el.children.length === 0 || (el.children.length === 1 && el.children[0].tagName === 'HR');

  blocks.forEach((b, i) => {
    const text = typeof b === 'string' ? b : Object.values(b)[0];
    const isSpeech = typeof b === 'object';
    const isOpener = i === 0 && isFirstBlock;

    const html = text.replace(/\n\n/g, '</p><p>');
    const p = document.createElement('p');
    if (i > 0) p.classList.add('block-hidden');
    if (isOpener) p.classList.add('scene-opener');
    if (isSpeech) {
      p.classList.add('speech-block');
      p.innerHTML = `"${html}"`;
    } else {
      p.innerHTML = html;
    }
    el.appendChild(p);
  });
}
```

- [ ] **Step 2: Update `revealBlock` to scroll to the revealed block**

Replace:

```js
function revealBlock(index) {
  const paras = document.querySelectorAll('#narrative p');
  if (paras[index]) {
    paras[index].classList.remove('block-hidden');
    paras[index].classList.add('block-visible');
    paras[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
```

- [ ] **Step 3: Remove the old `el.scrollTop = 0` from `renderNarrative`** (already removed in Step 1 since we rewrote the function)

- [ ] **Step 4: Add scene separator style to `style.css`**

```css
.scene-separator {
  border: none;
  border-top: 1px solid var(--border);
  opacity: 0.3;
  margin: 1.25rem 0;
}
```

- [ ] **Step 5: Commit**

```bash
git add engine.js style.css
git commit -m "feat: narrative accumulates across scenes within act"
```

---

### Task 5: Drop caps and speech styling

**Goal:** First paragraph of each scene gets a large drop cap. Speech blocks render italic in quotes.

**Files:**
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] `.scene-opener:first-letter` renders large (~3.5em), floated left, in Cinzel
- [ ] Drop cap color is `--drop-cap-color`
- [ ] `.speech-block` renders italic
- [ ] Speech blocks already wrapped in `"..."` by `renderNarrative` (done in Task 4)

**Verify:** Open demo story — first paragraph of each scene has a large decorative initial letter. Merchant dialogue appears italic and quoted.

**Steps:**

- [ ] **Step 1: Add drop cap styles to `style.css`**

```css
/* ── Drop cap ─────────────────────────────────────────────────────────────── */

.scene-opener::first-letter {
  font-family: var(--font-heading);
  font-size: var(--drop-cap-size);
  font-weight: 600;
  color: var(--drop-cap-color);
  float: left;
  line-height: 0.75;
  margin: 0.05em 0.08em 0 0;
}
```

- [ ] **Step 2: Add speech block styles to `style.css`**

```css
/* ── Speech ───────────────────────────────────────────────────────────────── */

.speech-block {
  font-style: italic;
}
```

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: drop caps for scene openers, italic speech blocks"
```

---

### Task 6: Act titles — injection, styling, animation

**Goal:** Engine detects `act:` field on scenes, clears the narrative pane on act change, and injects a styled act title block with fade+scale animation.

**Files:**
- Modify: `engine.js`
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] `currentAct` tracked in engine (module-level variable)
- [ ] Scene with `act:` different from `currentAct` triggers narrative clear + act title injection
- [ ] Act title block HTML matches spec (`.act-title > .act-rule-top + .act-heading + .act-rule-bottom`)
- [ ] Act title animates in: `opacity: 0; transform: scale(1.05)` → `opacity: 1; transform: scale(1)`
- [ ] `currentAct` resets to `null` when a new game starts

**Verify:** Add `act: "Act I"` to `stories/demo/scenes/start.yaml`, load demo story — act title appears before narrative text with animation.

**Steps:**

- [ ] **Step 1: Add `currentAct` variable to `engine.js`**

After the `let state = null;` line, add:

```js
let currentAct = null;
```

- [ ] **Step 2: Reset `currentAct` in `initState`**

```js
function initState(storyId, startingStats) {
  currentStoryId = storyId;
  currentAct = null;
  state = { scene: null, stats: { ...startingStats }, flags: {}, history: [] };
}
```

Also reset in `loadState` path — after `state = saved;` in `startStory`:

```js
if (saved) {
  state = saved;
  currentAct = saved.act ?? null;
}
```

- [ ] **Step 3: Persist `currentAct` in state**

In `saveState`, include `currentAct`:
```js
function saveState() {
  localStorage.setItem(stateKey(currentStoryId), JSON.stringify({ ...state, act: currentAct }));
}
```

- [ ] **Step 4: Add `injectActTitle` function to `engine.js`**

```js
function injectActTitle(actText) {
  const el = document.getElementById('narrative');
  if (!el) return;
  el.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'act-title act-title-hidden';
  div.dataset.act = actText;
  div.innerHTML = `
    <hr class="act-rule act-rule-top">
    <h2 class="act-heading">${actText}</h2>
    <hr class="act-rule act-rule-bottom">
  `;
  el.appendChild(div);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      div.classList.remove('act-title-hidden');
      div.classList.add('act-title-visible');
    });
  });
}
```

- [ ] **Step 5: Call `injectActTitle` from `navigateTo` when act changes**

In `navigateTo`, after fetching the scene and before `renderNarrative`, add:

```js
async function navigateTo(sceneId) {
  state.scene = sceneId;
  saveState();

  const scene = await loadScene(currentStoryId, sceneId);
  renderHud();

  if (scene.act && scene.act !== currentAct) {
    currentAct = scene.act;
    saveState();
    injectActTitle(scene.act);
    // Act audio + pause handled in Task 7
    renderNarrative(scene);
  } else {
    renderNarrative(scene);
  }

  const blocks = Array.isArray(scene.text) ? scene.text : [scene.text];
  playBlocks(sceneId, blocks.length,
    (i) => revealBlock(i),
    () => renderChoices(scene),
  );
}
```

- [ ] **Step 6: Add act title styles to `style.css`**

```css
/* ── Act title ────────────────────────────────────────────────────────────── */

.act-title {
  text-align: center;
  padding: 2rem 0 1.5rem;
}

.act-title-hidden {
  opacity: 0;
  transform: scale(1.05);
}

.act-title-visible {
  opacity: 1;
  transform: scale(1);
  transition: opacity var(--anim-act-title-duration) ease,
              transform var(--anim-act-title-duration) ease;
}

.act-heading {
  font-family: var(--font-heading);
  font-size: var(--act-title-size);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0.75rem 0;
}

.act-rule {
  border: none;
  border-top: var(--act-rule-style);
  margin: 0 2rem;
  opacity: 0.6;
}
```

- [ ] **Step 7: Commit**

```bash
git add engine.js style.css
git commit -m "feat: act title injection with fade+scale animation"
```

---

### Task 7: Act title audio + post-audio delay

**Goal:** Engine plays act title audio (if present) after the title animates in, then waits `ACT_TITLE_PAUSE_MS` before starting scene block audio.

**Files:**
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] `ACT_TITLE_PAUSE_MS` constant defined (default 2000)
- [ ] Engine constructs slug from act string (`"Act I — The Fallen City"` → `act_i_the_fallen_city`)
- [ ] Looks for `stories/{id}/audio/{slug}.opus`, plays if found, silently skips if not
- [ ] After audio ends (or if not found), waits `ACT_TITLE_PAUSE_MS` then starts scene blocks
- [ ] Normal scenes (no act change) play blocks immediately as before

**Verify:** Place a test `.opus` file at `stories/demo/audio/act_i.opus` (after adding `act: "Act I"` to start scene) — file plays after title appears, scene text starts ~2s later.

**Steps:**

- [ ] **Step 1: Add `ACT_TITLE_PAUSE_MS` constant to `engine.js`**

After the audio section constants, add:

```js
const ACT_TITLE_PAUSE_MS = 2000;
```

- [ ] **Step 2: Add `actAudioSlug` helper to `engine.js`**

```js
function actAudioSlug(actText) {
  return actText.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}
```

- [ ] **Step 3: Add `playActTitleAudio` function to `engine.js`**

```js
function playActTitleAudio(actText, onDone) {
  const slug = actAudioSlug(actText);
  const url = `stories/${currentStoryId}/audio/${slug}.opus`;
  const audio = new Audio(url);
  audio.addEventListener('ended', () => setTimeout(onDone, ACT_TITLE_PAUSE_MS), { once: true });
  audio.play().catch(() => setTimeout(onDone, ACT_TITLE_PAUSE_MS));
}
```

- [ ] **Step 4: Wire act audio into `navigateTo`**

Update the act-change branch in `navigateTo` to delay scene block playback until after act audio:

```js
  if (scene.act && scene.act !== currentAct) {
    currentAct = scene.act;
    saveState();
    injectActTitle(scene.act);
    renderNarrative(scene);
    const blocks = Array.isArray(scene.text) ? scene.text : [scene.text];
    playActTitleAudio(scene.act, () => {
      playBlocks(sceneId, blocks.length,
        (i) => revealBlock(i),
        () => renderChoices(scene),
      );
    });
  } else {
    renderNarrative(scene);
    const blocks = Array.isArray(scene.text) ? scene.text : [scene.text];
    playBlocks(sceneId, blocks.length,
      (i) => revealBlock(i),
      () => renderChoices(scene),
    );
  }
```

Remove the `playBlocks` call that was previously after the if/else (it's now inside both branches).

- [ ] **Step 5: Commit**

```bash
git add engine.js
git commit -m "feat: act title audio with post-audio delay before scene blocks"
```

---

### Task 8: Animations — blocks, choices slide-in, choice fade-on-select

**Goal:** Polish all animations: block reveal (fade+slide), choice list slide-up as group, and on-choice fade (unchosen → 20%, chosen → 0%).

**Files:**
- Modify: `style.css`
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] Text blocks fade in and slide up using `--anim-block-duration`
- [ ] Choice list slides up as a group using `--anim-choice-duration`
- [ ] On choice click: unchosen buttons fade to `opacity: 0.2`, chosen button fades to `opacity: 0`
- [ ] Navigation happens after the fade animation completes
- [ ] Animation timings match CSS variables (JS reads computed style for the delay)

**Verify:** Play demo — text reveals smoothly, choices slide up, clicking a choice ghosts the others and fades the chosen one before scene changes.

**Steps:**

- [ ] **Step 1: Update block animation CSS in `style.css`**

Replace the existing `#narrative p.block-hidden` / `#narrative p.block-visible` rules:

```css
#narrative p.block-hidden {
  opacity: 0;
  transform: translateY(8px);
}

#narrative p.block-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--anim-block-duration) ease,
              transform var(--anim-block-duration) ease;
}
```

- [ ] **Step 2: Add choice list animation CSS to `style.css`**

```css
.choice-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(16px);
}

.choice-list.choices-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--anim-choice-duration) ease,
              transform var(--anim-choice-duration) ease;
}
```

- [ ] **Step 3: Trigger choice list animation in `renderChoices` in `engine.js`**

After building the choice list HTML in `renderChoices`, add the animation trigger:

```js
  const choiceList = el.querySelector('.choice-list');
  if (choiceList) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => choiceList.classList.add('choices-visible'));
    });
  }
```

- [ ] **Step 4: Add choice fade-on-select to `engine.js`**

Update the click handler in `renderChoices`:

```js
  visible.forEach((choice, i) => {
    el.querySelector(`[data-index="${i}"]`).addEventListener('click', (e) => {
      const allBtns = el.querySelectorAll('.btn-choice');
      const fadeDuration = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--anim-choice-fade-duration')
      ) || 250;

      allBtns.forEach(btn => {
        btn.style.transition = `opacity ${fadeDuration}ms ease`;
        btn.style.opacity = btn === e.currentTarget ? '0' : '0.2';
      });

      setTimeout(() => handleChoice(choice), fadeDuration);
    });
  });
```

- [ ] **Step 5: Add transition styles for choice buttons in `style.css`**

Update `.btn-choice`:

```css
.btn-choice {
  text-align: left;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 1rem;
  border-radius: var(--radius);
  transition: background 0.12s;
}
```

- [ ] **Step 6: Commit**

```bash
git add style.css engine.js
git commit -m "feat: polished animations for blocks, choices slide-in, choice fade-on-select"
```

---

### Task 9: Update stage-0-discovery.md with new CSS variables

**Goal:** Extend the variable reference list in stage 0 so the storycraft AI knows to override all new variables when generating `theme.css`.

**Files:**
- Modify: `docs/storycrafting/stage-0-discovery.md`

**Acceptance Criteria:**
- [ ] All new CSS variables from the spec appear in the stage 0 variable reference
- [ ] Each variable has a brief comment explaining its role
- [ ] Existing variables unchanged

**Verify:** Read the file — new variables present with descriptions.

**Steps:**

- [ ] **Step 1: Extend the variable list in `docs/storycrafting/stage-0-discovery.md`**

In the "Base variables" code block in Step 3, replace the existing block with:

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

- [ ] **Step 2: Commit**

```bash
git add docs/storycrafting/stage-0-discovery.md
git commit -m "docs: add new CSS variables to stage-0 theme reference"
```

---

### Task 10: Demo story — add act field + theme.css

**Goal:** Wire up the demo story to exercise the new features: add `act:` to the start scene, create a `theme.css` with all variables set.

**Files:**
- Modify: `stories/demo/scenes/start.yaml`
- Create: `stories/demo/theme.css`

**Acceptance Criteria:**
- [ ] `stories/demo/scenes/start.yaml` has `act: "Act I"` at the top level
- [ ] `stories/demo/theme.css` exists and overrides all CSS variables
- [ ] Demo story renders with act title on load and on new game

**Verify:** Load demo story in browser — "Act I" title appears with animation, then narrative text begins.

**Steps:**

- [ ] **Step 1: Add `act:` to `stories/demo/scenes/start.yaml`**

Add at the top of the file, after `id: start`:

```yaml
id: start
act: "Act I"
text:
```

- [ ] **Step 2: Create `stories/demo/theme.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

:root {
  --bg: #f5f0e8;
  --surface: #faf7f2;
  --text: #2c1f0e;
  --text-muted: #7a6650;
  --border: #c9b89a;
  --hover-bg: rgba(139, 90, 43, 0.06);
  --accent: #6b3a1f;
  --accent-hover: #4e2a14;
  --btn-secondary-bg: #ede4d4;
  --btn-secondary-hover: #ddd0bc;
  --radius: 3px;
  --font-body: 'EB Garamond', Georgia, serif;
  --font-heading: 'Cinzel', serif;
  --font-ui: system-ui, -apple-system, sans-serif;

  --border-outer: #8b6914;
  --border-inner: #c9a84c;
  --border-corner-radius: 4px;
  --frame-inset: 1.5rem;

  --divider-color: #c9a84c;
  --divider-style: 2px solid var(--divider-color);

  --drop-cap-color: var(--accent);
  --drop-cap-size: 3.5em;

  --act-title-size: 2rem;
  --act-rule-color: var(--divider-color);
  --act-rule-style: 1px solid var(--act-rule-color);

  --anim-block-duration: 350ms;
  --anim-choice-duration: 300ms;
  --anim-act-title-duration: 600ms;
  --anim-choice-fade-duration: 250ms;
}
```

- [ ] **Step 3: Commit**

```bash
git add stories/demo/scenes/start.yaml stories/demo/theme.css
git commit -m "feat: demo story theme.css and act title"
```
