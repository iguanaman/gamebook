# Foundation

## What This Is

A static-site gamebook engine. Stories are authored as branching scenes in YAML files and played in the browser — no server, no LLM, no build step. The engine is the delivery mechanism; the writing is the game.

## What We Optimise For

- **Authoring simplicity** — a story should be writable by hand in a text editor without consulting docs
- **Portability** — the whole thing is a folder you can zip and send to someone
- **Narrative fidelity** — the engine serves the text, not the other way around; no mechanics that exist for their own sake

## What This Is Not

Not a text adventure (no parser, no free input). Not a visual novel engine. Not a live or multiplayer experience. Stats and flags exist only to create conditional branching — not as a game in themselves.

## Story Model

A story is a directed graph of scenes. Each scene has text and a list of choices. Choices lead to other scenes. Choices may require flags or stat thresholds to appear, and may apply effects (stat changes, flag sets) on selection.

There is no simulation. The world does not change except through explicit scene transitions and effects.

## Player State

Minimal by design: current scene, named stats (author-defined per story), flags (boolean markers), and undo history. State is serialised to LocalStorage so progress survives page reloads.

## Tone

Authored branching fiction where the writing carries the experience. The engine should get out of the way.

## Inspirations

Not a list of things to copy — a list of things to understand. Each source does something specific well; we're borrowing the principle, not the skin.

### Fighting Fantasy / Sorcery!
The gamebook discipline at its sharpest. Every passage earns its place, consequences surface chapters later, and failure is a branch not a reset. Sorcery! showed how far a rules-light gamebook can go when it trusts its own structure — the rewind mechanic, keyword items, cross-book persistence. **What we take:** one-shot encounters (things happen once, then they're gone); consequence branching that surfaces much later; stakes through inventory loss not just condition; the YAML scene as the unit of authoring discipline.

### Fabled Lands
The closest spiritual ancestor for persistence. A non-linear open world across multiple books — you could start anywhere, trade, fight, die, and carry state forward. World flags persisted across entries; the world existed whether you were reading it or not. **What we take:** hub-based structure with flags and effects as connective tissue; the sense that the world predates your arrival; consequences that outlast the scene where they occur.

### Lone Wolf
Long-arc authored adventure where choices compound across a campaign. Disciplines and equipment carried between books changed what options opened — not through stat-sheet complexity but through simple gates. **What we take:** stat and flag gates as a clean way to reward prior choices without complexity; the authored series as a model for multi-story state via LocalStorage.

### Disco Elysium
A text system without combat that still had stakes. Skill checks that read as character rather than probability. The thought cabinet as intangible inventory. **What we take:** `requires` gates as voiced character expression, not gatekeeping; flags that represent beliefs, realisations, and relationships — not just items; choices that feel like expressions of who you are.

### Sunless Sea
Each port is a complete short story with its own tone and moral weight. Secrets and memories are inventory — things you carry, spend, and lose. **What we take:** intangible inventory (knowledge, fragments, secrets) as first-class tracked things via flags; the scene as a self-contained story unit with its own register; consequences that feel like weight, not punishment.

### Point-and-click adventures (Monkey Island, Broken Sword)
Dense, handcrafted worlds where every screen had texture and every NPC had opinions. The craft was in the writing — distinct voices, comic timing, flavour that rewarded curiosity even when nothing mechanical happened. **What we take:** every scene should reward a visit even if nothing changes; NPC voice as a first-class deliverable; flavour text as a design goal, not decoration.
