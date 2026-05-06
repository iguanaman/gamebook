# Dead Letters — Act 1: The Case

## Journal Entry
A woman walked into my office with a missing husband and a face that already knew something was wrong.

## Entry
Arrives from: story start
Player state: evidence 0, heat 0, rep 3; no flags set

---

## Beats

### Beat 1 — The Office, Before
Frank's office, late afternoon. A sense of the man before the case — the stack of unpaid bills, the half-drunk coffee, the ex-cop who traded a badge for a shingle. Vera Doss arrives. She's composed in the way people are when they've decided not to cry. Her husband Ray has been gone four days. He's a city surveyor. He didn't come home from work. She called the police; they wrote a report and lost interest.

What the player decides: how Frank responds to Vera — sympathetic and open, or clipped and professional. Shapes early rep and the texture of their dynamic, though both routes take the case. Sets `met_vera`.

Connects to: Beat 2 (linear)

### Beat 2 — Legwork: Ray's World
Frank works Ray's last known locations — his office at the city surveying department, his usual lunch counter, a coworker named Peltz who seems nervous. The picture is ordinary except for two things: Ray took some files home the week before he vanished, and Peltz stops talking mid-sentence when someone from the supervisor's office walks through. Ray isn't missing because he's a drunk or a debtor. Something at work spooked him.

What the player decides: how Frank approaches the surveying department. Charm Peltz into talking (rep +1), press hard and get seen (heat +1), or read the situation and back off without pressing (no gain, lower heat risk). Sets foundation for evidence accumulation — a cautious Frank starts slower.

Connects to: Beat 3 (linear)

### Beat 3 — The First Thread
Following Ray's movements leads Frank to a city records office and a stop in Aldwick — a working-class neighbourhood where Ray had been spending time he didn't explain to Vera. Sets `aldwick_visited`. Residents are wary of a stranger asking questions; Frank can earn a small amount of goodwill or leave a bad impression. He picks up a name scratched on a building permit: a land parcel number that doesn't match anything the address should be. Not enough to understand yet. Enough to know the missing-persons case has a different shape.

What the player decides: how Frank handles Aldwick residents — carefully, or with the bluntness of an ex-cop used to doors opening on authority. The first rep-building fork: read the neighbourhood right, earn trust (+1 rep); read it wrong, earn wariness (−1 rep, or flat). Evidence +1 regardless (the parcel number).

Connects to: Beat 4 (linear)

### Hub — Frank's Office (Act 1 version)
Between beats, Frank returns to his office. The phone might ring — Vera checking in; a message from Peltz; nothing at all, which is its own answer. The hub gives the player a chance to re-examine what they know and choose where to go next. In Act 1 the hub is light — it's not a full information centre yet, just the place Frank comes back to.

Returns to from: Beat 3, Beat 4
Exits to: active investigation beats; closes permanently when `vera_dead` is set

### Beat 4 — Vera's Warning, and Vera's Death
Vera contacts Frank. Someone followed her. She sounds frightened in the controlled way that means she's been frightened before and didn't want to show it. Frank can go to her immediately or finish what he's working on and meet her the next morning. If he goes immediately: he finds her just alive, gets one more piece from her (she found a file Ray hid in the house — addresses in Aldwick), dies before she can say more. If he waits: she's already dead when he arrives, and the file is gone. Both paths confirm her murder; only the timing changes what evidence Frank recovers. Either way: `vera_dead` is set.

What the player decides: urgency vs. patience — a character test more than a mechanical one, though it touches evidence. The player lives with the choice regardless of how the scene reads.

Connects to: Beat 5 (linear)

### Beat 5 — The Weight of It
Frank alone with a dead client and enough fragments to know he's not looking for a missing husband anymore. Ray found something, someone found Ray, and now someone has found Vera. The police will write another report and lose interest. The men who did this have the police.

The choice at the end of this beat is the act's first real fork: push forward (commit to the investigation) or walk away. Walking away is a real option — Frank didn't sign up for this, he doesn't have a client anymore, and the city is telling him very clearly to stop. Walking away ends the game here (Bury It, early variant). Pushing forward unlocks Act 2.

What the player decides: stay in or get out. The game's moral centre.

Connects to: Exit A (walk away) | Exit B–F (push forward, with variation based on accumulated flags and stats)

---

## Exits

- **Exit A — Walk Away:** Leaves from Beat 5; Frank quits the case. evidence 0–1 (typical), heat 0–1, rep 3±1. Flags: `met_vera`, `vera_dead` set; `aldwick_visited` may or may not be set. → Bury It ending (early, low-guilt variant). Frank doesn't know what he's leaving behind. The city keeps smiling.

- **Exit B — Forward, Cold:** Leaves from Beat 5 pushing forward. evidence 1, heat 0–1, rep 2–3. Flags: `met_vera`, `vera_dead`, `aldwick_visited`. Frank backed off at every friction point — Peltz, Aldwick, the records office. He has the case but thin ground. → Act 2 normal entry; informant paths will be harder.

- **Exit C — Forward, Warm:** Leaves from Beat 5 pushing forward. evidence 2, heat 0–1, rep 4. Flags: `met_vera`, `vera_dead`, `aldwick_visited`. Frank read people well, earned small trust in Aldwick, kept heat low. → Act 2 normal entry; Marta Gaines path opens at lower rep threshold.

- **Exit D — Forward, Hot:** Leaves from Beat 5 pushing forward. evidence 2, heat 2–3, rep 3. Flags: `met_vera`, `vera_dead`, `aldwick_visited`. Frank pushed hard — pressed Peltz publicly, wasn't careful in Aldwick. More evidence, more exposure. → Act 2 normal entry; heat already building, escalated threat scenes come earlier.

- **Exit E — Forward, Vera's File:** Leaves from Beat 5 pushing forward. evidence 3, heat 1, rep 3. Flags: `met_vera`, `vera_dead`, `aldwick_visited`. Only reachable if Frank went to Vera immediately in Beat 4 — he got the file before the killer returned for it. Evidence advantage entering Act 2. → Act 2 normal entry; ledger hunt in Act 2 is shorter (one thread already pointed).

- **Exit F — Forward, Hot and Informed:** Leaves from Beat 5 pushing forward. evidence 3, heat 3, rep 3±1. Flags: `met_vera`, `vera_dead`, `aldwick_visited`. Frank got Vera's file (went immediately) AND pressed hard elsewhere. Most evidence entering Act 2, most heat. → Act 2 normal entry; highest risk, highest information state. Approaching heat threshold faster.

---

## Flags/Stats Changed

- `met_vera` — set at Beat 1 when Vera's introduction scene completes. Not player-visible. Required for some early conditional dialogue.
- `vera_dead` — set at Beat 4 when Vera's death is confirmed, regardless of timing choice. Not player-visible. Closes Frank's office hub variant with Vera; unlocks Act 2 forward path.
- `aldwick_visited` — set at Beat 3 when Frank first goes to the neighbourhood. Not player-visible. Opens Aldwick hub in Act 2.
- `evidence` — accumulates: +1 from Beat 3 (parcel number); +1 additional from Beat 4 if Frank arrives in time for Vera's file; +0–1 from Beat 2 depending on approach. Range entering Act 2: 1–3.
- `heat` — accumulates: +1 from Beat 2 if Frank presses hard/gets seen; +1–2 from Beat 3 if careless in Aldwick or at records office. Range entering Act 2: 0–3.
- `rep` — starts at 3; shifts ±1 based on how Frank reads people in Beats 1–3. Range entering Act 2: 2–4.
