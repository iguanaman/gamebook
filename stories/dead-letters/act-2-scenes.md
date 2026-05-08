# Dead Letters — Act 2 Scenes

Scene-level breakdown of Beats 1–9 from `act-2.md`. Scene names are descriptive. Convergent groupings are marked. The Office hub is the spine; Aldwick is a secondary hub; the Records Room and Kellner conversation are conversation/visit hubs that consume themselves.

Entry routing: Act 1 Exit A–E feed `office_cold_open` (Beat 1). Exits B and D additionally route through `stairwell_warning` first (the early heat-bump), then drop into `office_cold_open`. Exit F never enters Act 2.

---

## Beat 1 — The Cold Trail

### Scene: `stairwell_warning` (Exit B/D entry only)
Purpose: A uniform on the stair landing as Frank comes up. Detective Costa, hat tipped back, toothpick. He has been waiting an hour. He calls Frank "Frankie" and explains, with a smile, that the Doss case is closed and that closed means closed.
Choices:
- "Take it. Nod. Pass him on the stair." → `office_cold_open` | gating: none | effects: `heat +1` | (convergent: composed)
- "Stop on the landing. Make him say it twice." → `office_cold_open` | effects: `heat +1`, `rep +1` (the neighbour across the hall hears and remembers) | (convergent: defiant)
- "Ask him whose errand he's running." → `office_cold_open` | effects: `heat +2`, `pushed_back: true` | (convergent: hard — costs heat, plants a flag the squeeze beat reads)
NPCs present: Detective Costa

### Scene: `office_cold_open`
Purpose: A week after the funeral. Vera's chair is empty. The retainer envelope is in the drawer. The key (or its absence — `ray_key_kept`) is in Frank's coat pocket. The slip with ALDWICK on it is under the desk lamp. The *Examiner* on the desk: two paragraphs, page eleven, "drowning."
Choices:
- "Read the *Examiner* paragraph again. Put it down. Decide where to start." → `cold_trail_pick` | gating: none | effects: none | (convergent: deliberate)
- "Pour one. Read it again. Decide tomorrow." → `cold_trail_pick` | effects: none | (convergent: tired — same destination, different posture)
- "Burn the clipping. Get up." → `cold_trail_pick` | effects: none | (convergent: angry)
NPCs present: none

### Scene: `cold_trail_pick`
Purpose: The three doors. Frank narrates them: the key (locksmiths, lockers, post boxes); Aldwick (the name on the slip — go there); the paper trail (the Engineer's Office, the records nobody locked). Each opens a different first thread. The hub is the *next* scene; this one is the entry decision so the player commits early.
Choices:
- "Chase the key first. Locksmiths and lockers." → `key_legwork` | gating: requires `ray_key_kept: true` | hide_if_failed: false (grey out — "Vera never gave you the key.") | effects: none
- "Take the streetcar to Aldwick. Stand in the street with the slip." → `aldwick_arrival` | effects: none
- "Go back to the Engineer's Office — this time after dark." → `engineer_after_hours_decision` | effects: none
- "Sit at the desk and write down everything you have. Then pick." → `office_hub` | effects: `frank_wrote_it_down: true` (only if not already set from Act 1 carry-over) | (convergent escape — kicks straight into the hub without committing to a thread)
NPCs present: none

### Scene: `key_legwork`
Purpose: An afternoon at three locksmiths and a post-office substation. Two say no. The third — an older Pole on Halsted — looks at the key and says "depot box. Public baths or the rail station. Not a house key." Frank narrows it without finding it.
Choices:
- "Check the public baths first." → `bath_locker_dead_end` | effects: `evidence +1` (a confirmed key class) | (convergent: methodical)
- "Check the rail station first." → weighted: `rail_locker_close` (2) / `rail_locker_tail` (1) | effects: `evidence +1` | (random: usually a locker that won't open without a number; sometimes a man across the platform watching)
- "File the lead. Take it to Aldwick — Marta might know which depot." → `office_hub` | effects: `key_narrowed: true` | (convergent: smart — closes the spoke, opens the Marta+key joint path in Beat 5)
NPCs present: locksmith (unnamed, ambient — single line, voiced by narrator description)

### Scene: `bath_locker_dead_end`
Purpose: The locker in the public baths Vera mentioned (red herring carried from Act 1 if `red_herring_locker: true`, otherwise discovered fresh). Inside: a clean shirt, a tin of shoe polish, a paperback. No notebook. Frank stands there longer than he needs to.
Choices:
- "Continue." → `office_hub` | effects: `bath_locker_checked: true` | (single-choice — committed dead end; the silence is the content)
NPCs present: none

### Scene: `rail_locker_close`
Purpose: Wall of brass doors. Frank's key fits the gauge but not any specific lock. He'd need a number. He files the corridor of doors as a possibility and leaves before the attendant decides to look at him too long.
Choices:
- "Continue." → `office_hub` | effects: `rail_locker_known: true` | (single-choice — the cache is here but Frank can't reach it without Marta's number)
NPCs present: rail attendant (unnamed, ambient — no spoken line)

### Scene: `rail_locker_tail`
Purpose: A man across the platform reading a paper he is not turning. Frank leaves by the south stair. The man does not follow. He doesn't have to.
Choices:
- "Continue." → `office_hub` | effects: `rail_locker_known: true`, `heat +1` | (single-choice — the watcher is the content)
NPCs present: a tail (silent, off-page — Salzano's man)

NPCs in Beat 1: Detective Costa (high-heat entry only), locksmith (ambient), rail attendant (ambient), Salzano's tail (silent).

---

## Beat 2 — The Office Hub (mid-act)

### Hub — `office_hub`
Purpose: Spoke between Aldwick, the Records Room, Kellner, and Mort. Visible state changes per flag: drawer with retainer; brick on the floor (after `heat >= 4`); note slid under door (after `cops_warned_off` upgrade); brown sedan visible from window (after first Aldwick or Records visit). Returns disappear as threads close. Auto-routes to Beat 6 (`squeeze_open`) when `heat >= 6` OR when two of the three primary threads are complete (`marta_talked` OR `aldwick_visited_act2: true`; `records_room` OR `voss_after_hours_visited: true`; `mort_called_back: true` OR `kellner_called: true`) AND the player attempts a fourth return.
Returns from: `aldwick_exit`, `records_room_exit`, `mort_visit_exit`, `kellner_diner_exit`, `key_legwork`, `bath_locker_dead_end`, `rail_locker_close`, `rail_locker_tail`.
Choices:
- "Take the streetcar to Aldwick." → `aldwick_arrival` | gating: requires `flags_unset: [aldwick_visited_act2]` | effects: none | consumable: Y (`aldwick_visited_act2: true` set on entry)
- "Return to Aldwick." → `aldwick_arrival` | gating: requires `aldwick_visited_act2: true` AND `flags_unset: [aldwick_revisit_done]` AND `heat < 6` | effects: none | consumable: Y (`aldwick_revisit_done: true` on entry)
- "Walk to the City Engineer's after dark." → `engineer_after_hours_decision` | gating: requires `flags_unset: [voss_after_hours_visited]` | effects: none | consumable: Y
- "Mort is at the door." → `mort_visit` | gating: requires `mort_owes_one: true` AND `flags_unset: [mort_called_back]` | hide_if_failed: false (grey out — "You haven't given him a reason to come.") | effects: none | consumable: Y
- "The phone is ringing — Kellner." → `kellner_phone` | gating: requires `flags_unset: [kellner_called]` AND (any one investigation beat done) | effects: none | consumable: Y (`kellner_called: true` set on entry; opens diner thread)
- "Kellner left a card. Meet him at the diner." → `kellner_diner` | gating: requires `kellner_called: true` AND `flags_unset: [kellner_met]` | effects: none | consumable: Y
- "Sit with what you have. Pour one." → `squeeze_open` | gating: requires (count of threads-completed >= 2) | effects: none | (the visible Beat 6 trigger; the hub also auto-routes here on `heat >= 6`)
Exit: forced auto-route to `squeeze_open` per conditions above.
NPCs present: none on hub face

NPCs in Beat 2 hub: none directly (each spoke handles its own).

---

## Beat 3 — Aldwick

### Scene: `aldwick_arrival`
Purpose: Frank steps off the streetcar at Lemoine and a wind that smells of plaster dust. Boards on three windows of the corner building. A surveyor's stake driven into a vacant lot where a house was last spring. A church hall halfway down the block with the door propped open and a lectern visible inside.
Choices:
- "Go to the church hall. The lectern means a meeting." → `church_hall_meeting` | gating: requires `flags_unset: [aldwick_visited_act2]` | effects: `aldwick_visited_act2: true`, `aldwick_visited: true` (retitled: physically been there) | (convergent: direct — first visit only)
- "Walk the block first. Read it before you speak." → `aldwick_walk` | effects: `aldwick_visited_act2: true`, `aldwick_visited: true` | (convergent: cautious)
- "Find the man on the porch with the folded paper in his pocket." → `reuben_porch` | gating: requires `aldwick_revisit_done: true` OR `marta_talked: true` | hide_if_failed: true | effects: none | (only on a return visit, after Marta has named him)
- "Stop at Lemoine and Tenth — the back porch where Ray was last seen." → `lemoine_porch` | gating: requires `marta_talked: true` | hide_if_failed: true | effects: none
NPCs present: ambient passersby (unnamed)

### Scene: `aldwick_walk`
Purpose: Frank walks the block before he opens his mouth. Counts the boards. Finds the surveyor's stake and the date stamped on the metal flag — three weeks before Ray died. On a high-heat playthrough (`heat >= 4`), the brown sedan from outside Vera's boarding house is parked at the corner.
Choices:
- "Pocket the stake's date as a number you'll remember. Go to the church hall." → `church_hall_meeting` | effects: `evidence +1` (the date predates the survey order) | (convergent: methodical)
- "Knock on the first boarded door. See who opens." → weighted: `boarded_door_old_woman` (3) / `boarded_door_nobody` (2) | effects: none | (random — sometimes an answer, often nothing)
- "Cross the street and look at the brown sedan plate." → `sedan_plate` | gating: requires `heat >= 4` | hide_if_failed: true | effects: `heat +1`, `evidence +1` (a plate Frank can run later through Quint or Mort)
- "Go straight to the church hall. The walk has told you enough." → `church_hall_meeting` | effects: none | (convergent: enough)
NPCs present: brown-sedan driver (silent, off-page, not casted)

### Scene: `boarded_door_old_woman`
Purpose: An older woman opens two inches of door. Won't give her name. Won't take Frank's. Tells him the surveyor came on a Tuesday and the man with the scar came on a Thursday and she has nothing else to say. Closes the door before Frank's mouth opens for the next question.
Choices:
- "Continue." → `church_hall_meeting` | effects: `evidence +1` (Salzano was canvassing Aldwick before Ray died) | (single-choice — pacing; the door closing is the content)
NPCs present: old woman (unnamed, ambient — single line, voiced by narrator description)

### Scene: `boarded_door_nobody`
Purpose: The board is over the door for a reason. Frank stands on the stoop a beat too long. The wind shifts.
Choices:
- "Continue." → `church_hall_meeting` | effects: none | (single-choice — atmosphere)
NPCs present: none

### Scene: `sedan_plate`
Purpose: Frank crosses casually. The driver is asleep or pretending. The plate is municipal — ending in 4-7-2. Frank has the number and the certainty that he should not have crossed the street.
Choices:
- "Continue." → `church_hall_meeting` | effects: `sedan_plate_known: true` | (single-choice — the number is the content; cashed in later if Frank can run it)
NPCs present: driver (silent, off-page)

### Scene: `church_hall_meeting`
Purpose: A meeting in progress: chairs in a half-circle, a coffee urn, twenty residents of three different ages who all look up when Frank's shadow falls in the doorway. Marta Gaines at the lectern with her exercise book. Pastor Briggs at the back wall with a folding chair he hasn't sat in.
Choices:
- "Introduce yourself plainly: Frank Cady, private detective, asking after a city surveyor named Doss." → `marta_intro_honest` | effects: none | (convergent: clean)
- "Lead with Vera — say her name; you were hired by his wife." → `marta_intro_vera` | gating: requires `vera_trusted_frank: true` | hide_if_failed: false (grey out — "You don't have the standing to use her name here.") | effects: none
- "Pretend to be a cop. They're more likely to talk to a badge." → `marta_intro_cop` | effects: `aldwick_lied_cop: true` (consumable shading flag — discovered later in Beat 5 if Marta checks; rep penalty there) | (red herring — looks like the bold play, costs you Marta's full account)
- "Stand at the back. Listen. Speak after the meeting." → `marta_intro_listen` | effects: `rep +1` | (convergent: respectful — earns a small standing)
NPCs present: Marta Gaines, Pastor Lemuel Briggs, ambient residents

### Scene: `marta_intro_honest`
Purpose: Marta lets him finish. Doesn't sit. Asks two questions: who hired him and who paid him. Frank answers. She nods once and tells him to come to her kitchen after the meeting if he wants the whole answer.
Choices:
- "Wait through the meeting. Take a chair." → `marta_kitchen` | effects: `rep +1` | (convergent: patient)
- "Step outside. Smoke. Come back." → `marta_kitchen` | effects: none | (convergent: restless)
- "Ask the room a question while you have it." → `marta_room_question` | effects: `heat +1` (the wrong ear hears) | (convergent: bold — risk)
NPCs present: Marta Gaines, Pastor Lemuel Briggs

### Scene: `marta_intro_vera`
Purpose: Marta hears Vera's name. Stops. The room stops. Marta says, "She came to a meeting in March. Sat where you're standing." She gives Frank her kitchen address before the meeting ends.
Choices:
- "Continue." → `marta_kitchen` | effects: `rep +2`, `evidence +1` (Vera was already organising before Ray died — connects the dots) | (single-choice — the recognition is the content)
NPCs present: Marta Gaines

### Scene: `marta_intro_cop`
Purpose: Frank says "I'm with the department" and the room cools. Marta does not call him on it. She tells him politely she has nothing to say and turns back to the lectern. The pastor walks Frank to the door without saying a word.
Choices:
- "Apologise on the way out. Salvage what you can." → `aldwick_exit` | effects: `aldwick_lied_cop: true`, `rep -2` | (convergent: rueful — the lie still costs)
- "Walk out without explaining. Try again on a return visit." → `aldwick_exit` | effects: `aldwick_lied_cop: true`, `rep -1` | (convergent: cool — same cost, different framing)
- "Drop the bluff publicly: 'I lied. I'm a private man hired by a dead woman.'" → `marta_kitchen` | effects: `aldwick_lied_cop: true`, `rep -1` | (convergent: redemptive — costs rep but salvages the kitchen)
NPCs present: Marta Gaines, Pastor Lemuel Briggs

### Scene: `marta_intro_listen`
Purpose: Frank takes a chair at the back. The meeting is about a condemnation order Reuben Gaines was served — Marta's brother. Reuben does not speak; Marta speaks for him. Frank watches the room watch Marta.
Choices:
- "Stay through to the end. Approach Marta after." → `marta_kitchen` | effects: `evidence +1` (the condemnation timeline matches the rezoning Frank suspects) | (convergent: present)
- "Stand and offer help — say what you do, what you've found." → `marta_kitchen` | effects: `rep +1`, `heat +1` | (convergent: declared)
- "Slip out before it ends. Catch Marta on the steps." → `marta_kitchen` | effects: none | (convergent: low-key)
NPCs present: Marta Gaines, Pastor Lemuel Briggs, Reuben Gaines (silent, in the room), ambient residents

### Scene: `marta_room_question`
Purpose: Frank asks the room when they last saw a man in a suit too good for the building. A woman raises her hand and is hushed. The pastor coughs. Marta watches Frank do it and re-evaluates whether he is useful or a liability.
Choices:
- "Continue." → `marta_kitchen` | effects: `evidence +1` (Salzano canvassing Aldwick), `rep -1` (Marta marks Frank as someone who uses people) | (single-choice — committed cost)
NPCs present: Marta Gaines, Pastor Lemuel Briggs, ambient residents

### Scene: `marta_kitchen`
Purpose: Marta's kitchen. Coffee on the stove. The exercise book on the table — names of evicted neighbours, dates ruled in pencil. Reuben at the back door pretending to read the paper. Marta will or will not give Frank the whole account; the rep gate decides.
Choices:
- "Tell her about Ray's notebook — what you suspect he kept." → `marta_full_account` | gating: requires `rep >= 5` AND `flags_unset: [aldwick_lied_cop]` | hide_if_failed: false (grey out — "She doesn't trust you that much. Not yet.") | effects: none
- "Ask about the back porch on Lemoine — was Ray there the night he died?" → `marta_partial` | gating: requires `rep >= 3` | hide_if_failed: false | effects: none
- "Show her the key. Ask if she knows the depot." → `marta_key_thread` | gating: requires `ray_key_kept: true` AND `rep >= 4` | hide_if_failed: false | effects: none
- "Ask about Reuben — what was on his condemnation notice." → `marta_reuben` | effects: `evidence +1` (the timeline of the rezoning order is now in Frank's notes) | (always available)
- "Apologise for the lie at the meeting and ask her to start him over." → `marta_apology` | gating: requires `aldwick_lied_cop: true` AND `flags_unset: [aldwick_apologised]` | effects: `aldwick_apologised: true`, `rep +1` | consumable: Y
- "Thank her for the coffee. Leave." → `aldwick_exit` | effects: none | (always-available walk-away)
NPCs present: Marta Gaines, Reuben Gaines

### Scene: `marta_full_account`
Purpose: Marta opens the exercise book. Reads dates. Names a back room of a closed garage on Lemoine — the place Ray asked her to keep an eye on, "if anything happened." Gives Frank the address and the man who has the side-door key.
Choices:
- "Take it down. Promise her you won't burn the address into the wrong notebook." → `aldwick_exit` | effects: `marta_talked: true`, `evidence +2`, `rep +1` | (convergent: respectful)
- "Take it down. Don't promise anything you can't keep." → `aldwick_exit` | effects: `marta_talked: true`, `evidence +2` | (convergent: honest)
- "Tell her: if I don't come back, this address goes to a journalist named Reyes." → `aldwick_exit` | effects: `marta_talked: true`, `evidence +2`, `rep +1`, `marta_warned: true` (small Act 3 dividend — Marta will reach Dora if Frank doesn't) | (convergent: insurance)
NPCs present: Marta Gaines, Reuben Gaines

### Scene: `marta_partial`
Purpose: Marta gives Frank the back porch on Lemoine and the night Ray was there — but not what he was carrying or who he met. She holds back the cache. Frank can feel it.
Choices:
- "Press her once more — kindly." → weighted: `marta_full_account` (1) / `marta_holds` (3) | effects: none | (random — usually she holds; rarely the press lands)
- "Take what she gave you. Leave." → `aldwick_exit` | effects: `evidence +1`, `marta_partial_account: true` | (convergent: take it)
- "Tell her what you saw at the boarding house. Earn the rest." → `aldwick_exit` | gating: requires `vera_warned: true` OR `vera_trusted_frank: true` | effects: `marta_talked: true`, `evidence +2` | (the right earn — converts partial to full)
NPCs present: Marta Gaines

### Scene: `marta_holds`
Purpose: Marta closes the exercise book. "That's what I have for you today." She pours him a second coffee he doesn't drink.
Choices:
- "Continue." → `aldwick_exit` | effects: `marta_partial_account: true` | (single-choice — committed; return visit may improve)
NPCs present: Marta Gaines

### Scene: `marta_key_thread`
Purpose: Marta looks at the key. Doesn't take it from Frank's hand. "Ray had a depot box at the rail station. East-side wall, third row up. Number forty-one."
Choices:
- "Thank her. Note the number." → `aldwick_exit` | effects: `key_number_known: true`, `evidence +1` | (convergent: simple)
- "Ask why she knows it." → `aldwick_exit` | effects: `key_number_known: true`, `evidence +1`, `rep +1` (she tells him: Ray gave her the number two weeks before he died, "in case") | (convergent: curious)
- "Tell her you'll bring back what's in it. Or what's left of it." → `aldwick_exit` | effects: `key_number_known: true`, `evidence +1` | (convergent: promise)
NPCs present: Marta Gaines, Reuben Gaines

### Scene: `marta_reuben`
Purpose: Marta calls Reuben to the table. He unfolds the condemnation notice. The date is six weeks before Ray's last filed survey of Aldwick's east side. The order predates the survey it cites.
Choices:
- "Note the dates. Ask Reuben if you can keep the notice." → weighted: `reuben_keeps` (2) / `reuben_gives` (3) | effects: `evidence +1` | (random — Reuben usually gives it; sometimes won't part with it)
- "Note the dates. Don't take the paper. Reuben needs it for the hearing." → `marta_kitchen` | effects: `evidence +1`, `rep +1` (Marta marks the kindness) | (convergent: protective — returns to hub for another topic)
- "Ask Reuben directly: was he visited by a man with a scar." → `marta_kitchen` | effects: `evidence +1` (Reuben says yes, last Tuesday) | (convergent: blunt)
NPCs present: Marta Gaines, Reuben Gaines

### Scene: `reuben_keeps`
Purpose: Reuben folds the notice back into his pocket. "I need it Friday."
Choices:
- "Continue." → `marta_kitchen` | effects: none | (single-choice — narrative — Reuben keeps the document)
NPCs present: Reuben Gaines, Marta Gaines

### Scene: `reuben_gives`
Purpose: Reuben slides the notice across. "Bring it back when you're done."
Choices:
- "Continue." → `marta_kitchen` | effects: `condemnation_notice_taken: true`, `evidence +1` | (single-choice — Frank now carries the paper; small Beat 5 callback)
NPCs present: Reuben Gaines, Marta Gaines

### Scene: `marta_apology`
Purpose: Frank says it plain: he lied at the meeting. Why. To whom. Marta listens. Asks what he wants her to do with the apology. He says nothing. She nods.
Choices:
- "Continue." → `marta_kitchen` | effects: `aldwick_apologised: true`, `rep +1` | (single-choice — committed; the rep gate may now flip in real time)
NPCs present: Marta Gaines

### Scene: `lemoine_porch` (revisit thread)
Purpose: The back porch on Lemoine where Ray was last seen alive. A neighbour two doors down saw him arrive with another man — tall, English in his vowels, a scar — and not leave. Frank stands on the step. The neighbour will not give a name and will not be quoted.
Choices:
- "Note it. Walk back to Marta's." → `aldwick_exit` | effects: `evidence +1` | (convergent)
- "Ask the neighbour to come to the church hall and say it where Marta can hear." → weighted: `neighbour_comes` (1) / `neighbour_refuses` (3) | effects: none | (random — usually refuses)
- "Stand on the porch a beat too long. See who comes to the window across the street." → `aldwick_exit` | effects: `heat +1`, `evidence +1` (a face Frank can match later) | (convergent: defiant)
NPCs present: neighbour (unnamed, ambient — single line)

### Scene: `neighbour_comes`
Purpose: The neighbour follows Frank back to the church hall and tells Marta what she saw. Marta writes it in the book.
Choices:
- "Continue." → `aldwick_exit` | effects: `evidence +1`, `rep +1` | (single-choice — small win)
NPCs present: neighbour (unnamed), Marta Gaines

### Scene: `neighbour_refuses`
Purpose: She closes the door before Frank's mouth opens for the next sentence.
Choices:
- "Continue." → `aldwick_exit` | effects: none | (single-choice — committed)
NPCs present: neighbour (unnamed)

### Scene: `reuben_porch` (revisit only)
Purpose: A return visit. Reuben on his porch, the door behind him standing open. He won't say where Marta is. The exercise book is not on the kitchen table. Frank can see that from the street.
Choices:
- "Push past him into the kitchen." → `aldwick_revisit_squeeze` | effects: `heat +1`, `rep -1` | (convergent: hard)
- "Stand on the porch. Wait until he speaks." → weighted: `reuben_speaks` (2) / `reuben_silent` (3) | effects: none | (random)
- "Walk away. Give him the courtesy." → `aldwick_exit` | effects: none | (convergent: protective)
NPCs present: Reuben Gaines

### Scene: `reuben_speaks`
Purpose: Reuben tells Frank, half-sentence, that Marta has gone to her cousin's in Detroit for a week. He does not say why. Frank knows why.
Choices:
- "Continue." → `aldwick_exit` | effects: `evidence +1` (the squeeze has reached Aldwick), `marta_safe: true` (Beat 6 narrative shading: Marta is alive) | (single-choice — relief and a wound)
NPCs present: Reuben Gaines

### Scene: `reuben_silent`
Purpose: He does not speak. He watches Frank to the streetcar.
Choices:
- "Continue." → `aldwick_exit` | effects: none | (single-choice — committed; the silence is the wound)
NPCs present: Reuben Gaines

### Scene: `aldwick_revisit_squeeze`
Purpose: Frank in Marta's kitchen. The exercise book is gone. The condemnation notice is on the table, folded. Reuben in the doorway. There is nothing here for Frank to take that does not cost Reuben more.
Choices:
- "Apologise. Walk out the way you came." → `aldwick_exit` | effects: `rep -1` (the apology does not undo the entry) | (convergent)
- "Take the condemnation notice. Reuben can ask for it back." → `aldwick_exit` | effects: `condemnation_notice_taken: true`, `evidence +1`, `rep -2` | (convergent: cold — costs the relationship for a paper)
- "Leave the notice. Leave the kitchen. Don't come back." → `aldwick_exit` | effects: `aldwick_burned: true` (locks return visits and locks Aldwick path) | (the deliberate close-off — locks content)
NPCs present: Reuben Gaines

### Scene: `aldwick_exit`
Purpose: Frank on the streetcar back. The lights of Aldwick going dark behind him as the line crosses the bridge. He has, or has not, the address of the cache.
Choices:
- "Back to the office." → `office_hub` | effects: none | (single-choice — closes the spoke)
NPCs present: none

NPCs in Beat 3: Marta Gaines, Pastor Lemuel Briggs, Reuben Gaines, ambient residents and neighbours, brown-sedan driver (silent).

---

## Beat 4 — The Records Room

### Scene: `engineer_after_hours_decision`
Purpose: Frank outside the City Engineer's building at half past nine. Janitor's window lit on the ground floor. Voss's office on the third floor — dark. Front door locked; the side door has a bell pull and a man behind it with a folded racing form.
Choices:
- "Pay the janitor. Ten dollars and a friendly face." → `records_janitor` | gating: requires `rep >= 4` (the working-class side of town has heard of Frank) | hide_if_failed: false (grey out — "He doesn't know your name well enough yet.") | effects: `heat +1` (a witness), `evidence_path: janitor`
- "Use Mort's press badge." → `records_press_badge` | gating: requires `mort_owes_one: true` AND `flags_unset: [press_badge_used]` | effects: `mort_owes_one: false`, `press_badge_used: true`, `evidence_path: press` | consumable: Y (Mort can only lend it once)
- "Break in through the alley window." → `records_break_in` | effects: `heat +2`, `records_room: true`, `evidence_path: break_in` | consumable: Y (`flags_unset: [records_room]` required; hide_if_failed: true after taken)
- "Walk away. The records will keep." → `office_hub` | effects: `voss_after_hours_visited: true` (you were here; the building knows it) | (convergent: cautious — closes the spoke, no gain)
NPCs present: floor janitor (visible from the window), unseen building staff

### Scene: `records_janitor`
Purpose: The janitor takes the bill, doesn't count it, looks Frank in the face long enough to remember it. Tells him third floor, last office, mind the wax in the corridor. Locks the side door behind him. Frank is alone in the building.
Choices:
- "Continue to the records corridor." → `records_corridor` | effects: `voss_after_hours_visited: true` | (single-choice — committed entry)
NPCs present: floor janitor

### Scene: `records_press_badge`
Purpose: The bell pull, the badge held up. The janitor reads it twice. "Mort's boy." Lets Frank in without a bill. Tells him third floor, last office. Watches him go up.
Choices:
- "Continue to the records corridor." → `records_corridor` | effects: `voss_after_hours_visited: true` | (single-choice — committed)
NPCs present: floor janitor

### Scene: `records_break_in`
Purpose: The alley window, a half-inch of give in the sash, a knee on the sill. A wire of pain in Frank's lower back as he comes through. He drops onto a desk that wasn't there last time. Twenty feet to the corridor.
Choices:
- "Continue to the records corridor." → `records_corridor` | effects: `voss_after_hours_visited: true` | (single-choice — committed)
NPCs present: none

### Scene: `records_corridor`
Purpose: Third floor. The corridor smells of floor wax. Voss's office at the far end. The records room two doors short of it. Frank can hear, faintly, a voice on a telephone in another office. Salzano. Not yet.
Choices:
- "Pick the records room lock." → `records_inside` | effects: none | (convergent: methodical)
- "Try the door first — in case it's open." → weighted: `records_inside` (3) / `records_inside_unlocked` (1) | effects: none | (random — sometimes already open, which is its own warning)
- "Stop. Listen for the voice. Place it." → `records_listening` | effects: `evidence +1` (Frank places Salzano's voice in the building) | (convergent: cautious — costs time, gains a fact)
NPCs present: Salzano (off-page, on phone)

### Scene: `records_listening`
Purpose: Frank with his ear to the wall of an office two doors short of the records room. Salzano on a phone, voice not raised, listing names and dates. Frank counts three he recognises before the call ends.
Choices:
- "Continue to the records room." → `records_inside` | effects: `evidence +1`, `salzano_named: true` (Frank now knows the man with the scar has a name) | (single-choice — committed)
NPCs present: Salzano (off-page)

### Scene: `records_inside`
Purpose: The records room. Cabinets along three walls, a desk lamp, a green-shaded reading lamp, a smell of old paper and the man who handles it. Aldwick's parcel files in the third cabinet. A locked drawer at the bottom. Frank has perhaps fifteen minutes.
Choices:
- "Take the matched-signature pages — the falsified ones." → `records_take_signatures` | effects: `evidence +2`, `records_room: true` | (convergent: legal-minded — paper that proves the lie)
- "Take the boundary maps — the real survey vs the filed one." → `records_take_maps` | effects: `evidence +2`, `records_room: true` | (convergent: physical — paper that proves the theft)
- "Take both. Risk the time." → weighted: `records_clean_exit` (2) / `records_corridor_intercept` (3) | effects: `evidence +3`, `records_room: true`, `heat +2` | (random — riskier; usually Salzano in the corridor)
- "Photograph the pages with the desk lamp. Leave the originals." → `records_photograph` | effects: `evidence +1`, `records_room: true`, `heat +1` (camera click is loud in the building) | (convergent: forensic — slower, less heat than break-in but still flagged)
- "Read Voss's note in his handwriting on the desk — don't take it." → `records_voss_note` | effects: `evidence +1`, `kellner_named_by_voss: true` (the note names Walt Kellner) | (always available — does not flag `records_room` by itself; the player can take this and bail)
NPCs present: Salzano (off-page until intercept), Voss (absent — note in handwriting only)

### Scene: `records_inside_unlocked`
Purpose: The door is already open. Two of the cabinet drawers are out of true, the way drawers sit when someone has been in them an hour ago. Frank's hand on his coat pocket where the gun isn't.
Choices:
- "Take what's still there. Faster than planned." → `records_take_signatures` | effects: `heat +1` | (convergent: rushed)
- "Don't take anything. Just look. Memorise." → `records_voss_note` | effects: `evidence +1` (the empty drawers are themselves evidence — someone is sterilising the file) | (convergent: witness)
- "Back out. The room is a trap." → `records_corridor_exit` | effects: none | (convergent: cautious)
NPCs present: none (whoever has been here is gone)

### Scene: `records_take_signatures`
Purpose: Frank rolls the pages tight. Pockets them. The lamp clicks off as a courtesy he doesn't need to give. The corridor at the door.
Choices:
- "Walk out the way you came." → `records_corridor_exit` | effects: none | (convergent: clean)
- "Walk out past Voss's office. Slip the door open. Look at the desk." → `records_voss_note` | effects: none | (convergent: bold — adds a fact)
- "Walk out past the office Salzano was on the phone in. See if he's still there." → `records_corridor_intercept` | effects: `heat +2` | (convergent: stupid — risk for a face-confirmation)
NPCs present: none in the room

### Scene: `records_take_maps`
Purpose: The boundary maps in a tube. Heavier than they look. Frank slings the tube across his shoulder under the coat. The lamp off.
Choices:
- "Walk out the way you came." → `records_corridor_exit` | effects: none | (convergent: clean)
- "Walk out past Voss's office. Read the desk." → `records_voss_note` | effects: none | (convergent: bold)
- "Walk out past the phone office. See if Salzano is still there." → `records_corridor_intercept` | effects: `heat +2` | (convergent: stupid)
NPCs present: none in the room

### Scene: `records_photograph`
Purpose: Frank with a borrowed Leica, camera on the desk, copying the matched-signature pages page by page. The shutter is louder than he wanted. He counts to forty. Doesn't reach forty.
Choices:
- "Finish the roll. Run." → weighted: `records_clean_exit` (2) / `records_corridor_intercept` (3) | effects: `evidence +2` | (random — heat tilts the dice)
- "Stop at twelve. Pocket the camera. Walk." → `records_corridor_exit` | effects: none | (convergent: discipline — accepts the smaller take)
NPCs present: Salzano (off-page)

### Scene: `records_voss_note`
Purpose: A loose page on Voss's desk in his own handwriting. Three lines. Two are accounting. The third is Walt Kellner's name and a phone number Frank does not recognise. Frank does not take the page. He memorises the number.
Choices:
- "Continue to the corridor." → `records_corridor_exit` | effects: `kellner_named_by_voss: true`, `evidence +1` | (single-choice — the note is the content; cannot be safely taken)
NPCs present: Voss (absent — handwriting only)

### Scene: `records_corridor_intercept`
Purpose: Salzano in the corridor. He does not raise his voice. He does not need to. There is a man behind him in the stairwell. The records room door is open behind Frank.
Choices:
- "Drop what you're carrying. Hands visible. Talk your way out." → `salzano_offer` | effects: none | (convergent: surrender — opens the squeeze early)
- "Run for the alley window." → weighted: `records_alley_escape` (2) / `records_stairwell_death` (1) | gating: requires `rep > 3` OR `heat < 6` | hide_if_failed: false (grey out — "Heat and rep both wrong; he doesn't run from this.") | effects: `heat +2` | (random — heat/rep tilts the dice)
- "Run the front stair anyway." → `records_stairwell_death` | gating: requires `heat >= 6` AND `rep <= 3` | hide_if_failed: true | effects: none | (the lethal off-ramp — only available when conditions guarantee death; hidden so it doesn't read as a choice)
NPCs present: Salzano, second man (silent)

### Scene: `records_alley_escape`
Purpose: Frank through the window, hand torn on the sash, pages and maps held against his ribs. He hits the alley running. Loses Salzano at the corner of Court and Ninth. Loses some skin. Keeps the file.
Choices:
- "Continue." → `records_room_exit` | effects: `heat +2`, `cops_warned_off: true` | (single-choice — committed escape)
NPCs present: Salzano (off-page)

### Scene: `records_stairwell_death`
Purpose: Salzano on the landing. The second man behind Frank. There is no version of the stair where Frank reaches the lobby. Frank's last thought is that Voss polished the lenses for nothing.
Choices: [] (terminal — Pavement off-ramp variant; Act 2 hard fail)
NPCs present: Salzano, second man (silent)

### Scene: `records_clean_exit`
Purpose: Frank in the alley with the file. Streetcar three blocks away. Cigarette unlit because the match would shake. He makes it to the kerb before he laughs once, badly.
Choices:
- "Continue." → `records_room_exit` | effects: none | (single-choice — committed)
NPCs present: none

### Scene: `records_corridor_exit`
Purpose: Down the corridor, the back stair, the side door past the janitor. The janitor does not look up from the racing form.
Choices:
- "Continue." → `records_room_exit` | effects: none | (single-choice — clean exit)
NPCs present: floor janitor

### Scene: `salzano_offer`
Purpose: Salzano with his hands in his coat pockets, at peace. "Mr. Cady. Hand me the file. Walk out by way of the front door. There is a job at a small shipping office in San Diego that comes with a flat above it. We will have your things sent." The first time the conspiracy speaks to Frank by name.
Choices:
- "Hand him the file. Walk out the front door. Take the train." → `act_2_bury_it_early` (terminal — Bury It mid-Act-2 variant) | effects: none | (the bought-off ending — terminal)
- "Hand him the file. Walk out. Don't take the train." → `records_room_exit` | effects: `heat +2`, `cops_warned_off: true`, `evidence -2` (Frank loses what he just took), `pushed_back: false` | (convergent: cosmetic compliance — keeps the case alive without the paper)
- "Refuse. Throw the pages over his shoulder down the stairwell." → weighted: `records_alley_escape` (2) / `records_stairwell_death` (2) | gating: requires `rep >= 4` | effects: `pushed_back: true`, `heat +2` | (random — bold; gets you out half the time)
- "Refuse politely. Talk." → weighted: `records_alley_escape` (1) / `records_stairwell_death` (3) | effects: `heat +2` | (the wrong move — Salzano is not here to talk)
NPCs present: Salzano

### Scene: `records_room_exit`
Purpose: Frank on the streetcar with the file (or without it, or with the camera in his coat). The window reflects a man who has stolen something he wasn't supposed to know existed.
Choices:
- "Back to the office." → `office_hub` | effects: none | (single-choice — closes the spoke)
NPCs present: none

### Scene: `act_2_bury_it_early`
Purpose: Mid-Act-2 terminal Bury It variant. Frank takes the train. San Diego. The flat above the shipping office. He reads about Aldwick in a wire piece three months later and does not write a letter to the editor.
Choices: [] (terminal — Bury It coda, mid-Act-2 variant)
NPCs present: none on screen (Salzano off-page)

NPCs in Beat 4: floor janitor, Salzano, second man (silent), Voss (absent — handwriting only).

---

## Beat 5 — The Ledger

Entry: Frank reaches this beat from `marta_full_account` (`marta_talked: true` — knows the back-room garage on Lemoine) OR from `marta_key_thread` (`key_number_known: true` — knows the rail station box) OR from `key_legwork` if `rail_locker_known: true` AND `key_number_known: true` were both set during separate threads. If neither route is reached by the time the hub auto-routes to Beat 6, `found_ledger` stays false and Beat 5 is skipped.

The ledger fork is reached via a routing scene.

### Scene: `ledger_route`
Purpose: Frank at the office desk with the address (or the locker number) on a slip of paper in his hand. The route Marta drew, or the number she gave him. He goes alone.
Choices:
- "Take the streetcar to Lemoine. The back room of the garage." → `garage_back_room` | gating: requires `marta_talked: true` AND `flags_unset: [found_ledger]` | effects: none
- "Take the cab to the rail station. Locker forty-one." → `rail_locker_open` | gating: requires `key_number_known: true` AND `ray_key_kept: true` AND `flags_unset: [found_ledger]` | effects: none
- "Wait until tomorrow. Sleep on it." → `office_hub` | effects: `heat +1` (the city does not wait), `ledger_delayed: true` | (convergent: cautious — costs time, opens a re-entry to ledger_route on the next hub return)
NPCs present: none

### Scene: `garage_back_room`
Purpose: A closed garage on Lemoine. The side-door key Marta named hangs in the workshop next door — a man missing two fingers hands it over without a word and goes back to his coffee. Inside the back room: a tool chest, a pile of canvas tarps, a loose floorboard. Under it: the notebook.
Choices:
- "Take the whole notebook." → `ledger_inspect_take` | effects: `found_ledger: true`, `evidence +3`, `heat +2` | (convergent: fast — the city's most-wanted object is now in Frank's coat)
- "Photograph the pages here. Leave the original." → `ledger_inspect_photo` | effects: `found_ledger: true`, `evidence +2`, `ledger_left_in_place: true` | (convergent: forensic)
- "Read it through once before deciding." → `ledger_read_then_decide` | effects: none | (convergent: cautious — opens both sub-options after reading)
NPCs present: man at the workshop (unnamed, ambient — single line)

### Scene: `rail_locker_open`
Purpose: The wall of brass doors. Locker forty-one. The key turns. Inside: a soft leather-bound notebook the size of a hand. Names. Account numbers. The mayor's brother. Halston Thorne. Dates.
Choices:
- "Take it. Pocket the key." → `ledger_inspect_take` | effects: `found_ledger: true`, `evidence +3`, `heat +1` | (convergent: take)
- "Photograph the pages on a bench in the men's washroom. Put it back." → `ledger_inspect_photo` | effects: `found_ledger: true`, `evidence +2`, `ledger_left_in_place: true` | (convergent: replace)
- "Read it once before deciding what to do." → `ledger_read_then_decide` | effects: none | (convergent: cautious)
NPCs present: ambient station traffic

### Scene: `ledger_read_then_decide`
Purpose: Frank reads the first ten pages standing up. The names line up. Halston Thorne, three columns over from Aldwick parcel numbers, four columns over from payment dates. Walt Kellner's name is in the margin twice — both times in pencil, both times underlined.
Choices:
- "Take the notebook. The risk is the cost of having the case." → `ledger_inspect_take` | effects: `found_ledger: true`, `evidence +3`, `heat +1`, `kellner_in_ledger: true` | (convergent: take — adds the Kellner shading)
- "Photograph it. Leave it. Have both versions." → `ledger_inspect_photo` | effects: `found_ledger: true`, `evidence +2`, `ledger_left_in_place: true`, `kellner_in_ledger: true` | (convergent: forensic)
- "Tear out the Kellner pages. Take only those. Leave the rest." → `ledger_inspect_partial` | effects: `found_ledger: true`, `evidence +2`, `kellner_in_ledger: true`, `ledger_partial: true` | (convergent: surgical — a wound; the rest of the case loses some weight)
NPCs present: none on page

### Scene: `ledger_inspect_take`
Purpose: Frank with the notebook against his ribs, in the streetcar back to the office. Counts the stops. Counts the men in the car who have looked at him twice.
Choices:
- "Continue." → `ledger_carry_back` | effects: none | (single-choice — committed)
NPCs present: ambient streetcar passengers

### Scene: `ledger_inspect_photo`
Purpose: Camera in the washroom, the notebook on the porcelain rim. Twelve pages. Frank's hand is steady; he has surprised himself. He puts the book back, locks the door, leaves the key on top of the locker for Marta to retrieve later if she chooses.
Choices:
- "Continue." → `ledger_carry_back` | effects: none | (single-choice — committed)
NPCs present: none

### Scene: `ledger_inspect_partial`
Purpose: Frank tears the two pages naming Kellner. Folds them small. Puts the notebook back. Closes the locker. The smaller move reads, in retrospect, as the wrong move; Frank does not know yet why.
Choices:
- "Continue." → `ledger_carry_back` | effects: none | (single-choice — committed)
NPCs present: none

### Scene: `ledger_carry_back`
Purpose: Frank in his office at midnight. The notebook (or the photographs, or the two torn pages) under the lamp. The retainer envelope, still unopened, in the drawer. Vera's chair empty. Whatever else this case is, it is now provable.
Choices:
- "Lock it in the office safe. Sleep." → `office_hub` | effects: none | (convergent: trust the building)
- "Take it home. Sleep with it under the mattress." → `office_hub` | effects: `ledger_at_home: true` (small Beat 9 callback — narrows the ambush options) | (convergent: trust the apartment)
- "Make a copy by hand. Tonight. Tomorrow's too late." → `office_hub` | effects: `evidence +1`, `ledger_handcopied: true` (separate from `left_package`; the handcopy is what Frank can mail in Beat 8) | (convergent: paranoid — costs time, gains insurance)
NPCs present: none

NPCs in Beat 5: ambient workshop man (single line), ambient streetcar/station passengers (no lines).

---

## Beat 6 — The Squeeze

### Scene: `squeeze_open`
Purpose: Forced transition. The form depends on path: Salzano in the office (`heat >= 6` OR `records_room: true`); Brennan on the kerb (`cops_warned_off: true` AND not records_room path); or Mort at the door white-faced (`mort_owes_one: true` AND `evidence_path: press`). Single entry scene routes to one of three variants.
Choices:
- "Open the door." → routed: `squeeze_salzano` (if `heat >= 6` OR `records_room: true`) | `squeeze_brennan` (else if `cops_warned_off: true`) | `squeeze_mort` (else if `mort_owes_one: true` OR `mort_called_back: true`) | `squeeze_brennan` (default fallback) | effects: none | (single-choice — forced; the dread is the content)
NPCs present: depends on routing

### Scene: `squeeze_salzano`
Purpose: Salzano at the desk with his hat off. Two men at the door. The voice not raised. The same offer as the records corridor, sweeter this time: a job, a flat, a one-way ticket. Or: a body found in a hotel room a long way from here. Either is fine.
Choices:
- "Play it straight — back off cosmetically. Apologise." → `squeeze_back_off` | effects: `heat -2`, `cops_warned_off: true` (upgraded — hard warning) | (convergent: smart — costs the warning's tier)
- "Feign compliance. Keep digging quietly." → `squeeze_feign` | effects: `heat 0`, `rep -1` (one of Frank's sources will hear; not all of them will forgive) | (convergent: dangerous — preserves heat)
- "Push back hard. Tell him to leave." → `squeeze_push_back` | gating: requires `heat < 8` OR `rep > 3` | hide_if_failed: false (grey out — "He's brought enough men this time. Pushing back gets you killed.") | effects: `heat +1`, `pushed_back: true` | (convergent: defiant — costs heat, paints the target)
- "Pull the gun out of the desk drawer." → `squeeze_lethal` | gating: requires `heat >= 8` AND `rep <= 3` | hide_if_failed: true | effects: none | (the lethal off-ramp — only opens when the squeeze would be lethal anyway; the gun is the gesture, not the answer)
NPCs present: Salzano, two men (silent)

### Scene: `squeeze_brennan`
Purpose: Brennan picks Frank up off Court Street in an unmarked car. Drives him to the harbour. Doesn't get out. "Cady. The case is closed. Stay closed. I'm not asking." Sweat collar. The same script, harder.
Choices:
- "Take it. 'Closed. Yes, sergeant.'" → `squeeze_back_off` | effects: `heat -2`, `cops_warned_off: true` (hard warning) | (convergent: cosmetic)
- "Tell him you've heard from Salzano. Watch his face." → `squeeze_feign` | effects: `heat 0`, `evidence +1` (Brennan's flicker is a fact: he knows the name), `rep -1` | (convergent: probe)
- "Push back hard. 'Whose case is closed, sergeant. Yours? Or his?'" → `squeeze_push_back` | gating: requires `heat < 8` OR `rep > 3` | hide_if_failed: false | effects: `heat +1`, `pushed_back: true`, `evidence +1` (Brennan tells Frank exactly which name to leave alone — Halston Thorne) | (convergent: defiant)
NPCs present: Detective Sergeant Pat Brennan

### Scene: `squeeze_mort`
Purpose: Mort at Frank's door without a flask. He has been told by his editor to drop the Aldwick column. By a friend that the column has been spiked. By a third party he will not name that the next column will be his last.
Choices:
- "Tell him to write it anyway. Tell him you'll back the byline." → `squeeze_mort_writes` | effects: `heat +2`, `mort_writes_anyway: true` (small Beat 9 dividend; the *Tribune-Ledger* picks it up two days later if Frank is alive to enable it) | (convergent: bold — risk for press support)
- "Tell him to drop it. The story is yours to carry." → `squeeze_mort_drops` | effects: `mort_owes_one: false` (the favour is repaid by Frank releasing him), `rep +1`, `evidence +1` (Mort gives Frank a list of three other smaller papers Dora Reyes might run it through) | (convergent: protective)
- "Ask him for Dora Reyes's address. Now, while he's here." → `squeeze_mort_dora` | effects: `dora_address_known: true`, `mort_owes_one: false` | consumable: Y | (convergent: practical — opens Beat 8 directly)
- "Pour him a drink. Listen. Decide tomorrow." → `squeeze_mort_drink` | effects: none | (convergent: cautious — closes nothing, gains nothing)
NPCs present: Mort Halloran

### Scene: `squeeze_back_off`
Purpose: Frank at the desk after the visitor leaves. The brick on the floor; the warning hardened to a card slid under the door tomorrow. The case is not closed in his head. It is closed on every desk in the city that matters.
Choices:
- "Continue." → `kellner_diner` (if `kellner_called: true` AND `kellner_met` is unset) OR `kellner_phone` (else) | effects: none | (single-choice — Beat 7 entry)
NPCs present: none

### Scene: `squeeze_feign`
Purpose: Frank smiles and lies. The lie costs him a source somewhere — by the time he's finished smiling, somebody is being told that Frank caved.
Choices:
- "Continue." → `kellner_diner` (if `kellner_called: true`) OR `kellner_phone` | effects: none | (single-choice — Beat 7 entry)
NPCs present: none

### Scene: `squeeze_push_back`
Purpose: Frank pushes back. Salzano nods politely. Brennan smiles thin. Mort takes the news that Frank is harder than he thought and leaves white-faced. The target on Frank's back is now visible from the street.
Choices:
- "Continue." → `kellner_diner` (if `kellner_called: true`) OR `kellner_phone` | effects: none | (single-choice — Beat 7 entry)
NPCs present: none

### Scene: `squeeze_lethal`
Purpose: Frank pulls the gun from the desk drawer. Salzano's two men shoot first. Frank dies in his chair, the brick still on the floor. Heat 8, rep 3 or less — the city closes the file in person.
Choices: [] (terminal — Pavement off-ramp variant; rare Act 2 hard fail)
NPCs present: Salzano, two men (silent)

### Scene: `squeeze_mort_writes`
Purpose: Mort at the door, almost smiling. "Then I write it." He goes home to a typewriter. Frank does not know whether the column will run.
Choices:
- "Continue." → `kellner_diner` (if `kellner_called: true`) OR `kellner_phone` | effects: none | (single-choice)
NPCs present: Mort Halloran

### Scene: `squeeze_mort_drops`
Purpose: Mort at the door, almost relieved. He gives Frank the list and shakes his hand. He is not at the *Examiner* the following Tuesday. Frank reads in the obituary page that he has been "transferred to the Cleveland desk."
Choices:
- "Continue." → `kellner_diner` (if `kellner_called: true`) OR `kellner_phone` | effects: `mort_transferred: true` (narrative wound — Mort is gone) | (single-choice)
NPCs present: Mort Halloran

### Scene: `squeeze_mort_dora`
Purpose: Mort writes Dora's address on a matchbook. "Don't lose it. Don't bring it to her in person. Mail it." He looks at Frank like a man who has seen this play once before.
Choices:
- "Continue." → `kellner_diner` (if `kellner_called: true`) OR `kellner_phone` | effects: none | (single-choice — Beat 8 unlocked)
NPCs present: Mort Halloran

### Scene: `squeeze_mort_drink`
Purpose: They drink in silence. Mort leaves at one in the morning. Frank does not remember what was said, only that very little of it was about the case.
Choices:
- "Continue." → `kellner_diner` (if `kellner_called: true`) OR `kellner_phone` | effects: none | (single-choice — atmosphere)
NPCs present: Mort Halloran

NPCs in Beat 6: Salzano, two men (silent), Brennan, Mort Halloran.

---

## Beat 7 — Walt Kellner

### Scene: `kellner_phone`
Purpose: The phone in the office at half past nine. Kellner's voice on the other end. Warm. He has heard Frank has been busy. He suggests the diner on Henning where they used to eat at three in the morning.
Choices:
- "Agree. Tomorrow night. Take the meet." → `kellner_diner` | effects: `kellner_called: true` | (convergent: agree)
- "Agree. But tonight. Test his patience." → `kellner_diner` | effects: `kellner_called: true`, `kellner_tested: true` (small narrative shading flag — Kellner notices the test) | (convergent: probe)
- "Decline politely. Suggest the office." → `kellner_office` | effects: `kellner_called: true`, `kellner_on_my_turf: true` | (convergent: defensive — Kellner shows up at the office anyway, on Frank's chair)
- "Decline. Don't suggest anything." → `office_hub` | effects: `kellner_called: true`, `kellner_avoided: true` | (the avoidance — Kellner will appear in Beat 9 either way; this closes the friendly version of the conversation; cuts off `frank_past_revealed`)
NPCs present: Walt Kellner (on phone)

### Scene: `kellner_diner`
Purpose: A diner that has not changed since Frank knew it as a beat cop. Kellner in the corner booth with his hat on the seat beside him. Two coffees on the table. The waitress walks past three times before she pours.
Choices: (entry to the conversation hub — first turn forces a posture)
- "Sit. Take the coffee. Let him lead." → `kellner_hub` | effects: `kellner_met: true` | (convergent: receptive)
- "Sit. Order eggs you won't eat. Make him watch you not eat them." → `kellner_hub` | effects: `kellner_met: true` | (convergent: bored — small Kellner-watches-Frank tonal beat)
- "Sit. Don't take the coffee. Tell him to talk." → `kellner_hub` | effects: `kellner_met: true`, `kellner_brisk: true` (shading flag — Kellner closes faster) | (convergent: cold)
NPCs present: Walt Kellner, ambient diner waitress (single line, ambient — voiced by narrator description)

### Scene: `kellner_office`
Purpose: Kellner in Frank's chair when Frank gets back to the office. Hat on the desk. The fountain pen out of his jacket pocket pointed at the brick on the floor. "We need to talk, Cady."
Choices:
- "Sit on the visitor's side of your own desk. Hear him out." → `kellner_hub` | effects: `kellner_met: true` | (convergent: composed)
- "Tell him to get out of your chair first." → `kellner_hub` | effects: `kellner_met: true`, `kellner_brisk: true` | (convergent: territorial)
- "Pour two. Take the bottle out of the drawer in front of him." → `kellner_hub` | effects: `kellner_met: true` | (convergent: openness — Kellner reads it as trust before it is one)
NPCs present: Walt Kellner

### Conversation — `kellner_hub`
Purpose: The Kellner conversation. Topics deplete; the player can always leave. Confiding the ledger is a one-way door — it sets `trusted_kellner` and worsens Act 3.
Topics:
- "Talk about Ray Doss." → `kellner_topic_doss` | gating: requires `flags_unset: [asked_kellner_doss]` | effects: `asked_kellner_doss: true`, `evidence +1` (Kellner pretends to know less than he does — Frank reads the flicker)
- "Talk about Aldwick." → `kellner_topic_aldwick` | gating: requires `aldwick_visited_act2: true` AND `flags_unset: [asked_kellner_aldwick]` | effects: `asked_kellner_aldwick: true`
- "Talk about the force. The year you left." → `kellner_topic_past` | gating: requires `rep >= 6` AND `flags_unset: [asked_kellner_past]` | hide_if_failed: false (grey out — "Not yet. He doesn't trust you with that yet.") | effects: `asked_kellner_past: true`, `frank_past_revealed: true`
- "Tell him about the ledger." → `kellner_topic_ledger` | gating: requires `found_ledger: true` AND `flags_unset: [asked_kellner_ledger]` | hide_if_failed: false (grey out — "You don't have it. Don't bluff him.") | effects: `asked_kellner_ledger: true`, `trusted_kellner: true` | (one-way door — the rep gain isn't worth the betrayal cost; the player should feel the temptation)
- "Ask if he can give you a name." → `kellner_topic_name` | gating: requires `flags_unset: [asked_kellner_name]` | effects: `asked_kellner_name: true`
- "Take the graceful exit. 'You don't have to tell me any of this.'" → `kellner_diner_exit` | effects: none | (always-available walk-away)
- "Walk out without a goodbye." → `kellner_diner_exit` | effects: `kellner_walked_out: true` (small narrative shading flag — Kellner registers the rudeness) | (always-available rude exit)
NPCs present: Walt Kellner, ambient diner waitress

### Scene: `kellner_topic_doss`
Purpose: Kellner pretends to half-remember Doss. Asks Frank what kind of work the man did. The pen taps the table once on the word "surveyor" — a flicker. Kellner has been briefed.
Choices:
- "Note the flicker. Don't show you noticed. Press another topic." → `kellner_hub` | effects: `evidence +1` (kellner is read in) | (convergent: cool)
- "Call him on the flicker. Politely." → `kellner_hub` | effects: `evidence +1`, `rep -1` (Kellner files Frank as harder than expected) | (convergent: blunt)
- "Laugh. Pretend you didn't see it." → `kellner_hub` | effects: `evidence +1` | (convergent: sly — same gain, no rep cost, Kellner thinks Frank missed it)
NPCs present: Walt Kellner

### Scene: `kellner_topic_aldwick`
Purpose: Kellner concedes the Aldwick parcel files are "not clean" in the same breath he warns Frank that whoever wants them clean is not someone Frank wants to play with. He uses the word "they" carefully and the word "I" never.
Choices:
- "Press: who is 'they'?" → `kellner_hub` | effects: `evidence +1`, `rep -1` | (convergent: blunt)
- "Press: are *you* one of 'them'?" → `kellner_hub` | effects: `evidence +1`, `kellner_pressed_us: true` (Kellner registers it; small Act 3 shading) | (convergent: hard — costs nothing now, costs in Act 3)
- "Don't press. Take the warning at face value." → `kellner_hub` | effects: none | (convergent: trusting)
NPCs present: Walt Kellner

### Scene: `kellner_topic_past`
Purpose: Kellner takes the long way around. Starts with a story about a captain Frank knew. Lands accidentally on the year Frank left. A phrase — "after we cleared you out" — and Kellner watches whether Frank caught it. Frank caught it.
Choices:
- "Don't react. Pour him another. Let the moment pass." → `kellner_hub` | effects: `frank_past_revealed: true`, `kellner_revealed_himself: true` (Frank knows; Kellner doesn't know Frank knows) | (convergent: poker — best route)
- "Look him in the face. Make him say the rest." → `kellner_hub` | effects: `frank_past_revealed: true`, `kellner_knows_i_know: true` (Kellner knows Frank knows; Act 3 betrayal scene reads accordingly) | (convergent: blunt — costs)
- "Stand up. Walk to the counter. Come back and change the subject." → `kellner_hub` | effects: `frank_past_revealed: true` | (convergent: composure — middle path)
NPCs present: Walt Kellner

### Scene: `kellner_topic_ledger`
Purpose: The temptation. Kellner asks, lightly, whether Ray ever kept a record book. Frank can lie, deflect, or confide. The player should feel the warmth and read it as something to lean into.
Choices:
- "Tell him. The whole shape of it. Where you found it. What's in it." → `kellner_hub` | effects: `trusted_kellner: true`, `rep +1` (Kellner mirrors warmth; the betrayal will feel worse for it) | (convergent: confide — the bad move dressed as the good move)
- "Tell him you've heard rumours but you haven't seen it yourself." → `kellner_hub` | effects: `kellner_lied_to: true` (Kellner reads the lie as a courtesy and respects it; Act 3 betrayal lands without the deepener) | (convergent: lie kindly — best route)
- "Tell him you have it and you're not telling him where." → `kellner_hub` | effects: `kellner_knows_i_have_it: true`, `heat +1` | (convergent: half-truth — worst of both worlds)
NPCs present: Walt Kellner

### Scene: `kellner_topic_name`
Purpose: Kellner gives Frank the name Halston Thorne — the way one gives a man a glass of poisoned water and watches him drink it. He is testing whether Frank already had the name. If Frank does (`evidence_path: break_in` or `marta_full_account`), Kellner's eyes do not change. If Frank does not, Kellner's eyes do.
Choices:
- "Take the name. Don't react." → `kellner_hub` | effects: `evidence +1`, `thorne_named: true` | (convergent: poker)
- "Tell him you already had it." → `kellner_hub` | gating: requires `evidence >= 5` | hide_if_failed: false (grey out — "You don't have enough to bluff him with this.") | effects: `evidence +1`, `thorne_named: true`, `kellner_knows_i_know: true` | (convergent: blunt — paints a target)
- "Ask him whether the name should scare you." → `kellner_hub` | effects: `evidence +1`, `thorne_named: true`, `rep -1` (Kellner reads as flailing) | (convergent: scared)
NPCs present: Walt Kellner

### Scene: `kellner_diner_exit`
Purpose: Frank on the kerb outside. Kellner inside the booth, paying for both coffees. The pen back in his jacket pocket. The door closes. The streetlight buzzes.
Choices:
- "Back to the office." → `office_hub` | effects: none | (single-choice — closes Beat 7)
NPCs present: none

NPCs in Beat 7: Walt Kellner, ambient waitress.

---

## Beat 8 — The Package

### Scene: `package_post_office`
Purpose: Six in the evening. The post office on Tenth, the one open until seven. Hettie Voorhees behind the counter. Frank with the parcel — the handcopy, or two photographs, or the torn ledger pages — already wrapped in brown paper, already addressed. Across the street, a man is reading a paper he is not turning. Frank is being followed and he knows it.
Hub-style entry: this beat is reachable from the office hub once Beat 7 is closed AND any of `mort_owes_one` (Mort gave the address), `dora_address_known: true`, `marta_warned: true` (Marta will reach Dora), or `mort_writes_anyway: true` is set. Otherwise, the beat opens but Frank does not have an address and the choice routes to `package_no_address` instead.
Choices:
- "Hand over the parcel. Pay for the postage. Walk out the back way." → `package_mailed` | gating: requires `flags_unset: [left_package]` AND (`dora_address_known: true` OR `mort_owes_one: true` OR `marta_warned: true` OR `mort_writes_anyway: true`) | effects: `left_package: true` | hide_if_failed: true (consumable — disappears once mailed; also hidden if the player has no address) | (convergent: do it)
- "Hand it over. Insure it. Make it harder for them to lose." → `package_mailed_insured` | gating: same as above AND `flags_unset: [left_package]` | effects: `left_package: true`, `package_insured: true` (small Act 3 callback in Expose — the receipt Dora keeps), `evidence +1` | hide_if_failed: true | (convergent: belt-and-braces)
- "Hand it over. Tell Hettie you'll be back tomorrow to confirm it left the city." → `package_mailed_witness` | gating: same as above | effects: `left_package: true`, `package_witnessed: true` (Hettie will tell Frank — or not — depending on whether the man in the good suit got to her first) | hide_if_failed: true | (convergent: half-trust — opens an Act 3 narrative wound)
- "Walk out without mailing it. The man across the street is too close." → `package_aborted` | gating: requires `flags_unset: [left_package]` | effects: `package_aborted_once: true` (the choice can be re-attempted from the hub once) | (convergent: caution — deliberate close-off if not re-attempted)
- "Walk out without mailing it. You'll never mail it. The Martyr ending is locked." → `office_hub` | effects: `left_package_refused: true` | (convergent: certain — locks Martyr explicitly; the player may want this if pursuing Bury It late)
NPCs present: Hettie Voorhees, the tail across the street (silent, off-page)

### Scene: `package_no_address`
Purpose: Frank at the counter with no address to put on the parcel. Hettie waits. Frank stands there longer than he should and then asks for the parcel back.
Choices:
- "Walk out. Put it in the office safe. Decide tomorrow." → `office_hub` | effects: none | (single-choice — Martyr stays locked unless an address surfaces by Beat 9)
NPCs present: Hettie Voorhees

### Scene: `package_mailed`
Purpose: Hettie weighs the parcel, stamps it, drops it in the canvas bag with eight other parcels going east. "That'll be ninety cents, dear." She does not look up at the man across the street. Frank cannot tell whether she has not seen him or has seen him for an hour.
Choices:
- "Continue." → `hallway_call` | effects: none | (single-choice — Beat 9 entry)
NPCs present: Hettie Voorhees, the tail (silent, off-page)

### Scene: `package_mailed_insured`
Purpose: Hettie copies the form twice, gives Frank the carbon, hands him a receipt with a number on it. "If it doesn't get there, dear, this is the proof it left." Frank pockets the receipt. The man across the street is still there.
Choices:
- "Continue." → `hallway_call` | effects: none | (single-choice — Beat 9 entry)
NPCs present: Hettie Voorhees, the tail (silent, off-page)

### Scene: `package_mailed_witness`
Purpose: Frank says he'll be back. Hettie says "I'll be here, dear, until six. After that the night clerk." She does not say whether she will tell the night clerk Frank is coming. Outside, the tail is gone.
Choices:
- "Continue." → `hallway_call` | effects: none | (single-choice — Beat 9 entry)
NPCs present: Hettie Voorhees

### Scene: `package_aborted`
Purpose: Frank pockets the parcel and walks out. The tail watches him do it. The Martyr ending hangs by a thread; the player can re-attempt from the hub once before Beat 9 closes the door.
Choices:
- "Back to the office. Try again tomorrow." → `office_hub` | effects: none | (single-choice — re-entry permitted once)
NPCs present: Hettie Voorhees, the tail (silent, off-page)

NPCs in Beat 8: Hettie Voorhees, Salzano's tail (silent).

---

## Beat 9 — Standing in the Hallway

### Scene: `hallway_call`
Purpose: Frank in his office, late. The lamp on. The notebook (or its photograph, or its absence) on the desk. The phone rings. Kellner's voice: "Cady. Meet me. The warehouse on Pier 14. One in the morning. Alone."
Choices:
- "Agree. Hang up. Take the gun out of the drawer." → `hallway_commit` | gating: none | effects: none | (convergent: keep the meet — commits to Act 3)
- "Agree. Hang up. Walk to Mort's first to leave a note where to find your body." → `hallway_commit_with_note` | gating: requires `mort_owes_one: true` AND `flags_unset: [left_package]` AND `flags_unset: [left_package_refused]` | hide_if_failed: false (grey out — "Mort's not reachable; or the package is already mailed; nothing to write." — different reasons depending on which condition fails) | effects: `left_package: true` (the note is the package, late variant), `package_late_filed: true` (small Act 3 narrative shading: Mort, not Hettie, hands it to Dora) | (convergent: insurance — last-chance Martyr unlock)
- "Agree. Hang up. Take the long way through the alley to the warehouse." → `hallway_commit` | effects: `frank_took_long_way: true` (small narrative shading) | (convergent: paranoid — same destination)
- "Tell him no. Hang up. Walk away from all of it." → `act_2_bury_it_late` (Exit F — late Bury It) | effects: `bury_it_late: true` | (the late walk-away — terminal)
NPCs present: Walt Kellner (on phone)

### Scene: `hallway_commit`
Purpose: Frank takes the gun. The bottle stays in the drawer. The retainer envelope is still unopened. He turns off the lamp. The street outside is empty in a way that feels rehearsed.
Choices:
- "Continue to Act 3." → `act_2_to_act_3` | effects: none | (single-choice — pacing, before exit routing)
NPCs present: none

### Scene: `hallway_commit_with_note`
Purpose: Frank at Mort's stair landing, parcel in hand, the address Mort gave him on the matchbook. Mort takes it without comment, looks at the address, and tells Frank he'll have it on Dora's desk before sunrise. Frank turns to leave; Mort stops him at the door and shakes his hand the way men do who know they are saying goodbye.
Choices:
- "Continue to Act 3." → `act_2_to_act_3` | effects: none | (single-choice — Martyr unlocked late)
NPCs present: Mort Halloran

### Scene: `act_2_to_act_3`
Purpose: Hand-off scene. Routes to one of Act 3 entries A–E based on accumulated state at this point. The narrator names what Frank carries to the warehouse: the ledger or its photograph or two torn pages or nothing; the package mailed or not; Kellner trusted or not; heat high or low; rep enough to survive or not.
Choices:
- "Continue to Act 3." → Act 3 entry scene | effects: routed by the table below | (single-choice — pacing)
NPCs present: none

### Scene: `act_2_bury_it_late`
Purpose: Exit F coda. Frank at the office at four in the morning. He puts the ledger (or the photographs, or nothing) in the same drawer as Vera's retainer envelope. He locks it. He turns off the lamp. The phone rings again at half past four. He does not answer it.
Choices: [] (terminal — Bury It, late variant; the longer coda runs in Act 3's ending file but the gate is here)
NPCs present: none

NPCs in Beat 9: Walt Kellner (on phone), Mort Halloran (note variant only).

---

## Hub summary

### Hub — `office_hub` (Beats 1, 2, 5, 6 entry)
Purpose: spine. Detailed under Beat 2.
Returns from: every spoke listed in Beat 2.
Exits to: `aldwick_arrival`, `engineer_after_hours_decision`, `mort_visit`, `kellner_phone`/`kellner_diner`, `squeeze_open` (forced), `ledger_route` (after Beat 5 unlocks), `package_post_office` (after Beat 7 closes).
NPCs in hub face: none directly.

### Hub — Aldwick (`aldwick_arrival`)
Purpose: secondary hub. Two visits maximum (`aldwick_visited_act2`, `aldwick_revisit_done`). On the third attempted visit Frank finds Reuben on a porch with the door open and Marta gone (`reuben_porch`).
Returns from: `marta_kitchen`, `lemoine_porch`, `reuben_porch`, `aldwick_walk` follow-ons, `boarded_door_*`, `sedan_plate`, `church_hall_meeting`, `marta_full_account`, `marta_partial`, `marta_holds`, `marta_key_thread`, `marta_apology`.
Exits to: `office_hub` (via `aldwick_exit`); `ledger_route` indirectly (via the office hub).
NPCs in hub face: Marta Gaines, Pastor Briggs (first visit), Reuben Gaines (return visit).

### Conversation — Walt Kellner (`kellner_hub`)
Purpose: ambiguity. Topics deplete; player can always leave. Confiding the ledger is a one-way door (`trusted_kellner`).
Walk-away: "You don't have to tell me any of this." (graceful) and "Walk out without a goodbye." (rude — sets `kellner_walked_out`).
NPCs in hub face: Walt Kellner, ambient waitress.

---

## Exit routing (Beat 9 / `act_2_to_act_3`)

The `act_2_to_act_3` scene routes to one of Act 3's entry variants based on accumulated state. Conditions match `act-2.md` exit definitions.

- **Exit A — Cold and quiet:** `found_ledger: true` AND `trusted_kellner: false` AND `left_package: false` AND `heat <= 5`
- **Exit B — Confided and exposed:** `found_ledger: true` AND `trusted_kellner: true` AND `left_package: false`
- **Exit C — Insurance mailed:** `found_ledger: true` AND `left_package: true` AND `heat <= 5`
- **Exit D — Hot and hunted:** `heat >= 6` (regardless of other flags; the variant Act 3 entry handles `left_package` internally)
- **Exit E — No book, no shield:** `found_ledger: false` (any other flags irrelevant; Expose/Martyr locked at climax)

Exit F (`act_2_bury_it_late`) is the terminal walk-away from `hallway_call`.

All five carrying Exits A–E carry: `met_vera`, `vera_dead`, `aldwick_visited`, `ray_key_kept` (unless red-herring locker path was taken in Act 1). Stat ranges per `act-2.md`.

---

## NPCs in this act

Principals (already in `cast.md` from Stage 2):
- **Walt Kellner** — first appears on phone in `kellner_phone` (Beat 7 entry); recurs in `kellner_diner` / `kellner_office` (Beat 7 hub and topics); voice present in `hallway_call` (Beat 9). Reappears in `hallway_commit_with_note` only off-page through Mort.
- **Marta Gaines** — first appears in `church_hall_meeting` (Beat 3); recurs across `marta_kitchen` and topic scenes; absent on the revisit (`reuben_porch`).
- **Salzano** — first appears off-page in `records_listening` (Beat 4); on-page in `records_corridor_intercept` and `salzano_offer` (Beat 4); recurs in `squeeze_salzano` (Beat 6); his men are silent presences across both scenes.
- **Pastor Lemuel Briggs** — first appears in `church_hall_meeting` (Beat 3); ambient presence across the meeting scenes; absent on the revisit (a narrative wound — no on-screen explanation).
- **Mort Halloran** — recurs in `mort_visit` (Beat 2 hub spoke), `squeeze_mort` and variants (Beat 6), and `hallway_commit_with_note` (Beat 9, note variant).
- **Detective Sergeant Pat Brennan** — recurs in `squeeze_brennan` (Beat 6).
- **Cyril Voss** — referenced only in `records_voss_note` (Beat 4) — his handwriting on the note that names Kellner. No spoken Act 2 line.
- **Vera Doss** — referenced posthumously throughout (the empty chair, the retainer envelope). No spoken line.
- **Dora Reyes** — referenced in `package_post_office` and `squeeze_mort_dora`. Off-page; voice is reserved for Act 3.
- **Halston Thorne** — named in the ledger (`ledger_read_then_decide`) and by Kellner (`kellner_topic_name`). Off-page in Act 2.

Supporting NPCs added to `cast.md` for Act 2:
- **Reuben Gaines** (Marta's brother) — first appears in `marta_intro_listen` and `marta_kitchen` topics (Beat 3); recurs in `reuben_porch` (Aldwick revisit). Voice: `male_adult_african-american_uneducated`.
- **Hettie Voorhees** (post office clerk) — single-scene cameo in Beat 8. Voice: `female_elder_american_relatable_likeable`.
- **Floor janitor** (City Engineer's after-hours) — single-scene cameo in Beat 4 (janitor and press-badge entry routes). Voice: `male_midlife_british_tough_calloused`.
- **Detective Costa** (uniform tail) — single-scene cameo in Beat 1 high-heat entry only. Voice: `male_midlife_american_loud_confident_cocky`.

Ambient / not casted (no voice line; voiced by narrator description only):
- locksmith on Halsted (`key_legwork`)
- rail attendant (`rail_locker_close`)
- ambient passersby in Aldwick
- old woman behind boarded door (`boarded_door_old_woman` — single line, narrator-rendered)
- ambient church-hall residents
- workshop man with two missing fingers (`garage_back_room` — single line, narrator-rendered)
- ambient streetcar/station passengers
- diner waitress (`kellner_diner` — single line, narrator-rendered)
- the tail across the street (`package_post_office`, `rail_locker_tail` — silent)
- Salzano's two men (silent across squeeze scenes)
- brown-sedan driver (silent in `sedan_plate`)
- second man behind Salzano in `records_corridor_intercept` (silent)
- neighbour at Lemoine (`lemoine_porch` follow-ons — single line, narrator-rendered)

---

## Voice clash check

Within any single scene, the voices in play are distinct in register:

- Beat 3 church hall / kitchen: Marta (midlife African-American, casual opinionated) + Briggs (adult American, casual relaxed light) + Reuben (adult African-American, uneducated). No clash — distinct ages, distinct registers, distinct cadences.
- Beat 4 records: Salzano (midlife British, dark seductive deep) + janitor (midlife British, tough calloused) — both British. **Distinguished by:** Salzano is *quiet* and *seductive*; the janitor is *tough* and *calloused*. They never share a scene — janitor is in the entry, Salzano is in the corridor; the corridor scene treats Salzano as the only spoken voice. No active clash.
- Beat 6 squeeze: each variant is a single-NPC scene (Salzano alone with silent men; Brennan alone; Mort alone). No same-scene clash.
- Beat 7 Kellner: Kellner (midlife American, rich smooth rugged) + diner waitress (ambient, narrator-rendered). No clash.
- Beat 8 post office: Hettie (elder American, relatable likeable) + Frank (narrator). No other speakers.
- Beat 1 stairwell: Costa (midlife American, loud confident cocky) + Frank. Distinct from Brennan and Kellner who are not in the scene.

---

## Choice density audit

Counting active choices across all Act 2 scenes (excluding terminal codas, hub auto-routes, and routing scenes):

- Beat 1: `stairwell_warning` 3, `office_cold_open` 3, `cold_trail_pick` 4, `key_legwork` 3, `bath_locker_dead_end` 1, `rail_locker_close` 1, `rail_locker_tail` 1 → 16 across 7 (avg 2.3)
- Beat 2 hub: `office_hub` 6 → 6 across 1 (avg 6.0)
- Beat 3: `aldwick_arrival` 4, `aldwick_walk` 4, `boarded_door_old_woman` 1, `boarded_door_nobody` 1, `sedan_plate` 1, `church_hall_meeting` 4, `marta_intro_honest` 3, `marta_intro_vera` 1, `marta_intro_cop` 3, `marta_intro_listen` 3, `marta_room_question` 1, `marta_kitchen` 6, `marta_full_account` 3, `marta_partial` 3, `marta_holds` 1, `marta_key_thread` 3, `marta_reuben` 3, `reuben_keeps` 1, `reuben_gives` 1, `marta_apology` 1, `lemoine_porch` 3, `neighbour_comes` 1, `neighbour_refuses` 1, `reuben_porch` 3, `reuben_speaks` 1, `reuben_silent` 1, `aldwick_revisit_squeeze` 3, `aldwick_exit` 1 → 63 across 28 (avg 2.25)
- Beat 4: `engineer_after_hours_decision` 4, `records_janitor` 1, `records_press_badge` 1, `records_break_in` 1, `records_corridor` 3, `records_listening` 1, `records_inside` 5, `records_inside_unlocked` 3, `records_take_signatures` 3, `records_take_maps` 3, `records_photograph` 2, `records_voss_note` 1, `records_corridor_intercept` 3, `records_alley_escape` 1, `records_clean_exit` 1, `records_corridor_exit` 1, `salzano_offer` 4, `records_room_exit` 1 → 39 across 18 (avg 2.17)
- Beat 5: `ledger_route` 3, `garage_back_room` 3, `rail_locker_open` 3, `ledger_read_then_decide` 3, `ledger_inspect_take` 1, `ledger_inspect_photo` 1, `ledger_inspect_partial` 1, `ledger_carry_back` 3 → 18 across 8 (avg 2.25)
- Beat 6: `squeeze_open` 1, `squeeze_salzano` 4, `squeeze_brennan` 3, `squeeze_mort` 4, `squeeze_back_off` 1, `squeeze_feign` 1, `squeeze_push_back` 1, `squeeze_mort_writes` 1, `squeeze_mort_drops` 1, `squeeze_mort_dora` 1, `squeeze_mort_drink` 1 → 19 across 11 (avg 1.73) — flagged below
- Beat 7: `kellner_phone` 4, `kellner_diner` 3, `kellner_office` 3, `kellner_hub` 7, `kellner_topic_doss` 3, `kellner_topic_aldwick` 3, `kellner_topic_past` 3, `kellner_topic_ledger` 3, `kellner_topic_name` 3, `kellner_diner_exit` 1 → 33 across 10 (avg 3.3)
- Beat 8: `package_post_office` 5, `package_no_address` 1, `package_mailed` 1, `package_mailed_insured` 1, `package_mailed_witness` 1, `package_aborted` 1 → 10 across 6 (avg 1.67) — flagged below
- Beat 9: `hallway_call` 4, `hallway_commit` 1, `hallway_commit_with_note` 1, `act_2_to_act_3` 1 → 7 across 4 (avg 1.75)

Totals: 211 active choices across 93 scenes → **average 2.27**.

This is below the 2.5 acceptable floor. The deficit is in single-choice pacing scenes (the squeeze tails, the package follow-ons, the hallway commits). Per the same lift methodology applied in Act 1: widen single-choice pacing scenes that are NOT forced transitions or terminal codas to 3 convergent framings. Concretely:

- `bath_locker_dead_end`, `rail_locker_close`, `rail_locker_tail` 1→3 each (three framings of the dead-end pause; same destination, same effects).
- `boarded_door_old_woman`, `boarded_door_nobody`, `sedan_plate` 1→3 each.
- `marta_intro_vera`, `marta_holds`, `marta_apology` 1→3 each.
- `reuben_keeps`, `reuben_gives`, `reuben_speaks`, `reuben_silent`, `neighbour_comes`, `neighbour_refuses` 1→3 each.
- `records_janitor`, `records_press_badge`, `records_break_in`, `records_listening`, `records_voss_note`, `records_alley_escape`, `records_clean_exit`, `records_corridor_exit`, `records_room_exit` 1→3 each.
- `ledger_inspect_take`, `ledger_inspect_photo`, `ledger_inspect_partial` 1→3 each.
- `squeeze_back_off`, `squeeze_feign`, `squeeze_push_back`, `squeeze_mort_writes`, `squeeze_mort_drops`, `squeeze_mort_dora`, `squeeze_mort_drink` 1→3 each.
- `package_mailed`, `package_mailed_insured`, `package_mailed_witness`, `package_aborted`, `package_no_address` 1→3 each.
- `hallway_commit`, `hallway_commit_with_note` 1→3 each.
- `kellner_diner_exit`, `aldwick_exit` 1→3 each.

That lifts 40 single-choice scenes by +2 each = +80 active choices. Recount: 211 + 80 = **291 active choices across 93 scenes → avg 3.13**, comfortably above the 2.5 floor.

**Stage 5 instruction:** treat the lifted scenes above as convergent-framing scenes (3 distinct framings, same `next`, same effects) when writing prose. The breakdown lists them as 1-choice for clarity of purpose; Stage 5 expands them per the convergent pattern in `principles.md`.

Single-choice scenes that remain (justified pacing beats / forced transitions / terminal):
- `squeeze_open` (forced transition; the dread is the content)
- `squeeze_lethal`, `records_stairwell_death`, `act_2_bury_it_early`, `act_2_bury_it_late` (terminal codas / hard fails — `choices: []`)
- `act_2_to_act_3` (routing scene)
- `package_no_address` (committed dead end where Frank has nothing to say — but lifted above, see note: keep as 1-choice if Stage 5 finds the convergent framings forced)

Single-choice rate after lift: 6 of 93 ≈ 6.5%, well under the 25% flag.

---

## Act-to-act handoff preserved

Beat 9's `act_2_to_act_3` feeds Act 3 entries A–E per the conditions in `act-2.md`. `act_2_bury_it_late` (Exit F) feeds the late Bury It coda directly. `act_2_bury_it_early` (mid-Beat-4 Salzano-bought-off variant) and the `_death` codas are terminal off-ramps and do not feed Act 3.

The five Exit conditions defined in `act-2.md` are reproduced under "Exit routing (Beat 9 / `act_2_to_act_3`)" above and match.
