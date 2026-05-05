# 里見の家 (Satomi no Ie) — Act 3: 決断 (Decision)

## Journal Entry
あなたは家の入口に立っている。すべてを知った上で、どうするかを決めなければならない。

_(You stand at the entrance to the house. Knowing everything you know, you have to decide what to do.)_

## Entry

Arrives from: Act 2 Beat 7 (the threshold) — all Act 2 exit states converge here
Player state at entry:

| Act 2 Exit | Flags present | curiosity | composure | Endings available |
|---|---|---|---|---|
| A (Fully Informed, `accepted`) | `found_altar` `heard_name` `saw_face` `knows_truth` `accepted` | 8–10 | 3–5 | Flee / Confront / **Embrace** |
| A (Fully Informed, no `accepted`) | `found_altar` `heard_name` `saw_face` `knows_truth` | 7–8 | 4–6 | Flee / Confront |
| B (Informed but Withdrawn) | `found_altar` `heard_name` `knows_truth` | 6–7 | 6–8 | Flee only (no `saw_face` blocks Confront) |
| C (Altar Only) | `found_altar` (± `heard_name`) | 5–6 | 6–8 | Flee only (no `knows_truth` blocks Confront) |
| D (Low Curiosity, Surface Only) | none, or partial surface flags | 4–5 | 7–9 | **Flee forced** — Confront and Embrace both closed |
| E overlay (with neighbour) | any of the above + `met_neighbour` | varies | varies | As above, plus neighbour's Act 3 beat available |
| F overlay (composure ≤ 3) | any of A–C flag spread | 6–8 | 2–3 | As above, narration register shifts to frightened |

Entry narration: the narrator describes what Satomi is carrying — not her bag, but the weight of what she's seen. Her inner voice is the most honest it has been. The exact tone is governed by `composure`: at high composure she is dry and decisive; at low composure she is beyond pretending. At `composure` ≤ 3, her inner voice produces no imaginary text to Ryan at all — it is too quiet in her head.

---

## Beats

### Beat 1 — 電話の前に (Before the Call)

What happens: Satomi stands at the entrance. The house is behind her. The road is in front of her. She takes out her phone. There is signal — she noticed this in Act 1 and it feels significant now. She can call Ryan. She does not have to. Her ticket is in her bag; the estate agent's number is saved; the car she hired is parked at the end of the road. The narrator lists these things with the same calm tone he used to describe the wrong corridor.

What the player decides/learns: Whether Satomi calls Ryan before making her final choice. Calling sets `called_ryan`. The call goes to voicemail — it is mid-morning in London, he is probably in a meeting. What she leaves in the message is shaped by `composure`: high composure produces a dry, almost-nothing message ("I'm still here. House is interesting. Don't worry."); low composure produces something she immediately wishes she could take back. She cannot take it back. Either way, Ryan does not answer. Calling Ryan raises `composure` +1 (the act of reaching out steadies her, regardless of outcome). Not calling is also valid — she puts the phone away. Both paths connect to Beat 2.

If `met_neighbour`: before or after the Ryan call option, there is a second option — the neighbour Tanaka-san calls her. His timing is too precise to be coincidence. He doesn't advise her to leave or to stay. He says: "節子さんも、あなたと同じ顔をしていました。" ("Setsuko had the same look on her face.") He does not explain what he means. He rings off. This small scene provides the one outside-world perspective that can tip a wavering player toward Confront rather than Flee — not because it tells her anything she doesn't know, but because it confirms the choice has been made by someone before her and that person's outcome is unresolved.

Connects to: Beat 2 (linear)

---

### Beat 2 — 決断の瞬間 (The Moment of Choice)

What happens: Satomi turns back to face the house. This beat is brief — a single image from the narrator, a single line from her inner voice — and then the choice. The house looks the same as when she arrived. She knows it is not. The narrator does not editorialize. Her inner voice says one thing, and it is the truest thing she has said in the entire story. What it says depends on `composure`, `accepted`, and whether `called_ryan` is set — but all variants end at the same moment: she has to decide.

What the player decides/learns: The final branching point. Three options are presented, their availability gated by flags and stats:

- **逃げる (Flee)** — always available, no gate. She can always leave. The choice text is calm: she is not running. She is making a reasonable decision.
- **向き合う (Confront)** — visible and unlocked if `knows_truth` + `saw_face` + `curiosity` ≥ 6. Greyed (not hidden) if only partially met — Satomi can see she could stay and face it but the shape of what that means isn't clear to her yet. If greyed, the grey text names what's missing (she doesn't know what to do, or she's never looked at what she'd be doing it with).
- **受け入れる (Embrace)** — hidden unless `accepted` + `found_altar` + `saw_face` + `heard_name` + `curiosity` ≥ 7. Does not appear at all if not unlocked. When it does appear, the choice text is unnervingly ordinary: she's not choosing something cosmic. She's choosing where to live.

Forced Flee (Exit D): if `found_altar` is not set, the Confront and Embrace choices do not appear even greyed — Satomi simply does not have enough shape for the decision. The narrator notes, neutrally, that she has what she came with and that is sometimes enough.

Connects to: Beat 3a (Flee), Beat 3b (Confront), Beat 3c (Embrace)

---

### Beat 3a — 逃げる: 出発 (Flee: Departure)

What happens: Satomi walks to her car. The narrator describes the departure with the same precision he used to describe the arrival — same road, same distance, different weight. Her rolling suitcase doesn't catch on the broken edge of the road this time. She files the paperwork with Kimura-san by phone from the car park of a convenience store twenty minutes away. He takes the call with the energy of a man who expected it. She eats something. She drives. The house is behind her, and then it isn't — she can't see it from the main road.

What the player decides/learns: No choices in this beat. The Flee ending is a corridor — she is leaving, and leaving doesn't require deliberation. What changes is the narration: `composure` shapes whether the narrator describes this as competent or mechanical; `curiosity` (if it was high) lets her inner voice note the specific things she will not think about. She composes a text to Ryan. This one she sends: "Coming home early. Sold the house. Tell you later." She gets on the train. She gets on the plane. She sleeps, which she hasn't done properly since she arrived.

Connects to: Beat 4a (Flee: Aftermath)

---

### Beat 4a — 逃げる: 一週間後 (Flee: A Week Later)

What happens: Satomi is back in London. Her own bedroom, her own duvet, Ryan's reassuring weight on the other side of the bed. She has not thought about the house. She has been competent and efficient and fully present. Then she has a dream: she is in the corridor. It is longer than before. She walks it. At the end there is a door she didn't open. She wakes before she opens it.

What the player decides/learns: No choices. The narrator describes the dream briefly, without drama. Satomi's inner voice, upon waking, produces a single dry line — the kind of thing she'd normally text Ryan. She doesn't text it. She lies there in the dark. The story ends. The house is waiting. We do not tell the player this. They already know.

_Connects to: Ending — 逃げる_

---

### Beat 3b — 向き合う: 夜を越える (Confront: Through the Night)

What happens: Satomi goes back inside. She knows what she has to do — the study told her, the kitchen confirmed it, the presence in the basement was the proof she didn't want. Setsuko was maintaining something. An arrangement between this household and whatever lives here. Setsuko is gone; the arrangement has lapsed; the creatures are unmoored. Satomi can complete the arrangement (the altar, the ritual objects, the specific ordering she understands from the notebook) or she can undo it (dismantle the altar, remove the objects, break the pattern deliberately). The narrator describes what she does. Her inner voice says, as she does it: this is incredibly normal behaviour for someone of her background, actually.

What the player decides/learns: One choice inside the Confront path — complete or undo. Both resolve to the same scene (the house settles) but with different register: completion feels like honouring something; undoing feels like a clean break. The choice does not affect the ending state but colours the closing narration. Either way: the presence leaves. The house makes a sound it hasn't made since she arrived — a kind of exhale. The ceiling creature in the kitchen settles into a different spot. The creature in the study closes the book. The garden creature does not flee.

Connects to: Beat 4b (Confront: Morning)

---

### Beat 4b — 向き合う: 朝と電話 (Confront: Morning and the Call)

What happens: Dawn again. Satomi has been awake all night. She is sitting in the garden with tea — she found a packet she didn't look at closely in the kitchen and she is not going to start looking at it closely now. The garden is still overgrown. The corridor is still wrong — she measured it; it is still wrong. The house is, however, quiet. She checks her phone. Two missed calls from Ryan (the voicemail landed at 2am, she'd texted him not to worry, he called anyway at 6am and 6:14am). She missed her flight. This is fine. She calls Ryan. He answers.

What the player decides/learns: One final small choice — what she tells Ryan. She can tell him most of it (he is silent for longer than usual and then says: "I'll book you on the Thursday morning flight"); tell him none of it ("it took longer than expected, can you get me on the next one"); or tell him the corridor is still wrong but everything else is fine (he knows what she means and also does not want to know what she means; he books the Thursday flight). In all cases, Ryan books the flight without complaint. In all cases, he does not ask follow-up questions about the corridor. He is that kind of person. The narrator notes this. The story ends with Satomi in the garden, phone in her lap, the house behind her, and the knowledge that whatever was restless here is less restless now, though not gone.

_Connects to: Ending — 向き合う_

---

### Beat 3c — 受け入れる: 理解 (Embrace: Understanding)

What happens: Satomi doesn't walk to the car. She walks back through the entrance and sits down in the main corridor — just sits, on the floor, her bag beside her. The narrator, for the first time, shifts register: he describes not what she does but what she understands. Her inner voice goes very quiet. Then it says: "ああ。だからここに来たんだ。" ("Ah. So that's why I came here.") She doesn't mean the inheritance. She means something she can't explain in a text message and won't try to.

What the player decides/learns: No choice here — this beat is the recognition, not the deliberation. The player watches Satomi arrive at an understanding that the story has been building toward without naming it: the family member wasn't a stranger, the house was prepared for someone specific, and the someone specific is her. What this means in literal-supernatural terms the story declines to resolve. It feels true in the way that inexplicable things sometimes feel true. This beat exists to let the player sit in the revelation before Satomi decides what to do with it.

Connects to: Beat 4c (Embrace: The Call)

---

### Beat 4c — 受け入れる: ライアンへの電話 (Embrace: The Call to Ryan)

What happens: Satomi calls Ryan. He answers on the third ring — it is late afternoon in London. She sounds completely normal. She says: "ねえ、家について話があるんだけど。" ("Hey, I need to talk to you about the house.") There is a beat. He says: "Okay." She says: "荷物を少し送ってくれる？" ("Can you send some things?") He says: "...Which things?" She says: "あとでリストを送るよ。急がなくていいから。" ("I'll send you a list. No rush.") He is quiet for a moment and then says: "Is the house nice?" She looks at the corridor — still wrong — the ceiling where the domesticated creature has resettled — the garden where something tended the bamboo — and says: "うん。好きになってきた。" ("Yes. I'm starting to like it.")

What the player decides/learns: No choices. The story ends here, in the middle of the call. The narrator describes what the house sounds like when it understands someone is staying. Her inner voice composes a list — not of things to sort out, for once, but of things she has to tell him eventually. She puts them in order of how alarming they are. She starts with the corridor, because it is the most explainable. The story closes on her laughing quietly at something Ryan says, which we don't hear.

_Connects to: Ending — 受け入れる_

---

## Exits

- **Exit: 逃げる (Flee)** — Satomi leaves the house. Arrives from Beat 3a → Beat 4a. Carries: `found_altar` or not (shapes which details haunt the dream); `curiosity` (shapes how specific the dream is — high curiosity names the unopened door; low curiosity is just a wrong corridor in a house she doesn't recognise). No flags set in Act 3. The dream is the ending.

- **Exit: 向き合う (Confront — Complete)** — Satomi stays and completes Setsuko's arrangement. Arrives from Beat 3b → Beat 4b. Carries: `called_ryan` (shapes voicemail content); `composure` (shapes closing garden narration — frayed but functional at low composure, dry and collected at high). Ryan books the Thursday flight. She misses the original one.

- **Exit: 向き合う (Confront — Undo)** — Satomi stays and dismantles the arrangement. Same arrival as above, different closing narration register. The house is quieter. Whatever was here is less present. The corridor is still wrong. She gets the Thursday flight.

- **Exit: 受け入れる (Embrace)** — Satomi calls Ryan and stays. Arrives from Beat 3c → Beat 4c. Carries: `accepted`, all three altar flags, `curiosity` ≥ 7. The story ends in the middle of the call. She is staying. The house knows it.

_Note: Confront Complete and Confront Undo are the same ending state from the engine's perspective — one ending scene with `if`/`else` branching on a "undo vs complete" flag set in Beat 3b. This avoids requiring a fourth ending scene for a register distinction._

---

## Flags/Stats Changed

- `called_ryan` — set in Beat 1 if Satomi calls Ryan's voicemail. Hidden. Flavour flag: shapes voicemail content (composure-governed) and closing narration in Confront ending. Does not gate any ending.

- `confront_undo` — set in Beat 3b if Satomi chooses to dismantle the arrangement rather than complete it. Hidden. Used only for `if`/`else` narration branching within the Confront ending scene. No downstream consequence (there is no Act 4).

- `composure` — changes in Act 3:
  - Beat 1: calling Ryan → +1; not calling → no change
  - No other composure changes. Act 3 is short; by now `composure` has done its shaping work.

- `curiosity` — no changes in Act 3. Stat is read-only here: it was the engine of Act 2; Act 3 consumes the result.

- All ending-gate flags (`found_altar`, `heard_name`, `saw_face`, `knows_truth`, `accepted`) — read in Beat 2 to determine which endings are visible. Not modified.

All flags hidden. No HUD changes in Act 3.

---

## Act 2 Exit State → Ending Map

| Act 2 Exit | `found_altar` | `knows_truth` | `saw_face` | `accepted` | curiosity | Endings reachable |
|---|---|---|---|---|---|---|
| A (Fully Informed + `accepted`) | ✓ | ✓ | ✓ | ✓ | 8–10 | Flee / Confront / **Embrace** |
| A (Fully Informed, no `accepted`) | ✓ | ✓ | ✓ | — | 7–8 | Flee / Confront |
| B (Informed but Withdrawn) | ✓ | ✓ | — | — | 6–7 | **Flee only** — Confront needs `saw_face` |
| C (Altar Only) | ✓ | — | varies | — | 5–6 | **Flee only** — Confront needs `knows_truth` |
| D (Surface Only) | — | — | — | — | 4–5 | **Flee forced** — no choice presented |
| E overlay (+ neighbour) | as A/B/C | as A/B/C | as A/B/C | as A/B/C | +0 | Same as underlying exit; neighbour Beat 1 scene available |
| F overlay (composure ≤ 3) | as A/B/C | as A/B/C | as A/B/C | as A/B/C | 6–8 | Same as underlying exit; narration register shifts throughout |

Key constraint summary:
- **Flee** — always available, no minimum flags or stats
- **Confront** — requires `knows_truth` + `saw_face` + `curiosity` ≥ 6
- **Embrace** — requires `accepted` + `found_altar` + `heard_name` + `saw_face` + `curiosity` ≥ 7 (Embrace option hidden until all met)
- **Forced Flee** — `found_altar` unset; no choice presented, Confront/Embrace invisible
