# One Night in the Yawning Portal — Act 1 Scenes

Scene budget target: ~30. Hub-and-spoke around `common_room`. Recruitment hard cap of 2 of 4 enforced by gating the recruit choice on `recruit_count < 2` (computed via `flags_unset: [recruited_pair_locked]` plus per-recruit checks — see Beat 5 notes). All conversation/recruitment/pickup spokes return to `common_room`. Beat 7 (`well_mouth`) is the only exit and only unlocks once two `recruited_*` flags are set.

---

## Beat 1 — Arrival at the Portal

### Scene: `portal_arrival`
Purpose: Open the story. Cross the threshold, take in the room, choose where to look first. Sets the tone (earnest high-fantasy, tavern warmth, well at the centre).
Choices:
- "Take a long look around the room before moving" → `common_room` | gating: none | effects: none | consumable: N
- "Head straight to the bar" → `common_room` | (convergent — same `next`, framed as bee-line for Durnan) | effects: `flags: noticed_durnan_first` | consumable: N
- "Watch the well a moment first" → `common_room` | (convergent — framed as drawn-by-the-dark) | effects: `flags: noticed_well_first` | consumable: N
- "Listen to the loud table by the fire" → `common_room` | (convergent — framed as drawn-by-Mirt's-laugh) | effects: `flags: noticed_mirt_first` | consumable: N
NPCs present (background): Durnan (behind the bar), the Client (corner table, anxious), Mirt the Moneylender (loud, holding court), unnamed regulars.

Note on the four "first impressions": all converge to `common_room`. The flags they set are colour only — they tint Durnan's first greeting line, give Mirt a "I saw you eyeing my table" callback later, etc. No mechanical gate.

---

## Beat 2 — The Common Room (Hub)

### Hub — `common_room`
Returns from: `portal_arrival`, all Beat 3/4/5/6 spokes (job-take, every conversation topic, every pickup).
Purpose: The act's home. Available choices shift as flags accumulate.
Choices (alphabetised by intent here; in the YAML they'll be ordered by narrative priority):

**Always-visible after arrival:**
- "Approach the bar — talk to Durnan" → `talk_durnan` | gating: none | effects: none | consumable: N
- "Cross to the corner table — the anxious one" → `talk_client` | gating: `flags_unset: [client_left]` | hide_if_failed: Y (the table is empty once the client departs — handled in prose) | effects: none | consumable: N
- "Approach Korsa Ironbrow" → `talk_korsa` | gating: `flags_unset: [recruited_korsa, korsa_left, pair_locked]` | grey out if recruited (shows "Already at your back"); hide if `pair_locked` AND not recruited | effects: none | consumable: N
- "Find Sister Vesna" → `talk_vesna` | gating: same pattern as Korsa with `vesna_*` flags | as above | consumable: N
- "Look for Pip Tallowmuch" → `talk_pip` | gating: same pattern with `pip_*` flags | as above | consumable: N
- "Find Thessaly Vex" → `talk_thessaly` | gating: same pattern with `thessaly_*` flags | as above | consumable: N

**Conditionally visible:**
- "Wave Mirt over" → `talk_mirt` | gating: `requires: { stats: { Renown: 1 } }` AND `flags_unset: [mirt_walked_off]` | grey out (player can see Mirt is busy) until Renown ≥ 1 | effects: none | consumable: N
- "Slip out to the apprentice's room at the inn down the street" → `loot_apprentice_room` | gating: `requires: { flags: [job_taken] }` AND `flags_unset: [looted_room, room_skipped]` | grey out before `job_taken`; vanishes after either flag | effects: none | consumable: N
- "Pickpocket Pip — the caltrops in her belt-pouch" → `steal_caltrops` | gating: `requires: { flags: [job_taken] }` AND `flags_unset: [stole_caltrops, caltrops_skipped]` | hide_if_failed: Y (existence of the option is itself a tell) | effects: none | consumable: N
- "Settle your tab at the bar early" → `pay_tab_early` | gating: `requires: { stats: { Coin: 2 } }` AND `flags_unset: [paid_tab_early]` | grey out if low Coin | effects: none | consumable: Y (in `pay_tab_early`)
- "Step out to the well-mouth" → `well_mouth` | gating: `requires: { flags: [job_taken] }` (always available after that — the lock check happens at `well_mouth`) | effects: none | consumable: N

NPCs present: Durnan (always), the Client (until `client_left`), Mirt (always but only addressable at Renown 1+), Korsa / Vesna / Pip / Thessaly (each visible from arrival, each may interject if recruited and the player talks to another candidate).

Note on `pair_locked`: this flag is auto-set inside any recruitment-acceptance scene the moment a *second* `recruited_*` flag is true. From that point, the unrecruited candidates' `talk_*` options vanish (they politely decline / aren't there next visit, handled in prose). This is the technical enforcement of the "exactly 2 of 4" hard requirement.

---

## Beat 3 — Taking the Job

### Conversation — `talk_client`
Purpose: Pitch the job and source most lead flags. Gates Beat 2's hub changes (client departs) and seeds Act 2 spokes.
Topics:
- "Hear the offer" → `client_offer_heard` | gating: `flags_unset: [heard_offer]` | effects: `flags: heard_offer` | consumable: Y
- "Ask: who's the missing one?" → `client_topic_apprentice` | gating: `flags_unset: [asked_about_apprentice]` | effects: `flags: asked_about_apprentice` | consumable: Y
- "Ask: what was the dare?" → `client_topic_dare` | gating: `flags_unset: [asked_about_dare]` | effects: `flags: asked_about_dare` | consumable: Y
- "Ask: was anyone with them at the harbour?" → `client_topic_harbour` | gating: `flags_unset: [heard_about_harbour]` | effects: `flags: heard_about_harbour` (also Act 2 lead seed) | consumable: Y
- "Ask: anyone see them after they left?" → `client_topic_alley` | gating: `flags_unset: [heard_about_alley_witness]` | effects: `flags: heard_about_alley_witness` (Act 2 lead seed) | consumable: Y
- "Ask: what does the family pay?" → `client_topic_pay` | gating: `flags_unset: [asked_about_pay]` | effects: `flags: asked_about_pay` | consumable: Y
- **Take the job (decision sub-hub)** → `take_job_decide` | gating: `requires: { flags: [heard_offer] }` AND `flags_unset: [job_taken]` | grey out until offer heard ("[Hear them out first]") | effects: none yet | consumable: N (the sub-scene handles consumability)
Walk-away: "Tell them you'll think on it" → `common_room` | always available | effects: none.

NPCs present: the Client.

### Scene: `client_offer_heard`
Purpose: Pitch text — the apprentice, two days, the well, the modest fee.
Choices:
- "Back to the table" → `talk_client` | effects: `flags: heard_offer` | consumable: Y (the topic itself).

### Scene: `client_topic_apprentice`
Purpose: Apprentice's name, age, what they were like. Quiet, sad.
Choices: "Back to the table" → `talk_client` | effects: `flags: asked_about_apprentice` | consumable: Y.

### Scene: `client_topic_dare`
Purpose: The dare — who said what at which table, the bet that pushed them down the well.
Choices: "Back to the table" → `talk_client` | effects: `flags: asked_about_dare` | consumable: Y.

### Scene: `client_topic_harbour`
Purpose: Apprentice was last seen near the docks the morning before the descent. Pre-seeds Act 2 harbour spoke.
Choices: "Back to the table" → `talk_client` | effects: `flags: heard_about_harbour` | consumable: Y.

### Scene: `client_topic_alley`
Purpose: A witness — a Trades Ward beggar — saw something and bolted. Pre-seeds Act 2 alley spoke.
Choices: "Back to the table" → `talk_client` | effects: `flags: heard_about_alley_witness` | consumable: Y.

### Scene: `client_topic_pay`
Purpose: The family will pay 20 Coin on safe return; 8 Coin for proof of fate.
Choices: "Back to the table" → `talk_client` | effects: `flags: asked_about_pay` | consumable: Y.

### Scene: `take_job_decide`
Purpose: Three approaches, all converge to `job_taken`. The fork that sets the early read on the city.
Choices:
- "Accept the offered fee" → `job_accepted` | gating: none | effects: `flags: job_taken, client_left, took_job_straight`; `stats: Coin +2` (advance) | consumable: Y (whole sub-hub vanishes)
- "Haggle them up" → weighted: `haggle_success` (Wits 6+) / `haggle_fail` (Wits < 6) — handled inside the next scene as a gate, not a true random | gating: `requires: { stats: { Wits: 5 } }` (grey out below — "[Wits 5 required]") AND `flags_unset: [tried_haggle]` | effects: `flags: tried_haggle` (set immediately so the option vanishes after attempt) | consumable: Y
- "Tell them you'll do it for free — for the missing one" → `job_accepted_free` | gating: `flags_unset: [tried_free]` | effects: `flags: tried_free` (consumable mark) | consumable: Y
- "Walk away — you're not interested" → `client_walked` | gating: none | effects: `flags: client_left, walked_on_job` | consumable: Y (and closes off the whole job — see note below)
NPCs present: the Client.

Note on "walk away from the job entirely": this is a soft-fail path — the act becomes much shorter (the player can still gather rumour but can't recruit and can't descend). For Act 1 budget purposes treat it as a dead-branch ending sketch (one short scene at `walked_on_job_ending`) rather than a full path. Stage 2 doesn't budget for it; flag it for Stage 5 to write a single bittersweet "you finished your drink and left" scene that fires Ending 4 directly.

### Scene: `job_accepted`
Purpose: Modest fee shake — purse pressed into hand, two coins as advance. The client thanks you, says they'll be at the bar tomorrow night.
Choices:
- "Back to the room" → `common_room` | effects: `flags: job_taken, client_left`; `stats: Coin +2` | consumable: N (already gated above).
NPCs present: the Client.

### Scene: `haggle_success`
Purpose: Wits 6+ play — you read the desperation, push the price, the client agrees with relief that someone is taking it seriously enough to bargain.
Choices:
- "Back to the room" → `common_room` | effects: `flags: job_taken, client_left, haggled_up`; `stats: Coin +4, Renown -1` (modest Renown loss — Durnan and the regulars notice you bargained the desperate) | consumable: N.
NPCs present: the Client.

### Scene: `haggle_fail`
Purpose: Wits < 6 play (auto-routed via the gate above — included for completeness if the gate were softened). The client recoils, the room notices, you take the original fee with the room's quiet judgement.
Choices:
- "Back to the room" → `common_room` | effects: `flags: job_taken, client_left, haggle_failed`; `stats: Coin +2, Renown -2` | consumable: N.

### Scene: `job_accepted_free`
Purpose: Refuse the purse. If Durnan's eyes are on you (he's at the bar — this is always true in Act 1), set `durnan_respects_you`.
Choices:
- "Back to the room" → `common_room` | effects: `flags: job_taken, client_left, took_job_free, durnan_respects_you`; `stats: Renown +2` | consumable: N.
NPCs present: the Client; Durnan (witness).

### Scene: `client_walked`
Purpose: The walked-on-the-job branch capper. Short, bitter. → `walked_on_job_ending` (terminal — see note above).
Choices:
- "Finish your drink and head out" → `walked_on_job_ending` | effects: none | consumable: N.

---

## Beat 4 — Rumour & Lore

### Conversation — `talk_durnan`
Purpose: Lore + slow build of `durnan_respects_you`. Recurring across the act.
Topics:
- "Ask about the well" → `durnan_topic_well` | gating: `flags_unset: [asked_durnan_well]` | effects: `flags: asked_durnan_well` | consumable: Y
- "Ask about the apprentice" → `durnan_topic_apprentice` | gating: `flags_unset: [asked_durnan_apprentice]` AND `requires: { flags: [job_taken] }` | grey out before `job_taken` ("[Take the job first]") | effects: `flags: asked_durnan_apprentice` | consumable: Y
- "Ask about the regulars" → `durnan_topic_regulars` | gating: `flags_unset: [asked_durnan_regulars]` | effects: `flags: asked_durnan_regulars` | consumable: Y
- "Ask about your tab" → `durnan_topic_tab` | gating: `flags_unset: [asked_durnan_tab]` | effects: `flags: asked_durnan_tab` | consumable: Y
- "Ask for advice" → `durnan_topic_advice` | gating: `flags_unset: [asked_durnan_advice]` | effects: `flags: asked_durnan_advice` | consumable: Y
Walk-away: "Step away from the bar" → `common_room` | always available.

NPCs present: Durnan.

### Scene: `durnan_topic_well`
Purpose: The well's reputation, who goes down, who comes back. Durnan's flat refusal to descend for any client.
Choices: "Back to the bar" → `talk_durnan` | effects: `flags: asked_durnan_well` | consumable: Y.

### Scene: `durnan_topic_apprentice`
Purpose: Durnan saw them go down, didn't stop them — won't stop fools, says so. Quiet weight.
Choices: "Back to the bar" → `talk_durnan` | effects: `flags: asked_durnan_apprentice` | consumable: Y.

### Scene: `durnan_topic_regulars`
Purpose: Quick read on Mirt, the four candidates, and the room — Durnan's measured opinions.
Choices: "Back to the bar" → `talk_durnan` | effects: `flags: asked_durnan_regulars` | consumable: Y.

### Scene: `durnan_topic_tab`
Purpose: Durnan tells you the tab to date (small — you've been here an hour). Sets up the `pay_tab_early` pickup.
Choices: "Back to the bar" → `talk_durnan` | effects: `flags: asked_durnan_tab` | consumable: Y.

### Scene: `durnan_topic_advice`
Purpose: One line of advice — pick your two carefully, don't drink before the climb.
Choices: "Back to the bar" → `talk_durnan` | effects: `flags: asked_durnan_advice` | consumable: Y.

### Conversation — `talk_mirt`
Purpose: Gossip + Renown-gated post-job offer + bad-terms loan. Sets `mirt_owes_favour` (HUD-visible) on the loan path.
Topics:
- "Hear the city gossip" → `mirt_topic_gossip` | gating: `flags_unset: [asked_mirt_gossip]` | effects: `flags: asked_mirt_gossip` | consumable: Y
- "Listen to the offer of work" → `mirt_topic_offer` | gating: `flags_unset: [asked_mirt_offer]` AND `requires: { flags: [job_taken] }` | grey out before `job_taken` | effects: `flags: asked_mirt_offer, mirt_offer_open` (the "open" flag carries to Act 3) | consumable: Y
- "Take the loan — bad terms or not" → `mirt_loan_take` | gating: `flags_unset: [mirt_owes_favour, mirt_loan_refused]` | hide_if_failed: N (the loan is offered openly inside `mirt_topic_gossip` — once topic is heard, the choice surfaces here) — actually, gate this on `flags: [asked_mirt_gossip]` so the loan only appears once gossip is heard | effects: handled in scene | consumable: Y
- "Refuse the loan, politely" → `mirt_loan_refuse` | gating: same as above (`flags: [asked_mirt_gossip]`, `flags_unset: [mirt_owes_favour, mirt_loan_refused]`) | effects: `flags: mirt_loan_refused` | consumable: Y
Walk-away: "Step back from Mirt's table" → `common_room` | always available.

NPCs present: Mirt the Moneylender, his hangers-on (background colour).

### Scene: `mirt_topic_gossip`
Purpose: Three pieces of city colour — the harbourmaster, the Watch sergeant, a temple feud. Drops a hint about Mirt's loan terms.
Choices: "Back to Mirt" → `talk_mirt` | effects: `flags: asked_mirt_gossip` | consumable: Y.

### Scene: `mirt_topic_offer`
Purpose: Mirt offers post-job work in the city — vague, paternal, sincere. Sets `mirt_offer_open` (carries to Act 3 → Ending 5 path).
Choices: "Back to Mirt" → `talk_mirt` | effects: `flags: asked_mirt_offer, mirt_offer_open` | consumable: Y.

### Scene: `mirt_loan_take`
Purpose: Mirt counts out 8 Coin into your hand, names the favour he'll call. Sets `mirt_owes_favour` (inverted naming — the player owes Mirt; HUD-visible as "Mirt's Favour").
Choices: "Pocket the coin and back away" → `talk_mirt` | effects: `flags: mirt_owes_favour`; `stats: Coin +8` | consumable: Y.

### Scene: `mirt_loan_refuse`
Purpose: Politely decline. Mirt grins, respects the spine, you gain a touch of Renown for refusing easy money.
Choices: "Back to Mirt" → `talk_mirt` | effects: `flags: mirt_loan_refused`; `stats: Renown +1` | consumable: Y.

---

## Beat 5 — Recruitment

Each candidate is a small conversation hub. Recruit choice is gated on (a) hearing the candidate's **key topic** and (b) the player not yet being `pair_locked`. Once the player has 2 `recruited_*` flags, `pair_locked` is set inside the second recruit scene, and all unrecruited candidates' hub options vanish from `common_room`.

### Conversation — `talk_korsa`
Purpose: Korsa Ironbrow recruitment hub. Frontline tank.
Topics:
- "Buy him a drink, hear his last job" → `korsa_topic_lastjob` | gating: `flags_unset: [asked_korsa_lastjob]` | effects: `flags: asked_korsa_lastjob` | consumable: Y
- "Ask about the well" *(key topic)* → `korsa_topic_well` | gating: `flags_unset: [asked_korsa_well]` | effects: `flags: asked_korsa_well` | consumable: Y
- "Ask his price" → `korsa_topic_price` | gating: `flags_unset: [asked_korsa_price]` | effects: `flags: asked_korsa_price` | consumable: Y
- "Ask why he isn't scared" → `korsa_topic_fear` | gating: `flags_unset: [asked_korsa_fear]` | effects: `flags: asked_korsa_fear` | consumable: Y
- **"Recruit him"** → `recruit_korsa` | gating: `requires: { flags: [asked_korsa_well] }` AND `flags_unset: [recruited_korsa, korsa_left, pair_locked]`; `requires: { stats: { Coin: 3 } }` (his price is 3 Coin advance) | grey out with reason ("[Hear about the well first]" / "[3 Coin required]" / "[Already at full party]") | effects: handled in scene | consumable: Y
Walk-away: "Step away" → `common_room` | always available.

NPCs present: Korsa Ironbrow. If Vesna recruited, she may interject from her bench. If Pip or Thessaly recruited, brief background nods only.

### Scene: `korsa_topic_lastjob`
Purpose: A caravan job south, a bandit fight, the line about "if it bleeds I can drop it". Easy character beat.
Choices: "Back to Korsa" → `talk_korsa` | effects: `flags: asked_korsa_lastjob` | consumable: Y.

### Scene: `korsa_topic_well`
Purpose: Key topic. He says he's never been down, doesn't care, the dark is dark whether it's a mine or a hole in a tavern floor. Unlocks his recruit choice.
Choices: "Back to Korsa" → `talk_korsa` | effects: `flags: asked_korsa_well` | consumable: Y.

### Scene: `korsa_topic_price`
Purpose: 3 Coin advance, half the recovered loot, a drink after.
Choices: "Back to Korsa" → `talk_korsa` | effects: `flags: asked_korsa_price` | consumable: Y.

### Scene: `korsa_topic_fear`
Purpose: His brother died in a tunnel collapse. He's been making peace with the dark since. Quiet beat.
Choices: "Back to Korsa" → `talk_korsa` | effects: `flags: asked_korsa_fear` | consumable: Y.

### Scene: `recruit_korsa`
Purpose: Handshake — axe-haft to palm, the Common Room sees it. Pair-lock check fires here.
Choices:
- "Back to the room" → `common_room` | effects: `flags: recruited_korsa`; conditionally `flags: pair_locked` (set if any other `recruited_*` is true at this point); `stats: Coin -3` | consumable: Y (the recruit choice).

### Conversation — `talk_vesna`
Purpose: Sister Vesna recruitment hub. Healer / divine support. Asking-price is a promise, not coin.
Topics:
- "Ask about Tymora" → `vesna_topic_tymora` | gating: `flags_unset: [asked_vesna_tymora]` | effects: `flags: asked_vesna_tymora` | consumable: Y
- "Ask if she knew the apprentice" → `vesna_topic_apprentice` | gating: `flags_unset: [asked_vesna_apprentice]` AND `requires: { flags: [job_taken] }` | grey out before `job_taken` | effects: `flags: asked_vesna_apprentice` | consumable: Y
- "Ask what she sees in the descent" *(key topic)* → `vesna_topic_descent` | gating: `flags_unset: [asked_vesna_descent]` | effects: `flags: asked_vesna_descent` | consumable: Y
- "Ask her price" → `vesna_topic_price` | gating: `flags_unset: [asked_vesna_price]` | effects: `flags: asked_vesna_price` | consumable: Y
- **"Promise her what she asks — recruit her"** → `recruit_vesna` | gating: `requires: { flags: [asked_vesna_descent, asked_vesna_price] }` AND `flags_unset: [recruited_vesna, vesna_left, pair_locked]` | grey out with reason | effects: handled in scene | consumable: Y
Walk-away: "Step away" → `common_room` | always available.

NPCs present: Sister Vesna. If Korsa recruited, he may grunt approval from his table.

### Scene: `vesna_topic_tymora`
Purpose: Lady Luck, the coin she carries, what fortune means in a hole in the ground.
Choices: "Back to Vesna" → `talk_vesna` | effects: `flags: asked_vesna_tymora` | consumable: Y.

### Scene: `vesna_topic_apprentice`
Purpose: She passed them at the well-mouth two nights back, blessed them out of habit. She wishes she'd said more.
Choices: "Back to Vesna" → `talk_vesna` | effects: `flags: asked_vesna_apprentice` | consumable: Y.

### Scene: `vesna_topic_descent`
Purpose: Key topic. The descent as a test of fortune — she'll go because Tymora favours those who go. Unlocks recruit (with price topic).
Choices: "Back to Vesna" → `talk_vesna` | effects: `flags: asked_vesna_descent` | consumable: Y.

### Scene: `vesna_topic_price`
Purpose: She names her price — that you bury anyone you can't bring out. Quiet, weighty.
Choices: "Back to Vesna" → `talk_vesna` | effects: `flags: asked_vesna_price` | consumable: Y.

### Scene: `recruit_vesna`
Purpose: She takes your hand, marks the back of it with a coin's edge. Pair-lock check fires here.
Choices:
- "Back to the room" → `common_room` | effects: `flags: recruited_vesna, promised_vesna_burial`; conditionally `flags: pair_locked` | consumable: Y.

### Conversation — `talk_pip`
Purpose: Pip Tallowmuch recruitment hub. Scout / rogue. Flat-rate hire.
Topics:
- "Ask about Undermountain rumours" → `pip_topic_rumours` | gating: `flags_unset: [asked_pip_rumours]` | effects: `flags: asked_pip_rumours` | consumable: Y
- "Ask her rate" *(key topic — and the gate)* → `pip_topic_rate` | gating: `flags_unset: [asked_pip_rate]` | effects: `flags: asked_pip_rate` | consumable: Y
- "Ask who else has hired her" → `pip_topic_history` | gating: `flags_unset: [asked_pip_history]` | effects: `flags: asked_pip_history` | consumable: Y
- "Ask what she steals" → `pip_topic_steals` | gating: `flags_unset: [asked_pip_steals]` | effects: `flags: asked_pip_steals` | consumable: Y
- **"Pay her rate (5 Coin) — recruit her"** → `recruit_pip` | gating: `requires: { flags: [asked_pip_rate], stats: { Coin: 5 } }` AND `flags_unset: [recruited_pip, pip_left, pair_locked]` | grey out with reason ("[Hear her rate first]" / "[5 Coin required]") | effects: handled in scene | consumable: Y
Walk-away: "Step away" → `common_room` | always available.

NPCs present: Pip Tallowmuch. If `stole_caltrops` is set AND Pip is being recruited here, an interjection: she squints — does she know? (Set `pip_suspects` flag, surfaces in Act 2.)

### Scene: `pip_topic_rumours`
Purpose: Three rumours — a giant rat-king, a flooded chamber, a door no one's opened. Useful flavour for the deep.
Choices: "Back to Pip" → `talk_pip` | effects: `flags: asked_pip_rumours` | consumable: Y.

### Scene: `pip_topic_rate`
Purpose: 5 Coin flat, paid up-front, no refunds. Unlocks recruit.
Choices: "Back to Pip" → `talk_pip` | effects: `flags: asked_pip_rate` | consumable: Y.

### Scene: `pip_topic_history`
Purpose: Two names — a merchant, a Watch officer. Both still alive. Reassuring.
Choices: "Back to Pip" → `talk_pip` | effects: `flags: asked_pip_history` | consumable: Y.

### Scene: `pip_topic_steals`
Purpose: She grins. "Whatever isn't nailed down. The nails too, sometimes."
Choices: "Back to Pip" → `talk_pip` | effects: `flags: asked_pip_steals` | consumable: Y.

### Scene: `recruit_pip`
Purpose: Coin into pouch, deal sealed with a knuckle-bump.
Choices:
- "Back to the room" → `common_room` | effects: `flags: recruited_pip`; conditionally `flags: pair_locked`; `stats: Coin -5` | consumable: Y.

### Conversation — `talk_thessaly`
Purpose: Thessaly Vex recruitment hub. Sorceress with quiet reasons of her own.
Topics:
- "Compare arcane registers — your prepared spells vs. her wild" → `thessaly_topic_arcane` | gating: `flags_unset: [asked_thessaly_arcane]` | effects: `flags: asked_thessaly_arcane` | consumable: Y
- "Ask what's down there" *(key topic)* → `thessaly_topic_below` | gating: `flags_unset: [asked_thessaly_below]` | effects: `flags: asked_thessaly_below, thessaly_hint_truth` (small lore drop — she suspects more than she says) | consumable: Y
- "Ask her terms" → `thessaly_topic_terms` | gating: `flags_unset: [asked_thessaly_terms]` | effects: `flags: asked_thessaly_terms` | consumable: Y
- "Press her — why this job?" → `thessaly_topic_why` | gating: `requires: { stats: { Wits: 6 }, flags: [asked_thessaly_below] }` AND `flags_unset: [asked_thessaly_why]` | grey out with reason ("[Wits 6 required]" / "[Hear her out first]") | effects: `flags: asked_thessaly_why, knows_thessaly_motive` | consumable: Y
- **"Accept her terms — recruit her"** → `recruit_thessaly` | gating: `requires: { flags: [asked_thessaly_below, asked_thessaly_terms] }` AND `flags_unset: [recruited_thessaly, thessaly_left, pair_locked]` | grey out with reason | effects: handled in scene | consumable: Y
Walk-away: "Step away" → `common_room` | always available.

NPCs present: Thessaly Vex.

### Scene: `thessaly_topic_arcane`
Purpose: Brief technical talk — she's wild, you're prepared, the contrast amuses her.
Choices: "Back to Thessaly" → `talk_thessaly` | effects: `flags: asked_thessaly_arcane` | consumable: Y.

### Scene: `thessaly_topic_below`
Purpose: Key topic. She talks about the deep with a steadiness that is itself a tell. Sets a quiet flag (`thessaly_hint_truth`) that surfaces later if the player is paying attention.
Choices: "Back to Thessaly" → `talk_thessaly` | effects: `flags: asked_thessaly_below, thessaly_hint_truth` | consumable: Y.

### Scene: `thessaly_topic_terms`
Purpose: Her terms — equal share, no questions if she vanishes for an hour, you don't ask whose name she whispers.
Choices: "Back to Thessaly" → `talk_thessaly` | effects: `flags: asked_thessaly_terms` | consumable: Y.

### Scene: `thessaly_topic_why`
Purpose: Wits-gated. She tells you — half-tells you — about a name she's chasing. Sets `knows_thessaly_motive` (carries to Act 2 dialogue).
Choices: "Back to Thessaly" → `talk_thessaly` | effects: `flags: asked_thessaly_why, knows_thessaly_motive` | consumable: Y.

### Scene: `recruit_thessaly`
Purpose: She nods once, and the candle on the table dips. Pair-lock check fires here.
Choices:
- "Back to the room" → `common_room` | effects: `flags: recruited_thessaly`; conditionally `flags: pair_locked` | consumable: Y.

---

## Beat 6 — Side Pickups

### Scene: `loot_apprentice_room`
Purpose: A short detour to the inn down the street. Weighted random — the room may be empty (someone got there first), have the journal, or have an unwelcome visitor.
Choices:
- "Search the room properly" → weighted: `loot_room_journal` (4) / `loot_room_empty` (2) / `loot_room_visitor` (1) | gating: none (within this scene) | effects: `flags: looted_room` (set on entering the search; the choice itself vanishes from the hub via `looted_room` + `room_skipped` checks) | consumable: Y (whole scene branch)
- "Decide it isn't worth the time, head back" → `common_room` | gating: none | effects: `flags: room_skipped` | consumable: Y (alternate consumable — same hub option vanishes)
NPCs present: none initially.

Note: both branches set a flag that closes the `common_room` "slip out to the inn" option. Either you searched (and got a result) or you skipped — the option doesn't reoffer.

### Scene: `loot_room_journal`
Purpose: The apprentice's journal — half-finished sentences about something they "saw twice" in the upper levels. HUD-visible.
Choices:
- "Pocket the journal and head back" → `common_room` | effects: `flags: found_journal`; `stats: Renown +0` | consumable: N (the parent gate `looted_room` already prevents re-entry).

### Scene: `loot_room_empty`
Purpose: Stripped clean — someone beat you here. Brief, cold.
Choices:
- "Back to the Portal" → `common_room` | effects: none | consumable: N.

### Scene: `loot_room_visitor`
Purpose: A figure rifling through the room — turns, runs. You give chase or let them go.
Choices:
- "Chase" → `loot_room_chase` | gating: `requires: { stats: { Vigor: 6 } }` | grey out below ("[Vigor 6 required]") | effects: handled in scene | consumable: N
- "Let them go and search what's left" → `loot_room_chase_skip` | gating: none | effects: handled in scene | consumable: N
NPCs present: an unnamed thief (tagged for Stage 4 as a possible Act 2 callback if the chase succeeds).

### Scene: `loot_room_chase`
Purpose: Brief chase down the back stairs. Catch them, take a torn page (sets `found_journal_partial`, treated as `found_journal` for HUD/gate purposes, but flags the partial nature in prose). Vigor cost.
Choices:
- "Back to the Portal" → `common_room` | effects: `flags: found_journal, found_journal_partial, saw_thief`; `stats: Vigor -1` | consumable: N.

### Scene: `loot_room_chase_skip`
Purpose: Search the wreckage — find one scrap. No mechanical reward, small lore beat (a name on a torn corner — the apprentice's contact at the harbour).
Choices:
- "Back to the Portal" → `common_room` | effects: `flags: found_apprentice_contact_name` (Act 2 colour flag) | consumable: N.

### Scene: `steal_caltrops`
Purpose: Pickpocket Pip's belt-pouch — caltrops, a useful Act 2 prop. Two outcomes based on whether Pip is recruited.
Choices:
- "Slip in close, palm the pouch" → weighted: `steal_caltrops_clean` (3) / `steal_caltrops_caught` (1) | gating: none | effects: `flags: tried_caltrops` (consumable mark — the hub option vanishes regardless of outcome) | consumable: Y
- "Think better of it, walk away" → `common_room` | gating: none | effects: `flags: caltrops_skipped` | consumable: Y (alternate consumable mark)
NPCs present: Pip (background, may or may not notice).

### Scene: `steal_caltrops_clean`
Purpose: Got it clean. If Pip is recruited, a small Renown loss with her later (`pip_suspects` set for Act 2 colour); if not, free Coin gain.
Choices:
- "Back to the room" → `common_room` | effects: `flags: stole_caltrops, has_caltrops`; if `recruited_pip` then `flags: pip_suspects`; else `stats: Coin +2` | consumable: N (already gated).

### Scene: `steal_caltrops_caught`
Purpose: Pip clocks you. If recruited, she narrows her eyes and you cost yourself a chunk of Renown with her (`pip_angry`); if not, she refuses to hire on with you and her recruit option vanishes.
Choices:
- "Stammer an apology and back away" → `common_room` | effects: if `recruited_pip` then `flags: stole_caltrops, pip_angry`; `stats: Renown -1` | else `flags: stole_caltrops, pip_left` (closes Pip's recruit path entirely) | consumable: N.

### Scene: `pay_tab_early`
Purpose: One-shot. Costs 2 Coin, gains a small Renown bump and `durnan_respects_you` (if not already set).
Choices:
- "Drop the coin on the bar" → `common_room` | gating: `requires: { stats: { Coin: 2 } }`, `flags_unset: [paid_tab_early]` | effects: `flags: paid_tab_early, durnan_respects_you`; `stats: Coin -2, Renown +1` | consumable: Y (`paid_tab_early`).
NPCs present: Durnan.

---

## Beat 7 — Committing to Descend

### Scene: `well_mouth`
Purpose: The threshold. The chosen pair beside you. Last chance to turn around.
Choices:
- "Step over the lip — descend" → `act2_entry` | gating: `requires: { flags: [job_taken] }` AND `requires_count: { recruited_korsa, recruited_vesna, recruited_pip, recruited_thessaly: at least 2 }` (engine handles via the `pair_locked` flag — if `pair_locked` is true the descent commits cleanly) | grey out with reason ("[Recruit two companions first]") | effects: `flags: descended_well`; `stats: Vigor -0` (no cost yet — the descent itself is in Act 2) | consumable: Y (single-use — Act 2 entry)
- "Back to the Common Room — one more thing" → `common_room` | gating: none | effects: none | consumable: N
- "A quiet word with [companion A]" → `well_mouth_word_A` | gating: per recruited companion (4 conditional variants — only the recruited two appear) | hide_if_failed: Y (only show the two who are actually present) | effects: `flags: spoke_to_X_at_well` (per companion — Act 2 colour) | consumable: Y per companion
- "A quiet word with [companion B]" → `well_mouth_word_B` | as above | as above | as above
- "Listen for Durnan's word at your back" → `well_mouth_durnan_word` | gating: `requires: { flags: [durnan_respects_you] }` AND `flags_unset: [heard_durnan_word]` | hide_if_failed: Y | effects: `flags: heard_durnan_word` (small Act 3 callback) | consumable: Y

NPCs present: the two recruited companions; Durnan (background, audible on the gated word option).

### Scene: `well_mouth_word_A` / `well_mouth_word_B`
Purpose: Single short character beat with the named companion before the drop — Vesna prays, Korsa cracks knuckles, Pip checks gear, Thessaly murmurs. Stage 5 will write four short variants (one per candidate).
Choices:
- "Back to the well-mouth" → `well_mouth` | effects: `flags: spoke_to_X_at_well` | consumable: Y.

### Scene: `well_mouth_durnan_word`
Purpose: Durnan calls something low across the room — one line, weighty. Sets `heard_durnan_word`.
Choices:
- "Nod, and turn back to the well" → `well_mouth` | effects: `flags: heard_durnan_word` | consumable: Y.

### Scene: `act2_entry`
Purpose: The act exit handoff — placeholder scene reference for Stage 5. Carries all flags as listed in `act-1.md` Exits.
Choices: defined in `act-2-scenes.md` (when Stage 3 runs for Act 2).

### Scene: `walked_on_job_ending`
Purpose: Dead-branch terminal — the player walked on the job. Stage 5 writes one short bittersweet scene that fires Ending 4 directly. Not part of normal Act 2 entry.
Choices: `[]` (terminal — engine recognises empty choices as ending).

---

## NPCs in this act

- **Durnan the Wanderer** — the barkeep. First appears in `portal_arrival`, recurs in `talk_durnan` (and all its sub-scenes), witnesses `job_accepted_free`, present in `pay_tab_early`, callable from `well_mouth_durnan_word`. Background presence in `common_room` throughout.
- **The Client** (an anxious craftsman/scholar — Stage 4 to name and detail) — corner-table figure. First appears in `portal_arrival`, central in `talk_client` and all its sub-scenes (`client_offer_heard`, `client_topic_apprentice`, `client_topic_dare`, `client_topic_harbour`, `client_topic_alley`, `client_topic_pay`, `take_job_decide`, `job_accepted`, `haggle_success`, `haggle_fail`, `job_accepted_free`, `client_walked`). Departs the tavern after `job_taken` (`client_left` flag closes the option).
- **Mirt the Moneylender** — established Waterdeep figure; loud table by the fire. First appears as background in `portal_arrival`, recurs in `talk_mirt` and its sub-scenes (`mirt_topic_gossip`, `mirt_topic_offer`, `mirt_loan_take`, `mirt_loan_refuse`). Hangers-on at his table are unnamed background.
- **Korsa Ironbrow** — dwarf sellsword, recruitment candidate. First addressable in `talk_korsa`; sub-scenes `korsa_topic_lastjob`, `korsa_topic_well`, `korsa_topic_price`, `korsa_topic_fear`, `recruit_korsa`. Appears in `well_mouth` if recruited; possible interjections in other recruitment scenes once recruited.
- **Sister Vesna** — half-elf priestess of Tymora, recruitment candidate. First addressable in `talk_vesna`; sub-scenes `vesna_topic_tymora`, `vesna_topic_apprentice`, `vesna_topic_descent`, `vesna_topic_price`, `recruit_vesna`. Appears in `well_mouth` if recruited; possible interjections elsewhere once recruited.
- **Pip Tallowmuch** — halfling rogue/scout, recruitment candidate. First addressable in `talk_pip`; sub-scenes `pip_topic_rumours`, `pip_topic_rate`, `pip_topic_history`, `pip_topic_steals`, `recruit_pip`. Background presence in `steal_caltrops` and its outcomes. Appears in `well_mouth` if recruited.
- **Thessaly Vex** — tiefling sorceress, recruitment candidate. First addressable in `talk_thessaly`; sub-scenes `thessaly_topic_arcane`, `thessaly_topic_below`, `thessaly_topic_terms`, `thessaly_topic_why`, `recruit_thessaly`. Appears in `well_mouth` if recruited.
- **Unnamed thief** — appears only in `loot_room_visitor` and `loot_room_chase`. Stage 4 should mark as a possible Act 2 / Act 3 callback NPC (a recurring face the player might recognise) if the chase succeeded.
- **The missing apprentice** — *not* present in Act 1, but heavily referenced. Stage 4 should give them a name, age, and trade so Acts 2/3 prose has consistent ground. Their journal (if found) is where their voice surfaces.

---

## Notes for Stage 4 (cast) and Stage 5 (scene writing)

- **Pair-lock enforcement:** the `pair_locked` flag is the sole gate that shuts down recruitment after two `recruited_*` flags are set. Stage 5 must set `pair_locked` inside *every* recruit-acceptance scene's `effects` (alongside the `recruited_X` flag), guarded by an `if`-style condition (or accept that the engine just sets it harmlessly each time once already true). Document this clearly in each recruit scene's effects.
- **Consumable side pickups:** every Beat 6 scene uses a paired flag pattern (`looted_room` / `room_skipped`, `tried_caltrops` / `caltrops_skipped`, `paid_tab_early`) so the hub option vanishes whether the player took it or declined the in-scene action. This avoids re-offering trips the player already considered and waved off.
- **Dead-branch ending (`walked_on_job_ending`):** Stage 5 writes a single 1-scene Ending 4 variant for this path — short, sad, no companions, no descent. Not budgeted into the main Act 2/3 flow.
- **Companion interjection lines:** Beat 5 recruitment scenes can include short conditional interjections ("If `recruited_korsa` and Vesna is the candidate the player is currently talking to, Korsa says X from his table"). Stage 5 should write 1–2 interjection lines per recruited-companion × candidate pair where it serves character (not exhaustively — about a dozen total lines max).
- **Approximate scene count:** ~38 named scenes listed above. This is over the ~30 budget from `structure.md`. Tightening options for Stage 5 if budget pressure is real:
  - Collapse the four `*_topic_*` scenes per recruitment hub into 2–3 each (merge price + key topic, etc.) — saves ~8 scenes.
  - Collapse Durnan's five topics to three (well + apprentice combined; tab + advice combined) — saves 2.
  - Drop `loot_room_chase_skip` and merge into the `loot_room_visitor` scene itself — saves 1.
  - These are deferred decisions: start writing at the current granularity and trim if a scene feels redundant rather than pre-cutting structure.
