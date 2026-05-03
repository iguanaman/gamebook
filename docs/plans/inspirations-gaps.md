# Things From Our Inspirations We Don't Have Yet

## What we have

A scene-by-scene branching engine with stats, flags, conditional choices, effects, undo, and per-scene audio. The player navigates a directed graph — choices gate on stats/flags, apply effects, and lead to new scenes. State persists in LocalStorage. Everything is single-story: you load one story, play it, finish it, and return to the selector.

---

## One-shot scenes and encounter economy

**Fighting Fantasy / Sorcery!** made events feel real by making them unrepeatable. Visit a location once — the merchant is gone the next time you pass through. The engine already has flags, but nothing enforces "this scene happened and won't happen again."

### Scenes that lock themselves after a visit
A scene could set a flag on entry, and its choices — or an alternate version of itself — could check that flag. The player could return to the same room to find it changed, picked clean, or silent.

- **Pros:** huge narrative weight per scene; the world feels like it responds to you; creates meaningful decisions about when to act
- **Cons:** authors must deliberately design revisit states; easy to forget and leave a scene with no revisit handling
- complexity 2

### Consumable choices
A choice appears once and is gone — not because you took it but because some external thing was used up (the merchant sold their last potion; the door is now locked). Implemented as a flag set on choice selection, and a `flags_unset` requirement on the choice itself.

- **Pros:** scarce opportunity creates genuine stakes; rewards paying attention
- **Cons:** requires authors to think through every choice's one-shot potential; can feel arbitrary if not explained
- complexity 1

### Timed or order-sensitive events
Something is only available if you arrived here before visiting somewhere else — a scout's report while the trail is fresh, a contact who leaves town after a certain point. Implemented via flag combinations.

- **Pros:** makes the sequence of player choices matter beyond the immediate branch; creates retroactive significance
- **Cons:** flags must be set precisely in prior scenes; very easy to create unreachable states accidentally
- complexity 1 (to implement), higher authoring burden

---

## Cross-story and campaign persistence

**Lone Wolf** and **Fabled Lands** both had state that survived between books. Lone Wolf had your disciplines and items carry forward. Fabled Lands had world flags persist across the entire series.

### Carry flags forward into a sequel story
When a story ends, a subset of its flags could be offered as "export" — written into a cross-story LocalStorage entry that a follow-on story reads on start. The "what you carried over" could affect early choices in the next story.

- **Pros:** transforms standalone stories into a campaign; rewards earlier choices in ways that feel earned much later; closest to Lone Wolf's core appeal
- **Cons:** tightly couples two stories' flag namespaces; story ordering must be authored deliberately; breaks portability slightly (story B is meaningless without A)
- complexity 3

### Shared world flags between stories in the same "world"
Instead of sequential carry-forward, a pool of flags shared across all stories in a group (e.g. `world.flags.merchant_dead`). Any story can set or read these. Stories feel like visiting different corners of the same living world.

- **Pros:** closest to Fabled Lands' open-world feel; non-linear; each story enriches the others
- **Cons:** flag namespace collisions are a real authoring hazard; no story is self-contained any more
- complexity 3

---

## Intangible inventory and knowledge as tracked things

**Sunless Sea** and **Disco Elysium** both made *knowing something* or *having experienced something* a resource you carried. Secrets, memories, relationships — not items in a list, but flags with weight.

### Knowledge flags shown to the player
Flags that represent what the player character knows — a name, a secret, a realisation — could be surfaced in the HUD or in a dedicated "what you know" panel. Not stats, but labelled markers.

- **Pros:** makes the invisible state visible; reading "you know the captain's true name" mid-story is narratively powerful; matches Disco Elysium's thought cabinet tone
- **Cons:** HUD is currently stats-only; adding a second section complicates the UI; authors must curate which flags are "worth showing"
- complexity 2

### Flags as inventory — things you carry and can spend
A flag with a `spendable` semantic: set it when you gain something, clear it when you use it. The choice that spends it is gated on the flag and its effect clears the flag. No new engine concept needed — this is already possible — but surfacing it as a design pattern and showing it in the UI (e.g. a "carry" section distinct from stats) would make it feel first-class.

- **Pros:** secrets and relationships become something you manage, not just unlock; creates tension around *when* to spend a piece of knowledge
- **Cons:** distinction between "permanent knowledge" and "spendable knowledge" must be made clear in authoring; subtle for new authors
- complexity 1 (already possible), complexity 2 (if adding UI)

---

## Consequence surfaces — branching that emerges much later

**Fighting Fantasy** at its best planted seeds in early scenes that flowered much later. A scar you got in chapter two changed an NPC's reaction in chapter eight. The engine supports this via flags, but there's no structural support for tracking or visualising deferred consequences.

### Delayed flag echo — "you were here before" moments
An NPC or scene explicitly acknowledges a past choice — not as a stat gate but as a narrative callback. "The old woman recognises the wound on your arm." This is entirely authorable now, but nothing in the engine makes it easy to discover or test.

- **Pros:** makes replay feel meaningful; rewards attentive players; creates the sense that the story remembers you
- **Cons:** hard to test — authors must trace every flag combination manually; callbacks that never trigger go unnoticed in testing
- complexity 1

### A flag trace / author debug view
Not player-facing: a mode that shows all flags set and all requirements checked during a playthrough. Helps authors see which deferred consequences are actually firing.

- **Pros:** dramatically reduces the authoring hazard of complex flag webs; catches unreachable states
- **Cons:** dev tooling only; no player value; adds a parallel code path to maintain
- complexity 2

---

## Character expression through gating

**Disco Elysium** used skill checks not to block you but to voice your character — a high Empathy check meant you *noticed* something, regardless of whether it helped. The engine's `requires` gates currently hide choices entirely; there's no way to make a gated choice feel like a character trait rather than a lock.

### Greyed-out choices with flavour text
A failed `requires` check renders the choice disabled and dimmed, with a short explanation: "*(You don't know this language)*" or "*(You'd need more gold)*". The choice is visible — it tells you something about who you are and what you lack — but you cannot take it.

- **Pros:** makes the world feel richer and more legible; transforms failures into characterisation; reduces the "invisible door" frustration
- **Cons:** authors must write failure flavour for every gated choice; without it, greyed choices feel punitive rather than expressive
- complexity 2

### Choices that reflect who you are without gating
A choice with no `requires` that is *only meaningful* if you have a certain flag — the text changes based on your state. "Mention the scar" becomes available to everyone, but if you have `has_scar` set, the NPC reacts differently. This is purely an authoring pattern, not an engine feature.

- **Pros:** every player can take the choice; the world still responds to prior state; no invisible doors
- **Cons:** requires a dynamic text mechanism the engine doesn't have (text variants based on flags); not currently possible without branching scenes
- complexity 3

---

## Hub world and revisitable structure

**Fabled Lands** was non-linear — you could go anywhere from anywhere and the world accumulated state around your choices. Our current engine is a strict DAG (directed, mostly acyclic). Revisitable hub scenes exist in principle but there's no structural support.

### Explicit return-to-hub choices
A scene can offer "return to the market square" as a persistent choice — implemented as a named scene you navigate back to. Nothing new in the engine, but a design pattern that makes hub-based authoring first-class.

- **Pros:** enables open-world structures without engine changes; maps directly onto Fabled Lands' structure
- **Cons:** cycles in the scene graph can create unexpected interactions with the undo stack; authors must manage revisit states manually
- complexity 1

### Hub scenes that aggregate flags from prior visits
A market scene that knows which traders you've met, which rumours you've heard. The hub scene itself checks a set of flags and renders a description that varies. Currently, a single scene YAML can't vary its narrative text — only its choices.

- **Pros:** makes hubs feel alive and responsive; the sense that the world predates your arrival (Fabled Lands principle)
- **Cons:** requires either multiple hub scenes (one per state combination) or dynamic text templating — neither is trivially simple
- complexity 3

---

## NPC voice and flavour as a design goal

**Monkey Island / Broken Sword**: every NPC had opinions. Every scene rewarded curiosity even when nothing mechanical happened. The engine has narrative text but no concept of NPC as a persistent entity with a voice.

### Named NPC scenes with consistent tone
Not an engine feature — an authoring convention. An NPC appears across multiple scenes with a consistent register, vocabulary, and set of attitudes. Their voice is the mechanic.

- **Pros:** transforms scenes from information delivery into encounters; makes the world feel inhabited
- **Cons:** no engine enforcement; only as strong as the author's discipline
- complexity 1 (convention only)

### Revisit flavour — scenes that comment on return
A scene that has been visited before renders a different opening line. "You've been here before — the smell hits you first." Requires either a flag the scene sets on first visit, or a dedicated `revisit_text` field in scene YAML.

- **Pros:** trivial amount of writing creates a strong sense of world memory; rewards thorough players
- **Cons:** adds a YAML field that most scenes won't use; easy to forget to write
- complexity 2 (engine support for `revisit_text`)

---

## Best bets

**Consumable choices** (one-shot choices via `flags_unset`)
Already expressible in the engine — zero new code. Surfacing it as a named pattern and adding it to the scene template immediately unlocks one-shot encounter design from Fighting Fantasy. Authoring simplicity: unchanged. Portability: unchanged. Narrative fidelity: high gain.
complexity 1 — the best ratio in the document.

**Revisit flavour (`revisit_text` field)**
Two lines of engine code and one new optional YAML field. Every scene that fills it in immediately gains Monkey Island–style world memory. Authoring: optional field, zero burden if skipped. Portability: unchanged. Fidelity: high — makes the world feel like it remembers.
complexity 2.

**Greyed-out choices with failure flavour**
Changes the invisible-door pattern that currently makes `requires` feel like a lock. Turns every gate into a Disco Elysium–style character moment. Authoring: authors need to write failure text, which is a new obligation, but it's optional (could fall back to a generic "*(You lack the requirement)*"). Portability: pure frontend, no YAML changes. Fidelity: high.
complexity 2.

**Knowledge flags shown to the player**
Small HUD addition. Flags that represent knowledge or relationships surface as readable labels — "you know the password", "the innkeeper trusts you." No engine logic change. Adds Sunless Sea's intangible-inventory feel. Authoring: authors tag flags as `visible: true` or similar. Portability: unchanged. Fidelity: high for stories where knowing things matters.
complexity 2.

**Named NPC scenes with consistent tone (convention)**
Zero code. An authoring pattern document and a template. Immediately actionable. The Monkey Island principle — every NPC has opinions — is entirely in the writing. No engine complexity. Portability: perfect. Fidelity: depends entirely on author discipline, but the cost of establishing the convention is near zero.
complexity 1.
