import os
import yaml

voices_dir = os.path.join(os.path.dirname(__file__), "tts_voices")
result = {}

for fname in sorted(os.listdir(voices_dir)):
    if not fname.endswith(".wav"):
        continue
    stem = fname[:-4]
    parts = stem.split("_")
    if len(parts) < 2:
        continue
    vtype = parts[0]

    if vtype == "narrator":
        gender = parts[1]
        result.setdefault("narrator", {}).setdefault(gender, {})[stem] = None
    else:
        gender = parts[1]
        adjectives = parts[2:]
        result.setdefault(vtype, {}).setdefault(gender, {})[stem] = adjectives or None

out_path = os.path.join(voices_dir, "voices.yaml")
with open(out_path, "w") as f:
    yaml.dump(result, f, default_flow_style=False, sort_keys=True)

print(f"Written to {out_path}")
