# Dead Letters — Act 2: The Knot

## Journal Entry
I stopped working a case and started working a conspiracy. There's a difference. Cases have clients.

## Entry
Arrives from: Act 1 Exits B–F (any forward push)
Player state at entry:
- evidence 1–3, heat 0–3, rep 2–4
- Flags set: `met_vera`, `vera_dead`, `aldwick_visited`
- Optional: Vera's file addresses known (evidence 3 entries) — used to shortcut Beat 2's ledger-hunt start
- Act 1 Exit A (walk away) does not enter this act — it routes directly to Bury It ending

---

## Beats

### Beat 1 — The Shape of It
Frank is alone with what he has: a dead client, a missing surveyor, a neighbourhood parcel number that doesn't add up. He goes back to basics — what was Ray actually doing? City records, quietly this time, reveal the Aldwick boundary surveys were re-filed twice in fourteen months. The refiles always favour the same holding company. Frank doesn't know who owns it yet. He knows it's wrong.

What the player decides: how hard to dig at the records office now. Take careful notes (evidence +1, heat +0) or photograph the documents and take them (evidence +2, heat +2 — and sets `records_room` consumable as used). The sneakier play has better evidence payoff but starts the heat clock. A player who already pressed hard in Act 1 may be near a threshold where the confrontation scene triggers instead of clean access.

Connects to: Beat 2 (linear)

### Beat 2 — The Aldwick Circuit
Frank works the Aldwick neighbourhood hub. He's been here once (Act 1 Beat 3); now he's coming back to ask harder questions. Sets `aldwick_visited` already — he's a known face, which helps or hurts depending on how he handled it before. The neighbourhood is being hollowed out: three blocks of houses condemned in the last year, residents forced out on short notice with below-market offers. An old man named Craddock tells Frank the condemnation inspector "never actually looked at the buildings." A woman named June Holt shows him a letter — the relocation money was assigned to a city contractor before the residents were even notified.

Rep gates what Frank learns here: rep ≥ 4 gets the Craddock lead and June's letter (evidence +1 each visit while threads remain); rep 2–3 gets Craddock but not June; rep < 2, doors stay shut. Frank can spend a visit doing nothing but listening and asking nothing — this builds rep +1 but yields no evidence. The hub loops: Frank can return between beats.

What the player decides: how to work the neighbourhood — press for facts (evidence gain, no rep gain) or build trust first (rep gain, slower evidence). A mix is possible across multiple visits.

Connects to: Beat 3 and Beat 4 from the hub; returns to hub from both

### Hub — Aldwick Neighbourhood
Frank's primary investigative base in Act 2 outside his office. Available threads change as flags are set: Craddock talks early, June requires a rep threshold, Marta Gaines (Beat 4) requires `aldwick_visited` plus Craddock thread exhausted. Each thread is a conversation hub — topics deplete, the usual pattern. Frank can always leave (return to Frank's Office hub) or push deeper to a new contact.

Returns to from: Beat 2, Beat 3, Beat 4 follow-up visits
Exits to: Beat 3 (Kellner surfaces — triggered after first Aldwick visit); Beat 4 (Marta, triggered when Craddock thread exhausted and rep ≥ 3); Frank's Office hub

### Hub — Frank's Office (Act 2 version)
Frank's second base of operations. Vera no longer calls. The phone rings with other things: an unsigned note under the door (someone knows he's asking); a message from a city hall contact who doesn't want to be named; silence. The hub changes visually and tonally as heat climbs — the ambient text reflects whether Frank feels watched. At heat ≥ 5 a threatening scene fires from the office hub (two men, no words, a broken window — heat escalates if Frank doesn't read it right). At heat ≥ 7, the ambient threat escalates to a formal warning: `cops_warned_off` flag set.

Returns to from: all beats; between Aldwick visits
Exits to: all active beats; Beat 5 (Kellner meeting — player-initiated, available after `trusted_kellner` or `kellner_surfaced` flag set)

### Conversation — Walt Kellner
Walt Kellner surfaces after Frank's first Aldwick visit — an old colleague, a friendly face. He reaches out to Frank rather than the reverse. In conversation, he's warm, specific about the bad old days, and gently cautions Frank that Aldwick is politically loaded. Topics: Frank's history with the force, what Frank knows about Aldwick, city politics (Kellner has opinions, not all of them honest), whether Frank should drop it. Each topic sets a flag; exhausted topics vanish. The ambiguity is structural: Kellner's cautions can read as protective or as probing for what Frank knows.

If Frank confides what he's found (`trusted_kellner` flag set when Frank shares the boundary survey detail or the holding company name), Kellner's subsequent cautions become more pointed and his later betrayal lands harder.

Player-visible nuance: Kellner never lies in this conversation — he deflects, reframes, redirects. A careful reader will notice. A trusting one won't.

Where it sits: available from Frank's Office hub starting after Beat 2; player-initiated; can be visited multiple times until `confronted_kellner` closes it in Act 3.

### Beat 3 — The Holding Company
The condemnation trail leads to a holding company: Harmon Land Trust LLC. Frank traces it through city incorporation records — it's a shell, and the shell has a shell. But the second shell's registered agent is a name Frank recognizes from a city council development committee. That's elected government money moving through a private company to buy condemned land in Aldwick. Combine this with the falsified surveys: someone is manufacturing reasons to condemn, buying cheap, and re-titling. The highway is the why — a federal contract Frank finds reference to in an old city council memo.

What the player decides: how deep to go. Stop at the registered agent (evidence +1, heat +0) or follow the memo thread to the highway contract (evidence +2, heat +1 — the contract archive is restricted, Frank has to finesse or force access). Pushing harder here is the difference between knowing "something's wrong" and understanding the machine.

Connects to: Hub (return to Aldwick or office); Beat 4 (Marta, when rep gate is met)

### Beat 4 — Marta Gaines
Marta Gaines is a middle-aged Aldwick resident who knows exactly what's happening to her neighbourhood, has no proof that would hold up, and has been waiting for someone to ask the right questions. She's not an informant — she's a witness who decided to stop staying quiet. Rep ≥ 5: she talks fully, produces a handwritten map showing which blocks are condemned vs. which Ray was resurveying — and tells Frank that Ray left something at a specific address, a building he kept returning to. Rep 3–4: she talks, gives the blocks but not the address — Frank has to find the specific location himself (second Aldwick visit required, or records room detour). Rep < 3: she closes the door. This thread is closed.

What the player decides: Frank has been building rep for this moment. If he's done the work, the path opens cleanly. If not, he takes a harder route — or misses it entirely. `marta_talked` flag set when any version of this conversation completes.

Connects to: Beat 5 (ledger hunt — Marta's thread or records room thread, whichever fires first); returns to hub if rep < 3 (thread closed, alternate route needed)

### Beat 5 — The Ledger
Ray hid his evidence in a condemned building on Aldwick's south block — a place with a false floor under the kitchen boards. Frank finds it: a surveyor's field ledger, annotated in Ray's hand, with the original boundary coordinates against the filed versions. The discrepancies are systematic and impossible to explain as error. Also in the cache: a carbon copy of a letter Ray was drafting to the state auditor. He never sent it.

Frank now holds the evidence. `found_ledger` set. Evidence spikes hard (+3). Heat spikes too — finding the ledger means whoever is watching knows Frank found it (+2 heat automatically; the building was being watched). This is the act's mechanical hinge.

Before leaving, a consumable choice appears once: mail a copy of the key pages to Dora Reyes, a press contact Frank knows, at a post office two blocks away. This sets `left_package`. If taken, the option disappears. If Frank doesn't take it now, the option appears once more at the office hub — but after heat ≥ 8, Dora Reyes's name stops appearing (it becomes dangerous to involve her). After that, the window closes.

What the player decides: leave quietly (evidence +3, heat +2 from being watched) or mail the insurance copy (same stats, plus `left_package`). There is no mechanical downside to mailing it in this beat — the risk/reward is purely about whether the player thinks ahead.

Connects to: Beat 6 (linear — the heat spike brings the city's response)

### Beat 6 — The Closing Net
Heat has climbed. The men who've been watching Frank escalate: a direct confrontation scene where two plainclothes officers make it clear that Frank should stop, framed as professional courtesy. `cops_warned_off` set if not already. Frank can read this as a bluff (continues investigating, heat +0) or a real threat (backs off — any further action costs +1 heat per beat from here). A third option: Frank leans into it, turns it back on them, makes clear he isn't the kind of man who stops when warned — this option requires rep ≥ 5 and costs heat +1 but pays evidence +1 (he reads something in their reaction he can use).

What the player decides: whether Frank is a man who can be warned off. The player has seen the ledger. They now decide how far Frank takes this.

Connects to: Exit evaluation — at the close of Beat 6, the act's state is locked and transitions to Act 3

---

## Exits

Each exit is determined by the player's accumulated state at the end of Beat 6. Not every combination is distinct — these are the meaningful configurations for Act 3 to branch on.

- **Exit 1 — The Informed Survivor:** evidence ≥ 6, heat ≤ 5, rep ≥ 4. `found_ledger` set. `left_package` may or may not be set. Frank has the ledger, has kept his head down, has enough standing that people will still talk to him. The least dangerous entry into Act 3 — Kellner's betrayal is survivable and the evidence is usable. Act 3 opens with Frank feeling like he has a hand to play.

- **Exit 2 — The Informed and Exposed:** evidence ≥ 6, heat 6–7, rep 3–4. `found_ledger` set. `cops_warned_off` set. Frank has everything he needs but the city knows he has it. The betrayal is more dangerous; Frank is operating on borrowed time. Act 3 opens under pressure.

- **Exit 3 — The Informed Martyr:** evidence ≥ 6, heat ≥ 6, `found_ledger` set, `left_package` set. Frank has the ledger, mailed the copy, and is hot enough that the wrong people may find him before he can act. The only configuration where the Martyr ending is reachable. Act 3 opens with fate already half-decided — the question is whether Frank survives to choose, or whether the choice was already made at that post office.

- **Exit 4 — Thin Evidence, Low Danger:** evidence 3–5, heat ≤ 4, rep 3–4. `found_ledger` may or may not be set (if set: evidence 4–5; if not: evidence 3–4). Frank knows the shape of the conspiracy but the ledger is missing or incomplete. The Expose ending is probably locked at the final choice. He's not in immediate danger. Act 3 opens with a survivable but incomplete picture — Bury It is the likely outcome unless Frank is lucky.

- **Exit 5 — Thin Evidence, High Heat:** evidence 3–5, heat ≥ 6, `found_ledger` possibly set. Frank knows enough but is badly exposed. The Kellner betrayal triggers in the worst possible conditions. Permadeath threshold is in range if rep is also low. Act 3 opens with Frank already on the back foot — survive first, decide what to do with what you have second.

- **Exit 6 — Flying Blind:** evidence ≤ 2, heat anything, no `found_ledger`. Marta's thread closed (rep too low), records room missed or skipped, Vera's file never recovered. Frank doesn't have enough to act on. Only Bury It is available at the final choice. If heat is also high, the permadeath path is in range. Act 3 opens knowing the investigation failed — the question is whether Frank gets out alive and what version of defeat he chooses.

---

## Flags/Stats Changed

- `aldwick_visited` — already set from Act 1; Aldwick hub available from act start
- `records_room` — consumable; set when Frank breaks into the city records office and takes documents. Player-visible: no. Hidden after taken. evidence +2, heat +2 when triggered.
- `marta_talked` — set when Marta Gaines conversation completes (any rep variant). Player-visible: no. Gates ledger location path.
- `found_ledger` — set when Frank recovers Ray's evidence cache in Beat 5. **Player-visible: yes ("Ledger").** evidence +3, heat +2 on trigger.
- `left_package` — consumable; set when Frank mails evidence copy to Dora Reyes. **Player-visible: yes ("Package sent").** Hidden after taken. Gates Martyr ending.
- `trusted_kellner` — set when Frank shares specific evidence with Kellner during the conversation hub. Player-visible: no. Worsens betrayal scene texture in Act 3; adds a dialogue option that cuts deeper.
- `cops_warned_off` — set when the plainclothes confrontation scene fires (Beat 6) or earlier from the office hub threat scene. Player-visible: no. Changes ambient heat text; affects Act 3 opening tone.
- `kellner_surfaced` — set when Kellner first makes contact with Frank (after Beat 2). Player-visible: no. Opens Kellner conversation hub in the office.
- `frank_past_revealed` — set via Kellner conversation topic, requires rep ≥ 6. Player-visible: no. Frank learns Kellner was involved in getting him pushed out — the same machine, an earlier year. Changes Act 3 betrayal dialogue significantly.

**Stat ranges exiting Act 2:**
- `evidence`: 1–9 (typical range 3–7; ledger = +3 spike; highway contract + records room = additional +3 max)
- `heat`: 0–9 (typical range 2–6; ledger find = +2 automatic; cops_warned_off contributes +1 modifier in Act 3)
- `rep`: 2–6 (Marta's full account requires ≥ 5; frank_past_revealed requires ≥ 6; below 3 closes Aldwick threads)
