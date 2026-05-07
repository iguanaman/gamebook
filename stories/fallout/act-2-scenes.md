# Vault 34 — Act 2 Scenes

Source beats: `act-2.md`. Cast: `cast.md`. This file resolves each beat into named scenes with explicit choices, gates, effects, and consumables. Scene IDs are descriptive — Stage 5 will adapt to YAML conventions.

---

## Beat 1 — The Threshold (entry-branch opening)

### Scene: `surface_threshold`
Purpose: silent router from Act 1 exit state to the appropriate opening vignette.
Choices:
- Auto-route — no text, no buttons. Branches on entry flags:
  - Exit 1 (clean solo: `has_master_key`, NOT `exposed_truth`, NOT companion flags) → `open_alone_clean`
  - Exit 2 (abandoner: `has_master_key` AND `exposed_truth` AND `abandoned_survivors`) → `open_alone_haunted`
  - Exit 3 (Doc): `recruited_doc` AND NOT `led_evacuation` → `open_with_doc`
  - Exit 4 (Yuna): `recruited_yuna` AND NOT `led_evacuation` → `open_with_yuna`
  - Exit 5 (mob): `led_evacuation` → `open_with_mob`
NPCs present: none on screen.

### Scene: `open_alone_clean`
Purpose: solo, clean exit. Door clangs; nobody behind you; the wasteland is silent.
Choices:
- "Step out" → `surface_first_breath` | gating: none | effects: none
NPCs present: none.

### Scene: `open_alone_haunted`
Purpose: solo, abandoner. Someone shouts your name from the corridor as the door seals.
Choices:
- "Walk away" → `surface_first_breath` | gating: none | effects: none
NPCs present: none (offstage shout).

### Scene: `open_with_doc`
Purpose: arrival with Doc. She kneels, coughs, says "we need to find water."
Choices:
- "Help her up and start walking" → `surface_first_breath` | gating: none | effects: none
NPCs present: Doc Reyes.

### Scene: `open_with_yuna`
Purpose: arrival with Yuna. She looks at the sky and laughs — first time you've heard her laugh.
Choices:
- "Walk together" → `surface_first_breath` | gating: none | effects: none
NPCs present: Yuna.

### Scene: `open_with_mob`
Purpose: mass evacuation. Resistance pours out blinking; one resident tries to go back.
Choices:
- "Talk him down" → `surface_first_breath` | gating: none | effects: `kept_morale: true`
- "Let him go — keep moving" → `surface_first_breath` | gating: none | effects: `lost_one: true`
- "Order the column to form up" → `surface_first_breath` | gating: none | effects: none (convergent — chooses tone, not outcome)
NPCs present: Doc and/or Yuna if also recruited; unnamed resident.

### Scene: `surface_first_breath`
Purpose: unfiltered air, distant ruins of Bakersfield, dead-reactor sun. If `radiation_sick` AND NOT `reyes_treated_you`, add nausea throat-line.
Choices:
- "Walk toward the ruins" → `road_to_diner` | gating: none | effects: none
NPCs present: companion(s) if any.

---

## Beat 2 — The Road to the Diner

### Scene: `road_to_diner`
Purpose: legible-uncertainty travel scene; weighted random table.
Choices:
- "Press on toward the smoke on the horizon" → weighted:
  - `road_uneventful` (4)
  - `road_dust_storm` (2)
  - `road_skeleton` (2)
  - `road_corpse_pile` (1)
  - `road_cole_voice` (1) — **only listed in table if `blackmailed_cole` AND NOT `killed_cole`** (hidden — existence is a spoiler)
NPCs present: companion(s) if any.

### Scene: `road_uneventful`
Purpose: heat, blisters, nothing happens. Convergent to arrival.
Choices:
- "Continue" → `diner_arrival` | gating: none | effects: none
NPCs present: companion(s).

### Scene: `road_dust_storm`
Purpose: real branching choice. Permadeath gate for `radiation_sick`.
Choices:
- "Push through the wall of dust" → branch on PER 5 [grey-out] | effects on success: `pushed_storm: true` → `diner_arrival` | on failure with `radiation_sick`: → `road_dust_storm_death` (permadeath) | on failure without `radiation_sick`: → `diner_arrival_night`
- "Shelter behind a wreck" → `diner_arrival_night` | gating: none | effects: none (safe)
NPCs present: companion(s).

### Scene: `road_dust_storm_death`
Purpose: permadeath — lungs give out.
Choices: [] (terminal scene)
NPCs present: companion(s) watch.

### Scene: `road_skeleton`
Purpose: vault-suited skeleton beside a long-cold campfire. Sets silent flag for Hatch dialogue.
Choices:
- "Move on" → `diner_arrival` | gating: none | effects: `saw_predecessor: true`
NPCs present: companion(s).

### Scene: `road_corpse_pile`
Purpose: raider sign. PER check for tactical edge.
Choices:
- "Read the signs" → `diner_arrival` | gating: PER 5 [grey-out] | effects on success: `read_raider_sign: true` | on failure: none (still progresses)
- "Skirt the pile" → `diner_arrival` | gating: none | effects: none (convergent)
NPCs present: companion(s).

### Scene: `road_cole_voice`
Purpose: Cole's voice on a salvaged radio in the distance. Hidden entry — only routed to if conditions met.
Choices:
- "Press on" → `diner_arrival` | gating: none | effects: `loyalists_close: true`
NPCs present: Cole (offstage radio voice — Warden Aldric Cole).

### Scene: `diner_arrival`
Purpose: building described. Companion-scaled (solo / pair / group establishing paragraphs).
Choices:
- "Step inside" → `diner_hub` | gating: none | effects: none
NPCs present: companion(s).

### Scene: `diner_arrival_night`
Purpose: same building, night variant — sheltered or fled storm.
Choices:
- "Step inside" → `diner_hub` | gating: none | effects: none
NPCs present: companion(s).

NPCs in this beat: Cole (radio only, conditional).

---

## Beat 3 — The Diner (first arrival, hub root)

### Hub — `diner_hub`
Returns from: `diner_first_search`, `diner_back_room`, `diner_roof`, `diner_basement_locked`, `diner_settle`, `organise_watches`, `talk_down_returner`, `doc_clinic`, `yuna_radio`, plus all Beat 6 hub destinations once unlocked.

Beat 3 first-pass choices (consumables noted; further options unlock in Beat 6):
- "Search the dining room" → `diner_first_search` | gating: requires `flags_unset: [searched_dining]` | effects on entry: none (search action sets flag in target scene) | consumable: Y (`searched_dining: true` set in target)
- "Check the back room / kitchen" → `diner_back_room` | gating: requires `flags_unset: [searched_back]` | consumable: Y
- "Climb to the roof" → `diner_roof` | gating: requires `flags_unset: [searched_roof]` | consumable: Y
- "Try the basement door" → `diner_basement_locked` | gating: requires `flags_unset: [tried_basement]` | consumable: Y
- "Settle in / sleep" → `diner_settle` | gating: none | effects: none (advances time tick; first sleep arms Beat 4)

Group-only sub-options (require `led_evacuation`, **hidden** otherwise):
- "Organise the residents into watches" → `organise_watches` | gating: hidden without `led_evacuation`; requires `flags_unset: [organise_watches_attempted]` | consumable: Y
- "Talk down the man trying to go back" → `talk_down_returner` | gating: hidden without `led_evacuation`; requires `flags_unset: [talk_down_attempted]` | consumable: Y

Doc-only sub-option (requires `recruited_doc`/Doc-present companion flag, **hidden** otherwise):
- "Let Doc set up a clinic in the booth" → `doc_clinic` | gating: hidden without Doc; requires `flags_unset: [doc_clinic_open]` | consumable: Y

Yuna-only sub-option (requires Yuna-present, **hidden** otherwise):
- "Help Yuna patch the roadside radio mast" → `yuna_radio` | gating: hidden without Yuna; requires `flags_unset: [yuna_radio_attempted]` | consumable: Y

Exit (Beat 3): no explicit "leave" — sleep is the transition out.
NPCs present: Doc, Yuna, residents per entry.

### Scene: `diner_first_search`
Purpose: sun-split vinyl booths; bullet-hole pattern in the wall.
Choices:
- "Read the bullet-hole pattern" → `diner_hub` | gating: PER 5 [grey-out] | effects on success: `searched_dining: true`, `read_diner_history: true` | on failure: `searched_dining: true`
- "Take the jerky and head back" → `diner_hub` | gating: none | effects: `searched_dining: true` (convergent — chooses framing, not outcome)
NPCs present: companion(s).

### Scene: `diner_back_room`
Purpose: kitchen with a wedged freezer. STR for the coffee tin.
Choices:
- "Wrench the freezer open" → `diner_hub` | gating: STR 5 [grey-out] | effects on success: `searched_back: true`, `has_coffee: true` | on failure: `searched_back: true` (cuts hand, no item)
- "Leave it" → `diner_hub` | gating: none | effects: `searched_back: true` (convergent)
NPCs present: companion(s).

### Scene: `diner_roof`
Purpose: sightlines — smoke east (raiders), watch fire south (Salvagers), tracks north (cache).
Choices:
- "Scan the horizon carefully" → `diner_hub` | gating: PER 5 [grey-out] | effects on success: `searched_roof: true`, `surface_cache_visible: true` (HUD: "Surface Cache Sighted") | on failure: `searched_roof: true`
- "Climb back down" → `diner_hub` | gating: none | effects: `searched_roof: true` (convergent)
NPCs present: companion(s).

### Scene: `diner_basement_locked`
Purpose: heavy steel basement door. STR check, with vault-suit modifier.
Choices:
- "Force the door" → `diner_hub` | gating: STR 7 [grey-out] (STR 6 if `vault_suit_upgraded`) | effects on success: `tried_basement: true`, `surface_cache_found: true` (HUD: "Surface Cache") | on failure: `tried_basement: true` (door wedged shut for good)
- "Walk away" → `diner_hub` | gating: none | effects: `tried_basement: true` (convergent — wedges the door)
NPCs present: companion(s).

### Scene: `diner_settle`
Purpose: sleep tick. Routes to Beat 4 trigger if first sleep, else returns to hub.
Choices:
- "Lie down" → `first_contact_router` | gating: requires `flags_unset: [first_contact_made]` | effects: none
- "Lie down" → `diner_hub` | gating: requires flag `first_contact_made` AND no Beat 7 trigger met | effects: none (cycle tick)
- "Lie down" → `reckoning_intro` | gating: Beat 7 trigger conditions met (see Beat 6) | effects: none
NPCs present: companion(s).

### Scene: `organise_watches`
Purpose: wrangle residents. Group-only.
Choices:
- "Lay it out plain" → `diner_hub` | gating: CHR 5 [grey-out] | effects on success: `organise_watches_attempted: true`, `diner_organised: true` (HUD: "Diner Organised") | on failure: `organise_watches_attempted: true`, `morale_cracking: true`
- "Step back and let them sort it" → `diner_hub` | gating: none | effects: `organise_watches_attempted: true`, `morale_cracking: true` (convergent — explicit failure)
NPCs present: residents.

### Scene: `talk_down_returner`
Purpose: a man wants to go back to the vault. Group-only.
Choices:
- "Tell him what's behind that door" → `diner_hub` | gating: CHR 6 [grey-out] | effects on success: `talk_down_attempted: true`, `kept_morale: true` | on failure: `talk_down_attempted: true`, `lost_one: true`
- "Let him go" → `diner_hub` | gating: none | effects: `talk_down_attempted: true`, `lost_one: true` (convergent)
NPCs present: unnamed resident.

### Scene: `doc_clinic`
Purpose: Doc claims a booth as a clinic. If `radiation_sick`, opens the treat-here option.
Choices:
- "Stand back and let her work" → `diner_hub` | gating: none | effects: `doc_clinic_open: true`
- "Ask her to treat your sickness here" → `diner_hub` | gating: requires `radiation_sick` AND `flags_unset: [doc_clinic_treated]` | effects: `doc_clinic_open: true`, `doc_clinic_treated: true`, `reyes_treated_you: true`, `radiation_sick: false`
NPCs present: Doc Reyes.

### Scene: `yuna_radio`
Purpose: patch the roadside mast.
Choices:
- "Hold the mast steady" → `diner_hub` | gating: STR 5 [grey-out] | effects on success: `yuna_radio_attempted: true`, `radio_working: true` (HUD: "Working Radio") | on failure: `yuna_radio_attempted: true`
- "Let her work it solo" → `diner_hub` | gating: none | effects: `yuna_radio_attempted: true` (convergent — fails by default)
NPCs present: Yuna.

NPCs in this beat: Doc Reyes, Yuna, unnamed residents.

---

## Beat 4 — Fork D: First Contact

### Scene: `first_contact_router`
Purpose: dawn after the first sleep. Player picks day-two posture.
Choices:
- "Walk toward the watch fire to the south" → `salvager_emissary_arrives` | gating: none | effects: `first_contact_made: true`
- "Walk toward the smoke to the east" → `raider_scouts_arrive` | gating: none | effects: `first_contact_made: true`
- "Stay near the Diner and scavenge the wrecks" → `solo_scavenge_run` | gating: none | effects: `first_contact_made: true`
- "Head north to the cache you spotted" → `cache_recovery` | gating: hidden without `surface_cache_visible` | effects: `first_contact_made: true`
Consumable: this scene fires once (`first_contact_made` blocks re-entry).
NPCs present: companion(s).

### Scene: `raider_scouts_arrive`
Purpose: Three Iron Sons scouts in road-leathers want a tax. Beat 4a.
Choices:
- "Pay them — give them half the diner" → `diner_hub` | gating: none | effects: `raider_tribute_paid: true`, `raiders_contact: true` (HUD: "Raiders Met")
- "Stand them down" → branch | gating: STR 7 [grey-out] (STR 6 if `vault_suit_upgraded`; -1 further if `read_raider_sign`) | effects on success: `raiders_contact: true`, `raiders_respect: true` → `diner_hub` | on failure: `raiders_contact: true`, `radiation_sick: true` (if not already), `morale_cracking: true` (if companions/group), dining-room loot lost (flavour) → `diner_hub`
- "Talk to their boss" → branch | gating: CHR 6 [grey-out] (-1 if `read_raider_sign`) | effects on success: `raiders_contact: true`, `invited_to_raider_camp: true` → `diner_hub` | on failure: same as Stand-them-down failure
- "Have the residents show themselves at the windows" → `diner_hub` | gating: hidden without `diner_organised` AND `led_evacuation`; CHR 4 [grey-out] | effects on success: `raiders_contact: true`, `raiders_wary: true` | on failure: same as Stand-them-down failure
Consumable: scene-internal — Beat 4 `first_contact_made` blocks re-route here.
NPCs present: three Iron Sons scouts (unnamed); companion(s); residents if group.

### Scene: `salvager_emissary_arrives`
Purpose: Hatch arrives, polite, offers water. Beat 4b.
Choices:
- "Thank her and accept the canteen" → `diner_hub` | gating: none | effects: `met_hatch: true`, `salvager_contact: true` (HUD: "Salvagers Met"), `hatch_gift: true`
- "Wave her off without taking it" → `diner_hub` | gating: none | effects: `met_hatch: true`, `salvager_contact: true`, `refused_hatch_gift: true`
- "Let Doc speak first" → `diner_hub` | gating: hidden without Doc present | effects: `met_hatch: true`, `salvager_contact: true`, `hatch_gift: true`, `doc_vouches_for_hatch: true` (convergent with accept — adds vouches flag)
NPCs present: Hatch; companion(s); residents if group.

### Scene: `solo_scavenge_run`
Purpose: weighted random local wreck table. Beat 4c.
Choices:
- "Walk the wrecks" → weighted (consumable table — `scavenged_local: true` set on entry):
  - `scavenge_uneventful` (3)
  - `scavenge_lucky` (1)
  - `scavenge_bandit` (2)
  - `scavenge_corpse` (1)
  - `scavenge_raider_eye` (1)
NPCs present: companion(s).

### Scene: `scavenge_uneventful`
Choices:
- "Head back" → `diner_hub` | gating: none | effects: `scavenged_local: true`
NPCs present: companion(s).

### Scene: `scavenge_lucky`
Purpose: working sidearm in a glove box.
Choices:
- "Pocket it and head back" → `diner_hub` | gating: none | effects: `scavenged_local: true`, `has_pistol: true` (HUD: "Service Pistol")
NPCs present: companion(s).

### Scene: `scavenge_bandit`
Purpose: lone scavenger ambush. Permadeath if already `radiation_sick`.
Choices:
- "Fight him off" → branch | gating: STR 5 [grey-out] | effects on success: `scavenged_local: true`, `has_pistol: true` → `diner_hub` | on failure with `radiation_sick`: → `scavenge_bandit_death` (permadeath) | on failure without: `scavenged_local: true`, `radiation_sick: true` → `diner_hub`
- "Outflank him" → branch | gating: PER 6 [grey-out] | effects on success: same as STR success | on failure: same as STR failure (convergent)
- "Back off slowly" → `diner_hub` | gating: none | effects: `scavenged_local: true`
NPCs present: lone scavenger (unnamed); companion(s).

### Scene: `scavenge_bandit_death`
Choices: [] (terminal — collapse on the way back).

### Scene: `scavenge_corpse`
Purpose: Salvager corpse with a half-burned letter.
Choices:
- "Read it and head back" → `diner_hub` | gating: none | effects: `scavenged_local: true`, `read_salvager_letter: true`
NPCs present: companion(s).

### Scene: `scavenge_raider_eye`
Purpose: a raider scout watches from a distance. Sets up next-sleep raider arrival.
Choices:
- "Head back without engaging" → `diner_hub` | gating: none | effects: `scavenged_local: true`, `raiders_aware: true`, `raiders_contact: true` (HUD: "Raiders Met")
NPCs present: distant Iron Sons scout.

### Scene: `cache_recovery`
Purpose: two-hour walk north. Hidden without `surface_cache_visible`.
Choices:
- "Press on to the cache" → weighted (consumable — `cache_attempted: true` set on entry):
  - `cache_clean` (3)
  - `cache_squatters` (2)
  - `cache_trap` (1)
NPCs present: companion(s).

### Scene: `cache_clean`
Purpose: stash intact.
Choices:
- "Take what you can carry and head back" → `diner_hub` | gating: none | effects: `cache_attempted: true`, `surface_cache_found: true` (HUD: "Surface Cache")
NPCs present: companion(s).

### Scene: `cache_squatters`
Purpose: three feral scavvers got there first.
Choices:
- "Drive them off" → branch | gating: STR 6 [grey-out] (STR 5 with `vault_suit_upgraded`) | effects on success: `cache_attempted: true`, `surface_cache_found: true`, `radiation_sick: true` (exposure) → `diner_hub` | on failure: `cache_attempted: true`, `cache_lost: true` → `diner_hub`
- "Withdraw" → `diner_hub` | gating: none | effects: `cache_attempted: true`, `cache_lost: true` (convergent)
NPCs present: feral scavvers (unnamed); companion(s).

### Scene: `cache_trap`
Purpose: pre-war anti-personnel trap. Two-step gate; permadeath on second failure.
Choices:
- "Disarm it carefully" → branch | gating: PER 6 [grey-out] | effects on success: `cache_attempted: true`, `surface_cache_found: true` → `diner_hub` | on failure → `cache_trap_blast`
NPCs present: companion(s).

### Scene: `cache_trap_blast`
Purpose: explosion follow-up.
Choices:
- "Throw yourself flat" → branch | gating: STR 5 [grey-out] | effects on success: `cache_attempted: true` (companion may die — flavour) → `diner_hub` | on failure → `cache_trap_death`
NPCs present: companion(s).

### Scene: `cache_trap_death`
Choices: [] (terminal).

NPCs in this beat: Hatch, Iron Sons scouts (unnamed), feral scavvers (unnamed), distant scout, lone scavenger (unnamed).

---

## Beat 5 — Fork E: The Salvager Offer (and the raider counter-offer)

### Scene: `salvager_outpost`
Purpose: arrival paragraph at the Salvager outpost.
Choices:
- "Find Hatch" → `talk_hatch` | gating: none | effects: none
- "Walk back to the Diner" → `diner_hub` | gating: none | effects: none
NPCs present: Hatch (offstage in this scene; on stage at `talk_hatch`); Salvagers (unnamed).

### Conversation — `talk_hatch`
Topics: each topic loops back to `talk_hatch`, depletes via `flags_unset`. Walk-away always available.
Choices:
- "What do the Salvagers want?" → `hatch_topic_purpose` | gating: requires `flags_unset: [hatch_told_purpose]`
- "Why are you here, talking to me?" → `hatch_topic_why_you` | gating: requires `flags_unset: [hatch_told_why_you]`
- "What's east?" → `hatch_topic_east` | gating: requires `flags_unset: [hatch_told_east]`
- "Who runs the raiders?" → `hatch_topic_raiders` | gating: requires `flags_unset: [hatch_told_raiders]`
- "Tell me about the message run" → `hatch_offer_message` | gating: hidden until at least 3 of `[hatch_told_purpose, hatch_told_why_you, hatch_told_east, hatch_told_raiders]` are true; requires `flags_unset: [accepted_message_run, refused_offer]`
- "Would you trade for vault medical knowledge?" → `hatch_offer_medical` | gating: hidden without (Doc present OR `doc_clinic_open` OR `doc_notebook_carried`); requires `flags_unset: [medical_offer_resolved]`
- "Walk away" → `diner_hub` | gating: none | effects: none
NPCs present: Hatch.

### Topic scenes: `hatch_topic_purpose` / `_why_you` / `_east` / `_raiders`
Purpose: short Hatch lore drops. Each:
Choices:
- "Back to conversation" → `talk_hatch` | gating: none | effects: respective `hatch_told_*: true`
NPCs present: Hatch.

### Scene: `hatch_offer_message`
Purpose: the message-run bargain.
Choices:
- "Accept" → `accept_message_run` | gating: none | effects: `accepted_message_run: true`, `message_offer_resolved: true`
- "Refuse, but stay friendly" → `talk_hatch` | gating: CHR 5 [grey-out] | effects on success: `salvager_neutral: true`, `refused_offer: true`, `message_offer_resolved: true` | on failure: `salvager_cold: true`, `refused_offer: true`, `message_offer_resolved: true`
- "Refuse and leave" → `refuse_offer` | gating: none | effects: `refused_offer: true`, `message_offer_resolved: true`
- "I already paid the raiders. Find someone else." → `refuse_offer` | gating: hidden without `raider_tribute_paid` | effects: `salvager_cold: true`, `refused_offer: true`, `message_offer_resolved: true`
Consumable: Y (any path sets `message_offer_resolved`).
NPCs present: Hatch.

### Scene: `accept_message_run`
Purpose: Hatch hands over the sealed packet, names the contact.
Choices:
- "Take it and head back to the Diner" → `diner_hub` | gating: none | effects: none (run triggers next sleep tick / first east-bound choice)
NPCs present: Hatch.

### Scene: `refuse_offer`
Purpose: walk out of the outpost.
Choices:
- "Back to the Diner" → `diner_hub` | gating: none | effects: none
NPCs present: Hatch (offstage as you leave).

### Scene: `hatch_offer_medical`
Purpose: one-time medical-trade offer.
Choices:
- "Sell the medical data" → `diner_hub` | gating: none | effects: `sold_medical_data: true`, `followers_allied: true` (HUD: "Salvager Ally"), `medical_offer_resolved: true`; if Doc present AND not consulted → also routes through `doc_finds_out`
- "Ask Doc first" → `consult_doc` | gating: hidden without Doc present | effects: none on this scene
- "Decline" → `talk_hatch` | gating: none | effects: `medical_offer_resolved: true`
Consumable: Y.
NPCs present: Hatch.

### Scene: `consult_doc`
Purpose: aside with Doc about the trade. Doc-only.
Choices:
- "I'll tell Hatch yes — with your blessing" → `hatch_offer_medical_signed` | gating: requires `trusted_by_doc_reyes` AND `flags_unset: [radiation_sick]` (or `reyes_treated_you`) | effects: `doc_consented_medical: true`
- "Drop it" → `talk_hatch` | gating: none | effects: none
NPCs present: Doc Reyes.

### Scene: `hatch_offer_medical_signed`
Purpose: Doc-blessed sale.
Choices:
- "Hand over the notebook" → `diner_hub` | gating: none | effects: `sold_medical_data: true`, `followers_allied: true`, `medical_offer_resolved: true`
NPCs present: Hatch, Doc Reyes.

### Scene: `doc_finds_out`
Purpose: stiff aftermath if sold without consulting.
Choices:
- "Take it on the chin" → `diner_hub` | gating: none | effects: `doc_resents_you: true`
NPCs present: Doc Reyes.

### Scene: `raider_camp`
Purpose: junkyard ringed with rebar; Brask is articulate. Hidden as Diner hub destination without `invited_to_raider_camp` OR `raiders_contact`.
Choices:
- "Hear the offer" → `raider_pact_scene` | gating: none | effects: `heard_raider_offer: true`
- "Test his patience" → branch | gating: STR 7 [grey-out] | effects on success: `raiders_respect_brask: true` → `raider_camp` | on failure with `radiation_sick`: → `brask_test_death` (permadeath) | on failure without: `raiders_hostile: true` → `diner_hub`
- "Walk out" → `diner_hub` | gating: none | effects: none
NPCs present: Brask, Iron Sons crew (unnamed).

### Scene: `brask_test_death`
Choices: [] (terminal — beaten to death).

### Scene: `raider_pact_scene`
Purpose: Brask names his price.
Choices:
- "Take the pact" → `pivot_to_raiders` | gating: none | effects: `raider_pact: true` (HUD: "Raider Pact"), `raider_choice_made: true`; if `salvager_contact` → also `salvagers_betrayed: true`; if `accepted_message_run` → also `betrayed_message_run: true`, `salvagers_betrayed: true`
- "Counter-offer: I'll point you at the cache" → branch | gating: requires `surface_cache_found`; CHR 6 [grey-out] | effects on success: `raider_loose_pact: true`, `raider_choice_made: true` → `diner_hub` | on failure: `raider_choice_made: true` (Brask laughs, takes cache info, no protection) → `diner_hub`
- "Refuse" → `diner_hub` | gating: none | effects: `refused_raiders: true`, `raider_choice_made: true`
Consumable: Y (`raider_choice_made` blocks re-entry).
NPCs present: Brask.

### Scene: `pivot_to_raiders`
Purpose: walk-out under the new pact.
Choices:
- "Back to the Diner" → `diner_hub` | gating: none | effects: none
NPCs present: Brask (offstage).

### Scene: `message_run_road` (Beat 5c entry — triggered by `accepted_message_run` and east-bound travel)
Purpose: weighted random run. Companion(s) optionally accompany.
Choices:
- "Head east with the packet" → weighted:
  - `road_uneventful_msg` (2)
  - `road_iron_son_patrol` (2)
  - `road_dust_storm_msg` (1)
  - `road_brask_recognises_you` (1) — **only listed in table if `raiders_contact`** (hidden otherwise)
NPCs present: companion(s) if any.

### Scene: `road_uneventful_msg`
Choices:
- "Continue" → `message_run_handoff` | gating: none | effects: none

### Scene: `road_iron_son_patrol`
Purpose: challenged by Iron Sons.
Choices:
- "Talk past them" → branch | gating: PER 6 [grey-out] (PER 5 if `raiders_respect`; auto-pass if `raider_pact`) | effects on success: → `message_run_handoff` | on failure: → `message_run_caught`
- "Slip into the wrecks" → branch | gating: PER 5 [grey-out] | effects on success: → `message_run_handoff` (convergent) | on failure: → `message_run_caught`
- "Fight your way through" → branch | gating: STR 7 [grey-out] | effects on success: → `message_run_handoff` (convergent) | on failure: → `message_run_caught`
NPCs present: Iron Sons (unnamed); companion(s).

### Scene: `road_dust_storm_msg`
Purpose: the same dust storm. Permadeath if `radiation_sick`.
Choices:
- "Push through" → branch | gating: PER 5 [grey-out] | effects on success: `pushed_storm: true` → `message_run_handoff` | on failure with `radiation_sick`: → `road_dust_storm_death` | on failure without: → `message_run_handoff`
- "Shelter" → `message_run_handoff` | gating: none | effects: none
NPCs present: companion(s).

### Scene: `road_brask_recognises_you`
Purpose: hauled to Brask mid-run with the message in your pocket. Hidden table entry without `raiders_contact`.
Choices:
- "Hand him the message — pivot now" → `raider_pact_scene` | gating: none | effects: `heard_raider_offer: true` (and the pact-scene betrayal branch will fire normally)
- "Lie about the message" → branch | gating: CHR 7 [grey-out] | effects on success: `raiders_respect_brask: true` → `message_run_handoff` | on failure: → `message_run_caught_brask` (permadeath — Brask is not amused)
NPCs present: Brask.

### Scene: `message_run_caught_brask`
Choices: [] (terminal).

### Scene: `message_run_handoff`
Purpose: meet the embedded Salvager contact.
Choices:
- "Hand it over and slip out" → `message_run_returned` | gating: none | effects: `message_delivered: true`, `message_run_resolved: true`, `followers_allied: true`
- "Watch the alley first" → branch | gating: PER 5 [grey-out] | effects on success: `message_delivered: true`, `message_run_resolved: true`, `followers_allied: true`, `salvagers_owe_you: true` → `message_run_returned` | on failure: → `message_run_caught`
NPCs present: embedded Salvager (unnamed); companion(s).

### Scene: `message_run_caught`
Purpose: captured by Iron Sons. CHR talk-out or die.
Choices:
- "Talk your way to Brask" → branch | gating: CHR 7 [grey-out] | effects on success: `message_run_resolved: true`, `betrayed_message_run: true`, `salvagers_betrayed: true` → `raider_pact_scene` | on failure: → `message_run_executed`
NPCs present: Iron Sons (unnamed); Brask offstage.

### Scene: `message_run_executed`
Choices: [] (terminal — executed by Iron Sons).

### Scene: `message_run_returned`
Purpose: back at the Diner with the run resolved. If `loyalists_close`, the loyalists arrive during/after the run — see Beat 7B.
Choices:
- "Settle in" → `diner_hub` | gating: none | effects: none
NPCs present: companion(s).

NPCs in this beat: Hatch, Brask, Iron Sons (unnamed), embedded Salvager (unnamed), Salvagers (unnamed), Doc Reyes (consult/finds-out paths).

---

## Beat 6 — Diner Hub (recurring full form)

### Hub — `diner_hub` (recurring choice set, post-Beat 4)

Returns from: every Beat 4–5 destination, every search/companion/sleep scene.

Always-available core:
- "Rest / sleep" → `diner_settle` | gating: none | effects: none (advances to Beat 7 trigger when conditions met — see exit)
- "Search around the diner" → presents the four search sub-options; this composite choice is hidden once `searched_dining`, `searched_back`, `searched_roof`, `tried_basement` are all set
- "Step outside and look at the sky" → `step_outside` | gating: none | effects: none (repeatable colour, weighted text)

Travel destinations (gated):
- "Walk to the Salvager outpost" → `salvager_outpost` | gating: hidden without `salvager_contact` | effects: none
- "Walk to the raider camp" → `raider_camp` | gating: hidden without (`invited_to_raider_camp` OR `raiders_contact`) | effects: none
- "Scavenge the local wrecks" → `solo_scavenge_run` | gating: requires `flags_unset: [scavenged_local]`; hidden once set | effects: none
- "Walk to the cache you spotted" → `cache_recovery` | gating: hidden without `surface_cache_visible`; requires `flags_unset: [cache_attempted]` | effects: none

Companion conversation (gated):
- "Talk to Doc" → `talk_doc_diner` | gating: hidden without Doc present | effects: none
- "Talk to Yuna" → `talk_yuna_diner` | gating: hidden without Yuna present | effects: none
- "Talk to the residents" → `talk_residents` | gating: hidden without `led_evacuation`; requires `flags_unset: [morale_check_done]` (resets per sleep cycle — implementation note: clear flag on `diner_settle` cycle tick that doesn't trigger Beat 7) | effects: none

State-driven appearances:
- "Bury the basement explosion victim" → `bury_companion` | gating: hidden without `cache_trap_companion_died` (set in `cache_trap_blast` success branch when companion died) AND `flags_unset: [mourned]` | effects: `mourned: true` | consumable: Y
- "Listen to the working radio" → `listen_to_radio` | gating: hidden without `radio_working` | effects: none (repeatable; weighted random)

Hub flag-gated cosmetic shifts (no choice — affect surrounding establishing text only): `diner_organised`, `morale_cracking`, `salvager_contact`, `raider_pact`, `radio_working`, `surface_cache_found`.

Exit → `reckoning_intro` triggers when:
- Player chooses "Sleep" AND (`message_run_resolved` OR `raider_choice_made` OR `refused_offer`) — handled by `diner_settle` routing
- OR `loyalists_close` AND a sleep cycle has elapsed since it was set without resolution
- OR `morale_cracking` AND a second sleep — Beat 7 fires early, weakened
- If `reactor_stabilised`, exit routes via `diner_prep_extra` (one extra choice) before `reckoning_intro`

### Conversation — `talk_doc_diner` (Doc-only)
Topics:
- "How are you holding up?" → `doc_topic_holding` | gating: requires `flags_unset: [doc_told_holding]`
- "Tell me about the residents" → `doc_topic_residents` | gating: hidden without `led_evacuation`; requires `flags_unset: [doc_told_residents]`
- "Your notebook — what's in it?" → `doc_topic_notebook` | gating: requires `flags_unset: [doc_notebook_visible]` | effects on exhaustion: `doc_notebook_visible: true` (gates `hatch_offer_medical` if not already gated)
- "What do you make of the factions?" → `doc_topic_road` | gating: requires `flags_unset: [doc_told_road]`
- "Walk away" → `diner_hub` | gating: none
Each topic scene: "Back to conversation" → `talk_doc_diner` | effects: respective `doc_told_*: true`.
NPCs present: Doc Reyes.

### Conversation — `talk_yuna_diner` (Yuna-only)
Topics:
- "How's the radio?" → `yuna_topic_radio` | gating: requires `flags_unset: [yuna_told_radio]`
- "What do you see on the horizon?" → `yuna_topic_horizon` | gating: requires `flags_unset: [yuna_spotted_X]` | effects on exhaustion: `yuna_spotted_X: true` (-1 difficulty on Hold check)
- "Would you go back?" → branch | gating: CHR 5 [grey-out]; requires `flags_unset: [yuna_committed]` | effects on success: `yuna_committed: true` | on failure: `yuna_committed: true` (resigned — convergent flag, different text)
- "Walk away" → `diner_hub` | gating: none
NPCs present: Yuna.

### Scene: `talk_residents`
Purpose: group flavour, morale check. Group-only.
Choices:
- "Walk among them" → `diner_hub` | gating: CHR 4 [grey-out] | effects on success: `kept_morale: true` (if not already), `morale_check_done: true` | on failure: `morale_cracking: true`, `morale_check_done: true`
- "Just listen" → `diner_hub` | gating: none | effects: `morale_check_done: true` (convergent)
NPCs present: residents.

### Scene: `step_outside`
Purpose: weighted-text colour scene.
Choices:
- "Head back inside" → weighted: `outside_quiet` (2) / `outside_red_dusk` (2) / `outside_distant_horn` (1)
NPCs present: companion(s).

### Scenes: `outside_quiet` / `outside_red_dusk` / `outside_distant_horn`
Each:
Choices:
- "Back inside" → `diner_hub` | gating: none | effects: none
NPCs present: companion(s).

### Scene: `listen_to_radio`
Purpose: weighted random snippet.
Choices:
- "Tune the dial" → weighted: `radio_music` (2) / `radio_raider_chatter` (2) / `radio_cole_voice` (1) — `radio_cole_voice` listed only if `loyalists_close` (hidden otherwise)
NPCs present: Yuna (if present); companion(s).

### Scenes: `radio_music` / `radio_raider_chatter`
Each:
Choices:
- "Switch it off" → `diner_hub` | gating: none | effects: none

### Scene: `radio_cole_voice`
Purpose: confirms loyalists are real and close.
Choices:
- "Switch it off" → `diner_hub` | gating: none | effects: `confirmed_loyalists: true`
NPCs present: Cole (offstage radio).

### Scene: `bury_companion`
Purpose: solemn. State-driven, consumable.
Choices:
- "Stand a while" → `diner_hub` | gating: none | effects: `mourned: true`
NPCs present: companion(s) if any.

### Scene: `diner_prep_extra`
Purpose: extra prep scene if `reactor_stabilised`. Fires on Beat 7 trigger before `reckoning_intro`.
Choices:
- "Set bottle traps in the windows" → `reckoning_intro` | gating: PER 5 [grey-out] | effects on success: `extra_prep: true` | on failure: none (convergent — still arrive at reckoning)
- "Drill the residents on positions" → `reckoning_intro` | gating: hidden without `led_evacuation`; CHR 5 [grey-out] | effects on success: `extra_prep: true`
- "Just brace yourself" → `reckoning_intro` | gating: none | effects: none (convergent)
NPCs present: companion(s); residents if group.

NPCs in this beat: Doc Reyes, Yuna, residents, Hatch (offstage radio possibilities), Cole (radio only).

---

## Beat 7 — Fork F: The Final Reckoning

### Scene: `reckoning_intro`
Purpose: dust on the horizon, a horn or a chant or both. Routes via `final_choice_router`.
Choices:
- "Step outside and look" → `final_choice_router` | gating: none | effects: none
NPCs present: companion(s); residents if group.

### Scene: `final_choice_router`
Purpose: presents the four (or fewer) reckoning options. May also hand off to `raider_pact_visit` for the quiet variant.
Quiet-variant pre-route: if `raider_pact` AND NOT `salvagers_betrayed` AND NOT `loyalists_close` AND NOT `raiders_hostile` → auto-route to `raider_pact_visit` first; on resume, `final_choice_router` may not even fire. Otherwise:
Choices:
- "Hold the Diner" → `hold_diner` | gating: none (composite STR shown — see effects). Effective threshold: STR 6 base, modified by: `diner_organised` (-1), `morale_cracking` (+1), `has_pistol` (-1), `extra_prep` (-1), `vault_suit_upgraded` (-1), companion count (solo +2 / pair 0 / group -1), `radio_working` (-1). Grey-out shows the modified number. Effects branch in `hold_diner`.
- "Flee the Diner" → `flee_diner` | gating: none | effects: `fled_diner: true`
- "Turn the raid" → `turn_raid` | gating: hidden without (`raider_pact` OR `raider_loose_pact`) | effects branch in `turn_raid`
- "Bring back Salvager reinforcements" → `salvager_rescue` | gating: hidden without (`message_delivered` AND `followers_allied`) | effects branch in `salvager_rescue`
NPCs present: companion(s); residents if group.

### Scene: `raider_pact_visit`
Purpose: quieter variant — Brask shows up to claim his cut.
Choices:
- "Honour the pact — give him his cut" → `final_choice_router` | gating: none | effects: `raider_pact_honoured: true` (raid does not come; flow continues; reckoning proper may be skipped — route directly to `ending_router`)
- "Break the pact" → `final_choice_router` | gating: none | effects: `raiders_hostile: true` (raid will now come — back to full reckoning)
NPCs present: Brask.

### Scene: `hold_diner`
Purpose: composite STR check resolves the hold. Loyalist remnant additive.
Choices:
- "Set yourself behind the bar and fight" → branch | gating: STR composite [grey-out, modified threshold visible] | effects on success: `held_diner: true` → `loyalist_remnant_attack` if `blackmailed_cole` AND NOT `killed_cole` AND `loyalists_close` (additive +2 to a follow-up STR check); else → `ending_router` | on failure: → `hold_diner_overrun` UNLESS `salvager_rescue_arrived` queued (in which case → `salvager_rescue_save`)
NPCs present: companion(s); residents if group; offstage attackers.

### Scene: `hold_diner_overrun`
Choices: [] (terminal — permadeath).

### Scene: `salvager_rescue_save`
Purpose: rescue arrives mid-fight; survival at cost.
Choices:
- "Fall back with them" → `ending_router` | gating: none | effects: `salvager_rescue_arrived: true`, losses (residents/companions die — flavour); `held_diner` cleared (you didn't hold; they pulled you out)
NPCs present: Hatch; Salvagers; companion(s).

### Scene: `flee_diner`
Purpose: solo / pair / group flee variants.
Choices:
- "Run" → branch on entry state:
  - solo: → `ending_router` (Ghost of 34 path queued) | effects: `fled_diner: true`
  - pair (Doc): → `ending_router` | effects: `fled_diner: true`, `fled_with_doc: true`
  - pair (Yuna): → `ending_router` | effects: `fled_diner: true`, `fled_with_yuna: true`
  - group: → `ending_router` | effects: `fled_diner: true`, `abandoned_survivors: true`
- If `loyalist_remnant_attack` armed: detour through `loyalist_remnant_flee` first
NPCs present: companion(s).

### Scene: `loyalist_remnant_flee`
Purpose: loyalists hit you on the road. PER 5 to slip past.
Choices:
- "Slip past in the dust" → branch | gating: PER 5 [grey-out] | effects on success: → `flee_diner` resume → `ending_router` | on failure: → `loyalist_remnant_caught`
NPCs present: Cole loyalists; possibly Cole.

### Scene: `loyalist_remnant_caught`
Choices: [] (terminal).

### Scene: `turn_raid`
Purpose: redirect the raiders. Player picks target.
Choices:
- "Point them at the loyalists" → branch | gating: requires `loyalists_close`; PER 6 [grey-out] | effects on success: `loyalists_dead: true` → if Cole alive among them, route through `cole_final_choice` else `ending_router` | on failure: → `turn_raid_chaos`
- "Point them at the Salvagers" → branch | gating: PER 6 [grey-out] | effects on success: `salvagers_dead: true` → `ending_router` | on failure: → `turn_raid_chaos`
NPCs present: Brask offstage; companion(s).

### Scene: `turn_raid_chaos`
Choices: [] (terminal — caught between three sides).

### Scene: `salvager_rescue`
Purpose: slip out to fetch the Salvager column.
Choices:
- "Run east, hard" → branch | gating: PER 5 [grey-out] (modified -1 if `salvagers_owe_you`); if `loyalist_remnant_attack` armed and unresolved, gate becomes PER 6 (loyalists in the way) | effects on success: `salvager_rescue_arrived: true` → `ending_router` | on failure: → `salvager_rescue_late`
NPCs present: Hatch (target); Salvagers (target); loyalists if armed.

### Scene: `salvager_rescue_late`
Purpose: arrives too late. Player survives but everyone present dies.
Choices:
- "Walk back into the smoke" → `ending_router` | gating: none | effects: `rescue_too_late: true`
NPCs present: nobody alive.

### Scene: `loyalist_remnant_attack`
Purpose: additive Beat 7B. Triggers per route per Beat 6/7 routing rules. When firing standalone (not folded into the chosen action), this scene resolves the loyalists; if Cole present and survives, hands off to `cole_final_choice` from the relevant ending.
Choices:
- "Hold against them" → branch | gating: STR 6 [grey-out] (-1 if `vault_suit_upgraded`, +0 if `has_pistol` already counted, etc — show modified) | effects on success: `loyalists_dead: true`; if Cole present, route to `cole_final_choice` from the ending epilogue rather than mid-fight | on failure: → `loyalist_remnant_overrun`
NPCs present: Cole loyalists (3–4); Cole if `confirmed_loyalists`.

### Scene: `loyalist_remnant_overrun`
Choices: [] (terminal).

NPCs in this beat: Hatch, Brask, Salvagers, Iron Sons (unnamed), Cole loyalists (unnamed), Cole, Doc Reyes, Yuna, residents.

---

## Beat 8 — Endings

### Scene: `ending_router`
Purpose: silent router. Reads accumulated flags and dispatches. Resolution rules — first match wins:
1. `held_diner` AND `salvager_rescue_arrived` AND CHR ≥ 7 AND `followers_allied` → `ending_open_door`
2. `salvager_rescue_arrived` AND CHR ≥ 7 AND `followers_allied` AND NOT `held_diner` → `ending_open_door` (rescue-only variant)
3. (`loyalists_dead` OR `salvagers_dead`) AND `turn_raid` succeeded → `ending_wardens_ghost`
4. `raider_pact` AND `abandoned_survivors` AND NOT `held_diner` → `ending_wardens_ghost` (no-loyalist variant)
5. `held_diner` AND `led_evacuation` AND NOT `abandoned_survivors` → `ending_vault_reborn`
6. `held_diner` AND (Doc OR Yuna present) AND NOT `abandoned_survivors` → `ending_vault_reborn` (small-group variant)
7. `salvager_rescue_arrived` AND CHR < 7 → `ending_vault_reborn` (Salvager-assisted variant)
8. `fled_diner` OR (no faction flags AND no `held_diner`) → `ending_ghost_of_34`
9. Default → `ending_ghost_of_34`
Choices: auto-route — no buttons.
NPCs present: none.

### Scene: `ending_wardens_ghost`
Purpose: dark variant. If Cole alive among loyalists, opens with the spare/kill choice.
Choices (final flavour):
- "Spare Cole" → terminal text | gating: requires Cole alive (`loyalist_remnant_attack` resolved with Cole captured, NOT `killed_cole`) | effects: `spared_cole: true`
- "Kill Cole" → terminal text | gating: same | effects: `killed_cole: true`
- "Stand at the gate and look back" → terminal text | gating: Cole not present | effects: none
Then `choices: []` (terminal epilogue paragraph).
NPCs present: Brask; Cole (if alive); companion(s) if any.

### Scene: `ending_vault_reborn`
Purpose: communal survival.
Choices (final flavour):
- "Speak at the gathering" → terminal text | gating: none | effects: none
- "Sit at the back" → terminal text | gating: none | effects: none
Then `choices: []`.
NPCs present: Doc Reyes / Yuna / Hatch / residents per variant.

### Scene: `ending_ghost_of_34`
Purpose: solo / haunted / worst variant.
Choices (final flavour):
- "Look back at the diner one last time" → terminal text | gating: none | effects: none
- "Don't" → terminal text | gating: none | effects: none
Then `choices: []`.
NPCs present: companion(s) if pair flee variant; otherwise none.

### Scene: `ending_open_door`
Purpose: the Salvager-assisted optimistic ending.
Choices (final flavour):
- "Go back into the wasteland with the Salvagers" → terminal text | gating: none | effects: none
- "Stay and rest" → terminal text | gating: none | effects: none
Then `choices: []`.
NPCs present: Hatch, Doc and/or Yuna, residents.

NPCs in this beat: Hatch, Brask, Cole, Doc Reyes, Yuna, residents.

---

## NPCs in this act

- **Hatch** — Salvager liaison. First appears `salvager_emissary_arrives` (Beat 4b). Recurs in `salvager_outpost`, `talk_hatch`, `hatch_topic_*`, `hatch_offer_message`, `hatch_offer_medical`, `hatch_offer_medical_signed`, `accept_message_run`, `refuse_offer`, `salvager_rescue`, `salvager_rescue_save`, `ending_open_door`, `ending_vault_reborn` (Salvager-assisted variant).
- **Brask** — Iron Sons boss. First *named* in `hatch_topic_raiders` (Beat 5a). First *seen* in `raider_camp` (Beat 5b). Recurs in `raider_pact_scene`, `pivot_to_raiders`, `road_brask_recognises_you`, `raider_pact_visit`, `ending_wardens_ghost` epilogue.
- **Doc Reyes** — companion if Exit 3 / Exit 5 with notebook. Appears in `open_with_doc`, `doc_clinic`, `talk_doc_diner` and topic scenes, `consult_doc`, `hatch_offer_medical_signed`, `doc_finds_out`, ending epilogues.
- **Yuna** — companion if Exit 4 / Exit 5. Appears in `open_with_yuna`, `yuna_radio`, `talk_yuna_diner` and topic scenes, ending epilogues.
- **Warden Aldric Cole** — antagonist carry-over. Voice on the radio in `road_cole_voice`, `radio_cole_voice` (gated). In person in `loyalist_remnant_attack` (gated by `confirmed_loyalists`) and possibly the Cole spare/kill final choice in `ending_wardens_ghost` / `loyalist_remnant_flee` aftermath.
- **Cole loyalists** (unnamed, 3–4) — appear in `loyalist_remnant_attack`, `loyalist_remnant_flee`, `loyalist_remnant_caught`, `loyalist_remnant_overrun`.
- **Iron Sons scouts / crew** (unnamed, recurring set-dressing) — `raider_scouts_arrive`, `raider_camp`, `road_iron_son_patrol`, `message_run_caught`, `message_run_executed`, `brask_test_death`.
- **Salvagers** (unnamed) — `salvager_outpost`, `salvager_rescue`, `salvager_rescue_save`, ending epilogues. One named role: the **embedded Salvager contact** in `message_run_handoff` — single-scene speaking part, no recurrence.
- **Residents** (unnamed, group only) — `open_with_mob`, `talk_down_returner`, `organise_watches`, `talk_residents`, ending epilogues per variant.
- **Lone scavenger** (unnamed) — `scavenge_bandit`. Single scene.
- **Feral scavvers** (unnamed) — `cache_squatters`. Single scene.
- **Distant raider scout** (unnamed) — `scavenge_raider_eye`. Single scene; sets the next-cycle arrival.

No new named NPCs are required beyond what is already in `cast.md`. The embedded Salvager contact in `message_run_handoff` is intentionally unnamed — a brief speaking role, not a recurring character.
