# Wet Concrete — Act 3 Scenes

## Beat 1 — Kellner's Move

### Scene: `act3_open`
Purpose: The act opens in motion. Frank is on his way to Kellner or Kellner has come to him — the meeting is already happening. Brief transition to establish Frank's state of mind and what he's walking into.
Choices:
- "He's been leaving messages like a man who wants to help — play it that way, see if it holds" → `kellner_meeting_arrival` | gating: none | effects: none | consumable: N
- "Something in the last message was off — you're going in expecting a trap, not a cup of coffee" → `kellner_meeting_cautious` | gating: none | effects: none | consumable: N
- "You know what he is — `frank_past_revealed` is set: he ran this same play once before, different case, different neighbourhood, and he's running it again" → `kellner_meeting_knowing` | gating: requires flags: [frank_past_revealed] | hide_if_failed: true | effects: none | consumable: N
NPCs present: none (transition scene)

---

### Scene: `kellner_meeting_arrival`
Purpose: Frank meets Kellner. A car, a diner, a back room — Kellner chose the place. He's warm, precise, already running the routine. There's a third man somewhere Frank can't see. Frank can't see it yet.
Choices:
- "Take it at face value — hear what Kellner says he came to say" → `kellner_meeting_surface` | gating: none | effects: none | consumable: N
- "Watch the room — Kellner is talking but his eyes keep moving to the door" → `kellner_meeting_read` | gating: none | effects: none | consumable: N
- "Ask directly — 'What is it you actually want, Walt?'" → `kellner_meeting_direct` | gating: none | effects: none | consumable: N
NPCs present: Walt Kellner

---

### Scene: `kellner_meeting_cautious`
Purpose: Frank comes in careful — exits checked, nothing handed over, nothing confirmed. Kellner seems to register it. He adjusts. The warmth is still there but something behind it tightens.
Choices:
- "Let him make his pitch — you can read a pitch without believing it" → `kellner_meeting_surface` | gating: none | effects: none | consumable: N
- "Read the tells — what does a man who's running you look like from the inside?" → `kellner_meeting_read` | gating: none | effects: none | consumable: N
- "Name it — 'You've been managing me since the first phone call'" → `kellner_meeting_direct` | gating: none | effects: none | consumable: N
NPCs present: Walt Kellner

---

### Scene: `kellner_meeting_knowing`
Purpose: Frank arrives knowing. He watched Kellner run the same move in '41 — a different neighbourhood, a different case, the same warm voice steering a man into a room with no exits. The history sharpens his read. He can see the shape of the play before Kellner finishes setting it up.
Choices:
- "Let Kellner run his pitch before you move — knowing what he is doesn't help unless you let him show his hand" → `kellner_meeting_surface` | gating: none | effects: none | consumable: N
- "Name the old case — 'This is the Eastwick job, Walt. Same move, different street'" → `kellner_confront_past` | gating: requires flags: [frank_past_revealed] | hide_if_failed: true | effects: heat +1 | consumable: N
NPCs present: Walt Kellner

---

### Scene: `kellner_meeting_surface`
Purpose: Kellner's pitch: Frank should give him the ledger. He'll take it through official channels — OCU has the jurisdiction, Frank doesn't. He'll make sure the right people see it. He sounds reasonable. He sounds like he means it. He has a man at the door.
Choices:
- "Tell him you'll think about it — buy yourself time to move" → `kellner_betrayal_escape` | gating: none | effects: none | consumable: N
- "Tell him you don't have the ledger — flat denial" → `kellner_betrayal_escape` | gating: none | effects: none | consumable: N
- "Something's wrong — trust the instinct and get up to leave" → `kellner_betrayal_escape` | gating: none | effects: none | consumable: N
NPCs present: Walt Kellner

---

### Scene: `kellner_meeting_read`
Purpose: Frank reads the tells: Kellner's coffee untouched. The third man at the booth near the door. The moment Kellner mentioned the ledger before Frank did — Kellner knows what Frank has, which means Kellner was told.
Choices:
- "You see it — play for the exit before it closes" → `kellner_betrayal_escape` | gating: none | effects: none | consumable: N
- "Call it out: 'You already knew what I had. Who told you?'" → `kellner_confrontation_open` | gating: none | effects: none | consumable: N
NPCs present: Walt Kellner

---

### Scene: `kellner_meeting_direct`
Purpose: Frank puts it flat. Kellner pauses — just one beat too long — then smiles and says he wants to help Frank not make a mistake. In that pause, Frank sees the whole thing.
Choices:
- "The pause was enough — get up, move toward the door" → `kellner_betrayal_escape` | gating: none | effects: none | consumable: N
- "'You're the mistake, Walt. You've been the mistake since the beginning'" → `kellner_confrontation_open` | gating: none | effects: none | consumable: N
NPCs present: Walt Kellner

---

### Scene: `kellner_confront_past`
Purpose: Frank names the Eastwick job — the case that ended his time on the force. Kellner goes very still. The stillness is confirmation. He says, quietly, "You should have stayed gone, Frank." He reaches for something that isn't his coffee.
Choices:
- "Move — you have about four seconds before the door closes" → `kellner_betrayal_escape` | gating: none | effects: none | consumable: N
NPCs present: Walt Kellner

---

### Scene: `kellner_confrontation_open`
Purpose: Kellner doesn't confirm, doesn't deny. He says Frank is making this harder than it needs to be. The man at the door has stood up. The moment is over — there's nothing left to say.
Choices:
- "Go — now, while there's still a way through" → `kellner_betrayal_escape` | gating: none | effects: none | consumable: N
NPCs present: Walt Kellner, unnamed operative (background threat)

---

### Scene: `kellner_betrayal_escape`
Purpose: Frank gets out — or doesn't. The lethality threshold resolves here. If heat ≥ 8 AND rep ≤ 3: the ambush is surgical, Frank read it too late, there was never really a door open. Permadeath fires. Otherwise: Frank is out, burned, in the street. He knows now. Sets `confronted_kellner`.

**Permadeath branch** (heat ≥ 8 AND rep ≤ 3): → `ending_pavement`
**Survival branch** (all other states): → `act3_running`

Choices:
- (No player choice — the exit from the meeting resolves mechanically to permadeath or survival based on heat/rep thresholds. Frank escapes or doesn't.)
NPCs present: Walt Kellner, operatives (background)

Note: `confronted_kellner` set on survival path. Permadeath path sets no new flags — the investigation ends.

---

### Scene: `ending_pavement`
Purpose: Permadeath. Frank walked into a room and the room had no exits. Not a fight scene — a gap, a silence, the city keeps going and Frank stops. The men who built the trap are already making other calls. The ledger is taken. Dora Reyes never gets a package.
Choices: [] — end state (Pavement, failure ending)
NPCs present: none

---

## Beat 2 — Running Dark

### Scene: `act3_running`
Purpose: Frank is off the board. Office compromised. Phone compromised. He has the ledger and twelve hours before Kellner's net formalises. He moves through Harmon City on institutional memory — back exits, side streets, the kind of routes a man only knows after years on the force. He has time for two errands. Not three.
Choices:
- "Warn June Holt — the men who condemned her block know she talked. She's exposed." → `running_warn_june` | gating: none | effects: none | consumable: N
- "Find Peltz — Ray's coworker might have one more piece if he can be convinced Frank isn't a dead man already" → `running_find_peltz` | gating: none | effects: none | consumable: N
- "Do neither — move faster, keep the heat from climbing" → `running_move_fast` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `running_warn_june`
Purpose: Frank finds June Holt before the men who know her name do. She opens the door and reads his face before he says anything. He gives her five minutes — what she's exposed, who knows, where she shouldn't be for the next week. She listens without interrupting.
Choices:
- "Tell her everything, quickly — she deserves to understand the full picture before she decides anything" → `running_warned_june_full` | gating: none | effects: june_warned: true | consumable: N
- "Give her only what she needs — names, timeline, where not to be. The less she knows, the safer she is." → `running_warned_june_spare` | gating: none | effects: june_warned: true | consumable: N
NPCs present: June Holt

---

### Scene: `running_warned_june_full`
Purpose: June takes it in. She's not frightened — or she is, but that's not the first thing on her face. She asks if Frank is going to do something with what he has. He says he's going to try. She tells him Ray Doss used to bring her coffee from the counter on his survey days. She says it like an offering.
Choices:
- "Leave — there's nothing else to say and the clock is running" → `running_dark_progress` | gating: none | effects: none | consumable: N
NPCs present: June Holt

---

### Scene: `running_warned_june_spare`
Purpose: June nods. She's been living with a version of this knowledge for two years — Frank's warning fills in the edges, doesn't change the shape. She asks only one question: "Is the man who did this going to answer for it?" Frank doesn't lie.
Choices:
- "Leave — you've given her what she needs" → `running_dark_progress` | gating: none | effects: none | consumable: N
NPCs present: June Holt

---

### Scene: `running_find_peltz`
Purpose: Frank finds Peltz at a bar three blocks from the surveying department — the same stool, same draft. Peltz goes white when Frank sits down. He's been waiting for this moment and dreading it.
Choices:
- "Sit with it — let Peltz's fear do the opening for you" → `peltz_act3_silent` | gating: none | effects: none | consumable: N
- "Tell him Frank is going to expose it — he needs to know it's happening, whether or not he helps" → `peltz_act3_direct` | gating: none | effects: none | consumable: N
- "Tell him you just need one thing — what was in the file he saw Ray take home?" → `peltz_act3_specific` | gating: none | effects: none | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_act3_silent`
Purpose: The silence is unbearable for Peltz. He talks. He'd known the boundary files were wrong for months — not because he understood the conspiracy but because the signature on the corrected versions wasn't the same as the original. The penmanship was wrong. He never reported it because he has a family.
Choices:
- "That's the forgery confirmed in the first person — note it" → `peltz_act3_resolve` | gating: none | effects: evidence +1 | consumable: N
- "Let him be — you have what you came for" → `peltz_act3_resolve` | gating: none | effects: none | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_act3_direct`
Purpose: Peltz doesn't argue. He looks down at his glass and says he knew when Ray started taking the Aldwick files home. He didn't stop him. That might count for something or it might not. He doesn't ask Frank to make promises.
Choices:
- "Ask if he'll testify — if this gets to the state auditor, they'll need more than Frank's word" → `peltz_testify_ask` | gating: none | effects: none | consumable: N
- "That's enough — leave him with his answer" → `peltz_act3_resolve` | gating: none | effects: none | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_act3_specific`
Purpose: Peltz tells Frank what was in the file — original boundary coordinates for the Aldwick east block, pre-corrected. Ray had a second set. The official versions on file were different. The official versions were the forgeries.
Choices:
- "Take note — the original coordinates confirm the forgery, independently of Ray's ledger" → `peltz_act3_resolve` | gating: none | effects: evidence +1 | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_testify_ask`
Purpose: Peltz is quiet for a long time. He says he'll think about it. He doesn't say no. Frank knows that's as close to yes as a man with a family gets in Harmon City in 1947.
Choices:
- "It's enough — leave him to it" → `peltz_act3_resolve` | gating: none | effects: rep +1 | consumable: N
NPCs present: Peltz

---

### Scene: `peltz_act3_resolve`
Purpose: Frank walks out of the bar. Whatever Peltz gave him, it's done. The clock is still running.
Choices:
- "Move — the meeting with Peltz cost time, and Kellner's net is tightening" → `running_dark_progress` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `running_move_fast`
Purpose: Frank makes no detours. The fastest route to wherever he's going, no side trips, no obligations. The city moves around him and he moves through it like a man who's been here long enough to know which streets are watched and which aren't.
Choices:
- "Move — there's no time to think, only to move" → `running_dark_progress` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `running_dark_progress`
Purpose: Frank is moving. He has a few hours, a ledger, and whatever he gathered or didn't. The next question is what he does with it. The last window to mail the evidence is still open — for now.
Choices:
- "Find a phone and check if Dora Reyes is reachable — last chance to pass something off before the net closes" → `running_contact_dora` | gating: requires flags: [found_ledger] AND flags_unset: [left_package] | hide_if_failed: true | effects: none | consumable: N
- "Keep moving toward the last angle — figure out what you have and what it means before you do anything with it" → `beat3_last_angle` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `running_contact_dora`
Purpose: Frank finds a pay phone in a hotel lobby — the kind of place where nobody watches who uses the phone. He reaches Dora Reyes through the Tribune's after-hours desk. She picks up on the third ring and says nothing until he says the name Ray Doss.
Choices:
- "Tell her what's coming — prepare her for the package even if you don't mail it now" → `running_dark_progress_dora` | gating: none | effects: rep +1 | consumable: N
- "Don't say anything useful on the phone — just ask if she'll meet" → `running_dark_progress_dora` | gating: none | effects: none | consumable: N
NPCs present: Dora Reyes (by phone)

---

### Scene: `running_dark_progress_dora`
Purpose: Dora doesn't ask questions Frank can't answer safely on an open line. She says she's been waiting for a call like this. She gives Frank an address — the Tribune's print floor entrance, night side. Unlocked until 2am.
Choices:
- "Note it — there's an option now that wasn't there before" → `beat3_last_angle` | gating: none | effects: none | consumable: N
NPCs present: Dora Reyes (by phone)

---

## Beat 3 — The Last Angle

### Scene: `beat3_last_angle`
Purpose: Frank takes stock. The act's mechanical reckoning made narrative — Frank sits somewhere quiet (a diner, a parked car, a stairwell) and goes through what he has. The scene text shifts based on evidence level. With the ledger (evidence ≥ 6): the ledger, Ray's draft letter, the holding company trail, the authorisation chain — a reporter could run this, the right editor could print it. Without the ledger (evidence < 6): impressions, a pattern, a dead client. He knows what happened. He can't prove it to anyone who matters.
Choices:
- "Read through the ledger — make sure you understand what you have before you decide what to do with it" → `last_angle_review` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `last_angle_review`
Purpose: Frank reviews what he has on paper. The scene adjusts its text based on `found_ledger`. With it: Ray's handwriting, systematic discrepancy, the auditor's letter that never got sent. Without it: notes, photographs, parcel numbers, the shape of something he couldn't quite hold.
Choices:
- "This is enough to run — take it to Dora Reyes" → `last_angle_high_evidence_options` | gating: requires evidence ≥ 6 | grey out: "You don't have enough to make it stick. A story needs facts, not a pattern." | effects: none | consumable: N
- "Figure out what you're doing with this before someone takes it away" → `last_angle_low_evidence_options` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `last_angle_high_evidence_options`
Purpose: Frank with the ledger and enough to go public. One window remains — the last chance to mail the package if it hasn't been done. This is the final `left_package` opportunity.
Choices:
- "Mail the key pages to Dora now — get them in the system before anything else happens" → `last_angle_mail_package` | gating: requires flags: [found_ledger] AND flags_unset: [left_package] AND heat < 8 | hide_if_failed: true | effects: none | consumable: N
- "Take everything directly to Dora — go in person, put it on her desk, watch her read it" → `beat4_final_choice` | gating: none | effects: none | consumable: N
- "Think it through one more time — this is the last moment to change your mind" → `last_angle_reconsider` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `last_angle_mail_package`
Purpose: Final mail window. Frank packages the key pages — the original coordinates, the auditor's letter — and drops them in a box. Care of the editorial desk, Dora Reyes. No return address. After this: the window shuts.
Consumable: yes — flag pair: requires `flags_unset: [left_package]`, effects set `left_package: true`. Hidden after taken (`hide_if_failed: true`).
Choices:
- "Drop it and walk away — it's in the system now. Whatever happens to you, those pages are already moving." → `last_angle_package_sent` | gating: requires flags_unset: [left_package] | hide_if_failed: true | effects: left_package: true, heat +1 | consumable: Y
NPCs present: none

---

### Scene: `last_angle_package_sent`
Purpose: Frank walks away from the post office. The decision is made and cannot be unmade. He feels the heat climb — exposure risk, the act of dropping it — but the weight of the package is gone from his hands.
Choices:
- "Move toward the final choice — whatever comes next, you've already done something right" → `beat4_final_choice` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `last_angle_low_evidence_options`
Purpose: Frank without enough. He knows the shape — the rezoning, the money, Vera's death, Ray's disappearance. He can't prove it to a court or a newspaper. He knows it. The city knows he knows it. That's the whole picture.
Choices:
- "Accept it — you did what you could. The city was holding better cards." → `beat4_final_choice` | gating: none | effects: none | consumable: N
- "There might still be a way — Peltz's testimony, the forged signatures, what's left of Vera's file" → `last_angle_scrape` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `last_angle_scrape`
Purpose: Frank goes through everything one last time — trying to pull something useful from the thin evidence path. If he managed to get Peltz's confirmation (from Beat 2), there's something here. If not, there isn't.
Choices:
- "Peltz's account plus the parcel numbers — it's thin but it's something" → `beat4_final_choice` | gating: requires evidence ≥ 4 | grey out: "You don't have enough. Peltz clammed up, or you never found him. What you have won't hold." | effects: none | consumable: N
- "There's nothing more to find — take what you have to the ending it earns" → `beat4_final_choice` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `last_angle_reconsider`
Purpose: Frank sits with the weight of it. Ray Doss put this ledger under a floor and died for it. Vera hired Frank to find her husband and died for it too. The ledger wants to do something — it has weight. Whether Frank is the one who carries it the last step is what he's deciding.
Choices:
- "You didn't come this far to walk away now — move toward Dora Reyes" → `beat4_final_choice` | gating: none | effects: none | consumable: N
- "You came this far knowing it might not be enough — it still might not be enough" → `beat4_final_choice` | gating: none | effects: none | consumable: N
NPCs present: none

---

## Beat 4 — The Final Choice

### Scene: `beat4_final_choice`
Purpose: Frank reaches the moment. The Martyr path resolves automatically if `left_package` is set AND heat ≥ 7 — Kellner's men find him before he can make the choice, but the package is already in transit. Otherwise: the binary choice between Expose and Bury It, with gating.

**Martyr auto-trigger** (requires `left_package: true` AND heat ≥ 7): → `ending_martyr` (no player choice — Frank doesn't get to choose)
**Standard path**: player sees the choice scene below.

Choices:
- "Go to Dora Reyes — take the ledger and everything you have to the Tribune, put it on her desk" → `ending_expose_approach` | gating: requires evidence ≥ 6 | grey out: "You don't have enough to make it stick. A story needs facts, not a pattern." | effects: none | consumable: N
- "Walk away — burn the copies, put the ledger somewhere it will never be found, leave Harmon City tonight" → `ending_bury_choice` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `ending_expose_approach`
Purpose: Frank walks toward the Tribune. He knows what follows — he knows the calculus. Career over. Safety gone. Possibly everything. He goes anyway.
Choices:
- "Walk in — put it on her desk and tell her everything" → `ending_expose` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `ending_expose`
Purpose: Expose ending. Frank gives Dora Reyes the ledger, Ray's letter, the holding company chain, everything he found. She reads without looking up. When she's done, she asks one question: "Are you sure?" He is. The story runs. The city machine slows — not stops, but slows. Frank knows what follows and goes anyway. Left ambiguous whether he survives what comes after.
Choices: [] — end state (Ending 1: Expose)
NPCs present: Dora Reyes

---

### Scene: `ending_bury_choice`
Purpose: The moment before the walk. Frank has decided. The question is whether he has the ledger in hand and knows what he's leaving — or whether the decision was made for him by thin evidence.
Choices:
- "You know what you're leaving behind — the full ledger, Ray's letter, everything. You choose to live." → `ending_bury_late` | gating: requires flags: [found_ledger] | hide_if_failed: true | effects: none | consumable: N
- "You don't have enough — the city beat you on the facts. That's how it goes." → `ending_bury_early_act3` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `ending_bury_late`
Purpose: Bury It, late variant. Frank knows exactly what he's walking away from. He burns the copies. He puts the ledger back somewhere it will stay buried — under a different floor, in a different condemned building. He drives until the city lights are behind him. He knows what the city is smiling about. He carries that.
Choices: [] — end state (Ending 2: Bury It, late — high evidence walk away)
NPCs present: none

---

### Scene: `ending_bury_early_act3`
Purpose: Bury It, low evidence variant (Act 3 version — Frank made it further than Act 1's walk away but still ran out of proof). He didn't have enough to make it stick. The city beat him on the facts. Not because he chose to let it — because he couldn't get there.
Choices: [] — end state (Ending 2: Bury It, low evidence)
NPCs present: none

---

### Scene: `ending_martyr`
Purpose: Martyr ending. Kellner's men find Frank before he can reach the final choice — the heat was too high and the window ran out. But the package is already in transit. Frank gets a moment, in the dark, to understand this: it doesn't matter what happens to him now. Dora Reyes will open the package. The story will run. He won't read it. He did everything right and still didn't survive it. The most tragic ending.
Choices: [] — end state (Ending 3: Martyr — triggered, not chosen)
NPCs present: none

---

## NPCs in this Act

- **Walt Kellner** — appears in `act3_open`, `kellner_meeting_arrival`, `kellner_meeting_cautious`, `kellner_meeting_knowing`, `kellner_meeting_surface`, `kellner_meeting_read`, `kellner_meeting_direct`, `kellner_confront_past`, `kellner_confrontation_open`, `kellner_betrayal_escape`. Central betrayal pivot of the entire story. Closes here — does not survive into the endings as an active character. Referenced by inference in ending scenes.
- **June Holt** — returns from Act 2; appears in `running_warn_june`, `running_warned_june_full`, `running_warned_june_spare`. Optional; sets `june_warned` for flavour in Expose and Martyr endings. Does not appear after the warning scene.
- **Peltz** — returns from Act 1; appears in `running_find_peltz`, `peltz_act3_silent`, `peltz_act3_direct`, `peltz_act3_specific`, `peltz_testify_ask`, `peltz_act3_resolve`. Optional; provides evidence +1 on success paths. Does not appear in endings — his "I'll think about it" on testifying is left unresolved.
- **Dora Reyes** — named from Act 2; first in-person appearance in `ending_expose`. Also referenced by phone in `running_contact_dora` and `running_dark_progress_dora`. Receives the ledger (Expose ending) or the package (Martyr ending). Never appears in Bury It or Pavement endings.
- **Kellner's operatives** (unnamed, 2) — background threat in `kellner_confrontation_open` and `kellner_betrayal_escape`. Instruments of threat; no individual character. One man at the door is all the player ever sees.
