---
name: ideate
description: Use when asked to brainstorm or generate ideas for a feature, system, or topic — produces a high-level inspiration document with grouped options, NOT a spec or implementation plan. Distinct from superpowers-extended-cc:brainstorming which converges on a single approved design.
---

# Ideate

Produce a high-level ideas document: a brainstorming artifact that explores the possibility space for a topic at the **next sensible level** from where the system currently is. **This is not a spec, not a design, and does not converge on a single approach.** Ideas should be grounded — not jumping from a basic system to a fully-simulated one in a single leap.

## Before generating ideas

**Step 1 — Read `docs/foundation.md`.** It defines what the gamebook is, what it is not, and what success looks like. Ideas should feel at home in that context — grounded in the three pillars: **authoring simplicity**, **portability**, and **narrative fidelity**. The engine serves the text; no mechanics that exist for their own sake.

**Step 2 — Check what already exists** (skip only if the user explicitly says "start from scratch" or "ignore what we have"). Read `docs/engine.md` and `docs/frontend.md`, and grep the codebase for systems related to the topic. Build a clear picture of what's implemented. Do not propose ideas for things that are already there. If an idea overlaps with existing behaviour, either skip it or reframe it as an enhancement (and say so explicitly).

Ideas should be **one level above what exists**, not several. No idea should require rebuilding what's already there or assume systems that haven't been built. Ideas must work within the constraints of a pure static site: browser JS, YAML files, and LocalStorage.

---

## How to invoke

```
/ideate audio
/ideate conditional choices
/ideate story selector
```

The argument is the topic. Keep it loose — a word or phrase is enough.

## What this skill produces

A markdown file saved to `docs/plans/` named after the topic (e.g. `docs/plans/audio.md` or `docs/plans/story-selector.md`). Create the `docs/plans/` directory if it doesn't exist.

**Structure:**

- Short **"What we have"** paragraph: what's currently implemented, what it can and can't do (omit if starting from scratch)
- Several **thematic sections** (4–8), each covering a distinct angle on what could be added next
- Each section contains independent ideas — things you could add, change, or explore
- Each idea is followed by:
  - **Pros:** what it opens up, what reader/player experience it creates
  - **Cons:** what it complicates, what it might break or foreclose
  - `complexity N` (1–5, no bold — 1 = an afternoon, 5 = weeks of new infrastructure)
- No mutual exclusivity within or across sections
- No "recommended approach", no implementation steps

## Tone and style

- Write as a thoughtful collaborator in a design brainstorm, not as a technical spec writer
- Use plain language; no code, no YAML, no data model descriptions
- Name the feeling or reader experience each idea creates, not just the mechanic
- Be specific enough that ideas spark follow-up thinking ("a choice that only appears if you've visited this scene before" is better than "conditional choices")
- Ideas should feel achievable from where we are — ambitious is fine, but grounded in the current static-site engine
- Keep the three pillars in mind: would this make authoring harder? would it break portability? does it serve the narrative or exist for its own sake?

## What this skill is NOT

- Not `superpowers-extended-cc:brainstorming` — that skill converges on an approved spec and leads to implementation. This skill deliberately does not converge.
- Not a plan — do not write tasks, stages, or sequencing
- Not a design doc — do not write acceptance criteria, data models, or file paths
- Not a recommendation — do not pick a preferred option or argue for one approach over another

## After the ideas

Add a final **## Best bets** section.

Pick 3–5 ideas from anywhere in the document with the best complexity-to-impact ratio (high impact, low complexity). For each, write two lines:
- Why it punches above its weight on the ratio alone
- Why it fits (or tensions with) the foundation: the three pillars (authoring simplicity, portability, narrative fidelity), the "engine serves the text" principle, and the Fighting Fantasy / Fabled Lands inspirations

This is the one place in the document where a preference is expressed.

## After writing

Tell the user the file was written and briefly name the sections covered. Offer nothing further unless asked — do not pivot to brainstorming, planning, or implementation.
