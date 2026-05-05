import os
import yaml

voices_dir = os.path.join(os.path.dirname(__file__), "tts_voices")
result = {}

GENDERS = {"male", "female"}
SPECIAL = {"narrator", "robot"}

for fname in sorted(os.listdir(voices_dir)):
    if not fname.endswith(".wav"):
        continue
    stem = fname[:-4]
    parts = stem.split("_")
    if len(parts) < 2:
        continue
    first = parts[0]

    if first in SPECIAL:
        # narrator/robot — second token is gender
        gender = parts[1]
        result.setdefault(first, {}).setdefault(gender, {})[stem] = None
    elif first not in GENDERS:
        # language-prefixed voice (e.g. japanese_narrator_male_...)
        lang = first
        remainder = parts[1:]
        if not remainder:
            continue
        gender = remainder[0] if remainder[0] in GENDERS else remainder[0]
        adjectives = remainder[1:] or None
        result.setdefault("languages", {}).setdefault(lang, {}).setdefault(gender, {})[stem] = adjectives
    else:
        # standard character voice — first token is gender
        gender = first
        adjectives = parts[1:]
        result.setdefault("characters", {}).setdefault(gender, {})[stem] = adjectives or None

out_path = os.path.join(voices_dir, "voices.yaml")
with open(out_path, "w") as f:
    yaml.dump(result, f, default_flow_style=False, sort_keys=True)

print(f"Written to {out_path}")
