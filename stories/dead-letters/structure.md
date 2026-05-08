# Dead Letters — Structure

> **Detective's name chosen:** Frank Cady — period-appropriate, slightly worn, nothing heroic.
> **Betrayal character:** Walt Kellner — old partner from Frank's cop days, now a lieutenant in the city's Organized Crime Unit. He's the one who got Frank pushed out of the force, and Frank never fully put that together. The betrayal lands because Frank trusted him anyway.
> **Conspiracy specifics:** The city is secretly seizing and re-titling land in the Aldwick neighbourhood under a rigged condemnation process — clearing the way for a federal highway project that will make connected real estate investors (and the mayor) very wealthy. The surveyor, Ray Doss, found the falsified boundary surveys and land titles. He was going to go to the state auditor.

---

## Acts

- **Act 1 — The Case:** A woman named Vera Doss hires Frank to find her missing husband Ray. Routine legwork — Frank talks to Ray's coworkers, visits his last known locations, picks up fragments of a larger picture. Vera is killed before Act 1 ends. Frank now has a dead client and enough pieces to know this isn't a missing-persons case.
- **Act 2 — The Knot:** Frank digs into the conspiracy — the Aldwick land seizure, the falsified surveys, the money moving through city contracts. He develops informants, gets warned off, picks up heat, and eventually finds the ledger Ray hid. Walt Kellner surfaces as a supposed ally. Frank reaches a point where he knows enough to act — but acting requires choosing who to trust and what to risk.
- **Act 3 — The Cost:** The conspiracy closes in. Kellner's betrayal lands. Frank must decide what to do with the evidence — expose it, bury it, or get outrun by the people who want him dead. The ending is determined by evidence gathered and a final binary choice.

---

## Turning Points

1. **Vera's death (end of Act 1):** What was a missing-persons job becomes a murder investigation Frank is running alone. The player commits to pushing forward or can choose to walk away (walk away = Bury It ending, early exit).
2. **Finding the ledger (mid Act 2):** Ray's hidden evidence cache changes Frank's evidence stat significantly. This is also when heat spikes — the bad guys know Frank is close.
3. **Kellner's betrayal (Act 3 opening):** Frank goes to Kellner expecting backup; instead he gets sold out. He escapes (or doesn't — permadeath path if heat is maxed and rep is low). The betrayal reframes everything Frank thought he knew about why he left the force.
4. **The final choice (Act 3 climax):** With the evidence in hand (or not), Frank chooses: expose (go to a journalist), bury it (burn the ledger and disappear), or — if the wrong people already found him — die trying (Martyr path, only reachable if left_package flag was set earlier).

---

## Branch Map

### Hubs
- **Frank's office** — returns between investigations in Act 1–2. Messages, leads, and visitors arrive here. Available options change as flags are set (Vera arrives; Vera stops arriving after her death; new threats appear).
- **Aldwick neighbourhood** — a location Frank returns to multiple times in Act 2. Residents who trust him (rep-gated) give different information each visit as the story progresses.
- **Talk to Walt Kellner** — NPC conversation hub, Act 2. Topics: Frank's past, the Aldwick situation, city politics, whether Frank should drop it. Each topic sets a flag; exhausted topics disappear. Frank can read Kellner's responses as either cautionary or conspiratorial — ambiguity is intentional. Hub closes when betrayal triggers in Act 3.

### Forks

- **Fork A — After Vera's death (Act 1 end):**
  - Push forward → Act 2 begins normally
  - Walk away → Bury It ending (early, low-guilt variant — Frank didn't know enough to know what he was abandoning)

- **Fork B — Investigating Ray's workplace (Act 2 early):**
  - Charm/persuade Ray's supervisor (rep ≥ 4) → learn about the Aldwick surveys directly, evidence +2
  - Sneak into the records room → evidence +1 but heat +2; risk of getting caught (heat already high = confrontation scene, possible permadeath)
  - Back off → no gain, heat stays low, but the evidence path is harder later

- **Fork C — Aldwick source: Marta Gaines (Act 2 mid):**
  - Marta is a resident who knows what's happening to her neighbourhood. If rep ≥ 5: she talks openly, reveals the rezoning document trail. If rep 3–4: she talks, but partial. If rep < 3: she refuses, this thread closes.
  - This is the primary path to finding where Ray hid the ledger.

- **Fork D — The ledger location (Act 2 late):**
  - Find the ledger (via Marta's thread OR records room thread) → found_ledger flag; evidence jumps
  - Miss both threads → ledger not found; evidence stays low; Expose ending is locked; only Bury It available at end

- **Fork E — Left package decision (Act 2 late / before Kellner betrayal):**
  - Frank can mail a copy of key evidence to journalist Dora Reyes — consumable choice (left_package flag; option disappears once taken)
  - If left_package is set: Martyr ending becomes available in Act 3
  - If not set: Martyr ending is locked

- **Fork F — Kellner confrontation (Act 3):**
  - If heat ≥ 8 AND rep ≤ 3: ambush is lethal, Frank dies → permadeath ending (not one of the three main endings — this is the "you played badly" death)
  - Otherwise: Frank escapes, badly burned, into the final choice

- **Fork G — The final choice (Act 3 climax):**
  - evidence ≥ 6: Expose or Martyr available
  - evidence < 6: only Bury It
  - If evidence ≥ 6: binary choice — go public (Expose) or walk away (Bury It, late variant — Frank knows exactly what he's abandoning)
  - If left_package is set AND the wrong people find Frank first (high heat path): Martyr ending triggers without the binary choice — the decision was made earlier

---

## Endings

- **Ending 1 — Expose:** Reached via high evidence (≥ 6) + player chooses to go public. Frank takes everything to a journalist. The story runs. The city machine slows but doesn't stop. Frank loses his licence, probably his safety. Possibly his life — left ambiguous. He did the thing. The city changes, slowly.
- **Ending 2 — Bury It:** Reached via low evidence OR player chooses to walk away at either Fork A or the final choice. Two flavours: early exit (Frank didn't know enough to feel the weight of it) and late exit (Frank knows exactly and chooses survival anyway). Both leave the conspiracy intact. Dirty but alive.
- **Ending 3 — Martyr:** Reached via left_package flag set + high heat forces the confrontation before Frank can choose. He doesn't make it out. But the package reaches Dora Reyes. The story runs posthumously. The most tragic ending — Frank did everything right and still didn't survive it.
- **Permadeath — Pavement:** Not an ending in the three-endings sense — it's a failure state. Reached by maxing heat without building rep to survive the Kellner confrontation. Frank walks into an ambush and doesn't walk out. No journalist. No justice. Just gone.

---

## Mechanics Summary

**Stats:**
- `evidence` (0–10): clues gathered. Gates Expose (≥ 6) and Martyr (≥ 6 implied by left_package path). The primary "did you do your job" metric.
- `heat` (0–10): how exposed Frank is. High heat (≥ 7) triggers escalated ambient threat scenes; heat ≥ 8 + low rep = lethal ambush. Accumulates from reckless choices (breaking in, being spotted, pushing too hard).
- `rep` (0–10): standing with sources — Aldwick residents, city hall insiders, working press. Gates information from Marta Gaines and other informants. Also survivability in the Kellner confrontation.

**Starting values:** evidence 0, heat 0, rep 3 (Frank is a known quantity in the city, not beloved).

**Flags:**

| Flag | Purpose | Consumable? | Player-visible? | Gate behaviour |
|---|---|---|---|---|
| `met_vera` | Vera's introduction scene completed | No | No | Required for some early Act 1 choices |
| `vera_dead` | Vera's death witnessed/confirmed | No | No | Changes Frank's office hub; unlocks Act 2 |
| `found_ledger` | Ray's evidence cache located | No | Yes ("Ledger") | Gates evidence spike; required for Expose/Martyr |
| `left_package` | Evidence copy mailed to Dora Reyes | Yes (consumable) | Yes ("Package sent") | Gates Martyr ending; option hidden once taken |
| `trusted_kellner` | Frank confided in Kellner in Act 2 | No | No | Worsens betrayal scene; affects dialogue options in Act 3 |
| `cops_warned_off` | Frank has been formally warned by police | No | No | Changes ambient threat text; heat modifier |
| `marta_talked` | Marta Gaines gave full account | No | No | Gates ledger location chain |
| `aldwick_visited` | Frank has been to Aldwick | No | No | Opens Aldwick hub |
| `records_room` | Frank broke into city records | Yes (consumable) | No | +1 evidence; hidden after use (can't go back) |
| `confronted_kellner` | Betrayal scene completed | No | No | Closes Kellner hub; Act 3 lock |
| `frank_past_revealed` | Frank's reason for leaving the force uncovered | No | No | Stat-gated (rep ≥ 6): reveals Frank was pushed out for refusing to bury a case — the same machine, different year |

**Consumable choice notes:**
- `left_package`: choice to mail evidence appears once in Act 2. Effects set `left_package: true`. Requires `flags_unset: [left_package]`. Hidden after taken (`hide_if_failed: true`).
- `records_room`: break-in opportunity appears once. Same pattern — hidden after use.

**Grey-out vs. hide:**
- Rep-gated informant choices: **grey out** — player should know the source exists, even if they can't access them. Failure text: "She doesn't trust you enough."
- Evidence-gated endings: **grey out** at the final choice — player sees what they can't reach. Failure text: "You don't have enough to make it stick."
- `left_package` and `records_room` consumables: **hide** after taken — the option's prior existence would be confusing, not informative.
- Heat-triggered ambush scenes: **hidden** — the player shouldn't see "walk into the ambush" as a labelled choice.

**When mechanics matter most:**
- Act 1: rep starts building (or doesn't); evidence trickles in; heat stays low
- Act 2: all three stats in active play; ledger find = big evidence spike; heat management becomes critical
- Act 3: thresholds lock or unlock endings; rep ≥ 4 required to survive Kellner ambush at high heat
