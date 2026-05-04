# Vault 34 — Act 1: The Sealed Door

## Entry

Arrives from: story start.

Player state on entry:
- Stats: STR 5, PER 5, CHR 5
- Flags: none set
- Location: security locker room, end of shift
- Visible HUD: stats only (no items, no faction)

The player is a security officer who has just rotated off shift. A junior tech named Mira left a folder of "misfiled engineering documents" in the locker — she is too scared to deliver them herself. The folder contains the suppressed reactor report. The clock has not started yet — it starts when the report is read.

## Scenes (target ~25)

### Beat 1 — The Locker Room (the inciting act)

Scenes: `locker_room`, `read_report`, `dismiss_report`.

What happens: Player finds the folder. Choice to open or ignore. Ignoring loops back once with Mira hovering nervously; second refusal ends the run with a quiet death-by-irony scene 87 hours later (permadeath — the vault melts down off-screen, no choices presented). Reading sets `found_report` (VISIBLE: "The Reactor Report"). The dating discrepancy on the cover sheet — a PER 6 check — sets `report_dated_old` (silently flags Cole has known for months, not days).

Choice point:
- "Open the folder" → `read_report` (sets `found_report`)
- "Shove it back in the locker" → `dismiss_report` (loops once, then permadeath if refused again)

Gating:
- PER 6 check on `read_report` for the dating discrepancy — **grey out** ("[Perception 6]") so the player knows there was something to spot.
- Refusing twice is **not gated** — it's a real choice with a real ending.

### Beat 2 — Atrium First Pass (orientation)

Scenes: `atrium_first` (becomes the hub later), `atrium_propaganda`, `atrium_loiterer`.

What happens: Player crosses the central plaza on the way somewhere. Propaganda speakers cite the Overseer's "ongoing commitment to atmospheric integrity." A loiterer (unnamed, recurring background) makes a sour joke. This beat establishes the Atrium as a place and seeds three destinations: Medical (Doc Reyes), Reactor Deck (Yuna), Security Block (terminal). The hub layout is introduced but the player is railroaded into picking one of the three first — this becomes Fork A.

No choice gating yet. All three Fork A options are visible and open.

### Beat 3 — Fork A: Learning the Truth (three approaches, pick one to start, others available later via hub)

Scenes: `medical_office`, `talk_doc_reyes` (conversation hub), `reactor_deck`, `talk_yuna` (conversation hub), `security_terminal`, `terminal_hack`.

The player picks one of three first contacts. Each fork sets a relationship flag and opens — or fails to open — that NPC as a possible Act 1 ally. The unchosen forks are still available from the Atrium hub later, but with reduced trust (you came to them second).

#### Fork A.1 — Doc Reyes (medical office)

`medical_office` → leads into `talk_doc_reyes`. Reyes is a quiet, cynical woman in her fifties. She has been documenting a rise in radiation-symptom presentations for months and has been told by Cole to "stop alarming residents." She is the safest source but the slowest — she will not give you anything useful until trust is earned.

Conversation hub topics (each sets a flag, returns to hub, depletes):
- "Ask about the suppressed report" (requires `found_report`) → confirms it's real, sets `reyes_confirmed_report`
- "Show her your radiation symptoms" → sets `radiation_sick` (VISIBLE: "Rad Sickness") AND `reyes_treated_you` (small trust boost). Player may choose not to ask; the flag is only set if asked.
- "Ask about missing residents" → sets `reyes_told_about_missing` (three names, all critics of Cole)
- "Ask about Cole's mental state" → sets `reyes_told_about_cole` (he's been sleeping in the control room)
- "Ask if she'll help you open the door" → only appears after **three** other topics asked. Sets `trusted_by_doc_reyes` if CHR 5 (grey-out shows the requirement); otherwise sets `reyes_refused`.
- "Walk away" — always available, returns to Atrium

Gating:
- "Ask about suppressed report" — **hidden** until `found_report` (existence is a spoiler).
- "Will you help me?" — **hidden** until 3 topics asked (avoids player spamming the trust ask).
- CHR check on the help ask — **grey out** so player understands.

#### Fork A.2 — Yuna (reactor deck)

`reactor_deck` → `talk_yuna`. Yuna is a young, abrasive engineer who already knows the reactor is dying — she wrote half the suppressed report. She is on a watchlist but Cole hasn't pulled her in yet because she's the only one who can keep the coolant running. She is the fastest source of confirmation but pushes the player toward action.

Conversation hub topics:
- "Ask about the reactor" (requires `found_report`) → sets `yuna_confirmed_report`, gives the technical picture (72 hours, optimistic)
- "Ask about the maintenance shaft" → sets `knows_maintenance_shaft` (a back route to the door mechanism, gated by STR later)
- "Ask why she's not in custody" → sets `yuna_told_about_status` (gallows joke about being indispensable)
- "Ask about Cole's loyalists" → sets `knows_loyalists` (names three guards who walk Cole's corridor)
- "Offer to help stabilise the reactor" — appears after `yuna_confirmed_report`. Leads to `stabilise_reactor` (one-shot scene, see Beat 5). **Consumable.**
- "Walk away" — always available

Gating:
- "Ask about the reactor" — **hidden** until `found_report`.
- Stabilise offer — **hidden** until `yuna_confirmed_report`. Consumable: `requires.flags_unset: [reactor_attempted]`, `effects.flags.reactor_attempted: true`.

#### Fork A.3 — Stolen Terminal (security block)

`security_terminal` → `terminal_hack`. Player uses their security creds to access a half-locked supervisor terminal. PER 6 check to crack the deeper layer.
- PER 6 success → `read_terminal_logs` (sets `found_report` if not already set; sets `terminal_evidence` — proof of Cole's deletions, useful in Fork B exposure route)
- PER 6 fail → `terminal_alarm` (sets `cole_alerted`, no evidence gained)

This is the fastest path to the truth but the riskiest. It's also the *only* way to get `terminal_evidence`, which doubles the success chance of the public exposure choice in Fork B.

Gating:
- The terminal scene itself is always visible (player is security, can plausibly be there).
- PER check — **grey out**.
- `cole_alerted` will visibly change the Atrium hub from this point on.

### Beat 4 — The Atrium Hub Awakens

Scene: `atrium_hub` (the recurring hub form of `atrium_first`).

After Fork A is initiated (any branch), the Atrium becomes a real hub. From here the player can:
- Return to Doc Reyes (if not exhausted) → `talk_doc_reyes`
- Return to Yuna (if not exhausted) → `talk_yuna`
- Visit the Security Block / terminal (if not yet attempted) → `security_terminal`
- Visit the Overseer's corridor (Fork B prep) → `overseer_corridor` (only appears once `found_report` is set — **hidden** otherwise)
- Visit the Broadcast Booth (Fork B exposure route) → `broadcast_booth` (only appears once `found_report` is set — **hidden** otherwise)
- Visit the Maintenance Shaft (Fork C / escape prep) → `maintenance_shaft` (only appears with `knows_maintenance_shaft` — **hidden** otherwise)
- Rest in the bunkroom → `rest_bunk` (a "do nothing" option that advances the timer one tick; used to make time pressure legible)

Hub flag-gated changes (cosmetic but important):
- `cole_alerted` — two guards now stand watching the player; certain choices add `+1 risk` flavour, and attempting `security_terminal` again locks out (replaced by "the terminal has been wiped")
- `exposed_truth` — residents nod, one slips you a stim
- `radiation_sick` — sweat described, residents glance at you
- `reactor_stabilised` — the rumble in the floor has quieted

Choice points: every hub option leads somewhere and returns. The hub is the spine of the act.

Random: the loiterer scene `atrium_loiterer` is a weighted random insert on hub re-entry — 1-in-4 chance of a flavourful one-off (rumour, complaint, or small stat-irrelevant gift). Used to make the hub feel alive on repeat visits.

### Beat 5 — Reactor Stabilisation (consumable side-quest)

Scene: `stabilise_reactor`.

Triggered from Yuna's conversation hub. One-shot. STR 6 check (grey-out) — Yuna talks the player through a coolant valve reset that requires bracing a heavy panel.
- Success → `reactor_stabilised`, extends the in-fiction timer (mechanically: opens the "Open Door" ending path in Act 2 by allowing an extra Diner-prep scene, and unlocks `yuna_joins` if Yuna is later asked).
- Fail → coolant burst, `radiation_sick` set if not already, Yuna survives but `yuna_joins` is locked off.

Consumable: `requires.flags_unset: [reactor_attempted]`, `effects.flags.reactor_attempted: true` either way.

This scene also seeds Yuna's willingness to leave with you — she will only follow if she trusts the door is worth opening.

### Beat 6 — Fork B: Handling Cole

Scenes: `overseer_corridor`, `cole_office`, `cole_confront_force`, `cole_confront_blackmail`, `broadcast_booth`, `broadcast_attempt`, `cole_join`.

The player must deal with Cole to get the second door key (he carries it; the master key in his desk is a backup). Four routes:

#### B.1 — Direct confrontation (force)

`cole_confront_force`. STR 7 check OR `vault_suit_upgraded` flag (small bonus). Grey-out.
- Success → kills Cole. Sets `killed_cole`, `has_master_key`. Cole's loyalists become hostile but the corridor is now passable. Strong path toward Warden's Ghost ending.
- Fail → player wounded, dragged out. Sets `cole_alerted` strongly (any subsequent Atrium re-entry triggers a chase). One follow-up choice to retreat or die fighting (death = permadeath).

#### B.2 — Public exposure (broadcast)

`broadcast_booth` → `broadcast_attempt`. CHR 6 check (CHR 5 if `terminal_evidence` is held — the evidence makes the speech land harder). Grey-out shows the modified threshold based on whether you have evidence.
- Success → `exposed_truth` set (the vault knows the truth; resistance members rally). Cole flees to his bunker and locks down the control room. Master key still required — but several residents will now help force the door from the corridor side. Strong path toward Vault Reborn.
- Fail → `cole_alerted`, broadcast booth permanently locked, the speech becomes a vault joke. Reduces resistance member trust.

Consumable: `requires.flags_unset: [broadcast_attempted]`, `effects.flags.broadcast_attempted: true` either way.

#### B.3 — Blackmail (PER + leverage)

`cole_confront_blackmail`. PER 6 check AND requires `terminal_evidence` OR `reyes_confirmed_report` AND `reyes_told_about_missing` (i.e. you have material on him). Grey-out shows the PER threshold but **hides** the evidence requirement (the choice doesn't appear without it — having no leverage means you don't realistically know to try).
- Success → Cole hands over the master key to keep his secret. `has_master_key` set. He is **not** killed; he's still in play and may resurface in Act 2 as a loose threat. Sets `blackmailed_cole` (hidden).
- Fail → Cole laughs and calls his guards. Same wounded outcome as B.1 fail.

#### B.4 — Join Cole (early bad-end preview)

`cole_join`. Always visible once player enters `overseer_corridor`. Cole, if approached without aggression, offers a deal: side with him, help him keep the lid on, ride out the meltdown in the sealed control bunker (which has its own coolant loop — a dark joke, only the loyal survive).

This ends Act 1 immediately with a short epilogue scene (`ending_loyalist_preview`) — the player survives the meltdown alone in the bunker, the vault dies around them, and the closing line is a Vault-Tec memo style sign-off. Permadeath in the sense that the run ends here. Sets `overseer_loyalist`. **No transition to Act 2.**

This is intentional — the brief calls for "join him (ends the run early — bad ending preview)." It exists to make the player feel the weight of the other choices.

### Beat 7 — The Master Key (alternate, stealth)

Scene: `steal_master_key`.

If the player avoids confrontation entirely, they can attempt to steal the master key from Cole's desk drawer when he is on his nightly atrium walk. Triggered from Atrium hub once `knows_loyalists` is set (so the player knows Cole's schedule).

- PER 6 check (grey-out). Success → `has_master_key`, no alert. Failure → `has_master_key` AND `cole_alerted` (the brief specifies this — you got it, but you tripped a sensor).

Consumable: `requires.flags_unset: [key_attempted]`, `effects.flags.key_attempted: true`.

This is the "neither confront nor expose" path — gets you the key without setting the moral flags. It's the cleanest route toward Ghost of 34 (solo escape).

### Beat 8 — Fork C: Who Comes With You

Scenes: `gather_allies`, `recruit_doc`, `recruit_yuna`, `recruit_resistance`, `solo_prep`.

Once `has_master_key` (or its broadcast equivalent — `exposed_truth` rallies residents to help force the door without the key, an alternate route), the player has a final hub-style decision: who do you collect on the way out?

This is not a single choice; it's a small loop where each potential companion is a separate visit:

- **Doc Reyes** (`recruit_doc`): only available with `trusted_by_doc_reyes`. Otherwise the choice is **hidden** (existence depends on relationship). She comes if asked.
- **Yuna** (`recruit_yuna`): only available with `yuna_joins` (i.e. you helped stabilise the reactor and asked her). Otherwise **hidden**.
- **Resistance group** (`recruit_resistance`): only available with `exposed_truth`. A group of ~12 residents will follow. Sets `led_evacuation` and `resistance_member`. Otherwise **hidden**.
- **Solo prep** (`solo_prep`): always available. Player gathers their own kit, leaves alone. Sets `abandoned_survivors` if `exposed_truth` is set (you rallied them, then left them behind — heaviest moral weight). Sets nothing if no rally happened (you never made a promise).

Each recruit scene returns to a small "ready to leave?" hub (`departure_hub`) with a final "open the door" choice. The player can collect multiple companions in sequence.

Gating summary:
- Doc — **hidden** without `trusted_by_doc_reyes`
- Yuna — **hidden** without `yuna_joins`
- Resistance — **hidden** without `exposed_truth`
- Solo — **always visible**

### Beat 9 — The Door

Scenes: `door_chamber`, `open_door`, `door_chamber_exposed_route`.

Player arrives at the vault door with whoever they recruited. Two opening methods:

- **Master key route** (`open_door`): requires `has_master_key`. Quick, quiet. Whoever is with the player exits with them.
- **Forced route** (`door_chamber_exposed_route`): requires `exposed_truth` AND at least one resistance recruit. The mob forces the door from the corridor side using the maintenance shaft (`knows_maintenance_shaft` required — **hidden** as a route option without it). Slower, louder, but doesn't require the key.

Either way, the door opens. A short final beat — light from outside, the smell of unfiltered air — before transitioning to Act 2.

If the player has `radiation_sick` and did NOT get treatment from Doc Reyes, a final PER check (grey-out) determines whether they collapse on the threshold (delays Act 2 opening by one scene of fevered hallucination — narrative texture, not a death).

## Hubs

### Hub — Atrium (`atrium_hub`)
Returns to: this scene after each Doc / Yuna / terminal / corridor / broadcast / maintenance / bunk visit.
Choices available: see Beat 4. Grows and contracts based on flags.
Exit: leaving the hub for `gather_allies` once `has_master_key` OR `exposed_truth` is set (the "I'm ready to leave" option appears).

### Hub — Departure (`departure_hub`)
Returns to: this scene after each recruitment visit.
Choices: recruit Doc / Yuna / resistance (each gated and consumable), open the door, leave alone.
Exit: `open_door` or `door_chamber_exposed_route`.

## Conversations

### Conversation — Doc Reyes (`talk_doc_reyes`)
Topics: report (hidden), symptoms, missing residents, Cole's state, will-you-help (hidden until 3 topics).
Each topic: sets a flag, loops back; topic disappears via `flags_unset`.
Exit: "Walk away" → Atrium hub (always available).

### Conversation — Yuna (`talk_yuna`)
Topics: reactor (hidden), maintenance shaft, status, loyalists, stabilise offer (hidden, consumable).
Each topic: sets a flag, loops back; topic disappears.
Exit: "Walk away" → Atrium hub (always available).

## Random / Weighted Scenes

- `atrium_loiterer` — 1-in-4 chance triggered on Atrium hub re-entry. Three flavour variants (rumour, complaint, gift). Pure colour; no path implications.
- `terminal_hack` — PER check is deterministic, not random, but feels uncertain to the player. Not weighted-random.
- No combat random tables in Act 1 — randomness is reserved for Act 2 wasteland travel.

## Exits

Act 1 ends at the door opening (or at `cole_join` for the early bad-end preview). The intended exit configurations are deliberately constrained — **6 distinct exit states** so Act 2 can branch cleanly on entry.

### Exit State 0 — Loyalist (early end, no Act 2)
Trigger: `cole_join` taken.
Companions: none (Cole is in his bunker, you're in his anteroom).
Flags set: `overseer_loyalist`, plus whatever was set in Act 1 prior.
Act 2 entry: **none**. Story ends with `ending_loyalist_preview` epilogue.

### Exit State 1 — Solo Ghost
Companions: none.
Required flags: `has_master_key`, NOT `exposed_truth`, NOT any companion flag.
Likely flags: `cole_alerted` may or may not be set; `killed_cole` possible (force route taken alone); `blackmailed_cole` possible.
Stat shifts likely: STR or PER may have been tested (no permanent stat changes — engine has no XP — but `vault_suit_upgraded` may be set if player visited the armoury; flag treated as +1 STR effective).
Personal flags possible: `radiation_sick` (untreated), `reactor_stabilised` (unlikely — Yuna not asked).
Act 2 entry: player exits alone, has supplies for one. Solo opening scene.
Path to: Ghost of 34 ending (default), Warden's Ghost ending (if `killed_cole` and later `raider_pact`).

### Exit State 2 — Solo with Moral Weight (Abandoner)
Companions: none.
Required flags: `has_master_key`, `exposed_truth`, `abandoned_survivors`, NOT companion flags.
The player rallied the vault publicly, then slipped out alone.
Likely flags: `resistance_member` NOT set (player didn't formally join), residents now know they were betrayed.
Act 2 entry: same opening as State 1 mechanically, but Act 2 should reference the rally and the abandonment in early scenes (residents may follow later, hostile).
Path to: Ghost of 34 (haunted variant — text differs), Warden's Ghost.

### Exit State 3 — With Doc Reyes
Companions: Doc Reyes.
Required flags: `trusted_by_doc_reyes`, `has_master_key`, NOT `resistance_member` (or with — both possible), Yuna NOT joined.
Likely flags: `reyes_treated_you` likely (player asked about symptoms); `radiation_sick` likely cleared; `reactor_stabilised` possible but not required.
Act 2 entry: two-person exit. Doc provides medical safety net, dialogue partner.
Path to: Vault Reborn (if also resistance), Open Door (if Salvager path taken — Doc's medical knowledge is the trade good for `sold_medical_data`), Ghost variant.

### Exit State 4 — With Yuna
Companions: Yuna.
Required flags: `yuna_joins` (which requires `reactor_stabilised` AND Yuna asked), `has_master_key` OR `exposed_truth`.
Likely flags: `reactor_stabilised` set (timer extended → enables Open Door pacing in Act 2).
Act 2 entry: two-person exit. Yuna provides technical capability (radio repair, surface tech).
Path to: Vault Reborn, Open Door, Warden's Ghost (if also `killed_cole`).

### Exit State 5 — Mass Evacuation (Resistance Lead)
Companions: ~12 residents (resistance group), optionally Doc and/or Yuna.
Required flags: `exposed_truth`, `led_evacuation`, `resistance_member`.
Master key NOT required (forced-door route via maintenance shaft is canonical for this state).
Likely flags: `killed_cole` possible but not required; if Cole was confronted publicly via broadcast he is in the bunker, alive.
Act 2 entry: large-group exit. Diner becomes feasible as a defended position. Resource pressure is higher (more mouths) but combat power is greater.
Path to: Vault Reborn (default), Open Door (if Salvagers contacted and CHR sufficient), Warden's Ghost variant only if player later betrays the group.

### Why six states (one of which is a non-exit)

Act 2 needs to branch on (a) party size — solo, pair, group — and (b) moral weight — clean, betrayer, leader. Six states cover the matrix without explosion. The Loyalist state (0) is a non-exit and exists only as a moral mirror for the player's other choices. Act 2 author should treat the live exit set as **five states (1–5)**.

## Flags / Stats Changed in Act 1

### Visible HUD flags (set during Act 1)
- `found_report` — "The Reactor Report" — set in Beat 1 or via terminal
- `has_master_key` — "Master Key" — set in Beat 6 or 7
- `radiation_sick` — "Rad Sickness" — set if Doc reveals symptoms or reactor stabilisation fails
- `vault_suit_upgraded` — "Reinforced Vault Suit" — optional armoury side trip during Beat 4 (single-scene, STR 6 grey-out, consumable)

### Hidden flags (gameplay-relevant)
- `report_dated_old` — PER 6 spot in Beat 1
- `reyes_confirmed_report`, `reyes_treated_you`, `reyes_told_about_missing`, `reyes_told_about_cole`, `reyes_refused`, `trusted_by_doc_reyes` — Doc conversation
- `yuna_confirmed_report`, `knows_maintenance_shaft`, `yuna_told_about_status`, `knows_loyalists`, `yuna_joins`, `reactor_attempted`, `reactor_stabilised` — Yuna conversation and reactor scene
- `terminal_evidence`, `cole_alerted` — terminal hack
- `broadcast_attempted`, `exposed_truth` — broadcast scene
- `killed_cole`, `blackmailed_cole` — Cole confrontation routes
- `key_attempted` — stealth key scene
- `overseer_loyalist`, `resistance_member`, `led_evacuation`, `abandoned_survivors` — endgame faction/moral flags

### Stats
No permanent stat changes during Act 1 (the engine has no XP). All checks read against starting STR/PER/CHR plus `vault_suit_upgraded` as a soft +1 STR bonus in physical checks where it makes sense (Cole force confrontation, door-forcing).

## Consumable Choices in Act 1 (full list)

Listed here so Stage 3 doesn't miss them:

1. **Read or dismiss the report** (Beat 1) — second dismissal is permadeath; first dismissal allows return.
2. **Stabilise the reactor with Yuna** (Beat 5) — `reactor_attempted` consumable.
3. **Steal the master key** (Beat 7) — `key_attempted` consumable.
4. **Trigger the atrium broadcast** (Beat 6) — `broadcast_attempted` consumable.
5. **Direct confrontation with Cole** (Beat 6) — implicitly consumable; if you live, the corridor state changes such that the choice no longer makes sense.
6. **Blackmail Cole** (Beat 6) — same, implicitly consumable.
7. **Recruit Doc / Yuna / Resistance** (Beat 8) — each consumable (`recruited_doc`, `recruited_yuna`, `recruited_resistance` flags).
8. **Vault suit upgrade** (Beat 4 side trip) — `armoury_visited` consumable.
9. **Each Doc Reyes topic** — depleted via `flags_unset` on the conversation hub (standard pattern).
10. **Each Yuna topic** — same.

## Grey-out vs Hidden Decisions (full list)

Grey-out (player should see the gate):
- All STR / PER / CHR checks where the player has met the relevant context (force Cole, broadcast, blackmail, terminal hack, key steal, reactor stabilise, vault suit, door-threshold collapse check).
- Doc's "will you help" once unlocked (CHR threshold visible).

Hidden (existence is a spoiler):
- All conversation topics gated on `found_report` (asking about a report you don't know exists).
- Overseer corridor and broadcast booth as Atrium destinations until `found_report`.
- Maintenance shaft as a destination until `knows_maintenance_shaft`.
- Blackmail option (requires evidence — without leverage, you wouldn't think to try).
- Doc / Yuna / Resistance recruit options (their existence depends on relationship state).
- Forced-door route (requires `knows_maintenance_shaft` AND resistance group).
- Stabilise-reactor offer (requires `yuna_confirmed_report`).

## Permadeath Points in Act 1

- **Dismiss the report twice** (Beat 1) — vault melts down off-screen, ironic epilogue.
- **Confront Cole and lose** (Beat 6, force or blackmail fail) — follow-up "fight to the death" choice is real death if taken; retreat is survivable but with `cole_alerted` heavy.
- **Join Cole** (Beat 6) — not death, but a hard ending of the run with no Act 2.
- **Reactor stabilisation severe failure** — narrative fail (sets `radiation_sick`) but not lethal in Act 1; lethality deferred to Act 2 if untreated.

## Notes for Act 2 author

- The **Diner** in Act 2 will scale to companion count: solo, pair, or group. Plan room for all three.
- `reactor_stabilised` is a pacing flag — its only Act-2 effect is permitting one extra prep beat before the final reckoning. Use it, don't waste it.
- `terminal_evidence` is consumed in Act 1 (used in broadcast or blackmail). It does not carry to Act 2.
- `blackmailed_cole` means Cole is alive and angry. Consider a loyalist-remnant pursuit thread in Act 2 if this flag is set without `killed_cole`.
- `radiation_sick` carrying into Act 2 is intended — Doc Reyes treatment in Act 1 clears it; otherwise it persists and should gate or grey-out one or two Act 2 choices (long marches, holding breath in dust storms).
- The `overseer_loyalist` end-state (Exit State 0) is a hard stop — Act 2 should not attempt to receive it.
