# Gamebook Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new standalone static-site gamebook engine at `D:\Work\github\iguanaman\gamebook` with multi-story support, LocalStorage state, undo history, and on-demand audio.

**Architecture:** Pure static site — `index.html` (story selector), `engine.js` (shared logic), `style.css` (adapted from text-adventure). Stories live under `stories/{id}/` with JSON scenes loaded on demand. State stored in LocalStorage, keyed per story.

**Tech Stack:** Vanilla JS/HTML/CSS, no build step, no dependencies, LocalStorage API, Web Audio (`<audio>` element).

**Repo:** `D:\Work\github\iguanaman\gamebook`

---

### Task 0: Repo scaffold

**Goal:** Create the new git repo with the base folder structure and adapted stylesheet.

**Files:**
- Create: `D:\Work\github\iguanaman\gamebook\` (git repo)
- Create: `style.css` (adapted from text-adventure)
- Create: `index.html` (story selector shell, no logic yet)
- Create: `engine.js` (empty module placeholder)
- Create: `.gitignore`
- Create: `stories/` directory with `.gitkeep`

**Acceptance Criteria:**
- [ ] `git init` done, initial commit exists
- [ ] `index.html` opens in browser without errors
- [ ] `style.css` loaded, dark theme visible
- [ ] Folder structure matches spec

**Steps:**

- [ ] **Step 1: Init repo and create folder structure**

```bash
mkdir -p D:/Work/github/iguanaman/gamebook/stories
cd D:/Work/github/iguanaman/gamebook
git init
touch stories/.gitkeep
```

- [ ] **Step 2: Create `.gitignore`**

```
.DS_Store
Thumbs.db
tmp/
*.log
```

- [ ] **Step 3: Copy and adapt `style.css`**

Copy `D:\Work\github\iguanaman\text-adventure\public\style.css` to `style.css`. Strip out any styles specific to the three-panel layout (left/right sidebar, log lines, SSE indicators, map panel). Keep: CSS variables, dark theme base, typography, scrollbar, button styles.

- [ ] **Step 4: Create `index.html` shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gamebook</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app"></div>
  <script src="engine.js"></script>
</body>
</html>
```

- [ ] **Step 5: Create empty `engine.js`**

```js
// Gamebook engine entry point
```

- [ ] **Step 6: Initial commit**

```bash
git add .
git commit -m "chore: initial repo scaffold"
```

---

### Task 1: Story selector screen

**Goal:** Render a story selection screen that lists all available stories from a manifest, shows cover art and a Play/Continue button per story.

**Files:**
- Modify: `engine.js`
- Modify: `index.html`
- Modify: `style.css`
- Create: `stories/manifest.json`

**Acceptance Criteria:**
- [ ] `stories/manifest.json` lists story IDs
- [ ] Each story card shows title, description, cover image
- [ ] Button says "Play" if no saved state, "Continue" if saved state exists
- [ ] Clicking "Play" (or "New Game" after confirm) clears saved state and starts story
- [ ] Clicking "Continue" resumes from saved state

**Steps:**

- [ ] **Step 1: Create `stories/manifest.json`**

```json
{
  "stories": []
}
```

This will be populated as stories are added. Engine loads this on startup to discover available stories.

- [ ] **Step 2: Add selector rendering to `engine.js`**

```js
const app = document.getElementById('app');

async function loadManifest() {
  const res = await fetch('stories/manifest.json');
  return res.json();
}

async function showSelector() {
  const manifest = await loadManifest();
  app.innerHTML = `
    <div class="selector">
      <h1 class="selector-title">Choose Your Story</h1>
      <div class="story-list">
        ${manifest.stories.length === 0
          ? '<p class="no-stories">No stories available yet.</p>'
          : manifest.stories.map(id => renderStoryCard(id)).join('')}
      </div>
    </div>
  `;
  // Attach click handlers after render
  manifest.stories.forEach(id => attachCardHandlers(id));
}

function hasSave(storyId) {
  return !!localStorage.getItem(`gamebook.state.${storyId}`);
}

async function loadStoryMeta(storyId) {
  const res = await fetch(`stories/${storyId}/story.json`);
  return res.json();
}

function renderStoryCard(storyId) {
  const saved = hasSave(storyId);
  return `
    <div class="story-card" data-story="${storyId}">
      <img class="story-cover" src="stories/${storyId}/images/cover.jpg" alt="" onerror="this.style.display='none'">
      <div class="story-info">
        <h2 class="story-title" data-story-title="${storyId}">Loading...</h2>
        <p class="story-desc" data-story-desc="${storyId}"></p>
        <div class="story-actions">
          ${saved
            ? `<button class="btn btn-primary" data-action="continue" data-story="${storyId}">Continue</button>
               <button class="btn btn-secondary" data-action="new" data-story="${storyId}">New Game</button>`
            : `<button class="btn btn-primary" data-action="play" data-story="${storyId}">Play</button>`}
        </div>
      </div>
    </div>
  `;
}

async function attachCardHandlers(storyId) {
  // Load and inject story metadata into card
  try {
    const meta = await loadStoryMeta(storyId);
    const titleEl = document.querySelector(`[data-story-title="${storyId}"]`);
    const descEl = document.querySelector(`[data-story-desc="${storyId}"]`);
    if (titleEl) titleEl.textContent = meta.title;
    if (descEl) descEl.textContent = meta.description;
  } catch (e) { /* story.json missing — skip */ }

  document.querySelectorAll(`[data-story="${storyId}"]`).forEach(btn => {
    if (!btn.dataset.action) return;
    btn.addEventListener('click', () => handleCardAction(btn.dataset.action, storyId));
  });
}

function handleCardAction(action, storyId) {
  if (action === 'new') {
    if (!confirm('Start a new game? Your current progress will be lost.')) return;
    localStorage.removeItem(`gamebook.state.${storyId}`);
  }
  startStory(storyId);
}

// Placeholder — implemented in Task 2
function startStory(storyId) {
  console.log('startStory', storyId);
}

showSelector();
```

- [ ] **Step 3: Add selector styles to `style.css`**

```css
/* Selector */
.selector { max-width: 800px; margin: 0 auto; padding: 2rem; }
.selector-title { text-align: center; margin-bottom: 2rem; }
.story-list { display: flex; flex-direction: column; gap: 1.5rem; }
.no-stories { text-align: center; opacity: 0.5; }
.story-card { display: flex; gap: 1.5rem; padding: 1.5rem; border: 1px solid var(--border); border-radius: 4px; }
.story-cover { width: 120px; height: 160px; object-fit: cover; border-radius: 2px; flex-shrink: 0; }
.story-info { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
.story-title { margin: 0; }
.story-desc { margin: 0; opacity: 0.7; flex: 1; }
.story-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
```

- [ ] **Step 4: Open `index.html` in browser, verify selector renders with "No stories available yet."**

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: story selector screen"
```

---

### Task 2: State management

**Goal:** Implement the state module — load, save, clear, undo — with LocalStorage persistence.

**Files:**
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] `initState(storyId, startingStats)` creates fresh state
- [ ] `saveState()` persists to LocalStorage
- [ ] `loadState(storyId)` restores from LocalStorage, returns null if none
- [ ] `pushHistory()` snapshots current state before each transition
- [ ] `undo()` pops last history entry and restores it, returns false if history empty
- [ ] State shape: `{ scene, stats, flags, history }`

**Steps:**

- [ ] **Step 1: Add state module to `engine.js`**

```js
// ── State ────────────────────────────────────────────────────────────────────

let currentStoryId = null;
let state = null;

function stateKey(storyId) {
  return `gamebook.state.${storyId}`;
}

function initState(storyId, startingStats) {
  currentStoryId = storyId;
  state = { scene: null, stats: { ...startingStats }, flags: {}, history: [] };
}

function saveState() {
  localStorage.setItem(stateKey(currentStoryId), JSON.stringify(state));
}

function loadState(storyId) {
  const raw = localStorage.getItem(stateKey(storyId));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function pushHistory() {
  state.history.push({
    scene: state.scene,
    stats: { ...state.stats },
    flags: { ...state.flags }
  });
}

function undo() {
  if (state.history.length === 0) return false;
  const prev = state.history.pop();
  state.scene = prev.scene;
  state.stats = prev.stats;
  state.flags = prev.flags;
  saveState();
  return true;
}

function setFlag(key, value = true) {
  state.flags[key] = value;
}

function applyEffects(effects) {
  if (!effects) return;
  if (effects.stats) {
    for (const [k, delta] of Object.entries(effects.stats)) {
      state.stats[k] = (state.stats[k] ?? 0) + delta;
    }
  }
  if (effects.flags) {
    for (const [k, v] of Object.entries(effects.flags)) {
      state.flags[k] = v;
    }
  }
}

function meetsRequirements(requires) {
  if (!requires) return true;
  if (requires.flags) {
    for (const flag of requires.flags) {
      if (!state.flags[flag]) return false;
    }
  }
  if (requires.stats) {
    for (const [k, min] of Object.entries(requires.stats)) {
      if ((state.stats[k] ?? 0) < min) return false;
    }
  }
  return true;
}
```

- [ ] **Step 2: Commit**

```bash
git add engine.js
git commit -m "feat: state management module"
```

---

### Task 3: Scene loading and rendering

**Goal:** Load scene JSON on demand and render narrative text, stats HUD, and choices.

**Files:**
- Modify: `engine.js`
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] `startStory(storyId)` loads `story.json`, initialises or restores state, navigates to current scene
- [ ] `navigateTo(sceneId)` fetches `stories/{id}/scenes/{sceneId}.json` and renders it
- [ ] Narrative text rendered in main content area
- [ ] Stats HUD rendered top-right with current stat values
- [ ] Choices rendered as buttons, hidden if `requires` not met
- [ ] Dead-end scene (no choices) shows "The End" message

**Steps:**

- [ ] **Step 1: Add scene loading and game shell to `engine.js`**

```js
// ── Game shell ────────────────────────────────────────────────────────────────

async function startStory(storyId) {
  const meta = await loadStoryMeta(storyId);
  currentStoryId = storyId;

  const saved = loadState(storyId);
  if (saved) {
    state = saved;
  } else {
    initState(storyId, meta.stats ?? {});
    state.scene = meta.start;
    saveState();
  }

  renderShell(meta);
  await navigateTo(state.scene);
}

function renderShell(meta) {
  app.innerHTML = `
    <div class="hud" id="hud"></div>
    <div class="game-wrap">
      <div class="narrative-area">
        <div class="narrative" id="narrative"></div>
        <div class="choices" id="choices"></div>
      </div>
    </div>
  `;
}

async function loadScene(storyId, sceneId) {
  const res = await fetch(`stories/${storyId}/scenes/${sceneId}.json`);
  if (!res.ok) throw new Error(`Scene not found: ${sceneId}`);
  return res.json();
}

async function navigateTo(sceneId) {
  state.scene = sceneId;
  saveState();

  const scene = await loadScene(currentStoryId, sceneId);
  renderHud();
  renderNarrative(scene);
  renderChoices(scene);
  playAudio(scene);
}

function renderHud() {
  const hud = document.getElementById('hud');
  if (!hud) return;
  hud.innerHTML = Object.entries(state.stats)
    .map(([k, v]) => `<span class="hud-stat"><span class="hud-key">${k}</span><span class="hud-val">${v}</span></span>`)
    .join('');
}

function renderNarrative(scene) {
  const el = document.getElementById('narrative');
  if (!el) return;
  el.innerHTML = `<p>${scene.text.replace(/\n\n/g, '</p><p>')}</p>`;
  el.scrollTop = 0;
}

function renderChoices(scene) {
  const el = document.getElementById('choices');
  if (!el) return;

  const visible = (scene.choices ?? []).filter(c => meetsRequirements(c.requires));

  if (visible.length === 0) {
    el.innerHTML = `
      <p class="end-message">— The End —</p>
      <button class="btn btn-secondary" id="btn-selector">Back to Stories</button>
      <button class="btn btn-secondary" id="btn-undo">↩ Undo</button>
    `;
    document.getElementById('btn-selector')?.addEventListener('click', () => showSelector());
    document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
    return;
  }

  el.innerHTML = `
    <div class="choice-list">
      ${visible.map((c, i) => `<button class="btn btn-choice" data-index="${i}">${c.text}</button>`).join('')}
    </div>
    <div class="choice-meta">
      <button class="btn btn-ghost" id="btn-undo" ${state.history.length === 0 ? 'disabled' : ''}>↩ Undo</button>
    </div>
  `;

  visible.forEach((choice, i) => {
    el.querySelector(`[data-index="${i}"]`).addEventListener('click', () => handleChoice(choice, scene));
  });
  document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
}

async function handleChoice(choice, scene) {
  pushHistory();
  applyEffects(choice.effects);
  saveState();
  await navigateTo(choice.next);
}

async function handleUndo() {
  const ok = undo();
  if (!ok) return;
  await navigateTo(state.scene);
}
```

- [ ] **Step 2: Add game layout styles to `style.css`**

```css
/* HUD */
.hud {
  position: fixed;
  top: 1rem;
  right: 1.5rem;
  display: flex;
  gap: 1rem;
  z-index: 10;
}
.hud-stat { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
.hud-key { font-size: 0.65rem; text-transform: uppercase; opacity: 0.5; letter-spacing: 0.05em; }
.hud-val { font-size: 1rem; font-weight: bold; }

/* Game wrap */
.game-wrap {
  display: flex;
  justify-content: center;
  padding: 3rem 1rem 2rem;
  min-height: 100vh;
  box-sizing: border-box;
}
.narrative-area {
  width: min(680px, 100%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Narrative */
.narrative { line-height: 1.8; font-size: 1.05rem; }
.narrative p { margin: 0 0 1em; }

/* Choices */
.choice-list { display: flex; flex-direction: column; gap: 0.75rem; }
.btn-choice {
  text-align: left;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-choice:hover { background: var(--hover-bg); }
.choice-meta { margin-top: 1rem; display: flex; justify-content: flex-end; }
.btn-ghost { background: transparent; border: none; opacity: 0.4; cursor: pointer; }
.btn-ghost:hover:not(:disabled) { opacity: 0.8; }
.btn-ghost:disabled { cursor: default; }
.end-message { text-align: center; opacity: 0.5; font-style: italic; margin-bottom: 1rem; }
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: scene loading and rendering"
```

---

### Task 4: Audio playback

**Goal:** Play pre-generated narration audio on scene load, stop previous audio on navigation.

**Files:**
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] Scene with `audio` field plays on navigation
- [ ] Scene without `audio` field plays nothing
- [ ] Previous audio stops when navigating to a new scene
- [ ] Audio loads on demand (no preload)

**Steps:**

- [ ] **Step 1: Add audio module to `engine.js`**

```js
// ── Audio ─────────────────────────────────────────────────────────────────────

let currentAudio = null;

function playAudio(scene) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
  if (!scene.audio) return;
  currentAudio = new Audio(`stories/${currentStoryId}/${scene.audio}`);
  currentAudio.play().catch(() => { /* autoplay blocked — silent fail */ });
}
```

- [ ] **Step 2: Verify `navigateTo` already calls `playAudio(scene)` — it does (Task 3 Step 1)**

- [ ] **Step 3: Commit**

```bash
git add engine.js
git commit -m "feat: on-demand audio playback"
```

---

### Task 5: Demo story

**Goal:** Author a minimal demo story (3–5 scenes) to verify the full engine works end-to-end.

**Files:**
- Create: `stories/demo/story.json`
- Create: `stories/demo/scenes/start.json`
- Create: `stories/demo/scenes/path_a.json`
- Create: `stories/demo/scenes/path_b.json`
- Create: `stories/demo/scenes/end.json`
- Modify: `stories/manifest.json`

**Acceptance Criteria:**
- [ ] Demo story appears on selector screen
- [ ] Can navigate through all scenes
- [ ] Conditional choice works (requires a flag set by an effect)
- [ ] Stat change works (gold decreases on a choice)
- [ ] Undo works — stepping back restores previous scene and stats
- [ ] Dead-end scene shows "The End"
- [ ] Save persists across page reload (refresh and land back in same scene)

**Steps:**

- [ ] **Step 1: Create `stories/manifest.json`**

```json
{
  "stories": ["demo"]
}
```

- [ ] **Step 2: Create `stories/demo/story.json`**

```json
{
  "id": "demo",
  "title": "The Crossroads",
  "description": "A short demo — a traveller at a fork in the road.",
  "cover": "images/cover.jpg",
  "start": "start",
  "stats": {
    "gold": 10,
    "stamina": 20
  }
}
```

- [ ] **Step 3: Create `stories/demo/scenes/start.json`**

```json
{
  "id": "start",
  "text": "You stand at a crossroads as dusk falls. The road splits ahead — left toward the forest, right toward the village. A merchant sits by a fire nearby.\n\nHe eyes your coin purse.",
  "choices": [
    { "text": "Take the road to the forest", "next": "path_a" },
    { "text": "Take the road to the village", "next": "path_b" },
    { "text": "Buy a lantern from the merchant (5 gold)", "next": "start_with_lantern", "requires": { "stats": { "gold": 5 } }, "effects": { "stats": { "gold": -5 }, "flags": { "has_lantern": true } } }
  ]
}
```

- [ ] **Step 4: Create `stories/demo/scenes/start_with_lantern.json`**

```json
{
  "id": "start_with_lantern",
  "text": "You hand over five gold coins and receive a battered tin lantern. Its flame catches immediately. The merchant nods and returns to his fire.\n\nThe crossroads waits.",
  "choices": [
    { "text": "Take the road to the forest", "next": "path_a" },
    { "text": "Take the road to the village", "next": "path_b" }
  ]
}
```

- [ ] **Step 5: Create `stories/demo/scenes/path_a.json`**

```json
{
  "id": "path_a",
  "text": "The forest road is dark and close. Roots catch your feet. Something rustles in the undergrowth — then goes silent.\n\nDeep in the trees you find a clearing. At its centre, a stone altar. On the altar: a sealed letter.",
  "choices": [
    { "text": "Take the letter and press on", "next": "end", "effects": { "flags": { "has_letter": true } } },
    { "text": "Leave it. Turn back.", "next": "end" }
  ]
}
```

- [ ] **Step 6: Create `stories/demo/scenes/path_b.json`**

```json
{
  "id": "path_b",
  "text": "The village road opens onto warm light and woodsmoke. The inn is full — a festival, someone explains. Strangers buy you a drink.\n\nBy midnight your purse is lighter, but you know the name of every person in the room.",
  "choices": [
    { "text": "Stay the night", "next": "end", "effects": { "stats": { "gold": -2, "stamina": 5 } } },
    { "text": "Press on through the night", "next": "end", "effects": { "stats": { "stamina": -3 } } }
  ]
}
```

- [ ] **Step 7: Create `stories/demo/scenes/end.json`**

```json
{
  "id": "end",
  "text": "The road ahead stretches into the unknown. Whatever you carry — a letter, a lantern, a head full of names — it will matter soon enough.\n\nFor now, you walk.",
  "choices": []
}
```

- [ ] **Step 8: Open browser, play through the demo, verify all acceptance criteria manually**

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: demo story for engine validation"
```

---

### Task 6: Polish and CSS variables

**Goal:** Ensure the stylesheet has the correct CSS variables and the layout looks clean with the demo story.

**Files:**
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] `--border`, `--hover-bg`, and other variables used in engine CSS are defined
- [ ] Dark theme applies cleanly
- [ ] Narrative is readable, choices are clearly tappable
- [ ] HUD is unobtrusive

**Steps:**

- [ ] **Step 1: Verify CSS variables exist in `style.css` — add any missing ones**

At minimum these must be defined (add to `:root` if missing from the ported stylesheet):

```css
:root {
  --border: #333;
  --hover-bg: rgba(255,255,255,0.05);
}
```

- [ ] **Step 2: Verify body background, text color, font are set from the ported stylesheet**

Check that `body` has `background`, `color`, and `font-family` set. If the ported stylesheet has them already, no change needed.

- [ ] **Step 3: Manual visual check — open demo, read through, verify nothing looks broken**

- [ ] **Step 4: Commit if any changes were made**

```bash
git add style.css
git commit -m "fix: css variable coverage and layout polish"
```
