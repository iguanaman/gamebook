# The Long Walk Out — Act 1: The Street

## Journal Entry
You woke up to screaming on the lawn. The world ended before breakfast.

## Entry
Arrives from: story start.
Player state: `health` 5, `bond` 0, `supplies` 3. No flags set. Player is in their own bedroom on the morning of the outbreak.

## Atmosphere — Ramping Pressure (load-bearing)

Per brief.md and structure.md: **Act 1 ramps from uncanny to lethal.** Beat 1 is *quiet wrong-ness* — strange sounds, neighbour behaving oddly, radio static — not confirmed horror. The dead are not yet on the page as zombies; the player's brain is still trying to file what they saw on the lawn as something explicable. From Beat 3 onward (the porch, the ambiguous bite, the shamblers across the road) the truth becomes undeniable and the proximity cues escalate hard through the hub, the route choice, and the Dale decision. By the end of Act 1 the world is openly hostile.

Every beat below is annotated with a proximity cue calibrated to its place on the ramp. Beats 1–2 lean uncanny; Beats 3–7 lean close-and-present. Stage 3/5 must preserve this curve — don't make Beat 1 a horde scene, and don't make Beat 7 feel safer than Beat 3.

## Beats

### Beat 1 — Wake-up
What happens: Dawn. A scream outside, then a wet sound that isn't a scream. The radio is half-static; the words "do not approach" come through twice. The player crosses the bedroom to the window and sees their next-door neighbour on the lawn, kneeling over another neighbour, eating.
Proximity cue (low — uncanny, not yet lethal): The radio is wrong (static and a looped warning, no live presenter). Two phones are ringing in two empty rooms — the player's mobile and the landline downstairs, both unanswered. A car alarm has been going for too long, three streets away. The wet sound on the lawn that the brain hasn't categorised yet. Something is off; the player doesn't know what kind of off.
What the player decides/learns: The slow-zombie grammar — the thing on the lawn is upright but wrong, slow, single-minded; sound matters; the radio is *telling* the player nobody is coming. First decision is whether to look longer (atmosphere, no cost) or move now.
Connects to: Beat 2 (linear).

### Beat 2 — Grab kit
What happens: Three rooms in the house, each with one meaningful pickup. Bedside drawer holds a pistol (one in the chamber, no spare clip). Kitchen has water bottles and a cans-and-painkillers haul. Hall closet has a heavy coat and house keys. The horde is a street away — every pickup costs a "tick" of time, signalled in the prose (a closer scream, glass breaking next door).
Proximity cue (rising): Start of beat — distant car alarm, a single moan from the cul-de-sac. After pickup 1: a closer scream cut short, a neighbour shouting a child's name and getting no answer. After 2: glass breaks two houses down; the side fence rattles, something pressing on it from outside. After 3: a hand slaps wetly against the kitchen window; a shape on the porch. After 4 (greedy): the front door handle starts to turn from outside. The ramp is steep but legible — every prose beat says "go now."
What the player decides/learns: How greedy to be. Two pickups is safe; three is risky-but-survivable; four pulls the horde to the front door (Beat 3 short-circuits to a forced-fight variant). Sets `has_pistol`, baseline `supplies` (3, +1, or +2). The pistol is consumable — once taken, the choice vanishes from any return-to-home loop.
Connects to: Beat 3 (linear). Greed level carries forward as `home_loud` flag.

### Beat 3 — Front door / lawn
What happens: The player steps onto the porch. Dale, the wounded neighbour, is dragging himself across the grass toward the player's door, leaving a smear. He calls the player by name. He's hurt — the prose is ambiguous about *whether* it's a bite (his trouser leg is dark; he's holding it). The other neighbour-thing is across the road, hasn't noticed yet.
Proximity cue: The neighbour-thing across the road, head cocked, six seconds from noticing. Two more shapes are stepping out from between the houses at the end of the cul-de-sac. Whatever the player says on the porch, sound carries.
What the player decides/learns: First moral pressure. Help Dale up (slow, draws attention), shout from the porch ("can you walk?"), or step back inside and bolt the door. Bolting the door routes to Beat 4-Wait. Helping or shouting routes to the **Neighbourhood hub** (Beat 4-Hub) with Dale variably attached.
Connects to: Beat 4-Hub or Beat 4-Wait depending on choice.

### Beat 4-Wait — The Wait-it-out failure
What happens: Player bolted the door. Inside, the player can call 911 (engaged tone, then a recorded voice), try the landline, look out the window (the horde grows visibly, the prose is explicit), or drag furniture against the door. Every option is a *single* loop — each visit makes the threat narration louder.
Proximity cue (escalating with each loop): Loop 1 — banging on the front door, a moan from the porch. Loop 2 — wood splintering at the door jamb, hands on the kitchen window, glass cracking upstairs. Loop 3 — they are *inside* the upstairs landing, dragging themselves down the staircase one step at a time, very close now.
What the player decides/learns: This is the legible-failure beat. Three tells in the narration before the death scene: the radio repeats "no rescue is being mounted"; the front-door wood splinters; an upstairs window breaks. After the third tell, the only remaining choice is "open the door anyway" → death scene that names the misjudgement (you waited).
Connects to: Death ending **D1-A — Bitten on the Stairs**. Dead end intentional.

### Beat 4-Hub — Neighbourhood hub
What happens: The street outside the player's house. Three side options plus the road out. The abandoned car at the kerb (search once, possibly +1 supplies; ignition cough draws the horde a notch). The Pearson house across the road (Caleb is at his upstairs window, watching — knock or wave). Re-enter own home (one extra supply pickup if not maxed, or a quiet character moment with a photo on the fridge). Each option visited at most once. The horde is closing — the hub closes after **two** side-trips regardless of which.
Proximity cue: Always at least one shambler visible at the mouth of the cul-de-sac. After side-trip 1: two more lurch into view between houses; the moaning has become layered, multiple throats. After side-trip 2: a crowd of them is rounding the corner — the road-out option becomes a *run*, not a walk.
What the player decides/learns: How much to risk for what. Resource economy is taught here. Caleb is reachable from the hub — knocking sets up Beat 5; waving and walking on sets `caleb_seen` so he can reappear in Act 2. Dale, if rescued in Beat 3, is shown trying to keep up; his condition is observable (limping, sweating, but lucid — *or* limping, sweating, glassy-eyed depending on what the player saw on the lawn).
Connects to: Beat 5 (Caleb fork, only if his house was approached) or Beat 6 (route choice) when the hub closes.

### Beat 5 — Caleb's door
What happens: Caleb is fifteen, alone, parents already gone (one corpse in the kitchen, off-page). He won't open the door for a stranger; the player has to talk through it. Three approaches — gentle, firm, lying about being a paramedic. Gentle works in two exchanges; firm in one (and costs a small `bond`); lying works but sets a quiet flag the player won't see surface until Act 2.
Proximity cue: Something is in the Pearson house with Caleb. Slow footfalls on the kitchen lino, off-page; the corpse on the floor isn't fully a corpse anymore. The player can hear it through the door. Time pressure is *Caleb's*, not the player's — every exchange the player draws out is one closer to the thing in the kitchen finding the upstairs.
What the player decides/learns: The first conversation that costs something. Refusing Caleb here (walking away) is a viable choice — silent `bond` cost, but it spares the player a slower party. Sets `teen_alive` true if recruited.
Connects to: Beat 6 (linear).

### Beat 6 — Edge of the neighbourhood
What happens: The cul-de-sac opens onto an arterial road. The horde sound is behind, ahead is choice. There are three visible routes into the city: north toward the **highway underpass** (open ground, fewer dead but exposed), east through the **apartment blocks** (cover, but unknown), down into a **storm drain** (looks empty, dark, "safer-looking" — the red herring). Dale, if alive, names the routes the way a man who lived here twenty years would. Caleb, if present, defers to the player but is visibly afraid of the dark of the drain.
Proximity cue: The horde from the cul-de-sac is rounding the corner behind. Each route also shows its own threat in the middle distance — a single shambler under the underpass, two figures moving in the apartment courtyard, *something* faint and wet echoing up out of the storm drain. There is no quiet option, only different flavours of close.
What the player decides/learns: Acts as a soft hand-off — the player picks a route which seeds Act 2's mini-hub. Sets one of `route_underpass`/`route_apartments`/`route_sewer`. Companions weigh in via short barks — colour, not gating.
Connects to: Beat 7 (the Dale decision) if Dale alive; otherwise straight to Exits.

### Beat 7 — The Dale decision
What happens: Whether at the edge of the neighbourhood or shortly after on the road, Dale's condition forces the moment. If the player saw the leg-bite tell in Beat 3 (a quiet narrative cue — torn cloth high on the inner thigh, dark and spreading, not the scrape he claimed), Dale is becoming feverish here; if not, he is just hurt. The player chooses: keep him moving (slows the group, may infect later — `bitten` is a possibility on Dale, not the player), leave him sitting against a wall with his pistol (if any) for the end he wants, or end it cleanly themselves.
Proximity cue: They are stopped against the side of a stalled car on the arterial. Down the road, the cul-de-sac horde is still coming — slow but constant, a half-block back and not getting tired. A separate shambler is in the gas-station forecourt across the road, oblivious for now. The conversation is whispered. A gunshot here is a beacon — the mercy-kill choice has its own cost.
What the player decides/learns: First save/abandon. The bite tell was discoverable — the player who looked in Beat 3 *knows*; the player who skim-read does not. Either way the choice is moral, not arbitrary. Sets `neighbour_alive` and either `abandoned_wounded` or neither; `bond` shifts here (-2 abandon, -1 mercy-kill no-bite, 0 mercy-kill with-bite, +1 keep-with-bite — risky compassion).
Connects to: Exits (route + party state).

### Hub — Neighbourhood (Beat 4-Hub)
Purpose: Teach resource/risk economy on a small map; introduce Caleb passively if not actively pursued; let Dale's condition become legible; allow one extra `supplies` or one character moment.
Returned to from: Beat 4-Hub side options (each side option exits back to the hub).
Exits to: Beat 5 (if Caleb's door knocked), Beat 6 (after two side-trips OR the player chooses "head out"), Beat 4-Wait via the "go back inside and lock up" option (also a death route — the hub's loud-tells reach a threshold that makes this lethal after two trips).

### Conversation — `talk_dale` (mid-traversal, Beat 6 → Beat 7 corridor)
Purpose: Three short topics — his wife (a single line: "she didn't make it out the kitchen"), the bite (only available if the player saw the tell in Beat 3 — Dale lies, badly; flag it with `dale_lied`), what he saw on the lawn. Each topic depletes; each is a `bond` mover. The bite topic is the discoverable tell that converts the Beat 7 choice from blind to informed.
Where it sits in the beat flow: Optional pause between Beat 6 and Beat 7. Skippable. Asking nothing is itself a quiet `bond` cost.
Proximity cue: They're crouched behind a parked truck. Dale talks in a half-voice; he stops mid-sentence twice when something passes on the other side of the vehicle. The horde from the cul-de-sac is audible the whole time, getting closer with every topic. Lingering on conversation is itself a cost — you can hear them.

## Exits

These are the configurations Act 2 must branch on. Six distinct states.

- **Exit A — Solo / Quiet:** Beat 7, Dale dead (mercy-killed, no-bite seen) or simply left to die in Beat 4-Hub (if the player declined to bring him in Beat 3). Caleb refused or never approached. Player carries: no companions; `neighbour_alive` false, `teen_alive` false, `child_rescued` false. Flags: `abandoned_wounded` may be set (Dale-leave) or not (Dale-mercy). `has_pistol` per Beat 2. `bond` -1 to -2. Route flag set per Beat 6. → Act 2 entry: cold, low-bond approach; locks toward E1 unless recovered.

- **Exit B — Solo / Hard Mercy:** Dale mercy-killed *with* bite tell discovered (informed mercy) or `dale_lied` exposed via `talk_dale`. Caleb refused. No companions. `neighbour_alive` false, `teen_alive` false. `abandoned_wounded` unset. `bond` 0. Route flag set. → Act 2 entry: solo but morally clean; the act-2 author can light the path toward E2 or, with later good play, E3.

- **Exit C — Caleb only:** Dale dead by any path. Caleb recruited from Beat 5. `neighbour_alive` false, `teen_alive` true. `abandoned_wounded` per Dale path. `has_pistol` per Beat 2. `bond` -1 to +1 depending on Caleb-approach (lying = -1 with hidden flag `caleb_was_lied_to`). Route flag set. → Act 2 entry: vulnerable teen in tow; gates the gentler Ruth-recruit path in Act 2.

- **Exit D — Dale only:** Dale recruited and kept (Beat 7 keep, regardless of bite status). Caleb refused or unseen. `neighbour_alive` true, `teen_alive` false. If bite was real and player kept him, `dale_bitten` is set (Act 2 must run the fever-and-turn arc). `bond` 0 to +1. Route flag set. → Act 2 entry: a wounded adult — competence + ticking clock if `dale_bitten`. Locks Dale's Act-2 conversation hub.

- **Exit E — Dale + Caleb (clean):** Both recruited. Dale not bitten (player saw no tell, or saw and Dale wasn't actually bitten — the narration distinguishes these). `neighbour_alive` true, `teen_alive` true, `dale_bitten` unset, `abandoned_wounded` unset. `bond` +1. Route flag set. → Act 2 entry: full early party, no ticking clock. The healthiest entry; opens widest spread of Act-2 options.

- **Exit F — Dale + Caleb (poisoned):** Both recruited. Dale *is* bitten and the player kept him anyway. `neighbour_alive` true (for now), `teen_alive` true, `dale_bitten` true, `bond` +1 (the player chose risky compassion). Route flag set. → Act 2 entry: the party will lose Dale within the act unless something offered later (it isn't — the bite is fatal); the question becomes *how* he goes and whether Caleb sees it. Distinct emotional texture from Exit E and important to branch separately.

(Exit B vs Exit A are both solo but differ in `abandoned_wounded` and `bond` — they need different Act-2 cold-path framings, so they remain distinct exits.)

## Flags/Stats Changed

- `has_pistol` — set in Beat 2 if grabbed. **Player-visible (Y)** — appears as "Pistol" in HUD inventory.
- `home_loud` — engine-only (N). Set if the player took 3+ pickups in Beat 2; carried only into Beat 3 framing prose.
- `caleb_seen` — engine-only (N). Set if the player passed Caleb's house without knocking; allows him to reappear in Act 2.
- `caleb_was_lied_to` — engine-only (N). Set if the player got Caleb out with the paramedic lie. Surfaces in Act 2 conversation.
- `teen_alive` — **Player-visible (Y)** as "Caleb". Set true on recruitment.
- `neighbour_alive` — **Player-visible (Y)** as "Dale". Set true if Dale travels with the player past Beat 7.
- `dale_bitten` — engine-only (N). Set if the player sees the leg-bite tell in Beat 3 *and* still keeps Dale through Beat 7. Drives Act 2's Dale arc.
- `dale_lied` — engine-only (N). Set if the player asks about the bite in `talk_dale` and Dale denies it (only available if `dale_bitten` is true).
- `abandoned_wounded` — engine-only (N). Set if Dale is left behind alive in Beat 3 or Beat 4-Hub. **Not** set on mercy-kill.
- `route_underpass` / `route_apartments` / `route_sewer` — engine-only (N). Mutually exclusive; one set in Beat 6.
- `health` — unchanged in Act 1 unless the player hits the Beat 4-Wait death track (which terminates the run). Beat 2 greed at level 4 forces a Beat-3 fight that costs 1 `health` if survived (rare path).
- `bond` — moved by Beat 5 (Caleb), Beat 7 (Dale), and `talk_dale` topics. Range in Act 1: -2 to +1.
- `supplies` — Beat 2 sets the baseline (3, 4, or 5). Hub side-trip on the abandoned car may add +1 (capped at 5 for Act 1 ceiling).

## Notes for Act 2 author

- Act 2 must distinguish all six exits in entry framing prose. Exit F is the easiest to under-write — make sure it carries its own distinct opening (Caleb has noticed something is wrong with Dale; Dale knows; the player is the only one who *might* not, depending on Beat 3).
- The route flag from Beat 6 is the seed for Act 2's mini-hub (highway underpass / apartments / sewer). Sewer is the red herring — that lethality is Act 2's responsibility, but it must remain consistent with what the Beat-6 prose hinted.
- `bond` ceiling at end of Act 1 is +1 — keep Act 2's bond economy honest, the player can't bank it cheap.
- **Humans-as-threat ramps up in Act 2.** Act 1 contains *no* hostile-living encounter (the only living antagonists are off-page — looters/screams in the distance). This is intentional: Act 1 teaches the player to read the dead. Act 2 introduces the first liars and predators — Wren and the hostile-survivors group — and trains the *second* reading skill. Act 3 weaponises both. Keep this escalation; do not retroactively put a human antagonist in Act 1.
