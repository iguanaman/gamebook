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
