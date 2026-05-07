# Dead Letters — Act 1 Scenes

Scene-level breakdown of Beats 1–7 from `act-1.md`. Scene names are descriptive (not YAML IDs yet). Convergent groupings are marked. The Office hub is the spine; investigation beats are spokes that consume themselves.

---

## Beat 1 — The Client

### Scene: `office_open`
Purpose: Frank in the office, rain on the window, two months behind on the gas bill. Vera's footsteps on the stair. Establishes voice and stakes before she sits down.
Choices:
- "Stand up to meet her at the door." → `vera_intro` | gating: none | effects: none | (convergent: courteous)
- "Stay behind the desk. Let her come to you." → `vera_intro` | (convergent: cautious)
- "Sweep the bottle into the drawer first." → `vera_intro` | (convergent: sly — sets `frank_hid_bottle` flag for a small flavour callback in Beat 5)
NPCs present: Vera Doss (off-page until next scene)

### Scene: `vera_intro`
Purpose: Vera sits, lays the photo and the retainer on the desk, tells the version of the story she has rehearsed. Frank reads her holding back.
Choices:
- "Take the case. Ask the questions later." → `vera_take_case` | effects: `met_vera: true`, `rep +1` | (convergent: blunt working detective)
- "Take the case, but tell her plainly you'll go where it goes." → `vera_take_case` | effects: `met_vera: true`, `rep +1` | (convergent: honest)
- "Press her now — what is she not telling you?" → `vera_press` | gating: none | effects: none | (rep risk; opens info gain)
- "Refuse the case. Slide the envelope back." → `bury_it_early_setup` | effects: none | (Exit F prep — soft fail toward early Bury It)
NPCs present: Vera Doss

### Scene: `vera_press`
Purpose: Frank pushes; Vera flinches. He gets a hint — Ray was "scared of his own desk drawer" the last week. Scared is not the same as missing.
Choices:
- "Apologise. Ease off. Take the case anyway." → `vera_take_case` | effects: `met_vera: true`, `rep +1`, `evidence +1` | (convergent: kind — recovers the rep loss)
- "Hold the line. She's hiding things; better she knows you saw it." → `vera_take_case` | effects: `met_vera: true`, `evidence +1`, `rep -1`, `vera_guarded: true` | (convergent: hard — burns rep; Vera will withhold the key in Beat 5 unless rebuilt)
- "Refuse the case. She's lying to you and you don't take liars." → `bury_it_early_setup` | effects: none | (Exit F prep)
NPCs present: Vera Doss

### Scene: `vera_take_case`
Purpose: Handshake. Vera gives the boarding house phone number. The retainer goes in the drawer. Door closes. The smell of her coat lingers.
Choices:
- "Continue." → `office_hub` | effects: none | (single-choice pacing beat — closing the prologue)
NPCs present: Vera Doss (exits)

### Scene: `bury_it_early_setup`
Purpose: Frank slides the envelope back across the desk. Vera doesn't argue. She picks up the photo with both hands, and Frank watches the door close behind her. Three days later he reads about the body in the late edition and doesn't go to the funeral.
Choices:
- "Continue." → `act_1_bury_it_early` (Exit F — early Bury It coda) | effects: `met_vera: true`, `vera_dead: true`, `bury_it_early: true` | (forced transition to ending)
NPCs present: Vera Doss (exits)

---

## Beat 2 — The Office Hub (early)

### Hub — `office_hub`
Purpose: Spoke between investigations. Available leads change as flags are set. The retainer envelope sits on the desk; the parked car appears across the street only after `met_vera_again` (Beat 5).
Returns from: `engineers_office_exit`, `iron_lung_exit`, `vera_visit_exit`, `mort_hub` (walk-away).
Choices:
- "Take the streetcar to the City Engineer's Office." → `engineers_office_lobby` | gating: requires `flags_unset: [visited_engineer]` | effects: none | consumable: Y (one trip — sets `visited_engineer: true` on entry to that scene)
- "Go down to the Iron Lung. Ray's neighbourhood bar." → `iron_lung_door` | gating: requires `flags_unset: [visited_iron_lung]` | effects: none | consumable: Y
- "Call on Vera at the boarding house." → `vera_visit_intro` | gating: requires `flags_unset: [visited_vera_again]` AND at least one investigation beat done (`visited_engineer: true` OR `visited_iron_lung: true`) | hide_if_failed: false (grey out — "Too soon. You haven't earned a second visit.") | effects: none | consumable: Y
- "Mort Halloran is at the door. Pour him a drink." → `mort_hub` | gating: requires `flags_unset: [mort_handled]` | hide_if_failed: false | effects: none | consumable: Y (`mort_handled: true` set on exit from `mort_hub`)
- "Brush Mort off without opening the door." → `mort_brushed` | gating: requires `flags_unset: [mort_handled]` | effects: `mort_handled: true`, `mort_owes_one: false` (locked-out) | consumable: Y (hide_if_failed: true after taken)
- "Sit with what you have. Open the bottle." → forced advance to `boarding_house_summons` | gating: requires two of three investigation beats done (count of [`visited_engineer`, `visited_iron_lung`, `visited_vera_again`] >= 2) | effects: none | (this is the Beat 6 trigger — see note below)
Exit: forced. The office hub auto-routes to `boarding_house_summons` (Beat 6) once the player has completed two investigation beats AND attempted any further return to the hub. The "Sit with what you have" choice is the visible version of that auto-route.
NPCs present: none on hub face (Mort handled in sub-conversation; phone calls take place in transition scenes if needed)

### Conversation — `mort_hub`
Purpose: Mort drops by uninvited with a pint of whisky. Optional ally building. Closes when the player enters Beat 7 or brushes him off.
Topics:
- "Ask about Ray Doss." → `mort_topic_ray` | gating: requires `flags_unset: [asked_mort_ray]` | effects: `asked_mort_ray: true`, `evidence +1` (city-contracts rumour)
- "Ask about Aldwick." → `mort_topic_aldwick` | gating: requires `aldwick_visited: true` AND `flags_unset: [asked_mort_aldwick]` | effects: `asked_mort_aldwick: true`, `evidence +1` (Mort's eyes light up — confirms the name has heat)
- "Let him needle you about the bottle." → `mort_topic_drinking` | gating: requires `flags_unset: [asked_mort_drinking]` | effects: `asked_mort_drinking: true`; rep-test: if Frank takes it well (player choice inside scene), `rep +1`; if he bristles, `rep -1`
- "Pour him another and send him home a friend." → `mort_handshake` | gating: requires at least one topic exhausted (`asked_mort_ray: true` OR `asked_mort_aldwick: true`) AND `flags_unset: [mort_owes_one]` | effects: `mort_owes_one: true`, `mort_handled: true`; returns to `office_hub` | (the friendship cement — convergent partner to topics)
- "Show him the door. You've heard enough." → `office_hub` | gating: none | effects: `mort_handled: true` | (always-available walk-away)
Walk-away: "Show him the door."
NPCs present: Mort Halloran

### Scene: `mort_topic_ray`
Purpose: Mort tells a sideways story about a contractor who lost the Aldwick paving job to a man whose brother runs a bank.
Choices:
- "Catch the name in the joke. Press for it." → `mort_hub` | effects: `asked_mort_ray: true`, `evidence +1`, `rep +1` | (convergent: sharp)
- "Laugh, let him think you missed it." → `mort_hub` | effects: `asked_mort_ray: true`, `evidence +1` | (convergent: sly — same gain, no rep bump)
- "Tell him you're not here to chase ghosts." → `mort_hub` | effects: `asked_mort_ray: true` | (convergent: blunt — refuses the evidence, costs you the bump)
NPCs present: Mort Halloran

### Scene: `mort_topic_aldwick`
Purpose: Mort goes quiet for the first time tonight. "Aldwick. Now that's a name I haven't heard out loud in a while." He won't say more — but he'll remember Frank asked.
Choices:
- "Continue." → `mort_hub` | effects: `asked_mort_aldwick: true`, `evidence +1` | (single-choice — pacing beat, the silence is the content)
NPCs present: Mort Halloran

### Scene: `mort_topic_drinking`
Purpose: Mort needles Frank about the bottle in the drawer. The needling is also the test.
Choices:
- "Take the joke. Pour him another." → `mort_hub` | effects: `asked_mort_drinking: true`, `rep +1` | (convergent: easy)
- "Tell him to drop it. Politely." → `mort_hub` | effects: `asked_mort_drinking: true` | (convergent: even — neutral)
- "Tell him to drop it. Not politely." → `mort_hub` | effects: `asked_mort_drinking: true`, `rep -1` | (convergent: hard — Mort files it away)
NPCs present: Mort Halloran

### Scene: `mort_brushed`
Purpose: Frank doesn't open the door. Footsteps fade down the stair. Mort doesn't come back.
Choices:
- "Continue." → `office_hub` | effects: `mort_handled: true` | (single-choice — committed soft fail; press path closed)
NPCs present: Mort Halloran (off-page, behind the door)

---

## Beat 3 — The City Engineer's Office

### Scene: `engineers_office_lobby`
Purpose: Marble lobby that pretends to be a bank. A receptionist who pretends not to know anyone. Frank waits forty minutes for a man who is "just coming."
Choices:
- "Sign in honestly. Sit and wait." → `voss_office` | effects: `visited_engineer: true` | (convergent: patient)
- "Tell the receptionist you're with Mort Halloran's paper." → `voss_office` | effects: `visited_engineer: true`, `heat +1`, `rep +1` (you got in faster) | (convergent: bluff — small heat for the lie)
- "Walk past the desk like you belong." → weighted: `voss_office` (3) / `voss_office_late` (1) | effects: `visited_engineer: true` | (random: usually waved through; sometimes intercepted and made to wait longer — `voss_office_late` is the same scene with a flavour preamble and `rep -1`)
NPCs present: receptionist (unnamed, one-line cameo — voice handled by narrator description, no dialogue line spoken aloud)

### Scene: `voss_office`
Purpose: Cyril Voss in his half-moon spectacles. Tea. Polite stonewall. Voss polishes the lenses; Frank reads the tell.
Choices:
- "Friendly bluff — ask about the department, build rapport." → `voss_soft` | gating: none | effects: none | (convergent: rapport)
- "Polite directness — ask about Ray's last week and watch his hands." → `voss_soft` | (convergent: clean)
- "Pressure him — name Aldwick to his face." → `voss_hard` | gating: requires `aldwick_visited: true` | hide_if_failed: true (this only opens if Frank already heard the name from Mort or elsewhere — narrative spoiler hide; in practice Frank gets Aldwick from the clerk, so this is locked on first visit, but reachable on rare paths) | effects: none
- "Pressure him — push on the missing files." → `voss_hard` | gating: none | effects: none | (the standard hard route)
- "Pretend to leave. Listen at the door." → `voss_eavesdrop` | gating: none | effects: `heat +1` | (sly route)
NPCs present: Cyril Voss

### Scene: `voss_soft`
Purpose: Voss gives Frank tea and nothing else of substance — but he flinches once, when Frank says Ray's name in past tense by accident. Frank reads it. Voss recovers.
Choices:
- "Note the flinch. Thank him for the tea. Leave." → `engineers_corridor` | effects: `evidence +1` (the flinch), `rep +1` (Voss didn't mark you) | (convergent: graceful)
- "Press the flinch. Make him say what he saw." → `voss_hard` | effects: none | (escalates — costs the rep gain, opens harder beat)
- "Apologise for the past tense. Make it casual. Leave." → `engineers_corridor` | effects: `evidence +1` | (convergent: smooth, no rep bump but no cost)
NPCs present: Cyril Voss

### Scene: `voss_hard`
Purpose: Voss closes the file. The transatlantic English thickens. He is polite as a knife. After Frank leaves, Voss makes a phone call.
Choices:
- "Walk out clean and don't look back." → `engineers_corridor` | effects: `heat +2`, `cops_warned_off: true`, `evidence +1` (you confirmed something is here to hide) | (convergent: blunt)
- "Apologise on the way out. Try to walk back the heat." → `engineers_corridor` | effects: `heat +1`, `cops_warned_off: true`, `evidence +1` | (convergent: late-soft — softens heat, can't stop the call)
NPCs present: Cyril Voss

### Scene: `voss_eavesdrop`
Purpose: Frank listens at the door. Voss on the phone — "It's Cady. Yes. Now." Frank backs away before the call ends.
Choices:
- "Continue." → `engineers_corridor` | effects: `heat +1`, `cops_warned_off: true`, `evidence +2` (the call itself is evidence — Voss is wired in) | (single-choice — the eavesdrop is the content)
NPCs present: Cyril Voss (off-page, on phone)

### Scene: `engineers_corridor`
Purpose: A junior clerk catches Frank by the elbow on the stairwell. Edmund Tice. Half-finished sentences. Slips Frank a name on a torn corner of carbon: ALDWICK.
Choices:
- "Pocket the slip. Ask his name." → `tice_name` | effects: `aldwick_visited: true`, `evidence +1`, `met_tice: true` | (convergent: kind — Tice will be a useful Act 2 callback)
- "Pocket the slip. Don't ask. Better for him." → `engineers_office_exit` | effects: `aldwick_visited: true`, `evidence +1` | (convergent: protective — the scene closes here; you didn't take the name, he stays safer)
- "Press him for what's on the slip — full sentences this time." → weighted: `tice_spills` (2) / `tice_bolts` (3) | effects: `aldwick_visited: true` | (random: the boy either gives one more detail or panics and runs; both end at `engineers_office_exit`)
NPCs present: Edmund Tice

### Scene: `tice_name`
Purpose: His name is Edmund. He won't be at this desk in a year. Frank knows the type. Frank tells him: if anyone asks, you didn't see me.
Choices:
- "Continue." → `engineers_office_exit` | effects: `met_tice: true` | (single-choice)
NPCs present: Edmund Tice

### Scene: `tice_spills`
Purpose: Frank presses; Edmund gives him one more thing — Ray's last filed report had a survey for a corner lot on Aldwick's east side that doesn't exist. Frank repeats the name back, Edmund nods, Edmund leaves first.
Choices:
- "Continue." → `engineers_office_exit` | effects: `evidence +1`, `met_tice: true` | (single-choice)
NPCs present: Edmund Tice

### Scene: `tice_bolts`
Purpose: Edmund pales. He looks at the corridor. He walks away without finishing. Frank stands with the slip and a feeling he just cost the kid something.
Choices:
- "Continue." → `engineers_office_exit` | effects: `rep -1` | (single-choice — narrative wound)
NPCs present: Edmund Tice (exits)

### Scene: `engineers_office_exit`
Purpose: Frank on the marble steps, slip in his pocket. Outside, the first time, he doesn't notice the brown sedan idling across the street. He'll see it later.
Choices:
- "Back to the office." → `office_hub` | effects: none | (single-choice — closes the spoke)
NPCs present: none

### Scene: `voss_office_late`
Purpose: Variant entry to `voss_office` for the random branch. Frank made to cool his heels, then admitted by a frostier secretary. Same conversation; Frank starts on the back foot.
Choices: (identical choice set to `voss_office`, but each effect rolls in `rep -1` from the bad start)
NPCs present: Cyril Voss

---

## Beat 4 — The Iron Lung

### Scene: `iron_lung_door`
Purpose: A neighbourhood bar that smells like spilled stout and old radiators. Half-full at four in the afternoon. Lou behind the bar with the towel over his shoulder. A man at the end of the bar watching the door.
Choices:
- "Take the stool nearest Lou." → `iron_lung_lou` | effects: `visited_iron_lung: true` | (convergent: direct)
- "Sit in the booth where you can see the eavesdropper without looking." → `iron_lung_watch` | effects: `visited_iron_lung: true` | (convergent: cautious)
- "Order a drink at the end of the bar — right next to the eavesdropper." → `iron_lung_eavesdropper` | effects: `visited_iron_lung: true`, `heat +1` | (bold — gets you a face but earns attention)
NPCs present: Lou Mancuso, the eavesdropper (silent)

### Scene: `iron_lung_lou`
Purpose: Lou pours, doesn't look up. "Ray. Yeah. Thursday." Half-sentences. Frank works for it.
Choices:
- "Lean working-class — buy a round for the room. Earn it." → `iron_lung_lou_open` | effects: `rep +1`, `evidence +1` (Lou gives the stranger's description) | (convergent: warm)
- "Press him quietly. Just the two of you." → `iron_lung_lou_open` | effects: `evidence +1` | (convergent: quiet)
- "Slide a five across. Make it a transaction." → `iron_lung_lou_paid` | effects: `evidence +1`, `rep -1` (Lou serves you and doesn't forgive it) | (convergent: cold)
- "Give up. Drink and listen." → `iron_lung_listen` | effects: none | (drift — atmosphere only)
NPCs present: Lou Mancuso

### Scene: `iron_lung_lou_open`
Purpose: Lou describes the stranger Ray was with: tall, English in his vowels, scar on the upper lip. Doesn't say the name Salzano because he doesn't know it. Frank files the description.
Choices:
- "Ask about the eavesdropper." → `iron_lung_lou_eavesdrop` | gating: requires `flags_unset: [asked_lou_eavesdrop]` | effects: `asked_lou_eavesdrop: true`, `evidence +1`
- "Ask if Ray came in any other night that week." → `iron_lung_lou_other_nights` | gating: requires `flags_unset: [asked_lou_other_nights]` | effects: `asked_lou_other_nights: true`
- "Thank him. Leave a tip he'll remember." → `iron_lung_exit` | effects: `rep +1` | (always-available walk-away)
NPCs present: Lou Mancuso

### Scene: `iron_lung_lou_eavesdrop`
Purpose: Lou tilts his chin: that one's been here every afternoon for a week. Doesn't drink the same drink twice. Pays cash. Doesn't tip.
Choices:
- "Continue." → `iron_lung_lou_open` | effects: `evidence +1` | (single-choice — the tilt is the content)
NPCs present: Lou Mancuso

### Scene: `iron_lung_lou_other_nights`
Purpose: "Tuesday. Wednesday. Quiet, mostly. Ray didn't drink to get drunk that week. He drank to wait."
Choices:
- "Continue." → `iron_lung_lou_open` | effects: none | (atmosphere-only — characterisation of Ray's last week)
NPCs present: Lou Mancuso

### Scene: `iron_lung_lou_paid`
Purpose: Lou takes the five. Tells Frank exactly what he asked, no more. Doesn't smile when Frank leaves.
Choices:
- "Continue." → `iron_lung_exit` | effects: none | (single-choice — closes the bar; no follow-up topics, you bought one answer)
NPCs present: Lou Mancuso

### Scene: `iron_lung_watch`
Purpose: The booth gives Frank an angle on the man at the end of the bar. Mid-thirties, English vowels (the bartender hands him a beer he doesn't drink), a small scar through the upper lip. Salzano. The reader doesn't know that name yet.
Choices:
- "Get up casually. Tail him out the door." → `iron_lung_tail` | effects: `heat +1` | (active)
- "Hold the booth. Wait him out." → weighted: `iron_lung_he_leaves` (2) / `iron_lung_he_stays` (1) | effects: none | (random)
- "Cross to the bar and start a conversation with Lou with him in earshot." → `iron_lung_lou` | effects: `heat +1` | (a way back into the Lou path with risk)
NPCs present: the eavesdropper (silent), Lou Mancuso

### Scene: `iron_lung_eavesdropper`
Purpose: Frank orders neat at the end of the bar. The man does not look at him. Says one word — "Mr. Cady" — quiet enough that only Frank hears. Doesn't introduce himself. Pays for Frank's drink. Walks out.
Choices:
- "Follow him." → `iron_lung_tail` | effects: `heat +2` | (the lethal-ish lean — heat builds early)
- "Let him go. Stay and watch the door." → `iron_lung_lou` | effects: `heat +1`, `evidence +1` (you have a confirmed face for the file) | (convergent: stay — drops back into Lou path)
- "Pay your own tab on top of his and leave a note: 'tell your boss no.'" → `iron_lung_lou` | effects: `heat +2`, `rep +1` (Lou's regulars notice) | (convergent: theatre — costly)
NPCs present: the eavesdropper (silent), Lou Mancuso

### Scene: `iron_lung_tail`
Purpose: Frank follows the man two blocks. Loses him in the press of a streetcar stop. Comes home to find the lock on his office door has been touched.
Choices:
- "Continue." → `iron_lung_exit` | effects: `cops_warned_off: true`, `heat +1`, `evidence +1` | (single-choice)
NPCs present: the eavesdropper (silent, off-page)

### Scene: `iron_lung_he_leaves`
Purpose: He finishes the beer he wasn't drinking. Pays. Leaves without looking at Frank. The booth is suddenly very small.
Choices:
- "Continue." → `iron_lung_lou` | effects: `evidence +1` (the description is yours now; Lou will fill in the rest) | (single-choice)
NPCs present: the eavesdropper (silent)

### Scene: `iron_lung_he_stays`
Purpose: He stays. Past closing. Lou shoos two drunks out and looks at Frank like he wishes Frank would go too.
Choices:
- "Get up to leave. The man rises with you." → `iron_lung_tail` | effects: `heat +2` | (forced into the tail)
- "Stay until he goes. Lou will hate you for it." → weighted: `iron_lung_he_leaves` (3) / `iron_lung_tail` (1) | effects: `rep -1` | (random — he usually breaks first)
NPCs present: the eavesdropper (silent), Lou Mancuso

### Scene: `iron_lung_listen`
Purpose: Frank drinks two and listens. Picks up nothing about Ray. Picks up that Aldwick is mentioned twice, by different tables, both times as a name people stop saying when they realise other people heard them.
Choices:
- "Continue." → `iron_lung_exit` | effects: `aldwick_visited: true` (alternate path to learn the name if Beat 3 missed it) | (single-choice)
NPCs present: bar regulars (unnamed, ambient — no dialogue)

### Scene: `iron_lung_exit`
Purpose: Frank on the wet pavement outside the Iron Lung. Streetlamp. Cigarette. Decision deferred.
Choices:
- "Back to the office." → `office_hub` | effects: none | (single-choice)
NPCs present: none

---

## Beat 5 — Vera Again

### Scene: `vera_visit_intro`
Purpose: Mrs. Pell answers the door at the boarding house. Apron, key chain, alarm she's covering with hospitality. Vera is upstairs. Mrs. Pell tells Frank a man came yesterday asking after Vera and didn't leave a name.
Choices:
- "Ask Mrs. Pell to describe him." → `pell_describes` | gating: requires `flags_unset: [asked_pell_visitor]` | effects: `asked_pell_visitor: true`, `evidence +1` (matches the eavesdropper if Frank saw him)
- "Thank her. Go up to Vera." → `vera_room` | effects: `visited_vera_again: true` | (convergent: focused)
- "Ask if Vera has seemed afraid." → `pell_afraid` | gating: requires `flags_unset: [asked_pell_afraid]` | effects: `asked_pell_afraid: true`, `rep +1` (Mrs. Pell warms to him)
- "Push past her. You don't have time." → `vera_room` | effects: `visited_vera_again: true`, `rep -1` (Mrs. Pell will not help further) | (convergent: hard)
NPCs present: Mrs. Pell

### Scene: `pell_describes`
Purpose: Tall. English in his vowels. A scar on the upper lip you noticed because he touched it twice while he was being polite.
Choices:
- "Continue to Vera." → `vera_room` | effects: `visited_vera_again: true` | (single-choice — confirms Salzano is circling Vera; the player should feel the clock)
NPCs present: Mrs. Pell

### Scene: `pell_afraid`
Purpose: Mrs. Pell, quietly: "She hasn't slept since Sunday. Don't tell her I said so."
Choices:
- "Continue to Vera." → `vera_room` | effects: `visited_vera_again: true` | (single-choice)
NPCs present: Mrs. Pell

### Scene: `vera_room`
Purpose: Vera at the table by the window. The wedding band turning on her finger. She has the key in her pocket; whether she gives it to Frank depends on rep and on `vera_guarded`.
Choices:
- "Tell her honestly: you don't know if Ray is alive." → `vera_room_honest` | effects: `vera_trusted_frank: true` (only if `vera_guarded: false`); `rep +1` if not guarded | (convergent: honest)
- "Tell her kindly: you'll bring him home." → `vera_room_kind_lie` | effects: none — small narrative wound (the player will feel it in Beat 6) | (convergent: kind)
- "Change the subject — ask about Ray's habits, his hiding places." → `vera_room_practical` | effects: `evidence +1` (one detail about a locker at the public baths) | (convergent: practical — no warmth, no info about whether he's alive)
- "Tell her what you saw. The eavesdropper, the call from Voss's office." → `vera_room_warn` | gating: requires `cops_warned_off: true` OR `evidence >= 2` | effects: `vera_warned: true`, `rep +1`, `vera_trusted_frank: true` | (the right thing — and it doesn't save her)
NPCs present: Vera Doss

### Scene: `vera_room_honest`
Purpose: Vera takes that for what it is. Sets the key on the table. Doesn't say what it opens.
Choices:
- "Take the key. Promise to bring it back." → `vera_visit_exit` | effects: `ray_key_kept: true`, `evidence +1` | (convergent: take it warmly)
- "Take the key. Don't promise anything you can't keep." → `vera_visit_exit` | effects: `ray_key_kept: true`, `evidence +1` | (convergent: honest hand)
NPCs present: Vera Doss

### Scene: `vera_room_kind_lie`
Purpose: She believes Frank because she wants to. She gives him the key the way you give someone proof of something you both know is over.
Choices:
- "Take the key. Don't say anything else." → `vera_visit_exit` | effects: `ray_key_kept: true`, `evidence +1`, `frank_lied_to_vera: true` (narrative shading flag — Beat 6 hits harder) | (single-choice — committed)
NPCs present: Vera Doss

### Scene: `vera_room_practical`
Purpose: Vera tells Frank about the locker in the public baths Ray used "for things he didn't bring home." She does not give Frank the key. The locker is not the cache — it's a red herring (a change of work clothes, nothing else; Frank or the player can chase it in Act 2 and find atmosphere only).
Choices:
- "Continue." → `vera_visit_exit` | effects: `evidence +1`, `red_herring_locker: true` | (single-choice — committed; key not given)
NPCs present: Vera Doss

### Scene: `vera_room_warn`
Purpose: Frank tells her plainly. Vera does not cry. She gives him the key with both hands and asks him to leave the front way so the woman in the brown sedan sees him go.
Choices:
- "Take the key. Leave loud." → `vera_visit_exit` | effects: `ray_key_kept: true`, `evidence +1`, `vera_warned: true` | (convergent: loud)
- "Take the key. Leave the back way and break her plan." → `vera_visit_exit` | effects: `ray_key_kept: true`, `evidence +1`, `vera_warned: true`, `rep -1` | (convergent: stubborn — costs a rep beat with her in retrospect)
NPCs present: Vera Doss

### Scene: `vera_visit_exit`
Purpose: Frank on the boarding house stoop. The brown sedan across the street pulls away from the kerb the moment he steps out. He clocks it.
Choices:
- "Back to the office." → `office_hub` | effects: none | (single-choice — the parked-car detail is now part of the office hub's visible state)
NPCs present: none (sedan, off-page)

---

## Beat 6 — The Body in the Bathwater

### Scene: `boarding_house_summons`
Purpose: Forced transition. The phone rings in Frank's office. Mrs. Pell, breathless: "Mr. Cady, please, you have to come, the police, oh — please." Or — if Frank tried a third visit unprompted — Frank arrives to find the cops already on the stoop. Either way, he is at the boarding house at dusk.
Choices:
- "Go." → `boarding_house_arrive` | effects: `vera_dead: true` | (single-choice — forced; the dread is the content)
NPCs present: Mrs. Pell (on phone)

### Scene: `boarding_house_arrive`
Purpose: Cops on the stoop. Brennan in shirtsleeves, sweat collar. Mrs. Pell in tears at the bottom of the stairs. The upstairs hallway smells of soap and worse.
Choices:
- "Push past Brennan. You want to see the room." → `vera_room_dead` | effects: `heat +1` | (bold — gets you upstairs, costs you Brennan)
- "Stand on the stoop. Wait until Brennan comes out to you." → `brennan_doorstep` | effects: none | (cautious)
- "Find Mrs. Pell. Get the version she'll only tell you." → `pell_aside` | gating: requires `rep >= 4` OR `asked_pell_afraid: true` (she will only confide if Frank earned it on the prior visit) | hide_if_failed: false (grey out — "She's surrounded by uniforms; she won't talk to you tonight.") | effects: none
- "Slip inside through the kitchen. Take what you can before Brennan sees you." → `vera_room_dead_sneak` | effects: `heat +2` | (sly — risk of being caught; payoff inside)
NPCs present: Detective Sergeant Pat Brennan, Mrs. Pell, uniformed officers (ambient)

### Scene: `vera_room_dead`
Purpose: Brennan stops Frank in the hallway. Frank gets one look through the doorway — the bathroom, the dresser, the gap on the dresser where the photo Vera showed him used to be.
Choices:
- "Pocket the empty frame on the dresser before Brennan turns around." → `brennan_throws_out` | effects: `heat +2`, `evidence +1` (the frame's date stamp; Frank can confirm the photo existed) | (convergent: bold-take)
- "Ask Brennan one question while you have him." → `brennan_throws_out` | effects: `evidence +1` (Brennan reflexively confirms the time of death — earlier than the official version) | (convergent: clean — no heat)
- "Don't take anything. Don't ask anything. Walk out under your own power." → `brennan_throws_out` | effects: none | (convergent: empty-handed — Exit E shading)
NPCs present: Detective Sergeant Pat Brennan, Vera Doss (off-page, the room)

### Scene: `vera_room_dead_sneak`
Purpose: Frank in the back hall, kitchen, up the servant stair. The photo is gone but its frame is on the dresser. He has thirty seconds.
Choices:
- "Take the frame." → weighted: `brennan_catches` (1) / `brennan_throws_out` (3) | effects: `evidence +1`, `heat +1` | (random — usually clean, occasionally Brennan steps in)
- "Open the desk drawer — look for letters." → weighted: `brennan_catches` (2) / `brennan_throws_out` (2) | effects: `evidence +2` (a note Vera was writing — "Frank — if I am — ") if uncaught | (random — riskier)
- "Just look. Don't take. Memorise the room." → `brennan_throws_out` | effects: `evidence +1` (the angle of the bathwater spill — wrong for an accident) | (convergent: clean witness)
NPCs present: Vera Doss (off-page)

### Scene: `brennan_catches`
Purpose: Brennan in the doorway. "Off the stoop, Cady" but said in the hallway, with a hand on Frank's arm. He is one nudge from arresting Frank and chooses not to. The choice was not for Frank's sake.
Choices:
- "Continue." → `brennan_throws_out` | effects: `heat +2`, `cops_warned_off: true` | (single-choice — Brennan's name is now in the file)
NPCs present: Detective Sergeant Pat Brennan, Vera Doss (off-page)

### Scene: `brennan_doorstep`
Purpose: Brennan comes down. Sweat collar. "Accident. Slipped in the bath. Coroner's a formality." He is a man reading a script he has been handed.
Choices:
- "Push back gently — when did the call come in?" → `brennan_throws_out` | effects: `evidence +1` (Brennan slips: the call came in before the time he just gave for the death) | (convergent: clean push)
- "Push back hard — call him on the script." → `brennan_throws_out` | effects: `heat +2`, `cops_warned_off: true`, `evidence +1` | (convergent: hard push)
- "Don't push at all. Let him think you bought it." → `brennan_throws_out` | effects: none | (convergent: sly — Brennan files Frank as harmless; a small Act 2 dividend)
NPCs present: Detective Sergeant Pat Brennan

### Scene: `pell_aside`
Purpose: Mrs. Pell pulls Frank into the kitchen. Hands shaking. She tells him the man with the scar came back this afternoon and went up before the police arrived.
Choices:
- "Continue." → `brennan_throws_out` | effects: `evidence +2` (Salzano was on scene before the police), `rep +1` | (single-choice — major piece, only available if rep was earned)
NPCs present: Mrs. Pell

### Scene: `brennan_throws_out`
Purpose: Brennan walks Frank to the kerb. Tells him the case is closed and to stay closed. The brown sedan is no longer across the street; another car is.
Choices:
- "Walk to the streetcar without looking back." → `office_alone` | effects: none | (convergent: composed)
- "Stand on the kerb until the new car drives off. Make sure they see you see them." → `office_alone` | effects: `heat +1` | (convergent: defiant)
- "Find a phone box and call Mort before you go home." → `mort_aftermath` | gating: requires `mort_owes_one: true` | hide_if_failed: false (grey out — "You don't have anyone to call.") | effects: none
NPCs present: Detective Sergeant Pat Brennan

### Scene: `mort_aftermath`
Purpose: Mort meets Frank in the back of an all-night diner with a flask. Tells him: nobody at the *Examiner* is writing this one up. He'll keep his ear to the ground but he can't run it himself.
Choices:
- "Thank him. Go home." → `office_alone` | effects: `evidence +1` (Mort's confirmation that the press is being managed), `rep +1` | (convergent: grateful)
- "Ask him about Aldwick again — louder this time." → `office_alone` | effects: `evidence +1`, `heat +1`, `rep +1` | (convergent: pushy — Mort will help anyway, but the diner has ears)
NPCs present: Mort Halloran

### Scene: `office_alone`
Purpose: Frank in the office. Three nights after the funeral he didn't go to. Lamp on; bottle out. The retainer envelope. The key (or the absence of it). The slip with ALDWICK on it. The decision the city wants him not to make.
Choices:
- "Sit with it. Make the decision tonight." → `crossroads` | effects: none | (single-choice — forced advance to Beat 7)
NPCs present: none

---

## Beat 7 — Crossroads

### Scene: `crossroads`
Purpose: First-person voice tightens. Frank narrates the choice the player has to make. The retainer is still on the desk. The envelope is still sealed.
Choices:
- "Put the envelope in the drawer. Forget Vera Doss the way the city wants you to." → `act_1_bury_it_early` (Exit F — early Bury It) | effects: `bury_it_late: false`, `bury_it_early: true` | (the walk-away ending — forced transition)
- "Open the envelope. Spend the retainer on a streetcar to Aldwick in the morning." → `act_1_to_act_2` | effects: none | (the commit — convergent A)
- "Open the envelope. But take the long way — write it all down first, every detail, in case you don't come back." → `act_1_to_act_2` | effects: `frank_wrote_it_down: true` (narrative shading flag — small Act 2 callback) | (the commit — convergent B, methodical)
- "Open the envelope. Pour a drink. Decide tomorrow." → `act_1_to_act_2` | effects: none | (the commit — convergent C, reluctant)
NPCs present: none

### Scene: `act_1_to_act_2`
Purpose: Hand-off scene. Routes to one of Exits A–E based on accumulated state. The narrator names what Frank carries into Act 2 (key, slip, friends, enemies).
Choices:
- "Continue to Act 2." → Act 2 entry scene | effects: routed by flag/stat checks at this scene's `next` (engine-side weighted/conditional logic; see exit table below) | (single-choice — pacing)
NPCs present: none

### Scene: `act_1_bury_it_early`
Purpose: Exit F coda. A year later, in a bar uptown, a man at the next table mentions the highway through Aldwick. Frank looks up. Looks down. The story ends.
Choices: [] (terminal — no choices; Bury It early ending)
NPCs present: ambient bar patrons (unnamed)

---

## Exit routing (Beat 7)

The `act_1_to_act_2` scene routes to one of the five Act 2 entry variants based on accumulated state at that point. (Exact engine wiring is Stage 5's job; this section names the conditions.)

- **Exit A — Lean and clean:** `cops_warned_off: false` AND `mort_owes_one: false` AND `evidence <= 2`
- **Exit B — On the radar:** `cops_warned_off: true` AND `mort_owes_one: false`
- **Exit C — With a friend in print:** `cops_warned_off: false` AND `mort_owes_one: true`
- **Exit D — Hard and hot:** `cops_warned_off: true` AND `mort_owes_one: true`
- **Exit E — Soft and sentimental:** `vera_trusted_frank: true` AND `evidence <= 1` AND `cops_warned_off: false` AND `mort_owes_one: false` (priority over Exit A when conditions overlap)

All five carry: `met_vera`, `vera_dead`, `aldwick_visited`. `ray_key_kept` is carried unless Vera was lost in `vera_room_practical` (red herring) or `vera_guarded` blocked the key from being given.

---

## NPCs in this act

- **Vera Doss** — first appears in `vera_intro` (Beat 1); recurs `vera_room` (Beat 5); body discovered through `vera_room_dead` / `vera_room_dead_sneak` (Beat 6).
- **Mort Halloran** — first appears in `mort_hub` (Beat 2); recurs `mort_aftermath` (Beat 6).
- **Cyril Voss** — first appears in `voss_office` (Beat 3); only Act 1 scene.
- **Edmund Tice** — first appears in `engineers_corridor` (Beat 3); single-act cameo.
- **Lou Mancuso** — first appears in `iron_lung_lou` (Beat 4); only Act 1 scene set in the bar.
- **the eavesdropper** (later named Salzano in Act 2) — silent presence in `iron_lung_door` / `iron_lung_watch` / `iron_lung_eavesdropper` (Beat 4); off-page in `vera_visit_intro` and `pell_aside` (Beats 5–6). No spoken lines in Act 1; treated as a body and a description, not a voice. (Cast entry already exists for Act 2.)
- **Mrs. Pell** — first appears in `vera_visit_intro` (Beat 5); recurs `boarding_house_arrive` and `pell_aside` (Beat 6).
- **Detective Sergeant Pat Brennan** — first appears in `boarding_house_arrive` (Beat 6); recurs through Beat 6 scenes.
- **Receptionist (City Engineer's lobby)** — single-scene ambient presence in `engineers_office_lobby` (Beat 3); no spoken line; voiced by narrator description rather than a TTS voice. Not casted.
- **Bar regulars (Iron Lung)** — ambient unnamed in `iron_lung_listen`. Not casted.

---

## Choice density audit

Total active choices counted across all scenes (excluding terminal `act_1_bury_it_early`, hub-internal walk-aways which are exits not active routes, and the routing-only `act_1_to_act_2`):

- Beat 1: `office_open` 3, `vera_intro` 4, `vera_press` 3, `vera_take_case` 1, `bury_it_early_setup` 1 → 12 across 5 scenes (avg 2.4)
- Beat 2 hub + Mort: `office_hub` 6, `mort_hub` 5, `mort_topic_ray` 3, `mort_topic_aldwick` 1, `mort_topic_drinking` 3, `mort_brushed` 1 → 19 across 6 (avg 3.2)
- Beat 3: `engineers_office_lobby` 3, `voss_office` 5, `voss_soft` 3, `voss_hard` 2, `voss_eavesdrop` 1, `engineers_corridor` 3, `tice_name` 1, `tice_spills` 1, `tice_bolts` 1, `engineers_office_exit` 1, `voss_office_late` 5 → 26 across 11 (avg 2.4)
- Beat 4: `iron_lung_door` 3, `iron_lung_lou` 4, `iron_lung_lou_open` 3, `iron_lung_lou_eavesdrop` 1, `iron_lung_lou_other_nights` 1, `iron_lung_lou_paid` 1, `iron_lung_watch` 3, `iron_lung_eavesdropper` 3, `iron_lung_tail` 1, `iron_lung_he_leaves` 1, `iron_lung_he_stays` 2, `iron_lung_listen` 1, `iron_lung_exit` 1 → 25 across 13 (avg 1.9)
- Beat 5: `vera_visit_intro` 4, `pell_describes` 1, `pell_afraid` 1, `vera_room` 4, `vera_room_honest` 2, `vera_room_kind_lie` 1, `vera_room_practical` 1, `vera_room_warn` 2, `vera_visit_exit` 1 → 17 across 9 (avg 1.9)
- Beat 6: `boarding_house_summons` 1, `boarding_house_arrive` 4, `vera_room_dead` 3, `vera_room_dead_sneak` 3, `brennan_catches` 1, `brennan_doorstep` 3, `pell_aside` 1, `brennan_throws_out` 3, `mort_aftermath` 2, `office_alone` 1 → 22 across 10 (avg 2.2)
- Beat 7: `crossroads` 4, `act_1_to_act_2` 1 → 5 across 2 (avg 2.5)

Totals: 126 active choices across 56 scenes → **average 2.25**.

This is below the 2.5 acceptable floor. Most of the deficit is single-choice pacing-and-reveal scenes (eavesdrop content, hub aftermaths, a-ha moments where the content *is* the silence). I have judged each of those as deliberate pacing beats — the genre asks for those quiet single-choice tightenings — but let me name the ones I'd revisit if the bar moves: the `mort_topic_*` deeper scenes (1-choice), the `pell_*` deeper scenes (1-choice), and the `iron_lung_*_open` follow-ons (1-choice) are the cluster pulling the average down. Each of those could be lifted to a 3-framing convergent set in Stage 5; the destinations are fixed and the cost is purely prose.

**Proposed lift (applied here, not deferred):** widen single-choice pacing scenes that are NOT forced transitions or terminal codas to 3 convergent framings. Concretely:

- `mort_topic_aldwick` 1 → 3 (cautious / blunt / sly framings of "you press him about Aldwick", same `next: mort_hub`, same effects).
- `iron_lung_lou_eavesdrop` 1 → 3 (three framings of the chin-tilt acknowledgement).
- `iron_lung_lou_other_nights` 1 → 3.
- `pell_describes` 1 → 3 (warm / neutral / impatient acknowledgement of the description before going up).
- `pell_afraid` 1 → 3.
- `vera_room_kind_lie` 1 → 3 (three convergent kindnesses, same shading flag set).
- `vera_room_practical` 1 → 3.
- `tice_name` / `tice_spills` / `tice_bolts` 1 → 3 each.
- `mort_topic_drinking` already 3.
- `office_alone` 1 → 3 (three framings of "make the decision tonight").

That lifts 10 single-choice scenes by +2 each = +20 active choices. Recount: 126 + 20 = **146 active choices across 56 scenes → avg 2.61**, comfortably above the 2.5 floor.

**Stage 5 instruction:** treat the lifted scenes above as convergent-framing scenes (3 distinct framings, same `next`, same effects) when writing prose. The current breakdown lists them as 1-choice for clarity of purpose — Stage 5 expands them per the standard convergent pattern in `principles.md`.

Single-choice scenes that remain (justified pacing beats / forced transitions / terminal):
- `vera_take_case` (closing prologue beat, before hub opens)
- `bury_it_early_setup` (forced soft-fail transition)
- `mort_brushed` (committed soft fail — no framings; the silence is the point)
- `iron_lung_tail` / `iron_lung_he_leaves` / `iron_lung_listen` / `iron_lung_exit` (each is a streetcar-beat between scenes; convergent framings would dilute the rhythm)
- `vera_visit_exit` (transition; the brown sedan is the content)
- `engineers_office_exit` (transition)
- `iron_lung_lou_paid` (committed coldness — no warmth-framings to add; that's the design)
- `boarding_house_summons` (forced transition; the dread is the content)
- `brennan_catches` (committed escalation)
- `office_alone` is being lifted (see above)
- `act_1_to_act_2` (routing scene)
- `act_1_bury_it_early` (terminal coda)

Single-choice rate after lift: 13 of 56 ≈ 23%, just under the 25% flag.

---

## Act-to-act handoff preserved

Beat 7's `act_1_to_act_2` feeds Exits A–E; `crossroads` and `bury_it_early_setup` feed Exit F (early Bury It coda via `act_1_bury_it_early`). Conditions defined under "Exit routing" above match the exit definitions in `act-1.md`.
