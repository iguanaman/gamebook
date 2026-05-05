# Wet Concrete — Act 1 Scenes

## Beat 1 — The Office, Before

### Scene: `office_before`
Purpose: Establish Frank's world and receive Vera. Sets `met_vera`. Character-defining tone choice between two styles of taking the case.
Choices:
- "Take her in — she's holding herself together by a thread" → `office_intake_warm` | gating: none | effects: rep +1 | consumable: N
- "Hear her out without comment — keep it professional" → `office_intake_clipped` | gating: none | effects: none | consumable: N
NPCs present: Vera Doss

---

### Scene: `office_intake_warm`
Purpose: Frank responds with sympathy. Vera opens up a little more — her worry, the police dismissal. Sets `met_vera`.
Choices:
- "Tell her you'll find Ray — she needs to hear it" → `office_accepts_case` | gating: none | effects: met_vera: true | consumable: N
- "Tell her you'll look — no promises" → `office_accepts_case` | (convergent with above — warmer framing vs. honest framing; same destination) | effects: met_vera: true | consumable: N
NPCs present: Vera Doss

---

### Scene: `office_intake_clipped`
Purpose: Frank is professional, detached. Gets the facts. Sets `met_vera`.
Choices:
- "Get the facts down, name your rate, take the case" → `office_accepts_case` | gating: none | effects: met_vera: true | consumable: N
- "Tell her the police are better equipped — test whether she pushes back" → `office_accepts_case` | (convergent with above — same destination; different Frank register) | effects: met_vera: true | consumable: N
NPCs present: Vera Doss

---

### Scene: `office_accepts_case`
Purpose: Case accepted. Frank has Ray's description, his workplace, his last day. Transitions to legwork.
Choices:
- "Start at the surveying department — that's where he worked, that's where the answer starts" → `legwork_survey_dept` | gating: none | effects: none | consumable: N
- "Start at his usual lunch counter — a man's habits tell you more than his employer" → `legwork_lunch_counter` | gating: none | effects: none | consumable: N
NPCs present: Vera Doss

---

## Beat 2 — Legwork: Ray's World

### Scene: `legwork_survey_dept`
Purpose: Frank visits the city surveying department. Peltz is nervous. The supervisor walks through and Peltz clamps shut.
Choices:
- "Warm Peltz up — joke about the city's filing system, build rapport" → `peltz_warm` | gating: none | effects: rep +1 | consumable: N
- "Press Peltz directly — what did Ray take home?" → `peltz_pressed` | gating: none | effects: heat +1 | consumable: N
- "Watch Peltz's face when the supervisor passes — read what you see" → `peltz_watched` | gating: none | effects: none | consumable: N
- "Back off — Peltz isn't going to talk here, and pushing makes noise" → `legwork_hub` | gating: none | effects: none | consumable: N
NPCs present: Peltz, the supervisor (unnamed, background presence)

---

### Scene: `peltz_warm`
Purpose: Peltz relaxes enough to mention Ray seemed distracted the last week. Took a lunch alone every day. Looked at something he didn't put back in the filing cabinet.
Choices:
- "Ask what Ray was looking at" → `peltz_files_hint` | gating: none | effects: evidence +1 | consumable: N
- "Let it go — Peltz has said enough, pushing will spook him" → `legwork_hub` | gating: none | effects: none | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_pressed`
Purpose: Peltz goes white. Tells Frank nothing but now someone has seen Frank asking questions. Heat accumulates.
Choices:
- "Leave — you've already made a mark being here" → `legwork_hub` | gating: none | effects: none | consumable: N
- "Double down — someone has to know something" → `peltz_double_down` | gating: none | effects: heat +1 | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_double_down`
Purpose: Frank pushes hard; Peltz shuts down entirely and someone in the back office is watching. Frank leaves knowing he's been seen.
Choices:
- "Walk out — it's done" → `legwork_hub` | gating: none | effects: none | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_watched`
Purpose: Frank sees Peltz look at the supervisor like a man who knows what the look costs. No words exchanged. But Frank notes the file cabinet Peltz had been leaning against.
Choices:
- "Note the cabinet number and come back after hours" → `legwork_hub` | gating: none | effects: none | consumable: N — (plants records_room opportunity; flag not consumed here)
- "Follow the supervisor out — see where he goes" → `supervisor_follow` | gating: none | effects: heat +1 | consumable: N
NPCs present: Peltz, supervisor

---

### Scene: `supervisor_follow`
Purpose: The supervisor goes to a pay phone. Short call. Frank can't hear it. But the man checks over his shoulder before he dials.
Choices:
- "Write down the phone number on the booth — may be useful later" → `legwork_hub` | gating: none | effects: evidence +1 | consumable: N
- "Don't push it — you've already been seen once today" → `legwork_hub` | gating: none | effects: none | consumable: N
NPCs present: supervisor

---

### Scene: `peltz_files_hint`
Purpose: Peltz says it wasn't the usual survey maps. Oversized paper, brown folder. He thinks it was boundary documentation — the kind used for re-titling parcels.
Choices:
- "Ask if Ray mentioned Aldwick" → `peltz_aldwick_name` | gating: none | effects: evidence +1 | consumable: N
- "Thank Peltz and go — you have enough" → `legwork_hub` | gating: none | effects: none | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_aldwick_name`
Purpose: Peltz freezes at the name. Doesn't say yes, doesn't say no. Ends the conversation. Frank has a direction.
Choices:
- "Leave — Peltz has given everything he's going to give" → `legwork_hub` | gating: none | effects: none | consumable: N
NPCs present: Peltz

---

### Scene: `legwork_lunch_counter`
Purpose: The counter girl remembers Ray — same stool, same order, alone. Last week he didn't finish his coffee. Stared at a folded paper he kept in his breast pocket.
Choices:
- "Ask if anyone else came in and sat with him" → `lunch_counter_company` | gating: none | effects: none | consumable: N
- "Ask if he seemed scared" → `lunch_counter_mood` | gating: none | effects: evidence +1 | consumable: N
- "Leave and head to the surveying department next" → `legwork_survey_dept` | gating: none | effects: none | consumable: N
NPCs present: counter girl (Maisie — minor NPC)

---

### Scene: `lunch_counter_company`
Purpose: One time, two days before he vanished, a man sat across from Ray. Suit, hat down. Ray left right after. Counter girl thought it was odd — Ray always finished his pie.
Choices:
- "Ask her to describe the suited man" → `lunch_counter_description` | gating: none | effects: evidence +1 | consumable: N
- "That's enough — thank her and move on" → `legwork_hub` | gating: none | effects: none | consumable: N
NPCs present: Maisie

---

### Scene: `lunch_counter_description`
Purpose: Average height, older, walked like a cop. Didn't eat anything. Counter girl thought he had a badge under his jacket but can't say for sure.
Choices:
- "File that away — a cop-type meeting with Ray two days before he vanished" → `legwork_hub` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Maisie

---

### Scene: `lunch_counter_mood`
Purpose: Maisie says scared isn't quite right. More like a man who'd made up his mind about something and was waiting to see if he'd made the right call.
Choices:
- "Ask about the day he disappeared" → `lunch_counter_last_day` | gating: none | effects: none | consumable: N
- "Thank her — it's enough" → `legwork_hub` | gating: none | effects: none | consumable: N
NPCs present: Maisie

---

### Scene: `lunch_counter_last_day`
Purpose: Last day Ray came in, he didn't sit. Stood at the counter, drank his coffee standing up. Left a bigger tip than usual. Didn't say anything.
Choices:
- "Men say goodbye differently — Ray knew something was coming" → `legwork_hub` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Maisie

---

### Hub — `legwork_hub` (Act 1 legwork hub)
Purpose: Frank collects himself between legwork stops. Checks his notes. Available options reflect what threads are open.
Returns from: `legwork_survey_dept` branches, `legwork_lunch_counter` branches
Choices:
- "Go to Aldwick — Ray was spending time there, and the neighbourhood is in the files" → `aldwick_arrival` | gating: none | effects: none | consumable: N
- "Swing by the city records office — the parcel numbers will mean something if you find the right filing cabinet" → `records_approach` | gating: none | effects: none | consumable: N
- "Go back to the surveying department after hours" → `records_room_night` | gating: requires flags_unset: [records_room] | hide_if_failed: true | effects: none | consumable: N — (consumable: yes — see `records_room_night` entry)
- "Go back to the office — check the phone, think it through" → `office_hub_act1` | gating: none | effects: none | consumable: N
Exit: "Head for Aldwick — it's the only lead left" → `aldwick_arrival` (always available once legwork exhausted)
NPCs present: none

---

## Beat 3 — The First Thread

### Scene: `aldwick_arrival`
Purpose: Frank enters Aldwick. Working-class, close-knit. A neighbourhood that's seen city inspectors and hasn't liked it. Sets `aldwick_visited`.
Choices:
- "Walk the streets — get the feel of the place before you knock on anything" → `aldwick_street_read` | gating: none | effects: aldwick_visited: true | consumable: N
- "Find someone who looks like they've been here long enough to know things" → `aldwick_elder_approach` | gating: none | effects: aldwick_visited: true | consumable: N
- "Check the buildings against the parcel number you found — let the paperwork lead you" → `aldwick_parcel_check` | gating: none | effects: aldwick_visited: true, evidence +1 | consumable: N
NPCs present: neighbourhood background characters

---

### Scene: `aldwick_street_read`
Purpose: Frank reads the neighbourhood — chalked addresses half-painted over, a permit notice half-peeled from a door. Notices a building permit number that doesn't match the street address. Evidence +1.
Choices:
- "Note the permit number and cross-check at the records office" → `aldwick_parcel_check` | gating: none | effects: evidence +1 | consumable: N
- "Knock on the nearest door — someone has to know who's been re-surveying here" → `aldwick_door_knock` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `aldwick_elder_approach`
Purpose: An older man on a stoop — Hector, retired, watches Frank the way people watch strangers in a neighbourhood that's been surveyed three times this year. Rep check matters here.
Choices:
- "Be direct — you're looking for Ray Doss, a city surveyor. You think something happened to him" → `aldwick_hector_direct` | gating: none | effects: none | consumable: N
- "Play it oblique — you're checking up on a property boundary issue for a client" → `aldwick_hector_oblique` | gating: none | effects: none | consumable: N
- "Show him something — Frank's old badge card, worn soft at the edges" → `aldwick_hector_badge` | gating: requires rep ≥ 4 (grey out: "He'd take one look and know you were working an angle") | effects: rep +1 | consumable: N
NPCs present: Hector (minor NPC — recurring in Act 2 as background colour)

---

### Scene: `aldwick_hector_direct`
Purpose: Hector doesn't flinch. Tells Frank that several surveyors have come through in the past year — city men, not independent. Ray was the one who stopped and looked twice at things instead of just writing them down. The others just confirmed what they were sent to confirm.
Choices:
- "Ask what they were confirming" → `aldwick_hector_detail` | gating: none | effects: evidence +1 | consumable: N
- "Thank him and move on — you've got what you need" → `aldwick_parcel_check` | gating: none | effects: none | consumable: N
NPCs present: Hector

---

### Scene: `aldwick_hector_oblique`
Purpose: Hector doesn't buy it but answers anyway — property issues, sure. There's been a lot of that. The boundaries keep moving on paper. His neighbour's house is technically on a different parcel than it was two years ago. The city says it's a surveying correction.
Choices:
- "Press on the 'correction' — that's not what corrections look like" → `aldwick_hector_detail` | gating: none | effects: evidence +1 | consumable: N
- "Let it settle — he's given you the shape of it" → `aldwick_parcel_check` | gating: none | effects: none | consumable: N
NPCs present: Hector

---

### Scene: `aldwick_hector_badge`
Purpose: The badge card softens Hector slightly — he remembers when cops were neighbourhood men, not city instruments. Tells Frank everything he told the direct path, plus the name of a woman who's been documenting the boundary changes: Marta Gaines.
Choices:
- "Get Marta's address" → `aldwick_hector_detail` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Hector

---

### Scene: `aldwick_hector_detail`
Purpose: The parcel boundaries have been shifting toward the east side of Aldwick — every "correction" takes a little more from the same block. Hector doesn't know why, but he knows it isn't an accident.
Choices:
- "Head to the records office — if the boundaries are moving, the paperwork says where and who authorised it" → `records_approach` | gating: none | effects: none | consumable: N
- "Find Marta Gaines — someone documenting it is the kind of person Ray would have talked to" → `aldwick_marta_intro` | gating: none | effects: none | consumable: N
NPCs present: Hector

---

### Scene: `aldwick_door_knock`
Purpose: Frank knocks on a door. A woman — young, pregnant, suspicious — opens it. She's heard too many questions from city men to trust a new one. Rep check shapes the outcome.
Choices:
- "Tell her you're not city — you're looking for someone who may have been hurt" → `aldwick_door_sympathy` | gating: none | effects: none | consumable: N
- "Show your licence — private detective, not city" → `aldwick_door_licence` | gating: requires rep ≥ 4 (grey out: "She'd see the licence as city-adjacent. She'd close the door.") | effects: rep +1 | consumable: N
- "Back off — she doesn't want to talk and you don't want to make it worse" → `aldwick_parcel_check` | gating: none | effects: none | consumable: N
NPCs present: young woman (unnamed, minor)

---

### Scene: `aldwick_door_sympathy`
Purpose: The word "hurt" gets through. She tells Frank her husband's employer is being pushed out — their lease is being contested by the city as a "boundary error." The same story, smaller scale.
Choices:
- "Ask if she's heard of Ray Doss" → `aldwick_door_ray_name` | gating: none | effects: none | consumable: N
- "Thank her — the pattern's clear now" → `aldwick_parcel_check` | gating: none | effects: none | consumable: N
NPCs present: young woman

---

### Scene: `aldwick_door_licence`
Purpose: The licence helps. She mentions that a city surveyor had been the one who first told her husband the boundary was wrong — not the city's surveyor. Someone who came on his own time.
Choices:
- "That was Ray Doss" → `aldwick_door_ray_name` | gating: none | effects: evidence +1 | consumable: N
NPCs present: young woman

---

### Scene: `aldwick_door_ray_name`
Purpose: She doesn't know the name. But she remembers the man — he came back twice, took photographs, wrote everything down. He told her husband it wasn't right, what the city was doing.
Choices:
- "Ask who else in the neighbourhood he talked to" → `aldwick_marta_intro` | gating: none | effects: evidence +1 | consumable: N
- "You have enough — move to the records office" → `records_approach` | gating: none | effects: none | consumable: N
NPCs present: young woman

---

### Scene: `aldwick_parcel_check`
Purpose: Frank cross-references the parcel number against a street address. Aldwick land, reassigned. The title date is recent — within the last eighteen months. The authorising surveyor's signature is Ray Doss. Except Ray didn't sign this.
Choices:
- "That's a forgery — Ray's signature on a document reseizing his own community's land" → `records_approach` | gating: none | effects: evidence +1 | consumable: N
NPCs present: none

---

### Scene: `aldwick_marta_intro`
Purpose: Frank finds Marta Gaines — mid-40s, a woman who has been documenting the boundary shifts in a notebook she keeps under her mattress. She doesn't trust Frank on sight.
Choices:
- "Tell her about Ray — what he found, what happened to him" → `aldwick_marta_ray` | gating: none | effects: none | consumable: N
- "Ask what she knows about the boundary changes — let her lead" → `aldwick_marta_lead` | gating: none | effects: none | consumable: N
- "Wait — let her size you up before you say anything" → `aldwick_marta_wait` | gating: requires rep ≥ 4 (grey out: "She'd read the hesitation as calculation, not patience.") | effects: rep +1 | consumable: N
NPCs present: Marta Gaines

---

### Scene: `aldwick_marta_ray`
Purpose: Marta knew Ray. He'd talked to her three times. The last time, he said he'd found something big enough that he didn't want to write it down — he was going to copy the documents and get them to the state auditor. She doesn't know if he did.
Choices:
- "Ask if Ray left anything with her — documents, a location" → `aldwick_marta_clue` | gating: none | effects: evidence +1 | consumable: N
- "Ask if Ray mentioned any names — who authorised the boundary changes" → `aldwick_marta_names` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Marta Gaines

---

### Scene: `aldwick_marta_lead`
Purpose: Marta tells Frank the story in her own words — the rezoning, the permits, the repeated "corrections." She's been tracking it for a year. Seventeen parcels reassigned. The boundary shifts all move in one direction. She says Ray was the first city employee who looked at her notebook and didn't laugh.
Choices:
- "Ask what Ray said when he saw the notebook" → `aldwick_marta_ray` | gating: none | effects: none | consumable: N
- "Ask who's behind the rezoning — who benefits" → `aldwick_marta_names` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Marta Gaines

---

### Scene: `aldwick_marta_wait`
Purpose: Silence works. Marta tells Frank everything — Hector sent her a note that someone was asking about Ray. She'd hoped someone would come.
Choices:
- "Ask about the notebook" → `aldwick_marta_ray` | gating: none | effects: none | consumable: N
NPCs present: Marta Gaines

---

### Scene: `aldwick_marta_clue`
Purpose: Ray didn't leave anything with Marta — he was scared of implicating her. But he told her if something happened to him, the documents were somewhere safe. In the house, he said. Under something that doesn't move.
Choices:
- "Under something that doesn't move — that's not a house, that's a basement" → `beat3_exit` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Marta Gaines

---

### Scene: `aldwick_marta_names`
Purpose: Marta doesn't know the name at the top. But she knows the city contracts for the new surveying work went through a company called Harmon Land Assessment — and she's seen a name on the permit revisions: a deputy in the mayor's office.
Choices:
- "Note the name — that's a thread for later" → `beat3_exit` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Marta Gaines

---

### Scene: `records_approach`
Purpose: Frank at the city records office. A bored clerk. Filing cabinets going back to the war. The records Frank needs are technically public — he has every right to look. Except the clerk tells him those particular files are checked out.
Choices:
- "Ask who checked them out" → `records_who_checked` | gating: none | effects: none | consumable: N
- "Come back tonight — if the files are checked out, someone's hiding them, not using them" → `beat3_exit` | gating: none | effects: none | consumable: N — (plants records_room opportunity)
- "Charm the clerk — maybe there's a duplicate set, a working copy" → `records_charm` | gating: none | effects: none | consumable: N
NPCs present: clerk (unnamed, minor)

---

### Scene: `records_who_checked`
Purpose: The clerk hesitates. The files were checked out to the office of the city surveying supervisor. Three weeks ago. Not returned.
Choices:
- "That's the same supervisor who watched Peltz shut down" → `beat3_exit` | gating: none | effects: evidence +1 | consumable: N
NPCs present: clerk

---

### Scene: `records_charm`
Purpose: The clerk warms up slightly. There's a duplicate parcels ledger — older, pre-war. It doesn't have the recent corrections. But it shows the original boundaries. Frank can compare.
Choices:
- "Compare them — if the corrections are forgeries, the originals prove it" → `records_compare` | gating: none | effects: none | consumable: N
- "Take a note of the ledger's location — useful later, maybe under different circumstances" → `beat3_exit` | gating: none | effects: none | consumable: N
NPCs present: clerk

---

### Scene: `records_compare`
Purpose: Frank compares old boundaries to new. The parcels have moved — not corrected, moved. In a pattern. East side of Aldwick, shifting toward the street that would become a highway on-ramp. Frank doesn't know that yet, but the pattern is there.
Choices:
- "Copy the key parcel numbers — this is the map of the conspiracy" → `beat3_exit` | gating: none | effects: evidence +1 | consumable: N
NPCs present: clerk

---

### Scene: `records_room_night`
Purpose: Frank comes back to the surveying department after hours. The cabinet Peltz was leaning against. Lock's standard issue. Takes about four minutes.
Consumable: yes — flag pair: requires `flags_unset: [records_room]`, effects set `records_room: true`. Hidden after taken (`hide_if_failed: true`).
Choices:
- "Go in" → `records_room_success` | gating: requires flags_unset: [records_room] | hide_if_failed: true | effects: records_room: true, evidence +1, heat +1 | consumable: Y
NPCs present: none

---

### Scene: `records_room_success`
Purpose: Inside the cabinet: a working file with Aldwick parcel numbers and revised boundary lines. Each line has an authorising signature — always the same two names: the surveying supervisor and a city deputy Frank doesn't recognise yet. Frank photographs what he can.
Choices:
- "Get out — you have what you came for and you've already been here too long" → `beat3_exit` | gating: none | effects: evidence +1 | consumable: N
NPCs present: none

---

### Scene: `beat3_exit`
Purpose: Frank has his first thread. The parcel number, the rezoning pattern, Aldwick. Not enough to know what it means yet — enough to know it's worth knowing.
Choices:
- "Go back to the office — think it through before the next move" → `office_hub_act1` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Hub — `office_hub_act1` (Frank's Office, Act 1 version)
Purpose: Frank's office between beats. Phone calls, notes, a chance to sit with what he knows. Options reflect current state.
Returns from: `beat3_exit`, `vera_call` branches
Choices:
- "Check the phone — see if Vera called" → `vera_call_check` | gating: requires flags_unset: [vera_dead] | hide_if_failed: true | effects: none | consumable: N
- "Lay out what you have — parcel numbers, names, Aldwick" → `office_review_notes` | gating: none | effects: none | consumable: N
- "Go back to Aldwick — there's more to learn there" → `aldwick_arrival` | gating: requires flags: [aldwick_visited] | hide_if_failed: true | effects: none | consumable: N
Exit: "It's late enough — the phone rings when it rings" → `vera_call_check` (or `beat4_entry` if Vera has already called; flag-gated transition)
NPCs present: none

---

### Scene: `office_review_notes`
Purpose: Frank puts it on paper. Ray Doss, city surveyor. Files at work that nobody's supposed to see. Aldwick neighbourhood, boundaries moving on paper. A supervisor who shuts people down. A records office with missing files. Not a missing husband. A missing witness.
Choices:
- "Wait for Vera to call — she may know more than she told you" → `vera_call_check` | gating: requires flags_unset: [vera_dead] | hide_if_failed: true | consumable: N
- "Go back to Aldwick — Marta Gaines knows more than she said" → `aldwick_marta_intro` | gating: requires flags: [aldwick_visited] | hide_if_failed: true | effects: none | consumable: N
- "Go back to the surveying department — there's something in that filing cabinet" → `records_room_night` | gating: requires flags_unset: [records_room] | hide_if_failed: true | effects: none | consumable: N
- "There's nothing more to do tonight — let it settle" → `vera_call_check` | (convergent with "wait for Vera" — same destination, different register) | gating: none | consumable: N
NPCs present: none

---

## Beat 4 — Vera's Warning, and Vera's Death

### Scene: `vera_call_check`
Purpose: The phone rings — or Frank reaches Vera. She's been followed. She sounds controlled, which is worse than frightened.
Choices:
- "Go to her now — whoever's following her isn't going to wait" → `vera_go_immediately` | gating: none | effects: none | consumable: N
- "Tell her to sit tight — you'll be there first thing tomorrow, when it's daylight" → `vera_wait_morning` | gating: none | effects: none | consumable: N
- "Ask her to describe who followed her — the more you know before you go in, the better" → `vera_describe_follower` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Vera Doss (by phone)

---

### Scene: `vera_describe_follower`
Purpose: Vera describes a man in a dark Plymouth who sat across the street for two hours. She got his plates. She's been waiting for Frank to call, writing things down.
Choices:
- "Get the plates and go to her now" → `vera_go_immediately` | gating: none | effects: evidence +1 | consumable: N
- "Get the plates and tell her you'll be there in the morning" → `vera_wait_morning` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Vera Doss

---

### Scene: `vera_go_immediately`
Purpose: Frank goes immediately. He finds Vera alive — barely. She was hit after she called him. She hands Frank a file Ray hid in the house: addresses in Aldwick, a list of parcel numbers, a name Frank hasn't seen yet. She dies before she can say more. Frank leaves with the file. Evidence spike.
Choices:
- "Take the file and go — whoever did this may still be nearby" → `vera_death_aftermath` | gating: none | effects: vera_dead: true, evidence +2 | consumable: N
NPCs present: Vera Doss

---

### Scene: `vera_wait_morning`
Purpose: Frank arrives in the morning. Vera is dead. The house has been searched — not ransacked, methodical. The file is gone. Someone got there first.
Choices:
- "Check the scene — see if they missed anything" → `vera_missed_clue` | gating: none | effects: vera_dead: true | consumable: N
- "Get out — the police will be here soon and you don't want to explain yourself" → `vera_death_aftermath` | gating: none | effects: vera_dead: true | consumable: N
NPCs present: none (Vera's body present, no living NPCs)

---

### Scene: `vera_missed_clue`
Purpose: They were thorough. But Frank finds one thing — a scrap of paper in a coat pocket they didn't check, the word "Aldwick" and a number: an address. Not nothing. But not the full file.
Choices:
- "Take it and leave" → `vera_death_aftermath` | gating: none | effects: evidence +1 | consumable: N
NPCs present: none

---

### Scene: `vera_death_aftermath`
Purpose: Frank stands outside. A dead client. A dead husband still missing. A file either in his hands or gone. This is no longer a missing-persons case.
Choices:
- "Go back to the office and think" → `beat5_entry` | gating: none | effects: none | consumable: N
NPCs present: none

---

## Beat 5 — The Weight of It

### Scene: `beat5_entry`
Purpose: Frank alone. The case lays itself out in his mind. He can see the shape of it now — not the details, but the shape. Big. Municipal. And he's the only one looking at it.
Choices:
- "Go over everything — what does it add up to?" → `beat5_reckoning` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `beat5_reckoning`
Purpose: Frank takes stock. Vera hired him. Vera is dead. Ray found something wrong in the city's survey records. The police wrote a report and lost interest. The men who did this have the police. The only question left is whether Frank is going to be the person who keeps looking.
Choices:
- "Walk away — you don't have a client, you don't have an obligation, and the city is telling you clearly to stop" → `walk_away_ending` | gating: none | effects: none | consumable: N
- "Stay in — Vera paid for the truth, and she's paid more than the retainer now" → `act2_entry_standard` | gating: none | effects: none | consumable: N
- "Stay in — you were a cop once. You know what happens to cases that nobody pushes" → `act2_entry_standard` | (convergent with above — same destination, different Frank register: civic duty vs. survivor guilt) | gating: none | effects: none | consumable: N
- "Stay in — whoever killed Vera made this personal" → `act2_entry_standard` | (convergent — same destination; personal-anger framing vs. duty framing) | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `walk_away_ending`
Purpose: Frank takes his name off the case in his own head. Vera is dead. So is Ray, probably. The police will find a cause of death that satisfies a report. Frank pours himself a drink and tries to remember how to not think about it. He can't.
Choices:
- "Leave town — there's nothing left in Harmon City for a man who knows too much and not enough" → `ending_bury_early` | gating: none | effects: none | consumable: N
- "Stay, but stay out of it — you know what you know. Keep it." → `ending_bury_early` | (convergent with above — same ending, different flavour: leave vs. stay silent) | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `ending_bury_early`
Purpose: Bury It ending, early variant. Frank didn't know what he was leaving behind. The city keeps smiling. Low-guilt version — he didn't have enough to act, and he knew it.
Choices: [] — end state
NPCs present: none

---

### Scene: `act2_entry_standard`
Purpose: Frank commits. He lays out what he has — thin evidence, some heat, a name in Aldwick, a missing ledger somewhere. It's enough to keep going. Not enough to finish. Act 2 begins.
Choices: [] — handoff to Act 2
NPCs present: none

---

## NPCs in this Act

- **Vera Doss** — first appears in `office_before`; dies in `vera_go_immediately` (immediate path) or `vera_wait_morning` (waiting path); present in `vera_call_check` and `vera_describe_follower` by phone. Central to Beats 1 and 4.
- **Peltz** — first appears in `legwork_survey_dept`; branches through `peltz_warm`, `peltz_pressed`, `peltz_watched`, `peltz_files_hint`, `peltz_aldwick_name`. Nervous coworker, key early witness. Does not recur in Act 2 — seen once and gone.
- **Supervisor** (unnamed) — background in `legwork_survey_dept`; briefly followed in `supervisor_follow`. Antagonist-adjacent; never named in Act 1; named in Act 2 when Frank finds his signature on the forged surveys.
- **Maisie** — counter girl, `legwork_lunch_counter` and branches. Minor NPC; local colour. Does not recur.
- **Hector** — Aldwick elder, `aldwick_elder_approach` and branches. Minor NPC; recurs in Act 2 as background colour when Frank returns to Aldwick.
- **Marta Gaines** — first appears in `aldwick_marta_intro`; key witness, primary Aldwick source. Recurs in Act 2 (Fork C) for the ledger location chain. Most important NPC after Vera in Act 1.
- **Records clerk** (unnamed) — `records_approach` and branches. Minor; does not recur.
