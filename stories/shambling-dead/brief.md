# Shambling Dead — Story Brief

## Setting

Days after a viral outbreak collapses a mid-sized American city. Lights still flicker on in some buildings. Cars idle in the street with doors open. The dead are slow — shambling, not sprinting — but relentless, and a single bite turns. The horror is in the *quantity* of them and how fast civilisation cracked. Phones still half-work. Some neighbourhoods don't yet know. Military checkpoints exist but are visibly failing. Tone: dark, gory, earnest, no comic relief.

## Hook

The player wakes up in their own home to screams in the street, a neighbour eating another neighbour on the lawn, and the slow realisation that nobody is coming. They have to leave, decide who to bring, and decide what they're willing to do — or not do — to survive the next few days.

## Player Role

A lone civilian — early-career adult, ordinary, no military or medical background. Across the journey they accumulate (or fail to accumulate) a small found family: a wounded neighbour, a teenage boy, an older woman, a stranger met on the road, and — pivotally — **a child** encountered mid-story whose rescue is hard but possible. The player wants to get out of the city alive; the world keeps forcing the question of what they'll trade for that.

## Arc Shape

**Descent + accumulation.** The world gets worse, not better. Each act narrows the player's options and asks harder versions of the same question: *who do you save, who do you leave, who do you kill?* By the final act, the player is no longer the person they were on day one. Whether they retain anything human depends on the bonds they built and the lines they wouldn't cross.

- Act 1 — Wake up. Escape the neighbourhood. First deaths, first save/abandon choice.
- Act 2 — Cross the city. Meet the child. Encounter other survivor groups (some hostile). The hard rescue.
- Act 3 — Reach the way out (river, highway, evacuation point — TBD Stage 1). Final losses. Who, if anyone, leaves with you.

## Endings

**Many endings keyed to who survives and the player's humanity.** Roughly:
- Solo escape (cold) — alive but alone, broke every bond
- Solo escape (broken) — alive but alone because everyone died despite you trying
- Escape with the child — bittersweet, hardest-earned
- Escape with one adult companion — varies by which companion
- Escape with child + companion — rarest, requires near-perfect path
- Multiple death endings — bitten, overrun, killed by other survivors, sacrificed self for someone
- Possible: stay behind / refuse to leave (one specific path)

Endings hinge on a combination of: who is alive in your party, the Humanity-equivalent (Bond with the child) stat, key save/kill flags, and a final-act choice.

## Constraints

Length: ~150 scenes (long-format — needed to support distinct companion combinations and many endings)

Stats: yes
- `health` — physical condition. Bites are fatal; cuts and exhaustion gate risky choices.
- `bond` — connection to the child (and by extension, the player's remaining humanity). Built by protective choices, eroded by cruelty/abandonment. Gates emotional payoffs and ending variants.
- `supplies` — food, water, ammo combined as one pressure stat. Forces tradeoff choices.

Flags: yes — used heavily for tracking who is alive (`neighbour_alive`, `teen_alive`, `elder_alive`, `stranger_alive`, `child_rescued`, `child_alive`), key moral choices (`killed_survivor`, `abandoned_wounded`, `shared_supplies`), and route choices.

## Tone Reference

The Last of Us (Part 1) for relationships and weight; The Walking Dead (early seasons / Telltale game) for the slow-zombie horror grammar and survivor-vs-survivor moral pressure. Gore is present and specific — bites described, deaths described — but never gleeful. Earnest, not edgy.

## Visual Feel

Bleached greys and bone-white on near-black, with dried-blood red as the only warm accent. Old ash, faded paper, washed-out daylight that feels wrong. Walking Dead comic palette territory. Exact palette and fonts decided in Stage 1.

## Narrator Voice

Ideal narrator: weary, gravelly, mid-life American man — the voice of someone who has seen too much and is telling you about it after the fact. Joel from The Last of Us (Troy Baker performance) is the reference.

Chosen voice ID: `narrator_male_last-of-us_joel` — confirmed available in `tts_voices/`.

## Atmosphere — Constant Pressure

**The dead are always present, and the tension ramps.** Act 1 starts *quieter* than the rest of the story — the opening minutes are uncanny, not yet lethal. A wrong-feeling morning, distant sounds, neighbours behaving strangely. By the end of Act 1 the world is openly hostile and the dead are at the door. By Act 2 there is no longer any "before" to retreat to. By Act 3 every scene presses. The ramp curve is: uncanny → wrong → close → present → inside the room.

Even early "quiet" beats are *uncomfortable*, not safe — something is off, the player just doesn't fully know what yet. From mid-Act-1 onward, every scene should keep the dead audible, visible, or tactile somewhere in the frame:

- Banging on a door / wall / car roof in the next room
- Shapes pressing against frosted glass, fingerprints smearing
- A pack on the staircase below, working out how to climb
- Moans drifting through the vents, the floor, the duct above
- One getting up from a body in the room you thought was clear
- A shadow at the window, dragging something
- Distant gunfire that means a *bigger* horde is moving

From the moment the dead are confirmed (mid-Act-1 onward), every block of narrative prose should give the player a sensory reminder that they are seconds-to-minutes away. Conversations are clipped — nobody monologues; they whisper, listen between sentences, flinch at sounds. Rest is never restful. The horror is *attrition*: the world is closing in slowly, and every pause is borrowed.

This applies in Stages 2–5: every beat description, every scene breakdown, and every authored block must lean into proximity pressure unless there is a specific narrative reason a beat is genuinely (briefly) safe — and even those should end with a fresh threat arriving.

## The Other Threat — Humans

**The pressure makes people do awful things to survive.** Half the lethal threats in this story are alive. The dead are slow and predictable; people are not. The story's moral spine is that the apocalypse doesn't make survivors heroic — it strips them. Some of those survivors are the antagonists.

Specifically:
- **Certain NPCs will betray, rob, or kill the player given the chance.** Wren is the prototype — she is a *liar* with tells the careful player can read. Trusting blind = lose supplies, possibly a companion. The hostile-survivors group in late Act 2 is openly predatory. Other encounters, especially in Act 3, mix despair with desperation in ugly ways.
- **The player will be offered chances to do awful things themselves.** Take a child's supplies. Lock a stranger out who's being chased. Kill someone surrendered. Lie to Mara. Each is a reasonable-looking shortcut with a moral cost. The `bond` stat tracks who the player has become.
- **Tells exist.** Every betrayal has signals the player can read in narration and conversation hubs. Death-by-trusting-the-wrong-person is *not* arbitrary — it's the consequence of skim-reading a person the way the wait-it-out beat is the consequence of skim-reading the radio.

This is half of why "near-perfect" runs are rare: the player has to read both the dead *and* the living correctly, and those two readings sometimes pull opposite directions (paranoia keeps you alive, openness gets you the warm endings).

## Difficulty

**Hard to complete. Easy to die — but never arbitrarily.** Death is a real, frequent outcome, and most playthroughs will end in loss. However, every death must be the consequence of a discernible mistake the player made: ignoring a warning sign in the narrative, taking a route after evidence said it was unsafe, trusting the wrong stranger after they showed a tell, pushing on with low health/supplies when rest was offered, etc. No coin-flip deaths, no "gotcha" choices where both options looked equally safe. The player should be able to look back at a death and identify the moment they went wrong.

A "good" ending (escape with the child + a companion) should require near-perfect play across all three acts — correct reads on people, careful resource management, and willingness to take the harder compassionate route at key moments. Most players will not get it on a first run.

## Open Questions

- Final-act exit point (river crossing, highway evac, military extraction, etc.) — Stage 1 to lock down
- Exact CSS palette + font choices — Stage 1
- Whether the child has a name set in stone or is named by the player — Stage 1 (default: pre-named NPC)
- Whether Humanity/morale is folded into `bond` or tracked separately — currently folded into `bond` for simplicity; revisit if structure demands
