# 里見の家 — Act 3 Scenes

## Beat 1 — 電話の前に (Before the Call)

### Scene: `act3_threshold_entry`

Purpose: Act 3 opens at the entrance. Satomi stands with her bag, the house behind her, the road visible through the open front door. The narrator lists what she is carrying — not the bag, but the accumulation: names, wrong geometry, a lamp that should not be burning, a presence that said her name. Her inner voice calibrates. At high `composure` (≥ 6) she produces a dry internal inventory — a list of things she has confirmed and a list of things she has not. At low `composure` (≤ 3) no list comes. It is very quiet in her head. The narrator notes this.

Entry variants:
- From `threshold_stay` (normal Act 2 exit): full narration.
- From `threshold_forced_exit` (Flee path, low engagement): compressed version — she's at the station, or in a hired car. The narrator matches the geography. Both reach the same choice point.

Choices:
- 「ライアンに電話する」 — call Ryan; let the phone ring → `act3_ryan_voicemail` | gating: none | effects: none | consumable: N
- 「電話しない——まだ早い」 — not yet; put the phone away → `act3_no_call` | gating: none | effects: none | consumable: N
- 「電波を確認する」 — check signal before deciding → `act3_check_signal` | gating: none | effects: none | consumable: N
- 「田中さんから電話がくる」 — Tanaka-san calls her (his timing is exact) → `act3_tanaka_call` | gating: `flags: [met_neighbour]`; hide_if_failed | effects: none | consumable: N

NPCs present: none (Tanaka-san enters via choice, phone only)

---

### Scene: `act3_ryan_voicemail`

Purpose: Satomi calls Ryan. It rings four times — mid-morning in London, he is in a meeting, he always is — then voicemail. His recorded voice is embarrassingly ordinary given her current context. What she leaves is governed by `composure`:

- `composure` ≥ 7: dry, near-nothing. "まだここにいる。家は面白い。心配しないで。" Voice entirely steady. She almost sounds bored.
- `composure` 4–6: something she intends as dry but comes out more specific than she planned. She mentions the corridor. She doesn't finish the sentence. She fills in with a laugh that doesn't land. She hangs up.
- `composure` ≤ 3: she says she's fine and then there is a pause that she has no way to end. She says she'll call later. She will not be calling later; they both know this. She hangs up.

In all cases the call goes to voicemail. Ryan does not answer. Setting `called_ryan` raises `composure` +1 — the act of reaching out steadies her regardless of what she said.

Choices:
- 「メッセージを残した——決める時間だ」 — she's left the message; now decide → `act3_moment_of_choice` | gating: none | effects: `called_ryan: true`, `composure` +1 | consumable: N

NPCs present: none (Ryan is voicemail only)

---

### Scene: `act3_no_call`

Purpose: Satomi puts the phone back in her pocket. The not-calling is its own kind of statement. At high `composure` her inner voice remarks on this efficiently: she knows what she has to decide and Ryan cannot help her decide it. At low `composure`, the inner voice remarks on nothing. The house is very quiet.

Choices:
- 「考える時間はもう十分だ」 — she's been thinking long enough; decide → `act3_moment_of_choice` | gating: none | effects: none | consumable: N
- 「やはり電話する」 — changed her mind; call after all → `act3_ryan_voicemail` | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `act3_check_signal`

Purpose: Satomi checks her phone. Four bars — she noticed this when she arrived and it felt significant then; it feels significant now in the opposite direction. There is no good reason not to call. She makes a decision.

Choices:
- 「電話する」 — call Ryan → `act3_ryan_voicemail` | gating: none | effects: none | consumable: N
- 「電話しない」 — put the phone away → `act3_no_call` | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `act3_tanaka_call`

Purpose: Before or after the Ryan question resolves, Tanaka-san calls her. Available only if `met_neighbour`. His timing is too exact to be coincidence. He does not say hello; he says her name, and waits. He does not tell her to stay or to go. He says: 「節子さんも、あなたと同じ顔をしていました。」 ("Setsuko had the same look on her face.") He does not explain what face he means. She didn't tell him she was at the entrance. He doesn't explain how he knew. He rings off. The narrator describes the line going quiet.

This scene provides the sole outside-world perspective in Act 3. It does not tip the ending mechanically but its weight is felt — someone before her made this same pause, and that person's outcome is unresolved.

Choices:
- 「電話を切った。ライアンにも電話する」 — Tanaka's call is over; call Ryan too → `act3_ryan_voicemail` | gating: `flags_unset: [called_ryan]`; hide_if_failed | effects: none | consumable: N
- 「電話を切った。もう電話はしない」 — Tanaka's call is over; no more calls → `act3_moment_of_choice` | gating: none | effects: none | consumable: N

NPCs present: 田中 豊 (Tanaka Yutaka) — phone call only

---

## Beat 2 — 決断の瞬間 (The Moment of Choice)

### Scene: `act3_moment_of_choice`

Purpose: Satomi turns back to face the house. The narrator gives one image — the same house she arrived at, same angle, same light. Her inner voice produces the most honest thing it has said in the entire story. What it says varies:

- `accepted` set: "ああ。わかっている。最初からわかっていた。" ("Ah. I know. I knew from the beginning.") Quiet. Not distressed.
- `called_ryan` set, `accepted` not set: she hears her message in her head and notes she didn't say what she meant. She almost composes a follow-up text. Doesn't.
- `composure` ≤ 3 (fraying overlay): the inner voice says one word only: "決める。" ("Decide.") Then nothing.
- Default (no special flags): she remarks, practically, on what she knows and what she does not, and that this is an acceptable amount of information for a decision.

Then the choice. This is the final branch point of the story.

Choices:
- 「逃げる」 — leave; she is making a reasonable decision → `act3_flee_departure` | gating: none | effects: none | consumable: N
- 「向き合う」 — go back inside; face what's here → `act3_confront_entry` | gating: `flags: [knows_truth, saw_face]`, `curiosity` ≥ 6; **grey out if failed** (if `knows_truth` missing: "何をすべきかの形が見えていない。踏み出す先がない"; if `saw_face` missing: "何と向き合うのかを、まだ見ていない"; if both: "答える準備ができていない") | effects: none | consumable: N
- 「受け入れる」 — step back inside and sit down — she is choosing where to live → `act3_embrace_entry` | gating: `flags: [accepted, found_altar, heard_name, saw_face]`, `curiosity` ≥ 7; **hide_if_failed** | effects: none | consumable: N

_Forced Flee note: if `found_altar` is not set (Exit D path from Act 2), 向き合う and 受け入れる do not appear even greyed. Satomi simply does not have enough shape for any choice but leaving. The narrator notes, calmly, that she has what she came with, and that this is sometimes enough. Scene still routes to `act3_flee_departure`._

NPCs present: none

---

## Beat 3a — 逃げる: 出発 (Flee: Departure)

### Scene: `act3_flee_departure`

Purpose: Satomi walks to her car — or, on the Exit D path, she is already at the station. No choices. The Flee ending is a corridor; leaving does not require deliberation. The narrator describes the departure with the same precision he used for the arrival. Same road, different weight. Her rolling suitcase doesn't catch on the broken edge of the road this time.

She calls Kimura-san from the car park of a convenience store twenty minutes away. She files the paperwork by phone. He takes the call with the energy of a man who expected it. He does not ask questions.

Narration variants:
- `composure` ≥ 7: brisk, almost convinced. The narrator describes this as competent.
- `composure` 4–6: efficient but the specific things she is not thinking about are named by implication in her inner voice.
- `curiosity` ≥ 7 (high-curiosity Flee): her inner voice notes specific things she will not think about. The corridor. The name carved on the stone. The lamp.

She composes a text to Ryan. This one she sends: 「早めに帰る。家は売った。後で話す。」 She gets on the train. She sleeps, which she hasn't done properly since arriving.

Choices:
- 「電車に乗る」 — get on the train → `act3_flee_aftermath` | gating: none | effects: none | consumable: N

_Note: Single-choice forced transition. The meaningful choice was made at `act3_moment_of_choice`; the train is punctuation._

NPCs present: none (Kimura-san by phone — no direct scene)

---

## Beat 4a — 逃げる: 一週間後 (Flee: A Week Later)

### Scene: `act3_flee_aftermath`

Purpose: London. Her bedroom. Ryan's weight on the other side of the bed, reassuring. She has been competent and present and entirely fine for a week. Then she has a dream.

She is in the corridor. It is longer than before.

The narrator describes the dream briefly, without drama. Satomi's inner voice, upon waking, produces a single dry line — the kind she'd normally text Ryan. She doesn't text it. She lies in the dark.

Narration variants:
- `found_altar` set: the dream has an altar at the end of the corridor, lit. She wakes before she reaches it.
- `curiosity` ≥ 7: her inner voice in the dream names the unopened door. She wakes before she opens it.
- `curiosity` ≤ 4: just a wrong corridor in a house she almost doesn't recognise. The wrongness is the only thing she brings back.

The story ends here. The house is waiting. We do not tell the player this.

Choices:
- 「目を覚ます」 — wake up → ending: 逃げる | gating: none | effects: none | consumable: N

_Note: Single-choice ending punctuation. The player is already at the conclusion; the choice is the act of receiving it._

NPCs present: none (Ryan is implied weight in the bed — never direct)

---

## Beat 3b — 向き合う: 夜を越える (Confront: Through the Night)

### Scene: `act3_confront_entry`

Purpose: Satomi goes back inside. The house receives this with something she can only describe as steadiness. She knows what she has to do. The study told her; the kitchen confirmed it; the presence in the basement was the proof she didn't want. Setsuko was maintaining an arrangement. The arrangement has lapsed. Satomi can complete it or undo it.

The narrator describes the objects she would need — they are where the study said they would be. The altar objects, the notebook, the specific ordering described obliquely enough that understanding it required everything she found. She understands it now. Her inner voice does not produce an imaginary text to Ryan. This particular thing she is doing is not something she could describe in a text message.

Choices:
- 「段取りを整える——終わらせる」 — complete what Setsuko began; honour the arrangement → `act3_confront_complete` | gating: none | effects: `confront_undo: false` | consumable: N
- 「壊す——きれいに終わらせる」 — dismantle the arrangement deliberately; break the pattern → `act3_confront_undo` | gating: none | effects: `confront_undo: true` | consumable: N
- 「ノートをもう一度読む」 — read the notebook once more before deciding → `act3_confront_reread` | gating: none | effects: none | consumable: N

NPCs present: 祭壇の気配 (background presence — not manifest, but present)

---

### Scene: `act3_confront_reread`

Purpose: Satomi reads Setsuko's notebook one more time. This is not uncertainty — she understands it. This is the act of someone who wants to be sure before doing a thing that cannot be undone. The narrator waits. Her inner voice says: she could have had more time. Then: she had exactly as much time as she was going to take.

Choices:
- 「整える——続ける」 — complete the arrangement → `act3_confront_complete` | gating: none | effects: `confront_undo: false` | consumable: N
- 「壊す——終わらせる」 — dismantle it → `act3_confront_undo` | gating: none | effects: `confront_undo: true` | consumable: N

NPCs present: none

---

### Scene: `act3_confront_complete`

Purpose: Satomi completes the arrangement. The narrator describes what she does with the same clinical precision he used to describe the corridor — methodical, specific, not dramatic. This is what Setsuko did. This is maintenance. The altar objects in order. The paper folded correctly. The offering replaced.

When she is done, the house exhales — audibly, one long settling groan from the old wood. The ceiling creature in the kitchen shifts to a different spot. The study creature closes its book. The garden creature — she can hear it through the wall — stops. Something has been acknowledged.

Presence departs with the quality of someone who has been waiting a very long time for someone to arrive and is relieved, now that they have, to be able to leave. The lamp goes out. The basement is dark. Satomi stands in the kitchen. She makes tea from the packet she found in the cupboard. She does not look at the packet closely. She is not going to start.

Connects to: `act3_confront_morning`

Choices:
- 「お茶を入れる」 — make tea → `act3_confront_morning` | gating: none | effects: none | consumable: N

_Note: Single-choice transition after Confront resolution. Choice as punctuation._

NPCs present: 祭壇の気配 (departing; creatures background throughout)

---

### Scene: `act3_confront_undo`

Purpose: Satomi dismantles the arrangement. The narrator describes this with the same precision — same tone, different register. Where completion felt like continuation, undoing feels like closing a file. She removes the altar objects from their positions. She folds the papers differently. She doesn't destroy anything; she separates things.

The house makes a sound. Not a settling sound. More: a held breath. The presence is still here — she can sense it — but it is no longer tethered to anything. She does not know where it will go. The narrator does not speculate. Satomi notes: whatever was restless is now unmoored rather than resting, and there is a distinction she cannot fully explain. The lamp goes out.

The study creature has moved — not gone, but somewhere different. The kitchen is quiet. She makes tea. She does not think too hard about the ceiling.

Connects to: `act3_confront_morning`

Choices:
- 「お茶を入れる」 — make tea → `act3_confront_morning` | gating: none | effects: none | consumable: N

NPCs present: 祭壇の気配 (unmoored but present; creatures background)

---

## Beat 4b — 向き合う: 朝と電話 (Confront: Morning and the Call)

### Scene: `act3_confront_morning`

Purpose: Dawn. Satomi has been awake all night. She is sitting in the garden with tea. The garden is still overgrown. The corridor is still wrong — she measured it again at 3am; it is still wrong. The house is quiet in a way it has not been since she arrived. She checks her phone.

Two missed calls from Ryan: 6:00am and 6:14am. He heard the voicemail — whichever version she left. He called anyway. He is that kind of person. The narrator notes this.

If `called_ryan` not set: he texted instead. 「連絡して。心配してる。」Sent at 6:20am.

She misses her flight. This is fine.

Composure-gated narration: at low `composure` (≤ 3), the dawn scene is more frayed — the garden does not resolve into calm, and the tea is the only steady thing. At high `composure` (≥ 7), dry and collected: she is ready to field this call.

Choices:
- 「全部話す」 — tell Ryan most of it (he is silent for longer than usual; then: "I'll book you on the Thursday morning flight") → `act3_confront_ending` | gating: none | effects: none | consumable: N
- 「何も話さない」 — tell him none of it ("思ったより時間がかかった。次の便を取れる？") → `act3_confront_ending` | (convergent — same `next`, different framing) | gating: none | effects: none | consumable: N
- 「廊下だけ話す」 — tell him only: the corridor is still wrong, but everything else is fine ("わかった" — he books the flight without asking what that means) → `act3_confront_ending` | (convergent — same `next`, different framing; Ryan knows what she means and does not want to know what she means) | gating: none | effects: none | consumable: N

Convergent group: all three choices → `act3_confront_ending`. The call content is framing; Ryan books the Thursday flight in every variant. He does not ask follow-up questions about the corridor. The narrator notes this.

NPCs present: none (Ryan by phone — he answers; does not appear in person)

---

### Scene: `act3_confront_ending`

Purpose: The story ends. Satomi is in the garden, phone in her lap. Ryan has booked the flight. The house is behind her. The garden creature is still in the bamboo — she can hear it occasionally, a small sound with a precise quality. The corridor is still wrong. Whatever was restless is less so, though not gone.

Narration variant — `confront_undo` set: "ここにいたものは、今はどこかよそにある。それがよいことかどうかは、彼女にはわからない。" ("What was here is somewhere else now. Whether that is good she cannot say.") The house is quieter but not resolved.

Narration variant — `confront_undo` not set (completion): "ここにいたものは、長い間何かを待っていた。それが届いた。" ("What was here had been waiting a long time for something. It has been received.") A settled quality. Not peaceful exactly. Settled.

Choices:
- 「庭にいる」 — sit in the garden → ending: 向き合う | gating: none | effects: none | consumable: N

NPCs present: none (garden creature background)

---

## Beat 3c — 受け入れる: 理解 (Embrace: Understanding)

### Scene: `act3_embrace_entry`

Purpose: Satomi does not walk to the car. She walks back through the entrance and sits down in the main corridor — on the floor, her bag beside her. This is not a dramatic gesture. It is the most natural thing she has done since arriving.

The narrator, for the first time, shifts register. He describes not what she does but what she understands. This is a break in his voice — not the NHK documentary calm, but something quieter, as if the story has decided to trust her with its interior.

Her inner voice goes very quiet. Then it says: 「ああ。だからここに来たんだ。」("Ah. So that's why I came here.")

She doesn't mean the inheritance. She means something she cannot explain in a text message and will not try to. The house makes the sound a house makes when someone who belongs in it sits down. It is very small. She hears it.

No choice here — this is recognition, not deliberation. The player watches Satomi arrive at understanding. This beat exists to hold the revelation before what comes next.

Choices:
- 「座っている」 — sit with it → `act3_embrace_call` | gating: none | effects: none | consumable: N

_Note: Single-choice transition. The meaningful choice was `受け入れる` at the decision point; this is the arrival. The player's action is witness, not decision._

NPCs present: none (the house is present in the way that it is)

---

## Beat 4c — 受け入れる: ライアンへの電話 (Embrace: The Call to Ryan)

### Scene: `act3_embrace_call`

Purpose: Satomi calls Ryan. He answers on the third ring. It is late afternoon in London. She sounds completely normal. She says: 「ねえ、家について話があるんだけど。」("Hey, I need to talk to you about the house.") There is a beat. He says: "Okay." She says: 「荷物を少し送ってくれる？」("Can you send some things?") He says: "...Which things?" She says: 「あとでリストを送るよ。急がなくていいから。」("I'll send you a list. No rush.")

He is quiet for a moment. Then: "Is the house nice?"

Satomi looks at the corridor — still wrong — the ceiling where the domesticated creature has resettled — the garden where something tended the bamboo — and says: 「うん。好きになってきた。」("Yes. I'm starting to like it.")

The story ends here, in the middle of the call. The narrator describes what the house sounds like when it understands someone is staying. Her inner voice begins composing a list — not of things to sort, for once, but of things she has to tell him eventually. She puts them in order of how alarming they are. She starts with the corridor, because it is the most explainable. She is still laughing quietly at something Ryan says when the story ends — we don't hear what.

Choices:
- 「電話中——」 — still on the call → ending: 受け入れる | gating: none | effects: none | consumable: N

NPCs present: none (Ryan by phone — present through dialogue, does not appear in person)

---

## NPCs in This Act

- **田中 豊 (Tanaka Yutaka)** — first appears in `act3_tanaka_call` (if `met_neighbour`); phone call only. Delivers one line and rings off. Not explainable. This is his only Act 3 scene. Previously active in Act 2 Tanaka hub.

- **ライアン (Ryan)** — present via voicemail in `act3_ryan_voicemail` (if `called_ryan` path taken); via missed calls and live call in `act3_confront_morning`; via live call in `act3_embrace_call`. Never appears in person. Voice only. His responses — booking flights without complaint, answering on the third ring, asking if the house is nice — characterise him entirely. Cast entry: Ryan as expressed through Satomi's relationship to his absence.

- **里見 節子 (Setsuko Satomi)** — not present. Referenced in Act 3 via notebook (re-read in `act3_confront_reread`), Tanaka's mention ("Setsuko had the same look"), and the arrangement Satomi completes or dismantles. Presence through consequence.

- **木村 誠一 (Kimura Seiichi)** — phone call only in `act3_flee_departure` (implied, not staged). Takes her call with the energy of a man who expected it. No direct scene; background action.

- **祭壇の気配 (The Altar Presence)** — background in `act3_confront_entry` and Confront resolution scenes. Departs (complete) or becomes unmoored (undo). Does not speak in Act 3. Its exit is the resolution of the Confront path.

- **天井の住人 (The Ceiling Dweller)** — background in Confront resolution and morning scenes. Shifts position after the arrangement is completed. No direct interaction in Act 3.

- **疾走者 (The Sprinter)** — garden background in Confront morning scene; heard, not seen. Similarly background in Embrace entry/call scene — it has been tending the bamboo.

---

## Validation Notes

- **逃げる** — always available at `act3_moment_of_choice`; no flag or stat gate. ✓
- **向き合う** — requires `flags: [knows_truth, saw_face]` + `curiosity` ≥ 6. Greyed out (not hidden) when failed. Grey text names the specific gap (missing `knows_truth` vs. missing `saw_face` vs. both). ✓
- **受け入れる** — requires `flags: [accepted, found_altar, heard_name, saw_face]` + `curiosity` ≥ 7. Hidden entirely when not met (`hide_if_failed`). ✓
- **Forced Flee** — if `found_altar` not set, 向き合う and 受け入れる do not appear even greyed. Narrator note added to `act3_moment_of_choice`. ✓
- `called_ryan` — set only via `act3_ryan_voicemail` choice. Composure +1 on set. Shapes voicemail register and Confront morning narration. Does not gate any ending. ✓
- `confront_undo` — set in `act3_confront_undo` or `act3_confront_reread` → `act3_confront_undo`. Used only for `if`/`else` narration in `act3_confront_ending`. Not set in Complete path. ✓
- No consumable choices in Act 3 — all Beat 1 phone options are independent scenes, not hub topics. Tanaka call is gated `flags: [met_neighbour]` (hide_if_failed); once entered it plays once and exits; no flag consumption needed because it is a single-entry scene, not a hub topic that returns. ✓
- `tanaka_hub` in Act 2 consumed topics via `flags_unset`. In Act 3, Tanaka calls Satomi uninvited — this is a different scene (`act3_tanaka_call`), not the hub. No consumption mechanic needed. ✓
- `act3_tanaka_call` is hidden if `met_neighbour` not set. This is correct — if she never took his card, he has no way to call her. ✓
- Ryan call at `act3_ryan_voicemail` and Ryan call at `act3_confront_morning` are separate scenes — the voicemail happens before the choice, the live call happens the morning after Confront. No duplication; `called_ryan` flag distinguishes the earlier voicemail. ✓
- Single-choice forced transitions justified: `act3_ryan_voicemail` (voicemail complete → decide), `act3_flee_departure` (leaving is the decision), `act3_flee_aftermath` (dream arrival as punctuation), `act3_confront_complete`/`act3_confront_undo` (resolution then tea), `act3_embrace_entry` (witness to recognition, not new decision), `act3_embrace_call`/`act3_confront_ending` (ending reception). All are aftermath or punctuation, not gatekeeping. ✓
- `composure` changes in Act 3: `called_ryan` → +1 (only change). No other composure mutations; stat is read-only in narration variants beyond that. Matches `act-3.md` spec. ✓
- `curiosity` — read-only in Act 3. No changes. ✓
- All ending-gate flags (`found_altar`, `heard_name`, `saw_face`, `knows_truth`, `accepted`) — read at `act3_moment_of_choice`; not modified in Act 3. ✓
- No scene exceeds 6 active choices. ✓
- All beats from `act-3.md` have named scenes. ✓
- Act 2 exits A–F all arrive at `act3_threshold_entry` correctly:
  - Exit A (Fully Informed ± `accepted`) → full narration, all endings potentially available
  - Exit B (Informed but Withdrawn, no `saw_face`) → Confront greyed on `saw_face` gap
  - Exit C (Altar Only, no `knows_truth`) → Confront greyed on `knows_truth` gap
  - Exit D (Surface Only, no `found_altar`) → Forced Flee; Confront/Embrace invisible
  - Exit E overlay (`met_neighbour`) → `act3_tanaka_call` available
  - Exit F overlay (`composure` ≤ 3) → narration register shifts throughout, inner voice diminished ✓
- Confront Complete and Confront Undo both arrive at `act3_confront_ending`. `confront_undo` flag distinguishes narration via `if`/`else`. Engine sees one ending state. ✓
