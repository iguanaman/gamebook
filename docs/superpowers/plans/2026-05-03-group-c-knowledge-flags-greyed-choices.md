# Group C: Knowledge Flags + Greyed Choices Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface declared visible flags in the HUD as "knowledge" items, and render failed `requires` checks as greyed-out choices with flavour text instead of hiding them.

**Architecture:** `story.yaml` gains a `flags` section with per-flag metadata. On story start, this metadata is loaded and stored alongside `storyMeta`. `renderHud()` reads it to render visible flags. `renderChoices()` splits choices into passing and failing; failing choices with `hide_if_failed: true` are dropped, others render as disabled buttons with failure text. `style.css` adds disabled choice styling.

**Tech Stack:** Vanilla JS (`engine.js`), CSS (`style.css`), YAML.

---

### Task 1: Load flag metadata from `story.yaml`

**Goal:** Parse the optional `flags` section from `story.yaml` and make it available at render time.

**Files:**
- Modify: `engine.js`

**Acceptance Criteria:**
- [ ] `storyMeta` variable stores the loaded story metadata (title, stats, flags, etc.)
- [ ] `storyMeta.flags` is available after `startStory()` completes — an object keyed by flag name, or `{}` if absent
- [ ] Stories without a `flags` section work unchanged

**Verify:** Add a `flags` section to `stories/demo/story.yaml` with `has_lantern: {label: "Lantern", visible: true}`. Open DevTools, run `storyMeta.flags` in console — returns the object.

**Steps:**

- [ ] **Step 1: Add `storyMeta` module-level variable**

In `engine.js`, after `let currentAct = null;`, add:

```js
let storyMeta = null;
```

- [ ] **Step 2: Store meta in `startStory()`**

In `startStory()`, after `const meta = await loadStoryMeta(storyId);`, add:

```js
storyMeta = meta;
if (!storyMeta.flags) storyMeta.flags = {};
```

- [ ] **Step 3: Commit**

```bash
git add engine.js
git commit -m "feat: store story metadata including flag definitions"
```

---

### Task 2: Render visible flags in the HUD

**Goal:** The HUD shows a "knowledge" section below stats listing visible flags that are currently true.

**Files:**
- Modify: `engine.js`
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] Flags declared with `visible: true` and currently `true` in `state.flags` appear in the HUD
- [ ] Each visible flag shows its `label` text
- [ ] The knowledge section is absent when no visible flags are currently true
- [ ] The knowledge section is visually distinct from stats (separated, different styling)
- [ ] Flags not declared in `storyMeta.flags`, or declared without `visible: true`, never appear

**Verify:** Add `flags: {has_lantern: {label: "Lantern", visible: true}}` to `stories/demo/story.yaml`. Start demo, buy the lantern — "Lantern" appears in HUD. Navigate to another scene — still there. New game — gone.

**Steps:**

- [ ] **Step 1: Update `renderHud()` to include knowledge flags**

Replace `renderHud()` in `engine.js`:

```js
function renderHud() {
  const hud = document.getElementById('hud');
  if (!hud) return;

  const statsHtml = Object.entries(state.stats)
    .map(([k, v]) => `<span class="hud-stat"><span class="hud-key">${k}</span><span class="hud-val">${v}</span></span>`)
    .join('');

  const visibleFlags = Object.entries(storyMeta.flags ?? {})
    .filter(([key, meta]) => meta.visible && state.flags[key]);

  const flagsHtml = visibleFlags.length > 0
    ? `<span class="hud-divider"></span>` +
      visibleFlags.map(([key, meta]) =>
        `<span class="hud-flag"><span class="hud-flag-label">${meta.label}</span></span>`
      ).join('')
    : '';

  hud.innerHTML = statsHtml + flagsHtml;
}
```

- [ ] **Step 2: Add HUD flag styles to `style.css`**

After the `.hud-val` rule (line ~155), add:

```css
.hud-divider {
  width: 1px;
  background: var(--border);
  align-self: stretch;
  margin: 0 0.25rem;
}

.hud-flag {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}

.hud-flag-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: var(--accent);
  letter-spacing: 0.06em;
  font-family: var(--font-heading);
  white-space: nowrap;
}
```

- [ ] **Step 3: Commit**

```bash
git add engine.js style.css
git commit -m "feat: render visible knowledge flags in HUD"
```

---

### Task 3: Render failed choices as greyed-out with failure text

**Goal:** Failed `requires` choices render as disabled buttons with flavour text rather than disappearing, unless `hide_if_failed: true`.

**Files:**
- Modify: `engine.js`
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] A choice with no `failed_text` and no `hide_if_failed` that fails renders greyed with auto-generated failure text
- [ ] A choice with `failed_text` that fails renders greyed with that text
- [ ] A choice with `hide_if_failed: true` that fails is hidden entirely (current behaviour)
- [ ] Passing choices render exactly as before
- [ ] Greyed choices are not clickable
- [ ] Auto-generated text format: `*(Requires: gold ≥ 5)*` for stats, `*(Requires: knows_elvish)*` for flags
- [ ] Multiple requirements in auto-text are comma-separated
- [ ] Demo story's lantern choice needs `hide_if_failed: true` added (it currently hides — preserve that behaviour)

**Verify:** Remove `hide_if_failed: true` from a test choice. Play demo with gold < 5. Lantern choice should... wait — lantern should be hidden, so it gets `hide_if_failed: true`. Add another test choice with a flag requirement and no `hide_if_failed` — verify it greys with auto-text.

**Steps:**

- [ ] **Step 1: Add `buildFailureText()` helper**

Add after `meetsRequirements()`:

```js
function buildFailureText(requires) {
  const parts = [];
  if (requires.stats) {
    for (const [k, min] of Object.entries(requires.stats)) {
      parts.push(`${k} ≥ ${min}`);
    }
  }
  if (requires.flags) {
    for (const flag of requires.flags) {
      parts.push(flag.replace(/_/g, ' '));
    }
  }
  if (requires.flags_unset) {
    for (const flag of requires.flags_unset) {
      parts.push(`not ${flag.replace(/_/g, ' ')}`);
    }
  }
  return `*(Requires: ${parts.join(', ')})*`;
}
```

- [ ] **Step 2: Update `renderChoices()` to split passing/failing**

Replace `renderChoices()`:

```js
function renderChoices(scene) {
  const el = document.getElementById('choices-footer');
  if (!el) return;

  const allChoices = scene.choices ?? [];
  const passing = allChoices.filter(c => meetsRequirements(c.requires));
  const failing = allChoices.filter(c => !meetsRequirements(c.requires) && !c.hide_if_failed);

  if (passing.length === 0 && failing.length === 0) {
    el.innerHTML = `
      <p class="end-message">— The End —</p>
      <button class="btn btn-secondary" id="btn-selector">Back to Stories</button>
      <button class="btn btn-secondary" id="btn-undo">↩ Undo</button>
    `;
    document.getElementById('btn-selector')?.addEventListener('click', () => showSelector());
    document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
    return;
  }

  const passingHtml = passing.map((c, i) =>
    `<button class="btn-choice" data-index="${i}">${c.text}</button>`
  ).join('');

  const failingHtml = failing.map(c => {
    const failText = c.failed_text ?? buildFailureText(c.requires);
    return `<button class="btn-choice btn-choice-failed" disabled>
      ${c.text}
      <span class="choice-failed-text">${failText}</span>
    </button>`;
  }).join('');

  el.innerHTML = `
    <div class="choice-list">
      ${passingHtml}
      ${failingHtml}
    </div>
    <div class="choice-meta">
      <button class="btn btn-ghost" id="btn-undo" ${state.history.length === 0 ? 'disabled' : ''}>↩ Undo</button>
    </div>
  `;

  const choiceList = el.querySelector('.choice-list');
  if (choiceList) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => choiceList.classList.add('choices-visible'));
    });
  }

  passing.forEach((choice, i) => {
    el.querySelector(`[data-index="${i}"]`).addEventListener('click', (e) => {
      const allBtns = el.querySelectorAll('.btn-choice');
      allBtns.forEach(b => { b.disabled = true; });

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
  document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
}
```

- [ ] **Step 3: Add greyed choice styles to `style.css`**

After `.btn-choice:hover` rule, add:

```css
.btn-choice-failed {
  opacity: 0.45;
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.btn-choice-failed:hover { background: var(--surface); }

.choice-failed-text {
  font-size: 0.8rem;
  font-family: var(--font-ui);
  font-style: italic;
  color: var(--text-muted);
}
```

- [ ] **Step 4: Add `hide_if_failed: true` to demo story's lantern choice**

In `stories/demo/scenes/start.yaml`, the lantern choice currently relies on `requires` hiding it when gold < 5. With the new default behaviour it would grey instead. Add `hide_if_failed: true`:

```yaml
- text: Buy a lantern from the merchant (5 gold)
  next: start_with_lantern
  hide_if_failed: true
  requires:
    stats:
      gold: 5
  effects:
    stats:
      gold: -5
    flags:
      has_lantern: true
```

- [ ] **Step 5: Commit**

```bash
git add engine.js style.css stories/demo/scenes/start.yaml
git commit -m "feat: render failed choices as greyed with failure text"
```

---

### Task 4: Update templates and stage-1 docs

**Goal:** Add `flags` section to `templates/story.yaml`, `flags` section example to `templates/scene.yaml`, and a note to `stage-1-structure.md` about planning visible flags.

**Files:**
- Modify: `templates/story.yaml`
- Modify: `templates/scene.yaml`
- Modify: `docs/storycrafting/stage-1-structure.md`

**Acceptance Criteria:**
- [ ] `templates/story.yaml` has a commented `flags` section with `visible`, `label` examples
- [ ] `templates/scene.yaml` has commented `failed_text` and `hide_if_failed` examples on a choice
- [ ] `stage-1-structure.md` notes that flag planning should mark which flags are player-visible and whether any choices should grey vs hide

**Verify:** Read all three files.

**Steps:**

- [ ] **Step 1: Add `flags` section to `templates/story.yaml`**

After the `stats:` block, add:

```yaml
# flags:                      # optional — declare flags that should appear in the HUD
#   has_lantern:
#     label: "Lantern"        # text shown to the player
#     visible: true           # if false or omitted, flag is engine-only (never shown)
#   knows_password:
#     label: "Password to the vault"
#     visible: true
```

- [ ] **Step 2: Add `failed_text` and `hide_if_failed` to `templates/scene.yaml`**

After the "Choice with stat requirement" block, add a new example:

```yaml
  # Choice that greys out when failed (shows failure flavour text)
  - text: Climb the wall
    next: rooftop
    requires:
      stats:
        agility: 8
    failed_text: "*(Your legs won't carry you that high)*"

  # Choice that stays hidden when failed (original behaviour)
  - text: Speak the old tongue
    next: inner_sanctum
    requires:
      flags:
        - knows_elvish
    hide_if_failed: true
```

- [ ] **Step 3: Add visible flags note to `stage-1-structure.md`**

In the Mechanics Summary section, after the existing stats/flags template lines, add:

```markdown
   When planning flags, note which should be **player-visible** (shown in HUD as knowledge items — e.g. "Lantern", "Password to the vault"). Also note which gated choices should **grey out** vs **stay hidden** when failed — grey out when the player should know the option exists; hide when the option's existence would be a spoiler.
```

- [ ] **Step 4: Commit**

```bash
git add templates/story.yaml templates/scene.yaml docs/storycrafting/stage-1-structure.md
git commit -m "docs: add knowledge flags and greyed choice examples to templates and stage-1"
```
