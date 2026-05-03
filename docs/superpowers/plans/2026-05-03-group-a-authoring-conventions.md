# Group A: Authoring Conventions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface consumable choices and NPC voice as named authoring patterns in the stage docs and scene template.

**Architecture:** Docs-only changes — no engine code. Two stage docs get new sections; the scene template gets a new commented example. All changes are additive.

**Tech Stack:** Markdown, YAML comments.

---

### Task 1: Add consumable choice example to scene template

**Goal:** Add a commented consumable choice example to `templates/scene.yaml` so authors have it as a reference when writing scenes.

**Files:**
- Modify: `templates/scene.yaml`

**Acceptance Criteria:**
- [ ] Template includes a commented consumable choice block with `flags_unset` on `requires` and matching flag set on `effects`
- [ ] Comment explains the pattern in one line

**Verify:** Read `templates/scene.yaml` — consumable choice block is present and correct YAML.

**Steps:**

- [ ] **Step 1: Add consumable choice example**

In `templates/scene.yaml`, after the "Choice that sets a flag" block, add:

```yaml
  # Consumable choice — appears once, gone after taken
  # The choice requires the flag to be unset; taking it sets the flag.
  # On any return visit the flag is set so the choice no longer appears.
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

- [ ] **Step 2: Commit**

```bash
git add templates/scene.yaml
git commit -m "docs: add consumable choice example to scene template"
```

---

### Task 2: Add consumable choice guidance to stage-1

**Goal:** Remind authors to flag one-shot choices during the mechanics planning stage so they are deliberate, not accidental.

**Files:**
- Modify: `docs/storycrafting/stage-1-structure.md`

**Acceptance Criteria:**
- [ ] "Mechanics Summary" section or guidance includes a note about consumable choices
- [ ] Note explains the risk (forgetting to plan them leads to choices that never disappear)

**Verify:** Read `docs/storycrafting/stage-1-structure.md` — note is present under mechanics guidance.

**Steps:**

- [ ] **Step 1: Add consumable choices note to Mechanics Summary guidance**

In `docs/storycrafting/stage-1-structure.md`, after the `Stats/flags in play` item in the "Cover:" list, add:

```markdown
   When planning flags, mark any that gate a **consumable choice** — a choice that should disappear after being taken (the merchant sold their last potion; the door was only unlocked once). These require deliberate `flags_unset` + `effects` pairing in scene YAML. A consumable choice that isn't planned is easy to forget, leaving the option available indefinitely.
```

- [ ] **Step 2: Commit**

```bash
git add docs/storycrafting/stage-1-structure.md
git commit -m "docs: add consumable choice planning note to stage-1"
```

---

### Task 3: Add consumable choice and NPC voice guidance to stage-3

**Goal:** Give scene writers a YAML example for consumable choices and written guidance on NPC voice consistency.

**Files:**
- Modify: `docs/storycrafting/stage-3-scene-writing.md`

**Acceptance Criteria:**
- [ ] Scene quality checks section includes a consumable choice YAML example
- [ ] New NPC voice section added with guidance on register, consistency, and voice as mechanic
- [ ] NPC voice section is in the writing guidance portion of the doc (not the output/done-when sections)

**Verify:** Read `docs/storycrafting/stage-3-scene-writing.md` — both additions present.

**Steps:**

- [ ] **Step 1: Add consumable choice example to scene quality checks**

In `docs/storycrafting/stage-3-scene-writing.md`, in the "Scene quality checks" section, add after the existing checks:

```markdown
- For one-shot encounters: does this choice use `flags_unset` on `requires` and set the same flag on `effects`? If the choice should vanish after being taken, both halves must be present.

```yaml
# One-shot: the peddler only has one flask
- text: Buy the peddler's flask
  next: bought_flask
  requires:
    flags_unset: [flask_sold]
    stats:
      gold: 2
  effects:
    stats:
      gold: -2
    flags:
      flask_sold: true
```
```

- [ ] **Step 2: Add NPC voice section**

In `docs/storycrafting/stage-3-scene-writing.md`, after the "Scene quality checks" section, add:

```markdown
---

## NPC Voice

Voice is the mechanic. An NPC with a distinct way of speaking rewards revisiting more than one who only delivers information.

Before writing an NPC's first scene, decide their register:
- **Vocabulary** — do they use long words or short ones? Jargon? Contractions?
- **Sentence length** — clipped and terse, or meandering?
- **What they notice** — a merchant notices your coin purse; a scholar notices your accent
- **What they care about** — their self-interest, their fear, their pride

Hold this register across every scene they appear in. An NPC's voice should be recognisable without a name tag — if you covered the speaker label, you'd still know who it was.

NPCs with opinions reward curiosity even when nothing mechanical happens. NPCs who only deliver plot do not.
```

- [ ] **Step 3: Commit**

```bash
git add docs/storycrafting/stage-3-scene-writing.md
git commit -m "docs: add consumable choice example and NPC voice guidance to stage-3"
```
