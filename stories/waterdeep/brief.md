# One Night in the Yawning Portal — Story Brief

## Setting

Waterdeep, the City of Splendors — Forgotten Realms, late evening into night. The Yawning Portal is the famous tavern of Durnan the barkeep, built atop the open well that descends into Undermountain. Adventurers, sellswords, off-duty Watch, scholars, and shadier sorts all crowd the common room. Outside, the streets of the Castle Ward and the Trades Ward are gas-lit by everburning lamps; carts rattle on cobbles, the harbour smells of brine and pitch, and somewhere a temple bell marks the hour.

Tone is **earnest high-fantasy** — heroic but grounded. Wonder, danger, and warmth all played straight. This is not noir, not Discworld-comic, not grimdark. Magic is real and named NPCs from established Waterdeep lore (Durnan, Mirt the Moneylender, perhaps Volo, perhaps a Watch sergeant) populate the tavern. Low-to-mid level scale: this is one adventure, not a city-shaking event.

## Hook

A regular at the Portal — an anxious craftsman or scholar — hires the protagonist for what looks like a simple job: their younger sibling/apprentice took a foolish dare, descended into the Portal's well two days ago, and has not climbed back out. The Watch will not go down. Durnan will not go down for them. The reward is modest but real, and the regulars at the bar will help if the protagonist earns their trust. The truth of what happened in the upper levels of Undermountain unfolds as the adventure proceeds — a missing person becomes a small mystery becomes a real expedition, without ever ballooning to world-saving stakes.

**No time pressure.** Pacing is exploratory: gather rumour, recruit help, descend when ready, return when done. The Portal is the hub; spokes are the well, the Trades Ward streets, the harbour, and one or two specific Waterdeep locations the leads point toward.

## Player Role

**An outsider with skills, newly arrived in Waterdeep.** Came up the High Road from Daggerford with the last caravan before winter, looking for paid work. Not a noble, not a guildsman, no faction allegiance. No history in the city. The Portal is the first place anyone told them to go for work.

**Class: sword-and-spell mix — a wizard who fights.** Trained at a small Sword Coast academy (or self-taught from a master's notes — leave the backstory loose); equally comfortable with a blade in hand and an incantation on the lips. Spell flavour is **arcane / wizardly** — scholarly, prepared, formal: scorching ray, shield, magic missile, mage hand, the occasional fireball-when-it-counts register. Not pact-magic menace, not divine-favour glow. **Fixed loadout** — the protagonist always has both steel and spell available; choices don't push them toward "more sword" or "more magic", they push them toward how to *use* what they have.

**What they want:** earn coin, build a reputation, maybe find a place worth staying.
**What stands in the way:** they don't know the city, don't know who to trust, and the job is bigger than the briefing suggested.

## Companions

**Hard requirement: recruit exactly 2 of 4 candidates from the Yawning Portal before descending.** No solo runs. The act of choosing who comes with you is one of the early defining decisions of the story; the pair shapes which scenes unlock, what tactics are available in combat, and how dialogue plays in the deep.

The four candidates (proposed — Stage 1 may refine names/details):

1. **Korsa Ironbrow** — dwarf sellsword. Frontline tank, drinking buddy energy. Knows nothing about Undermountain but isn't scared of it. Brings axe, plate, blunt counsel.
2. **Sister Vesna** — half-elf priestess of Tymora (Lady Luck). Healing, divine support, the moral voice of the party. Sees the descent as a test of fortune; will pray over corpses.
3. **Pip Tallowmuch** — halfling rogue/scout. Traps, locks, darkvision, sticky fingers. Sceptical of heroics; in it for cut of the take.
4. **Thessaly Vex** — tiefling sorceress. Arcane firepower of a wilder, more chaotic flavour than the protagonist's; complements rather than competes with the wizard's prepared register. Carries her own quiet reasons for wanting to go below.

**Companions can die.** No plot armour for the night. A bad call in combat, a wrong door, an angered NPC — any companion can be lost, and their death changes endings, locks scenes, and follows the protagonist out of the well. Companion death is a real consequence the story leans into, not avoided. Choose carefully, fight carefully, retreat when wisdom calls for it.

Companion-related flags: `recruited_korsa`, `recruited_vesna`, `recruited_pip`, `recruited_thessaly`, plus per-companion `_died` / `_left` flags as needed. Endings will reference the surviving pair.

## Arc Shape

**One adventure**, hub-and-spoke. Three loose movements, no hard act gates:

1. **The Tavern** — arrive, get the lay of the room, take the job, gather rumour, recruit help from the regulars, prepare for the descent.
2. **The Spokes** — follow leads through Waterdeep streets and into the upper levels of Undermountain via the Portal's well. Encounters scale to low-mid level. **Combat is a featured element**: expect set-piece fights — a brawl in a back alley, an ambush in a cellar, a real monster encounter in the deep. Each major spoke has at least one combat beat. Fights can sometimes be avoided through wits or talk, but the adventure leans into them rather than around them.
3. **The Return** — bring back what was lost (or what was learned), settle accounts at the bar, choose how the night ends.

## Combat

Combat is featured, not incidental. Prose is **detailed, gory, and fun** — visceral but with tavern-tale relish. Heroic combat with weight and consequence, played for drama and dark humour rather than grimdark misery or bloodless abstraction. Think: a Critical Role kill described by a DM who likes a good juicy adverb. Steel rings, bones crack, a goblin's last breath wheezes out under your boot, and the listener at the bar grins.

This is consistent with earnest high-fantasy — the violence matters, victory costs something (Vigor), and foes are people or creatures with motives, not numbers. But the *rendering* of combat is where the prose lets loose.

**Vigor** is the combat-facing stat: drains from fights and hardship, gates options, tracks how chewed-up the protagonist is. Low Vigor means combat scenes describe staggering, bleeding, fading; high Vigor means landed blows and clean victories. A small set of combat-related flags emerges naturally (`first_blood`, `weapon_taken_from_X`, `bloodied_in_alley`) — kept narrative, not mechanical.

## Endings

Six endings, hinging on a small set of flags (`rescued`, `bargained`, `stirred_something`, `stayed_in_city`) and one or two stat thresholds:

1. **The Hero of the Portal** — clean rescue, full success. Durnan stands you a drink, your name is remembered. Triumphant.
2. **A Quiet Good** — you did the right thing the messy way; modest coin, modest renown, no fanfare. Bittersweet-warm.
3. **The Bargain** — you got the missing person back by cutting a deal in the dark. They are safe; you carry the weight out. Ambiguous.
4. **Lost in the Deep** — you didn't reach them in time, or didn't reach them at all. You return alone, wiser and grieving. Sombre.
5. **Sworn to the City** — a regular (Mirt, perhaps) offers you a place. The adventure ends with a beginning; Waterdeep claims you. Hopeful.
6. **A Worse Door Opened** — you stirred something below that should have stayed sleeping. Coin in your purse, dread at your back. Dark — but earnest, not nihilistic.

## Constraints

Length: **medium, ~80 scenes** total across all branches. A single playthrough sees roughly 25–35 scenes (~20–30 min).

Stats: yes — four, focused, no faction-rep system.
- **Coin** — gold pieces. Earned, spent, occasionally gates options (a bribe, a hire, a healer).
- **Vigor** — physical condition. Drains from combat, hardship, the descent itself. Low Vigor closes off some paths.
- **Wits** — perception, deduction, social read. Gates noticing-the-clue and seeing-through-the-lie choices.
- **Renown** — how the Portal regulars regard you. Replaces faction rep with one local, earned stat. High Renown opens doors the protagonist couldn't push on day one.

Flags: yes — modest set.
- **Job state:** `job_taken`, `lead_followed_harbour`, `lead_followed_alley`, `descended_well`
- **Allies:** `recruited_dwarf`, `recruited_priestess`, `mirt_owes_favour`, `durnan_respects_you`
- **Discoveries:** `found_journal`, `knows_the_truth`, `met_the_thing_below`
- **Outcomes:** `rescued`, `bargained`, `stirred_something`, `stayed_in_city`

## Tone Reference

The earnest tavern scenes of *Baldur's Gate* (Friendly Arm Inn register), the warmth and weight of *The Hobbit* in Bag End and Rivendell, and the modern-D&D campaign vibe of a well-run table — wonder treated seriously, danger treated seriously, NPCs played as people. Mood-adjacent: *Pillars of Eternity*'s Defiance Bay taverns; the early hours of a Critical Role one-shot before things escalate.

## Visual Feel

**Inked parchment.** Aged off-white background, deep brown/sepia ink for text, a single accent (oxblood red or forest green) for highlights. Serif body face suited to long reading; a slightly looser display face for headings. Soft edges, ruled lines like a hand-bound notebook. No glow, no neon, no terminal. Exact palette and fonts committed in Stage 1.

## Narrator Voice

**Ideal narrator:** cinematic gravitas in the **Wayne June / Ron Perlman family** — lived-in, masculine, mid-baritone or lower, weight in every line — but tuned for **earnest D&D fantasy**, not cosmic horror. Capable of tavern warmth, dungeon dread, and a juicy combat line without slipping into camp. Reads adventure as if it matters.

**Existing options assessed:**
- `narrator_male_ron_perlman` — closest existing fit; gravelly cinematic raconteur. Slightly too jaded/world-weary, but workable as fallback.
- `narrator_male_wayne_june` — too cosmic-horror dark for earnest fantasy; would tip the story into Lovecraftian dread.
- `narrator_haminations` — cartoon, wrong register entirely.

**Named real-person candidates** (voices cloneable from public recordings):

1. **Lance Reddick** *(rest in peace)* — *Source:* extensive interviews, John Wick / The Wire press tours, Destiny game VO, audiobook reads. *Register:* deep, measured, cinematic gravitas; every word weighed. *Why:* in the same family as Wayne June and Perlman — that same lived-in baritone authority — but warmer, more humane. Reads earnest beautifully. *Tradeoff:* posthumous voice cloning is sensitive ground; ethically thin even if technically possible.

2. **Sean Bean** — *Source:* Sharpe TV series, Civilization VI narration, LOTR Extended interviews, audiobook of *I Am Pilgrim*. *Register:* northern-English warmth, lived-in working-man gravitas, good for both quiet tavern tales and taking-no-shit combat narration. *Why:* exactly the kind of "this guy has actually been in a fight" voice that sells gory-but-fun combat prose. Boromir energy fits the earnest-heroic register perfectly. *Tradeoff:* accent reads specifically northern English — may surprise listeners expecting RP or American DM.

3. **Matthew Mercer** — *Source:* Critical Role episodes (thousands of hours), animated voice work. *Register:* modern theatrical D&D DM; dynamic range from hushed mystery to roaring combat call-out. *Why:* the literal reference point for "earnest D&D narrator with gravitas". Listeners reading the brief know this register intuitively. *Tradeoff:* less "cinematic Perlman gravitas", more "skilled working DM". May read lighter than Wayne-June family suggests.

4. **Brennan Lee Mulligan** — *Source:* Dimension 20 episodes, Worlds Beyond Number, Adventuring Academy. *Register:* theatrical, literary, capable of both warm tavern texture and operatic doom; a touch younger and more breath-driven than the Perlman family. *Why:* read aloud as if every sentence is a story being told around a fire. Strong on combat patter. *Tradeoff:* younger / more energetic register; less "doom-baritone" gravitas.

5. **Stephen Fry** — *Source:* Harry Potter UK audiobooks, *QI*, *Hitchhiker's Guide* audiobook, countless documentary VO. *Register:* warm, posh, urbane storyteller; gravitas via intelligence rather than menace. *Why:* tavern-yarn perfection; the listener-at-the-bar grin lands every time. *Tradeoff:* tilts witty / warm rather than cinematic-grim; may undercut the gory-combat brief.

6. **Patrick Stewart** — *Source:* Shakespeare recordings, *Picard* / Star Trek interviews, Macbeth audio, narration for *Sigil*. *Register:* Shakespearean baritone authority; commanding warmth, full theatrical training. *Why:* unimpeachable gravitas; can land both quiet tavern lines and a dragon's roar. *Tradeoff:* may read too stately/regal for a scrappy outsider's POV story; could feel like the DM is *narrating down* to the player.

**Recommendation: Sean Bean.** Best direct match for the brief — lived-in cinematic gravitas in the Perlman family, but warmer and more *heroic* (Boromir/Sharpe register) which is exactly the earnest-D&D pivot the story wants. Combat narration plays to his strengths; he sounds like someone who'd describe a goblin's last breath with genuine relish. Public recording library is enormous and voice-cloning friendly. Working voice ID placeholder: **`narrator_male_sean_bean`**.

**Runner-up: Matthew Mercer** if you want something more recognisably "D&D DM" and less "weathered warrior".

Sourcing/cloning the chosen voice is a Stage 1+ task — not blocking Stage 0.

## Open Questions

None — all parameters set. Narrator voice still needs sourcing/cloning but Sean Bean is the committed recommendation. Ready for Stage 1 sign-off.
