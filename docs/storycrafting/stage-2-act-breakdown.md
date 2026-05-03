# Stage 2: Act Breakdown

**Goal:** Expand one act into its scenes, choices, and paths. Output appended to `stories/{id}/structure.md` or written to `stories/{id}/act-{n}.md`.

**Prerequisite:** `structure.md` must exist. Run this stage once per act.

---

## What to do

Read `brief.md` and `structure.md`. Pick the act being expanded (specified by the user). Expand it into:

1. **Scene list** — named scenes (not YAML IDs yet, just descriptive names), in rough order
2. **Scene purposes** — one line each: what happens, what the reader learns or decides
3. **Choice points** — which scenes branch, what the choices are, where each branch goes
4. **How it enters and exits** — first scene (what arrives from previous act), last scene(s) (what feeds next act or endings)
5. **Flags/stats touched** — what changes in this act and why

Keep it narrative, not technical. No YAML, no engine syntax. Just a clear map a writer could follow.

If the act is large (10+ scenes), it's fine to group scenes into "beats" rather than listing every individual scene.

---

## Output

Write or append `stories/{id}/act-{n}.md`:

```markdown
# {Title} — Act {N}: {Name}

## Entry
Arrives from: {previous act exit or story start}
Player state: what flags/stats are set entering this act

## Scenes

### Beat 1 — {name}
Scenes: {Scene A}, {Scene B}
What happens: ...
Choice point: [choice text] → {outcome A} or {outcome B}

### Beat 2 — {name}
...

## Exits
- Path A → Act {N+1} / Ending {X}
- Path B → Act {N+1} / Ending {Y}

## Flags/Stats Changed
- `flag_name` set when: ...
- `stat_name` changes: ...
```

---

## Done when

- Every beat has a purpose and at least one choice
- Entry and exits align with `structure.md`
- No orphan paths (every branch resolves to a named exit)
- Act can be handed to a scene-writer without further clarification
