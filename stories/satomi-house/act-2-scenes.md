# 里見の家 — Act 2 Scenes

## Beat 1 — 家の中心 (The House Hub)

### Scene: `house_hub`

Purpose: Central hub for Act 2. Satomi stands in the main ground-floor corridor — the junction between rooms. Narration evolves with each return based on accumulated flags. On first arrival the house is still just a house, mostly. On returns, micro-strangeness accumulates: the smell of cold incense, a screen door that was closed and is now open, a temperature that is not the outside temperature. Her inner voice produces a list. Lists are how she manages things.

Hub structure — available exits change with flags:

Choices:
- 「書斎を調べる」 — go to the study → `study_entry` | gating: `flags_unset: [visited_study]`; hide_if_failed | consumable: Y (hidden once visited) | effects: none
- 「台所へ」 — go to the kitchen → `kitchen_entry` | gating: `flags_unset: [visited_kitchen]`; hide_if_failed | consumable: Y (hidden once visited) | effects: none
- 「庭に出る」 — go out to the garden → `garden_entry` | gating: `flags_unset: [visited_garden]`; hide_if_failed | consumable: Y (hidden once visited) | effects: none
- 「地下蔵の蓋」 — the basement hatch → `basement_entry` | gating: `flags_unset: [visited_basement]`; hide_if_failed | consumable: Y (hidden once visited) | effects: none
- 「もう一度書斎へ」 — return to the study → `study_return` | gating: `flags: [visited_study]`; hide_if_failed | consumable: N | effects: none
- 「田中さんに電話する」 — call the neighbour → `tanaka_hub` | gating: `flags: [met_neighbour]`; hide_if_failed | consumable: N | effects: none
- 「玄関へ向かう」 — go to the entrance → `house_threshold` | gating: `flags: [found_altar]`; grey out if failed (inner voice: 「まだ終わっていない。自分でもそれはわかっている」) | consumable: N | effects: none

_Hub narration note: On second and subsequent returns, the narrator text changes based on which rooms have been visited and whether `found_altar` is set. Stage 5 should write at minimum four variants: fresh hub, one-room-visited, post-altar, all-rooms-visited. `composure` ≤ 4 unlocks a fraying inner-voice overlay on any variant._

NPCs present: none

Returns from: `study_return_hub`, `kitchen_return_hub`, `garden_return_hub`, `basement_return_hub`, `tanaka_hub` (walk-away), `altar_after`

---

## Beat 2 — 書斎 (The Study)

### Scene: `study_entry`

Purpose: Satomi steps into the study. It is ordered in the way of someone who was organised under pressure — papers stacked, annotated, cross-referenced. Setsuko's handwriting is small, angled, methodical. The creature is already here: too many fingers, arranged wrongly, absorbed in a slim volume on the lower shelf. It has not noticed her. The narrator describes the creature with clinical precision. Satomi's inner voice says nothing yet, which is unusual.

Choices:
- 「静かに観察する」 — watch the creature quietly, don't disturb → `study_creature_observe` | gating: none | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「書類を調べ始める」 — ignore the creature; go to the desk and read → `study_documents_first` | gating: none | effects: none | consumable: N
- 「そっと引き返す」 — quietly back out and come back later → `study_retreat` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: 多指の読者 (The Many-Fingered Reader — creature, unnamed)

---

### Scene: `study_creature_observe`

Purpose: Satomi watches the creature read. It turns pages with two sets of fingers simultaneously — cross-referencing, apparently. It makes a sound of disapproval at something in the text: a small click that is not quite a tongue and not quite a joint. It still hasn't noticed her. There is something in the rhythm of its reading that is almost familiar.

Choices:
- 「声をかけてみる」 — say something to it → `study_creature_address` | gating: none | effects: none | consumable: N
- 「書類棚へ移動する」 — while it's distracted, move to the documents → `study_documents_first` | gating: none | effects: `curiosity` +1 | consumable: N
- 「引き返す——見すぎた」 — she's seen enough; retreat to hub → `study_retreat` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: 多指の読者

---

### Scene: `study_creature_address`

Purpose: Satomi says something — an excuse me, or a cleared throat. The creature startles, which it manages badly. It loses its grip on the book, which falls. It looks at her. It has too many eyes arranged in the wrong order. Then it leaves with considerable dignity, squeezing through a gap in the shelving that should not fit it. It leaves behind a bookmark: a pressed leaf, very old. The narrator notes the book it was reading is one of Setsuko's notebooks.

Choices:
- 「栞を手に取る」 — pick up the bookmark → `study_documents_first` | gating: none | effects: `curiosity` +1 | consumable: N
- 「そのままノートを読む」 — leave the bookmark, go straight to the notebook → `study_documents_first` | gating: none | effects: none | consumable: N

Convergent group: both → `study_documents_first`. Picking up the bookmark is flavour that colours Stage 5 narration of the document scene; no mechanical difference beyond curiosity.

NPCs present: none (creature has left)

---

### Scene: `study_retreat`

Purpose: Satomi backs out of the study — creature or no creature, she's not ready. She is standing in the corridor. She'll come back. She adds "study" to the mental list. Returns to hub.

Choices:
- 「廊下に戻る」 — return to the corridor → `house_hub` | gating: none | effects: none | consumable: N

_Note: Single-choice forced transition. She chose to retreat; this is the punctuation. Keeps pacing._

NPCs present: none

---

### Scene: `study_documents_first`

Purpose: The desk. Setsuko's papers. Land records, a hand-drawn floor plan that includes a room Satomi cannot locate on the ground floor, and a notebook in cramped handwriting. This is the first layer of `knows_truth` — Setsuko was researching the house's history, not performing anything. Satomi reads one notebook through.

Choices:
- 「ノートを丁寧に読む」 — read the notebook carefully, from the beginning → `study_documents_deep` | gating: none | effects: `curiosity` +1 | consumable: N
- 「ざっと確認して戻る」 — skim and note the key points; thorough is for later → `study_return_hub` | gating: none | effects: none | consumable: N
- 「地図のコピーを取る」 — photograph the hand-drawn floor plan on her phone → `study_return_hub` | (convergent with above — same `next`, adds a note that she has the photograph; inner voice: "証拠"。何の証拠か、まだわからないが) | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `study_documents_deep`

Purpose: Satomi reads closely. Setsuko's research goes back past the Meiji era — land records, transcriptions of older documents, annotations in the margins connecting things across decades. The house stands on something older. The arrangement Setsuko was maintaining is described in oblique terms Satomi can partly decode. She now has the first half of the picture. The second half requires the kitchen. Sets `curiosity` +1 on entry into this scene; if `visited_kitchen` is already set and kitchen was examined, sets `knows_truth`.

Choices:
- 「メモを書き留める」 — write her own notes before leaving → `study_return_hub` | gating: none | effects: `curiosity` +1 | consumable: N
- 「十分だ、戻る」 — she's read enough for now → `study_return_hub` | gating: none | effects: none | consumable: N

Convergent group: both → `study_return_hub`. The curiosity difference is the only mechanical split.

NPCs present: none

_`knows_truth` gate note: `knows_truth` is set if `visited_kitchen` is already true AND kitchen examination flag `kitchen_examined` is set AND player has reached `study_documents_deep`. If the player does kitchen before study, `knows_truth` triggers on arrival at `study_documents_deep`. If study before kitchen, it triggers when the kitchen examination is complete. Either order works._

---

### Scene: `study_return_hub`

Purpose: Satomi closes the study door behind her. The corridor is as she left it. She adds what she found to the running inventory in her head. Returns to hub. Sets `visited_study`.

Choices:
- 「廊下に戻る」 — back to the corridor → `house_hub` | gating: none | effects: `visited_study: true` | consumable: N

NPCs present: none

---

## Beat 3 — 台所 (The Kitchen)

### Scene: `kitchen_entry`

Purpose: The kitchen is the least frightening room and therefore the most unsettling. It is clean. Not museum-clean — functionally clean, recently. Satomi runs a finger along the counter. Nothing. Someone cleaned this within days. The creature is on the ceiling: large, difficult to fully look at, distributed in a way that doesn't add up. It flinches when she closes the door behind her. Then recovers its dignity. It does this by becoming very still, which is worse.

Choices:
- 「冷蔵庫を開ける」 — open the refrigerator → `kitchen_fridge` | gating: none | effects: none | consumable: N
- 「天井の生き物に話しかける」 — speak to the ceiling creature → `kitchen_creature_speak` | gating: none | effects: `composure` -1 | consumable: N
- 「引き戸の棚を確認する」 — check the sliding-door cupboards → `kitchen_cupboards` | gating: none | effects: none | consumable: N

NPCs present: 天井の住人 (The Ceiling Dweller — creature, unnamed)

---

### Scene: `kitchen_fridge`

Purpose: Three items: a jar of homemade umeboshi, a can of beer (Satsuma brand — discontinued 1987; Satomi knows this because her father drank it, and then couldn't), and something Satomi declines to identify. She notes the umeboshi jar has a label in Setsuko's handwriting — date of preparation, salt ratio. This is the second half of `knows_truth`: Setsuko was not performing a ritual. She was maintaining an arrangement. Ordinary-person maintenance. Sets `kitchen_examined`. If `knows_truth` conditions are met (see study scene gate note), sets `knows_truth`.

Choices:
- 「梅干しの瓶を手に取る」 — pick up the umeboshi jar, read the label → `kitchen_fridge_label` | gating: none | effects: `curiosity` +1 | consumable: N
- 「ビールの缶を手に取る」 — pick up the beer can → `kitchen_fridge_label` | (convergent with above — same `next`, different inner voice beat; the discontinued brand date hits differently) | gating: none | effects: `curiosity` +1 | consumable: N
- 「そっと冷蔵庫を閉める」 — close it, don't engage → `kitchen_return_hub` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: 天井の住人 (still on ceiling, watching this with what appears to be indifference)

---

### Scene: `kitchen_fridge_label`

Purpose: The label's date is recent — six months ago, possibly less. Not decades. Not the past. Six months. Setsuko died, and before she died she made umeboshi and put it in the refrigerator and labelled it correctly. The narrator says nothing about this. Satomi closes the refrigerator door with careful precision. Sets `kitchen_examined: true`.

Choices:
- 「戻る」 — back to the kitchen → `kitchen_return_hub` | gating: none | effects: none | consumable: N

_Note: Single-choice forced transition. The meaningful choice was the fridge decision; this is the aftermath beat. `knows_truth` is set here if conditions are met._

NPCs present: 天井の住人

---

### Scene: `kitchen_creature_speak`

Purpose: Satomi speaks. She's not sure what she says — an excuse me, or a こんにちは, or something more absurd. The creature reacts: it turns in a way that involves more joints than should be available. It does not answer. But the flinching stops. The room changes register slightly — the creature is no longer frightened of her, which doesn't make her feel better exactly, but the quality of the fear in the room was becoming contagious.

Choices:
- 「続けて話す」 — keep talking — fill the silence → `kitchen_creature_extended` | gating: none | effects: `composure` -1 | consumable: N
- 「やめて冷蔵庫へ」 — stop; go to the fridge instead → `kitchen_fridge` | gating: none | effects: none | consumable: N
- 「それでいい——棚を調べる」 — that's enough interaction; check the cupboards → `kitchen_cupboards` | gating: none | effects: none | consumable: N

NPCs present: 天井の住人

---

### Scene: `kitchen_creature_extended`

Purpose: Satomi talks to the ceiling. She tells it she inherited the house. She tells it she's not planning to stay. She tells it she found the beer. The creature listens — she's fairly sure it listens, or something like listening, or the closest available approximation. It makes no response she can interpret. When she stops talking the room is quieter than before. Something has shifted. She does not know what. Returns to kitchen choices.

Choices:
- 「冷蔵庫を調べる」 — go to the refrigerator → `kitchen_fridge` | gating: none | effects: none | consumable: N
- 「棚を確認する」 — check the cupboards → `kitchen_cupboards` | gating: none | effects: none | consumable: N
- 「台所を出る」 — she's done here; back to the corridor → `kitchen_return_hub` | gating: none | effects: none | consumable: N

NPCs present: 天井の住人

---

### Scene: `kitchen_cupboards`

Purpose: Satomi checks the cupboards. Dishes, dry goods (the wrong era, some of them), a single glass that is warmer to the touch than it should be. One shelf has a small folded note she almost misses. She opens it. It says, in Setsuko's handwriting: 台所のことはわかっている。This is not addressed to anyone. Or it was addressed to the house.

Choices:
- 「メモを持ち帰る」 — take the note → `kitchen_return_hub` | gating: none | effects: `curiosity` +1 | consumable: N
- 「メモを戻す」 — put it back where she found it → `kitchen_return_hub` | (convergent — same `next`, different inner voice; replacing it feels stranger than taking it) | gating: none | effects: none | consumable: N

Convergent group: both → `kitchen_return_hub`.

NPCs present: 天井の住人

---

### Scene: `kitchen_return_hub`

Purpose: Satomi back in the corridor. Sets `visited_kitchen`. The kitchen was the least frightening room. She's not sure what to do with that information. Returns to hub.

Choices:
- 「廊下に戻る」 — back to the corridor → `house_hub` | gating: none | effects: `visited_kitchen: true` | consumable: N

NPCs present: none

---

## Beat 4 — 庭 (The Garden)

### Scene: `garden_entry`

Purpose: The garden in daylight. Overgrown but not abandoned — there is a logic to what has grown where. The bamboo has gone through the back wall. A stone water basin stands to the left, mossy. And in the far corner, under the bamboo: the ground has been disturbed. The creature is already visible — low to the ground, too many legs in the wrong arrangement, moving fast. It sees her at the same moment she sees it. It freezes.

Choices:
- 「じっとしている」 — hold still; let the creature decide → `garden_creature_standoff` | gating: none | effects: none | consumable: N
- 「生き物に近づく」 — step toward the creature → `garden_creature_flee` | gating: none | effects: none | consumable: N
- 「地面の掘り返しを調べる」 — ignore the creature; go to the disturbed ground → `garden_disturbed_ground` | gating: none | effects: `curiosity` +1, `composure` -1 | consumable: N

NPCs present: 疾走者 (The Sprinter — creature, unnamed)

---

### Scene: `garden_creature_standoff`

Purpose: They look at each other. The creature is visibly distressed — not afraid exactly, more: socially overwhelmed. It wants to leave. It cannot decide how to leave without acknowledging that it needs to. It makes several false starts. Satomi does not move. Eventually the creature takes a very deliberate, sideways path around the far edge of the garden and into the bamboo. It does this with enormous effort at nonchalance.

Choices:
- 「竹の中を見る」 — look into the bamboo where it went → `garden_bamboo` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: 「追いかけない。それは常識だ」) | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「水盤を調べる」 — go to the stone basin → `garden_basin` | gating: none | effects: none | consumable: N
- 「掘り返した地面へ」 — go to the disturbed ground → `garden_disturbed_ground` | gating: none | effects: `curiosity` +1 | consumable: N

NPCs present: none (creature has departed)

---

### Scene: `garden_creature_flee`

Purpose: The creature bolts. It is extremely fast and goes in a direction that does not cleanly correspond to the available space. Satomi watches the bamboo shake for a moment. Then it stops. She notes that it was frightened of her. She notes this as a fact and does not process it further yet.

Choices:
- 「水盤を調べる」 — go to the basin → `garden_basin` | gating: none | effects: none | consumable: N
- 「掘り返した地面を調べる」 — go to the disturbed ground → `garden_disturbed_ground` | gating: none | effects: `curiosity` +1 | consumable: N
- 「庭を見渡して戻る」 — survey the garden and go back inside → `garden_return_hub` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `garden_bamboo`

Purpose: Satomi pushes through to where the creature went. There is a gap in the bamboo — large enough for her if she bends. She can see the creature a few metres further in: it is sitting still, in a way that suggests it is trying to be invisible. It clearly cannot believe she followed it. It looks, against all reason, embarrassed.

Choices:
- 「そっと引き返す」 — back out, leave it alone → `garden_basin` | gating: none | effects: `composure` +1 | consumable: N
- 「もっと近づく」 — approach closer → `garden_bamboo_close` | gating: `curiosity` ≥ 6; grey out if failed (inner voice: 「そこまでやることはない」) | effects: `curiosity` +1, `composure` -1 | consumable: N

NPCs present: 疾走者

---

### Scene: `garden_bamboo_close`

Purpose: Satomi gets close. The creature does not flee — it has run out of retreat options. Up close, the arrangement of its legs is more wrong than she'd processed from a distance. It makes a sound she interprets as resignation. She backs away. On the way out she notices the bamboo stems nearest to where it sits have been cleaned — wiped, carefully, at eye level. Something has been tending the garden. This is the garden.

Choices:
- 「水盤に向かう」 — go to the basin → `garden_basin` | gating: none | effects: none | consumable: N
- 「掘り返した地面へ」 — go to the disturbed ground → `garden_disturbed_ground` | gating: none | effects: none | consumable: N

Convergent group: both from `garden_bamboo_close`. The bamboo revelation is contextual backdrop; destination is player's choice.

NPCs present: none (creature is very still and hoping not to be counted)

---

### Scene: `garden_basin`

Purpose: The stone water basin. Mossy, heavy, not going anywhere. There is something carved into its underside — Satomi would have to get very close to the ground to read it. The narrator notes it is there. Satomi's inner voice says she doesn't need to see it.

Choices:
- 「屈んで裏を読む」 — get down and read the underside carving → `garden_basin_carving` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: 「暗い石の裏に顔を突っ込むことはしない」) | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「水盤には触らない」 — leave it; go see the disturbed ground → `garden_disturbed_ground` | gating: none | effects: `composure` +1 | consumable: N
- 「庭を見渡して引き返す」 — enough for now; back to the house → `garden_return_hub` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `garden_basin_carving`

Purpose: Satomi gets down. The underside of the basin has a family name carved into it — 里見. This house should not know that name. The basin predates the Satomi connection to this property by at least a generation, possibly two. She reads it twice. Then she stands up and the garden is the same garden it was. Nothing has changed. This is worse than something changing. The narrator describes her face. Her inner voice is briefly, entirely silent.

Composure -1 applied on arrival (she reads it). Does not set `heard_name` — that is reserved for the altar — but primes the player narratively for that moment.

Choices:
- 「掘り返した地面を調べる」 — go to the disturbed ground → `garden_disturbed_ground` | gating: none | effects: none | consumable: N
- 「すぐに家の中に戻る」 — get back inside → `garden_return_hub` | gating: none | effects: `composure` +1 (she's choosing control) | consumable: N

NPCs present: none

---

### Scene: `garden_disturbed_ground`

Purpose: The ground in the corner has been turned recently. Something is buried here — the shape of disturbance is deliberate, not animal. Satomi crouches. She can see the edge of something: lacquered, dark. A box.

Choices:
- 「掘り出す」 — dig it up → `garden_dig` | gating: none | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「そのままにする」 — leave it where it is → `garden_leave_box` | gating: none | effects: `composure` +1 | consumable: N
- 「水盤も調べる」 — check the basin before deciding about the box → `garden_basin` | gating: `flags_unset: [visited_garden]`; hide_if_failed | effects: none | consumable: N

NPCs present: none

---

### Scene: `garden_dig`

Purpose: Satomi digs with her hands. The soil is loose. The box is small, lacquered, black, with a lock she doesn't have a key for. It rattles slightly when moved. She holds it for a moment. She cannot explain what she does next — she puts it back and covers it. Not all the way. But mostly. She will tell herself she meant to move it inside. She leaves it.

Choices:
- 「箱を持って家に入る」 — bring the box inside → `garden_return_hub` | gating: none | effects: `curiosity` +1 | consumable: N
- 「箱を戻して家に入る」 — put it back; she'll think about it → `garden_return_hub` | (convergent — same `next`, different inner-voice register; effects below) | gating: none | effects: none | consumable: N

Convergent group: both → `garden_return_hub`. Whether she takes the box or not is flavour gating for Stage 5 (the box can appear on the kitchen table if taken; it doesn't open either way, but Satomi's relationship to it differs). No mechanical effect on flags.

NPCs present: none

---

### Scene: `garden_leave_box`

Purpose: She doesn't dig. The disturbed earth is a question she's choosing not to ask. She stands up and notes, before she can stop herself, that the soil is still slightly damp — the disturbance is recent. Then she goes back inside.

Choices:
- 「家に戻る」 — back inside → `garden_return_hub` | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `garden_return_hub`

Purpose: Satomi back in the corridor. Sets `visited_garden`. She wipes her hands on her jeans. The garden is the kind of wrong that is hard to file. Returns to hub.

Choices:
- 「廊下に戻る」 — back to the corridor → `house_hub` | gating: none | effects: `visited_garden: true` | consumable: N

NPCs present: none

---

## Beat 5 — 地下蔵 (The Basement/Storehouse)

### Scene: `basement_entry`

Purpose: The basement hatch in the corridor. Satomi has seen it before and not opened it. The latch is stiff but not locked. Below: a wooden ladder, darkness, the smell of old food and something else she doesn't name yet. Her inner voice is specific: she does not go into basement hatches in houses she doesn't own. Then corrects herself: she does own this house. That doesn't help.

Choices:
- 「蓋を開けて降りる」 — open the hatch and go down → `basement_descent` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: 「地下には行かない。きちんとした理由がある。具体的に言えと言われると困るが」) | effects: none | consumable: N
- 「もう少し心の準備をする」 — she's not ready; come back later → `house_hub` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `basement_descent`

Purpose: Below. A storehouse. Preserved food that should not still be intact — rice in earthen pots, dried things in bags, a stack of boxes that are damp at the base but not rotting. Old farm equipment — worn tools, a rusted harrow, rope in good condition. And at the back: the altar. It is lit. A small oil lamp. The lamp should not be burning — there is no way anyone lit it recently. The narrator describes it with the calm of someone explaining the bus schedule.

Choices:
- 「祭壇に近づく」 — approach the altar → `altar_approach` | gating: none | effects: `found_altar: true` | consumable: N
- 「部屋を確認してから祭壇へ」 — check the storehouse first; then the altar → `basement_storehouse` | gating: none | effects: none | consumable: N
- 「入口から見るだけにする」 — stay near the ladder; look from a distance → `basement_look_only` | gating: none | effects: none | consumable: N

NPCs present: none (the presence is here but not yet manifest)

---

### Scene: `basement_storehouse`

Purpose: Satomi examines the storehouse before the altar. The preserved food. The rope. A ledger with columns of numbers she can't place in any obvious accounting system. The tools are labelled in a dialect she barely recognises. She has spent enough time to understand that this space was actively used — not ceremonially, practically. Then she turns to the altar.

Choices:
- 「祭壇に向かう」 — now the altar → `altar_approach` | gating: none | effects: `found_altar: true` | consumable: N

NPCs present: none

_Note: Single-choice forced transition after the detour. She was always going to the altar._

---

### Scene: `basement_look_only`

Purpose: Satomi stays near the ladder. She looks at the altar from here. The lamp flickers; she can feel the draft from the hatch above her. She cannot read what's on the altar from this distance. She can only note that it exists, that someone has been tending it, and that it is making a small, almost inaudible sound that is probably just the lamp.

Choices:
- 「やはり近づく」 — changed her mind; go to it → `altar_approach` | gating: none | effects: `found_altar: true` | consumable: N
- 「上に戻る」 — back up the ladder → `basement_return_hub` | gating: none | effects: `composure` +1 | consumable: N

_Note: Choosing to leave sets `visited_basement` but NOT `found_altar`. This is Exit D territory — she's seen the room but not engaged. `found_altar` is not set here; Act 3 transition gate will block until it is._

NPCs present: none

---

### Scene: `altar_approach`

Purpose: Satomi at the altar. Objects: a photograph (Setsuko, and someone else — only partially visible at the edge), two small dishes with dried offerings, a folded paper. The oil lamp burns with unusual steadiness. The presence is here; she can feel this rather than see it. It becomes visible only if she touches the altar.

Choices:
- 「祭壇に触れる」 — touch the altar → `altar_touch` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: 「触らない。触らなくていい理由がたくさんある」) | effects: none | consumable: N
- 「触れずに見る」 — look without touching → `altar_observe` | gating: none | effects: none | consumable: N
- 「写真を見る」 — examine the photograph on the altar → `altar_photograph` | gating: none | effects: `curiosity` +1 | consumable: N

NPCs present: 祭壇の気配 (The Altar Presence — not yet visible)

---

### Scene: `altar_photograph`

Purpose: Satomi picks up the photograph. Setsuko, yes. And the other person at the edge — cut off, almost deliberately — is wearing a coat Satomi recognises. She doesn't say why. She doesn't say how. The narrator does not explain either. She puts the photograph down and now she is going to touch the altar.

Choices:
- 「祭壇に触れる」 — touch it → `altar_touch` | gating: `curiosity` ≥ 5; grey out if failed (inner voice: 「触らない。でも——」) | effects: none | consumable: N
- 「触れずに引き返す」 — look without touching; go back → `altar_observe` | gating: none | effects: none | consumable: N

NPCs present: 祭壇の気配

---

### Scene: `altar_observe`

Purpose: Satomi does not touch the altar. She studies it from here. The presence is somewhere in the room — she can't see it but the lamp behaves as if something is standing between her and it. She looks. She catalogues. She sets `found_altar: true` on leaving without touching — she has engaged, in her fashion. Sets `visited_basement`.

Choices:
- 「やはり触れる」 — no, actually, she's going to touch it → `altar_touch` | gating: `curiosity` ≥ 5; grey out if failed | effects: none | consumable: N
- 「上に戻る」 — enough; up the ladder → `basement_return_hub` | gating: none | effects: `composure` +1, `visited_basement: true` | consumable: N

NPCs present: 祭壇の気配

---

### Scene: `altar_touch`

Purpose: Satomi touches the altar. The lamp does not flicker. The presence does. It collects itself into something visible at the edge of her vision — she cannot look directly at it yet. And then it says her name. Not her family name. Her given name — さとみ — once, in a way that is not a question. It has known this name for some time. Sets `heard_name`.

Choices:
- 「気配に向き直る」 — turn and look directly at the presence → `altar_face` | gating: none | effects: `composure` -2 | consumable: N
- 「すぐに引き返す」 — back away immediately → `altar_retreat` | gating: none | effects: `composure` +1 | consumable: N

NPCs present: 祭壇の気配 (now visible, barely)

---

### Scene: `altar_face`

Purpose: Satomi turns and looks directly at the presence. It is visible for a moment — not threatening, but wrong in scale and arrangement, as if it has not quite settled on a shape and what it has settled on is close but not correct. Then: it seems embarrassed. The presence seems genuinely embarrassed to be seen. It does not flee the way the garden creature did — it simply becomes less visible, gradually, like someone backing very slowly out of a room. Sets `saw_face`.

Choices:
- 「声をかける」 — say something to it → `altar_speak` | gating: none | effects: `curiosity` +1 | consumable: N
- 「見続ける」 — keep watching as it fades → `altar_watch` | gating: none | effects: `curiosity` +1, `composure` -1 | consumable: N
- 「戻る」 — she's done; up the ladder → `basement_return_hub` | gating: none | effects: `visited_basement: true` | consumable: N

NPCs present: 祭壇の気配 (fading)

---

### Scene: `altar_speak`

Purpose: Satomi says something. She addresses the presence the way you'd address someone you've walked in on — an apology for the interruption, a statement of her intentions, an admission that she doesn't know what she's doing. The presence, in the process of becoming invisible, pauses. Something in it listens. Then it is gone. The lamp continues to burn. Sets `visited_basement`.

Choices:
- 「地上に戻る」 — back up the ladder → `basement_return_hub` | gating: none | effects: `visited_basement: true` | consumable: N

NPCs present: none (presence has gone)

---

### Scene: `altar_watch`

Purpose: Satomi watches the presence until it's gone. This takes longer than she expected. The lamp burns. At some point she realises she's been standing there for a while and her legs are getting cold. She goes back up. Sets `visited_basement`.

Choices:
- 「地上に戻る」 — back up → `basement_return_hub` | gating: none | effects: `visited_basement: true` | consumable: N

NPCs present: none

---

### Scene: `altar_retreat`

Purpose: Satomi backs away — she does not touch the altar again. She goes back up the ladder. Her name is still present in some register she can't name. `heard_name` is set. `saw_face` is not. `visited_basement` is set. Sets `visited_basement`.

Choices:
- 「地上に戻る」 — up the ladder → `basement_return_hub` | gating: none | effects: `visited_basement: true` | consumable: N

NPCs present: none

---

### Scene: `basement_return_hub`

Purpose: Satomi back in the corridor. Sets `visited_basement` if not already set. The hatch closes behind her. The corridor is ordinary. The narrator says: she counted the stairs going up. She counted correctly. Returns to hub.

Choices:
- 「廊下に戻る」 — back to the corridor → `house_hub` | gating: none | effects: `visited_basement: true` | consumable: N

NPCs present: none

---

## Hub — 家 (The House) — Post-Altar Beat

### Scene: `altar_after`

Purpose: Satomi returns from the basement. The hub feels different — she has changed or the house has or the gap between them has narrowed. This beat is different from a normal hub return: it is slower, observational. The first time `found_altar` is true and Satomi returns to the hub, this scene plays before the standard hub choices resume. The house is quiet in a way that implies it is listening. Her inner voice, for the first time since arriving, stops producing imaginary texts to Ryan. She is just standing in the corridor.

This scene determines whether `accepted` can be set:

Choices (if `found_altar` + `heard_name` + `saw_face` are all set):
- 「それと一緒に立っている」 — sit with it; don't deflect → `altar_after_accept` | gating: `flags: [found_altar, heard_name, saw_face]`; hide_if_failed | effects: `accepted: true`, `curiosity` +1, `composure` -1 | consumable: N
- 「お茶を入れる」 — shake it off; make tea; practical matters → `altar_after_tea` | gating: none | effects: `composure` +1 | consumable: N
- 「もう一度書斎へ行く」 — go back to the study; there are things she wants to reread → `house_hub` | gating: `flags_unset: [visited_study]`; hide_if_failed | effects: none | consumable: N
- 「もう少し調べる」 — there are rooms she hasn't seen yet → `house_hub` | gating: none | effects: none | consumable: N

_Note: The `accepted` flag is hidden and sets only once. Players who did not get all three altar flags do not see the first option. The narration of `altar_after` has a composure-gated variant — if `composure` ≤ 4, the inner-voice beat about stillness is more frayed._

NPCs present: none

---

### Scene: `altar_after_accept`

Purpose: Satomi stays with it — doesn't explain it to herself, doesn't make it smaller. Something has shifted in what she is willing to know. This is a short beat: her inner voice produces a single, unironic thought. The narrator does not comment on this. It is enough that it happened. Sets `accepted` (applied via the hub choice effects). Curiosity +1. Returns to hub.

Choices:
- 「続ける」 — continue → `house_hub` | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `altar_after_tea`

Purpose: Satomi goes to the kitchen and makes tea. The ceiling creature is still there. She ignores it. The tea is from her bag — airport green tea, two bags, slightly stale. She drinks it standing up. She doesn't sit down because sitting down would be a different kind of admission. Returns to hub.

Choices:
- 「廊下に戻る」 — back to the corridor → `house_hub` | gating: none | effects: none | consumable: N

NPCs present: 天井の住人 (background presence)

---

## Conversation Hub — 田中さん (The Neighbour Call)

### Hub: `tanaka_hub`

Purpose: Available only if `met_neighbour`. Satomi dials Tanaka Yutaka. He answers with the vocal energy of someone who has been waiting for this call — warm, measured, completely unsurprised. He has three topics. He does not advise her to leave. This is more alarming than if he did.

Returns from: `tanaka_topic_setsuko`, `tanaka_topic_reputation`, `tanaka_topic_anyone_else`

Choices:
- 「節子さんのことを教えてください」 — ask about Setsuko → `tanaka_topic_setsuko` | gating: `flags_unset: [tanaka_asked_setsuko]`; hide_if_failed | consumable: Y (`tanaka_asked_setsuko: true` on return) | effects: none
- 「この家の評判は？」 — ask about the house's local reputation → `tanaka_topic_reputation` | gating: `flags_unset: [tanaka_asked_reputation]`; hide_if_failed | consumable: Y (`tanaka_asked_reputation: true` on return) | effects: none
- 「ほかに泊まった人はいますか？」 — ask whether anyone else has stayed there → `tanaka_topic_anyone_else` | gating: `flags_unset: [tanaka_asked_anyone]`; hide_if_failed | consumable: Y (`tanaka_asked_anyone: true` on return) | effects: none
- 「失礼します」 — end the call → `house_hub` | gating: none | consumable: N | effects: none

Walk-away: 「失礼します」→ `house_hub` (always available, no requires)

NPCs present: 田中 豊 (Tanaka Yutaka) — phone call

---

### Scene: `tanaka_topic_setsuko`

Purpose: Tanaka has known Setsuko for forty years — as a neighbour, not a friend; she was not a person who invited friendship. She was a researcher. She used words like "custodian" and "obligation." He found these words unremarkable at the time. Now that she has died he finds them more interesting. He adds: she knew you were coming. He says this as a statement, not a dramatic revelation. Satomi notes this.

Choices:
- 「ありがとうございます」 — thank him and return to topics → `tanaka_hub` | gating: none | effects: `tanaka_asked_setsuko: true` | consumable: N

NPCs present: 田中 豊

---

### Scene: `tanaka_topic_reputation`

Purpose: Tanaka explains the local attitude: the house is not considered haunted. It is considered occupied. There is a difference, locally, between those two categories. Haunted implies something is wrong. Occupied implies the arrangement is working. The previous tenants — Tanaka mentions two families and a photographer — left earlier than planned. He reports this the way he'd report the weather.

Choices:
- 「なるほど」 — back to topics → `tanaka_hub` | gating: none | effects: `tanaka_asked_reputation: true` | consumable: N

NPCs present: 田中 豊

---

### Scene: `tanaka_topic_anyone_else`

Purpose: Tanaka says: yes, one person. A young man from Osaka — a student, researching traditional properties. He stayed four nights and left without saying goodbye. Tanaka received a postcard from Osaka six months later. Nothing written on it. Just a stamp. He describes this without inflection. Satomi asks what kind of stamp. Tanaka says: a house. Just a drawing of a house.

Choices:
- 「わかりました」 — back to topics → `tanaka_hub` | gating: none | effects: `tanaka_asked_anyone: true` | consumable: N

NPCs present: 田中 豊

---

## Beat 7 — 玄関口 (The Threshold)

### Scene: `house_threshold`

Purpose: Satomi goes to the entrance. Her bag is where she left it. Her plane ticket is valid for another three days. The narrator describes what is behind her — what she has seen, what she found, what she has not explained. Her inner voice begins to compose the most difficult imaginary text to Ryan so far. She doesn't finish it. Available only once `found_altar` is set; greyed out before that.

Choices:
- 「ここに留まる」 — stay; see it through → `threshold_stay` | gating: none | effects: none | consumable: N
- 「今すぐ出る」 — leave now; she's done → `threshold_leave_attempt` | gating: none | effects: none | consumable: N

NPCs present: none

---

### Scene: `threshold_stay`

Purpose: She decides to stay. She goes back to the kitchen. She will figure out what she's staying for. Act 2 ends; Act 3 begins.

Choices:
- 「調べ続ける」 — continue → Act 3 entry | gating: none | effects: none | consumable: N

NPCs present: none

_Single-choice forced transition. Act 3 begins._

---

### Scene: `threshold_leave_attempt`

Purpose: Satomi picks up her bag. She opens the front door. The garden path is there. The road beyond the gate is there. The ordinary world is there. She stands on the threshold. Something — not a hand, not a voice, not anything she can name — is in the way. Not blocking her. More like: asking a question she hasn't answered. The house has let her come and go all day. This is different.

Choices:
- 「やはり留まる」 — she changes her mind; stay → `threshold_stay` | gating: none | effects: none | consumable: N
- 「強引に出る——帰る」 — push through and leave → `threshold_forced_exit` | gating: none | effects: `curiosity` -1, `composure` +1 | consumable: N

NPCs present: none

---

### Scene: `threshold_forced_exit`

Purpose: Satomi leaves. She gets to the gate. She gets to the road. She walks. She is at the station forty minutes later. She has her ticket. She composes a text to Ryan — a real one this time — and does not send it. On the train, she looks out the window at nothing. Act 2 ends on a compressed note. Act 3 begins at the station, or in the car, or later — wherever leaving puts her.

_Note: This is the low-curiosity departure path into Act 3 (Exit D from act-2.md). Act 3 entry from this scene leads directly toward the Flee ending. `found_altar` is set; she cannot avoid Act 3 entirely but she is leaving without completing things._

Choices:
- 「電車に乗る」 — get on the train → Act 3 entry (Flee path) | gating: none | effects: none | consumable: N

NPCs present: none

---

## NPCs in This Act

- **多指の読者 (The Many-Fingered Reader)** — first appears in `study_entry`, returns briefly from the shelving gap if Satomi addresses it (`study_creature_address`). Creature. Does not speak. Appears embarrassed when noticed. Leaves a bookmark. No further appearances.

- **天井の住人 (The Ceiling Dweller)** — first appears in `kitchen_entry`, background presence throughout kitchen scenes. Present again (background only) in `altar_after_tea`. Creature. Does not speak or directly respond, but does stop flinching if addressed. Domesticated demeanour; wounded dignity when startled.

- **疾走者 (The Sprinter)** — appears in `garden_entry` and surrounding scenes. Creature. Flees almost immediately. Can be observed in `garden_bamboo` and `garden_bamboo_close` if Satomi follows. Does not speak or respond meaningfully — pure flight reflex, with the one exception of becoming very still when cornered, which reads as social embarrassment rather than aggression.

- **祭壇の気配 (The Altar Presence)** — appears in `altar_approach` onwards. Creature/spirit. Speaks once — Satomi's given name. Becomes visible only briefly, and only if touched. Seems embarrassed when seen directly. Fades rather than flees. Central to `heard_name` and `saw_face`.

- **田中 豊 (Tanaka Yutaka)** — available via phone call if `met_neighbour`. Three topics, all consumable. Warm, measured, unsurprised. Does not advise her to leave. First spoken in Act 2 (referenced in Act 1 via card).

- **里見 節子 (Setsuko Satomi)** — not present in person. Referenced throughout: study documents, kitchen umeboshi label, altar photograph. A presence through evidence. Cast entry should cover physical appearance (photograph), handwriting character, the oblique language she used about the house.

- **ライアン (Ryan)** — not present. Referenced via Satomi's imaginary texts throughout Act 2 and one real text she may or may not send. Background presence. No direct interaction.

---

## Validation Notes

- All consumable choices (Tanaka hub topics) have `flags_unset` on `requires` and matching flag set on return from sub-scene. ✓
- `knows_truth` requires two conditions: `study_documents_deep` reached AND `kitchen_examined` set. Can be completed in either order; the second condition to be met triggers the flag. Stage 5 must handle both orderings with conditional text. ✓
- `found_altar` is set on approach to altar or on entering `altar_approach` (any path). Not set by `basement_look_only` exit alone. ✓
- `heard_name` set only in `altar_touch` — requires altar contact. Cannot be set by approaching without touching. ✓
- `saw_face` set only in `altar_face` — requires turning and engaging with visible presence after `altar_touch`. ✓
- `accepted` requires `found_altar` + `heard_name` + `saw_face` all true, plus player choosing 「それと一緒に立っている」 in `altar_after`. This choice is hidden if conditions are not met. ✓
- `visited_study/kitchen/garden/basement` flags are each set on the return-hub scene, not in the room itself — prevents partial-visit edge cases where the player exits early before the flag is written. Exception: `visited_basement` also set on `altar_retreat` and `basement_look_only` exit (she was there). ✓
- Hub destinations: each room's first-visit choice uses `hide_if_failed` on `flags_unset: [visited_X]`. Return choices for the study (the only room with meaningful revisit content) are gated `flags: [visited_study]` and hidden by default. Kitchen, garden, and basement do not have meaningful revisit content in Act 2; hub returns after their first visit simply drop those choices. ✓
- The Act 3 transition is gated on `found_altar`. `house_threshold` is greyed out (not hidden) before `found_altar` — Satomi can see the option but her inner voice blocks it. This matches the grey-out vs. hide policy from structure.md. ✓
- `threshold_forced_exit` exits to Act 3 Flee path despite `found_altar` being set — this is correct. `found_altar` gates the *availability* of the threshold scene, not the ending. The ending choice is Act 3's responsibility. ✓
- No scene exceeds 6 active choices. ✓
- Every beat from `act-2.md` has named scenes. ✓
- All Act 2 exits from `act-2.md` (A–F) are reachable through paths above. ✓
