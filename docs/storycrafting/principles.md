# Story Authoring Principles

Read this before Stage 1. These are the standards all gamebook stories in this engine should meet.

---

## Characters

Write characters with contradiction. A villain who is right about something. A mentor who is cowardly. An ally with a hidden agenda. Avoid archetypes that telegraph their role — the reader should be able to misread people on purpose. Nuance is not revealed in a monologue; it surfaces through choices and outcomes.

---

## Permadeath and Consequences

Bad choices should kill or permanently close paths. Don't soften fatal outcomes into "you are wounded, turn to X." If the player walks into a fight they can't win, they die — `choices: []` with a death scene. Permanent loss of an ally, a path, a stat below zero — these should be real and unrecoverable. Stakes make choices matter.

---

## Good and Bad Paths

There should be at least two meaningfully different routes through the story — not just flavour variation but genuinely different experiences, encounters, and endings. A player who took the coward's path should have a different story than one who fought. Design for replay, not for a single "correct" playthrough.

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

Offer more choices per scene than feels strictly necessary — 3–6 options is the target, not 2. Convergent branching is encouraged: several choices can resolve to the same next scene as long as each is a distinct expression of player intent (cautious vs. blunt vs. sly, or fight vs. flee vs. parley that all end at the same hub). The freedom to *choose how* matters even when the destination is fixed. Variety of voice keeps replays fresh.

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
- [ ] At least two meaningfully different paths
- [ ] At least two distinct endings
- [ ] Permadeath exists on at least one path
- [ ] Conversation topics deplete correctly
- [ ] A second playthrough would feel genuinely different
