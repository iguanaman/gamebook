# Block-by-Block Narration Design

**Date:** 2026-05-03

## Goal

Reveal scene text blocks one at a time, synchronized to audio playback. Choices hidden until audio ends.

---

## YAML Schema Changes

### `audio` field removed

The `audio` field is dropped from all scene YAMLs. The engine derives the path deterministically:

```
stories/{storyId}/audio/{sceneId}.wav
```

where `sceneId` has `/` replaced with `-` (matching the existing naming convention in `generate_audio.py`).

### `timings` field added

A `timings` list is always written by `generate_audio.py` alongside audio generation — one entry per text block, in seconds from the start of the WAV file.

```yaml
text:
  - "You stand at a crossroads..."
  - male1: "Evening, traveller..."
  - "He eyes your coin purse."
timings: [0.0, 12.4, 28.1]
```

Single-block scenes get `timings: [0.0]`.

---

## `generate_audio.py` Changes

1. **Always write `timings`** — after generating audio for a scene, write `timings` back to the scene YAML.
2. **Measure block offsets** — for multi-voice runs, track cumulative sample count before each run using the soundfile data already in hand. Offset in seconds = cumulative_samples / sample_rate.
3. **Single-block scenes** — write `timings: [0.0]`. No measurement needed.
4. **Remove `audio` field** — stop writing `scene["audio"]` back to YAML.
5. **Skip logic** — currently skips if `audio` field present and file exists. Change to: skip if WAV file exists at derived path (and not `--force`).

---

## Engine Changes

### Audio path

Replace `scene.audio` references with the derived path:

```js
`stories/${currentStoryId}/audio/${sceneId.replace(/\//g, '-')}.wav`
```

`navigateTo` already has `sceneId` in scope. Pass it through to `playAudio`.

### `renderNarrative`

- Always render all blocks as `<p>` elements.
- When `scene.timings` exists and has more than one entry: add class `block-hidden` to all blocks except the first (index 0 starts visible).
- When `scene.timings` is absent or single-entry: render all blocks visible immediately (existing behaviour).

### `playAudio`

- After starting audio, if `scene.timings` has more than one entry: attach a `timeupdate` listener.
- On each `timeupdate`, check which blocks should now be visible (all whose timing ≤ `currentTime`) and reveal them by swapping `block-hidden` → `block-visible`.
- Clean up the listener on `ended` or when navigating away.

### Choice reveal

- When `scene.timings` has more than one entry: do not render choices on initial load. Attach a one-shot `ended` listener on the audio element; when it fires, call `renderChoices(scene)`.
- When `scene.timings` is absent or single-entry: render choices immediately (existing behaviour).

---

## CSS Changes

Two classes on `<p>` elements inside `#narrative`:

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

All narrative `<p>` elements default to visible (no class = visible). Hidden blocks get `block-hidden`; when revealed they get `block-visible` added (and `block-hidden` removed) to trigger the transition.

---

## What Does Not Change

- Scene YAML `text` block syntax — strings and `{voice: text}` dicts unchanged.
- WAV file naming convention — already `audio/{scene-id}.wav`.
- Undo behaviour — navigating away stops audio as now; no timing state to clean up beyond the listener.
- Single-block scenes — no visible change in behaviour.
