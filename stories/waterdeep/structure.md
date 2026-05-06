# One Night in the Yawning Portal — Structure

## Acts

- **Act 1 — The Tavern:** Arrive at the Yawning Portal, get the lay of the room, take the job from the anxious regular, gather rumour from named patrons, and recruit exactly two of four companion candidates. Hub-driven; ends when the player commits to descending the well with a chosen pair.
- **Act 2 — The Spokes:** Pursue leads through Waterdeep — the Trades Ward streets, the harbour, one specific city location — then descend into the upper levels of Undermountain via the Portal's well. Each major spoke carries at least one combat beat. Ends when the player reaches the lost apprentice (or what is left of them) and learns what is really down there.
- **Act 3 — The Return:** Climb back out (or fail to), return to the Portal, settle accounts at the bar, and choose how the night ends. Short and consequential — most ending differentiation lands here, but the flags driving it were set in Acts 1–2.

## Turning Points

1. **Taking the Job (Act 1, early):** The anxious regular's offer is accepted. `job_taken` set, the night's clock is implied, the room starts treating you as someone with business.
2. **The Pair Chosen (Act 1, end):** Player commits to two of four companions and descends. The chosen pair locks tactics, dialogue, and several Act-2 scene branches; the other two stay above and may comment in Act 3.
3. **First Blood (Act 2, early-mid):** First real combat — alley brawl or cellar ambush depending on lead followed. Establishes the gory-fun combat register, sets `first_blood`, and is the earliest place a companion can plausibly die if the player picks fights badly.
4. **What Is Really Down There (Act 2, late):** The missing-person mystery resolves into the real shape of the threat — the apprentice didn't just get lost, they found / woke / bargained-with something. `knows_the_truth` set; player chooses whether to rescue clean, cut a deal, or stir something further.
5. **The Climb Out (Act 2 → Act 3):** The state the player exits the well in — who survived, what they brought back, what they left below — is the single biggest determinant of which ending fires.

## Branch Map

### Act 1 forks

- **Fork A — Who you talk to first:** Durnan (the bar), the anxious client (the corner table), or the loudest regular (Mirt/Volo). Shapes initial Renown direction and which rumour you get cheap vs. expensive.
- **Fork B — How you take the job:** Accept the offered fee (modest Coin), haggle up (Wits check, costs Renown if it fails), or accept for free / on credit (Renown gain, sets `durnan_respects_you` if witnessed). All converge to `job_taken`.
- **Fork C — Which pair you recruit:** Six possible pairs from {Korsa, Vesna, Pip, Thessaly}. The pair determines:
  - **Korsa + Vesna** — frontline + healer; combat-resilient, morally weighty, blunt.
  - **Korsa + Pip** — muscle + scout; brawler-heavy, low subtlety in social scenes.
  - **Korsa + Thessaly** — double-damage; fights end fast and ugly, high collateral.
  - **Vesna + Pip** — light party; cautious play, best at avoiding fights through guile + faith.
  - **Vesna + Thessaly** — magic + miracle; strongest in the deep against the *thing*, weakest in a tavern brawl.
  - **Pip + Thessaly** — scout + sorceress; chaotic, unlocks the deepest sneaky route, worst at frontline holds.

### Act 2 forks

- **Fork D — Which lead to follow first:** Harbour (the apprentice's last seen), Trades Ward alley (a witness who fled), or straight down the well (skip the city, descend cold — Renown cost, fewer flags before the deep). Sets `lead_followed_harbour` / `lead_followed_alley` / direct-descent flag.
- **Fork E — How you handle the deep encounter:** Fight through (Vigor heavy), parley with the *thing* (`bargained` available), or stir-and-flee (`stirred_something`). The exact options available depend on which companions are alive and which leads were followed.
- **Fork F — The rescue itself:** Bring the apprentice out clean (`rescued`), bring them out marked / changed (`rescued` + `bargained`), come back without them (no `rescued`), or come back having woken something larger (`stirred_something` regardless of `rescued`).

### Hubs

- **The Common Room (Act 1):** The Portal's main floor. Player returns here between recruitment conversations, rumour gathering, and supply runs. Flag-gated changes:
  - `job_taken` — the anxious client is no longer at the corner table; Durnan nods at you on entry.
  - `recruited_*` flags — recruited companions appear in the room (drinking, praying, dicing) and may interject when you talk to others.
  - Renown thresholds — at higher Renown, Mirt waves you over without prompting; the bar opens a tab.
- **The Well-mouth (Act 2 transitional hub):** The lip of the Portal's well. Brief but reused — appears on first descent and again on the climb back out (Act 3). State changes between visits (companions present/absent, Vigor visible in prose).
- **The Upper Levels (Act 2):** A small loop of 3–4 chamber scenes representing the upper Undermountain — the player can move between them in any order to hunt clues / encounters. Not a true town hub but designed as a navigable cluster, not a corridor.

### NPC conversation hubs

- **Talk to Durnan (Act 1, recurring):** Topics — the well, the missing apprentice, the regulars' loyalties, your tab, advice. `flags_unset` deplete topics. Durnan's respect rises with restraint and falls with brawling in his bar.
- **Talk to the Client (Act 1, brief recurring):** Topics — what the apprentice was looking for, what the dare was, who else knew, what the family will pay. Conversation is the source of most lead flags.
- **Talk to Mirt the Moneylender (Act 1, gated by Renown):** Topics — Waterdeep gossip, an offer of work after this is done (seeds the *Sworn to the City* ending), a loan at terrible terms (one-shot Coin gain, sets `mirt_owes_favour` inverted). Available only after one Renown gain.
- **Recruitment hubs (one per candidate):** Each of Korsa / Vesna / Pip / Thessaly is itself a small conversation hub — 3–4 topics, an asking-price, and the recruit choice. Topics vanish when used; the candidate's recruit option only unlocks once their key topic has been heard.

### Act 3

Mostly linear with a single fork — **Fork G — How you end the night**: collect the fee and sleep in the Portal (variant endings 1–4), accept Mirt's offer (Ending 5), or walk out the door with what you stirred at your back (Ending 6). Surviving companions get an exit beat each.

## Endings

- **Ending 1 — The Hero of the Portal:** Reached via clean rescue (`rescued`, NOT `bargained`, NOT `stirred_something`) AND both companions alive AND Renown ≥ high threshold. Triumphant. Durnan stands a drink, the room remembers your name.
- **Ending 2 — A Quiet Good:** Reached via `rescued` AND (companion lost OR Renown mid) AND NOT `bargained` AND NOT `stirred_something`. The right thing, messily. Modest coin, modest fame, no fanfare. Bittersweet-warm.
- **Ending 3 — The Bargain:** Reached via `rescued` AND `bargained`. The apprentice is out, but you carry the price. Ambiguous — the deal's terms haunt the closing prose.
- **Ending 4 — Lost in the Deep:** Reached via NOT `rescued` (whether you came back without them, or didn't reach them). Sombre. Companion losses deepen the tone.
- **Ending 5 — Sworn to the City:** Reached via Mirt's offer accepted in Act 3, gated by `mirt_owes_favour` (set in Act 1) AND surviving the descent (any rescue outcome). The night ends with Waterdeep claiming you. Hopeful.
- **Ending 6 — A Worse Door Opened:** Reached via `stirred_something` (Fork E or F). Coin in your purse, dread at your back. Overrides Endings 1–2 if both could fire. Dark but earnest.

**Ending precedence** (when more than one could fire): 6 > 3 > 5 > 1 > 2 > 4. (`stirred_something` is the loudest signal; Mirt's offer outranks generic triumph; Lost is the floor when no rescue happened and nothing else specified.)

## Mechanics Summary

### Stats (start values picked to make Act-1 checks meaningful without trivialising them)

- **Coin** — start 5gp. Earned from completing the job, side-rumour payouts, looting the deep. Spent on bribes, hires, healing, and the haggle paths. Gates: hiring Pip's services (5gp), bribing the alley witness (3gp), healer between Acts 2 and 3 (4gp).
- **Vigor** — start 8 (of ~10). Drains from combat, the descent itself, and certain hardship beats (a long climb, a poisoned cut). Low Vigor closes off heroic-charge options and forces retreat-or-bargain choices in the deep. Below 2, combat scenes describe staggering and bleeding; below 0, the player dies (permadeath path).
- **Wits** — start 6. Gates: noticing the dating discrepancy in the apprentice's note, seeing through the alley witness's lie, recognising the *thing*'s true nature before it speaks, several haggle and read-the-room beats.
- **Renown** — start 0. Earned by good behaviour in the Portal (paying tabs, refusing to brawl, helping a regular), lost by bad (starting bar fights, stiffing Durnan, public failure). Gates Mirt's offer (Ending 5), unlocks the Hero ending tier, and changes hub prose at thresholds.

### Flags

**Job state (hidden, narrative):**
- `job_taken`, `lead_followed_harbour`, `lead_followed_alley`, `lead_followed_direct`, `descended_well`, `climbed_back_out`

**Recruitment (hidden, drive scene branching):**
- `recruited_korsa`, `recruited_vesna`, `recruited_pip`, `recruited_thessaly`
- Per-candidate per-topic `asked_*` flags inside their conversation hubs

**Companion fate (hidden, surface in endings):**
- `korsa_died`, `vesna_died`, `pip_died`, `thessaly_died`
- `korsa_left`, `vesna_left`, `pip_left`, `thessaly_left` (stormed off, refused to descend further, etc.)

**Discoveries (mixed visibility):**
- `found_journal` — VISIBLE in HUD as "Apprentice's Journal" once held; gates several knowledge checks in the deep.
- `knows_the_truth` — hidden; flips conversation options once set.
- `met_the_thing_below` — hidden; required for `bargained` and `stirred_something`.

**Allies / standing (hidden, surface contextually):**
- `durnan_respects_you`, `mirt_owes_favour`

**Outcome flags (hidden, drive endings):**
- `rescued`, `bargained`, `stirred_something`, `stayed_in_city`

**Combat colour flags (hidden, narrative-only — referenced by later prose, no mechanical gate):**
- `first_blood`, `bloodied_in_alley`, `weapon_taken_from_X`

### Consumable choices (must use `flags_unset` + `effects` together)

- **Take the job for free / on credit** — one-shot in Act 1; sets `durnan_respects_you` if Durnan witnesses it.
- **Haggle the fee up** — one-shot in Act 1; Wits check; failure costs Renown and locks the option.
- **Loot the apprentice's room at the inn** — one-shot; sets `found_journal`. Room is empty after.
- **Steal Pip's hidden caltrops** — one-shot; if Pip is recruited, costs Renown with Pip; if not, free Coin gain.
- **Bargain with the *thing*** — one-shot in the deep; sets `bargained` and (depending on terms) `stirred_something`. Cannot retry.
- **Stir-and-flee** — one-shot; sets `stirred_something`. Cannot un-stir.
- **Mirt's loan / Mirt's offer** — each one-shot in their respective acts.

### Greyed vs. hidden gated choices

- **Grey out** (existence is fair information):
  - Coin-gated choices ("Pay 5gp to hire Pip" → "[5 Coin required]" if short).
  - Stat checks the player should be able to plan around (Wits to haggle, Vigor to charge).
  - Recruitment options whose key topic hasn't been asked yet ("[Hear them out first]").
- **Hidden** (existence is a spoiler):
  - Choices that require `knows_the_truth` or `met_the_thing_below` — revealing them up front would spoil the central mystery.
  - The `bargained` / `stirred_something` deep-encounter options before the encounter actually begins.
  - Mirt's offer choice in Act 3 — only appears once `mirt_owes_favour` is set.
  - Companion-specific tactical choices (e.g. "Have Thessaly chain-lightning the choke point") only show when that companion is recruited and alive.

### Player-visible HUD flags (brief notes appear next to stats)

- `found_journal` → "Apprentice's Journal"
- `mirt_owes_favour` → "Mirt's Favour"
- `bargained` → "Marked" (only after the deep encounter)

### Notes / Stage-0 deferrals resolved here

- **Visual accent:** brief left "oxblood red OR forest green" open. Picked **oxblood red** — better contrast against sepia parchment, and a stronger thematic match for a combat-featured story with gory-fun prose. Forest green would suit a wilder/druidic story; oxblood suits tavern + dungeon + featured violence.
- **Companion candidate names:** locked exactly as proposed in the brief (Korsa Ironbrow, Sister Vesna, Pip Tallowmuch, Thessaly Vex). No refinement needed.
- **Companion flag naming:** brief proposed both `recruited_dwarf` / `recruited_priestess` (race/role) and `recruited_korsa` / `recruited_vesna` (name). Picked **name-based** — clearer in scene YAML, and makes per-character `_died` / `_left` flags consistent.
- **Scene budget:** ~80 scenes total, ~25–35 per playthrough. Roughly: Act 1 ≈ 30 scenes (hub + 4 recruitment hubs + rumour topics + side beats), Act 2 ≈ 35 scenes (3 spokes × ~6 + deep cluster + combat beats + bargain branch), Act 3 ≈ 15 scenes (return hub + 6 endings + companion exit beats). Stage 2 will firm up the per-act allocation.
