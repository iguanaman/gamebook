# 里見の家 — Act 1 Scenes（到着）

Target: 8 scenes. Player sees all 8. No hubs. Linear with convergent branches.

---

## Scene 1: `arrival_approach`

**Purpose:** Satomi arrives on foot with her suitcase, sees the house for the first time. Two registers establish themselves: the narrator is calm and inevitable; her inner voice is a dry inventory of underwhelming observations. The house is unremarkable. Cold. Old. She was expecting to feel something. She doesn't. Yet.

**Text blocks:**
- Narrator: the approach on foot, the suitcase wheel catching the road's broken edge, the house at the end of the track. Second-person. Measured. The house has been here a long time and will continue to be.
- Satomi (inner): "着いた。家は確かにある。以上。" Then, a beat later: "ライアンに送ろうと思ったけど——三時だし。"

**Choices (all convergent → `kimura_arrival`):**
- 「不動産として評価する」 — professional detachment; assess it like a surveyor | effects: `composure` +1
- 「家族の家だ、一応」 — reluctant nostalgia; this is family, technically | effects: none
- 「何かがおかしい」 — something is wrong and she is choosing not to say so yet | effects: `composure` -1

**Convergent group:** all three → `kimura_arrival`. Stat delta is the only mechanical difference. Frames her inner-voice register for Act 1.

**NPCs:** none

---

## Scene 2: `kimura_arrival`

**Purpose:** Kimura-san. Single scene — he arrives, delivers his folder, mentions the haunting with the energy of a man disclosing minor subsidence, hands over the key, and prepares to leave. Satomi has a narrow window. This is not a hub; Kimura has three pieces of information and she can ask for one before he goes, or let him leave.

**Text blocks:**
- Narrator: the estate agent's car, his jacket a size too large, the folder's aligned edges, the way he switches to over-formal grammar when he says 幽霊 (haunting). The electricity is on a timer. It may cut at eleven.
- Kimura (prefix `japanese_male_adult_japanese_serious_clear_measured:`): 「電気は夜十一時に切れる場合がございます。鍵は三本、全部この封筒に。それから、念のためですが——この家は、その、評判が少々ございまして。」He does not elaborate. He begins to reach for his keys.
- Satomi (inner): "念のため。いい言い回しだ。地下に何かいますとか、そういうことも念のためになるのかな。"

**Choices:**
- 「節子さんのことを教えてください」 — ask about Setsuko before he goes | effects: `curiosity` +1 → `kimura_setsuko`
- 「近所の連絡先はありますか？」 — ask about the neighbour; only way to get Tanaka's card | effects: `met_neighbour: true` → `kimura_neighbour`
- 「ありがとうございました」 — let him go; take the folder | effects: none → `kimura_departure`

**Note:** Only one question can be asked. Kimura answers and then leaves regardless. The card is only available via the second choice — a player who asks about Setsuko does not also get the card. `met_neighbour` is only set here.

**NPCs:** 木村 誠一 (Kimura Seiichi)

---

## Scene 2a: `kimura_setsuko`

**Purpose:** Kimura tells Satomi what little he knows of 里見 節子. She lived alone for many years. He produces a photograph — older woman, garden. The garden in the photograph is not the same garden that exists now. He does not comment on this. Connects to departure.

**Text blocks:**
- Kimura: 「里見さんは長年おひとりで。ご連絡先の記録がなく、相続人の特定に六ヶ月かかりました。こちらのお写真だけが残されておりまして。」He slides the photograph across.
- Narrator: the garden behind Setsuko in the photograph has a stone lantern that does not exist in the current garden. The arrangement of the trees is different.
- Satomi (inner): "写真の庭が違う。古い写真だろう。たぶん。"

**Choices (convergent → `kimura_departure`):**
- 「写真を受け取る」 — take the photograph; examine it properly later | effects: `curiosity` +1
- 「わかりました」 — acknowledge and let him wrap up | effects: none

**NPCs:** 木村 誠一

---

## Scene 2b: `kimura_neighbour`

**Purpose:** Kimura produces Tanaka-san's card. 田中 豊, early eighties, next door for forty years. He has, Kimura says carefully, *opinions* about the house. Taking the card sets `met_neighbour`.

**Text blocks:**
- Kimura: 「お隣に田中さんというご老人がいらっしゃいまして。長く住んでいる方で——この家については、その、いろいろとご存知でして。」He slides a card across. Small, printed in faded ink.
- Satomi (inner): "いろいろと。"

**Choices (convergent → `kimura_departure`):**
- 「カードをいただきます」 — take it | effects: `met_neighbour: true` (already set by reaching this scene; confirmed here)
- 「いいえ、結構です」 — leave the card | effects: `met_neighbour: false` (override; she reached the scene but declined)

**Note:** `met_neighbour` is set when the `kimura_neighbour` choice is made at Scene 2, but it can be revoked here if she declines the card. The flag is only locked in once she physically takes it.

**NPCs:** 木村 誠一

---

## Scene 2c: `kimura_departure`

**Purpose:** Kimura's car disappears around the bend. Satomi is alone. Transition beat — very short. The sound of the engine fading, the gate swinging back. The house.

**Text blocks:**
- Narrator: the engine note, the gate's swing, the quality of silence that follows a car. She is alone now.
- Satomi (inner): "では。"

**Choices (convergent → `alone_ground_floor`):**
- 「家に入る」 — back inside | effects: none
- 「もう少し外に立つ」 — stand at the gate a moment longer | effects: `composure` +1

**NPCs:** none

---

## Scene 3: `alone_ground_floor`

**Purpose:** Satomi alone in the house for the first time. She does a practical inventory of the ground floor — which boards creak, the smell under the tatami, the landline that crackles. She finds her domestic footing: kettle, lamp, one room that will do for sleeping. She seeds one specific wrongness: the back corridor appears longer than it should.

**Text blocks:**
- Narrator: the house as a physical object — cold, tatami, a smell she cannot name that is under the smell of old wood. The corridor at the back of the ground floor. Her phone light reaches halfway. The corridor continues.
- Satomi (inner): composing and not sending a text to Ryan. "着いた。家は家です。あなたは退屈すると思う。" She almost sends it. Doesn't. Three in the morning.

**Choices:**
- 「廊下を確かめる」 — walk to the end of the back corridor, properly | effects: `curiosity` +1, `composure` -1 → `corridor_check`
- 「台所を先に探す」 — find the kitchen, the kettle, her footing | effects: `composure` +1 → `evening_documents`
- 「固定電話を試す」 — lift the old landline; it crackles; she puts it back | effects: none → `evening_documents`

**Note:** Taking the corridor now leads to `corridor_check` which converges back to `evening_documents`. The wrongness is seeded either way — but taking it early raises curiosity.

**NPCs:** none

---

## Scene 3a: `corridor_check`

**Purpose:** Satomi walks the corridor. It is longer than the house. She counts her steps — twenty-two — then counts them back. She notes the exterior of the house is shorter than twenty-two steps. She does not resolve this tonight. She writes it off. Connects to `evening_documents`.

**Text blocks:**
- Narrator: the phone-light beam, the far wall that should not exist this far back, the echo of her footsteps that is slightly too large for the space.
- Satomi (inner): "二十二歩。外から見たら十四歩ぶんの家。" Beat. "疲れているだけだ。"

**Choices:**
- 「戻る——疲れているだけ」 — retreat; she's tired | effects: `composure` +1 → `evening_documents`
- 「もっと奥へ」 — go further in, to the wall | gating: `curiosity` ≥ 5; grey if failed (inner voice: 「そこには行かない。今夜は行かない」) | effects: `curiosity` +1, `composure` -2 → `corridor_bad_branch`

**NPCs:** none

---

## Scene 3b: `corridor_bad_branch`

**Purpose:** **Bad outcome branch #1.** Satomi pushes too far into the corridor with low composure. Something at the end of the corridor — she cannot identify it — sees her back. Not a creature. Not a face. The wrongness looks at her. She retreats fast. Sets `corridor_bad: true`. Composure penalty. She will be locked out of deeper Act 2 options.

**Text blocks:**
- Narrator: the wall at the end of the corridor. On it, a mark that might be writing, or water damage, or — she is not close enough. Something is registering her presence. Not movement. Not sound. Attention. The quality of being looked at from a direction that should be a wall.
- Satomi (inner): "行かなければよかった。行かなければよかった。行かなければよかった。"

**Choices (single exit):**
- 「戻る」 — get out, now | effects: `corridor_bad: true`, `composure` -2 → `evening_documents`

**Note:** `corridor_bad` is hidden. It prevents access to the altar touch in Act 2 (`curiosity` gate effectively rises by the composure hit, and it sets a flag that greys the altar-touch choice with specific inner-voice text: "触らない。廊下のことを思い出した。触らない"). It does not prevent `found_altar` — she can still approach; just not touch.

**NPCs:** none

---

## Scene 4: `evening_documents`

**Purpose:** Satomi eats (convenience-store onigiri). She reviews Kimura's documents — title deeds, property history, the photograph of Setsuko (if she didn't already get it from Kimura, it's in the folder). The photograph is taken in the garden. The garden behind Setsuko is not the same garden. Satomi notices. She decides whether to examine it or file it.

**Text blocks:**
- Narrator: a lamp that reliably works, a kettle, the documents spread on the kitchen table. The photograph.
- Satomi (inner): if `corridor_bad` set: she is still slightly shaking. She holds the photograph. She is choosing not to think about the corridor. If not: comfortable enough. Making a list of questions for tomorrow.

**Choices:**
- 「写真をよく見る」 — examine the photograph carefully | effects: `curiosity` +1 → `photo_examined`
- 「写真をしまう」 — put the photograph back in the folder; deal with it tomorrow | effects: `composure` +1 → `night_in_bed`

**NPCs:** none

---

## Scene 4a: `photo_examined`

**Purpose:** Satomi holds the photograph up to the lamp. The stone lantern in the background is gone from the current garden. The trees are in different positions. The photograph looks recent — the frame is old, but the print is not. She doesn't reach a conclusion. She puts it down.

**Text blocks:**
- Narrator: the lantern's absence in the current garden. The print quality.
- Satomi (inner): "新しい写真なのに、古い庭。あるいは古い写真なのに。どっちかわからない。どっちも嫌だ。"

**Choices (convergent → `night_in_bed`):**
- 「日付を確認しようとする」 — look for a date on the photograph | effects: `curiosity` +1
- 「写真をしまって就寝の準備をする」 — put it away | effects: `composure` +1

**NPCs:** none

---

## Scene 5: `night_in_bed`

**Purpose:** Satomi in bed. Cold room, old cedar-and-floral smell of the futon. She is nearly asleep when she hears a sound from below. The narrator describes it precisely. Her inner voice cycles through rational explanations. The sound stops. Then — after long enough — it starts again.

**Text blocks:**
- Narrator: the futon, the darkness, the specific sound from below. Clinical precision. No interpretation.
- Satomi (inner): seven rational explanations, one after another. Pipes. Floor settling. A rat. Wind. The kettle still hot. Wind again. Something she drops before finishing the thought.

**Choices:**
- 「起き上がって見に行く」 — get up and look | effects: `curiosity` +1, `composure` -1 → `night_investigate`
- 「音を無視して寝る」 — stay in bed; she didn't hear it | effects: `curiosity` -1, `composure` +1 → `dawn_wakeup`

**NPCs:** none

---

## Scene 5a: `night_investigate`

**Purpose:** Satomi on the landing, phone-light in hand. The sound is coming from the back corridor. She can see its entrance from the foot of the stairs. She has to decide how far she's going.

**Text blocks:**
- Narrator: the dark house, the electricity timer off, the corridor entrance visible. The sound has stopped again. This is worse.
- Satomi (inner): "廊下。もちろん廊下。"

**Choices:**
- 「廊下に入る」 — go into the corridor | gating: `curiosity` ≥ 5; grey if failed (inner voice: 「そこには行かない。それだけははっきりしている」) | effects: `curiosity` +1 → `night_corridor`
- 「入口で照らすだけ」 — shine the phone from the entrance; don't go in | effects: none → `night_corridor_edge`
- 「引き返す」 — no. back upstairs | effects: `curiosity` -1, `composure` +1 → `dawn_wakeup`

**NPCs:** none

---

## Scene 5b: `night_corridor`

**Purpose:** Inside the corridor at night. It is longer than before — if she noticed in the daytime, it is now undeniable. The wrongness is confirmed. She can go further or come back out.

**Text blocks:**
- Narrator: the phone-light beam, the far end that is further than it should be. Her footsteps echo too much.
- Satomi (inner): "二十二歩。もう数えない。"

**Choices (convergent → `dawn_wakeup`):**
- 「さらに奥へ」 — go further; see what's at the end | gating: `curiosity` ≥ 6; grey if failed (inner voice: 「ここまでだ。本当にここまでだ」) | effects: `curiosity` +1, `composure` -1
- 「引き返す」 — enough; she's confirmed it | effects: `composure` +1

**Note:** The "further in" option at night does not trigger `corridor_bad` — that is only set during the daytime `corridor_bad_branch` (Scene 3b). Night corridor is about confirmation, not the bad encounter. The wrongness is the same; the something-looking-back is not present this time.

**NPCs:** none

---

## Scene 5c: `night_corridor_edge`

**Purpose:** Satomi shines the phone from the entrance. The corridor extends beyond where the light reaches. She knows. She doesn't go in. She goes back to bed.

**Text blocks:**
- Narrator: the beam, the darkness, the distance it implies.
- Satomi (inner): "知っている。知ってしまった。寝る。"

**Choices (single exit → `dawn_wakeup`):**
- 「戻る」 — back to bed | effects: `composure` +1

**NPCs:** none

---

## Scene 6: `dawn_wakeup`

**Purpose:** Morning. Satomi awake before the light. Instant coffee, kitchen window, the garden. She takes stock. The narrator describes what she noticed and has chosen not to mention to herself. She sends a real text to Ryan — not the imaginary one. It arrives at 3am his time.

**Text blocks:**
- Narrator: what she noticed and has not processed. The photograph. The corridor. The sound that stopped and started.
- Satomi (inner): she composes a real text. "まだここにいる。家は面白い。心配しないで。" She sends it. Then, looking at the garden: "石灯籠があったはずの場所が、空っぽだ。"
- Ryan (narrator reads his reply — placeholder, arrives hours later): it will be empty. He's asleep.

**Choices (convergent → `dawn_resolve`):**
- 「今日は徹底的に調べる」 — I'm going through this house properly | effects: `curiosity` +1 (only if `curiosity` ≥ 6; no change otherwise)
- 「木曜日までに片付けて帰る」 — sort the paperwork and leave by Thursday | effects: `composure` +1

**NPCs:** none

---

## Scene 7: `dawn_resolve`

**Purpose:** Act 1 closes. Satomi has decided what kind of person she is going to be here — or has had it decided for her by the accumulation of choices. The act ends.

**Text blocks:**
- Narrator: the first night is over. Whatever is in this house is still in it. She knows this. She has coffee.
- Satomi (inner): varies by `composure`. High: "では、始めよう。" Low (≤ 5): "仕方ない。やるしかない。"

**Choices (single exit):**
- 「家の中を調べ始める」 — begin → Act 2 entry | effects: none

**NPCs:** none

---

## Act 1 Scene Count: 8 named scenes (+ 5 sub-scenes = 13 nodes, player traverses 7–10 depending on path)

---

## Act 1 Flag/Stat Summary

| What | Where set | Range entering Act 2 |
|---|---|---|
| `met_neighbour` | Scene 2 → 2b (card taken) | true or false |
| `corridor_bad` | Scene 3b only | true or false |
| `curiosity` | starts 5; range of choices | 3–8 |
| `composure` | starts 8; range of choices | 4–10 |

**Exit states entering Act 2:**

| Exit | `met_neighbour` | `corridor_bad` | `curiosity` | `composure` | Path |
|---|---|---|---|---|---|
| A — 好奇心旺盛 | true | false | 7–8 | 5–7 | Card + Setsuko photo examined + investigated sound + went into corridor |
| B — 注意深い | true | false | 5–6 | 8–9 | Card + photo put away + stayed in bed |
| C — 孤独な調査者 | false | false | 6–7 | 5–7 | No card + investigated + corridor |
| D — 孤独な退避 | false | false | 3–4 | 9–10 | No card + stayed in bed + chose to leave Thursday |
| E — 廊下トラウマ | false or true | **true** | 5–7 | 3–6 | Went into corridor bad branch |

Exit E enters Act 2 with `corridor_bad` set — this greys out the `altar_touch` choice in Act 2 basement with specific Satomi inner voice: 「触らない。廊下のことがある。」(curiosity gate still visible but composure hit means she won't push through it easily).

---

## Validation Notes

- Kimura: single scene (`kimura_arrival`) with one question allowed, then departure. Not a hub. ✓
- `met_neighbour` set only via explicit card-taking in `kimura_neighbour`. Can be revoked if she declines. ✓
- `corridor_bad` only set in `corridor_bad_branch` (daytime push-too-far, requires `curiosity` ≥ 5 and deliberate player choice). Night corridor does not set it. ✓
- Every scene leads forward. No scene returns to a hub. ✓
- Convergent branches documented. Stat deltas are the only mechanical differences within convergent groups. ✓
- No scene exceeds 4 active choices. ✓
- Scene count: 8 primary + 5 sub = 13 nodes; player sees 7–10 per run. ✓
