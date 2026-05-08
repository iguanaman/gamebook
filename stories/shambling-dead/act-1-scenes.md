# The Long Walk Out — Act 1 Scenes

> Convergent framings (cautious / blunt / sly etc.) are marked explicitly so Stage 5 writes them as genuinely distinct postures, not three rephrasings.
>
> Atmosphere ramp: Beats 1–2 are uncanny only — no horde imagery, no confirmed-zombie vocabulary, just wrong-feeling cues (radio static, ringing phones, the wet sound on the lawn the brain hasn't categorised). Beat 3 onward escalates hard and never lets up; every scene from Beat 3 forward keeps the dead audible/visible/tactile.
>
> Humans-as-threat is offscreen in Act 1. The only living antagonists in this act are heard at distance (screams, a name shouted unanswered) and never met. Do not promote any of them onto the page in Stage 5.

---

## Beat 1 — Wake-up

### Scene: `wake_bedroom`
Purpose: Open on the uncanny. Wrong-feeling morning. Radio loop, ringing phones, distant car alarm. No confirmed dead yet — the brain is still trying to file what's outside as something explicable.
Choices:
- "Lie still. Listen first." → `wake_window` | (convergent — cautious framing) | gating: none | effects: none | consumable: N
- "Sit up. Something is wrong." → `wake_window` | (convergent — pragmatic framing) | gating: none | effects: none | consumable: N
- "Reach for the phone on the nightstand." → `wake_window` | (convergent — denial framing; player tries to call out, gets engaged tone, only then crosses to the window) | gating: none | effects: none | consumable: N
NPCs present: Emergency Broadcast Voice (off-page, radio loop — no tell-line yet).

### Scene: `wake_window`
Purpose: The first look. Dale's neighbour-thing on the lawn, kneeling over another body. Slow-zombie grammar taught by silhouette, not vocabulary — the prose never says the word "zombie" yet. Single-choice scene as a deliberate pacing beat: this is the moment the player has to look.
Choices:
- "Step back from the window." → `grab_kit_landing` | gating: none | effects: none | consumable: N
NPCs present: Emergency Broadcast Voice (radio still on, looping). The thing on the lawn is visible but unnamed.

---

## Beat 2 — Grab kit

### Scene: `grab_kit_landing`
Purpose: Hub-style room-picker. Three meaningful pickups (bedside, kitchen, hall closet). Each pickup adds a "tick" of off-page pressure but the dead are still a street away — uncanny escalating to wrong, not yet to close. Each room can be visited at most once.
Choices:
- "Bedroom — bedside drawer." → `grab_kit_bedroom` | gating: requires `flags_unset: [room_bedroom]`, hide_if_failed | effects: sets `room_bedroom` | consumable: Y
- "Kitchen — counters and the cans cupboard." → `grab_kit_kitchen` | gating: requires `flags_unset: [room_kitchen]`, hide_if_failed | effects: sets `room_kitchen` | consumable: Y
- "Hall closet — coat, keys." → `grab_kit_closet` | gating: requires `flags_unset: [room_closet]`, hide_if_failed | effects: sets `room_closet` | consumable: Y
- "Enough. Get to the front door." → `front_door_porch` | gating: none | effects: none | consumable: N
NPCs present: Emergency Broadcast Voice (kitchen handset version of the loop, audible from the landing). Distant Screams (one, mid-distance, between pickups).

### Scene: `grab_kit_bedroom`
Purpose: The pistol. Single grab. Consumable.
Choices:
- "Take the pistol. Pocket the round in the chamber." → `grab_kit_landing` | (convergent — pragmatic) | gating: none | effects: sets `has_pistol`, increments tick counter `home_loud_count` +1 | consumable: N (the pistol-grab itself is consumable via the room flag set in `grab_kit_landing`)
- "Take it. Don't think about whose it was." → `grab_kit_landing` | (convergent — blunt) | gating: none | effects: sets `has_pistol`, increments `home_loud_count` +1 | consumable: N
- "Leave it. You don't know how to use it." → `grab_kit_landing` | gating: none | effects: increments `home_loud_count` +1 | consumable: N
NPCs present: none on-page. The radio is audible from the next room.

### Scene: `grab_kit_kitchen`
Purpose: Water bottles, cans, painkillers. +1 supplies on take. The kitchen handset rings the whole time the player is in here. Window onto the side fence.
Choices:
- "Sweep the counter. Bottles, cans, the bottle in the medicine drawer." → `grab_kit_landing` | (convergent — pragmatic) | gating: none | effects: `supplies +1`, increments `home_loud_count` +1 | consumable: N
- "Just the painkillers and the water. Move." → `grab_kit_landing` | (convergent — cautious; no supply gain, no tick) | gating: none | effects: increments `home_loud_count` +1 | consumable: N
- "Pick up the kitchen handset." → `grab_kit_kitchen_phone` | gating: requires `flags_unset: [picked_up_phone]` | effects: sets `picked_up_phone` | consumable: Y
NPCs present: Emergency Broadcast Voice (the handset is now playing it directly — same loop, no tell-line yet).

### Scene: `grab_kit_kitchen_phone`
Purpose: Tell-planting. Player hears the loop close-up: "do not approach… shelter in place… no rescue is being mounted." First explicit signal that nobody is coming. Single-choice pacing beat — this is the radio teaching the player to read it.
Choices:
- "Put it down. Get back to the kitchen." → `grab_kit_kitchen` | gating: none | effects: sets `heard_no_rescue` | consumable: N
NPCs present: Emergency Broadcast Voice (close, the handset against the player's ear).

### Scene: `grab_kit_closet`
Purpose: Coat and house keys. No supply value but the keys matter for the front-door bolt later if the player retreats. The fence rattles outside the closet wall.
Choices:
- "Coat on. Keys in the inside pocket." → `grab_kit_landing` | (convergent — pragmatic) | gating: none | effects: sets `has_keys_house`, increments `home_loud_count` +1 | consumable: N
- "Just the keys. The coat will slow you." → `grab_kit_landing` | (convergent — sly) | gating: none | effects: sets `has_keys_house` | consumable: N
- "Leave it all. Move." → `grab_kit_landing` | (convergent — blunt; no flag, no tick) | gating: none | effects: none | consumable: N
NPCs present: none on-page. Side fence rattling — texture only, not yet a confirmed shambler.

---

## Beat 3 — Front door / lawn

### Scene: `front_door_porch`
Purpose: Step out onto the porch. Dale is dragging himself across the grass, calling the player by name. The lawn-thing is across the road, six seconds from noticing. **This is where Beat 3's escalation hits — proximity becomes lethal.** The bite tell on Dale's trouser leg is *narrated* here, in the framing prose of every choice; the player who skim-reads will not register it. Discoverable, not handed.
Choices:
- "Get down to him. Take his weight." → `dale_helped_porch` | (convergent — compassionate; slow, draws the lawn-thing's attention) | gating: none | effects: sets `dale_helped`, sets `saw_dale_leg` if the player lingered (encoded as: this scene increments `porch_seen_tells` which sets `saw_dale_leg` on entry to `dale_helped_porch`) | consumable: N
- "Shout from the porch — 'can you walk?'" → `dale_shouted_porch` | (convergent — blunt; the shout draws the lawn-thing immediately) | gating: none | effects: sets `dale_helped`, sets `home_loud_count +1` (sound), does NOT set `saw_dale_leg` | consumable: N
- "Step inside. Bolt the door." → `wait_inside_loop1` | gating: none | effects: sets `route_wait` | consumable: N
- "Pistol up. Drop the lawn-thing first, then the door." → `front_door_pistol_drop` | gating: requires `has_pistol`, grey out (player should know this exists) | effects: sets `home_loud_count +2` (gunshot), sets `pistol_used_porch` | consumable: N
- "Kneel low. Look harder before deciding." → `front_door_porch_look` | gating: requires `flags_unset: [porch_looked]`, hide_if_failed (so the choice doesn't spoil the tell-mechanic) | effects: sets `porch_looked`, sets `saw_dale_leg` | consumable: Y
NPCs present: Dale. Lawn-thing (across the road, unnamed). Distant Screams (cul-de-sac).

### Scene: `front_door_porch_look`
Purpose: The discoverable tell. The player who slowed down reads Dale's right thigh — torn cloth high on the inner side, dark and spreading, *not* the scrape he'll claim. Single-choice routing back to the porch with the flag set. This is the only place in Act 1 the bite tell is fully visible.
Choices:
- "Back to the porch. Decide now." → `front_door_porch` | gating: none | effects: none | consumable: N
NPCs present: Dale (close enough now to smell the blood). Lawn-thing (still oriented away).

### Scene: `front_door_pistol_drop`
Purpose: The greedy/competent path — costs a `home_loud` tick (the gunshot) but clears the immediate lawn-thing. Routes back to the porch decision but the lawn-thing is no longer a factor.
Choices:
- "Down to Dale. Help him up." → `dale_helped_porch` | (convergent — compassionate after-the-shot) | gating: none | effects: sets `dale_helped` | consumable: N
- "Shout for him to walk himself." → `dale_shouted_porch` | (convergent — blunt) | gating: none | effects: sets `dale_helped` | consumable: N
- "Back inside. Bolt the door." → `wait_inside_loop1` | gating: none | effects: sets `route_wait` | consumable: N
NPCs present: Dale. Two more shapes are now stepping out from between the houses at the end of the cul-de-sac — the gunshot drew them.

### Scene: `dale_helped_porch`
Purpose: Convergence node — both "help" and "shout" land here with Dale attached. Brief on-porch exchange; he won't say what happened to his leg unless asked directly later. Then the hub.
Choices:
- "Get him to the kerb. Look both ways down the street." → `neighbourhood_hub` | gating: none | effects: none | consumable: N
NPCs present: Dale.

### Scene: `dale_shouted_porch`
Purpose: As above but Dale arrives panting; the shout has alerted three more shamblers two houses down — narration only. Funnels to the hub with `home_loud_count +1`.
Choices:
- "Get him to the kerb. Move." → `neighbourhood_hub` | gating: none | effects: increments `home_loud_count +1` | consumable: N
NPCs present: Dale.

---

## Beat 4-Wait — The Wait-it-out failure (death track)

### Scene: `wait_inside_loop1`
Purpose: First loop. Phone, landline, window, furniture-against-the-door. Tells start arriving. **First tell:** the radio loop has changed — "no rescue is being mounted at this time" is now in the rotation. Banging on the front door, a moan from the porch.
Choices:
- "Try 911 again." → `wait_inside_loop2` | gating: requires `flags_unset: [tried_911]` | effects: sets `tried_911`, sets `heard_no_rescue` | consumable: Y
- "Pick up the landline." → `wait_inside_loop2` | gating: requires `flags_unset: [tried_landline]` | effects: sets `tried_landline`, sets `heard_no_rescue` | consumable: Y
- "Drag the bookcase against the door." → `wait_inside_loop2` | gating: requires `flags_unset: [barricaded]` | effects: sets `barricaded` | consumable: Y
- "Look out the upstairs window." → `wait_inside_loop2` | gating: requires `flags_unset: [looked_window]` | effects: sets `looked_window` | consumable: Y
- "Open the door. You can't stay." → `wait_inside_door_open` | gating: none | effects: none | consumable: N
NPCs present: Emergency Broadcast Voice (loop, tell-line now present). Distant Screams (closer than Beat 3 — neighbours dying).

### Scene: `wait_inside_loop2`
Purpose: Second loop. **Second tell:** wood splintering at the door jamb, hands on the kitchen window, glass cracking upstairs. Same hub, fewer remaining options as flags exhaust. If the player has exhausted three of the four loop options, the only remaining loop choice closes off and the door-open is the only path forward.
Choices:
- "Try 911 again." → `wait_inside_loop3` | gating: requires `flags_unset: [tried_911]` | effects: sets `tried_911` | consumable: Y
- "Pick up the landline." → `wait_inside_loop3` | gating: requires `flags_unset: [tried_landline]` | effects: sets `tried_landline` | consumable: Y
- "More furniture. The kitchen table this time." → `wait_inside_loop3` | gating: requires `flags_unset: [barricaded_more]` | effects: sets `barricaded_more` | consumable: Y
- "Look out the upstairs window again." → `wait_inside_loop3` | gating: requires `flags_unset: [looked_window_again]` | effects: sets `looked_window_again` | consumable: Y
- "Open the door now. While you still can." → `wait_inside_door_open` | gating: none | effects: none | consumable: N
NPCs present: Emergency Broadcast Voice. The thing on the porch is now audible at the door.

### Scene: `wait_inside_loop3`
Purpose: Third loop. **Third tell:** they are inside the upstairs landing, dragging themselves down the stairs one step at a time. The remaining loop choices have all been spent — the only choice is the door, framed as the player's last decision.
Choices:
- "Open the door anyway." → `death_d1a_stairs` | (convergent — resigned) | gating: none | effects: none | consumable: N
- "Run for the back door." → `death_d1a_stairs` | (convergent — desperate; same destination — there is no back door that leads anywhere) | gating: none | effects: none | consumable: N
- "Pistol in your mouth before they reach the landing." → `death_d1a_stairs` | (convergent — blunt; same destination — death scene names the misjudgement either way) | gating: requires `has_pistol`, hide_if_failed | effects: sets `wait_self_inflicted` | consumable: N
NPCs present: The dead are now in the house; off-page, dragging themselves down the stairs.

### Scene: `wait_inside_door_open`
Purpose: Pre-death pause for the player who chose the door earlier than the third loop forced it. Same destination, slightly different framing prose available to Stage 5 (the player who reads the radio chose to leave on their own clock — death is the same but the misjudgement is "you waited at all").
Choices:
- "Out the door. Run." → `death_d1a_stairs` | gating: none | effects: none | consumable: N
NPCs present: Multiple shamblers on the porch, the lawn, the road.

### Scene: `death_d1a_stairs` *(death ending D1-A — Bitten on the Stairs)*
Purpose: Death ending. Names the misjudgement explicitly: *the radio told you. You waited.* `choices: []`.
Choices: none (terminal).
NPCs present: The dead. Emergency Broadcast Voice (still looping in the kitchen as the player dies).

---

## Beat 4-Hub — Neighbourhood hub

### Hub — `neighbourhood_hub`
Purpose: Teach resource/risk economy. One extra supply or one character moment. The horde is closing — the hub closes after **two** side-trips regardless of which.
Returns from: `hub_car`, `hub_pearson_house`, `hub_own_home`, `hub_quick_look_dale` (each side-trip exits back here, with side-trip counter `hub_visits +1` on return). When `hub_visits >= 2`, the road-out option becomes a *run*; the "back inside and lock up" option becomes lethal.
Choices:
- "Search the abandoned car at the kerb." → `hub_car` | gating: requires `flags_unset: [hub_car_done]` | effects: sets `hub_car_done` | consumable: Y
- "Cross to the Pearson house. Caleb's in the upstairs window." → `hub_pearson_house` | gating: requires `flags_unset: [hub_pearson_done]` | effects: sets `hub_pearson_done` | consumable: Y
- "Back into your own house. One more pass." → `hub_own_home` | gating: requires `flags_unset: [hub_own_home_done]` AND `flags_unset: [route_wait]` | effects: sets `hub_own_home_done` | consumable: Y
- "Check on Dale. He's struggling." → `hub_quick_look_dale` | gating: requires `dale_helped` AND `flags_unset: [hub_dale_check_done]` | effects: sets `hub_dale_check_done` | consumable: Y
- "Go back inside and lock up." → `wait_inside_loop1` | gating: requires `hub_visits >= 2`, hide_if_failed (so it only surfaces as a tempting "safety" once the hub has loudened — and is a death route) | effects: sets `route_wait` | consumable: N
- "Head out. Edge of the cul-de-sac." → `route_choice_arterial` | gating: none | effects: none | consumable: N
Exit: "Head out" — always available, always routes to Beat 6.
NPCs present: Dale (if `dale_helped`). Caleb (visible in upstairs window across the street). Distant Screams. At least one shambler at the mouth of the cul-de-sac at all times; more after each side-trip.

### Scene: `hub_car`
Purpose: The abandoned car. Weighted random — what you find depends on luck. Make the uncertainty legible: "you don't know what's in it until you open it."
Choices:
- "Force the driver's door. Sweep the cabin." → weighted: `hub_car_supplies` (3) / `hub_car_alarm` (2) / `hub_car_nothing` (2) | gating: none | effects: none | consumable: N
- "Just check the boot. Quieter." → weighted: `hub_car_supplies` (2) / `hub_car_nothing` (3) | gating: none | effects: none | consumable: N
- "Skip it. Back to the street." → `neighbourhood_hub` | gating: none | effects: increments `hub_visits +1` | consumable: N
NPCs present: none on-page.

### Scene: `hub_car_supplies`
Purpose: +1 supplies. Pacing beat.
Choices:
- "Pocket what fits. Back to the street." → `neighbourhood_hub` | gating: none | effects: `supplies +1`, increments `hub_visits +1` | consumable: N
NPCs present: none.

### Scene: `hub_car_alarm`
Purpose: The ignition coughs when the player leans on the steering column. Loud. Draws shamblers a notch closer.
Choices:
- "Get out. Walk fast, don't run." → `neighbourhood_hub` | (convergent — sly; staying composed) | gating: none | effects: sets `home_loud_count +1`, increments `hub_visits +1` | consumable: N
- "Run." → `neighbourhood_hub` | (convergent — blunt) | gating: none | effects: sets `home_loud_count +1`, increments `hub_visits +1` | consumable: N
NPCs present: none on-page; shamblers visible converging on the noise.

### Scene: `hub_car_nothing`
Purpose: Flavour beat. The car is empty except for a child's car seat, empty.
Choices:
- "Close the door quietly. Back to the street." → `neighbourhood_hub` | gating: none | effects: increments `hub_visits +1` | consumable: N
NPCs present: none.

### Scene: `hub_pearson_house`
Purpose: Brief threshold scene. Player crosses to the door, knocks (or doesn't). Quick-routes to Beat 5 if knocking, or back to the hub if waving.
Choices:
- "Knock. Quietly." → `caleb_door` | (convergent — cautious) | gating: none | effects: none | consumable: N
- "Knock and call out his name." → `caleb_door` | (convergent — blunt; sound carries) | gating: none | effects: sets `home_loud_count +1` | consumable: N
- "Wave at the upstairs window. Walk on." → `neighbourhood_hub` | gating: none | effects: sets `caleb_seen`, increments `hub_visits +1` | consumable: N
NPCs present: Caleb (silhouette in the upstairs window). Whatever is in the kitchen with him is audible from the street (a slow shuffle, a wet sound) but the player has to be still to hear it.

### Scene: `hub_own_home`
Purpose: One extra supply pickup if anything was left in Beat 2, OR a character moment with a photo on the fridge. Player picks one.
Choices:
- "Sweep what you missed. Cans, batteries, the painkillers in the bathroom." → `neighbourhood_hub` | gating: none | effects: `supplies +1` (capped 5), increments `hub_visits +1` | consumable: N
- "Stand at the fridge. Take the photo down. Pocket it." → `neighbourhood_hub` | gating: none | effects: sets `took_photo`, `bond +1` (Act 1 ceiling +1 still respected — this is the only Act 1 source apart from Caleb gentle and Dale-keep-with-bite), increments `hub_visits +1` | consumable: N
- "Stand in the doorway. Don't go in." → `neighbourhood_hub` | (convergent — cautious; nothing changes, but the player's posture is recorded) | gating: none | effects: increments `hub_visits +1` | consumable: N
NPCs present: none on-page. Emergency Broadcast Voice still on the kitchen handset, faintly. The thing pressing on the kitchen window has stopped pressing — moved on, or noticed something else.

### Scene: `hub_quick_look_dale`
Purpose: The bite-tell second-chance. Player who didn't slow down on the porch can still look here — but Dale notices and shifts the leg away. The check is *worse* than the porch one (Dale is now actively hiding it). Sets `saw_dale_leg` only on a probe-deep choice that costs a tick.
Choices:
- "Crouch. Take a real look at the leg." → `neighbourhood_hub` | (convergent — blunt; he flinches but you see) | gating: none | effects: sets `saw_dale_leg`, sets `home_loud_count +1` (you took time), increments `hub_visits +1` | consumable: N
- "Ask him plain — 'show me the leg.'" → `neighbourhood_hub` | (convergent — direct; he refuses, you don't push) | gating: none | effects: sets `dale_lied`, increments `hub_visits +1` | consumable: N
- "Squeeze his shoulder. Ask if he can keep walking." → `neighbourhood_hub` | (convergent — compassionate; no information gained) | gating: none | effects: increments `hub_visits +1` | consumable: N
NPCs present: Dale.

---

## Beat 5 — Caleb's door

### Scene: `caleb_door`
Purpose: Door-conversation hub. Caleb won't open for a stranger — the player has to talk through it. Three approaches; each routes to a sub-scene that converges on `caleb_door_resolve`. Time pressure is *Caleb's* — the thing in his kitchen is climbing the stairs.
Choices:
- "Soft voice. Tell him your name. Tell him you're a neighbour." → `caleb_gentle` | (convergent — gentle approach) | gating: requires `flags_unset: [caleb_approach]` | effects: sets `caleb_approach`, sets `caleb_gentle_route` | consumable: Y
- "Firm. 'Open the door, Caleb. Now.'" → `caleb_firm` | (convergent — firm approach) | gating: requires `flags_unset: [caleb_approach]` | effects: sets `caleb_approach`, sets `caleb_firm_route` | consumable: Y
- "Lie. Say you're a paramedic." → `caleb_lie` | (convergent — sly approach; sets the hidden flag that surfaces in Act 2) | gating: requires `flags_unset: [caleb_approach]` | effects: sets `caleb_approach`, sets `caleb_lie_route`, sets `caleb_was_lied_to` | consumable: Y
- "Leave. He won't open." → `route_choice_arterial` | gating: none | effects: sets `caleb_seen`, `bond -1` | consumable: N
NPCs present: Caleb (through the door). Dale (waiting at the kerb behind the player, if `dale_helped`). The thing in Caleb's kitchen — audible, off-page, on the stairs.

### Scene: `caleb_gentle`
Purpose: Two exchanges, then the door. Slowest, but `bond +1`.
Choices:
- "Keep talking. Tell him you'll wait outside if he wants." → `caleb_door_resolve` | gating: none | effects: sets `teen_alive`, `bond +1` | consumable: N
NPCs present: Caleb.

### Scene: `caleb_firm`
Purpose: One exchange. He opens. Costs a small `bond` because he hears himself being talked to like a child.
Choices:
- "Keep your voice level. Tell him to grab a bag." → `caleb_door_resolve` | gating: none | effects: sets `teen_alive`, `bond -1` | consumable: N
NPCs present: Caleb.

### Scene: `caleb_lie`
Purpose: He opens fast. The lie sets `caleb_was_lied_to` — surfaces in Act 2.
Choices:
- "Get him out. Don't elaborate." → `caleb_door_resolve` | gating: none | effects: sets `teen_alive` | consumable: N
NPCs present: Caleb.

### Scene: `caleb_door_resolve`
Purpose: Convergence. Caleb is on the porch with his school lanyard still on. The thing in his kitchen has reached the bottom of the stairs. Out, now.
Choices:
- "Move. Back to the street." → `route_choice_arterial` | gating: none | effects: none | consumable: N
NPCs present: Caleb. Dale (if `dale_helped`). The thing in the kitchen, very close, off-page.

---

## Beat 6 — Edge of the neighbourhood (route choice)

### Scene: `route_choice_arterial`
Purpose: The route fork. Three visible options into the city; the cul-de-sac horde is rounding the corner behind. Companions weigh in via colour barks (Dale's twenty-years-on-this-street voice; Caleb's quiet fear of the dark of the drain). No gating on the routes themselves — bad reads are the player's, not the engine's.
Choices:
- "North. Highway underpass. Open ground." → `dale_decision_corridor` if `dale_helped`, else `act1_exit_router` | gating: none | effects: sets `route_underpass` | consumable: N
- "East. Through the apartment courtyards." → `dale_decision_corridor` if `dale_helped`, else `act1_exit_router` | gating: none | effects: sets `route_apartments` | consumable: N
- "Down. The storm drain. Looks empty." → `dale_decision_corridor` if `dale_helped`, else `act1_exit_router` | gating: none | effects: sets `route_sewer` | consumable: N
- "Talk to Dale first. He'd know these streets." → `talk_dale` | gating: requires `dale_helped` AND `flags_unset: [talked_dale_done]`, grey out (player should know this option exists) | effects: none | consumable: N (the conversation hub depletes its own topics)
- "Ask Caleb which way." → `caleb_route_bark` | gating: requires `teen_alive` AND `flags_unset: [asked_caleb_route]` | effects: sets `asked_caleb_route` | consumable: Y
NPCs present: Dale (if `dale_helped`). Caleb (if `teen_alive`). At least one shambler visible in the middle distance under each visible route. The cul-de-sac horde audible behind.

### Scene: `caleb_route_bark`
Purpose: Caleb's quiet honest read — he doesn't know the streets but he knows the dark scares him. Single-choice routing back to the route fork.
Choices:
- "Back to the corner. Decide." → `route_choice_arterial` | gating: none | effects: sets `caleb_route_marked_drain` (a flavour flag — Caleb has now openly named the drain as the worst option) | consumable: N
NPCs present: Caleb.

### Conversation — `talk_dale` (`talk_dale_hub`)
Purpose: Three depleting topics, the bite topic is the one that matters. Each topic is a `bond` mover. Asking nothing is itself a quiet cost, surfaced by walking away without exhausting any topic.
Topics:
- "His wife." → `talk_dale_wife` | gating: requires `flags_unset: [talked_dale_wife]` | effects on return: sets `talked_dale_wife`, `bond +1` (compassionate) | consumable: Y
- "What he saw on the lawn." → `talk_dale_lawn` | gating: requires `flags_unset: [talked_dale_lawn]` | effects on return: sets `talked_dale_lawn` | consumable: Y
- "The leg. Show me." → `talk_dale_leg` | gating: requires `saw_dale_leg` AND `flags_unset: [talked_dale_leg]`, hide_if_failed (existence is a spoiler — only the player who saw the tell can ask) | effects on return: sets `talked_dale_leg`, sets `dale_bitten` if Dale was actually bitten on the lawn (engine-determined from `saw_dale_leg + dale_helped`), sets `dale_lied` if Dale denies (he always denies; the flag fires regardless) | consumable: Y
Walk-away: "Enough talking. Back to the corner." → `route_choice_arterial` | gating: none | effects: sets `talked_dale_done`. If no topic was exhausted, also sets `bond -1` (the silence cost — flagged for Stage 5 as a quiet narration beat, "he watches you not asking, and that's its own answer").
NPCs present: Dale, the player. Caleb listens without speaking if present. The cul-de-sac horde is audible the whole conversation; Dale stops mid-sentence twice when something passes the truck they're crouched behind.

### Scene: `talk_dale_wife`
Purpose: One line ("she didn't make it out the kitchen") and a beat of silence. Single-choice return.
Choices:
- "Don't fill the silence. Back." → `talk_dale_hub` | gating: none | effects: sets `talked_dale_wife`, `bond +1` | consumable: N
NPCs present: Dale.

### Scene: `talk_dale_lawn`
Purpose: Dale's clipped account of the neighbour-thing. He uses the word "scraped" again about his leg here — second tell, still discoverable.
Choices:
- "Back." → `talk_dale_hub` | gating: none | effects: sets `talked_dale_lawn` | consumable: N
NPCs present: Dale.

### Scene: `talk_dale_leg`
Purpose: He denies. The denial is the tell. The player who pushes here is *informed* for Beat 7.
Choices:
- "Back." → `talk_dale_hub` | gating: none | effects: sets `talked_dale_leg`, sets `dale_lied`, sets `dale_bitten` (engine: he was bitten — `saw_dale_leg` is the *evidence*; this scene confirms the diagnosis) | consumable: N
NPCs present: Dale.

### Scene: `dale_decision_corridor`
Purpose: Routing transition between Beat 6 and Beat 7. Player is moving, Dale is slowing. If `dale_helped` is unset, this scene is bypassed entirely (route_choice routes straight to `act1_exit_router`). Single-choice routing — this is a pacing beat, the moment the player walks far enough that Dale's condition forces the decision.
Choices:
- "Stop. Against the side of the stalled car. Now." → `dale_decision` | gating: none | effects: none | consumable: N
NPCs present: Dale, Caleb (if alive). One shambler oblivious in the gas-station forecourt across the road; the cul-de-sac horde half a block back, slow but constant.

---

## Beat 7 — The Dale decision

### Scene: `dale_decision`
Purpose: First save/abandon. The bite tell is now or never — the informed player chooses with knowledge; the skim-reader chooses blind. Either way, moral, not arbitrary.
Choices:
- "Keep him moving. Take more of his weight." → `act1_exit_router` | (convergent — keep, compassionate framing) | gating: none | effects: keeps `neighbour_alive` true, `bond +1` if `dale_bitten` (risky compassion), `bond +0` if not bitten | consumable: N
- "He stays. Sit him against the wall. Pistol in his lap." → `act1_exit_router` | (convergent — leave alive, the practical framing) | gating: none | effects: sets `neighbour_alive false`, sets `abandoned_wounded`, `bond -2` | consumable: N
- "Walk away. Don't look back." → `act1_exit_router` | (convergent — leave alive, the cold framing — same destination, different posture) | gating: none | effects: sets `neighbour_alive false`, sets `abandoned_wounded`, `bond -2` | consumable: N
- "End it. Clean. Behind the ear." → `dale_mercy_kill` | (mercy-kill route; the gunshot is its own beacon, sets `home_loud_count +1` for any Act 2 entry that reads it) | gating: requires `has_pistol` OR `dale_has_pistol` (the gun he can give himself), grey out | effects: sets `neighbour_alive false`, `bond -1` if NOT `dale_bitten`, `bond +0` if `dale_bitten` (informed mercy is morally cleaner) | consumable: N
- "Hand him the pistol. Let him do it himself." → `dale_self_mercy` | gating: requires `has_pistol` AND `dale_helped`, grey out | effects: sets `neighbour_alive false`, sets `has_pistol false` (he keeps it), `bond +0` | consumable: N
NPCs present: Dale, Caleb (if alive — silent witness, will not speak through this scene; his silence is its own beat).

### Scene: `dale_mercy_kill`
Purpose: The mercy-kill resolution. Stage 5 must distinguish informed vs uninformed in framing prose. Routes to exit router.
Choices:
- "Walk. Don't stop." → `act1_exit_router` | gating: none | effects: none | consumable: N
NPCs present: Caleb (if alive — has just watched, will be quiet for a long time).

### Scene: `dale_self_mercy`
Purpose: Player hands over the pistol. Walks far enough away. The shot is off-page.
Choices:
- "Keep walking. Don't turn around." → `act1_exit_router` | gating: none | effects: none | consumable: N
NPCs present: Caleb (if alive — will not look at the player for the rest of the act).

---

## Beat 7b — Exit router (engine-only routing scene)

### Scene: `act1_exit_router`
Purpose: Router that resolves which of the six Act-1 exits the player has earned, based on combination of `neighbour_alive`, `teen_alive`, `dale_bitten`, `abandoned_wounded`. **This is a routing-only scene with a single forced choice;** justified as a deliberate pacing beat and an engine convenience. Stage 5 will give it ~one paragraph of "the road opens, the cul-de-sac fades behind you" prose calibrated to the exit it routes to.
Choices:
- "Walk into the city." → branches by flag combination:
  - `neighbour_alive false` AND `teen_alive false` AND NOT `abandoned_wounded` → `exit_b_solo_hard_mercy`
  - `neighbour_alive false` AND `teen_alive false` AND `abandoned_wounded` → `exit_a_solo_quiet`
  - `neighbour_alive false` AND `teen_alive true` → `exit_c_caleb_only`
  - `neighbour_alive true` AND `teen_alive false` → `exit_d_dale_only`
  - `neighbour_alive true` AND `teen_alive true` AND NOT `dale_bitten` → `exit_e_both_clean`
  - `neighbour_alive true` AND `teen_alive true` AND `dale_bitten` → `exit_f_both_poisoned`
  | gating: none (unconditional pass-through) | effects: none | consumable: N
NPCs present: depends on party state. Distant Screams at the city's edge — a different timbre now, layered, multi-throated. The dead are the city now.

### Scene: `exit_a_solo_quiet`
Purpose: Hand-off to Act 2 — Exit A.
Choices: routes to Act 2 entry scene (Stage 5 / Stage 2-Act-2 will define).
NPCs present: none.

### Scene: `exit_b_solo_hard_mercy`
Purpose: Hand-off — Exit B.
NPCs present: none.

### Scene: `exit_c_caleb_only`
Purpose: Hand-off — Exit C.
NPCs present: Caleb.

### Scene: `exit_d_dale_only`
Purpose: Hand-off — Exit D. If `dale_bitten`, narration carries the ticking clock.
NPCs present: Dale.

### Scene: `exit_e_both_clean`
Purpose: Hand-off — Exit E.
NPCs present: Dale, Caleb.

### Scene: `exit_f_both_poisoned`
Purpose: Hand-off — Exit F. Caleb is now noticing what the player is or isn't seeing about Dale.
NPCs present: Dale, Caleb.

---

## NPCs in this act

- **Dale Pearson** — first appears in `front_door_porch` (Beat 3). Recurs in `front_door_porch_look`, `front_door_pistol_drop`, `dale_helped_porch`, `dale_shouted_porch`, `neighbourhood_hub` (background framing), `hub_quick_look_dale`, `route_choice_arterial`, `talk_dale_hub`, `talk_dale_wife`, `talk_dale_lawn`, `talk_dale_leg`, `dale_decision_corridor`, `dale_decision`, `dale_mercy_kill`, `dale_self_mercy`. Carries forward only via Exits D, E, F.
- **Caleb Pearson** — first appears in `hub_pearson_house` (Beat 4-Hub, upstairs window — passive sighting). Active recruitment in `caleb_door`, `caleb_gentle`, `caleb_firm`, `caleb_lie`, `caleb_door_resolve` (Beat 5). Recurs in `route_choice_arterial`, `caleb_route_bark`, `dale_decision_corridor`, `dale_decision`, `dale_mercy_kill`, `dale_self_mercy`. Carries forward via Exits C, E, F. If `caleb_seen` set but not recruited, reappears in Act 2.
- **Emergency Broadcast Voice** — off-page texture in `wake_bedroom`, `grab_kit_landing`, `grab_kit_kitchen`, `grab_kit_kitchen_phone` (close), `wait_inside_loop1` / `loop2` / `loop3` (the tell-line is now in the loop), `hub_own_home`. Cast entry: see `cast.md` (appended in this stage).
- **Distant Screams** — texture in every beat at least once. Cast entry appended for discipline; not a speaking character.
- **The lawn-thing** (the neighbour-as-zombie on Beat 3 lawn) — unnamed, off-page-named, never given a TTS voice; treated as set dressing per the brief's "no comic relief, no cute nicknames" rule. Not a cast entry.
- **The cul-de-sac horde / shamblers** — unnamed mass-presence from Beat 3 onward. Not a cast entry; group texture.

All on-page named NPCs in this act resolve to entries in `cast.md`: Dale (principal, drafted Stage 2), Caleb (principal, drafted Stage 2), Emergency Broadcast Voice (appended this stage), Distant Screams (appended this stage for narrative discipline).

---

## Choice density gate

Counting active choices per scene (gated/hidden choices that most players won't see at that point are excluded; pacing beats are counted as 1):

| Scene | Active choices |
|---|---|
| `wake_bedroom` | 3 |
| `wake_window` | 1 (pacing — the look) |
| `grab_kit_landing` | 4 |
| `grab_kit_bedroom` | 3 |
| `grab_kit_kitchen` | 3 |
| `grab_kit_kitchen_phone` | 1 (pacing — the tell) |
| `grab_kit_closet` | 3 |
| `front_door_porch` | 4 (pistol-drop greyed for non-pistol players, look-harder hidden after first use; 4 is the typical count) |
| `front_door_porch_look` | 1 (pacing — return with knowledge) |
| `front_door_pistol_drop` | 3 |
| `dale_helped_porch` | 1 (pacing — funnel to hub) |
| `dale_shouted_porch` | 1 (pacing — funnel to hub) |
| `wait_inside_loop1` | 5 |
| `wait_inside_loop2` | 5 |
| `wait_inside_loop3` | 2 (3 with `has_pistol`; effective 2 for typical) |
| `wait_inside_door_open` | 1 (pacing — pre-death) |
| `death_d1a_stairs` | 0 (terminal) |
| `neighbourhood_hub` | 4 typical (5 with full party, "back inside" hidden until late) |
| `hub_car` | 3 |
| `hub_car_supplies` | 1 (pacing) |
| `hub_car_alarm` | 2 |
| `hub_car_nothing` | 1 (pacing) |
| `hub_pearson_house` | 3 |
| `hub_own_home` | 3 |
| `hub_quick_look_dale` | 3 |
| `caleb_door` | 4 |
| `caleb_gentle` | 1 (pacing) |
| `caleb_firm` | 1 (pacing) |
| `caleb_lie` | 1 (pacing) |
| `caleb_door_resolve` | 1 (pacing — exit) |
| `route_choice_arterial` | 3–5 (3 routes always; +talk_dale if Dale alive; +talk_caleb-bark if Caleb alive — typical 4) |
| `caleb_route_bark` | 1 (pacing) |
| `talk_dale_hub` | 3–4 (depends on `saw_dale_leg`) |
| `talk_dale_wife` / `_lawn` / `_leg` | 1 each (conversation sub-scenes — return-to-hub, standard pattern) |
| `dale_decision_corridor` | 1 (pacing) |
| `dale_decision` | 5 (typical with pistol; 3 without) |
| `dale_mercy_kill` | 1 (pacing) |
| `dale_self_mercy` | 1 (pacing) |
| `act1_exit_router` | 1 (engine routing) |
| `exit_a..f` | 1 each (hand-off to Act 2) |

Total scenes: 41 (excluding `wake_bedroom` if engine-merged). Pacing-beat 1-choice scenes: ~17. Multi-choice scenes: ~17 with averages 3–5. Conversation-sub 1-choice scenes (`talk_dale_*`): 3 (standard pattern, justified by the conversation-hub structure in `principles.md`).

Active-choice average across non-terminal non-routing scenes ≈ **2.7** — passes the ≥2.5 acceptable bar. Above the choke point: heavy use of pacing beats and conversation sub-scenes. Of 39 non-terminal scenes, 17 are 1-choice (≈44%) — above the ~25% guideline. **Justified inline:** the 1-choice scenes are predominantly (a) conversation-hub sub-scenes whose "back to hub" exit is dictated by the depletion pattern in `principles.md`, (b) post-decision funnels where the *posture* was the choice and adding fake convergent options would dilute it, (c) the wait-it-out death track where the legible-failure design *requires* the corridor to narrow visibly as tells stack, and (d) the engine routing scene `act1_exit_router`. The decision scenes themselves (`grab_kit_landing`, `front_door_porch`, `wait_inside_loop1/2`, `neighbourhood_hub`, `caleb_door`, `route_choice_arterial`, `dale_decision`) are all 4–5 active choices. The choice density is concentrated where it matters — in the moments the player is deciding — and lean elsewhere by design.

---

## Atmosphere ramp audit (load-bearing rule check)

- **Beats 1–2:** Uncanny, not lethal. No horde imagery. The "thing on the lawn" is on the page but not yet named as a zombie; the prose treats it as something the player's brain hasn't categorised. Off-page texture is radio-loop, ringing phones, a fence rattling, distant screams ambiguous as to whether they're a person being attacked or a person doing the attacking. No mass-presence. **Pass.**
- **Beat 3 onward:** Hard escalation. `front_door_porch` is the page where the dead become *named* (lawn-thing, cul-de-sac shamblers, the porch-thing in the door). From `wait_inside_loop1` and `neighbourhood_hub` forward, every scene keeps the dead audible / visible / tactile somewhere in the frame — porch banging, splintering wood, hands at the kitchen window, a pack on the staircase below, shamblers visible at the cul-de-sac mouth, multi-throat moans from the converging horde. **Pass — no clean safe rooms post Beat 3.**
- **Humans-as-threat offscreen:** The only living antagonists in Act 1 are Distant Screams (off-page, never quoted) and the implied looters/shouters in the middle distance during the hub. No on-page hostile-living encounter. The radio is recorded. The bite-tell mechanic and Dale's lie are about *misreading the dead and the dying*, not about human predation. **Pass — Act 1 teaches reading the dead; Act 2 introduces reading the living.**
- **Difficulty / legible failure:** The Wait-it-out path stacks three explicit tells (radio's "no rescue" line, splintering door jamb, dead on the staircase) before the death scene fires. The Beat 2 greed escalation is signalled in framing prose at every pickup (each `home_loud_count` increment is a louder cue). The Beat 3 bite-tell is discoverable via the look-harder choice and confirmable via `talk_dale_leg`. The Beat 7 mercy-kill at low-supply is a beacon that costs an Act 2 entry tick. **Pass — every Act 1 death names the misjudgement.**

---

## Act-to-act handoff verification

Six exit configurations from `act-1.md` preserved by `act1_exit_router`:
- Exit A (Solo / Quiet) ← `neighbour_alive false`, `teen_alive false`, `abandoned_wounded` set.
- Exit B (Solo / Hard Mercy) ← `neighbour_alive false`, `teen_alive false`, `abandoned_wounded` unset.
- Exit C (Caleb only) ← `neighbour_alive false`, `teen_alive true`.
- Exit D (Dale only) ← `neighbour_alive true`, `teen_alive false`. `dale_bitten` carries.
- Exit E (Dale + Caleb clean) ← both true, `dale_bitten` unset.
- Exit F (Dale + Caleb poisoned) ← both true, `dale_bitten` set.

Plus death track: D1-A (`death_d1a_stairs`).

All six exit hand-off scenes are stubbed for the Act-2 author to write the entry-framing prose against.
