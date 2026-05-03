# Block-by-Block Narration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reveal scene text blocks one at a time in sync with audio, hiding choices until audio ends.

**Architecture:** Three coordinated changes — `generate_audio.py` gains timing measurement and writes `timings` to scene YAMLs; `engine.js` derives audio paths from scene ID (dropping the `audio` field), reveals blocks via `timeupdate` events, and defers choice rendering until `ended`; `style.css` adds the reveal transition.

**Tech Stack:** Vanilla JS, CSS transitions, Python (soundfile/numpy already in use), js-yaml

---

## File Map

| File | Change |
|------|--------|
| `generate_audio.py` | Always write `timings`; stop writing `audio`; update skip logic |
| `engine.js` | Derive audio path from sceneId; block-by-block reveal; defer choices |
| `style.css` | Add `.block-hidden` / `.block-visible` transition classes |
| `stories/demo/scenes/*.yaml` | Remove `audio:` field (manual cleanup after script change) |

---

### Task 1: CSS — block reveal transition

**Goal:** Add the two CSS classes that drive block fade-in animation.

**Files:**
- Modify: `style.css` (after `.narrative p` rule, ~line 131)

**Acceptance Criteria:**
- [ ] `.block-hidden` sets opacity 0 and small translateY
- [ ] `.block-visible` sets opacity 1, translateY 0, with transition
- [ ] Paragraphs with neither class are fully visible (no regression)

**Steps:**

- [ ] **Step 1: Add classes to style.css**

After the `.narrative p { margin: 0 0 1em; }` line, add:

```css
#narrative p.block-hidden {
  opacity: 0;
  transform: translateY(6px);
}

#narrative p.block-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms ease, transform 300ms ease;
}
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "feat: add block-hidden/block-visible CSS transition classes"
```

---

### Task 2: Engine — derive audio path from sceneId

**Goal:** Replace `scene.audio` field lookups with a path derived from the current scene ID, so the `audio:` field in YAML is no longer needed.

**Files:**
- Modify: `engine.js` — `playAudio` function (~line 167) and `navigateTo` (~line 227)

**Acceptance Criteria:**
- [ ] Audio plays correctly for all demo scenes without `audio:` in YAML
- [ ] `playAudio` no longer references `scene.audio`
- [ ] Missing audio file fails silently (same as before)

**Steps:**

- [ ] **Step 1: Update `playAudio` signature and path derivation**

Replace the existing `playAudio` function:

```js
function playAudio(sceneId) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
  const safeName = sceneId.replace(/\//g, '-');
  currentAudio = new Audio(`stories/${currentStoryId}/audio/${safeName}.wav`);
  currentAudio.play().catch(() => { /* autoplay blocked — silent fail */ });
}
```

- [ ] **Step 2: Update `navigateTo` to pass sceneId**

In `navigateTo`, change:
```js
playAudio(scene);
```
to:
```js
playAudio(sceneId);
```

- [ ] **Step 3: Remove `audio:` from demo scene YAMLs**

Edit each of these files and delete the `audio: audio/....wav` line:
- `stories/demo/scenes/start.yaml`
- `stories/demo/scenes/start_with_lantern.yaml`
- `stories/demo/scenes/path_a.yaml`
- `stories/demo/scenes/path_b.yaml`
- `stories/demo/scenes/end.yaml`

- [ ] **Step 4: Verify in browser**

Open the story in a browser (use Live Server or `npx serve .`). Navigate to the start scene — audio should play. Navigate to another scene — audio should change.

- [ ] **Step 5: Commit**

```bash
git add engine.js stories/demo/scenes/
git commit -m "feat: derive audio path from sceneId, drop audio field from scene yaml"
```

---

### Task 3: Engine — block-by-block reveal and deferred choices

**Goal:** When `scene.timings` has more than one entry, render blocks progressively as audio plays, and defer choice rendering until audio ends.

**Files:**
- Modify: `engine.js` — `renderNarrative`, `navigateTo`, and a new helper

**Acceptance Criteria:**
- [ ] Single-block scenes (no `timings` or `timings.length === 1`): all text visible immediately, choices shown immediately — unchanged behaviour
- [ ] Multi-block scenes: only first block visible on load; subsequent blocks appear as audio `currentTime` crosses their timing threshold
- [ ] Choices not rendered until audio `ended` fires
- [ ] Navigating away (choosing or undoing) cleans up the `timeupdate` listener

**Steps:**

- [ ] **Step 1: Update `renderNarrative` to support hidden blocks**

Replace the existing `renderNarrative`:

```js
function renderNarrative(scene) {
  const el = document.getElementById('narrative');
  if (!el) return;
  const blocks = Array.isArray(scene.text) ? scene.text : [scene.text];
  const texts = blocks.map(b => typeof b === 'string' ? b : Object.values(b)[0]);
  const timed = scene.timings && scene.timings.length > 1;
  el.innerHTML = texts.map((t, i) => {
    const cls = timed && i > 0 ? ' class="block-hidden"' : '';
    return `<p${cls}>${t.replace(/\n\n/g, '</p><p>')}</p>`;
  }).join('');
  el.scrollTop = 0;
}
```

- [ ] **Step 2: Add timing listener helper**

Add this function after `playAudio`:

```js
function attachTimingListeners(scene) {
  if (!scene.timings || scene.timings.length <= 1) return;
  const timings = scene.timings;
  let nextIndex = 1; // index 0 already visible

  function onTimeUpdate() {
    while (nextIndex < timings.length && currentAudio.currentTime >= timings[nextIndex]) {
      const paras = document.querySelectorAll('#narrative p');
      if (paras[nextIndex]) {
        paras[nextIndex].classList.remove('block-hidden');
        paras[nextIndex].classList.add('block-visible');
      }
      nextIndex++;
    }
  }

  currentAudio.addEventListener('timeupdate', onTimeUpdate);
}
```

- [ ] **Step 3: Update `navigateTo` to wire up listeners and defer choices**

Replace the existing `navigateTo`:

```js
async function navigateTo(sceneId) {
  state.scene = sceneId;
  saveState();

  const scene = await loadScene(currentStoryId, sceneId);
  renderHud();
  renderNarrative(scene);
  playAudio(sceneId);

  const timed = scene.timings && scene.timings.length > 1;
  if (timed) {
    attachTimingListeners(scene);
    currentAudio.addEventListener('ended', () => renderChoices(scene), { once: true });
  } else {
    renderChoices(scene);
  }
}
```

- [ ] **Step 4: Verify in browser — multi-block scene**

Load the demo story. The start scene has 3 blocks. On navigation:
- Only the first paragraph visible initially
- Second paragraph fades in when audio reaches ~12s (merchant dialogue)
- Third paragraph fades in at the next threshold
- Choices appear only after audio finishes

- [ ] **Step 5: Verify — single-block scene**

Navigate to `end` (or any single-block scene). All text should be visible immediately and choices shown right away.

- [ ] **Step 6: Verify — undo**

While audio is playing on a multi-block scene, hit Undo. Should navigate away cleanly. No JS errors in console.

- [ ] **Step 7: Commit**

```bash
git add engine.js
git commit -m "feat: reveal narrative blocks in sync with audio, defer choices until audio ends"
```

---

### Task 4: `generate_audio.py` — write timings, drop audio field

**Goal:** After generating audio, measure per-block start offsets and write `timings` to the scene YAML. Stop writing the `audio` field. Update skip logic to check WAV file existence rather than the `audio` field.

**Files:**
- Modify: `generate_audio.py`

**Acceptance Criteria:**
- [ ] Every processed scene gets a `timings` list written to its YAML
- [ ] Single-block scenes get `timings: [0.0]`
- [ ] Multi-block scenes get one timing per block (not per voice run) — seconds from WAV start
- [ ] `audio:` field is no longer written to scene YAML
- [ ] Skip logic: skip if WAV exists at derived path and not `--force`
- [ ] `--force` regenerates both WAV and `timings`

**Steps:**

- [ ] **Step 1: Add `measure_block_offsets` helper**

Add after the `blocks_for_scene` function:

```python
def measure_block_offsets(scene_blocks, runs):
    """
    Map each block back to its voice run and compute its start offset in seconds.

    scene_blocks: list of (text, voice) — one per original text block
    runs: list of (text, voice, duration_seconds) — after concatenation/measurement

    Returns list of float offsets, one per scene_block.
    """
    offsets = []
    run_start = 0.0
    run_idx = 0
    run_text_remaining = runs[0][0] if runs else ""

    for text, voice in scene_blocks:
        offsets.append(run_start)
        # Advance run pointer when this block exhausts the current run's text
        # Runs are formed by joining same-voice blocks with "\n\n"
        if run_idx < len(runs) - 1:
            current_run_text = runs[run_idx][0]
            consumed = "\n\n".join(
                t for t, v in scene_blocks[:offsets.__len__()] if v == voice or True
            )
            # Simple heuristic: move to next run after each unique-voice block
            if voice != runs[run_idx][1] or (run_idx < len(runs) - 1 and text == runs[run_idx][0].split("\n\n")[-1]):
                run_start += runs[run_idx][2]
                run_idx += 1

    return offsets
```

Actually, the above heuristic is fragile. Use a simpler direct approach: track cumulative offset by walking runs in order and assigning offsets to blocks greedily.

Replace with:

```python
def measure_block_offsets(scene_blocks, run_durations):
    """
    Assign a start-time offset (seconds) to each block.

    scene_blocks: list of (text, voice)
    run_durations: list of (joined_text, voice, duration_seconds) — one per voice run

    Blocks are assigned to runs in order. Each block in a run gets the run's
    cumulative start time as its offset.
    """
    offsets = []
    run_idx = 0
    cumulative = 0.0

    # Reconstruct which blocks belong to which run
    # Runs merge consecutive same-voice blocks with "\n\n"
    block_run = []
    current_run_voice = None
    current_run_ridx = -1
    ridx = 0
    for text, voice in scene_blocks:
        if voice != current_run_voice:
            current_run_voice = voice
            ridx = len(block_run)  # not quite right — need a different approach
        block_run.append(ridx)

    # Simpler: rebuild run membership from scene_blocks directly
    block_run_indices = []
    run_i = 0
    prev_voice = None
    for text, voice in scene_blocks:
        if voice != prev_voice:
            if prev_voice is not None:
                run_i += 1
            prev_voice = voice
        block_run_indices.append(run_i)

    run_starts = []
    acc = 0.0
    for _, _, dur in run_durations:
        run_starts.append(acc)
        acc += dur

    return [run_starts[ri] for ri in block_run_indices]
```

- [ ] **Step 2: Update `process_story` to measure durations and write timings**

The key changes in `process_story`:

1. After generating each WAV (single or concatenated), measure its duration.
2. Collect per-run durations for multi-run scenes.
3. Compute block offsets using the helper.
4. Write `timings` to scene YAML; do NOT write `audio`.

Replace the section inside the `for scene_file in sorted(scene_files):` loop — from after `out_abs.parent.mkdir(...)` to `save_yaml(scene_file, scene)`:

```python
        out_abs.parent.mkdir(parents=True, exist_ok=True)

        runs = []
        for text, voice in scene_blocks:
            if runs and runs[-1][1] == voice:
                runs[-1] = (runs[-1][0] + "\n\n" + text, voice)
            else:
                runs.append((text, voice))

        import io
        import soundfile as sf
        import numpy as np

        if len(runs) == 1:
            print(f"  [gen]  {scene_id} ({runs[0][1]})")
            wav = synthesize(runs[0][0], runs[0][1], EXAGGERATION)
            out_abs.write_bytes(wav)
            arr, rate = sf.read(io.BytesIO(wav))
            run_durations = [(runs[0][0], runs[0][1], len(arr) / rate)]
        else:
            print(f"  [gen]  {scene_id} ({len(runs)} voice runs)")
            wavs = []
            run_durations = []
            for i, (text, voice) in enumerate(runs):
                print(f"         run {i+1}: {voice!r}")
                wav_bytes = synthesize(text, voice, EXAGGERATION)
                wavs.append(wav_bytes)
                arr, rate = sf.read(io.BytesIO(wav_bytes))
                run_durations.append((text, voice, len(arr) / rate))
            arrays = [sf.read(io.BytesIO(w))[0] for w in wavs]
            sr = sf.read(io.BytesIO(wavs[0]))[1]
            combined = np.concatenate(arrays)
            buf = io.BytesIO()
            sf.write(buf, combined, sr, format="wav")
            out_abs.write_bytes(buf.getvalue())

        # Compute per-block timings
        block_run_indices = []
        run_i = 0
        prev_voice = None
        for text, voice in scene_blocks:
            if voice != prev_voice:
                if prev_voice is not None:
                    run_i += 1
                prev_voice = voice
            block_run_indices.append(run_i)

        run_starts = []
        acc = 0.0
        for _, _, dur in run_durations:
            run_starts.append(acc)
            acc += dur

        timings = [round(run_starts[ri], 3) for ri in block_run_indices]

        scene["timings"] = timings
        scene.pop("audio", None)  # remove legacy field if present
        save_yaml(scene_file, scene)
        print(f"         timings → {timings}")
        print(f"         saved → {out_rel}")
```

- [ ] **Step 3: Update skip logic**

The current skip check is `if out_abs.exists() and not force`. This is already correct — keep it. But also ensure we don't try to use `scene.audio` for the skip decision. Confirm the skip block reads:

```python
        if out_abs.exists() and not force:
            print(f"  [skip] {scene_id} — audio exists")
            continue
```

No change needed here — it was already file-based.

- [ ] **Step 4: Move imports to top of file**

The `import io`, `import soundfile as sf`, `import numpy as np` lines that were inside the `else` branch should be moved to the top of the file (after existing imports). Remove the inline ones added in Step 2.

Add after `import yaml`:
```python
import io

import numpy as np
import soundfile as sf
```

And remove the `import io`, `import soundfile as sf`, `import numpy as np` lines from inside the loop body in Step 2.

- [ ] **Step 5: Test with --story demo --force**

```bash
python generate_audio.py --story demo --force
```

Expected output per scene: lines showing `[gen]`, voice runs, `timings → [0.0, ...]`, `saved → audio/....wav`. Confirm scene YAML files now have `timings:` and no `audio:` field.

- [ ] **Step 6: Commit**

```bash
git add generate_audio.py stories/demo/scenes/
git commit -m "feat: generate_audio writes timings per block, drops audio field"
```
