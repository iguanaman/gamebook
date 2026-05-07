# Improvements — Ideas

## What we have

A static-site gamebook engine: YAML scenes, a single `engine.js`, LocalStorage saves, per-block narrated audio, optional music, optional theme CSS per story, animated act titles, conditional text and choices, undo, a journal panel, knowledge-flag HUD, fullscreen + first-time UI hints, and a menu with story cards. Choices can be one-shot, gated by stats/flags, or hidden. Five stories live in the repo.

What it doesn't yet do: anything reactive on its own (no idle behaviour, no time, no ambient layer), nothing meta across stories, no replay tooling for authors, no in-fiction reflection on the player's path, and very little texture between the moment a scene loads and the moment a choice is made.

---

## 1. Texture between choices

Right now a scene plays its blocks and presents choices. Nothing happens *while you're sitting there*. Small ambient layers can make the world feel like it predates and outlasts the reader without changing the authoring model.

### Ambient room sound per scene
A second audio track underneath the narration — a generator hum, a wind loop, a tavern murmur — declared once per scene or inherited from a folder.
- **Pros:** instantly raises atmosphere; same delivery channel as music; survives between blocks so silence stops feeling like absence.
- **Cons:** another asset per scene to author and ship; mixing voice + music + ambience needs care; not all stories want it.
- complexity 2

### Idle flavour lines
After the player has been still on a scene for N seconds with no choice taken, reveal an extra paragraph the author wrote just for that pause — a second thought, a noise from the corridor, a memory.
- **Pros:** rewards hesitation; gives writers a way to express the *pressure* of a moment; very low engine cost.
- **Cons:** can feel naggy if overused; needs an "off" knob per scene; players who read slowly get treated as idle.
- complexity 2

### Soft scene transitions
Brief crossfade to black (or to a colour the theme defines) between scenes, optionally with a one-line "interstitial" the author can write — "Hours later." / "The corridor." Not a full splash, just a beat.
- **Pros:** gives the author a knob for time/space jumps without writing transitional prose; reads cinematic.
- **Cons:** more pacing decisions per scene; can become a tic if every transition uses one.
- complexity 2

---

## 2. Memory and reflection

The engine tracks visited scenes, flags, and stats — but nothing in the reading experience reflects them back. Disco Elysium and Sunless Sea both treat the player's accumulated state as something the world *notices*. Small surfaces here go a long way.

### A "what you know" page
A second journal tab listing the knowledge-flags the player has gathered, each with an author-written line. Not a list of mechanical flags — a list of things the character has come to understand.
- **Pros:** turns invisible state into narrative payoff; rewards exploration; aligns with the "intangible inventory" the foundation calls out.
- **Cons:** doubles authoring load on flags (each one needs a sentence); risks restating things the prose already said.
- complexity 2

### Auto-journal of choices made
Each non-trivial choice quietly appends a line to the journal — "You let the dog go." / "You opened the locked drawer." Authored as an optional `journal_on_choose:` field on the choice.
- **Pros:** closes the loop between decision and consequence; gives later scenes something to reference; makes long sessions feel weightier on resume.
- **Cons:** journal can balloon; choosing what to log is itself an authoring decision; players who skim may resent the extra surface.
- complexity 2

### Reflection scenes
Author-marked scenes that, on entry, swap in alternate text based on which named flags are set — not just a single `if`, but a small palette ("if you spared X and lost Y, this is what you remember"). Engine just needs an ordered list of conditional blocks; the *practice* is the new thing.
- **Pros:** Lone Wolf-style payoff; encourages writing scenes that are explicitly about looking back; cheap mechanically.
- **Cons:** mostly a writing convention, not an engine feature — risk of feeling like docs not capability; fragile if flags get renamed.
- complexity 1

---

## 3. Pacing and presence

The current rhythm is: text streams in, choices appear, you click. Authors have very little control over *time* as a felt thing inside that loop.

### Author-controlled pauses between blocks
A `pause: 1500` field on a text block that adds (or replaces) the gap before the next block reveals. Useful for "...." beats and for letting a single image-line breathe.
- **Pros:** trivial engine change; gives writers timing as an instrument; makes existing audio-paced reveal feel more deliberate even without audio.
- **Cons:** another knob to tune; risk of authors over-pausing; testing is slow because you have to wait through your own pauses.
- complexity 1

### Held-breath choices
A choice that, after a delay, *changes or disappears* — the lit-fuse pattern. Marked with `expires_after: 8s` and an optional fallback choice that takes over.
- **Pros:** introduces felt urgency without breaking the click-to-advance contract; very Sorcery!-feeling; rare enough to stay special.
- **Cons:** crosses a line from "engine serves the text" toward "mechanic"; accessibility concerns for slow readers; needs a clear visual language.
- complexity 3

### Slow-reveal long scenes
For scenes that are mostly atmosphere, allow the author to mark the whole scene as "drift mode" — blocks reveal much more slowly, music swells, choices appear last and quietly.
- **Pros:** gives long descriptive scenes a different gear; pairs naturally with ambient sound; signals to the reader that this is a *place* not a *junction*.
- **Cons:** risks impatience; slow-reveal without audio can feel like a stalled page; another mode for authors to learn.
- complexity 2

---

## 4. The selector and meta layer

The story selector is a card list. It's functional. It could carry more weight as the *entry hall* — a thing the reader returns to between sessions.

### Per-story progress badges
Once a save reaches certain author-declared milestones ("ending reached", "first act complete", "found the cache"), show a small mark on the card. Stories define the milestone names in `story.yaml`.
- **Pros:** gives long stories a sense of progress without spoilers; encourages replay for missed branches; trivial to ignore if a story author doesn't define any.
- **Cons:** invites achievement-thinking the foundation explicitly avoids; can feel gamey on a literary piece.
- complexity 2

### Multiple slots per story
Two or three save slots per story instead of one, named on creation ("Loyalist run", "Saboteur run").
- **Pros:** removes the "do I overwrite my good ending" anxiety; encourages reread-as-different-character; fits Lone Wolf / Fabled Lands campaign feel.
- **Cons:** more UI on the card; LocalStorage gets noisier; resume flow has to ask which slot.
- complexity 3

### Cross-story flags
A tiny shared LocalStorage area for flags that survive across stories — "you finished Vault 34" unlocks a passing reference inside another story. Authors opt in.
- **Pros:** Fabled Lands-style continuity; rewards readers who finish things; almost free at the engine level.
- **Cons:** couples stories that are otherwise portable; awkward when sharing a single zipped story; easy to overuse.
- complexity 2

### Better discovery on the menu
A short rotating quote from each story (author-supplied), hover/long-press to read more before committing to Play. No mechanics — just better presentation.
- **Pros:** more inviting on first launch; lets authors sell their tone before the splash; cheap.
- **Cons:** more content to write; risk of spoilers in the quote.
- complexity 1

---

## 5. Authoring quality of life

Authors are the bottleneck. Anything that shortens the loop between writing a scene and seeing it work pays for itself fast.

### Live-reload while writing
A tiny dev mode that polls scene YAML and reloads the current scene when it changes on disk. Off by default; toggled with a query string.
- **Pros:** transforms iteration speed; doesn't change the runtime behaviour for readers; pure ergonomic win.
- **Cons:** needs a local dev server (the project is currently file:// or static); fetch caching can fight it; another path to maintain.
- complexity 2

### Scene graph visualiser
A page that renders the story's scenes as a graph — nodes for scenes, edges for choices, dimmed for gated. Read-only, opened from the menu in dev builds.
- **Pros:** catches dead-ends and orphaned scenes; helps authors see the shape of their own story; uses YAML already on disk.
- **Cons:** non-trivial to build well; large stories get hairball-shaped; risk of authors *designing for the graph* rather than the read.
- complexity 4

### Authoring lints
The existing `validate_story.py` could be extended: warn on unreachable scenes, dead flags (set but never required), choices that always fail, audio files missing for a block that has text.
- **Pros:** catches real bugs; runs in the existing script; cheap to extend incrementally.
- **Cons:** false positives (intentional dead flags, deliberately-failing choices) need an opt-out syntax.
- complexity 2

### Shorthand for common patterns
The "consumable choice" pattern (requires `flag_unset`, sets the flag, scene-once) takes four lines of YAML. A `once: true` shortcut would make it one. Same idea for "pay N gold" effects.
- **Pros:** straight authoring-simplicity win — exactly the foundation pillar; reduces copy-paste bugs.
- **Cons:** more engine surface to learn and document; sugar can fragment style across stories if mixed with the long form.
- complexity 1

---

## 6. Reading affordances

The reader has very few controls right now: undo, fullscreen, music toggle. The reading experience itself has knobs we haven't exposed.

### Reading speed control
A small control (in the journal panel, say) to slow or speed up block reveal, with audio playback rate left untouched.
- **Pros:** accommodates slow and fast readers without forcing the author's pacing on either; trivial to wire.
- **Cons:** breaks the choreography between voice and reveal if both are happening; one more setting to forget about.
- complexity 1

### Resume-with-context
On Continue, instead of dropping the player straight back into the current scene, briefly show "Last time:" — the last journal entry or the last choice taken — before the scene re-renders.
- **Pros:** addresses the real pain of returning to a story after days; uses data we already have; very respectful of the writing.
- **Cons:** annoying for short sessions; needs a "skip" affordance.
- complexity 2

### Bookmark a moment
A "remember this" button that snapshots the current scene + state to a named bookmark visible in the journal. Player can jump back to it later.
- **Pros:** lets readers explore branches without losing a good run; very gamebook-feeling (literally a bookmark); doesn't replace undo.
- **Cons:** adds save management UI; can interact strangely with one-shot effects already applied.
- complexity 3

### Read-aloud caption mode
For accessibility: option to surface the narrated text in a larger overlay synced to audio playback.
- **Pros:** real accessibility win; reuses the audio timing already in place; useful for non-native readers.
- **Cons:** only meaningful when audio exists; scope creep toward styling another surface.
- complexity 2

---

## 7. The shape of choices

Choices are buttons. They work, but they're the most visible UI element and they're the place where the engine and the writing meet hardest.

### Author-tagged choice tones
Optional `tone:` on a choice — `cautious`, `bold`, `cruel`, `curious`. Renders as a subtle visual cue (a colour wash, a small mark) and could be filterable later.
- **Pros:** Disco-Elysium-style character expression; lets authors signal weight without prose; cheap.
- **Cons:** one more thing to tag per choice; risks turning into mechanics ("always pick bold for +stat").
- complexity 2

### Choices that cost something visible
When a choice has a stat cost or flag effect, optionally surface a tiny preview ("— 1 gold", "— you'll lose the badge"). Author opts in per choice.
- **Pros:** removes "gotcha" from costs the author wants to be transparent; makes weighty decisions feel weighty.
- **Cons:** spoils surprise effects when used by mistake; more choice metadata.
- complexity 1

### Grouped / nested choices
For scenes with many options, allow grouping under a header ("Talk to..." → reveals 4 NPC choices). Pure presentation, no new logic.
- **Pros:** opens up dense hub scenes (Fabled Lands ports) without a wall of buttons; readable.
- **Cons:** another click between intent and action; can hide important options.
- complexity 2

---

## 8. Worldfeel: small scenic flourishes

Things that don't fit a neat category but each make the world feel handmade.

### Per-scene background tint
A scene can declare a colour or gradient that the frame and surface gently shift toward — daylit corridor vs. red-emergency vs. underwater blue.
- **Pros:** a visible second register the author can use; cheap with CSS variables; pairs beautifully with ambient sound.
- **Cons:** can clash with theme.css; risk of garish stories.
- complexity 2

### Drop-cap variants
Author can opt a scene out of the drop cap, or mark a scene as "epigraph" so it renders as a centred italic block instead of regular prose.
- **Pros:** more typographic vocabulary for authors; matches printed-book traditions; small.
- **Cons:** more knobs; theme authors have to think about more states.
- complexity 1

### Rare scene art
Optional one image per scene, shown small and decorative — a margin sketch, not a splash. Missing image is silently ignored, like the cover.
- **Pros:** rewards the rare scene that earns it; doesn't push toward visual novel territory; supports the point-and-click "every screen has texture" inspiration.
- **Cons:** invites authors to over-illustrate; asset pipeline question; can fight the prose for attention.
- complexity 2

### Death/ending variants
Currently the end-of-story state is a generic "— The End —". Allow the author to override the closing line, the button label, and a closing image per ending scene.
- **Pros:** turns each ending into an authored moment instead of a system message; matches Sunless Sea's port-as-story-unit feel.
- **Cons:** more authoring per ending; needs a sane default for stories that don't bother.
- complexity 1

---

## Best bets

- **Authoring lints (§5, complexity 2)** — leverages the existing validator; catches real bugs (unreachable scenes, dead flags, missing audio). Pure authoring-simplicity win, no impact on portability or the reading experience. The "engine serves the text" principle is best served when the *author* isn't fighting the engine.
- **Idle flavour lines (§1, complexity 2)** — gives writers a tool that maps directly onto the Fighting Fantasy / Sunless Sea instinct that *every passage should reward a visit*. Tiny engine change, big effect on worldfeel. Fits narrative fidelity exactly: the engine surfaces more text, doesn't add a mechanic.
- **Author-controlled pauses between blocks (§3, complexity 1)** — one of the cheapest changes here, and it gives authors timing as an instrument. The current block-by-block reveal already implies pacing; this just exposes it. No portability cost, no authoring complexity if you ignore it.
- **Shorthand for common patterns (§5, complexity 1)** — `once: true` and similar sugar directly serve the authoring-simplicity pillar. Tension: any sugar is more engine surface to learn. Worth it if kept to two or three high-frequency patterns.
- **A "what you know" page (§2, complexity 2)** — turns the existing knowledge-flag system into something the reader experiences as memory rather than HUD chrome. Spiritually closest to Disco Elysium / Sunless Sea among the inspirations, and uses data already tracked. Tension: authoring a sentence per flag is real work, and badly-written entries would feel worse than no page at all.
