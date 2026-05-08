# The Long Walk Out — Act 3 Scenes

> Convergent framings (cautious / blunt / sly etc.) are marked explicitly so Stage 5 writes them as genuinely distinct postures, not three rephrasings of the same line.
>
> Atmosphere rule (load-bearing): Act 3 presses on every beat without exception. Every scene below carries a proximity cue in its purpose line. The marina is being slowly overrun across the act — fence rattling in Beat 15/16, a back-fence section pulled down in Beat 17, the floating dock taking weight by Beat 18. There is no clean safe room anywhere in this act. Conversations are clipped — characters stop mid-word at sounds; rest is borrowed minutes. Even the boathouse's relative-quiet beat ends with a fresh proximity cue (the shambler on the roof) per the brief.
>
> Humans-as-threat (load-bearing): Vance is the prototype Act 3 antagonist — colder than Hollis, tells are environmental (clipboard, body on the floating dock, single key on a lanyard, the radio loop on the wrong frequency). Tomás is the openness-rewards counterpoint — accurate reads on the player used to *help*, not to count. Misreading either has consequences: trusting Vance blind = losing a companion as the cruiser's price; refusing Tomás reflexively = losing the kayak, and on α/β losing the second-child recovery door.
>
> Difficulty (load-bearing): Every death below names the discernible mistake. D-Marina-overrun = *you waited*; D-Swim = *you knew the water and you went anyway*; D-Split = *you tried to do both*; D-Bitten-marina = *you tried to lie to a woman who keeps a clipboard*; D-Marina-collaborator = *you said yes a second time*. Each death scene points back at a tell that was visible upstream.
>
> Endings priority (per `act-3.md`): E6 → E5 → E3 → E4 → E7 → E2 → E1. The router scene (`endings_router`) implements this priority; death endings short-circuit before the living-endings table is read.

---

## Act 3 Entry — five entry framings (single beat with branching prose)

### Scene: `act3_entry_router` (engine routing — single forced choice)
Purpose: Router from Act 2's five exit hand-offs (`exit_alpha_cold_solo` … `exit_epsilon_mara_plus_one`) into Beat 15 (the gate) with the correct entry framing. Pacing/engine beat. Stage 5 writes only one block of "the arterial ends at a chain-link gate; the river is loud; the dead are still behind you" before resolving.
Choices:
- "Walk to the gate." → branches by Act 2 exit flag combination:
  - α (Cold Solo) → `entry_alpha_cold`
  - β (Broken Solo) → `entry_beta_broken`
  - γ (Mara alone) → `entry_gamma_mara`
  - δ (One adult) → `entry_delta_adult`
  - ε (Mara + adult) → `entry_epsilon_warm`
  | gating: none | effects: none | consumable: N
NPCs present: depends on exit. The chord of the city has caught up by attrition; the marina's far-jetty group is audible on the water.

### Scene: `entry_alpha_cold`
Purpose: Cold-solo framing. First-person creep, narration tighter than usual. The dead companions are not named — the player sees one image each (Dale's wedding band on a hand that wasn't there, Caleb's lanyard on a corpse that wasn't his, Ruth's stained cuff). The river smells wrong before it sounds wrong. Locks toward E1 unless `found_second_child` opens the narrow door at Beat 17.
Choices:
- "Keep walking. Eyes down." → `gate_approach` | (convergent — head-down, no hope) | gating: none | effects: none | consumable: N
- "Look up. Count the gate guards. Count the boats." → `gate_approach` | (convergent — sly, calculating; the cold-solo player who has stopped feeling can still *count*) | gating: none | effects: none | consumable: N
- "Stop. Listen for one thing that isn't them." → `gate_approach` | (convergent — last-grasp; small flavour flag for Stage 5 to surface in the boathouse if `found_second_child` fires) | gating: none | effects: sets `listened_for_living` | consumable: N
NPCs present: none on-page. Far-jetty group audible across the water; cul-de-sac chord at the back. (Proximity cue.)

### Scene: `entry_beta_broken`
Purpose: Broken-solo framing. Companions named in past tense in single sober lines. Narration trusts the player. Carries the hidden hook for Act 3 — if the player rescues a stranger or child at Beat 17 the run can climb to E3 (Pip on the kayak). Otherwise routes to E2.
Choices:
- "Keep moving. They wouldn't want you to stop." → `gate_approach` | (convergent — duty) | gating: none | effects: none | consumable: N
- "Say their names out loud. Once each." → `gate_approach` | (convergent — grief; sets `said_their_names` flavour flag — Stage 5 surfaces in Pip's boathouse line) | gating: none | effects: sets `said_their_names` | consumable: N
- "Promise the next person you meet that you'll do better." → `gate_approach` | (convergent — vow; small `bond +1` — even alone, the player has not broken themselves) | gating: none | effects: `bond +1` | consumable: N
NPCs present: none on-page. A motorbike alarm three streets back, slowing — the dead are working it out. (Proximity cue.)

### Scene: `entry_gamma_mara`
Purpose: Mara at the player's side, holding the strap of the bag the way the cast established. She has not asked about the dark yet. Every sound the player notices, she notices first by half a beat. Routes toward E3.
Choices:
- "Hold her hand. Walk her in." → `gate_approach` | (convergent — protective) | gating: none | effects: `bond +1` | consumable: N
- "Tell her plainly: stay close, don't speak unless I tell you to." → `gate_approach` | (convergent — pragmatic) | gating: none | effects: none | consumable: N
- "Crouch. Eye level. Tell her you see her." → `gate_approach` | (convergent — emotional; surfaces a quiet bond beat) | gating: none | effects: `bond +1` | consumable: N
NPCs present: Mara. A pigeon dead on the asphalt — Mara looks at it twice. (Proximity cue.)

### Scene: `entry_delta_adult`
Purpose: One adult of {Caleb, Ruth, Wren} at the player's side. The framing leans on the companion's specific voice. No Mara. Routes toward E4 (companion-flavoured); opens E6 on sacrifice.
Choices:
- "Walk in shoulder-to-shoulder. They've earned it." → `gate_approach` | (convergent — equal) | gating: none | effects: none | consumable: N
- "Half a step behind. Let them read the gate first." → `gate_approach` | (convergent — trust their instincts; small `bond +1`) | gating: none | effects: `bond +1` | consumable: N
- "Tell them: whatever happens, the bag goes with whichever of us makes it." → `gate_approach` | (convergent — pact; sets `made_pact` flavour flag — surfaces at Beat 18 cruiser-companion variant) | gating: none | effects: sets `made_pact` | consumable: N
NPCs present: one of {Caleb, Ruth, Wren}. Stage 5 conditions framing prose on the relevant `*_alive` flag. (Proximity cue: the companion notices the far-jetty group first.)

### Scene: `entry_epsilon_warm`
Purpose: Mara plus one adult. The closest the run ever gets to a *family*. The prose must not let this read as safe — by the end of Beat 15 something at the marina has already gone wrong for someone. Routes toward E5; E6 reachable on `bond ≥ 5`.
Choices:
- "Bag on Mara, adult half a step ahead. Move." → `gate_approach` | (convergent — formation; the closest the run will get to a *team*) | gating: none | effects: none | consumable: N
- "Stop the three of you. Look at each other once. Then move." → `gate_approach` | (convergent — emotional; the only beat in the run where the player can let this be a moment) | gating: none | effects: `bond +1` | consumable: N
- "Whisper the gate plan. Names. Roles." → `gate_approach` | (convergent — pragmatic; sets `gate_plan` flavour flag — Stage 5 surfaces at gate as the player having a tell *of their own* that Vance reads) | gating: none | effects: sets `gate_plan` | consumable: N
NPCs present: Mara plus one of {Caleb, Ruth, Wren}. The far-jetty group is still working through the parked jet ski. (Proximity cue.)

---

## Beat 15 — The river (gate, dock crew first contact)

### Scene: `gate_approach`
Purpose: The arterial spills onto the marina's landside fence. Two of Vance's people at the gate — Sully on the clipboard, Marrow at the perimeter. The radio in the booth plays a thin loop. Player is *seen* before they can hide. The body on the floating dock is visible past the gate — fifty feet on, one small shoe missing. Three player approaches at the gate.
Choices:
- "Walk up plain. Answer the questions. Show the bag." → `gate_cooperate` | gating: none | effects: sets `met_dock_crew`, sets `dock_crew_logged` | consumable: N
- "Walk up thin. Undersell. Hide what you can." → `gate_lie_low` | gating: none | effects: sets `met_dock_crew`, sets `dock_crew_suspicious`, `supplies -1` (stash before approaching — narrated as the cost of lying) UNLESS `stranger_alive` (Wren takes Mara round the side — no supply cost; Stage 5 conditions the prose) | consumable: N
- "Turn back. Find a way around the fence." → `gate_refuse` | gating: none | effects: sets `gate_refused` | consumable: N
NPCs present: Sully (clipboard), Marrow (perimeter pole-pusher; she walks off mid-conversation to push a shambler off the floating dock). Body on the floating dock visible at distance. The fence rattles once during the conversation. (Proximity cue.)

### Scene: `gate_cooperate`
Purpose: Sully writes the player's headcount and supply-load on the clipboard. The bureaucracy *tell* — predators make spreadsheets here. The radio loop is on the wrong frequency (the careful player who survived Beat 12 has the grammar to read this). Vance will know the player's exact load at Beat 18.
Choices:
- "Step inside. Walk past the body without looking." → `marina_hub` | (convergent — `bond +0`, narration weight) | gating: none | effects: none | consumable: N
- "Step inside. Look at the body. Make the guard see you look." → `marina_hub` | (convergent — confrontation; small bond gain — you refused to pretend; Sully writes a second note on the clipboard, `vance_warned` flavour flag) | gating: none | effects: `bond +1`, sets `vance_warned` | consumable: N
- "Step inside. Ask whose shoe." → `marina_hub` | (convergent — quiet; Sully does not answer but glances at Marrow; sets `vance_warned`) | gating: none | effects: sets `vance_warned` | consumable: N
NPCs present: Sully, Marrow, body on the floating dock. (Proximity cue: Marrow walking off mid-sentence to deal with the fence; her job is the body.)

### Scene: `gate_lie_low`
Purpose: The crew lets the player in but Marrow watches. `dock_crew_suspicious` set. Worse Beat 18 framing if not cleared at the hub. If `stranger_alive`, Wren takes Mara around the side — Stage 5 narrates this as her own competence.
Choices:
- "Walk in steady. Don't react to her watching." → `marina_hub` | (convergent — cool) | gating: none | effects: none | consumable: N
- "Walk in. Make a small joke. Disarm." → `marina_hub` | (convergent — sly; risky — Marrow is not Hollis and does not laugh; sets `marrow_marked` — Stage 5 surfaces a worse Beat 17 framing where Marrow is the one who watches the player during the breach) | gating: none | effects: sets `marrow_marked` | consumable: N
- "Walk in. Stop. Look back at her once. Hold it." → `marina_hub` | (convergent — staring contest; reads as guilt to her, but earns a sliver of respect — small flavour flag, surfaces in `talk_vance` topic 2 framing) | gating: none | effects: sets `held_marrow_eye` | consumable: N
NPCs present: Sully, Marrow. (Proximity cue: the radio loop, audible through the booth window.)

### Scene: `gate_refuse`
Purpose: The long way along the seawall. Costs `1 supply`. If `supplies ≤ 1` going in, costs `1 health` (exhaustion). Sets `gate_refused`. Vance does not see the player until Beat 18 — opens a different Beat 18 framing where the player has the *first* read on her.
Choices:
- "Take the seawall slow. Don't get spotted." → `marina_hub_via_seawall` | (convergent — patient) | gating: none | effects: `supplies -1`, `health -1` if `supplies <= 1` | consumable: N
- "Take the seawall fast. Get this over with." → `marina_hub_via_seawall` | (convergent — blunt; Stage 5 narrates a near-miss with the far-jetty group, `health -1` regardless) | gating: none | effects: `supplies -1`, `health -1` | consumable: N
- "Hug the wall. Stop and listen for them every twenty feet." → `marina_hub_via_seawall` | (convergent — cautious; same supplies cost, no extra health cost) | gating: none | effects: `supplies -1` | consumable: N
NPCs present: none on-page. Far-jetty group audible and visible at intervals; the seawall body of the marina is *between* the player and Vance's gate. (Proximity cue.)

### Scene: `marina_hub_via_seawall`
Purpose: Engine routing — the seawall route arrives at the marina hub but bypasses the office. The player has not been logged. Sets `arrived_seawall`.
Choices:
- "Slip onto the apron." → `marina_hub` | gating: none | effects: sets `arrived_seawall` | consumable: N
NPCs present: none on-page. (Proximity cue: the apron's chord differs from the seawall's — the player is now *inside* the marina's frame.)

---

## Beat 16 — The marina hub

### Hub — `marina_hub`
Returns from: Each side option (`scout_boat`, `marina_office`, `seawall_tomas`) routes back here.
Purpose: Surface the climax geometry. Three side options, each visited at most once. **Hub closes when two are visited, or when the perimeter alarm fires** (engine routes to `perimeter_breach`). Short by design — the noose is closing. If the player visits all three, they have spent too much time at the hub and the perimeter alarm fires immediately on the third return. Stage 5 implements the "two side-trips" gate via per-option flags (`scouted_boat`, `visited_office`, `read_seawall`). Two flags set + return = forced route to `perimeter_breach`.

Choices:
- "Walk the floating dock. Look at the cruiser." → `scout_boat` | gating: requires `flags_unset: [scouted_boat]`, grey out | effects: sets `scouted_boat` | consumable: Y
- "Go to the office. The crew's space." → `marina_office` | gating: requires `flags_unset: [visited_office]`, grey out (also hidden if `gate_refused` AND not yet visible to Vance — Stage 5 keeps it greyed: the player can *see* the office, just hasn't gone in) | effects: sets `visited_office` | consumable: Y
- "Walk to the seawall. The other group." → `seawall_tomas` | gating: requires `flags_unset: [read_seawall]`, grey out | effects: sets `read_seawall` | consumable: Y
- "Drive the truck to the boathouse — bypass the seawall." → `truck_to_boathouse` | gating: requires `has_keys`, `flags_unset: [drove_truck_marina]`, hide_if_failed (existence is not a spoiler, but the player without `has_keys` does not see this option at all; Stage 5: hidden) | effects: clears `has_keys`, sets `drove_truck_marina`, sets `boathouse_seen` | consumable: Y
- (Forced exit when two of {`scouted_boat`, `visited_office`, `read_seawall`} are set) — engine returns from the third side option direct to `perimeter_breach` instead of looping; Stage 5 implements this in the side-option scenes' `next` branching.
NPCs present: Sully and Marrow at the perimeter; Vance in the office (or only her second if `gate_refused`); Tomás and his group at the seawall.
(Proximity cue, hub: the back-fence chord is steady throughout. Marrow is using her pole on the floating dock between options. The far-jetty group has reached the parked jet ski and is working through it. **Mara, if present, asks why** Marrow's body keeps moving in the water — the lying-or-truth choice fires in `talk_mara` Beat 17.)

### Scene: `scout_boat`
Purpose: The cruiser. Honest tells — fuel gauge visible at half a tank, capacity reading clear (four adults plus supplies, OR three adults plus a child plus supplies, OR two adults plus supplies plus distance). Marrow is on the floating dock, working. The body on the floating dock is up close here.
Choices:
- "Search the body. Take what's on it." → `scout_boat_search` | gating: none | effects: `supplies +1`, `bond -1` if Mara present (Stage 5 conditions on `child_rescued` AND `child_alive`); sets `boat_searched` | consumable: N
- "Step over. Read the cruiser's gauges and walk back." → `marina_hub` | (convergent — restraint; Stage 5 marks `bond +0` but narration weight) | gating: none | effects: sets `boat_searched` (the player has read the boat) | consumable: N
- "Ask Marrow what the body's name is." → `scout_boat_marrow` | (convergent — direct; she answers without flinching, names the body, the conversation is brief) | gating: none | effects: sets `boat_searched`, sets `marrow_named_body` (flavour — Stage 5 surfaces in `talk_vance` topic 2 framing) | consumable: N
NPCs present: Marrow on the floating dock. Mara if present. (Proximity cue: Marrow's pole-strokes; the body in the water at the seawall *not stopping moving*.)

### Scene: `scout_boat_search`
Purpose: Pacing/forced beat — what the body had on it. Single-choice exit.
Choices:
- "Pocket it. Walk back." → `marina_hub` | gating: none | effects: none | consumable: N
NPCs present: Marrow watches without speaking.

### Scene: `scout_boat_marrow`
Purpose: Pacing/forced beat — Marrow names the body. Single-choice exit. The naming is the *tell* — she keeps a notebook.
Choices:
- "Walk back to the apron." → `marina_hub` | gating: none | effects: none | consumable: N
NPCs present: Marrow.

### Scene: `marina_office`
Purpose: Vance's space. She is here if `dock_crew_logged`; her second (Sully) is here if `gate_refused`. The office has a shotgun on a peg, a child's drawing on the wall (signed with a name that is not Mara's), and the open logbook with the player's clipboard entry if `dock_crew_logged`. Opens conversation hub `talk_vance` (or `talk_sully_office` on `gate_refused`).
Choices:
- "Sit when she gestures. Listen first." → `talk_vance` | (convergent — patient) | gating: requires `dock_crew_logged` OR not `gate_refused`, hide_if_failed (player on `gate_refused` sees `talk_sully_office` instead, below) | effects: sets `met_vance` | consumable: N
- "Stay standing. Read the room before you read her." → `talk_vance` | (convergent — sly; sets `read_office` flavour — Stage 5 surfaces the drawing on the wall, the logbook, the single key on the lanyard) | gating: requires `dock_crew_logged` OR not `gate_refused`, hide_if_failed | effects: sets `met_vance`, sets `read_office` | consumable: N
- "Open with the body on the dock." → `talk_vance` | (convergent — blunt; Vance's steadiness is the tell; sets `met_vance`, primes topic 2 of `talk_vance` as the *first* topic the player asks) | gating: requires `dock_crew_logged` OR not `gate_refused`, hide_if_failed | effects: sets `met_vance`, sets `opened_with_body` | consumable: N
- "Sit. Wait for Sully to start the questions." → `talk_sully_office` | gating: requires `gate_refused`, hide_if_failed (this option only fires for the player who never met Vance at the gate) | effects: sets `met_sully_office` | consumable: N
NPCs present: Vance (or Sully if `gate_refused`). Drawing on the wall, logbook, shotgun on the peg. (Proximity cue: the radio loop is *closer* in here — louder than at the gate, and the wrong-frequency tell is unmistakable.)

### Conversation — `talk_vance`
Returns from: each topic's sub-scene back to `talk_vance`.
Purpose: Three topics, each a tell. Each depletes via `flags_unset`. Asking all three sets `read_vance` (engine-only). Walk-away always exits to `marina_hub`. Stage 5 must keep this *clipped* — Vance does not monologue; the brief contracts that.
Topics:
- "What's the price." → `talk_vance_price` | gating: requires `flags_unset: [vance_priced]` | effects: sets `vance_priced` (and on return, `talk_vance` re-renders without this option) | consumable: Y
- "The body on the dock." → `talk_vance_body` | gating: requires `flags_unset: [vance_body_asked]` | effects: sets `vance_body_asked` | consumable: Y
- "What happens after." → `talk_vance_after` | gating: requires `flags_unset: [vance_after_asked]` | effects: sets `vance_after_asked` | consumable: Y
- (Auto: when `vance_priced` AND `vance_body_asked` AND `vance_after_asked` all set, Stage 5 sets `read_vance` on the next return to `talk_vance` and re-frames the walk-away choice text accordingly.)
Walk-away: "That's enough for now." → `marina_hub` | gating: none | effects: none | consumable: N
NPCs present: Vance. (Proximity cue, every return: the fence rattles in the back stretch; one of Vance's people walks past the office door.)

### Scene: `talk_vance_price`
Purpose: Vance names the price out loud — supplies *and* a person. Reads off the clipboard if `dock_crew_logged`; estimates from looking at the player if not. Names the person if the player has multiple companions. The math is bureaucratic. Single-choice return.
Choices:
- "Back to the conversation." → `talk_vance` | gating: none | effects: `vance_priced` (already set on entry — leaving here just returns) | consumable: N
NPCs present: Vance.

### Scene: `talk_vance_body`
Purpose: She answers without flinching. Her steadiness is the tell — Hollis covered, she does not bother. Stage 5: if `marrow_named_body`, Vance does not say the name — she says "Marrow told you, did she" and writes a small thing on her own clipboard. Single-choice return.
Choices:
- "Back to the conversation." → `talk_vance` | gating: none | effects: none | consumable: N
NPCs present: Vance.

### Scene: `talk_vance_after`
Purpose: She names a cove downriver. The tell is that she is *not* offering passage — she is offering to sell the player to a place they may not survive. The radio loop frequency matches the cove's. Single-choice return.
Choices:
- "Back to the conversation." → `talk_vance` | gating: none | effects: none | consumable: N
NPCs present: Vance.

### Scene: `talk_sully_office`
Purpose: For the `gate_refused` player. Sully is in the office; Vance is at the cruiser. Sully runs the same three questions but cannot answer them himself — he writes the player's load on the clipboard for Vance to read at Beat 18. The player gets their first read on Vance *through* him. Conversation hub mirrors `talk_vance`'s topic shape but Sully deflects topic 2 (the body) and gives the cove name on topic 3 *plainly* — he has not learned to lie about it yet.
Topics:
- "What's the price." → `talk_sully_price` | gating: requires `flags_unset: [vance_priced]` | effects: sets `vance_priced` (Sully knows, and tells) | consumable: Y
- "The body on the dock." → `talk_sully_body_deflect` | gating: requires `flags_unset: [vance_body_asked]` | effects: sets `vance_body_asked` (he deflects; the *deflection* is the tell — sets `sully_seam` flavour) | consumable: Y
- "What happens after." → `talk_sully_after` | gating: requires `flags_unset: [vance_after_asked]` | effects: sets `vance_after_asked` | consumable: Y
Walk-away: "That's enough for now." → `marina_hub` | gating: none | effects: none | consumable: N
NPCs present: Sully. (Proximity cue: the radio loop is *louder* in here; Sully is not used to listening to it for this long.)

### Scene: `talk_sully_price`
Purpose: Sully reads the price off the clipboard he hasn't filled in. He knows the math. Single-choice return.
Choices:
- "Back to the conversation." → `talk_sully_office` | gating: none | effects: none | consumable: N
NPCs present: Sully.

### Scene: `talk_sully_body_deflect`
Purpose: Sully cannot answer. He says "ask Vance." The deflection is the tell — sets `sully_seam` (Stage 5: surfaces in Beat 17 if Sully is at the breach; the player can read his hesitation). Single-choice return.
Choices:
- "Back to the conversation." → `talk_sully_office` | gating: none | effects: sets `sully_seam` | consumable: N
NPCs present: Sully.

### Scene: `talk_sully_after`
Purpose: Sully names the cove plainly. Doesn't yet have Vance's grammar. Single-choice return.
Choices:
- "Back to the conversation." → `talk_sully_office` | gating: none | effects: none | consumable: N
NPCs present: Sully.

### Scene: `seawall_tomas`
Purpose: Tomás's small group at the seawall — Tomás, Iris, Hayes (silent, bandaged arm). Tomás reads the player's headcount correctly without being told (telegraphed, like Hollis — but unlike Hollis he uses the read to *help*). He has information Vance does not want shared: cruiser keys are in Vance's pocket; the half-stripped fishing boat could be made to run with two hours' work; there is a sea-kayak under the boathouse on the far side. The kayak is the seed for Beat 17.
Choices:
- "Sit. Listen to him first." → `talk_tomas` | (convergent — patient) | gating: none | effects: sets `met_tomas` | consumable: N
- "Stand. Make him say what he wants up front." → `talk_tomas` | (convergent — blunt; Tomás does not adjust — sets `pushed_tomas` flavour, surfaces in topic 3 framing as him meeting the player's bluntness without flinching) | gating: none | effects: sets `met_tomas`, sets `pushed_tomas` | consumable: N
- "Refuse him before he's spoken. Walk back." → `tomas_refused` | (a real choice: the player who is over-trained on liars by Wren and Hollis can reflexively misread Tomás. Costs the kayak coop; locks Beat 17 boathouse coop; locks E5/E6 via the kayak math.) | gating: none | effects: sets `refused_tomas`, sets `met_tomas`, `bond -1` (he was offering, and the player did not even listen) | consumable: N
NPCs present: Tomás (speaks); Iris (silent on first contact, surfaces in topic 2); Hayes (silent throughout this beat). (Proximity cue: Hayes coughing once into his sleeve; Iris's hand on the pry-bar.)

### Conversation — `talk_tomas`
Returns from: each topic's sub-scene back to `talk_tomas`.
Purpose: Three topics. Asking all three sets `read_tomas`. Topic 3 ("what you'd do") is a moral mirror — high-`bond` players hear themselves named; low-`bond` players hear the same line as a quiet accusation. Walk-away always exits.
Topics:
- "Your people. Who they are." → `talk_tomas_people` | gating: requires `flags_unset: [tomas_people_asked]` | effects: sets `tomas_people_asked` | consumable: Y
- "The boats. What you've seen." → `talk_tomas_boats` | gating: requires `flags_unset: [tomas_boats_asked]` | effects: sets `tomas_boats_asked`, sets `boathouse_seen` (he names the kayak) | consumable: Y
- "What you'd do, if it were you." → `talk_tomas_mirror` | gating: requires `flags_unset: [tomas_mirror_asked]` | effects: sets `tomas_mirror_asked` | consumable: Y
- (Auto: when all three set, Stage 5 sets `read_tomas` on next return.)
Walk-away: "Back to the apron." → `marina_hub` | gating: none | effects: none | consumable: N
NPCs present: Tomás; Iris (surfaces in topic 2); Hayes (silent unless `bond ≥ 4` AND walk-away on `read_tomas` — Stage 5 surfaces a single line from him as the player leaves: hidden flavour). (Proximity cue, every return: Hayes is sitting; Iris is standing; Tomás is somewhere between.)

### Scene: `talk_tomas_people`
Purpose: Tomás names his three. Iris steps forward and says one short line. Single-choice return.
Choices:
- "Back to the conversation." → `talk_tomas` | gating: none | effects: none | consumable: N
NPCs present: Tomás, Iris.

### Scene: `talk_tomas_boats`
Purpose: He names the cruiser keys (Vance's pocket), the half-stripped fishing boat (two hours' work), the kayak (under the boathouse). Sets `boathouse_seen`. Single-choice return.
Choices:
- "Back to the conversation." → `talk_tomas` | gating: none | effects: sets `boathouse_seen` (already set on entry — leaving here just returns) | consumable: N
NPCs present: Tomás, Iris.

### Scene: `talk_tomas_mirror`
Purpose: Tomás asks the player a question about the player and listens to the answer. Stage 5 reads `bond` and conditions framing — `bond ≥ 4` hears himself named warmly, `bond ≤ 0` hears the same line as a quiet accusation. Two convergent answer framings + one walk-off.
Choices:
- "Tell him plainly. Name the worst of it." → `talk_tomas` | (convergent — blunt; high-bond: he nods, names a bond-positive flavour `tomas_witnessed`; low-bond: silent) | gating: none | effects: sets `tomas_witnessed` if `bond >= 2` | consumable: N
- "Tell him a half-truth. Watch which half he believes." → `talk_tomas` | (convergent — sly; he hears the half you didn't say; no flag) | gating: none | effects: none | consumable: N
- "Don't answer. Wait him out." → `talk_tomas` | (convergent — silent; he waits longer than the player; small `bond -1` if the player is already low — Stage 5 conditions on `bond <= 0`) | gating: none | effects: `bond -1` if `bond <= 0` | consumable: N
NPCs present: Tomás. (Proximity cue: a far-jetty groan during the pause; both of them ignore it together.)

### Scene: `tomas_refused`
Purpose: The player walked. Sets `refused_tomas`. Pacing scene with one bond-aware framing.
Choices:
- "Back to the apron." → `marina_hub` | gating: none | effects: none | consumable: N
NPCs present: none on-page (the seawall is at the player's back).

### Scene: `truck_to_boathouse`
Purpose: `has_keys` consumable. The player drives the truck to the boathouse-side; bypasses the seawall route entirely. Sets `boathouse_seen` and a flavour `arrived_via_truck` flag (Stage 5: surfaces in Beat 17 boathouse framing as the player having a *vehicle* in their pocket — minor advantage, narration only). Forced single-choice exit. Choice vanishes from `marina_hub` after use per the structure's consumable-truck rule.
Choices:
- "Park. Get out. Walk to the boathouse." → `marina_hub` | gating: none | effects: sets `arrived_via_truck` | consumable: N
NPCs present: none on-page. (Proximity cue: the truck's idle is loud — *two* far-jetty heads turn at the engine.)

---

## Beat 17 — The perimeter breaks

### Scene: `perimeter_breach`
Purpose: Mid-afternoon of day four. The fence rattles harder; Sully shouts. **A section of the back fence is pulled down** — not by a single shambler but by weight of bodies. Vance's perimeter holds at the office and the floating dock; the back third of the apron is suddenly inside-the-wire. The dead are slow; the player has minutes, not seconds, but the marina has shrunk visibly and audibly.

The act's second turning point — *the marina's slow overrun becomes visible.*
Choices:
- "Hold the line at the breach. Fight." → `breach_fight` | (convergent — blunt) | gating: none | effects: sets `held_breach` | consumable: N
- "Fight, but smart — fall back twice, draw them into the funnel." → `breach_fight` | (convergent — sly; same `held_breach`; small flavour flag `held_breach_smart` — Stage 5 reduces health cost variant) | gating: none | effects: sets `held_breach`, sets `held_breach_smart` | consumable: N
- "Run for the boathouse." → `boathouse_run` | (the structure's "run for the kayak" branch) | gating: none | effects: none | consumable: N
- "Back to the office. Let Vance's people hold it." → `breach_back_off` | (the structure's "freeloader read") | gating: none | effects: sets `dock_crew_suspicious` (or worsens — Stage 5 conditions a worse flavour `dock_crew_marked`) | consumable: N
- "Drive the truck *into* the breach." → `breach_truck` | (hidden; only available if `arrived_via_truck` was *not* set — i.e. the truck is still parked outside the gate. Wedges the truck into the broken fence, buys the marina five minutes; consumes `has_keys`. The player has used the truck for combat, not for travel.) | gating: requires `has_keys`, `flags_unset: [drove_truck_marina]`, hide_if_failed | effects: clears `has_keys`, sets `drove_truck_marina`, sets `held_breach`, sets `truck_wedged` (flavour — Stage 5 surfaces at Beat 18 as a 5-minute reprieve; Vance respects it) | consumable: Y
NPCs present: Sully and Marrow at the breach (Marrow first to move). Vance at the office (or at the cruiser if the player did not see her). Companions if alive — Caleb / Ruth / Wren each respond differently to the breach (Stage 5 conditions framing prose). Mara, if present, is at the office wall, hands flat against it. (Proximity cue: a layered chord, more throats than the player wanted to count.)

### Scene: `breach_fight`
Purpose: Fight at the breach. Costs `1 health` (or `2 health` if `health <= 2` going in OR `0 health` if `held_breach_smart`). Earns `bond +1` if a companion is fighting alongside (Stage 5 conditions on any of `teen_alive`/`elder_alive`/`stranger_alive`). With `has_pistol`: `+0 health` cost, `-1 supplies` (ammo). Stage 5 also surfaces Vance's hidden join-the-crew offer here — but it fires as a *follow-up* scene after the breach is held.
Choices:
- "Hold until they ease off. Then look around." → `breach_resolved` | (convergent — endure) | gating: none | effects: `health -1` if NOT `held_breach_smart`; `health -2` if `health <= 2` AND NOT `held_breach_smart`; `health -0` if `held_breach_smart`; `supplies -1` if `has_pistol`; `bond +1` if companion present | consumable: N
- "Fall back when Marrow does. Trust her read." → `breach_resolved` | (convergent — defer; sets `respected_marrow` flavour flag — Stage 5 surfaces in Beat 18 as Marrow being marginally on the player's side when the cruiser leaves) | gating: none | effects: same as above + sets `respected_marrow` | consumable: N
- "Push past the line — pick a single shambler, end it personally." → `breach_resolved` | (convergent — bond cost; Stage 5 narrates a moment of becoming Hollis-shaped; `bond -1` regardless) | gating: none | effects: same as first option + `bond -1` | consumable: N
NPCs present: Sully, Marrow at the breach. Companions if alive. (Proximity cue: layered moans through the fence.)

### Scene: `breach_resolved`
Purpose: Vance arrives. Reads the result. If `held_breach` AND NOT `dock_crew_logged`, she makes the hidden offer (join the crew). Otherwise routes direct to the climax framing.
Choices:
- "Hear her out." → `vance_offer` | gating: requires `held_breach` AND `flags_unset: [dock_crew_logged]`, hide_if_failed | effects: sets `vance_offered` | consumable: N
- "Walk past her. Find your own people." → `climax_setup` | (convergent — refuse the offer implicitly; sets `refused_vance_offer`; `bond +1`) | gating: none | effects: sets `refused_vance_offer`, `bond +1` | consumable: N
- "Tell her plainly: no." → `climax_setup` | (convergent — explicit refusal; same effects; Stage 5 narrates Vance smiling once — the only time in the run) | gating: none | effects: sets `refused_vance_offer`, `bond +1` | consumable: N
NPCs present: Vance (or background). Companions. (Proximity cue: the back third of the apron is being slowly walked across by the dead.)

### Scene: `vance_offer`
Purpose: She names the offer. The geometry of accepting is the same geometry the player saw at Hollis's camp — the player who said no there will recognise it. Acceptance routes to D-Marina-collaborator if `bond <= -2`; otherwise routes to a slow-motion E1 variant via Beat 18 (the player joins the crew but lives to load the cruiser, which Stage 5 closes as E1 with collaborator framing). Refusal routes to climax setup with `refused_vance_offer` set and `bond +1`.
Choices:
- "Yes." → `climax_setup` | gating: none | effects: sets `accepted_vance_offer` | consumable: N
- "No. And don't ask twice." → `climax_setup` | (convergent — blunt refusal) | effects: sets `refused_vance_offer`, `bond +1` | consumable: N
- "No, but stay civil." → `climax_setup` | (convergent — careful refusal; same effects; Stage 5 narrates Vance writing nothing on the clipboard — a small mercy) | effects: sets `refused_vance_offer`, `bond +1` | consumable: N
NPCs present: Vance. Companions if alive. (Proximity cue: the back-fence chord has merged with the breach chord — one sound now.)

### Scene: `boathouse_run`
Purpose: Split off from the main fight, head for the seawall side. Routes by `read_tomas`, by exit framing, and by `boathouse_loud` mechanics.
Choices:
- "Reach the boathouse the way Tomás named." → branches:
  - `read_tomas` AND Exit α/β → `boathouse_alpha_beta` (the second-child recovery hook fires — Pip)
  - `read_tomas` AND Exit γ → `boathouse_gamma` (Mara recognises the kayak and the boathouse from her own escape route; `talk_mara` topic 3 — the dark — fires here)
  - `read_tomas` AND Exit δ/ε → `boathouse_delta_epsilon` (Tomás is here with the kayak ready; the buy-in)
  - NOT `read_tomas` → `boathouse_locked` (the boathouse is locked from inside; player can break in or pass)
  | gating: none | effects: none | consumable: N
NPCs present: per branch. (Proximity cue, all branches: the marina's chord behind the player; the river ahead; the boathouse itself rattles before the player reaches it — a shambler is on the roof.)

### Scene: `boathouse_alpha_beta`
Purpose: Exit α / β only. The kayak is propped; in its foot well, hiding, is a second child — Pip. Sets `found_second_child`. The careful α-cold player who set `listened_for_living` at entry hears Pip's breath before they see her — Stage 5 surfaces this. The careful β-broken player who set `said_their_names` is greeted by Pip looking up at the player with the same expression Mara had at her rescue — Stage 5 surfaces this.

This is the **author's narrow door** for the cold-solo / broken-solo brackets. Pip is *not* a Mara substitute — she has her own name, her own voice, her own ending texture.

Per the brief: this is the act's only relative-quiet beat, and it ends with a fresh proximity cue. The shambler on the roof is audible through the rafters, working out the joist seams.
Choices:
- "Pick her up. Tell her your name." → `boathouse_alpha_beta_resolve` | (convergent — protective; `bond +2`; sets `child_rescued` (engine-only retroactive — she becomes the run's child); sets `child_alive` true; sets `pip_rescued` flavour) | gating: none | effects: `bond +2`, sets `child_rescued`, sets `child_alive`, sets `pip_rescued` | consumable: N
- "Crouch. Eye level. Let her decide if she comes." → `boathouse_alpha_beta_resolve` | (convergent — emotional; `bond +2`; she comes; same effects + sets `pip_chose_you`) | gating: none | effects: `bond +2`, sets `child_rescued`, sets `child_alive`, sets `pip_rescued`, sets `pip_chose_you` | consumable: N
- "Walk past her. You can't carry another." → `boathouse_alpha_beta_pass` | (convergent — cold; `bond -2`; locks the recovery door; routes to the kayak alone or back to the climax; the cost of refusing is named in the prose) | gating: none | effects: `bond -2`, sets `passed_second_child` | consumable: N
NPCs present: Pip. (Proximity cue: the shambler on the roof.)

### Scene: `boathouse_alpha_beta_resolve`
Purpose: Pacing — the player has a child again, on a run that did not earn one. The closing image of Beat 17 here is the kayak in the player's hands, Pip half-asleep against the player's chest, the roof creaking. Routes to climax setup.
Choices:
- "To the water. Now." → `climax_setup` | gating: none | effects: none | consumable: N
NPCs present: Pip. (Proximity cue: the roof-shambler dropping a roof-tile.)

### Scene: `boathouse_alpha_beta_pass`
Purpose: Pacing — the player walks past Pip. Stage 5 names the cost: she does not call after them. Routes to climax setup with `passed_second_child` set; closing narration of any α/β ending will name her.
Choices:
- "Out the back. To the water." → `climax_setup` | gating: none | effects: none | consumable: N
NPCs present: Pip (silent at the player's back). (Proximity cue: the shambler on the roof working the joist seam.)

### Scene: `boathouse_gamma`
Purpose: Exit γ only. Mara recognises the boathouse and the kayak from her own escape route — Stage 5 surfaces the *recognition* as a quiet beat. `talk_mara` topic 3 fires here. The player can answer truthfully or lie about the dark / about her mother. Boathouse ends with the shambler on the roof.
Choices:
- "Tell her the truth about her mother." → `talk_mara_dark` | (convergent — honest; `bond +1`) | gating: requires `flags_unset: [mara_dark_asked]`, hide_if_failed | effects: sets `mara_dark_asked`, `bond +1`, sets `told_mara_truth_dark` | consumable: Y
- "Tell her her mother is somewhere safe." → `talk_mara_dark` | (the lie option; sets `lied_to_mara` again, stacks with Act 2 if already set; `bond -1`) | gating: requires `flags_unset: [mara_dark_asked]`, hide_if_failed | effects: sets `mara_dark_asked`, sets `lied_to_mara`, `bond -1` | consumable: Y
- "Tell her you don't know. And that you won't lie about it." → `talk_mara_dark` | (convergent — careful honesty; `bond +1`; the run's strongest bond beat with Mara if it lands) | gating: requires `flags_unset: [mara_dark_asked]`, hide_if_failed | effects: sets `mara_dark_asked`, `bond +1`, sets `told_mara_truth_dark` | consumable: Y
- "Pick her up. Move now. Talk later." → `boathouse_gamma_resolve` | (convergent — defer; she will ask again, on the kayak, where the player will not have time to lie; Stage 5 holds `mara_dark_asked` unset so the question fires once more in Beat 18 framing) | gating: none | effects: none | consumable: N
NPCs present: Mara. (Proximity cue: the shambler on the roof.)

### Scene: `talk_mara_dark`
Purpose: Pacing/forced beat — Mara's quiet acceptance (or quieter non-acceptance) of the player's answer. Single-choice exit to climax.
Choices:
- "Pick her up. To the kayak." → `boathouse_gamma_resolve` | gating: none | effects: none | consumable: N
NPCs present: Mara. (Proximity cue: roof-shambler.)

### Scene: `boathouse_gamma_resolve`
Purpose: Routes to climax. Sets `boathouse_coop` if Tomás's group is there (he and Iris are propping the door — Mara recognises Iris from a past she will not yet name; Stage 5 surfaces this as a flavour beat).
Choices:
- "To the water. Now." → `climax_setup` | gating: none | effects: sets `boathouse_coop` | consumable: N
NPCs present: Mara, Tomás, Iris. (Proximity cue: roof-shambler dropping a tile.)

### Scene: `boathouse_delta_epsilon`
Purpose: Exit δ / ε. Tomás is here. The kayak is in the water. He confirms his offer and asks for `1 supply` as buy-in. Iris is at the door. Hayes speaks his one line — "I'm not getting in that boat. I want her to." Stage 5 surfaces the bitten-arm tell here. Sets `boathouse_coop` true.
Choices:
- "Pay the supplies. Take the kayak." → `boathouse_delta_epsilon_resolve` | (convergent — cooperative) | gating: requires `supplies >= 1` (greyed below — the player feels the shortfall) | effects: `supplies -1`, `bond +1`, sets `boathouse_coop` | consumable: N
- "Pay. Ask Hayes if he's coming." → `boathouse_delta_epsilon_resolve` | (convergent — caring; same supplies cost; `bond +2` for asking; sets `asked_hayes` flavour — surfaces in Tomás-related closing narration) | gating: requires `supplies >= 1` | effects: `supplies -1`, `bond +2`, sets `boathouse_coop`, sets `asked_hayes` | consumable: N
- "Refuse the buy-in. Take the kayak by force." → `boathouse_loud` | (the cold-take option; Iris steps between; if the player pushes, Tomás falls back rather than fight; sets `boathouse_loud`; `bond -2`) | gating: none | effects: sets `boathouse_loud`, `bond -2`, sets `pushed_tomas_aside` | consumable: N
- "Refuse and walk back. Take Vance's price instead." → `climax_setup` | (convergent — choose Vance's route; `bond -1` for refusing kindness; locks the kayak option at climax) | gating: none | effects: `bond -1`, sets `refused_kayak` | consumable: N
NPCs present: Tomás, Iris, Hayes (one line). Companions if alive. Mara on Exit ε. (Proximity cue: roof-shambler — the *only* sound for two blocks before it; clipped conversations throughout.)

### Scene: `boathouse_delta_epsilon_resolve`
Purpose: Routes to climax with `boathouse_coop` set.
Choices:
- "To the kayak. Together." → `climax_setup` | gating: none | effects: none | consumable: N
NPCs present: Tomás, Iris, companion(s), Mara on ε.

### Scene: `boathouse_locked`
Purpose: The player did not probe Tomás. Boathouse is locked from inside. Three approaches.
Choices:
- "Break it. Loud." → `boathouse_loud` | (convergent — blunt; the entire marina hears; perimeter alarm spikes; `boathouse_loud`) | gating: none | effects: sets `boathouse_loud` | consumable: N
- "Pry the side panel. Quiet but slow." → `boathouse_quiet_attempt` | (convergent — patient; `health` gate at low) | gating: none | effects: none | consumable: N
- "Walk past. The kayak isn't worth it." → `climax_setup` | (convergent — abandon; locks the kayak option; `bond -1`) | gating: none | effects: sets `refused_kayak`, `bond -1` | consumable: N
NPCs present: none on-page. (Proximity cue: a shambler on the roof; another working the back wall on the inside.)

### Scene: `boathouse_quiet_attempt`
Purpose: The pry takes minutes. Costs `health -1` if `health <= 2` (exhaustion). Otherwise succeeds quietly. Routes to a Tomás-less variant of the kayak option — the player has the kayak but no buy-in, so no ferry math help. Stage 5 narrates Tomás's group having moved on by the time the player reaches the water.
Choices:
- "Take the kayak. Carry it to the water." → `climax_setup` | gating: none | effects: sets `kayak_solo`, `health -1` if `health <= 2` | consumable: N
- "Stop halfway — listen. Wait out a passing pack." → `climax_setup` | (convergent — patient; same; sets `kayak_solo` and a flavour `kayak_solo_clean` — Stage 5 reduces a future health cost) | gating: none | effects: sets `kayak_solo`, sets `kayak_solo_clean` | consumable: N
NPCs present: none. (Proximity cue: a pack at the seawall, audible.)

### Scene: `boathouse_loud`
Purpose: The whole marina hears. Perimeter spike. Tomás's group is dead in the boathouse if the player went in late (Stage 5: if `held_breach` AND `boathouse_loud`, Tomás's group has been overrun by the time the player gets there — narration weight, no extra mechanical cost; if NOT `held_breach`, they are alive but leaving fast). Sets `boathouse_loud` and worsens Beat 18 framing.

Routes to a hard-version kayak option at climax: requires `health >= 4` for the swim/ferry math (vs. `health >= 3` on coop).
Choices:
- "Drag the kayak out. Run." → `climax_setup` | gating: none | effects: none | consumable: N
NPCs present: depends on `held_breach`. (Proximity cue: the entire marina is now sound.)

### Scene: `breach_back_off`
Purpose: The player let Vance's people hold it. Sets `dock_crew_suspicious` (or worsens). Vance prices the player's passage *up* in Beat 18 — names a second companion or the player's pistol if `has_pistol`. Routes to climax with this flag set.
Choices:
- "Wait at the office until the shouting stops." → `climax_setup` | (convergent — passive) | gating: none | effects: sets `dock_crew_marked` if `dock_crew_suspicious` already set | consumable: N
- "Watch from the office window. Read what the crew is doing." → `climax_setup` | (convergent — observe; small flavour gain — Stage 5 surfaces a Beat 18 framing where the player has read Vance's body language; `read_office` set if not already) | gating: none | effects: sets `read_office` | consumable: N
NPCs present: Vance at the office (or Sully if `gate_refused`); companions if alive (Caleb / Ruth / Wren — each one's framing is different; Caleb especially reads the player as a freeloader). Mara, if present, watches the player's face. (Proximity cue: the breach-chord through the office wall; Mara puts her hand on the wall once.)

### Scene: `breach_truck`
Purpose: Wedge the truck into the broken fence. Five-minute reprieve. Consumes `has_keys`. Vance respects it (Stage 5: Beat 18 framing has Vance offer a *cleaner* price math — she will not name a person if the player has supplies, only the supplies). Sets `truck_wedged`.
Choices:
- "Out of the cab. Run before the dead reach the wedge." → `climax_setup` | gating: none | effects: none | consumable: N
NPCs present: Sully on the cab; Marrow at the floating dock. Companions if alive. (Proximity cue: the truck's metal stress-noise as the dead start pressing on it.)

---

## Beat 18 — The tradeoff (climax)

### Scene: `climax_setup`
Purpose: Late afternoon of day four. The perimeter has shrunk to the office, the floating dock, and the working cruiser. The far-jetty group has reached the seawall and is on the apron now. Vance is at the cruiser, keys in hand, her crew loading the last of *their* supplies. Tomás's group is at the boathouse, kayak in the water (if `boathouse_coop`). The player stands in the middle of the act's geometry with whoever is left of their party. Vance names her price out loud. Tomás (if alive) names his out loud.

This is the **single climax scene**. Choices are surfaced per prerequisite (hidden gating per the structure's contract — surface only those whose prerequisites are met).

Bitten players: Vance reads them. Most options collapse. Stage 5 conditions framing on `bitten` and reduces the choice list to bitten-specific options (see `climax_bitten` below — engine routes there directly if `bitten`).
Choices:
- (Auto: if `bitten`, route immediately to `climax_bitten` — single-choice forced transition; the player does not get the full menu. Vance has already decided.)
- "Take the cruiser. Pay Vance." → `cruiser_choose` | (convergent — pragmatic; routes to a sub-scene that asks *who* goes on the cruiser) | gating: none | effects: sets `chose_cruiser` | consumable: N
- "Take the kayak. Cross with Tomás." → `kayak_choose` | (convergent — alternative; routes to a sub-scene that asks *who* goes on the kayak and runs the trip math) | gating: requires `boathouse_coop` OR `kayak_solo` OR `boathouse_loud`, hide_if_failed (the player without any kayak access does not see this option; Stage 5: hidden) | effects: sets `chose_kayak` | consumable: N
- "Hold the dock. Let them leave." → `hold_the_dock` | gating: requires `bond >= 4` AND `supplies >= 4` AND `child_alive` AND (`teen_alive` OR `elder_alive` OR `stranger_alive`) AND `health >= 2`, hide_if_failed (per structure: existence is a spoiler) | effects: sets `held_the_dock_offered`, sets `chose_hold_dock` | consumable: N
- "Walk back. Through the gate. Into the city." → `stay_behind` | gating: requires `bond <= -1` AND `refused_tomas` AND `refused_vance_offer`, hide_if_failed (per structure: hidden) | effects: sets `chose_stay_behind` | consumable: N
- "Send them one way. Run the other yourself." → `split_attempt` | (the structure's split-up form; Stage 5 surfaces this only if `teen_alive` OR `elder_alive` OR `stranger_alive` OR `child_alive`; player must have someone to *split* from) | gating: requires (`teen_alive` OR `elder_alive` OR `stranger_alive` OR `child_alive`), grey out (player should be able to see the option to know they shouldn't take it) | effects: sets `chose_split` | consumable: N
NPCs present: Vance at the cruiser, Marrow loading, Sully on the gangplank. Tomás and Iris at the boathouse if `boathouse_coop` (Iris if Tomás dead from `boathouse_loud`). Companions if alive. Mara if `child_alive`. Pip if `pip_rescued`. (Proximity cue: the *back* of the apron is overrun in the framing prose; the player has block-by-block awareness of how close the dead are. Stage 5: this scene's prose runs across 6–8 blocks. By block four the apron back is gone; by block six, the office; by block seven the floating dock has them on it.)

### Scene: `climax_bitten`
Purpose: Bitten players. Vance has read them. She will not let them on the cruiser. The bitten player has two routes — accept death cleanly here, or attempt one more thing.
Choices:
- "Walk to the gangplank anyway." → `death_d_bitten_marina` | (Vance shoots; the boat leaves; D-Bitten-marina) | gating: none | effects: sets `chose_cruiser_bitten` | consumable: N
- "Tell Mara / your companion to go on the boat. Hold the dock yourself." → `hold_the_dock_bitten` | (the hidden bitten-E6 variant; only fires if `bond >= 4` AND a companion AND/OR Mara is alive AND a route to the cruiser still exists for them) | gating: requires `bond >= 4` AND (`child_alive` OR `teen_alive` OR `elder_alive` OR `stranger_alive`), hide_if_failed | effects: sets `held_the_dock_offered`, sets `chose_hold_dock`, sets `bitten_dock_hold` | consumable: N
- "Walk back through the gate. End it on your own terms." → `stay_behind_bitten` | (a bitten-only variant of E7; the player goes back into the city; closes to E7 with bitten flavour) | gating: none | effects: sets `chose_stay_behind`, sets `bitten_stay` | consumable: N
NPCs present: Vance, companion(s), Mara if present. (Proximity cue: the bite is now visible to everyone present; Mara, if present, asks *one question* about it.)

### Scene: `cruiser_choose`
Purpose: The player is paying Vance. Vance reads off the clipboard. The math is bureaucratic. Stage 5 conditions the available choice list strictly on companion-alive and child-alive flags — the player only sees options for parties they actually have.
Choices:
- "Solo. Just me." → `cruiser_solo_resolve` | (convergent — alone) | gating: none | effects: `supplies -3`, sets `cruiser_solo` | consumable: N
- "Mara on the cruiser. I'm with her." → `cruiser_mara_resolve` | (cruiser-with-Mara; if an adult companion is present, they are the *price* — Vance keeps them on the dock; companion-alive flag goes false) | gating: requires `child_alive`, hide_if_failed | effects: `supplies -3`, sets `cruiser_with_mara`; if any of `teen_alive`/`elder_alive`/`stranger_alive` true, set the relevant `*_alive` to false AND set `companion_sacrificed` | consumable: N
- "One adult companion. Not Mara." → `cruiser_adult_resolve` | (cruiser-with-companion; if Mara is present, she is the price — `child_alive` set false. The "what are you willing to do" axis.) | gating: requires (`teen_alive` OR `elder_alive` OR `stranger_alive`), hide_if_failed | effects: `supplies -3`, sets `cruiser_with_adult`; if `child_alive`, sets `child_alive` false AND `bond -2` | consumable: N
- "All three. Mara plus one adult. Take the threading." → `cruiser_threading_resolve` | (the rare math; structure's load-bearing) | gating: requires `child_alive` AND (`teen_alive` OR `elder_alive` OR `stranger_alive`) AND `bond >= 4` AND `supplies >= 4` AND (`has_keys` OR `refused_vance_offer`), hide_if_failed | effects: `supplies -4`, sets `cruiser_threading`; the player gives up their *own* seat — sets `player_off_cruiser` (engine-only; this is the geometry of E6 via cruiser, but Stage 5 may resolve to E5 if the player makes the *boarding* choice in `cruiser_threading_resolve`) | consumable: N
NPCs present: Vance, Marrow, Sully; companions; Mara. (Proximity cue: the dead at the dock-side bollard during the negotiation; Vance does not flinch; Marrow does.)

### Scene: `cruiser_solo_resolve`
Purpose: The player goes alone. The cruiser leaves. Routes to endings router.
Choices:
- "On the deck. Watch the marina go." → `endings_router` | gating: none | effects: none | consumable: N
NPCs present: Vance (steering; she leaves with her crew on this branch), Marrow, Sully. (Proximity cue: the marina becoming silent as the cruiser pulls; the player can hear individual moans only at the receding shore.)

### Scene: `cruiser_mara_resolve`
Purpose: Mara on the cruiser. If an adult is present, they are at the dock — alive, for now. Stage 5 narrates the goodbye in single sober lines. Routes to endings router.
Choices:
- "Hold Mara's hand. Don't look back at the dock." → `endings_router` | (convergent — protective) | gating: none | effects: none | consumable: N
- "Look back. Once. Name the companion." → `endings_router` | (convergent — grief; sets `looked_back_at_companion` flavour for closing narration) | gating: requires `companion_sacrificed`, hide_if_failed | effects: sets `looked_back_at_companion` | consumable: N
- "Tell Mara plainly: we made it. Try to mean it." → `endings_router` | (convergent — promise; small flavour for E3 closing) | gating: none | effects: sets `told_mara_made_it` | consumable: N
NPCs present: Mara; Vance steering. (Proximity cue: the dock receding, the dead reaching the bollard the player just left.)

### Scene: `cruiser_adult_resolve`
Purpose: Player and one of {Caleb, Ruth, Wren}. If Mara was present, `child_alive` is now false — Stage 5 surfaces this as the cost. Routes to endings router with E4 flavour.
Choices:
- "Sit beside them. Don't talk." → `endings_router` | (convergent — silent) | gating: none | effects: none | consumable: N
- "Make them say one full sentence on the river." → `endings_router` | (convergent — earn the closing line; sets `companion_spoke_river` for closing narration — this is the E4 payoff line per the act's contract on E4 flavours) | gating: none | effects: sets `companion_spoke_river` | consumable: N
- "Open the bag. Show them what's left." → `endings_router` | (convergent — Wren-flavour beat if `stranger_alive`; for Caleb / Ruth, becomes a "share supplies" beat; sets `bag_opened`) | gating: none | effects: sets `bag_opened` | consumable: N
NPCs present: one of {Caleb, Ruth, Wren}. Vance. (Proximity cue: the receding shore, individual moans; if `child_alive` was just set false, Stage 5 narrates the cost in a single line — *the small shoe* — without belabouring it.)

### Scene: `cruiser_threading_resolve`
Purpose: The threading. Player has paid `supplies -4`. The cruiser fits Mara plus one adult plus supplies — but only if the player gives up their seat. The choice here is whether the player *goes* (rare E5 math) or *stays* (E6 via cruiser).

Stage 5: this is the rarest math; surface it carefully. The threading uses `player_off_cruiser` as the gate — if the player tries to board, Vance counts heads and shakes her head. The player has a final choice.
Choices:
- "Step onto the gangplank. Make her count again." → `cruiser_threading_force_resolve` | (the cruiser_threading_force route — Vance reads the player; if `bond >= 5` AND `supplies >= 5`, Vance lets them on, routes to E5; else Vance shoots and routes to D-Bitten-marina-style death named `D-Threading-Fail`. Stage 5: this is the highest-stakes single click in the run.) | gating: none | effects: none | consumable: N
- "Step back. Tell Mara: go. Tell the adult: keep her." → `endings_router` | (convergent — sacrifice; the geometry of E6 via cruiser; sets `chose_hold_dock`, sets `held_the_dock_offered`) | gating: none | effects: sets `chose_hold_dock`, sets `held_the_dock_offered` | consumable: N
- "Step back. Tell them what you'd want them to remember." → `endings_router` | (convergent — sacrifice with words; same routing as above; small E6 flavour — `dock_named_them` for the closing image) | gating: none | effects: sets `chose_hold_dock`, sets `held_the_dock_offered`, sets `dock_named_them` | consumable: N
NPCs present: Vance, Mara, one of {Caleb, Ruth, Wren}. (Proximity cue: the dead at the bollard.)

### Scene: `cruiser_threading_force_resolve`
Purpose: The dice. Stage 5 routes by `bond` and `supplies`. `bond >= 5` AND `supplies >= 5`: routes to endings (E5 priority). Otherwise routes to a death scene (D-Threading-Fail — Vance shoots the player on the gangplank; Mara sees; named misjudgement: *you tried to board after she counted*).
Choices:
- (Auto: branches on `bond` and `supplies`. Single forced "step on" choice.)
- "Step on." → branches:
  - `bond >= 5` AND `supplies >= 5` → `endings_router`
  - else → `death_d_threading_fail`
  | gating: none | effects: none | consumable: N
NPCs present: Vance, Mara, one of {Caleb, Ruth, Wren}.

### Scene: `kayak_choose`
Purpose: The kayak math. Tomás (or Iris if `boathouse_loud` killed him) runs the ferry with the player. Trip math is shown to the player, not hidden. Stage 5 conditions choices on party composition. The kayak math is *visible* — the player can read what each option costs before committing.
Choices:
- "Solo. One trip. I cross alone." → `kayak_solo_resolve` | (convergent — alone) | gating: none | effects: `health -1`, `supplies -1`, sets `kayak_solo_taken` | consumable: N
- "Mara first. Then me. Two trips." → `kayak_mara_resolve` | (cruiser-equivalent for kayak; the *coming back* is a `health` gate) | gating: requires `child_alive` AND `health >= 3` (greyed visibly below 3 — per structure's "visible greyed" rule; player feels the shortfall) | effects: `health -1`, `supplies -1`, sets `kayak_with_mara` | consumable: N
- "Mara, then the adult, then me. Three trips." → `kayak_three_resolve` | (the three-trip math; ugly; the *third* trip's water has the dead in it) | gating: requires `child_alive` AND (`teen_alive` OR `elder_alive` OR `stranger_alive`) AND `health >= 4` AND `supplies >= 3` AND `boathouse_coop` (NOT `boathouse_loud` — too loud to risk three trips), hide_if_failed | effects: `health -2`, `supplies -2`, sets `kayak_three` | consumable: N
- "Adult first. Then me. Two trips. No Mara." → `kayak_adult_resolve` | (kayak-with-adult, no Mara — E4 flavour; if Mara is present, sets `child_alive` false) | gating: requires (`teen_alive` OR `elder_alive` OR `stranger_alive`), hide_if_failed | effects: `health -1`, `supplies -1`, sets `kayak_with_adult`; if `child_alive` true, sets `child_alive` false AND `bond -2` | consumable: N
- "Swim. No kayak. Just me." → `swim_attempt` | (the structure's "swim alone" — visible-but-greyed at low health, hidden if `bitten`) | gating: requires `health >= 3` AND `supplies >= 1` AND NOT `bitten`, grey out (player feels the shortfall at health < 3); hide_if_failed if `bitten` (per structure: the player's body knows it cannot make it) | effects: none yet (resolved in `swim_attempt`) | consumable: N
NPCs present: Tomás (or Iris if `boathouse_loud`), companions, Mara. (Proximity cue: the dead at the seawall edge dropping into the water; the kayak's first trip is in *moving water*.)

### Scene: `kayak_solo_resolve`
Purpose: Player crosses alone. The marina is overrun behind them. Routes to endings router.
Choices:
- "Pull onto the far bank. Look back once." → `endings_router` | gating: none | effects: none | consumable: N
NPCs present: Tomás (waving from the shore as he loads his own group on the next round). (Proximity cue: the marina's chord receding into the river's open sound; the *open sound itself* is the proximity cue — there is nothing between the player and the dead but water now.)

### Scene: `kayak_mara_resolve`
Purpose: Mara across first. Player rows back. Player swims back to dock. Player crosses alone with Mara on the far bank waiting. The *coming back* is the gate — at `health 3` exactly the player makes it; below, greyed visibly per structure.

Stage 5: implements two visible "now" choices during the math — one to row Mara, one to swim back — and a forced narrative beat between them where the marina's chord is at the dock.
Choices:
- "Row Mara across. Tell her to wait. Swim back." → `endings_router` | (convergent — pragmatic) | gating: none | effects: none | consumable: N
- "Row Mara across. Tell her you love her in case. Swim back." → `endings_router` | (convergent — emotional; sets `told_mara_love` flavour for E3 closing) | gating: none | effects: sets `told_mara_love` | consumable: N
- "Row Mara halfway. Drop her at the half-stripped fishing boat. Pip her off." → `endings_router` | (the threading variant — only if `pip_rescued`; Pip and Mara on the abandoned fishing-boat hull together briefly while the player makes the second crossing; small flavour `pip_and_mara_brief`) | gating: requires `pip_rescued`, hide_if_failed | effects: sets `pip_and_mara_brief` | consumable: N
NPCs present: Mara, Pip if `pip_rescued`, Tomás on the far bank.

### Scene: `kayak_three_resolve`
Purpose: Three trips. By the third, the marina is overrun behind the player. At `health 4` exactly, the player makes it; at `health 3` going in (after Beat 17 health costs), the player can choose to leave the third person (themselves) — that is E6's geometry via the kayak. Stage 5 implements the third-trip "stay" choice as a final hidden option that fires only if `health == 3` after the first two trips' costs.
Choices:
- "All three trips. Push." → `kayak_three_push_resolve` | (convergent — endure; if `health >= 4` going in, success — routes to endings router with E5 priority. If `health == 3` going in, the third-trip "stay" hidden option fires.) | gating: none | effects: none | consumable: N
- "Stay back on the third trip. Tell them to row from the far bank without you." → `kayak_three_stay_resolve` | (the kayak-E6 geometry; sets `chose_hold_dock`, `held_the_dock_offered`) | gating: requires `boathouse_coop` AND `bond >= 4`, hide_if_failed | effects: sets `chose_hold_dock`, sets `held_the_dock_offered`, sets `kayak_e6_variant` | consumable: N
NPCs present: Mara, one of {Caleb, Ruth, Wren}, Tomás and Iris on the far bank.

### Scene: `kayak_three_push_resolve`
Purpose: Resolves the third trip per `health`. `health >= 4`: routes to endings router (E5 priority). `health == 3`: the player makes it, but `health -1` more is taken in the water; stage 5 surfaces the *plop-and-drag* of dead in the water during the third trip.
Choices:
- "Pull. Don't stop." → `endings_router` | gating: none | effects: `health -1` if `health == 3` going in (Stage 5: condition) | consumable: N
NPCs present: Mara, adult, Tomás. (Proximity cue: the dead in the water during the third trip.)

### Scene: `kayak_three_stay_resolve`
Purpose: The kayak-E6 variant. Player stays on the dock; companion rows back from the far bank. Stage 5: closes to E6 with kayak flavour.
Choices:
- "Watch the kayak go. Pick up the pipe." → `endings_router` | gating: none | effects: none | consumable: N
NPCs present: companion (rowing away). (Proximity cue: the dead at the player's back.)

### Scene: `kayak_adult_resolve`
Purpose: Player and one adult cross. No Mara (or Mara was the price — `child_alive` set false in `kayak_choose`). Routes to endings router with E4 flavour.
Choices:
- "Cross with them. Don't speak till the far bank." → `endings_router` | (convergent — silent) | gating: none | effects: none | consumable: N
- "Make them name something they want to do after. Out loud." → `endings_router` | (convergent — earn the closing line; sets `companion_spoke_river`) | gating: none | effects: sets `companion_spoke_river` | consumable: N
NPCs present: one of {Caleb, Ruth, Wren}.

### Scene: `swim_attempt`
Purpose: The player swims. `bitten` mid-swim is fatal regardless of `health`. Otherwise routes by `health` and `supplies` (already gated at `kayak_choose`).
Choices:
- (Auto: branches on `bitten`. The player who reached this scene has `health >= 3` AND `supplies >= 1` from gating.)
- "Into the water." → branches:
  - `bitten` → `death_d_swim_bitten` (per structure: bitten is fatal mid-swim regardless of health)
  - else → `endings_router`
  | gating: none | effects: none | consumable: N
NPCs present: none on-page. (Proximity cue: the river's sound *up close*, the dock-body's plop-and-drag in the same water.)

### Scene: `hold_the_dock`
Purpose: The player stays on the floating dock with whatever weapons they have. The cruiser leaves with whoever can fit (Mara plus one adult). Stage 5: the closing is the cruiser pulling, the player on the dock with a length of pipe; if `bond >= 5`, Mara calls the player by name from the deck (the structure's load-bearing line).
Choices:
- "Watch the boat go. Don't speak." → `endings_router` | (convergent — quiet) | gating: none | effects: none | consumable: N
- "Tell them what you wanted them to remember about you. Then watch." → `endings_router` | (convergent — speak; sets `dock_named_them` for closing image) | gating: none | effects: sets `dock_named_them` | consumable: N
- "Pick up the pipe before the cruiser is out of the channel." → `endings_router` | (convergent — pragmatic; small flavour `dock_pipe_early` — Stage 5 surfaces in closing image) | gating: none | effects: sets `dock_pipe_early` | consumable: N
NPCs present: Mara on the deck, adult on the deck, Vance steering. (Proximity cue: the dead reaching the dock-side bollard during this scene; by block three of Stage 5's closing the dock has them on it.)

### Scene: `hold_the_dock_bitten`
Purpose: The bitten-E6 hidden variant. Player holds the dock *because they were going to die anyway*. The cruiser fits Mara plus one adult plus supplies (or just Mara plus supplies, depending on party). Stage 5 closes to E6 with bitten flavour — the player's last act, named, dignified.
Choices:
- "Wave them off. Then face the apron." → `endings_router` | gating: none | effects: none | consumable: N
NPCs present: Vance (steering — she does not argue with a bitten man holding the dock for her, free of charge; the math works for her), companion(s), Mara if present.

### Scene: `stay_behind`
Purpose: The player walks back through the gate, into the city. The narrator stops mid-sentence. Cold and final per structure. Routes to endings router → E7.
Choices:
- "Through the gate. Don't look back." → `endings_router` | (convergent — final) | gating: none | effects: none | consumable: N
- "Through the gate. One look back. Then walk." → `endings_router` | (convergent — almost; the player almost stays — Stage 5: surface the tell as the *almost*; same routing) | gating: none | effects: sets `e7_almost` | consumable: N
NPCs present: none on-page. The marina is at the player's back.

### Scene: `stay_behind_bitten`
Purpose: Bitten variant of E7. Same routing.
Choices:
- "Through the gate. End it on your own terms." → `endings_router` | gating: none | effects: sets `e7_bitten` | consumable: N
NPCs present: none.

### Scene: `split_attempt`
Purpose: The structure's split-up form, weaponised. The player tried to do both. Stage 5 narrates the misjudgement explicitly — *you chose to be in two places at once*. Routes to D-Split.
Choices:
- "Run for the cruiser. Tell them to take the kayak." → `death_d_split` | gating: none | effects: none | consumable: N
- "Run for the kayak. Tell them to take the cruiser." → `death_d_split` | (convergent — same misjudgement, different flavour) | gating: none | effects: none | consumable: N
NPCs present: companions, Mara, Vance, Tomás. (Proximity cue: the dead in the middle of the apron — exactly where the player has chosen to be.)

---

## Beat 19 — Endings (router + scenes)

### Scene: `endings_router` (engine routing — single forced choice)
Purpose: Reads the climax flags+stats and routes to the correct ending per the priority order **E6 → E5 → E3 → E4 → E7 → E2 → E1**. Death endings short-circuit before this router is reached (death scenes route directly from their climax sub-scenes). Stage 5: this is a flag-reading dispatcher with one forced "continue" choice.
Choices:
- (Auto: route by priority.)
- "Look at the river." → branches:
  - **E6 priority:** `chose_hold_dock` AND `child_alive` AND (`teen_alive` OR `elder_alive` OR `stranger_alive`) AND `bond >= 4` AND `supplies >= 4` AND `health >= 2` → `ending_e6_hold_dock`
  - **E6 bitten variant:** `chose_hold_dock` AND `bitten` AND `bond >= 4` AND (`child_alive` OR `teen_alive` OR `elder_alive` OR `stranger_alive`) → `ending_e6_hold_dock_bitten`
  - **E5 priority:** `child_alive` AND exactly one of {`teen_alive`, `elder_alive`, `stranger_alive`} AND `bond >= 5` AND `shared_supplies` AND NOT `killed_survivor` AND NOT `abandoned_wounded` AND (`cruiser_threading` OR `kayak_three`) → `ending_e5_three_of_us` (Stage 5 picks flavour by which `*_alive` is true)
  - **E3 priority:** `child_alive` AND no adult `*_alive` AND `bond >= 4` AND (`cruiser_with_mara` OR `kayak_with_mara`) → `ending_e3_mara_quiet`
  - **E4 priority:** exactly one of {`teen_alive`, `elder_alive`, `stranger_alive`} AND NOT `child_alive` AND (`cruiser_with_adult` OR `kayak_with_adult`) → `ending_e4_two_of_us` (flavour by `*_alive`)
  - **E7 priority:** `chose_stay_behind` → `ending_e7_stay_behind`
  - **E2 priority:** no `*_alive` true AND `bond >= 0` AND NOT `abandoned_wounded` AND NOT `killed_survivor` AND (`cruiser_solo` OR `kayak_solo_taken` OR `swim_solo`) → `ending_e2_empty_boat`
  - **E1 fallback:** else → `ending_e1_cold_walk`
  | gating: none | effects: sets `act3_complete` | consumable: N
NPCs present: per ending.

### Scene: `ending_e1_cold_walk`
Purpose: Solo, cold. Closing narration in the player's own first-person voice — narrator steps back. Per structure: "the narration is the player's own voice now, not the narrator's." Stage 5: the journal entry uses "I" for the only time in the run. If `accepted_vance_offer` AND `bond <= -2`, Stage 5 instead routes to `ending_d_marina_collaborator` from this entry — but the structure has D-Marina-collaborator as a death ending; Stage 5 handles the routing.
Choices: [] (terminal)
NPCs present: none. (Proximity cue: even on the river, the dead audible at the receding shore.)

### Scene: `ending_e2_empty_boat`
Purpose: Solo, broken. Saddest of the survives. Narrator names each dead companion in a single sober line. The river is the only sound. If `passed_second_child` (α/β passed Pip), narration names *her* too — the door the player saw and walked past.
Choices: [] (terminal)
NPCs present: none. (Proximity cue: the river's open sound; the receding shore.)

### Scene: `ending_e3_mara_quiet`
Purpose: Mara, and quiet. Mara asks one question on the river. The player answers truthfully. Closing image: her hand on the rail, her shoes still on the wrong feet. If `pip_rescued`, the closing image is *both* children — Pip and Mara — and the ending is E3-via-β (the structure's narrow door fulfilled). Stage 5 selects the flavour.
Choices: [] (terminal)
NPCs present: Mara (and Pip on β). (Proximity cue: receding shore.)

### Scene: `ending_e4_two_of_us`
Purpose: Player + one adult, no Mara. Three flavour variants gated by `*_alive`:
- **E4-Caleb** — `teen_alive`. He says one full sentence on the river — first one without "I mean" or "I don't" — the run's payoff for him.
- **E4-Ruth** — `elder_alive`. She names her son for the last time and stops.
- **E4-Wren** — `stranger_alive` AND NOT `betrayed_by_wren` AND `probed_wren`. She opens the bag in front of the player, finally — there is one more thing in it.

Darker if `killed_survivor`. Stage 5 implements as a single scene with conditional prose blocks per flavour.
Choices: [] (terminal)
NPCs present: one of {Caleb, Ruth, Wren}. (Proximity cue: the receding shore.)

### Scene: `ending_e5_three_of_us`
Purpose: Mara plus one adult. Rarest. The "near-perfect path." Mara sleeps against the adult companion; player keeps watch. If `bond >= 5`, the *naming line* fires here — "she calls you by name." If `supplies >= 5` at Beat 18, the *food line* fires — "three of us, with food."

Three flavour variants matching E4. Stage 5 overrides E4 flavour with E5 if Mara is on board.
Choices: [] (terminal)
NPCs present: Mara, one of {Caleb, Ruth, Wren}. (Proximity cue: even here, the dead audible at the receding shore — the brief's contract: there is no quiet.)

### Scene: `ending_e6_hold_dock`
Purpose: Sacrifice. Boat leaves. Player stays. Closing narration: player on the floating dock; dead reach the bollard; Mara is on the cruiser; if `bond >= 5`, she calls the player by name from the deck. The narrator does not editorialise.

If `dock_named_them`, the closing image includes the player's named-thing line. If `dock_pipe_early`, the player picks up the pipe before the cruiser is out of channel — small Stage 5 framing detail.
Choices: [] (terminal)
NPCs present: Mara on deck, adult on deck (receding). (Proximity cue: the dead at the bollard, then on the dock.)

### Scene: `ending_e6_hold_dock_bitten`
Purpose: Bitten-E6 variant. Same closing structure as `ending_e6_hold_dock` but the player's *bite* is named — the player held the dock because they were going to die anyway. Stage 5 surfaces the dignity of the choice. If `bond >= 4` and `tomas_witnessed` was set, Tomás's group is named in closing prose ("the man at the seawall, who knew").
Choices: [] (terminal)
NPCs present: Mara, adult on deck. (Proximity cue: the dead at the bollard.)

### Scene: `ending_e7_stay_behind`
Purpose: Refuse to leave. Narrator stops mid-sentence. Cold and final. Journal entry is one line.

Bitten variant (`e7_bitten`) — the player has chosen to end it on their own terms. Stage 5 narrates with one extra sober line.
Choices: [] (terminal)
NPCs present: none. (Proximity cue: the city — the player walks back into it; the chord rises.)

### Scene: `death_d_marina_overrun`
Purpose: D-Marina-overrun. Triggered if the player chose `breach_back_off` AND remained at the climax past Stage 5's eight-block window without committing to any route. Stage 5: implements as a forced timeout — the climax scene's *implicit* "loiter" path. Names the misjudgement: *you waited.* Echoes Act 1 wait-it-out by design.
Choices: [] (terminal)
NPCs present: the dead. (Proximity cue: the dead, on the dock, on the player.)

### Scene: `death_d_swim`
Purpose: D-Swim. Triggered if the player attempted swim/kayak under-resourced — caught at gating but if Stage 5's gating is bypassed by edge cases (e.g. Stage 5 picks this as a fail-safe terminal for `swim_attempt` if conditions break). Names the misjudgement: *you knew the water and you went anyway.*
Choices: [] (terminal)
NPCs present: none on-page. (Proximity cue: the dead in the water with the player.)

### Scene: `death_d_swim_bitten`
Purpose: D-Swim variant for `bitten` mid-swim. Same closing — the player's body knew. Names the misjudgement: *you took the water with the bite already counting.*
Choices: [] (terminal)
NPCs present: none. (Proximity cue: the river closing over.)

### Scene: `death_d_split`
Purpose: D-Split. The player tried to do both. The dead caught them in the middle of the apron. Companions saw. Stage 5: closing image is the player face-down on the apron with Mara on the dock and the cruiser still in the slip — the player's misjudgement is named in the companions' voices.
Choices: [] (terminal)
NPCs present: companions watching. (Proximity cue: the dead on the apron, on the player.)

### Scene: `death_d_bitten_marina`
Purpose: D-Bitten-marina. Vance shoots the player on the gangplank. The boat leaves without them. Names the misjudgement: *you tried to lie to a woman who keeps a clipboard.*
Choices: [] (terminal)
NPCs present: Vance, Marrow, Sully, companions if alive. (Proximity cue: the boat leaving — the dead reaching the gangplank.)

### Scene: `death_d_threading_fail`
Purpose: Sub-variant — player forced the cruiser-threading boarding without the `bond`/`supplies` to make Vance let them on. Vance counted twice. The shot is named: *you tried to board after she counted.* This is a sub-scene of D-Bitten-marina geometry — no bite, but the same negotiation failure with the same woman.
Choices: [] (terminal)
NPCs present: Vance, Mara, adult companion if present. (Proximity cue: Mara hearing the shot.)

### Scene: `death_d_marina_collaborator`
Purpose: D-Marina-collaborator. Slow death over the next forty-eight hours — the player has become the next gate-guard. Closing image: the player at a gate, with a clipboard, asking three questions of someone who looks the way the player did at Beat 15. Names the misjudgement: *you said yes a second time.* Stage 5: if `killed_survivor` was set in Act 2, surfaces the first time as Hollis's camp; otherwise frames as the player's first capitulation.
Choices: [] (terminal)
NPCs present: a stranger at the gate (a face the player does not know — Stage 5's mirror of Beat 15).

---

## NPCs in this act

- **Vance** — leader of the dock crew. First appears `gate_approach` (background through the fence) and `marina_office` (foreground); recurs in `talk_vance` and topics, `breach_resolved`, `vance_offer`, `climax_setup`, `cruiser_choose` and resolves, `cruiser_threading_resolve`, `hold_the_dock` (steering the boat away), `hold_the_dock_bitten` (steering), `death_d_bitten_marina`, `death_d_threading_fail`. Does not appear in any ending image as a living person; closing narration may reference her as "the woman with the clipboard." Voice: `female_adult_american_sultry_villainous`. Cast: cast.md.
- **Tomás** — leader of the small group at the seawall. First appears `seawall_tomas`; recurs in `talk_tomas` and topics, `tomas_refused`, `boathouse_delta_epsilon`, `boathouse_delta_epsilon_resolve`, `boathouse_loud` (dead if `held_breach` AND `boathouse_loud`), `kayak_choose` and resolves (running the ferry math; replaced by Iris if `boathouse_loud`), `kayak_solo_resolve`, `kayak_three_resolve`, `kayak_three_push_resolve`. Closing-narration reference if `read_tomas`. Voice: `male_elder_american_wise_approachable`. Cast: cast.md.
- **Sully** (bit-part) — Vance's gate guard / second. First appears `gate_approach`; recurs in `gate_cooperate`, `gate_lie_low`, `talk_sully_office` (and topic sub-scenes if `gate_refused`), `breach_truck`, `cruiser_solo_resolve` (background loading). No carry-over into endings. Voice: `male_adult_american_casual_relaxed_light`. Cast: cast.md (appended).
- **Marrow** (bit-part) — Vance's perimeter / pole-pusher. First appears `gate_approach`; recurs in `gate_cooperate`, `gate_lie_low` (`marrow_marked` if joke), `scout_boat`, `scout_boat_search` (silent watch), `scout_boat_marrow` (names the body), `breach_fight` (first to move), `cruiser_solo_resolve` and `cruiser_mara_resolve` (loading the boat), `death_d_bitten_marina` (background). No carry-over into endings. Voice: `female_midlife_african-american_casual_opinionated`. Cast: cast.md (appended).
- **Iris** (bit-part) — Tomás's group. First appears in `talk_tomas_people` (steps forward); recurs in `talk_tomas_boats`, `boathouse_delta_epsilon`, `boathouse_delta_epsilon_resolve`, `boathouse_loud` (silent if Tomás dead), `kayak_choose` and resolves (replaces Tomás if `boathouse_loud`). No carry-over into endings. Voice: `female_adult_american_crisp_direct_clear`. Cast: cast.md (appended).
- **Hayes** (bit-part) — Tomás's group, bandaged-arm man. First appears `seawall_tomas` (silent); recurs in `talk_tomas` framing (silent), `boathouse_delta_epsilon` (his one line), `talk_tomas` walk-away on `bond >= 4` AND `read_tomas` (his one extra hidden line). Stays at the seawall — does not get on the kayak. Closing-narration reference if `read_tomas` AND `bond >= 4` (and `asked_hayes` if set). Voice: `male_midlife_british_tough_calloused`. Cast: cast.md (appended).
- **Pip** (bit-part — α/β only) — second child in the boathouse. First appears `boathouse_alpha_beta`; recurs in `boathouse_alpha_beta_resolve`, `boathouse_alpha_beta_pass` (silent at player's back), `kayak_mara_resolve` (`pip_and_mara_brief` if threaded with rescued Mara — though γ/ε runs do not have Pip; this is a Stage 5 mutual-exclusion check), `ending_e3_mara_quiet` (β-flavour closing image), `ending_e2_empty_boat` (named in closing narration if `passed_second_child`). Voice: `female_young_american_youthful_sweet`. Cast: cast.md (appended). **Mutual exclusion:** Pip only fires on Exit α / β (where `child_rescued` is false). On γ / δ / ε runs Pip is not present at all.
- **Mara** — recurring principal. Reappears in any γ / ε scene where she's on-page: `entry_gamma_mara`, `entry_epsilon_warm`, `gate_approach` framing, `marina_hub` framing (Marrow's body on the floating dock — Mara asks why), `breach_back_off` (hand on the office wall), `boathouse_gamma`, `talk_mara_dark`, `boathouse_gamma_resolve`, `climax_setup`, `cruiser_mara_resolve`, `cruiser_threading_resolve`, `kayak_mara_resolve`, `kayak_three_resolve`, `kayak_three_push_resolve`, `hold_the_dock`, `hold_the_dock_bitten`, `ending_e3_mara_quiet`, `ending_e5_three_of_us`, `ending_e6_hold_dock` (on the cruiser deck), `death_d_threading_fail` (witness), `death_d_split` (witness on the dock).
- **Caleb / Ruth / Wren** — recurring principals. Each carries forward to Act 3 only on δ / ε runs (per Act 2 exit rules); Stage 5 conditions framing on `teen_alive` / `elder_alive` / `stranger_alive`. Reappear in: entry framings δ / ε, `gate_approach` framing, `marina_hub` framing, `breach_fight` (companion in the line), `breach_back_off` (companion's read), `boathouse_delta_epsilon` (party member), `climax_setup`, `cruiser_adult_resolve`, `cruiser_threading_resolve`, `kayak_adult_resolve`, `kayak_three_resolve`, `hold_the_dock`, `hold_the_dock_bitten`, `ending_e4_two_of_us` (flavour by `*_alive`), `ending_e5_three_of_us` (flavour by `*_alive`), `ending_e6_hold_dock` (on the cruiser deck), `death_d_split` (witness).

All names above resolve to entries in `cast.md`. Principals were drafted in Stage 2; supporting NPCs (Sully, Marrow, Iris, Hayes, Pip) introduced here have been appended to `cast.md`.

---

## Choice-density gate

Active-choice counts (excluding hidden choices, which Stage 3 doc says don't count toward the cap; greyed choices that *would* fail for the typical player don't count either). Convergent groups counted at full count.

Single-choice scenes (deliberate pacing or engine routing, justified):

- `act3_entry_router` (engine routing)
- `entry_alpha_cold` — 3 convergent (counts as 3)
- `entry_beta_broken` — 3 (3)
- `entry_gamma_mara` — 3 (3)
- `entry_delta_adult` — 3 (3)
- `entry_epsilon_warm` — 3 (3)
- `gate_approach` — 3 (3)
- `gate_cooperate` — 3 (3)
- `gate_lie_low` — 3 (3)
- `gate_refuse` — 3 (3)
- `marina_hub_via_seawall` — 1 (engine routing — justified)
- `marina_hub` — 3 active by default (3); 4 with `has_keys` (does not push past 6)
- `scout_boat` — 3 (3)
- `scout_boat_search` — 1 (pacing — forced exit, justified)
- `scout_boat_marrow` — 1 (pacing — forced exit, justified)
- `marina_office` — 3 active for typical (logged) player (3); 1 active for `gate_refused` player (`talk_sully_office` is the only fire — but the three other choices remain *visible-greyed* per structure; that's fine, the active count is the typical player's three)
- `talk_vance` (hub) — 3 topics + walk-away (4)
- `talk_vance_price` / `_body` / `_after` — 1 each (conversation-topic shape, justified per `principles.md` — adding fake convergent to a one-line topic dilutes purpose)
- `talk_sully_office` (hub) — 3 + walk-away (4)
- `talk_sully_*` topics — 1 each (justified, conversation-topic shape)
- `seawall_tomas` — 3 (3)
- `talk_tomas` (hub) — 3 + walk-away (4)
- `talk_tomas_people` / `_boats` — 1 each (conversation-topic, justified)
- `talk_tomas_mirror` — 3 (3)
- `tomas_refused` — 1 (pacing, justified)
- `truck_to_boathouse` — 1 (consumable forced exit, justified)
- `perimeter_breach` — 4 active by default (4); 5 with `has_keys` AND truck not used (the wedge option) — does not push past 6
- `breach_fight` — 3 (3)
- `breach_resolved` — 3 (one greyed-out for non-prereq player; for the typical hold-breach-without-logged player, the offer fires) (3)
- `vance_offer` — 3 (3)
- `boathouse_run` — 1 (engine routing dispatcher — branches by exit-flag combination, justified)
- `boathouse_alpha_beta` — 3 (3)
- `boathouse_alpha_beta_resolve` — 1 (pacing, justified)
- `boathouse_alpha_beta_pass` — 1 (pacing, justified)
- `boathouse_gamma` — 4 (4)
- `talk_mara_dark` — 1 (pacing — final beat of Mara's three-topic conversation, justified per principles `talk_*` topic shape)
- `boathouse_gamma_resolve` — 1 (pacing — forced exit, justified)
- `boathouse_delta_epsilon` — 4 (4)
- `boathouse_delta_epsilon_resolve` — 1 (pacing, justified)
- `boathouse_locked` — 3 (3)
- `boathouse_quiet_attempt` — 2 (3 if Stage 5 finds a third framing — see addendum below)
- `boathouse_loud` — 1 (pacing — forced run, justified)
- `breach_back_off` — 2 (Stage 5: add a third convergent — see addendum)
- `breach_truck` — 1 (pacing — forced run, justified)
- `climax_setup` — 4–6 active depending on prereqs (cruiser, kayak, hold-dock, stay-behind, split — typical player: 3–4. Maxes at 6 if every prereq met.)
- `climax_bitten` — 3 (3)
- `cruiser_choose` — up to 4 active depending on companion combos; typical: 2–3 visible
- `cruiser_solo_resolve` — 1 (terminal pacing, justified)
- `cruiser_mara_resolve` — 3 (3)
- `cruiser_adult_resolve` — 3 (3)
- `cruiser_threading_resolve` — 3 (3)
- `cruiser_threading_force_resolve` — 1 (engine routing by `bond`/`supplies`, justified)
- `kayak_choose` — up to 5 active by combo; typical: 2–3 visible
- `kayak_solo_resolve` — 1 (terminal pacing, justified)
- `kayak_mara_resolve` — 3 (3)
- `kayak_three_resolve` — 2 (Stage 5: add a third convergent — addendum)
- `kayak_three_push_resolve` — 1 (engine routing, justified)
- `kayak_three_stay_resolve` — 1 (terminal pacing, justified)
- `kayak_adult_resolve` — 2 (Stage 5: add a third convergent — addendum)
- `swim_attempt` — 1 (engine routing by `bitten`, justified)
- `hold_the_dock` — 3 (3)
- `hold_the_dock_bitten` — 1 (terminal pacing, justified — this is the bitten dignity beat, single-line)
- `stay_behind` — 2 (Stage 5: add a third convergent — addendum)
- `stay_behind_bitten` — 1 (terminal pacing, justified)
- `split_attempt` — 2 (convergent same-misjudgement; could be 3, addendum)
- `endings_router` — 1 (engine routing, justified)
- `ending_*` scenes — 0 each (terminal)

### Addendum — bumped to ≥3 by adding a convergent framing

To avoid drifting toward single-choice habits in non-engine non-conversation-topic scenes, the following add a third convergent framing in Stage 5:

- **`boathouse_quiet_attempt`** — add: "Take the kayak. Stop once at the door, listen, then move." (convergent — patient + cautious; same routing, same effects). Now 3.
- **`breach_back_off`** — add: "Pretend you're useful. Hand things to whoever is fighting." (convergent — performative; same routing, sets `pretended_useful` flavour for Vance's Beat 18 read). Now 3.
- **`kayak_three_resolve`** — add: "All three trips. Push, but row in a wider arc — fewer bodies in the water." (convergent — sly; same routing as the push option, sets `kayak_wider_arc` flavour for closing prose). Now 3.
- **`kayak_adult_resolve`** — add: "Cross. Take the bag off your shoulder for the first time and put it between you." (convergent — gesture; same routing, sets `bag_between` flavour). Now 3.
- **`stay_behind`** — add: "Through the gate. Stop once at the body on the floating dock. Then walk." (convergent — atonement; same routing, sets `e7_stopped_at_body`). Now 3.
- **`split_attempt`** — add: "Run for both. Tell yourself you can." (convergent — denial; same routing — D-Split — different flavour line for the death's named misjudgement). Now 3.

After addendum, every non-engine non-conversation-topic non-terminal scene has ≥3 active choices.

### Average choice density (post-addendum)

Total scenes (excluding terminal endings/deaths and pure engine routers): ~35 authorable decision scenes.

Approximate active-choice sum (counting convergent groups at face): ~110 active choices across these 35 scenes.

**Average ≈ 3.1 active choices per scene.** Passes the gate (target ≥ 3.0).

Single-choice scenes are 100% justified — every one is either:
- conversation-topic shape (per `principles.md`'s "topic returns to hub" pattern),
- engine routing (read flags / dispatch),
- forced-pacing exit from a hub side-trip (one-line beat ending in "back to apron"),
- terminal ending or death scene.

No "prose with buttons" single-choice scenes remain.

---

## Act-to-act handoff (preserved)

Entry: `act3_entry_router` receives from Act 2's `exit_alpha_cold_solo` / `exit_beta_broken_solo` / `exit_gamma_mara_solo` / `exit_delta_one_adult` / `exit_epsilon_mara_plus_one` per Act 2's exit configurations. Stage 5 wires the `next` of each exit hand-off to `act3_entry_router`.

Exits: this act terminates the run. All paths route through `endings_router` to one of {E1, E2, E3, E4, E5, E6, E7} living endings or {D-Marina-overrun, D-Swim, D-Swim-bitten, D-Split, D-Bitten-marina, D-Threading-Fail, D-Marina-collaborator} death endings. `act3_complete` is set on entering any ending scene.

---

## Stage 5 author notes (carried forward)

- **Five entry framings** distinguished in prose. ε is the rarest, brightest entry; α is the cold default. Cast addendum (Pip) covers the α/β recovery hook.
- **Marina hub closes hard.** Two side-trips OR Beat 17's perimeter alarm — whichever comes first. Engine logic implemented in side-option scenes' `next` (return to hub if 0/1 sides done; route to `perimeter_breach` if 2 done).
- **Boathouse is the act's only relative-quiet beat** (Beat 17 boathouse-coop branch) — and per the brief, it ends with a fresh proximity cue (the shambler on the roof). Stage 5 must not violate this on any branch, including ε.
- **Vance's "join us" offer is hidden** — surface only via `breach_resolved`'s gating (`held_breach` AND NOT `dock_crew_logged`). Per structure's hidden-choice rule.
- **The dock-hold option is hidden** — surfaced only by `climax_setup`'s strict prereqs.
- **The swim/kayak greyed gates are visible** at low health — per structure's greyed-vs-hidden rule the player should *feel the shortfall* at `health < 3`. Stage 5: greyed in `kayak_choose` for the swim and `kayak_with_mara` options.
- **Bitten players have a different Beat 18.** Engine auto-routes `climax_setup` → `climax_bitten` if `bitten` is set. Three options surface — gangplank attempt (D-Bitten-marina), bitten-E6 (hold the dock with the dignity of impending death), bitten-E7 (stay behind). The `bond >= 4` E6 hidden variant is the brightest exit available to a bitten player.
- **Tomás does not survive** as a companion-alive flag. He is offer-and-mirror, not recruit. He may die in `boathouse_loud` if `held_breach`. Iris carries his role at `kayak_choose` if he is dead.
- **Vance does not survive the act.** She leaves on the cruiser if the player did not take it (off-page death later, narration may reference); she dies at the dock if the player did. She is not in any ending's frame.
- **Closing-narration layering.** Each ending's closing prose names which companions died and how, in single sober lines, drawing on accumulated flags. Stage 5 implements a templated dead-list section before each ending image.
- **Proximity-pressure does not let up** — even E5's closing image is on the river with the dead audible at the receding shore. There is no quiet, anywhere.
