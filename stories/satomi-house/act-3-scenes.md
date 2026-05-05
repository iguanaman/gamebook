# 里見の家 — Act 3 Scenes（決断）

Target: 10 scenes covering 4 endings. No hubs. Linear threshold → phone beat → final choice → 4 ending paths.

Player sees 4–6 scenes in Act 3 depending on ending chosen.

---

## Ending Map

| Path | Requires | Available |
|---|---|---|
| **逃げる — Flee** (bittersweet) | none — always available | always |
| **向き合う — Confront (good)** | `knows_truth` + `saw_face` + `curiosity` ≥ 6 | greyed if not met |
| **向き合う — Confront (bad)** | player chooses Confront without `knows_truth` (greyed, but player attempts anyway) | see note below |
| **受け入れる — Embrace** | `accepted` + `found_altar` + `heard_name` + `saw_face` + `curiosity` ≥ 7 | **hidden** if not met |

**Confront-bad note:** The bad Confront ending is reached when `knows_truth` is **not** set but `saw_face` IS set and `curiosity` ≥ 6, and the player forces through the greyed choice. The grey text reads: 「何をすべきかの形が見えていない——でも、踏み出す」. This is a deliberate player action: they can see the choice is incomplete but push through anyway. The outcome is incomplete resolution — haunting follows her home.

If `found_altar` is not set (Act 2 surface path), 向き合う and 受け入れる are entirely invisible (not greyed). Satomi simply does not have enough shape for those choices.

---

## Scene 15: `act3_threshold_entry`

**Purpose:** Act 3 opens. Satomi is at the entrance with her bag — or, if she forced her way out at the Act 2 threshold, she's already at the gate or in her car. Both are addressed. The narrator lists what she is carrying: the wrong corridor, the creatures, the altar, her name spoken once. Her inner voice calibrates.

**Text blocks:**
- Narrator: the entrance. The house behind her. The road visible. What she is carrying — not the bag.
- Satomi (inner): varies by `composure`. At ≥ 6: a dry internal inventory. Two lists — confirmed and unexplained. At ≤ 3: no list. Very quiet in her head. The narrator notes this.
- Entry variant for forced-exit path: she is at the gate, or in the hired car twenty minutes down the road. The geography changes; the weight doesn't.

**Choices:**
- 「ライアンに電話する」 — call Ryan | effects: none → `act3_ryan_voicemail`
- 「電話しない」 — put the phone away | effects: none → `act3_no_call`
- 「田中さんから電話がくる」 (Tanaka calls her — his timing is exact) | gating: `flags: [met_neighbour]`; hide if failed | effects: none → `act3_tanaka_call`

**NPCs:** none (Tanaka via choice)

---

## Scene 15a: `act3_ryan_voicemail`

**Purpose:** Satomi calls Ryan. Four rings. Voicemail. His recorded voice is embarrassingly ordinary given her context. What she leaves is governed by `composure`:
- ≥ 7: dry, near-nothing. 「まだここにいる。家は面白い。心配しないで。」 She almost sounds bored.
- 4–6: intends dry; comes out specific. She mentions the corridor. Doesn't finish the sentence. A laugh that doesn't land.
- ≤ 3: "大丈夫です" and then a pause she has no way to end. She says she'll call later.

Setting `called_ryan` raises `composure` +1 — the act of reaching out steadies her regardless of what she said.

**Text blocks:**
- Narrator: four rings. The voicemail greeting.
- Ryan (narrator reads): voicemail greeting, ordinary.
- Satomi (inner, after): "送ってしまった。取り消せない。" — regardless of composure variant.

**Choices (single exit → `act3_moment_of_choice`):**
- 「メッセージを残した——決める時間だ」 — she's left it; time to decide | effects: `called_ryan: true`, `composure` +1

**NPCs:** none (Ryan is voicemail)

---

## Scene 15b: `act3_no_call`

**Purpose:** Satomi puts the phone away. The not-calling is its own statement. At high `composure` her inner voice remarks efficiently: Ryan cannot help her decide this. At low `composure`: nothing. The house is very quiet.

**Text blocks:**
- Narrator: the phone going into her pocket. The road.
- Satomi (inner): varies by composure as above.

**Choices:**
- 「決める時間だ」 — time to decide | effects: none → `act3_moment_of_choice`
- 「やはり電話する」 — changed her mind | effects: none → `act3_ryan_voicemail`

**NPCs:** none

---

## Scene 15c: `act3_tanaka_call` *(only if `met_neighbour`)*

**Purpose:** Tanaka calls her before she decides anything. His timing is too exact. He does not say hello — he says her name and waits. He does not tell her to stay or go. He says: 「節子さんも、あなたと同じ顔をしていました。」He does not explain what face he means, or how he knows she's at the entrance, or how he knew she'd inherited the house at all. He rings off. The line goes quiet.

This is the sole outside-world perspective in Act 3. Its weight: someone before her made this same pause. That person's outcome is unresolved.

**Text blocks:**
- Tanaka (prefix `japanese_male_midlife_japanese_mature_deep_intriguing:`): 「節子さんも、あなたと同じ顔をしていました。」
- Narrator: the line going quiet. The road.
- Satomi (inner): "同じ顔。どんな顔？"

**Choices:**
- 「電話を切った——ライアンにも電話する」 — call Ryan too | gating: `flags_unset: [called_ryan]`; hide if failed | effects: none → `act3_ryan_voicemail`
- 「電話を切った——もう電話はしない」 — no more calls | effects: none → `act3_moment_of_choice`

**NPCs:** 田中 豊 (Tanaka Yutaka) — phone only

---

## Scene 16: `act3_moment_of_choice`

**Purpose:** Satomi turns back to face the house. The narrator gives one image — the same house she arrived at, same angle, same light. She knows it is not the same. Her inner voice says the most honest thing it has said in the entire story.

Inner voice variants:
- `accepted` set: 「ああ。わかっている。最初からわかっていた。」 Quiet. Not distressed.
- `called_ryan`, no `accepted`: she hears her voicemail in her head and notes she didn't say what she meant.
- `composure` ≤ 3: one word: 「決める。」 Then nothing.
- Default: a practical note on what she knows and does not, and that this is an acceptable amount of information for a decision.

Then the choice.

**Text blocks:**
- Narrator: the house. Same angle as arrival.
- Satomi (inner): as above, gated by flags/stats.

**Choices:**
- 「逃げる」 — leave; she is making a reasonable decision | gating: none (always available) | → `act3_flee_departure`
- 「向き合う」 — go back inside; face what's here | gating: `flags: [saw_face]`, `curiosity` ≥ 6; **grey if failed** | grey text (if `knows_truth` missing): 「何をすべきかの形が見えていない——でも、踏み出す」 (player can push through → Confront-bad) | grey text (if `saw_face` missing): 「何と向き合うのかを、まだ見ていない」(player cannot push through — needs `saw_face`) | → `act3_confront_entry`
- 「受け入れる」 — step back inside and sit down; she is choosing where to live | gating: `flags: [accepted, found_altar, heard_name, saw_face]`, `curiosity` ≥ 7; **hide if failed** | → `act3_embrace_entry`

**Forced-Flee note:** if `found_altar` not set, 向き合う and 受け入れる do not appear even greyed. Narrator adds: 「持ってきたものは持ってきたものだけだ。それで十分なこともある。」Scene routes to `act3_flee_departure`.

**Confront-bad access:** 向き合う is greyed when `knows_truth` missing. The grey choice has inner voice text that acknowledges incompleteness — but the player can still select a greyed choice (engine convention: grey = visible but marked, not locked). Selecting greyed 向き合う without `knows_truth` routes to `act3_confront_entry` which then branches into `act3_confront_bad`.

**NPCs:** none

---

## Scene 17a: `act3_flee_departure`

**Purpose:** Satomi walks to her car. No choices. The Flee ending is a corridor. The narrator describes the departure with the same precision as the arrival — same road, different weight. Her suitcase doesn't catch on the broken road edge this time. She calls Kimura-san from a convenience store car park twenty minutes away. He takes the call with the energy of a man who expected it. She eats something. She drives. The house is behind her, then isn't — she can't see it from the main road.

**Text blocks:**
- Narrator: the departure, the road, the convenience store. Kimura-san's voice, off-screen. The train. Sleep — she hasn't done that properly since arriving.
- Satomi (inner) by `composure`: ≥ 7: brisk, almost convinced; ≤ 4: names, by implication, the things she is not thinking about. The corridor. The name carved on stone. The lamp.
- She composes and sends a real text to Ryan: 「早めに帰る。家は売った。後で話す。」

**Choices (single exit → `act3_flee_aftermath`):**
- 「電車に乗る」 — get on the train | effects: none

**NPCs:** none (Kimura by phone, implied)

---

## Scene 17b: `act3_flee_aftermath`

**Purpose:** **Ending: 逃げる.** London. Her bedroom. Ryan's weight on the other side of the bed, reassuring. She has been competent and efficient and entirely fine for a week. Then she has a dream.

She is in the corridor. It is longer than before.

The narrator describes the dream briefly, without drama. Satomi's inner voice, upon waking, produces a single dry line — the kind she would normally text Ryan. She doesn't text it. She lies in the dark. The story ends. The house is waiting. We do not tell the player this. They already know.

**Text blocks:**
- Narrator: London, the bedroom, a week of ordinary. The dream.
- Dream variants by flag: if `found_altar` set: an altar at the end of the corridor, lit. She wakes before she reaches it. If `curiosity` ≥ 7: her inner voice in the dream names the door at the end. If `curiosity` ≤ 4: just a wrong corridor in a house she almost doesn't recognise.
- Satomi (inner, waking): one dry line she doesn't send.

**Choices (single exit):**
- 「目を覚ます」 — wake up | → Ending: 逃げる

**NPCs:** none (Ryan is the implied weight in the bed)

---

## Scene 17c: `act3_confront_entry`

**Purpose:** Satomi goes back inside. The house receives this with something she can only describe as steadiness. She knows what she has to do — if `knows_truth` is set. If it is not, she knows she has to do something, but the shape of what that is isn't clear. This is where **Confront-good** and **Confront-bad** diverge.

**Text blocks:**
- Narrator: the house receiving her return. The study, the kitchen, the basement — all of it is behind this decision.
- Satomi (inner, `knows_truth` set): 「段取りはわかった。節子さんのノートに全部あった。わかっていた。」
- Satomi (inner, `knows_truth` not set): 「何かしなければならない。何かが——でも、何を？」

**Choices:**
- If `knows_truth` set:
  - 「段取りを整える——終わらせる」 — complete what Setsuko began | effects: `confront_undo: false` → `act3_confront_complete`
  - 「壊す——きれいに終わらせる」 — dismantle the arrangement | effects: `confront_undo: true` → `act3_confront_undo`
  - 「ノートをもう一度読む」 — read the notebook once more before deciding | effects: none → `act3_confront_reread`
- If `knows_truth` not set (Confront-bad path):
  - 「何かしなければならない」 — she has to do something; she goes to the altar | effects: none → `act3_confront_bad`

**NPCs:** 祭壇の気配 (background — present but not manifest)

---

## Scene 17d: `act3_confront_reread`

**Purpose:** Satomi reads Setsuko's notebook once more. She understands it — she wants to be sure before doing a thing that cannot be undone. Her inner voice: she could have had more time. Then: she had exactly as much as she was going to take.

**Text blocks:**
- Narrator: the notebook, the lamp in the kitchen she reads by.
- Satomi (inner): "確認できた。"

**Choices (convergent → Confront resolution):**
- 「整える——続ける」 — complete | effects: `confront_undo: false` → `act3_confront_complete`
- 「壊す——終わらせる」 — dismantle | effects: `confront_undo: true` → `act3_confront_undo`

**NPCs:** none

---

## Scene 17e: `act3_confront_complete`

**Purpose:** Satomi completes the arrangement. Methodical, specific, not dramatic. Altar objects in order. Paper folded correctly. Offering replaced. This is what Setsuko did. This is maintenance.

When she is done, the house exhales — audibly, one long settling groan of old wood. The ceiling creature shifts to a different spot. The study creature closes its book. The garden creature — she can hear it through the wall — stops. Something has been acknowledged. The presence departs with the quality of someone who has waited a very long time for someone to arrive and is relieved, now that they have, to be able to leave. The lamp goes out. The basement is dark.

Satomi makes tea from the packet she found in the kitchen cupboard. She does not look at it closely. She is not going to start.

**Choices (single exit → `act3_confront_morning`):**
- 「お茶を入れる」 — make tea | effects: none

**NPCs:** 祭壇の気配 (departing); creatures background

---

## Scene 17f: `act3_confront_undo`

**Purpose:** Satomi dismantles the arrangement. The narrator describes this with the same precision — same tone, different register. Where completion felt like continuation, undoing feels like closing a file. She removes the altar objects from their positions, folds the papers differently, separates things without destroying anything.

The house makes a sound — not settling. A held breath. The presence is still here but no longer tethered to anything. She does not know where it will go. The narrator does not speculate. Whatever was restless is now unmoored rather than at rest, and there is a distinction she cannot fully explain. The lamp goes out.

The study creature has moved — not gone, somewhere different. The kitchen ceiling is quiet. She makes tea. She does not think too hard about the ceiling.

**Choices (single exit → `act3_confront_morning`):**
- 「お茶を入れる」 — make tea | effects: none

**NPCs:** 祭壇の気配 (unmoored); creatures background

---

## Scene 17g: `act3_confront_bad`

**Purpose:** **Bad outcome branch #4 / Ending: Confront-bad.** Satomi goes to the altar with the full conviction that something must be done and no clear understanding of what. She handles the altar objects — not with comprehension, but with intention. The presence is there. It watches. It does not leave. Whatever she does is not wrong exactly — it's incomplete. Like reading a sentence and stopping before the final clause.

The house does not settle. The presence does not depart. The lamp does not go out. Everything is as it was, except that now it knows she was here and tried.

Satomi leaves the next morning. She files the paperwork. She goes home. She does not dream of the corridor. She dreams of something that knows her name but won't say it again. Not yet.

A week later, things in her London flat are not where she left them. Small things. Easily explained. She explains them.

**Text blocks:**
- Narrator: the altar, her hands, the incompleteness of what she does — described with the same calm as everything else. The house's response: not hostile, but not resolved.
- Satomi (inner): 「やった。やったけど——」 A pause that doesn't finish.
- One week later, London: the displaced small things. Her inner voice, very carefully, not thinking about Japan.

**Choices (single exit):**
- 「帰る」 — go home | → Ending: 向き合う (incomplete — haunting follows)

**Note:** This ending is presented as a Confront ending in the engine — same ending label, but the narration conveys the incomplete resolution. The haunting-follows-home beat distinguishes it from the bittersweet Flee ending. Stage 5 can use `if: [knows_truth]` / `else` blocks within a single Confront ending scene, or separate `act3_confront_bad` and `act3_confront_morning` as distinct branches. Recommended: separate branch for `act3_confront_bad` → its own ending scene.

**NPCs:** 祭壇の気配 (background; does not leave)

---

## Scene 17h: `act3_confront_morning`

**Purpose:** **Ending: 向き合う (good).** Dawn. Satomi has been awake all night. She is sitting in the garden with tea. The garden is still overgrown. The corridor is still wrong — she measured it again at 3am; it is still wrong. The house is quiet in a way it hasn't been since she arrived.

Two missed calls from Ryan: 6:00am and 6:14am. He heard the voicemail. He called anyway. He is that kind of person. The narrator notes this.

If `called_ryan` not set: he texted instead. 「連絡して。心配してる。」Sent at 6:20am.

She misses her flight. This is fine.

Satomi calls Ryan back. He answers. What she tells him varies; how he responds does not: he books the Thursday flight without complaint. He does not ask follow-up questions about the corridor.

**Text blocks (narration variants):**
- `composure` ≤ 3: dawn not calm — garden doesn't resolve, tea is the only steady thing.
- `composure` ≥ 7: dry and collected; ready to field this call.
- `confront_undo` set (ending register): "ここにいたものは、今はどこかよそにある。それがよいことかどうかは、彼女にはわからない。" The house is quieter, not resolved.
- `confront_undo` not set (completion register): "ここにいたものは、長い間何かを待っていた。それが届いた。" Settled quality. Not peaceful. Settled.

**Choices:**
- 「全部話す」 — tell Ryan most of it (he is silent longer than usual; then books Thursday) | → `act3_confront_ending`
- 「何も話さない」 — tell him nothing ("思ったより時間がかかった") | → `act3_confront_ending`
- 「廊下だけ話す」 — only: the corridor is still wrong but everything else is fine ("わかった" — he books Thursday without asking what that means) | → `act3_confront_ending`

**Convergent group:** all three → `act3_confront_ending`. Ryan books the Thursday flight in every variant. He does not ask about the corridor.

**NPCs:** none (Ryan by phone — answers; does not appear)

---

## Scene 17i: `act3_confront_ending`

**Purpose:** The story ends. Satomi in the garden, phone in her lap, Ryan has booked the flight. The house is behind her. The garden creature is still in the bamboo — she can hear it occasionally.

**Text blocks:**
- Narrator: varies by `confront_undo` flag as specified in morning scene.
- Satomi (inner): she notes the corridor is still wrong. She will mention this to the estate agent. He will not be surprised.

**Choices (single exit):**
- 「庭にいる」 — sit in the garden | → Ending: 向き合う

**NPCs:** none (garden creature — heard, not seen)

---

## Scene 17j: `act3_embrace_entry`

**Purpose:** Satomi does not walk to the car. She walks back through the entrance and sits down in the main corridor — on the floor, her bag beside her. This is not dramatic. It is the most natural thing she has done since arriving.

The narrator, for the first time, shifts register — not what she does but what she understands. Her inner voice goes very quiet. Then: 「ああ。だからここに来たんだ。」

She doesn't mean the inheritance. She means something she cannot explain in a text message and will not try to. The house makes the sound a house makes when someone who belongs in it sits down. She hears it.

No choice here — this is recognition, not deliberation. The player watches Satomi arrive at understanding.

**Text blocks:**
- Narrator (shifted register — more interior): the quality of Satomi sitting down. The house's response. What she understands.
- Satomi (inner): 「ああ。だからここに来たんだ。」

**Choices (single exit → `act3_embrace_call`):**
- 「座っている」 — sit with it | effects: none

**NPCs:** none (the house is present in the way that it is)

---

## Scene 17k: `act3_embrace_call`

**Purpose:** **Ending: 受け入れる.** Satomi calls Ryan. He answers on the third ring — late afternoon in London. She sounds completely normal.

「ねえ、家について話があるんだけど。」
"Okay."
「荷物を少し送ってくれる？」
"...Which things?"
「あとでリストを送るよ。急がなくていいから。」
Quiet. Then: "Is the house nice?"

Satomi looks at the corridor — still wrong — the ceiling where the domesticated creature has resettled — the garden where something tended the bamboo — and says: 「うん。好きになってきた。」

The story ends here, in the middle of the call. The narrator describes what the house sounds like when it understands someone is staying. Her inner voice composes a list — not of things to sort, for once, but of things she has to tell him eventually. She puts them in order of how alarming they are. She starts with the corridor, because it is the most explainable. She is still laughing quietly at something Ryan says when the story ends. We don't hear what he said.

**Text blocks:**
- Narrator: the house's sound when it understands. The list-making.
- Satomi (inner): the list, ordered by alarmingness.
- Ryan (narrator reads): brief lines as noted above — Ryan's voice is the sound of the ordinary world.

**Choices (single exit):**
- 「電話中——」 — still on the call | → Ending: 受け入れる

**NPCs:** none (Ryan by phone — answers; does not appear in person)

---

## Act 3 Scene Count: 10 primary scenes (+ sub-branches). Player sees 4–6 per run.

---

## Act 3 Flag/Stat Summary

**Set in Act 3:**
- `called_ryan` — set in `act3_ryan_voicemail`. `composure` +1 on set. Shapes voicemail register and Confront morning narration.
- `confront_undo` — set in `act3_confront_undo` (or `act3_confront_reread` → undo). Used for narration branching in Confront ending. Not set in Complete path.

**Read-only in Act 3:**
- `found_altar`, `heard_name`, `saw_face`, `knows_truth`, `accepted` — read at `act3_moment_of_choice` to determine which endings are visible.
- `curiosity` — read-only; no changes.
- `composure` — +1 from `called_ryan`; otherwise read-only.

---

## Ending Accessibility Matrix

| Flags / Stats | Flee | Confront-good | Confront-bad | Embrace |
|---|---|---|---|---|
| No `found_altar` | Forced | Invisible | Invisible | Invisible |
| `found_altar` only | ✓ | Greyed | Greyed (can force) | Hidden |
| `found_altar` + `saw_face` + `curiosity` ≥ 6, no `knows_truth` | ✓ | Greyed (forceable → bad) | via forced greyed 向き合う | Hidden |
| `found_altar` + `saw_face` + `knows_truth` + `curiosity` ≥ 6 | ✓ | **✓ (Confront-good)** | not triggered | Hidden |
| All above + `accepted` + `heard_name` + `curiosity` ≥ 7 | ✓ | ✓ | not triggered | **✓** |

---

## Validation Notes

- 4 endings total: Flee (bittersweet), Confront-good (resolved), Confront-bad (incomplete, haunting follows), Embrace (secret). ✓
- Flee: always available, no gate. ✓
- Confront-good: `knows_truth` + `saw_face` + `curiosity` ≥ 6, greyed if not met. ✓
- Confront-bad: player selects greyed 向き合う without `knows_truth` — deliberate push through incomplete choice. ✓
- Embrace: `accepted` + `found_altar` + `heard_name` + `saw_face` + `curiosity` ≥ 7, **hidden** if not met. ✓
- Forced Flee: `found_altar` not set → Confront/Embrace invisible, narrator note. ✓
- Tanaka call: single scene `act3_tanaka_call`, hidden if `met_neighbour` not set. Not a hub. ✓
- Ryan calls: voicemail at `act3_ryan_voicemail` (before choice), live call in `act3_confront_morning` (after Confront). Two separate scenes; no duplication. ✓
- `called_ryan` distinguishes the two Ryan interactions. ✓
- `confront_undo` used only for `if`/`else` narration in Confront morning and ending scenes. ✓
- No hubs in Act 3. Every scene leads forward. ✓
- No scene exceeds 4 active choices. ✓
- All text in Japanese. ✓
- Creatures: no dialogue, physical only. ✓
- Voice prefixes: narrator (none/default), Satomi inner (`japanese_female_adult_japanese_cheerful_clear:`), Kimura (`japanese_male_adult_japanese_serious_clear_measured:`), Tanaka (`japanese_male_midlife_japanese_mature_deep_intriguing:`), altar presence (narrator, no prefix, single word さとみ). Ryan (narrator reads). ✓
- Single-choice forced transitions justified at: `act3_ryan_voicemail` (voicemail → decide), `act3_flee_departure` (leaving is the decision), `act3_flee_aftermath` (dream as ending punctuation), `act3_confront_complete`/`undo` (resolution → tea), `act3_confront_bad` (incomplete action → consequence), `act3_embrace_entry` (witness to recognition), `act3_embrace_call`/`act3_confront_ending` (ending reception). All are aftermath or punctuation, not gatekeeping. ✓
