# 里見の家 — Act 1 Scenes

## Beat 1 — 着陸 (Landing / First Impressions)

### Scene: `arrival_approach`

Purpose: Satomi arrives on foot, suitcase in hand, and sees the house for the first time. Two voices establish their registers: the narrator describes the house with quiet inevitability; Satomi's inner voice delivers a dry inventory of disappointments.

Choices:
- 「不動産として見る」 — assess it like a surveyor, professional detachment → `arrival_front_door` | gating: none | effects: `composure` +1 | consumable: N
- 「これは家族の家だ」 — reluctant nostalgia, this is family, sort of → `arrival_front_door` | (convergent with above — same `next`, different framing) | gating: none | effects: none | consumable: N
- 「何かがおかしい」 — something is wrong and I am choosing not to say so yet → `arrival_front_door` | (convergent — same `next`, different framing) | gating: none | effects: `composure` -1 | consumable: N

Convergent group: all three choices → `arrival_front_door`. Scene writer writes three distinct framings of Satomi's opening posture — professional, nostalgic, or unease-she-won't-name. The stat delta is the only mechanical difference; the framing colours her inner voice register for Act 1.

NPCs present: none

---

### Scene: `arrival_front_door`

Purpose: Satomi at the threshold. She has the key from the documents. The house smell, the cold, the stuck genkan door. The narrator notes the house has been waiting for some time. Satomi notes there is no doorbell, which is practical information.

Choices:
- 「鍵を開ける」 — unlock the door and step inside → `arrival_inside` | gating: none | effects: none | consumable: N
- 「もう少し外を見る」 — pause, look at the garden wall and the outside before going in → `arrival_front_door_look` | gating: none | effects: `curiosity` +1 | consumable: N
- 「ライアンにメッセージを書く（送らない）」 — compose an imaginary text to Ryan about the house exterior; don't send it → `arrival_inside` | (convergent with first choice — same `next`, different framing, inner-voice beat) | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `arrival_front_door_look`

Purpose: Short pause scene. Satomi surveys the garden wall, the overgrown path at the side, the roof tiles missing at one corner. The narrator mentions she counted the windows. Satomi notes she did not count the windows. Returns to threshold.

Choices:
- 「では、入る」 — all right. going in → `arrival_inside` | gating: none | effects: none | consumable: N
- 「裏庭に回る」 — walk around to the back garden before entering → `arrival_inside` | (convergent — same `next`, different entry flavour, adds small detail about the garden Satomi will recall in Act 2) | gating: none | effects: none | consumable: N

NPCs present: none

_Note: This sub-scene keeps Beat 1's reading time tight. Both choices are convergent to `arrival_inside`; they exist to reward curiosity-button players with an early garden glimpse without gating anything._

---

### Scene: `arrival_inside`

Purpose: Satomi is inside. The genkan, the smell, the tatami visible through the sliding door. Cold. The electricity timer hums. Everything is present-tense ordinary and slightly too still. Act 1 Beat 1 closes here; Beat 2 begins as Kimura-san's car pulls up.

Choices:
- 「荷物を下ろす」 — set her bag down in the entrance, look around → `kimura_arrival` | gating: none | effects: none | consumable: N
- 「電気をつける」 — find the breaker, get the lights on first → `kimura_arrival` | (convergent — same `next`, different interior detail lit up) | gating: none | effects: none | consumable: N
- 「家全体を見て回る」 — start a survey of the ground floor immediately, methodically → `kimura_arrival` | (convergent — same `next`; inner voice notes two things wrong before she hears the car) | gating: none | effects: `curiosity` +1 | consumable: N

Convergent group: all three → `kimura_arrival`.

NPCs present: none

---

## Beat 2 — 不動産業者 (The Estate Agent) + Kimura-san Conversation

### Scene: `kimura_arrival`

Purpose: Kimura-san's car appears at the gate. He is punctual, prepared, and constitutionally embarrassed about the haunting. He explains the electricity timer, hands over the key pack, and presents his folder. He is clearly hoping to be back on the road within ten minutes.

Choices:
- 「書類を受け取る」 — take the folder, let him wrap up quickly → `kimura_departure` | gating: none | effects: none | consumable: N
- 「少し話しましょう」 — invite him to talk; you have questions → `kimura_hub` | gating: none | effects: none | consumable: N
- 「幽霊について聞く」 — go straight to the haunting comment, you heard it → `kimura_hub` | (convergent with above — routes to the conversation hub; Kimura-san's first-response text is specific to this opener) | gating: none | effects: none | consumable: N

NPCs present: 木村さん (Kimura-san, estate agent)

---

### Conversation Hub — `kimura_hub`

Purpose: Short conversation. Kimura is polite and running a clock. Maximum three exchanges; he leaves regardless of whether all topics are exhausted. The three topics are: 里見 節子 (Setsuko, the family member), the house's local reputation, and the next-door neighbour. The neighbour card is only offered if Satomi asks about local contacts. After three exchanges (tracked by `kimura_exchange_1/2/3` flags) he wraps up automatically — whichever topic she asks fourth is interrupted by his departure. Topics are hidden once exhausted.

Returns from: sub-scenes `kimura_topic_setsuko`, `kimura_topic_reputation`, `kimura_topic_neighbour`

Choices:
- 「節子さんのことを教えてください」 — ask about the family member, Setsuko → `kimura_topic_setsuko` | gating: `flags_unset: [asked_setsuko]`; hide_if_failed | consumable: Y (`asked_setsuko` set on return) | effects: none
- 「この家の評判は？」 — ask about the house's local reputation → `kimura_topic_reputation` | gating: `flags_unset: [asked_reputation]`; hide_if_failed | consumable: Y (`asked_reputation` set on return) | effects: none
- 「近所の人はいますか？」 — ask about the neighbours; this is how you get the card → `kimura_topic_neighbour` | gating: `flags_unset: [asked_neighbour]`; hide_if_failed | consumable: Y (`asked_neighbour` set on return) | effects: `met_neighbour: true` (set inside `kimura_topic_neighbour` return, not in hub — see sub-scene)
- 「もう結構です」 — wrap up; let him go → `kimura_departure` | gating: none | consumable: N

Exchange cap: after each topic sub-scene, check `kimura_exchange_1`, `kimura_exchange_2`, `kimura_exchange_3`. Third return → Kimura's response cuts off and transitions directly to `kimura_departure` regardless of remaining topics. (Stage 5 note: implement by writing the third-exchange versions of each topic return as Kimura reaching for his keys mid-answer.)

Walk-away: 「もう結構です」→ `kimura_departure` (always available, no requires)

NPCs present: 木村さん (Kimura-san)

---

### Scene: `kimura_topic_setsuko`

Purpose: Kimura tells Satomi what he knows of Setsuko — not much. She died without contact details for next-of-kin, which is why the estate took six months to locate Satomi. She lived alone for many years. He produces a single photograph of Setsuko in the garden — the same one that will be in the documents folder. (If Satomi sees it here, the Beat 4 moment of recognition lands differently — the garden in the photo is already noted as wrong.)

Choices:
- 「わかりました、ありがとう」 — back to Kimura → `kimura_hub` | effects: `asked_setsuko: true`, `kimura_exchange_N: true` (next unset exchange flag) | consumable: N (hub hides topic)

NPCs present: 木村さん

---

### Scene: `kimura_topic_reputation`

Purpose: Kimura explains the house's reputation in the area — "the Satomi house," referred to as such even before Satomi arrived, which he doesn't comment on. Previous short-term tenants (two families, a photographer) left earlier than planned. He frames this neutrally. The narrator observes he does not make eye contact when he says this.

Choices:
- 「なるほど」 — back to Kimura → `kimura_hub` | effects: `asked_reputation: true`, `kimura_exchange_N: true` | consumable: N

NPCs present: 木村さん

---

### Scene: `kimura_topic_neighbour`

Purpose: Kimura tells her about the neighbour — 田中 豊 (Tanaka Yutaka), early eighties, lives next door, has been there longer than anyone. He has, Kimura says carefully, opinions about the house. He slides the neighbour's card across. This is the only moment `met_neighbour` can be set — taking the card is an action, not passive receipt.

Choices:
- 「カードを受け取る」 — take the card → `kimura_hub` | effects: `met_neighbour: true`, `asked_neighbour: true`, `kimura_exchange_N: true` | consumable: N
- 「いいえ、結構です」 — leave the card on the table → `kimura_hub` | effects: `asked_neighbour: true`, `kimura_exchange_N: true` (met_neighbour NOT set) | consumable: N

NPCs present: 木村さん

---

### Scene: `kimura_departure`

Purpose: Kimura's car rounds the bend and is gone. The scene is extremely brief — the sound of the engine fading, the gate swinging. Satomi is alone. This is the transition into Beat 3.

Choices:
- 「家に入る」 — back inside → `alone_arrival` | gating: none | effects: none | consumable: N
- 「もう少し外に立つ」 — stand outside a moment longer, watching the road → `alone_arrival` | (convergent — same `next`, inner voice beat about the choice to go in) | gating: none | effects: none | consumable: N

NPCs present: none (Kimura just left)

---

## Beat 3 — 一人になる (Alone)

### Scene: `alone_arrival`

Purpose: Satomi, alone in the entrance hall, performs her first practical inventory of the ground floor. The narrator describes what the house is doing; Satomi describes what she's looking for (a reliable lamp, a working kettle, which sliding doors stick). She composes an imaginary text: "arrived. house is a house. you'd find it extremely boring." She almost sends it.

Choices:
- 「部屋を確認する」 — move through the ground floor systematically → `alone_ground_floor` | gating: none | effects: none | consumable: N
- 「まず荷物を置く」 — find a room, set down her bag, establish base of operations → `alone_ground_floor` | (convergent — same `next`, different framing: practical vs. territorial) | gating: none | effects: none | consumable: N
- 「ライアンにメッセージを送る」 — actually send the imaginary text → `alone_ground_floor` | (convergent — same `next`; inner-voice beat where she presses send; he doesn't reply; it's 3am) | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `alone_ground_floor`

Purpose: A small sequence of mundane discovery — which boards creak, the smell under the tatami, the landline phone that crackles when lifted. One specific wrongness is seeded here: the back corridor appears to be longer than the house's exterior dimensions would allow. Satomi does not go far enough in to confirm this. The narrator does not comment on it.

Choices:
- 「裏廊下を調べる」 — walk to the end of the back corridor, look properly → `alone_corridor_look` | gating: none | effects: `curiosity` +1 | consumable: N
- 「廊下は無視して台所を探す」 — leave the corridor, find the kitchen and the kettle → `alone_kitchen` | gating: none | effects: none | consumable: N
- 「黒電話を試す」 — lift the old landline; it crackles → `alone_kitchen` | (convergent with above — same `next`, small inner-voice beat about the crackling line; sets no flags but adds texture) | gating: none | effects: none | consumable: N
- 「荷物を上の部屋に持って行く」 — carry bag upstairs, choose a room, establish upstairs → `alone_kitchen` | (convergent — same `next`, different framing) | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `alone_corridor_look`

Purpose: Satomi walks to the end of the corridor. It seems longer than it should be. She stops, looks back at the entrance, looks forward. She counts her steps on the way back. The number doesn't match what the outside of the house would allow. She writes this off as tiredness and the awkward angle. Returns to kitchen.

Choices:
- 「気にしない——疲れているだけだ」 — forget it, she's tired → `alone_kitchen` | gating: none | effects: `composure` +1, `curiosity` -1 | consumable: N
- 「もっとよく調べる」 — step further in, really look → `alone_kitchen` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: "そこには行かない。まだ行かない") | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「引き返す」 — back out, she's seen enough → `alone_kitchen` | (convergent with first — same `next`, slightly different framing: deliberate retreat vs passive dismissal) | gating: none | effects: `composure` +1 | consumable: N

Convergent group: all → `alone_kitchen`. This scene seeds the wrong corridor without resolving it — the resolution comes in Beat 5.

NPCs present: none

---

### Scene: `alone_kitchen`

Purpose: Satomi finds the kitchen, the kettle, the one lamp that reliably works. She establishes her domestic foothold. The smell of old tatami is less here. She relaxes, slightly. The narrator observes that the house has been watching all of this with interest. Satomi finds the spot where the floor is perfectly silent, as if it's been waiting to be stood on.

Choices:
- 「お湯を沸かす」 — put the kettle on; wait → `evening_documents` | gating: none | effects: `composure` +1 | consumable: N
- 「書類を確認する」 — spread Kimura's documents on the kitchen table and start reading → `evening_documents` | (convergent — same `next`; differently framing — active vs. passive; effects same) | gating: none | effects: `composure` +1 | consumable: N

NPCs present: none

_Note: Both choices converge on Beat 4. The composure +1 is the same either way — Satomi has found her footing._

---

## Beat 4 — 夕食と夜 (Dinner and the Evening)

### Scene: `evening_documents`

Purpose: Satomi eats (convenience-store onigiri and a can of something warm). She reviews the documents Kimura left. Title deeds, a brief property history, and a photograph of 里見 節子. Setsuko is unremarkable. The photograph was taken in the garden. The garden behind her is not the same garden that exists now. Satomi notices this.

Choices:
- 「写真をよく見る」 — examine the photograph carefully, hold it to the light → `evening_photo_examined` | gating: none | effects: `curiosity` +1 | consumable: N
- 「写真をフォルダにしまう」 — put the photograph back in the folder; deal with it tomorrow → `evening_before_bed` | gating: none | effects: `composure` +1 | consumable: N
- 「書類の他の部分を読む」 — focus on the legal documents; the photograph can wait → `evening_before_bed` | (convergent with above — same `next`, different framing: deliberate avoidance vs. efficient prioritisation) | gating: none | effects: `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `evening_photo_examined`

Purpose: Satomi holds the photograph up. The garden in the background has a stone lantern that no longer stands in the actual garden. The trees are arranged differently. This could be an old photograph — it certainly looks old. But the style of the image is more recent than the frame suggests. She puts it down and doesn't reach a conclusion. Continues to evening.

Choices:
- 「日付を確認しようとする」 — check whether the photo has a date printed on it → `evening_before_bed` | gating: none | effects: `curiosity` +1 | consumable: N
- 「写真をしまって就寝の準備をする」 — put it away and prepare for bed → `evening_before_bed` | gating: none | effects: `composure` +1 | consumable: N
- 「写真の場所と実際の庭を比べる」 — go to the window and compare the photo to the actual garden in the dark → `evening_before_bed` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: "暗い庭と写真を比べても意味がない") | effects: `curiosity` +1, `composure` -1 | consumable: N

Convergent group: all → `evening_before_bed`.

NPCs present: none

---

### Scene: `evening_before_bed`

Purpose: The evening winds down. Satomi does a final check of the ground floor, or decides not to. She finds nothing — and the not-finding is its own kind of note. The electricity timer clicks once. She goes upstairs.

Choices:
- 「就寝前に一階を確認する」 — final sweep of the ground floor → `evening_final_check` | gating: none | effects: none | consumable: N
- 「真っ直ぐ寝室に向かう」 — go straight to the bedroom; she's tired → `night_in_bed` | gating: none | effects: `composure` +1 | consumable: N
- 「また廊下を見る」 — go look at the back corridor one more time, just to confirm → `evening_corridor_confirmed` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: "もう十分だ") | effects: `curiosity` +1 | consumable: N

NPCs present: none

---

### Scene: `evening_final_check`

Purpose: Satomi walks through the ground floor. Everything is as it was. The back corridor is dark; she doesn't go far in. The creak she heard from the kitchen is just the floor settling — old houses settle. She goes upstairs.

Choices:
- 「裏廊下を懐中電灯で照らす」 — shine her phone light down the back corridor → `night_in_bed` | gating: `curiosity` ≥ 5; grey out if failed | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「大丈夫——寝る」 — good enough; go to bed → `night_in_bed` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `evening_corridor_confirmed`

Purpose: Satomi looks at the back corridor with fresh eyes. The length is wrong. She counts: twenty-two steps to the end. She counts the exterior of the house the next morning — it will be fourteen. She does not count it tonight. She decides to deal with this information later and goes to bed.

Choices:
- 「とにかく就寝する」 — go to bed, this can wait → `night_in_bed` | gating: none | effects: `composure` -1 | consumable: N

_Note: Single-choice forced transition. This is justified — Satomi has already made the decision by coming here. The player made the choice by entering this scene; the single exit is the consequence._

NPCs present: none

---

## Beat 5 — 真夜中の音 (The Sound in the Night)

### Scene: `night_in_bed`

Purpose: Satomi is in bed. The room is cold; the futon smells of cedar and something floral and old. She lies awake listening to the house settle and then finally, almost, drifts. Then she hears it — from below. The narrator describes the sound with precise, clinical calm. Satomi's inner voice cycles through seven rational explanations. The sound stops. Then — after long enough — it starts again.

Choices:
- 「起き上がって見に行く」 — get up and go look → `night_investigate_landing` | gating: none | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「音を無視して寝る」 — stay in bed and insist she didn't hear it → `night_ignore` | gating: none | effects: `curiosity` -1, `composure` +1 | consumable: N
- 「ベッドの中で耳を澄ます」 — stay still, listen harder, try to identify the sound before deciding → `night_listen_closer` | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `night_listen_closer`

Purpose: Satomi listens. The sound has pattern — not random settling. It repeats at irregular intervals with the quality of intention, if not agency. She's now more awake than before. She has to decide.

Choices:
- 「やはり見に行く」 — all right. going down → `night_investigate_landing` | gating: none | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「枕で耳を塞ぐ」 — pillow over the ears; forcible not-hearing → `night_ignore` | gating: none | effects: `curiosity` -1, `composure` +1 | consumable: N
- 「電気をつけて部屋に留まる」 — turn the light on but stay in the room — compromise position → `night_ignore` | (convergent with above — same `next`, different framing: stubborn denial vs. practical retreat; inner voice distinctly different) | gating: none | effects: `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `night_investigate_landing`

Purpose: Satomi on the landing, phone in hand. The house is dark; the electricity timer has cut out as Kimura warned. Below, the sound is clearer — it is coming from the back corridor. She can see the entrance to it from the foot of the stairs.

Choices:
- 「廊下に向かう」 — go to the corridor → `night_corridor_entrance` | gating: none | effects: none | consumable: N
- 「引き返して部屋に戻る」 — no. back to the room → `night_ignore` | gating: none | effects: `curiosity` -1, `composure` +1 | consumable: N
- 「台所を確認する——音はそちらかもしれない」 — check the kitchen first; maybe the sound isn't from the corridor → `night_corridor_entrance` | (convergent — routes to corridor entrance regardless; inner voice acknowledges the self-deception by the time she gets there) | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `night_corridor_entrance`

Purpose: Satomi at the mouth of the back corridor. Her phone light reaches about halfway. The corridor extends beyond that. The sound is not happening now. This is the Act 1 fork point.

Choices:
- 「中に入る」 — go into the corridor → `night_corridor_deep` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: "そこには行かない。それだけははっきりしている") | effects: `curiosity` +1 | consumable: N
- 「入口で立ち止まり、スマホで照らす」 — shine the phone light into the corridor from the entrance, don't go in → `night_corridor_look_only` | gating: none | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「戻る」 — retreat, go back to bed → `night_ignore` | gating: none | effects: `curiosity` -1, `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `night_corridor_deep`

Purpose: Satomi is inside the corridor. It is longer than the house. She knows this now. Her phone light confirms it — the far end is further than the outside wall. The sound has stopped. The corridor is silent and wrong and her steps echo slightly too much for the size of it. She can go further or come back.

Choices:
- 「さらに奥へ進む」 — go further in → `night_corridor_further` | gating: `curiosity` ≥ 6; grey out if failed (inner voice: "ここまでだ。本当にここまでだ") | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「引き返す」 — come back out — she's confirmed it's wrong; that's enough → `night_retreat_to_bed` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `night_corridor_further`

Purpose: Satomi goes further. The corridor ends in a wall that should not be there — no door, no window, just plaster. On the plaster, at eye level, there is a small mark that might be writing, or might be a water stain. She cannot tell. The sound is gone entirely. She comes back out; the corridor shortens behind her. She is too tired and too unsettled for rational analysis. She goes back to bed.

Choices:
- 「文字に近づく」 — step close to the mark to read it → `night_retreat_to_bed` | gating: none | effects: `curiosity` +1, `composure` -2 | consumable: N
- 「振り向いて戻る」 — don't look closer; come back out → `night_retreat_to_bed` | (convergent — same `next`, different framing; going close adds composure damage) | gating: none | effects: `composure` -1 | consumable: N

Convergent group: both → `night_retreat_to_bed`.

NPCs present: none

---

### Scene: `night_corridor_look_only`

Purpose: Satomi shines her phone from the entrance. The corridor extends beyond where the light reaches. She can see it is long — longer than it should be — without going in. This is the coward's confirmation. She knows.

Choices:
- 「入口で引き返す」 — go back to bed → `night_retreat_to_bed` | gating: none | effects: `composure` +1 | consumable: N
- 「やっぱり入る」 — changed her mind; go in after all → `night_corridor_deep` | gating: `curiosity` ≥ 5; grey out if failed | effects: none | consumable: N

NPCs present: none

---

### Scene: `night_ignore`

Purpose: Satomi stays in bed (or returns to bed). She insists she did not hear what she heard. The narrator says nothing to contradict this. Satomi lies awake for another hour and then sleeps. In the morning she will have a theory.

Choices:
- 「目を閉じる」 — close her eyes → `dawn_wakeup` | gating: none | effects: none | consumable: N

_Note: Single-choice forced transition. The player chose to retreat — the closing of eyes is the punctuation, not a meaningful decision. Keeps pacing._

NPCs present: none

---

### Scene: `night_retreat_to_bed`

Purpose: Satomi gets back into bed. The house is quiet. She counts the ceiling beams until she runs out of numbers. When she runs out, she starts composing imaginary texts. When she runs out of those, she sleeps. She will not tell Ryan about the corridor. Not yet.

Choices:
- 「眠る」 — sleep → `dawn_wakeup` | gating: none | effects: none | consumable: N

_Note: Single-choice forced transition — same reasoning as `night_ignore`._

NPCs present: none

---

## Beat 6 — 夜明け (Dawn)

### Scene: `dawn_wakeup`

Purpose: Morning. Too early. Satomi is awake before the light is. The house looks ordinary in grey half-dark. She goes to the kitchen, makes instant coffee from the pack she brought from the airport, and stands at the window overlooking the garden. The narrator describes what she noticed and what she has chosen not to mention to herself. Satomi sends a real text to Ryan — not the imaginary one. It arrives at 3am his time. He will not see it for hours.

Choices:
- 「今日は徹底的に調べる」 — I'm going to go through this house properly → `dawn_resolve` | gating: none | effects: `curiosity` +1 (only if `curiosity` ≥ 6; otherwise no stat change — the resolve exists but the curiosity hasn't been built) | consumable: N
- 「木曜日までに片付けて帰る」 — sort the paperwork and leave by Thursday → `dawn_resolve` | (convergent — same `next`, different framing; effects below) | gating: none | effects: `composure` +1 | consumable: N
- 「庭を見に行く」 — go outside before deciding anything, look at the actual garden → `dawn_garden` | gating: none | effects: none | consumable: N

Convergent group: first two choices → `dawn_resolve`. Third choice loops to `dawn_resolve` after the garden.

NPCs present: none

---

### Scene: `dawn_garden`

Purpose: Satomi in the garden with her coffee. The overgrown grass, the absent stone lantern (she saw it in the photograph). The garden is wrong in a different way to the corridor — it's not too large, it's too empty. Something was here. She finishes her coffee and goes back inside.

Choices:
- 「石灯籠の跡を探す」 — look for where the stone lantern stood → `dawn_resolve` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: "それは関係ない") | effects: `curiosity` +1 | consumable: N
- 「庭を見渡して家に戻る」 — take it in and go back inside → `dawn_resolve` | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `dawn_resolve`

Purpose: Act 1 closes. Satomi, inside, coffee cooling on the table. The day is beginning. The narrator marks the transition: the first night is over. Whatever is in this house is still in it. Satomi has decided — or has had decided for her — what kind of person she is going to be here. The act ends.

Choices:
- 「家の中を調べ始める」 — begin the investigation → Act 2 entry (investigator path) | gating: none | effects: none | consumable: N

_Note: Single-choice forced transition into Act 2. Stat and flag totals at this point determine which Act 2 exit state applies. No gate here — everyone enters Act 2; what differs is what they carry._

NPCs present: none

---

## NPC Roster — Act 1

- **木村さん（木村 誠一）(Kimura Seiichi)** — first appears in `kimura_arrival`, present through `kimura_hub`, `kimura_topic_*`, `kimura_departure`. Estate agent. Not recurring in Act 2 or 3 (contact by phone only, if Satomi initiates). Three conversation topics, each consumable. Exchange cap of 3 before auto-departure.

- **里見 節子 (Setsuko Satomi)** — not present in person. Referenced in `kimura_topic_setsuko`, appears as a photograph in `evening_documents` and `evening_photo_examined`. Full presence deferred to Act 2. Needs a cast entry for the photograph scene — physical description, what the image conveys.

- **田中 豊 (Tanaka Yutaka)** — referenced in `kimura_topic_neighbour` only; card offered there. Not present in Act 1. Active in Act 2 (phone call hub, if `met_neighbour`). Needs cast entry for Act 2/3.

- **ライアン (Ryan)** — not present. Referenced throughout via imaginary texts and one sent text. Never appears in person. Voice only — absent presence. Cast entry note: Ryan's character is expressed entirely through what Satomi composes to him; his actual responses are always delayed or absent.

---

## Act 1 Exit Summary

| Exit | `met_neighbour` | `curiosity` | `composure` | How achieved |
|------|----------------|-------------|-------------|--------------|
| A — 好奇心旺盛 | true | 7 | 6–7 | Engaged Kimura + card; photo examined; sound investigated; corridor entered; dawn resolve to investigate |
| B — 注意深い | true | 6 | 8–9 | Engaged Kimura + card; photo examined; stayed in bed; dawn resolve to leave Thursday |
| C — 孤独な調査者 | false | 7 | 5–6 | Brushed Kimura; photo examined; sound investigated; corridor entered |
| D — 孤独な退避 | false | 4 | 9 | Brushed Kimura; photo put away; stayed in bed; dawn to leave Thursday |
| E — 半信半疑 | true | 5 | 9 | Engaged Kimura + card; photo put away; stayed in bed; dawn to leave Thursday |

_All five exits from `act-1.md` are reachable through the scenes above. The ranges are approximate — exact values depend on player path through sub-scenes; the min/max shown assume canonical paths._

---

## Validation Notes

- All consumable choices (`kimura_hub` topics) have both `flags_unset` on `requires` and matching flag set on return from sub-scene. ✓
- Consumable: the "open the door" consumable from `structure.md` belongs to Act 2 (deep corridor door). Not reproduced here — Act 1 only seeds the corridor visually, does not open it. ✓
- `met_neighbour` can only be set in `kimura_topic_neighbour` via explicit card-taking choice. A player who asks about the neighbour but declines the card does NOT set the flag. ✓
- `night_corridor_deep` requires `curiosity` ≥ 5 (grey out). This is reachable from base `curiosity` 5 if no retreat choices have been taken — consistent with `act-1.md` Beat 5 spec. ✓
- `night_corridor_further` requires `curiosity` ≥ 6. Only reachable if Satomi has accumulated curiosity via earlier Beat choices. ✓
- Single-choice forced transitions (`night_ignore`, `night_retreat_to_bed`, `evening_corridor_confirmed`, `dawn_resolve`) are each justified: player already made the meaningful decision entering the scene; the single exit is pacing/punctuation, not gatekeeping. ✓
- Embrace ending flag path (`found_altar` + `saw_face` + `heard_name`) all belong to Act 2. Act 1 does not set or block them. ✓
- No scene exceeds 6 active choices. ✓
- Every beat from `act-1.md` has at least one named scene. ✓
