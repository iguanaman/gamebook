# Dead Letters — Act 3: The Cost

## Journal Entry
I knew what the city was. I just didn't know it had been watching me the same way I'd been watching it.

## Entry
Arrives from: Act 2 Exits 1–6
Player state at entry:
- evidence 1–9, heat 0–9, rep 2–6
- Flags possibly set: `found_ledger`, `left_package`, `trusted_kellner`, `cops_warned_off`, `marta_talked`, `frank_past_revealed`, `kellner_surfaced`
- Act 2 Exit 1 (Informed Survivor): evidence ≥ 6, heat ≤ 5, rep ≥ 4 — clean entry with ledger, room to manoeuvre
- Act 2 Exit 2 (Informed and Exposed): evidence ≥ 6, heat 6–7, rep 3–4 — ledger in hand, city already knows
- Act 2 Exit 3 (Informed Martyr): evidence ≥ 6, heat ≥ 6, `found_ledger` + `left_package` — fate half-decided
- Act 2 Exit 4 (Thin Evidence, Low Danger): evidence 3–5, heat ≤ 4 — survives but Expose probably locked
- Act 2 Exit 5 (Thin Evidence, High Heat): evidence 3–5, heat ≥ 6 — bad odds, permadeath threshold live
- Act 2 Exit 6 (Flying Blind): evidence ≤ 2 — investigation failed; Bury It is the only real option

---

## Beats

### Beat 1 — Kellner's Move
Frank goes to Walt Kellner — or Kellner comes to Frank. Either way the meeting happens. On the surface: an old colleague who wants to help, maybe extract Frank from a bad situation. What Frank sees depends on what he's been paying attention to. The betrayal lands differently based on how much Frank trusted him: if `trusted_kellner` is set, Kellner knows exactly what Frank has, and the ambush is surgical. If not, Kellner is fishing — and Frank can read the tells if he's sharp.

The ambush is not a fight scene. It's two men in a car, a third at the door, and the moment Frank realises the man who vouched for him is the man who built the trap. If `frank_past_revealed` is set, Frank also understands why he was pushed off the force — Kellner ran the same play on him years ago, a different case, a different neighbourhood.

The lethality threshold: if heat ≥ 8 AND rep ≤ 3, Frank doesn't read it in time and doesn't get out. Permadeath — the Pavement ending. No choice, no heroics. He just stops.

Otherwise Frank gets out — burned, shaken, with whatever he already had. He can't go back to the office. He can't go to the police. He is now running.

What the player decides: how Frank handles the read. Bluff his way through the meeting and slip out early (requires reading Kellner correctly — player can pick a "something feels wrong" option). Accept the meeting at face value and get cornered (evidence of trust, worse escape). If `frank_past_revealed` is set, a third option appears: confront Kellner directly, name what happened years ago — Kellner blinks, which opens a crack Frank can use, but it costs heat +1 because Kellner now knows Frank knows everything. Sets `confronted_kellner`.

Connects to: Permadeath (Pavement) if threshold met | Beat 2 (Frank escapes)

### Beat 2 — Running Dark
Frank is off the board. His office is compromised, his phone is compromised, anyone he was seen with is now a liability. He has maybe twelve hours before Kellner's people formally close the net. He moves through the city on foot and instinct — stops he knows, back entrances, the kind of institutional memory an ex-cop carries without thinking about it.

This beat is the one space of pure movement in the act. Shorter than it sounds — three or four scenes — but they matter: what Frank chooses to do with these hours, and who he chooses to protect or abandon, shapes which version of the act's final choice he reaches. Two side threads are available here, each optional: find June Holt from Aldwick (warns her the men who condemned her block know she talked — costs time but sets `june_warned` for flavour in the ending) or find Peltz, Ray's nervous coworker, who might have one more piece if Frank can convince him he's not a dead man already.

What the player decides: how Frank spends his last free hours. Each errand costs time and the meter is running. Prioritise June: `june_warned` set. Prioritise Peltz: small evidence chance (+1 if evidence is under 6). Do neither: Frank moves faster, heat doesn't climb from this beat. All three routes arrive at Beat 3.

Connects to: Beat 3 (linear)

### Beat 3 — The Last Angle
Frank takes stock of what he has. The act's mechanical reckoning: what is the actual evidence count, what flags are set, what endings are open? This is not explicit to the player — it surfaces as Frank narrating his situation honestly to himself: what would this hold up as? What would it actually do if it got out? The text of this beat shifts significantly based on evidence level. With the ledger (evidence ≥ 6): Frank knows the ledger, Ray's draft letter, and the holding company trail together are enough — a good reporter could run this, the right editor could print it. Without the ledger (evidence < 6): Frank has fragments, impressions, and a dead client. He knows something happened. He can't prove it to anyone who matters.

The second `left_package` window closes here permanently. If `found_ledger` is set, `left_package` is not yet set, and heat is still < 8: a final opportunity appears — Frank can still get the key pages to Dora Reyes before the net closes. It costs heat +1 (exposure risk) but sets `left_package`. After this beat, the window is shut.

What the player decides: whether to take the last chance to mail the package (if available). Nothing else branches here — this beat is a convergence point before the final choice.

Connects to: Beat 4 (linear)

### Beat 4 — The Final Choice
Frank reaches the moment. What he does next is the ending.

Three outcomes are possible, and which ones are reachable depends entirely on the player's accumulated state:

**Option A — Expose (requires evidence ≥ 6):** Frank takes everything to Dora Reyes at the Harmon Courier. If Dora's name is already circulating in Kellner's net (heat ≥ 8 AND `left_package` NOT set), this option is greyed out — too dangerous to reach her. Otherwise it's open. Frank walks in, puts the ledger and the documents on her desk, and tells her what he knows. The story runs. He knows what follows.

**Option B — Bury It (always available):** Frank burns the copies, puts the ledger back somewhere it will never be found, and walks out of Harmon City. He survives. The highway gets built. The Aldwick residents who are still there get the relocation checks that were already cut. Kellner shakes someone else's hand at a function and doesn't lose a night's sleep. Frank drives until the city lights are behind him.

**Option C — Martyr (only available if `left_package` is set AND heat ≥ 7):** Frank doesn't reach Dora. Kellner's men find him before he can make the choice. But the package is already in transit — he mailed it at Beat 5 of Act 2, or at Beat 3 of this act. He gets a moment, in the dark, to understand that it doesn't matter what happens to him now. Dora will open the package. This option is not a player-chosen action — it triggers when the conditions are met and the player reaches the final choice point. Frank doesn't "choose" the Martyr ending; he arrives at it.

What the player decides: the final binary between Expose and Bury It, when both are available. If only Bury It is available: the player confirms the walk away — the choice is shown, evidence ≥ 6 version greyed out with "You don't have enough to make it stick." If Martyr triggers: no choice scene. Frank's narration does the work.

Connects to: Exit A (Expose) | Exit B — early (Bury It, low evidence) | Exit C — late (Bury It, high evidence walk away) | Exit D (Martyr) | Exit E (Pavement — from Beat 1)

---

## Exits

- **Exit A — Expose:** Leaves from Beat 4. Requires evidence ≥ 6, heat < 8 or Dora reachable. `found_ledger` set. `confronted_kellner` set. Frank goes to the press. Career over. Safety gone. The story runs. The city machine slows — not stops — but slows. Ending 1. Left ambiguous whether Frank survives what follows.

- **Exit B — Bury It (Early / Low Evidence):** Leaves from Beat 4. evidence < 6, `found_ledger` not set (or set but ledger incomplete). Frank knows the shape of it but can't make it stick. He walks. He was never going to win this one. Ending 2, low-guilt flavour — the city beat him on the facts, not because he chose to let it.

- **Exit C — Bury It (Late / Chosen):** Leaves from Beat 4. evidence ≥ 6, `found_ledger` set, player chooses to walk away at the final choice. Frank knows exactly what he's leaving behind — the full ledger, Ray's letter, the holding company trail. He makes the calculation: his life against a story that might get buried anyway. He chooses to live. Ending 2, late variant — Frank carries the weight of knowing. The city keeps smiling. He knows it's smiling.

- **Exit D — Martyr:** Leaves from Beat 4 (triggered, not chosen). Requires `left_package` set AND heat ≥ 7. Frank doesn't make it to the choice. Kellner's men find him. He dies in a city he knew wasn't worth dying for, except it was. The package reaches Dora Reyes. The story runs. Frank doesn't read it. Ending 3.

- **Exit E — Pavement (Permadeath):** Leaves from Beat 1. Requires heat ≥ 8 AND rep ≤ 3. Frank reads Kellner wrong or has no cover. The ambush isn't survived. No journalist. No justice. The ledger — if he had it — is taken. The investigation ends with Frank. The city never blinks. Not one of the three named endings — this is the failure state.

- **Exit F — Bury It (Walk Away Before Kellner):** Note: this exit does not exist in Act 3 — the walk-away option was Act 1's Fork A. By Act 3, Frank has committed too far to simply not show up to the Kellner meeting. The act opens with the meeting already in motion.

---

## Flags/Stats Changed

- `confronted_kellner` — set at Beat 1 when the betrayal scene completes (any variant). Not player-visible. Closes Kellner conversation hub permanently. Required for all Act 3 endings — the act cannot proceed without this scene.
- `june_warned` — set at Beat 2 if Frank takes time to find June Holt and warn her. Not player-visible. Flavour: appears in Expose and Martyr ending text as a small grace note — one person Frank protected who didn't need to be in the story at all.
- `left_package` — may be set at Beat 3 (final window) if not already set. Player-visible: yes ("Package sent"). Consumable — hidden after taken. Sets Martyr ending availability.
- `frank_past_revealed` — already set or not from Act 2; affects Beat 1 dialogue only, no new set in Act 3.
- `evidence` — possible +1 at Beat 2 (Peltz thread, if evidence < 6); no other gains in Act 3. The investigation is over — Frank is running on what he has.
- `heat` — possible +1 at Beat 1 (frank_past_revealed confrontation variant); possible +1 at Beat 3 (mailing the last package). Heat is otherwise static in Act 3 — the city's net is already drawn, accumulated heat is the threshold that determines lethality, not a live variable to manage.
- `rep` — no changes in Act 3. Rep locked at Act 2 exit values; it gates only the Kellner ambush survivability (already calculated at Beat 1).
