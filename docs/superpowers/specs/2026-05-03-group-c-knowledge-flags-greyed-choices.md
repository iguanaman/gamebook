# Group C: Knowledge Flags + Greyed Choices

## Scope

Two related features that make the engine's hidden state visible and legible to players:

1. **Knowledge flags** — flags declared in `story.yaml` with a label; visible ones surface in the HUD
2. **Greyed choices** — failed `requires` checks render as disabled choices with flavour text instead of disappearing

Both are about turning invisible engine state into narrative expression.

---

## Knowledge Flags

### `story.yaml` — new `flags` section

Authors declare flag metadata alongside starting stats:

```yaml
id: my-story
title: My Story
start: intro
stats:
  gold: 10
  stamina: 20
flags:
  has_lantern:
    label: "Lantern"
    visible: true
  knows_password:
    label: "Password to the vault"
    visible: true
  merchant_dead:
    visible: false   # tracked silently, never shown
  warned_guard:
    # no visible key = treated as false, never shown
```

Only flags with `visible: true` appear in the HUD. Flags not declared here behave exactly as now — invisible engine state. Declaring a flag with `visible: false` is optional but documents intent.

### HUD rendering

The HUD currently renders one element per stat. It gains a second section: knowledge flags. Rendered below stats, separated visually. Only shows flags that are:
- Declared in `story.flags` with `visible: true`
- Currently `true` in `state.flags`

When no visible flags are true, the knowledge section is absent (not an empty container). As flags are gained/lost through play, the HUD updates on every navigation like stats do.

### Engine changes

- Load `story.flags` metadata on story start, store on `storyMeta`
- HUD render function reads `storyMeta.flags` and `state.flags` to build the visible set
- No change to how flags are set/checked — `effects` and `requires` are unaffected

---

## Greyed Choices

### New choice fields

Two optional fields on any choice:

```yaml
choices:
  - text: Climb the wall
    next: rooftop
    requires:
      stats:
        agility: 8
    failed_text: "*(Your legs won't carry you that high)*"

  - text: Speak the old tongue
    next: inner_sanctum
    requires:
      flags: [knows_elvish]
    failed_text: "*(You don't know this language)*"
    hide_if_failed: true

  - text: Force the door
    next: forced_entry
    requires:
      stats:
        strength: 10
    # no failed_text — auto-generates fallback
```

### Rendering rules

| `failed_text` | `hide_if_failed` | Behaviour |
|---|---|---|
| absent | absent/false | Auto-generate fallback text, show greyed |
| present | absent/false | Show `failed_text`, show greyed |
| any | `true` | Hidden entirely (current behaviour) |
| absent | `true` | Hidden entirely |

Auto-generated fallback text is constructed from the `requires` shape:
- `stats: {agility: 8}` → `*(Requires: agility ≥ 8)*`
- `flags: [knows_elvish]` → `*(Requires: knows_elvish)*`
- Multiple requirements → comma-separated

**Default behaviour change:** choices with no `failed_text` and no `hide_if_failed` now grey out with auto-generated text instead of hiding. This is a breaking change for existing stories — authors who want to keep a choice hidden must add `hide_if_failed: true`. The demo story will need updating.

### Frontend changes

- Failed choices render as `<button disabled>` with the choice text and failure text below/inline
- CSS: disabled state — dimmed opacity, no hover, cursor default, failure text in muted italic
- Greyed choices appear after passing choices in the list (same order as authored, just visually distinct)

### Engine changes

- `meetsRequirements()` return value used to split choices into `passing` and `failing` arrays
- Failing choices with `hide_if_failed: true` dropped entirely (current behaviour)
- Remaining failing choices rendered with failure text
- Auto-generate failure text helper reads `requires` shape

---

## Files Touched

- `engine.js`
- `style.css`
- `templates/story.yaml`
- `templates/scene.yaml`
- `docs/storycrafting/stage-1-structure.md`
- `stories/demo/scenes/*.yaml` (add `hide_if_failed: true` to existing choices, or audit)
