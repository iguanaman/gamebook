# Vault 34 — Story Brief

## Setting

Post-nuclear America, 2161 (Fallout 1/2 era). The world above is a blasted wasteland of ruins, mutants, raiders, and desperate survivors scratching out communities in the rubble. Underground, Vault 34 has kept 200 people alive for 87 years — but "alive" and "well" are not the same thing. The vault was designed as an armory experiment: weapons were issued freely, with no restrictions. Decades of internal power struggles, accidental deaths, and two attempted coups have left the population paranoid, heavily armed, and governed by an overseer ruling through fear rather than legitimacy. The tone is grim and darkly comic — Fallout 1/2 register: bureaucratic horror, ironic distance, and gallows humour. Characters believe in institutions that have long since rotted.

## Hook

Vault 34's reactor coolant system is failing. The overseer, Warden Aldric Cole, knows — and is suppressing the report. He would rather let the vault die quietly than admit the experiment failed and open the door. You are a vault security officer who has just read the suppressed report. You have maybe 72 hours before the reactor goes critical. The door is sealed from the control room. Cole controls the control room.

## Player Role

**Security Officer, Vault 34.** Born underground, trained to enforce order, now holding a piece of paper that makes order impossible. You want to get people out — or at minimum, yourself. Standing in your way: the overseer's loyalists, a reactor you can't fix alone, a door that requires two keys, and 200 frightened people who have been told everything is fine. Secondary tension: do you owe them the truth? Do you owe them your life?

## Arc Shape

Two-act structure:

- **Act 1 — The Vault:** Uncover the truth, build alliances or go it alone, confront or circumvent the overseer, open the door. Ends when the player exits the vault (alone, with allies, or leading a mass evacuation).
- **Act 2 — The Surface:** The wasteland is hostile and unfamiliar. Navigate the ruins of pre-war Bakersfield, find shelter, make first contact with wastelanders (raiders, Salvagers), manage moral debts from Act 1. Ends at one of four endings determined by faction allegiance and the final reckoning.

## Endings

Four endings, hinging on **moral choice** flag (abandoned survivors vs. led them out) + **faction** flags:

1. **Warden's Ghost** — killed Cole, adopted his methods; the wasteland gets a new tyrant. Dark irony.
2. **Vault Reborn** — led survivors to a defensible surface position; the group survives together. Bittersweet.
3. **Ghost of 34** — escaped alone, left everyone behind. Survival at a cost. Haunted.
4. **The Open Door** — allied with wasteland faction to extract remaining survivors. Costly but complete. Requires CHR ≥ 7 and `followers_allied`.

## Constraints

Length: ~60 scenes total across 2 acts
- Act 1: ~25 scenes (vault, contained, dense branching)
- Act 2: ~35 scenes (surface shock, wasteland hub, faction contacts, endings)

Stats: yes
- **STR** (Strength) — physical force, carrying capacity, combat options; starts at 5
- **PER** (Perception) — noticing things, ranged accuracy, detecting deception; starts at 5
- **CHR** (Charisma) — persuasion, intimidation, leadership; starts at 5

Flags: yes — extensive
- Faction: `overseer_loyalist`, `resistance_member`, `followers_allied`, `raider_pact`
- Moral: `abandoned_survivors`, `led_evacuation`, `killed_cole`, `exposed_truth`
- Discovery: `found_report`, `has_master_key`, `reactor_stabilised`, `surface_cache_found`
- Personal: `radiation_sick`, `vault_suit_upgraded`, `trusted_by_doc_reyes`

## Tone Reference

Fallout 1 and Fallout 2. Grim, bureaucratically absurd, darkly funny. Characters use Vault-Tec corporate language for horrible things. The wasteland is brutal but not grimdark — there are good people making hard choices. Black humour over horror. Think: a memo from the overseer reminding residents that "discharge of weapons in the atrium is a Level 3 infraction" while the reactor melts down.

## Visual Feel

Amber text on near-black background. Monospace or slab-serif body font. Pip-Boy terminal aesthetic — slightly degraded, scanline feeling. Accent colour: amber/gold. Muted greens for secondary elements. No softness — hard edges, no rounded corners. Font heading: something stencilled or military-adjacent.

## Narrator Voice

`narrator_male_ron_perlman` — gravel-voiced, world-weary, Fallout-canonical narrator. Set in `story.yaml`.

## Open Questions

None — all parameters set. Ready for Stage 1.
