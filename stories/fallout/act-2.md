# Vault 34 — Act 2: The Surface

## Entry

Arrives from: Act 1 door-opening (Exit States 1–5). The Loyalist exit (State 0) does **not** transition here.

Player state on entry varies by exit state. The opening beat must read the entry-state flag set and route accordingly.

| Exit | Companions | Required flags | Carry-over to watch |
|------|------------|-----------------|---------------------|
| 1 — Solo Ghost (clean) | none | `has_master_key`, NOT `exposed_truth`, NOT companion flags | `cole_alerted` maybe, `killed_cole` maybe, `blackmailed_cole` maybe, `radiation_sick` maybe |
| 2 — Solo Abandoner | none | `has_master_key`, `exposed_truth`, `abandoned_survivors` | residents know they were betrayed; loyalist remnant possible |
| 3 — With Doc Reyes | Doc Reyes | `trusted_by_doc_reyes`, `has_master_key` | `radiation_sick` likely cleared via `reyes_treated_you` |
| 4 — With Yuna | Yuna | `yuna_joins`, `reactor_stabilised` | tech edge; pacing flag enables one extra Diner prep beat |
| 5 — Mass Evacuation | ~12 residents (+ Doc/Yuna possibly) | `exposed_truth`, `led_evacuation`, `resistance_member` | `killed_cole` maybe; door forced via maintenance shaft |

**Carry-over notes (re-stated from Act 1 author notes):**
- `terminal_evidence` does **NOT** carry — consumed in Act 1.
- `radiation_sick` carries unless `reyes_treated_you` was set. It greys/locks one or two long-march choices and is the death gate on the dust-storm random encounter.
- `blackmailed_cole` (without `killed_cole`) means Cole is alive and angry. Triggers the loyalist-remnant pursuit thread (Beat 7B).
- `reactor_stabilised` is purely a pacing flag — it unlocks one extra Diner prep scene before Fork F.
- `vault_suit_upgraded` continues to act as soft +1 STR in physical checks.
- `surface_cache_found` was foreshadowed in Act 1 lore but is *set* in Act 2 (Beat 3 scavenging table). It is not a carry-over flag.
- `sold_medical_data` requires Doc Reyes to be alive and present (Exit 3) OR the player to have her notebook (set at Exit 5 if Doc joins the evacuation). Otherwise the choice is **hidden** — the player has nothing to sell.

Visible HUD on entry: stats, plus any of `found_report` (now flavour, not gating), `has_master_key` (now flavour), `radiation_sick`, `vault_suit_upgraded`. New visible flags will be introduced through Act 2 (`surface_cache_found`, `salvager_contact`, `raider_pact`, `followers_allied`, `message_delivered`).

## Scenes (target ~35)

### Beat 1 — The Threshold (entry-branch opening)

Scenes: `surface_threshold` (router), `open_alone_clean`, `open_alone_haunted`, `open_with_doc`, `open_with_yuna`, `open_with_mob`, `surface_first_breath`.

What happens: Five short opening vignettes, each tonally distinct, all converging on the same next scene (`surface_first_breath`) where unfiltered air, distant ruins of Bakersfield, and the dead-reactor sun are described. The vignettes set tone; they do not gate.

`surface_threshold` is a routing scene — no text shown, immediately forwards based on entry flags:
- Exit 1 → `open_alone_clean` (the door clangs; nobody behind you; the wasteland is silent)
- Exit 2 → `open_alone_haunted` (someone shouts your name from the corridor as the door seals)
- Exit 3 → `open_with_doc` (Doc kneels, coughs, says "we need to find water")
- Exit 4 → `open_with_yuna` (Yuna looks at the sky and laughs — first time the player has heard her laugh)
- Exit 5 → `open_with_mob` (the resistance pours out blinking; one resident immediately tries to go back; you have to talk them down)

If `radiation_sick` AND not `reyes_treated_you`: an additional throat-line in `surface_first_breath` describes nausea. Cosmetic now; gates a check later.

Choice point: `surface_first_breath` ends with a single forward choice — "Walk toward the ruins" → `road_to_diner`.

Gating: none — this is the establishing beat. All branching here is on entry-state, not player choice.

Random: none.

### Beat 2 — The Road to the Diner (first wasteland travel)

Scenes: `road_to_diner` (weighted random hub), `road_uneventful`, `road_dust_storm`, `road_skeleton`, `road_corpse_pile`, `road_cole_voice`, `diner_arrival`.

What happens: First proper wasteland travel. The road from the vault entrance to the Diner is half a day's walk. Weighted random encounters establish the wasteland register. All paths converge on `diner_arrival`.

`road_to_diner` presents a single choice — "Press on toward the smoke on the horizon" — whose `next` is a weighted table:

- `road_uneventful` (weight 4) — heat, blisters, nothing happens. Doc/Yuna/group flavour if companions.
- `road_dust_storm` (weight 2) — choice to push through (PER 5 grey-out) or shelter behind a wreck. Push-through-fail with `radiation_sick` is **permadeath** (lungs give out; companions watch). Push-through-succeed sets `pushed_storm` (small Diner-arrival flavour). Shelter is safe but adds the "you arrive at night" variant of `diner_arrival`.
- `road_skeleton` (weight 2) — a vault-suited skeleton beside a long-cold campfire. Sets `saw_predecessor` (silent flag — surfaces in one Hatch dialogue line).
- `road_corpse_pile` (weight 1) — raider sign. PER 5 grey-out: success sets `read_raider_sign` (reduces difficulty of Beat 3 raider encounter). Failure sets nothing.
- `road_cole_voice` (weight 1, **only available if `blackmailed_cole` AND NOT `killed_cole`**) — the player thinks they hear Cole's voice on a salvaged radio in the distance. Hidden if flag conditions not met. Sets `loyalists_close` (escalates Beat 7B).

Choice point: only the dust-storm scene contains a real branching choice; the others are flavour-with-flag-residue.

Gating:
- Dust storm push-through: PER 5 grey-out for the success check, *but the death consequence is NOT shown in advance* — the description names the risk in fiction ("you'll choke if your lungs are weak") rather than mechanically.
- `road_cole_voice`: **hidden** entry to the table when conditions unmet (existence is a spoiler — the player shouldn't know Cole is alive unless the relevant Act 1 outcome happened).

Random: this is the act's primary random table. Five outcomes, weights 4/2/2/1/1 (or 4/2/2/1 if Cole route hidden). Re-entry is possible — see Beat 5 (Hatch errand returns the player to a similar table).

Consumable: none here. The road can be traversed multiple times in principle (Beat 5 message run), but the *first crossing* sets specific intro flags.

### Beat 3 — The Diner (hub, first arrival)

Scenes: `diner_arrival`, `diner_hub`, `diner_first_search`, `diner_back_room`, `diner_roof`, `diner_basement_locked`.

What happens: A half-collapsed roadside diner — vinyl booths split by sun, a bar with the mirror still hanging. Becomes the player's surface base. Scales visibly by party:

- Solo (Exits 1, 2): one set of footsteps, the silence is loud, you pick a booth like it matters.
- Pair (Exits 3, 4): two people figure out which booth is least full of glass; companion picks first watch.
- Group (Exit 5): residents fan out, one immediately starts crying, two start arguing about food rationing. The diner already feels small.

`diner_arrival` describes the building, then routes to `diner_hub`.

#### Diner first-pass choices (Beat 3)

`diner_hub` opens with these initial options:

- "Search the dining room" → `diner_first_search`. Always available, **consumable** (`searched_dining: true`). Yields a half-pack of irradiated jerky (flavour) and a PER 5 grey-out for the bullet-hole pattern (sets `read_diner_history` — the diner has been used as a fort before; foreshadows Fork F).
- "Check the back room / kitchen" → `diner_back_room`. Always available, **consumable** (`searched_back: true`). STR 5 grey-out to wrench open the freezer — success yields a tin of pre-war coffee (a single-use stim flavour item; sets `has_coffee` for one optional Hatch flavour line). Failure: cuts hand, no item.
- "Climb to the roof" → `diner_roof`. Always available, **consumable** (`searched_roof: true`). Establishes sightlines: smoke from the east (raider camp), a watch fire to the south (Salvager outpost), the vault entrance behind. PER 5 grey-out reveals a third sign: tracks heading north (sets `surface_cache_visible`, VISIBLE: "Surface Cache Sighted" — gates the cache run in Beat 4).
- "Try the basement door" → `diner_basement_locked`. Always available. STR 7 grey-out (or STR 6 with `vault_suit_upgraded`). Success sets `surface_cache_found` (VISIBLE: "Surface Cache") — yields a stash of pre-war ammo, two stims, and a working flashlight. **Consumable** either way (`tried_basement: true`); failure wedges the door for good.
- "Settle in / sleep" → `diner_settle`. Always available. Advances time one tick. First sleep triggers Beat 4 transitions; subsequent sleeps are how the player advances between Beat 5 errands.

Group-only sub-options (require `led_evacuation`):
- "Organise the residents into watches" → `organise_watches`. CHR 5 grey-out. Success sets `diner_organised` (HUD-visible: "Diner Organised"); failure sets `morale_cracking` (residents start to argue, Beat 7 reckoning becomes harder).
- "Talk down the man trying to go back" → `talk_down_returner`. Available once. CHR 6 grey-out. Success sets `kept_morale`; failure: he leaves, sets `lost_one` (one fewer body for Fork F).

Doc-only sub-option (requires Doc present):
- "Let Doc set up a clinic in the booth" → `doc_clinic`. Available once. Sets `doc_clinic_open`. If `radiation_sick`, opens "Ask Doc to treat you here" choice that clears the flag (consumable, only treatable once per act if Doc didn't treat in Act 1).

Yuna-only sub-option (requires Yuna present):
- "Help Yuna patch the roadside radio mast" → `yuna_radio`. Available once. STR 5 grey-out (one of you holds the mast). Success sets `radio_working` (HUD-visible: "Working Radio") — gates a tactical advantage in Fork F (Salvager rescue arrives one beat sooner; raid is detected in advance).

Gating:
- All five base choices: visible to all entry states, gated by stat/flag where noted, all consumable.
- Group sub-options: **hidden** without `led_evacuation`.
- Doc / Yuna sub-options: **hidden** without the relevant companion.

Random: none in this beat — the Diner is intentionally deterministic. Randomness lives on the road.

#### Hub — The Diner (`diner_hub`) — recurring form

After Beat 4 introduces faction contact, `diner_hub` re-enters with new options. See Hub section below.

### Beat 4 — Fork D: First Contact

Scenes: `first_contact_router`, `raider_scouts_arrive`, `salvager_emissary_arrives`, `solo_scavenge_run`, `cache_recovery`.

What happens: After the player's first sleep at the Diner, dawn arrives with company. The form of first contact depends on Beat 3 sightline choices and a small player-driven decision at the start of the second day.

`first_contact_router` is a lightly-randomised routing scene. After the first sleep, the player is offered a one-shot decision:

Choice point (`first_contact_router`):
- "Walk toward the watch fire to the south" (the Salvagers) → `salvager_emissary_arrives` — actually meets them en route, OR they meet you on your return. Sets `salvager_contact` (HUD-visible: "Salvagers Met").
- "Walk toward the smoke to the east" (the raiders) → `raider_scouts_arrive` — you don't make it; they find you a kilometre out. Sets `raiders_contact` (HUD-visible: "Raiders Met").
- "Stay near the Diner and scavenge the wrecks" → `solo_scavenge_run` — weighted random table, no faction touched yet.
- "Head north to the cache you spotted" → `cache_recovery`. **Hidden** without `surface_cache_visible`. Weighted random outcome (see below).

This is **Fork D**. The first faction met colours the rest of Act 2. Both factions can be met eventually, but the *first* contact establishes posture (player visited them = they're more amenable; they came to you = they're testing you).

#### Beat 4a — Raider first contact (`raider_scouts_arrive`)

Three scouts in road-leathers. They want a tax. The conversation has three branches:

- "Pay them" (requires consumable food/ammo — abstracted as "give them half the diner" — sets `raider_tribute_paid`, no `raider_pact` yet, raiders leave). Always available.
- "Stand them down" — STR 7 OR `vault_suit_upgraded` → STR 6, grey-out. Success: scouts retreat, `raiders_respect` set (you're now a known quantity; helps Beat 5b raider deal). Failure: you take a beating, `radiation_sick` set if not already, the diner is looted of its dining-room finds — `searched_dining`-derived items are gone; flavour only. Doc/Yuna/group survives but morale takes a hit (`morale_cracking`).
- "Talk to their boss" — CHR 6 grey-out. Success: `invited_to_raider_camp` set (gates Beat 5b). Failure: same as standing them down (failure path).

Read-raider-sign bonus: if `read_raider_sign` is set (Beat 2), all three checks above are -1 difficulty. Grey-out shows the modified threshold.

Group bonus: if Exit 5 with `diner_organised`, an additional choice appears — "Have the residents show themselves at the windows" → CHR 4 grey-out. Success: scouts back off without a fight; `raiders_wary` set (-1 difficulty on later raider negotiations, *but* +1 difficulty on Beat 5b — they remember being made to back down).

Gating: all three base choices visible. Group choice **hidden** without `diner_organised`.

#### Beat 4b — Salvager first contact (`salvager_emissary_arrives`)

A single woman in a clean, patched coat — a scarf wound against the dust. Introduces herself as **Hatch**, liaison from the Salvager outpost down the road. She's polite. She offers water. She wants to know who the player is, where they came from, and whether they intend to stay.

This scene is mostly establishing — sets `met_hatch`, `salvager_contact`. Hatch invites the player back to the Salvager outpost the next day "when you've slept on it." Her parting gift: a single canteen of clean water (flavour, sets `hatch_gift` — surfaces in Beat 5a as a trust modifier).

Choice point: only "Thank her and accept the canteen" or "Wave her off without taking it." The second is a small CHR-irrelevant signal — sets `refused_hatch_gift`, slightly cooler reception in Beat 5a.

Gating: no hard gates. Doc-present grants one extra dialogue beat (Doc and Hatch recognise mutual training — sets `doc_vouches_for_hatch`, +1 effective CHR on Beat 5a Salvager offer).

Group bonus: if Exit 5, Hatch counts the residents and her offer in Beat 5a will name a specific number. Cosmetic but affecting.

#### Beat 4c — Solo scavenge (`solo_scavenge_run`)

The player ignores both factions on day two and walks the local wrecks. Weighted random:

- `scavenge_uneventful` (weight 3) — heat, scrap, no events. Resets to Diner hub.
- `scavenge_lucky` (weight 1) — finds a working sidearm. Sets `has_pistol` (HUD-visible: "Service Pistol"). Reduces difficulty of Beat 7 hold/turn options by 1.
- `scavenge_bandit` (weight 2) — surprised by a lone scavenger. STR 5 OR PER 6 grey-out. Success: drives him off, finds his stash (sets `has_pistol`). Failure: takes a beating, sets `radiation_sick` (cumulative — if already set, this is **permadeath** by collapse on the way back). The risk should be legible in fiction but not mechanically pre-shown.
- `scavenge_corpse` (weight 1) — finds a Salvager corpse with a half-burned letter. Sets `read_salvager_letter` (gives the player extra context for Hatch in Beat 5a; cosmetic).
- `scavenge_raider_eye` (weight 1) — a raider scout watches from a distance. Sets `raiders_aware` (raiders count this as their own first-contact event; `raiders_contact` set; raiders will arrive at the Diner the next sleep, *as if* the player had chosen 4a but with no preparation).

Gating: none. The table is the choice. Death possibility is real on `scavenge_bandit` if `radiation_sick`.

Consumable: the *table itself* is consumable (`scavenged_local: true`), once per Act 2. Subsequent attempts simply route to `scavenge_uneventful`.

#### Beat 4d — Cache recovery (`cache_recovery`)

**Hidden** without `surface_cache_visible`. A two-hour walk north. Weighted random:

- `cache_clean` (weight 3) — sets `surface_cache_found`. Yields ammo, stims, a working radio battery (combines with `radio_working` for an extra Fork F advantage if Yuna present).
- `cache_squatters` (weight 2) — three feral scavvers got there first. STR 6 grey-out to drive them off. Success sets `surface_cache_found` and `radiation_sick` if exposed too long. Failure: retreat empty-handed; `cache_lost`.
- `cache_trap` (weight 1) — pre-war anti-personnel trap. PER 6 grey-out. Success: disarmed, `surface_cache_found`. Failure: STR 5 to survive (grey-out shown after failure as the explosion plays out — i.e. an immediate follow-up choice). Failure of the second check is **permadeath**.

Consumable: `cache_attempted: true` on the table. Cannot return.

### Beat 5 — Fork E: The Salvager Offer (and the raider counter-offer)

Scenes: `salvager_outpost`, `talk_hatch` (conversation hub), `hatch_offer_message`, `hatch_offer_medical`, `accept_message_run`, `refuse_offer`, `raider_camp` (parallel), `raider_pact_scene`, `pivot_to_raiders`.

What happens: After first contact, the Salvager outpost (and, if `invited_to_raider_camp` or `raiders_aware`, the raider camp) becomes a destination from the Diner hub. Hatch makes the offer that gives the act its title.

#### Beat 5a — Salvager outpost & Hatch (`salvager_outpost`, `talk_hatch`)

The outpost is a clutch of pre-war storage containers welded into a shape that resembles confidence. Salvagers move with purpose. Hatch greets the player; if `doc_vouches_for_hatch`, she greets Doc by name first.

`talk_hatch` is the conversation hub. Topics:

- "What do the Salvagers want?" → `hatch_topic_purpose` — scavengers turned engineers, building a clean-water network east. Sets `hatch_told_purpose`.
- "Why are *you* here, talking to me?" → `hatch_topic_why_you` — they need the Vault 34 map and any medical lore. Sets `hatch_told_why_you`.
- "What's east?" → `hatch_topic_east` — Bakersfield ruins, a raider clan called the **Iron Sons**, and beyond them, the Salvagers' main hold. Sets `hatch_told_east`.
- "Who runs the raiders?" → `hatch_topic_raiders` — a man called **Brask**. He used to be Salvager. Sets `hatch_told_raiders`.
- "Tell me about the message run" — **hidden** until 3 topics asked. Leads to `hatch_offer_message`.
- "Would you trade for vault medical knowledge?" — **hidden** without Doc present OR `doc_clinic_open` set OR Doc's notebook flag carried. Leads to `hatch_offer_medical`.
- "Walk away" → `diner_hub` (always available).

Each topic sets a flag, loops back, depletes via `flags_unset`. Standard pattern.

##### `hatch_offer_message` — the message run

Hatch lays out the bargain: carry a sealed message into raider territory and deliver it to a contact embedded in the Iron Sons. In return, the Salvagers will treat the player as friendly (sets `followers_allied`) and — if the run succeeds — will commit reinforcements to defend the Diner if the raiders attack.

Choices:
- "Accept" → `accept_message_run`. Sets `accepted_message_run` (consumable: only offered once). Triggers Beat 5c (the run itself).
- "Refuse, but stay friendly" → CHR 5 grey-out. Success: `salvager_neutral` set (Salvagers won't help, won't hinder). Failure: `salvager_cold` set (-1 effective on any later Salvager-facing check).
- "Refuse and leave" → `refuse_offer`. Sets `refused_offer`. Leaves with no Salvager flag set. Path to Ghost of 34 widens.

Gating: all three visible. The CHR check is grey-out.

If `raider_tribute_paid` is set, an additional cooler option appears: "I already paid the raiders. Find someone else." → sets `salvager_cold`.

##### `hatch_offer_medical` — the medical trade (consumable)

If the player has Doc Reyes' knowledge to sell (Doc present in Diner, OR Doc's notebook brought from Exit 5 via `recruited_doc`-derived flag), Hatch offers a one-time deal: in exchange for the medical lore, the Salvagers count the player as friendly *now*, no message run required.

Choices:
- "Sell the medical data" → sets `sold_medical_data`, `followers_allied`. **Heavy moral**: if Doc is present and was not consulted, an immediate follow-up scene (`doc_finds_out`) happens at the Diner. Doc's response: a stiff conversation, sets `doc_resents_you`. Doc remains but her morale hit reduces Fork F effectiveness by 1.
- "Ask Doc first" → routes to a small `consult_doc` scene at the Diner. Doc says yes only if `trusted_by_doc_reyes` AND not `radiation_sick` left untreated by you. Otherwise she refuses; choice loops back without `sold_medical_data`.
- "Decline" → returns to `talk_hatch`.

Gating: the offer itself is **hidden** without the medical-trade prerequisite. Selling-without-asking is visible but adds the moral consequence.

Consumable: `medical_offer_resolved: true` after any path is taken (decline included).

#### Beat 5b — Raider camp & Brask (`raider_camp`, `raider_pact_scene`, `pivot_to_raiders`)

**Hidden** as a Diner hub destination without `invited_to_raider_camp` OR `raiders_contact` (player must have a reason to know the way).

The camp is a junkyard ringed with rebar. Brask is a heavyset man with the bearing of someone who used to take orders. He is, surprisingly, articulate.

Choices in `raider_camp`:
- "Hear the offer" → `raider_pact_scene`. Brask offers protection and a cut of east-bound salvage in exchange for the Vault 34 location and any caches the player has found. Sets `heard_raider_offer`.
- "Test his patience" → STR 7 grey-out. Success: `raiders_respect_brask` (small later-flavour, no real path effect). Failure: jumped by his crew; **permadeath** if `radiation_sick` already set, otherwise a beaten retreat with `raiders_hostile` set (locks all future raider paths, raiders attack the Diner regardless of player choice in Beat 7).
- "Walk out" → `diner_hub`. No flag set.

`raider_pact_scene` choices:
- "Take the pact" → `pivot_to_raiders`. Sets `raider_pact` (HUD-visible: "Raider Pact"). If `salvager_contact` already set, also sets `salvagers_betrayed` (Hatch finds out — Salvager rescue path closes). If `accepted_message_run` is set, this is a *betrayal* — sets `betrayed_message_run`, `salvagers_betrayed`, and the player is expected to deliver Salvager intel to Brask in Beat 5c-prime.
- "Counter-offer: I'll point you at the cache" — requires `surface_cache_found`. CHR 6 grey-out. Success: `raider_loose_pact` (raiders will not attack the Diner, but won't help either). Failure: Brask laughs, takes the cache info anyway, no protection given.
- "Refuse" → `raider_camp` exit. Sets `refused_raiders`. Raiders will attack the Diner in Beat 7 regardless.

Gating: visible once at the camp. `raider_pact` and `followers_allied` are mutually exclusive *after* `raider_pact` is set — taking the pact removes Salvager options, including any unfinished message run.

Consumable: `raider_choice_made: true` after any pact/refuse path.

#### Beat 5c — The Message Run (the centrepiece consumable)

Scenes: `message_run_road`, `message_run_handoff`, `message_run_caught`, `message_run_returned`.

Triggered by `accepted_message_run`. The player walks east into raider territory carrying a sealed packet.

`message_run_road` is a weighted random table similar to Beat 2:
- `road_uneventful` (weight 2) — quiet passage. Goes to `message_run_handoff`.
- `road_iron_son_patrol` (weight 2) — challenged. PER 6 grey-out (talk past) OR `raiders_respect` reduces to PER 5 OR `raider_pact` skips the check entirely (you're known). Failure: `message_run_caught`.
- `road_dust_storm` (weight 1) — same dust storm as Beat 2; `radiation_sick` push-through is **permadeath** again.
- `road_brask_recognises_you` (weight 1, **only if `raiders_contact` set**) — a passing Iron Son recognises the player from the Diner encounter, drags you to Brask. Skips ahead to `raider_pact_scene` *with* the message in your pocket — a uniquely tense option (you can betray the run *during* the run).

`message_run_handoff` — meet the embedded Salvager. Two outcomes:
- Standard delivery: sets `message_delivered`, returns via `message_run_returned`. Hatch upgrades player to `followers_allied` (if not already). Salvager rescue flag-line is now armed for Fork F.
- The contact has been compromised — PER 5 grey-out to spot the trap. Failure: `message_run_caught`. Success: deliver and extract; sets `message_delivered`, `salvagers_owe_you` (Salvager rescue arrives one beat sooner in Fork F).

`message_run_caught` — captured by Iron Sons. CHR 7 grey-out to talk your way to Brask (becomes `pivot_to_raiders` opportunity with the message offered as good-faith). Failure: **permadeath**.

`message_run_returned` — back at the Diner. Time has passed. If `loyalists_close` was set (the Cole-radio thread), the loyalists arrive *during* the message run — see Beat 7B.

Gating: scene-internal. The whole run is the consumable (`message_run_resolved: true` after any path).

### Beat 6 — Diner hub (recurring form, full options)

Hub: `diner_hub`.

Returns to: this scene after each errand (scavenge run, Salvager visit, raider visit, message run, Hatch conversation exit).

#### Choices available (full list, after Beat 4 contact)

Always-available core:
- "Rest / sleep" → `diner_settle` → advances to next beat trigger if unresolved.
- "Search around the diner" → if any of `searched_dining` / `searched_back` / `searched_roof` / `tried_basement` are unset, list them; once all four are set, this option disappears.
- "Step outside and look at the sky" → flavour scene, no flag, weighted random colour text.

Travel destinations (gated):
- "Walk to the Salvager outpost" → `salvager_outpost`. **Hidden** until `salvager_contact`.
- "Walk to the raider camp" → `raider_camp`. **Hidden** until `invited_to_raider_camp` OR `raiders_contact`.
- "Scavenge the local wrecks" → `solo_scavenge_run`. Available until `scavenged_local`. Then **hidden**.
- "Walk to the cache you spotted" → `cache_recovery`. **Hidden** without `surface_cache_visible`; disappears after `cache_attempted`.

Companion conversation (gated):
- "Talk to Doc" → short conversation, gated topics about her mood, her notebook, the surface. **Hidden** without Doc present.
- "Talk to Yuna" → topics about the radio, what she sees on the horizon, whether she'd go back. **Hidden** without Yuna present.
- "Talk to the residents" → group flavour, morale check (CHR 4 grey-out: success sets `kept_morale` if not already; failure sets `morale_cracking`). Once per cycle. **Hidden** without `led_evacuation`.

State-driven appearances:
- "Bury the basement explosion victim" — appears one cycle after a `cache_trap` failure that *didn't* kill the player but killed Doc/Yuna if accompanying. Cosmetic, sets `mourned`.
- "Listen to the working radio" — **hidden** without `radio_working`. Weighted random — picks up faint music, raider chatter, or Cole's voice (only if `loyalists_close`). Listening to Cole's voice sets `confirmed_loyalists` (greys out `Beat 7B` warning option).

Hub flag-gated changes (cosmetic but legible):
- `diner_organised` — residents move with purpose; the place feels like a fort.
- `morale_cracking` — small fires, an argument behind the bar.
- `salvager_contact` — Hatch's apprentice has set up a small medical bench by the kitchen door.
- `raider_pact` — a raider scout sits on the roof. Residents (if present) refuse to look at him.
- `radio_working` — the mast hums. Yuna fiddles with it constantly.
- `surface_cache_found` — a stack of crates by the door; flashlight beam sweeping the room.

Exit: the hub exits to Beat 7 (Fork F) when one of the trigger conditions fires:
- Player chooses "Sleep" with all faction-relevant choices resolved (`message_run_resolved` OR `raider_choice_made` OR `refused_offer`).
- OR `loyalists_close` AND one cycle has passed without action — loyalists arrive (Beat 7B fires regardless).
- OR `morale_cracking` AND a second sleep — residents fracture (Beat 7 fires early, weakened).

If `reactor_stabilised`, the hub exits *after* the trigger fires but with one extra "prepare the diner" beat (`diner_prep_extra`) where the player gets one extra small choice (set traps, drill the residents, fortify the windows) — sets `extra_prep` flag, gives a small advantage in Fork F.

### Beat 7 — Fork F: The Final Reckoning

Scenes: `reckoning_intro`, `hold_diner`, `flee_diner`, `turn_raid`, `salvager_rescue`, `loyalist_remnant_attack`, `final_choice_router`.

What happens: The trigger from Beat 6 leads to the reckoning. Two threats can arrive — sometimes both. The player chooses how to face them.

`reckoning_intro` describes the approach — dust on the horizon, a horn or a chant or both. Routes via `final_choice_router` based on flags:

- If `raiders_hostile` OR (no `raider_pact` AND `salvager_contact` triggered Salvager defence too late) → raider attack
- If `loyalists_close` AND time-trigger fired → loyalist remnant attack (`loyalist_remnant_attack`, see Beat 7B)
- If both → both, in sequence (raider first, loyalist while you're recovering)
- If `raider_pact` AND not `salvagers_betrayed` AND not `loyalists_close` → a quieter beat (`raider_pact_visit` — Brask shows up to claim his cut; choice to honour or break the pact)

#### Player choice (`final_choice_router`)

Up to four options, gated:

- **Hold the Diner** → `hold_diner`. Always visible. Difficulty modified by:
  - `diner_organised`: -1
  - `morale_cracking`: +1
  - `has_pistol`: -1
  - `extra_prep` (from `reactor_stabilised`): -1
  - `vault_suit_upgraded`: -1 (player STR effective)
  - Companion count: solo +2, pair +0, group -1
  - `radio_working`: -1 (you saw them coming)
  Composite STR check at adjusted difficulty (base STR 6). Grey-out shows the *modified* threshold so the player understands why their build matters.
  - Success → `held_diner`. Path to **Vault Reborn** (if Exit 5 / group), **Ghost of 34** (if solo, with adjusted text — you held it alone, but at what cost), or **Open Door** (only if `salvager_rescue` *also* fires — see below).
  - Failure → permadeath UNLESS the player has an exit option queued (Salvager rescue scheduled, or flee fallback). With Salvager rescue queued, failure becomes a *rescue* arrival mid-fight (extra losses, but survival).

- **Flee the Diner** → `flee_diner`. Always visible. Sets `fled_diner`. Companions split:
  - Solo: clean flee. Path to **Ghost of 34** (default ending).
  - Pair: companion goes with you, sets `fled_with_doc` or `fled_with_yuna`. Path to **Ghost of 34** (haunted variant if `abandoned_survivors` ever set).
  - Group: residents are abandoned. Sets `abandoned_survivors` (if not already). Path to **Ghost of 34** (heaviest variant — Vault Reborn locked).

- **Turn the raid** → `turn_raid`. **Hidden** without `raider_pact` OR `raider_loose_pact`. The player redirects the raiders against the loyalists OR against the Salvagers (player-chosen). PER 6 grey-out (you have to time it right).
  - Success against loyalists: `loyalists_dead`, raider pact strengthens. Path to **Warden's Ghost** (if `killed_cole` already, or if Cole is taken alive and executed in epilogue — small final choice in the ending scene).
  - Success against Salvagers: `salvagers_dead`, Hatch's outpost burns. Path to **Warden's Ghost** (the dark variant).
  - Failure: chaotic three-way fight, **permadeath**.

- **Bring back Salvager reinforcements** → `salvager_rescue`. **Hidden** without `message_delivered` AND `followers_allied`. The player slips out to fetch the Salvager column already mobilising in response to the message run. Travel scene with one PER 5 grey-out (find them in time). 
  - Success: `salvager_rescue_arrived`. Returns to the Diner during the fight, breaks the attackers. Path to **Open Door** (if CHR ≥ 7 in final scene check — see below). If CHR < 7, downgrades to **Vault Reborn** (still positive, but the Salvagers leave without committing to extract more vault residents).
  - Failure: arrives too late. Diner falls. Player survives but everyone present dies. Path to **Ghost of 34** (worst variant — you were one beat off saving them).

#### Beat 7B — Loyalist remnant attack (`loyalist_remnant_attack`)

Triggered if `blackmailed_cole` AND NOT `killed_cole` AND `loyalists_close`. A small group of Cole loyalists (3–4, including possibly Cole himself if `confirmed_loyalists`) arrives at the Diner.

This is *additive* to the main reckoning, not a replacement. It can fire alongside any of the four main choices:
- During Hold: +2 difficulty to the STR check, +1 if `vault_suit_upgraded` to offset.
- During Flee: forces a small exchange first; PER 5 to slip past, failure = permadeath.
- During Turn the raid: the loyalists are the *target* — neat resolution, Brask's crew finishes them.
- During Salvager rescue: the loyalists hit you on the road; PER 6 grey-out to evade. Failure delays you = Salvager rescue becomes "too late" outcome.

Cole, if present, is the final-scene choice in the ending: spare or kill. Killing sets `killed_cole`. Sparing sets `spared_cole` (cosmetic for the ending text).

### Beat 8 — Endings (transition out of Act 2)

Scenes: `ending_router`, `ending_wardens_ghost`, `ending_vault_reborn`, `ending_ghost_of_34`, `ending_open_door`.

`ending_router` — silent routing scene. Reads accumulated flags and dispatches to the appropriate ending. Resolution rules (in order — first match wins):

1. `held_diner` AND `salvager_rescue_arrived` AND CHR ≥ 7 AND `followers_allied` → **Open Door**
2. `salvager_rescue_arrived` AND CHR ≥ 7 AND `followers_allied` AND NOT `held_diner` → **Open Door** (rescue-only variant)
3. `turn_raid` succeeded (`loyalists_dead` OR `salvagers_dead`) AND (`killed_cole` OR `spared_cole`) → **Warden's Ghost**
4. `raider_pact` AND `abandoned_survivors` AND NOT `held_diner` → **Warden's Ghost** (no-loyalist variant)
5. `held_diner` AND `led_evacuation` AND NOT `abandoned_survivors` → **Vault Reborn**
6. `held_diner` AND companions present (Doc OR Yuna) AND NOT `abandoned_survivors` → **Vault Reborn** (small-group variant)
7. `salvager_rescue_arrived` AND CHR < 7 → **Vault Reborn** (Salvager-assisted variant)
8. `fled_diner` OR (no faction flags AND no `held_diner`) → **Ghost of 34**
9. Default fallback → **Ghost of 34**

Each ending scene is a single-screen epilogue with a final reflective line and `choices: []` (terminal). Each opens with one small final choice that flavours the ending text (e.g. Warden's Ghost: "Spare Cole or kill him"; Open Door: "Go back into the wasteland with the Salvagers, or stay and rest"; Ghost of 34: "Look back at the diner one last time, or don't"; Vault Reborn: "Speak at the gathering, or sit at the back"). These do not change which ending is reached — the routing is already done.

## Hubs

### Hub — The Diner (`diner_hub`)

Returns to: this scene after each errand (Salvager visit, raider visit, scavenge run, message run, Hatch conversation, companion talk, search action, sleep transition that doesn't trigger Beat 7).

Choices available: see Beat 6 — full list. Choice set scales with party (solo/pair/group), with faction contacts (Salvagers/raiders/neither/both), with discoveries (`surface_cache_found`, `radio_working`), and with state (`diner_organised`, `morale_cracking`, `loyalists_close`).

Exit: the hub exits to Beat 7 when reckoning conditions are met (see Beat 6 trigger list).

## Conversations

### Conversation — Hatch (`talk_hatch`)

Topics: purpose (Salvager goals), why-you (what they want from the player), east (geography of the wasteland), raiders (Brask), message-run (hidden until 3 topics), medical-trade (hidden without prerequisite).

Each topic: sets a flag, loops back; topic disappears via `flags_unset` (standard pattern).

Exit: "Walk away" → `diner_hub` (always available).

### Conversation — Doc Reyes (`talk_doc_diner`) (only if Doc present)

Topics: how she's holding up, the residents (if Exit 5), her notebook (sets `doc_notebook_visible` — gates `hatch_offer_medical` if not already gated by clinic), the road ahead (her opinion on factions — anti-raider, neutral-on-Salvager).

Each: sets flag, depletes. Exit: "Walk away" always.

### Conversation — Yuna (`talk_yuna_diner`) (only if Yuna present)

Topics: the radio (technical gossip), what she sees on the horizon (sets `yuna_spotted_X` — gives early warning of Beat 7 attacker direction; -1 to Hold check if asked), whether she'd go back to the vault (CHR 5 grey-out to convince her she shouldn't — sets `yuna_committed`).

Each: sets flag, depletes. Exit: "Walk away" always.

## Random / Weighted Scenes

- `road_to_diner` — the primary random table. Five outcomes, weights 4/2/2/1/1 (cole-route hidden if conditions unmet → 4/2/2/1).
- `solo_scavenge_run` — five outcomes, weights 3/1/2/1/1. Consumable as a table.
- `cache_recovery` — three outcomes, weights 3/2/1. Consumable.
- `message_run_road` — four outcomes, weights 2/2/1/1. Internal to the message run.
- `listen_to_radio` (`radio_working` Diner sub-option) — three outcomes, weights 2/2/1. Repeatable colour.
- `step_outside` (Diner colour) — small weighted text variants, no flag effects. Repeatable.

All random scenes are *legible* — the in-fiction text names the uncertainty ("the road's long; anything could happen", "the wrecks are picked over but you might find something", "the static comes and goes").

## Exits

- **Open Door** — `held_diner` + `salvager_rescue_arrived` + CHR ≥ 7 + `followers_allied` (or rescue-only variant: `salvager_rescue_arrived` + CHR ≥ 7 + `followers_allied`, no hold required)
- **Warden's Ghost** — `turn_raid` succeeded, OR (`raider_pact` AND `abandoned_survivors`)
- **Vault Reborn** — `held_diner` AND (Exit 5 group survived OR companions present) AND NOT `abandoned_survivors`; OR `salvager_rescue_arrived` with CHR < 7
- **Ghost of 34** — `fled_diner` OR no faction commitments OR rescue arrived too late OR fallback

## Flags / Stats Changed in Act 2

### New visible HUD flags (set during Act 2)
- `surface_cache_visible` — "Surface Cache Sighted" — Beat 3 (roof PER spot)
- `surface_cache_found` — "Surface Cache" — Beat 3 (basement) or Beat 4d (cache run)
- `salvager_contact` — "Salvagers Met" — Beat 4b
- `raiders_contact` — "Raiders Met" — Beat 4a or 4c
- `followers_allied` — "Salvager Ally" — Beat 5a (message run accept) or Beat 5a (medical sale)
- `raider_pact` — "Raider Pact" — Beat 5b
- `radio_working` — "Working Radio" — Beat 3 (Yuna sub-option)
- `has_pistol` — "Service Pistol" — Beat 4c (lucky scavenge or bandit win)
- `diner_organised` — "Diner Organised" — Beat 3 (group sub-option)

### New hidden flags (gameplay-relevant)
- Roads / arrivals: `pushed_storm`, `saw_predecessor`, `read_raider_sign`, `loyalists_close`, `confirmed_loyalists`
- Diner search: `searched_dining`, `searched_back`, `searched_roof`, `tried_basement`, `read_diner_history`, `has_coffee`, `morale_cracking`, `kept_morale`, `lost_one`, `mourned`, `extra_prep`
- Companions: `doc_clinic_open`, `doc_resents_you`, `doc_vouches_for_hatch`, `yuna_committed`, `yuna_spotted_X`
- Faction first contacts: `raider_tribute_paid`, `raiders_respect`, `raiders_aware`, `raiders_wary`, `raiders_hostile`, `invited_to_raider_camp`, `salvager_neutral`, `salvager_cold`, `hatch_gift`, `refused_hatch_gift`, `met_hatch`
- Hatch topics: `hatch_told_purpose`, `hatch_told_why_you`, `hatch_told_east`, `hatch_told_raiders`
- Salvager offer: `accepted_message_run`, `refused_offer`, `medical_offer_resolved`, `sold_medical_data`, `salvagers_owe_you`, `salvagers_betrayed`
- Raider deal: `heard_raider_offer`, `raider_loose_pact`, `refused_raiders`, `raiders_respect_brask`, `raider_choice_made`
- Message run: `message_delivered`, `message_run_resolved`, `betrayed_message_run`
- Reckoning: `held_diner`, `fled_diner`, `loyalists_dead`, `salvagers_dead`, `salvager_rescue_arrived`, `spared_cole`, plus Act 1 carry of `killed_cole`
- Random-table consumed flags: `scavenged_local`, `cache_attempted`

### Stats
No permanent stat changes (no XP). Effective bonuses:
- `vault_suit_upgraded` — soft +1 STR in physical checks (Hold the Diner, raider stand-down, push through dust storm, basement door, cache squatters).
- `has_pistol` — soft +1 to ranged/turn-the-raid PER checks AND -1 difficulty on Hold.
- `radio_working` — informational; -1 difficulty on Hold (forewarning).
- `extra_prep` (from `reactor_stabilised`) — -1 difficulty on Hold.
- Companion count — affects Hold difficulty: solo +2, pair +0, group -1.
- Morale flags (`diner_organised` / `morale_cracking`) — adjust Hold difficulty by ∓1.

CHR thresholds matter twice: Beat 5a Salvager offer (CHR 5 to refuse politely), Beat 8 ending router (CHR ≥ 7 to reach Open Door).

## Consumable Choices in Act 2 (full list)

Listed here so Stage 3 doesn't miss them:

1. **Each Diner search** — `searched_dining`, `searched_back`, `searched_roof`, `tried_basement` (Beat 3).
2. **Organise watches** (Beat 3, group only) — `organise_watches_attempted`.
3. **Talk down the returner** (Beat 3, group only) — `talk_down_attempted`.
4. **Open Doc clinic** (Beat 3, Doc only) — `doc_clinic_open`.
5. **Have Doc treat radiation sickness** (Beat 3 sub-option) — `doc_clinic_treated`.
6. **Yuna radio repair** (Beat 3, Yuna only) — `yuna_radio_attempted`.
7. **First-contact router** (Beat 4) — `first_contact_made`.
8. **Solo scavenge run table** (Beat 4c) — `scavenged_local`.
9. **Cache recovery table** (Beat 4d) — `cache_attempted`.
10. **Each Hatch topic** (Beat 5a) — depleted via `flags_unset` on the conversation hub.
11. **The message-run offer** (Beat 5a) — `accepted_message_run` OR `refused_offer` (only one path).
12. **The medical-trade offer** (Beat 5a) — `medical_offer_resolved`.
13. **The raider pact** (Beat 5b) — `raider_choice_made`.
14. **The message run itself** (Beat 5c) — `message_run_resolved`.
15. **Diner hub "search around"** (Beat 6) — composite: only listed while any of the four searches remain.
16. **Talk to residents** (Beat 6, group only, per cycle) — `morale_check_done` (resets per sleep cycle).
17. **Each companion conversation topic** — standard `flags_unset` depletion.
18. **Reckoning final choice** (Beat 7) — implicit consumable: choosing one ends the act.
19. **Cole final-scene spare/kill** (Beat 8 if `loyalist_remnant_attack` and Cole present) — `cole_final_resolved`.

## Grey-out vs Hidden Decisions (full list)

### Grey-out (player should see the gate)

- All STR / PER / CHR checks where the player is contextually present: dust storm push-through, raider stand-down, basement door force, cache squatter fight, cache trap disarm, message run patrol slip-past, message run handoff trap spot, message run caught CHR talk, Hatch refuse politely (CHR 5), raider camp test, Hold the Diner composite STR (with all modifiers shown), turn-the-raid PER, salvager-rescue PER, evade loyalist remnant.
- Modified thresholds shown explicitly: e.g. "[Strength 6 — Reinforced Vault Suit applied]" or "[Strength 5 — Hold modified by morale, pistol, and rescue]".

### Hidden (existence is a spoiler)

- `road_cole_voice` road outcome — only in the random table if `blackmailed_cole` AND NOT `killed_cole`.
- Walk to the raider camp (Diner hub option) — until `invited_to_raider_camp` OR `raiders_contact`.
- Walk to the Salvager outpost — until `salvager_contact`.
- Hatch's "tell me about the message run" topic — until 3 other Hatch topics asked.
- Hatch's "trade for medical knowledge" — without prerequisite (Doc presence or notebook).
- Group sub-options at Diner (organise, talk down, residents conversation) — without `led_evacuation`.
- Doc / Yuna sub-options and conversations — without the relevant companion.
- "Listen to the working radio" — without `radio_working`.
- "Walk to the cache" — without `surface_cache_visible`.
- "Bring back Salvager reinforcements" (Beat 7) — without `message_delivered` AND `followers_allied`.
- "Turn the raid" (Beat 7) — without `raider_pact` OR `raider_loose_pact`.
- The "I already paid the raiders" line in Hatch's offer — without `raider_tribute_paid`.
- The Cole spare/kill final choice — without `loyalist_remnant_attack` resolved with Cole alive.

## Permadeath Points in Act 2

- **Push through the dust storm with `radiation_sick`** (Beat 2, also Beat 5c) — lungs give out.
- **`scavenge_bandit` while already `radiation_sick`** (Beat 4c) — collapse on the way back.
- **`cache_trap` failure on both PER and STR follow-up** (Beat 4d) — explosion.
- **`message_run_caught` CHR fail** (Beat 5c) — executed by Iron Sons.
- **Test Brask's patience and lose** (Beat 5b) — permadeath if `radiation_sick`, otherwise hostile retreat (closes raider paths).
- **Hold the Diner with no exit queued, fail STR** (Beat 7) — overrun.
- **Turn the raid, fail PER** (Beat 7) — caught between three sides.
- **Flee with `loyalist_remnant_attack` firing, fail PER 5** (Beat 7B) — taken on the road.

## Notes for Stage 3 (scene writer)

- The Diner is the spine of the act. Make it feel like a *place* — first arrival should be reverent, second cycle homely, third cycle worried, fourth cycle desperate. Companion presence and morale flags should change the *room*, not just the dialogue.
- The party-size scaling is non-trivial — every Diner-set scene needs three text branches (solo / pair / group) for the establishing paragraph, even if choices are identical. Plan for this in scene templates.
- Hatch should be calm, articulate, unsentimental. She is the brief's "Followers of the Apocalypse analogue" — not naive, not saintly. She will *let* the player walk into a trap if they're rude to her.
- Brask should be unexpectedly literate. He used to be Salvager. When he describes the deal, he uses Salvager's vocabulary. This should be the player's only clue, before Hatch confirms it, that the factions share roots.
- The Cole loyalist remnant should be small, tired, and pathetic — not a boss fight. The pathos is that they're still loyal to a man who is melting in his own bunker. Cole himself, if present, should be visibly dying of the radiation he hid from everyone.
- The four endings share a final beat structure (one small flavour choice, then a single reflective paragraph, then `choices: []`). Don't bloat the endings — the *act* did the work; the ending is the comma at the end of a long sentence.
- `radiation_sick` is the silent backbone of permadeath in Act 2. If a player carried it from Act 1 and didn't get treated by Doc, they should *feel* it — every long-march scene should mention the cough, the dizzy, the metallic taste. Then when it kills them, it shouldn't be a surprise.
