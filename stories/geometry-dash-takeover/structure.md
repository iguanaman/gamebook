# Geometry Dash: The Takeover — Structure

## Shape

No acts. One linear gauntlet of 5 quiz-gate rooms, each connected to a single themed elimination scene. ~12 scenes total: foyer + 5 quiz rooms + 5 eliminations + 1 win.

State tracked: current scene only. No stats, flags, `visited`, conditionals, hubs, or random events.

## Cast

Six kids start the tour. One eliminated per room across rooms 1–4. Room 5 is 1v1; Dex eliminated there as part of the win path.

- Room 1: Mara out (spike pit)
- Room 2: Brennan out (wind tunnel)
- Room 3: Milo out (gravity flip)
- Room 4: Sage out (jump pad)
- Room 5: Dex out (wave washout) — 1v1 with the player; correct answer wins the studio

Eliminations are encoded in the *narration of the next correct-answer scene's opening beat* — because each room is only reachable by getting every prior question right, the elimination order is implicit in the path.

## Question Set (all hard, easy→hard within "hard")

1. **Room 1 — Stereo Madness composer** → ForeverBound (music lore)
2. **Room 2 — Update that introduced Practice Mode** → 1.7 (version history)
3. **Room 3 — Bloodlust verifier** → Knobbelboy (extreme demon lore)
4. **Room 4 — What Spooky says when you type "Spooky" in the Vault of Secrets** → "You scared me!" (vault easter egg)
5. **Room 5 — What unlocks the Chamber of Time** → Master Emblem (deepest vault lore; 1v1 final)

Each room: 4 choices (1 correct + 3 convergent wrongs all routing to that room's elimination scene). Correct answer position varies across rooms — never always first.

## Room List

### Foyer
RobTop's atrium intro. Six kids, rules laid out. Single choice → Room 1. Tight: minimal environment, get to the conveyor.

### Room 1 — Icon Foundry → spike pit elimination
Stereo Madness composer. Mara is the loud-cocky kid who shouts a wrong answer first.

### Room 2 — Mode Hangar → wind tunnel elimination
Practice Mode update. Brennan flicks his tablet, says wrong update.

### Room 3 — Portal Workshop → gravity flip elimination
Bloodlust verifier. Milo panics, blurts wrong creator.

### Room 4 — Jump Pad Assembly → jump pad elimination
Spooky vault response. Sage says wrong response under her breath.

### Room 5 — Wave Chamber → wave washout elimination (DEX) | Win
Chamber of Time unlock. 1v1 with Dex. RobTop in person. Dex confidently says wrong answer; player picks Master Emblem; Dex is sluiced; player wins.

### Win — Heir to RobTop
Cyan confetti. Studio is yours. `choices: []`.

## Branch Map

```
foyer
  -> room1_icon_foundry         [Stereo Madness composer]
       correct -> room2          [Mara out: spike pit, narrated next scene]
       wrong   -> out_spike_pit
  -> room2_mode_hangar           [Practice Mode update]
       correct -> room3          [Brennan out: wind tunnel]
       wrong   -> out_wind_tunnel
  -> room3_portal_workshop       [Bloodlust verifier]
       correct -> room4          [Milo out: gravity flip]
       wrong   -> out_gravity_flip
  -> room4_jump_pad_assembly     [Spooky vault response]
       correct -> room5          [Sage out: jump pad]
       wrong   -> out_jump_pad
  -> room5_wave_chamber          [Chamber of Time unlock — 1v1 Dex final]
       correct -> win_heir       [Dex out: wave washout, narrated in win scene]
       wrong   -> out_wave_washout
```

## Elimination Endings (one per room)

Each is `choices: []`. Spectacle, not gore. Tight — no padding.

1. **out_spike_pit** (R1) — trapdoor, foam spikes, bounce out.
2. **out_wind_tunnel** (R2) — sideways through a tube into foam pit.
3. **out_gravity_flip** (R3) — yellow portal, ceiling, drift to OUT chute.
4. **out_jump_pad** (R4) — fired in a long arc into bleachers.
5. **out_wave_washout** (R5) — sluice opens, neon wave tube. Stings most: 1v1, so close.

## Endings

- **Win — Heir to RobTop:** correct answer in every room. Single ending scene.
- **Eliminated (x5):** any wrong answer at any quiz gate. Themed dead end per room.

## Mechanics Summary

- Stats: none. Flags: none. `visited`: not used. Conditionals: not used. Hubs: none. Random: none.
- All gating is structural (scene-to-scene wiring). Rival eliminations are narrated in the *opening beat of the next correct-answer scene* (or the win scene for Dex).
- Each quiz scene: 4 choices, 1 correct → next room, 3 wrong → same elimination scene. Correct position varies.

## Notes for Stage 4 (Scene Writing)

- ~12 scenes total: `foyer`, `room1_icon_foundry`, `room2_mode_hangar`, `room3_portal_workshop`, `room4_jump_pad_assembly`, `room5_wave_chamber`, `out_spike_pit`, `out_wind_tunnel`, `out_gravity_flip`, `out_jump_pad`, `out_wave_washout`, `win_heir`.
- Starting scene: `foyer`.
- **Prose is tight.** Each quiz scene reads in 15–20 seconds: prior elimination one-liner, room beat, RobTop asks, rival blurts a hint, player thinks one beat, choices. No long environment paragraphs. No long interior monologue.
- Question difficulty is locked above — all hard, no soft warm-up.
