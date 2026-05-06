# One Night in the Yawning Portal — Cast

> Narrator voice (set in `story.yaml`): `narrator_male_sean_bean` — placeholder, to be sourced/cloned. Reserved for narration only; not assigned to any NPC.

> Voice library note: the available NPC pool skews American and contemporary. Several Forgotten Realms archetypes (gravelly dwarf, ancient eldritch envoy, deranged warlock, halfling chirp) lack a perfect timbre — gaps are noted inline against the closest available match. Consider commissioning replacement clips for the flagged voices before final audio bake.

---

## Durnan the Wanderer (the barkeep, hub anchor)
**Voice:** `male_midlife_american_deep_raspy_authentic` — deep, raspy, and authentic fits a man who has swallowed decades of smoke and worse; carries the immovable authority of someone who has run the most famous bar on the Sword Coast for half a century without once descending his own well.
**Body:** Broad-shouldered, aproned, a half-healed nick above one eyebrow he never explains. Polishes a tankard he has already polished. Eyes flick to the well's rim every few minutes without his head turning.
**Voice on the page:** Few words, all weighed. Drops articles when tired ("Bar's open, money's good"). Never raises his voice — when something needs emphasis he goes quieter, not louder. Will name a thing once and never again that night ("the apprentice", then only "they"). Avoids prophecy, avoids advice unless asked, avoids comfort.
**Contradiction:** Knows what's down his own well — has walked it himself, decades back — and refuses to tell anyone. The kindest man in the room is also the one most willing to let a fool die for the lesson.
**Wants:** The Portal to outlive him. A clean ledger. The well respected, not feared.
**Fears:** That the well will one day climb out at him. That he will be the man who let it happen by saying nothing.
**First seen:** `portal_arrival` (Act 1, Beat 1).
**Recurs in:** `common_room` background, `talk_durnan` and all sub-topics, `job_accepted_free` (witness), `pay_tab_early`, `well_mouth_durnan_word`; well-mouth background in Act 2; central in Act 3 `act_3_open`, `bar_settle_up`, `durnan_final`, `pay_tab_unprompted`, `stand_a_round`, every farewell scene; final-line presence in Endings 1/2/4.

## Joren Wexley (the Client — an anxious craftsman, the missing apprentice's master)
**Voice:** `male_young_american_weak` — a thin, breath-short voice fits a man unmade by the last forty hours. Note: "young" tag is a stretch — Joren reads mid-thirties; the weakness/reediness is the load-bearing trait, age is approximate.
**Body:** A bookbinder's hands — ink in the cuticles, a small healed burn on the right thumb from a hot press. Wedding ring he turns when he's about to say something he's afraid of. Has not slept; the collar of his good shirt is on inside out and he hasn't noticed.
**Voice on the page:** Half-finished sentences ("She — Linnet, I mean — she wouldn't, she's not the sort who —"). Apologises pre-emptively. Names the apprentice at every opportunity, as if saying *Linnet* often enough will keep her present. Fee discussions make him flinch.
**Contradiction:** He sent the dare himself, in jest, the night before — and has not told a soul. The grief is real; the guilt under it is the grief's engine.
**Wants:** Linnet back, alive, this hour. Failing that: not to have to tell her mother.
**Fears:** That the dare-paper is still in his apron pocket. That somebody will find it.
**First seen:** `portal_arrival` (Act 1, Beat 1, corner table).
**Recurs in:** `talk_client` and every sub-topic, `take_job_decide`, `job_accepted` / `haggle_success` / `haggle_fail` / `job_accepted_free` / `client_walked`; absent from Act 2 except by reference (his letter in `camp_search`); central in Act 3 `client_handover`, may bookend Endings 1/2 at the door.

## Mirt the Moneylender (the loud table by the fire)
**Voice:** `male_midlife_american_loud_confident_cocky` — loud, confident, cocky lands the Falstaffian bluster that canon Mirt demands; closer to American merchant-swagger than the previous posh-English, which read too retired-colonel. Closes the noted gap.
**Body:** Vast, red-faced, three-meals-deep into the evening. A signet ring on every other finger. A tankard that is always somehow full. Slaps the table for punctuation; the table is sticky from a dozen evenings of it.
**Voice on the page:** Booms. Calls everyone *young blood* or *my dear* regardless of station. Strings sentences together with *and so* and *which is to say* — the rhythm of a man who has been the most interesting person in every room for forty years. Drops a coin's worth of real Waterdeep insight in the middle of three coins' worth of bluster; the listener has to catch it.
**Contradiction:** The bluster is a mask for a sharp, sober reader of people. He has decided whether to offer the player his network within ten seconds of seeing them; the rest of the conversation is theatre.
**Wants:** A new face in the city he can place. Someone interesting to owe him a favour. A reason to keep being relevant.
**Fears:** Being the last of his kind in the room and not knowing it. The day Durnan stops nodding back.
**First seen:** `portal_arrival` (Act 1, Beat 1, background).
**Recurs in:** `talk_mirt` and sub-topics (gated by Renown ≥ 1), `mirt_topic_gossip`, `mirt_topic_offer`, `mirt_loan_take`, `mirt_loan_refuse`; absent from Act 2; central in Act 3 `mirt_offer` and `ending_5_sworn`; absent on Ending 6 (he leaves the room when he feels the wrongness).

## Korsa Ironbrow (dwarf sellsword, recruitment candidate — frontline tank)
**Voice:** `male_midlife_british_tough_calloused` — tough and calloused carries the physical weight and the veteran soldier's economy better than the previous calm-friendly British voice. Still lacks the chest-rumble a dwarf wants, but the toughness closes the gap further. Flag for re-record if a deeper-gravelled voice is added.
**Body:** Iron-grey beard braided with a single dark band of mourning. Plate maintained better than his clothes. A chip out of his left thumbnail that never quite grows back. Drinks slowly; refills often.
**Voice on the page:** Short sentences. Doesn't waste words on agreement — a nod does it. When he speaks more than two clauses in a row it matters. Calls weapons by their proper names; calls people by their first names from the first meeting. Swears in Dwarvish when surprised, never in Common.
**Contradiction:** He says the dark is just dark — but he has been making peace with one particular dark for ten years (his brother's tunnel collapse). The well is *that* dark. He will not say so out loud.
**Wants:** A clean fight. To be useful. A drink and a quiet table afterwards.
**Fears:** Being the one who has to leave a body behind again.
**First seen:** `talk_korsa` (Act 1, Beat 5).
**Recurs in:** `korsa_topic_*` sub-topics, `recruit_korsa`; if recruited, present in `well_mouth` and across every Act 2 scene (well-mouth, spokes, upper levels, deep encounter); central in Act 3 `farewell_korsa`. May die in any Act 2 combat (`korsa_died`).

## Sister Vesna (half-elf priestess of Tymora, recruitment candidate — healer)
**Voice:** `female_adult_american_gentle_tender_sweet` — gentle, tender, and sweet carries the warmth of a woman who has prayed over more bodies than weddings and has not lost the habit of kindness. Resolves the "elder" age mismatch of the previous assignment; half-elves age slowly and this register reads correctly mid-life.
**Body:** Half-elven angularity softened by middle years. A worn silver coin of Tymora on a leather thong, flipped between two fingers when she is thinking. Calluses on her knuckles from praying with her hands clasped too hard.
**Voice on the page:** Speaks in benedictions even when she isn't blessing anything ("Lady Luck willing", "fortune's edge"). Names the dead before the living. Will not lie, but will rephrase a question she does not want to answer. Quiet over the prayer-coin; loud over a dice game.
**Contradiction:** Preaches Tymora's gospel of fortune-favours-the-bold, and chose the priesthood after surviving a shipwreck that killed everyone else aboard — including the man she should have married. The faith is real. The grief under it has not moved in twenty years.
**Wants:** To bury anyone she cannot save. A god who answers. A reason the coin came up the way it did.
**Fears:** That fortune is just a story she tells to keep walking.
**First seen:** `talk_vesna` (Act 1, Beat 5).
**Recurs in:** `vesna_topic_*` sub-topics, `recruit_vesna`; if recruited, all Act 2 beats including the unique `shrine_stoop` side-beat and the `vesna_left` branch in Beat 6 parley; central in Act 3 `farewell_vesna` (or `vesna_passed_in_silence` variant); her benediction grants `Vigor +1` on the blessed branch. May die in Act 2 (`vesna_died`).

## Pip Tallowmuch (halfling rogue, recruitment candidate — scout)
**Voice:** `female_young_american_lisp` — cheeky, light, slightly off-rhythm fits the halfling-rogue who wears flippancy like armour. Note: the lisp is character flavour, not a defect; it makes Pip immediately distinct in a crowded scene. Closest fit; a halfling-chirpy register would be ideal if available.
**Body:** Halfling-small, never still. Three earrings in one ear, none in the other. A working belt of pouches whose contents are never the same twice. Wipes her hands on the back of her trousers before any handshake — a tell.
**Voice on the page:** Quick. Clipped. Counts everything aloud ("two coppers, four steps, three guards"). Calls bigger people *tall one* until she has decided she likes them, after which she uses their name with the affection of a tax assessor. Refuses metaphors; will mock anyone who reaches for one.
**Contradiction:** Plays the mercenary purely-for-coin angle hard, and routinely takes jobs at half her quoted rate when a kid is involved. Will deny this under torture.
**Wants:** Her cut. A clean exit. To not be the one carrying the wounded.
**Fears:** Being trapped underground without a second way out. (She will not say this; she will mention exits a lot.)
**First seen:** `talk_pip` (Act 1, Beat 5).
**Recurs in:** `pip_topic_*` sub-topics, `recruit_pip`; possible interjection in `steal_caltrops` outcomes (`pip_suspects` / `pip_angry`); if recruited, all Act 2 beats including unique `fence_corner` side-beat, `harbour_pip_scout`, `cellar_pip_pick`; central in Act 3 `farewell_pip`. May die in any Act 2 combat (`pip_died`).

## Thessaly Vex (tiefling sorceress, recruitment candidate — arcane firepower)
**Voice:** `female_adult_american_sultry_villainous` — sultry-villainous carries the controlled-burn quality of a sorceress with *quiet reasons* for going down a well full of monsters; the villainous edge captures the dark-edged mystery without tipping into pantomime. Upgrade from smooth-sultry; the menace is load-bearing.
**Body:** Tall, narrow, deep-violet skin under tavern lamplight. Filed-blunt horn-tips she touches when concentrating. A burn-scar on the inside of her left wrist in the shape of a sigil she will not let the player examine.
**Voice on the page:** Long sentences, soft consonants. Asks questions she already knows the answer to, to see how the answerer phrases it. Slips into formal Mage's Cant when she wants the wizard-protagonist to hear something specifically. Pauses before names — every name, including her own.
**Contradiction:** Reads as the wild-magic chaos counterpart to the protagonist's prepared register, and is in fact the most disciplined caster in the room. The chaos is theatre; the discipline is the secret.
**Wants:** A name she has been chasing for two years. (Surfaces only on the Wits-6 `thessaly_topic_why` branch — sets `knows_thessaly_motive`.)
**Fears:** That the name is in the well, and that it knows her face.
**First seen:** `talk_thessaly` (Act 1, Beat 5).
**Recurs in:** `thessaly_topic_*` sub-topics, `recruit_thessaly`; if recruited, all Act 2 beats including unique `cistern_thessaly_rune` (motive reveal) and `cellar_thessaly_breach` (sets `arrived_loud`); central in Act 3 `farewell_thessaly`. May die in any Act 2 combat (`thessaly_died`).

## Linnet (the missing apprentice — Joren's bookbinding apprentice, age seventeen)
**Voice:** `female_young_american_sweet_youthful_clear` — sweet, youthful, and clear fits the un-marked journal voice (eager, run-on, excited about runes); when Linnet appears physically in Act 2, that same sweetness played against the situation reads as quietly wrong — the calm is too smooth for someone who has been below. Resolves the previous gender mismatch while preserving the uncanny register.
**Body:** Slight, pale, ink-stained fingertips like Joren's. A new mark on the back of the left hand that wasn't there two days ago — visible if `bargained`. Eyes that track the player a beat slower than they should.
**Voice on the page:** Short sentences when present in Act 2's deep chamber. Repeats the player's last word back as a question, once, before answering. The journal voice (Act 1 `loot_room_journal`, Act 2 `journal_decode`, `camp_search`) is the *un*marked version — eager, run-on, half-finished thoughts about runes she "saw twice".
**Contradiction:** The dare was a joke, the descent was a lark, the conversation she found at the bottom is the first thing in seventeen years that has felt *important*. She is not sure she wants to be rescued.
**Wants:** To be told a true thing. (The *thing* below has told her several.)
**Fears:** That her master sent her to die. (He didn't, but the dare-paper is in his pocket, and she remembers his handwriting.)
**First seen:** Voice only — `loot_room_journal` (Act 1 Beat 6) if found. First physically present: `deep_chamber_enter` (Act 2 Beat 6).
**Recurs in:** `journal_decode`, `camp_search` (Act 2); central in Beat 6 (silent presence, hostage/shield/willing-companion depending on path); in Act 3 her presence in `act_3_open` and `client_handover` is a prose layer driven by `rescued` / `bargained` (silent on α/β, *marked* on γ, absent on δ/ε-without-rescued/ζ).

## The *thing* below (the envoy in the cellar chamber)
**Voice:** `male_midlife_american_deep_malevolent_ancient_slow` — deep, malevolent, ancient, and slow is the closest the library now offers to "alien intelligence wearing a voice". The ancient-slow cadence fits the metronome-regular speech pattern; malevolent under the surface matches the unsettling-kind register. Closes most of the previous gap; pitch-shift or reverb processing would close the remainder before final bake.
**Body:** Glimpsed across a still pool. Human-shaped from the waist up; the waterline edits the rest. Wet hair the colour of nothing in particular. Smiles with the wrong muscles.
**Voice on the page:** Speaks in declarative sentences. Never asks a question. Uses the player's name before the player has given it. Names every companion correctly. The cadence is too regular — a metronome with a voice on top. Refers to the apprentice as *the one who answered* and never as Linnet.
**Contradiction:** Offers what looks like a fair deal, in a register that is almost kind. The kindness is the most alien thing about it.
**Wants:** The conversation to continue. The apprentice to stay (or to walk out with the *mark* still listening).
**Fears:** Nothing the player can name. Possibly the *thing-behind* it, if the stir-and-flee path is taken.
**First seen:** `deep_chamber_enter` (Act 2 Beat 6).
**Recurs in:** All Beat 6 resolutions (`deep_fight_*`, `deep_parley_*`, `deep_stir_*`); referenced in Act 3 `bargained` and `stirred_something` outro prose. Never appears physically in Act 3.

## The *thing-behind* (the deeper presence beneath the envoy)
**Voice:** *None — never speaks.* Pure dread; surfaces only in narrator prose and in the well's "breathing" colour on Ending 6. No voice ID assigned.
**Body:** Never seen. Heard once in Beat 6 if `stirred_something` is set (a low sound that rises through the well). Felt by the regulars in Act 3's `act_3_open` on Exit ε.
**Voice on the page:** N/A — narrator-only.
**Contradiction:** N/A.
**Wants:** Up.
**Fears:** N/A.
**First seen:** Felt only — `deep_stir_*` (Act 2 Beat 6) if stirred.
**Recurs in:** Act 3 `act_3_open` (atmospheric only on ε), Ending 6 outro.

## The alley witness (Trades Ward, holed up above a chandler's)
**Voice:** `male_adult_african-american_uneducated` — street-level, evasive, the voice of a man who has talked his way out of three watchpens and is afraid this conversation is the fourth. Note: the "uneducated" tag in the library is a class marker; play him as quick-witted within his register, not slow.
**Body:** Mid-thirties, missing the upper half of one ear. A chandler's wax-smear on the cuff he keeps trying to hide. Won't sit down — paces the room.
**Voice on the page:** Sentences that start one place and end another. Calls the player *friend* when he's about to lie. Three names for the apprentice's *guide*, all different, none reliable. Bolts mid-sentence if pressed.
**Contradiction:** Was paid to keep his mouth shut, and is so afraid of the *guide* that he might tell the player anyway — for free, if the player is the kind who scares him less than what's coming up the well.
**Wants:** Out of Waterdeep before dawn. A bag of coin, ideally the player's.
**Fears:** The guide. The cellar door. The *thing*'s name (which he heard once and won't repeat).
**First seen:** `alley_witness_room` (Act 2 Beat 3).
**Recurs in:** `alley_approach` (audible from corridor), `alley_witness_speaks`, `alley_witness_bolts`, may die in `alley_witness_burned`. Sets `alley_witness_named` / `_lost` / `_dead`.

## The Trades Ward bargeman (Dock 14)
**Voice:** `male_midlife_american_dark_tough` — dark and tough fits a dockworker who hasn't slept since he watched the apprentice board a derelict at his own quay; the weight of what he glimpsed in that hold has settled into him. Upgrade from casual-relaxed-light, which was too easy for someone carrying this particular knowledge.
**Body:** Sun-and-salt-cured. Fingers webbed with old rope-burn. Pipe in a side pocket, never lit, often chewed. A small wooden charm at his neck — not a holy symbol of anything the player recognises.
**Voice on the page:** Slow. Drops the question back at the asker ("Was she alone, you ask"). Reads the room like a tide-table — knows when to close his mouth before the waves come in. Uses dockyard slang the player has to parse.
**Contradiction:** Took the apprentice's coin, watched her go aboard a derelict at his own quay, and has not slept well since. Will tell most of it for half what the player would have offered, if the player asks gently.
**Wants:** To unload the knowledge. A quiet retirement to a smaller dock.
**Fears:** The harbour-master. Whatever he saw in the derelict's hold the morning after. His own dreams.
**First seen:** `harbour_approach` (Act 2 Beat 4).
**Recurs in:** `harbour_bargeman_talk`. Survives the act regardless of player path.

## The harbour clerk (Dock 14 office)
**Voice:** `male_adult_american_witty_casual` — dry, quick, the register of a clerk who has read every smuggler's manifest twice and finds them all funnier than the smugglers do.
**Body:** Slight, ink-cuffed, narrow rectangular spectacles he doesn't quite need. A neat ledger and a less-neat ledger. Eats an apple very methodically while the player searches.
**Voice on the page:** Short, surgical sentences. Will answer exactly the question asked and not the one the player meant. Enjoys the player figuring out the trick of his record-keeping; will not help.
**Contradiction:** Bored to death of his job and competent past the point of caring; the records are perfect because the work bores him into precision, not the other way around.
**Wants:** A different posting. The player to leave so he can finish his apple.
**Fears:** An audit.
**First seen:** `harbour_records` (Act 2 Beat 4).
**Recurs in:** `harbour_records` only.

## The shrine-keep (Trades Ward stoop, Vesna's side-beat)
**Voice:** `female_adult_american_grounded_professional` — grounded and professional suits a layperson who tends a shrine with quiet competence, unaffiliated with any temple and asking nothing of the work. More precise than the previous generic assignment.
**Body:** A working woman in clean grey, kneeling at a small bowl of coin and dried flowers. Hands chapped from washing the stoop daily.
**Voice on the page:** Short benedictions, longer silences. Speaks to Vesna as *sister* without irony. Will not look directly at the player; reads them in glances.
**Contradiction:** Tends a Tymora shrine for a temple that has forgotten the stoop exists, and is funded entirely by Mirt — who has never told her so.
**Wants:** The stoop kept. Vesna to come back alive.
**Fears:** The temple noticing.
**First seen:** `shrine_stoop` (Act 2 Beat 2).
**Recurs in:** `shrine_stoop` only.

## The Trades Ward fence (Pip's side-beat)
**Voice:** `female_midlife_african-american_casual_opinionated` — casual, opinionated, the voice of a fence who runs her side of the Trades Ward by knowing exactly what everyone is worth and saying so out loud.
**Body:** Stout, sleeves rolled, a knife on the table she does not need to touch to be using. A laugh that arrives a beat before her smile does.
**Voice on the page:** Direct. Calls Pip *little knife* with affection. Quotes prices in coin and in favours interchangeably. Will not be hurried.
**Contradiction:** Runs the most honest-by-her-own-rules fencing operation in the Trades Ward and will personally beat any of her runners who steals from a child or a priest.
**Wants:** The transaction. Her cut. Pip back in one piece.
**Fears:** The Watch noticing she is good at her job.
**First seen:** `fence_corner` (Act 2 Beat 2).
**Recurs in:** `fence_corner` only.

## The alley watchman (Trades Ward, doorway to the witness's lodging)
**Voice:** `male_young_american_forthright` — forthright, slightly-too-loud, the voice of a young Watch officer who has been told this corner is his for the next six hours and is determined to do it correctly.
**Body:** New leathers, polished badge, helm a quarter-turn off-true. Hand on the truncheon more often than necessary.
**Voice on the page:** Procedural. Quotes the relevant bylaw when challenged. Bluffable on Wits, bribable on Coin, fightable as a last resort.
**Contradiction:** Bought into the Watch ethos genuinely — and is being paid by the same toughs who paid the witness, without quite admitting it to himself.
**Wants:** The shift to end. A clean report. Promotion.
**Fears:** That the bribe in his pocket will be noticed.
**First seen:** `alley_approach` (Act 2 Beat 3).
**Recurs in:** `alley_approach` only.

## Brother Vell (the cellar warlock — only present on the alley-guide variant of the cellar pack)
**Voice:** `male_young_american_youthful_confident_bright` — bright and confident, deliberately *wrong* against the role; played as a young true-believer whose conversion to the *thing* below has not dimmed his enthusiasm but has tilted it into something uncanny. Note: still a real gap — the role wants a feverish, broken-faith register the library doesn't have. Bright-confident is slightly more menacing than the previous vibrant-fresh (confidence reads as conviction; conviction in this context is the horror). The wrongness lands if Stage 5 prose commits to the dissonance ("a voice that should be selling cordial, not chanting"). Flag for re-record.
**Body:** Robed in a habit that was once a Tymoran novice's grey, now patched with darker cloth. Wax-pale, bright-eyed, a fresh sigil burned into the inside of one wrist (matching Thessaly's — Thessaly, if recruited, sees it and goes very quiet).
**Voice on the page:** Speaks in invitations. Calls the player *friend* without irony. Uses the *thing*'s phrasings (declarative sentences, no questions) when the *thing* is close. Sounds happiest mid-fight.
**Contradiction:** Was a Tymora novice (Vesna may know him by sight — possible Stage 5 recognition beat). The thing he found in the dark answered a question the goddess had not, and he is *grateful*.
**Wants:** The player to listen. The apprentice to be the second of many.
**Fears:** That the *thing* below will lose interest in him now that there is fresher fruit.
**First seen:** `cellar_fight_open` (Act 2 Beat 5, alley-guide variant only).
**Recurs in:** `cellar_fight_*` resolutions (alley-guide variant). May be killed in any cellar-fight outcome; never recurs in Act 3 (referenced only).

## The unnamed thief (Act 1 inn-room intruder, possible callback)
**Voice:** `male_young_american_youthful_vibrant_fresh` — vibrant and fresh fits a thief who runs on nerves and quick patter; the energy reads as someone who talks fast when caught because silence is the one thing that costs him. Held in reserve as a possible Act 2 / Act 3 callback face per the Stage 3 brief; if he reappears, this is his voice.
**Body:** Lanky, hooded, a torn ear of cloth at his elbow that doesn't match the rest of the coat. Soft-soled boots; the player only hears him on the stairs.
**Voice on the page:** Quick patter when caught — apologies, half-explanations, an offer of the page he took if the player will let him go. Names nobody.
**Contradiction:** Was hired to take the journal by someone he didn't quite see — a small voice from a hood, a bag of coin heavier than the job warranted. Has decided not to ask why.
**Wants:** Out of the room, out of the Trades Ward, out of the contract.
**Fears:** That the small voice will come asking why he failed.
**First seen:** `loot_room_visitor` (Act 1 Beat 6, weighted outcome).
**Recurs in:** `loot_room_chase` (if pursued). Possible Act 2 callback face per Stage 3 cast notes.

---

## Reference: voice assignments at a glance

| NPC | Voice ID | Major / Minor |
|---|---|---|
| Durnan | `male_midlife_american_deep_raspy_authentic` | Major |
| Joren Wexley (Client) | `male_young_american_weak` | Major |
| Mirt the Moneylender | `male_midlife_american_loud_confident_cocky` | Major |
| Korsa Ironbrow | `male_midlife_british_tough_calloused` | Major |
| Sister Vesna | `female_adult_american_gentle_tender_sweet` | Major |
| Pip Tallowmuch | `female_young_american_lisp` | Major |
| Thessaly Vex | `female_adult_american_sultry_villainous` | Major |
| Linnet (apprentice) | `female_young_american_sweet_youthful_clear` | Major |
| The *thing* below | `male_midlife_american_deep_malevolent_ancient_slow` | Major (gap — needs processing) |
| The *thing-behind* | *none — narrator only* | Atmospheric |
| Alley witness | `male_adult_african-american_uneducated` | Minor |
| Bargeman | `male_midlife_american_dark_tough` | Minor |
| Harbour clerk | `male_adult_american_witty_casual` | Minor |
| Shrine-keep | `female_adult_american_grounded_professional` | Minor |
| Trades Ward fence | `female_midlife_african-american_casual_opinionated` | Minor |
| Alley watchman | `male_young_american_forthright` | Minor |
| Brother Vell (cellar warlock) | `male_young_american_youthful_confident_bright` | Minor (gap — re-record candidate) |
| Unnamed thief / callback | `male_young_american_youthful_vibrant_fresh` | Minor |

**Voice-clash audit:** All major NPCs (those the player meets repeatedly) have unique voices. No reuse anywhere in the cast; every NPC with at least one line gets a distinct voice ID. Unused NPC-eligible voices remain in reserve for any Stage 5 walk-on additions: `female_adult_american_cheesy`, `female_adult_american_crisp_direct_clear`, `female_adult_american_droll_wry_dry`, `female_adult_american_energetic_confident`, `female_adult_british_enthusiastic_expressive`, `female_adult_south-african_bossy_tough`, `female_midlife_american_eloquent_villainous`, `female_midlife_american_sexy_sultry_sensual`, `female_young_american_annoying_bubbly_outgoing`, `female_young_american_youthful_sweet`, `male_adult_british_calm_friendly`, `male_adult_british_clear_posh_heartfelt`, `male_midlife_american_rich_smooth_rugged`, `male_midlife_british_dark_seductive_deep`, `male_midlife_british_sage_posh_wizard`, `male_midlife_english_posh`, `male_young_american_relaxed_light_soothing`, `male_young_american_youthful_friendly_modern`, `male_young_scottish_chirpy`.

**Flagged voice gaps** (closest-fit assignments; consider re-recording before final audio bake):
- **The *thing* below** — library has no alien / non-human register. `male_midlife_american_deep_malevolent_ancient_slow` is a significant upgrade over the previous assignment; pitch-shift + reverb processing on these clips would close most of the remaining distance.
- **Brother Vell (warlock)** — library has no feverish / broken-faith register. Bright-confident played against the dark prose can work if Stage 5 commits to the dissonance.
- **Korsa Ironbrow** — library has no gravelly-dwarf timbre. Tough-calloused British carries the personality and has more physical weight than the previous calm-friendly, but still lacks chest-rumble.
