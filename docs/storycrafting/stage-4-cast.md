# Stage 4: Cast Sheet

**Goal:** Define every named NPC the player will meet — voice, contradiction, body, mannerism, motive — and assign each a TTS voice. Output: `stories/{id}/cast.md`.

**Prerequisite:** All `act-{n}.md` (beats) and `act-{n}-scenes.md` (scene breakdowns) files must exist. The cast is gathered from across all acts — each scene-breakdown's "NPCs in this act" section is the authoritative list to draw from.

---

## Hands-off mode

Stage 0 was the question stage. From Stage 1 onward, run hands-off:

- **Do not ask the user questions.** Pick voices and characterisation from the available library and prior outputs. If a voice gap exists, note it in the cast entry and continue with the closest match.
- **Auto-fix issues.** If validation fails or a problem is found (NPC missing characterisation, voice clashes between major NPCs sharing scenes), fix it and keep going — don't halt for confirmation.
- Only stop and surface if upstream docs are contradictory in a way no reasonable interpretation resolves.

---

## Why this stage exists

Without a cast sheet, each scene-writing subagent invents an NPC's voice from scratch. The same NPC then sounds different in Beat 3 than in Beat 9 — vocabulary drifts, mannerisms vanish, contradictions flatten. The cast sheet is the bible the scene writers consult for every line of dialogue.

It also fixes TTS voice assignments. Without a fixed assignment, beat writers will either omit voice prefixes (everything is narrator) or guess inconsistently. The cast sheet locks one voice ID per NPC.

---

## What to do

1. Read `brief.md`, `structure.md`, every `act-{n}.md`, every `act-{n}-scenes.md`, and `docs/storycrafting/principles.md` (the "Characters" section).
2. Compile the NPC roster from each scene-breakdown's "NPCs in this act" section. Include any NPC with at least one line of dialogue or one decision the player makes about them.
3. Run `python list_voices.py` to get the current list of available voices, then read `tts_voices/voices.yaml` for detail. The file has three top-level keys:
   - `characters/` — standard NPC voices, keyed by gender. Use these for all NPC assignments.
   - `narrator/` and `robot/` — **off-limits** for NPC assignment. Narrator is reserved for `story.yaml`; robot is used ad hoc for in-world screen text.
   - `languages/` — voices prefixed with a language (e.g. `japanese_narrator_male_...`). **Only use these when the story's language or setting calls for it** (e.g. a Japanese-language story). Do not assign language voices to NPCs in an English-language story.
4. Assign a voice to each NPC. **Avoid reuse where possible** — if there are more NPCs than voices, only then double up, and only on NPCs who never share a scene. Match voice traits to character: a posh English accent fits an overseer better than a chirpy Scottish one.
5. Write `cast.md`.

---

## Output

Write `stories/{id}/cast.md`:

```markdown
# {Title} — Cast

## {NPC name} ({role})
**Voice:** `{voice_id}` — short reason ("midlife posh fits the bureaucratic overseer")
**Body:** one or two physical details that recur ("yellowing fingernails", "fidgets with a wedding ring")
**Voice on the page:** how they speak — vocabulary, sentence rhythm, what they avoid saying
**Contradiction:** what about them is at odds with their role
**Wants:** what drives their actions
**Fears:** what they will not admit out loud
**First seen:** {scene/beat reference}
**Recurs in:** {beats/scenes where they reappear}

## ...
```

Order the cast in **first-appearance order**, not alphabetical — a scene writer reading top-to-bottom will encounter NPCs in the order their acts need them.

---

## Voice assignment guidance

- Never assign a `narrator/`, `robot/`, or `languages/` voice to an NPC in an English-language story. Language-prefixed voices (under `languages/` in `voices.yaml`) are only for stories whose language or setting specifically calls for them.
- Robot voices are used ad hoc in scene YAML for in-world computer/screen readouts, not for characters.
- An NPC with a single one-line cameo can share a voice with another minor NPC if necessary.
- Major NPCs (player meets repeatedly) must have a unique voice — the player must be able to recognise them by sound.
- If the available voices don't fit an NPC well, note it explicitly in the cast entry ("voice is the closest fit; consider re-recording if a {trait} voice is added").
- The narrator voice is set elsewhere — in `story.yaml`'s `narrator:` field, decided in Stage 0 or by author. The cast sheet does not pick the narrator.

---

## Done when

- Every named NPC across all acts has an entry
- Every NPC has a voice ID drawn from `tts_voices/voices.yaml` (not under `narrator/` or `robot/`)
- No two major NPCs share a voice
- Voice prose details (body, voice-on-page, contradiction, wants, fears) are filled — no placeholder text
- A scene writer could pick up the file and write any NPC's dialogue in their voice
