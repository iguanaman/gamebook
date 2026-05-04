# Stage 2: Act Breakdown

**Goal:** Expand one act into its scenes, choices, and paths. Output appended to `stories/{id}/structure.md` or written to `stories/{id}/act-{n}.md`.

**Prerequisite:** `structure.md` must exist. Run this stage once per act.

---

## What to do

Read `brief.md`, `structure.md`, and `docs/storycrafting/principles.md`. Pick the act being expanded (specified by the user). Expand it into:

1. **Scene list** — named scenes (not YAML IDs yet, just descriptive names), in rough order
2. **Scene purposes** — one line each: what happens, what the reader learns or decides
3. **Choice points** — which scenes branch, what the choices are, where each branch goes. For each gated choice, note:
   - **Grey out vs hide** — grey out when the player should know the option exists but can't take it; hide (`hide_if_failed`) when its existence would be a spoiler
   - **Consumable choices** — choices that should vanish after being taken (sold item, one-time action). Mark these explicitly — they require `flags_unset` on `requires` AND the same flag set on `effects`. Easy to forget; plan them now.
   - **Weighted random** — choices where the destination is uncertain (travel, exploration, NPC mood). Note the likely outcomes and rough odds.
4. **How it enters and exits** — first scene (what arrives from previous act), last scene(s) (what feeds next act or endings)
5. **Flags/stats touched** — what changes in this act and why. Note which flags should be **player-visible** in the HUD.

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
Gating: {which choices are gated, grey-out or hidden, consumable or not}
Random: {any weighted destinations and rough odds}

### Beat 2 — {name}
...

### Hub — {name} (if applicable)
Returns to: this scene after each branch
Choices available: {list topics/actions}
Gating: {which options open/close as flags change}
Exit: {what choice finally leaves the hub}

### Conversation — {NPC name} (if applicable)
Topics: {list question topics}
Each topic: sets a flag, loops back; topic disappears once exhausted
Exit: always-available "walk away" choice

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
- All consumable choices are flagged (not left to be caught in Stage 3)
- Grey-out vs hide decision is noted for every gated choice
- Weighted random scenes are identified with intended odds
- Act can be handed to a scene-writer without further clarification
