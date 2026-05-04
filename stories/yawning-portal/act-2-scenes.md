# One Night in the Yawning Portal — Act 2 Scenes

Scene budget target: ~35. Three set-piece combats (alley brawl, harbour ambush, Undermountain cellar). Companion death is on the table at every combat. Pair-shaped tactical options surface in each fight from the two recruited companions only — unrecruited companions' tactical choices are hidden, not greyed (their absence isn't a player option to consider).

Convention used throughout for **pair-shaped tactical choices**: each combat lists ~6 tactical options across the four companions plus 1–2 always-available "fight straight" options. Engine surfaces only those whose recruit flag is set AND that companion isn't dead yet. Combats are written as one-scene resolutions wherever possible — the choice routes to a *resolution* scene that varies by tactic and luck (weighted random for the dangerous tactics). Companion death lives inside the bad-luck resolution branches.

---

## Beat 1 — The Well-mouth (Transitional Hub, first visit)

### Scene: `act2_entry`
Purpose: Arrival from Act 1. The lip of Durnan's well, lantern lit, the chosen pair beside the player. Reorientation; sets the act's register. Routes immediately to `well_mouth_first`.
Choices:
- "Step up to the well-mouth" → `well_mouth_first` | gating: none | effects: none | consumable: N

NPCs present: the two recruited companions; Durnan (background, behind the bar one floor above).

Note for Stage 5: this is a one-line bridge scene. Could be inlined into Act 1's `act2_entry` placeholder. Kept separate so Act 1's exit handoff stays clean.

### Scene: `well_mouth_first`
Purpose: First-visit hub. Player can chase a city lead or commit to the descent cold. Companion-pair colour establishes register.
Choices:
- "Climb back up — head out into the Trades Ward" → `spoke_hub` | gating: `flags_unset: [committed_descent]` | effects: none | consumable: N
- "Step over the lip — descend now, cold" → `descent_cold_warning` | gating: `flags_unset: [alley_spoke_done, harbour_spoke_done]` | grey out if either spoke done (the lead is followed; descend normally instead) | effects: none yet (the warning scene applies the cost) | consumable: N
- "A quiet word with [companion A]" → `well_mouth_word_first_A` | gating: per-companion (only the two recruited appear) | hide_if_failed: Y | effects: `flags: spoke_to_X_at_well_first` | consumable: Y per companion
- "A quiet word with [companion B]" → `well_mouth_word_first_B` | as above | as above | as above
- "Test the rope and the lantern one more time" → `well_mouth_first` (returns) | gating: `flags_unset: [tested_rope]` | effects: `flags: tested_rope`; small flavour | consumable: Y

NPCs present: the two recruited companions; Durnan (background, audible).

### Scene: `descent_cold_warning`
Purpose: Last-chance pause before committing without leads. The companions visibly disagree (a line each). Player can still back out.
Choices:
- "Down. We learn what we learn down there." → `upper_levels_arrive` | gating: none | effects: `flags: lead_followed_direct, descended_well, committed_descent`; `stats: Renown -1` | consumable: Y (`committed_descent` permanently locks both city spokes)
- "...you're right. Up first. We'll be smarter for it." → `well_mouth_first` | gating: none | effects: none | consumable: N

NPCs present: the two recruited companions.

### Scene: `well_mouth_word_first_A` / `well_mouth_word_first_B`
Purpose: One short character beat per recruited companion before any descent — Korsa testing his axe-haft, Vesna sketching Tymora's coin in the air, Pip casing Durnan's apron pockets one last time, Thessaly murmuring at the dark. Stage 5: four short variants.
Choices:
- "Back to the well-mouth" → `well_mouth_first` | effects: `flags: spoke_to_X_at_well_first` | consumable: Y

NPCs present: the named companion.

---

## Beat 2 — The Spoke Hub (Trades Ward street corner)

### Hub — `spoke_hub`
Returns from: `well_mouth_first` (initial); `alley_resolution` and `harbour_resolution` (after each spoke); `shrine_stoop` and `fence_corner` (side beats).
Purpose: City-side hub. Gates which spokes the player visits and in what order. Companion-pair flavour surfaces here ("Pip points at the harbour", "Vesna at the alley", etc.).
Choices:
- "Take the alley lead — find the witness" → `alley_approach` | gating: `flags_unset: [alley_spoke_done]` | effects: none | consumable: N (the spoke flag set later closes it)
- "Take the harbour lead — Dock 14" → `harbour_approach` | gating: `flags_unset: [harbour_spoke_done]` | effects: none | consumable: N
- "Duck into the shrine-stoop — Vesna wants a moment" → `shrine_stoop` | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left, shrine_stoop_used]` | hide_if_failed: Y | effects: handled in scene | consumable: Y
- "Find Pip's fence on the corner — a name worth knowing" → `fence_corner` | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left, fence_corner_used]` | hide_if_failed: Y | effects: handled in scene | consumable: Y
- "Hold council — a word with the pair" → `companion_council_hub` | gating: `flags_unset: [council_used_spoke_hub]` | grey out after one council per visit-cycle (resets when a spoke completes — see council notes) | effects: handled in scene | consumable: Y per cycle
- "Back to the Portal's well-mouth — descend" → `well_mouth_descend` | gating: none (always available — spoke hub is never a trap) | effects: none | consumable: N

NPCs present: the two recruited companions; foot-traffic background only.

Note: if both `alley_spoke_done` AND `harbour_spoke_done`, the prose changes to "Nothing left to chase up here" and only the descend / council options remain.

### Scene: `shrine_stoop`
Purpose: Vesna refresh — Tymora's coin, a brief prayer, +1 Vigor (party-wide narrative; mechanically the player). One-shot.
Choices:
- "Bow your head a moment, then back to the corner" → `spoke_hub` | gating: none | effects: `flags: shrine_stoop_used`; `stats: Vigor +1` | consumable: Y

NPCs present: Sister Vesna; an unnamed shrine-keep (background colour, Stage 4 may name).

### Scene: `fence_corner`
Purpose: Pip's contact — a name (the alley witness's protector OR the bargeman, depending on which spoke is unresolved). Useful for the next spoke. One-shot.
Choices:
- "Pocket the name and back to the corner" → `spoke_hub` | gating: none | effects: `flags: fence_corner_used, knows_alley_protector` (if alley undone) OR `knows_bargeman_name` (if harbour undone) — Stage 5 picks based on flag state; if both done, `flags: fence_corner_used` only with a flat thank-you scene | consumable: Y

NPCs present: Pip Tallowmuch; an unnamed fence (Stage 4 may name).

### Hub — `companion_council_hub`
Purpose: Recurring micro-conversation. Two recruited companions, one or two topics each, optional Vigor-recovery rest. Available at the spoke hub and again at the upper-levels hub (separate `_used` flags per location). Closes after Beat 6 (handled by Beat 6 setting `council_closed`).
Returns from: pair-specific topic scenes.
Choices (topics; only those for *recruited, alive* companions surface):
- "A word with Korsa" → `council_korsa` | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left, council_korsa_done_cycle]` | effects: handled in scene | consumable: Y per cycle
- "A word with Vesna" → `council_vesna` | gating: same pattern with `vesna_*` | as above
- "A word with Pip" → `council_pip` | gating: same pattern with `pip_*` | as above
- "A word with Thessaly" → `council_thessaly` | gating: same pattern with `thessaly_*` | as above
- "Take a short rest — catch your breath" → `council_rest` | gating: `flags_unset: [council_rest_used]` (one rest per act; not per cycle) | effects: handled in scene | consumable: Y
Walk-away: "Back" → returns to whichever hub called the council (`spoke_hub` or `upper_levels_hub` — Stage 5: track via a `council_origin` flag set on entry, or simply duplicate the council into two near-identical scenes `companion_council_spoke` and `companion_council_upper`. Recommend the latter for engine simplicity.)

NPCs present: the two recruited companions; specific scene varies.

### Scene: `council_korsa`
Purpose: One short Korsa beat — appropriate to current state (pre-fight: bravado; post-fight: dressing wounds).
Choices:
- "Back" → `companion_council_hub` | effects: `flags: council_korsa_done_cycle` | consumable: Y per cycle

### Scene: `council_vesna` / `council_pip` / `council_thessaly`
As above, one each. Stage 5 writes pre/post-state variants via conditional text.

### Scene: `council_rest`
Purpose: Short rest. +1 Vigor. One-shot for the act.
Choices:
- "Back to your feet" → `companion_council_hub` | effects: `flags: council_rest_used`; `stats: Vigor +1` | consumable: Y

Note on cycle reset: `council_*_done_cycle` flags reset when the player commits to a new beat (alley_approach, harbour_approach, upper_levels_arrive, deep_chamber_enter). Stage 5: this is a small unset-flags effect on those entry scenes — engine doesn't natively unset, so simplest path is to have *two* council instances (spoke vs upper) as noted, and use distinct `_done_at_spoke` / `_done_at_upper` flags.

---

## Beat 3 — The Alley Spoke (Trades Ward backstreet)

### Scene: `alley_approach`
Purpose: Mini-cluster: a doorway with a watchman to bluff or bribe, a roof-route, a side window, the front. Routes to the witness's room or a brawl trigger.
Choices:
- "Bluff the watchman — you're with the chandler's accountant" → `alley_witness_room` | gating: `requires: { stats: { Wits: 5 } }` | grey out below ("[Wits 5 required]") | effects: `flags: alley_bluffed_watchman` | consumable: N
- "Bribe the watchman — a coin in the palm" → `alley_witness_room` | gating: `requires: { stats: { Coin: 3 } }` AND `flags_unset: [alley_bribed_watchman]` | grey out below ("[3 Coin required]") | effects: `flags: alley_bribed_watchman`; `stats: Coin -3` | consumable: Y
- "Pip — up the chandler's roof and in through the skylight" → `alley_witness_room` | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left]` | hide_if_failed: Y | effects: `flags: alley_entered_roof, pip_led_entry` | consumable: N
- "Side window — hoist Vesna up first, she'll unlatch" → `alley_witness_room` | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left]` | hide_if_failed: Y | effects: `flags: alley_entered_window` | consumable: N
- "Through the front. Korsa first." → `alley_brawl_open` | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left]` | hide_if_failed: Y | effects: `flags: alley_kicked_door` | consumable: N
- "Wait for them to come out — the toughs come for you instead" → `alley_brawl_open` | gating: none | (convergent with kick-the-door — same `next`, framed as ambushed) | effects: `flags: alley_ambushed_first` | consumable: N

NPCs present: an unnamed watchman; the two recruited companions; muffled toughs inside (audible).

### Scene: `alley_witness_room`
Purpose: Brief scene with the witness — a Trades Ward beggar named (Stage 4 to name) cornered above the chandler. He gives lies, half-truths, a name. Then the toughs find you.
Choices:
- "Press him hard for the name" → `alley_witness_speaks` | gating: `requires: { stats: { Wits: 5 } }` OR `requires: { flags: [knows_alley_protector] }` | grey out below ("[Wits 5 — or know who paid him]") | effects: `flags: alley_witness_named, alley_pressed` | consumable: N
- "Calm him — promise no harm" → `alley_witness_speaks` | gating: `requires: { flags: [recruited_vesna] }` | (convergent — same `next`, Vesna's voice) | effects: `flags: alley_witness_named, alley_calmed` | consumable: N
- "Threaten — a knife on the table" → `alley_witness_speaks` | gating: none | (convergent — same `next`, ugly framing) | effects: `flags: alley_witness_named, alley_threatened`; `stats: Renown -1` | consumable: N
- "Listen, then let him bolt — you have what he gave" → `alley_witness_bolts` | gating: none | effects: `flags: alley_witness_lost, alley_let_bolt` | consumable: N

NPCs present: the alley witness (Stage 4 to name); the two recruited companions.

### Scene: `alley_witness_speaks`
Purpose: He gives the name — the *guide* who took the apprentice down. The guide came back wrong. Then a fist hits the door downstairs.
Choices:
- "Down — meet them on the stairs" → `alley_brawl_open` | gating: none | effects: `flags: lead_followed_alley, knows_guide_name` | consumable: N

NPCs present: the witness; the companions; toughs (audible).

### Scene: `alley_witness_bolts`
Purpose: He goes out the window. The toughs come up the stairs. You meet them at the top.
Choices:
- "Brace at the top of the stairs" → `alley_brawl_open` | gating: none | effects: `flags: lead_followed_alley` | consumable: N

NPCs present: the companions; toughs (audible).

### Scene: `alley_brawl_open`
Purpose: **Set-piece combat 1 — the alley brawl.** Three to five toughs, cobblestones underfoot, a chandler's vat of wax overhead, gas-lamps to break for cover. Prose direction (gory-fun): broken teeth on cobblestones, a tough impaled on his own boarding-pike when he charges Korsa, a thrown lantern setting a coat-tail alight, the wax-slick rout. Pair-shaped tactical options below (only recruited, alive companions surface).
Choices (3–6 always; conditional surface):
- "Anchor the chokepoint — Korsa holds the doorway, the rest fight clean" → weighted: `alley_win_chokepoint_clean` (5) / `alley_win_chokepoint_korsa_bloodied` (3) / `alley_korsa_falls` (1) | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left]` | hide_if_failed: Y | effects: `flags: tactic_chokepoint` | consumable: N
- "Pip drops caltrops, slips behind, throat-and-knee" → weighted: `alley_win_pip_flank` (5) / `alley_win_pip_flank_costly` (3) / `alley_pip_falls` (1) | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left]` | hide_if_failed: Y | effects: `flags: tactic_flank` | consumable: N
- "Vesna anchors the wounded — you and the other carry the line" → weighted: `alley_win_vesna_anchor` (6) / `alley_win_vesna_anchor_costly` (3) / `alley_vesna_falls` (1) | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left]` | hide_if_failed: Y | effects: `flags: tactic_vesna_anchor` | consumable: N
- "Thessaly burns the chandler's vat — wax and fire across the alley" → weighted: `alley_win_thessaly_fire_clean` (4) / `alley_win_thessaly_fire_civilian` (3) / `alley_thessaly_falls` (1) / `alley_witness_burned` (2) | gating: `requires: { flags: [recruited_thessaly] }` AND `flags_unset: [thessaly_died, thessaly_left]` | hide_if_failed: Y | effects: `flags: tactic_fire` | consumable: N
- "Steel and scorching ray — fight straight, you and yours" → weighted: `alley_win_straight` (5) / `alley_win_straight_bloodied` (4) / `alley_companion_falls_random` (1) | gating: none | (always-available fallback) | effects: `flags: tactic_straight` | consumable: N
- "Break and run — out the back, leave the witness" → `alley_flee` | gating: `requires: { stats: { Vigor: 4 } }` | grey out below ("[Vigor 4 required]") | effects: `flags: alley_fled` | consumable: N

NPCs present: the two recruited companions; 3–5 unnamed toughs; possibly the witness.

### Scene: `alley_win_chokepoint_clean`
Purpose: Korsa holds, the rest fight clean. Two toughs down clean, the rest run. Witness state unchanged from entry.
Choices:
- "Loot the bodies, head back to the corner" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough`; `stats: Vigor -1, Coin +2, Renown +1` | consumable: N

### Scene: `alley_win_chokepoint_korsa_bloodied`
Purpose: Korsa holds but takes a bad cut to the thigh. Limps out.
Choices:
- "Loot, bind his leg, head back" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough, korsa_limping`; `stats: Vigor -2, Coin +2` | consumable: N

### Scene: `alley_korsa_falls`
Purpose: Permadeath. A pike under his arm, between the plates, into the lung. Vesna prays if alive; otherwise the player chooses one remembering line. Gory-fun does *not* mean weightless — this beat lands.
Choices:
- "Drag the body out — back to the corner" → `alley_resolution` | gating: none | effects: `flags: korsa_died, bloodied_in_alley, first_blood, body_recovered`; `stats: Vigor -3` | consumable: N
- "Leave him. Get the witness's name and run." → `alley_resolution` | gating: none | effects: `flags: korsa_died, bloodied_in_alley, first_blood`; `stats: Vigor -2, Renown -1` | consumable: N

### Scene: `alley_win_pip_flank`
Purpose: Pip drops caltrops, two toughs go down screaming, she's behind the third with a cut throat. Clean.
Choices:
- "Loot, head back" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough`; `stats: Vigor -1, Coin +3, Renown +1` | consumable: N

### Scene: `alley_win_pip_flank_costly`
Purpose: She gets the kill but takes a club to the ribs going in. Wheezing.
Choices:
- "Bind her ribs, head back" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough, pip_winded`; `stats: Vigor -2, Coin +2` | consumable: N

### Scene: `alley_pip_falls`
Purpose: Permadeath. Caught the second blow she didn't see. A boot to the head.
Choices:
- "Carry her out" → `alley_resolution` | effects: `flags: pip_died, bloodied_in_alley, first_blood, body_recovered`; `stats: Vigor -3` | consumable: N
- "Leave her — get out" → `alley_resolution` | effects: `flags: pip_died, bloodied_in_alley, first_blood`; `stats: Vigor -2, Renown -1` | consumable: N

### Scene: `alley_win_vesna_anchor`
Purpose: She steadies the wounded mid-fight, you and the other clean up. Tymora's coin glints.
Choices:
- "Loot, head back" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough`; `stats: Vigor -1, Coin +2, Renown +1` | consumable: N

### Scene: `alley_win_vesna_anchor_costly`
Purpose: She catches a knife meant for you. Her own blood on her own cloak.
Choices:
- "Loot, bind her, head back" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough, vesna_wounded`; `stats: Vigor -2, Coin +2` | consumable: N

### Scene: `alley_vesna_falls`
Purpose: Permadeath. The knife was longer than she thought.
Choices:
- "Carry her out" → `alley_resolution` | effects: `flags: vesna_died, bloodied_in_alley, first_blood, body_recovered`; `stats: Vigor -3, Renown +1` | consumable: N
- "Leave her — Tymora keeps her own" → `alley_resolution` | effects: `flags: vesna_died, bloodied_in_alley, first_blood`; `stats: Vigor -2, Renown -1` | consumable: N

### Scene: `alley_win_thessaly_fire_clean`
Purpose: Wax and fire across the alley. The toughs fall back screaming. No civilians; the chandler is at the bar two doors down.
Choices:
- "Through the smoke, head back" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough, alley_burned`; `stats: Vigor -1, Coin +1` | consumable: N

### Scene: `alley_win_thessaly_fire_civilian`
Purpose: Wax and fire — and the chandler's apprentice was sleeping above the shop. He doesn't wake. Renown collapse.
Choices:
- "Out, fast, before the Watch comes" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough, alley_burned, civilian_killed_alley`; `stats: Vigor -1, Renown -2` | consumable: N

### Scene: `alley_thessaly_falls`
Purpose: Permadeath. Her own fire turns on her — a barrel goes that shouldn't have. She doesn't come out.
Choices:
- "Drag her out of the wax" → `alley_resolution` | effects: `flags: thessaly_died, bloodied_in_alley, first_blood, body_recovered, alley_burned`; `stats: Vigor -3, Renown -1` | consumable: N
- "Leave her in it. Run." → `alley_resolution` | effects: `flags: thessaly_died, bloodied_in_alley, first_blood, alley_burned`; `stats: Vigor -2, Renown -2` | consumable: N

### Scene: `alley_witness_burned`
Purpose: The fire took the witness too. He doesn't sing, but you walk away alive.
Choices:
- "Back to the corner" → `alley_resolution` | effects: `flags: alley_witness_dead, bloodied_in_alley, first_blood, alley_burned`; `stats: Vigor -1` | consumable: N

### Scene: `alley_win_straight`
Purpose: Steel and spell, no special tactic. The fight is ugly but won.
Choices:
- "Loot, head back" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough`; `stats: Vigor -2, Coin +2` | consumable: N

### Scene: `alley_win_straight_bloodied`
Purpose: As above, but worse. Both companions take cuts; the player takes one too.
Choices:
- "Loot, bind, head back" → `alley_resolution` | effects: `flags: bloodied_in_alley, first_blood, weapon_taken_from_tough`; `stats: Vigor -3, Coin +2` | consumable: N

### Scene: `alley_companion_falls_random`
Purpose: One of the two recruited companions dies — engine picks via weighted random by survivability (Korsa lowest weight, Pip/Vesna higher). Stage 5: implement as nested weighted-`next` selecting whichever recruited companion path applies, or as four conditional branches. Permadeath either way.
Choices:
- "Continue" → `alley_resolution` | effects: applies `*_died` for the chosen companion, `bloodied_in_alley, first_blood`; `stats: Vigor -3` | consumable: N

### Scene: `alley_flee`
Purpose: Out the back. No witness, no kill, but no death either. Vigor cost to outrun.
Choices:
- "Back to the corner" → `alley_resolution` | effects: `flags: alley_witness_lost, alley_fled`; `stats: Vigor -2` | consumable: N

### Scene: `alley_resolution`
Purpose: Brief return-to-the-corner beat — the night still ahead, the chosen pair (or what's left of them), the lead in hand.
Choices:
- "Back to the Trades Ward corner" → `spoke_hub` | effects: `flags: alley_spoke_done` | consumable: N

NPCs present: the surviving recruited companions.

---

## Beat 4 — The Harbour Spoke (Dock 14, the Sea Maiden's Repose)

### Scene: `harbour_approach`
Purpose: Hub-let outside Dock 14. Bargeman's shanty (talk), the derelict (board), the harbour-master's office (records).
Choices:
- "Talk to the bargeman — coin in hand" → `harbour_bargeman_talk` | gating: `flags_unset: [harbour_bargeman_done]` | effects: handled in scene | consumable: Y
- "Climb the harbour-master's office — see the records" → `harbour_records` | gating: `flags_unset: [harbour_records_done]` | effects: handled in scene | consumable: Y
- "Board the derelict — let's see what she's hiding" → `harbour_board` | gating: none | effects: `flags: harbour_boarded` | consumable: N (boarding triggers the ambush; entering it is the commitment)
- "Pip — slip aboard first, scout the deck" → `harbour_pip_scout` | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left, harbour_pip_scouted]` | hide_if_failed: Y | effects: `flags: harbour_pip_scouted` | consumable: Y
- "Pull back — head to the corner. Not yet." → `spoke_hub` | gating: none | effects: none | consumable: N

NPCs present: an unnamed bargeman (Stage 4 to name); the two recruited companions.

### Scene: `harbour_bargeman_talk`
Purpose: He won't say. Three approaches. Routes back to `harbour_approach` either way.
Choices:
- "Bribe him — 3 Coin" → `harbour_approach` | gating: `requires: { stats: { Coin: 3 } }` | grey out below ("[3 Coin required]") | effects: `flags: harbour_bargeman_done, harbour_bargeman_bribed, knows_apprentice_paid_for_passage`; `stats: Coin -3` | consumable: Y
- "Read him — Wits — what's he afraid of?" → `harbour_approach` | gating: `requires: { stats: { Wits: 6 } }` | grey out below ("[Wits 6 required]") | effects: `flags: harbour_bargeman_done, knows_apprentice_paid_for_passage, knows_bargeman_terrified` | consumable: Y
- "Threaten him — Korsa looms" → `harbour_approach` | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left]` | hide_if_failed: Y | effects: `flags: harbour_bargeman_done, knows_apprentice_paid_for_passage`; `stats: Renown -1` | consumable: Y
- "Walk away — he's not worth it" → `harbour_approach` | gating: none | effects: `flags: harbour_bargeman_done, harbour_bargeman_silent` | consumable: Y

NPCs present: the bargeman; one recruited companion (depending on path).

### Scene: `harbour_records`
Purpose: Wits gate. Find a manifest — the derelict was logged "abandoned" three nights ago, but with a passenger fee paid the morning before. The apprentice. Earns Coin (small clerk's reward for spotting the discrepancy; he's been chasing it).
Choices:
- "Read the manifest carefully" → `harbour_approach` | gating: `requires: { stats: { Wits: 5 } }` | grey out below ("[Wits 5 required]") | effects: `flags: harbour_records_done, apprentice_alive_recently`; `stats: Coin +4` | consumable: Y
- "It's beyond you — back to the dock" → `harbour_approach` | gating: none | effects: `flags: harbour_records_done` | consumable: Y

NPCs present: an unnamed clerk (Stage 4 may name).

### Scene: `harbour_pip_scout`
Purpose: Pip slips aboard, comes back wide-eyed. The deck is wet. Wet *patterns*. Pre-warns the ambush — gives the player a tactical edge in the next scene.
Choices:
- "Back to the dock — we go in ready" → `harbour_approach` | effects: `flags: harbour_pip_scouted, harbour_warned` | consumable: Y

NPCs present: Pip.

### Scene: `harbour_board`
Purpose: Cold dread. Smell of brine and rot, algae in patterns it shouldn't grow, a wet print climbing up a bulkhead. Routes immediately into the ambush.
Choices:
- "Down into the hold" → `harbour_ambush_open` | gating: none | effects: `flags: harbour_descended_hold` | consumable: N
- "Stay topside — let them come to you" → `harbour_ambush_open` | gating: none | (convergent — same `next`, framed as deck-fight) | effects: `flags: harbour_held_topside` | consumable: N

NPCs present: the recruited companions.

### Scene: `harbour_ambush_open`
Purpose: **Set-piece combat 2 — the harbour ambush.** Three things from below have been *waiting* — drowned-thing kuo-toa if `found_journal` is held (its waterlogged page foretold them); otherwise a lone aboleth-touched sailor with two thralls. The fight is on slick decks, with the harbour at the player's back. Prose direction (gory-fun): a kuo-toa head split by Korsa's axe spilling something darker than blood, a thrall taking Vesna's mace to the temple with a sound like cracking shellfish, the deck slick with seawater and worse, someone goes overboard. Falling overboard is a Vigor sink not a death by default — but the *thing in the water* changes that. Pair-shaped tactical options.
Choices (3–6; conditional surface):
- "Thessaly — a thunder-spell in the tight wood" → weighted: `harbour_win_thessaly_thunder_clean` (4) / `harbour_win_thessaly_thunder_breach` (3) / `harbour_thessaly_falls_overboard` (1) | gating: `requires: { flags: [recruited_thessaly] }` AND `flags_unset: [thessaly_died, thessaly_left]` | hide_if_failed: Y | effects: `flags: tactic_thunder` | consumable: N
- "Vesna — radiant burst, the water-things hate the light" → weighted: `harbour_win_vesna_radiant_clean` (5) / `harbour_win_vesna_radiant_costly` (3) / `harbour_vesna_drowns` (1) | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left]` | hide_if_failed: Y | effects: `flags: tactic_radiant` | consumable: N
- "Pip — the human cultist, throat-and-knee, decisive" → weighted: `harbour_win_pip_assassinate` (5) / `harbour_win_pip_costly` (3) / `harbour_pip_drowns` (1) | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left]` | hide_if_failed: Y | effects: `flags: tactic_assassinate` | consumable: N
- "Korsa — hold the gangway, deny them retreat" → weighted: `harbour_win_korsa_gangway` (4) / `harbour_win_korsa_gangway_bloodied` (4) / `harbour_korsa_drowns` (1) | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left]` | hide_if_failed: Y | effects: `flags: tactic_gangway` | consumable: N
- "Steel and spell, both feet planted" → weighted: `harbour_win_straight` (4) / `harbour_win_straight_bloodied` (4) / `harbour_companion_drowns_random` (1) | gating: none | effects: `flags: tactic_straight_harbour` | consumable: N
- "Break — over the rail, swim for the next quay" → `harbour_flee` | gating: `requires: { stats: { Vigor: 4 } }` | grey out below | effects: `flags: harbour_fled` | consumable: N

If `harbour_warned` is set (Pip scouted), all weighted-fail outcomes shift one step toward the clean outcome — Stage 5: implement as a separate scene-set with shifted weights, OR add a `harbour_warned` modifier in the prose and accept the same weights with better flavour.

NPCs present: the two recruited companions; 1 cultist + 2 thralls OR 3 kuo-toa.

### Scene: `harbour_win_thessaly_thunder_clean`
Purpose: Thunder fills the hold. Three things go down screaming. Hull holds. You climb out with a waterlogged page from the apprentice's journal, jammed in a beam.
Choices:
- "Pocket the page, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_kuo_toa, met_the_thing_below_glimpse, found_journal_waterlogged` (Stage 5: if `found_journal` already set, upgrade HUD text via conditional; else set `found_journal` AND `found_journal_waterlogged`); `stats: Vigor -2, Coin +2` | consumable: N

### Scene: `harbour_win_thessaly_thunder_breach`
Purpose: Thunder fills the hold and the *hull* cracks. Water rushes in. Everyone clears the deck before she sinks. You get the page; you also have to swim for it.
Choices:
- "Swim for the quay" → `harbour_resolution` | effects: `flags: weapon_taken_from_kuo_toa, met_the_thing_below_glimpse, found_journal_waterlogged, harbour_sank_derelict`; `stats: Vigor -3, Coin +1` | consumable: N

### Scene: `harbour_thessaly_falls_overboard`
Purpose: Permadeath. The thunder's recoil throws her clear of the deck and into the harbour. Something pulls her down. She doesn't surface.
Choices:
- "Get the others off the boat — there's nothing for her" → `harbour_resolution` | effects: `flags: thessaly_died, met_the_thing_below_glimpse`; `stats: Vigor -3` | consumable: N

### Scene: `harbour_win_vesna_radiant_clean`
Purpose: Tymora's coin sings. The water-things scream and shrivel. You walk out with the page.
Choices:
- "Pocket the page, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_kuo_toa, met_the_thing_below_glimpse, found_journal_waterlogged`; `stats: Vigor -1, Coin +2, Renown +1` | consumable: N

### Scene: `harbour_win_vesna_radiant_costly`
Purpose: She burns them out — and herself with them. Fingers blistered, eyes wet.
Choices:
- "Bind her hands, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_kuo_toa, met_the_thing_below_glimpse, found_journal_waterlogged, vesna_burned`; `stats: Vigor -2, Coin +1` | consumable: N

### Scene: `harbour_vesna_drowns`
Purpose: Permadeath. A thrall drags her under by the ankle. You don't see her surface.
Choices:
- "Climb out — there's nothing left to fight here" → `harbour_resolution` | effects: `flags: vesna_died, met_the_thing_below_glimpse`; `stats: Vigor -3, Renown +1` | consumable: N

### Scene: `harbour_win_pip_assassinate`
Purpose: Pip drops the cultist in two heartbeats. The thralls falter, lost without a leader. You finish them clean.
Choices:
- "Pocket the page, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_thrall, met_the_thing_below_glimpse, found_journal_waterlogged`; `stats: Vigor -1, Coin +3, Renown +1` | consumable: N

### Scene: `harbour_win_pip_costly`
Purpose: She gets the kill but a thrall has her arm. She breaks free. Bleeding badly.
Choices:
- "Bind her, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_thrall, met_the_thing_below_glimpse, found_journal_waterlogged, pip_bleeding`; `stats: Vigor -2, Coin +2` | consumable: N

### Scene: `harbour_pip_drowns`
Purpose: Permadeath. She gets the cultist but goes overboard with him. Something below takes them both.
Choices:
- "Climb out — she'd want you to" → `harbour_resolution` | effects: `flags: pip_died, met_the_thing_below_glimpse`; `stats: Vigor -3` | consumable: N

### Scene: `harbour_win_korsa_gangway`
Purpose: Plate at the choke. Nothing gets past him. The fight ends fast.
Choices:
- "Pocket the page, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_kuo_toa, met_the_thing_below_glimpse, found_journal_waterlogged`; `stats: Vigor -2, Coin +2, Renown +1` | consumable: N

### Scene: `harbour_win_korsa_gangway_bloodied`
Purpose: He holds, but the deck slips and a kuo-toa gets *under* his guard. Bad cut to the side.
Choices:
- "Bind him, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_kuo_toa, met_the_thing_below_glimpse, found_journal_waterlogged, korsa_wounded`; `stats: Vigor -3, Coin +1` | consumable: N

### Scene: `harbour_korsa_drowns`
Purpose: Permadeath. Plate is heavy. The deck went, the rail went, and so did he.
Choices:
- "Climb out — nothing for him below" → `harbour_resolution` | effects: `flags: korsa_died, met_the_thing_below_glimpse`; `stats: Vigor -3` | consumable: N

### Scene: `harbour_win_straight`
Purpose: Steel and spell, no special tactic. Won, ugly.
Choices:
- "Pocket the page, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_kuo_toa, met_the_thing_below_glimpse, found_journal_waterlogged`; `stats: Vigor -2, Coin +1` | consumable: N

### Scene: `harbour_win_straight_bloodied`
Purpose: As above, worse.
Choices:
- "Pocket the page, climb out" → `harbour_resolution` | effects: `flags: weapon_taken_from_kuo_toa, met_the_thing_below_glimpse, found_journal_waterlogged`; `stats: Vigor -3, Coin +1` | consumable: N

### Scene: `harbour_companion_drowns_random`
Purpose: Random permadeath of a recruited companion (weighted by exposure — Korsa most likely in plate, then Vesna, then Thessaly, then Pip). Stage 5: nested weighted-`next` over the recruited two.
Choices:
- "Climb out" → `harbour_resolution` | effects: applies `*_died` for the chosen companion, `met_the_thing_below_glimpse`; `stats: Vigor -3` | consumable: N

### Scene: `harbour_flee`
Purpose: Over the rail, into the cold. You make the next quay. No page, but no death.
Choices:
- "Back to the corner" → `harbour_resolution` | effects: `flags: harbour_fled`; `stats: Vigor -3` | consumable: N

### Scene: `harbour_resolution`
Purpose: Wet, bloodied, returning to the Trades Ward corner. The page (if got) crackles in your pocket as it dries. The pair (or what's left).
Choices:
- "Back to the Trades Ward corner" → `spoke_hub` | effects: `flags: harbour_spoke_done, lead_followed_harbour` | consumable: N

NPCs present: surviving recruited companions.

---

## Beat 5 — The Upper Levels (Hub, Undermountain — three chambers)

### Scene: `well_mouth_descend`
Purpose: Final commitment to the descent. One last tactical word, then the rope.
Choices:
- "Down" → `descent` | gating: none | effects: `flags: descended_well` (if not already set), `committed_descent` | consumable: Y
- "...not yet. One more thing in the city." → `spoke_hub` | gating: `flags_unset: [committed_descent, lead_followed_direct]` | effects: none | consumable: N

NPCs present: surviving recruited companions; Durnan (background, audible).

### Scene: `descent`
Purpose: Rope, lantern, the cold opening. Vigor tax for the descent itself.
Choices:
- "Down to the upper levels" → `upper_levels_arrive` | gating: none | effects: `stats: Vigor -1` | consumable: N

NPCs present: surviving recruited companions.

### Scene: `upper_levels_arrive`
Purpose: First-step prose; routes to the hub.
Choices:
- "Look around" → `upper_levels_hub` | gating: none | effects: none | consumable: N

NPCs present: surviving recruited companions.

### Hub — `upper_levels_hub`
Returns from: each chamber's encounter resolution.
Purpose: Three-chamber loop. Player can move between in any order. Cellar Door fight closes the hub.
Choices:
- "The Cistern — the flooded vault, partially-collapsed bridge" → `cistern` | gating: `flags_unset: [cistern_resolved]` | effects: none | consumable: N
- "The Apprentice's Camp — guttered candle, scratched runes" → `apprentice_camp` | gating: `flags_unset: [camp_resolved]` | effects: none | consumable: N
- "The Cellar Door — wax-sealed hatch, a name in chalk" → `cellar_door` | gating: none | effects: none | consumable: N (the door fight gates entry to Beat 6)
- "Hold council — a word with the pair" → `companion_council_upper` | gating: `flags_unset: [council_used_upper_levels]` | grey out after one use here | effects: handled in scene | consumable: Y
- "Climb back to the well — we're done. Out." → `retreat_upper_warning` | gating: `flags_unset: [arrived_loud]` | grey out if `arrived_loud` (the door is breached, the chamber awaits — see note) | effects: none | consumable: N

Note: if `arrived_loud` is set (Thessaly's chain-spell breached the door early), retreat closes — the chamber is already open and the *thing* is aware. Player commits to Beat 6.

NPCs present: surviving recruited companions.

### Hub — `companion_council_upper`
Purpose: Same shape as `companion_council_hub`, but with `_upper` suffix flags. Stage 5: duplicate scenes per the note in Beat 2.
Topics & rest: same as Beat 2's council. Walk-away returns to `upper_levels_hub`.

### Scene: `retreat_upper_warning`
Purpose: Last-chance pause before the climb out without resolving. Companions disagree.
Choices:
- "Up. We're not ready for this." → `act3_entry_retreat` | gating: none | effects: `flags: retreated_upper, climbed_back_out`; `stats: Vigor -1` | consumable: Y → Exit ζ
- "...you're right. Stay. Find what's down here." → `upper_levels_hub` | gating: none | effects: none | consumable: N

NPCs present: surviving recruited companions.

### Scene: `cistern`
Purpose: Flooded vaulted room, collapsed bridge, glyph on a far pillar. Pair-shaped exploration: Pip across the rafters, Korsa wedges the bridge, Vesna's coin disturbs the glyph, Thessaly recognises the rune-school.
Choices:
- "Pip across the rafters — see what's on the far side" → `cistern_pip_scout` | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Korsa wedges the bridge stable — cross it together" → `cistern_korsa_bridge` | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Vesna — toss the coin, see what the glyph wants" → `cistern_vesna_glyph` | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Thessaly — read the rune-school" → `cistern_thessaly_rune` | gating: `requires: { flags: [recruited_thessaly] }` AND `flags_unset: [thessaly_died, thessaly_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Wade across, Vigor first" → `cistern_wade` | gating: `requires: { stats: { Vigor: 4 } }` | grey out below ("[Vigor 4 required]") | effects: handled in scene | consumable: N
- "Back — the bridge isn't worth it" → `upper_levels_hub` | gating: none | effects: `flags: cistern_resolved, cistern_skipped` | consumable: N

NPCs present: surviving recruited companions.

### Scene: `cistern_pip_scout`
Purpose: She comes back with a coin-purse (3 Coin) and the news — there's a sigil on the far wall, a *signature*.
Choices:
- "Back to the chamber loop" → `upper_levels_hub` | effects: `flags: cistern_resolved, cistern_pip_done, saw_signature`; `stats: Coin +3` | consumable: N

### Scene: `cistern_korsa_bridge`
Purpose: He braces, you cross. On the far side: a sigil, a small cache (2 Coin), and a name.
Choices:
- "Back to the chamber loop" → `upper_levels_hub` | effects: `flags: cistern_resolved, cistern_korsa_done, saw_signature`; `stats: Coin +2, Vigor -1` | consumable: N

### Scene: `cistern_vesna_glyph`
Purpose: The coin lands on the glyph; the glyph reveals a hidden cache (3 Coin + a small magical trinket if `found_journal`).
Choices:
- "Back to the chamber loop" → `upper_levels_hub` | effects: `flags: cistern_resolved, cistern_vesna_done, saw_signature`; `stats: Coin +3` (additional `+1` trinket-Coin if `found_journal` — Stage 5: conditional effect) | consumable: N

### Scene: `cistern_thessaly_rune`
Purpose: She goes very quiet. The rune-school is *hers*. She names the master who taught it — a name the player might recognise from her recruitment scene if `knows_thessaly_motive` was set.
Choices:
- "Back to the chamber loop" → `upper_levels_hub` | effects: `flags: cistern_resolved, cistern_thessaly_done, saw_signature, thessaly_recognises_hand`; if `knows_thessaly_motive` then `flags: thessaly_motive_confirmed` | consumable: N

### Scene: `cistern_wade`
Purpose: Cold to the chest. You cross. No special discovery, but the sigil's there, and the player sees it.
Choices:
- "Back to the chamber loop" → `upper_levels_hub` | effects: `flags: cistern_resolved, saw_signature`; `stats: Vigor -2` | consumable: N

### Scene: `apprentice_camp`
Purpose: A guttered candle, a bedroll, scratched runes on a pillar. If `found_journal` (any variant) is held, an extra discovery scene fires (`journal_decoded`).
Choices:
- "Search the bedroll properly" → `camp_search` | gating: `flags_unset: [camp_searched]` | effects: handled in scene | consumable: Y
- "Read the journal against the runes" → `journal_decode` | gating: `requires: { flags: [found_journal] }` AND `flags_unset: [journal_decoded]` | hide_if_failed: Y (the *option* requires having read the journal) | effects: handled in scene | consumable: Y
- "Pip — sniff out the cache" → `camp_pip_cache` | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left, camp_pip_cache_done]` | hide_if_failed: Y | effects: handled in scene | consumable: Y
- "Vesna — pray for the apprentice's safe path" → `camp_vesna_pray` | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left, camp_vesna_pray_done]` | hide_if_failed: Y | effects: handled in scene | consumable: Y
- "Move on — nothing here for you" → `upper_levels_hub` | gating: none | effects: `flags: camp_resolved` | consumable: N

NPCs present: surviving recruited companions.

### Scene: `camp_search`
Purpose: Find a half-finished letter to the client. The apprentice was alive *yesterday*. `apprentice_alive_recently` set if not already (the harbour records can also set it).
Choices:
- "Pocket the letter, back to the loop" → `upper_levels_hub` | effects: `flags: camp_resolved, camp_searched, apprentice_alive_recently, found_letter` | consumable: N

### Scene: `journal_decode`
Purpose: The journal pages match the runes. The apprentice was *answering* something. Major foreshadowing for Beat 6.
Choices:
- "Close the journal. Back to the loop." → `upper_levels_hub` | effects: `flags: camp_resolved, journal_decoded, knows_truth_partial` | consumable: N

### Scene: `camp_pip_cache`
Purpose: She finds 4 Coin and a small vial (Stage 5: vial is flavour, not mechanical).
Choices:
- "Back to the loop" → `upper_levels_hub` | effects: `flags: camp_resolved, camp_pip_cache_done`; `stats: Coin +4` | consumable: Y

### Scene: `camp_vesna_pray`
Purpose: She prays. Tymora's coin lands face up. A small Renown bump.
Choices:
- "Back to the loop" → `upper_levels_hub` | effects: `flags: camp_resolved, camp_vesna_pray_done`; `stats: Renown +1` | consumable: Y

### Scene: `cellar_door`
Purpose: The hatch — wax sealed, the apprentice's name in chalk. Things behind it. The set-piece fight is here.
Choices:
- "Examine the seal — Wits — what *is* this wax?" → `cellar_examine` | gating: `requires: { stats: { Wits: 5 } }` AND `flags_unset: [cellar_examined]` | grey out below ("[Wits 5 required]") | effects: handled in scene | consumable: Y
- "Listen at the door" → `cellar_listen` | gating: `flags_unset: [cellar_listened]` | effects: handled in scene | consumable: Y
- "Break the seal and force the door — be ready" → `cellar_fight_open` | gating: none | effects: `flags: cellar_forced_open` | consumable: N
- "Thessaly — chain-spell, crack the door, ride the noise" → `cellar_thessaly_breach` | gating: `requires: { flags: [recruited_thessaly] }` AND `flags_unset: [thessaly_died, thessaly_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Pip — pick the seal quietly, slip in" → `cellar_pip_pick` | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Back — we're not ready" → `upper_levels_hub` | gating: none | effects: none | consumable: N

NPCs present: surviving recruited companions; things-behind-the-door (audible only).

### Scene: `cellar_examine`
Purpose: The wax is the apprentice's own — they sealed it from this side. Setting `knows_apprentice_sealed_self` foreshadows Beat 6 hard.
Choices:
- "Back to the door" → `cellar_door` | effects: `flags: cellar_examined, knows_apprentice_sealed_self` | consumable: Y

### Scene: `cellar_listen`
Purpose: A wet voice. More than one voice. A laugh that isn't a laugh.
Choices:
- "Back to the door" → `cellar_door` | effects: `flags: cellar_listened, heard_thing_voice` | consumable: Y

### Scene: `cellar_fight_open`
Purpose: **Set-piece combat 3 — the cellar/Undermountain encounter.** A pack of cellar-dwellers between the player and the next chamber. Composition shifts on lead state: ghouls (default), goblins under a wretched warlock (if `lead_followed_alley` and `knows_guide_name` — the guide is here), or bone-wights guarding the hatch (if `lead_followed_harbour` and `met_the_thing_below_glimpse`). This is the act's meat-grinder. Tight quarters, no quick retreat, Vigor will hurt. Companion death is most likely here. Prose direction (gory-fun): a ghoul's jaw cracking sideways under Korsa's axe, a goblin pinned to the cellar door by Pip's blade in passing, a bone-wight's skull collapsing inward when Thessaly's spell finds it, a wretched warlock's ribcage splitting open as something *leaves* him at the moment of death.
Choices (3–6; conditional surface):
- "Korsa plates the doorway — the rest fight clean behind him" → weighted: `cellar_win_korsa_plate` (4) / `cellar_win_korsa_plate_bloodied` (4) / `cellar_korsa_dies` (2) | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left]` | hide_if_failed: Y | effects: `flags: tactic_korsa_plate` | consumable: N
- "Vesna — mass-heal at her own price" → weighted: `cellar_win_vesna_mass_heal` (4) / `cellar_win_vesna_mass_heal_costly` (3) / `cellar_vesna_dies` (3) | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left]` | hide_if_failed: Y | effects: `flags: tactic_vesna_mass_heal` | consumable: N
- "Pip — flank, throat-cut the chief in one stroke" → weighted: `cellar_win_pip_decapitate` (5) / `cellar_win_pip_decapitate_costly` (3) / `cellar_pip_dies` (2) | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left] }` AND `requires: { stats: { Wits: 6 } }` | grey out without Wits ("[Wits 6 required]"); hide if Pip not present | effects: `flags: tactic_pip_decapitate` | consumable: N
- "Thessaly — chain-spell, clear the room *and* crack the hatch" → weighted: `cellar_win_thessaly_chain` (4) / `cellar_win_thessaly_chain_loud` (4) / `cellar_thessaly_dies` (2) | gating: `requires: { flags: [recruited_thessaly] }` AND `flags_unset: [thessaly_died, thessaly_left]` | hide_if_failed: Y | effects: `flags: tactic_thessaly_chain` | consumable: N
- "Steel and spell — the four of us, planted, no tricks" → weighted: `cellar_win_straight` (4) / `cellar_win_straight_bloodied` (4) / `cellar_companion_dies_random` (2) | gating: none | effects: `flags: tactic_cellar_straight` | consumable: N
- "Break and run — back through the upper levels, climb the well" → `cellar_flee_to_retreat` | gating: `requires: { stats: { Vigor: 4 } }` | grey out below ("[Vigor 4 required]") | effects: `flags: cellar_fled` | consumable: N

NPCs present: surviving recruited companions; the foe-pack (ghouls / goblins+warlock / bone-wights).

### Scene: `cellar_thessaly_breach`
Purpose: Thessaly chain-spells the door from outside. Sets `arrived_loud` (Beat 6 prose flips — the *thing* is ready). Skips the cellar-fight: the pack is mostly *gone* in the blast.
Choices:
- "Through the breach — into the next chamber" → `cellar_breach_through` | effects: `flags: arrived_loud, cellar_breached, cellar_resolved` | consumable: N

NPCs present: surviving recruited companions.

### Scene: `cellar_breach_through`
Purpose: Walk through the smoking ruin. A few half-dead foes, no real fight. Vigor cost from the smoke.
Choices:
- "On to the chamber" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack`; `stats: Vigor -2` | consumable: N

### Scene: `cellar_pip_pick`
Purpose: Pip picks the seal in silence. The pack on the far side is *not* alerted. Routes into a stealth-fight variant of the cellar combat — much easier weights.
Choices:
- "Through, quiet" → `cellar_fight_stealth` | effects: `flags: cellar_picked_quiet, cellar_resolved` | consumable: N

### Scene: `cellar_fight_stealth`
Purpose: Stealth opener — first strike free. Same tactical menu as `cellar_fight_open` but every weighted-fail outcome shifts toward clean. Stage 5: implement as a separate scene-set OR add a `cellar_picked_quiet` modifier to the same weighted destinations and trust the prose. Recommend the latter for budget.
Choices: same as `cellar_fight_open` minus the breach/pick/flee options. Effects identical.

### Scene: `cellar_win_korsa_plate`
Purpose: He holds, the rest clean. Three foes down, the chief retreats through the hatch.
Choices:
- "Through the hatch — after them" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -2, Coin +1` | consumable: N

### Scene: `cellar_win_korsa_plate_bloodied`
Purpose: He holds, but he's bleeding hard. Vesna binds him if alive; otherwise he ties it himself.
Choices:
- "Through the hatch" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved, korsa_wounded`; `stats: Vigor -3` | consumable: N

### Scene: `cellar_korsa_dies`
Purpose: Permadeath. A bone-wight's claw finds the gap under the helm. He goes down kneeling.
Choices:
- "Carry him out — through the hatch" → `deep_chamber_enter` | effects: `flags: korsa_died, weapon_taken_from_cellar_pack, cellar_resolved, body_recovered`; `stats: Vigor -3` | consumable: N
- "Leave him. He'd say go." → `deep_chamber_enter` | effects: `flags: korsa_died, weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -2` | consumable: N

### Scene: `cellar_win_vesna_mass_heal`
Purpose: She binds the party in light. Everyone walks. The cellar-pack die screaming.
Choices:
- "Through the hatch" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -1, Renown +1` | consumable: N

### Scene: `cellar_win_vesna_mass_heal_costly`
Purpose: She heals the party at *her* expense. Pale, shaking. Renown gain — her sacrifice was visible.
Choices:
- "Through the hatch — slowly" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved, vesna_drained`; `stats: Vigor -2, Renown +1` | consumable: N

### Scene: `cellar_vesna_dies`
Purpose: Permadeath. She channels too much. The light goes out of her hands and her eyes at once.
Choices:
- "Carry her — Tymora's coin from her hand into yours" → `deep_chamber_enter` | effects: `flags: vesna_died, weapon_taken_from_cellar_pack, cellar_resolved, body_recovered, has_tymora_coin`; `stats: Vigor -3, Renown +1` | consumable: N
- "Leave her. She'd want it that way." → `deep_chamber_enter` | effects: `flags: vesna_died, weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -2` | consumable: N

### Scene: `cellar_win_pip_decapitate`
Purpose: She finds the chief's throat with a thrown knife. The pack collapses without him. Clean.
Choices:
- "Through the hatch" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -1, Coin +3, Renown +1` | consumable: N

### Scene: `cellar_win_pip_decapitate_costly`
Purpose: She gets the chief but takes a wound going in.
Choices:
- "Bind her, through the hatch" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved, pip_wounded`; `stats: Vigor -2, Coin +2` | consumable: N

### Scene: `cellar_pip_dies`
Purpose: Permadeath. A claw catches her at the throat where she expected to put hers. Quick.
Choices:
- "Carry her — through the hatch" → `deep_chamber_enter` | effects: `flags: pip_died, weapon_taken_from_cellar_pack, cellar_resolved, body_recovered`; `stats: Vigor -3` | consumable: N
- "Leave her. Move." → `deep_chamber_enter` | effects: `flags: pip_died, weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -2` | consumable: N

### Scene: `cellar_win_thessaly_chain`
Purpose: Chain lightning fills the cellar. The pack die. The hatch *cracks*. Sets `arrived_loud`.
Choices:
- "Through the cracked hatch" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved, arrived_loud`; `stats: Vigor -2, Coin +1` | consumable: N

### Scene: `cellar_win_thessaly_chain_loud`
Purpose: As above, but the chain *finds* something it shouldn't — an echo down the well, a tremor. Sets `arrived_loud` AND a soft pre-flag for Beat 6.
Choices:
- "Through the hatch — fast" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved, arrived_loud, woke_something_below`; `stats: Vigor -2` | consumable: N

### Scene: `cellar_thessaly_dies`
Purpose: Permadeath. The chain finds *her* — a foe with a charged amulet, or her own spell ricocheting off the hatch's wax. She goes down with her hand still glowing.
Choices:
- "Carry her — through the hatch" → `deep_chamber_enter` | effects: `flags: thessaly_died, weapon_taken_from_cellar_pack, cellar_resolved, body_recovered`; `stats: Vigor -3` | consumable: N
- "Leave her. Through, fast." → `deep_chamber_enter` | effects: `flags: thessaly_died, weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -2` | consumable: N

### Scene: `cellar_win_straight`
Purpose: Steel and spell. Won, ugly.
Choices:
- "Through the hatch" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -3, Coin +1` | consumable: N

### Scene: `cellar_win_straight_bloodied`
Purpose: As above, worse.
Choices:
- "Through the hatch" → `deep_chamber_enter` | effects: `flags: weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -4, Coin +1` | consumable: N

### Scene: `cellar_companion_dies_random`
Purpose: Random permadeath of a recruited companion in the cellar fight. Stage 5: nested weighted-`next` over the recruited two; Korsa weighted higher (frontline) than Pip/Thessaly.
Choices:
- "Through the hatch" → `deep_chamber_enter` | effects: applies `*_died` for the chosen companion, `weapon_taken_from_cellar_pack, cellar_resolved`; `stats: Vigor -3` | consumable: N

### Scene: `cellar_flee_to_retreat`
Purpose: Break and run. Routes to the retreat exit — Beat 5 retreated, Beat 6 never seen.
Choices:
- "Climb back to the well" → `act3_entry_retreat` | effects: `flags: retreated_upper, climbed_back_out, cellar_fled`; `stats: Vigor -2` | consumable: Y → Exit ζ

---

## Beat 6 — What Is Really Down There (Turning Point 4 — the Deep Encounter)

### Scene: `deep_chamber_enter`
Purpose: A low chamber, a still pool, the apprentice on the far side, *kneeling*, talking to something the player cannot see clearly. `met_the_thing_below` and `knows_the_truth` set on entry. `council_closed` set so the council hub stops appearing. Prose differs by `arrived_loud` / `woke_something_below` / `met_the_thing_below_glimpse` / `journal_decoded` / `apprentice_alive_recently` — Stage 5: layered conditional text.
Choices:
- "Move into the chamber" → `deep_choice` | gating: none | effects: `flags: met_the_thing_below, knows_the_truth, council_closed` | consumable: Y

NPCs present: surviving recruited companions; the apprentice; the *thing* (not visible).

### Scene: `deep_choice`
Purpose: Three principal approaches surface — some hidden until conditions are met. Hub-style scene that routes to one of three resolution paths.
Choices:
- "Steel out — fight through" → `deep_fight_open` | gating: none | effects: none | consumable: N
- "Listen — what is it offering?" → `deep_parley_open` | gating: hidden unless `requires: { flags: [found_journal_waterlogged] }` OR `requires: { flags: [recruited_thessaly] }` (and `flags_unset: [thessaly_died, thessaly_left]`) OR (`requires: { flags: [found_journal] }` AND `requires: { stats: { Wits: 6 } }`) | hide_if_failed: Y | effects: none | consumable: N
- "Wake what's *behind* it — and run" → `deep_stir_open` | gating: hidden unless `requires: { flags: [knows_truth_partial] }` OR `requires: { flags: [woke_something_below] }` OR `requires: { stats: { Wits: 7 } }` | hide_if_failed: Y | effects: none | consumable: N
- "Grab the apprentice and flee — now, while it's distracted" → `deep_grab_open` | gating: `requires: { stats: { Vigor: 3 } }` | grey out below ("[Vigor 3 required]") | effects: none | consumable: N

NPCs present: surviving recruited companions; the apprentice; the *thing*.

### Scene: `deep_fight_open`
Purpose: A real, dangerous combat. The *thing* fights with the apprentice as a hostage / shield. Three outcome paths. Pair-shaped tactical choices.
Choices (3–6; conditional surface):
- "Korsa charges the *thing* — open a line to the apprentice" → weighted: `deep_fight_korsa_charge_clean` (3) / `deep_fight_korsa_charge_costly` (3) / `deep_fight_korsa_dies` (3) | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left]` | hide_if_failed: Y | effects: `flags: tactic_charge_thing` | consumable: N
- "Vesna — radiant burst, the *thing* flinches, you grab the apprentice" → weighted: `deep_fight_vesna_radiant_clean` (4) / `deep_fight_vesna_radiant_costly` (3) / `deep_fight_vesna_dies` (2) / `deep_fight_apprentice_dies` (1) | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left]` | hide_if_failed: Y | effects: `flags: tactic_radiant_thing` | consumable: N
- "Pip — slip behind the apprentice, cut the binding" → weighted: `deep_fight_pip_cut_clean` (4) / `deep_fight_pip_cut_costly` (3) / `deep_fight_pip_dies` (2) / `deep_fight_apprentice_dies` (1) | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left]` | hide_if_failed: Y | effects: `flags: tactic_cut_binding` | consumable: N
- "Thessaly — fireball, the *thing*'s side of the chamber, narrow window past the apprentice" → weighted: `deep_fight_thessaly_fire_clean` (3) / `deep_fight_thessaly_fire_apprentice_lost` (3) / `deep_fight_thessaly_dies` (2) / `deep_fight_thessaly_fire_clean_costly` (2) | gating: `requires: { flags: [recruited_thessaly] }` AND `flags_unset: [thessaly_died, thessaly_left]` | hide_if_failed: Y | effects: `flags: tactic_fire_thing` | consumable: N
- "Steel and spell — straight at it, both companions with you" → weighted: `deep_fight_straight_clean` (3) / `deep_fight_straight_apprentice_lost` (3) / `deep_fight_companion_dies_random` (3) / `deep_fight_break_and_run` (1) | gating: none | effects: `flags: tactic_straight_thing` | consumable: N
- "It's too much — break and run, leave them" → `deep_fight_break_and_run` | gating: none | effects: `flags: deep_chose_break` | consumable: N

NPCs present: surviving recruited companions; the apprentice; the *thing*.

### Scene: `deep_fight_korsa_charge_clean`
Purpose: He hits the *thing* like a thrown anvil. You grab the apprentice. The *thing* dies in the dark.
Choices:
- "Out — back through the cellar" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing`; `stats: Vigor -2` | consumable: N → Exit α / β

### Scene: `deep_fight_korsa_charge_costly`
Purpose: He kills the *thing* but the *thing* takes a piece of him going down. Bad limp; not dead.
Choices:
- "Out — slowly" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing, korsa_wounded`; `stats: Vigor -3` | consumable: N → Exit α / β

### Scene: `deep_fight_korsa_dies`
Purpose: Permadeath. He charges, the *thing* opens, he goes in to the hilt. Apprentice grabbed in the gap he made.
Choices:
- "Carry him — and the apprentice — out" → `climb_out` | effects: `flags: rescued, korsa_died, weapon_taken_from_thing, body_recovered`; `stats: Vigor -3` | consumable: N → Exit β
- "Leave him. He bought it." → `climb_out` | effects: `flags: rescued, korsa_died, weapon_taken_from_thing`; `stats: Vigor -2` | consumable: N → Exit β

### Scene: `deep_fight_vesna_radiant_clean`
Purpose: Light fills the chamber. The *thing* recoils. You take the apprentice in your arms.
Choices:
- "Out" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing`; `stats: Vigor -2, Renown +1` | consumable: N → Exit α / β

### Scene: `deep_fight_vesna_radiant_costly`
Purpose: As above, but she pours too much in. Pale, blood at her gums.
Choices:
- "Out — carry her" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing, vesna_drained`; `stats: Vigor -3` | consumable: N → Exit α / β

### Scene: `deep_fight_vesna_dies`
Purpose: Permadeath. The *thing* finds her at the moment of the burst.
Choices:
- "Carry her — and the apprentice — out" → `climb_out` | effects: `flags: rescued, vesna_died, weapon_taken_from_thing, body_recovered`; `stats: Vigor -3, Renown +1` | consumable: N → Exit β
- "Leave her. She'd say go." → `climb_out` | effects: `flags: rescued, vesna_died, weapon_taken_from_thing`; `stats: Vigor -2` | consumable: N → Exit β

### Scene: `deep_fight_pip_cut_clean`
Purpose: She's behind the apprentice in two heartbeats. Cuts the binding. The *thing* roars; you finish it together.
Choices:
- "Out" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing`; `stats: Vigor -2, Coin +2` | consumable: N → Exit α / β

### Scene: `deep_fight_pip_cut_costly`
Purpose: She gets the binding cut but takes a wound from the *thing*'s reach.
Choices:
- "Out — bind her" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing, pip_wounded`; `stats: Vigor -3, Coin +1` | consumable: N → Exit α / β

### Scene: `deep_fight_pip_dies`
Purpose: Permadeath. The *thing* catches her in the gap. The cut is made; the price is hers.
Choices:
- "Carry her — and the apprentice — out" → `climb_out` | effects: `flags: rescued, pip_died, weapon_taken_from_thing, body_recovered`; `stats: Vigor -3` | consumable: N → Exit β
- "Leave her. She'd say go." → `climb_out` | effects: `flags: rescued, pip_died, weapon_taken_from_thing`; `stats: Vigor -2` | consumable: N → Exit β

### Scene: `deep_fight_thessaly_fire_clean`
Purpose: Fire takes the *thing*. The apprentice walks out unburnt — narrow window. Thessaly is herself.
Choices:
- "Out" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing`; `stats: Vigor -2` | consumable: N → Exit α / β

### Scene: `deep_fight_thessaly_fire_clean_costly`
Purpose: Fire takes the *thing* and singes Thessaly's hands and face. She'll be marked.
Choices:
- "Out — slowly" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing, thessaly_burned`; `stats: Vigor -3` | consumable: N → Exit α / β

### Scene: `deep_fight_thessaly_fire_apprentice_lost`
Purpose: Fire takes the *thing* and the apprentice with it. The window was not as narrow as she thought.
Choices:
- "Out — there's nothing left to bring" → `climb_out` | effects: `flags: weapon_taken_from_thing, apprentice_burned`; `stats: Vigor -2, Renown -1` | consumable: N → Exit δ

### Scene: `deep_fight_thessaly_dies`
Purpose: Permadeath. The *thing* fights through the fire and finds her at the heart of it.
Choices:
- "Grab the apprentice and carry her — out" → `climb_out` | effects: `flags: rescued, thessaly_died, weapon_taken_from_thing, body_recovered`; `stats: Vigor -3` | consumable: N → Exit β
- "Leave her. The apprentice. Go." → `climb_out` | effects: `flags: rescued, thessaly_died, weapon_taken_from_thing`; `stats: Vigor -2` | consumable: N → Exit β

### Scene: `deep_fight_straight_clean`
Purpose: Steel and spell. The *thing* is dead. The apprentice is yours.
Choices:
- "Out" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing`; `stats: Vigor -3` | consumable: N → Exit α / β

### Scene: `deep_fight_straight_apprentice_lost`
Purpose: The *thing* is dead. The apprentice is too — caught in the crossfire.
Choices:
- "Out — without them" → `climb_out` | effects: `flags: weapon_taken_from_thing`; `stats: Vigor -3, Renown -1` | consumable: N → Exit δ

### Scene: `deep_fight_companion_dies_random`
Purpose: Random permadeath of a recruited companion in the deep fight. Apprentice survives. Stage 5: nested weighted-`next`; weighting roughly equal across the two recruited.
Choices:
- "Out — carry the apprentice" → `climb_out` | effects: `flags: rescued, weapon_taken_from_thing`, applies `*_died` for the chosen companion; `stats: Vigor -3` | consumable: N → Exit β

### Scene: `deep_fight_apprentice_dies`
Purpose: The *thing* used the apprentice as a shield, and the shield broke.
Choices:
- "Out — without them" → `climb_out` | effects: `flags: weapon_taken_from_thing`; `stats: Vigor -2, Renown -1` | consumable: N → Exit δ

### Scene: `deep_fight_break_and_run`
Purpose: You broke. The apprentice is left. A surviving companion may refuse to leave them — Stage 5: conditional `*_left` if recruited and alive (Vesna most likely; Korsa second).
Choices:
- "Out — fast — climb out" → `climb_out` | effects: applies one `*_left` flag conditionally (engine: prefer `vesna_left` if alive, else `korsa_left`, else none); `stats: Vigor -2, Renown -2` | consumable: N → Exit δ

### Scene: `deep_parley_open`
Purpose: The *thing* speaks. The apprentice's voice echoes it. The deal is plain: the apprentice goes home, marked. Vesna, if present, will object.
Choices:
- "Listen to the terms in full" → `deep_parley_terms` | gating: `flags_unset: [parley_terms_heard]` | effects: `flags: parley_terms_heard` | consumable: Y
- "Take the deal — the apprentice walks out marked" → `deep_parley_accept` | gating: `requires: { flags: [parley_terms_heard] }` | grey out before terms heard ("[Hear the terms first]") | effects: handled in scene | consumable: Y
- "Take the deal — and ask for *more*" → `deep_parley_accept_greedy` | gating: `requires: { flags: [parley_terms_heard], stats: { Wits: 7 } }` | grey out below ("[Wits 7 required]") | hide_if_failed: N (the option's existence is fair info given the parley path) | effects: handled in scene | consumable: Y
- "Refuse — steel out instead" → `deep_fight_open` | gating: none | effects: `flags: parley_refused`; if `recruited_vesna` AND `flags_unset: [vesna_died, vesna_left]` then `flags: vesna_relieved` | consumable: N

NPCs present: surviving recruited companions; the apprentice; the *thing*.

### Scene: `deep_parley_terms`
Purpose: The terms — what "marked" means. Vesna's objection lands here as a line.
Choices:
- "Back to the choice" → `deep_parley_open` | effects: `flags: parley_terms_heard` | consumable: Y

### Scene: `deep_parley_accept`
Purpose: Sets `bargained` and `rescued`. If Vesna recruited and alive, she leaves — `vesna_left`. The apprentice walks out *changed*. HUD picks up "Marked".
Choices:
- "Out — together" → `climb_out` | effects: `flags: bargained, rescued`; if `recruited_vesna` AND `flags_unset: [vesna_died, vesna_left]` then `flags: vesna_left`; `stats: Vigor -0, Renown -1` | consumable: Y → Exit γ

### Scene: `deep_parley_accept_greedy`
Purpose: You ask for more — and the *thing* gives it, on its terms. Sets `bargained` AND `stirred_something` (the asking *was* the stirring). Routes to Exit ε.
Choices:
- "Out — fast" → `climb_out` | effects: `flags: bargained, rescued, stirred_something`; if `recruited_vesna` AND alive then `flags: vesna_left`; `stats: Vigor -1, Renown -2` | consumable: Y → Exit ε

### Scene: `deep_stir_open`
Purpose: You wake what's *behind* the *thing*. The chamber goes wrong. You run. Pair-shaped flee tactics — gory-fun foreshadowing of what's coming up the well.
Choices:
- "Grab the apprentice on the way out" → weighted: `deep_stir_grab_clean` (3) / `deep_stir_grab_costly` (3) / `deep_stir_companion_dies` (3) / `deep_stir_apprentice_dies` (1) | gating: `requires: { stats: { Vigor: 3 } }` | grey out below ("[Vigor 3 required]") | effects: `flags: stir_chose_grab` | consumable: Y
- "Leave them — pure flight" → weighted: `deep_stir_flee_clean` (4) / `deep_stir_flee_costly` (4) / `deep_stir_companion_dies` (2) | gating: none | effects: `flags: stir_chose_flee` | consumable: Y
- "Korsa — rear-guard, buy the rest a window" → `deep_stir_korsa_rearguard` | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Vesna — last burst, blind whatever's coming" → `deep_stir_vesna_blind` | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Pip — drop everything you have, caltrops, smoke, oil" → `deep_stir_pip_drop` | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N
- "Thessaly — collapse the cellar behind you" → `deep_stir_thessaly_collapse` | gating: `requires: { flags: [recruited_thessaly] }` AND `flags_unset: [thessaly_died, thessaly_left]` | hide_if_failed: Y | effects: handled in scene | consumable: N

NPCs present: surviving recruited companions; the apprentice; the *thing*; the *thing-behind* (felt, not seen).

### Scene: `deep_stir_grab_clean`
Purpose: Apprentice grabbed, chamber clearing behind you, things rising in the well below.
Choices:
- "Climb — fast" → `climb_out` | effects: `flags: rescued, stirred_something`; `stats: Vigor -3` | consumable: N → Exit ε

### Scene: `deep_stir_grab_costly`
Purpose: Apprentice grabbed, but a companion takes a hit covering you.
Choices:
- "Climb — carry whoever's down" → `climb_out` | effects: `flags: rescued, stirred_something`, conditionally `*_wounded` for one companion; `stats: Vigor -4` | consumable: N → Exit ε

### Scene: `deep_stir_companion_dies`
Purpose: Permadeath of a recruited companion in the stirring. Stage 5: nested weighted-`next`. Apprentice may or may not be saved depending on parent choice — pass through.
Choices:
- "Climb — there's no time" → `climb_out` | effects: applies `*_died` for the chosen companion, `stirred_something`; conditionally `rescued` if parent was `stir_chose_grab`; `stats: Vigor -4` | consumable: N → Exit ε

### Scene: `deep_stir_apprentice_dies`
Purpose: You reached for them. Something else reached first.
Choices:
- "Climb — without them" → `climb_out` | effects: `flags: stirred_something`; `stats: Vigor -3, Renown -1` | consumable: N → Exit ε (no `rescued`)

### Scene: `deep_stir_flee_clean`
Purpose: You leave the apprentice. The chamber falls behind you.
Choices:
- "Climb" → `climb_out` | effects: `flags: stirred_something`; `stats: Vigor -2, Renown -2` | consumable: N → Exit ε (no `rescued`)

### Scene: `deep_stir_flee_costly`
Purpose: You leave the apprentice; a companion is wounded.
Choices:
- "Climb — bind on the way" → `climb_out` | effects: `flags: stirred_something`, conditionally `*_wounded`; `stats: Vigor -3, Renown -2` | consumable: N → Exit ε

### Scene: `deep_stir_korsa_rearguard`
Purpose: Permadeath. He stays. Door, axe, last stand. He buys the rest a window. Apprentice is grabbed in the gap.
Choices:
- "Climb — Korsa earned this run" → `climb_out` | effects: `flags: rescued, stirred_something, korsa_died`; `stats: Vigor -3, Renown +1` | consumable: Y → Exit ε

### Scene: `deep_stir_vesna_blind`
Purpose: Vesna's last spell — light so bright the chamber goes white. Apprentice grabbed. Vesna may or may not survive.
Choices:
- "Carry her — climb" → weighted: `climb_out` (effects: `flags: rescued, stirred_something, vesna_drained`; `stats: Vigor -3`) (3) / a permadeath variant (effects: `flags: rescued, stirred_something, vesna_died, body_recovered`; `stats: Vigor -3, Renown +1`) (2) — Stage 5: implement as two destination scenes `deep_stir_vesna_blind_lives` and `deep_stir_vesna_blind_dies` | consumable: Y → Exit ε

### Scene: `deep_stir_vesna_blind_lives`
Purpose: She lives. Drained, blind for an hour, but breathing.
Choices:
- "Climb" → `climb_out` | effects: `flags: rescued, stirred_something, vesna_drained`; `stats: Vigor -3` | consumable: N → Exit ε

### Scene: `deep_stir_vesna_blind_dies`
Purpose: She doesn't.
Choices:
- "Carry her — climb" → `climb_out` | effects: `flags: rescued, stirred_something, vesna_died, body_recovered`; `stats: Vigor -3, Renown +1` | consumable: N → Exit ε

### Scene: `deep_stir_pip_drop`
Purpose: She drops everything in the doorway. Caltrops, smoke, lamp oil. The chamber lights up behind you. She lives.
Choices:
- "Climb — fast" → `climb_out` | effects: `flags: rescued, stirred_something`; `stats: Vigor -2, Coin -1` (Pip's stuff) | consumable: Y → Exit ε

### Scene: `deep_stir_thessaly_collapse`
Purpose: She brings the cellar down behind you. The chamber is sealed. The *thing-behind* is *not*. Stage 5: weighted — clean (Thessaly lives) vs Thessaly dies in the collapse.
Choices:
- "Climb" → weighted: `deep_stir_thessaly_collapse_lives` (3) / `deep_stir_thessaly_collapse_dies` (2) | consumable: Y → Exit ε

### Scene: `deep_stir_thessaly_collapse_lives`
Purpose: She lives. Hands shaking.
Choices:
- "Climb" → `climb_out` | effects: `flags: rescued, stirred_something`; `stats: Vigor -3` | consumable: N → Exit ε

### Scene: `deep_stir_thessaly_collapse_dies`
Purpose: She doesn't make the doorway.
Choices:
- "Climb — without her" → `climb_out` | effects: `flags: rescued, stirred_something, thessaly_died`; `stats: Vigor -3` | consumable: N → Exit ε

### Scene: `deep_grab_open`
Purpose: Pure dash — grab the apprentice while the *thing* is mid-sentence. No fight, no parley, no stirring. Wits-or-Vigor coin-flip outcome. Routes to one of three resolutions.
Choices:
- "Now" → weighted: `deep_grab_clean` (4) / `deep_grab_caught` (3) / `deep_grab_apprentice_lost` (2) | gating: none | effects: `flags: deep_chose_grab` | consumable: Y

### Scene: `deep_grab_clean`
Purpose: Clean. The *thing* shrieks behind you. Apprentice in your arms.
Choices:
- "Out" → `climb_out` | effects: `flags: rescued`; `stats: Vigor -2` | consumable: N → Exit α / β

### Scene: `deep_grab_caught`
Purpose: Caught. Routes to `deep_fight_open` mid-fight — surprise lost, weighted-fail outcomes shifted toward bad. Stage 5: implement as a separate scene-set OR pass a `caught_during_grab` flag and accept the same destinations with worse prose.
Choices:
- "Steel out" → `deep_fight_open` | effects: `flags: caught_during_grab` | consumable: N

### Scene: `deep_grab_apprentice_lost`
Purpose: You reach. The *thing* moves first. You carry nothing back.
Choices:
- "Out — without them" → `climb_out` | effects: none extra; `stats: Vigor -2, Renown -1` | consumable: N → Exit δ

---

## Beat 7 — The Climb Out (Turning Point 5 — Act 2 → Act 3)

### Scene: `climb_out`
Purpose: Back through the upper levels and to the rope. Companions help or are helped. Wounded, lighter, possibly carrying an apprentice (alive, marked, dead, or absent), possibly with something following. Vigor-tax climb. If a companion died in 5/6 and `body_recovered` is set, brief leave-the-body beat (Vesna prays if alive; otherwise the player chooses one remembering line — Stage 5: conditional). If `stirred_something`, the climb is fast and loud. Stage 5: layer prose conditionals heavily.
Choices:
- "Up — to the well-mouth" → `well_mouth_climb_out` | gating: none | effects: `stats: Vigor -1` | consumable: N

NPCs present: surviving recruited companions; possibly the apprentice; possibly bodies.

### Scene: `well_mouth_climb_out`
Purpose: The lip of the well, again. Different now. Companions present/absent in prose; Vigor visible; rope different. This is the act exit. Sets `climbed_back_out` and locks the act exit configuration. Routes to Act 3 entry per outcome flags.
Choices:
- "Step over the lip — into the Common Room" → `act3_entry` | gating: none | effects: `flags: climbed_back_out` | consumable: Y

NPCs present: surviving recruited companions; possibly the apprentice.

### Scene: `act3_entry`
Purpose: Act exit handoff — placeholder scene reference for Stage 3 Act 3 (or Stage 5 if Act 3 is being written next). Carries all flags as listed in `act-2.md` Exits α/β/γ/δ/ε.
Choices: defined in `act-3-scenes.md` (when Stage 3 runs for Act 3).

### Scene: `act3_entry_retreat`
Purpose: Act exit handoff for Exit ζ (retreat from upper levels without reaching Beat 6). Distinct entry so Act 3 can branch on `retreated_upper`.
Choices: defined in `act-3-scenes.md`.

---

## NPCs in this act

- **Durnan the Wanderer** — background presence at the well-mouth (`act2_entry`, `well_mouth_first`, `well_mouth_descend`, `well_mouth_climb_out`); audible only. Carries from Act 1.
- **The Client** (named in Stage 4) — not present in Act 2 except by reference. Their letter may appear in `camp_search`.
- **The missing apprentice** (Stage 4: name, age, trade) — first physically present in `deep_chamber_enter`. Central to Beat 6 and the Beat 7 carry-out. Voice surfaces in `journal_decode` and `camp_search`.
- **Korsa Ironbrow** — recruited or not; if recruited, present in every Beat 1/2/5/6/7 scene and active in pair-shaped tactical options across all three combats. Carries from Act 1.
- **Sister Vesna** — as Korsa, plus the `shrine_stoop` side-beat is hers. Has a unique objection and `vesna_left` path in Beat 6 parley.
- **Pip Tallowmuch** — as Korsa, plus the `fence_corner` side-beat and `harbour_pip_scout` and `cellar_pip_pick` are hers.
- **Thessaly Vex** — as Korsa, plus `cistern_thessaly_rune` reveals her motive (if `knows_thessaly_motive` was set in Act 1) and `cellar_thessaly_breach` is her "loud" path setting `arrived_loud`.
- **Unnamed watchman (alley)** — `alley_approach` only. Stage 4 may or may not name; flat NPC.
- **The alley witness** — Stage 4 to name. Appears in `alley_approach` (audible), `alley_witness_room`, `alley_witness_speaks`, `alley_witness_bolts`. May die in `alley_witness_burned`. The act's first soft moral test (press / calm / threaten / let go).
- **The alley toughs** (3–5, unnamed) — `alley_brawl_open` and resolution scenes. Stage 4: keep unnamed; archetype only ("the one with the boarding-pike", "the one with the broken nose").
- **The bargeman** — Stage 4 to name. `harbour_approach`, `harbour_bargeman_talk`. Knows more than he says; survives the act regardless of player path.
- **The harbour clerk** — `harbour_records` only. Stage 4 may name.
- **The unnamed cultist (harbour)** — `harbour_ambush_open` and resolutions. Stage 4: keep unnamed; archetype only.
- **The kuo-toa / thralls (harbour)** — `harbour_ambush_open` and resolutions. Composition shifts on `found_journal`.
- **The unnamed shrine-keep (Trades Ward)** — `shrine_stoop` only. Stage 4 may name; flat NPC.
- **The unnamed fence (Trades Ward)** — `fence_corner` only. Stage 4 may name.
- **The cellar pack** (ghouls / goblins+warlock / bone-wights) — `cellar_fight_open` and resolutions. Composition shifts on lead state. Stage 4: name the warlock if the alley-guide variant fires (the *guide* is the warlock).
- **The *thing* below** — `deep_chamber_enter` and all Beat 6 scenes. Stage 4 to fix species/identity (kept abstract here per the brief — an aboleth-touched envoy, a ghaunadaur-cult mind, a forgotten Halaster experiment; pick one consistent with established Undermountain lore). Voice and speech-pattern matter — Stage 4 cast sheet should pin this.
- **The *thing-behind*** — `deep_stir_*` scenes, never seen. Stage 4: decide whether to name or keep it as pure dread. Recommend: keep unnamed; surfaces in Act 3 colour and `stirred_something` ending prose.

---

## Notes for Stage 4 (cast) and Stage 5 (scene writing)

- **Pair-shaped tactical menus per combat:** every combat lists tactical options for all four candidates plus an always-available "fight straight" and (where appropriate) a flee. Engine surfaces only those whose recruit flag is set AND that companion is alive. Stage 5: write the YAML for *all* options; the engine's `requires` + `flags_unset` filtering handles surfacing.
- **Companion death in combat:** every combat has a `*_dies` weighted-fail branch per companion plus a `companion_dies_random` branch on the always-available straight option. Stage 5: implement `companion_dies_random` as a nested weighted-`next` selecting between the recruited companions' specific `*_dies` outcome scenes. Don't write a generic "a companion died" scene — write per-companion permadeath prose. (Tradeoff: more scenes, but each death lands.)
- **Body-recovered branching:** every permadeath scene offers "carry the body" vs "leave it" as the choice — `body_recovered` flag set on carry. Act 3 should branch off this for the surviving-companion exit beats and for the Common Room presence of the body / no-body.
- **Council cycle reset:** simplest implementation is two distinct council scenes (`companion_council_spoke` and `companion_council_upper`) with their own `_done` flags, rather than trying to unset cycle flags. Recommended in Stage 5.
- **Stealth modifier on cellar fight:** `cellar_fight_stealth` reuses `cellar_fight_open`'s tactical menu but with a `cellar_picked_quiet` flag in scope. Stage 5: simplest is to write the same scene with a conditional `text` block at the top reflecting the stealth opener, and let the weights remain as written (the prose carries the difference). Trim a few lines out of the bad-luck branches if `cellar_picked_quiet` is set, to honour the mechanical difference.
- **`harbour_warned` modifier on harbour ambush:** same pattern — same destinations, conditional prose for the warning.
- **`caught_during_grab` modifier on deep fight:** routed via `deep_grab_caught` → `deep_fight_open`. Stage 5: top-of-scene conditional prose; consider trimming a tactical option or two if the tactical surprise is gone.
- **`arrived_loud` on Beat 6:** affects `deep_chamber_enter` prose heavily — the *thing* is ready, the apprentice is on their feet, the parley window is narrower. Stage 5: surface this as a stat-implicit prose layer; mechanically it does *not* close the parley path (the option still surfaces if the gating flags are set), but the hidden-stir option becomes more readable.
- **Conditional consumable on shrine_stoop and fence_corner:** these are gated on the relevant companion being recruited AND alive. If the companion dies *before* the player uses them, the option vanishes (gating handles this). If the companion was never recruited, the option never appears.
- **Counted scenes:** ~60 named scenes listed above. Substantially over the ~35 budget from `structure.md`. The expansion is largely *combat resolution variants* — three combats × ~6 outcomes each × ~3 deaths per combat. This is a known tradeoff: per-companion permadeath prose is non-negotiable for the act's stated weight ("companion death is real and on the table at every combat"), and the alternative — generic death scenes — undercuts the brief.
  - **Defensible trim options for Stage 5 if budget pressure is real:**
    - Collapse `*_costly` and `*_clean` into a single scene with conditional prose based on a temp flag — saves ~12 scenes across all combats.
    - Collapse `*_companion_dies_random` per combat into a single hub scene that routes by recruited-companion at runtime — saves 3 scenes (already implemented as a single scene above; the per-companion variants live in the named `*_dies` scenes).
    - Drop `cellar_fight_stealth` as a distinct scene set; reuse `cellar_fight_open` with a flag — saves ~6 scenes.
    - Drop `deep_grab_caught` as a routing scene; merge into `deep_fight_open` with a flag — saves 1 scene.
    - The Beat 6 stir-flee branches are dense; could be trimmed to one shared resolution scene per choice, with conditionals — saves ~4 scenes.
  - **If all trims taken**, the act lands at ~35 scenes per the structure budget. **Recommend Stage 5 try the per-scene granularity first and trim only where redundancy bites.**
- **`act3_entry` and `act3_entry_retreat`:** these are the Act 2 → Act 3 handoff scenes. Stage 3 for Act 3 (or Stage 5 if writing direct) defines what comes next. Outcome flags (`rescued`, `bargained`, `stirred_something`, `retreated_upper`, plus companion `_died`/`_left` flags) drive Act 3 branching.
