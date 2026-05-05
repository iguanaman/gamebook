# Focus Pause Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pause audio and typewriter animation when the browser tab loses focus, resuming both from their paused positions when focus returns.

**Architecture:** Listen for `visibilitychange` on `document`. On hide: pause `currentAudio` and set a flag that makes the typewriter `tick()` loop idle instead of advancing. On show: resume audio from its paused position and re-enter the tick loop. Act title splashes are excluded — they play through uninterrupted. The selector screen is also excluded.

**Tech Stack:** Vanilla JS, Web Audio (`HTMLAudioElement.pause()`/`resume()`), `requestAnimationFrame`, `document.visibilitychange`.

---

### Task 1: Add focus-pause support to the typewriter

**Goal:** Make `typeBlock` idle when the tab is hidden and resume from the exact character position when the tab returns.

**Files:**
- Modify: `engine.js` — `typeBlock` function (~line 909)

**Acceptance Criteria:**
- [ ] Typewriter stops advancing characters while `document.hidden` is true
- [ ] When tab returns, typing continues from the exact position it stopped (no characters skipped or repeated)
- [ ] `startTime` is adjusted on resume so speed appears continuous
- [ ] Behaviour is unchanged when tab never loses focus

**Verify:** Manual — open a story, switch tabs mid-sentence, return, confirm text continues smoothly.

**Steps:**

- [ ] **Step 1: Track pause state inside `typeBlock`**

In `typeBlock`, add a `pausedAt` variable (timestamp when paused) and a `handleVisibility` listener. Insert this code just before `tick()` is called at the end of the function (line ~960):

```js
let pausedAt = null;

function handleVisibility() {
  if (document.hidden) {
    pausedAt = performance.now();
  } else if (pausedAt !== null) {
    // Shift startTime forward by the duration we were hidden,
    // so targetChars doesn't jump ahead.
    startTime += performance.now() - pausedAt;
    pausedAt = null;
    if (!finished) requestAnimationFrame(tick);
  }
}
document.addEventListener('visibilitychange', handleVisibility);
```

- [ ] **Step 2: Clean up the listener when typing finishes**

In the existing `finish()` function inside `typeBlock`, add the listener removal:

```js
function finish() {
  if (finished) return;
  finished = true;
  document.removeEventListener('visibilitychange', handleVisibility);
  skip.finished = true;
  para.innerHTML = fullHtml;
  para.classList.remove('block-typing');
  para.classList.add('block-visible');
  scrollNarrativeToBottom();
  onDone();
}
```

- [ ] **Step 3: Make `tick` idle while hidden**

At the top of `tick()`, after the `finished` check and before the `skip.active` check, add:

```js
function tick() {
  if (finished) return;
  if (document.hidden) return; // wait for visibilitychange to re-enter
  if (skip.active) { skip.active = false; finish(); return; }
  // ... rest of tick unchanged
```

- [ ] **Step 4: Commit**

```bash
git add engine.js
git commit -m "feat: pause typewriter when tab is hidden, resume from exact position"
```

---

### Task 2: Add focus-pause support to audio

**Goal:** Pause `currentAudio` when the tab is hidden and resume it from the same position when the tab returns.

**Files:**
- Modify: `engine.js` — audio section (~line 430) and `typeBlocks` function (~line 964)

**Acceptance Criteria:**
- [ ] `currentAudio` pauses when tab goes hidden
- [ ] `currentAudio` resumes from its paused position when tab returns
- [ ] No double-resume if audio ended while tab was hidden
- [ ] Act title splash audio is NOT paused (splash plays through)
- [ ] Selector screen has no audio to pause (no effect needed)

**Verify:** Manual — open a story, start audio narration, switch tabs for ~3 seconds, return, confirm audio resumes mid-sentence rather than restarting.

**Steps:**

- [ ] **Step 1: Add a module-level focus-pause handler for audio**

Add this block after the `stopAudio` function definition (~line 365). It attaches once at module load:

```js
document.addEventListener('visibilitychange', () => {
  if (!currentAudio) return;
  if (document.hidden) {
    currentAudio.pause();
  } else {
    currentAudio.play().catch(() => {});
  }
});
```

`currentAudio` is already nulled by `stopAudio` and on scene navigation, so this is safe to call unconditionally — it only acts when there's active narration audio.

- [ ] **Step 2: Verify the `ended` handler still fires correctly**

When audio is paused mid-play then resumed, the `ended` event fires naturally when it reaches the end — no change needed. But confirm that `stopAudio` (which sets `currentAudio = null` before pausing) is not called during a focus change. It is not — `stopAudio` is only called on skip, scene navigation, and act splash. No change needed here.

- [ ] **Step 3: Commit**

```bash
git add engine.js
git commit -m "feat: pause and resume narration audio on tab visibility change"
```
