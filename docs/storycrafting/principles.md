# Story Authoring Principles

Read this before Stage 1. These are the standards all gamebook stories in this engine should meet.

---

## Characters

Write characters with contradiction. A villain who is right about something. A mentor who is cowardly. An ally with a hidden agenda. Avoid archetypes that telegraph their role — the reader should be able to misread people on purpose. Nuance is not revealed in a monologue; it surfaces through choices and outcomes.

---

## Failure, Permadeath, and Consequence

A gamebook without failure is a slideshow. The player needs to feel that wrong choices have weight — otherwise every decision is decoration. Aim wide: a single death ending in a 150-scene story is not enough.

**Hard failures.** Walking into an unwinnable fight, trusting the wrong NPC, ignoring a clear warning — these should kill or trap the character. `choices: []` and a death scene. Don't soften with "you are wounded, turn back." Permanent. The player reloads or restarts, and that's the contract.

**Soft failures.** Not every wrong move is fatal — but a wrong move should still cost something the player can feel. A path closes. An ally walks. A stat moves the wrong way. A clue is destroyed. The story continues but the next act is harder, narrower, or sadder. Soft failures are how a story stays playable while still teaching the player that choices matter.

**Narrative-only failures count.** A choice can fail without any mechanical consequence at all — the player learns something painful about themselves or a character, the tone darkens, an NPC remembers it. Even pure prose-level failure ("you said the wrong thing; she will not forget it") makes choices feel weighted. Use these freely; they're cheap and effective.

**Spread failure across the story, not just the finale.** Each act should have at least one fail state — death, soft loss, or narrative wound. A story where you can only fail at the climax has nothing at stake until the climax. Design failure into act 1 so the player learns early that they can lose.

**Make failure legible.** The player should understand *why* they failed, even if they couldn't have known in advance. A death scene that explains the misjudgement, a soft loss that names what was lost, a tonal failure that shows the cost. Failure that feels arbitrary is just punishment.

---

## Red Herrings and Wrong Choices

A real investigation, journey, or struggle has dead ends. A gamebook that telegraphs the right answer at every fork is a corridor with extra steps. The player needs to be able to *misread* situations and pay for it.

**Plant red herrings.** Suspects who didn't do it. Clues that point the wrong way. NPCs who lie convincingly. Choices that look like the obvious right move and turn out to cost time, evidence, or rep. The player should be able to follow a thread for an entire act and discover it was the wrong thread — that disappointment is the story doing its job.

**Reward suspicion, but not always.** If the player is right to be cautious, sometimes confirm it. If they're being paranoid about the wrong thing, let them waste effort. A story where every "trust them" choice betrays you and every "don't trust them" choice is vindicated trains the player to never trust anyone — which collapses the genre.

**Choices that look equivalent shouldn't be.** Two options framed similarly should have different consequences when the player thinks about them. The cautious option might miss a window. The bold option might burn a source. Hidden costs are fine as long as they're discoverable in retrospect ("right — I should have noticed she was watching the door").

**Don't punish curiosity.** Investigating a red herring should still produce *something* — atmosphere, character beat, ruled-out possibility. The player should never feel that pursuing a lead was wasted prose, only that it didn't lead where they hoped.

---

## Good and Bad Paths

There should be at least two meaningfully different routes through the story — not just flavour variation but genuinely different experiences, encounters, and endings. A player who took the coward's path should have a different story than one who fought. Design for replay, not for a single "correct" playthrough.

**Branches need to diverge early enough to matter.** A story that runs as a single corridor for two acts and then forks at the end is functionally linear. Players should be able to make a choice in act 1 that closes off content in act 2. That's expensive to author, but it's the difference between a branching story and a story with branching endings.

**Locked content is a feature.** If a player can see every scene in one playthrough, the choices weren't meaningful. A second playthrough should reveal scenes, NPCs, or whole sub-paths the first one couldn't reach. Tell authors this explicitly so they don't optimise for "show all the content to every player."

**Endings should reflect the path, not just the final choice.** An ending that hinges entirely on the last decision makes the preceding 150 scenes feel like prologue. Use stat thresholds, flag combinations, and earlier branch state to gate or modify endings — so the same final choice produces different outcomes depending on how the player got there.

---

## Prose Style

General canon for authored prose — narrator text, journal entries, cast bios, conditional blocks, brief/setting prose. NPC *dialogue* is governed by the cast sheet (each character's voice can break these rules deliberately). Choice text is terse by design and exempt.

- **Economy of words.** Every line earns its place. If it doesn't shift mood, reveal something, or invite action, cut it.
- **Suggest, don't inventory.** Don't list objects, fixtures, or features in a space. Pick one or two concrete details that carry the scene; trust the reader to fill the rest.
- **Specific over general.** One concrete image beats three vague ones — "a cracked bell hangs above the door," not "various old fixtures line the walls."
- **Texture through implication, not catalogue.** A room's history comes from a single off-note (a scorched floorboard, a name scratched out), not from a list of contents.
- **Show, not state.** Physical detail over abstraction. "His hand shook on the cup" beats "he was nervous."

These are defaults, not laws. Override when the brief calls for it: a maximalist narrator, a comic register, a kid-voice with deliberate run-on hype, a setting whose voice is gleeful inventory (a wizard's curio shop, a hoarder's apartment). Whatever the override, name it in `brief.md` so the scene writer knows the canon is being bent on purpose.

---

## Pacing and Choice Density

Short scenes, frequent choices. The player should be making decisions often, not reading long passages between them. Aim for roughly 15–30 seconds of reading per scene before a choice point — if a beat is running long, split it across two scenes rather than padding one.

Offer more choices per scene than feels strictly necessary — 3–6 options is the target, not 2. Single-choice scenes are legitimate as a pacing tool — they keep the player tapping and break long passages into bite-sized beats. But they should be the minority, not the default. If most of your scenes have one "continue" choice, you are writing prose with buttons, not a gamebook.

**Convergent branching is the default, not a fallback.** Treat any scene where the plot only goes one way as a candidate for 3 convergent framings — cautious / blunt / sly, or pragmatic / emotional / detached — all routing to the same `next`. The destination is fixed; the *voice* is the choice. Variety of expression keeps replays fresh and gives the player a sense of character even when the path is linear.

Worked example. A scene where the player has just found a body and must report it to the captain. Don't write:

```yaml
choices:
- text: Report it to the captain.
  next: act1/captain_office
```

Write:

```yaml
choices:
- text: Walk straight to the captain. Say it plain.            # blunt
  next: act1/captain_office
- text: Find the captain alone first. This needs to be quiet.  # cautious
  next: act1/captain_office
- text: Mention it in passing at the next briefing. Watch who reacts.  # sly
  next: act1/captain_office
```

Same destination, three different player postures, near-zero plot cost. Stage 5 must write each framing as genuinely distinct — not three rephrasings of the same line.

This shapes earlier stages too: when planning acts and beats (stages 1–2), favour many small decision points over fewer long set-pieces. A beat with one big choice usually wants to be three beats with a choice each.

---

## Hubs and Loops

Not every story is a corridor. Some stories have a city, a tavern, a ship — a place the player returns to between events. Model these as hub scenes: a scene with multiple choices that all eventually return to it (directly or via a chain). 

Example hub structure:
```yaml
# hub.yaml
choices:
  - text: Visit the market
    next: market
  - text: Go to the inn
    next: inn
  - text: Leave the city
    next: road_south
    requires:
      flags: [has_supplies]

# market.yaml — ends with:
choices:
  - text: Return to the city square
    next: hub
```

Use flags to change what's available at the hub as the story progresses — an NPC appears, a door is now locked, a new option opens.

---

## Random Events

Use weighted random `next` to make traversal unpredictable. A scene that "travels the road" shouldn't always lead to the same place:

```yaml
# travel_road.yaml
choices:
  - text: Continue toward the city
    next:
      - scene: road_uneventful
        weight: 3
      - scene: road_ambush
        weight: 1
      - scene: road_merchant
        weight: 2
```

Higher weight = more likely. The engine picks randomly on each playthrough. Use this for:
- Travel scenes (encounter or not)
- Gambling / dice rolls (win or lose scene)
- Exploration (what do you find?)
- NPC mood (same person, different reception)

Don't overuse. Random events work when the player knows the outcome is uncertain — make that uncertainty legible in the text ("You head into the forest. Anything could happen out here.").

---

## Conversations

Model conversations as a hub scene. Each topic is a choice that sets a flag and leads to a short scene, then returns to the conversation hub. Exhausted topics disappear automatically via `requires`.

```yaml
# talk_innkeeper.yaml
text: |
  The innkeeper wipes down the bar, watching you.
choices:
  - text: Ask about the missing travellers
    next: talk_innkeeper_travellers
    requires:
      flags_unset: [asked_about_travellers]
  - text: Ask about the rooms
    next: talk_innkeeper_rooms
    requires:
      flags_unset: [asked_about_rooms]
  - text: Walk away
    next: tavern_main

# talk_innkeeper_travellers.yaml
text: |
  He goes quiet. "Three this month. All heading east."
choices:
  - text: Back to conversation
    next: talk_innkeeper
    effects:
      flags:
        asked_about_travellers: true

# talk_innkeeper_rooms.yaml
text: |
  "Six copper a night. Sheets are clean enough."
choices:
  - text: Back to conversation
    next: talk_innkeeper
    effects:
      flags:
        asked_about_rooms: true
```

Topics without `flags_unset` are always visible. Topics with it vanish once exhausted. Always include at least one exit choice with no `requires` — the player must always be able to leave.

---

## Replayability Checklist

Before calling a story done, verify:
- [ ] At least one random event scene
- [ ] At least one hub or loop (if the setting supports it)
- [ ] At least two meaningfully different paths, diverging by mid-act-1 at the latest
- [ ] At least three distinct endings (not just three flavours of the same outcome)
- [ ] At least one fail state per act — death, soft loss, or narrative wound
- [ ] Permadeath exists on at least two paths, not just one
- [ ] At least one red herring — a lead, suspect, or clue that doesn't pay off the way the player expects
- [ ] At least one scene that closes off content permanently when chosen (so a second playthrough can find what was missed)
- [ ] Endings vary based on accumulated state (stats, flags, prior branches) — not only the final choice
- [ ] Conversation topics deplete correctly
- [ ] A second playthrough would feel genuinely different — different scenes, different NPCs, different ending texture
