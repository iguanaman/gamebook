# Revisit-Aware Audio & Animation

**Date:** 2026-05-04

## Problem

Revisited scenes instantly reveal all text and skip audio. This is correct for fully static scenes. But scenes with conditional text (`if:` blocks) may render different blocks on revisit — the player arrives at a hub location and the engine silently skips text they haven't heard before.

## Design

### State

Add `blockHashes` to state: a plain object keyed by `sceneId`, each value an array of hashed block content strings.

```
state.blockHashes = {
  "act1/atrium_hub": ["hash0", "hash1", "hash2", ...]
}
```

- Initialised as `{}` in `initState`
- Persisted to localStorage with the rest of state
- Only written for scenes that contain at least one `if:` block

Hashing: SHA-1 is overkill. Use a simple djb2-style string hash — fast, no deps, collision risk negligible for this use case.

### On first visit

Behaviour unchanged: animate + play audio as normal. After `renderChoices` completes, compute and store hashes for all rendered blocks into `state.blockHashes[sceneId]`. Save state.

Only do this if the scene has any `if:` blocks (check `scene.text` for objects with an `if` key). Static-only scenes never touch `blockHashes`.

### On revisit

1. Render all blocks as normal (conditional text resolves fresh against current state).
2. For each rendered block at index `i`:
   - If `state.blockHashes[sceneId][i]` matches the current block's hash → instant reveal, no audio.
   - If hash differs OR no stored hash for that index → animate + play audio as normal.
3. Process blocks in order. Instant-reveal blocks fire synchronously; animated/audio blocks use the existing `playBlocks` / `typeBlock` pipeline.
4. Choices render after the last block finishes (same as first visit — no early reveal).
5. After choices render, update `state.blockHashes[sceneId]` with fresh hashes and save.

### Hash function

```js
function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33 ^ str.charCodeAt(i)) >>> 0;
  return h.toString(36);
}
```

Hash the resolved text content of each block (after `resolveBlock`, using the `content` field).

### Storycraft constraint

Conditional text is allowed in revisitable scenes. The constraint: **blocks that may change on revisit must appear at the end of the text array, or replace the whole text**. New text must never appear before static text that the player has already seen. This is a convention enforced by the author, not the engine.

The engine has no concept of "this scene is revisitable" — the hash mechanism activates automatically for any scene with `if:` blocks.

## Files changed

- `engine.js` — `initState`, `navigateTo`, new `hashString` and `computeBlockHashes` helpers, revised revisit branch
- `docs/storycrafting/stage-4-scene-writing.md` — update conditional text guidance (remove prohibition, add tail/wholesale constraint)
