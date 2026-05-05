# 里見の家 — Act 2 Scenes（発見）

Target: 14 scenes. No hubs. Rooms visited in a fixed sequence with branching within each room; all branches converge forward. Rooms: study → kitchen → garden. After rooms: altar (basement). Tanaka phone call is a single scene, placed after garden.

Player sees approximately 7–10 of these nodes per run.

---

## Room Order

Act 2 moves linearly through: **study → kitchen → garden → (Tanaka call if `met_neighbour`) → altar descent.** Within each room, choices branch and converge. No returning to a hub between rooms — each room's exit scene leads directly into the next.

---

## Scene 8: `study_entry`

**Purpose:** The study. Papers stacked, cross-referenced, annotated — Setsuko was organised under pressure. The creature is here: too many fingers, arranged wrongly, absorbed in a notebook on the lower shelf. It has not noticed Satomi. The narrator describes it with clinical precision. Satomi's inner voice says nothing, which is unusual.

**Text blocks:**
- Narrator: the ordered desk, Setsuko's cramped handwriting in the margins of land records, the creature on the lower shelf — two sets of fingers turning pages simultaneously, cross-referencing. Disapproval-click at something in the text.
- Satomi (inner): nothing. The silence is noted.

**Choices:**
- 「静かに観察する」 — watch the creature quietly | effects: `curiosity` +1, `composure` -1 → `study_creature_observe`
- 「書類を読む」 — ignore the creature; go straight to the desk | effects: none → `study_documents`
- 「そっと引き返す」 — back out quietly | effects: `composure` +1 → `study_retreat`

**NPCs:** 多指の読者 (The Many-Fingered Reader — creature, no dialogue)

---

## Scene 8a: `study_creature_observe`

**Purpose:** Satomi watches. The creature manages its reading with two sets of fingers — cross-referencing across two open notebooks. The disapproval-click again. It turns, and now it sees her. It manages this badly: fumbles the notebook (it falls), looks at her with eyes arranged in the wrong order, then squeezes out through a gap in the shelving that should not fit it. With considerable dignity. It leaves a bookmark — a pressed leaf, very old. The narrator notes it was reading Setsuko's notebook.

**Text blocks:**
- Narrator: the fumble, the recovery that doesn't work, the gap in the shelving. The pressed-leaf bookmark on the floor.
- Satomi (inner): "すみません、と言うべきだったかもしれない。"

**Choices (convergent → `study_documents`):**
- 「栞を手に取る」 — pick up the bookmark | effects: `curiosity` +1
- 「そのまま書類へ」 — leave it; go to the notebook | effects: none

**NPCs:** none (creature has left)

---

## Scene 8b: `study_retreat`

**Purpose:** Satomi backs out of the study. She stands in the corridor. The creature, presumably, is still in there. She is going to have to go back. She adds "study" to the list and goes to the kitchen first.

**Text blocks:**
- Narrator: the corridor. The study door closing behind her.
- Satomi (inner): "台所から始めよう。"

**Choices (single exit → `kitchen_entry`):**
- 「台所へ先に行く」 — kitchen first; come back | effects: none

**Note:** `study_retreat` skips the study documents and routes directly to the kitchen. On this path `knows_truth` cannot be set (it requires `study_documents` + `kitchen_examined`). This reaches the kitchen, then garden, then altar — without the study layer of information. The Confront ending will be blocked.

**NPCs:** none

---

## Scene 8c: `study_documents`

**Purpose:** Setsuko's papers. Land records, a hand-drawn floor plan that includes a room Satomi cannot locate on the ground floor, and the notebook. Setsuko was researching the house's history going back past the Meiji era — not performing anything. She was studying an arrangement. This is the first half of `knows_truth`. Sets `study_read` flag internally.

**Text blocks:**
- Narrator: the floor plan with its impossible room. The land records annotated in Setsuko's margin-note style. The notebook — oblique, dense, words like 「管理者」and 「義務」used without definition.
- Satomi (inner): "義務。節子さんは何に対して義務があったの？"

**Choices:**
- 「丁寧に読む」 — read carefully; two notebooks, full context | effects: `curiosity` +1, sets `study_read: true` → `study_deep`
- 「ざっと確認する」 — skim; note the key points | effects: none → `study_return` (partial; `study_read` not set; `knows_truth` cannot be completed)
- 「間取り図を撮影する」 — photograph the floor plan on her phone | effects: `curiosity` +1 → `study_deep` (routes same; she takes the photo and reads)

**NPCs:** none

---

## Scene 8d: `study_deep`

**Purpose:** Satomi reads closely. The house stands on something older than the house. The arrangement Setsuko was maintaining is described in terms Satomi can partly decode — enough to understand the shape, not the details. She now has half the picture. The second half requires the kitchen. If `kitchen_examined` is already true (impossible in forward order; this is first), `knows_truth` will trigger in the kitchen. If this path is reached after kitchen (impossible in this linear order), `knows_truth` triggers here.

**Text blocks:**
- Narrator: the depth of Setsuko's research — decades of record-keeping, a system that implies continuity across generations. The arrangement is not a ritual. It is maintenance.
- Satomi (inner): "継続。誰かが続けていた。節子さんの前にも誰かが。"

**Choices (convergent → `study_return`):**
- 「メモを書き留める」 — write her own notes | effects: `curiosity` +1
- 「十分だ」 — enough for now | effects: none

**NPCs:** none

---

## Scene 8e: `study_return`

**Purpose:** Satomi closes the study door. The corridor. She is going to the kitchen. Sets `visited_study`.

**Text blocks:**
- Narrator: she closes the door. The corridor. Behind her, nothing moves.
- Satomi (inner): "台所へ。"

**Choices (single exit → `kitchen_entry`):**
- 「台所へ」 — move on | effects: `visited_study: true`

**NPCs:** none

---

## Scene 9: `kitchen_entry`

**Purpose:** The kitchen. Clean — not museum-clean, functionally clean, within days. The creature on the ceiling: large, distributed wrongly, clearly a long-term resident. It flinches when Satomi closes the door behind her. Recovers. Goes very still. The stillness is worse.

**Text blocks:**
- Narrator: the counter — she runs a finger along it, nothing. The ceiling creature's arrangement shifts slightly as she enters. The flinch. The recovery of stillness.
- Satomi (inner): "誰かがこの台所を最近掃除した。その誰かが天井にいる。"

**Choices:**
- 「冷蔵庫を開ける」 — open the refrigerator | effects: none → `kitchen_fridge`
- 「天井に話しかける」 — speak to the ceiling creature | effects: `composure` -1 → `kitchen_creature`
- 「棚を確認する」 — check the cupboards | effects: none → `kitchen_cupboards`

**NPCs:** 天井の住人 (The Ceiling Dweller — creature, no dialogue)

---

## Scene 9a: `kitchen_fridge`

**Purpose:** Three items: homemade umeboshi labelled in Setsuko's handwriting (date, salt ratio), a can of Satsuma beer (discontinued 1987 — Satomi's father drank it), and something she declines to identify. The umeboshi label is recent. Six months ago. After Setsuko died. This is the second half of `knows_truth`. Sets `kitchen_examined: true`. If `study_read` is true, sets `knows_truth: true`.

**Text blocks:**
- Narrator: the label's handwriting. The date. The arithmetic — six months ago, possibly less.
- Satomi (inner): "六ヶ月前。節子さんが死んで——六ヶ月前？" Then: "梅干しを漬けた。ラベルを貼った。冷蔵庫にしまった。" A pause. "なぜ？"
- If `knows_truth` triggered: inner voice shifts: "わかった。管理者。義務。——わかった。"

**Choices (convergent → `kitchen_return`):**
- 「瓶を手に取る」 — pick up the umeboshi jar, hold it | effects: `curiosity` +1, sets `kitchen_examined: true` (and `knows_truth` if `study_read`)
- 「缶ビールを手に取る」 — pick up the beer can (different inner-voice beat — her father; discontinued 1987) | effects: `curiosity` +1, sets `kitchen_examined: true` (and `knows_truth` if `study_read`)
- 「そっと閉める」 — close it; don't engage | effects: `composure` +1 (kitchen_examined NOT set; `knows_truth` cannot complete)

**NPCs:** 天井の住人 (ceiling, watching with apparent indifference)

---

## Scene 9b: `kitchen_creature`

**Purpose:** Satomi speaks to the ceiling. Excuse me, or こんにちは, or something more absurd. The creature turns — more joints than expected. It does not answer. The flinching stops. Something in the room changes register: the creature is no longer frightened of her. This does not make her feel better exactly, but the fear was becoming contagious.

**Text blocks:**
- Narrator: the turn, the joints, the stillness that follows. The quality of its listening — tilt, attention, the sense of being noted.
- Satomi (inner): "怖くなくなった。私のことが怖くない。それで私は怖い。"

**Choices:**
- 「話し続ける」 — keep talking; fill the silence | effects: `composure` -1 → `kitchen_creature_extended`
- 「冷蔵庫へ」 — that's enough; go to the fridge | effects: none → `kitchen_fridge`
- 「棚を調べる」 — check the cupboards instead | effects: none → `kitchen_cupboards`

**NPCs:** 天井の住人

---

## Scene 9c: `kitchen_creature_extended`

**Purpose:** Satomi tells the ceiling creature she inherited the house. She's not planning to stay. She found the beer. The creature listens in the way that something approximates listening. It makes no interpretable response. When she stops talking, the room is quieter than before. She goes to investigate.

**Text blocks:**
- Narrator: the quality of the ceiling creature's attention. The room when she stops.
- Satomi (inner): "何かが変わった。何かがわかった。私が何をわかったのかは、まだわからない。"

**Choices (convergent → `kitchen_fridge`):**
- 「冷蔵庫を調べる」 — fridge | effects: none
- 「棚を先に」 — cupboards first | effects: none → `kitchen_cupboards` (which then proceeds to `kitchen_return`)

**NPCs:** 天井の住人

---

## Scene 9d: `kitchen_cupboards`

**Purpose:** Dishes, dry goods from the wrong era, a glass warmer than it should be. And on one shelf: a small folded note in Setsuko's handwriting. 「台所のことはわかっている。」Not addressed to anyone. Or to the house.

**Text blocks:**
- Narrator: the glass, its warmth. The note.
- Satomi (inner): 「台所のことはわかっている。」 Beat. "誰に書いた？"

**Choices (convergent → `kitchen_return`):**
- 「メモを持ち帰る」 — take the note | effects: `curiosity` +1
- 「メモを戻す」 — put it back where she found it (the replacing feels stranger than taking it) | effects: none

**NPCs:** 天井の住人 (background)

---

## Scene 9e: `kitchen_return`

**Purpose:** Satomi back in the corridor. Kitchen done. Sets `visited_kitchen`. The kitchen was the least frightening room. She doesn't know what to do with that.

**Text blocks:**
- Narrator: the corridor. The kitchen door behind her.
- Satomi (inner): "怖くなかった。一番怖くない部屋だった。なのに、一番変だった。"

**Choices (single exit → `garden_entry`):**
- 「庭へ」 — go to the garden | effects: `visited_kitchen: true`

**NPCs:** none

---

## Scene 10: `garden_entry`

**Purpose:** The garden in daylight. Overgrown but not abandoned — something has been tending it without caring what it looks like to a human. Stone water basin to the left. Path to the back wall where bamboo has gone through the stone. In the corner: disturbed ground. And the creature — low, fast, too many legs in the wrong arrangement — sees her the moment she sees it. They both freeze.

**Text blocks:**
- Narrator: the logic of what has grown where, the bamboo through the wall, the disturbed ground in the corner. The creature. Its many legs and their wrong arrangement.
- Satomi (inner): "なんか、あそこにいる。"

**Choices:**
- 「じっとしている」 — hold still; let the creature decide | effects: none → `garden_standoff`
- 「近づく」 — step toward it | effects: none → `garden_creature_flee`
- 「掘り返した地面へ」 — ignore the creature; go to the disturbed ground | effects: `curiosity` +1, `composure` -1 → `garden_ground`

**NPCs:** 疾走者 (The Sprinter — creature, no dialogue)

---

## Scene 10a: `garden_standoff`

**Purpose:** They look at each other. The creature is socially overwhelmed — wants to leave, cannot decide how without acknowledging it needs to. Several false starts. Finally it takes a sideways path around the far edge of the garden into the bamboo, with enormous effort at nonchalance. Satomi watches it go.

**Text blocks:**
- Narrator: the false starts, the sideways exit, the bamboo closing behind it.
- Satomi (inner): "気まずかった。お互いに。"

**Choices:**
- 「竹の中を見る」 — follow it into the bamboo | gating: `curiosity` ≥ 5; grey if failed (inner voice: 「追いかけない。それは常識だ」) | effects: `curiosity` +1, `composure` -1 → `garden_bamboo`
- 「水盤へ」 — go to the stone basin instead | effects: none → `garden_basin`
- 「掘り返した地面へ」 — go to the disturbed ground | effects: `curiosity` +1 → `garden_ground`

**NPCs:** none (creature has departed into bamboo)

---

## Scene 10b: `garden_creature_flee`

**Purpose:** The creature bolts — fast, wrong direction, into a space that doesn't correspond to available geometry. Bamboo shakes. Stops. Satomi notes that it was frightened of her. She notes this as a fact.

**Text blocks:**
- Narrator: the speed, the direction, the bamboo.
- Satomi (inner): "怖がっていた。私のことが怖かった。" She finds this harder to process than she expected.

**Choices (convergent):**
- 「水盤へ」 — basin | effects: none → `garden_basin`
- 「掘り返した地面へ」 — disturbed ground | effects: `curiosity` +1 → `garden_ground`

**NPCs:** none

---

## Scene 10c: `garden_bamboo`

**Purpose:** Satomi pushes into the bamboo. The creature is there, a few metres in — sitting very still, hoping to be invisible. It clearly cannot believe she followed. It has run out of retreat. Up close its legs are more wrong than distance suggested. It makes a sound of resignation. On the way out, Satomi notices the bamboo stems nearest to where it sat have been cleaned — wiped, carefully, at eye level. Something has been tending this garden.

**Text blocks:**
- Narrator: the creature's stillness, the resignation sound. The cleaned bamboo stems — wipes, precise, eye level.
- Satomi (inner): "庭師だ。怖い庭師だ。"

**Choices:**
- 「水盤へ」 — basin | effects: none → `garden_basin`
- 「掘り返した地面へ」 — disturbed ground | effects: none → `garden_ground`

**Bad outcome branch #2 — touch/grab:**
- 「触ってみる」 — reach out and touch it | effects: `curiosity` +1, `composure` -2 → `garden_creature_touch_bad`

**NPCs:** 疾走者

---

## Scene 10d: `garden_creature_touch_bad`

**Purpose:** **Bad outcome branch #2.** Satomi touches the creature. It reacts badly — not aggressive but wrong in scale and speed, a panicked recoil that involves more of itself than she expected, and makes a sound that is not an animal sound and not a human sound. She backs away. Composure drops hard. The garden feels different.

**Text blocks:**
- Narrator: the recoil, the sound, the quality of the panic — something far larger in feeling than the creature's physical size. Then stillness. Then Satomi, hands at her sides, breathing.
- Satomi (inner): "触らなければよかった。触らなければよかった。触らなければよかった。" (Three times. Like the corridor.)

**Choices (single exit → `garden_return`):**
- 「庭を出る」 — get out of the garden | effects: `composure` -2

**Note:** This bad branch does not lock a flag but the composure hit (total -2 from approach + -2 here = -4) makes Act 2 altar touch extremely unlikely (inner voice becomes: 「祭壇には触らない。廊下のこと、庭のこと——触らない」). Routes to `garden_return` and then altar entry.

**NPCs:** none

---

## Scene 10e: `garden_basin`

**Purpose:** The stone water basin. Mossy, heavy. Something carved into the underside — she would have to get close to the ground to read it. The narrator notes it. Satomi's inner voice says she doesn't need to see it.

**Text blocks:**
- Narrator: the basin, its moss, its weight. The shadow underneath it.
- Satomi (inner): "裏に何か彫ってある。見なくていい。"

**Choices:**
- 「屈んで裏を読む」 — get down and read the underside | gating: `curiosity` ≥ 5; grey if failed (inner voice: 「暗い石の下に顔を突っ込まない」) | effects: `curiosity` +1, `composure` -1 → `garden_basin_carving`
- 「触らない——掘り返した地面へ」 — leave it; go to the disturbed ground | effects: `composure` +1 → `garden_ground`

**NPCs:** none

---

## Scene 10f: `garden_basin_carving`

**Purpose:** Satomi reads the underside. Carved into the stone: 里見. Her family name. This house should not know that name. The basin predates the Satomi connection to this property by at least a generation. She reads it twice. Stands up. The garden is the same garden. Nothing has changed. This is worse than something changing. Her inner voice is briefly, entirely silent.

**Text blocks:**
- Narrator: her family name, carved in stone, in a basin that is older than her connection to this house.
- Satomi (inner): silence. Then: "さとみ、という名前は、珍しくない。" She knows this is not the point.

**Composure -1 applied on arrival.** Does not set `heard_name` — reserved for the altar.

**Choices (convergent → `garden_ground`):**
- 「掘り返した地面へ」 — go to the disturbed ground | effects: none
- 「すぐに家に戻る」 — get back inside | effects: `composure` +1 → `garden_return` (skips the ground)

**NPCs:** none

---

## Scene 10g: `garden_ground`

**Purpose:** The corner. Disturbed soil — deliberate, not animal. The edge of something: lacquered, dark. A box.

**Text blocks:**
- Narrator: the shape of the disturbance. The box's edge, lacquered, partially visible.
- Satomi (inner): "箱だ。小さい。鍵がある。"

**Choices:**
- 「掘り出す」 — dig it up with her hands | effects: `curiosity` +1, `composure` -1 → `garden_dig`
- 「そのままにする」 — leave it where it is | effects: `composure` +1 → `garden_return`

**NPCs:** none

---

## Scene 10h: `garden_dig`

**Purpose:** Satomi digs. The soil is loose. The box is small, black lacquer, with a lock she doesn't have the key for. It rattles when moved. She holds it. She cannot explain what she does next: she puts it back and covers it. Mostly. She will tell herself she meant to bring it inside.

**Text blocks:**
- Narrator: the box in her hands, its rattle, the replacing.
- Satomi (inner): "持って入ろうと思ったけど——戻した。なぜ？"

**Choices (convergent → `garden_return`):**
- 「箱を持って家に入る」 — bring the box inside | effects: `curiosity` +1
- 「やっぱり戻す」 — put it back | effects: none

**NPCs:** none

---

## Scene 10i: `garden_return`

**Purpose:** Satomi back inside. Sets `visited_garden`. Wipes her hands on her jeans. The garden is the kind of wrong that is hard to file.

**Text blocks:**
- Narrator: the corridor. The garden door behind her.
- Satomi (inner): "庭師がいる。石に名前が彫ってある。箱がある。" Lists are how she manages things.

**Choices (single exit):**
- 「次へ」 — forward | effects: `visited_garden: true` → (if `met_neighbour`: `tanaka_call`) → (if not: `basement_entry`)

**NPCs:** none

---

## Scene 11: `tanaka_call` *(only if `met_neighbour`)*

**Purpose:** **Single scene.** Satomi calls Tanaka Yutaka with the card from Kimura. He answers with the energy of a man who has been expecting this call — not surprised, warm, unhurried. This is not a hub. He gives her what he knows in one conversation: Setsuko used words like 「管理者」and 「義務」; the house is not considered haunted locally but *occupied* (different category); one previous visitor, a student from Osaka, left without saying goodbye and sent a postcard six months later — nothing written, just a stamp, a drawing of a house. Tanaka does not advise her to leave. This is more alarming than if he did.

**Text blocks:**
- Narrator: the phone ringing, once. Then Tanaka's voice — unhurried, timed pauses, the quality of someone who has thought carefully about what to say.
- Tanaka (prefix `japanese_male_midlife_japanese_mature_deep_intriguing:`):
  - On Setsuko: 「節子さんは研究者でした。管理者と義務——そういう言葉を使っていた。珍しいとは思いませんでした、当時は。」
  - On the house: 「この家は幽霊屋敷じゃない。住んでいる。違いがあります。」
  - On the student: 「一人いました。大阪の学生さん。四日間いて、挨拶もなく帰った。六ヶ月後にハガキが来た。何も書いていない。切手だけ。家の絵でした。」
  - Closing: 「里見さんも、同じ場所に立っているんでしょう。」He rings off.
- Satomi (inner): "同じ場所。"

**Choices (single exit → `basement_entry`):**
- 「電話を切った」 — call ended | effects: none

**NPCs:** 田中 豊 (Tanaka Yutaka) — phone

---

## Scene 12: `basement_entry`

**Purpose:** The basement hatch in the corridor. Satomi has been aware of it. The latch is stiff but not locked. Below: a wooden ladder, darkness, the smell of old food and something else. Her inner voice is specific: she does not go into basement hatches in houses she doesn't own. She corrects herself. She does own this house. That doesn't help.

**Text blocks:**
- Narrator: the hatch in the corridor floor. The smell rising from below. The oil-lamp smell underneath everything else.
- Satomi (inner): 「地下には行かない」——と思っていたが。所有者なので。行く。

**Choices:**
- 「蓋を開けて降りる」 — open the hatch and go down | gating: `curiosity` ≥ 5; grey if failed (inner voice: 「地下には行かない。きちんとした理由がある。具体的には言えないが」) | effects: none → `basement_descent`
- 「まだ準備ができていない」 — not ready | effects: `composure` +1 → `basement_forced` *(see below)*

**Note:** Choosing "not ready" routes to `basement_forced` — a short scene where Satomi prepares herself and then goes anyway. She has to go to the basement for Act 2 to complete. The `found_altar` gate for Act 3 requires it.

**NPCs:** none

---

## Scene 12a: `basement_forced`

**Purpose:** Short beat. Satomi stands at the hatch. She's not ready. She stands there for two minutes. She is still not ready. She goes anyway. The narrator does not comment.

**Text blocks:**
- Narrator: two minutes. Then she opens the hatch.
- Satomi (inner): "準備ができた人間なんて存在しない。"

**Choices (single exit → `basement_descent`):**
- 「開ける」 — open it | effects: none

**NPCs:** none

---

## Scene 12b: `basement_descent`

**Purpose:** Below. A storehouse. Preserved food that should not still be intact. Old farm equipment, rope in good condition. And at the back: the altar. Lit — a small oil lamp that should not be burning. Not hidden. Placed with intention.

**Text blocks:**
- Narrator: the preserved food, the tools labelled in a dialect she barely recognises, the rope. The altar at the back. The lamp. The lamp should not be burning.
- Satomi (inner): "ランプが燃えている。点けた人間がいない。それでも燃えている。"

**Choices:**
- 「祭壇に近づく」 — approach the altar | effects: `found_altar: true` → `altar_approach`
- 「部屋を先に確認する」 — check the storehouse before the altar | effects: none → `basement_storehouse`
- 「入口近くで見るだけ」 — stay near the ladder; look from distance | effects: none → `basement_look_only`

**NPCs:** none (the presence is here but not yet visible)

---

## Scene 12c: `basement_storehouse`

**Purpose:** Satomi examines the storehouse: the preserved food, the ledger with number-columns she can't place, the tools' dialect labels. This space was used actively, not ceremonially. Practically. Then she turns to the altar.

**Text blocks:**
- Narrator: the ledger, the labels, the practical quality of everything here.
- Satomi (inner): "儀式じゃない。作業だ。"

**Choices (single exit → `altar_approach`):**
- 「祭壇へ」 — now the altar | effects: `found_altar: true`

**NPCs:** none

---

## Scene 12d: `basement_look_only`

**Purpose:** Satomi stays near the ladder. The altar at a distance. She can see it exists, someone has been tending it, the lamp burns steadily. She cannot read what's on it from here.

**Text blocks:**
- Narrator: the distance, the lamp, the quality of its steadiness.
- Satomi (inner): "近づけない。近づかなければ——何も起きない。何も起きなければ——帰れる。"

**Choices:**
- 「やはり近づく」 — changed her mind; go to it | effects: `found_altar: true` → `altar_approach`
- 「上に戻る」 — back up the ladder without engaging | effects: `composure` +1 → `act2_threshold`

**Note:** Choosing to leave sets `visited_basement` but NOT `found_altar`. This is the path where `found_altar` is never set — Act 3 will be forced Flee.

**NPCs:** none

---

## Scene 13: `altar_approach`

**Purpose:** Satomi at the altar. Objects: a photograph (Setsuko, and someone else at the edge — cut off, almost deliberately), two small dried-offering dishes, a folded paper. The lamp burns with unusual steadiness. The presence is here — felt rather than seen. It becomes visible only if she touches the altar.

**Text blocks:**
- Narrator: the altar's objects, the photograph, the steady lamp. The quality of the space — attended, waiting.
- Satomi (inner): "写真に、もう一人いる。端に切れている。コートを着ている。"

**Choices:**
- 「写真を見る」 — examine the photograph | effects: `curiosity` +1 → `altar_photograph`
- 「祭壇に触れる」 — touch the altar | gating: `curiosity` ≥ 5, `flags_unset: [corridor_bad]` or (if `corridor_bad` set: `curiosity` ≥ 7); grey if failed (inner voice if `corridor_bad`: 「触らない。廊下のことがある。庭のこともある。」) | effects: `heard_name: true` → `altar_touch`
- 「触れずに見る」 — look without touching | effects: none → `altar_observe`

**NPCs:** 祭壇の気配 (The Altar Presence — not yet visible)

---

## Scene 13a: `altar_photograph`

**Purpose:** Satomi picks up the photograph. The person at the edge — cut off, almost deliberately — is wearing a coat she recognises. She doesn't say why. She doesn't say how. She puts the photograph down and now she is going to touch the altar.

**Text blocks:**
- Narrator: the coat. The recognition Satomi will not name.
- Satomi (inner): silence. Then: "触る。"

**Choices:**
- 「祭壇に触れる」 — touch it | gating: same as above; grey if failed | effects: `heard_name: true` → `altar_touch`
- 「触れずに引き返す」 — look without touching | effects: none → `altar_observe`

**NPCs:** 祭壇の気配

---

## Scene 13b: `altar_touch`

**Purpose:** Satomi touches the altar. The lamp does not flicker. The presence does. It collects itself into something visible at the edge of her vision — not yet directly seeable. Then it says her given name. さとみ. Once. Not a question. It has known this name for some time. Sets `heard_name`. The presence is now briefly, partially visible.

**Text blocks:**
- Presence (narrator reads, no prefix, single word): 「さとみ」
- Narrator: the way it is said. Not a question. Not a greeting. The weight of waiting.
- Satomi (inner): "名前を知っている。この気配が私の名前を知っている。" Then, after a long pause: "どうして？"

**Choices:**
- 「気配に向き直る」 — turn and look directly at the presence | effects: `composure` -2 → `altar_face`
- 「すぐに引き返す」 — back away immediately | effects: `composure` +1 → `altar_retreat`

**NPCs:** 祭壇の気配 (now visible, partially)

---

## Scene 13c: `altar_face`

**Purpose:** Satomi turns and looks directly at the presence. It is visible for a moment — wrong in scale, close but not correct in its arrangement. Then it seems embarrassed. Genuinely embarrassed to be seen. It does not flee — it simply becomes gradually less visible, backing out of the room the way someone backs out when they've caused an interruption. Sets `saw_face`.

**Text blocks:**
- Narrator: the presence's shape — not threatening, but wrong. The embarrassment — physical, legible. The slow withdrawal.
- Satomi (inner): "恥ずかしそうにしている。幽霊みたいなものが恥ずかしそうにしている。" Beat. "わかる。"

**Choices:**
- 「声をかける」 — say something to it | effects: `curiosity` +1 → `altar_speak`
- 「見続ける——消えるまで」 — keep watching until it fades | effects: `curiosity` +1, `composure` -1 → `altar_watch`
- 「地上に戻る」 — up the ladder; she's done | effects: none → `altar_return`

**NPCs:** 祭壇の気配 (fading)

---

## Scene 13d: `altar_speak`

**Purpose:** Satomi addresses the presence: an apology for the interruption, a statement of her intentions, an admission she doesn't know what she's doing. The presence, in the process of becoming invisible, pauses. Something in it listens. Then it is gone. The lamp continues to burn.

**Text blocks:**
- Narrator: the pause in its withdrawal. The quality of it listening.
- Satomi (inner): "聞いてた。何かが聞いてた。私が言ったことを。"

**Choices (single exit → `altar_return`):**
- 「地上に戻る」 — back up the ladder | effects: none

**NPCs:** none (presence has gone)

---

## Scene 13e: `altar_watch`

**Purpose:** Satomi watches until the presence is gone. It takes longer than she expected. The lamp burns. At some point she realises she's been standing there for a while and her legs are cold.

**Text blocks:**
- Narrator: the duration, the lamp, the cold.
- Satomi (inner): "長かった。待たせてしまった気がする。なぜそう思うのかはわからない。"

**Choices (single exit → `altar_return`):**
- 「地上に戻る」 — up the ladder | effects: none

**NPCs:** none

---

## Scene 13f: `altar_observe`

**Purpose:** Satomi does not touch the altar. She studies it from here. The presence is somewhere in the room — the lamp behaves as if something stands between her and it. She looks. She catalogues. `found_altar` is confirmed (she engaged).

**Text blocks:**
- Narrator: the lamp's behaviour. The objects on the altar at this distance.
- Satomi (inner): "触らなかった。でも、ここには何かがある。"

**Choices:**
- 「やはり触れる」 — actually, touch it | gating: `curiosity` ≥ 5; grey if failed | effects: `heard_name: true` → `altar_touch`
- 「上に戻る」 — up the ladder; enough | effects: `composure` +1 → `altar_return`

**NPCs:** 祭壇の気配 (present but invisible)

---

## Scene 13g: `altar_retreat`

**Purpose:** Satomi backs away from the altar after hearing her name. She does not engage with the presence. She goes up the ladder. `heard_name` is set. `saw_face` is not.

**Text blocks:**
- Narrator: her retreat. The ladder. The hatch closing.
- Satomi (inner): "名前だけ知っている。顔は見ていない。それでいい。それでいい。"

**Choices (single exit → `altar_return`):**
- 「地上に戻る」 — up the ladder | effects: none

**NPCs:** none

---

## Scene 13h: `altar_return`

**Purpose:** Satomi back in the corridor. The hatch closes behind her. The corridor is ordinary. Sets `visited_basement`. This is the post-altar moment — if all three altar flags (`found_altar`, `heard_name`, `saw_face`) are present, the `accepted` flag can be set here. The house is quiet in a way that implies it is listening.

**Text blocks:**
- Narrator: the corridor. The hatch. She counted the stairs going up — correctly.
- Satomi (inner, if all three flags present): "ああ——" Beat. A thought she doesn't finish. The narrator notes her inner voice has stopped producing imaginary texts to Ryan.
- Satomi (inner, if not all three): "では。"

**Choices:**
- If `found_altar` + `heard_name` + `saw_face` all set:
  - 「そのまま立っている——受け取る」 — sit with it; don't deflect | effects: `accepted: true`, `curiosity` +1, `composure` -1 → `act2_threshold`
  - 「お茶を入れる——考えを払う」 — shake it off; make tea | effects: `composure` +1 → `act2_threshold`
- If not all three:
  - 「玄関へ向かう」 — go to the entrance | effects: none → `act2_threshold`

**NPCs:** none

**Note:** `accepted` is only available here if all three altar flags are present. It is hidden otherwise. This scene is not a hub — there is no returning to rooms. The `accepted` moment is the final beat before Act 3.

---

## Scene 14: `act2_threshold`

**Purpose:** Satomi goes to the entrance. Her bag is where she left it. Her ticket is still valid. The narrator describes what is behind her — what she has seen, what she found, what she has not explained. Her inner voice begins composing the most difficult imaginary text to Ryan yet. She doesn't finish it. The house is behind her. The road is in front of her. Act 2 ends.

**Text blocks:**
- Narrator: the entrance. The road through the front door. What she is carrying — not the bag. The accumulation: the wrong corridor, the creatures, the altar, her name spoken once.
- Satomi (inner): the imaginary text begins and stops. "ライアン、ちょっと——" She doesn't finish.

**Choices:**
- 「ここに留まる」 — stay; see it through | effects: none → Act 3 entry
- 「今すぐ出る」 — leave | effects: none → `threshold_leave`

**NPCs:** none

---

## Scene 14a: `threshold_leave`

**Purpose:** Satomi picks up her bag and leaves. She gets to the gate. The ordinary world is there. She walks to her car. Something — not a hand, not a voice — is in the way. Not blocking. Asking a question she hasn't answered. The house has let her in and out all day. This is different.

**Text blocks:**
- Narrator: the gate, the road, the quality of what is in the way. Not physical obstruction. Something else.
- Satomi (inner): "行けない。行けないわけじゃないけど——行けない。"

**Choices:**
- 「やはり留まる」 — stay | effects: none → Act 3 entry
- 「強引に出る」 — push through and leave | effects: `curiosity` -1, `composure` +1 → Act 3 entry (Flee path)

**Note:** Both choices lead to Act 3. "Pushing through" routes to Act 3 with a flag note that she forced her way out — Act 3 entry narration reflects this. The Flee ending is now the most likely path but it is still Act 3's choice.

**NPCs:** none

---

## Act 2 Scene Count: 14 primary + sub-scenes. Player traverses 8–12 nodes per run.

---

## Act 2 Flag/Stat Summary

| Flag | Set when | Required for |
|---|---|---|
| `found_altar` | Approach/touch altar (any path except `basement_look_only` exit) | Act 3 gate (Confront, Embrace) |
| `heard_name` | Touch altar → `altar_touch` | Embrace ending |
| `saw_face` | Engage presence in `altar_face` | Confront + Embrace endings |
| `accepted` | `altar_return` with all three altar flags + player sits with it | Embrace ending |
| `knows_truth` | `study_read: true` AND `kitchen_examined: true` (either order) | Confront ending |
| `visited_study` | Set in `study_return` | Hub narration (internal) |
| `visited_kitchen` | Set in `kitchen_return` | Hub narration (internal) |
| `visited_garden` | Set in `garden_return` | Hub narration (internal) |
| `visited_basement` | Set in `altar_return` (or `basement_look_only` exit) | Internal |
| `corridor_bad` | Carried from Act 1 | Greys altar touch, raises effective gate |

**Stat ranges entering Act 3:**
- `curiosity`: 3–10 (effectively capped at 10; high-engagement path reaches 9–10)
- `composure`: 1–10 (low end: maximum engagement with bad branches + all composure-cost choices)

---

## Validation Notes

- No hubs. Study → kitchen → garden → (Tanaka if flag) → altar. Every scene leads forward. ✓
- `study_retreat` skips documents; player on that path cannot get `knows_truth` and therefore cannot reach Confront ending. ✓
- Bad outcome branch #1 (`corridor_bad`) is Act 1. In Act 2 it greys the altar touch choice with specific inner voice. ✓
- Bad outcome branch #2 (`garden_creature_touch_bad`): composure -4 total makes altar touch extremely unlikely; Confront/Embrace effectively unreachable on this path. ✓
- Bad outcome branch #3: altar touch with `curiosity` < 4 → altar approach is greyed; `heard_name` not set; Embrace blocked. ✓ (The `corridor_bad` flag raises the effective threshold — players on bad-corridor path need `curiosity` ≥ 7 to touch.)
- Kimura: single scene in Act 1 ✓ (Tanaka: single scene in Act 2 ✓)
- Act 2 creature encounters: no dialogue, physical comedy only. ✓
- Altar presence: one word (さとみ), narrator reads, no prefix beyond the "no prefix" convention. ✓
- `knows_truth` requires two independent conditions from two rooms; the linear room order means study-before-kitchen is the normal sequence. ✓
- `accepted` scene not a hub — single exit after the choice. ✓
- No scene exceeds 4 active choices. ✓
- All text in Japanese. ✓
