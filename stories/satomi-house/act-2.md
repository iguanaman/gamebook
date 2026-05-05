# 里見の家 (Satomi no Ie) — Act 2: 発見 (Discovery)

## Journal Entry
あなたは家の中を歩き回る。家も、あなたのことを調べているようだった。

_(You move through the house. The house, it seems, is also investigating you.)_

## Entry

Arrives from: Act 1 exits A–E
Player state at entry:
- `met_neighbour` set or unset
- `curiosity` 4–7
- `composure` 5–9
- No story flags set yet

Entry tone varies by Act 1 exit: high-curiosity players open Act 2 already committed to looking; low-curiosity players arrive reluctant, some Act 2 choices immediately greyed. The house hub scene uses `composure` to colour its opening narration — dry and measured at high composure, already fraying at low.

---

## Beats

### Beat 1 — 家の中心 (The House Hub)

What happens: Satomi stands in the main corridor of the ground floor — the junction between rooms, the spine of the house. The narrator names what's here, what's closed, what's open. This is not an arrival scene; it is orientation. She can feel the house has a shape she hasn't understood yet. Her inner voice produces a list. Lists are how she manages things.

What the player decides/learns: Entry into the hub proper. Four rooms are available: 書斎 (study), 台所 (kitchen), 庭 (garden), and 地下蔵 (basement/storehouse). Each room can be visited in any order. The hub is returned to after each room. The hub narration changes as flags accumulate — visited rooms stop offering their first-visit text; the corridor itself grows subtly stranger between visits (a smell, a sound, a slight change in temperature that wasn't there before). The hub also surfaces the neighbour call option if `met_neighbour` is set.

Connects to: Any of Beats 2–5 (player's choice), Beat 6 (when `found_altar` is set and player chooses to stop)

---

### Beat 2 — 書斎 (The Study)

What happens: The study is orderly in a way that suggests someone was orderly under pressure. Setsuko's papers are stacked, cross-referenced, annotated. She was researching the house — or rather what was in the house before the house was there. Land records going back past the Meiji era, a hand-drawn map of the property that includes a room that isn't on the floor plan, and a notebook in cramped handwriting that rewards patience. The creature here lives in the bookshelf. It has too many fingers. It is clearly absorbed in reading and does not initially notice Satomi.

What the player decides/learns: Primary source of the family history — piecing together `knows_truth` happens here, via reading depth. The player can read thoroughly (two or three exchanges — curiosity +1 per layer, up to +2 total) or skim and retreat. Skimming yields a partial picture; thorough reading, combined with the kitchen's information, sets `knows_truth`. The creature encounter: player can observe it quietly (curiosity +1, composure -1), attempt to address it (it is embarrassed; it leaves behind a bookmark — flavour), or quietly back out (composure +1). Sets `visited_study`.

Connects to: Hub (return after visit)

---

### Beat 3 — 台所 (The Kitchen)

What happens: The kitchen is the least frightening room and therefore the most unsettling. It is clean. Someone cleaned it recently — within days, not decades. The refrigerator contains three items: a jar of homemade umeboshi, a can of beer (Satsuma brand, discontinued in 1987), and something Satomi declines to identify. The creature in the kitchen is large, moves along the ceiling, and is clearly domesticated — it flinches when Satomi opens a cupboard too sharply, then recovers its dignity with effort.

What the player decides/learns: The kitchen confirms what the study implies — someone was here recently, doing ordinary things. Combined with the study's notebook, this is the second half of `knows_truth`: Setsuko was not performing a ritual. She was maintaining an arrangement. The player can: leave the refrigerator alone (composure +1, misses the context), examine the contents (curiosity +1, gains the "recent visitor" context needed alongside the study for `knows_truth`), or speak to the ceiling creature (it doesn't answer but it does stop flinching — `composure` -1 from the proximity, but something shifts in the room). Sets `visited_kitchen`.

Connects to: Hub (return after visit)

---

### Beat 4 — 庭 (The Garden)

What happens: The garden is overgrown but not abandoned — there is a logic to what has grown where, as if something has been tending it without caring what the result looks like to a human. A stone water basin. A path leading to the back wall where the bamboo has grown through the stone. Under the bamboo, a buried object — Satomi can see the ground has been disturbed, and recently. The creature here is the one that flees: fast, low to the ground, too many legs in the wrong arrangement, clearly terrified of her. It vanishes into the bamboo before she gets a good look.

What the player decides/learns: The garden is about the buried object and the question of whether to dig. Satomi can investigate the disturbed ground (curiosity +1, composure -1 — she finds something she can't immediately explain: a small box, lacquered, with a lock she doesn't have a key for); leave it alone (composure +1); or examine the basin, which has something carved into its underside that she'd have to get very close to the ground to read (curiosity +2, composure -1 — she reads it; it is her family name, which this house should not know). Sets `visited_garden`. The basin carving, if found, is a significant horror beat — composure -1 and `heard_name`-adjacent, but does not itself set `heard_name` (that is reserved for the altar). It does, however, prime the player for that moment.

Connects to: Hub (return after visit)

---

### Beat 5 — 地下蔵 (The Basement/Storehouse)

What happens: The basement is accessed via a hatch in the corridor — it requires `curiosity` ≥ 5 to open without the choice greying out (Satomi's inner voice: she does not go into basement hatches in houses she doesn't own, and she is sticking to that). Below is a storehouse: preserved food that shouldn't be intact, old farm equipment, and the altar. It is not hidden, exactly. It has been placed in the back corner with intention. It is lit — a small oil lamp that should not still be burning. The altar is attended by a presence that does not immediately manifest. It becomes visible only if Satomi approaches.

What the player decides/learns: The most consequential room. The altar is the pivot of the story — this is where `found_altar` is set. Satomi can: approach and touch the altar (requires `curiosity` ≥ 5 — if greyed, she can still set `found_altar` by going near it, but the more significant flags require contact); only approach without touching (sets `found_altar`, does not trigger the name or the face); or stay at the entrance and leave (`found_altar` not set — she's seen the room but not engaged). If she touches the altar, the presence speaks — it says her given name, once, in a way that is not a question. Sets `heard_name`. Then, briefly, it is visible. Satomi can engage with the manifested presence (sets `saw_face`, curiosity +1, composure -2 — it seems embarrassed; she is not having a good time but is also unable to look away) or retreat immediately (composure +1, `saw_face` not set). Sets `visited_basement`.

The combination `found_altar` + `heard_name` + `saw_face`, accumulated across this beat, is what primes `accepted` — the flag itself is set only once all three are in place and Satomi makes a specific choice at the hub following this visit (Beat 7). Requiring a hub-return moment rather than instant flag-set prevents the basement from feeling like a single-beat secret ending.

Connects to: Hub (return after visit); Beat 7 if `found_altar` is set

---

### Hub — 家 (The House)

Purpose: The central hub Satomi returns to between every room visit. Narration evolves based on which rooms have been visited and which flags are set. The house's strangeness accumulates between visits — a sound that wasn't there, a screen door that is now open, a smell like cold incense. Each return is a beat of micro-assessment. The player chooses which room to visit next, or whether to call the neighbour (if `met_neighbour`), or — once `found_altar` is set — to trigger the Act 3 transition by going to the entrance. Before `found_altar`, attempting to leave is gently blocked: something is in the way, or Satomi simply does not go.

Returned to from: Beats 2, 3, 4, 5 (all rooms)
Exits to: Any unvisited room; Neighbour Call Hub (if `met_neighbour`); Beat 7 (if `found_altar` — the hub presents the altar-return moment); Beat 8 (the transition threshold, if `found_altar` and player chooses to go to the entrance)

---

### Conversation Hub — 田中さん (The Neighbour Call)

Purpose: Available only if `met_neighbour`. Satomi dials the neighbour's number. Tanaka-san answers with the precise vocal energy of a man who has been expecting this call. He has three topics: Setsuko's history (what she was actually doing in the house — confirms what the study suggests, adds a personal dimension he knows because he lived next door for forty years), the house's local reputation (matter-of-fact, not superstitious — the locals don't think it's haunted, they think it's occupied, and they consider this a different category), and whether anyone else has stayed there (yes; one person; they left without saying goodbye; Tanaka-san received a postcard from Osaka six months later, nothing written on it, just a stamp). Each topic depletes via `flags_unset`. Tanaka-san does not advise her to leave, which makes his conversation more alarming than if he did.

Where it sits in the beat flow: Available at the hub any time after Beat 1, if `met_neighbour`. Can be accessed before or after room visits. All topics can be exhausted before visiting the altar — this is intentional, as it means a player with social connection goes into the altar moment informed.

---

### Beat 6 — 祭壇の後で (After the Altar)

What happens: Satomi has returned from the basement. The hub feels different — the air has changed, or she has. This is the short beat where `accepted` can be set. The house is quiet in a way that implies it is listening. Satomi has a moment of unusual stillness: for the first time since arriving she is not composing an imaginary text to Ryan. She is just standing in the corridor.

What the player decides/learns: If `found_altar` + `heard_name` + `saw_face` are all set: Satomi has a specific internal beat where her inner voice stops being sardonic and produces a single, unironic thought. The player can: sit with it (composure -1, sets `accepted` — she did not pull away from understanding); or shake it off and make tea (composure +1, `accepted` not set — she's choosing not to know what she knows). This beat is only fully available if all three altar-room flags are present; otherwise it is a shorter return moment — just the changed air, her tiredness, the narrative noting what she's carrying. If `accepted` is set, curiosity +1.

Connects to: Hub (player may still visit unvisited rooms before triggering the Act 3 transition)

---

### Beat 7 — 玄関口 (The Threshold)

What happens: Satomi goes to the entrance. She has her bag. Her ticket is still valid. The narrator describes what is behind her — what she has seen, what she has found, what she has not explained. She has to decide whether this is the moment she leaves, or the moment she stays and sees it through. If `found_altar` is not set, this beat is inaccessible — the entrance is not available as a destination; something is always in the way, or she simply turns back each time. Once `found_altar` is set, the threshold opens.

What the player decides/learns: This is the Act 2 exit gate — it does not choose the ending (that is Act 3's work) but it commits Satomi to facing whatever comes next, rather than leaving mid-investigation. From here, Act 3 begins.

Connects to: Act 3 entry (all paths)

---

## Exits

**Exit A — 全部知っている (Fully Informed):** Visited all four rooms; read the study thoroughly; examined the kitchen; found the basin carving in the garden; touched the altar, heard her name, engaged with the presence. `knows_truth` set, `found_altar` set, `heard_name` set, `saw_face` set. If `accepted` also set: curiosity ≥ 8, composure 3–5. If `accepted` not set: curiosity 7–8, composure 4–6. Neighbour call exhausted or not depending on `met_neighbour`. Enters Act 3 with maximum information and the Embrace ending in reach (if `accepted` + curiosity ≥ 7).

**Exit B — 知っているが引いた (Informed but Withdrawn):** Visited all or most rooms; has `knows_truth` (study + kitchen both read); set `found_altar` and `heard_name` but retreated before engaging the presence (`saw_face` not set; `accepted` not set). curiosity 6–7, composure 6–8. Enters Act 3 with Confront ending blocked (needs `saw_face`), Flee and a partial Confront path available. The Confront ending is specifically gated on `saw_face` — she understands enough to complete what Setsuko started, but only if she looked at what she was completing it with.

**Exit C — 祭壇だけ (Altar Only):** Skimmed or skipped most rooms; has `found_altar` (possibly `heard_name` if she touched it; `saw_face` uncertain). `knows_truth` not set (study not read thoroughly, kitchen not examined). curiosity 5–6, composure 6–8. Enters Act 3 without the Confront ending available (requires `knows_truth`). Can reach Flee ending; Embrace is inaccessible. Understands something is happening but not what.

**Exit D — 低好奇心、表面のみ (Low Curiosity, Surface Only):** Did not open the basement (curiosity < 5 at the hatch, or chose not to). `found_altar` not set. Has visited some other rooms, surface-level. curiosity 4–5, composure 7–9. Enters Act 3 via the threshold only because the plot requires it — the house has allowed it, and Satomi feels this as a concession. Act 3 is essentially forced toward the Flee ending: no `found_altar` means the Confront and Embrace paths are both closed.

**Exit E — 外と繋がっている (With the Neighbour):** `met_neighbour` set, Tanaka call completed (some or all topics exhausted). Carries the same spread as Exits A–C for room flags, but with the additional context layer from Tanaka. In Act 3, the neighbour provides an external reference point — his warning (delivered as a second call, or a text she reads) gives Satomi a recognised-world anchor that shapes the final choice. This is not a separate exit from A–C but an overlay: any of A–C can carry this. Named separately because Act 3 needs to know whether to surface the neighbour's Act 3 beat.

**Exit F — 疲労と不安 (Worn and Unsettled):** Any path where `composure` has fallen to 3 or below entering Act 3. Available across multiple room-visit combinations — high investigation rate without any composure-restoring choices. curiosity 6–8, composure 2–3. Enters Act 3 with narration visibly strained; Satomi's inner voice is no longer reliably sardonic. She is frightened and knows it. All endings still technically available depending on other flags, but the framing is darker. Act 3 uses `composure` ≤ 3 to unlock a specific desperate register in the threshold choices.

_Note: Exits D and F can overlap (low curiosity AND low composure) but this combination is hard to reach — low curiosity paths tend to avoid the high-composure-cost encounters. If it occurs, Act 3 treats it as Exit D (force-Flee path) with Exit F's narration colouring._

---

## Flags/Stats Changed

- `found_altar` — set when Satomi enters the basement and approaches or touches the altar. Hidden. Required for Act 3 transition gate, Confront ending, Embrace ending.

- `heard_name` — set when Satomi touches the altar and the presence speaks. Hidden. Required for Embrace ending. Only available if `curiosity` ≥ 5 at time of altar contact.

- `saw_face` — set when Satomi engages with the manifested presence in the basement. Hidden. Required for Confront ending and Embrace ending.

- `accepted` — set in Beat 6 (post-altar hub return) when all three altar flags are present and Satomi sits with the moment rather than deflecting. Hidden. Required for Embrace ending. Also grants curiosity +1.

- `knows_truth` — set when Satomi reads the study thoroughly AND examines the kitchen's context clues (both required). Hidden. Required for Confront ending.

- `visited_study`, `visited_kitchen`, `visited_garden`, `visited_basement` — set on first entry to each room. Hidden. Used internally for hub narration changes and one-time first-visit scenes. Not surfaced to player.

- `curiosity` — net changes in Act 2:
  - Study: thorough read +1 (first layer) +1 (second layer), skim +0, creature engagement +1
  - Kitchen: examine fridge +1, speak to ceiling creature +0
  - Garden: dig/investigate ground +1, basin carving +2, leave alone +0
  - Basement: approach altar +0, touch altar +0, engage presence +1; `accepted` path +1
  - Net range entering Act 3: 4–12 (effectively capped at 10 per stat design; high-curiosity player enters Act 3 at 9–10)

- `composure` — net changes in Act 2:
  - Study: observe creature quietly -1, back out +1
  - Kitchen: speak to ceiling creature -1, leave refrigerator alone +1
  - Garden: dig up box -1, basin carving -1, leave alone +1
  - Basement: engage presence -2, retreat +1; `accepted` path -1
  - Neighbour call: no direct composure change (informational, stabilising in tone)
  - Net range entering Act 3: 2–10 (low end requires maximum engagement with every high-cost encounter)

All flags are hidden. No stats are surfaced in HUD. Mechanics remain invisible to player.
