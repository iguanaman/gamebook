# The Long Walk Out — Act 2: The City

## Journal Entry
The neighbourhood is behind you. The city wasn't quieter — it was just further from the screaming you knew.

## Entry
Arrives from: Act 1 Exits A–F (six configurations — see Act 1 § Exits).
Player state on entry: variable. `health` 4–5 (Act 1 doesn't move it except on rare paths). `bond` -2 to +1. `supplies` 3–5. Companion flags per exit. Route flag (`route_underpass` / `route_apartments` / `route_sewer`) set in Beat 6 of Act 1. Inventory: `has_pistol` per Act 1 Beat 2.

## Atmosphere — Constant Pressure (load-bearing)

Per brief.md and structure.md: **Act 2 is where the dead stop being an event and become the weather.** No beat below is allowed to read as a clean safe room. Conversations are clipped — every exchange is listened-into; characters stop mid-sentence at sounds; every "rest" beat ends with a fresh proximity cue. The threats here are layered — the dead are constant background, and the *living* are the new lethal foreground. This act introduces the first hostile humans the player has encountered on the page.

**Humans-as-threat:** Wren is the prototype liar. Her tells are readable in conversation hub topics and travel barks — Stage 3/5 must surface them. The hostile-survivors group is openly predatory; their tells are environmental (the camp is too clean, the radio plays the same loop, fresh boots on a body without a face). Mid-act the player will be offered chances to do awful things themselves — take a child's stash, lock a stranger out, lie to Mara. These are reasonable-looking shortcuts with `bond` costs.

**Difficulty:** Easy to die. No coin-flips. Every death below names the misjudgement and points back at a tell that was visible upstream — sewer death calls back the storm-drain prose in Act 1 Beat 6, Wren betrayal calls back the conversation tells, hostile-survivors yield calls back the camp tells.

Every beat below is annotated with a proximity cue.

---

## Act 2 Entry — Variant Framing (per Act 1 exit)

The first beat (Beat 8 — *Into the city*) is one beat with **six entry framings**, not six beats. Each framing is two to four short blocks and folds straight into Beat 8's first decision. Stage 3/5 must preserve this branching texture.

- **From Exit A — Solo / Quiet (cold).** Player is alone. The narrator's voice is tighter, more first-person-creep — the texture of someone who already broke a small thing and is pretending they didn't. Dale is referenced once, in past tense, by something ordinary on the road that looks like him from behind. `bond` is low; the prose offers no comfort.
- **From Exit B — Solo / Hard Mercy.** Alone but not cold. The mercy-kill is referenced in a single line — the weight of it, not the act. Player has agency; the narration trusts them. This is the framing that can still climb back to a warm ending.
- **From Exit C — Caleb only.** Caleb is a half-step behind, picking at his thumb. He hasn't spoken since the cul-de-sac. If `caleb_was_lied_to`, his first line is a question that proves he believed the lie — a tell the player can hear if they listen.
- **From Exit D — Dale only.** Dale is favouring his leg. If `dale_bitten`, he is sweating through the cloth and has stopped turning the wedding band. If not bitten, he's just hurt. Either way he names the next street before the player asks.
- **From Exit E — Dale + Caleb (clean).** Three people. Dale leads, Caleb tucked between them. The closest Act 2 ever gets to a *party*. The prose should not let this last — by end of Beat 8 something has frayed it.
- **From Exit F — Dale + Caleb (poisoned).** Same shape as E, but Caleb is watching Dale, not the road. He has already noticed something the player may or may not have. Dale is breathing through his mouth.

Proximity cue (entry, all variants): The horde from the cul-de-sac is no longer the loudest sound — there are *more* of them ahead, layered, distributed across the city the way a crowd is distributed across a stadium. The single-throat moans of Act 1 are now a chord.

---

## Beats

### Beat 8 — Into the city (route hub)
What happens: The route flag set in Act 1 Beat 6 routes the player to one of three corridor-beats — **the underpass**, **the apartments**, or **the sewer**. Each corridor is a short traversal beat (two to three nodes) with one supply-cost option, one bond opportunity, and one weighted random encounter (uneventful / lone walker / sound-from-window) per the structure's *random events* contract. The corridor ends at a shared exit — the **apartments-block courtyard** (Beat 9), regardless of route — because the city is now closing in and the routes converge by attrition. Each corridor seeds one act-specific encounter that does *not* repeat across runs:

- **Underpass corridor** — the **military checkpoint** scene. Soldiers behind concertina, half-mutinied, half-still-doing-their-job. Patience-or-die: the player who waits through three exchanges of the soldier-with-the-megaphone earns `+2 supplies` and `met_checkpoint`. The player who pushes the gate is shot. Tells: the soldier's hands shake; the radio behind him plays one phrase on loop; a body in the wire has been there a while. Death named: *you mistook fear for hostility*.
- **Apartments corridor** — first sighting of **Wren** (see Cast). She is on a fire escape, bag at her feet, a hand raised in a gesture that is too neutral. Sets `met_wren`. Conversation tells start firing here (see § Wren tells, below).
- **Sewer corridor** — the red herring. Quiet at first (proximity cue: the silence is *wrong*, water sounds wrong, footsteps echo where they shouldn't). Mid-corridor a single shambler, easy. Late corridor a *pack* — the sewer concentrates them. Without `has_pistol` and `health ≥ 3`, the late-corridor encounter kills. With both, it costs `1 health` and `1 supply` and routes to Beat 9 with a hidden flag `sewer_survivor` (Stage 3/5: small `bond`-positive bark in Beat 13 — the player who came through hell carries it).

Proximity cue: All three corridors keep the dead audible-or-tactile. Underpass — distant gunfire keeps drawing waves; the dead are mostly off-page but their *direction* is the threat. Apartments — moans through closed doors as the player passes them; one door rattles. Sewer — the sound *is* them, omnidirectional, water amplifying it.

What the player decides/learns: That routes are not equal. The sewer was the trap the prose flagged in Act 1. That patience is a skill the city rewards (checkpoint) and impatience is a skill the city kills (sewer push, gate push). Sets `met_checkpoint` / `met_wren` / `sewer_survivor` per route. Random encounter modifies `supplies` (-1) or `bond` (+1 / 0) per structure's random-events rule.

Connects to: Beat 9 (apartments hub) — all three corridors converge here.

### Beat 9 — The apartments hub (Wren introduction; first city safehouse)
What happens: The corridor exits into the courtyard of a four-story apartment block. The lobby door is jammed half-open. Inside: a stairwell with three apartment doors and roof access. This is the **apartments hub** the structure mandates. Each door visited once. Loops back to the stairwell.

- **Apt 1 (ground floor, the kitchen):** A meal half-eaten on the table, two bowls, no occupants. Search yields `+1 supplies` and a hidden tell — a child's drawing on the fridge. (Foreshadow Mara without naming her.)
- **Apt 2 (first floor, the medicine cabinet):** A bathroom; cabinet has bandages and pills. `+1 supplies`, or — if Dale is alive and `dale_bitten` is false — Dale can use the cabinet for a small `+1 health` (one-shot, consumes the supply).
- **Apt 3 (top floor, locked):** Door locked. The player can break it (loud — proximity cue spike) or pass. Inside: a body, a bag, a *radio*. The radio is mid-broadcast: a survivor frequency repeating coordinates. **The first mention of the marina.** (Seeds Act 3.)
- **Roof access:** Vantage. The player sees the city in panorama for the first time — fires, abandoned cars, the river. Sets `seen_river`. If Wren was met at Beat 8 apartments, she is here on the roof, or she joins the player here regardless of route (she has been tracking — the prose makes this readable, not stalker-creepy: she says so).

If `met_wren` was set in Beat 8, this is where she asks to come along. If not, this is where the player meets her for the first time. **Conversation hub `talk_wren`** opens at this beat.

Proximity cue: The stairwell hum — the building has dead inside *somewhere*, not on the visited floors yet, but the elevator shaft echoes. Apt 1 — a smell. Apt 2 — the bath has wet footprints, recent. Apt 3 (if entered loudly) — at the next visit to the stairwell, a door on a *previously unvisited* floor is open that wasn't. Roof — the city is loud below; one closer building has a horde moving through it like a stain.

What the player decides/learns: That Wren is here, that she is asking to come, that she has a bag she will not open. Tells in `talk_wren`:
1. **"Where are you from"** — she names a town that's the wrong direction from the way she came (visible only if the player saw the road sign in Beat 8 apartments corridor — a note for Stage 3/5).
2. **"What's in the bag"** — she deflects with a joke. She *always* deflects with a joke, and the joke is rehearsed.
3. **"What do you want"** — she answers honestly here and the honesty is the *real* tell: "I want someone with me when I go to a place I need to get to." She does not name the place.

Each topic depletes (`flags_unset`). Asking all three sets `probed_wren`. Asking none and recruiting her sets `trusted_wren`. Refusing her outright (the paranoid choice) is *also* a path — it costs the player `has_keys` access in Act 3 (the truck reveal is gated on `probed_wren`, not on her being alive).

Connects to: Beat 10 (Ruth's church) when the hub closes (after at most two side-trips + roof + Wren resolution). The hub closes hard if Apt 3 is entered loudly (that pulls the building's interior dead onto the stairwell — proximity cue spike + forced exit). Recruiting Wren sets `stranger_alive` true.

### Beat 10 — Ruth's church
What happens: Two streets on, the player passes a **church with the doors barred from inside**. A voice answers a knock — older woman, suspicious, calm. This is **Ruth** (see Cast). She has been here three days; she has a small larder and a wounded husband in the side room (he is already dead; she is feeding him as if he weren't — a tell). She offers shelter for one night in exchange for help with the barricade.

Three player approaches:
- **Trust the church** — help with the barricade, sit with her, listen. Costs nothing material; earns `bond +1` and recruits Ruth (`elder_alive` true). If Caleb is alive she warms to him visibly — Caleb's presence opens the gentler recruit dialogue.
- **Loot it** — the larder is in plain view through the inner door. The player can steal it while she is in the side room. `+2 supplies`, `bond -2`, `looted_church` true, `abandoned_wounded` (the engine flag — looting a kind old woman counts) set. Ruth survives the loot but does not travel with the player; locks her out of Act 3 entirely.
- **Pass it by** — knock-and-go, polite refusal. Costs nothing, gains nothing. `bond` -0. Ruth offers a clinic key on the way out — the player can take it (`ruth_key`) for an Act-2-late `+2 health` clinic scene (consumable, structure mandates).

Conversation hub `talk_ruth` opens if recruited. Topics: the church (her grandmother's), her son (he was in another state when it started — she does not know), what she thinks of the player (this topic is the tell — she names the player's bond range back at them; high `bond` opens a small `+1 bond` reciprocation, low `bond` opens a *quiet* line that costs the player nothing material but tells them what they have become).

Proximity cue: The church is barred but the dead are at the side door — a slow scratching that does not stop the entire scene. Ruth's husband (off-page in the side room, the player will not see him unless they loot — looting forces the reveal, and the reveal is bad) makes a sound during the barricade beat that Ruth pretends she did not hear. Looters who *do* see him pay for it in narration. If recruited, leaving the church is a sprint — the side door breaks while the player is at the front.

What the player decides/learns: That kindness is currency here too — and that taking the easy supply costs the player something they cannot get back. That Ruth is older than the run can protect; the player who brings her along is committing to her. That the husband is one of the act's first *human* deaths the player encounters with weight.

Connects to: Beat 11 (Mara) when the church beat closes. Sets `elder_alive` (recruit), `looted_church` (loot), `ruth_key` (pass-by-with-key), `abandoned_wounded` (loot), `bond` per choice.

### Beat 11 — The crying building (Mara rescue)
What happens: A four-story office building two blocks south of the church. The player has been told *twice* by now (the radio in Apt 3, Ruth's broadcast at the church) that this building is compromised — bodies near the entrance, a horde moved through here last night. From the street the player hears a **child crying** on an upper floor. This is the structure's third turning point — *the hard, optional, costly save*.

Three approaches:
- **Take the visible way (the front door)** — bodies, blood, the lobby is openly compromised. The narration is *explicit*: the lobby has fresh prints, the staircase moans. Choosing this is the *skim-read death*. The player who insists on the front door dies — there is a brief death scene that names the misjudgement. (Death ending **D-Mara-front**.)
- **Take the hard way (the alley fire-escape and the broken third-floor window)** — discoverable from a careful look at the building exterior. The fire-escape's bottom rung has been pulled up; the player needs to climb (`health ≥ 3` gate) and either `has_pistol` (one shot to clear the third-floor window's occupant) or a companion (Dale boost / Caleb spot / Wren rope / Ruth holds the alley). Costs `1 health`. Routes to a successful rescue — Mara is in a supply closet on the fourth floor, alone, has been alone for two days. Sets `child_rescued` true and `child_alive` true. `bond +2`.
- **Refuse** — walk past. The crying continues for two blocks. The player can hear it stop at the third block. Sets `refused_mara`, `bond -1`. Routes the run cleanly toward the cold-solo ending bracket (E1 / E2). This is a valid path; it has a colder framing in Act 3, not a punishment.

Inside the building (hard way) the player can take a single supply from a desk drawer (`+1 supplies`) at the cost of one extra proximity beat. Mara, if rescued, immediately becomes the centre of the run — `talk_mara` opens, capped at three short topics (her name, her mother, the dark). Lying to her about her mother sets `lied_to_mara` (`bond -1`).

Proximity cue: Outside — the building's lobby is groaning. Inside (hard way) — every floor has a dead occupant, sometimes still on the floor with them, sometimes one wall away. The supply closet on the fourth floor is the *only* moment of relative quiet in Act 2 — and even there, footsteps in the corridor outside. Leaving the building is a chase — the front door is no longer an option, the fire-escape is the only way down, and *something* is on it now.

What the player decides/learns: That the brief's contract holds — the hard, costly save is reachable to the player who reads the building. That refusing is allowed. That Mara is small and tired and asking the questions the player cannot answer. The first `talk_mara` topic earns `+1 bond` regardless of answer; lying about her mother (topic 2) costs.

Connects to: Beat 12 (the hostile survivors). Companions follow — Mara is carried or led depending on `health` and party.

### Beat 12 — The hostile survivors (third human turning point)
What happens: Late afternoon of day two. The party (whatever it is) is funnelled by collapsed-road and horde-movement into a sectioned street where a small armed group has set up a *too-clean* camp. They invite the player in. They have hot food and a fire. They are charming in front, and the camp has tells the careful player can read.

The leader — **Hollis** (see Cast) — is the kind of charismatic-sociable that goes wrong in proximity. He shakes the player's hand. He has a question for everyone in the party, and remembers the answers. He counts the supplies on the player's belt as he talks. **Tells** (Stage 3/5 must surface):
1. The camp is too clean. Bodies have been *removed* from the road outside, not left where they fell. Fresh boots on a dead man inside the perimeter — boots that fit one of Hollis's people.
2. The radio inside the tent is on a loop the player has heard before — Apt 3's broadcast, but with the coordinates *changed*. They are spoofing.
3. Hollis's second (a quieter man) does not look at the player when Hollis speaks. He looks at the player's bag.
4. They ask about Mara specifically, even though the player has not introduced her by name. (Reachable only if Mara was rescued — they have heard her crying for two days too, and they were waiting.)

The hub closes after the player has been at the fire for one full conversation beat. Three resolutions:
- **Fight** — initiate. Costs `1–2 health` and `1 supply`. Sets `killed_survivor` true. With a companion, the companion takes a wound (Caleb dies if `health ≤ 1` going in — *legible*: he is the weakest fighter, the prose telegraphs this in his Beat 11 bark). Without a companion, the solo player can win if `has_pistol` and `health ≥ 3` — otherwise it's a death scene (**D-Hostile-fight**) that names the misjudgement (you fought a stronger group with insufficient resources).
- **Flee** — walk away the moment the second tell registers. The party has to *leave Mara's pack* (`-1 supplies`, `bond -1`, narration: she will not understand, you cannot explain). No death; narrows late options.
- **Yield** — sit down. Eat the food. Hand over the bag. This is the **permadeath path** unless `bond ≥ 3` triggers the *companion-rescue intervention* (a hidden choice — a companion (priority: Dale > Ruth > Caleb > Wren) creates a distraction at the firelight; player escapes; companion is left behind, may die — flag `companion_sacrificed`, `bond +1`, `-2 supplies`). If no companion or `bond < 3`, the yield is **death ending D-Hostile-yield** — a slow scene that names the misjudgement (you traded one threat for a worse one).

Proximity cue: All through the encounter, the dead are at the perimeter — Hollis's people pull them off the wire occasionally with practised motions. The wire has *teeth* in it, fresh ones. After resolution: the perimeter breaks no matter the choice — the act's last beat is fighting through dead toward the eastern arterial.

What the player decides/learns: That living people are now the worst threat. That Hollis read the player's party while the player read his camp — the question was who read first. That `bond` opens a hidden door in the worst rooms (the rescue intervention is the structure's "hidden choice — existence is a spoiler"). Sets `killed_survivor` (fight), `companion_sacrificed` (yield-with-rescue), companion-alive flags updated per outcome.

Connects to: Beat 13 (the rooftop / Wren's truth) if Wren is alive, otherwise Beat 14 directly.

### Beat 13 — The rooftop (Wren's truth, or a quiet beat without her)
What happens: A short rest beat on the roof of a parking structure, evening of day two. **This is the load-bearing Wren-payoff beat** — Stage 3/5 must lean into proximity-pressure here so it never reads as safe.

- **If Wren alive AND `probed_wren`:** She comes clean, on her own, before the player has to ask. The bag has a set of **truck keys** to a vehicle her brother stashed at the city's eastern edge — `has_keys` set, `betrayed_by_wren` *unset* (she would have taken them to the truck and left the player at the city limit; she is choosing not to). Earns `bond +1`. Becomes a real ally for Act 3.
- **If Wren alive AND `trusted_wren` (player did not probe):** This is the **betrayal beat**. She waits for the party to sleep (or what passes for sleep here), takes `-2 supplies` and the player's pistol if they have one (`has_pistol` cleared, `betrayed_by_wren` true). If `bond ≥ 2` the player can talk her down before she leaves — a peaceful resolution that ends with her staying *and* the truck reveal. Below `bond 2` she is gone in the morning. If she takes a companion's bag, the relevant companion-alive flag *can* be lost (Caleb if asleep, never Dale who would wake) — Stage 3/5 to gate carefully.
- **If Wren refused at Beat 9:** The rooftop is just the player's rest beat. Quieter. No truck reveal — `has_keys` cannot be set on this run. Bond opportunity instead: a small companion exchange (Ruth's son monologue, Caleb's first laugh, Dale telling the player to keep going). `bond +1` if the player engages.
- **If Wren dead at Beat 12:** Rooftop framing references it once. Quiet bond beat as above.

Proximity cue: The structure's stairwell echoes — the dead are inside, two floors below, working on it. The roof's edge looks out on the city; fires now, not flickers. Conversations are whispered; one character will stop mid-sentence at a sound from the stairwell.

What the player decides/learns: That paranoia keeps the player alive, and openness costs them. That the brief's contract — *paranoia keeps you alive, openness gets you the warm endings* — is a real tension here, not a pose. The player who probed (cynical) gets the truck. The player who trusted (warm) gets the betrayal. The player who refused outright (over-cynical) gets neither. The peaceful resolution is the *bond-earned* path that wins both.

Connects to: Beat 14 (the eastern arterial).

### Beat 14 — The pharmacy and the eastern arterial
What happens: Final beat of Act 2. The party is approaching the east of the city. Two interleaved sub-beats:

- **The pharmacy raid** (optional, consumable). A pharmacy on the way. Front shutter compromised, back office still locked. Inside: the dead and the supplies. Resolution depends on resources: with `has_pistol` AND `health ≥ 3` → success (`+1 health`, `+1 supplies`, `looted_pharmacy` true, `1 supply` cost — bandages and bullets aren't free). Without one of them → `-1 health`, `+1 supplies` (you got something but you got cut). With neither → die or flee with nothing (legible — the scene tells the player they're under-resourced, fleeing is offered, only the player who pushes anyway dies). If `ruth_key` was set at Beat 10 and Ruth is alive, Ruth's clinic is reachable as an alternative `+2 health` consumable scene (structure mandates one-shot).
- **The arterial** — the road east, the river audible at the far end. Closes the act with one last horde pressure scene — the party runs, fights, or splits. If `dale_bitten` and Dale is still alive, **this is where he turns or chooses**. Stage 3/5: if `bond ≥ 2` Dale offers his own end at the arterial (the "I'll hold them while you go" — the *prelude* to E6's geometry, but here it's grief, not triumph). If `bond < 2`, he turns mid-run; the party puts him down. Either way `neighbour_alive` becomes false by end-of-act per the brief — no `dale_bitten` party reaches Act 3.

Proximity cue: Pharmacy — narrow aisles, the dead are in the back room before the player opens the door. They hear the player. Arterial — the horde from the cul-de-sac that has been audible since Act 1 has *caught up* by attrition; this is the running beat. The river ahead is the first *open* sound the player has heard in two days.

What the player decides/learns: That the city took a price, and they pay it here. That Dale's arc (if applicable) ends in Act 2, on the player's terms or the bite's. Sets `looted_pharmacy`, updates `health` / `supplies` per pharmacy outcome. Clears `dale_bitten` and `neighbour_alive` per arterial outcome. Sets `act2_complete`.

Connects to: **Act 2 Exits** — see § Exits below.

---

## Hubs

### Apartments hub (Beat 9)
Purpose: Teach Wren's tells in a constrained map; introduce the **river** (Apt 3's broadcast) and **Mara** (Apt 1's drawing) as offstage facts before the player meets either; give one supply gain and one health gain to the player who explores carefully. Closes after Apt 3 entered or two side-trips + Wren resolution.

### Conversation hubs
- `talk_wren` — Beat 9. Three topics. Tells per § Beat 9. **Asking all three sets `probed_wren`.** Topics depleted via `flags_unset`.
- `talk_ruth` — Beat 10 (recruit only). Three topics. The third is a `bond` mirror.
- `talk_caleb` — opens at Beat 13 if Caleb alive. Topics: school, parents, why he didn't run. Each `+1 bond`. Uses `flags_unset`.
- `talk_dale` — re-opens briefly at Beat 14 if Dale alive. One last topic: *the wedding band*. `bond +1` regardless of player response. Hard cutoff after Beat 14.
- `talk_mara` — opens at Beat 11. Three topics. Lying about her mother (topic 2) sets `lied_to_mara`.

---

## Flags/Stats Changed

- `route_underpass` / `route_apartments` / `route_sewer` — read in Beat 8. Engine-only (N).
- `met_checkpoint` — Beat 8 (underpass). Engine-only (N).
- `sewer_survivor` — Beat 8 (sewer success). Engine-only (N).
- `met_wren` — Beat 8 (apartments) or Beat 9. Engine-only (N).
- `stranger_alive` — **Player-visible (Y)** as "Wren". Set at Beat 9 on recruit; cleared at Beat 12 on death or Beat 13 betrayal-leave.
- `trusted_wren` / `probed_wren` — Beat 9. Engine-only (N). Mutually exclusive in spirit.
- `betrayed_by_wren` — Beat 13. Engine-only (N).
- `has_keys` — **Player-visible (Y)** as "Truck Keys". Beat 13, gated on `probed_wren` or peaceful-resolution path.
- `elder_alive` — **Player-visible (Y)** as "Ruth". Beat 10 recruit.
- `looted_church` / `ruth_key` — Beat 10. Engine-only (N).
- `abandoned_wounded` — set on Beat 10 loot path (carries forward from Act 1 if already set). Engine-only (N).
- `child_rescued` — **Player-visible (Y)** as "Mara". Beat 11.
- `child_alive` — engine-only (N) mirror; can drift from `child_rescued` in Act 3.
- `lied_to_mara` — Beat 11 `talk_mara`. Engine-only (N).
- `refused_mara` — Beat 11. Engine-only (N).
- `killed_survivor` — Beat 12 fight. Engine-only (N).
- `companion_sacrificed` — Beat 12 yield-with-rescue. Engine-only (N).
- `looted_pharmacy` — Beat 14. Engine-only (N).
- `shared_supplies` — opportunistic across Beats 10/11/13/14 (sharing food with Mara, Ruth, Caleb). Engine-only (N).
- `bitten` — possible at Beat 11 (botched climb), Beat 12 (fight), Beat 14 (pharmacy or arterial). **Player-visible (Y)** as "Bitten". Fatal countdown into Act 3.
- `dale_bitten` — cleared by end of Beat 14 (Dale dies in act regardless). Engine-only (N).
- `neighbour_alive` — cleared at Beat 14 if `dale_bitten` was set entering Act 2; otherwise persists if Dale survives (Exit D / E only).
- `act2_complete` — Beat 14. Engine-only (N).
- `health` — moves -2 to +3 across the act depending on path. Pharmacy +1, Ruth's clinic +2 (one-shot), apartments medicine +1. Costs at sewer, Mara hard-way, hostile fight, pharmacy fail.
- `bond` — moves -3 to +5 across the act. Mara rescue +2, lying to Mara -1, looting Ruth -2, killing surrendered survivors -2, peaceful Wren resolution +1, refusing Mara -1, sharing supplies +1 each capped.
- `supplies` — moves -3 to +4. Pharmacy/Ruth/Wren-stash gains; betrayal/yield/share/travel costs.

---

## Exits

These are the configurations Act 3 must branch on. Five distinct states — fewer than Act 1 because Act 2 deliberately narrows the party (Dale dies in-act if `dale_bitten` was carried in; companion deaths from hostile-survivors and Wren betrayal collapse some combinations into shared late-act framings).

- **Exit α — Cold Solo.** All companions dead or absent. `child_rescued` false. `bond ≤ -1`. `killed_survivor` may be true or false. `abandoned_wounded` likely true. `has_keys` may be true or false. `health` 1–3, `supplies` 0–2. Either looted the church or hit the sewer or both. → Act 3 entry: locks toward E1 (Cold Walk). This is the bracket the player who refused Mara, refused Wren, looted Ruth, fought Hollis, and ran the sewer arrives in.

- **Exit β — Broken Solo.** All companions dead, but the player did not break themselves doing it. `child_rescued` false. `bond` -1 to +1. `killed_survivor` false. `abandoned_wounded` false. `looted_church` false. Lost companions to circumstance (hostile-survivors yield-with-rescue, Wren leaving on betrayal, Dale's bite). `health` 2–4, `supplies` 1–3. → Act 3 entry: routes toward E2 (Empty Boat) with a narrow window upward to E3 if Mara is rescued late (Stage 3/5 may offer one final Mara-recovery hook in early Act 3 — author's call).

- **Exit γ — Mara, alone with her.** Mara rescued. All adult companions dead or absent. `child_rescued` true, `child_alive` true. `bond` ≥ 2. Possibly `has_keys` (Wren probed before her death). `health` 2–4, `supplies` 1–3. → Act 3 entry: routes toward E3 (Mara, and Quiet). Hardest standard win path. The brief's "hard, optional, costly save" earned.

- **Exit δ — One adult, no Mara.** One of {Caleb, Ruth, Wren} alive. `child_rescued` false (refused or failed Mara). `neighbour_alive` always false (Dale never reaches Act 3 — bite or arterial). `bond` -1 to +3. Companion-specific flag tracking: Caleb requires `caleb_was_lied_to` not exposed to keep him steady; Ruth requires not-looted; Wren requires `probed_wren` AND not `betrayed_by_wren`. → Act 3 entry: routes toward E4 (Two of Us) — four flavour variants per companion (Caleb / Ruth / Wren / [Dale unreachable here]). Stage 3/5: Dale flavour of E4 is unreachable — the brief allows that, the party narrows by attrition.

- **Exit ε — Mara plus one adult.** Mara rescued AND one of {Caleb, Ruth, Wren} alive. `child_rescued` true. `bond` ≥ 4. At least one `shared_supplies`. `killed_survivor` false (the warm bracket excludes the Hollis-fight path). `abandoned_wounded` false. `has_keys` may be true or false but is *strongly* likely true on this path (the player who plays for ε reads Wren too). `health` 3–5, `supplies` 2–5. → Act 3 entry: routes toward E5 (Three of Us) — the structure's "near-perfect path" ending. Or toward E6 (Hold the Dock) if the player makes the sacrifice choice. This is the rarest entry.

Notes on collapsed branches:
- The six Act-1 exits do **not** map one-to-one onto Act-2 exits. Act 2 narrows by attrition: Dale always dies in-act if `dale_bitten` was carried in; he may die at the arterial regardless on `bond < 2` runs. Caleb is fragile in the hostile-survivors fight beat. Wren can leave or die. Ruth's recruitment is gated. The structure's "small found family that may not arrive" is built here.
- Act 1 Exit A (Solo / Quiet, cold) tends to Act 2 Exit α (no companions to recruit warmth from a low base).
- Act 1 Exit B (Solo / Hard Mercy) is the *only* solo entry that can climb to Act 2 Exit γ — the player who entered Act 2 morally clean and rescued Mara alone.
- Act 1 Exits C, D, E, F all *can* reach any of α–ε, but the higher-companion entries (E, F) have the broadest spread; Exit F still narrows at the arterial as Dale always exits the run.

---

## Notes for Act 3 author

- **Five exit configurations.** Act 3 must distinguish α–ε in entry framing prose. ε is the rarest and hardest-earned; α is the cold default for the broken player.
- **`has_keys` is the truck.** Structure's consumable-truck rule lives in Act 3 — author it as a one-shot route to the marina that bypasses one (not all) of the dock-approach obstacles. Once driven, the choice vanishes.
- **`killed_survivor` blocks E5's clean variant.** A player on Exit ε who fought Hollis still gets E5, but the closing narration is darker. Stage 5 must surface this.
- **`betrayed_by_wren` is reachable only if Wren survived the betrayal beat with the player still alive** — i.e. she took supplies and left, the player did not catch her. On the warm path she stays.
- **`bond ≥ 5` for E6's final dialogue is reachable from Exit ε.** Most ε runs land at `bond` 4–5; E6 needs the player to push for the small bond-positive choices in Beat 13 and Beat 14.
- **Mara's three `talk_mara` topics are partly in Act 2, partly in Act 3.** Stage 3/5 should leave one topic for Act 3 to land — the dark.
- **Proximity-pressure does not let up.** Even Exit ε (the warmest entry) arrives at the river to find the river itself is loud — the dead have followed the *sound* of the city collapsing. Act 3 is allowed no clean safe rooms either.
