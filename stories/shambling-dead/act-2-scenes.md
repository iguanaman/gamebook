# The Shambling Dead — Act 2 Scenes

> Convergent framings (cautious / blunt / sly etc.) are marked explicitly so Stage 5 writes them as genuinely distinct postures, not three rephrasings.
>
> Atmosphere rule (load-bearing): Act 2 is where the dead become the weather. Every scene below carries a proximity cue in its purpose line so Stage 5 cannot accidentally write a clean safe room. Conversation hubs include sound interruptions; "rest" beats end with a fresh proximity cue.
>
> Humans-as-threat (load-bearing): Wren tells fire in `talk_wren` topics AND in framing prose at Beat 9, Beat 12 (silent reads), and Beat 13. Hollis's tells are environmental and behavioural, surfaced in Beat 12's hub framing and `talk_hollis_camp`. The hostile-survivors group is openly predatory — the prose flags it.
>
> Difficulty (load-bearing): Every death below names the misjudgement and points back at a tell that was visible upstream. Sewer death calls back the storm-drain prose in Act 1 Beat 6 (Caleb's bark, the route's "looks empty"). Wren betrayal preceded by 3+ readable tells. Checkpoint death is patience-or-die.

---

## Act 2 Entry — six entry framings (single beat with branching prose)

### Scene: `act2_entry_router` (engine routing — single forced choice)
Purpose: Router from Act 1's six exit hand-offs into Beat 8 with the correct framing flag set. Pacing/engine beat — single choice. Stage 5 writes only one block of "the cul-de-sac is behind you, the city's chord is louder than its loudest single throat" before resolving.
Choices:
- "Walk into the city." → branches by Act 1 exit flag combination:
  - Exit A (`neighbour_alive false`, `teen_alive false`, `abandoned_wounded` true) → `entry_a_solo_cold`
  - Exit B (`neighbour_alive false`, `teen_alive false`, `abandoned_wounded` false) → `entry_b_solo_mercy`
  - Exit C (`neighbour_alive false`, `teen_alive true`) → `entry_c_caleb`
  - Exit D (`neighbour_alive true`, `teen_alive false`) → `entry_d_dale`
  - Exit E (`neighbour_alive true`, `teen_alive true`, `dale_bitten` false) → `entry_e_clean`
  - Exit F (`neighbour_alive true`, `teen_alive true`, `dale_bitten` true) → `entry_f_poisoned`
  | gating: none | effects: none | consumable: N
NPCs present: depends on exit. Distant Screams have ended; the layered-chord moans of the city replace them.

### Scene: `entry_a_solo_cold`
Purpose: Solo / cold framing. Tighter narrator voice — first-person creep. Past-tense reference to Dale-shaped silhouette across the street. No comfort. Single-choice forced transition into Beat 8 route resolver.
Choices:
- "Keep moving." → `route_resolve` | gating: none | effects: none | consumable: N
NPCs present: none. The chord of the city is the only sound; somewhere, a single throat detached from the rest stops mid-moan when the player stops walking. (Proximity cue.)

### Scene: `entry_b_solo_mercy`
Purpose: Solo / hard mercy framing. The mercy-kill weight is referenced in one line. Player has agency; warmer narration than Exit A.
Choices:
- "Keep moving." → `route_resolve` | gating: none | effects: none | consumable: N
NPCs present: none. A pack working on a delivery van two streets over — audible.

### Scene: `entry_c_caleb`
Purpose: Caleb half a step behind, picking at his thumb. He hasn't spoken since the cul-de-sac. If `caleb_was_lied_to`, his first line surfaces as a question that proves he believed the lie — Stage 5 must deliver this tell as conditional prose.
Choices:
- "Keep moving — let him follow." → `route_resolve` | (convergent — quiet, accept his silence) | gating: none | effects: none | consumable: N
- "Stop. Tell him to stay close. Use his name." → `route_resolve` | (convergent — protective; Stage 5 marks `bond +1` here) | gating: none | effects: `bond +1` | consumable: N
- "Tell him the truth — you are not a paramedic." → `route_resolve` | (convergent — confess; only meaningful if `caleb_was_lied_to`; resets `caleb_was_lied_to` to false, `bond +1`) | gating: requires `caleb_was_lied_to`, hide_if_failed | effects: clears `caleb_was_lied_to`, `bond +1` | consumable: Y
NPCs present: Caleb. Scratching at frosted glass in a ground-floor apartment as they pass — he flinches.

### Scene: `entry_d_dale`
Purpose: Dale only. He's favouring his leg. If `dale_bitten` he is sweating, has stopped turning the wedding band. Either way he names the next street before the player asks.
Choices:
- "Let him lead. Trust the read." → `route_resolve` | (convergent — trust) | gating: none | effects: none | consumable: N
- "Stop. Make him show you the leg now." → `route_resolve` | (convergent — push; sets `saw_dale_leg` if not already; sets `dale_bitten` if it was the case) | gating: requires `flags_unset: [saw_dale_leg]`, grey out (player should know they can still ask) | effects: sets `saw_dale_leg`, `bond -1` (he hates it), confirms `dale_bitten` if applicable | consumable: Y
- "Take his weight without asking." → `route_resolve` | (convergent — silent care) | gating: none | effects: `bond +1` | consumable: N
NPCs present: Dale. A shape on a balcony two storeys up, watching them. (Proximity cue.)

### Scene: `entry_e_clean`
Purpose: Three people. Dale leads, Caleb tucked between. The closest Act 2 ever gets to a party. Narrator should signal this is borrowed. Stage 5: the beat ends with something fraying it (a sound none of them name).
Choices:
- "Stay between them. Move." → `route_resolve` | (convergent — pragmatic) | gating: none | effects: none | consumable: N
- "Set the pace. Make them keep up." → `route_resolve` | (convergent — blunt; small bond cost — Caleb hears the order in your voice) | gating: none | effects: `bond -1` | consumable: N
- "Check both of them. Names. Eyes." → `route_resolve` | (convergent — protective) | gating: none | effects: `bond +1` | consumable: N
NPCs present: Dale, Caleb. A door slamming open in an empty hallway nearby — none of them name it.

### Scene: `entry_f_poisoned`
Purpose: Same shape as E but Caleb is watching Dale, not the road. Dale is breathing through his mouth. The seam is now visible to Caleb whether or not the player has read it.
Choices:
- "Push the pace. Keep Caleb's eyes on the street, not on Dale." → `route_resolve` | (convergent — denial) | gating: none | effects: none | consumable: N
- "Stop. Talk to Dale. The leg." → `route_resolve` | (convergent — confront; sets `saw_dale_leg` if unset, `bond -1` from Dale, `bond +1` from Caleb's relief — Stage 5 sums this as net 0 with a note) | gating: requires `flags_unset: [saw_dale_leg]`, grey out | effects: sets `saw_dale_leg` | consumable: Y
- "Pull Caleb aside. Tell him you've seen it too." → `route_resolve` | (convergent — quiet honesty; only firing if `saw_dale_leg`) | gating: requires `saw_dale_leg`, hide_if_failed | effects: `bond +1`, sets `told_caleb_dale` | consumable: Y
NPCs present: Dale, Caleb. The chord of the city has a *new* throat in it — closer than the rest, freshly-dead. Caleb hears it first.

---

## Beat 8 — Into the city (route corridors)

### Scene: `route_resolve` (engine routing — single forced choice)
Purpose: Reads the route flag set in Act 1 Beat 6 and dispatches into the correct corridor. Pacing/engine beat. Stage 5 writes one block of corridor-mouth prose calibrated to the route the player chose.
Choices:
- "Down the chosen way." → branches by route flag:
  - `route_underpass` → `corridor_underpass_1`
  - `route_apartments` → `corridor_apartments_1`
  - `route_sewer` → `corridor_sewer_1`
  | gating: none | effects: none | consumable: N
NPCs present: per party.

---

### Underpass corridor

### Scene: `corridor_underpass_1`
Purpose: Open ground under the highway. Distant gunfire keeps drawing waves; the dead are mostly off-page but their *direction* is the threat. The corridor's first decision — whether to push to the checkpoint visible ahead, take a side stair to a service road, or hold back and listen for the gunfire to redirect.
Choices:
- "Straight to the checkpoint. Hands visible." → `checkpoint_approach` | (convergent — direct) | gating: none | effects: none | consumable: N
- "Side stair. Service road. Skirt the wire." → `corridor_underpass_random` | (convergent — cautious; takes the random encounter) | gating: none | effects: none | consumable: N
- "Wait. Let the gunfire finish drawing." → `checkpoint_approach` | (convergent — patient; sets `learned_listen` — small flavour flag, surfaces in checkpoint patience scene as a +1 bond reciprocation from Stage 5) | gating: none | effects: sets `learned_listen` | consumable: N
NPCs present: per party. Pack of dead off-page, drawn east by gunfire — narration only.

### Scene: `corridor_underpass_random`
Purpose: Travel random encounter (structure mandates one per corridor). Make uncertainty legible — narration says "the service road runs blind for a stretch."
Choices:
- "Take the service road." → weighted: `random_uneventful` (3) / `random_lone_walker` (2) / `random_window_sound` (2) | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `random_uneventful`
Purpose: Nothing. Pacing beat. The proximity cue is what the player *almost* heard. Routes to checkpoint approach.
Choices:
- "Keep going." → `checkpoint_approach` | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `random_lone_walker`
Purpose: A single living survivor in the middle distance — back to the player, hauling something. Bond opportunity (call out to warn / let them walk on / approach to barter). Cast: **The Lone Walker** (one-scene cameo, see cast).
Choices:
- "Whistle low. Warn them about the pack east." → `checkpoint_approach` | (convergent — kindness without contact) | gating: none | effects: `bond +1`, sets `warned_walker` | consumable: N
- "Approach. Offer to trade. Quiet." → `random_walker_trade` | (convergent — engage; small supply cost for a small supply gain, net zero but bond +1) | gating: none | effects: none | consumable: N
- "Walk on. Keep them out of your story." → `checkpoint_approach` | (convergent — cold; bond -1) | gating: none | effects: `bond -1` | consumable: N
NPCs present: per party + Lone Walker.

### Scene: `random_walker_trade`
Purpose: Brief barter. He has water, you have painkillers. Small exchange — net zero supplies, bond +1, sets `traded_walker`.
Choices:
- "Trade. Move on." → `checkpoint_approach` | gating: none | effects: `bond +1`, sets `traded_walker` | consumable: N
NPCs present: per party + Lone Walker. He flinches at a sound from the underpass overhead — pacing cue, nothing fires.

### Scene: `random_window_sound`
Purpose: A sound from a window — someone alive, or something pretending. Supply-cost path: the player who investigates loses time and supplies (-1 supplies). The careful player who walks past loses nothing.
Choices:
- "Investigate. Maybe someone is alive in there." → `random_window_inside` | (convergent — compassionate; supply cost) | gating: none | effects: `supplies -1` | consumable: N
- "Mark it. Walk on." → `checkpoint_approach` | (convergent — pragmatic) | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `random_window_inside`
Purpose: Empty room. The sound was wind in a curtain over a body. The supply cost stands. Routes to checkpoint approach.
Choices:
- "Out. Keep moving." → `checkpoint_approach` | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `checkpoint_approach`
Purpose: The military checkpoint. Concertina wire, sandbags, two soldiers visible. The Soldier with the Megaphone is on the speaker, repeating one phrase — "show your hands, do not approach the wire, we are not authorised to admit." His hands are shaking. A body in the wire has been there a while. Tells: the megaphone phrase is a single stuck loop, the radio behind him plays one phrase over and over. The patience-or-death gate: three exchanges. Each exchange the player can wait, can speak, or can push. Pushing the gate = shot.
Choices:
- "Hands up. Stand still. Do not speak." → `checkpoint_wait_1` | (convergent — patience; the right read) | gating: none | effects: sets `met_checkpoint` | consumable: N
- "Call out — 'we have a wounded man, we need to come in.'" → `checkpoint_speak_1` | (convergent — speak; survivable but slower, costs `learned_listen` opportunity) | gating: none | effects: sets `met_checkpoint`, `bond +0` | consumable: N
- "Push the wire. He is going to fold." → `death_d2_checkpoint` | (convergent — impatient; death; named misjudgement: you mistook fear for hostility) | gating: none | effects: none | consumable: N
NPCs present: per party + **Soldier with the Megaphone** + a second soldier silent at the sandbag.

### Scene: `checkpoint_wait_1`
Purpose: First of three exchanges. The soldier looks at you longer than the loop allows. Patience-or-die continues.
Choices:
- "Stay still. Wait." → `checkpoint_wait_2` | gating: none | effects: none | consumable: N
- "Lower hands. Step forward an inch." → `death_d2_checkpoint` | gating: none | effects: none | consumable: N
NPCs present: per party + Soldier with the Megaphone.

### Scene: `checkpoint_wait_2`
Purpose: Second exchange. The soldier reaches for the gate. The radio loop stutters.
Choices:
- "Stay still. Wait." → `checkpoint_wait_3` | gating: none | effects: none | consumable: N
- "Speak now. 'I have a child' / 'I have a wounded man.'" → `checkpoint_wait_3` | gating: none | effects: `bond +0` | consumable: N
NPCs present: per party + Soldier with the Megaphone.

### Scene: `checkpoint_wait_3`
Purpose: Third exchange. He opens the side gate. Hands you a duffel through the wire. `+2 supplies`. He says one line he was not authorised to say. Routes to courtyard.
Choices:
- "Take the bag. Thank him with your eyes only." → `apartments_courtyard` | gating: none | effects: `supplies +2`, sets `checkpoint_supplies_taken` | consumable: N
NPCs present: per party + Soldier with the Megaphone (one line, then he turns away). **Proximity cue:** the gunfire that was drawing the dead has stopped — meaning the dead it was drawing are now finding new sound.

### Scene: `checkpoint_speak_1`
Purpose: Speaking instead of waiting silently. He hears you, but the radio loop interrupts. Survivable; ends with a smaller supply gain (+1 instead of +2). Stage 5: the soldier who heard you is the one whose hands shake worst — the prose surfaces this.
Choices:
- "Hold position. Repeat slowly." → `apartments_courtyard` | gating: none | effects: `supplies +1`, sets `met_checkpoint`, sets `checkpoint_spoke` | consumable: N
NPCs present: per party + Soldier with the Megaphone.

### Scene: `death_d2_checkpoint` *(death ending D2 — Shot at the wire)*
Purpose: Death ending. Names the misjudgement: *you mistook fear for hostility*. Calls back the radio-loop tell. `choices: []`.
Choices: none (terminal).
NPCs present: Soldier with the Megaphone (final line — apology, not authorised). Per party witnesses. Beats: if companion present, the prose names what they will carry now.

---

### Apartments corridor

### Scene: `corridor_apartments_1`
Purpose: A row of low-rise apartment blocks, balconies sagging, doors hanging. Moans from behind closed doors as the player passes. One door rattles. The first sighting of **Wren** is here — fire escape, bag at her feet, a hand raised in a gesture too neutral. She does not call out. She watches. **First Wren tell (visual):** her bag is on her shoulder, never her feet, except *now*; she set it down because she's about to climb down to follow you. (Stage 5 surfaces this in framing prose.)
Choices:
- "Lift a hand back. Acknowledge her." → `corridor_apartments_meet_wren` | (convergent — open; sets `met_wren`, sets `acknowledged_wren`) | gating: none | effects: sets `met_wren`, sets `acknowledged_wren` | consumable: N
- "Walk past. Do not stop." → `corridor_apartments_random` | (convergent — paranoid) | gating: none | effects: sets `met_wren`, sets `ignored_wren` | consumable: N
- "Stop. Watch her watch you. See what she does." → `corridor_apartments_meet_wren` | (convergent — probe; sets `met_wren`, sets `read_wren_first`) | gating: none | effects: sets `met_wren`, sets `read_wren_first` | consumable: N
- "Read the road sign at the corner." → `corridor_apartments_signread` | gating: requires `flags_unset: [read_road_sign]`, hide_if_failed (existence is the tell — the player who reads the sign learns the direction Wren came from, which becomes the geography-lie tell in `talk_wren`) | effects: sets `read_road_sign` | consumable: Y
NPCs present: per party + Wren (silent, fire escape).

### Scene: `corridor_apartments_signread`
Purpose: The road sign. Names the direction: south on this artery is the freight yard, north is the residential. Sets a flag the player can use against Wren's geography lie at Beat 9.
Choices:
- "Back to the road." → `corridor_apartments_1` | gating: none | effects: none | consumable: N
NPCs present: per party + Wren (still on the escape).

### Scene: `corridor_apartments_meet_wren`
Purpose: Brief on-the-street exchange. Wren introduces herself with a two-beat joke that lands too smooth. She says she'll follow up to the courtyard if the player wants the company; either way she is going there. **Second Wren tell (rhythm):** the joke is the same shape the careful player will hear three more times today.
Choices:
- "Tell her to keep her distance for now." → `corridor_apartments_random` | (convergent — boundary) | gating: none | effects: none | consumable: N
- "Walk with her. Talk while you move." → `corridor_apartments_random` | (convergent — open) | gating: none | effects: `bond +1` | consumable: N
- "Don't answer. Walk." → `corridor_apartments_random` | (convergent — silent) | gating: none | effects: none | consumable: N
NPCs present: per party + Wren.

### Scene: `corridor_apartments_random`
Purpose: Travel random encounter for the apartments corridor. Make uncertainty legible — narration: "the alley between blocks runs blind for fifty metres."
Choices:
- "Take the alley." → weighted: `random_uneventful_apartments` (3) / `random_lone_walker_apartments` (2) / `random_window_sound_apartments` (2) | gating: none | effects: none | consumable: N
NPCs present: per party + Wren if accompanying.

### Scene: `random_uneventful_apartments`
Purpose: Nothing. Routes to courtyard.
Choices:
- "Out the alley. Courtyard ahead." → `apartments_courtyard` | gating: none | effects: none | consumable: N
NPCs present: per party + Wren.

### Scene: `random_lone_walker_apartments`
Purpose: Lone walker variant on this corridor. Same Lone Walker NPC as underpass branch — only one of these can fire per run because the random tables are mutually exclusive by route, but the cast entry is shared.
Choices:
- "Whistle low. Warn." → `apartments_courtyard` | (convergent — kindness) | gating: none | effects: `bond +1`, sets `warned_walker` | consumable: N
- "Approach. Offer to trade." → `random_walker_trade_apartments` | (convergent — engage) | gating: none | effects: none | consumable: N
- "Walk on." → `apartments_courtyard` | (convergent — cold) | gating: none | effects: `bond -1` | consumable: N
NPCs present: per party + Lone Walker (+ Wren if accompanying — Stage 5 note: Wren reads the walker correctly faster than the player does, *third Wren tell*).

### Scene: `random_walker_trade_apartments`
Purpose: As the underpass version. Net-zero supplies, +1 bond.
Choices:
- "Trade. Move on." → `apartments_courtyard` | gating: none | effects: `bond +1`, sets `traded_walker` | consumable: N
NPCs present: per party + Lone Walker.

### Scene: `random_window_sound_apartments`
Purpose: As the underpass version. Investigate = -1 supplies and nothing.
Choices:
- "Investigate." → `random_window_inside_apartments` | (convergent — compassionate) | gating: none | effects: `supplies -1` | consumable: N
- "Walk on." → `apartments_courtyard` | (convergent — pragmatic) | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `random_window_inside_apartments`
Purpose: Empty room. Routes onward.
Choices:
- "Out. Move." → `apartments_courtyard` | gating: none | effects: none | consumable: N
NPCs present: per party.

---

### Sewer corridor (red herring — death track)

### Scene: `corridor_sewer_1`
Purpose: The storm drain Caleb named in Act 1 Beat 6 (callback prose: Caleb's bark is cited in framing if `caleb_route_marked_drain` is set). Quiet at first — the silence is *wrong*. Footsteps echo where they shouldn't; water sound is wrong. Stage 5 must lean hard on the wrong-feeling cues here. The player who has read Act 1's tells (Caleb's bark, the route's "looks empty" prose) is being given a last chance to turn back.
Choices:
- "Push deeper. The pipes converge ahead." → `corridor_sewer_2` | (convergent — committed; the death-track choice) | gating: none | effects: none | consumable: N
- "Back to the surface. This was a mistake." → `corridor_sewer_back` | (convergent — read the tells; routes back to a different corridor with a supply cost for the time burned) | gating: none | effects: `supplies -1` | consumable: N
- "Hold. Listen for the pattern." → `corridor_sewer_listen` | (convergent — careful; surfaces the omnidirectional moan tell, then routes back to the surface — costs `1 supply` not `2`) | gating: none | effects: none | consumable: N
NPCs present: per party. **Proximity cue:** the moans are off-page but omnidirectional; the water is amplifying every direction.

### Scene: `corridor_sewer_listen`
Purpose: Tell-surfacer. The player who listens hears that the moans are *behind, ahead, above* — pack, not lone. Routes to back-out for a -1 supply cost. (Cheaper retreat than a full back-out.)
Choices:
- "Back to the surface. Now." → `corridor_sewer_back_cheap` | gating: none | effects: `supplies -1` | consumable: N
NPCs present: per party.

### Scene: `corridor_sewer_back`
Purpose: Retreat. The player accepts the wasted time. Routes to the surface with the route flag flipped — random of the other two corridors fires (apartments or underpass).
Choices:
- "Surface. Take whatever route is left." → weighted: `corridor_apartments_1` (1) / `corridor_underpass_1` (1) | gating: none | effects: clears `route_sewer`, sets one of `route_apartments` / `route_underpass` per random | consumable: N
NPCs present: per party.

### Scene: `corridor_sewer_back_cheap`
Purpose: As above but cheaper because the player heard the warning. Random of the other two corridors fires.
Choices:
- "Surface." → weighted: `corridor_apartments_1` (1) / `corridor_underpass_1` (1) | gating: none | effects: clears `route_sewer`, sets one of `route_apartments` / `route_underpass` per random | consumable: N
NPCs present: per party.

### Scene: `corridor_sewer_2`
Purpose: Mid-corridor. A single shambler in the pipe. Easy; named misjudgement-foreshadow: the prose lets the player think this is the threat. The pack is past this one. **Death gate ahead:** the next scene kills players without `has_pistol` AND `health ≥ 3`.
Choices:
- "Step around it. Quiet." → `corridor_sewer_3` | (convergent — sneak; works) | gating: none | effects: none | consumable: N
- "Knife it. Quiet." → `corridor_sewer_3` | (convergent — kill; works, costs `1 health`) | gating: none | effects: `health -1` | consumable: N
- "Shoot it." → `corridor_sewer_3` | (convergent — loud; the pack hears, the next scene's gate hardens — Stage 5 narrates the consequence rather than mechanically harder, since the gate already kills the under-resourced) | gating: requires `has_pistol`, grey out | effects: sets `sewer_loud` | consumable: N
NPCs present: per party.

### Scene: `corridor_sewer_3`
Purpose: The pack. The corridor narrows; the dead are funneled in front of the player. Resolution depends on resources.
Choices:
- "Pistol up. Pick a line. Run it." → `corridor_sewer_survive` | gating: requires `has_pistol` AND `health >= 3`, grey out | effects: `health -1`, `supplies -1`, sets `sewer_survivor` | consumable: N
- "Crawl it. Use what you have." → `death_d3_sewer_crawl` | (convergent — no gun; named: *the route was the trap, the sound said so, you didn't listen*) | gating: requires `flags_unset: [has_pistol]` | effects: none | consumable: N
- "Push through. Hope speed beats them." → `death_d3_sewer_overrun` | (convergent — low health; named: *the route was the trap, your body said so, you didn't listen*) | gating: requires `has_pistol` AND `health < 3` | effects: none | consumable: N
NPCs present: per party. (If a companion present, the death scene names the companion — Caleb's bark in Act 1 about the dark; Dale dragging his leg through water; Wren is not present here, sewer is pre-Wren.)

### Scene: `corridor_sewer_survive`
Purpose: Through. The player who came resourced earned the bond-positive `sewer_survivor` flag (see structure — small `bond`-positive bark in Beat 13 framing). Routes to courtyard via a manhole exit.
Choices:
- "Up the ladder. Out." → `apartments_courtyard` | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `death_d3_sewer_crawl` *(death ending D3-A — Overrun in the pipe)*
Purpose: Terminal. Names misjudgement explicitly. Calls back Caleb's bark from Act 1 Beat 6 if `caleb_route_marked_drain` is set; otherwise calls back the route's "looks empty" prose.
Choices: none (terminal).
NPCs present: per party as witnesses.

### Scene: `death_d3_sewer_overrun` *(death ending D3-B — Down with low health)*
Purpose: Terminal. Variant framing for the player who had a gun but pushed at health < 3. Names the misjudgement: *you knew you were thin and you went anyway*.
Choices: none (terminal).
NPCs present: per party as witnesses.

---

## Beat 9 — The apartments hub (Wren introduction)

### Hub — `apartments_courtyard`
Purpose: Convergence node — all three corridor exits arrive here. Stairwell, three apartment doors (ground / first / top), roof access. Each door visited once. **Hub closes** when (a) Apt 3 entered (loud spike forces exit), or (b) two side-trips + Wren resolution complete.
Returns from: `apt1_kitchen`, `apt2_bath`, `apt3_locked_loud`, `apt3_locked_quiet`, `roof_access`, `talk_wren_hub`. Side-trip counter `apartments_visits +1` on return from each apartment.
Choices:
- "Apt 1 — ground floor. Kitchen." → `apt1_kitchen` | gating: requires `flags_unset: [apt1_done]` | effects: sets `apt1_done` | consumable: Y
- "Apt 2 — first floor. Bathroom cabinet." → `apt2_bath` | gating: requires `flags_unset: [apt2_done]` | effects: sets `apt2_done` | consumable: Y
- "Apt 3 — top floor. Locked." → `apt3_breakthrough_choice` | gating: requires `flags_unset: [apt3_done]` | effects: none | consumable: N (the breakthrough sub-scene flags the apt as done)
- "Roof access." → `roof_access` | gating: requires `flags_unset: [roof_done]` | effects: sets `roof_done` | consumable: Y
- "Talk to Wren." → `talk_wren_hub` | gating: requires `met_wren` AND `flags_unset: [wren_resolved]`, grey out (player should know the option exists; she's standing right there if she came up) | effects: none | consumable: N (the conversation hub's own depletion handles topics)
- "Leave the building. South toward the church." → `church_approach` | gating: requires `apartments_visits >= 2` OR `apt3_done`, grey out (until enough is done) | effects: sets `apartments_left` | consumable: N (the act moves on)
Exit: "Leave the building" — always available once the gate clears.
NPCs present: per party + Wren (after corridor or roof). **Proximity cue (hub-wide):** the stairwell hum — there are dead inside the building, not on the visited floors *yet*; the elevator shaft echoes. Stage 5 must keep this audible at every return to the hub.

### Scene: `apt1_kitchen`
Purpose: Meal half-eaten on the table, two bowls, no occupants. The drawing on the fridge — a child's, two stick figures and a sun. Foreshadow Mara without naming her. Supply gain.
Choices:
- "Search the cupboards. Pocket what fits." → `apartments_courtyard` | (convergent — pragmatic) | gating: none | effects: `supplies +1`, increments `apartments_visits +1`, sets `saw_drawing` | consumable: N
- "Look at the drawing. Take it down. Leave the cupboards." → `apartments_courtyard` | (convergent — soft; bond gain instead of supply) | gating: none | effects: `bond +1`, increments `apartments_visits +1`, sets `saw_drawing`, sets `took_drawing` | consumable: N
- "Both. Quick. Cupboards then drawing." → `apartments_courtyard` | (convergent — greedy; small proximity cost narrated) | gating: none | effects: `supplies +1`, `bond +1`, increments `apartments_visits +1`, sets `saw_drawing`, sets `took_drawing`, sets `apt1_loud` (Stage 5: loud cue spike at next hub return) | consumable: N
NPCs present: per party. A smell from the bedroom door, closed; nobody is going in there.

### Scene: `apt2_bath`
Purpose: Bandages and pills in the cabinet. Wet footprints on the tiles — fresh. Either supply or, if Dale is alive and not bitten, a one-shot health gain for him.
Choices:
- "Pocket the supplies." → `apartments_courtyard` | (convergent — pragmatic) | gating: none | effects: `supplies +1`, increments `apartments_visits +1` | consumable: N
- "Bandage Dale. Use the cabinet on him here." → `apartments_courtyard` | (convergent — care; consumes the supply for Dale's health gain — health +1 once) | gating: requires `neighbour_alive` AND `flags_unset: [dale_bitten]` AND `flags_unset: [dale_bandaged]`, hide_if_failed (existence is character — only fires for the right party) | effects: `health +1` (Dale-specific narrated; player health unchanged), `bond +1`, sets `dale_bandaged`, increments `apartments_visits +1` | consumable: Y
- "Both. Bandage and pocket the rest." → `apartments_courtyard` | (convergent — greedy; both effects, small proximity cost) | gating: requires `neighbour_alive` AND `flags_unset: [dale_bitten]` AND `flags_unset: [dale_bandaged]`, hide_if_failed | effects: `health +1`, `supplies +1`, `bond +1`, sets `dale_bandaged`, increments `apartments_visits +1`, sets `apt2_loud` | consumable: Y
- "Skip it. Back to the stairwell." → `apartments_courtyard` | gating: none | effects: increments `apartments_visits +1` | consumable: N
NPCs present: per party.

### Scene: `apt3_breakthrough_choice`
Purpose: Decision: how to enter Apt 3. Loud (break) or quiet (lockpick / kick the panel — Stage 5 picks the right craft for the door). The radio inside is mid-broadcast. **First marina mention.** Loud path forces the hub exit; quiet preserves it.
Choices:
- "Break the door. Now." → `apt3_locked_loud` | (convergent — blunt; loud) | gating: none | effects: sets `apt3_done`, sets `apt3_loud`, sets `apartments_close_now` (forces hub close — Stage 5 narrates the dead now in the stairwell) | consumable: N
- "Work the lock. Quiet." → `apt3_locked_quiet` | (convergent — careful) | gating: none | effects: sets `apt3_done` | consumable: N
- "Skip Apt 3." → `apartments_courtyard` | (convergent — pragmatic; no flag set, can return) | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `apt3_locked_loud`
Purpose: Inside Apt 3 after the loud entry. Body, bag, radio. Marina coordinates audible. Sets `seen_river` flag-precursor `heard_marina`. Forces hub exit — the building's dead are in the stairwell now.
Choices:
- "Pocket the radio frequency. Out — fast." → `roof_access_forced` | gating: none | effects: `supplies +1`, sets `heard_marina` | consumable: N
NPCs present: per party.

### Scene: `apt3_locked_quiet`
Purpose: As above without the spike. Player can return to the hub or go to the roof.
Choices:
- "Pocket the radio frequency. Back to the stairwell." → `apartments_courtyard` | gating: none | effects: `supplies +1`, sets `heard_marina`, increments `apartments_visits +1` | consumable: N
NPCs present: per party.

### Scene: `roof_access_forced`
Purpose: Forced rooftop after a loud Apt 3 entry. The player is on the roof whether they wanted to be or not — the stairwell is no longer an option. Wren is here regardless of corridor (she has been tracking; she says so). **Conversation hub `talk_wren` opens here** for loud-entry players.
Choices:
- "Catch your breath. Look at the city." → `talk_wren_hub` | gating: requires `met_wren` | effects: sets `seen_river` | consumable: N
- "Catch your breath. Wren is not here on this run — find a way down." → `church_approach` | gating: requires `flags_unset: [met_wren]`, hide_if_failed | effects: sets `seen_river` | consumable: N
NPCs present: per party + Wren (if alive in this run).

### Scene: `roof_access`
Purpose: Voluntary rooftop. Vantage. Fires, abandoned cars, the river visible at the city's eastern edge for the first time. Sets `seen_river`. Wren is here (if alive); if `met_wren` already fired downstairs she is leaning on the parapet, if not this is where she meets the player. **Conversation hub `talk_wren` opens here.**
Choices:
- "Stand at the parapet. Talk to Wren." → `talk_wren_hub` | gating: requires `flags_unset: [met_wren]` OR `met_wren`, grey out | effects: sets `met_wren` if unset, sets `seen_river` | consumable: N
- "Stand at the parapet. Don't speak." → `apartments_courtyard` | (convergent — silent; pragmatic) | gating: none | effects: sets `seen_river`, increments `apartments_visits +1` | consumable: N
- "Look harder at the closer building. The horde moving through it." → `apartments_courtyard` | (convergent — careful; bond opportunity if companion present, Stage 5 reciprocates) | gating: requires `neighbour_alive` OR `teen_alive` OR `elder_alive`, hide_if_failed | effects: sets `seen_river`, `bond +1`, increments `apartments_visits +1` | consumable: N
NPCs present: per party + Wren (if `met_wren` or new sighting).

### Conversation — `talk_wren_hub`
Purpose: Three depleting topics, each a tell. Asking all three sets `probed_wren`; recruiting without probing sets `trusted_wren`; refusing outright at the walk-away sets neither. The walk-away always offers (a) recruit, (b) refuse, (c) keep talking.
Topics:
- "Where are you from?" → `talk_wren_geography` | gating: requires `flags_unset: [asked_wren_geo]` | effects on return: sets `asked_wren_geo`. **Tell:** she names a town that is the wrong direction; if `read_road_sign` set, narration calls this out explicitly. | consumable: Y
- "What's in the bag?" → `talk_wren_bag` | gating: requires `flags_unset: [asked_wren_bag]` | effects on return: sets `asked_wren_bag`. **Tell:** the deflection joke is the same shape as her introduction joke — Stage 5 must echo it deliberately. | consumable: Y
- "What do you want?" → `talk_wren_want` | gating: requires `flags_unset: [asked_wren_want]` | effects on return: sets `asked_wren_want`. **Tell:** the *honesty* is the tell — she drops the dryness. "Someone with me when I go to a place I need to get to." She does not name the place. | consumable: Y
Walk-away:
- "Come with us." → `apartments_courtyard` | gating: none | effects: sets `stranger_alive`, sets `wren_resolved`. If all three asked: sets `probed_wren`. If none asked: sets `trusted_wren`. If 1–2 asked: sets `probed_wren` partial — Stage 5 treats this as `probed_wren` for downstream gates (the engine flag is binary). | consumable: N
- "Not this time. Walk away from her." → `apartments_courtyard` | gating: none | effects: sets `wren_resolved`, sets `refused_wren` | consumable: N
- "Let's keep talking." → `talk_wren_hub` | gating: none | effects: none | consumable: N
NPCs present: per party + Wren. **Proximity cue:** the city's chord underneath every line; one character flinches at a sound from the elevator shaft below. Stage 5: at least one topic ends with a sound interruption mid-sentence.

### Scene: `talk_wren_geography`
Purpose: She names the town. If `read_road_sign` is set, narration adds a line that names the contradiction. Single-choice return.
Choices:
- "Back." → `talk_wren_hub` | gating: none | effects: sets `asked_wren_geo` | consumable: N
NPCs present: Wren + per party.

### Scene: `talk_wren_bag`
Purpose: Deflection joke. The setup is the rhythm tell.
Choices:
- "Back." → `talk_wren_hub` | gating: none | effects: sets `asked_wren_bag` | consumable: N
NPCs present: Wren + per party.

### Scene: `talk_wren_want`
Purpose: She drops the dryness. The honesty is the tell.
Choices:
- "Back." → `talk_wren_hub` | gating: none | effects: sets `asked_wren_want` | consumable: N
NPCs present: Wren + per party.

---

## Beat 10 — Ruth's church

### Scene: `church_approach`
Purpose: Two streets on, the church doors barred from inside. A voice answers the knock — Ruth. The side door scratching is constant background. Stage 5: the scratching is the husband, off-page, sound-only — never seen unless the player loots.
Choices:
- "Knock. Soft. Identify yourself." → `church_door` | (convergent — gentle) | gating: none | effects: none | consumable: N
- "Knock. Firm. Tell her you need shelter." → `church_door` | (convergent — direct) | gating: none | effects: none | consumable: N
- "Try the side door instead." → `church_side_door` | (convergent — sneaky; risk path — the side door is what the dead are working on; the player who tries this hears them through the wood, then routes back to the front) | gating: none | effects: sets `tried_side_door` | consumable: N
- "Walk on. Don't engage." → `mara_approach` | gating: none | effects: sets `passed_church` | consumable: N
NPCs present: per party + Ruth (voice through the door). Side door scratching audible.

### Scene: `church_side_door`
Purpose: The side door. The player hears the dead clearly. A line of light through the gap shows Ruth's husband — but only as a shape, not yet identifiable. Routes back to the front door. Stage 5: this is a tell-planter for the looter — the looter knows what's behind the side door before they take the larder.
Choices:
- "Back to the front. Knock properly." → `church_door` | gating: none | effects: sets `glimpsed_husband` | consumable: N
NPCs present: per party. Whatever is on the side door, off-page.

### Scene: `church_door`
Purpose: Ruth opens the inner panel. Conversation through the door. Three approaches.
Choices:
- "Trust her. Help with the barricade." → `church_inside_help` | (convergent — open) | gating: none | effects: sets `church_inside` | consumable: N
- "Pretend to trust her. The larder is in plain view through the inner door." → `church_inside_loot_setup` | (convergent — sly; loot path setup) | gating: none | effects: sets `church_inside`, sets `loot_intent` | consumable: N
- "Refuse politely. Ask for the clinic key on the way out." → `church_pass_by` | (convergent — polite refusal; she offers the key) | gating: none | effects: sets `passed_church`, sets `ruth_key` | consumable: N
- "Refuse. Walk away." → `mara_approach` | (convergent — cold refusal; no key) | gating: none | effects: sets `passed_church` | consumable: N
NPCs present: per party + Ruth (voice through the door, then opens the panel).

### Scene: `church_inside_help`
Purpose: Player joins Ruth at the barricade. Brief work scene; the side-door sound continues. Recruits Ruth. **Conversation hub `talk_ruth` opens.** Caleb's presence opens warmer Ruth-recruit framing in Stage 5.
Choices:
- "Sit with her. Talk." → `talk_ruth_hub` | gating: none | effects: sets `elder_alive`, `bond +1` | consumable: N
- "Take watch. Let her rest." → `talk_ruth_hub` | (convergent — quiet care; sets `shared_watch` flag — Stage 5 surfaces in `talk_ruth` topic 3) | gating: none | effects: sets `elder_alive`, `bond +1`, sets `shared_watch` | consumable: N
NPCs present: per party + Ruth.

### Scene: `church_inside_loot_setup`
Purpose: Inside the church, Ruth in the side room briefly. Larder in plain view. The player can take it now or back out.
Choices:
- "Take the larder. Quietly. Out the back before she sees." → `church_loot_done` | (convergent — sly; +2 supplies, -2 bond, sets `looted_church`, `abandoned_wounded`) | gating: none | effects: `supplies +2`, `bond -2`, sets `looted_church`, sets `abandoned_wounded` | consumable: N
- "Take only what she would let you. Leave a marker." → `church_inside_help_lite` | (convergent — half-honest; +1 supplies, no bond cost, sets `church_inside`, recruits Ruth via the helper path) | gating: none | effects: `supplies +1`, sets `church_inside`, sets `elder_alive`, `bond +0` | consumable: N
- "Don't take it. Help with the barricade." → `church_inside_help` | (convergent — change of heart; routes to the recruit path with bond +1) | gating: none | effects: none | consumable: N
- "Back out the front. Pretend nothing happened." → `mara_approach` | (convergent — coward; bond -1, sets `passed_church`) | gating: none | effects: `bond -1`, sets `passed_church` | consumable: N
NPCs present: per party + Ruth (off-page in side room).

### Scene: `church_loot_done`
Purpose: The looter is out. The side door breaks behind them as they leave (Stage 5 forces this proximity cue regardless). Ruth survives — she does not appear again in this run. Locks Ruth out of Act 3.
Choices:
- "Walk fast. South toward the office building." → `mara_approach` | gating: none | effects: none | consumable: N
NPCs present: per party. Ruth's voice from the church, calling out something the player chooses whether to hear.

### Scene: `church_inside_help_lite`
Purpose: Half-honest path. Player has helped, Ruth has given them what she can spare. **`talk_ruth` opens.**
Choices:
- "Sit with her. Talk." → `talk_ruth_hub` | gating: none | effects: none | consumable: N
NPCs present: per party + Ruth.

### Scene: `church_pass_by`
Purpose: She gives the key, blesses the player, closes the door. The key opens the clinic in Beat 14 for `+2 health` (one-shot consumable).
Choices:
- "South. Toward the office building." → `mara_approach` | gating: none | effects: none | consumable: N
NPCs present: per party + Ruth (last sight through the panel as it closes).

### Conversation — `talk_ruth_hub`
Purpose: Three topics. Topic 3 is the bond mirror. Walk-away always exits.
Topics:
- "The church. How long have you been here?" → `talk_ruth_church` | gating: requires `flags_unset: [asked_ruth_church]` | effects on return: sets `asked_ruth_church`, `bond +1` | consumable: Y
- "Your son." → `talk_ruth_son` | gating: requires `flags_unset: [asked_ruth_son]` | effects on return: sets `asked_ruth_son` | consumable: Y
- "What do you make of me?" → `talk_ruth_mirror` | gating: requires `flags_unset: [asked_ruth_mirror]` | effects on return: sets `asked_ruth_mirror`. **Bond mirror:** if `bond >= 2`, +1 reciprocation; if `bond <= -2`, a quiet line that costs nothing material but tells the player what they have become (Stage 5 prose, no flag). | consumable: Y
Walk-away:
- "Time to move. Out." → `mara_approach` | gating: none | effects: sets `talked_ruth_done`. **Forced exit:** the side door breaks during the exchange — the dead are now in the church, Ruth grabs her bag and follows. Stage 5: the leaving is a sprint. | consumable: N
NPCs present: per party + Ruth. **Proximity cue (mandatory mid-conversation):** Ruth stops mid-sentence at a sound from the side room she pretends she did not hear. Stage 5 must include this break.

### Scene: `talk_ruth_church`
Purpose: Her grandmother's. One paragraph of warmth.
Choices:
- "Back." → `talk_ruth_hub` | gating: none | effects: sets `asked_ruth_church`, `bond +1` | consumable: N
NPCs present: Ruth + per party.

### Scene: `talk_ruth_son`
Purpose: He was in another state. She does not know.
Choices:
- "Back." → `talk_ruth_hub` | gating: none | effects: sets `asked_ruth_son` | consumable: N
NPCs present: Ruth + per party.

### Scene: `talk_ruth_mirror`
Purpose: She names what she sees. Bond-mirror narration in Stage 5.
Choices:
- "Back." → `talk_ruth_hub` | gating: none | effects: sets `asked_ruth_mirror` | consumable: N
NPCs present: Ruth + per party.

---

## Beat 11 — The crying building (Mara rescue)

### Scene: `mara_approach`
Purpose: Two blocks south of the church. The four-storey office building. By now the player has been told twice that this building is compromised (Apt 3's radio if `heard_marina`; Ruth's broadcast if `church_inside`). From the street: a child crying on an upper floor. Bodies near the entrance. The street smells. Three approaches; the visible way is the **skim-read death**.
Choices:
- "Front door. Push through the lobby." → `death_d4_mara_front` | (convergent — blunt skim-read; named misjudgement: *the lobby was visibly compromised; you saw it and went in*) | gating: none | effects: none | consumable: N
- "Walk the perimeter first. Look hard at the building." → `mara_perimeter` | (convergent — careful; opens the hard-way path; sets `mara_perimeter_walked`) | gating: none | effects: sets `mara_perimeter_walked` | consumable: N
- "Refuse. Walk past." → `mara_refused` | (convergent — refuse) | gating: none | effects: sets `refused_mara`, `bond -1` | consumable: N
NPCs present: per party. Crying audible above. Lobby groaning audible below. **Proximity cue:** every direction.

### Scene: `mara_perimeter`
Purpose: The perimeter walk surfaces the alley fire-escape. The bottom rung is pulled up — discoverable. Three approaches: climb (hard way), look for another entry (loops), back to the street (cold refuse).
Choices:
- "Climb. Boost yourself to the rung. Find a way." → `mara_climb_check` | (convergent — commit) | gating: none | effects: none | consumable: N
- "Look for a third way. Roof access from the next building." → `mara_perimeter_third` | (convergent — explore; one supply cost, no information — there is no third way; Stage 5: this is a small failure that informs the player the climb is the answer) | gating: requires `flags_unset: [tried_third_way]` | effects: `supplies -1`, sets `tried_third_way` | consumable: Y
- "Back. Refuse after all." → `mara_refused` | (convergent — refuse late; same destination as the up-front refusal but Stage 5 narrates the weight of having looked) | gating: none | effects: sets `refused_mara`, `bond -1`, sets `refused_after_looking` | consumable: N
NPCs present: per party. Crying still audible.

### Scene: `mara_perimeter_third`
Purpose: Third-way explore. Returns to perimeter with the supply cost spent. No info. Crying louder when the player returns.
Choices:
- "Back to the alley." → `mara_perimeter` | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `mara_climb_check`
Purpose: The climb gate — `health ≥ 3` AND (`has_pistol` OR a companion). The climb cost is `1 health`. The player who can't climb is offered the refuse path as a hide_if_failed alternative.
Choices:
- "Take the climb. Boost off Dale's hands." → `mara_climb_inside` | (convergent — companion-aided) | gating: requires `health >= 3` AND `neighbour_alive` AND `flags_unset: [dale_bitten]`, grey out | effects: `health -1`, sets `mara_companion_helped` (Dale variant) | consumable: N
- "Take the climb. Caleb spots you." → `mara_climb_inside` | (convergent — Caleb-aided) | gating: requires `health >= 3` AND `teen_alive`, grey out | effects: `health -1`, sets `mara_companion_helped` (Caleb variant) | consumable: N
- "Take the climb. Wren throws you the rope." → `mara_climb_inside` | (convergent — Wren-aided) | gating: requires `health >= 3` AND `stranger_alive`, grey out | effects: `health -1`, sets `mara_companion_helped` (Wren variant) | consumable: N
- "Take the climb. Ruth holds the alley below." → `mara_climb_inside` | (convergent — Ruth-aided) | gating: requires `health >= 3` AND `elder_alive`, grey out | effects: `health -1`, sets `mara_companion_helped` (Ruth variant) | consumable: N
- "Take the climb solo. One shot through the third-floor window first." → `mara_climb_inside` | (convergent — solo) | gating: requires `health >= 3` AND `has_pistol` AND no companion alive, grey out | effects: `health -1`, sets `mara_climb_solo` | consumable: N
- "You can't make this climb. Back to the street." → `mara_refused` | (convergent — refuse on resources; not a punishment, this is the structure's "valid path") | gating: requires `health < 3` OR (`flags_unset: [has_pistol]` AND no companion alive), grey out | effects: sets `refused_mara`, `bond -1`, sets `refused_under_resourced` | consumable: N
NPCs present: per party. The crying continues; the lobby is groaning louder.

### Scene: `mara_climb_inside`
Purpose: Inside the building (hard way). Every floor has a dead occupant. The fourth-floor supply closet is the *only* moment of relative quiet in Act 2 — even there, footsteps in the corridor outside. Sets `child_rescued` and `child_alive`.
Choices:
- "To the fourth floor. Find the closet." → `mara_supply_closet` | (convergent — direct) | gating: none | effects: none | consumable: N
- "Stop on three. The desk drawer — supplies." → `mara_floor_three_desk` | (convergent — greedy; +1 supplies, costs an extra proximity beat; small bite-risk narrated) | gating: requires `flags_unset: [mara_floor_three_done]` | effects: `supplies +1`, sets `mara_floor_three_done` | consumable: Y
NPCs present: per party.

### Scene: `mara_floor_three_desk`
Purpose: The drawer. A creak in the corridor. Routes onward.
Choices:
- "Up. Don't stop again." → `mara_supply_closet` | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `mara_supply_closet`
Purpose: Mara, alone, two days. The rescue moment. Sets `child_rescued`, `child_alive`. **Conversation hub `talk_mara`** opens (capped at three topics — name, mother, dark — last one held for Act 3).
Choices:
- "Kneel. Tell her your name. Quiet voice." → `talk_mara_hub` | (convergent — gentle; bond +2 baseline) | gating: none | effects: sets `child_rescued`, sets `child_alive`, `bond +2` | consumable: N
- "Lift her. Move now. Talk on the way." → `mara_descent` | (convergent — direct; bond +1) | gating: none | effects: sets `child_rescued`, sets `child_alive`, `bond +1` | consumable: N
- "Quiet. Hand on her mouth. Out." → `mara_descent` | (convergent — pragmatic; no bond, but no cost; Stage 5: she does not understand and the prose reads it) | gating: none | effects: sets `child_rescued`, sets `child_alive` | consumable: N
NPCs present: per party + Mara.

### Conversation — `talk_mara_hub`
Purpose: Two of three topics in Act 2 (name, mother). Third topic — the dark — held for Act 3 per structure note. Lying about her mother sets `lied_to_mara`. Walk-away exits to descent.
Topics:
- "Your name?" → `talk_mara_name` | gating: requires `flags_unset: [asked_mara_name]` | effects on return: sets `asked_mara_name`, `bond +1` (regardless of answer per structure) | consumable: Y
- "Your mother." → `talk_mara_mother` | gating: requires `flags_unset: [asked_mara_mother]` | effects on return: sets `asked_mara_mother`. Two sub-options resolve: truth or lie. Lie sets `lied_to_mara`, `bond -1`. Truth sets `bond +1` and `shared_supplies`-adjacent flag `told_mara_truth` (Stage 5 surfaces in Act 3). | consumable: Y
Walk-away:
- "Hold her hand. Down the fire escape." → `mara_descent` | gating: none | effects: none | consumable: N
NPCs present: Mara + per party. **Proximity cue:** footsteps in the corridor outside the closet between every topic. Stage 5 must surface this.

### Scene: `talk_mara_name`
Purpose: She tells the player her name and asks theirs back.
Choices:
- "Tell her your name. Back." → `talk_mara_hub` | gating: none | effects: sets `asked_mara_name`, `bond +1` | consumable: N
NPCs present: Mara + per party.

### Scene: `talk_mara_mother`
Purpose: The hard one. Two sub-paths.
Choices:
- "Tell her the truth — you don't know where her mother is." → `talk_mara_hub` | (convergent — truth) | gating: none | effects: sets `asked_mara_mother`, sets `told_mara_truth`, `bond +1` | consumable: N
- "Tell her her mother is coming." → `talk_mara_hub` | (convergent — lie) | gating: none | effects: sets `asked_mara_mother`, sets `lied_to_mara`, `bond -1` | consumable: N
- "Tell her you'll find out." → `talk_mara_hub` | (convergent — middle path; no flag, no bond change) | gating: none | effects: sets `asked_mara_mother` | consumable: N
NPCs present: Mara + per party.

### Scene: `mara_descent`
Purpose: Leaving the building. The front door is no longer an option; the fire-escape is. Something is on it now. Brief chase beat. Routes to the hostile-survivors funnel.
Choices:
- "Drop down. Companion below catches her." → `hostile_funnel` | (convergent — companion-aided; -1 health if any companion alive; no death) | gating: requires `neighbour_alive` OR `teen_alive` OR `elder_alive` OR `stranger_alive`, grey out | effects: `health -1` | consumable: N
- "Drop down. Solo. Use the pistol on the way." → `hostile_funnel` | (convergent — solo with pistol; -1 health, sets `mara_pistol_used`) | gating: requires `has_pistol` AND no companion alive, grey out | effects: `health -1`, sets `mara_pistol_used` | consumable: N
- "Drop down. Solo. Improvise." → `hostile_funnel` | (convergent — solo no pistol; -2 health, possible bite) | gating: requires `flags_unset: [has_pistol]` AND no companion alive, grey out | effects: `health -2`, sets `bitten` if `health <= 1` after the cost (Stage 5 narrates the bite explicitly — this is the act's first bite-risk beat) | consumable: N
NPCs present: per party + Mara.

### Scene: `mara_refused`
Purpose: Refusal route. The crying continues for two blocks; the player can hear it stop at the third. Routes to hostile-survivors funnel via a different framing — Stage 5 marks the colder narration.
Choices:
- "Walk on. Don't look up." → `hostile_funnel` | gating: none | effects: none | consumable: N
NPCs present: per party. Crying audible, then absent.

### Scene: `death_d4_mara_front` *(death ending D4 — Lobby)*
Purpose: Terminal. Names the misjudgement: *the lobby was visibly compromised; you saw it and went in*.
Choices: none (terminal).
NPCs present: per party as witnesses; Mara never met.

---

## Beat 12 — The hostile survivors

### Scene: `hostile_funnel`
Purpose: Late afternoon, day two. Collapsed road and horde-movement funnel the party into a sectioned street. Hollis's camp visible: hot food, fire, a man at the wire pulling a body off it with practised ease. Hollis steps forward — handshake, name, charm. The player has the choice to engage or balk before the camp gate. **Tells start firing in the framing prose at the gate** — Stage 5 must surface (1) the *too-clean* perimeter, (2) the radio loop change.
Choices:
- "Step in. Take the handshake." → `hostile_camp` | (convergent — open) | gating: none | effects: sets `entered_hostile_camp` | consumable: N
- "Stop at the wire. Look harder before you cross." → `hostile_camp_read` | (convergent — careful; sets `read_camp_first`, opens an extra pre-fire tell beat) | gating: none | effects: sets `read_camp_first` | consumable: N
- "Pretend you're passing. Wave him off." → `hostile_pass_attempt` | (convergent — refuse early) | gating: none | effects: none | consumable: N
NPCs present: per party + **Hollis** + **Hollis's Second** (silent at the wire) + a third Hollis lieutenant working the perimeter.

### Scene: `hostile_camp_read`
Purpose: Pre-fire tell beat. The player who pauses sees three things in framing prose: the bodies removed from the road outside, the boots that fit too well on a dead man inside the perimeter, the lieutenant's eyes on the player's bag instead of Hollis's mouth. Sets `read_camp` (carries into the camp scene's resolution gates).
Choices:
- "Step in anyway. Now you know what you're walking into." → `hostile_camp` | (convergent — informed; sets `read_camp`) | gating: none | effects: sets `read_camp` | consumable: N
- "Step back. Walk away while you can." → `hostile_pass_attempt` | (convergent — informed flee; the prose carries the decision's weight) | gating: none | effects: sets `read_camp` | consumable: N
NPCs present: per party + Hollis (waiting) + Hollis's Second.

### Scene: `hostile_pass_attempt`
Purpose: Walk-on attempt. Hollis lets the party pass — *barely*. The radio inside the tent is audible briefly, looping the marina coordinates with changes. Sets `pass_attempt`. Routes to a short post-camp scene where the perimeter follows the player at a distance for half a block; one more chance to fight or flee for good.
Choices:
- "Keep walking. Don't look back." → `hostile_passed` | (convergent — flee; -1 supplies cost narrated as a bag-strap they grabbed and you cut, no death) | gating: none | effects: `supplies -1`, `bond -1` (Mara's pack if rescued — Stage 5 narrates), sets `fled_hostile` | consumable: N
- "Turn around. End it now while they're spread out." → `hostile_camp` | (convergent — pre-emptive fight; routes into the camp resolution as if the player chose fight from inside) | gating: requires `has_pistol`, grey out | effects: sets `entered_hostile_camp`, sets `pre_emptive_fight` | consumable: N
NPCs present: per party + Hollis at distance + the lieutenant tailing.

### Scene: `hostile_passed`
Purpose: Pass succeeded. The cost is paid. Routes to Beat 13. **Hollis lives** — heard once on the radio at Beat 13 (Stage 5 prose).
Choices:
- "Keep walking. Find somewhere to rest." → `rooftop_approach` | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `hostile_camp`
Purpose: Inside the camp at the fire. Conversation hub `talk_hollis_camp` opens; the player must complete one full conversation beat before resolution choices fire. Stage 5: every line is Hollis monologuing, the brief's clipped-conversation rule is broken on purpose around him. Tells continue accumulating. **Mara is asked about by name** if `child_rescued` — sets `hollis_named_mara` (the fourth tell). The beat closes after the conversation hub's walk-away.
Choices:
- "Sit. Eat. Listen." → `talk_hollis_camp` | gating: none | effects: sets `sat_at_fire` | consumable: N
- "Stand. Decline the food. Stay near the entrance." → `talk_hollis_camp` | (convergent — wary; sets `wary_at_fire`, opens a small bond gain in talk_hollis_camp's walk-away as Stage 5) | gating: none | effects: sets `wary_at_fire`, `bond +1` | consumable: N
- "Leave. Now. Without the conversation." → `hostile_pass_attempt` | (convergent — bail late; routes back to the pass attempt — costs the same, plus narration about how Hollis will not let this slide) | gating: none | effects: sets `bailed_late` | consumable: N
NPCs present: per party + Hollis + Hollis's Second + lieutenant.

### Conversation — `talk_hollis_camp`
Purpose: The brief's broken-conversation-rule scene. Hollis monologues. Three depleting topics, each surfaces another tell. Walk-away routes to the resolution scene where fight / flee / yield are offered.
Topics:
- "Tell me about your camp." → `talk_hollis_camp_topic` | gating: requires `flags_unset: [asked_hollis_camp]` | effects on return: sets `asked_hollis_camp`. **Tell:** he describes the perimeter routine in too much detail; the lieutenant winces at one specific number. | consumable: Y
- "What's on the radio?" → `talk_hollis_radio` | gating: requires `flags_unset: [asked_hollis_radio]` | effects on return: sets `asked_hollis_radio`. **Tell:** he changes the subject too fast. If `heard_marina` set, narration calls out the coordinate change. | consumable: Y
- "Why are you asking about the kid?" → `talk_hollis_mara` | gating: requires `child_rescued` AND `flags_unset: [asked_hollis_mara]`, hide_if_failed | effects on return: sets `asked_hollis_mara`, sets `hollis_named_mara`. **Tell:** the fourth tell — direct. | consumable: Y
Walk-away:
- "Stand up. Eyes on Hollis. Make a choice." → `hostile_resolution` | gating: none | effects: sets `talked_hollis_done` | consumable: N
NPCs present: per party + Hollis + Hollis's Second. **Proximity cue:** the dead at the wire. The lieutenant pulls one off mid-conversation. Hollis does not pause; the player notices that the lieutenant did not look at Hollis when he did it.

### Scene: `talk_hollis_camp_topic`
Purpose: The perimeter detail. Lieutenant winces.
Choices:
- "Back." → `talk_hollis_camp` | gating: none | effects: sets `asked_hollis_camp` | consumable: N
NPCs present: Hollis, Hollis's Second + per party.

### Scene: `talk_hollis_radio`
Purpose: He changes the subject. The radio audible behind him.
Choices:
- "Back." → `talk_hollis_camp` | gating: none | effects: sets `asked_hollis_radio` | consumable: N
NPCs present: Hollis + per party.

### Scene: `talk_hollis_mara`
Purpose: He has been listening for two days. The honesty is the worst tell.
Choices:
- "Back." → `talk_hollis_camp` | gating: none | effects: sets `asked_hollis_mara`, sets `hollis_named_mara` | consumable: N
NPCs present: Hollis + per party.

### Scene: `hostile_resolution`
Purpose: The three resolutions. Gates determine which are survivable.
Choices:
- "Fight. Pistol up. Drop Hollis first." → `hostile_fight` | (convergent — fight; gated on resources; without them this is a death scene — separate gate route) | gating: requires `has_pistol` AND `health >= 3`, grey out | effects: `health -1`, `supplies -1`, sets `killed_survivor`. If a companion present and `health` was 3: companion takes the wound — see Stage 5 routing to `hostile_fight_companion`. Caleb dies if `health <= 1` going in (legible — his Beat 11 bark and Stage 5 prose). | consumable: N
- "Fight. No pistol or thin." → `death_d5_hostile_fight` | (convergent — under-resourced fight; named: *you fought a stronger group with insufficient resources*) | gating: requires `flags_unset: [has_pistol]` OR `health < 3`, grey out | effects: none | consumable: N
- "Flee. Walk out of the firelight." → `hostile_flee` | (convergent — flee; -1 supplies; if Mara rescued, narration includes leaving Mara's pack) | gating: none | effects: `supplies -1`, `bond -1` (only if `child_rescued`; otherwise `bond +0`), sets `fled_hostile` | consumable: N
- "Yield. Sit down. Hand over the bag." → `hostile_yield` | (convergent — yield; permadeath path unless `bond >= 3`) | gating: none | effects: sets `yielded_hostile` | consumable: N
- "Yield, but reach for the rescue." → `hostile_yield_rescue` | (convergent — companion rescue; HIDDEN per structure — bond gate, existence is the spoiler) | gating: requires `bond >= 3` AND (`neighbour_alive` OR `elder_alive` OR `teen_alive` OR `stranger_alive`), hide_if_failed | effects: sets `yielded_hostile`, sets `companion_sacrificed`, `bond +1`, `supplies -2` | consumable: N
NPCs present: per party + Hollis + lieutenant + Hollis's Second.

### Scene: `hostile_fight`
Purpose: Fight resolution. With a companion at health-edge, the companion takes the wound. Without, the player wins solo. Routes to the perimeter-break exit beat.
Choices:
- "Move. Now. Use the breach." → `hostile_perimeter_break` | (convergent — escape) | gating: none | effects: see hostile_resolution effects above; companion-specific deaths resolved here (Caleb if `health <= 1`, Stage 5 narrates) | consumable: N
NPCs present: per party (some now dead) + Hollis (dead) + lieutenant (fled).

### Scene: `hostile_flee`
Purpose: Walk away the moment the second tell registers. Mara's pack lost if applicable. Routes to perimeter break.
Choices:
- "Out. Don't look back." → `hostile_perimeter_break` | gating: none | effects: none | consumable: N
NPCs present: per party + Hollis at distance.

### Scene: `hostile_yield`
Purpose: The slow death scene. Permadeath unless the rescue fires (which it didn't — this is the no-rescue branch).
Choices: none (terminal). *(Death ending D6 — Yielded at the fire.)*
NPCs present: per party + Hollis + lieutenant + Hollis's Second.

### Scene: `hostile_yield_rescue`
Purpose: Hidden bond-gate intervention. A companion creates a distraction at the firelight. Player escapes. Companion is left behind. Priority Dale > Ruth > Caleb > Wren — set the relevant `_alive` flag false and `companion_sacrificed`.
Choices:
- "Run. Don't look back." → `hostile_perimeter_break` | gating: none | effects: clears the highest-priority companion-alive flag in priority order Dale > Ruth > Caleb > Wren | consumable: N
NPCs present: per party (one fewer) + Hollis + lieutenant.

### Scene: `death_d5_hostile_fight` *(death ending D5 — Fought thin)*
Purpose: Terminal. Names misjudgement: *you fought a stronger group with insufficient resources*.
Choices: none (terminal).
NPCs present: per party as witnesses + Hollis + lieutenant.

### Scene: `hostile_perimeter_break`
Purpose: The perimeter breaks no matter the resolution. The act's last beat is fighting through dead toward the eastern arterial. Routes to Beat 13.
Choices:
- "Through the dead. East." → `rooftop_approach` | gating: none | effects: none | consumable: N
NPCs present: per party. **Proximity cue:** the perimeter wire has teeth in it now, fresh ones.

---

## Beat 13 — The rooftop (Wren's truth or a quiet beat)

### Scene: `rooftop_approach`
Purpose: A parking structure roof, evening of day two. The stairwell echoes — dead inside, two floors below. Brief approach scene; routes by Wren state.
Choices:
- "Up. Find a spot at the edge." → branches by Wren state:
  - `stranger_alive` AND `probed_wren` → `rooftop_wren_truth`
  - `stranger_alive` AND `trusted_wren` → `rooftop_wren_betrayal_setup`
  - `refused_wren` (Wren refused at Beat 9; she may be alive or dead) → `rooftop_quiet`
  - Wren dead at Beat 12 → `rooftop_quiet`
  | gating: none | effects: none | consumable: N
NPCs present: per party. Stairwell scratch audible.

### Scene: `rooftop_wren_truth`
Purpose: Wren comes clean. Truck keys. `has_keys` set. Real ally for Act 3. Routes via a small bond beat.
Choices:
- "Take the keys. Thank her plainly." → `rooftop_bond_beat` | (convergent — accept) | gating: none | effects: sets `has_keys`, `bond +1`, sets `wren_truthed` | consumable: N
- "Take the keys. Ask why now." → `rooftop_bond_beat` | (convergent — probe more; same effects + Stage 5 surfaces a small extra exchange where Wren names the brother) | gating: none | effects: sets `has_keys`, `bond +1`, sets `wren_truthed`, sets `wren_named_brother` | consumable: N
- "Refuse the keys. The truck is hers." → `rooftop_bond_beat` | (convergent — defer; `bond +1`, sets `wren_offered_keys` — Stage 5: Act 3 prose still treats Wren as a real ally; the truck simply isn't on the table for this run) | gating: none | effects: `bond +1`, sets `wren_offered_keys` | consumable: N
NPCs present: per party + Wren. **Proximity cue:** the dead in the stairwell are working on it; one character flinches.

### Scene: `rooftop_wren_betrayal_setup`
Purpose: She waits for the party to sleep. The player has *one* readable last chance — `bond >= 2` peaceful resolution. Below that, betrayal fires. Stage 5 surfaces three tells in framing prose (her bag is closed and on her shoulder during the rest beat where everyone else has set theirs down; she takes the watch she didn't ask for; her two-beat joke at the rest beat is the same one from the corridor).
Choices:
- "Sit with her. Talk her down. Use what you know." → `rooftop_wren_peaceful` | (convergent — peaceful resolution) | gating: requires `bond >= 2`, grey out (player should know they could try if they have the read) | effects: none | consumable: N
- "Sleep. Trust her on watch." → `rooftop_wren_betrayed` | (convergent — sleep; betrayal fires) | gating: none | effects: none | consumable: N
- "Don't sleep. Watch her." → `rooftop_wren_caught` | (convergent — paranoid late; she leaves quietly without taking anything, no truck reveal — `bond +0`, supplies +0, `stranger_alive` cleared, `betrayed_by_wren` not set) | gating: none | effects: clears `stranger_alive`, sets `wren_left_quiet` | consumable: N
- "Confront her now. Make her show the bag." → `rooftop_wren_confront` | (convergent — direct; same outcome as peaceful at `bond >= 2`, otherwise she fights and leaves with `betrayed_by_wren` and `-1 supplies`) | gating: none | effects: at `bond >= 2` routes to peaceful resolution; otherwise routes to a half-betrayal where she leaves with `-1 supplies` only (no companion bag taken) | consumable: N
NPCs present: per party + Wren.

### Scene: `rooftop_wren_peaceful`
Purpose: Bond-earned peaceful. She stays. Truck reveal still fires. Routes to bond beat with the same effects as `rooftop_wren_truth`.
Choices:
- "Take the keys. The two of you on watch the rest of the night." → `rooftop_bond_beat` | gating: none | effects: sets `has_keys`, `bond +1`, sets `wren_truthed`, sets `wren_peaceful` | consumable: N
NPCs present: per party + Wren.

### Scene: `rooftop_wren_betrayed`
Purpose: Betrayal fires. Wren takes -2 supplies and the pistol if present. If `child_rescued` AND Caleb alive, narration warns: she could take Caleb's bag — Stage 5 only fires the companion-bag take if `caleb_was_lied_to` is *still* true at this point (his trust was already poisoned, he didn't wake) — and even then *the bag*, not Caleb's life. She does not take Caleb. Sets `betrayed_by_wren`, clears `stranger_alive`, clears `has_pistol` if set, `supplies -2`.
Choices:
- "Wake at dawn. She's gone." → `rooftop_bond_beat_betrayed` | gating: none | effects: clears `stranger_alive`, sets `betrayed_by_wren`, `supplies -2`, clears `has_pistol` if set | consumable: N
NPCs present: per party (Wren absent at dawn).

### Scene: `rooftop_wren_caught`
Purpose: Player did not sleep. Wren leaves quietly without taking anything. Cold. Routes to bond beat without effects.
Choices:
- "Watch her go. Wait for dawn." → `rooftop_bond_beat` | gating: none | effects: none | consumable: N
NPCs present: per party (Wren leaving).

### Scene: `rooftop_wren_confront`
Purpose: Direct confront. Resolves by `bond` threshold.
Choices:
- "Press her. Show the bag." → branches:
  - `bond >= 2` → `rooftop_wren_peaceful`
  - `bond < 2` → `rooftop_wren_half_betrayal`
  | gating: none | effects: none | consumable: N
NPCs present: per party + Wren.

### Scene: `rooftop_wren_half_betrayal`
Purpose: She fights, takes a single supply, leaves. No pistol taken. `betrayed_by_wren` set, `stranger_alive` cleared, `supplies -1`.
Choices:
- "Let her go. Don't escalate." → `rooftop_bond_beat_betrayed` | gating: none | effects: clears `stranger_alive`, sets `betrayed_by_wren`, `supplies -1` | consumable: N
NPCs present: per party.

### Scene: `rooftop_quiet`
Purpose: No-Wren rooftop. Bond opportunity instead. Stage 5 picks the tone by surviving companion (Ruth's son monologue if Ruth alive, Caleb's first laugh if Caleb alive, Dale telling the player to keep going if Dale alive, or a Mara beat if no adult survivors but `child_rescued`). If Wren is dead at Beat 12, Stage 5 references it once.
Choices:
- "Engage. Listen." → `rooftop_bond_beat` | (convergent — open) | gating: none | effects: `bond +1` | consumable: N
- "Keep watch alone. Let them rest." → `rooftop_bond_beat` | (convergent — quiet care) | gating: none | effects: `bond +1` if any companion alive, otherwise `bond +0` | consumable: N
- "Sit alone. Don't speak." → `rooftop_bond_beat` | (convergent — cold) | gating: none | effects: `bond -1` | consumable: N
NPCs present: per party.

### Scene: `rooftop_bond_beat`
Purpose: Brief shared meal / quiet exchange before the morning. Optional `shared_supplies` flag set if the player chose to share. Single-choice routing forward.
Choices:
- "Share the food. With everyone." → `talk_caleb_hub` if `teen_alive` else `talk_dale_brief` if `neighbour_alive` else `arterial_dawn` | (convergent — share; `supplies -1`, sets `shared_supplies`, `bond +1`) | gating: none | effects: `supplies -1`, sets `shared_supplies`, `bond +1` | consumable: N
- "Eat alone. Pass watch." → next as above | (convergent — pragmatic) | gating: none | effects: none | consumable: N
- "Open `talk_caleb` topics now while there's time." → `talk_caleb_hub` | gating: requires `teen_alive` AND `flags_unset: [talked_caleb_done]` | effects: none | consumable: N (the hub depletes on its own)
- "Open Dale's last topic — the wedding band." → `talk_dale_brief` | gating: requires `neighbour_alive` AND `flags_unset: [talked_dale_brief_done]` | effects: none | consumable: N
NPCs present: per party.

### Scene: `rooftop_bond_beat_betrayed`
Purpose: Variant of bond beat for the betrayed run. Quieter. The party is short one.
Choices:
- "Share what's left." → next as above (`talk_caleb_hub` / `talk_dale_brief` / `arterial_dawn`) | (convergent — share; `supplies -1`, sets `shared_supplies`, `bond +1`) | gating: none | effects: `supplies -1`, sets `shared_supplies`, `bond +1` | consumable: N
- "Don't talk about it." → next as above | (convergent — cold; `bond -1`) | gating: none | effects: `bond -1` | consumable: N
- "Open `talk_caleb`." → `talk_caleb_hub` | gating: requires `teen_alive` AND `flags_unset: [talked_caleb_done]` | effects: none | consumable: N
- "Open Dale's last topic." → `talk_dale_brief` | gating: requires `neighbour_alive` AND `flags_unset: [talked_dale_brief_done]` | effects: none | consumable: N
NPCs present: per party.

### Conversation — `talk_caleb_hub`
Purpose: Three topics. Each `+1 bond`. Walk-away routes onward. Caleb finally talks.
Topics:
- "School." → `talk_caleb_school` | gating: requires `flags_unset: [asked_caleb_school]` | effects on return: sets `asked_caleb_school`, `bond +1` | consumable: Y
- "Your parents." → `talk_caleb_parents` | gating: requires `flags_unset: [asked_caleb_parents]` | effects on return: sets `asked_caleb_parents`, `bond +1`. **Tell-callback:** if `caleb_was_lied_to` is still set, his answer surfaces the betrayal — Stage 5 either resolves it (the player who admits the lie gets `bond +2` total here, sets `confessed_lie`) or hardens it (silence here sets `caleb_distrust` flag — narrative-only soft cost). | consumable: Y
- "Why didn't you run?" → `talk_caleb_run` | gating: requires `flags_unset: [asked_caleb_run]` | effects on return: sets `asked_caleb_run`, `bond +1` | consumable: Y
Walk-away:
- "Time to move. The arterial is east." → `talk_dale_brief` if `neighbour_alive` AND `flags_unset: [talked_dale_brief_done]` else `arterial_dawn` | gating: none | effects: sets `talked_caleb_done` | consumable: N
NPCs present: per party. **Proximity cue:** the structure's stairwell still echoes. Stage 5: one topic ends with a sound interrupt; Caleb stops, then continues.

### Scene: `talk_caleb_school`
Purpose: A class he liked. A teacher who used to live two streets over.
Choices:
- "Back." → `talk_caleb_hub` | gating: none | effects: sets `asked_caleb_school`, `bond +1` | consumable: N
NPCs present: Caleb + per party.

### Scene: `talk_caleb_parents`
Purpose: Mother in the kitchen. Father in the basement. He saw both. The lie-surface beat (see hub).
Choices:
- "Admit you lied at the door. 'I'm not a paramedic.'" → `talk_caleb_hub` | (convergent — confess; only fires if `caleb_was_lied_to`) | gating: requires `caleb_was_lied_to`, hide_if_failed | effects: sets `asked_caleb_parents`, `bond +2`, sets `confessed_lie`, clears `caleb_was_lied_to` | consumable: N
- "Don't say anything about the door. Sit with him." → `talk_caleb_hub` | (convergent — silent; `bond +1`; if `caleb_was_lied_to` still set, sets `caleb_distrust` — narrative soft cost) | gating: none | effects: sets `asked_caleb_parents`, `bond +1`. If `caleb_was_lied_to` set: also sets `caleb_distrust` | consumable: N
- "Change the subject. Talk about something else." → `talk_caleb_hub` | (convergent — deflect; no bond change beyond the topic flag) | gating: none | effects: sets `asked_caleb_parents` | consumable: N
NPCs present: Caleb + per party.

### Scene: `talk_caleb_run`
Purpose: Why he didn't. He waited at the window for a friend who never came.
Choices:
- "Back." → `talk_caleb_hub` | gating: none | effects: sets `asked_caleb_run`, `bond +1` | consumable: N
NPCs present: Caleb + per party.

### Scene: `talk_dale_brief`
Purpose: Dale's last topic — the wedding band. Single topic. Bond +1 regardless. Hard cutoff after this.
Choices:
- "Ask about the ring. Listen to whatever he says." → `arterial_dawn` | (convergent — engage) | gating: none | effects: sets `talked_dale_brief_done`, `bond +1` | consumable: N
- "Don't ask. Sit with him in silence." → `arterial_dawn` | (convergent — quiet; `bond +1` regardless per structure) | gating: none | effects: sets `talked_dale_brief_done`, `bond +1` | consumable: N
NPCs present: Dale + per party. **Proximity cue:** stairwell sound; Dale flinches at it (he is more present than he was — informed mercy is closer to him now).

---

## Beat 14 — The pharmacy and the eastern arterial

### Scene: `arterial_dawn`
Purpose: Dawn of day three. The party is approaching the east of the city. The pharmacy is on the way; the river is audible at the far end of the road. Three options: pharmacy, Ruth's clinic (if `ruth_key`), skip both.
Choices:
- "Pharmacy. We need bandages and bullets." → `pharmacy_entry` | (convergent — pragmatic; full risk path) | gating: requires `flags_unset: [looted_pharmacy]` | effects: none | consumable: N (the entry sub-scene flags `looted_pharmacy` on resolve)
- "Ruth's clinic. The key works." → `ruth_clinic` | gating: requires `ruth_key` AND `flags_unset: [used_ruth_clinic]`, grey out (player should know this exists) | effects: none | consumable: Y (the clinic flags itself on resolve)
- "Both. Clinic first, pharmacy after." → `ruth_clinic_then_pharmacy` | (convergent — greedy) | gating: requires `ruth_key` AND `flags_unset: [used_ruth_clinic]` AND `flags_unset: [looted_pharmacy]`, grey out | effects: none | consumable: N
- "Skip both. Straight to the arterial." → `arterial_run` | (convergent — austere) | gating: none | effects: none | consumable: N
NPCs present: per party. River audible — the first open sound the player has heard in two days. **Proximity cue:** the cul-de-sac horde from Act 1 has caught up by attrition; the chord is layered with a *closer* throat now.

### Scene: `pharmacy_entry`
Purpose: Pharmacy. Front shutter compromised, back office locked. Inside: the dead, in the back room, before the player opens the door. Resolution gates by resources.
Choices:
- "Push to the back. Pistol up. Health holds." → `pharmacy_success` | (convergent — full resources) | gating: requires `has_pistol` AND `health >= 3`, grey out | effects: `health +1`, `supplies +1`, `supplies -1` (bandages and bullets), sets `looted_pharmacy` | consumable: N
- "Push to the back. Anyway." → `pharmacy_partial` | (convergent — under-resourced but committed; `-1 health`, `+1 supplies`, `looted_pharmacy`) | gating: requires `has_pistol` XOR `health >= 3`, grey out | effects: `health -1`, `supplies +1`, sets `looted_pharmacy` | consumable: N
- "Push to the back. Without a gun and thin." → `death_d6_pharmacy` | (convergent — die or flee gate; the scene tells the player to flee; this is the player who insists) | gating: requires `flags_unset: [has_pistol]` AND `health < 3`, grey out | effects: none | consumable: N
- "Flee. Take what's on the front shelves only." → `arterial_run` | (convergent — flee; small +0/+1 supplies depending on luck — Stage 5 narrates) | gating: none | effects: `supplies +0` (flat — narrated as a small grab), sets `looted_pharmacy` | consumable: N
NPCs present: per party. The dead in the back, audible.

### Scene: `pharmacy_success`
Purpose: Out with the supplies. The dead followed.
Choices:
- "Out the back. Toward the arterial." → `arterial_run` | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `pharmacy_partial`
Purpose: Got cut. Got something. Out.
Choices:
- "Out. Don't stop." → `arterial_run` | gating: none | effects: none | consumable: N
NPCs present: per party.

### Scene: `death_d6_pharmacy` *(death ending D6 — Pharmacy bite)*
Purpose: Terminal. Names the misjudgement: *the scene told you to flee, you didn't*.
Choices: none (terminal).
NPCs present: per party as witnesses.

### Scene: `ruth_clinic`
Purpose: Ruth's clinic, if she gave the key. +2 health one-shot. The clinic is small, two rooms, locked when they leave. Ruth is here only if `elder_alive`; otherwise the key is the only thing in the room.
Choices:
- "Use the kit. Rest fifteen minutes." → `arterial_run` | (convergent — use it; +2 health, sets `used_ruth_clinic`) | gating: none | effects: `health +2`, sets `used_ruth_clinic` | consumable: N (the gate at `arterial_dawn` already required `flags_unset: [used_ruth_clinic]`)
- "Leave the kit. Take only what fits." → `arterial_run` | (convergent — austere; sets `used_ruth_clinic`, `bond +1`) | gating: none | effects: `bond +1`, sets `used_ruth_clinic` | consumable: N
NPCs present: per party + Ruth (if alive). **Proximity cue:** the dead are at the alley behind the clinic, working on the back door.

### Scene: `ruth_clinic_then_pharmacy`
Purpose: Greedy path. Use the clinic, then push the pharmacy. Routes via the clinic effects then to pharmacy entry.
Choices:
- "Clinic first." → `pharmacy_entry` | gating: none | effects: `health +2`, sets `used_ruth_clinic` | consumable: N
NPCs present: per party + Ruth (if alive).

### Scene: `arterial_run`
Purpose: The road east. The river audible. **Dale's arc resolves here** if applicable. The cul-de-sac horde is now caught up by attrition; this is the running beat. Branches by Dale state.
Choices:
- "Run. The party. Together." → branches by Dale state and `bond`:
  - `neighbour_alive` AND `dale_bitten` AND `bond >= 2` → `arterial_dale_holds`
  - `neighbour_alive` AND `dale_bitten` AND `bond < 2` → `arterial_dale_turns`
  - `neighbour_alive` AND NOT `dale_bitten` → `arterial_dale_alive`
  - NOT `neighbour_alive` → `arterial_run_resolve`
  | gating: none | effects: none | consumable: N
NPCs present: per party. **Proximity cue:** open road, open sky, the river ahead, the chord behind.

### Scene: `arterial_dale_holds`
Purpose: Dale offers his end at the arterial. Prelude to E6's geometry — grief, not triumph. Stage 5 must surface the weight: he names the player by their first name; he turns the wedding band one last time. Sets `dale_held_arterial`. Routes to resolve. `neighbour_alive` cleared.
Choices:
- "Let him hold. Run." → `arterial_run_resolve` | (convergent — accept) | gating: none | effects: clears `neighbour_alive`, sets `dale_held_arterial`, `bond +1`, clears `dale_bitten` | consumable: N
- "Refuse. Carry him further." → `arterial_dale_turns` | (convergent — denial; same destination, the bite catches up) | gating: none | effects: none | consumable: N
NPCs present: per party + Dale.

### Scene: `arterial_dale_turns`
Purpose: He turns mid-run. The party puts him down. `neighbour_alive` cleared. `dale_bitten` cleared. No bond change either way (the moment is its own weight).
Choices:
- "Do it. Don't look at Caleb." → `arterial_run_resolve` | gating: none | effects: clears `neighbour_alive`, clears `dale_bitten` | consumable: N
NPCs present: per party + Dale (turning).

### Scene: `arterial_dale_alive`
Purpose: Dale not bitten, runs alongside. He still exits — by the brief's contract, no Dale party reaches Act 3 with `dale_bitten` set, and the structure says Dale also exits at the arterial on `bond < 2` runs. Branches by bond.
Choices:
- "Run together." → branches:
  - `bond >= 2` → `arterial_dale_alive_carry` (Dale survives the run; cleared at the next sub-scene because the dead catch him there — this is the structure's hard rule, narrated as a final stand)
  - `bond < 2` → `arterial_dale_alive_falls` (cold version — he falls behind, the party leaves him; clears `neighbour_alive`, sets `abandoned_wounded` if not already)
  | gating: none | effects: none | consumable: N
NPCs present: per party + Dale.

### Scene: `arterial_dale_alive_carry`
Purpose: He runs with the player as long as he can. At the corner, he stops and turns — no bite, just exhaustion. Tells the player to go. Clears `neighbour_alive`. `bond +1`.
Choices:
- "Hold his eye. Go." → `arterial_run_resolve` | gating: none | effects: clears `neighbour_alive`, `bond +1`, sets `dale_held_arterial` | consumable: N
NPCs present: per party + Dale.

### Scene: `arterial_dale_alive_falls`
Purpose: Cold version. He falls behind. The player keeps going. Clears `neighbour_alive`. Sets `abandoned_wounded` if not already set. `bond -1`.
Choices:
- "Don't turn around." → `arterial_run_resolve` | gating: none | effects: clears `neighbour_alive`, sets `abandoned_wounded`, `bond -1` | consumable: N
NPCs present: per party + Dale (falling behind).

### Scene: `arterial_run_resolve`
Purpose: The east edge of the city. The arterial opens onto the river road. Sets `act2_complete`. Routes to the act-2 exit router. Other companion attrition can fire here — Stage 5 may narrate a Caleb / Ruth / Wren wound that drops them if `health` is critical for them (not the player) — but the structure already accounts for this in Beats 11–12, so by default this is the routing scene.
Choices:
- "Out. Onto the road. The river is loud now." → `act2_exit_router` | gating: none | effects: sets `act2_complete` | consumable: N
NPCs present: per party.

---

## Beat 14b — Act 2 exit router (engine-only routing scene)

### Scene: `act2_exit_router`
Purpose: Resolves which of the five Act 2 exit configurations the player has earned. Single forced choice. Stage 5 writes one paragraph calibrated to the exit it routes to.
Choices:
- "The river road." → branches by flag combination:
  - α (Cold Solo): no companion alive, `child_rescued` false, `bond <= -1` (typically `abandoned_wounded` true and/or `killed_survivor`/`looted_church`) → `exit_alpha_cold_solo`
  - β (Broken Solo): no companion alive, `child_rescued` false, `bond` -1 to +1, NOT `abandoned_wounded`, NOT `looted_church`, NOT `killed_survivor` → `exit_beta_broken_solo`
  - γ (Mara alone with her): `child_rescued` true, no adult companion alive → `exit_gamma_mara_solo`
  - δ (One adult, no Mara): exactly one of {Caleb, Ruth, Wren} alive (plus `stranger_alive` AND NOT `betrayed_by_wren` if Wren), `child_rescued` false, `neighbour_alive` always false → `exit_delta_one_adult`
  - ε (Mara + one adult): `child_rescued` true AND exactly one of {Caleb, Ruth, Wren} alive (Wren only if NOT `betrayed_by_wren`), `bond >= 4`, NOT `killed_survivor`, NOT `abandoned_wounded`, at least one `shared_supplies` → `exit_epsilon_mara_plus_one`
  | gating: none | effects: none | consumable: N
NPCs present: per exit configuration.

### Scene: `exit_alpha_cold_solo`
Purpose: Hand-off to Act 3 — α. Stage 5 / Stage 2-Act-3 will define the entry-framing prose against this stub.
Choices: routes to Act 3 entry.
NPCs present: none.

### Scene: `exit_beta_broken_solo`
Purpose: Hand-off — β.
NPCs present: none.

### Scene: `exit_gamma_mara_solo`
Purpose: Hand-off — γ. Mara only.
NPCs present: Mara.

### Scene: `exit_delta_one_adult`
Purpose: Hand-off — δ. One adult of {Caleb, Ruth, Wren}.
NPCs present: per the surviving companion.

### Scene: `exit_epsilon_mara_plus_one`
Purpose: Hand-off — ε. Mara + one adult.
NPCs present: per surviving party.

---

## NPCs in this act

- **Dale Pearson** — entry framings D, E, F. Recurs: `entry_d_dale`, `entry_e_clean`, `entry_f_poisoned`, `apt2_bath` (bandage), `mara_climb_check` (Dale-aided variant), `mara_descent`, `talk_dale_brief`, `arterial_dale_holds`, `arterial_dale_turns`, `arterial_dale_alive*`. Exits in act per brief contract.
- **Caleb Pearson** — entry framings C, E, F. Recurs: `entry_c_caleb`, `entry_e_clean`, `entry_f_poisoned`, `mara_climb_check` (Caleb-aided variant), `mara_descent`, `hostile_*` (legible death gate at low health), `talk_caleb_hub`, `talk_caleb_school`, `talk_caleb_parents`, `talk_caleb_run`. Carries to Act 3 if alive.
- **Ruth Hollander** — first appears `church_door` (Beat 10). Recurs: `church_inside_help`, `church_inside_help_lite`, `church_pass_by`, `talk_ruth_hub`, `talk_ruth_church`, `talk_ruth_son`, `talk_ruth_mirror`, `mara_climb_check` (Ruth-aided variant — alley spotter), `ruth_clinic` (if alive at Beat 14), `ruth_clinic_then_pharmacy`. Carries to Act 3 if `elder_alive`.
- **Wren** — first appears `corridor_apartments_1` (Beat 8 apartments) or `roof_access` (Beat 9 — apartments hub). Recurs: `corridor_apartments_meet_wren`, `talk_wren_hub`, `talk_wren_geography`, `talk_wren_bag`, `talk_wren_want`, `mara_climb_check` (Wren-aided variant — rope), `hostile_camp` (silent presence — fourth tell, body language read), `rooftop_wren_truth`/`betrayal_setup`/`peaceful`/`betrayed`/`caught`/`confront`/`half_betrayal`. Carries to Act 3 if `stranger_alive` AND NOT `betrayed_by_wren`.
- **Hollis** — first appears `hostile_funnel` (Beat 12). Recurs: `hostile_camp_read`, `hostile_pass_attempt`, `hostile_passed` (heard once on radio at Beat 13 if alive), `hostile_camp`, `talk_hollis_camp` and topic sub-scenes, `hostile_resolution`, `hostile_fight` (dead), `hostile_yield`, `hostile_yield_rescue`. Does not survive the beat alive in any branch the player exits with.
- **Hollis's Second** ("Reece" — Stage 5 may use the name in dialogue) — first appears `hostile_funnel`. Recurs: `hostile_camp_read`, `hostile_camp`, `talk_hollis_camp`, `talk_hollis_camp_topic`, `hostile_resolution`. Wince-tell character. Cast entry appended below.
- **Hollis's Lieutenant** ("Brick" — bit-part name; Stage 5 may not use it) — first appears `hostile_funnel`. Recurs: `hostile_pass_attempt` (tails the player), `hostile_camp` (pulls dead off the wire), `hostile_resolution`. No spoken lines required; bit-part. Cast entry appended below.
- **Mara** — first appears `mara_supply_closet` (Beat 11). Recurs: `mara_descent`, `talk_mara_hub`, `talk_mara_name`, `talk_mara_mother`. Carries to Act 3 if `child_rescued` AND `child_alive`. Third `talk_mara` topic (the dark) reserved for Act 3 per structure.
- **Soldier with the Megaphone** — first appears `checkpoint_approach` (Beat 8 underpass). Recurs: `checkpoint_wait_1`, `checkpoint_wait_2`, `checkpoint_wait_3`, `checkpoint_speak_1`, `death_d2_checkpoint`. Cast entry appended below.
- **Lone Walker** — first appears `random_lone_walker` or `random_lone_walker_apartments` (Beat 8 random encounter). Recurs: `random_walker_trade`, `random_walker_trade_apartments`. Cast entry appended below.
- **Ruth's Husband** — off-page presence at the church (Beat 10). Sound-only; never given a TTS voice. Set dressing per the brief's no-cute-nicknames rule. Not a cast entry.

All on-page named NPCs in this act resolve to entries in `cast.md`. New supporting cast entries appended in this stage: Hollis's Second, Hollis's Lieutenant, Soldier with the Megaphone, Lone Walker.

---

## Choice density gate

Counting active choices per scene (gated/hidden choices that most players won't see at that point are excluded; pacing/routing beats are counted as 1):

| Scene | Active choices |
|---|---|
| `act2_entry_router` | 1 (engine routing) |
| `entry_a_solo_cold` | 1 (pacing — narration-led) |
| `entry_b_solo_mercy` | 1 (pacing — narration-led) |
| `entry_c_caleb` | 2–3 (3rd is conditional confess) |
| `entry_d_dale` | 3 (push-leg greyed once asked) |
| `entry_e_clean` | 3 |
| `entry_f_poisoned` | 2–3 (3rd hidden until `saw_dale_leg`) |
| `route_resolve` | 1 (engine routing) |
| `corridor_underpass_1` | 3 |
| `corridor_underpass_random` | 1 (the weighted random itself) |
| `random_uneventful` | 1 (pacing) |
| `random_lone_walker` | 3 |
| `random_walker_trade` | 1 (pacing) |
| `random_window_sound` | 2 |
| `random_window_inside` | 1 (pacing) |
| `checkpoint_approach` | 3 |
| `checkpoint_wait_1` | 2 |
| `checkpoint_wait_2` | 2 |
| `checkpoint_wait_3` | 1 (pacing — exit beat) |
| `checkpoint_speak_1` | 1 (pacing) |
| `death_d2_checkpoint` | 0 (terminal) |
| `corridor_apartments_1` | 3 (4 with `read_road_sign` first time; typical 3) |
| `corridor_apartments_signread` | 1 (pacing — return with knowledge) |
| `corridor_apartments_meet_wren` | 3 |
| `corridor_apartments_random` | 1 (the weighted random itself) |
| `random_uneventful_apartments` | 1 (pacing) |
| `random_lone_walker_apartments` | 3 |
| `random_walker_trade_apartments` | 1 (pacing) |
| `random_window_sound_apartments` | 2 |
| `random_window_inside_apartments` | 1 (pacing) |
| `corridor_sewer_1` | 3 |
| `corridor_sewer_listen` | 1 (pacing — escape with cheap supply cost) |
| `corridor_sewer_back` | 1 (pacing — random of two corridors) |
| `corridor_sewer_back_cheap` | 1 (pacing — random of two corridors) |
| `corridor_sewer_2` | 2–3 (3 with pistol) |
| `corridor_sewer_3` | 1–3 active (only one survives gating per typical run; gates are exclusive — typical 1) |
| `corridor_sewer_survive` | 1 (pacing — exit) |
| `death_d3_sewer_crawl` / `death_d3_sewer_overrun` | 0 (terminal) |
| `apartments_courtyard` (hub) | 4–6 typical (3 doors + roof + Wren; "leave" gates in late) |
| `apt1_kitchen` | 3 |
| `apt2_bath` | 2–4 (Dale-bandage gate hidden if no Dale; typical 2) |
| `apt3_breakthrough_choice` | 3 |
| `apt3_locked_loud` | 1 (pacing — forced exit) |
| `apt3_locked_quiet` | 1 (pacing) |
| `roof_access_forced` | 1 (Wren-or-not branch in routing) |
| `roof_access` | 2–3 (third only with companion) |
| `talk_wren_hub` | 4–6 (3 topics + 3 walk-away — typical 4–5) |
| `talk_wren_geography` / `_bag` / `_want` | 1 each (conversation sub-scenes — `back` pattern) |
| `church_approach` | 4 |
| `church_side_door` | 1 (pacing) |
| `church_door` | 4 |
| `church_inside_help` | 2 |
| `church_inside_loot_setup` | 4 |
| `church_loot_done` | 1 (pacing) |
| `church_inside_help_lite` | 1 (pacing) |
| `church_pass_by` | 1 (pacing) |
| `talk_ruth_hub` | 4 (3 topics + walk-away) |
| `talk_ruth_church` / `_son` / `_mirror` | 1 each (conversation sub-scenes) |
| `mara_approach` | 3 |
| `mara_perimeter` | 3 |
| `mara_perimeter_third` | 1 (pacing) |
| `mara_climb_check` | 4–6 active (gates exclusive; typical 1 survives the read — pacing-flavoured choice) — Stage 5 to verify; structurally this is a "pick the companion you have" gate scene |
| `mara_climb_inside` | 2 |
| `mara_floor_three_desk` | 1 (pacing) |
| `mara_supply_closet` | 3 |
| `talk_mara_hub` | 3 (2 topics + walk-away) |
| `talk_mara_name` | 1 (pacing — return) |
| `talk_mara_mother` | 3 (truth/lie/middle convergent) |
| `mara_descent` | 1–3 active (gates exclusive; typical 1) |
| `mara_refused` | 1 (pacing — funnel) |
| `death_d4_mara_front` | 0 (terminal) |
| `hostile_funnel` | 3 |
| `hostile_camp_read` | 2 |
| `hostile_pass_attempt` | 2 |
| `hostile_passed` | 1 (pacing) |
| `hostile_camp` | 3 |
| `talk_hollis_camp` (hub) | 3–4 (2–3 topics + walk-away; Mara topic hidden if not rescued — typical 3) |
| `talk_hollis_camp_topic` / `_radio` / `_mara` | 1 each (conversation sub-scenes) |
| `hostile_resolution` | 4–5 (5 with bond-rescue; typical 4) |
| `hostile_fight` | 1 (pacing — exit) |
| `hostile_flee` | 1 (pacing — exit) |
| `hostile_yield` | 0 (terminal) |
| `hostile_yield_rescue` | 1 (pacing — exit) |
| `death_d5_hostile_fight` | 0 (terminal) |
| `hostile_perimeter_break` | 1 (pacing — funnel) |
| `rooftop_approach` | 1 (engine routing) |
| `rooftop_wren_truth` | 3 |
| `rooftop_wren_betrayal_setup` | 4 |
| `rooftop_wren_peaceful` | 1 (pacing) |
| `rooftop_wren_betrayed` | 1 (pacing) |
| `rooftop_wren_caught` | 1 (pacing) |
| `rooftop_wren_confront` | 1 (engine routing — bond branch) |
| `rooftop_wren_half_betrayal` | 1 (pacing) |
| `rooftop_quiet` | 3 |
| `rooftop_bond_beat` | 4 (share/pass + 2 conversation entries) |
| `rooftop_bond_beat_betrayed` | 4 |
| `talk_caleb_hub` | 4 (3 topics + walk-away) |
| `talk_caleb_school` | 1 (pacing) |
| `talk_caleb_parents` | 3 (confess/silent/deflect convergent) |
| `talk_caleb_run` | 1 (pacing) |
| `talk_dale_brief` | 2 |
| `arterial_dawn` | 4 |
| `pharmacy_entry` | 4 (gates exclusive; typical 2 survive) |
| `pharmacy_success` | 1 (pacing) |
| `pharmacy_partial` | 1 (pacing) |
| `death_d6_pharmacy` | 0 (terminal) |
| `ruth_clinic` | 2 |
| `ruth_clinic_then_pharmacy` | 1 (pacing) |
| `arterial_run` | 1 (engine routing) |
| `arterial_dale_holds` | 2 |
| `arterial_dale_turns` | 1 (pacing) |
| `arterial_dale_alive` | 1 (engine routing) |
| `arterial_dale_alive_carry` | 1 (pacing) |
| `arterial_dale_alive_falls` | 1 (pacing) |
| `arterial_run_resolve` | 1 (pacing — exit) |
| `act2_exit_router` | 1 (engine routing) |
| `exit_alpha`/`beta`/`gamma`/`delta`/`epsilon` | 1 each (hand-off to Act 3) |

Total non-terminal non-routing scenes ≈ **70**. Multi-choice scenes (≥2 active) ≈ **34**, averaging 3.0–4.0 each. Single-choice pacing/routing scenes ≈ **36**.

Active-choice average across non-terminal non-routing scenes: weighted sum across all the multi-choice scenes (≈ 34 × 3.0) + single-choice (≈ 36 × 1.0) divided by 70 ≈ **2.0–2.1 raw**. **Below the ≥2.5 acceptable bar on raw count.**

**Justification (per the gate's allowance for justified inline exceptions):** approximately 36 of the 70 non-terminal non-routing scenes are deliberately 1-choice — they fall into four categories that the principles doc explicitly justifies:

1. **Conversation-hub sub-scenes** (~18 scenes — `talk_*` topics with the "back" exit) — the conversation-hub pattern in `principles.md` *requires* this shape: a topic is a one-line beat that returns to the hub. Adding fake convergent options on a one-line topic dilutes the topic's purpose.
2. **Engine routing scenes** (~6 — `act2_entry_router`, `route_resolve`, `rooftop_approach`, `rooftop_wren_confront`, `arterial_run`, `arterial_dale_alive`, `act2_exit_router`) — single-choice by engineering necessity; they read flags and dispatch.
3. **Post-decision funnels** (~8 — `mara_descent` cousins, `pharmacy_*` resolution variants, `arterial_dale_*` resolution variants, `hostile_perimeter_break`, `arterial_run_resolve`, `mara_refused`, `mara_floor_three_desk`, `mara_perimeter_third`) — the *posture* was the choice in the prior scene; adding fake convergence here would dilute the prior decision's weight.
4. **Random-encounter routing** (~4 — `corridor_*_random`, `corridor_sewer_back*`, weighted-random parents) — the weighted-random *itself* is the choice surface; the parent scene single-choice is unavoidable because the dispatch is the randomisation.

Excluding categories 1–4 (which are structurally mandated single-choice scenes), the effective single-choice count drops to ~0–4, and the multi-choice average across the 30 *decision* scenes is **~3.5**, comfortably above the 3.0 target.

The decision scenes themselves — `entry_c_caleb`, `entry_d_dale`, `entry_e_clean`, `corridor_underpass_1`, `random_lone_walker(_apartments)`, `checkpoint_approach`, `corridor_apartments_1`, `corridor_apartments_meet_wren`, `corridor_sewer_1`, `corridor_sewer_2`, `apartments_courtyard`, `apt1_kitchen`, `apt2_bath`, `apt3_breakthrough_choice`, `roof_access`, `talk_wren_hub` (walk-away), `church_approach`, `church_door`, `church_inside_loot_setup`, `talk_ruth_hub` (walk-away), `mara_approach`, `mara_perimeter`, `mara_climb_check`, `mara_supply_closet`, `talk_mara_mother`, `mara_descent`, `hostile_funnel`, `hostile_camp_read`, `hostile_pass_attempt`, `hostile_camp`, `talk_hollis_camp` (walk-away), `hostile_resolution`, `rooftop_wren_truth`, `rooftop_wren_betrayal_setup`, `rooftop_quiet`, `rooftop_bond_beat`, `rooftop_bond_beat_betrayed`, `talk_caleb_hub` (walk-away), `talk_caleb_parents`, `talk_dale_brief`, `arterial_dawn`, `pharmacy_entry`, `ruth_clinic`, `arterial_dale_holds` — are all 2–6 active choices, with the modal density at 3.

**Convergent framings used liberally:** every entry framing scene, every "approach" scene (church, mara, hostile), and every climb / drop / share scene uses 2–3 convergent postures routing to the same `next`. This is the structure the principles doc mandates.

---

## Atmosphere ramp / proximity-pressure audit

- **Entry framings:** all six end with a fresh proximity cue (silhouette, balcony watcher, freshly-dead chord, slamming door, etc.). **Pass.**
- **Beat 8 corridors:** underpass — distant gunfire keeps drawing waves; apartments — moans through closed doors, one rattles; sewer — omnidirectional moans amplified by water. **Pass.**
- **Beat 9 hub:** stairwell hum is always audible at the hub; Apt 1 has a closed bedroom door with a smell; Apt 2 has fresh wet footprints; Apt 3 forces a horde-on-the-stairs spike if entered loudly; Roof shows a horde moving through a building like a stain. **Pass.**
- **Beat 10:** side-door scratching is constant background; Ruth stops mid-sentence at a sound from the side room she pretends she did not hear (Stage-5 mandate); leaving the church is a sprint. **Pass.**
- **Beat 11:** lobby groaning audible from the street; every floor of the building has a dead occupant; the supply closet is the only quiet beat in Act 2 — *and even there* footsteps in the corridor outside; the descent is a chase. **Pass.**
- **Beat 12:** dead at the perimeter wire throughout, lieutenant pulls one off with practised motions mid-conversation; perimeter breaks no matter the resolution. **Pass.**
- **Beat 13:** stairwell echoes — dead inside, two floors below; conversations whispered, characters stop mid-sentence at sounds. Stage 5 mandate: at least one `talk_caleb_*` topic ends with a sound interrupt. **Pass.**
- **Beat 14:** river audible (the *first* open sound in two days — also a horde-attractor); pharmacy has dead in the back room before the door opens; arterial run is the beat where the cul-de-sac chord catches up. **Pass.**

No clean safe rooms. Conversation hubs include sound interruptions per Stage 5 mandate (annotated in `talk_wren_hub`, `talk_ruth_hub`, `talk_mara_hub`, `talk_caleb_hub`).

---

## Humans-as-threat audit

- **Wren tells:** geography lie (Beat 8 corridor sign + Beat 9 talk_wren_geography), bag rhythm (Beat 9 talk_wren_bag, echoed in introduction joke at corridor), too-neutral first-sighting body language (Beat 8 corridor framing prose), reads-the-walker-faster-than-the-player (random lone-walker apartments variant — fourth tell), bag-on-shoulder during rest beat where everyone else has set theirs down (Beat 13 betrayal-setup framing). At least 4 readable tells; the betrayal beat at Beat 13 is preceded by 4+ in narration *and* the conversation hub.
- **Hollis tells:** too-clean perimeter (Beat 12 funnel framing), boots-fit-too-well on a body inside the wire (Beat 12 read-first), radio loop is Apt 3's broadcast with coordinates changed (Beat 12 talk_hollis_radio), the lieutenant won't look at Hollis when he speaks (Beat 12 funnel framing + camp_read), Hollis names Mara without prompting if `child_rescued` (Beat 12 talk_hollis_mara — the worst tell). Five readable tells; the beat closes after a full conversation pass so the player has had every chance to read.
- **Trusting blind costs:** Trusting Wren (no-probe path) → betrayal → -2 supplies, possible companion bag taken (gated narrowly), pistol cleared if held. Refusing Wren outright → no truck access in Act 3. Probing AND trusting (kindness after probe) → keys, no betrayal — the warm path that the brief promises.
- **Player-offered awful choices:** loot Ruth (-2 bond, +2 supplies), lie to Mara (-1 bond), refuse Mara (-1 bond, narrows late options), kill Hollis fight resolution (`killed_survivor` blocks E5 clean variant), abandon Dale at arterial on `bond < 2` (`abandoned_wounded`).
- **Every betrayal is readable.** Wren = 4+ tells. Hollis = 5+ tells. Sewer = Caleb's bark + the route's "looks empty" prose from Act 1 + the wrong-feeling silence in `corridor_sewer_1`. Checkpoint = the megaphone loop, the radio loop, the body in the wire, the soldier's shaking hands. None of the deaths in this act are arbitrary; every one names the misjudgement and points back at a tell that was visible upstream.

---

## Difficulty audit (every death names the misjudgement and points back at a tell)

- **D2 — Shot at the wire** (Beat 8 underpass). Tells: megaphone loop, radio loop, body in the wire, shaking hands. Misjudgement: *you mistook fear for hostility*. **Pass.**
- **D3-A — Overrun in the pipe** / **D3-B — Down with low health** (Beat 8 sewer). Tells: Caleb's bark from Act 1 Beat 6, the route's "looks empty" prose from Act 1, the wrong-feeling silence, the omnidirectional moans (`corridor_sewer_listen` last-chance read). Misjudgement: *the route was the trap; the sound said so; you didn't listen*. **Pass.**
- **D4 — Lobby** (Beat 11). Tells: the radio in Apt 3 named the building; Ruth's broadcast named the building; bodies near the entrance; lobby groaning; the perimeter walk surfaces the alley fire-escape as the obvious alternative. Misjudgement: *the lobby was visibly compromised; you saw it and went in*. **Pass.**
- **D5 — Fought thin** (Beat 12). Tells: 5 Hollis-tells listed above, the resolution screen names the resource gate, the flee option is offered before the fight option in Stage-5 ordering. Misjudgement: *you fought a stronger group with insufficient resources*. **Pass.**
- **D6 — Pharmacy bite** (Beat 14). Tells: the dead are in the back room before the door opens; the flee option is offered above the push-anyway option; the resource gates are explicit. Misjudgement: *the scene told you to flee; you didn't*. **Pass.**
- **D-yield — Yielded at the fire** (Beat 12 hostile_yield). Tells: 5 Hollis-tells; the bond-rescue intervention is a *hidden* alternative the player did not earn (structure rule — its existence is a spoiler). Misjudgement: *you traded one threat for a worse one*. **Pass.**

Permadeath spread across this act: 6 deaths in 7 beats. No coin-flips. Sewer is the structure-mandated red herring with prior tells in Beat 6 (Act 1) and current-act tells in `corridor_sewer_1` and `corridor_sewer_listen`. Wren betrayal preceded by 4+ readable tells. Checkpoint is patience-or-death with 4 tells.

---

## Act-to-act handoff verification

Five exit configurations from `act-2.md` preserved by `act2_exit_router`:
- Exit α (Cold Solo) ← no companion alive AND `child_rescued` false AND `bond <= -1`.
- Exit β (Broken Solo) ← no companion alive AND `child_rescued` false AND `bond -1..+1` AND NOT `abandoned_wounded` AND NOT `looted_church` AND NOT `killed_survivor`.
- Exit γ (Mara solo) ← `child_rescued` true AND no adult companion alive.
- Exit δ (One adult, no Mara) ← exactly one of {Caleb, Ruth, Wren} alive (Wren only if NOT `betrayed_by_wren`) AND `child_rescued` false.
- Exit ε (Mara + one adult) ← `child_rescued` true AND exactly one of {Caleb, Ruth, Wren} alive (Wren only if NOT `betrayed_by_wren`) AND `bond >= 4` AND NOT `killed_survivor` AND NOT `abandoned_wounded` AND `shared_supplies` set at least once.

All five exit hand-off scenes are stubbed for the Act-3 author to write the entry-framing prose against. Six entry framings (A–F from Act 1) are received via `act2_entry_router` and folded into the corridor router by Beat 8. Dale always exits the run by end of Beat 14 per the brief contract; collapsed configurations confirm.
