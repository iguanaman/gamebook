# Vault 34 — Structure

## Acts

- **Act 1 — The Sealed Door:** Player discovers the suppressed reactor report and must open the vault door. Branches by approach (stealth, force, persuasion, alliance), with the overseer Cole as the central obstacle. Ends when the vault door opens — alone, with allies, or with a mob.
- **Act 2 — The Surface:** Player exits into the ruins of pre-war Bakersfield. Must find water/food/shelter, navigate first encounters with raiders and the Followers of the Apocalypse analogue ("the Salvagers"). Hub-based (the Diner, a half-collapsed roadside refuge). Ends in one of four endings depending on faction allegiance, who came with you, and a final moral confrontation.

## Turning Points

1. **The Report Discovered (Act 1, early):** Player reads the suppressed reactor report. The clock starts. From here, every scene has time pressure.
2. **The Confrontation with Cole (Act 1, mid-late):** The player faces Cole — kill him, expose him publicly, blackmail him, or be turned by him. This sets the moral tone for everything after.
3. **The Door Opens (Act 1 → Act 2 transition):** Whether the player exits alone, with a few allies, or leading a mass evacuation. Determines starting state of Act 2.
4. **The Salvager Offer (Act 2, mid):** The Salvagers offer help — but at a cost (deliver a message into raider territory, or surrender the player's vault medical knowledge). Refusing pushes player toward solo or raider-pact endings.
5. **The Final Reckoning (Act 2, end):** A wasteland threat (raider raid on the Diner, or Cole's loyalist remnant catching up) forces the player to commit — fight, flee, or sacrifice.

## Branch Map

### Act 1 forks
- **Fork A — How to learn the truth:** Doc Reyes (medical office), Engineer Yuna (reactor deck), or stolen terminal access (security block). Each gates a different ally relationship.
- **Fork B — How to handle Cole:** Direct confrontation (STR/PER), public exposure via the atrium broadcast (CHR), blackmail (PER + flag), or join him (ends the run early — bad ending preview).
- **Fork C — Who comes with you:** Resistance members rally if `exposed_truth`; Doc Reyes comes if `trusted_by_doc_reyes`; Yuna comes if you helped stabilise the reactor first; otherwise solo exit.

### Act 2 forks
- **Fork D — First contact:** Raiders (combat or intimidation), Salvagers (persuasion), or solo scavenging (perception). The first faction met colours the rest of Act 2.
- **Fork E — The Salvager offer:** Accept the message run (→ Open Door ending possible), refuse and go solo (→ Ghost ending or Vault Reborn), or pivot to raider deal (→ Warden's Ghost or Open Door variant).
- **Fork F — Final reckoning:** Hold the Diner with allies (Vault Reborn), abandon and run (Ghost of 34), turn the raid against your enemies (Warden's Ghost), or bring back Salvager reinforcements (Open Door).

### Hubs

- **The Atrium (Act 1):** Vault central plaza. Player returns here between Doc Reyes / Yuna / Security visits. Loiterers, propaganda speakers, the broadcast booth. Flag-gated changes: `cole_alerted` (guards harass you), `exposed_truth` (sympathetic glances), `radiation_sick` (sweating residents start to notice).
- **The Diner (Act 2):** Half-collapsed roadside diner that becomes the player's surface base. Returned to between scavenging runs and faction visits. Flag-gated changes: `salvager_visit` (medic sets up shop), `raider_pact` (a raider scout watches the door), `survivors_present` (vault refugees cluster inside).

### NPC conversation hubs

- **Talk to Doc Reyes (Act 1):** Topics — the report, the missing residents, your radiation symptoms, the overseer's mental state, an exit route. Each topic depletes via `flags_unset`.
- **Talk to Yuna (Act 1):** Topics — the reactor, the maintenance shaft, why she's not in custody, the loyalists. Conversation gates `reactor_stabilised` and `yuna_joins`.
- **Talk to Hatch (Act 2):** Salvager liaison at the Diner. Topics — what the Salvagers want, the message run, what's east, who runs the raiders.

## Endings

- **Ending 1 — Warden's Ghost:** Killed Cole AND made the raider pact AND/OR abandoned vault survivors during final reckoning. Player becomes the new tyrant. Reached via Fork B (kill Cole) → Fork E (raider deal) → Fork F (turn raid against enemies). Flags: `killed_cole`, `raider_pact`, `abandoned_survivors`.
- **Ending 2 — Vault Reborn:** Led survivors out AND held the Diner together. Reached via Fork C (allies join) → Fork F (hold the Diner). Flags: `led_evacuation`, `survivors_present`, NOT `abandoned_survivors`.
- **Ending 3 — Ghost of 34:** Exited alone, made no factional commitments, fled the final reckoning. Reached via solo Fork C → solo Fork D → flee Fork F. Flags: NOT `led_evacuation`, NOT any faction flag.
- **Ending 4 — The Open Door:** Allied with Salvagers, completed the message run, brought reinforcements back to extract more vault survivors. Reached via Fork D (Salvagers) → Fork E (accept message) → Fork F (Salvager rescue). Flags: `followers_allied`, `message_delivered`, CHR ≥ 7.

## Mechanics Summary

### Stats

- **STR (Strength)** — start 5. Gates: forcing locked doors, prevailing in melee, intimidation by physical presence. Tested in: security armoury access, Cole confrontation (force route), raider standoff.
- **PER (Perception)** — start 5. Gates: noticing the suppressed report's dating discrepancy, spotting a tail, ranged accuracy in surface combat, detecting deception in conversations. Tested in: Doc Reyes route (spot the lie), Salvager negotiation (read intent).
- **CHR (Charisma)** — start 5. Gates: rallying residents for the broadcast, persuading allies to come with you, the Open Door ending. Tested in: atrium broadcast scene, Salvager offer, final reckoning rally.

### Flags

**Faction flags (player-hidden until set, then visible):**
- `overseer_loyalist` — sided with Cole; locks out resistance paths
- `resistance_member` — joined the underground movement
- `followers_allied` — Salvagers count you as friendly
- `raider_pact` — raiders count you as friendly (also marks you as enemy of Salvagers)

**Moral flags (hidden, surface in endings):**
- `abandoned_survivors`
- `led_evacuation`
- `killed_cole`
- `exposed_truth`

**Discovery flags (some player-visible in HUD):**
- `found_report` — VISIBLE: "The Reactor Report" — gates many conversation paths
- `has_master_key` — VISIBLE: "Master Key" — opens overseer's office
- `reactor_stabilised` — hidden, sets endgame timer
- `surface_cache_found` — VISIBLE: "Surface Cache" — gates Diner upgrades
- `message_delivered` — hidden, gates Open Door ending

**Personal flags:**
- `radiation_sick` — VISIBLE: "Rad Sickness" — debuff visible to player; gates some Doc Reyes interactions
- `vault_suit_upgraded` — VISIBLE: "Reinforced Vault Suit" — small STR bonus in physical conflicts
- `trusted_by_doc_reyes` — hidden, gates Doc Reyes joining you
- `yuna_joins` — hidden, gates Yuna joining the surface group
- `cole_alerted` — hidden, makes Atrium hub hostile

### Consumable choices (require flags_unset + effects pairing)

- **Steal the master key from the overseer's drawer:** one chance. Sets `has_master_key`, also `cole_alerted` if PER too low.
- **Stabilise the reactor with Yuna:** one chance, gives `reactor_stabilised` (extends timer for finer endings).
- **Sell vault medical data to Hatch:** one chance, sets `followers_allied` and `sold_medical_data`.
- **Loot the surface cache:** one chance, sets `surface_cache_found`. The cache is empty after.
- **Trigger the atrium broadcast:** one chance. Either rallies the vault (`exposed_truth`) on CHR success or burns your cover (`cole_alerted`) on failure. Choice disappears either way.

### Greyed vs hidden gated choices

- **Grey out (player should see it exists):** Stat checks (STR/PER/CHR) — failures show "[Strength 6 required]" so the player understands the build. Faction-gated dialogue with NPCs already met.
- **Hidden (existence is a spoiler):** Discovery flags (e.g. only show "Confront Cole with the report" choice once `found_report` is set — otherwise the option doesn't even appear). Hidden faction routes before first contact.
