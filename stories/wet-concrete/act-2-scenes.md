# Wet Concrete — Act 2 Scenes

## Beat 1 — The Shape of It

### Scene: `act2_open`
Purpose: Frank takes stock alone — dead client, missing husband, a parcel number that doesn't add up. Transition into the investigation proper. Sets the act's tone: he's working the conspiracy now.
Choices:
- "Go to the city records office — the boundary re-filings are the thread, pull it" → `records_office_return` | gating: none | effects: none | consumable: N
- "Read back through what Vera gave you — her file was the only lead she died with" → `vera_file_review` | gating: requires flags: [met_vera] | hide_if_failed: true | effects: evidence +1 | consumable: N
- "Go to Aldwick first — the paperwork will confirm what the neighbourhood already knows" → `aldwick_hub` | gating: requires flags: [aldwick_visited] | grey out: "You'd be walking in cold. The records first." | effects: none | consumable: N
NPCs present: none

---

### Scene: `vera_file_review`
Purpose: Frank goes through Vera's file — addresses in Aldwick, a list of parcel numbers, a name he hasn't placed yet. Evidence threads into Beat 2.
Choices:
- "Cross-reference the parcel numbers with the records office" → `records_office_return` | gating: none | effects: evidence +1 | consumable: N
- "Take the addresses straight to Aldwick — put a face to the numbers" → `aldwick_hub` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `records_office_return`
Purpose: Frank back at city records. The Aldwick boundary re-filings — filed twice in fourteen months, same parcel cluster, always the same holding company named as the beneficiary. The clerk who was helpful before isn't here today. The one on duty is less curious and more careful.
Choices:
- "Take careful notes — transcribe the filing dates, parcel numbers, and the holding company name" → `records_careful_notes` | gating: none | effects: evidence +1 | consumable: N
- "Photograph the documents — faster, more complete, but you're doing it in front of a stranger" → `records_photograph` | gating: none | effects: evidence +2, heat +2, records_room: true | consumable: Y (flag pair: requires flags_unset: [records_room]; effects set records_room: true; hide_if_failed: true)
- "Try to charm the new clerk — a cooperative clerk gets you access to the re-filing authorisation chain" → `records_charm_act2` | gating: none | effects: none | consumable: N
- "Leave — the records are thin cover. The building was already being watched in Act 1" → `act2_open` | gating: none | effects: none | consumable: N
NPCs present: records clerk (different from Act 1 clerk — unnamed, wary)

---

### Scene: `records_careful_notes`
Purpose: Frank spends two hours with the ledgers. The re-filings always favour Harmon Land Trust LLC. The holding company's registered agent is a name that will mean something later. He has the shape of it on paper.
Choices:
- "Look up Harmon Land Trust in the incorporation registry before you leave" → `harmon_land_trust_lookup` | gating: none | effects: evidence +1 | consumable: N
- "That's enough for now — take it back to the office" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: records clerk

---

### Scene: `records_photograph`
Purpose: Frank photographs what he can before the clerk looks up. He has the documents — the complete set, not just notes. Better evidence, but someone noticed. Consumable — this is the records room break-in equivalent for Act 2.
Choices:
- "Get out of the building" → `records_photograph_exit` | gating: none | effects: none | consumable: N
NPCs present: records clerk

---

### Scene: `records_photograph_exit`
Purpose: Frank on the street outside. He has everything — the re-filings, the holding company, the authorisation chain. He also has the feeling of being seen doing something he shouldn't. Heat has moved.
Choices:
- "Look up Harmon Land Trust before the heat settles — push your luck once more" → `harmon_land_trust_lookup` | gating: none | effects: heat +1 | consumable: N
- "Get clear — go to the office and sort through what you took" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `records_charm_act2`
Purpose: The new clerk is cautious but not hostile. Frank gets access to the authorisation chain for the re-filings — who signed off at each level. The chain has a name at the top: a deputy city official.
Choices:
- "Note the deputy's name and look up what committee he sits on" → `harmon_land_trust_lookup` | gating: none | effects: evidence +1 | consumable: N
- "That's the thread — get out before someone notices you sitting here" → `office_hub_act2` | gating: none | effects: evidence +1 | consumable: N
NPCs present: records clerk

---

### Scene: `harmon_land_trust_lookup`
Purpose: Harmon Land Trust LLC — shell company, registered 1944. The registered agent is a name Frank recognises from a city council development committee. Elected government money, private company, condemned land. The machine is visible now.
Choices:
- "Go to the office — you need to think about what this means before the next move" → `office_hub_act2` | gating: none | effects: evidence +1 | consumable: N
NPCs present: none

---

## Beat 2 — The Aldwick Circuit

### Hub — `aldwick_hub` (Aldwick Neighbourhood, Act 2 version)
Purpose: Frank works the neighbourhood. Available threads change as flags are set. Craddock talks early; June requires rep threshold; Marta requires Craddock exhausted and rep ≥ 3. Frank can always leave.
Returns from: `act2_open`, `craddock_hub` return, `june_hub` return, `beat3_return`, `beat4_return`
Choices:
- "Find Craddock — the old man who said the condemnation inspector never looked at the buildings" → `craddock_approach` | gating: requires flags_unset: [craddock_exhausted] | grey out if failed: "You've gotten everything Craddock has to give." | effects: none | consumable: N
- "Find June Holt — she showed you the letter about relocation money assigned before the residents were notified" → `june_approach` | gating: requires rep ≥ 4 AND flags_unset: [june_exhausted] | grey out: "June Holt has no reason to trust you yet." | effects: none | consumable: N
- "Listen — walk the streets, say nothing, let the neighbourhood tell you what it knows" → `aldwick_listen` | gating: none | effects: rep +1 | consumable: N
- "Find Marta Gaines — she's been documenting the boundary shifts since Act 1" → `marta_act2_approach` | gating: requires flags: [craddock_exhausted] AND rep ≥ 3 | grey out: "Marta won't talk to you yet. Do the groundwork first." | effects: none | consumable: N
- "Go back to the office — process what you have" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: Hector (background), neighbourhood residents (background)

---

### Scene: `aldwick_listen`
Purpose: Frank walks Aldwick slow. Listens to a mother argue with a relocation officer. Watches a man nail a notice to his own door because the city won't send someone to do it. A neighbourhood being unmade, and nobody in city hall is watching.
Choices:
- "Spend time here — another hour in the neighbourhood builds more goodwill than a dozen questions" → `aldwick_hub` | gating: none | effects: rep +1 | consumable: N
- "That's enough — you understand the place now" → `aldwick_hub` | gating: none | effects: none | consumable: N
NPCs present: background residents

---

### Conversation — `craddock_hub`
Purpose: Silas Craddock, 70s, former building inspector. He knows the difference between a condemned building and a condemned-on-paper building. He's been watching the neighbourhood get hollowed out and he's angry in the quiet way of men who used to have authority.
Topics:
- "What made the inspector's visit wrong?" → `craddock_inspection` | flag set on exhaustion: `craddock_topic_inspection` | effects: evidence +1
- "Who authorised the condemnations?" → `craddock_authorisation` | flag set: `craddock_topic_auth` | effects: evidence +1 | gating: requires flags: [craddock_topic_inspection]
- "Have you talked to anyone else about this?" → `craddock_others` | flag set: `craddock_topic_others` | effects: rep +1
Walk-away: "That's enough for now, Mr. Craddock — I'll be back" → `aldwick_hub` | effects: none

Flag set when all topics exhausted: `craddock_exhausted`
NPCs present: Silas Craddock

---

### Scene: `craddock_approach`
Purpose: Frank finds Craddock on his stoop — same stoop, different weather. The old man was expecting someone to come back around eventually.
Choices:
- "Sit with him a while before you ask anything" → `craddock_hub` | gating: none | effects: rep +1 | consumable: N
- "Get straight to it — you have questions and he has answers" → `craddock_hub` | gating: none | effects: none | consumable: N
NPCs present: Silas Craddock

---

### Scene: `craddock_inspection`
Purpose: Craddock describes the inspector's visit — half an hour, no tape measure, no flashlight in the basement. A man filling out a form that was already filled out before he arrived.
Choices:
- "Back to conversation" → `craddock_hub` | gating: none | effects: craddock_topic_inspection: true | consumable: N
NPCs present: Craddock

---

### Scene: `craddock_authorisation`
Purpose: Craddock has a copy of the condemnation order. The authorising official is a name Frank has seen before — the deputy from the development committee. Same man who signed off on the re-filings.
Choices:
- "Back to conversation" → `craddock_hub` | gating: none | effects: craddock_topic_auth: true, evidence +1 | consumable: N
NPCs present: Craddock

---

### Scene: `craddock_others`
Purpose: Craddock sent a letter to his alderman six months ago. No reply. Mentions a woman who's been keeping more detailed records — Marta Gaines. He'll put in a word for Frank if Frank needs it.
Choices:
- "Back to conversation" → `craddock_hub` | gating: none | effects: craddock_topic_others: true, rep +1 | consumable: N
NPCs present: Craddock

---

### Scene: `june_approach`
Purpose: June Holt answers the door like a woman who has been answering it for city men for two years. Frank is the first one she lets past the threshold.
Choices:
- "Let her set the pace — she has something to show you" → `june_hub` | gating: none | effects: none | consumable: N
- "Tell her what you know — it may prompt her to show you what she has" → `june_hub` | gating: none | effects: rep +1 | consumable: N
NPCs present: June Holt

---

### Conversation — `june_hub`
Purpose: June has the letter — relocation money assigned to a city contractor before residents were notified. She's kept every piece of paper that passed through her door in the last eighteen months.
Topics:
- "The relocation letter — who signed it and when?" → `june_letter` | flag set: `june_topic_letter` | effects: evidence +1
- "The contractor named in the letter — do you know who they are?" → `june_contractor` | flag set: `june_topic_contractor` | effects: evidence +1 | gating: requires flags: [june_topic_letter]
- "What happened to the neighbours who took the relocation offer?" → `june_neighbours` | flag set: `june_topic_neighbours` | effects: rep +1
Walk-away: "Thank you, June — I'll look into this" → `aldwick_hub` | effects: none

Flag set when all topics exhausted: `june_exhausted`
NPCs present: June Holt

---

### Scene: `june_letter`
Purpose: The letter is dated three weeks before the first condemnation notice. The contractor is named: Harmon Land Assessment Services. The same family of names Frank's been finding in every document.
Choices:
- "Back to conversation" → `june_hub` | gating: none | effects: june_topic_letter: true | consumable: N
NPCs present: June Holt

---

### Scene: `june_contractor`
Purpose: June didn't know the contractor. But she found a business address. Frank recognises the street — near city hall, same block as the development committee office.
Choices:
- "Back to conversation" → `june_hub` | gating: none | effects: june_topic_contractor: true, evidence +1 | consumable: N
NPCs present: June Holt

---

### Scene: `june_neighbours`
Purpose: Three families took the offer and left. Two refused and had their leases legally contested — the boundary error argument. June stayed because her lease pre-dates the most recent survey by twelve years.
Choices:
- "Back to conversation" → `june_hub` | gating: none | effects: june_topic_neighbours: true | consumable: N
NPCs present: June Holt

---

## Beat 3 — The Holding Company

### Scene: `beat3_holding_company`
Purpose: Frank traces Harmon Land Trust LLC through the city's incorporation records. Shell company, and the shell has a shell. But the second shell's registered agent is a name from the development committee. Elected government money moving through private companies to buy condemned land.
Choices:
- "Stop at the registered agent — you have enough to name the connection" → `holding_company_agent` | gating: none | effects: evidence +1 | consumable: N
- "Follow the memo thread — there's a reference to a federal highway contract in old city council minutes" → `highway_contract_dig` | gating: none | effects: heat +1 | consumable: N
- "Look up the development committee's voting record — if they voted the right way, that's the quid pro quo" → `committee_vote_check` | gating: none | effects: none | consumable: N
NPCs present: none (archive work)

---

### Scene: `holding_company_agent`
Purpose: The registered agent's name is Aldous Vane — deputy chair of the city's development committee since 1943. Frank writes it down. The machine has a name now, even if it doesn't have a face.
Choices:
- "Find out what contracts Vane's committee has approved in the last three years" → `vane_contracts` | gating: none | effects: evidence +1 | consumable: N
- "That's enough — go to the office with what you have" → `beat3_aldwick_return` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `highway_contract_dig`
Purpose: The contract archive is restricted — not public records, not technically accessible. Frank has to finesse or force access. Finesse: rep ≥ 4 gets him in through a contact. Force: breaks the cabinet lock. The highway contract is there — federal money, Harmon City gets the on-ramp development rights, and the Aldwick east block is directly in the corridor.
Choices:
- "Use a contact to get in — you know people in city hall who owe you small favours" → `highway_contract_contact` | gating: requires rep ≥ 4 | grey out: "You don't have the standing to call that favour. Not yet." | effects: evidence +2 | consumable: N
- "Break the lock — it's a file cabinet in a public building at 9pm, not a safe" → `highway_contract_break` | gating: none | effects: evidence +2, heat +2 | consumable: N
- "Back off — the archive is too risky right now" → `beat3_aldwick_return` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `highway_contract_contact`
Purpose: Frank's city hall contact — a mid-level clerk who's been doing favours since Frank got his daughter out of a bad situation in '44 — lets him into the restricted archive for twenty minutes. No questions. The highway contract confirms everything: federal right-of-way through Aldwick's east block, city development rights for the surrounding parcels. This is worth millions to whoever owns them.
Choices:
- "Copy the contract reference numbers — this is what Ray found" → `beat3_aldwick_return` | gating: none | effects: evidence +1 | consumable: N
NPCs present: city hall contact (minor NPC — unnamed, never described, debts as currency)

---

### Scene: `highway_contract_break`
Purpose: The lock gives. Frank has the contract. He also has the near-certainty that someone noticed the broken cabinet before morning. The evidence is worth the heat — probably.
Choices:
- "Get out — you've been here too long already" → `beat3_aldwick_return` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `committee_vote_check`
Purpose: The development committee's voting record on Aldwick-related motions. Every vote that mattered was unanimous — no dissent, no abstentions, no procedural objections. The committee chair is a man named Leland Dowd. Vane's boss. Frank writes that name down.
Choices:
- "Look up Dowd — see what connects him to Harmon Land Trust" → `vane_contracts` | gating: none | effects: evidence +1 | consumable: N
- "You have the chain — take it to the office" → `beat3_aldwick_return` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `vane_contracts`
Purpose: Vane's committee has approved forty-three contracts since 1943. Twelve of them in the last fourteen months — all in districts adjacent to the federal highway corridor. The pattern is systematic. This isn't incompetence or coincidence.
Choices:
- "Go to Aldwick — Marta Gaines will know what this maps to on the ground" → `aldwick_hub` | gating: none | effects: evidence +1 | consumable: N
- "Go to the office — you need to think before the next move" → `beat3_aldwick_return` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `beat3_aldwick_return`
Purpose: Frank has traced the holding company as far as the public record will take him. He knows the shape: Harmon Land Trust buys condemned land; the condemnation authority is the development committee; the committee chair and deputy are the same men who appear on the Aldwick re-filings.
Choices:
- "Go back to Aldwick — the neighbourhood threads need to close" → `aldwick_hub` | gating: none | effects: none | consumable: N
- "Go to the office first — Kellner's been reaching out, and it's time to decide what to do about him" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: none

---

## Hub — Frank's Office (Act 2 version)

### Hub — `office_hub_act2`
Purpose: Frank's office between beats. The phone brings different things now — unsigned notes, a city hall contact who goes quiet mid-sentence, Kellner's messages. The ambient text tracks heat: below 5 it's a working detective's office; at 5+ a threatening scene fires once (broken window); at 7+ `cops_warned_off` sets and the text becomes quieter, more watchful.
Returns from: all beats; Aldwick hub exit; post-Kellner meeting
Choices:
- "Read the note that was slid under the door — it came while you were out" → `office_note_threat` | gating: requires flags_unset: [office_note_read] AND heat ≥ 3 | hide_if_failed: true | effects: none | consumable: N (sets office_note_read flag)
- "Call Walt Kellner — he's been leaving messages. Time to hear what he wants" → `kellner_first_contact` | gating: requires flags_unset: [kellner_surfaced] | hide_if_failed: true | effects: none | consumable: N
- "Go see Kellner — the meeting he suggested. Old colleagues catching up" → `kellner_hub` | gating: requires flags: [kellner_surfaced] AND flags_unset: [confronted_kellner] | hide_if_failed: true | effects: none | consumable: N
- "Work the case — there's still thread to pull on" → `aldwick_hub` | gating: none | effects: none | consumable: N
- "Mail the evidence copy to Dora Reyes — the journalist you know. Insurance" → `mail_package` | gating: requires flags: [found_ledger] AND flags_unset: [left_package] AND heat ≤ 7 | hide_if_failed: true | effects: none | consumable: N (see Beat 5 for primary package scene)
Exit: "Get back to work — the office doesn't have answers" → `aldwick_hub` | gating: none
NPCs present: none (Kellner by phone; threats ambient)

---

### Scene: `office_note_threat`
Purpose: The note is plain paper, typed: "A man your age shouldn't be spending his evenings in government archives." Two-day-old information. Someone has been watching him longer than he thought.
Choices:
- "File it — knowing they're watching is itself information" → `office_hub_act2` | gating: none | effects: office_note_read: true | consumable: N
- "Burn it — if they wanted a reaction, don't give them one" → `office_hub_act2` | gating: none | effects: office_note_read: true, rep +1 | consumable: N
NPCs present: none

---

### Scene: `office_window_threat`
Purpose: (Fires automatically at heat ≥ 5 on next office visit, before the player sees choices.) A brick through the window at 2am. No note. Frank sits in the dark with the lights off for ten minutes, thinking about who sends that kind of message to a private detective.
Choices:
- "Report it to the police — they need to know someone's doing this" → `office_window_police` | gating: none | effects: none | consumable: N
- "Don't report it — reporting it is telling them you noticed, and they already know you noticed" → `office_hub_act2` | gating: none | effects: heat -1 | consumable: N
- "Move the desk away from the window — and keep working" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `office_window_police`
Purpose: The officer who takes Frank's report is not interested. Writes down "vandalism." Doesn't look up from his pad. Walks out before Frank finishes the sentence. `cops_warned_off` flag context — the police are not on his side.
Choices:
- "Let it go — the report is on paper. That's what matters" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: responding officer (unnamed, minor)

---

### Scene: `kellner_first_contact`
Purpose: Frank calls Kellner back, or Kellner picks up when Frank's number shows on the switchboard. Old colleagues. Kellner's voice is warm, precise, the voice of a man who never lost his cop register. Suggests they get together for coffee — he's heard Frank's been asking around Aldwick and he has some thoughts.
Choices:
- "Agree to the meeting" → `office_hub_act2` | gating: none | effects: kellner_surfaced: true | consumable: N
- "Keep it vague — say you'll call when you have more time" → `office_hub_act2` | gating: none | effects: kellner_surfaced: true | consumable: N
NPCs present: Walt Kellner (by phone)

---

## Conversation — Walt Kellner

### Scene: `kellner_arrive`
Purpose: Frank meets Kellner at a diner he'd have picked himself. Kellner looks good — well-fed, the easy confidence of a man whose career went the right direction. He orders coffee and seems genuinely glad to see Frank.
Choices:
- "Keep it light — catch up before you figure out what he actually wants" → `kellner_hub` | gating: none | effects: rep +1 | consumable: N
- "Skip the warmth — what does Kellner want?" → `kellner_hub` | gating: none | effects: none | consumable: N
NPCs present: Walt Kellner

---

### Conversation — `kellner_hub`
Purpose: Walt Kellner, lieutenant in the OCU, old partner from Frank's cop days. Warm, cautious, specific about the past. His advice reads as either protective or probing — the ambiguity is the point. Topics deplete; hub closes when `confronted_kellner` is set in Act 3.
Topics:
- "The old days — what Frank did and didn't do, and why he left the force" → `kellner_frank_past` | flag set: `kellner_topic_past` | effects: none
- "What Kellner knows about Aldwick" → `kellner_aldwick` | flag set: `kellner_topic_aldwick` | effects: none
- "City politics — who really runs Harmon City's development decisions" → `kellner_politics` | flag set: `kellner_topic_politics` | effects: evidence +1 | gating: requires flags: [kellner_topic_aldwick]
- "Whether Frank should drop the case" → `kellner_drop_advice` | flag set: `kellner_topic_drop` | effects: none
- "Tell Kellner what you've found — the surveys, the holding company, Harmon Land Trust" → `kellner_confide` | flag set: `trusted_kellner` | gating: requires flags_unset: [trusted_kellner] | hide_if_failed: true | effects: none | consumable: Y (trusted_kellner: true; requires flags_unset: [trusted_kellner])
- "Ask about Frank being pushed out of the force — Kellner would know" → `kellner_pushout` | flag set: `frank_past_revealed` | gating: requires rep ≥ 6 | grey out: "Kellner would deflect. You don't have the standing to push him yet." | effects: none
Walk-away: "Good seeing you, Walt — I'll be in touch" → `office_hub_act2` | effects: none
NPCs present: Walt Kellner

---

### Scene: `kellner_frank_past`
Purpose: Kellner talks about the old days — a specific arrest Frank made in '41, a night they worked together that ended well. He's warm and specific. Too specific. The kind of specific that builds a record.
Choices:
- "Back to conversation" → `kellner_hub` | gating: none | effects: kellner_topic_past: true | consumable: N
NPCs present: Kellner

---

### Scene: `kellner_aldwick`
Purpose: Kellner knows Aldwick is politically loaded. Tells Frank it's the kind of neighbourhood that attracts attention from people who have more pull than Frank does. Doesn't tell Frank to drop it. Just tells him to be careful.
Choices:
- "Back to conversation" → `kellner_hub` | gating: none | effects: kellner_topic_aldwick: true | consumable: N
NPCs present: Kellner

---

### Scene: `kellner_politics`
Purpose: Kellner names Leland Dowd — committee chair, city hall powerbroker — as the man to watch if you want to understand Harmon City development. Says it with the neutrality of a man who's been briefed to say exactly that. Frank notices. Or doesn't.
Choices:
- "Back to conversation" → `kellner_hub` | gating: none | effects: kellner_topic_politics: true, evidence +1 | consumable: N
NPCs present: Kellner

---

### Scene: `kellner_drop_advice`
Purpose: Kellner says, plainly, that there are cases that don't end well for the man who works them. He says it as a friend. He says it like he knows something Frank doesn't. Frank can read it either way.
Choices:
- "Tell him you don't drop cases" → `kellner_hub` | gating: none | effects: kellner_topic_drop: true | consumable: N
- "Tell him you'll think about it — and mean the opposite" → `kellner_hub` | gating: none | effects: kellner_topic_drop: true | consumable: N
- "Agree — put him at ease" → `kellner_hub` | (convergent — same destination; lying to Kellner vs. meaning it; choose Frank's register) | gating: none | effects: kellner_topic_drop: true | consumable: N
NPCs present: Kellner

---

### Scene: `kellner_confide`
Purpose: Frank tells Kellner what he's found. The boundary re-filings. Harmon Land Trust. The holding company agent's name. Kellner listens carefully, nods in the right places, says very little. When Frank is done, Kellner says he'll ask around quietly — he has contacts in the OCU who cover city contracts. Sets `trusted_kellner` — Frank has handed Kellner a map.
Choices:
- "Back to conversation" → `kellner_hub` | gating: none | effects: trusted_kellner: true | consumable: N
NPCs present: Kellner

---

### Scene: `kellner_pushout`
Purpose: Frank asks directly why he was pushed out of the force. Kellner goes still — just for a moment. Then he says it was politics, always politics, and Frank made enemies above his pay grade. He doesn't say which enemies. He doesn't say he was one of them. But Frank sees it in the stillness.
Choices:
- "Let it sit — you've seen enough" → `kellner_hub` | gating: none | effects: frank_past_revealed: true | consumable: N
- "Push him — 'You were involved, Walt'" → `kellner_pushout_confrontation` | gating: none | effects: frank_past_revealed: true | consumable: N
NPCs present: Kellner

---

### Scene: `kellner_pushout_confrontation`
Purpose: Kellner doesn't confirm or deny. He says, "You should have let that one go, Frank." It's not an admission. It's a description. He pays for the coffee and leaves.
Choices:
- "Let him walk" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: Kellner

---

## Beat 4 — Marta Gaines

### Scene: `marta_act2_approach`
Purpose: Frank goes back to Marta Gaines. She's expecting him — Craddock put in the word. The question is whether she trusts him enough to give him the full picture.
Choices:
- "Tell her everything you know — she's been tracking this longer than you have" → `marta_act2_full` | gating: requires rep ≥ 5 | grey out: "She'd hear it as a test. She doesn't trust you that far yet." | effects: marta_talked: true | consumable: N
- "Show her what you have — the parcel numbers, the holding company name — and let her match it to what she knows" → `marta_act2_partial` | gating: requires rep 3–4 (rep ≥ 3) | grey out: "She'd close the door. You don't have the standing." | effects: marta_talked: true | consumable: N
- "Go back — you need more rep before she'll talk. Spend more time in Aldwick" → `aldwick_hub` | gating: none | effects: none | consumable: N
NPCs present: Marta Gaines

---

### Scene: `marta_act2_full`
Purpose: Rep ≥ 5 path. Marta shows Frank everything — her notebook, seventeen parcels, handwritten maps of the condemned blocks. She tells Frank that Ray was resurrveying the east block in his own time, on weekends, comparing the official filed boundaries to what was actually on the ground. She tells Frank that Ray left something at a specific address: 44 Trumbull Street, a building he kept coming back to. He called it the quiet one.
Choices:
- "44 Trumbull Street — that's where Ray hid the ledger" → `beat5_approach` | gating: none | effects: evidence +2 | consumable: N
NPCs present: Marta Gaines

---

### Scene: `marta_act2_partial`
Purpose: Rep 3–4 path. Marta talks, gives Frank the block map but not the specific address. She tells him Ray was using a condemned building on the south side as a working space — she doesn't know which one. Frank has to find it himself.
Choices:
- "Work the south block — check each condemned building" → `trumbull_street_search` | gating: none | effects: evidence +1 | consumable: N
- "Go to the records office — condemned building permits will narrow it down" → `trumbull_street_records` | gating: none | effects: none | consumable: N
NPCs present: Marta Gaines

---

### Scene: `trumbull_street_search`
Purpose: Frank walks the condemned south block. Six buildings, all vacant on paper. Most are genuinely empty. One — 44 Trumbull Street — has marks on the floor that suggest recent use. Recent enough.
Choices:
- "Go in" → `beat5_approach` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `trumbull_street_records`
Purpose: Frank finds the condemned building permits for Aldwick's south block. One building — 44 Trumbull — was condemned fourteen months ago but the permit for demolition was never filed. Someone delayed it deliberately. Someone who needed the building to stay standing a little longer.
Choices:
- "44 Trumbull Street" → `beat5_approach` | gating: none | effects: evidence +1 | consumable: N
NPCs present: none

---

### Scene: `marta_closed`
Purpose: Rep < 3 path. Marta opens the door, looks at Frank, and closes it again. No words. Frank stands on the street knowing he didn't do enough, and now the door is shut.
Choices:
- "Come back when you've earned it — more time in Aldwick, more listening" → `aldwick_hub` | gating: none | effects: none | consumable: N
- "Try the records approach instead — Marta's path is closed" → `trumbull_street_records` | gating: none | effects: none | consumable: N
NPCs present: none

---

## Beat 5 — The Ledger

### Scene: `beat5_approach`
Purpose: Frank at 44 Trumbull Street. Condemned, dark, quiet. He goes in. The kitchen floor. Under the boards. Right where a man who'd thought about it would put something he didn't want found.
Choices:
- "Check under the floor" → `beat5_ledger_found` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `beat5_ledger_found`
Purpose: The ledger. Ray Doss's field book — original boundary coordinates against the filed versions, annotated in Ray's hand. Systematic discrepancies. Plus a carbon of the letter Ray was drafting to the state auditor. He never sent it. Sets `found_ledger`. Evidence +3, heat +2.
Choices:
- "Take everything and get out — you have what Ray died for" → `beat5_depart` | gating: none | effects: found_ledger: true, evidence +3, heat +2 | consumable: N
NPCs present: none

---

### Scene: `beat5_depart`
Purpose: Frank stands on Trumbull Street with the ledger. He's been watched getting here — he can feel it in the way a car didn't pass twice and then did. Before he goes, one choice: mail a copy.
Choices:
- "Mail a copy of the key pages to Dora Reyes at the Tribune — she's a press contact who will know what to do with it" → `mail_package` | gating: requires flags_unset: [left_package] | hide_if_failed: true | effects: none | consumable: N (leads to package scene; consumable)
- "Don't mail anything yet — take the ledger to the office and think" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `mail_package`
Purpose: The post office two blocks from Trumbull, or later from near the office. Frank packages the key pages — the original coordinates, the letter to the auditor — and mails them to Dora Reyes at the Tribune. Care of the editorial desk. No return address.
Consumable: yes — flag pair: requires `flags_unset: [left_package]`, effects set `left_package: true`. Hidden after taken (`hide_if_failed: true`).
Choices:
- "Drop it in the box — it's done. If something happens to you, it gets out anyway" → `mail_package_done` | gating: requires flags_unset: [left_package] | hide_if_failed: true | effects: left_package: true | consumable: Y
NPCs present: none

---

### Scene: `mail_package_done`
Purpose: Frank walks away from the post office. The package is in the system. He can't get it back. He doesn't want to. `left_package` set.
Choices:
- "Go to the office — there's one more move before the act closes" → `office_hub_act2` | gating: none | effects: none | consumable: N
NPCs present: none

---

## Beat 6 — The Closing Net

### Scene: `beat6_approach`
Purpose: (Fires after ledger is found, on next office hub visit.) Two men are outside Frank's building when he gets back. They follow him up the stairs. No badges visible. They're not here to arrest him.
Choices:
- "Go up — you're going to your own office, not a back alley" → `beat6_confrontation` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `beat6_confrontation`
Purpose: The two plainclothes officers make it plain: Frank should stop. "Professional courtesy." One of them uses Frank's full name and mentions Trumbull Street. `cops_warned_off` set if not already.
Choices:
- "Read it as a bluff — nod along, tell them you hear them, send them out the door" → `beat6_bluff` | gating: none | effects: cops_warned_off: true | consumable: N
- "Read it as real — back off. Any further action costs. You know the math now." → `beat6_back_off` | gating: none | effects: cops_warned_off: true | consumable: N
- "Turn it back on them — let them see that a man who knows what you know doesn't scare easy" → `beat6_pushback` | gating: requires rep ≥ 5 | grey out: "You don't have the standing to back them down. They'd laugh." | effects: cops_warned_off: true, heat +1, evidence +1 | consumable: N
NPCs present: two plainclothes officers (unnamed, minor — instruments of threat, not characters)

---

### Scene: `beat6_bluff`
Purpose: The men leave. Frank sits in the chair where Vera sat and thinks about what it means that they mentioned Trumbull by name. They know. They've known. They let him find the ledger.
Choices:
- "They let you find it — they want to know what you do with it. That changes things." → `beat6_exit` | gating: none | effects: none | consumable: N
NPCs present: none

---

### Scene: `beat6_back_off`
Purpose: Frank backs off — visibly, functionally. He stops taking new steps for two days. In those two days he thinks about what backing off costs and whether the people who sent the warning are going to be satisfied with less than his silence forever.
Choices:
- "You can't stay backed off — staying still is just a slower way of losing" → `beat6_exit` | gating: none | effects: heat -1 | consumable: N
NPCs present: none

---

### Scene: `beat6_pushback`
Purpose: Frank leans into it. Says he's been warned before by men with better cards than these two are holding. Reads something in the way the shorter one blinks — there's a deadline on this. Something is moving faster than Frank thought.
Choices:
- "A deadline means a timetable. That's information." → `beat6_exit` | gating: none | effects: evidence +1 | consumable: N
NPCs present: none

---

### Scene: `beat6_exit`
Purpose: Act 2 close. Frank has the ledger, a map of the conspiracy, heat he can feel, and the knowledge that he's being watched by people with badges and a schedule. Act 3 will start where this ends — no grace period, no buffer.
Choices:
- [] — handoff to Act 3 (exit state evaluated: evidence, heat, rep, found_ledger, left_package, trusted_kellner, cops_warned_off)
NPCs present: none

---

## NPCs in this Act

- **Walt Kellner** — first appears (by phone) in `kellner_first_contact`; in person from `kellner_arrive` onward. Conversation hub in `kellner_hub`. Recurs in Act 3 as the betrayal pivot. Most important NPC in Act 2.
- **Silas Craddock** — first appears in `craddock_approach`; conversation hub in `craddock_hub`. Aldwick elder. Background colour; does not recur in Act 3.
- **June Holt** — first appears in `june_approach`; conversation hub in `june_hub`. Aldwick resident with documentary evidence. Does not recur in Act 3.
- **Marta Gaines** — returns from Act 1; primary appearance in `marta_act2_approach`, `marta_act2_full`, `marta_act2_partial`. The gate to the ledger. Does not appear in Act 3 — mentioned only.
- **Hector** — background colour in `aldwick_hub` and `aldwick_listen`. Returns from Act 1. No active dialogue; his presence is texture.
- **Aldous Vane** — named in documents only (never met in person). Deputy chair, development committee. Named in `holding_company_agent` and `vane_contracts`.
- **Leland Dowd** — named in `committee_vote_check` and `kellner_politics`. Committee chair, city powerbroker. Named, never encountered. Antagonist by reference.
- **Dora Reyes** — named only in `beat5_depart` and `mail_package`. Tribune journalist. Receives the package if `left_package` is set. Never appears in person; her name vanishes from the office hub at heat ≥ 8.
- **City hall contact** (unnamed) — minor; appears only in `highway_contract_contact`. A debt being spent.
- **Records clerk** (Act 2 version, unnamed) — appears in `records_office_return` and branches. Different from Act 1 clerk; wary rather than bored.
- **Two plainclothes officers** (unnamed) — appear in `beat6_confrontation`. Instruments of threat; no individual character.
