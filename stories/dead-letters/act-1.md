# Dead Letters — Act 1: The Case

## Journal Entry
A widow walked into your office with a missing-husband case. By the end of the week she was dead and you were the only one still asking why.

## Entry
Arrives from: story start.
Player state: `evidence` 0, `heat` 0, `rep` 3. No flags set. Frank is alone in his office above a laundry on Mercer Street, two months behind on the gas bill, three weeks since his last paying job.

## Beats

### Beat 1 — The Client
What happens: Vera Doss climbs the stairs to Frank's office on a wet Tuesday and asks him to find her husband Ray, a city surveyor who didn't come home Friday. She brings a photo, a retainer in small bills, and a story that doesn't quite add up — Ray was "working late on something" but she won't say what. Frank reads her: scared, not grieving, holding back.
What the player decides/learns: Whether to take the case at all (refusing exits the story early — soft fail), and how to read Vera — push her for what she's hiding (rep risk, info gain), accept her version (she stays trusting, less info), or take the money and stay neutral. The player learns Ray's name, employer (City Engineer's Office), and that Vera is afraid of more than just an absent husband.
Connects to: Beat 2 (if case accepted) | early Bury It (if refused).

### Beat 2 — The Office Hub (early)
What happens: Frank's office becomes the spoke. From here he can pursue Ray's last known locations and people — three threads open in parallel. Vera leaves a way to reach her (boarding house phone). Mort Halloran, an old beat-reporter friend, drops by uninvited offering to trade gossip for whisky.
What the player decides/learns: Which lead to chase first, and how much to share with Mort. Mort is a rep build (or burn) — confide and gain a press contact (`mort_owes_one`), brush him off and lose the lead.
Connects to: Beats 3, 4, 5 in any order, returning here between each.

### Beat 3 — The City Engineer's Office
What happens: Frank visits Ray's workplace. Cyril Voss, Ray's supervisor, stonewalls in a polite municipal accent — Ray was "on personal leave," files are "in transit," nobody wants to remember Ray's last week clearly. A junior clerk catches Frank in the corridor afterward and slips him the name of a neighbourhood: Aldwick.
What the player decides/learns: How to read Voss — friendly bluff (rep gain if soft, nothing if it lands wrong), pressure him (heat +1, possibly a tell), or trust the clerk's whisper at face value. Frank confirms Ray was scared at work in his last week, and gets the Aldwick name as a thread for Act 2. Hard pushing here can plant `cops_warned_off` — Voss makes a phone call after Frank leaves.
Connects to: Beat 2 (returns to office hub).

### Beat 4 — The Iron Lung
What happens: Ray's neighbourhood bar. Lou the bartender remembers Ray drinking alone the Thursday before he vanished, talking to a man Lou didn't know. A regular at the end of the bar listens too closely.
What the player decides/learns: Frank can lean on Lou (rep with the working-class side of town if done right; +1 evidence in the form of the stranger's description), tail the eavesdropper out of the bar (heat +1, may catch a face, may get made), or drink and listen (atmosphere, small flavour evidence, no risk). One outcome here lets Frank glimpse the same eavesdropper later in the week — quiet escalation.
Connects to: Beat 2.

### Beat 5 — Vera Again
What happens: Frank can call on Vera at her boarding house once between investigations. She is more frightened on the second meeting than the first; she gives Frank a key Ray left her with no address attached, and asks Frank — twice — whether he thinks Ray is still alive. Frank can answer honestly, kindly, or change the subject.
What the player decides/learns: The key is concrete evidence (+1) and a future-Act-2 hook (Ray hid something behind it). How Frank speaks to Vera sets `vera_trusted_frank` — relevant only as a shading flag for Beat 6's funeral aftermath. Frank also clocks a parked car across the street he didn't see on the first visit.
Connects to: Beat 2.

### Beat 6 — The Body in the Bathwater
What happens: Frank arrives at Vera's boarding house — for a third meeting, or summoned by a panicked landlady, depending on the player's path — and finds the place full of cops. Vera is dead in the upstairs bath, ruled an accident before the coroner has even arrived. Detective Sergeant Pat Brennan runs Frank off the stoop and tells him the case is closed. Mort, if befriended, finds Frank at his office that night with a flask and a whisper: nobody is writing this one up.
What the player decides/learns: Frank decides what to take from the scene before Brennan throws him out — the photo Vera showed him in Beat 1 is gone from her dresser; pocketing something visible costs heat, leaving clean costs evidence. The player learns Vera is dead, the cops are pre-decided, and Frank is now alone with whatever he has gathered.
Connects to: Beat 7.

### Beat 7 — Crossroads
What happens: Three nights after the funeral, in the office Frank can't afford. The retainer envelope is on the desk. So is the key, the photo (or its absence), and the Aldwick name. Frank narrates the choice the player has to make: keep pulling, or put the envelope in a drawer and let the city forget Vera Doss the way it wants to.
What the player decides/learns: This is the Act 1 → Act 2 fork. Walking away is a real choice with a real ending (early Bury It). Pushing forward commits Frank to Act 2 with whatever combination of state the player has accumulated.
Connects to: Act 2 entry (one of Exits A–E) | Ending: Bury It, early variant (Exit F).

### Hub — Frank's Office (Beats 2–6)
Purpose: Spoke between investigation beats. Loop point Frank returns to between leads. Visible state: messages waiting, retainer envelope, the parked car across the street (only after Beat 5).
Returned to from: Beats 3, 4, 5.
Exits to: Beats 3, 4, 5 (player choice, in any order, each consumable once); Beat 6 triggers automatically when two of the three investigation beats are complete OR the player attempts a fourth office return.

### Conversation — Mort Halloran (within Beat 2)
Purpose: Optional ally-building. Three topics — Ray Doss (gives a press-side rumour about contracts), Aldwick (only available after Beat 3 surfaces the name; Mort's eyes light up), Frank's drinking (a rep-test cameo about Frank's reputation). Setting the `mort_owes_one` flag here pays out in Act 2 as a free press contact.
Where it sits in the beat flow: Optional, available from Beat 2 onward. Closes when the player enters Beat 7.

## Exits

- **Exit A — Lean and clean:** Leaves from Beat 7. Player carries `met_vera`, `vera_dead`, `aldwick_visited` (the name only — Frank hasn't been there yet), `ray_key_kept`. Stats roughly: evidence 1–2, heat 0–1, rep 3–4. No `cops_warned_off`. No `mort_owes_one`. Frank is invisible to the conspiracy and almost as broke as he was. → Act 2 entry: cold start.

- **Exit B — On the radar:** Leaves from Beat 7. Carries `met_vera`, `vera_dead`, `aldwick_visited`, `ray_key_kept`, `cops_warned_off`. Stats: evidence 2–3, heat 2–3, rep 3. Frank pushed Voss too hard or got made at the Iron Lung; the city knows his name now. → Act 2 entry: heat-aware, ambient threat scenes earlier.

- **Exit C — With a friend in print:** Leaves from Beat 7. Carries `met_vera`, `vera_dead`, `aldwick_visited`, `ray_key_kept`, `mort_owes_one`. Stats: evidence 2–3, heat 0–1, rep 4. Frank has a press contact who can be cashed in once in Act 2 (or saved for the package decision in Fork E). → Act 2 entry: press path open.

- **Exit D — Hard and hot:** Leaves from Beat 7. Carries `met_vera`, `vera_dead`, `aldwick_visited`, `ray_key_kept`, `cops_warned_off`, `mort_owes_one`. Stats: evidence 3–4, heat 3, rep 4. Aggressive playthrough — Frank pushed everywhere and got something for it, but the conspiracy is watching and so is the press. → Act 2 entry: high-pressure variant, ledger fork accelerated.

- **Exit E — Soft and sentimental:** Leaves from Beat 7. Carries `met_vera`, `vera_dead`, `vera_trusted_frank`, `ray_key_kept`. Stats: evidence 1, heat 0, rep 4. Frank treated Vera with care, didn't push the men in suits, walked out of Beat 6 empty-handed. He has the key and the guilt and not much else. → Act 2 entry: low-evidence track — viable but Bury It will become the dominant ending unless Aldwick produces.

- **Exit F — Walk away (early Bury It):** Leaves from Beat 7. Carries `met_vera`, `vera_dead`. Stats: whatever the player accumulated; irrelevant. → Ending: Bury It, early variant. Frank doesn't know what he's abandoning. The retainer envelope goes into a drawer. The city keeps smiling. Coda is short — a year later in a bar, a mention of Aldwick, Frank looks up and looks down again.

## Flags/Stats Changed

- `met_vera` — set when Frank takes the case in Beat 1. Not player-visible.
- `vera_dead` — set in Beat 6 when Frank learns of Vera's death. Player-visible? **No** — surfaces narratively, not in HUD.
- `aldwick_visited` — set when Frank receives the Aldwick name at Beat 3 (the clerk's whisper). Treated as "knows of Aldwick" for Act 1; Act 2 will retitle this as actual visit on first scene there. Not player-visible.
- `cops_warned_off` — set if Frank pressures Voss aggressively in Beat 3 OR is tailed out of the Iron Lung in Beat 4. Not player-visible. Modifier on heat scenes in Act 2.
- `mort_owes_one` — set if Frank befriends Mort during the office hub. Not player-visible. Consumable favour in Act 2 / Fork E.
- `ray_key_kept` — set when Vera gives Frank the key in Beat 5 OR Frank takes it from her dresser in Beat 6. Player-visible? **Yes** — listed as "Ray's key" in HUD inventory readout, because Act 2 references it.
- `vera_trusted_frank` — narrative-only shading flag from Beat 5 dialogue. Not player-visible.
- `evidence` — accrues 0 → ~1–4 across Act 1 (Voss tell, the stranger at the Iron Lung, the key, the photo grab). Player-visible.
- `heat` — accrues 0 → ~0–3 in Act 1. Player-visible.
- `rep` — starts 3, drifts 3 → ~3–4 across Act 1 depending on whom Frank treats well. Player-visible.

## Failure design (Act 1 quota)

- **Hard fail:** none in Act 1 (permadeath lives in Act 2/3). Beat 1 refusal is a soft narrative ending, not a death.
- **Soft fails:** refusing the case (Exit F early Bury It); brushing off Mort (loses press lead permanently); failing the rep read on Vera in Beat 1 (she withholds the key in Beat 5 — `ray_key_kept` not set, evidence path narrower).
- **Narrative wound:** Vera's death itself, framed so the player feels the cost of how they spoke to her in Beat 5.
