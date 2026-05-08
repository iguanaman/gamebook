# Dead Letters — Act 3 Scenes

Scene-level breakdown of Beats 1–6 from `act-3.md`. Act 3 is linear by design — no investigation hubs — but every beat retains 3–6 active choices through convergent framings. The act is structured around five branch points (Beat 1 diversion, Beat 2 fight/talk/run + Kellner conversation, Beat 3 ground-to-ground, Beat 4 last decision, Beat 5 the final choice) and four codas (Expose / Bury It late / Martyr / Pavement permadeath).

Entry routing: Act 2 Exit A–E feed `drive_out_open` (Beat 1). Exit F never enters Act 3 (terminal early/late Bury It). Variant entry shading is handled inside `drive_out_open` (heat tail, Mort phone, `frank_past_revealed` narration) rather than across separate entry scenes.

---

## Beat 1 — The Drive Out

### Scene: `drive_out_open`
Purpose: Frank's car. Rain. The narrator allows himself the past tense for a beat — what he thought he was doing when he hung out the shingle, what that's worth tonight. The ledger or its absence on the passenger seat. The shading flags colour the prose (Exit D heat → sedan in the mirror two blocks from the office; `mort_owes_one` → Mort's phone call before he leaves; `frank_past_revealed` → the narrator names what walking into a Kellner meeting means knowing what he now knows).
Choices:
- "Drive straight to the river. Get this over with." → `drive_river_arrive` | gating: none | effects: none | (convergent: blunt — accept the meet)
- "Drive the long way. Make him wait." → `drive_river_arrive` | (convergent: cautious — same destination, different posture)
- "Take Mort's call. Hear him out before you decide." → `mort_phone_call` | gating: requires `mort_owes_one: true` AND `flags_unset: [mort_phoned_act3]` | hide_if_failed: false (grey out — "Nobody's calling. The phone is dead.") | effects: `mort_phoned_act3: true` | consumable: Y
- "Stop at Mort's apartment. Drop the package." → `mort_drop_package` | gating: requires `mort_owes_one: true` AND `flags_unset: [left_package]` | hide_if_failed: true (option's existence is a spoiler if not earned) | effects: none | consumable: Y (`left_package: true` is set inside `mort_drop_package`)
- "Try to lose the tail." → `lose_tail` | gating: requires `heat >= 6` | hide_if_failed: true (only present on the hot path) | effects: none
- "Pull over. Sit with it. One cigarette." → `drive_river_arrive` | (convergent: stalled — same destination, the cigarette is the content)
NPCs present: Frank (narrator only). Mort by phone optionally. Sedan tail off-page on heat track.

### Scene: `mort_phone_call`
Purpose: Mort on a payphone, quiet, not joking for once. "Kid. You don't have to keep that meet. There's a couch in my back room. I've never offered it to anyone." He has worked out who Kellner is. He won't say it on the line.
Choices:
- "Tell him you're keeping the meet anyway." → `drive_river_arrive` | effects: none | (convergent: stubborn)
- "Thank him. Hang up. Drive on." → `drive_river_arrive` | (convergent: warm)
- "Ask him to write a name on a card and put it in his desk in case." → `drive_river_arrive` | effects: `mort_holds_card: true` (narrative shading; reads in Expose coda) | (convergent: insurance)
NPCs present: Mort Halloran (on phone)

### Scene: `mort_drop_package`
Purpose: Mort answers the door in shirtsleeves. Doesn't ask what's in the envelope. Writes Dora Reyes's address on it himself with his desk pen and his inked thumb. Tells Frank to go.
Choices:
- "Hand him the envelope. Leave without saying it." → `drive_river_arrive` | effects: `left_package: true`, `package_via_mort: true` | (convergent: silent — Martyr now live)
- "Hand him the envelope. Tell him what's in it." → `drive_river_arrive` | effects: `left_package: true`, `package_via_mort: true`, `mort_knows: true` | (convergent: full disclosure — Mort is now visibly involved; closes the press path if used at Beat 3)
- "Hand him the envelope. Ask him to wait two days before mailing it." → `drive_river_arrive` | effects: `left_package: true`, `package_via_mort: true`, `package_delayed: true` (shading — gives Frank time to reach Dora at Beat 4 before the package does) | (convergent: tactical)
NPCs present: Mort Halloran

### Scene: `lose_tail`
Purpose: Frank works the side streets. Streetcars he doesn't usually take. Three turns through the warehouse district. The sedan stays with him or doesn't. Rep check, narrated through driving.
Choices:
- "Push the engine. Cut through the alley behind the brewery." → weighted: `lose_tail_clean` (rep ≥ 5, 3 / rep < 5, 1) / `lose_tail_fail` (rep ≥ 5, 1 / rep < 5, 3) | effects: none | (the gambit — outcome stat-weighted)
- "Drive sensibly. Lose them in traffic." → weighted: `lose_tail_clean` (2) / `lose_tail_fail` (2) | effects: none | (the patient route — even odds regardless of stat)
- "Stop driving. Walk the rest." → `lose_tail_clean` | effects: `heat -1` (small bleed; the car is what they were tracking) | (convergent: counter-intuitive — costs Frank his car as an exit option later, but reliably loses the tail)
NPCs present: sedan driver (silent, off-page)

### Scene: `lose_tail_clean`
Purpose: Frank parks four blocks from the river. Walks the last stretch. Nobody behind him.
Choices:
- "Continue on foot." → `drive_river_arrive` | effects: none | (single-choice — pacing, the absence is the content)
NPCs present: none

### Scene: `lose_tail_fail`
Purpose: Frank gets to the river with two cars in his rearview, not one. He pretends he didn't notice and parks where Kellner told him to.
Choices:
- "Continue." → `drive_river_arrive` | effects: `heat +1` | (single-choice — committed escalation)
NPCs present: sedan driver (silent, off-page)

### Scene: `drive_river_arrive`
Purpose: Frank parks on the gravel apron above the warehouse. Two cars are already there. Lights on in the doorway. Kellner is alone in the doorway. The conversation Frank wanted to have in the diner three nights ago, on Kellner's terms.
Choices:
- "Walk up to the doorway. Hands visible." → `warehouse_doorway` | effects: `confronted_kellner: true` | (convergent: open)
- "Walk up. Hand in coat pocket on the revolver Frank doesn't usually carry." → `warehouse_doorway` | effects: `confronted_kellner: true`, `frank_armed: true` (narrative shading — read by `warehouse_fight`) | (convergent: armed)
- "Walk up smoking. Make him watch you finish the cigarette before you talk." → `warehouse_doorway` | effects: `confronted_kellner: true` | (convergent: theatre)
NPCs present: Walt Kellner (in doorway), Salzano (off-page, behind cars), Salzano's second man (silent, off-page)

---

## Beat 2 — The Warehouse

### Scene: `warehouse_doorway`
Purpose: Kellner steps out into the rain to meet Frank halfway. Warm. Tired. "Frank." Touches Frank's elbow the way an older brother does. The conversation he stages is *the* conversation — quieter, more honest, almost an apology. The betrayal will land in the middle of a kindness. On `trusted_kellner`, Kellner already names the ledger and where Frank's other copies are not.
Choices:
- "Talk." → `kellner_talk_hub` | effects: none | (convergent: take the conversation)
- "Cut him off — tell him you know it was him in '39." → `kellner_talk_hub` | gating: requires `frank_past_revealed: true` | hide_if_failed: true | effects: `confronted_kellner_past: true` (early — survivability bonus) | (a stat-gated opener; collapses straight into the hub but the `past` topic is now exhausted)
- "Don't talk. Walk past him into the warehouse." → `warehouse_reveal` | effects: `kellner_offended: true` | (convergent: cold — skips the conversation, triggers the reveal early; locks the offer route)
NPCs present: Walt Kellner

### Conversation — `kellner_talk_hub`
Purpose: The betrayal as conversation. Three consumable topics; an always-available walk-out that triggers the reveal. The conversation is the only place Frank can earn `kellner_admitted` and (with `frank_past_revealed`) `confronted_kellner_past`. Salzano is not visible during this hub. The hub closes when the player picks "step away" or exhausts all topics.
Returns from: each topic returns here.
Topics:
- "Ray." → `kellner_topic_ray` | gating: requires `flags_unset: [kellner_admitted]` | effects: `kellner_admitted: true` (set on exit from the topic) | consumable: Y
- "The past — what you did in '39." → `kellner_topic_past` | gating: requires `frank_past_revealed: true` AND `flags_unset: [confronted_kellner_past]` | hide_if_failed: false (grey out — "You don't know enough to ask. Yet." — but on this run he does or doesn't; principles want it visible when the player has the receipt) | effects: `confronted_kellner_past: true` | consumable: Y
- "The offer. What he wants from you tonight." → `kellner_topic_offer` | gating: requires `flags_unset: [heard_offer]` | effects: `heard_offer: true` | consumable: Y
- "Step away from him." → `warehouse_reveal` | gating: none | effects: none | (always-available exit — the reveal fires from here)
NPCs present: Walt Kellner

### Scene: `kellner_topic_ray`
Purpose: Kellner finally tells the truth — partial. The night Ray died: a meeting on a pier, a man Ray didn't expect, a phone call Kellner made that he can name now and couldn't then. Kellner does not name Salzano. He names a *time* — twenty past nine — and looks at his watch when he says it. Frank reads it. Kellner sees Frank read it. Neither acknowledges.
Choices:
- "Press him on the call he made." → `kellner_talk_hub` | effects: `kellner_admitted: true`, `evidence +1` (verbal confirmation; Frank can attest) | (convergent: hard)
- "Let him land it. Don't push." → `kellner_talk_hub` | effects: `kellner_admitted: true` | (convergent: quiet)
- "Tell him you already knew." → `kellner_talk_hub` | effects: `kellner_admitted: true`, `kellner_offended: true` (narrative shading — affects fight survivability +0/-0 but reads in coda) | (convergent: cold)
NPCs present: Walt Kellner

### Scene: `kellner_topic_past`
Purpose: Frank confronts Kellner with '39 — Frank refusing to bury a case, Kellner being the one who put the report on the captain's desk, Frank's licence on the line, the years between. Kellner's hands stay visible. The fountain pen comes out of his jacket pocket and gets put back. He doesn't deny it.
Choices:
- "Make him say it out loud." → `kellner_talk_hub` | effects: `confronted_kellner_past: true` | (convergent: forced confession)
- "Tell him you forgive him. Watch him not believe you." → `kellner_talk_hub` | effects: `confronted_kellner_past: true`, `kellner_unsteadied: true` (additional survivability bonus on the talk path through `warehouse_fight`) | (convergent: false grace — the most dangerous thing Frank can say)
- "Tell him the only thing you want from him is the truth about tonight." → `kellner_talk_hub` | effects: `confronted_kellner_past: true` | (convergent: pivot — reroutes the energy back at the warehouse)
NPCs present: Walt Kellner

### Scene: `kellner_topic_offer`
Purpose: Kellner names a price — leave the book, walk away tonight, no more questions, the licence stays clean, a job at a security firm if Frank wants it. The conditional is: leave the book. *If `found_ledger: false`*, the offer is genuine — Kellner thinks the absence of the book is the problem, not Frank. *If `found_ledger: true`*, the offer is a feint; accepting it triggers the Pavement check.
Choices:
- "Take the offer. Leave the book and walk." → `warehouse_offer_taken` | gating: none | effects: `heard_offer: true`, `accepted_offer: true` | (convergent — outcome routes by `found_ledger` inside `warehouse_offer_taken`)
- "Refuse the offer. Quietly." → `kellner_talk_hub` | effects: `heard_offer: true` | (convergent: quiet refusal)
- "Refuse the offer. Out loud, where the men in the cars can hear it." → `warehouse_reveal` | effects: `heard_offer: true`, `kellner_offended: true` | (convergent: theatre — triggers the reveal immediately, denies Kellner the conversation)
NPCs present: Walt Kellner

### Scene: `warehouse_offer_taken`
Purpose: Routing scene. If `found_ledger: false`, the offer is honoured: Kellner walks Frank back to his car, takes the photographs (or the absence of them) at face value, and Frank drives away into the late Bury It coda — Kellner never told him the offer was the line. If `found_ledger: true`, Salzano steps out the moment Frank says yes; the offer was a feint.
Choices:
- "Continue." → routes by flags: if `found_ledger: false` → `act_3_bury_it_late` (with `accepted_offer_bury: true` shading); if `found_ledger: true` → `pavement_check` | effects: none | (single-choice — committed; the player chose; the engine routes)
NPCs present: Walt Kellner; Salzano (only on `found_ledger: true` path, off-page → on-page through `pavement_check`)

### Scene: `warehouse_reveal`
Purpose: Kellner steps back from Frank. Salzano walks out from behind the second car. The second man stays in the shadow on Salzano's left. Kellner keeps his hands where Frank can see them — that part of the kindness was real. The conversation is over. Kellner says one line — short, regretful, the opposite of his usual cadence — and steps to the side.
Choices:
- "Fight." → `warehouse_fight` | effects: none | (the violent route — outcome by stat margin)
- "Talk past him. Address Salzano directly." → `warehouse_talk` | effects: none | (the talk route — uses `confronted_kellner_past` and `kellner_unsteadied` for survivability)
- "Run." → `warehouse_run` | effects: none | (the flight route — heat-gated outcome)
- "Stand still. Make Salzano speak first." → `warehouse_talk` | (convergent: cold — same destination as talk, different posture; the silence forces Salzano to open)
NPCs present: Walt Kellner, Salzano, Salzano's second man (silent)

### Scene: `warehouse_fight`
Purpose: A short, ugly close-quarters scene. Outcome reads heat, rep, `frank_armed`, `confronted_kellner_past`, `kellner_unsteadied`. Kellner does not draw on Frank — that part of the kindness is also real. Salzano does. The second man covers the door.
Choices: (routing only — no player choice; fires by stat margin)
- "Continue." → routes: if `heat >= 8 AND rep <= 3 AND NOT (confronted_kellner_past AND kellner_unsteadied)` → `pavement_death`; else → `warehouse_escape` | effects: stat margin determines wound flag set on exit (`wound_graze` | `wound_hand` | `wound_rib`) | (single-choice — forced; the dice rolled in the previous beats)
NPCs present: Walt Kellner, Salzano, Salzano's second man

### Scene: `warehouse_talk`
Purpose: Frank walks Salzano through what Salzano already knows. Names the conspiracy back to him. Names *Halston Thorne* if the player has read the ledger (`found_ledger: true` AND `evidence >= 5`); names "the man who pays you" otherwise. Salzano listens. Kellner stands very still. The talk path survives if Frank earned the survivability bonuses; it fails into the fight path otherwise.
Choices: (routing only)
- "Continue." → routes: if `confronted_kellner_past: true` OR `frank_past_revealed: true` → `warehouse_escape` (talk-survival); else → `warehouse_fight` (talk-failure cascade) | effects: if survives, sets `talked_past_salzano: true` (coda shading) | (single-choice — forced; the receipts decide it)
NPCs present: Walt Kellner, Salzano

### Scene: `warehouse_run`
Purpose: Frank breaks for the side door. Three steps. Heat-gated.
Choices: (routing only)
- "Continue." → routes: if `heat <= 4` → `warehouse_escape` (clean); if `heat >= 5 AND heat <= 7` → `warehouse_escape` (with `wound_graze` and `heat +1`); if `heat >= 8` → `pavement_death` | effects: stat margin determines wound | (single-choice — forced)
NPCs present: Salzano (the gunfire, off-page); Salzano's second man (the pursuit)

### Scene: `warehouse_escape`
Purpose: Frank gets clear of the warehouse. Burned. Wound flag set by routing. The ledger may or may not still be in his hand — if Frank arrived with it (`found_ledger: true`), he keeps it on the talk and run paths and may lose it on the fight path (1-in-3 random — `ledger_dropped: true` flag if dropped, which converts climax options at Beat 5).
Choices:
- "Run for the river bank. Three blocks of darkness." → `river_bank_run` | effects: none | (convergent: keep moving)
- "Cut through the rail yard. Hide and let them pass." → `river_bank_run` | effects: `heat -1` (the dark bleeds the heat down by one — committed cool) | (convergent: still — same destination, different rhythm)
- "Double back to your car if it's still there." → weighted: `river_bank_run` (3) / `pavement_death` (1, only if `heat >= 7`) | effects: none | (random — gambling on the car; lethal margin if heat is high)
NPCs present: Salzano (off-page, hunting); Salzano's second man (off-page)

### Scene: `pavement_check`
Purpose: Routing scene for the offer-feint variant. Salzano steps out the moment Frank says he'll take the offer. Kellner does not look at Frank. Frank's revolver, if he has one (`frank_armed: true`), is too far in his coat pocket to reach. The check is the same as the fight check, with no survivability bonus from the conversation hub (Frank chose the offer, not the talk).
Choices: (routing only)
- "Continue." → routes: if `heat >= 8 AND rep <= 3` → `pavement_death`; else → `warehouse_escape` (with `wound_rib` mandatory; Salzano shoots Frank in the side as he turns) | effects: `heat +1` | (single-choice — forced)
NPCs present: Walt Kellner, Salzano

### Scene: `pavement_death`
Purpose: Permadeath coda. Cold third-person prose. The narrator goes silent. A single line reports what was written on the police blotter the next morning — accidental discharge, body found at the river warehouse, no further action.
Choices: [] (terminal — no choices; Pavement permadeath ending)
NPCs present: none (Frank is the body; Kellner and Salzano are off-page now and forever in this run)

---

## Beat 3 — The River

### Scene: `river_bank_run`
Purpose: Frank along the bank. Wet stones. The sound of two cars on the road above looking for him. He needs ground. Three options surface — each closes one Act-3 ally for the rest of the play.
Choices:
- "A patrol car pulls alongside. Take the ride." → `quint_patrol_car` | gating: requires `mort_owes_one: true` OR `pushed_back: true` (Quint has been watching Brennan; he found Frank because Frank earned a flag pointing at the same machine) AND `rep >= 3` | hide_if_failed: false (grey out — "Patrol cars don't stop for men like you tonight.") | effects: none | consumable: Y (set inside `quint_patrol_car`)
- "Go to ground at Mort's basement." → `mort_basement` | gating: requires `mort_owes_one: true` AND `flags_unset: [mort_basement_used]` AND `flags_unset: [package_via_mort]` (using Mort's basement and *also* having dropped the package through him already would consume Mort twice; the engine prefers each ally is spent once) | hide_if_failed: false (grey out — "Mort's already in this. Don't put him in deeper.") | effects: none | consumable: Y
- "South-side flophouse. No NPC cost." → `flophouse_room` | gating: none | effects: none | (always available — but heat carries forward)
- "Sit on the bank ten minutes. Let the heat fall off." → weighted: `flophouse_room` (2) / `river_bank_run_caught` (1, only if `heat >= 7`) | effects: `heat -1` if survives | (random — risk of being found if Frank is hot already)
NPCs present: Officer Daniel Quint (in patrol car, off-page until accepted); Mort Halloran (off-page); ambient river

### Scene: `quint_patrol_car`
Purpose: Quint pulls the patrol car alongside. Doesn't say "get in"; says "Mr. Cady, I've been waiting." Repeats Frank's last sentence back to him before answering. Drives Frank to a one-bedroom in a part of town no cop should know. Lends him a clean shirt. Says, plainly, that Brennan is the part of the force he didn't take the oath for.
Choices:
- "Take the bed. Sleep two hours." → `morning_room` | effects: `quint_helped: true`, `heat -1` | (convergent: rest)
- "Take the floor. Stay up. Watch the window." → `morning_room` | effects: `quint_helped: true` | (convergent: vigilant)
- "Tell him what you know. All of it. Make him a witness." → `morning_room` | effects: `quint_helped: true`, `quint_briefed: true` (Expose coda shading — Quint testifies) | (convergent: enlist him)
NPCs present: Officer Daniel Quint

### Scene: `mort_basement`
Purpose: Mort lets Frank in the alley door. Gives him a blanket and the same flask from Beat 6 of Act 1. Doesn't ask. The basement smells of newsprint and damp stone. Mort sits at the bottom of the stair with his pen and a cigarette and waits for morning. The press path is now visibly compromised — Mort is in this, not adjacent to it. The Dora-direct option at Beat 4 is locked when this scene fires (Mort can't be the bridge any more).
Choices:
- "Sleep on the cot. Let him keep watch." → `morning_room` | effects: `mort_basement_used: true`, `mort_burned: true` (locks Dora-direct at Beat 4), `heat -1` | (convergent: trust him)
- "Stay up with him. Talk through what comes next." → `morning_room` | effects: `mort_basement_used: true`, `mort_burned: true`, `mort_knows_full: true` (coda shading on Bury It late — Mort is named in the diner-counter paper) | (convergent: full disclosure)
- "Sleep an hour. Wake him. Switch." → `morning_room` | effects: `mort_basement_used: true`, `mort_burned: true` | (convergent: shifts — small heat -1 not gained, no other change)
NPCs present: Mort Halloran

### Scene: `flophouse_room`
Purpose: A room above a Filipino restaurant on the south side that Frank has slept in twice before, the last time eight years ago. The radiator clanks. The sheets aren't clean. He sleeps in his coat. No NPC cost; the heat carries forward.
Choices:
- "Lie down. Don't take the coat off." → `morning_room` | effects: none | (convergent: still on duty)
- "Lie down. Smoke the last cigarette. Watch the ceiling." → `morning_room` | (convergent: hollow)
- "Sit by the window the whole night. Don't sleep." → `morning_room` | effects: `heat +1` (Frank arrives at Beat 4 fried — drives the high-heat track harder) | (convergent: stubborn — the cost is real)
NPCs present: ambient flophouse (no spoken voices; narrator-rendered)

### Scene: `river_bank_run_caught`
Purpose: Variant — Frank is found on the bank by Salzano's second man. Short, ugly. Outcome by stat.
Choices: (routing only)
- "Continue." → routes: if `rep >= 4` → `flophouse_room` (with `wound_graze` and `heat +1`); else → `pavement_death` | effects: stat margin | (single-choice — forced)
NPCs present: Salzano's second man

---

## Beat 4 — Where the City Already Wrote You

### Scene: `morning_room`
Purpose: The room Frank slept in. Light through whatever passes for a window. The radio on a low shelf is talking — Brennan's voice (or a stand-in announcer reading Brennan's words verbatim) reading a wire copy describing a "person of interest" wanted for a body found in the river overnight. A body that does not exist. Frank is the person of interest. Dora Reyes is named as a "second person sought for questioning." Mort calls (or doesn't, by path) to confirm the *Examiner* runs it at noon.
Choices:
- "Go to Dora directly. Hand it to her in person." → `dora_newsroom` | gating: requires `left_package: true` OR (`mort_owes_one: true` AND `flags_unset: [mort_burned]`) | hide_if_failed: false (grey out — "You don't have a way to her. Not now.") | effects: `path_dora: true` | consumable: Y (`mort_burned: true` set on entry — Mort has spent the introduction)
- "Go to Aldwick once more. See Marta." → `aldwick_farewell` | gating: requires `marta_talked: true` | hide_if_failed: false (grey out — "Aldwick won't open for you. You didn't earn the visit.") | effects: `path_aldwick: true`, `said_goodbye_aldwick: true` | consumable: Y
- "Hole up. Wait for nightfall. Climax at the office." → `office_dusk_arrive` | gating: none | effects: `path_office: true` | (always-available — convergent A: empty-handed)
- "Hole up. Eat whatever Quint left. Wait for nightfall." → `office_dusk_arrive` | gating: requires `quint_helped: true` | hide_if_failed: true (the option's existence is contingent on the prior beat — hide if Quint didn't help) | effects: `path_office: true` | (convergent B: composed)
- "Hole up. Burn the photographs you don't need. Travel light to the office." → `office_dusk_arrive` | gating: none | effects: `path_office: true`, `frank_burned_paper: true` (small shading flag — read in Bury It late coda) | (convergent C: ruthless)
NPCs present: Brennan (radio, off-page — voice playing across the room); Mort Halloran (phone, optional); Frank (narrator)

### Scene: `dora_newsroom`
Purpose: The *Tribune-Ledger* backroom. Dora at a desk with two telephones and a notebook spiralled at the edge. She does not get up. Asks Frank two questions: is it true, can he prove it. Listens for the whole answer. Frank lays it out. The package, if mailed, is on her desk; if mailed via Mort, the address is in Mort's hand on the envelope. Either way, Dora is now the bridge.
Choices:
- "Hand her everything. Ledger, photographs, the slip with Aldwick written in carbon." → `dora_newsroom_commit` | gating: requires `found_ledger: true` AND `flags_unset: [ledger_dropped]` | hide_if_failed: true (option only exists if Frank still has the book) | effects: `dora_has_full: true` | consumable: Y
- "Tell her what you can. The photographs only." → `dora_newsroom_commit` | gating: requires `evidence >= 5` | hide_if_failed: false (grey out — "You don't have enough on you to walk in there with.") | effects: `dora_has_partial: true` | consumable: Y (only one Dora handoff per run)
- "Walk her through it from memory. Make her write it down." → `dora_newsroom_commit` | effects: `dora_has_testimony: true` (testimony alone — gates Expose only if `evidence >= 6` and `found_ledger: true`; otherwise Bury It late) | (convergent: oral)
- "Sit. Don't speak. Watch her decide." → `dora_newsroom_commit` | effects: `dora_has_silence: true` (a soft fail — Frank loses the room; Dora cannot file what Frank does not give her; Bury It late forced at Beat 5) | (convergent: paralysed — narrative wound; legible failure)
NPCs present: Dora Reyes

### Scene: `dora_newsroom_commit`
Purpose: Routing scene. Dora tells Frank where to go to ground for the next eighteen hours and which of two presses she'll print out of if hers is leaned on. The Martyr override is now disabled — Frank reached Dora in person; Salzano's men can no longer cut the package off mid-flight.
Choices:
- "Continue." → `office_dusk_arrive` | effects: `reached_dora: true` (disables the Beat 5 Martyr override) | (single-choice — pacing into the climax)
NPCs present: Dora Reyes

### Scene: `aldwick_farewell`
Purpose: Marta's kitchen. The condemnation notice on the table. Reuben in the next room (or a porch with the door standing open — by Act 2 fallout). Marta hears Frank out and tells him where Pastor Briggs went (a single line — a town two states over, a sister, the rest of the truth Frank and the player did not earn the right to hear). Frank does not eat the food Marta offers. Marta does not press.
Choices:
- "Apologise for what your visit cost them." → `office_dusk_arrive` | effects: `said_goodbye_aldwick: true`, `rep +1` (the smallest possible amount; no mechanical effect at this point but it reads in the coda) | (convergent: clean)
- "Promise her the highway will turn. Even though it won't." → `office_dusk_arrive` | effects: `said_goodbye_aldwick: true`, `frank_lied_to_marta: true` (narrative shading — read in Expose coda) | (convergent: kind lie)
- "Tell her what you're about to do tonight." → `office_dusk_arrive` | effects: `said_goodbye_aldwick: true`, `marta_briefed: true` (Expose coda shading — Marta's brother is alive a year later, named) | (convergent: full)
- "Sit at her table without saying anything for a minute. Leave." → `office_dusk_arrive` | effects: `said_goodbye_aldwick: true` | (convergent: silent)
NPCs present: Marta Gaines; Reuben Gaines (off-page in the next room; on-page only if `reuben_porch` flag prior was favourable)

### Scene: `office_dusk_arrive`
Purpose: Frank's office at dusk. The lamp on. The retainer envelope still in the drawer (or burned with the photographs). The slip with ALDWICK on it taped to the underside of the desk where Frank put it after Vera's death. Whichever of the three settings the player chose, Beat 5 fires next. The narrator notes which.
Choices:
- "Continue." → `final_choice` | effects: none | (single-choice — pacing; the climax is its own scene)
NPCs present: none on-page; Dora (if `path_dora: true`) is in the back room of the newsroom rather than the office, so this scene reframes as that newsroom backroom; Marta (if `path_aldwick: true`) is the kitchen — the engine reads the path flag to render the prose

---

## Beat 5 — The Final Choice

### Scene: `final_choice`
Purpose: The climax. Setting reads from `path_dora` / `path_aldwick` / `path_office`. The choice itself is the same in all three. Evidence-gated. Martyr override fires here if conditions are met. The narrator's voice tightens to one sentence per beat.
Choices:
- "Publish. Hand her the book." → `ending_expose` | gating: requires `found_ledger: true` AND `evidence >= 6` AND `flags_unset: [ledger_dropped]` AND NOT (`left_package: true` AND `heat >= 6` AND `flags_unset: [reached_dora]`) | hide_if_failed: false (grey out — "You don't have enough to make it stick.") | effects: `published: true` | (convergent: commit)
- "Publish anyway. Use what you have. Photographs and testimony." → `ending_expose` | gating: requires `evidence >= 6` AND (`found_ledger: true` OR `dora_has_testimony: true`) AND NOT (Martyr override conditions) | hide_if_failed: false (grey out — "Not enough.") | effects: `published: true` | (convergent: insist — same destination, the player choosing the leaner version)
- "Walk away. Burn the book in the sink." → `ending_bury_late_with_evidence` | gating: requires `found_ledger: true` | hide_if_failed: false | effects: `bury_it_late: true`, `burned_ledger: true` | (the late walk-away, knowing variant)
- "Walk away. You don't have the book anyway. Take the train." → `ending_bury_late_without_evidence` | gating: requires `found_ledger: false` OR `ledger_dropped: true` OR `evidence < 6` | hide_if_failed: false | effects: `bury_it_late: true` | (the late walk-away, ignorant variant)
- "Sit at the desk. Let them come to you." → `martyr_trigger` | gating: requires `left_package: true` AND `heat >= 6` AND `flags_unset: [reached_dora]` | hide_if_failed: true (option only surfaces on the Martyr override path; otherwise the override fires automatically without this choice) | effects: `chose_martyr: true` (player-elected Martyr — coda reads slightly differently: "He sat down. He waited. He had already done the thing.") | (the dignified variant — same ending as the override but the player chose it)
- "Pick up the phone. Call Dora and tell her what you decided." → `final_choice_phone` | gating: requires NOT (`reached_dora: true`) AND NOT (Martyr override conditions) | hide_if_failed: false (grey out — "You already saw her." / "There's no time.") | effects: `phoned_dora: true` (small shading — reads in Expose coda as the call Dora picked up at midnight) | (a soft option that loops back to the publish/walk choices with Dora named)
NPCs present: Dora (`path_dora`) OR Marta (`path_aldwick`) OR none (`path_office`); the narrator throughout

### Scene: `martyr_trigger`
Purpose: Routing scene. Salzano's men reach the climax setting before Frank can act. The narrator's voice cuts off mid-sentence. The transition into the Martyr coda is the punctuation.
Choices: [] (terminal — auto-routes via `next` to `ending_martyr`; engine handles the `choices: []` + immediate forward)
NPCs present: Salzano (off-page → on-page); Salzano's second man

### Scene: `final_choice_phone`
Purpose: Frank picks up the desk phone. Dora answers on the second ring. Asks two questions. Listens to the whole answer.
Choices:
- "Tell her you're publishing. Bring the book to her in an hour." → `ending_expose` | gating: requires `found_ledger: true` AND `evidence >= 6` | hide_if_failed: false (grey out — "Not enough.") | effects: `published: true`, `reached_dora: true` | (convergent: commit by phone)
- "Tell her you're walking. Tell her you're sorry." → `ending_bury_late_with_evidence` | gating: requires `found_ledger: true` | hide_if_failed: false | effects: `bury_it_late: true`, `told_dora_no: true` (coda shading — Dora prints something else that week and Frank sees the byline) | (convergent: walk by phone)
- "Tell her you don't have it. Tell her you're sorry." → `ending_bury_late_without_evidence` | gating: requires `found_ledger: false` OR `evidence < 6` | hide_if_failed: false | effects: `bury_it_late: true`, `told_dora_no: true` | (convergent: walk-empty by phone)
NPCs present: Dora Reyes (on phone)

---

## Beat 6 — Coda

Each ending coda is terminal. No choices, no NPC choices, no continue button — the engine handles end-of-story state. The four coda scenes are listed for completeness; Stage 5 will write each as a single block with `choices: []`.

### Scene: `ending_expose`
Purpose: The story runs Monday morning. A newsboy on the corner of Frank's block hawks the late edition. The Mayor cancels a press conference. Halston Thorne is arrested before his lawyer arrives. Frank's licence is gone by lunchtime. The shading flags read into the coda — `quint_briefed` adds a sentence about Quint's testimony; `marta_briefed` adds the year-later note about Reuben; `kellner_admitted` adds Kellner's name in the third paragraph alongside Frank's; `mort_holds_card` adds Mort's name on the witness list. The closing line: the city changes, slowly.
Choices: [] (terminal — Expose ending)
NPCs present: newsboy (ambient, narrator-rendered single line — no cast entry); Halston Thorne (named, off-page — coda is the first time his name is on screen); Frank (narrator)

### Scene: `ending_bury_late_with_evidence`
Purpose: The ledger goes into a fire in Frank's sink. He watches the page numbers char. A train ticket to Sacramento. A year later, the highway is open; Frank reads about Halston Thorne's promotion in a diner counter paper and orders another coffee. Vera's photograph in his wallet. The journal sidebar reads: "You knew. You walked." Shading flags: `frank_burned_paper` redirects the burning beat to the paper rather than the book; `mort_knows_full` names Mort in the diner-paper byline; `said_goodbye_aldwick` adds a line about Marta's letter that arrives at the Sacramento PO box.
Choices: [] (terminal — Bury It late, knowing variant)
NPCs present: Frank (narrator); diner counterman (ambient, narrator-rendered)

### Scene: `ending_bury_late_without_evidence`
Purpose: As above but the journal sidebar reads: "You didn't have it. You walked." The fire-in-the-sink scene is replaced by Frank closing the empty drawer. Same Sacramento, same paper, same coffee. The shading is thinner — Frank does not have the book to burn, only the absence of one. `said_goodbye_aldwick` and `kellner_admitted` still read.
Choices: [] (terminal — Bury It late, ignorant variant)
NPCs present: Frank (narrator); diner counterman (ambient, narrator-rendered)

### Scene: `ending_martyr`
Purpose: Frank does not survive. The narrator's voice cuts off mid-sentence. A short epilogue, voiced by **Dora Reyes** rather than the narrator, reads the lede of her own page-one column the following Monday: Halston Thorne, the Mayor, the Aldwick parcels, Ray Doss. Frank's name is in the third paragraph. Shading flags: `chose_martyr: true` opens the coda with one line of Frank's voice ("He had already done the thing.") before Dora's voice takes over; `kellner_admitted` adds Kellner's name to the column; `marta_briefed` adds Marta as named source.
Choices: [] (terminal — Martyr ending)
NPCs present: Dora Reyes (voiceover, the column read aloud); Halston Thorne (named, off-page); Salzano (off-page, the act that ended the narrator); Frank (silent — only the one line if `chose_martyr`)

### Scene: `act_3_bury_it_late`
Purpose: Off-ramp coda from `warehouse_offer_taken` when `found_ledger: false` AND the player accepts Kellner's offer. Frank drives away from the river. Same Sacramento, same diner, same coffee — but the journal sidebar reads "You walked. He let you." `accepted_offer_bury: true` adds a single sentence about the security-firm job Kellner arranged that Frank never took.
Choices: [] (terminal — Bury It late, offer-accepted variant)
NPCs present: Frank (narrator); diner counterman (ambient)

---

## Ending gate summary (final routing)

| Ending | Scene | Trigger conditions |
|---|---|---|
| Expose | `ending_expose` | (publish chosen at `final_choice` OR `final_choice_phone`) AND `found_ledger: true` (or `dora_has_testimony: true`) AND `evidence >= 6` AND NOT Martyr override |
| Bury It late (knowing) | `ending_bury_late_with_evidence` | walk chosen at `final_choice` OR `final_choice_phone` with `found_ledger: true` AND NOT Martyr override |
| Bury It late (ignorant) | `ending_bury_late_without_evidence` | walk chosen with `found_ledger: false` OR `ledger_dropped: true` OR `evidence < 6` AND NOT Martyr override |
| Bury It late (offer-accepted) | `act_3_bury_it_late` | `accepted_offer_bury: true` set in `warehouse_offer_taken` (only fires if `found_ledger: false` at offer-accept time) |
| Martyr | `ending_martyr` | (override at `final_choice`) `left_package: true` AND `heat >= 6` AND `flags_unset: [reached_dora]` (auto-fires via `martyr_trigger`); OR player-elected via the "sit at the desk" choice |
| Pavement (permadeath) | `pavement_death` | `heat >= 8` AND `rep <= 3` AND fight/run path through Beat 2 AND NOT (`confronted_kellner_past: true` AND `kellner_unsteadied: true`) — talk path with both bonuses survives |

---

## NPCs in this act

Principals (already in `cast.md`):
- **Walt Kellner** — primary NPC of Beat 2: in `drive_river_arrive`, `warehouse_doorway`, `kellner_talk_hub`, `kellner_topic_ray`, `kellner_topic_past`, `kellner_topic_offer`, `warehouse_offer_taken`, `warehouse_reveal`, `warehouse_fight`, `warehouse_talk`, `pavement_check`. Off-page after Beat 2 (named in codas only).
- **Salzano** — first appears (in Act 3) on-page in `warehouse_reveal`; presence in `warehouse_fight`, `warehouse_talk`, `warehouse_run`, `pavement_check`, `martyr_trigger`. Off-page in `river_bank_run_caught` (his second man stands in for him).
- **Officer Daniel Quint** — first appears in `quint_patrol_car` (Beat 3); referenced in `morning_room` if Quint helped (Frank wears Quint's shirt). Coda shading in `ending_expose` if `quint_briefed: true`.
- **Mort Halloran** — `mort_phone_call` (Beat 1, optional), `mort_drop_package` (Beat 1, optional, sets `left_package`), `mort_basement` (Beat 3, optional), phone presence in `morning_room`. Coda shading across Bury It late variants.
- **Marta Gaines** — `aldwick_farewell` (Beat 4, optional). Coda shading on Expose and Bury It late if `said_goodbye_aldwick` or `marta_briefed`.
- **Dora Reyes** — `dora_newsroom`, `dora_newsroom_commit` (Beat 4, optional), `final_choice_phone` (Beat 5, optional), the voiceover in `ending_martyr` (Beat 6).
- **Detective Sergeant Pat Brennan** — voice on the radio in `morning_room` (Beat 4), reading the wire copy that names Frank as "person of interest." No on-page Act 3 scene (a deliberate narrative wound — Brennan speaks but never appears).
- **Halston Thorne** — named for the first time on-page in `ending_expose` (the Monday paper). Named in Dora's voiceover in `ending_martyr`. Off-page across Beats 1–5.
- **Reuben Gaines** — possible off-page presence in `aldwick_farewell` (the next room) or absent (the porch with the door open) per Act 2 fallout. No spoken Act 3 line.
- **Pastor Lemuel Briggs** — referenced once in `aldwick_farewell` by Marta (the town two states over). No Act 3 appearance — the absence pays off the Act 2 wound.
- **Vera Doss** — referenced posthumously throughout (the photograph in Frank's wallet; the empty chair). No spoken line.
- **Cyril Voss / Edmund Tice / Mrs. Pell / Lou Mancuso / Hettie Voorhees / Detective Costa / Floor janitor / Reuben Gaines** — none reappear. Their absence reads as the act tightening to the four people who matter at the end (Kellner, Salzano, Dora, Quint or Mort).

Supporting NPCs added to `cast.md` for Act 3:
- **The radio announcer** (or Brennan voicing the bulletin himself — see the cast entry note): the radio bulletin in `morning_room` is voiced by **Brennan** directly (reusing the existing cast entry — Brennan reading wire copy on a police-cooperation segment is in keeping with his Act 1 register; no new cast entry required). The deliberate choice: have the same voice that ran Vera's death scene at the end of Act 1 read Frank's false murder at the start of Act 3. The mirror is the point.

Ambient / not casted (no spoken voice line; voiced by narrator description only):
- newsboy in `ending_expose` (single line — narrator-rendered)
- diner counterman in the Bury It late codas (single ambient line — narrator-rendered)
- ambient flophouse in `flophouse_room`
- ambient river / rail yard sounds
- sedan driver / Salzano's second man (silent across all Act 3 scenes — never speaks)

---

## Voice clash check

Within any single scene, the voices in play are distinct in register:

- Beat 1 driving / phone: Frank (narrator) + Mort (`male_elder_american_wise_approachable`). No clash — Mort is on phone only; the narrator is the cabin.
- Beat 2 doorway / hub / topics: Frank (narrator) + Kellner (`male_midlife_american_rich_smooth_rugged`). Single-voice scenes outside the narrator. No clash.
- Beat 2 reveal / fight / talk: Frank (narrator) + Kellner + Salzano (`male_midlife_british_dark_seductive_deep`). Three distinct registers — narrator's worn drawl, Kellner's smooth American warmth, Salzano's quiet British danger. No clash; the contrast is the design.
- Beat 3 patrol car: Frank + Quint (`male_young_american_forthright`). Distinct from Brennan and Kellner, who are not in scene. No clash.
- Beat 3 basement: Frank + Mort (`male_elder_american_wise_approachable`). Distinct registers (narrator's worn drawl vs. Mort's elder warmth). No clash.
- Beat 4 morning room: Frank (narrator) + Brennan on radio (`male_midlife_american_dark_tough`) + Mort on phone (`male_elder_american_wise_approachable`, conditional). Three American men but different ages and registers — Brennan's hard bark is unmistakable from Mort's elder warmth. The radio crackles distance into Brennan's voice. No clash.
- Beat 4 newsroom: Frank + Dora (`female_adult_american_crisp_direct_clear`). Distinct from every other speaker. No clash.
- Beat 4 Aldwick: Frank + Marta (`female_midlife_african-american_casual_opinionated`). Reuben (`male_adult_african-american_uneducated`) only off-page or single line. Distinct registers between Marta and Reuben (midlife casual vs. quieter adult). No clash.
- Beat 5 climax: by path — newsroom is Frank + Dora; kitchen is Frank + Marta; office is Frank alone. No multi-NPC scene. No clash.
- Beat 5 phone: Frank + Dora. No clash.
- Beat 6 codas: Expose has narrator + ambient newsboy (no spoken voice). Bury It variants have narrator only. Martyr has Frank's single line (narrator) handing off to Dora's voiceover; the handoff is the point — the silencing of one voice is the structure. No clash.

---

## Choice density audit

Counting active choices across all Act 3 scenes (excluding terminal codas, routing-only scenes, and forced single-choice transitions):

- Beat 1: `drive_out_open` 6 (counted with Mort phone, drop, lose-tail visible per path; conservative active count 4 for a typical mid-track player), `mort_phone_call` 3, `mort_drop_package` 3, `lose_tail` 3, `lose_tail_clean` 1, `lose_tail_fail` 1, `drive_river_arrive` 3 → 18 across 7 (avg 2.57)
- Beat 2: `warehouse_doorway` 3, `kellner_talk_hub` 4, `kellner_topic_ray` 3, `kellner_topic_past` 3, `kellner_topic_offer` 3, `warehouse_offer_taken` 1, `warehouse_reveal` 4, `warehouse_fight` 1, `warehouse_talk` 1, `warehouse_run` 1, `warehouse_escape` 3, `pavement_check` 1 → 28 across 12 (avg 2.33)
- Beat 3: `river_bank_run` 4, `quint_patrol_car` 3, `mort_basement` 3, `flophouse_room` 3, `river_bank_run_caught` 1 → 14 across 5 (avg 2.80)
- Beat 4: `morning_room` 5 (typical-track active count 3–5), `dora_newsroom` 4, `dora_newsroom_commit` 1, `aldwick_farewell` 4, `office_dusk_arrive` 1 → 15 across 5 (avg 3.00)
- Beat 5: `final_choice` 6 (typical-track active count 3–4), `martyr_trigger` 0, `final_choice_phone` 3 → 9 across 2 active (avg 4.50; `martyr_trigger` is terminal-routing and excluded)
- Beat 6: terminal codas — excluded.

Totals across Acts 3 active scenes (31 active scenes): **84 active choices across 31 scenes → average 2.71**, comfortably above the 2.5 floor and approaching the 3.0 target.

Single-choice scenes (justified pacing / forced transitions / outcome routing):
- `lose_tail_clean` / `lose_tail_fail` (transition — the dice already rolled)
- `warehouse_offer_taken` (committed; routing by flag)
- `warehouse_fight` / `warehouse_talk` / `warehouse_run` (forced — the player's earlier choice rolled the dice; the routing scene is the consequence, not a new decision)
- `pavement_check` (committed escalation)
- `river_bank_run_caught` (committed; stat-check routing)
- `office_dusk_arrive` (forced transition into the climax)
- `martyr_trigger` (terminal routing)

Single-choice rate: 8 of 31 ≈ 26% — at the 25% threshold; flagged. The forced-transition cluster around the warehouse fight is structural — the player's choice was made at `warehouse_reveal` and the next scenes execute the consequence — and I've judged it as deliberate. The rhythm of the act demands those scenes be terse.

---

## Act-to-act handoff preserved

Beat 1's `drive_out_open` accepts Act 2 Exits A–E without per-exit branching scenes — the variant entry shading is internal to the scene's prose (heat tail, Mort phone visibility, `frank_past_revealed` narration). This matches `act-3.md`'s entry definition.

All four ending paths terminate cleanly:
- **Expose** via `ending_expose` (terminal, `choices: []`).
- **Bury It late** via `ending_bury_late_with_evidence` / `ending_bury_late_without_evidence` / `act_3_bury_it_late` (three terminal variants).
- **Martyr** via `ending_martyr` (terminal, with a structural voice handoff from Frank to Dora — Stage 5 will render this as two text blocks, the second tagged with Dora's voice rather than the narrator's).
- **Pavement permadeath** via `pavement_death` (terminal, narrator-silent — Stage 5 will render this as a single cold third-person block).

No Act 3 exit feeds another act.
