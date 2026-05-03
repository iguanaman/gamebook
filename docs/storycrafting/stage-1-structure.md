# Stage 1: Structure

**Goal:** Define the act structure and overall narrative shape. Output is `stories/{id}/structure.md`.

**Prerequisite:** `brief.md` must exist and be complete.

---

## What to do

Read `brief.md`. Then produce a high-level structure: acts, major turning points, and which endings branch off where.

Don't invent scene names or write prose yet. This is a skeleton — the shape the story hangs on.

Cover:

1. **Acts** — how many, what each one covers in a sentence
2. **Turning points** — the 2–4 moments where the story pivots (player makes a big choice, revelation lands, etc.)
3. **Branch map** — where the major forks are and what they lead toward (not scene IDs, just outcomes)
4. **Ending paths** — which act/fork leads to which ending and roughly why
5. **Stats/flags in play** — which mechanics gate what, and when they matter. When planning flags, mark any that gate a **consumable choice** — a choice that should disappear after being taken (the merchant sold their last potion; the door was only unlocked once). These require deliberate `flags_unset` + `effects` pairing in scene YAML. A consumable choice that isn't planned is easy to forget, leaving the option available indefinitely. Also note which flags should be **player-visible** (shown in HUD — e.g. "Lantern", "Password to the vault") and which gated choices should **grey out** vs **stay hidden** when failed — grey out when the player should know the option exists; hide when the option's existence would be a spoiler.

If something in the brief is underspecified for structure (e.g. "multiple endings" but no sense of what differentiates them), ask before writing.

---

## Output

Write `stories/{id}/structure.md`:

```markdown
# {Title} — Structure

## Acts
- **Act 1 — {name}:** ...
- **Act 2 — {name}:** ...
- **Act 3 — {name}:** ...

## Turning Points
1. ...
2. ...
3. ...

## Branch Map
- Fork A (Act 1): leads to → [outcome]
- Fork B (Act 2): leads to → [outcome]

## Endings
- **Ending 1 — {name}:** reached via ... hinging on ...
- **Ending 2 — {name}:** ...

## Mechanics Summary
Stats: ...
Flags: ...
When they matter: ...
```

---

## Done when

- `structure.md` exists with all sections filled
- Endings are distinct and each reachable from structure
- No act is a black box — each has a one-sentence purpose
