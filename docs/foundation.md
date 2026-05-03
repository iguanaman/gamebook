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

## Tone and Inspirations

Fighting Fantasy, Fabled Lands, Lone Wolf, Sorcery! — authored branching fiction where the writing carries the experience. The engine should get out of the way.
