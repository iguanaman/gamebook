# 里見の家 (Satomi no Ie) — Structure

## Acts

- **Act 1 — 到着 (Arrival):** Satomi arrives at the house, meets the neighbour briefly, and settles in alone. The house is just a house — dusty, cold, slightly wrong. Small strangeness accumulates. Curiosity or composure begins to bend.
- **Act 2 — 発見 (Discovery):** Investigating the house proper — rooms, objects, the altar, the garden. Satomi pieces together who left it and what they were doing. The presences become visible. The horror turns personal when she realises the house knows her name.
- **Act 3 — 決断 (Decision):** The full shape of what's here is exposed. The final binary choice — stay or flee — determines which of the three endings plays out, filtered through `curiosity` stat and flags accumulated across Acts 1–2.

---

## Turning Points

1. **The wrong corridor** (Act 1 → 2): A physical impossibility — a corridor that is longer on the inside, or a room that doesn't correspond to the outside of the house. Player chooses to measure it (curiosity +1) or pretend it didn't happen (composure +1, curiosity -1). This is the moment Satomi can no longer plausibly deny something is wrong.

2. **The altar** (Act 2 mid): Finding the concealed altar in the back room. Touching it sets `found_altar` and triggers the first direct encounter. This is also where `heard_name` becomes available — a voice says her given name in a way that implies it has been waiting. Both flags are required for the Embrace ending.

3. **The face** (Act 2 late): A presence manifests clearly — not threatening, but unmistakable. Satomi can engage (sets `saw_face`) or retreat. The presence seems embarrassed. This scene determines whether she understands or merely survives, and gates the Confront ending.

4. **The call** (Act 3 threshold): Before the final choice, Satomi can call Ryan (sets `called_ryan`). The call goes to voicemail. What she leaves as a message is shaped by `composure`. This is the last beat of recognisable ordinary life before the final decision.

---

## Branch Map

### Act 1 Forks

- **Meet the neighbour fully vs. brush him off** → sets `met_neighbour`. If set, he returns in Act 3 with a warning. If not, Act 3 has no outside anchor — isolation is total.
- **First night: investigate the sound vs. ignore it** → curiosity ±1, leads into Act 2 via different entry scenes (proactive vs. reluctant investigator). Both converge on Act 2 hub.

### Act 2 Hub — The House

The house itself is a hub. Satomi can explore rooms in any order. Each room visit sets a flag and returns her to the hub. Some rooms become inaccessible after key flags are set (the door that won't open again).

Rooms available:
- 書斎 (Study) — documents, family history, partial truth
- 仏間 (Altar room) — the altar, the name, the first presence
- 庭 (Garden) — the overgrown garden, a buried object, a creature that flees
- 廊下の奥 (The deep corridor) — the geometry problem, a consumable choice (the door opens once)

The deep corridor door is a **consumable choice**: once `opened_door` is set, the "open the door" option is replaced by a different scene on return. Requires `flags_unset: [opened_door]` + `effects: flags: opened_door: true`.

**NPC conversation hub — the neighbour** (if `met_neighbour`): Satomi can call him. Modelled as a phone-call conversation hub. Topics: the family member's history, the house's local reputation, whether anyone else has stayed there. Topics deplete via `flags_unset`.

### Act 2 → Act 3 Gate

Transition to Act 3 triggers when Satomi has visited at least the altar room (checks `found_altar`). If she tries to leave before then, a scene blocks exit — something is in the way. After `found_altar`, she can trigger Act 3 voluntarily by going to the entrance and deciding.

### Act 3 Forks

- **`knows_truth` not set** → the Flee ending is forced (she doesn't understand enough to confront or embrace)
- **`knows_truth` set, `curiosity` < 6** → binary choice: Flee or Confront
- **`curiosity` ≥ 6** → binary choice visible: Flee or Confront
- **`accepted` set** (requires `found_altar` + `saw_face` + `heard_name` + `curiosity` ≥ 7) → Embrace ending path becomes visible as a third option

---

## Endings

- **逃げる — Flee:** Satomi boards up the house, files the paperwork with the estate agent by phone, and drives to the airport. The narrative is brisk, efficient, almost convinced. A week later the dreams start — she's back in the corridor, and it's longer than before. Bittersweet/open. Reached via: low curiosity, or `knows_truth` unset, or choosing to leave.

- **向き合う — Confront:** Satomi stays the night and completes whatever the family member began (or deliberately undoes it). The mechanism depends on what she found — she'll know what to do if `knows_truth` is set and `saw_face` is set. The house settles, audibly. Something leaves. She misses her flight. Ryan books a new one. She sits in the garden with tea and the house is just a house again — but the corridor is still wrong. Reached via: `curiosity` ≥ 6 + `knows_truth` + `saw_face` + player chooses to stay.

- **受け入れる — Embrace:** Secret ending. Satomi realises she was always going to come here. The family member wasn't a stranger — the house was written for her in some sense the story makes literal. She calls Ryan and tells him to pack some things. She's found somewhere to stay. Cheerful delivery, deeply unsettling subtext. Reached via: `accepted` flag + `curiosity` ≥ 7 + `found_altar` + `saw_face` + `heard_name`.

---

## Mechanics Summary

**Stats:**
- `curiosity` (0–10, starts 5): rises when Satomi investigates, falls when she pulls back or refuses to look. Primary gate for ending access. Also unlocks some choices in Act 2 (high curiosity = willing to touch the altar, open the door).
- `composure` (0–10, starts 8): falls when something genuinely frightening happens, rises when Satomi reasserts control (calling Ryan counts). Affects narration tone — drier when high, more frayed when low. Does not gate endings. Shapes text via `if` conditions on `composure` stat checks.

**Flags:**

| Flag | Set when | Visibility | Purpose |
|---|---|---|---|
| `met_neighbour` | Engage properly in Act 1 | Hidden | Unlocks neighbour call in Act 2, warning in Act 3 |
| `found_altar` | Enter altar room and interact | Hidden | Required for Confront + Embrace endings; gates Act 3 transition |
| `heard_name` | Voice in altar room | Hidden | Required for Embrace ending |
| `saw_face` | Engage with the manifest presence | Hidden | Required for Confront + Embrace endings |
| `opened_door` | Open the deep corridor door | Hidden | Consumable — door unavailable on return |
| `knows_truth` | Piece together the family history fully | Hidden | Required for Confront ending; gates Act 3 choices |
| `called_ryan` | Call Ryan before final choice | Hidden | Flavour — shapes Act 3 narration tone |
| `accepted` | Specific Act 2 sequence (altar + face + name) | Hidden | Required for Embrace ending |

All flags are hidden (not shown in HUD). The story's horror works by not telegraphing its mechanics.

**Consumable choice:**
- "Open the door" in the deep corridor: requires `flags_unset: [opened_door]`, applies `effects: flags: opened_door: true`. On return, the door choice is absent; a different scene describes the sealed door.

**Grey-out vs hidden:**
- Failed `requires` on `curiosity` thresholds: **grey out** — Satomi can see she could investigate further but won't. The player knows the option exists; that she's choosing not to look is character expression.
- Embrace ending option in Act 3: **hidden** if not unlocked — its existence would be a spoiler.
- Consumable choices (opened door, each neighbour call topic): **hidden** once consumed.

**When mechanics matter:**
- Act 1: `curiosity` starts shifting. `met_neighbour` set or not.
- Act 2: Most flags set here. `curiosity` gates some room interactions. `composure` colours text throughout.
- Act 3: All flags checked for ending access. `curiosity` final threshold checked. `composure` shapes the voicemail content and closing narration tone.

---

## Hubs

- **House hub** (Act 2): Central scene Satomi returns to between room explorations. Flags progressively change what's available — rooms visited drop their "first visit" options, new strangeness appears.
- **Neighbour phone call** (Act 2, requires `met_neighbour`): Conversation hub. Topics deplete via `flags_unset`. Always includes an exit ("I have to go").

---

## Scene Budget (approx. 30 scenes)

| Section | Count |
|---|---|
| Act 1: Arrival, neighbour, first night | 7 |
| Act 2: House hub + 4 rooms + room events | 12 |
| Act 2: Neighbour call hub + 3 topics | 4 |
| Act 3: Threshold + call Ryan + final choice | 4 |
| Endings (3) | 3 |
| **Total** | **30** |

Player sees ~10–15 per run depending on which rooms they visit and which ending they reach.
