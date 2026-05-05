# 里見の家 (Satomi no Ie) — Story Brief

## Setting
Modern Japan. A traditional wooden house — inherited, abandoned, dusty — in a rural or semi-rural area outside a regional city. Somewhere that feels like it hasn't been touched in decades: tatami rooms, a dark corridor, an overgrown garden. Satomi has flown over from the UK alone (Ryan stayed home — work, he said, though honestly he was glad of an excuse).

## Hook
Satomi Lambert (née 松島 Matsushima), a practical, mildly sardonic middle-aged British-Japanese woman, has inherited a house in Japan from a family member she had never heard of. She arrives to inspect and sort the estate. The house is supposedly haunted — the local estate agent mentions this in passing as if it's a minor inconvenience, like a damp patch. Strange things begin immediately.

## Player Role
You are Satomi. You want to deal with this house quickly and get back to Ryan and your routines. You half-believe in ghosts — not in a dramatic way, more a quiet "well, you never know" that she'd never say aloud — which makes everything slightly worse, because she can't fully dismiss what she's seeing. Her inner monologue runs constantly — practical observations, dry asides to Ryan (who you keep composing imaginary texts to), and occasional moments of genuine fear she refuses to name as such.

## Arc Shape
Investigation/escalation. Satomi arrives, meets a local briefly, then is alone. The house reveals itself slowly — odd sounds, wrong geometry, things that shouldn't be there. She pieces together who the family member was and what they were doing in this house. The horror builds but the creatures/presences are not gory — they're strange, occasionally baffling, sometimes faintly embarrassing (a ghost who seems mortified to be caught; a creature that's clearly more scared than she is). The climax is a choice: what to do with what she's found.

## Endings
Three endings, gated by `curiosity` stat and a final binary choice:
- **逃げる (Flee):** Low curiosity or choosing to leave — Satomi boards up the house, files paperwork, goes home. The dreams start a week later. Bittersweet/open.
- **向き合う (Confront):** High curiosity + choose to stay and face it — she completes whatever the family member started (or undoes it). The house settles. She misses her flight. Ryan books her a new one without complaint.
- **受け入れる (Embrace/Become):** Secret ending, requires specific flags set throughout — Satomi understands she was always going to come here. The house was waiting. She calls Ryan and tells him to pack some things.

## Constraints
Length: ~30 scenes total (player sees ~10–15 per run, ~10–15 min playthrough)
Stats:
- `curiosity` (0–10) — rises when you investigate, falls when you pull back. Gates endings and some choices.
- `composure` (0–10) — affects Satomi's internal narration tone (drier when high, more rattled when low). Doesn't gate endings but colours text.

Flags: `met_neighbour`, `found_altar`, `heard_name`, `saw_face`, `opened_door`, `knows_truth`, `called_ryan` (for flavour beats), `accepted`

## Tone Reference
*Junji Ito* for atmosphere and creature design (unsettling, wrong proportions, too much hair, that sort of thing) meets *What We Do In The Shadows* for deadpan energy — creatures that are horrifying in concept but faintly ridiculous in execution. Satomi's inner voice is the comedy. The house itself is genuinely frightening. The gap between the two is where the tone lives.

## Visual Feel
Faded traditional Japan: pale paper screens, dark wood, aged tatami. Cold — even in the art direction. Washed-out yellows and deep shadows. Think old photograph left in the sun too long. Ink-and-paper textures. The contrast between the modern (Satomi's phone, her sensible travel clothes) and the decayed should be visible in the UI.

## Narrator Voice
Two voices:

**Narrator (main narration):** Male, Japanese, second-person ("あなたは..."). Calm, measured, inviting — deadpan delivery makes the horror land harder. Also reads Ryan's lines and the Altar Presence's single word.
Voice ID: `japanese_narrator_male_inviting_clear_measured`

**Satomi's inner voice (self-dialogue):** Female, Japanese, cheerful and clear — Satomi thinking out loud, composing imaginary texts to Ryan, muttering under her breath. The cheerfulness against the horror is the comedy.
Voice ID: `japanese_female_adult_japanese_cheerful_clear`

NPC voices: `japanese_male_adult_japanese_serious_clear_measured` (Kimura), `japanese_male_midlife_japanese_mature_deep_intriguing` (Tanaka). See cast.md.

## Open Questions
- Exact title confirmed? 「里見の家」(Satomi no Ie / The Satomi House) — or adjust?
- All text is in Japanese (story.yaml, scenes, narration, choices). Player-facing UI remains in engine default (English labels like "Choices" etc. are engine-level, not story-level).
- Ryan never appears in person — only in Satomi's imagined texts and one possible phone call. Confirmed.
