# Dead Letters — Act 2: The Knot

## Journal Entry
You followed the thread out of Vera's file and into the city itself, and somewhere between the records room and a kitchen in Aldwick the case stopped being about a missing husband.

## Entry
Arrives from: Act 1 Exits A–E (Beat 7 commit). Exit F branches to the early Bury It ending and does not enter Act 2.

Player state at entry varies by exit:
- Common to all entries: `met_vera`, `vera_dead`, `aldwick_visited` (as a name, not a place yet), `ray_key_kept`. Stats carried forward.
- Exit A (Lean and clean): low evidence, low heat, baseline rep. Frank starts cold — no contacts, no warnings.
- Exit B (On the radar): `cops_warned_off`, heat 2–3. Brennan or a uniform tail will surface earlier; ambient threat scenes available from the Aldwick first visit.
- Exit C (With a friend in print): `mort_owes_one`. Mort is reachable as a beat-flow shortcut and as the bridge to Dora Reyes when the package decision arrives.
- Exit D (Hard and hot): `cops_warned_off` and `mort_owes_one`. Pressured playthrough — heat builds fast, but the press path is open. The ledger fork is reachable from either branch.
- Exit E (Soft and sentimental): `vera_trusted_frank`. Frank carries the key but little else. Marta Gaines becomes the dominant evidence path — without her, Bury It is the likely outcome.

Act 2 retitles `aldwick_visited` to mean *physically been there* on Frank's first scene in the neighbourhood.

## Beats

### Beat 1 — The Cold Trail
What happens: A week after the funeral. Frank sits in his office with the key, the photo (or its absence), and a name — Aldwick. He has no client and no warrant. He has to decide whether he is investigating a homicide nobody else thinks is a homicide, and whom to lean on first.
What the player decides/learns: How Frank re-enters the case — chase the key (locksmiths, storage outfits, post office boxes), chase Aldwick (go there), or chase Ray's paper trail (back to the City Engineer's records). Each opens a different door into Beat 2's hub. The player also learns the city has already moved on: the *Examiner* ran a two-paragraph drowning piece. There is no investigation but Frank's.
Connects to: Beat 2 (office hub re-opens; player picks first thread). On Exit B/D entries, an early warning visit precedes the choice — a uniform on the stairs, a card slid under the door — and adds heat +1 before Beat 2.

### Beat 2 — The Office Hub (mid-act)
What happens: Frank's office is the spoke again, but the room itself has shifted. Vera's chair is empty. The retainer envelope is in a drawer. Three threads now run in parallel: Aldwick (the neighbourhood and Marta), the Records Room (the falsified surveys and Voss's building), and Kellner (Frank's old partner, who heard Frank was asking about Doss and called the office). Mort drops by if `mort_owes_one`; if not, Frank has no press hand to play. As flags accrue, threads close and new ones open: a tail outside, a brick through the window, a phone that rings and goes silent.
What the player decides/learns: Order of pursuit and how much heat to absorb between leads. The hub teaches the player that this act is about *choosing what to know*: Frank cannot do all three threads cleanly. Two will be possible; the third requires a tradeoff in heat or rep.
Connects to: Beats 3, 4, 5 in any order; returns here between each. Auto-routes to Beat 6 once two of the three primary threads are resolved AND the player attempts a fourth office return, OR once heat ≥ 6 (the conspiracy escalates regardless).

### Beat 3 — Aldwick
What happens: A neighbourhood being eaten. Boarded windows where there shouldn't be boards. Surveyors' stakes in vacant lots. A church hall serving as an unofficial tenants' meeting room. Frank meets Marta Gaines, who runs that meeting. She watched her own brother served with a rezoning notice he could not read. Whether she trusts Frank determines whether he learns where Ray was last seen alive — a back porch on Lemoine Street, two nights before the body turned up.
What the player decides/learns: Frank decides how to introduce himself — as a cop (false; rep penalty if Marta later checks), as a man Vera Doss hired (rep gain if `vera_trusted_frank`), or honestly as a stranger with no standing. Rep ≥ 5 unlocks Marta's full account (`marta_talked`); rep 3–4 yields a partial — a name, no address; rep < 3 closes the thread. Frank also picks up `aldwick_visited` properly here, and on a low-heat playthrough, an introduction to a Pastor Lemuel Briggs who runs the church. On a high-heat playthrough Frank notices the same parked car he saw outside Vera's boarding house.
Connects to: Beat 2; or directly to Beat 5 if `marta_talked` is set (Marta's information names a likely ledger location).

### Beat 4 — The Records Room
What happens: The City Engineer's after-hours building. Voss is gone for the day; a janitor's key, a borrowed press badge from Mort, or a clean break-in are the three ways in. The records themselves tell a story even Frank can read: Aldwick parcel boundaries redrawn, signatures that don't match between documents, condemnation orders dated *before* the surveys that justify them. There is a fixer in the building too — a man named Salzano who seems to be there to make sure the wrong files are not still in cabinets.
What the player decides/learns: How Frank gets in (each option costs differently — janitor: rep with the working-class side of town if Frank already has it; press badge: consumes `mort_owes_one`; break-in: heat +2, sets `records_room`). How long he stays — taking the matched-signature pages is `records_room` evidence (+1 to +2); taking the boundary maps is the same evidence in a different form; taking both risks Salzano catching him in the corridor (heat +2; possible permadeath route if heat already ≥ 6 and rep ≤ 3 — Salzano kills him in the stairwell). Frank can also see, but not safely take, a note in Voss's handwriting that names Walt Kellner.
Connects to: Beat 2; Salzano-confrontation soft-permadeath branch ends here on a bad roll.

### Beat 5 — The Ledger
What happens: A back room in Aldwick (if Marta's thread led here) or a rented locker the key opens (if the key thread led here, with Marta's information narrowing it to the right depot). Either route ends in the same physical object: Ray Doss's notebook, hidden three weeks before he died. Names. Account numbers. The mayor's brother. A column of payments matched against rezoning dates. This is the case in one bound book.
What the player decides/learns: Whether to take the whole ledger or photograph pages and leave the original where it lay. Taking it (`found_ledger` set; evidence +3) is faster but means Frank is now carrying the thing the city wants buried. Photographing (`found_ledger` set; evidence +2; heat does not spike) is slower and risks the original disappearing before Frank can return. Either route sets `found_ledger`. Missing this beat entirely (low rep, missed records room) leaves `found_ledger` unset and locks Expose/Martyr.
Connects to: Beat 2 the first time; routes directly to Beat 7 (Kellner) if the player has been avoiding him, or to Beat 6 if heat ≥ 6.

### Beat 6 — The Squeeze
What happens: The conspiracy puts a hand on Frank. Triggered automatically once heat ≥ 6 OR after Beats 3 and 4 are both complete. Form depends on path: Salzano walks into Frank's office with two men and a soft voice ("a job offer; a one-way ticket; either is fine"); Brennan picks Frank up off a sidewalk and delivers a warning that is not really a warning; or Mort arrives at the office white-faced because the *Examiner* spiked his Aldwick column and someone he trusts told him to forget the byline. Frank is not killed here — this is the turn-back-or-commit beat.
What the player decides/learns: Whether to play the squeeze straight (back off cosmetically — heat -2, but `cops_warned_off` is upgraded to a harder warning that makes Beat 7 worse), feign compliance and keep digging (heat stays; rep -1 with the source the squeeze went through), or push back hard (heat +1; sets `pushed_back` — affects the Kellner conversation tone in Beat 7). Frank also picks up here that whoever ordered the squeeze knew exactly where he had been. Someone close has been talking.
Connects to: Beat 7. On a path where heat reaches 8 and rep ≤ 3 here, the squeeze is lethal and Frank dies on his office floor — early-permadeath off-ramp (rare; the main permadeath lives in Act 3).

### Beat 7 — Walt Kellner
What happens: Frank's old partner. Currently a lieutenant in the city's Organized Crime Unit. He invites Frank for a drink, or arrives at the office unannounced, or finds Frank in the same diner where they used to eat at three in the morning a decade ago. The conversation is a hub — Frank picks topics. Kellner is genuinely warm and genuinely careful; the player cannot tell, from inside this scene, whether he is the friend keeping Frank alive or the man preparing to sell him. The ambiguity is the point.
What the player decides/learns: The Kellner Conversation hub (see below). What Frank tells Kellner is the load-bearing decision of the act — confiding sets `trusted_kellner` and worsens the Act 3 betrayal scene materially (Kellner knows where to point them); withholding leaves Kellner with less and changes Act 3's opening scene. Frank can also learn, here, the rep-gated reveal (`frank_past_revealed`, rep ≥ 6) — Kellner accidentally drops a phrase that lights the past on fire, and Frank realises it was Kellner who pushed him out of the force.
Connects to: Beat 8.

### Beat 8 — The Package
What happens: Late in the act, with the ledger in hand or photographed (or not), Frank decides whether to make a copy of his evidence and mail it to Dora Reyes — Mort's protégée at a smaller paper, the one outlet that isn't already part of what he'd be exposing. The decision happens in a single scene: the post office at six in the evening, the package wrapped, Frank's hand on the counter.
What the player decides/learns: Mailing it sets `left_package` (consumable). Doing so gates the Martyr ending. Not mailing it locks Martyr. Frank also picks up here that he is *being followed* — a man across the street pretending to read a paper. The choice is made under that pressure.
Connects to: Beat 9.

### Beat 9 — Standing in the Hallway
What happens: A short closing beat. Frank in his office, late, with whatever he has — ledger, photographs, copies, nothing. The phone rings. It is Kellner. He has heard Frank has the book, and he wants to meet, alone, somewhere off-grid: an empty warehouse on the river. Frank narrates the choice to the player as the last thing he will narrate before the city stops pretending. The player commits to one of the Act 3 entries.
What the player decides/learns: Whether to keep the meet (committing to the Act 3 confrontation), to go to ground first and try to plant the package if not already planted (only available if `left_package` is unset and Mort is reachable), or to walk away (late-act Bury It exit — Frank knows exactly what he is abandoning).
Connects to: Act 3 entry (Exits A–E) | late Bury It ending (Exit F).

### Hub — The Office (Beats 2–6)
Purpose: Spoke between Aldwick, the Records Room, and Kellner. Loop point. Visible state changes per flag: the drawer with the retainer, a brick on the floor (after first heat spike), a note slid under the door (if `cops_warned_off` upgrades), a parked car visible from the window (Beat 5+). Returns disappear as threads close.
Returned to from: Beats 3, 4, 5, 7.
Exits to: Beats 3, 4, 5 (player choice, while available); Beat 6 triggers automatically per conditions above; Beat 7 is reachable directly from the hub once Kellner has called the office (after the first investigation beat, regardless of which).

### Hub — Aldwick (Beats 3, 5, 6)
Purpose: Marta's church hall and the Lemoine Street corner are revisitable across the act. The neighbourhood changes between visits — more boards, fewer people, a building gone where one stood last week. Marta's reception varies with rep and `marta_talked`. Pastor Briggs is available as a single-topic informant on church/condemnation history.
Returned to from: Beat 2 (player choice), Beat 5 (returning the ledger, if photographed), Beat 6 (if the squeeze drew Frank back to confirm a fear).
Exits to: Beat 2; Beat 5 (first time, if `marta_talked`).

### Conversation — Walt Kellner (within Beat 7)
Purpose: Ambiguity. Topics: Ray Doss (Kellner pretends to know less than he does), Aldwick (Kellner concedes the surveys are "not clean" and warns Frank off in the same breath), Frank's past on the force (rep ≥ 6 unlocks the moment that becomes `frank_past_revealed`), the ledger (only if Frank confides — sets `trusted_kellner`), and a graceful exit ("you don't have to tell me any of this"). Each topic is a flag; topics deplete; the player can always leave. Confiding the ledger is a one-way door — once `trusted_kellner` is set, it cannot be unset, and Act 3's betrayal scene reads accordingly.
Where it sits in the beat flow: Beat 7. Closes when the player exits the conversation and progresses to Beat 8. Re-opens narratively in Act 3 only as the betrayal — never as a friendly conversation again.

## Exits

- **Exit A — Cold and quiet (low ledger / no Kellner trust):** Leaves from Beat 9 (keeps the meet). Carries `met_vera`, `vera_dead`, `aldwick_visited`, `ray_key_kept`, `found_ledger`, `marta_talked` (if Aldwick path), and the consumable choice on Salzano if it was offered. **Does NOT carry** `trusted_kellner` or `left_package`. Stats roughly: evidence 5–6, heat 3–4, rep 4–5. Frank goes to the warehouse with the book and without a fallback. → Act 3 entry: Kellner confrontation, "no package, no betrayal-deepener" variant — survivable on rep, lethal on the wrong heat/rep combo.

- **Exit B — Confided and exposed:** Leaves from Beat 9. Carries the Exit A bundle plus `trusted_kellner`. Stats: evidence 5–7, heat 4–5, rep 4. Frank told Kellner about the book. The betrayal lands worse in Act 3 — Kellner knows what to take and where Frank's other copies aren't. → Act 3 entry: Kellner confrontation, "Kellner-knows" variant — high-cost emotionally, narrows survivability.

- **Exit C — Insurance mailed:** Leaves from Beat 9 (keeps the meet) after Beat 8 set `left_package`. Carries the Exit A bundle plus `left_package`. May or may not carry `trusted_kellner`. Stats: evidence 5–7, heat 3–5, rep 4. Frank has a copy in the post; Dora Reyes will receive it Monday. → Act 3 entry: Martyr ending becomes available; the binary final choice is preserved if Frank survives the confrontation.

- **Exit D — Hot and hunted:** Leaves from Beat 9. Carries the Exit A bundle plus `cops_warned_off` (upgraded to "hard warning") and possibly `pushed_back`. Heat ≥ 6 entering Act 3. May carry `trusted_kellner`, may carry `left_package`. Stats: evidence 5–7, heat 6–7, rep 3–4. Frank arrives at the warehouse already followed — Act 3 opens under pressure; the Pavement permadeath is live if rep ≤ 3. → Act 3 entry: high-heat variant; Martyr ending probable if `left_package` is set; Pavement probable if it isn't.

- **Exit E — No book, no shield:** Leaves from Beat 9. Carries `met_vera`, `vera_dead`, `aldwick_visited`, `ray_key_kept`. **Does NOT carry** `found_ledger`. May or may not carry `trusted_kellner`, `left_package`, `cops_warned_off`. Stats: evidence 2–4, heat 3–5, rep 3–5. Frank missed Marta's full account AND failed the records room — he knows the shape of the thing but can't prove it. Expose and Martyr endings are locked at the final choice. → Act 3 entry: low-evidence track; the Kellner confrontation still triggers, but the climax is Bury It (late variant) regardless of moral choice.

- **Exit F — Late Bury It (walks at Beat 9):** Leaves from Beat 9 by refusing the meet and putting the ledger (or its absence) into the same drawer as Vera's retainer envelope. → Ending: Bury It, late variant — Frank knows what he is walking away from. The coda is longer than the early Bury It coda: months later, Aldwick is gone, a highway runs through where Marta's kitchen used to stand, Frank reads the Mayor's re-election piece in a diner and orders another coffee.

## Flags/Stats Changed

- `aldwick_visited` — retitled in Act 2 from "name known" to "physically been there." Set on first scene in Aldwick (Beat 3). Not player-visible.
- `marta_talked` — set when Marta gives Frank her full account (Beat 3, rep ≥ 5). Not player-visible.
- `records_room` — consumable; set when Frank makes it out of the City Engineer's building with documents (Beat 4). Not player-visible. Hidden after use.
- `pushed_back` — set when Frank refuses the squeeze hard in Beat 6. Not player-visible. Shading flag for Beat 7's tone.
- `trusted_kellner` — set when Frank confides the ledger to Kellner in Beat 7. Not player-visible. One-way; affects Act 3 materially.
- `frank_past_revealed` — set during Beat 7 if rep ≥ 6 unlocks Kellner's tell. Not player-visible. Narrative-only — colours Acts 2 and 3 dialogue.
- `cops_warned_off` — may be set or upgraded in Beats 1, 4, 6. Not player-visible. Modifier on heat scenes; "hard warning" tier on Exit D.
- `found_ledger` — set in Beat 5 by either route (Marta thread or key/records thread). Player-visible ("Ledger" in HUD inventory). Required for Expose and Martyr endings.
- `left_package` — consumable; set in Beat 8 if Frank mails the package. Player-visible ("Package sent" in HUD inventory). Hidden after use; gates Martyr.
- `evidence` — accrues 0–4 entering → 4–7 exiting Act 2 (records room +1–2, Marta's account +1, ledger +2–3, photographs +1). Player-visible.
- `heat` — accrues 0–3 entering → 3–7 exiting Act 2. Player-visible. Heat ≥ 6 forces Beat 6; heat ≥ 8 with rep ≤ 3 makes the Beat 6 squeeze lethal (rare early-permadeath path).
- `rep` — drifts 3–4 entering → 3–5 exiting. Player-visible. Rep gates Marta's account, Voss's tell on a return visit, and the Kellner past-reveal.

## Failure design (Act 2 quota)

- **Hard fail (rare, off-ramp):** Beat 4 stairwell death (Salzano catches Frank with the documents at heat ≥ 6, rep ≤ 3) — permadeath, legible: "you took too much, too late, in a building that knew you were coming." Beat 6 lethal squeeze (heat ≥ 8, rep ≤ 3) — permadeath in the office. These exist so Act 2 has its own teeth; the main permadeath remains the Kellner confrontation in Act 3.
- **Soft fails:** Missing both Marta's full account and the records room → `found_ledger` unset → Expose/Martyr locked at the climax. Confiding to Kellner → `trusted_kellner` worsens Act 3 measurably. Pushing back too hard at the squeeze → `pushed_back` paints a target.
- **Narrative wounds:** Pastor Briggs is gone the third time Frank visits Aldwick, with no on-screen explanation. Mort's column is spiked and he goes quiet for a week — a friend the player traded on, frightened off-screen. Voss appears in Beat 4 only as an unsigned note Frank reads in the dark.
- **Red herrings:** Salzano reads as the conspiracy's *centre* but is the fixer, not the principal. Brennan reads as one of the bad ones but never quite acts the part — the player can spend the act distrusting Brennan and miss Kellner entirely.
