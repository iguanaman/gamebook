# 里見の家 (Satomi no Ie) — Act 1: 到着 (Arrival)

## Journal Entry
あなたは日本に来た。家は確かにそこにある。それで十分なはずだった。

_(You came to Japan. The house is definitely here. That should have been enough.)_

## Entry

Arrives from: story start
Player state: `curiosity` 5, `composure` 8, no flags set

---

## Beats

### Beat 1 — 着陸 (Landing / First Impressions)

What happens: Satomi arrives in the region — train, then a local bus, then on foot the last stretch with her sensible rolling suitcase that keeps catching on the road's broken edge. The narrator describes the approach to the house; she describes the same scene to herself very differently. The house is unremarkable. Old. Cold even in the late afternoon light. She was expecting something to feel significant. It doesn't.

What the player decides/learns: Initial orientation — how Satomi reads the house. Three stances available: professional detachment (assess it like a surveyor), reluctant nostalgia (this is family, sort of), or immediate suspicion (something is wrong and I am choosing not to say so yet). The choice doesn't branch the plot but shifts `composure` ±1 and plants an early flag for Satomi's posture. Sets the comedy register for her inner voice.

Connects to: Beat 2 (linear)

---

### Beat 2 — 不動産業者 (The Estate Agent)

What happens: Kimura-san arrives — the estate agent, mid-fifties, apologetically professional. He has prepared a folder of documents, a brief verbal tour, and one piece of information he clearly wishes he could omit: the house is reputed to be haunted. He delivers this with the energy of a man disclosing minor subsidence. He hands over the key, notes the electricity is on a timer and may cut out at eleven, and makes efficiently for his car. Satomi has a narrow window to either draw him into conversation or let him go.

What the player decides/learns: Whether to engage Kimura-san properly. Asking about the family member, the house's history, or the neighbours opens a short conversation before he leaves. Brush him off or just take the key and he's gone in three minutes. This sets `met_neighbour` (named choice: actually, Kimura-san _gives_ her the neighbour's card — she has to ask for it, or he offers it only if she seems to want contact). Note: `met_neighbour` tracks whether Satomi accepted the neighbour's card, not just whether Kimura spoke. A player who let him go quickly has no outside contact in Act 3.

Connects to: Beat 3 (linear, but carrying `met_neighbour` or not)

---

### Conversation — Kimura-san (Estate Agent)

Purpose: Brief, dry, mildly alarming. Kimura-san is polite, professional, and constitutionally unable to make the haunting sound like anything other than a scheduling concern. He has three topics Satomi can ask about before he has to go: the family member (her great-aunt, 里見 節子, Setsuko), the house's local reputation, and the immediate neighbour (田中 ご老人, the old man next door). Each topic adds texture and one piece of useful information. The neighbour card is offered only if Satomi asks about local contacts.

Where it sits in the beat flow: Sits within Beat 2. Short — Kimura is in a hurry. Maximum three exchanges before he leaves regardless. Topics deplete normally; he cannot be stalled past his natural exit.

---

### Beat 3 — 一人になる (Alone)

What happens: Kimura's car disappears around the bend. Satomi stands in the entrance hall — 土間 (dirt-floored entrance), shoes-off, bag still on the step — and the house simply _is_. Dust motes. The smell of old tatami and something underneath it she can't name. The narrator notes the house has been waiting. Satomi notes she hasn't eaten since the airport. She begins moving through the ground floor to establish where things are — bathroom, kitchen, which sliding doors stick, where not to step on that board.

What the player decides/learns: First solo act in the house. A small sequence of practical decisions — where to put her bag, whether to open the back corridor or leave it, whether to try the landline (there is one, and it crackles). Each choice is mundane; the accumulated wrongness is in what isn't quite explained. Satomi's inner voice is doing most of the heavy lifting — composing imaginary texts to Ryan ("arrived. house is a house. you'd find it extremely boring." — she almost sends it before remembering the time difference). No significant stat change here; this is the atmosphere beat. Seeds one point of strangeness that will crystallise in Beat 5.

Connects to: Beat 4 (linear)

---

### Beat 4 — 夕食と夜 (Dinner and the Evening)

What happens: Satomi eats something from the convenience store bag she carried from the station. She establishes a small domestic routine — kettle, phone charger, the one lamp that works reliably. She reviews the documents Kimura left: title deeds, a brief history of the property (1940s construction, extended twice), and a single photograph of 里見 節子 she has never seen before. Setsuko is unremarkable-looking. The photograph is taken in the garden. The garden behind her is not the same garden that exists now. Satomi notices this and then decides she is tired.

What the player decides/learns: Whether to examine the photograph closely or put it in the folder and deal with it tomorrow. Examining closely raises `curiosity` +1 and adds a specific detail Satomi will remember in Act 2. Putting it away raises `composure` +1 and is the reasonable thing to do. The player also chooses whether to do a final check of the ground floor before bed or go straight up — the check finds nothing, but the _not finding_ anything is weighted. Both are valid; both connect to Beat 5.

Connects to: Beat 5 (linear)

---

### Beat 5 — 真夜中の音 (The Sound in the Night)

What happens: Satomi is nearly asleep when she hears it — a sound from below. Not loud. Not dramatic. The narrator describes it with great precision and no interpretation at all. Satomi's inner voice cycles through every rational explanation before landing on one that almost holds. The sound stops. Then, after a long enough pause that she has nearly convinced herself, it starts again. She has to decide: get up and look, or stay in bed and insist she didn't hear it.

What the player decides/learns: This is the Act 1 fork. Investigating (curiosity +1, composure -1) sends Satomi downstairs — she finds the wrong corridor. Or rather: she finds a corridor that is longer than the house. She can go forward into it or retreat. Retreating gives `curiosity` -1, `composure` +1 — she pulls back, tells herself it was the angle, the dark, and returns to bed. Her composure stays intact; her curiosity takes a hit. Both paths reach Beat 6.

The "go forward into the corridor" choice requires `curiosity` ≥ 5 (greyed out otherwise, with Satomi's inner voice saying she is simply not doing that). Players who entered Act 1 at the baseline can access it. Players who pulled back on earlier beats may find it greyed — Satomi has been retreating, and this is one step too far.

Connects to: Beat 6 (via investigate path or via stay-in-bed path)

---

### Beat 6 — 夜明け (Dawn)

What happens: Morning. Satomi is awake before the light is. The house looks ordinary. She makes instant coffee in the kitchen, stands at the window overlooking the garden, and takes stock. The narrator describes what she noticed and what she has chosen not to mention to herself yet. Satomi composes another imaginary text to Ryan — longer this time, and she doesn't almost-send it. She does send it. It arrives at 3am his time. He will not see it for hours.

What the player decides/learns: A brief beat of collected resolve. Satomi decides what today is — either "I'm going to go through this house properly" (reinforces the investigative path, `curiosity` +1 if she investigated the corridor, otherwise no change) or "I'm going to sort the paperwork and leave by Thursday" (composure +1). This choice is primarily about framing: it doesn't lock any door, but it colours how she enters Act 2. The act closes here. Exit states are determined by the combination of choices across Beats 2, 5, and 6.

Connects to: Act 2 entry (via one of the five exit states below)

---

## Exits

**Exit A — 好奇心旺盛 (The Curious One):** Satomi engaged with Kimura, examined the photograph, investigated the night sound, went forward into the wrong corridor, and woke resolving to investigate properly. Carries: `met_neighbour` set, `curiosity` 7, `composure` 6. Enters Act 2 as a willing investigator — the house hub opens with her already unsettled but leaning in.

**Exit B — 注意深い (The Careful One):** Satomi engaged with Kimura and examined the photograph, but retreated from the sound and woke resolving to leave by Thursday. Carries: `met_neighbour` set, `curiosity` 6, `composure` 8. Enters Act 2 with social anchor (neighbour card) but higher composure — she's scared and won't admit it, which is its own kind of interesting.

**Exit C — 孤独な調査者 (The Isolated Investigator):** Satomi brushed off Kimura (no neighbour card), investigated the sound, went into the corridor. Carries: `met_neighbour` unset, `curiosity` 7, `composure` 5. Enters Act 2 alone — no outside anchor, already rattled, higher risk for Act 3 isolation.

**Exit D — 孤独な退避 (The Isolated Retreater):** Satomi brushed off Kimura, didn't examine the photograph, stayed in bed at the sound. Carries: `met_neighbour` unset, `curiosity` 4, `composure` 9. Enters Act 2 as a reluctant investigator — composure is high but curiosity is low, meaning some Act 2 choices will be greyed. She is here to sell a house, not have an experience.

**Exit E — 半信半疑 (The Reluctant):** Satomi engaged Kimura (has the card), stayed in bed at the sound, woke resolving to leave by Thursday. Carries: `met_neighbour` set, `curiosity` 5, `composure` 9. Enters Act 2 with maximum practical composure and a social lifeline. The most cautious engaged path. In Act 3, the neighbour's warning may be the only thing that tips her toward Confront rather than Flee.

_Note: A sixth extreme state — brushed off Kimura, investigated everything, curiosity dropped below 4 via all retreat choices — cannot occur because Beat 5's investigate path raises curiosity, and the retreat path is required to produce the low-curiosity exits. The five states above cover the reachable space without over-specifying._

---

## Flags/Stats Changed

- `met_neighbour` — set in Beat 2 if Satomi asks for the neighbour's contact card. Hidden. Carries forward to Act 2 (enables neighbour call hub) and Act 3 (the neighbour appears with a warning).

- `curiosity` — starts 5. Changes in Act 1:
  - Beat 4: examine photograph → +1; put away → no change
  - Beat 5: investigate sound → +1; stay in bed → -1
  - Beat 5: go forward into corridor → further +1 (if taken); retreat from corridor → -1
  - Beat 6: resolve to investigate → +1 only if `curiosity` ≥ 6 entering this beat; resolve to leave → no change
  - _Net range entering Act 2: 4–7_

- `composure` — starts 8. Changes in Act 1:
  - Beat 1: professional detachment → +1; reluctant nostalgia → no change; immediate suspicion → -1
  - Beat 5: investigate sound → -1; stay in bed → +1
  - Beat 5: retreat from corridor → +1; go forward → no change (she was already committed)
  - _Net range entering Act 2: 5–9_ (low end only reached via suspicion + investigation + corridor)

No other flags are set in Act 1. The first flag beyond `met_neighbour` that matters (`found_altar`, `heard_name`, `saw_face`) all belong to Act 2.
