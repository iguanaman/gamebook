# Dead Letters — Act 3: The Cost

## Journal Entry
You went to a warehouse on the river to meet a man you used to trust, and what came back across the water was not a friendship.

## Entry
Arrives from: Act 2 Exits A–E (Beat 9 commit). Exit F branches to the late Bury It ending and does not enter Act 3.

Player state at entry varies by exit (matched to Act 2):
- **Common to all entries:** `met_vera`, `vera_dead`, `aldwick_visited`, `ray_key_kept`. Stats carried forward.
- **Exit A — Cold and quiet:** `found_ledger` set, no `trusted_kellner`, no `left_package`. Evidence 5–6, heat 3–4, rep 4–5. Frank arrives at the warehouse with the book, no fallback, no betrayal-deepener. Survivable on rep.
- **Exit B — Confided and exposed:** `found_ledger`, `trusted_kellner`, no `left_package`. Evidence 5–7, heat 4–5, rep 4. Kellner already knows what Frank has and where he keeps it; the betrayal opens with Frank still calling him by his first name.
- **Exit C — Insurance mailed:** `found_ledger`, `left_package`, possibly `trusted_kellner`. Evidence 5–7, heat 3–5, rep 4. Dora Reyes will receive the package whether or not Frank does. Martyr is live.
- **Exit D — Hot and hunted:** `found_ledger`, `cops_warned_off` (hard tier), possibly `pushed_back`, possibly `trusted_kellner`, possibly `left_package`. Evidence 5–7, heat 6–7, rep 3–4. Frank is followed before he leaves the office. Pavement is live if rep ≤ 3; Martyr is the dominant ending if `left_package` is set.
- **Exit E — No book, no shield:** **No** `found_ledger`. Possibly `trusted_kellner`, `left_package`, `cops_warned_off`. Evidence 2–4, heat 3–5, rep 3–5. Expose and Martyr are locked at the climax. Late Bury It is the only resolution; the act still plays for the cost.

Carried shading flags that colour Act 3 dialogue but don't gate endings: `marta_talked`, `mort_owes_one`, `vera_trusted_frank`, `pushed_back`, `frank_past_revealed`, `records_room`.

## Beats

### Beat 1 — The Drive Out
What happens: Frank in his car after Kellner's call. Rain, a cigarette he doesn't finish, a ledger or its absence on the passenger seat. The narrator allows himself one moment of past tense — what he thought he was doing when he became a private investigator, and what that thought is worth tonight. On a heat-7+/`cops_warned_off`-hard playthrough, a sedan picks Frank up two blocks from the office and tails him to the river. On a `mort_owes_one` playthrough, Mort phones the office before Frank leaves and tells him plainly: he doesn't have to keep the meet. On `frank_past_revealed`, Frank narrates what he now knows about why he left the force, and what walking into a Kellner meeting means knowing it.
What the player decides/learns: Whether to keep the appointment, divert (drop a copy at Mort's apartment if `mort_owes_one` and `left_package` is *not* yet set — last legal chance to mail evidence; sets `left_package`), or — only on Exit D / heat ≥ 6 — try to lose the tail (rep check; failure adds heat +1 going into Beat 2). The drive ends at the warehouse regardless; the question is what Frank carries when he gets there.
Connects to: Beat 2 (linear). The diversion option is a one-time off-branch that returns to Beat 1's end before continuing.

### Beat 2 — The Warehouse
What happens: An empty river warehouse owned by a shell company Ray Doss flagged in the ledger. Two cars already there. Kellner is alone in the doorway — warm, a little tired, hands visible. Salzano is not visible. Brennan is not visible. The conversation Kellner stages is the one Frank wanted to have in Beat 7 of Act 2 — quieter, more honest, almost an apology. The betrayal lands in the middle of a kindness. Two men step out from behind the cars; one of them is Salzano. If `trusted_kellner`, Kellner names exactly what Frank has and where Frank's other copies are not. If not, Kellner has to ask.
What the player decides/learns: How Frank plays the betrayal — fight (rep + heat check; survival depends on stats), talk (uses `frank_past_revealed` if set — Frank confronts Kellner with what Kellner did in '39; rep gain in survivability terms), or run (heat-gated; succeeds on low heat, fails on high). The player learns Kellner is the principal — not the principal of the conspiracy, but the principal of *Frank's* tragedy. Salzano is the gun; Kellner is the friend.
Connects to: Beat 3 (escape: any path that survives) | Pavement permadeath (Beat 2 lethal: heat ≥ 8 AND rep ≤ 3 — the ambush kills Frank in the warehouse; coda is short and final).

### Beat 3 — The River
What happens: Frank gets out of the warehouse alive but burned — physically (a graze, a broken hand, a cracked rib chosen by stat margin) and operationally (his office is being tossed as he runs; the ledger may or may not still be in his hands). The river itself becomes the beat's setting: Frank works his way along the bank toward a streetcar line, three blocks of darkness and the sound of two cars looking for him. On a `mort_owes_one`/`pushed_back` playthrough, a young uniformed cop named Daniel Quint stops his patrol car beside Frank and offers him a ride out — Quint has been watching Brennan and is looking for a way to be the man he thought he'd be when he took the job.
What the player decides/learns: Where Frank goes to ground. Quint's apartment (rep + intro to a clean cop; sets `quint_helped`), Mort's basement (only if `mort_owes_one`; closes the press path early if used here — Mort is now visibly involved), or a flophouse on the south side (no NPC cost; full heat carries forward into Beat 4). The player also learns the city is moving fast: the morning papers will have a private detective's name in them either way.
Connects to: Beat 4 (linear, ground-to-ground transition).

### Beat 4 — Where the City Already Wrote You
What happens: Morning. Whichever room Frank slept in. The radio reports a "person of interest" wanted in connection with a body fished out of the river overnight — a body that does not exist; Salzano's people have written Frank into a murder he didn't commit. Mort calls (or doesn't, depending on path) to confirm: the *Examiner* will run it at noon. Dora Reyes is named in the wire copy as a "second person sought for questioning" — the package, if mailed, has been intercepted at the paper *or* not, depending on `left_package` and timing flags.
What the player decides/learns: What Frank has left to play. The beat is short and load-bearing: it confirms which endings are still on the board given everything carried in, and gives Frank one decision before the climax — go to Dora directly (only if `left_package` is set OR `mort_owes_one` survived; consolidates evidence for Expose), go to Aldwick once more (only if `marta_talked`; sets `said_goodbye_aldwick` — narrative shading on whichever ending fires), or hole up and wait for nightfall (no cost, no gain, locks the climax to the warehouse path).
Connects to: Beat 5 (linear).

### Beat 5 — The Final Choice
What happens: The climax. Setting is determined by the player's Beat 4 path — a newsroom backroom with Dora, a kitchen in Aldwick with Marta, or Frank's own office at dusk. The choice itself is the same in all three settings, framed differently in each: with the evidence in hand (or photographed, or not), Frank picks what happens to it.
What the player decides/learns: The binary moral choice — *publish* (Expose) or *walk away* (Bury It late). The choice is **gated by evidence**: at evidence ≥ 6 and `found_ledger`, both options are live; at evidence < 6 OR no `found_ledger`, only Bury It is live and the publish option greys out with a failure line ("You don't have enough to make it stick"). If `left_package` is set AND the player is on the high-heat track (heat ≥ 6 entering Beat 5) AND Frank has not yet reached Dora in person, the choice is **taken from him** — Salzano's men reach the climax setting before Frank can act on what he chose, and Beat 6 fires as Martyr instead of Expose/Bury. The player who set up the package is rewarded with the most tragic ending; the player who didn't is forced to live with whichever of Expose/Bury they had earned.
Connects to: Beat 6 (the coda — branches by ending).

### Beat 6 — Coda
What happens: One of four codas, fired by ending:
- **Expose:** The story runs. Frank watches the newsboy hawk it on a corner; the Mayor cancels a press conference; Halston Thorne is arrested before his lawyer arrives. Frank's licence is gone by lunchtime. There is a shot somewhere in the next month that may or may not have been him; the narrator does not commit. Aldwick is not saved — the highway will still come — but Marta's brother is alive a year later. The city changes, slowly.
- **Bury It (late):** The ledger goes into a fire in Frank's sink. Frank takes a train to Sacramento. A year later, the highway is open. Frank reads about Halston Thorne's promotion in a diner counter paper and orders another coffee. Vera's photograph is in his wallet and stays there.
- **Bury It (early — referenced from Act 1 Exit F or Act 2 Exit F only; *not reachable from Act 3 itself*):** Noted here for completeness. The early-Bury coda is short — a year later, Aldwick mentioned in a bar, Frank looks down. The late-Bury coda above is the Act-3 variant.
- **Martyr:** Frank does not survive. The climax setting is where Salzano's men reach him; the narrator's voice cuts off mid-sentence. A short epilogue, voiced by Dora Reyes (not the narrator), reads the lede of her own page-one column the following Monday: Halston Thorne, the Mayor, the Aldwick parcels, Ray Doss. Frank's name is in the third paragraph.
- **Pavement (permadeath):** Fired from Beat 2 only. Frank is killed in the warehouse. No journalist. No justice. The narrator is silent; a single line of cold third-person prose reports what was written on the police blotter the next morning.
What the player decides/learns: Nothing — the coda is the consequence, not a choice. The journal entry for Act 3 is recorded on entry; the ending text is the final read.
Connects to: end of story.

### Hub — None
Act 3 is linear by design. The acts of investigation are over; the player is now living with the choices made in Acts 1 and 2. The only branching is between beats (single-decision forks at Beat 1, Beat 3, Beat 4), the climax at Beat 5, and the four codas at Beat 6. Hubs would dilute the act's felt momentum.

### Conversation — Walt Kellner (within Beat 2)
Purpose: The betrayal as conversation. Three topics, each consumable: *Ray* (Kellner finally tells the truth — partial — about the night Ray was killed; sets `kellner_admitted`), *the past* (only available if `frank_past_revealed`; Frank confronts Kellner with what Kellner did in '39; sets `confronted_kellner_past` — survivability bonus in the gunfire that follows), *the offer* (Kellner offers Frank a way out — name a price, leave the book, walk; the player can accept here for an early-Bury exit *only* if `found_ledger` is unset, otherwise the offer is a feint and accepting it triggers the Pavement permadeath check). The conversation closes when Salzano steps out from behind the cars; from that moment Beat 2 is mechanical (fight/talk/run).
Where it sits in the beat flow: Inside Beat 2, before Salzano reveals himself. Topics deplete; the player can leave the conversation at any point by triggering the reveal.

## Exits / Endings

Act 3 is the final act — there is no next act. Exits are endings.

- **Ending A — Expose:** Reached from Beat 5 when `found_ledger` AND evidence ≥ 6 AND player chooses *publish*, AND the high-heat Martyr override does not fire (i.e. `left_package` is unset, OR Frank reached Dora in person before Salzano's men did, OR heat < 6 entering Beat 5). Frank brings the case to Dora Reyes; the story runs Monday morning. Coda: see Beat 6 above. Tonal note — bittersweet, not triumphant.

- **Ending B — Bury It (late):** Reached from Beat 5 when player chooses *walk away* AND the Martyr override does not fire. Two sub-paths: (i) the player has the evidence and chooses to burn it; (ii) the player does not have the evidence (`found_ledger` unset OR evidence < 6) and Bury It is the only legal option — the publish choice greys out. Coda: see Beat 6 above. The two sub-paths share a coda but the journal sidebar text reads differently — "You knew. You walked." vs. "You didn't have it. You walked."

- **Ending B′ — Bury It (early variant):** **Not reachable from Act 3.** Documented here to enumerate the branching surface: Bury early fires from Act 1 Beat 7 Exit F (Frank refuses to push past Vera's death) or Act 2 Beat 9 Exit F (Frank refuses the warehouse meet). Both bypass Act 3 entirely. Listed in this section so a downstream stage 3 author has the full ending map without re-deriving it.

- **Ending C — Martyr:** Reached when `left_package` is set AND heat ≥ 6 entering Beat 5 AND Frank has not consolidated evidence with Dora in person at Beat 4 (i.e. did not pick the Dora path at Beat 4, OR was prevented from doing so by `mort_owes_one` being already burned at Beat 3 / a failed rep check). The override fires at the start of Beat 5: Salzano's men reach the climax setting before Frank can act. Frank dies. Dora's voiceover coda runs Monday's lede. The most tragic ending — Frank did everything right but bought it on the heat margin.

- **Ending D — Pavement (permadeath):** Reached only from Beat 2 when heat ≥ 8 AND rep ≤ 3 AND the player picks fight or run (talk on `frank_past_revealed` survives this check). The ambush is lethal. Coda is the cold blotter line. No journalist, no Dora, no story. This is the "you played badly" death — legible in retrospect: too much heat, not enough rep to make it through the door alive.

### Ending gate summary (for Stage 3)

| Ending | Required | Excluded by |
|---|---|---|
| Expose | `found_ledger` AND evidence ≥ 6 AND publish chosen at Beat 5 AND Martyr override does not fire AND survives Beat 2 | Pavement (Beat 2 death); Martyr override (heat ≥ 6 + `left_package` + did not reach Dora) |
| Bury It (late) | Beat 5 walk-away chosen, OR (evidence < 6 OR no `found_ledger`) AND survives Beat 2 AND Martyr override does not fire | Pavement; Martyr override |
| Martyr | `left_package` AND heat ≥ 6 entering Beat 5 AND did not reach Dora at Beat 4 AND survives Beat 2 | Pavement; reaching Dora at Beat 4 (consolidates package; demotes to Expose); heat < 6 entering Beat 5 (demotes to Expose/Bury per evidence) |
| Pavement | Beat 2 only: heat ≥ 8 AND rep ≤ 3 AND fight/run chosen | `frank_past_revealed` + talk path (survives the ambush by talking past Kellner) |

## Flags/Stats Changed

- `quint_helped` — set at Beat 3 if Frank accepts Officer Quint's ride. Not player-visible. Shading flag for the Expose coda (Quint testifies; small grace note).
- `kellner_admitted` — set at Beat 2 if the *Ray* topic is exhausted in the Kellner conversation before Salzano steps out. Not player-visible. Shading flag for all coda variants except Pavement.
- `confronted_kellner_past` — set at Beat 2 if `frank_past_revealed` AND the *past* topic is taken. Not player-visible. Adds a survivability bonus on the talk path through Beat 2.
- `said_goodbye_aldwick` — set at Beat 4 if Frank takes the Aldwick visit option. Not player-visible. Shading flag for Expose and Bury It late codas.
- `published` — set at Beat 5 on the Expose path. Player-visible? **No** — this is the ending state, not an in-game token; surfaces in the coda text and journal final entry.
- `confronted_kellner` — set on entering Beat 2 (mirrors structure.md's named flag — closes the Kellner hub permanently). Not player-visible.
- `evidence` — does not accrue further in Act 3 (the investigation is over). The Beat 5 gate reads the value carried in from Act 2.
- `heat` — may rise +1 at Beat 1 (failed tail-loss) and is fixed at Beat 2's threshold check; does not change after Beat 2.
- `rep` — does not change in Act 3; the value carried in from Act 2 determines Beat 2 survivability and the Beat 3 Quint offer (rep ≥ 3 required for Quint to extend the offer).

## Failure design (Act 3 quota)

- **Hard fail (the act's defining permadeath):** Pavement at Beat 2 — heat ≥ 8 AND rep ≤ 3 AND fight/run. Legible: "you took too much heat, you didn't build enough cover, the man who used to be your friend let you walk into a room you weren't getting out of."
- **Soft fails:** Failing to reach Dora at Beat 4 with `left_package` set on the high-heat track converts a possible Expose into Martyr — this is *designed*, not penalised, but framing matters: the player should feel the package was the safety net, not a free win. Burning `mort_owes_one` at Beat 3 (using Mort's basement to hide) closes the Dora-direct path at Beat 4 — the ally was a single use.
- **Locked endings:** No `found_ledger` OR evidence < 6 — Expose and Martyr are locked at Beat 5; Bury It late is the only option. Greyed out at the climax with the failure line: "You don't have enough to make it stick."
- **Narrative wounds:** Brennan does not appear in person in Act 3 — only as the voice on the radio at Beat 4 reading out the false murder Frank is wanted for. Pastor Briggs's absence from Act 2 pays off here as a single line in the Aldwick visit at Beat 4 if taken — Marta tells Frank where Briggs went. Mort, if used at Beat 3, is not seen again — the press path closes around him visibly.
- **Red herring resolved:** Salzano is the gun, not the principal. The Beat 6 Expose coda names the principal — Halston Thorne, the Mayor's brother — and the player who spent two acts watching Brennan or Voss as the antagonist learns at the end that the real face of the conspiracy never appeared on screen until the papers ran his name.
