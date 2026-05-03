# Group A: Authoring Conventions

## Scope

Pure documentation changes — no engine code, no new YAML fields. Two authoring patterns surfaced as first-class guidance: consumable choices and NPC voice consistency.

---

## Consumable Choices

The engine already supports `flags_unset` in `requires`. A consumable choice uses this to make a choice disappear after it's been taken — the merchant sold their last potion, the secret door was only open once.

Pattern: the choice requires a flag to be unset, and its effects set that flag. On the next visit, the flag is set so the choice is gone.

### Changes

**`templates/scene.yaml`** — add a commented consumable choice example:

```yaml
# Consumable choice — appears once, gone after taken
- text: Buy the last potion (3 gold)
  next: bought_potion
  requires:
    flags_unset: [potion_sold]
    stats:
      gold: 3
  effects:
    stats:
      gold: -3
    flags:
      potion_sold: true
```

**`docs/storycrafting/stage-1-structure.md`** — add to the Mechanics Summary guidance: flag any one-shot choices in the mechanics plan. A consumable choice that isn't planned is easy to forget — the merchant still offers the sold potion.

**`docs/storycrafting/stage-3-scene-writing.md`** — add a consumable choice example in the scene quality checks section, cross-referencing the template.

---

## NPC Voice Convention

No engine feature. An authoring discipline: each NPC has a consistent register across every scene they appear in. Voice is the mechanic — an NPC with opinions and a distinct way of speaking rewards revisiting more than one who delivers information.

### Guidance (to add to stage-3)

- Give each NPC a distinct register: vocabulary, sentence length, what they notice, what they care about
- Decide this before writing their first scene and hold it across all scenes they appear in
- An NPC's voice should be recognisable without a name tag — if you covered the speaker label, you'd still know who it was
- NPCs with opinions reward curiosity even when nothing mechanical happens; NPCs who only deliver plot do not

---

## Files Touched

- `templates/scene.yaml`
- `docs/storycrafting/stage-1-structure.md`
- `docs/storycrafting/stage-3-scene-writing.md`
