# One Night in the Yawning Portal — Act 3 Scenes

Scene budget target: ~15. The act is **tight by design** — most differentiation lives in *prose* (heavy conditional layering driven by carried flags) and in which option the player picks at the Settle-Up hub. Six endings, each a single terminal scene, hinged on Act 2's exit configuration with precedence **6 > 3 > 5 > 1 > 2 > 4**.

The act has one true hub (`bar_settle_up`), four conversation/companion sub-spokes that all return to it, an optional Mirt branch, and a walk-out branch. Four flag-driven natural-close paths route to Endings 1/2/3/4 by precedence; Mirt's branch routes to Ending 5; `stirred_something` (set in Act 2) overrides everything else and routes to Ending 6 via the walk-out.

**Entry routing.** `act3_entry` (from Act 2's α/β/γ/δ/ε) and `act3_entry_retreat` (from Act 2's ζ) both feed into `act_3_open` after a brief outcome-keyed re-entry beat. ζ uses a distinct prose layer (the rope still coiled, the room not having noticed) but converges to the same hub — the settle-up structure is the same; the prose differs.

---

## Beat 1 — Re-entry

### Scene: `act_3_open`
Purpose: The orienting beat. Crests the rope into the Common Room (or, on ζ, *steps back* from the well-mouth into the Common Room without ever having gone deep). The room's reaction is outcome-keyed via prose conditionals — silence on α/β/γ/δ, *teeth*-quiet on ε, oblivious-noise on ζ. Companion absences and apprentice presence/state are established here in single weighted lines. No real choice — single forward exit. Sets `re_entered_portal`.

Conditional prose layers (Stage 5 will write all):
- α: room quiets in awe; apprentice alive and themselves at the player's side; both companions present.
- β: room quiets in respect; apprentice alive; one companion absent — the dead companion's keepsake-line fires (Vesna's prayer-coin missing from the rope, Korsa's axe-wedge left below, Pip's empty lockpicks, Thessaly's cooling sigil); if `body_recovered`, body laid down inside the door.
- γ: room quiets and *holds* the quiet; apprentice present but *marked* (a wrongness in the gaze); if `vesna_left`, she is across the room, not approaching.
- δ: room quiets in pity; apprentice absent; companion absences as β.
- ε: the quiet has *teeth* — patrons feel a wrongness; the well itself is *breathing*; apprentice present (if `rescued`) shivering, or absent; companion absences likely doubled; if `client_fled_in_dread` should fire, set it here based on Renown ≤ 0.
- ζ: room hasn't noticed; rope still coiled at the rim; apprentice absent; one companion possibly absent.

Choices:
- "Cross to the bar" → `bar_settle_up` | gating: none | effects: `flags: re_entered_portal`; conditionally `flags: client_fled_in_dread` if `stirred_something` AND `Renown <= 0`; `stats: Vigor +1` (small rest as the room steadies) | consumable: N

NPCs present: Durnan (behind the bar, watching); the Client (corner table, except on ε with `client_fled_in_dread`); Mirt (at his fire-table, except on ε); the apprentice (per outcome); surviving recruited companions.

---

## Beat 2 — Settle-Up at the Bar (Hub)

### Hub — `bar_settle_up`
Returns from: `act_3_open` (first entry), `client_handover` (after pay/reaction), `durnan_final` (after Durnan exchange), each surviving companion's farewell scene, `mirt_offer` (on decline).
Purpose: The act's only true hub. Loops through conversation slots until the player either (a) exhausts the available slots and picks "close the books" (→ `closing_books` natural-close fork), (b) crosses to Mirt (→ `mirt_offer`, gated), or (c) walks to the door without settling (→ `walk_out`).

Choices:

**Always-visible (until each is exhausted):**
- "Hand over the apprentice — or report what happened" → `client_handover` | gating: `flags_unset: [client_handed_over, client_fled_in_dread]` | hide_if_failed: Y when `client_fled_in_dread` (the table is empty in prose); grey out is unnecessary because the alternative is hidden | effects: handled in scene | consumable: Y (sets `client_handed_over`)
- "Speak with Durnan" → `durnan_final` | gating: `flags_unset: [durnan_final_done]` | effects: handled in scene | consumable: Y
- "Close the books — settle into the night" → `closing_books` | gating: `requires: { flags: [client_handed_over_or_fled] }` (engine: implement as a single computed flag set whenever `client_handed_over` OR `client_fled_in_dread` is set — Stage 5 may also accept either via flag alternatives) | grey out before client resolved ("[Settle the apprentice's fate first]") | effects: none here (the destination scene fires the ending) | consumable: N
- "Walk to the door without settling" → `walk_out` | gating: none | effects: `flags: left_without_settling` | consumable: N

**Conditional companion farewells** (each only appears if the companion was recruited AND is alive AND the player hasn't yet sat with them):
- "A word with Korsa" → `farewell_korsa` | gating: `requires: { flags: [recruited_korsa] }` AND `flags_unset: [korsa_died, korsa_farewell_done]` | hide_if_failed: Y (he isn't there if he died or wasn't recruited; the line "Korsa drinks Vesna's share too" handled inside the surviving partner's farewell) | effects: handled in scene | consumable: Y
- "A word with Vesna" → `farewell_vesna` | gating: `requires: { flags: [recruited_vesna] }` AND `flags_unset: [vesna_died, vesna_farewell_done]` | hide_if_failed: Y | effects: handled in scene | consumable: Y (handles `vesna_left` variant inside)
- "A word with Pip" → `farewell_pip` | gating: `requires: { flags: [recruited_pip] }` AND `flags_unset: [pip_died, pip_farewell_done]` | hide_if_failed: Y | effects: handled in scene | consumable: Y
- "A word with Thessaly" → `farewell_thessaly` | gating: `requires: { flags: [recruited_thessaly] }` AND `flags_unset: [thessaly_died, thessaly_farewell_done]` | hide_if_failed: Y | effects: handled in scene | consumable: Y

**Mirt cross-over (gated):**
- "Cross to Mirt's table — he's lifted his tankard at you" → `mirt_offer` | gating: `requires: { flags: [mirt_offer_open, mirt_offer_heard_act3] }` AND `flags_unset: [mirt_offer_resolved, stirred_something]` | hide_if_failed: Y when `stirred_something` (Mirt is not in the room) OR when his offer wasn't surfaced this act yet | effects: none | consumable: N (the offer scene handles consumability)

  Note: `mirt_offer_heard_act3` is set on first hub entry inside `act_3_open` if `mirt_offer_open` AND `mirt_owes_favour` AND Renown ≥ 1 AND NOT `stirred_something`. (Stage 5: implement as either a one-time effect inside `act_3_open` or as a derived check on the hub. Either is fine; the design intent is that Mirt only *visibly* approaches when he would actually approach.)

**Optional small renown moves (always available until used, low-stakes flavour):**
- "Pay the night's tab unprompted" → `pay_tab_unprompted` | gating: `requires: { stats: { Coin: 2 } }` AND `flags_unset: [paid_tab_unprompted, durnan_respects_you]` | grey out below 2 Coin ("[2 Coin required]"); hide if `durnan_respects_you` already (he waves it off in prose) | effects: handled in scene | consumable: Y
- "Stand a round for the regulars" → `stand_a_round` | gating: `requires: { stats: { Coin: 1, Renown: 3 } }` AND `flags_unset: [stood_a_round]` | grey out below stats | effects: handled in scene | consumable: Y

NPCs present: Durnan (always); the Client (until `client_handed_over` or `client_fled_in_dread`); Mirt (unless `stirred_something`); surviving recruited companions; the apprentice (per outcome — at the bar with the Client, or in the Client's lap, or absent).

---

## Beat 2 — sub-scenes

### Scene: `client_handover` (Conversation — single one-shot)
Purpose: The act's most outcome-sensitive line; the coin is its consequence. Heavy conditional prose driven by α/β/γ/δ/ε/ζ. The Client's face does the work.
Choices:
- "Take what they offer — go back to the bar" → `bar_settle_up` | gating: none | effects: exactly one of the following set per outcome (Stage 5: implement as conditional effect block):
  - α / β with `rescued` AND no `*_died`: `flags: client_handed_over, client_paid_in_full`; `stats: Coin +10`
  - β with `rescued` AND any `*_died`: `flags: client_handed_over, client_paid_in_full`; `stats: Coin +10`
  - γ (`rescued` AND `bargained`, NOT `stirred_something`): `flags: client_handed_over, client_paid_partial`; `stats: Coin +6`
  - δ (NOT `rescued`, NOT `stirred_something`, `met_the_thing_below`): `flags: client_handed_over, client_paid_grief`; `stats: Coin +6`
  - ε with `rescued`: `flags: client_handed_over, client_paid_partial`; `stats: Coin +6` (note: if `client_fled_in_dread` was set in `act_3_open`, this scene is unreachable — handled by hide on hub)
  - ε without `rescued` (NOT `client_fled_in_dread`): `flags: client_handed_over, client_refused_pay`; `stats: Coin +0, Renown -1`
  - ζ (NOT `rescued`, NOT `met_the_thing_below`): `flags: client_handed_over, client_paid_for_news`; `stats: Coin +3`
  - Renown ≤ −2 floor on δ/ζ: `flags: client_handed_over, client_refused_pay`; `stats: Coin +0`
  | consumable: Y (the hub option vanishes on `client_handed_over`)

Optional in-scene secondary choice (one-time, only on δ if `client_paid_grief` would fire):
- "Refuse the purse — keep it; I didn't earn it" → `bar_settle_up` | gating: `requires: { flags: [met_the_thing_below] }`, applies only on δ branch | effects: `flags: client_handed_over, client_refused_grief`; `stats: Coin +0, Renown +1` | consumable: Y (replaces the default δ effect)

NPCs present: the Client (and the apprentice if present per outcome); Durnan in earshot.

### Scene: `durnan_final` (Conversation — single one-shot)
Purpose: A short topic-depleting exchange. Three lines, drawn from the carried flag set. Outcome-keyed.
Conditional prose layers:
- α with Renown ≥ 2: Durnan stands a drink unprompted. **Sets `durnan_stood_a_drink`** — the Hero hinge.
- β: he pours something quiet and good; names the dead companion once if a `*_died` is set.
- γ: his eyes flick to the apprentice's mark; "we'll keep an eye on them."
- δ: he says the apprentice's name, just once.
- ε: he is looking at the well. "Bar a man up at the rim tonight."
- ζ: he does not look up. "Another time, then."
Choices:
- "Back to the bar" → `bar_settle_up` | gating: none | effects: `flags: durnan_final_done`; conditionally `flags: durnan_stood_a_drink` (per the α + Renown ≥ 2 + exit-α rule); conditionally `stats: Coin -1` if `flags: durnan_respects_you` is unset and tab is being squared in this scene's prose (Stage 5: optional, only fires if the player hasn't already paid the tab — small bookkeeping line) | consumable: Y

NPCs present: Durnan.

### Scene: `farewell_korsa` (Hub-let leaf)
Purpose: One short exit beat for Korsa. Outcome-keyed.
Conditional prose layers:
- α / β-with-partner-alive: jokes; tankard up; offers a hand to the next fight. Sets `korsa_farewell_warm`.
- β-with-partner-died: mourns plainly; drinks his partner's share. Sets `korsa_farewell_grim`.
- γ: goes quiet — "That… mark. You sure?" Sets `korsa_farewell_uneasy`.
- δ: takes the player by the shoulder; one line about the dead. Sets `korsa_farewell_grim`.
- ε: will not look at the well. Departs early. Sets `korsa_farewell_uneasy`.
- If `body_recovered` AND no surviving farewell scene has yet fired: brief beat — Durnan covers the body with a clean cloth. Sets `companion_body_honoured`.
Choices:
- "Back to the bar" → `bar_settle_up` | gating: none | effects: `flags: korsa_farewell_done`; one of `korsa_farewell_warm` / `_grim` / `_uneasy` per layer; conditionally `companion_body_honoured` | consumable: Y

NPCs present: Korsa.

### Scene: `farewell_vesna` (Hub-let leaf)
Purpose: One short exit beat for Vesna. Outcome-keyed; handles `vesna_left` (γ likely) as a *passing-glance* variant (she does not approach; the scene fires from across the room).
Conditional prose layers:
- α / β-with-partner-alive: prays a Tymora benediction over the night. Sets `vesna_farewell_blessed`. Also `stats: Vigor +1`.
- β-with-partner-died: names every dead companion in the prayer. Sets `vesna_farewell_blessed`.
- γ: she does not look at the apprentice; her benediction omits them. Sets `vesna_farewell_strained`.
- γ with `vesna_left`: she is across the room, *not approaching*; a passing-glance beat — the player and Vesna meet eyes once, and she turns away. Sets `vesna_passed_in_silence`.
- δ: names every dead companion in the prayer. Sets `vesna_farewell_blessed`.
- ε: she presses her holy coin into the player's palm — *put a wall between yourself and the well tonight*. Sets `vesna_farewell_strained`.
- If `body_recovered` AND first farewell to fire: as Korsa above.
Choices:
- "Back to the bar" → `bar_settle_up` | gating: none | effects: `flags: vesna_farewell_done`; one of `vesna_farewell_blessed` / `_strained` / `vesna_passed_in_silence`; conditionally `stats: Vigor +1` (blessed branch only); conditionally `companion_body_honoured` | consumable: Y

NPCs present: Vesna (close on most layers; across-the-room on `vesna_left`).

### Scene: `farewell_pip` (Hub-let leaf)
Purpose: One short exit beat for Pip. Outcome-keyed; she will be gone by morning regardless.
Conditional prose layers:
- α / β-with-partner-alive: counts her cut at the corner table; flicks a copper as a tip "for the entertainment". Sets `pip_farewell_paid`.
- β-with-partner-died: counts her cut; says nothing. Sets `pip_farewell_paid`.
- γ: eyes the apprentice; reckons the price isn't hers to argue. Sets `pip_farewell_paid`.
- δ: slides her cut back across the table — *keep it*. Sets `pip_farewell_refunded`. `stats: Coin +2` (her returned share).
- ε: already at the door. Sets `pip_farewell_already_leaving`.
- If `pip_angry` from Act 1 (caltrops): one bitter line layered over whatever else fires.
- If `body_recovered` AND first farewell to fire: as Korsa above.
Choices:
- "Back to the bar" → `bar_settle_up` | gating: none | effects: `flags: pip_farewell_done`; one of `pip_farewell_paid` / `_refunded` / `_already_leaving`; conditionally `stats: Coin +2` (refunded branch); conditionally `companion_body_honoured` | consumable: Y

NPCs present: Pip.

### Scene: `farewell_thessaly` (Hub-let leaf)
Purpose: One short exit beat for Thessaly. She sits longest. The brief's "her quiet reasons" surfaces here, partially.
Conditional prose layers (every layer includes a private line about *recognising* the runes / the *thing* / the apprentice's mark; if `knows_thessaly_motive` from Act 1 is set, the line is fuller):
- α: warns it isn't over even on a clean win — *things like that remember*. Sets `thessaly_farewell_warning`.
- β: warning, plus a quiet acknowledgement of the dead. Sets `thessaly_farewell_warning`.
- γ: looks at the marked apprentice with something like hunger; the player gets a one-line read — *fellowship, or appetite, hard to tell*. Sets `thessaly_farewell_complicit`.
- δ: warning, weighted heavier; she names the *thing* properly for the first time. Sets `thessaly_farewell_grim`.
- ε: she alone is *not* surprised. Sets `thessaly_farewell_complicit`.
- If `body_recovered` AND first farewell to fire: as Korsa above.
Choices:
- "Back to the bar" → `bar_settle_up` | gating: none | effects: `flags: thessaly_farewell_done`; one of `thessaly_farewell_warning` / `_complicit` / `_grim`; conditionally `companion_body_honoured` | consumable: Y

NPCs present: Thessaly.

### Scene: `pay_tab_unprompted` (Side beat, optional Renown move)
Purpose: One-shot. Costs 2 Coin, +1 Renown, sets `durnan_respects_you` if not already set.
Choices:
- "Drop the coin on the bar" → `bar_settle_up` | gating: handled at hub | effects: `flags: paid_tab_unprompted, durnan_respects_you`; `stats: Coin -2, Renown +1` | consumable: Y

NPCs present: Durnan.

### Scene: `stand_a_round` (Side beat, optional Renown move)
Purpose: One-shot. Costs 1 Coin, +1 Renown. Available only if Renown is already high (3+) — earlier than that, the room wouldn't take the gesture as offered.
Choices:
- "Wave Durnan over and stand a round" → `bar_settle_up` | gating: handled at hub | effects: `flags: stood_a_round`; `stats: Coin -1, Renown +1` | consumable: Y

NPCs present: Durnan; the regulars.

---

## Beat 3 — Mirt's Offer (gated branch)

### Scene: `mirt_offer`
Purpose: Mirt slides a chair out, a fresh tankard, an envelope. The offer is plain — a place in his network, paid work, a room above a Trades Ward shopfront, the night ending as a beginning. Conditional prose: the Client's reaction (if still present) sees this and reads it; surviving companions exchange one weighted glance. **Blocked by `stirred_something` at the hub gate** — Mirt isn't in the room on ε.
Choices:
- "Accept — take Mirt's hand" → `ending_5_sworn` | gating: none | effects: `flags: mirt_offer_resolved, stayed_in_city`; `stats: Coin +5` (envelope) | consumable: Y → Ending 5
- "Decline — politely, with thanks" → `bar_settle_up` | gating: none | effects: `flags: mirt_offer_resolved, mirt_offer_declined`; conditionally `stats: Renown +1` if `rescued` AND NOT `bargained` (the city respects a free agent) | consumable: Y
- "Decline — bluntly; you have business elsewhere" → `bar_settle_up` | (convergent with above — same `next`, same flag, but no Renown gain; framed as the player closing the door on Waterdeep tonight) | gating: none | effects: `flags: mirt_offer_resolved, mirt_offer_declined` | consumable: Y
- "Hear him out a moment longer — what's the room above the shopfront like?" → `bar_settle_up` | (convergent with the polite decline — same `next`, framed as a soft no, the player letting Mirt feel listened-to before stepping back) | gating: `flags_unset: [mirt_offer_softened]` | effects: `flags: mirt_offer_resolved, mirt_offer_declined, mirt_offer_softened`; `stats: Renown +1` | consumable: Y

NPCs present: Mirt; one or two of his hangers-on (background); the surviving recruited companions watch from the bar.

---

## Beat 4 — Closing the Books (Natural-close fork)

### Scene: `closing_books`
Purpose: A short threshold scene at the bar — the room's noise filtering back in, the well still at the room's centre, dawn an hour away. The fork lands the ending by precedence, evaluated against the carried flag set. **No player choice** here — a single forward exit whose `next` is a weighted/conditional route. The conditional logic is the act's central engine.

Conditional `next` logic (Stage 5: implement as a single-choice scene whose `next` is a conditional/weighted block, OR as a tiny chain of scene-with-one-button gates that route by flag — the former is cleaner, the latter is engine-portable. **Recommendation: implement as a sequence of guarded `next` checks, evaluated top-to-bottom by precedence; the engine takes the first match.**):

1. If `stirred_something` → `walk_out` (forced — the room empties around the player mid-conversation; the books cannot be closed). **Highest precedence — Ending 6.**
2. Else if `bargained` AND `rescued` → `ending_3_bargain`. **Ending 3.**
3. *(Ending 5 — Sworn to the City — does not fire from `closing_books`; it fires from `mirt_offer` accept. By the time the player reaches this scene, Mirt's offer has been declined or never appeared.)*
4. Else if `rescued` AND no `*_died` flags AND `durnan_stood_a_drink` → `ending_1_hero`. **Ending 1.** (`durnan_stood_a_drink` itself requires α + Renown ≥ 2 set in Beat 2.)
5. Else if `rescued` → `ending_2_quiet_good`. **Ending 2.** (Catches all other `rescued` paths — companion deaths, lower Renown, β with no Hero hinge.)
6. Else (NOT `rescued`, NOT `stirred_something`) → `ending_4_lost`. **Ending 4.** (Floor — δ and ζ default here unless Mirt was taken.)

Choices:
- "Sit. The night is over." → conditional next per above | gating: none | effects: none (the destination scene fires the ending) | consumable: N

NPCs present: Durnan; surviving recruited companions; the apprentice (per outcome). The Client has left or is finishing their drink.

---

## Beat 5 — Walk Out (the door — `stirred_something` or `left_without_settling`)

### Scene: `walk_out`
Purpose: The player crosses the common room to the door without finishing the books. Either driven by the *wrongness* on ε (the room's air gone tight, patrons rising one by one to leave, a low *sound* from the well even Durnan is now staring at), or by their own choice on `left_without_settling`. A short cold scene: the Portal's door, the night air, Waterdeep's pre-dawn streets. Coin in the purse (whatever was paid), apprentice at the elbow or absent, the *thing* at the back. Companion farewells either compressed into a single passing line at the door (if rushed) or already done at the bar. On ε, the well is described one more time — *breathing*. Single forward exit. Sets `walked_out`.

Conditional prose layers:
- ε with `rescued`: apprentice silent at the elbow, the air *wrong* behind.
- ε without `rescued`: alone in the door-frame, the sound from the well still rising.
- `left_without_settling` AND NOT `stirred_something`: a quieter walk-out — the player has chosen this; no dread, just refusal. (Routes via the same scene to Ending 6 — the design intent here is that *walking away from the books* is itself a choice the engine treats as the loudest signal once nothing else loud is set. **Note:** if the player triggered `left_without_settling` without `stirred_something`, the ending prose is the *cold* variant of Ending 6 rather than the *dread* variant. Stage 5: layer this in `ending_6_worse_door`.)

Choices:
- "Out into the street." → `ending_6_worse_door` | gating: none | effects: `flags: walked_out` | consumable: Y → Ending 6

NPCs present: passing patrons (background); the apprentice if `rescued` on ε; *no* Durnan word at the back (he doesn't call out — that's the point).

---

## Beat 6 — Endings (six terminal scenes)

Each ending is a single scene with `choices: []` (terminal). All carry the cumulative flag set in prose. Stage 5 will write each as a tight outro with one or two visible flag-driven prose layers — companion fate, apprentice fate, the carried discoveries (`found_journal`, `journal_decoded`, `apprentice_alive_recently`).

### Scene: `ending_1_hero`
Purpose: **Ending 1 — The Hero of the Portal.** Triumphant, warm, earned. Durnan's drink is the keystone line. Closing image: dawn light through the Portal's high windows, the well quiet, the player's chair pulled in among the regulars at last. Earnest high-fantasy victory; no irony.
Reached from: `closing_books` natural-close, when α + Renown ≥ 2 + `durnan_stood_a_drink` + `rescued` + no `*_died` + NOT `bargained` + NOT `stirred_something`.
Choices: `[]` (terminal).
NPCs present: Durnan; surviving companions; the apprentice; the Client (returned to thank); the regulars.

### Scene: `ending_2_quiet_good`
Purpose: **Ending 2 — A Quiet Good.** Bittersweet-warm. The right thing the messy way. Modest coin, modest fanfare. Closing image: a quiet drink, a dead friend named once, the apprentice's family thanking the player at the door without quite meeting their eyes. If `companion_body_honoured`, the body lies behind the bar under Durnan's cloth — final colour line.
Reached from: `closing_books` natural-close, when `rescued` AND NOT `bargained` AND NOT `stirred_something` AND (`*_died` set OR Renown < 2 OR NOT `durnan_stood_a_drink`).
Choices: `[]` (terminal).
NPCs present: Durnan; surviving companions; the apprentice; the Client; possibly a covered body.

### Scene: `ending_3_bargain`
Purpose: **Ending 3 — The Bargain.** Ambiguous, weighted, quiet-doomed. Not sad, not happy. Closing image: the marked apprentice walking out into the pre-dawn streets, the player watching from a tavern-chair with their drink going cold, the Portal's noise not quite reaching them. The deal's terms are not spelled out — implied, hanging. If `vesna_passed_in_silence`, her absence at the door is a final colour line. The HUD's "Marked" tag rests on the apprentice (and on the player if the bargain was on them).
Reached from: `closing_books` natural-close, when `rescued` AND `bargained` AND NOT `stirred_something`.
Choices: `[]` (terminal).
NPCs present: the marked apprentice (briefly); the surviving companions (already farewelled); Durnan watching.

### Scene: `ending_4_lost`
Purpose: **Ending 4 — Lost in the Deep.** Sombre, grieving, unresolved. No fanfare; no triumph; no monster at the back. Closing image: the player at the bar after closing, the well quiet, the apprentice's name said once by Durnan and once by the player, the dawn coming up grey through the high windows. The night did not give the player what they came for. Earnest, weighted, *not* despairing — the Portal is still the Portal; tomorrow is still a day. On ζ, the *not-witnessed* layer is added — the apprentice's fate is unknown, not seen.
Reached from: `closing_books` natural-close, when NOT `rescued` AND NOT `stirred_something`. Default for δ; default for ζ unless Mirt's offer was taken.
Choices: `[]` (terminal).
NPCs present: Durnan; surviving companions; the Client (if not fled).

### Scene: `ending_5_sworn`
Purpose: **Ending 5 — Sworn to the City.** Hopeful, beginning-not-ending. A new chair at a new table, an envelope opened, the city's name said once like an oath. Closing image: dawn on the Trades Ward street outside, Mirt walking a half-step ahead of the player, the Portal's door already closed behind them. The next story has just become possible. Compatible with any `rescued` / `bargained` / `not rescued` carry; companion farewells already happened. If `rescued`, the apprentice goes home with the family; the player does not.
Reached from: `mirt_offer` accept. **Cannot fire if `stirred_something`** (Mirt isn't in the room).
Choices: `[]` (terminal).
NPCs present: Mirt; the surviving companions (in the doorway behind, watching); Durnan (a nod across the room).

### Scene: `ending_6_worse_door`
Purpose: **Ending 6 — A Worse Door Opened.** Dark but earnest, dread-suffused, mid-stride. Coin in the purse, dread at the back. Closing image: the Portal's door swinging shut behind the player, Waterdeep's streets gas-lit and empty in the pre-dawn, the well still *breathing* somewhere behind the closed door, the player walking — not running — toward whatever comes next. The protagonist survives, the city is changed, the narrator's last line lands cold.
Two prose variants (Stage 5):
- **Dread variant** — `stirred_something` is set. The walk-out was forced.
- **Cold variant** — `left_without_settling` set, `stirred_something` *not* set. The walk-out was a choice. The door closes quieter, but the books are not closed and the player has chosen to leave them that way. Same ending tag — different last line.
Reached from: `walk_out`. Overrides Endings 1, 2, 3, 5 per precedence (5 by virtue of Mirt's absence on ε; 1/2/3 by the `closing_books` precedence rule routing to `walk_out` first when `stirred_something` is set).
Choices: `[]` (terminal).
NPCs present: the apprentice (if `rescued` AND `stirred_something`); otherwise none — the door, the street, the dawn.

---

## NPCs in this act

- **Durnan the Wanderer** — present throughout. First appears (this act) in `act_3_open` (behind the bar, watching the rope). Central in `bar_settle_up`, `durnan_final`, `pay_tab_unprompted`, `stand_a_round`. Background in every farewell scene and in `closing_books`. Final outro lines in Endings 1/2/4 directly; nodding in Ending 5; absent (looking elsewhere) at the door in Ending 6's dread variant.
- **The Client** (named in Stage 4) — at their corner table on entry, except on ε with `client_fled_in_dread`. Central in `client_handover`. May return briefly in Endings 1/2 (thanks at the door); absent from Endings 3/4/5/6 except as a remembered presence.
- **Mirt the Moneylender** — at his fire-table on entry, except on ε. Approaches via the hub on `mirt_offer_heard_act3`. Central in `mirt_offer` and `ending_5_sworn`. Absent from all other endings.
- **The missing apprentice** (Stage 4: name, age, trade) — present in `act_3_open` per outcome (alive on α/β/γ/ε-with-rescued, *marked* on γ, absent on δ/ε-without-rescued/ζ). Central in `client_handover` (silent presence) and Endings 1/2/3. Absent or background-only in Endings 4/5/6.
- **Korsa Ironbrow** — present if `recruited_korsa` AND NOT `korsa_died`. Central in `farewell_korsa`. Background in `bar_settle_up` and Endings 1/2/3/5. Absent (referenced only) from Ending 6.
- **Sister Vesna** — present if `recruited_vesna` AND NOT `vesna_died`. Central in `farewell_vesna`. The `vesna_left` variant has her *across the room, not approaching*. Background in `bar_settle_up`. Her benediction grants `Vigor +1` on `farewell_blessed`.
- **Pip Tallowmuch** — present if `recruited_pip` AND NOT `pip_died`. Central in `farewell_pip`. Will be gone by morning regardless. Background in `bar_settle_up`.
- **Thessaly Vex** — present if `recruited_thessaly` AND NOT `thessaly_died`. Central in `farewell_thessaly`. Sits longest. Quiet motive line surfaces if `knows_thessaly_motive` (Act 1 Wits gate).
- **The regulars** (unnamed background) — react throughout `act_3_open`, `bar_settle_up`, the endings. Stage 4: keep unnamed; archetypes only ("the off-duty Watch sergeant", "the table by the fire", "the dicing pair").
- **Mirt's hangers-on** (unnamed) — `mirt_offer` only. Background.
- **The body** (if `body_recovered`) — laid down inside the door of `act_3_open`; covered with a clean cloth by Durnan in the first surviving farewell scene to fire (`companion_body_honoured`). Final colour line in Ending 2 if applicable. Stage 4: no new NPC — the body is a prose object referenced by the dead companion's name.

**No new named NPCs in Act 3.** Every named figure carries from Acts 1–2. (The Client is named in Stage 4 with all other deferrals; the apprentice likewise.)

---

## Notes for Stage 4 (cast) and Stage 5 (scene writing)

- **Conditional prose density.** Act 3 is *short on scenes, heavy on conditionals*. Most of the act's differentiation lives inside `act_3_open`, `client_handover`, `durnan_final`, the four farewells, and the six endings. Stage 5 should plan generously for `if`/`else` blocks per scene — six exit configurations × farewell variants × Renown thresholds compound quickly. The ~15-scene budget is achievable only if conditionals do this work.
- **`durnan_stood_a_drink` is the Hero hinge.** Set inside `durnan_final`'s effects, conditional on Act-2 Exit α AND Renown ≥ 2 entering Act 3. Stage 5: implement as an `if` on the effects block. Without it, Ending 1 cannot fire even on a clean rescue — Ending 2 catches all other α paths.
- **`closing_books` routing.** The conditional-`next` precedence is the single most load-bearing piece of engine logic in the act. Recommend implementing as a sequence of one-choice gate scenes (`closing_books_check_stir` → `closing_books_check_bargain` → `closing_books_check_hero` → `closing_books_check_quiet` → `ending_4_lost`), each with one auto-forward choice gated by the relevant flag, falling through to the next on failure. **This adds 4 small routing scenes** above the ~15 budget — call it ~19 total. Acceptable: each routing scene is 1–2 lines of code and zero prose. *Alternative:* a single `closing_books` scene with a conditional `next` block, if the engine supports it. Stage 5 picks; the design here is engine-agnostic.
- **`mirt_offer_heard_act3` flag.** Set during `act_3_open` if the Mirt-conditions hold. Stage 5: implement as a conditional effect inside `act_3_open`. If the engine doesn't support conditional effect flags inside scene effects, fall back to gating Mirt's hub option directly on `(mirt_offer_open AND mirt_owes_favour AND Renown ≥ 1 AND NOT stirred_something)` — equivalent.
- **`client_handover` effect cascade.** The eight-branch effect block inside this scene is the act's most complex. Stage 5 should implement as conditional effect groups (one per outcome configuration), evaluated top-to-bottom — first match wins. Document the precedence inside the YAML comments.
- **No combat in Act 3.** Vigor is narrative colour; the only Vigor moves are `+1` on `act_3_open` (rest as the room steadies) and `+1` on `farewell_vesna` blessed branch. Stage 5: prose should reflect Vigor in the closing scenes — high Vigor reads as a player who walked out under their own power, low Vigor reads as someone propped against the bar.
- **Apprentice as prose, not NPC.** The apprentice has no choices, no dialogue branching of their own in Act 3. Their presence (silent, marked, absent) is a prose layer driven by `rescued` / `bargained` / `stirred_something`. Stage 5: write the apprentice as a *thing the room reacts to*, not as a speaking character.
- **The body.** If `body_recovered` is true and the player never picks any farewell scene (e.g. they walk straight out via `stirred_something`), `companion_body_honoured` does not fire — and that's correct. The body is left uncovered behind the bar; Durnan covers it after the player has gone. Stage 5: this can surface as a single line in Ending 6's dread variant if a `*_died` flag AND `body_recovered` are both set ("behind you, Durnan reached for a cloth").
- **Counted scenes:** 16 named scenes (entry, hub, 4 farewells, 2 hub side beats, client handover, Durnan final, Mirt offer, closing books, walk out, 6 endings). Plus optional 4 routing-scene split of `closing_books` if the engine prefers (→ ~19). **On budget** at the structure's ~15 — within tolerance. No trims required.
- **Replayability hits in this act:** the six endings are the primary differentiation, but the *path through* the hub also varies — a player who took Mirt vs declined him, who paid the tab vs didn't, who farewelled in different orders, who got the `companion_body_honoured` flag fired in a different farewell, will see meaningfully different prose configurations. Stage 5: lean into farewell-order conditionals (e.g. "Vesna prays first — Korsa drinks during it" vs "Korsa speaks first — Vesna prays after, naming him in turn"). Small touches; high replay value.
