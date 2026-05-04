# What the Code Medium Lets Us Do

A gamebook printed on paper can't change its text after you read it, can't remember what you did last week, can't play music timed to your choices, and can't feel different for a second-time reader. We're on a browser. This document explores ideas native to that advantage — things that would be impossible or impractical in a printed book, and things the code medium enables that we haven't exploited yet.

This is not about features for their own sake. Everything here should serve the writing.

---

## What we have

Full branching with stats, flags, conditional choices and text, undo history, audio per text block timed to narration, act titles with animations, per-story CSS theming, LocalStorage persistence, a visible HUD for named flags and stats, and a story selector with cover art. The engine is a one-file static site with no build step.

---

## 1. Time and memory: the medium knows when you were here

A physical gamebook doesn't know if you're reading it for the first time or the fifteenth. We do. The engine already tracks `visited` — scenes you've been to. There's room to do much more with this without any new infrastructure.

### First-visit versus return-visit text already in one scene
A scene could show completely different prose on a second visit without branching to a new scene file — the engine renders the `if: visited` block instead of the default text. Currently this works but nothing encourages authors to use it systematically. A dedicated `revisit_text` shorthand field would make this pattern obvious and authoring-friendly.
- **Pros:** world memory costs almost no authoring effort; even one changed line makes a space feel lived-in; maps directly onto how we remember places in real life
- **Cons:** authors may forget to fill it in, leaving most scenes identical on revisit
- complexity 2

### A scene that knows how many times you've been there
Not just "visited or not" but a count — visit once, the guard is suspicious; visit twice, they stop you; visit a third time, there's a scene. Requires tracking visit counts rather than just visited-or-not. Small engine change; opens a new authoring dimension.
- **Pros:** creates escalating scenes without needing separate scene files for each state; NPC patience, suspicion, and familiarity can accumulate naturally
- **Cons:** visit counts as a concept must be taught to authors; extra state to manage and persist
- complexity 2

### Time-of-playthrough context
Not real-world time — but the engine knows how far into the story you are (scenes visited, choices made, acts completed). A scene deep in the story could feel different from the same scene near the beginning — more weight, more callbacks. Currently there's no way to express "this is late in the story" without counting flags manually.
- **Pros:** gives authors a way to let the narrative register shift as the reader progresses; creates natural rising tension
- **Cons:** "story progress" is hard to define cleanly across branching paths; authors may disagree on what "late" means
- complexity 3

---

## 2. Reader-paced versus author-paced: the tension of scroll and reveal

A physical book shows everything on the page at once. We reveal text block by block, timed to audio. That's a power worth exploiting more deliberately.

### Choices that appear between blocks, not after them
Currently choices appear after the last audio block ends. But a scene could front-load its text and then ask a question midway — "The door opens. You hear voices inside. What do you do?" — before more text continues based on your choice. The rhythm of revelation can carry narrative tension.
- **Pros:** puts decisions at the point of maximum tension, not after the scene has resolved itself; mimics the best Choose Your Own Adventure pacing
- **Cons:** mid-scene branching complicates the rendering model significantly; audio sequencing must handle the branch point
- complexity 4

### Pause points — a deliberate beat before the next block
An empty beat in the audio sequence, or a `pause` block in scene YAML, that holds for a moment before revealing the next paragraph. Not a choice — just silence. Theatre uses this. So does good prose.
- **Pros:** gives the narration breathing room; underlines moments of weight; free for authors to use without new UI
- **Cons:** easy to overuse; pacing decisions are in the hands of an author who can't hear what the silence sounds like without running the story
- complexity 1

### Block reveal on user interaction rather than audio end
Instead of revealing the next paragraph when its audio clip ends, wait for the player to click or press a key. The player controls the pace entirely, like turning a page. Audio and reveal decouple.
- **Pros:** puts the reader in control of tempo; good for dense or emotional passages where a forced pace feels wrong; accessibility gain
- **Cons:** breaks the tightly timed audio-plus-text reveal that's a current strength; could feel like clicking "next" in a PowerPoint; the two modes may conflict
- complexity 2

---

## 3. The persistent world: things that exist without being visited

In a printed gamebook, nothing happens while you're not looking. On a browser with LocalStorage, the world can change between sessions. Not through a server — just through time and what state says.

### A world clock: events that depend on how many sessions have passed
Not real-world time, but session count — each time you launch the game counts as a "day." An NPC could be gone after three days, a fire could have spread to a new district, a window of opportunity could have closed. Implemented via a session counter in LocalStorage and flag conditions against it.
- **Pros:** creates genuine urgency without a countdown timer; the world feels like it moves whether or not you do; diegetically justifiable in almost any setting
- **Cons:** session count is not a reliable proxy for time; a player who opened the game briefly and closed it "used" a day; could feel unfair
- complexity 2

### Save slots and the ability to compare paths
Not just one save per story but multiple named slots — "before the castle," "peaceful ending," "the bad path." Players could replay from branches without losing a completed run.
- **Pros:** empowers non-linear exploration; the story becomes an artefact to explore rather than a path to reach the end of; aligns with how most people actually replay interactive fiction
- **Cons:** adds significant UI complexity to the selector and game shell; complicates the "continue" flow; storage management becomes a real concern
- complexity 3

### A "new game plus" mode with carried knowledge
After finishing a story, you could start again with certain flags pre-set — the knowledge your character gained without the story progress. An NPC who was a mystery on a first run greets you differently because you know who they are. The second read-through has a different register.
- **Pros:** the re-read is a first-class experience, not just replaying; creates literary depth (the story means more when you know how it ends); already common in digital games, rare in gamebooks
- **Cons:** requires stories to be authored with this in mind; flags must be explicitly marked as "carries through on new game"; a story that doesn't use this feels identical on replay
- complexity 2

---

## 4. The reader leaves traces: readable history and the path taken

A physical gamebook forgets which passages you read. We don't.

### A log of choices made — a readable "journey record"
Not just undo history (which is functional), but a human-readable log: "You chose to trust the merchant. You left the sword behind. You told the truth." Each choice appends a short phrase to a log, visible at end of story or in a side panel. The player can re-read their story as a summary.
- **Pros:** makes consequential choices feel more real by recording them; the journey record is a reader artefact — a summary of *their* story; strong replay incentive; close to Sorcery!'s keyword log
- **Cons:** authors must write log lines for every choice (or engine auto-generates from choice text, which looks mechanical); adds a new output to think about while authoring
- complexity 2 (auto-generated), complexity 3 (author-written log lines)

### "You've already been here" markers in the narrative
When narrative accumulates across scenes in an act, the reader scrolls back through earlier text. A subtle visual marker on scenes you've returned to would distinguish first-visit from revisit without changing the prose.
- **Pros:** zero authoring burden; gives spatial orientation in long narrative accumulations; makes revisit patterns legible
- **Cons:** adds UI chrome that may distract; the distinction may not be meaningful enough to earn a visual indicator
- complexity 1

### End-of-story path summary
At "The End," show a brief summary of the unique path taken — acts traversed, major flag states, choices that were close calls (failed requirements that existed). A post-credits sequence the book can never offer.
- **Pros:** satisfying closure; invites comparison with other players' paths; surfaces the choices that mattered without a separate UI
- **Cons:** authors must design with this in mind; auto-generated summaries can feel generic without authored flavour text per ending
- complexity 3 (authored), complexity 2 (auto-generated)

---

## 5. The medium knows your screen: responsive presentation and typography

A physical book has fixed dimensions and fixed type. A browser has variable screens, keyboard shortcuts, dark mode, and font size preferences.

### Dark mode / light mode toggle with per-story overrides
The engine already supports per-story theming via `theme.css`. A reader preference for light or dark could be stored and applied globally, with each story's theme providing both variants. The toggle would be a single UI element in the HUD or game shell.
- **Pros:** huge accessibility and comfort gain; readers who play at night shouldn't burn their eyes; trivial to implement in CSS variables; no authoring impact
- **Cons:** per-story themes must define both variants or they'll look wrong; authors gain a new obligation
- complexity 2

### Keyboard navigation
Every choice accessible by pressing a number key (1, 2, 3...) or letter key. Undo accessible via backspace or `U`. No mouse required to play through a full story.
- **Pros:** dramatically better flow for readers who read quickly; no reaching for mouse mid-paragraph; accessibility gain for motor-impaired users; feels natural for text-heavy experiences
- **Cons:** keyboard shortcuts conflict with browser defaults in some cases; must not interfere with text selection or link navigation
- complexity 1

### Adjustable text size
A simple `+`/`-` UI element that scales the body font size. Stored in LocalStorage. Costs the author nothing.
- **Pros:** immediate accessibility gain; readers on different devices have different needs; trivial to implement
- **Cons:** font scaling at extreme sizes breaks fixed layouts; the narrow max-width of 680px limits how badly things can break
- complexity 1

### A reading mode: no HUD, no choices visible until end of block
A toggle that hides the HUD and choices until the narration finishes, enforcing passive reading. For stories built like literary fiction rather than games — or for a second read-through where you want to experience the story without stopping to choose.
- **Pros:** changes the register from game to story; audiodrama-like experience when combined with narration; one toggle enables a radically different mode
- **Cons:** the interactive element is the point of a gamebook; this mode undermines it; could be perceived as a missing feature rather than a mode
- complexity 2

---

## 6. Audio as a first-class creative tool

The engine already syncs audio to text blocks. But audio is currently generated narration — we're not exploiting it as atmosphere.

### Ambient audio: background sound loops per scene or per act
A scene could specify an ambient loop — rain, tavern chatter, dungeon drips — that plays continuously beneath the narration and fades when you navigate away. Set at the scene level with a simple `ambient:` field.
- **Pros:** transforms immersion dramatically; text that reads as "a quiet forest" becomes one; zero authoring effort for scenes without ambient (field is optional)
- **Cons:** requires finding or generating ambient clips; loop points must be set to avoid jarring cuts; adds audio asset management overhead
- complexity 2 (engine), complexity varies by story (content)

### Music tracks per act
An `act_music:` field that plays a looping background track for the duration of an act, fading when the act changes. Different from narration — purely atmospheric. Fighting Fantasy had no music; Sorcery! on mobile did.
- **Pros:** act music is the strongest signal to the reader that the register has changed; costs nothing at the engine level if no music is provided
- **Cons:** music and narration need mixing attention; browser audio mixing without a real engine is awkward; music selection is subjective and hard to get right in text
- complexity 3

### Spatial / voice differentiation: different narrators per character
Currently the narrator is a single voice. Dialogue blocks could use per-character voice actors — a gruff `male1` voice for one NPC, a different voice for another. The TTS server can probably support multiple voices per story; the engine just needs to route by block type.
- **Pros:** makes dialogue scenes dramatically more vivid; already partially modelled (dialogue blocks have a speaker key); aligns with the point-and-click adventure inspiration
- **Cons:** audio generation becomes a significant pipeline; multiple voice WAV files per story; quality mismatch between TTS voices can be jarring
- complexity 2 (engine routing), complexity high (content production)

### Silence as authored structure
A choice or navigation event that deliberately silences all audio — the narration stops, ambience cuts. Used at a moment of dramatic shift. Engine currently always tries to play the next clip; it doesn't express deliberate silence as intent.
- **Pros:** the most powerful audio tool is the moment the sound stops; literary authors know this; currently unexploitable
- **Cons:** silence in a web context is ambiguous — readers can't tell if it's intentional or a broken audio file
- complexity 2

---

## 7. Story as object: sharing, embedding, and portability

A physical gamebook has an ISBN and a spine. A web game has a URL and a save file.

### Shareable save states via URL fragment
Export the current game state as a Base64 URL fragment. Anyone who opens that URL resumes exactly where you left off — same flags, same history. No server needed; the state is in the URL.
- **Pros:** natural sharing mechanic; "I'm at this point, what would you do?" becomes a real social dynamic; the whole state is portable and inspectable
- **Cons:** state can be large; URL sharing is imperfect (social apps truncate); raises questions about cheating in competitive/communal play contexts
- complexity 2

### Embeddable single-scene preview
A `?preview=sceneId` query parameter that loads a story at a specific scene without restoring state. Useful for sharing a specific moment ("read this scene"), useful for authors demoing a section.
- **Pros:** authors can share a scene for review without walking through the whole story; marketing/preview use case for sharing the first impression of a story
- **Cons:** scenes depend on state (flags, stats); a preview scene with failed requirements looks wrong without prior context
- complexity 2

### Story export: bundle as a zip for offline play
A button that packages the current story (YAML files + engine + style + audio) as a self-contained zip. The ultimate portability expression: a friend can unzip and open it locally without internet.
- **Pros:** the "zip and send to a friend" philosophy from foundation.md, made literal and one-click; no server required; strong appeal for stories you want to gift
- **Cons:** zip creation in the browser is doable (JSZip) but adds a non-trivial dependency; audio files make the bundle large; cross-origin concerns with local file:// access
- complexity 3

---

## Best bets

**Keyboard navigation** (number keys for choices, backspace for undo)
Nearly zero code — a single `keydown` listener routing to existing click handlers. No authoring impact, no portability concern. Immediately improves the reading experience for anyone who reads faster than they mouse. The physical book inspiration is irrelevant here: this is a pure medium advantage we're leaving on the table.
complexity 1. Best ratio in the document. Fits all three pillars perfectly — authors don't even notice it.

**Ambient audio per scene**
A single optional `ambient:` field in scene YAML. Stories without it are unaffected. Stories with it gain something no printed gamebook can offer. The Fighting Fantasy dungeons should drip; the tavern should rumble. Authoring is opt-in; portability is unchanged (ambient files travel with the story folder); narrative fidelity is high — the text tells you it's a dungeon, the audio makes it one.
complexity 2.

**Revisit count (how many times you've been here)**
Small engine change, new authoring dimension. A space that reacts to your third visit differently from your second is doing something prose fiction cannot easily do. The Fabled Lands hub-world feel lives in this idea — the market that's slightly different every time you walk through it.
complexity 2. No portability or authoring simplicity concern; pure narrative gain.

**Journey record (readable log of choices made)**
A story that remembers itself for you. At minimum, auto-generated from choice text (cheap), but author-crafted log lines create something a player wants to screenshot and share. The physical book cannot produce a personalised summary of your path through it. Medium advantage, pure.
complexity 2 (auto-generated). Authoring simplicity: unaffected if auto-generated. Portability: unchanged. Narrative fidelity: high — this is the story you made, not the story that was always there.

**Adjustable text size + dark mode**
Two independent settings, both stored in LocalStorage, both purely CSS. Zero authoring cost. Accessibility and comfort gain. The printed book has fixed ink on fixed paper — we don't. Not glamorous, but nearly free, and the kind of thing readers notice when it's absent.
complexity 1 each.
