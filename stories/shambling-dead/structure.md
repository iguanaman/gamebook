# The Long Walk Out — Structure

> Locked Stage 0 deferrals: final-act exit point = **river crossing at the eastern marina** (chosen for the bottleneck/sacrifice geometry it gives the finale — boats are limited, choice is forced). Child = **pre-named NPC, "Mara," ~7yo, encountered mid-Act-2**. Humanity is folded into `bond` (single stat carries both attachment-to-Mara and residual-self).

---

## Atmosphere Rule (load-bearing)

**Tension ramps over Act 1, then never lets up.** The very opening (Beats 1–2) is uncanny rather than lethal — wrong-feeling morning, distant sounds, glimpses. From Beat 3 onward the dead are confirmed and proximate; from Act 2 onward they are constant. By Act 3 every scene presses.

**Once the dead are confirmed, they are always present.** Every scene from mid-Act-1 onward — hubs, conversations, rests — keeps the zombies audible, visible, or tactile: banging on a door/wall, scraping on stairs below, shadows at frosted glass, moans through vents, a pack working out how to climb. Conversations are clipped, whispered, interrupted by sounds. Rest is never restful. There is no clean safe room. If a beat reads as "we caught our breath," it ends with a fresh proximity cue.

## Humans as Threat (load-bearing)

**Half the lethal threats are alive.** Pressure makes survivors do awful things; the player will face people who lie, rob, betray, or kill — and will be offered chances to do those things themselves. Wren is the prototype liar with readable tells; the hostile-survivors group in late Act 2 is openly predatory; further human-threat encounters seed Act 3 (Stage-3 author may add more in scene breakdowns). Every human betrayal has tells in narration and conversation hubs — death-by-trusting-the-wrong-person is the consequence of misreading a person, not arbitrary. Reading people is as load-bearing as reading the dead, and the two skills sometimes pull opposite ways: paranoia keeps you alive, openness gets you the warm endings.

---

## Acts

- **Act 1 — The Street.** Day one of the outbreak. The player wakes up, decides what to grab, and gets out of their immediate neighbourhood. Establishes the slow-zombie grammar (sound draws them, bites = death, the dead are *quantity* not speed) and sets up the first companion choices: **Dale** (wounded neighbour, possibly bitten), **Caleb** (terrified teen across the street). Ends when the player reaches the edge of the residential district and has to choose a route into the city proper.

- **Act 2 — The City.** Days 2–3, crossing a fragmenting downtown. Looting, hiding, hostile survivor groups, a failing military checkpoint, a pharmacy run, a rooftop. **Ruth** (older woman holed up in a church) and **Wren** (stranger on the road; lies about something) join or refuse depending on play. The act centres on the **rescue of Mara** from a building the player has clear reasons to avoid — she is the hard, optional, costly save. Ends when the group (whoever is left) reaches the eastern arterial that leads to the river.

- **Act 3 — The River.** Day 4. The marina at the city's eastern edge. Boats are limited, the dock is compromised, and a final tradeoff scene forces the player to choose who crosses. Endings branch on who is alive, `bond`, key moral flags, and a final-act exit choice (boat / swim / hold the dock).

---

## Turning Points

1. **Leave or die on the lawn (Act 1).** The first real choice — go now or try to "wait it out" / call for help. Waiting kills you. The brief's contract: this death is legible. The narration gives the player every signal to move; the only way to die here is to misread the explicit "no help is coming" texture.

2. **The first save/abandon (end of Act 1).** Dale is wounded and slowing the group. The player chooses whether to keep him, leave him, or kill him cleanly. This is the first `bond` mover and the first scene whose memory shapes Act 3 dialogue. (Brief mandates the first save/abandon here.)

3. **The Mara rescue (mid Act 2).** A child crying inside a building the player has been told not to enter. The route in is hard but discernible — there are tells the careful player can read. Refusing is a valid path; the player just gets a colder ending bracket. Taking the hard route opens the bittersweet ending bracket.

4. **The hostile survivors (late Act 2).** A small armed group offers shelter that turns coercive — they want supplies, or worse, they want a person. Killing them, fleeing, or yielding sets the `killed_survivor` flag (or its absence) and the late-game "what are you willing to do" axis.

5. **The marina (Act 3 climax).** Not enough boat for everyone alive + supplies + Mara. The player chooses what to leave behind — supplies, a companion, themselves. Stat thresholds and prior flags decide which options exist.

---

## Branch Map

### Act 1 forks
- **Grab kit / run barefoot / call for help.** Determines `has_pistol`, starting `supplies`, and whether you arrive at the end of Act 1 with information or just adrenaline. Calling for help past a clear point = death (legible — the radio has been telling you nobody is coming).
- **Dale: bring / leave / kill.** Sets `neighbour_alive`, `abandoned_wounded`, `bond` baseline.
- **Caleb: take or refuse.** Sets `teen_alive`. Refusing him is a quiet `bond` cost, not a death — but he reappears in Act 2 if alive, and his presence is one of the keys to a Ruth path.

### Act 2 forks
- **City route: Highway underpass / Through the apartments / Sewer.** A mini-hub with three routes; each has its own danger profile and its own optional encounters. Sewer is the "safe-looking" red herring — it's where most low-supplies / no-pistol players die. Survivors who chose the apartments meet **Wren**. Survivors via the underpass find the **military checkpoint** scene (failing, tense; supplies if you're patient, death if you're impatient).
- **Ruth: trust the church / loot it / pass it by.** Looting kills `bond` and sets `abandoned_wounded` adjacent flag. Trusting and protecting her is the only way to recruit her.
- **Wren: trust / probe / refuse.** Wren lies — there are tells. Trusting blind = a betrayal scene that costs supplies and possibly a companion. Probing reveals the truth and makes Wren a real ally if treated well. The "always distrust" reflex is also punished: refuse Wren outright and you miss a critical Act 3 asset (a hidden truck — `has_keys`).
- **Mara rescue: take the hard way in / take the visible way / refuse.** Visible way = death (the building is openly compromised; the player who skim-reads dies here). Hard way requires `health ≥ 3` and either `has_pistol` or a companion. Refusing routes the story toward the cold-solo ending bracket.
- **Hostile survivors: fight / flee / yield.** Yielding = a permadeath path unless `bond ≥ 3` triggers a companion-rescue scene. Fight = `killed_survivor` flag, costs `health`/`supplies`, blocks the "clean" ending variant. Flee = supplies cost, no death, narrows late options.

### Act 3 forks
- **Marina approach: stealth / push through / split up.** Split up causes a guaranteed loss of a companion (player chooses who); the loss is grim but legible.
- **Final exit: take the boat / swim with Mara / hold the dock for them.** "Hold the dock" is the sacrificial ending. "Swim" requires `health ≥ 3` and a tight `supplies` window. "Boat" is the standard route; who is on the boat is decided by what the player has earned across the run.

### Hubs
- **Neighbourhood hub (Act 1 mid):** the street outside the player's house. Player can re-enter their home, check on neighbours, search the abandoned car. Loops back to itself. Closes when the horde arrives.
- **Apartments hub (Act 2):** a stairwell with three apartment doors and a roof. Loops; each door visited once. Includes a **conversation hub with Wren** if she's present (topics deplete).
- **Marina hub (Act 3 short):** the dock area; the player can scout the boat, the office, and the seawall once each before the climax fires. Short by design — the noose is closing.

### NPC conversation hubs (named nodes)
- `talk_dale` — Act 1, while travelling. Topics: his wife, the bite (if present), what he saw on the lawn.
- `talk_caleb` — Act 2 downtime. Topics: his school, his parents, why he didn't run.
- `talk_ruth` — Act 2 if recruited. Topics: the church, her son, what she thinks of the player.
- `talk_wren` — Act 2 hub. Topics: where she came from, the bag she won't open, what she wants. Each topic is a **tell**.
- `talk_mara` — Act 2/3. Short, age-appropriate. Topics: her name, her mother, the dark.

---

## Endings

Each ending is gated by `child_alive`, `bond`, the companion-alive flags, the `killed_survivor` and `abandoned_wounded` flags, and the final-act exit choice. Exit choices that look impossible at low stats are simply absent from the choice list — no greyed teasing for finale options.

- **E1 — The Cold Walk** (solo, cold). Alive, alone. You broke every bond. `bond ≤ -2`, all companion flags false. The narration is the player's own voice now, not the narrator's — that's the texture.
- **E2 — Empty Boat** (solo, broken). Alive, alone, because everyone else died despite you trying. Companion flags false but `bond ≥ 0` and no `abandoned_wounded` / `killed_survivor`. Tonally the saddest of the survives.
- **E3 — Mara, and Quiet** (escape with Mara). `child_alive` true, all adult companions dead or left. Hardest standard win. `bond ≥ 4`.
- **E4 — Two of Us** (escape with one adult companion, no Mara). One of {Dale, Caleb, Ruth, Wren} alive at the marina, `child_alive` false. Four flavour variants — each companion has their own outro paragraph.
- **E5 — Three of Us** (escape with Mara + one adult). Rarest. Requires `bond ≥ 5`, exactly one adult companion alive at the marina, and at least one `shared_supplies` flag. The brief's "near-perfect path" ending.
- **E6 — Hold the Dock** (sacrifice). The player stays so the boat can leave. `child_alive` and at least one adult companion alive — they go, you don't. `bond ≥ 4`. Requires the explicit "hold the dock" final choice.
- **E7 — Stay Behind** (refuse to leave). The "I can't do this" path. Reachable only via a specific Act 3 fork where the player walks back into the city. Cold and final.
- **D1–D5 — Death endings.** Bitten (Act 1 or 2), overrun (Act 2 sewer / Act 3 marina), shot by the hostile survivors, killed in Wren's betrayal scene, drowned in a swim attempt with insufficient health. Each death scene names the misjudgement.

**Total: 7 living endings + 5+ death endings.** Distinct in path, party, and tone — not flavour variants of the same outcome.

---

## Mechanics Summary

### Stats

- **`health`** (start: 5, max: 6).
  - Earned by: short rests at safe scenes (rare; +1 each, max once per location), Ruth's clinic scene if she's alive (+2 once), pharmacy raid if successful (+1).
  - Costs: combat scenes, climbing/jumping risk choices, untreated `bitten` flag (drains over Act 2), exhaustion choices in long traversal scenes.
  - **Mid-story gate (Act 2):** the Mara rescue's hard route requires `health ≥ 3`; the apartment-route fall scene kills outright at `health ≤ 1`.
  - **Thresholds:** `≤ 1` = next risky choice can kill; `≥ 4` = unlocks the swim ending and the "carry Mara" beat in Act 3.
  - **Tradeoff:** earning `health` from rest costs `supplies` (food/water) or burns a daylight window (closes other choices in that scene). Pure win-win rest options don't exist.
  - **Finale role:** swim ending requires `≥ 3`; hold-the-dock ending requires `≥ 2` to make the choice meaningful (not collapsing on the dock).

- **`bond`** (start: 0, range: -3 to 6). The humanity stat — attachment to Mara and the player's residual self. Folded humanity into bond per brief.
  - Earned by: protective choices toward any companion (small +1s), specific Mara beats (+2 each, capped at 3 events), refusing the cruel option in moral pressure scenes.
  - Costs: cruel choices (-1), abandoning the wounded (-2), killing surrendered survivors (-2), lying to Mara about her mother (-1).
  - **Mid-story gates (Act 2):** `bond ≥ 2` unlocks the "talk Wren down from the betrayal" peaceful resolution; `bond ≥ 3` unlocks the companion-rescue intervention at the hostile survivors scene.
  - **Thresholds:** `≤ -2` locks E3/E5/E6 (you don't get the warm endings); `≥ 4` unlocks E5; `≥ 5` unlocks E6's final dialogue and the "she calls you by name" moment.
  - **Tradeoff:** every bond-positive choice has a cost in `supplies` or `health` or path-narrowing. You cannot stack bond without bleeding elsewhere — that's the core economy.
  - **Finale role:** decides E1 vs E2 (cold vs broken), gates E3/E5/E6, and modifies the closing narration of every ending.

- **`supplies`** (start: 3, range: 0–8).
  - Earned by: pharmacy, abandoned car, Ruth's larder, Wren's stash (if recruited honestly), patient checkpoint scene.
  - Costs: shared meals with companions (cost +1 to bond), travel scenes (passive drain at act transitions), the betrayal scene (lump cost), the marina (forced final cost).
  - **Mid-story gate (start of Act 3):** `supplies ≤ 1` blocks the apartment-route in Act 2's late traversal (you collapse) and removes the "feed Mara" dialogue beat that earns `bond`.
  - **Thresholds:** `0` = next exhaustion check kills; `≥ 4` at start of Act 3 enables the "hold the dock" ending (you can supply the boat); `≥ 5` enables E5's final "three of us, with food" line.
  - **Tradeoff:** the only supply gains in Act 2 are gated by risk (pharmacy = combat, checkpoint = patience-or-death, Wren's stash = honesty earned). No freebies.
  - **Finale role:** scarcity at the marina forces the climax tradeoff. High supplies opens the soft endings; low supplies forces sacrifice or loss.

### Flags

**Companion-alive flags (HUD-visible):**
- `neighbour_alive` ("Dale") — set true if Dale survives Act 1; goes false on death/abandon.
- `teen_alive` ("Caleb") — Caleb's status from Act 1 onward.
- `elder_alive` ("Ruth") — Ruth's status from Act 2 onward.
- `stranger_alive` ("Wren") — Wren's status from Act 2 onward.
- `child_rescued` ("Mara") — set true on rescue; goes false on Mara's death.
- `child_alive` (engine-only mirror; child_rescued can be true and child_alive false in late game).

**Player-visible inventory flags:**
- `has_pistol` ("Pistol") — Act 1 grab.
- `has_keys` ("Truck Keys") — Wren's reward path.
- `bitten` ("Bitten") — fatal countdown flag; visible so the player feels the dread.

**Engine-only moral flags:**
- `abandoned_wounded`, `killed_survivor`, `shared_supplies`, `lied_to_mara`, `trusted_wren`, `probed_wren`, `betrayed_by_wren`, `held_the_dock_offered`.

**Engine-only route flags:** `route_underpass`, `route_apartments`, `route_sewer`, `met_checkpoint`, `looted_church`.

### Consumable choices (require deliberate `flags_unset` + effect pairing)

- The pistol — only one in the bedside drawer. Once grabbed, `has_pistol` is set; the choice must vanish from the home scene.
- The truck — Wren's keys lead to one truck. After driving it once, the choice "drive the truck" must be gone.
- The pharmacy raid — succeed or fail, the pharmacy is empty afterwards. `looted_pharmacy` set; choice vanishes.
- Ruth's clinic +2 health — once per playthrough.
- Each conversation topic — every `talk_*` topic uses `flags_unset` so it disappears once asked.

### Greyed vs hidden gated choices

- **Greyed (the player should know the option exists):** companion-recruit choices ("Take Dale with you"), supply-cost choices ("Share the last can with Caleb"), the swim ending at low health ("Swim. Mara on your back" — visible but greyed at health < 3 so the player feels the shortfall).
- **Hidden (existence is a spoiler):** the `bond ≥ 3` companion-rescue intervention at the hostile survivors scene; the E6 "hold the dock" final option (only appears if its prerequisites are met — discovering it is part of the ending); Wren's truck reveal (hidden until `probed_wren`).

### Random events

- **Travel scenes between districts (Act 2):** weighted random `next` for "uneventful / lone walker / sound from a window." None lethal directly; one supply cost path, one bond opportunity, one nothing. Make the uncertainty legible in the text.
- **Marina dock approach (Act 3):** weighted random for which dock obstacle fires. Each obstacle has a discernible solution; randomness is which obstacle, not whether the player can solve it.

### Replayability checklist (verified at structural level)
- [x] Random events: Act 2 travel, Act 3 dock approach.
- [x] Hubs: neighbourhood (Act 1), apartments + Wren conversation (Act 2), marina (Act 3).
- [x] Branches diverge by mid-Act-1 (Dale choice; route choice).
- [x] 7 distinct living endings, 5+ death endings, distinct in path and tone.
- [x] Fail states in every act (Act 1: wait-it-out death, Dale-bite if kept untreated; Act 2: sewer, checkpoint impatience, Wren betrayal, hostile survivors yield; Act 3: marina overrun, swim drowning, split-up companion loss).
- [x] Permadeath on multiple paths (Act 1 wait, Act 1 lawn, Act 2 sewer, Act 2 betrayal, Act 3 marina, Act 3 swim).
- [x] Red herrings: the sewer ("safer-looking" route), Wren's likability, the church's apparent emptiness.
- [x] Consumable / one-shot scenes (pistol, truck, pharmacy, Ruth's clinic).
- [x] Endings vary on accumulated state — every ending bracket reads stats and flags, not just the last choice.
