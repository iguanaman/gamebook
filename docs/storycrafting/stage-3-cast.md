# Stage 3: Cast Sheet

**Goal:** Define every named NPC the player will meet — voice, contradiction, body, mannerism, motive — and assign each a TTS voice. Output: `stories/{id}/cast.md`.

**Prerequisite:** All `act-{n}.md` files must exist. The cast is gathered from across all acts, so it cannot be written until the act breakdowns are complete.

---

## Why this stage exists

Without a cast sheet, each scene-writing subagent invents an NPC's voice from scratch. The same NPC then sounds different in Beat 3 than in Beat 9 — vocabulary drifts, mannerisms vanish, contradictions flatten. The cast sheet is the bible the scene writers consult for every line of dialogue.

It also fixes TTS voice assignments. Without a fixed assignment, beat writers will either omit voice prefixes (everything is narrator) or guess inconsistently. The cast sheet locks one voice ID per NPC.

---

## What to do

1. Read `brief.md`, `structure.md`, every `act-{n}.md`, and `docs/storycrafting/principles.md` (the "Characters" section).
2. List every named NPC across all acts. Include any NPC with at least one line of dialogue or one decision the player makes about them.
3. Read the available TTS voices from `tts_voices/voices.yaml`. Voice IDs are leaf keys in the file (e.g. `female_adult_american_cool`, `male_midlife_english_posh`). The `narrator/` branch is **off-limits** for NPC assignment — narrator voices are reserved for the story's narrator (set in `story.yaml`).
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

- Never assign a `narrator/` voice to an NPC.
- An NPC with a single one-line cameo can share a voice with another minor NPC if necessary.
- Major NPCs (player meets repeatedly) must have a unique voice — the player must be able to recognise them by sound.
- If the available voices don't fit an NPC well, note it explicitly in the cast entry ("voice is the closest fit; consider re-recording if a {trait} voice is added").
- The narrator voice is set elsewhere — in `story.yaml`'s `narrator:` field, decided in Stage 0 or by author. The cast sheet does not pick the narrator.

---

## Done when

- Every named NPC across all acts has an entry
- Every NPC has a voice ID drawn from `tts_voices/voices.yaml` (non-narrator)
- No two major NPCs share a voice
- Voice prose details (body, voice-on-page, contradiction, wants, fears) are filled — no placeholder text
- A scene writer could pick up the file and write any NPC's dialogue in their voice
