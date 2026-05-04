# One Night in the Yawning Portal — Act 2: The Spokes

## Journal Entry
The well swallows the lamplight, and Waterdeep's other mouths open in answer.

## Entry
Arrives from: Act 1 Exit A / B / C / D / E / F (any of six pair configurations).
Player state: `scene = act_2_open`, `descended_well` and `job_taken` set, exactly two `recruited_X` flags, current Coin/Vigor/Wits/Renown carried forward (Vigor likely 7–8, Coin 3–12, Renown −1 to +3). Side flags vary independently within each pair: `durnan_respects_you`, `mirt_owes_favour`, `found_journal` (HUD-visible), `heard_about_harbour`, `heard_about_alley_witness`. No companion deaths yet; no outcome flags set.

## Beats

### Beat 1 — The Well-mouth (Transitional Hub, first visit)
What happens: The lip of Durnan's well, rope coiled, lantern lit, the chosen pair beside the player. A short reorientation: the night above, the cold below, the choice of which thread to pull first. Companion-pair colour establishes register — Korsa testing the rope's anchor, Vesna sketching Tymora's coin in the air, Pip casing Durnan's apron pockets one last time, Thessaly murmuring at the dark. The player can step away from the rope and back into Waterdeep's streets to chase a city lead, *or* commit straight down. Stepping down without a city lead first sets `lead_followed_direct` (Renown cost — the regulars notice the brashness), which closes both city spokes.
What the player decides/learns: Order of attack — city first or well first. The pair's voice. The first sense that the night has weight.
Connects to: Beat 2 (Spoke Hub) if a city lead is chosen; Beat 5 (Upper Levels Hub) if direct descent is taken.

### Beat 2 — The Spoke Hub (Trades Ward street corner)
What happens: A small navigable cluster outside the Portal — the corner where the Trades Ward bleeds into dockside lanes. From here the player can pursue the **alley** lead, the **harbour** lead, return to the Portal's well-mouth (Beat 1) to descend, or duck into one of two short side beats (a shrine-stoop where Vesna can refresh, an alley-corner fence where Pip knows a name). Lead options are flavoured by `heard_about_harbour` / `heard_about_alley_witness` — known leads are signposted; unknown leads are cold-guessed and pricier in Vigor. Each city spoke is a one-way commitment: once the player commits to a spoke, the hub closes that spoke's option (re-entered after resolution as `*_spoke_done`).
What the player decides/learns: Which lead matters more. Whether to take both city spokes (slower, Vigor cost, more flags) or commit to one and descend. The pair's tactical preference surfaces — Pip points at the harbour, Vesna at the alley, etc.
Connects to: Beat 3 (Alley Spoke), Beat 4 (Harbour Spoke), Beat 1 (return to Well-mouth) once at least one city lead is resolved or the player wants to descend cold.

### Beat 3 — The Alley Spoke (Trades Ward backstreet)
What happens: The witness who fled the apprentice's last city sighting holes up in a back-lane lodging above a chandler's. The approach is a small navigable mini-cluster: a doorway with a watchman to bluff or bribe, a roof-route Pip can spot, a side window, the front. Reaching the witness opens a short conversation (lies, half-truths, a name). The witness has *protection* — a knot of Trades Ward toughs paid to make this conversation costly. **Set-piece combat: the alley brawl.** Three to five toughs, cobblestones underfoot, a chandler's vat of wax to pull down, gas-lamps to break for cover. Combat options surface from the pair: Korsa anchors a chokepoint, Pip drops caltrops or slips behind, Vesna steadies the bleeding, Thessaly throws fire that scares the witness silent. The fight is *gory and fun* per the brief — broken teeth, a tough impaled on his own boarding-pike, a thrown lantern, a wax-slick rout. Outcome variants: the witness sings (flag `alley_witness_named`), the witness bolts (flag `alley_witness_lost`), or the witness dies in the brawl (flag `alley_witness_dead`). Combat colour: `bloodied_in_alley`, `first_blood` if not already set. Companion death is on the table here — most likely Pip or Vesna if the player picks fights without thought; Korsa is hardest to drop in a brawl.
What the player decides/learns: The apprentice didn't go down the well alone — there was a *guide*, and the guide came back wrong. Sets `lead_followed_alley`. Earliest place to bury a companion. Earliest place to set `first_blood`.
Connects to: returns to Beat 2 (Spoke Hub) with `alley_spoke_done`; or to Beat 1 (Well-mouth) if the player has had enough of the city.

### Beat 4 — The Harbour Spoke (Dock 14, the Sea Maiden's Repose)
What happens: The apprentice was last seen near a derelict moored at the long quays, paying a bargeman for something the bargeman won't say aloud. Approach is a hub-let: the bargeman's shanty (talk), the derelict itself (climb aboard, a quiet exploration scene), the harbour-master's office (records, a small Wits gate). Boarding the derelict triggers a cold dread — the smell, the algae growing in patterns it shouldn't, a wet print climbing up a bulkhead. **Set-piece combat: the harbour ambush.** Three things from below have been *waiting* — drowned-thing kuo-toa or a lone aboleth-touched sailor with two thralls, depending on `found_journal` foreshadowing — and they take the boat as the player searches it. The fight is fought on slick decks, with the harbour at the player's back; falling overboard is a Vigor sink, not death, but it costs companion-help to recover. Combat options: Thessaly's thunder-spell in tight wood (great damage, structural risk), Vesna's radiant burst against the water-things (extra damage, taxes Vigor), Pip's stealth-kill on the human cultist (decisive if landed), Korsa's hold-the-gangway (denies retreat, Vigor heavy). Outcomes: the player retrieves a *waterlogged page* of the journal that updates `found_journal` text to "Apprentice's Journal (saltwater-stained)" — and pre-sets `met_the_thing_below_glimpse` (a hidden flag that softens the deep encounter's surprise). On a bad fight, a companion drowns or is dragged below — `*_died` flag with the harbour as colour. On a perfect fight, the player learns the apprentice *was alive three nights ago* — flag `apprentice_alive_recently`.
What the player decides/learns: The threat isn't just *down there* — it's reaching *up*. Sets `lead_followed_harbour`. The apprentice may still be saveable. Companion death is on the table here too — Vesna and Thessaly are most exposed in the water; Korsa sinks fastest in plate.
Connects to: returns to Beat 2 (Spoke Hub) with `harbour_spoke_done`; or to Beat 1 (Well-mouth) if the player commits.

### Beat 5 — The Upper Levels (Hub, Undermountain — three chambers)
What happens: Player commits to the well, descends, and emerges in a small navigable loop of three chambers in the upper Undermountain — **the Cistern** (a flooded vaulted room with a partially-collapsed bridge), **the Apprentice's Camp** (an abandoned sleeping-spot with a guttered candle, scratched runes on a pillar, and a hidden cache), and **the Cellar Door** (a stone hatch sealed with wax and a name written in chalk — the apprentice's). The player can move between them in any order. Each chamber has a small encounter or discovery. Pair-shaped tactical flavour everywhere: Pip darkvisions ahead, Korsa wedges open the bridge, Vesna's coin-toss disturbs a glyph that reveals the cache, Thessaly *recognises* the runes as her own school's hand and goes very quiet. **Set-piece combat: the cellar/Undermountain encounter.** A pack of cellar-dwellers — ghouls, goblins under a wretched warlock, or bone-wights guarding the hatch, depending on which leads were followed — between the player and the Cellar Door. The fight is the *meat-grinder* of the act: tight quarters, no quick retreat, Vigor will hurt. Companion death is most likely here. Combat options: Korsa's plate-tank in the doorway (saves Vesna, sinks his Vigor), Vesna's mass-heal at a price (her Vigor for the party's), Pip's flank-and-throat (kills a wight chief in one stroke if Wits gates allow), Thessaly's chain-spell (clears the room *and* cracks the hatch, opening Beat 6 early but loud — sets `arrived_loud`). Combat colour: `weapon_taken_from_X` per the brief's combat flag set, where X is the foe-type defeated. After the fight, the Cellar Door opens (or is breached). The player may also retreat from the Upper Levels back to the Well-mouth with no resolution if Vigor is too low — a hard exit (`retreated_upper`, locks Beat 6).
What the player decides/learns: The apprentice came *here* and went *deeper*. The runes; the wax seal; the chalked name. Flag `knows_the_truth` is set on entering Beat 6 — the player knows the shape of the threat before the encounter. If `found_journal` is held, an extra discovery scene fires (a journal entry matches the chalked name; flag `journal_decoded`).
Connects to: Beat 6 (the Deep Encounter) once the Cellar Door is open and the party isn't in retreat; Beat 7 (Climb Out) on `retreated_upper` exit.

### Beat 6 — What Is Really Down There (Turning Point 4 — the Deep Encounter)
What happens: Beyond the Cellar Door, a low chamber with a still pool, the apprentice on the far side, kneeling, *talking* to something the player cannot see clearly. The thing is not a monster fight by default — it is a *meeting*. Flag `met_the_thing_below` is set on entry. Three principal approaches surface (some hidden until conditions are met):
- **Fight through.** A real, dangerous combat — pair-flavoured. Not the act's biggest brawl by *blood* (that was Beat 5), but the most dangerous by *consequence*: companions are exposed and the *thing* fights with the apprentice as a hostage / shield. Outcome paths fork further: kill the thing and grab the apprentice (`rescued`, no `bargained`), kill the thing and lose the apprentice (no `rescued`), or break and run (no `rescued`, possible companion `_left` if a survivor refuses to leave them).
- **Parley.** Available if the player heard the harbour journal-page *or* has Thessaly recruited *or* `found_journal` + sufficient Wits to read its terms. The thing offers a deal: the apprentice goes home, marked. Sets `bargained`; sets `rescued`; the apprentice walks out *changed*. Vesna will object — possible `vesna_left` if she's recruited and the player accepts.
- **Stir-and-flee.** Wake whatever larger thing the encounter-thing is the *envoy* of, and run. Sets `stirred_something`. May or may not also set `rescued` depending on whether the player grabs the apprentice on the way out; Vigor cost is severe; companion death likely if the player isn't fast.
What the player decides/learns: The whole story — the apprentice didn't get lost, they *answered something*. The choice between a clean rescue, a costly bargain, and a wider damage. Sets `knows_the_truth` (if not already); sets `met_the_thing_below`; sets exactly one of `rescued` / `bargained` / `stirred_something` (or combinations per the structure's Fork F).
Connects to: Beat 7 (Climb Out) on any resolution.

### Beat 7 — The Climb Out (Turning Point 5 — Act 2 → Act 3)
What happens: Back up through the Upper Levels and to the rope. State here is *the* determinant of Act 3. The chamber loop on the way up is shorter than the way down — wounded, lighter, possibly carrying an apprentice (alive, marked, dead, or absent), possibly with something following. A short Vigor-tax climb scene — companions help or are helped. If a companion died in Beat 5 or 6, a brief leave-the-body beat (Vesna prays if alive; otherwise the player chooses a single remembering line). If `stirred_something`, the climb is *fast and loud* with something rising in the well below them. The player emerges at the well-mouth above with the chosen pair (or what's left of them), the apprentice (or not), the truth, and the night still ahead. Stepping over the lip sets `climbed_back_out` and locks the act's exit configuration.
What the player decides/learns: Which version of the story they brought back. The shape of what they'll have to settle for at the bar.
Connects to: Act 3 entry. No return.

### Hub — The Spoke Hub (Trades Ward street corner)
Purpose: City-side hub for the act; gates which spokes the player visits before descending, and which order. Companions are visible and contribute lines.
Returned to from: Beat 3 (Alley) on resolution, Beat 4 (Harbour) on resolution, two short side beats (shrine-stoop, fence-corner).
Exits to: Beat 1 (Well-mouth, to descend) once any spoke is done or the player abandons the city.
Flag-gated changes: `alley_spoke_done` / `harbour_spoke_done` close their respective spokes; companion `_died` flags re-flavour the hub (the surviving companion grieves quietly between visits); Renown shifts from brawls update the Watch's tolerance line.

### Hub — The Well-mouth (transitional, two visits)
Purpose: The threshold between the city above and the deep below. Used at the descent (Beat 1) and again on the climb out (Beat 7). State changes between visits — companions present/absent, Vigor visible in prose, the rope itself differently described.
Returned to from: Beat 2 (Spoke Hub) before descent, Beat 7 (Climb Out) after.
Exits to: Beat 5 (Upper Levels) on descent; Act 3 entry on emergence.

### Hub — The Upper Levels (Undermountain cluster, three chambers)
Purpose: Dungeon hub. Player moves freely between the Cistern, the Apprentice's Camp, and the Cellar Door in any order until the cellar fight resolves and the door opens.
Returned to from: each chamber's small encounter/discovery resolves back to the cluster.
Exits to: Beat 6 (Deep Encounter) once the Cellar Door is open; Beat 7 (Climb Out, as `retreated_upper`) if the player breaks off before resolving.

### Conversation — Companion Council (recurring micro-hub)
Purpose: Between major beats (after Beat 3, after Beat 4, after the Beat 5 fight, before Beat 6) the player can take a short companion-council moment — one or two lines from each living companion, optionally a Vigor-recovery rest scene. Topics are pair-specific and Wits/Renown can unlock extra lines. Closes after Beat 6.
Where it sits in the beat flow: Inserted as a returning option from the Spoke Hub and from the Upper Levels Hub.

## Exits

All exits leave from Beat 7 (the climb out, well-mouth) unless noted (Exit F leaves from Beat 5 retreat). Each exit carries: companion-fate flags, outcome flags, the shape of what was learned, and current Coin/Vigor/Wits/Renown. Six distinct exit configurations — the **outcome flag set** is the primary axis; companion fate and pair carry independently within each.

- **Exit α — Clean Rescue:** leaves from Beat 7. `rescued` set; `knows_the_truth` set; `met_the_thing_below` set; NOT `bargained`; NOT `stirred_something`. The apprentice is alive and themselves; both companions survived; the *thing* is dead in the dark. Carries: pair flags unchanged from Act 1, no `_died` / `_left` flags, full lead flags, current stats. → Act 3 entry. Targets Ending 1 (Hero) with high Renown / Ending 2 (Quiet Good) with mid.
- **Exit β — Costly Rescue:** leaves from Beat 7. `rescued` set; `knows_the_truth` set; `met_the_thing_below` set; NOT `bargained`; NOT `stirred_something`. The apprentice is alive but a companion *died* (Beat 3, 4, 5, or 6) — exactly one `*_died` flag set. Carries: surviving companion's pair flag, the dead companion's `_died` flag, body left below or carried out (a sub-flag `body_recovered` per author preference). → Act 3 entry. Targets Ending 2 (Quiet Good) primarily; Ending 1 closed by the loss.
- **Exit γ — The Bargain:** leaves from Beat 7. `rescued` set; `bargained` set; `met_the_thing_below` set; `knows_the_truth` set; NOT `stirred_something` *unless* the bargain's terms triggered it (set both flags in that case — Ending 6 then overrides). The apprentice walks out *marked* — HUD picks up "Marked" once `bargained` is set per the structure. May carry `vesna_left` if Vesna was in the party and refused the deal (her recruit flag remains; her `_left` flag joins it; she's not present in Act 3's well-mouth scene but appears in the Common Room). → Act 3 entry. Targets Ending 3 (The Bargain).
- **Exit δ — Lost in the Deep:** leaves from Beat 7. NOT `rescued`; `knows_the_truth` set; `met_the_thing_below` set; NOT `bargained`; NOT `stirred_something`. The player reached the chamber and saw the apprentice but did not bring them out — killed in the fight, or the player broke and ran without them. May carry one or two `*_died` companion flags. Carries the truth out, no body. → Act 3 entry. Targets Ending 4 (Lost in the Deep).
- **Exit ε — A Worse Door Opened:** leaves from Beat 7. `stirred_something` set; `met_the_thing_below` set; `knows_the_truth` set. May *also* carry `rescued` (grabbed the apprentice on the way out) or `bargained` (the bargain *was* the stirring). Companion death is most common on this exit — frequently both `*_died` flags. Carries the loudest exit prose: something is *rising behind them*. → Act 3 entry. Targets Ending 6 (A Worse Door Opened) — overrides 1, 2, 3 per the structure's precedence.
- **Exit ζ — Retreated Without Reaching:** leaves from Beat 5 (`retreated_upper`). NOT `rescued`; NOT `met_the_thing_below`; NOT `knows_the_truth`; NOT `bargained`; NOT `stirred_something`. The Upper Levels chewed the party up and they climbed back out without ever opening the cellar door. The apprentice's fate is unknown. Vigor will be low; one `*_died` flag possible. The player carries shame and partial leads. → Act 3 entry. Targets Ending 4 (Lost in the Deep) by default; Ending 5 (Sworn to the City) reachable only if `mirt_owes_favour` and Renown survived.

**Pair carries within each exit.** The Act 1 pair flags (`recruited_korsa` / `_vesna` / `_pip` / `_thessaly`) carry through every exit. Combat exposure differs per pair — e.g. Exit β's `*_died` is most likely Pip or Vesna in Beat 3, Korsa or Vesna in Beat 4, anyone in Beat 5/6. Act 3 should branch first on outcome (α/β/γ/δ/ε/ζ), then on pair, then on companion fate within pair.

**Side flags carry forward from Act 1 unchanged** unless this act explicitly modifies them: `durnan_respects_you`, `mirt_owes_favour`, `found_journal` (now possibly upgraded text), `heard_about_harbour`, `heard_about_alley_witness`. Plus Act-2-set: `lead_followed_alley`, `lead_followed_harbour`, `lead_followed_direct`, `alley_witness_named` / `_lost` / `_dead`, `apprentice_alive_recently`, `journal_decoded`, `arrived_loud`, `body_recovered`, plus per-companion `_died` / `_left` and combat colour flags.

## Flags/Stats Changed

**Job state / lead state (hidden):**
- `lead_followed_alley` — set on completing Beat 3 by any path. Hidden.
- `lead_followed_harbour` — set on completing Beat 4 by any path. Hidden.
- `lead_followed_direct` — set if the player descends from Beat 1 without resolving any city spoke. Hidden. Renown −1 colour.
- `alley_spoke_done` / `harbour_spoke_done` — internal hub-state flags, close their respective options. Hidden.
- `arrived_loud` — set if Thessaly's chain-spell or equivalent breach opens the Cellar Door early. Hidden; affects Beat 6 prose and the *thing*'s readiness.
- `retreated_upper` — set on the Beat 5 retreat exit. Hidden; gates Exit ζ.
- `climbed_back_out` — set when the player crests the well in Beat 7. Hidden.

**Companion fate (hidden, surface in endings):**
- `korsa_died` / `vesna_died` / `pip_died` / `thessaly_died` — set if a companion is killed in Beat 3, Beat 4, Beat 5, or Beat 6. Hidden.
- `vesna_left` — set if Vesna refuses the bargain in Beat 6. Hidden.
- `body_recovered` — set if the player carried the dead companion out. Hidden, narrative colour for Act 3.

**Discoveries (mixed visibility):**
- `found_journal` — may upgrade text to "Apprentice's Journal (saltwater-stained)" if recovered in Beat 4. **HUD-visible.**
- `journal_decoded` — set in Beat 5 if `found_journal` is held when the apprentice's camp is reached. Hidden.
- `apprentice_alive_recently` — set on the perfect-fight outcome of Beat 4. Hidden; softens Beat 6 prose.
- `met_the_thing_below_glimpse` — set if the harbour spoke went well. Hidden; pre-conditions Beat 6.
- `alley_witness_named` / `alley_witness_lost` / `alley_witness_dead` — exactly one set per Beat 3 resolution. Hidden.
- `met_the_thing_below` — set on entering Beat 6's chamber. Hidden; required for `bargained` and `stirred_something`.
- `knows_the_truth` — set on entering Beat 6 (or on `journal_decoded` *plus* a Beat 5 trigger, for early-knowing colour). Hidden; flips conversation options in Act 3.

**Outcome flags (hidden, drive endings):**
- `rescued` — set if the apprentice is brought out of Beat 6 alive (clean fight, accepted bargain, or grabbed during a stir-and-flee).
- `bargained` — set if the player accepts the *thing*'s terms in Beat 6. **HUD-visible** (as "Marked") per the structure.
- `stirred_something` — set if the player wakes the deeper thing in Beat 6. Hidden.

**Combat colour flags (hidden, narrative-only):**
- `first_blood` — set on the first kill of the act (usually in Beat 3 or 4).
- `bloodied_in_alley` — set on completing Beat 3's brawl (any outcome that involved the fight).
- `weapon_taken_from_X` — set per defeated foe-type in Beat 5 (e.g. `weapon_taken_from_wight`, `weapon_taken_from_warlock`).

**Stats:**
- **Coin** — minor gains from looting Beat 3's toughs (a coin purse, ~2 gp), Beat 4's bargeman bribe (lose 2–3 gp on the bribe path, gain 4 gp on the records path), Beat 5's cache (3 gp + a small magical trinket if `found_journal`). Typical end range: 2–14.
- **Vigor** — primary mover this act. Drains in every combat beat. Beat 3 brawl: −1 to −3. Beat 4 ambush: −1 to −3 (worse if the player goes overboard). Beat 5 fight: −2 to −4. Beat 6 (fight path): −1 to −3 more; (parley path): no Vigor cost; (stir-and-flee path): −2 to −4 from the run. Climb out (Beat 7): −1 baseline. Vigor at or below 0 = death scene at any combat beat. Vesna's recruited heal can restore +1 to +2 once between beats. Typical Act-2 end range: 0–5 (badly bruised by design). Below 2 entering Act 3 closes the heroic-tier Act 3 prose.
- **Wits** — unchanged unless used in a check; one Beat 4 records check costs nothing on success / loses no Wits on failure (it's a *gate*, not a sink). Used widely as a soft gate.
- **Renown** — small movements. Up: clean Beat 3 (Watch hears, no civilian collateral) +1; clean Beat 4 (no public destruction at the harbour) +1; refusing the bargain in Beat 6 with Vesna in party +1. Down: `lead_followed_direct` −1 (regulars notice); `arrived_loud` colour cost −1; collateral damage in Beat 3 (chandler's vat, dead civilian if it goes very wrong) −1 to −2. Typical end range: −2 to +5. Renown ≥ 2 entering Act 3 keeps Ending 1 reachable; Renown < 0 closes it permanently.
