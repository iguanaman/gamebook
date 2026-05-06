# One Night in the Yawning Portal — Act 1: The Tavern

## Journal Entry
You walk into the Yawning Portal with road dust on your cloak and the night ahead of you.

## Entry
Arrives from: story start.
Player state: `scene = portal_arrival`, `Coin 5 / Vigor 8 / Wits 6 / Renown 0`. No flags set. No companions. The protagonist is an outsider, freshly arrived from Daggerford, looking for paid work.

## Beats

### Beat 1 — Arrival at the Portal
What happens: The player crosses the threshold into Durnan's common room — the open well at its centre, the noise, the smell of pitch and ale, the regulars sizing them up. A short orienting beat: the bar (Durnan), the corner table (the anxious client), the loud table (Mirt and his hangers-on), the well itself. No commitment yet — just the lay of the room.
What the player decides/learns: Where to go first. Reads the room's social geometry. First impression of Durnan, the well, and the night's tone.
Connects to: Beat 2 (the Common Room hub).

### Beat 2 — The Common Room (Hub)
What happens: The player's home base for the act. From here they can approach the bar, the client, the regulars, or any of the four candidates. Available choices change as flags are set: client gone after `job_taken`, recruited companions visible at their tables, Durnan's nod on entry once respected, Mirt waving them over once Renown rises.
What the player decides/learns: Pacing — when to take the job, who to court, when they've gathered enough and are ready to descend. Implicit ordering of priorities.
Connects to: Beat 3 (Take the Job), Beat 4 (Rumour & Lore conversations), Beat 5 (Recruitment), Beat 6 (Side Pickups), Beat 7 (Commit to Descend). All loop back here except Beat 7.

### Beat 3 — Taking the Job (Turning Point 1)
What happens: The anxious client at the corner table pitches the missing-apprentice job. Three approaches: accept the modest fee straight; haggle up (Wits gate, Renown loss on failure, locks the option); accept for free / on credit (Renown gain, sets `durnan_respects_you` if Durnan witnesses). All converge to `job_taken` — the client departs, Durnan acknowledges the player on next hub return, and recruitment topics open up across the room.
What the player decides/learns: The shape of the job (missing apprentice, two days, well-bound). Their first real read on how this city values them — bargain hard, do it for the right reasons, or take what's offered.
Connects to: returns to Beat 2 (Common Room) with `job_taken` set.

### Beat 4 — Rumour & Lore (Conversation cluster)
What happens: Three NPC conversation hubs running in parallel: **Talk to Durnan** (the well, the apprentice, the regulars, the player's tab, advice), **Talk to the Client** (what the apprentice was after, the dare, who else knew, what the family will pay — most lead-flag content lives here), **Talk to Mirt** (Waterdeep gossip, an offer of work after this is done, a bad-terms loan — gated by ≥1 Renown). Topics deplete via `asked_*` flags. Some lead flags here pre-seed Act 2 spokes (`heard_about_harbour`, `heard_about_alley_witness`).
What the player decides/learns: The world beyond the briefing — what the apprentice was really doing, who paid attention, where the threads lead. Gives Act 2's spokes their flavour and lets the player choose which lead they're following blind vs. informed.
Connects to: returns to Beat 2 (Common Room) after each topic. The Mirt hub is gated; the Client hub closes once `job_taken` topics are exhausted.

### Beat 5 — Recruitment (Conversation cluster, Turning Point 2 trigger)
What happens: Four parallel candidate-conversation hubs — **Korsa**, **Vesna**, **Pip**, **Thessaly**. Each has 3–4 topics, an asking price (Coin, a favour, a quiet promise), and a recruit choice that only unlocks once their key topic has been heard. Recruiting flips `recruited_X` and the candidate becomes a visible presence in the Common Room (drinking, praying, dicing) — they may interject in subsequent recruitment scenes, sometimes nudging the player toward or away from a second pick. **Hard cap: two recruits.** Once two are recruited, the other two candidates' recruit options close (they politely decline, take work elsewhere, or simply aren't there next visit). The pair-lock is the act's defining choice.
What the player decides/learns: Who they trust at their back. Each candidate's voice, motive, and asking price. The shape of the party they'll take below.
Connects to: returns to Beat 2 (Common Room) after each topic. Once two recruits are flagged, the **Descend** option in Beat 7 unlocks at the well-mouth.

### Beat 6 — Side Pickups (Optional)
What happens: A small handful of one-shot opportunities the player can take or leave from the hub: **Loot the apprentice's room at the inn** (sets `found_journal`, HUD-visible, gates several knowledge checks in the deep), **Steal Pip's hidden caltrops** (free Coin if Pip's not recruited; Renown loss with Pip if she is), **Pay your tab early at the bar** (small Coin cost, small Renown gain, `durnan_respects_you` if not already set). All consumable — `flags_unset` gated.
What the player decides/learns: Whether to act on small advantages, and at what cost. Each pickup has a quiet moral or strategic weight. None are required; all are remembered.
Connects to: returns to Beat 2 (Common Room).

### Beat 7 — Committing to Descend (Turning Point 2 lock)
What happens: With two companions recruited, the player can leave the Common Room and walk to the well-mouth. A short threshold scene: the rope, the dark, the chosen pair beside them, Durnan's quiet word at the back. One last chance to turn around and gather more (Renown, rumour, Coin) before committing. Stepping over sets `descended_well` and locks the act's exit configuration.
What the player decides/learns: Whether they're truly ready. The tone of the descent depends on which pair stands beside them — Vesna prays, Korsa cracks knuckles, Pip checks her gear, Thessaly murmurs something the wizard half-recognises.
Connects to: Act 2 entry. No return.

### Hub — The Common Room
Purpose: Player's home base for the entire act; all conversations, recruitment, side pickups, and the descent commit route through here.
Returned to from: Beat 3 (after job taken), Beat 4 (after each conversation topic), Beat 5 (after each recruitment topic), Beat 6 (after each pickup).
Exits to: Beat 7 (the well-mouth) once two recruits are flagged. Otherwise loops.
Flag-gated changes: `job_taken` removes the client and adds Durnan's nod; each `recruited_X` adds the companion to the room and may insert an interjection line in other recruitment scenes; Renown ≥ 1 unlocks Mirt's hub; Renown ≥ 2 changes Durnan's greeting prose.

### Conversation — Durnan
Purpose: Lore, advice, and the slow build of `durnan_respects_you`. Sits in Beat 4. Recurring across the act — topics deplete, but Durnan's mood updates with player behaviour (paying tabs, refusing brawls, taking the job for free).

### Conversation — The Client
Purpose: Source of most lead flags for Act 2. Sits in Beat 3 / Beat 4. Closes once `job_taken` and key topics are exhausted; client departs.

### Conversation — Mirt the Moneylender
Purpose: City gossip, a Renown-gated offer of post-job work (seeds Ending 5), and a one-shot bad-terms loan (`mirt_owes_favour`, HUD-visible as "Mirt's Favour"). Sits in Beat 4. Gated by Renown ≥ 1.

### Conversation — Korsa Ironbrow (recruitment)
Purpose: Frontline tank candidate. Topics: drinking, the dwarf's last job, why he isn't scared of the well, his price. Recruit unlocks once "the well" topic is heard.

### Conversation — Sister Vesna (recruitment)
Purpose: Healer / divine support candidate. Topics: Tymora, the apprentice (she may have met them), what she sees in the descent, her price (a promise rather than coin). Recruit unlocks once "the descent as test" topic is heard.

### Conversation — Pip Tallowmuch (recruitment)
Purpose: Scout / rogue candidate. Topics: Undermountain rumours she's heard, what she charges, who else has hired her, what she steals. Recruit unlocks once her flat-rate price (5 Coin) is offered and met.

### Conversation — Thessaly Vex (recruitment)
Purpose: Sorceress candidate. Topics: her arcane register vs. the player's, what she wants down there (oblique — her quiet reasons surface across topics), her terms. Recruit unlocks once her "what's down there" topic is heard.

## Exits

All exits leave from Beat 7 (the well-mouth) and carry: `job_taken`, `descended_well`, exactly two `recruited_X` flags, four lead/discovery flags in some combination (`heard_about_harbour`, `heard_about_alley_witness`, `found_journal`, `mirt_owes_favour`, `durnan_respects_you`), and current Coin/Vigor/Wits/Renown values. The **pair** is the primary axis — six pair states. Side flags vary independently within each pair.

- **Exit A — Steel & Faith (Korsa + Vesna):** `recruited_korsa`, `recruited_vesna`. Frontline + healer; combat-resilient and morally weighty. Vesna will pray over corpses; Korsa will pick a fight before it's offered. Strongest sustained-fight party, weakest at sneaking past trouble. → Act 2 entry.
- **Exit B — Iron & Shadow (Korsa + Pip):** `recruited_korsa`, `recruited_pip`. Muscle + scout; brawler-heavy with traps and locks handled. Low subtlety in social scenes — Pip will roll her eyes at Korsa's volume. Best at smashing forward; weakest in the deep against arcane threats. → Act 2 entry.
- **Exit C — Twin Fires (Korsa + Thessaly):** `recruited_korsa`, `recruited_thessaly`. Double-damage; fights end fast and ugly with high collateral. No healer means Vigor management is unforgiving. Strong in the deep, brutal in the alley, no margin for error. → Act 2 entry.
- **Exit D — Light Step (Vesna + Pip):** `recruited_vesna`, `recruited_pip`. Cautious party; best at avoiding fights through guile and faith. Fewest combat options unlocked, most non-combat resolutions. Vulnerable in any fight that can't be ducked. → Act 2 entry.
- **Exit E — Magic & Miracle (Vesna + Thessaly):** `recruited_vesna`, `recruited_thessaly`. Strongest party against the *thing* in the deep; weakest in a tavern brawl or mundane fight. Vesna's faith and Thessaly's chaos make uneasy harmony — dialogue tension between them across Act 2. → Act 2 entry.
- **Exit F — The Sneaky Route (Pip + Thessaly):** `recruited_pip`, `recruited_thessaly`. Chaotic and clever; unlocks the deepest stealth route through the upper levels and the most arcane-flavoured dialogue with whatever waits below. No tank, no healer — combat is a last resort and often a fatal one. → Act 2 entry.

**Within each exit, side-flag variation is independent of the pair:**
- `durnan_respects_you` — set if the player took the job for free *and* Durnan witnessed it, or paid their tab early. Affects Act 3 settle-up tone and one Act 2 callback.
- `mirt_owes_favour` — set if the player took Mirt's bad-terms loan. HUD-visible. Required for Ending 5.
- `found_journal` — set if the player looted the apprentice's room. HUD-visible. Gates several knowledge checks in the deep.
- `heard_about_harbour` / `heard_about_alley_witness` — set per topic exhausted with the Client. Pre-seeds Act 2 lead choice; absent flags mean the player picks Act 2 leads cold.
- Coin / Vigor / Wits / Renown — carry forward as accumulated. Renown ≥ 2 entering Act 2 keeps the Hero ending tier reachable; Renown < 0 closes it.

## Flags/Stats Changed

**Job state:**
- `job_taken` — set when the player accepts the client's offer in Beat 3, by any of the three approaches. Hidden.
- `descended_well` — set when the player commits in Beat 7. Hidden.

**Recruitment (drives Act 2 branching):**
- `recruited_korsa` / `recruited_vesna` / `recruited_pip` / `recruited_thessaly` — set when the candidate accepts. Hard cap of two enforced by Beat 5 logic. Hidden.
- Per-candidate `asked_*` topic flags inside each recruitment hub. Hidden.

**Conversation tracking:**
- Per-topic `asked_*` flags inside Durnan / Client / Mirt hubs. Hidden.

**Discoveries:**
- `found_journal` — set in Beat 6 if the apprentice's room is looted. **HUD-visible** as "Apprentice's Journal".

**Allies / standing:**
- `durnan_respects_you` — set if the player takes the job for free with Durnan witnessing, or pays their tab early. Hidden, surfaces in prose.
- `mirt_owes_favour` — set if the player accepts Mirt's bad-terms loan. **HUD-visible** as "Mirt's Favour".

**Lead flags (pre-seed Act 2):**
- `heard_about_harbour` — set when the Client's harbour topic is heard. Hidden.
- `heard_about_alley_witness` — set when the Client's alley-witness topic is heard. Hidden.

**Stats:**
- **Coin** — modest gains from job-acceptance variant (modest fee) or Mirt's loan; modest losses from Pip's hire (5 Coin), tab payment, occasional bribes. Ends Act 1 in a typical range of 3–12.
- **Vigor** — generally untouched in Act 1 unless the player picks a brawl (Renown loss too); ends near the starting 8.
- **Wits** — unchanged unless a check costs it (none planned in Act 1).
- **Renown** — primary mover. Up: paying tabs, refusing to brawl, taking the job for free, helping a regular. Down: starting fights, stiffing Durnan, failing the haggle, stealing Pip's caltrops if Pip is recruited. Typical Act 1 range: −1 to +3.
