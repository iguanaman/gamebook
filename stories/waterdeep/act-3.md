# One Night in the Yawning Portal — Act 3: The Return

## Journal Entry
The well is behind you. The night is not yet done — the Portal still has accounts to settle.

## Entry
Arrives from: Act 2 Exit α (Clean Rescue) / β (Costly Rescue) / γ (The Bargain) / δ (Lost in the Deep) / ε (A Worse Door Opened) / ζ (Retreated Without Reaching).
Player state: `scene = act_3_open`, `descended_well` set, `climbed_back_out` set unless ζ. Outcome flags carried per exit (`rescued` / `bargained` / `stirred_something` in their valid combinations, or none on ζ). `met_the_thing_below` set on α/β/γ/δ/ε; absent on ζ. `knows_the_truth` set on α/β/γ/δ/ε; absent on ζ. Companion fate flags carried (`*_died`, `vesna_left`, `body_recovered`). Side flags from Acts 1–2 carried unchanged: `durnan_respects_you`, `mirt_owes_favour`, `found_journal`, `apprentice_alive_recently`, `journal_decoded`, `arrived_loud`, lead flags, combat colour flags. Stats: Coin 2–14, Vigor 0–5 (battered), Wits unchanged from start, Renown −2 to +5.

The act is **tight by design** — ~15 scenes total covering re-entry, settle-up, companion fate, NPC reactions, and the six ending exits. Most differentiation lives in *prose* and *which option the player picks at the Settle-Up*, not in deep branching.

## Beats

### Beat 1 — Re-entry (the Well-mouth, second visit, or the street if retreat)
What happens: The player crests the rope into the Portal's common room — or, on Exit ζ, *steps back* from the well-mouth without ever having gone deep, the rope still coiled and the Portal's common room loud just behind. On α/β/γ/δ/ε, the room *quiets* as the party emerges: a tavern's stunned gear-shift when a thing it didn't quite believe in actually comes back up. On ε (`stirred_something`), the quiet has *teeth* — patrons feel a wrongness in the air the moment the player crosses the rim, and the well itself is described as breathing. On ζ, the room hasn't even noticed the player left and returned; the shame of that is its own colour. The chosen pair (or what's left of them) emerges with the player; if a companion died, their absence is established here in a single weighted line — Vesna's prayer-coin missing from the rope, Korsa's axe-wedge left below, Pip's lockpicks empty in the player's hand, Thessaly's residual sigil cooling on a stone. If `body_recovered`, the dead companion's body is laid down; if not, the loss is named without a body. The apprentice is present (α/β/γ, and on ε if `rescued` carries) — alive and themselves on α/β, *marked* on γ (a quiet wrongness in their gaze), shivering and silent on ε-with-rescued. The apprentice is *absent* on δ/ε-without-rescued/ζ.
What the player decides/learns: Which version of the night they brought back is now *visible* to the room. The first social shock of the return — Durnan's eyes from the bar, the regulars' silence, the client's face if they're still there. No real choice yet — this is the orienting beat.
Connects to: Beat 2 (Settle-Up at the bar).

### Beat 2 — Settle-Up at the Bar (Conversation hub)
What happens: The Portal's bar, Durnan behind it, the night's accounts opening up. The client is present (or has *been sent for*) on every exit except ε (where they may have already fled the room — flag `client_fled_in_dread` if Renown ≤ 0 on emergence). This is the act's central hub — three to four short conversation slots that surface different parts of the night's reckoning. Each slot is a one-shot (`flags_unset` gated):
- **Hand the apprentice over (or report their fate).** The client's face does the work — relief on α, grief on β, confused dawning horror on γ as they notice the *mark*, breaking on δ, blank shock on ε, careful neutrality on ζ. Sets `client_paid_in_full` (α/β), `client_paid_partial` (γ — they pay but don't meet your eyes), `client_paid_grief` (δ — they pay anyway, the right thing the wrong way), `client_refused_pay` (ε if `client_fled_in_dread`; γ if Renown ≤ 0), `client_paid_for_news` (ζ — a smaller purse for the lead, even though no rescue). Coin gain varies: full 10 gp on full pay, 6 gp on partial/grief, 3 gp on news, 0 gp on refusal. Tab-cleared if `durnan_respects_you`.
- **Talk to Durnan.** A short exchange — Durnan reads the player's face and the room's mood and does *not* offer platitudes. On α with high Renown he stands a drink unprompted (sets `durnan_stood_a_drink`, the Hero ending hinge). On β he pours something quiet and good. On γ his eyes flick to the apprentice's mark; "we'll keep an eye on them." On δ he says the apprentice's name, just once. On ε he looks at the well and says *bar a man up at the rim tonight*. On ζ he does not look up; "another time, then." Topic depletes.
- **Companion exit beats.** One short scene per surviving recruited companion — they say their piece, take their share or refuse it, and step back into or out of the player's night. (Detailed in Beat 3.)
- **Mirt approaches** — only if `mirt_owes_favour` is set AND Renown ≥ 1 AND not on ε (Mirt is not in the room on ε; he *also* felt the wrongness and left for the Castle Ward). Mirt's offer surfaces here: a place in his network, the night ending as a beginning. Sets `mirt_offer_heard`, opens the Beat 5 fork.
- **Walk to the door without settling.** Always available; chosen choice for the ε-with-dread close. Sets `left_without_settling`.
What the player decides/learns: The cost and shape of the night, made *literal* in coin and word. Whether they take Mirt's hand if it's offered. Whether they walk away from the bar without finishing the books at all (a deliberate Ending 6 lean).
Connects to: Beat 3 (Companion farewells — gated by surviving recruited companions); Beat 4 (Closing the Books — Beat 2's natural exit when conversations exhaust); Beat 5 (Mirt's Offer Resolution — gated by `mirt_offer_heard`); Beat 6 (Walk Out — gated by `stirred_something` OR `left_without_settling`).

### Beat 3 — Companion Farewells (Hub-let, one short scene each)
What happens: Each surviving recruited companion gets a single short exit beat at the bar, taken in any order, before the player closes the books. These are *brief* — one or two beats of dialogue, a parting line, a flag set. Their content depends on outcome and on whether the *other* companion of the pair lived:
- **Korsa (alive).** Drinks a tankard; jokes if α or β-with-his-partner-alive, mourns plainly if his partner died, goes quiet on γ ("That… mark. You sure?"), takes the player by the shoulder on δ, and *will not look at the well* on ε. Always offers a hand to a future fight. Sets `korsa_farewell_warm` / `_grim` / `_uneasy`.
- **Vesna (alive, not `vesna_left`).** Prays at the bar — a short Tymora benediction over the night. On γ she does not look at the apprentice; her benediction omits them. On ε she presses her holy coin into the player's palm and tells them to *put a wall between themselves and the well tonight*. On δ she names every dead companion in the prayer. Sets `vesna_farewell_blessed` / `_strained`. (If `vesna_left` was set in Act 2's Beat 6, she is not at the bar — instead she is across the room, *not* approaching, and a shorter passing-glance beat fires; sets `vesna_passed_in_silence`.)
- **Pip (alive).** Counts her cut at the corner table, flicks the player a copper as a tip "for the entertainment", and *will be gone* by morning either way. On α/β she's grinning. On γ she eyes the apprentice and reckons the price isn't hers to argue. On δ she says nothing and slides her cut back across the table — keep it. On ε she's already at the door. Sets `pip_farewell_paid` / `_refunded` / `_already_leaving`.
- **Thessaly (alive).** Sits longest. On every outcome she has a private line about *recognising* the runes / the *thing* / the apprentice's mark — the brief's "her quiet reasons" surfaces here, partially. On α she warns it isn't over even on a clean win ("things like that *remember*"). On γ she looks at the marked apprentice with something like hunger and the player has a one-line read: *fellowship, or appetite, hard to tell*. On ε she alone is *not* surprised. Sets `thessaly_farewell_warning` / `_complicit` / `_grim`.

If a companion *died*, no farewell scene fires for them — instead, a single weighted absence-line is woven into the surviving partner's farewell ("Korsa drinks Vesna's share too" / "Pip flicks the copper at an empty stool"). If `body_recovered`, the body is laid out behind the bar and Durnan covers it with a clean cloth — colour line during whichever surviving farewell the player picks first; sets `companion_body_honoured`.

What the player decides/learns: The pair's last word on the night. Each farewell deepens the prose colour the upcoming ending will land in. No flag here drives an ending alone, but the cumulative set shapes the closing prose.

Connects to: returns to Beat 2 (Settle-Up). Closes when all surviving companions' farewell flags are set.

### Beat 4 — Closing the Books (Settle-Up exit fork)
What happens: With companions seen off, the client paid (or not), Durnan spoken to (or not), the player's hand is on their purse and the night is *yawning* at them. A short threshold scene at the bar — the room's noise filtering back in, the well still at the room's centre, dawn an hour away. The fork lands the ending unless the player has already chosen to walk out (Beat 6) or take Mirt's offer (Beat 5). The natural close from this beat resolves to **one of Endings 1, 2, 3, 4** by precedence, evaluated against the carried flag set:
- **Ending 6 (A Worse Door Opened)** — fires if `stirred_something` is set, regardless of other flags. **Highest precedence.** Player is routed via Beat 6 (Walk Out) — see below; if they tried to settle, the room *empties around them* mid-conversation and they end up at the door anyway.
- **Ending 3 (The Bargain)** — fires if `bargained` AND NOT `stirred_something`. Routed via Beat 4's natural close: the player pays, takes their share, watches the marked apprentice walk out into Waterdeep's pre-dawn, and settles into a tavern-chair with their drink going cold.
- **Ending 5 (Sworn to the City)** — fires only if Beat 5's Mirt fork is taken. Player chooses *not* to close the books here; they cross to Mirt's table instead.
- **Ending 1 (The Hero of the Portal)** — fires if `rescued` AND NOT `bargained` AND NOT `stirred_something` AND no `*_died` AND `durnan_stood_a_drink` (which itself requires Renown ≥ 2 entering Act 3 AND α exit). Triumphant close. The room knows the player's name.
- **Ending 2 (A Quiet Good)** — fires if `rescued` AND NOT `bargained` AND NOT `stirred_something` AND (`*_died` set OR Renown < 2 OR `durnan_stood_a_drink` not set). The right thing, the messy way. Modest fanfare. Bittersweet warmth.
- **Ending 4 (Lost in the Deep)** — fires if NOT `rescued` AND NOT `stirred_something`. The default *floor*. Sombre. Prose deepens if companion deaths are stacked. Also the default for ζ unless Mirt's offer is taken.
What the player decides/learns: How the night closes for them. The precedence is explicit — the loudest signal wins. The player picked the night's flags one by one; this beat *names* them.
Connects to: Ending 1 / 2 / 3 / 4 exits per precedence; Beat 5 if Mirt's offer is taken instead; Beat 6 if `stirred_something` overrides.

### Beat 5 — Mirt's Offer Resolution (gated branch)
What happens: A short scene at Mirt's corner table — Mirt slides a chair out, a fresh tankard, an envelope. The offer is plain: a place in his network of eyes-and-favours across the city, paid work, a room above a Trades Ward shopfront, the night ending as a beginning. The player accepts or declines:
- **Accept.** Sets `stayed_in_city`. Routes to Ending 5 (Sworn to the City). Available regardless of `rescued` outcome — Mirt's read of the player is based on Renown and what he heard happen, not on whether they brought the apprentice home. **Blocked by `stirred_something`** (Mirt is not in the room on ε; this whole beat doesn't fire). Blocked if `mirt_owes_favour` was lost (it isn't lost in any current path, but the gate is explicit).
- **Decline.** Returns to Beat 4 (Closing the Books). The natural-close ending fires per precedence. Mirt does not press; he salutes with the tankard and lets the player go.
What the player decides/learns: Whether Waterdeep gets to claim them tonight. The choice is *theirs alone* — no flag forces it, no companion weighs in. (This is the act's only freely-chosen ending fork.)
Connects to: Ending 5 on accept; Beat 4 on decline.

### Beat 6 — Walk Out (the door, on `stirred_something` or `left_without_settling`)
What happens: The player crosses the common room to the door without finishing the books — either driven by the *wrongness* on ε (the room's air gone tight, patrons rising one by one to leave, a low *sound* from the well even Durnan is now staring at), or by their own choice on `left_without_settling`. A short cold scene: the Portal's door, the night air, Waterdeep's pre-dawn streets. Coin in the purse (whatever was paid), the apprentice at their elbow or absent, the *thing* at their back. Companion farewells either compressed into a single passing line at the door (if they were rushed) or already done at the bar. On ε, the well is described one more time — *breathing*. The door swings closed behind the player. Sets `walked_out`. Routes to Ending 6 (A Worse Door Opened).
What the player decides/learns: That the night isn't *over* — only the Portal's part of it. Coin in the purse, dread at the back. The story closes mid-stride.
Connects to: Ending 6 exit.

### Hub — The Bar (Settle-Up)
Purpose: Act 3's only true hub. The player loops through Beat 2 (the bar), Beat 3 (companion farewells), and the optional Beat 5 (Mirt) until they settle into Beat 4's natural close or take Beat 6's walk-out.
Returned to from: Beat 3 (after each farewell), Beat 5 (on Mirt-decline).
Exits to: Beat 4 (Close the Books) when all available conversations exhaust or the player picks the walk-away choice; Beat 5 (Mirt) when `mirt_offer_heard` is set and the player crosses; Beat 6 (Walk Out) when `stirred_something` OR `left_without_settling`.

### Conversation — Durnan (final exchange)
Purpose: A single short topic-depleting hub *inside* Beat 2. Three to four lines drawn from the carried flag set. Closes after one back-to-bar.

### Conversation — The Client (handover)
Purpose: A single one-shot inside Beat 2. The client's reaction is the act's most outcome-sensitive line; the coin is its consequence. Closes immediately on completion.

## Exits

All exits are **endings**. Each is defined by an exact flag combination, the companion-fate state it fires under, and the narrator outro tone. Precedence (per structure): **6 > 3 > 5 > 1 > 2 > 4** — when more than one could fire, the higher number wins.

- **Exit / Ending 1 — The Hero of the Portal:** fires from Beat 4 natural close.
  - Triggers: `rescued` AND NOT `bargained` AND NOT `stirred_something` AND no `*_died` flags AND `durnan_stood_a_drink` (which requires Act-2 Exit α AND Renown ≥ 2 entering Act 3).
  - Companion fates: both recruited companions alive, both farewells warm, apprentice alive and themselves.
  - Outro tone: **triumphant, warm, earned.** The room remembers the player's name. Durnan's drink is the keystone line. Closing image: dawn light through the Portal's high windows, the well quiet, the player's chair pulled in among the regulars at last. Earnest high-fantasy victory; no irony.

- **Exit / Ending 2 — A Quiet Good:** fires from Beat 4 natural close.
  - Triggers: `rescued` AND NOT `bargained` AND NOT `stirred_something` AND (any `*_died` set OR Renown < 2 OR `durnan_stood_a_drink` not set). Includes Act-2 Exit α with low Renown, and all of Act-2 Exit β.
  - Companion fates: zero or one `*_died`; surviving companion's farewell is grim or strained; apprentice alive and themselves; if a companion died and `body_recovered`, the body lies behind the bar under Durnan's cloth.
  - Outro tone: **bittersweet-warm.** Modest coin, modest fanfare. The right thing the messy way. Closing image: a quiet drink, a dead friend named once, the apprentice's family thanking the player at the door without quite meeting their eyes. Earned, costly, no fanfare. The Portal's warmth does what tavern warmth can.

- **Exit / Ending 3 — The Bargain:** fires from Beat 4 natural close.
  - Triggers: `rescued` AND `bargained` AND NOT `stirred_something`. Includes Act-2 Exit γ.
  - Companion fates: variable; `vesna_left` likely if Vesna was recruited and the bargain was struck (she is across the room, not approaching, and the `vesna_passed_in_silence` farewell line fires). Apprentice present and *marked* — the HUD's "Marked" flag is on the player too if the bargain was on them; on the apprentice if it was on them; on both if both. Client pays partial, eyes averted.
  - Outro tone: **ambiguous, weighted, quiet-doomed.** Not a sad ending; not a happy one. Closing image: the marked apprentice walking out into the pre-dawn streets, the player watching from a tavern-chair with their drink going cold, the Portal's noise not quite reaching them. The deal's terms are not spelled out — implied, hanging. Earnest tone, not nihilistic; the player did *something* good and paid *something* for it.

- **Exit / Ending 4 — Lost in the Deep:** fires from Beat 4 natural close.
  - Triggers: NOT `rescued` AND NOT `stirred_something`. Includes Act-2 Exit δ; default for Act-2 Exit ζ unless Mirt's offer is taken.
  - Companion fates: any combination of `*_died` / both alive / both alive but quiet. On ζ, fewer deaths but a deeper shame — the apprentice's fate is *unknown*, not *witnessed*. Client receives the news plainly; pays grief-money on δ, news-money on ζ, or refuses on the worst Renown floors.
  - Outro tone: **sombre, grieving, unresolved.** No fanfare; no triumph; no monster at the back. Closing image: the player at the bar after closing, the well quiet, the apprentice's name said once by Durnan and once by the player, the dawn coming up grey through the high windows. The night did not give the player what they came for. Earnest, weighted, *not* despairing — the Portal is still the Portal; tomorrow is still a day.

- **Exit / Ending 5 — Sworn to the City:** fires from Beat 5 (Mirt's Offer accepted).
  - Triggers: `mirt_owes_favour` AND `mirt_offer_heard` AND player accepts at Beat 5 AND NOT `stirred_something`. Compatible with any of `rescued` / `bargained` / `not rescued`; compatible with companion deaths.
  - Companion fates: as carried; their farewells happened *before* the Mirt scene. Apprentice (if rescued) goes home with the family; the player does not.
  - Outro tone: **hopeful, beginning-not-ending.** A new chair at a new table, an envelope opened, the city's name said once like an oath. Closing image: dawn on the Trades Ward street outside, Mirt walking a half-step ahead of the player, the Portal's door already closed behind them. The adventure ends with a beginning — Waterdeep claims the player. Earnest, warm, *open* — the next story has just become possible.

- **Exit / Ending 6 — A Worse Door Opened:** fires from Beat 6 (Walk Out).
  - Triggers: `stirred_something`. **Overrides 1, 2, 3** per precedence; *also* overrides 5 (Mirt is not in the room). Compatible with `rescued` (apprentice is at the player's elbow at the door) or NOT `rescued` (apprentice is gone, lost in the wake of what was woken). Compatible with any companion-fate combination including both-died.
  - Companion fates: as carried; surviving companions' farewells were rushed at the door if they happened at all (`*_farewell_*` flags possibly unset). The room emptied around the player mid-settle; the books are not closed; the client may have fled (`client_fled_in_dread`).
  - Outro tone: **dark but earnest, dread-suffused, mid-stride.** Coin in the purse, dread at the back. Closing image: the Portal's door swinging shut behind the player, Waterdeep's streets gas-lit and empty in the pre-dawn, the well still *breathing* somewhere behind the closed door, the player walking — not running — toward whatever comes next. Not nihilistic; not a death. The night ends with a *door open* that wasn't open before. The protagonist survives, the city is changed, and the narrator's last line lands cold.

## Flags/Stats Changed

**Settle-up state (hidden):**
- `client_paid_in_full` / `client_paid_partial` / `client_paid_grief` / `client_paid_for_news` / `client_refused_pay` — exactly one set on Beat 2's client-handover (per outcome). Hidden.
- `client_fled_in_dread` — set on ε if Renown ≤ 0 on emergence. Hidden.
- `durnan_stood_a_drink` — set on Beat 2 Durnan exchange if Act-2 Exit α AND Renown ≥ 2. **Hinge for Ending 1.** Hidden.
- `mirt_offer_heard` — set on Beat 2 if Mirt approaches. Hidden; gates Beat 5.
- `left_without_settling` — set if the player picks the walk-away choice at Beat 2 without closing the books. Hidden; routes to Beat 6.
- `walked_out` — set on Beat 6 entry. Hidden.

**Companion farewell colour (hidden):**
- `korsa_farewell_warm` / `_grim` / `_uneasy` — exactly one if Korsa survived and is recruited.
- `vesna_farewell_blessed` / `_strained` / `vesna_passed_in_silence` — exactly one if Vesna was recruited; the *passed_in_silence* variant fires on `vesna_left`.
- `pip_farewell_paid` / `_refunded` / `_already_leaving` — exactly one if Pip survived and is recruited.
- `thessaly_farewell_warning` / `_complicit` / `_grim` — exactly one if Thessaly survived and is recruited.
- `companion_body_honoured` — set on first surviving farewell scene if `body_recovered` is set. Hidden, narrative colour.

**Outcome flags (carried, drive ending precedence — set in earlier acts, surfaced here):**
- `rescued`, `bargained`, `stirred_something` — read-only in Act 3.
- `stayed_in_city` — **set in Beat 5 if Mirt's offer accepted.** Hidden.

**Discoveries (carried, surfaced in prose):**
- `found_journal`, `journal_decoded`, `apprentice_alive_recently`, `met_the_thing_below`, `knows_the_truth` — read-only colour for the closing prose.

**Allies / standing (carried, surfaced in prose and in Mirt-gate):**
- `durnan_respects_you`, `mirt_owes_favour` — read-only; the Mirt gate consults the latter, the bar tab consults the former.

**Stats:**
- **Coin** — primary mover this act. Gains: client-pay range 0–10 gp depending on outcome; Mirt's envelope on Ending 5 (a fixed 5 gp + a stipend implied in prose, not a stat). Spends: clearing the tab if not `durnan_respects_you` (1–2 gp), buying a round if Renown ≥ 3 (1 gp Renown gain). Typical end range: 5–18 gp.
- **Vigor** — passively recovers a small amount (+1) at the bar across Beats 2–3 (rest, food, drink); Vesna's farewell prayer adds +1 if she's alive and recruited (`vesna_farewell_blessed` only). Typical end range: 1–7. No combat in Act 3 — Vigor is narrative colour for the closing scenes.
- **Wits** — unchanged.
- **Renown** — small final movements. Up: paying tab unprompted (+1), refusing Mirt's offer with a clean rescue (+1, "the city respects a free agent"), declining the client's full pay on δ ("keep it; I didn't earn it") +1. Down: stiffing the client on a successful rescue (Renown −2, locks Hero retroactively if not already locked), starting an argument at the bar (−1). Renown is *read* in Beat 4 to gate Ending 1 vs. 2; final value is the player's standing in Waterdeep going forward (matters for Ending 5's epilogue prose).
