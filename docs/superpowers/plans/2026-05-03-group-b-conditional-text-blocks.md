# Group B: Conditional Text Blocks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow any text block in a scene to render conditionally based on flags, stats, or visit history (`if: visited`).

**Architecture:** Add `visited` (array of scene IDs) to engine state. At render time, evaluate each block's optional `if` condition; render `text`/voiced content if true, `else` if present and false, skip otherwise. Condition syntax mirrors existing `requires`. Audio generation deferred — conditional blocks get no audio for now.

**Tech Stack:** Vanilla JS (`engine.js`), YAML.

---

### Task 1: Add `visited` to state and persist it

**Goal:** Track which scenes have been visited so `if: visited` can be evaluated, with full undo support.

**Files:**
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] `state.visited` is an array of scene IDs, initialised as `[]` on new game
- [ ] `navigateTo()` adds `sceneId` to `state.visited` before loading the new scene (so a scene is "visited" the second time you arrive, not the first)
- [ ] `pushHistory()` snapshots `visited` so undo restores it
- [ ] `undo()` restores `visited` from the snapshot
- [ ] `visited` is persisted to localStorage via `saveState()`
- [ ] Loading a saved state restores `visited` (defaults to `[]` if absent for old saves)

**Verify:** Load the demo story. Visit start → path_a → undo → path_a again. Open DevTools console, run `JSON.parse(localStorage.getItem('gamebook.state.demo'))` — `visited` should contain `["start"]` (path_a is current scene, not in visited yet).

**Steps:**

- [ ] **Step 1: Add `visited` to `initState()`**

In `engine.js`, change `initState()`:

```js
function initState(storyId, startingStats) {
  currentStoryId = storyId;
  currentAct = null;
  state = { scene: null, stats: { ...startingStats }, flags: {}, visited: [], history: [] };
}
```

- [ ] **Step 2: Add `sceneId` to `visited` at the start of `navigateTo()`**

`navigateTo()` currently starts with `state.scene = sceneId`. Add visited tracking right after that, before `saveState()`:

```js
async function navigateTo(sceneId) {
  if (state.scene && !state.visited.includes(state.scene)) {
    state.visited.push(state.scene);
  }
  state.scene = sceneId;
  saveState();
  // ... rest unchanged
```

This pushes the *previous* scene into visited before moving to the new one. On first load `state.scene` is null so nothing is pushed.

- [ ] **Step 3: Snapshot `visited` in `pushHistory()`**

```js
function pushHistory() {
  state.history.push({
    scene: state.scene,
    stats: { ...state.stats },
    flags: { ...state.flags },
    visited: [...state.visited],
    act: currentAct
  });
}
```

- [ ] **Step 4: Restore `visited` in `undo()`**

```js
function undo() {
  if (state.history.length === 0) return false;
  const prev = state.history.pop();
  state.scene = prev.scene;
  state.stats = prev.stats;
  state.flags = prev.flags;
  state.visited = prev.visited ?? [];
  currentAct = prev.act ?? null;
  saveState();
  return true;
}
```

- [ ] **Step 5: Guard old saves in `startStory()`**

When restoring saved state, `visited` may be absent (old save). Ensure it defaults:

```js
if (saved) {
  state = saved;
  if (!Array.isArray(state.visited)) state.visited = [];
  currentAct = saved.act ?? null;
}
```

- [ ] **Step 6: Commit**

```bash
git add engine.js
git commit -m "feat: track visited scenes in state for conditional blocks"
```

---

### Task 2: Evaluate conditional blocks at render time

**Goal:** `renderNarrative()` evaluates each block's optional `if` condition and skips or substitutes blocks accordingly.

**Files:**
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] A plain string block (no `if`) renders as before
- [ ] A voice-tagged block (e.g. `{male1: "..."}`) with no `if` renders as before
- [ ] A block with `if: visited` renders its `text` only if `state.visited` includes the current scene ID
- [ ] A block with `if: {flags: [...]}` renders its `text` only if all flags are truthy
- [ ] A block with `if: {flags_unset: [...]}` renders its `text` only if all flags are falsy
- [ ] A block with `if: {stats: {key: min}}` renders its `text` if stat meets minimum
- [ ] A conditional block with an `else` field renders the `else` text when condition is false
- [ ] A conditional block with no `else` is skipped entirely when condition is false
- [ ] Voice-tagged content works inside conditional blocks: `{if: ..., male1: "..."}`
- [ ] `playBlocks()` receives the count of *rendered* blocks, not raw blocks

**Verify:** Add a conditional block to `stories/demo/scenes/start.yaml`:
```yaml
- if: visited
  text: "You've stood at this crossroads before."
  else: "First time at the crossroads."
```
First visit: "First time at the crossroads." appears. Navigate away, undo back — "You've stood at this crossroads before." appears.

**Steps:**

- [ ] **Step 1: Add `resolveBlock()` helper**

Add this function after `meetsRequirements()`:

```js
function resolveBlock(block, sceneId) {
  // Plain string — no condition
  if (typeof block === 'string') return { content: block, isSpeech: false };

  // Check for conditional: block has an 'if' key
  if ('if' in block) {
    const cond = block.if;
    let pass;
    if (cond === 'visited') {
      pass = state.visited.includes(sceneId);
    } else {
      pass = meetsRequirements(cond);
    }

    if (!pass) {
      // Condition failed — use else branch if present
      if (block.else === undefined) return null;
      return { content: block.else, isSpeech: false };
    }

    // Condition passed — content is in block.text or a voice key
    if (block.text !== undefined) return { content: block.text, isSpeech: false };
    // Voice-tagged: find the non-'if'/'else'/'text' key
    const voiceKey = Object.keys(block).find(k => k !== 'if' && k !== 'else' && k !== 'text');
    if (voiceKey) return { content: block[voiceKey], isSpeech: true };
    return null;
  }

  // Voice-tagged block (no condition): e.g. {male1: "..."}
  const key = Object.keys(block)[0];
  return { content: block[key], isSpeech: true };
}
```

- [ ] **Step 2: Update `renderNarrative()` to use `resolveBlock()`**

Replace the existing `blocks.forEach` in `renderNarrative()` with:

```js
function renderNarrative(scene) {
  const el = document.getElementById('narrative');
  if (!el) return;
  const rawBlocks = Array.isArray(scene.text) ? scene.text : [scene.text];

  currentNarrativeOffset = el.querySelectorAll('p').length;

  if (el.querySelector('p') !== null) {
    const sep = document.createElement('hr');
    sep.className = 'scene-separator';
    el.appendChild(sep);
  }

  const isFirstBlock = el.querySelector('p') === null;
  let renderedCount = 0;

  rawBlocks.forEach((b, i) => {
    const resolved = resolveBlock(b, scene.id);
    if (!resolved) return; // condition failed, no else

    const { content, isSpeech } = resolved;
    const isOpener = renderedCount === 0 && isFirstBlock;

    const html = content.replace(/\n\n/g, '</p><p>');
    const p = document.createElement('p');
    p.classList.add('block-hidden');
    if (isOpener) p.classList.add('scene-opener');
    if (isSpeech) {
      p.classList.add('speech-block');
      p.innerHTML = `"${html}"`;
    } else {
      p.innerHTML = html;
    }
    el.appendChild(p);
    renderedCount++;
  });

  // Store rendered count on the element so playBlocks gets the right number
  el.dataset.renderedBlocks = renderedCount;
}
```

- [ ] **Step 3: Pass rendered block count to `playBlocks()`**

`navigateTo()` currently passes `blocks.length` to `playBlocks()`. Change it to read from the rendered count:

```js
// After renderNarrative(scene):
const renderedBlockCount = parseInt(document.getElementById('narrative').dataset.renderedBlocks ?? '0', 10);
```

Then replace both `playBlocks(sceneId, blocks.length, ...)` calls in `navigateTo()` with `playBlocks(sceneId, renderedBlockCount, ...)`.

Full updated `navigateTo()`:

```js
async function navigateTo(sceneId) {
  if (state.scene && !state.visited.includes(state.scene)) {
    state.visited.push(state.scene);
  }
  state.scene = sceneId;
  saveState();

  const scene = await loadScene(currentStoryId, sceneId);
  renderHud();

  if (scene.act && scene.act !== currentAct) {
    currentAct = scene.act;
    saveState();
    injectActTitle(scene.act);
    renderNarrative(scene);
    const renderedBlockCount = parseInt(document.getElementById('narrative').dataset.renderedBlocks ?? '0', 10);
    playActTitleAudio(scene.act, () => {
      playBlocks(sceneId, renderedBlockCount,
        (i) => revealBlock(i),
        () => renderChoices(scene),
      );
    });
  } else {
    renderNarrative(scene);
    const renderedBlockCount = parseInt(document.getElementById('narrative').dataset.renderedBlocks ?? '0', 10);
    playBlocks(sceneId, renderedBlockCount,
      (i) => revealBlock(i),
      () => renderChoices(scene),
    );
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add engine.js
git commit -m "feat: evaluate conditional text blocks at render time"
```

---

### Task 3: Update template and stage-3 docs

**Goal:** Show conditional block syntax in the scene template and add authoring guidance in stage-3.

**Files:**
- Modify: `templates/scene.yaml`
- Modify: `docs/storycrafting/stage-3-scene-writing.md`

**Acceptance Criteria:**
- [ ] `templates/scene.yaml` includes commented conditional block examples covering `visited`, flags, and stats
- [ ] `docs/storycrafting/stage-3-scene-writing.md` has a "Conditional blocks" section with guidance and examples
- [ ] Guidance warns against using conditional blocks to gate critical plot information

**Verify:** Read both files — examples and guidance present.

**Steps:**

- [ ] **Step 1: Add conditional block examples to `templates/scene.yaml`**

After the multi-block form comment, add:

```yaml
# Conditional blocks — any block can have an 'if' condition
# Conditions mirror requires: flags, flags_unset, stats, or the built-in 'visited'
# text:
#   - "You enter the room."
#
#   # Visited: true on second+ visit
#   - if: visited
#     text: "The smell hits you first. You've been here before."
#     else: "Everything is still. You've never seen this place."
#
#   # Flag condition
#   - if: {flags: [perceptive]}
#     text: "You notice scratches on the wall — tool marks, deliberate."
#     else: "The walls are bare stone."
#
#   # Stat condition (no else — block simply absent if condition fails)
#   - if: {stats: {strength: 8}}
#     text: "The boulder looks moveable."
#
#   # Voice-tagged conditional block
#   - if: {flags: [knows_innkeeper]}
#     male1: "Ah, you again."
```

- [ ] **Step 2: Add conditional blocks section to `docs/storycrafting/stage-3-scene-writing.md`**

After the "NPC Voice" section (added in Group A Task 3), add:

```markdown
---

## Conditional Blocks

Any text block can render conditionally based on current state. Use the `if` key with the same syntax as choice `requires`.

```yaml
text:
  - "You enter the cave."
  - if: visited
    text: "The smell hits you first. You've been here before."
    else: "Everything is still and cold."
  - if: {flags: [perceptive]}
    text: "You notice scratches on the wall — tool marks, deliberate."
  - if: {stats: {strength: 8}}
    text: "The boulder looks moveable."
```

**`if: visited`** is true on any return visit to the scene. Use it for world-memory moments — the sense that the place remembers you.

**Use sparingly.** Every conditional branch is writing that must be worth the reader's time. If you write an `else`, both branches need to earn their place.

**Don't gate critical information.** If a conditional block is the only way a player learns something load-bearing, they may miss it entirely. Conditional blocks are for texture, not for plot gates — use choices with `requires` for that.
```

- [ ] **Step 3: Commit**

```bash
git add templates/scene.yaml docs/storycrafting/stage-3-scene-writing.md
git commit -m "docs: add conditional block examples to template and stage-3"
```
