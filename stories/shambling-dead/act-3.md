# The Shambling Dead — Act 3: The River

## Journal Entry
The road ran out at the water. The dead were already there.

## Entry
Arrives from: Act 2 Exits α / β / γ / δ / ε (five configurations — see Act 2 § Exits).
Player state on entry: variable. `health` 1–5, `bond` -2 to +6 (capped), `supplies` 0–5. Companion flags per exit. Inventory: `has_pistol` may or may not be set; `has_keys` may or may not be set; `bitten` may be set as a fatal countdown the player carries in.

## Atmosphere — Constant Pressure (load-bearing)

Per brief.md and structure.md: **Act 3 presses on every beat without exception.** The marina is being slowly overrun across the act — the perimeter that the dock crew has been holding for two days fails in stages, *during* the player's time there, not before or after. There is no clean safe room anywhere in this act, including on the dock itself: the fence rattles in the first beat, a section is pulled down by the middle beat, the boathouse roof groans by the climax. The river's open sound — the first real *open* the player has heard since Act 1 — is itself a tell that this is not safety but exposure: the dead have followed the city's collapse east by sound, and the marina is the funnel.

**Conversations are clipped throughout.** Even the hub beats are listened-into; characters stop mid-word at sounds; rest is borrowed minutes between fence-checks, not sleep. If a beat reads as caught-breath, it ends with a fresh proximity cue.

**Humans-as-threat:** Act 3 introduces the **dock crew** — survivors who have been at the marina longer than the player, who control the working boats, and who are openly predatory about who they will let leave. Their leader **Vance** (see Cast addendum) is colder than Hollis was: she does not host. She negotiates. She is willing to put a bullet in a child's foot to make a parent give up a bag, and she has done it once already this week — there is a body on the floating dock that says so. Tells are environmental and conversational, the same grammar as the Hollis camp; Stage 3/5 must surface them. A second figure — **Tomás** (see Cast addendum) — is *not* of Vance's crew: a man trying to get his own small group out, who reads the player faster than the player reads him. He may be ally, threat, or both depending on player choices.

**Difficulty:** Every death in Act 3 is the consequence of a discernible mistake — misreading the dock crew, swimming under-resourced, splitting up after the prose said the perimeter was already breaking, holding the dock without the supplies to stock the boat first. The act offers no coin-flips and no gotchas. Each death scene names the misjudgement.

Every beat below is annotated with a proximity cue.

---

## Act 3 Entry — Variant Framing (per Act 2 exit)

The first beat (Beat 15 — *The river*) is one beat with **five entry framings**, not five beats. Each framing is two to four short blocks and folds straight into Beat 15's first decision. Stage 3/5 must preserve this branching texture and not collapse the variants.

- **From Exit α — Cold Solo.** Player is alone, the narration tighter and first-person-creep, the way Act 2 entry framed Exit A but worse. The river smells wrong before it sounds wrong. The narrator does not name the dead companions; the player remembers them in a single image each (Dale's wedding band on a hand that wasn't there, Caleb's lanyard on a corpse that wasn't his, Ruth's stained cuff). `bond` is low; the prose offers no comfort. Locks toward E1 unless something here is recovered (and the act offers one narrow door — see Beat 17 *Found in the boathouse*).
- **From Exit β — Broken Solo.** Alone, but the player did not break themselves. Companions are named in past tense in single sober lines. The narration trusts the player. This framing carries a hidden hook for Act 3: if the player rescues a stranger or a child at Beat 16 (the breakwater) the run can climb to E3 (with Mara recovered) — author's narrow door, not a freebie. Otherwise routes to E2.
- **From Exit γ — Mara, alone with her.** Mara is at the player's side, holding the strap of the bag the way the cast established. She has not asked about the dark yet. The player is the only adult she has. The framing is tight — every sound the player notices, she notices first by half a beat. Routes toward E3. Opens the swim option in Beat 18 if `health ≥ 3`.
- **From Exit δ — One adult, no Mara.** One of {Caleb, Ruth, Wren} is the player's companion. The framing leans on the companion's specific voice — Caleb still picking the thumb, Ruth in the same cardigan, Wren's bag still across her body and now visibly lighter. No Mara — the player walked past or failed her. Routes toward E4 (companion-flavoured). Opens E6 if the player chooses sacrifice.
- **From Exit ε — Mara plus one adult.** The full warm-bracket party. Mara holding the player's bag, the adult companion half a step ahead reading the perimeter. The closest the run ever gets to a *family*. The prose must not let this read as safe — by the end of Beat 15 something at the marina has already gone wrong for someone. Routes toward E5, with E6 reachable on `bond ≥ 5`.

Proximity cue (entry, all variants): The arterial ends at a chain-link gate. Beyond the gate, the marina's working pontoons; beyond *those*, the river. The dead are *behind* the player still — the cul-de-sac chord that has been audible since Act 1 has caught up by attrition and is at the gate within the first beat. The dead are also *across* the marina — a smaller, slower group on the far concrete jetty, working their way down a parked-up jet ski as the player arrives. The marina is between two pressures.

---

## Beats

### Beat 15 — The river (entry, dock crew first contact)
What happens: The arterial spills into a service road that runs along the marina's landside fence. The gate is held by two of Vance's people; the radio in the booth plays a thin loop the player half-recognises. The player is *seen* before they can hide — Vance's crew has watched the arterial for two days. They wave the player up to the gate and ask three questions in a clipped order: who, how many, and what's in the bag. Each question is a tell.

Three player approaches at the gate:
- **Cooperate** — answer plainly, show the bag. Vance's people log the player on a clipboard (a bureaucracy *tell* — predators make spreadsheets here). The gate opens. Routes to Beat 16. Costs nothing material in this beat; sets `met_dock_crew` and `dock_crew_logged` (Stage 5: Vance will know the player's headcount and supply load at Beat 18).
- **Lie low** — answer thin, undersell the bag, hide companions if possible (the prose makes this a real option for the player who has Wren — she takes Mara around the side; for the player without Wren, lying carries a `1 supply` cost as the player has to stash before approaching). Sets `met_dock_crew`, NOT `dock_crew_logged`. The crew lets the player in but *one of them watches* — `dock_crew_suspicious` set. Worse Beat 18 framing if not cleared at the hub.
- **Refuse the gate** — turn back, look for a way around the fence. There is a way, along the seawall (Beat 16 alternate entry). Costs `1 supply` (the long way), `1 health` if `supplies ≤ 1` going in (exhaustion tells the player they cannot afford the detour; pushing it anyway costs). Routes to Beat 16 via the seawall. Sets `gate_refused`, never `dock_crew_logged`. Vance does not see the player until Beat 18 — opens a different Beat 18 framing where the player has the *first* read on her instead of the second.

Tells at the gate (Stage 3/5 must surface):
1. The body on the floating dock (visible past the gate, fifty feet on). One small shoe missing. Vance's people glance at it twice during the conversation; one of them looks away the second time.
2. The clipboard. The kind of object that does not survive two weeks of an apocalypse unless someone is *running* something.
3. The radio loop — same cadence as Apt 3's broadcast and the Hollis-camp loop, but with the *frequency* changed. They are listening for someone they don't want to find them.
4. The way the gate-guard says "boat" — not "boats."

Proximity cue: The arterial horde at the player's back. The far-jetty group across the water, slowly closing along the concrete by the parked jet ski. The fence rattles once during the conversation — a single shambler against the back stretch — and one of Vance's people walks off without finishing the sentence to deal with it. They do not cleanly. The player can hear it.

What the player decides/learns: That the marina is not safety; it is a sorting machine with a charming front. That Vance's people are competent and have been doing this for days. That the radio is a *tell* the same way it was at Hollis's camp — the careful player who survived Beat 12 has the grammar to read this. Sets `met_dock_crew`, possibly `dock_crew_logged`, possibly `dock_crew_suspicious`, possibly `gate_refused`. `bitten` players have one block of narration here that names the countdown — Vance's people *will* notice within two beats.

Connects to: Beat 16 (the marina hub).

### Beat 16 — The marina hub (the dock, the office, the seawall)
What happens: The marina is small — a chain-link fence enclosing a concrete apron, a low cinder-block office, three pontoons, two visible boats (a working motor cruiser and a half-stripped fishing boat that does not float). A floating dock connects the apron to the working boat. Vance's crew works the perimeter; Tomás and his small group (two adults, no children — see Cast addendum) are camped at the seawall end, waiting to negotiate their turn. This is the **marina hub** the structure mandates — *short by design, the noose is closing.* Three side options, each visited at most once; the hub closes when **two** are visited, or when the perimeter alarm fires (Beat 17).

- **Scout the boat (the working cruiser)** — the player can walk the floating dock and see the cruiser. Vance has it. The fuel gauge is visible through the windscreen (half a tank — enough for the river, not for the open water beyond, an *honest* tell that the boat is real and the trip is real). Capacity reading: four adults plus supplies, or three adults plus a child plus supplies, or two adults plus supplies plus distance — the prose is clear about the math. The body on the floating dock is up close here. The player can search it for `+1 supplies` (`bond -1` if Mara is present and watching) or step over it (`bond +0`, narration weight).
- **The office** — Vance's space. She is here if the player cooperated at the gate; her second is here if the player refused or lied. Conversation hub `talk_vance` opens here (see § conversation hubs). Three topics, each a tell. The office has a shotgun on a peg, a child's drawing on the wall (different from Apt 1's drawing — bleaker, signed with a name that is not Mara's), and a logbook open to the page with the player's clipboard entry (if `dock_crew_logged`).
- **The seawall** — Tomás's small group. Conversation hub `talk_tomas` opens here. He reads the player faster than they read him (this is telegraphed — he names the player's companion array correctly without being told, the way Hollis did, but unlike Hollis he uses the read to *help*). He is trying to get his people on a boat too. He has *information* the player needs and Vance does not want shared: the cruiser's keys are in Vance's pocket, the half-stripped fishing boat *can* be made to run with two hours' work, and there is a sea-kayak under the boathouse on the far side of the apron that a strong swimmer could use to ferry one person across at a time. The kayak is the seed for **Beat 17 *Found in the boathouse*** below.

If `has_keys` (Wren's truck): the truck is parked outside the gate; this is the first time it matters in Act 3. It bypasses *one* dock-approach obstacle (Stage 5 chooses which — the seawall route to the boathouse, or the back-fence breach in Beat 17). After driven, the choice vanishes per structure's consumable-truck rule.

Conversation hubs:
- `talk_vance` — three topics: "what's the price" (she names a price — supplies *and* a person, and she names the person if the player has multiple companions; the math is read off her clipboard if `dock_crew_logged`), "the body on the dock" (she answers without flinching; her steadiness is the *tell* — Hollis covered, she does not bother), "what happens after" (she names a cove downriver where her people are gathering; this is the tell that she is *not* offering passage — she is offering to sell the player to a place they may not survive).
- `talk_tomas` — three topics: "your people" (his group, his read of the player, the price he is willing to pay), "the boats" (the kayak, the fishing-boat repair, the cruiser keys), "what you'd do" (the moral mirror — he asks the player a question about the player and listens to the answer). Each topic depletes via `flags_unset`. Asking all three sets `read_tomas`. Refusing him outright sets `refused_tomas` and locks the boathouse coop in Beat 17.

Proximity cue: The fence rattles continuously along the back stretch — a steady drum the player learns to tune out and then *should not* tune out, because the volume rises by the end of the hub. The far-jetty group has reached the parked jet ski and is working through it; the player can see the slow geometry of them. One of Vance's people uses a long pole to push a shambler off the floating dock during the scout-the-boat option — the body goes into the water and *does not stop moving*. Mara, if present, asks why; lying to her about this is a `talk_mara` topic (the dark) for Beat 17.

What the player decides/learns: The shape of the climax. That Vance's price is not a price the player can pay without losing someone. That Tomás offers a second route — slower, harder, with its own price (working with him means trusting another stranger after Wren, the brief's contract on humans-as-threat). That `has_keys` is a real asset here, and refusing Wren in Act 2 closes a door that is now visible. Sets `met_vance`, `met_tomas`, `read_tomas` (probed all three), `refused_tomas`, `boat_seen`, `boathouse_seen` (if Tomás named it), `boat_searched`, `vance_priced` (after `talk_vance` topic 1).

Connects to: Beat 17 (perimeter alarm) when the hub closes.

### Beat 17 — The perimeter breaks (mid-act crisis, optional rescue)
What happens: Mid-afternoon of day four. The fence rattles harder; one of Vance's people shouts. **A section of the back fence is pulled down** — not by a single shambler but by weight of bodies. Vance's perimeter holds at the office and the floating dock; the back third of the apron is suddenly inside-the-wire. The dead are slow; the player has minutes, not seconds, but the marina has shrunk visibly and audibly.

This is the act's second turning point — *the marina's slow overrun becomes visible.* Three player approaches:

- **Hold the line** — fight at the breach with whoever is there. Costs `1 health` (or `2 health` if `health ≤ 2` going in — the player who is already low takes a worse cut). Earns `bond +1` if a companion is fighting alongside (any of {Caleb, Ruth, Wren} — Caleb's bark at the breach is the tell that he has grown across the run). With `has_pistol`: `+0 health` cost, `-1 supplies` (ammo). Sets `held_breach`. Vance notes — `bond +0` with her crew but a procedural shift: if `held_breach` AND not `dock_crew_logged`, Vance offers the player the *option* of joining her crew (a hidden choice — accept routes to **D-Marina-collaborator**, a slow death by becoming the next Vance; the player who said no at Hollis's camp will recognise the geometry). Refuse to set `refused_vance_offer` and earn `bond +1`.
- **Run for the boathouse / kayak** — split off from the main fight, head for the seawall side. If `read_tomas` (probed Tomás) the boathouse is *open* — Tomás's people have it propped. Inside: the sea-kayak Tomás named, plus a person the player did not expect:
  - On Exit α / β runs: a second child, hiding in the kayak's foot well, terrified, alone. Sets `found_second_child` (engine-only). Routes a narrow door — Stage 5 may use this child as a substitute Mara figure for the cold-solo brackets, gating a late `child_alive` flag mirror to open E3 from Exit β. (Author's narrow door per § Entry framing — this is the recovery hook for Exit β.)
  - On Exit γ runs: Mara recognises the kayak and the boathouse from her own escape route; a `talk_mara` topic about her mother fires here — the player can answer truthfully (`bond +1`) or lie (`lied_to_mara`, `bond -1`). The boathouse is *the last quiet beat in the run*, and per the brief that means it ends with a fresh proximity cue: a shambler is on the boathouse roof, audible through the rafters, working out the joist seams.
  - On Exit δ / ε runs: Tomás is here. He has the kayak ready. He confirms his offer and asks for a small piece of the player's supplies as buy-in (`-1 supplies`, `bond +1` mutual). Sets `boathouse_coop` true.
  
  Without `read_tomas`: the boathouse is locked from inside. The player can break it (loud — the entire marina hears, perimeter alarm spikes one stage) or pass. Breaking sets `boathouse_loud` and worsens Beat 18 framing. Passing means the kayak is unreachable — locks the swim/kayak ferry option at the climax.

- **Back away to the office** — let Vance's people hold the breach. Costs nothing in health; earns `dock_crew_suspicious` (or worsens it if already set — the player who hides during the fight is read by Vance as a freeloader). Vance prices the player's passage *up* in Beat 18 — she names a second companion or the player's pistol as part of the price if `has_pistol`.

Proximity cue: Throughout the beat, the breach moans — a layered chord, more throats than the player wanted to count. The cul-de-sac chord behind has merged with the breach chord. The river is the only sound that is not them, and even the river has the *plop-and-drag* of the floating-dock body in it. Mara, if present, does not cry; she has stopped. Caleb, if present, picks the thumb until it bleeds again.

What the player decides/learns: That the marina cannot be held — Vance's "we hold this" is already past tense and she knows it. That the boathouse / kayak is a real second route with its own price. That Vance's "join us" door exists for the player who has been competent — and that the geometry of accepting it is the same geometry the player saw at Hollis's camp, with one extra week of attrition behind it. Sets `held_breach`, `refused_vance_offer`, `boathouse_coop`, `boathouse_loud`, `found_second_child`, possibly clears or worsens `dock_crew_suspicious`. `bitten` players: by end of this beat the bite is visible to everyone present; Vance acts on it in Beat 18 (she will not let the player on the boat — separate D-Bitten-marina ending if the player attempts to board anyway).

Connects to: Beat 18 (the climax tradeoff).

### Beat 18 — The tradeoff (climax)
What happens: Late afternoon of day four. The perimeter has shrunk to the office, the floating dock, and the working cruiser. The far-jetty group has reached the seawall and is on the apron now — slow but inside. Vance is at the cruiser, keys in hand, her crew loading the last of *their* supplies. Tomás's group is at the boathouse, the kayak in the water, ready for the ferry. The player is standing in the middle of the act's geometry with whoever is left of their party.

**This is the climax.** Vance names her price out loud; Tomás names his out loud. Both options are real. The player chooses how to leave.

The full set of climax choices the act has been seeding (Stage 5 surfaces only those whose prerequisites are met — hidden gating per structure's contract):

- **Take the cruiser (Vance's price)** — the player pays Vance. The price is `supplies` *and* a person. The math is read off Vance's clipboard:
  - **Solo on cruiser:** `-3 supplies` and the player goes alone. Routes to E2 (Empty Boat) if the player did not break themselves getting here, E1 (Cold Walk) if they did.
  - **Mara on cruiser:** `-3 supplies`. The player and Mara go. Adult companion (if present) is *the price* — Vance keeps them on the dock (alive, for now; their fate is Vance's, and Vance is leaving by another route). Companion-alive flag goes false. Routes to E3 if Mara is on board.
  - **Adult companion on cruiser:** `-3 supplies`. The player and one of {Caleb, Ruth, Wren}. Mara (if present) is the price — Vance does not want Mara, but the cruiser does not have room for four; the *choice* is the player's, not Vance's. Setting `child_alive` false here is the "what are you willing to do" axis the brief contracted. Routes to E4 with a darker flavour.
  - **Mara plus one adult on cruiser (the threading):** Requires `bond ≥ 4`, `supplies ≥ 4`, and either `has_keys` (the player negotiated from a position) or `refused_vance_offer` (Vance respects the read). The player pays `-4 supplies` and gives up the player's *own* seat — which is the geometry of E6, but it can also resolve as E5 if the player makes the *boarding* choice instead of the dock choice (see below). Stage 5: this is the rarest math; surface it carefully.

- **Take the kayak (Tomás's route)** — slower, smaller, river-only. The kayak ferries one person at a time across to the far bank, then comes back. **This is the swim/ferry option.** Requires `boathouse_coop` (or `boathouse_loud` AND `health ≥ 4` — the player who broke in pays the price physically). The crossing math:
  - **Solo:** one trip, `-1 health`, `-1 supplies`. Routes to E2 / E1 per `bond`.
  - **With Mara:** two trips. The player rows Mara across first, comes back for themselves. The *coming back* is a `health` gate: `health ≥ 3` to make the return swim (the player rows out, swims back, is in the water with the dead at the marina's edge). Below `health 3` the option is greyed visibly (per structure's greyed-vs-hidden rule). At or above, the player makes it. Routes to E3.
  - **With Mara plus one adult:** three trips. The kayak math gets ugly — the player rows Mara, then comes back for the adult, then rows themselves. By the third return the marina is overrun behind the player. Requires `health ≥ 4`, `supplies ≥ 3`. Routes to E5 if all three live; the kayak math means one trip can fail visibly — the *third* trip's water has the dead in it (those that fell off the dock). At `health 4` the player makes it; at `health 3` the player can choose to leave the third person (themselves) — that is E6's geometry via the kayak.
  - **Swim alone (no kayak, abandoned all of it):** `health ≥ 3` gate. Hidden math: `supplies ≥ 1` (you cannot swim without a flotation), `bitten` is fatal mid-swim regardless of `health`. Below the gates: visible-but-greyed at `health < 3`, hidden at `bitten` (the player's body knows it cannot make it; the prose names this). Death scene **D-Swim** if attempted under-resourced.

- **Hold the dock (sacrifice)** — the player stays on the floating dock with whatever weapons they have, and lets the cruiser leave with whoever can fit. Requires `bond ≥ 4`, `supplies ≥ 4` (the player can supply the boat), and at least one other person to leave on it. Hidden until prerequisites met (per structure's contract on E6). Routes to E6 (Hold the Dock). The final-beat dialogue with Mara (if she's on the boat) uses `bond ≥ 5` for the *naming* line — "she calls you by name" — per structure.

- **Stay behind (refuse to leave)** — the player walks back through the gate, into the city, away from the river. Hidden choice — only available at the climax if the player has refused Tomás *and* refused Vance's collaborator offer *and* `bond ≤ -1`. Routes to E7 (Stay Behind). Cold and final.

- **Split up (the structure's "marina approach: stealth / push through / split up" — relocated here, the climax form).** A player who picks neither the cruiser nor the kayak, and does not hold the dock or stay behind, but instead tries to *split* — sending companions on the kayak while the player charges for the cruiser, or vice versa — triggers the **D-Split** death track. This is the structure's "guaranteed loss of a companion (player chooses who); the loss is grim but legible." Author's call: in Act 3 the split-up is fatal to the *player* in most cases (the player chose to be in two places at once and was outpaced by the dead in the middle of the apron). Stage 5: D-Split must name the misjudgement — *you tried to do both*.

Climax tells (for surfacing the right options):
1. Vance's price is *always* a person if the player has one. The clipboard is the tell that this was decided before the player arrived.
2. Tomás's route is real but *not free* — the kayak math is shown to the player, not hidden behind a stat check.
3. The dock-hold option appears only when the prerequisites are met; the player who finds it has *earned* it (brief's contract on the warm endings).

Proximity cue: The climax beat takes place over six to eight prose blocks. By block four the back of the apron is entirely overrun. By block six, the office. By block seven, the floating dock has them on it — the dead reach the dock-side bollard while Vance is still arguing math. By block eight the cruiser is leaving, or the kayak is in the water, or the player is alone on the dock with a length of pipe and the chord at their back. Whatever the choice, the marina is *gone* by the time the player's frame moves.

What the player decides/learns: Everything. The act has been geometry the whole time, and the climax is the math. Sets the ending flags below — Stage 5 reads the combination and routes to E1–E7 or D-marina-overrun / D-swim / D-split / D-Bitten-marina / D-Marina-collaborator.

Connects to: Endings (see § Endings).

### Beat 19 — The endings (closing narration, per ending bracket)
What happens: One short beat per ending, gated tightly on flags+stats. Each ending has a distinct closing image; each is a single scene in Stage 5, not a hub. Endings draw on accumulated state — the closing narration of each names *which* companions died and *how*, in single sober lines, per the structure's contract that endings vary on accumulated state.

The seven living endings and three primary death endings are detailed in § Endings below.

---

## Hubs

### Marina hub (Beat 16)
Purpose: Surface the climax geometry — the cruiser, the office (Vance), the seawall (Tomás) — in a constrained map; teach `talk_vance` and `talk_tomas` tells; let Mara react to the body on the floating dock. Closes after **two** side options visited or when the perimeter alarm fires (Beat 17). Short by design — the noose is closing.

### Conversation hubs
- `talk_vance` — Beat 16 office. Three topics. Each depletes via `flags_unset`. Asking all three sets `read_vance` (engine-only). The topics are the surfacing of her price and her honesty about having no host-mask.
- `talk_tomas` — Beat 16 seawall. Three topics. Asking all three sets `read_tomas`. Topic 3 ("what you'd do") is a moral mirror — high-`bond` players hear themselves named; low-`bond` players hear the same line as a quiet accusation.
- `talk_mara` — final topic ("the dark") fires in Beat 17 (boathouse) or Beat 18 (climax) per structure's mandate that one topic is held for Act 3. Lying about the dark is `lied_to_mara` again and stacks with Act 2 (`bond -1`).
- `talk_caleb` / `talk_ruth` / `talk_wren` — re-open briefly between Beat 16 and Beat 17 if the relevant companion is alive. Single bond-positive topic each: Caleb names a thing he wants to do after, Ruth names her son one more time, Wren says what was actually in the bag (the keys, named for the first time even if the player already had them — `bond +1` regardless).

---

## Flags/Stats Changed

- `met_dock_crew` / `dock_crew_logged` / `dock_crew_suspicious` / `gate_refused` — Beat 15. Engine-only (N).
- `met_vance` / `read_vance` / `vance_priced` — Beat 16. Engine-only (N).
- `met_tomas` / `read_tomas` / `refused_tomas` — Beat 16. Engine-only (N).
- `boat_seen` / `boat_searched` — Beat 16. Engine-only (N).
- `boathouse_seen` / `boathouse_coop` / `boathouse_loud` — Beat 16/17. Engine-only (N).
- `held_breach` / `refused_vance_offer` / `found_second_child` — Beat 17. Engine-only (N).
- `held_the_dock_offered` — Beat 18. Engine-only (N), per structure. Set if the dock-hold option was *shown* to the player (regardless of acceptance) — used by Stage 5 to alter closing narration of other endings ("you saw the door and walked past it").
- `child_alive` — Engine-only (N) mirror of `child_rescued`. Can drift in Beat 18 (Vance keeps Mara as the price; player abandons Mara on the kayak math; Mara dies on the third trip).
- `companion_sacrificed` — already set in Act 2 if applicable; Beat 18 cruiser-price-is-a-person *also* sets this on the named companion.
- `bitten` — fatal at boarding the cruiser (Vance refuses, then shoots if the player insists — D-Bitten-marina) or fatal mid-swim (D-Swim). Player-visible (Y) throughout.
- `has_keys` — consumed at Beat 16/17 (the truck bypasses one obstacle, then the choice vanishes per structure's consumable rule).
- `has_pistol` — consumed at Beat 17 if used to hold the breach (`-1 supplies` for ammo OR `has_pistol` cleared if the player runs out — Stage 5 surfaces which).
- `health` — moves -3 to +0 across the act. No `health` gains in Act 3 (per structure, the marina has no clinic; Ruth's is in Act 2). Costs at Beat 15 detour, Beat 17 breach, Beat 18 swim/kayak/dock.
- `bond` — moves -2 to +3 across the act. Bond gains: holding the breach with a companion (+1), refusing Vance's collaborator offer (+1), Mara's truthful "dark" topic (+1), Caleb / Ruth / Wren final topics (+1 each). Bond costs: lying to Mara (-1), searching the body in front of Mara (-1), sacrificing a named companion at Beat 18 (-1 to -2 depending on relationship).
- `supplies` — moves -4 to +1. Beat 16 body-search +1; Beat 18 cruiser-price -3 to -4; Beat 18 kayak-trips -1 each; Beat 18 hold-the-dock -4 (you supply the boat).
- `act3_complete` — Beat 19. Engine-only (N). Set per ending reached; used by Stage 5 for the journal entry.

---

## Endings

Each ending below has a single **gating recipe** in flags+stats. Stage 5 implements the routing as a priority list — the highest-prerequisite ending the player qualifies for fires; otherwise fall through to the next. The author at Stage 5 must implement the priority order **E6 → E5 → E3 → E4 → E7 → E2 → E1** for the living endings (sacrifice and warm endings take precedence over solo endings when prerequisites overlap). Death endings short-circuit before the living-endings table is read.

### Living endings

- **E1 — The Cold Walk** (solo, cold).
  - Recipe: `child_alive` false AND `neighbour_alive` false AND `teen_alive` false AND `elder_alive` false AND `stranger_alive` false AND `bond ≤ -2` AND Beat 18 chose **cruiser solo** OR **kayak solo** OR **swim solo**.
  - Texture: closing narration in the player's own first-person voice — the narrator has stepped back. Per structure: "the narration is the player's own voice now, not the narrator's — that's the texture." Stage 5: the journal entry uses "I" for the only time in the run.

- **E2 — Empty Boat** (solo, broken).
  - Recipe: `child_alive` false AND no companion-alive flags true AND `bond ≥ 0` AND `abandoned_wounded` false AND `killed_survivor` false AND Beat 18 chose **cruiser solo** OR **kayak solo**.
  - Texture: the saddest of the survives. The narrator names each dead companion in a single sober line. The river is the only sound.

- **E3 — Mara, and Quiet** (escape with Mara).
  - Recipe: `child_alive` true AND `child_rescued` true AND no adult companion-alive flag true AND `bond ≥ 4` AND Beat 18 chose **cruiser-with-Mara** OR **kayak-with-Mara**.
  - Texture: Mara asks one question on the river. The player answers truthfully. The closing image is her hand on the rail, her shoes still on the wrong feet.

- **E4 — Two of Us** (escape with one adult, no Mara).
  - Recipe: exactly one of {`teen_alive`, `elder_alive`, `stranger_alive`} true AND `child_alive` false AND Beat 18 chose **cruiser-with-companion** OR **kayak-with-companion**.
  - Three flavour variants (Dale flavour is unreachable per Act 2's contract):
    - E4-Caleb — `teen_alive` true. He says one full sentence on the river, the first one without "I mean" or "I don't" — the run's payoff for him.
    - E4-Ruth — `elder_alive` true. She names her son for the last time and stops.
    - E4-Wren — `stranger_alive` true AND `betrayed_by_wren` false AND `probed_wren` true. She opens the bag in front of the player, finally — there is one more thing in it.
  - Texture per flavour, single closing image each. Darker if `killed_survivor` true (per structure).

- **E5 — Three of Us** (escape with Mara plus one adult).
  - Recipe: `child_alive` true AND exactly one of {`teen_alive`, `elder_alive`, `stranger_alive`} true AND `bond ≥ 5` AND `shared_supplies` true (at least one) AND `killed_survivor` false AND `abandoned_wounded` false AND Beat 18 chose **cruiser-Mara-plus-adult** OR **kayak-three-trips-success**.
  - Three flavour variants matching E4. Stage 5 overrides E4 flavour with E5 if Mara is on board.
  - Texture: the structure's "near-perfect path" ending. Mara sleeps against the adult companion; the player keeps watch. The river is the only sound. Per structure's `bond ≥ 5` gate, the *naming line* fires here on E5 ("she calls you by name"), or held for E6.
  - If `supplies ≥ 5` at Beat 18, the *food line* fires — "three of us, with food" — per structure.

- **E6 — Hold the Dock** (sacrifice).
  - Recipe: `child_alive` true (Mara on the boat) AND at least one adult companion-alive flag true (also on the boat) AND `bond ≥ 4` AND `supplies ≥ 4` AND Beat 18 chose **hold-the-dock** AND `held_the_dock_offered` true.
  - Texture: the boat leaves. The player stays. The closing narration is the player on the floating dock; the dead reach the bollard; Mara is on the cruiser, and if `bond ≥ 5` she calls the player by name from the deck (the structure's load-bearing line). The narrator does not editorialise. Per structure: "hold-the-dock requires `health ≥ 2` to make the choice meaningful (not collapsing on the dock)" — Stage 5 to greyly hide the option below `health 2`.

- **E7 — Stay Behind** (refuse to leave).
  - Recipe: Beat 18 chose **stay-behind** AND `bond ≤ -1` AND `refused_tomas` true AND `refused_vance_offer` true.
  - Texture: the player walks back through the gate, into the city. The narrator stops mid-sentence. Cold and final per structure. The journal entry is one line.

### Death endings (Act 3 primary)

- **D-Marina-overrun** — the player chose **back away to the office** in Beat 17 *and* did not commit to a Beat 18 choice in time (loitering at the hub past block six of Beat 18). The marina is overrun while the player is choosing. Names the misjudgement: *you waited*. (Echoes Act 1 wait-it-out by design.)
- **D-Swim** — the player attempted a swim or kayak crossing under-resourced (`health < 3`, or `supplies < 1`, or `bitten` set, or three-trip kayak with `health < 4`). Names the misjudgement: *you knew the water and you went anyway*.
- **D-Split** — the player tried to send companions one way and themselves the other at Beat 18. Names the misjudgement: *you tried to do both*. Per structure's "split-up causes a guaranteed loss" rule, here weaponised into the player's own death.

### Death endings (Act 3 secondary, gated on entry state)

- **D-Bitten-marina** — `bitten` true at Beat 18 AND attempted to board the cruiser. Vance shoots the player on the gangplank; the boat leaves without them. Names the misjudgement: *you tried to lie to a woman who keeps a clipboard*.
- **D-Marina-collaborator** — `bond ≤ -2` AND accepted Vance's join-the-crew offer in Beat 17. Slow death over the next forty-eight hours of becoming the next gate-guard; the closing image is the player at a gate, with a clipboard, asking three questions of someone who looks the way the player did at Beat 15. Names the misjudgement: *you said yes a second time*. (The first time was Hollis's camp — Stage 5 surfaces this if `killed_survivor` was set in Act 2; otherwise frames as a first capitulation.)

---

## Notes for Stage 3 / Stage 5 author

- **Five entry framings.** Stage 3/5 must distinguish α–ε in the prose of Beat 15. ε is the rarest, brightest entry; α is the cold default. The cast addendum below covers the new principals.
- **Marina hub closes hard.** Two side-trips OR Beat 17's perimeter alarm — whichever comes first. Do not let the player linger; the noose is closing.
- **Boathouse is the act's only relative-quiet beat** (Beat 17 boathouse-coop branch) — and per the brief, it ends with a fresh proximity cue (the shambler on the roof). Do not violate this even on the warmest Exit ε run.
- **Vance's "join us" offer is hidden** — surface only if `held_breach` AND not `dock_crew_logged`. Per structure's hidden-choice rule, existence is a spoiler.
- **The dock-hold option is hidden** — surface only when prerequisites met (`bond ≥ 4`, `supplies ≥ 4`, `child_alive` AND at least one adult companion-alive, `health ≥ 2`). Per structure.
- **The swim/kayak greyed gates are visible** at low health — per structure's greyed-vs-hidden rule the player should *feel the shortfall* at `health < 3`.
- **Bitten players have a different Beat 18.** Vance reads them. Most options collapse. Author the bitten path as a single grim subscene that closes to D-Bitten-marina or — if `bond ≥ 4` and a companion is willing — a hidden E6 variant where the player holds the dock *because they were going to die anyway*. Author's call; structure does not mandate the variant but the geometry permits it.
- **Tomás does not survive the run as a companion-alive flag.** He is not part of the player's party — he leads his own group out on the kayak (or dies in Beat 17 if `boathouse_loud`). His Act 3 role is offer-and-mirror, not recruit. Do not add him to the companion-alive flag set.
- **Vance does not survive the act.** She leaves on the cruiser if the player did not take it; she dies at the dock if the player took it; Stage 5 chooses the closing image but the run-state effect is: she is not in any ending's frame.
- **Closing-narration layering.** Each ending's closing prose names which companions died and how, in single sober lines, drawing on accumulated flags. Stage 5: implement the named-companion dead-list as a small templated section before the ending image.
- **Proximity-pressure does not let up** — even E5's closing image is on the river with the dead audible at the receding shore. There is no quiet.
