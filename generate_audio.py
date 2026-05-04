"""
Generate TTS audio for all scenes in all stories.

Requires the TTS server running on localhost:5500 (python tts_server.py).

Usage:
    python generate_audio.py              # skip scenes that already have audio
    python generate_audio.py --force      # regenerate everything
    python generate_audio.py --story demo # one story only
"""

# ── Config ────────────────────────────────────────────────────────────────────

TTS_URL       = "http://localhost:5500/tts"
STORIES_DIR   = "stories"
EXAGGERATION  = 2.0  # max expressiveness; turbo may ignore but worth sending

# ─────────────────────────────────────────────────────────────────────────────

import argparse
import sys
from pathlib import Path

import requests
import yaml


def load_yaml(path):
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def save_yaml(path, data):
    with open(path, "w", encoding="utf-8") as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)


def synthesize(text, voice_id, exaggeration=1.0):
    resp = requests.post(TTS_URL, json={"text": text, "voice_id": voice_id, "exaggeration": exaggeration},
                         timeout=120)
    resp.raise_for_status()
    return resp.content


def blocks_for_scene(scene, default_voice):
    """Return list of (text, voice, raw_index, suffix) tuples for a scene."""
    if "text" not in scene:
        return []
    raw = scene["text"]
    items = raw if isinstance(raw, list) else [raw]
    result = []
    for raw_index, b in enumerate(items):
        if isinstance(b, str):
            result.append((b, default_voice, raw_index, ""))
        elif "if" in b:
            if_text = b.get("text", "")
            else_text = b.get("else", "")
            if if_text:
                result.append((if_text, default_voice, raw_index, "a"))
            if else_text:
                result.append((else_text, default_voice, raw_index, "b"))
        else:
            voice, text = next(iter(b.items()))
            result.append((text, voice, raw_index, ""))
    return result


def block_audio_path(scene_id, raw_index, suffix=""):
    safe = scene_id.replace("/", "-")
    return f"audio/{safe}_block_{raw_index}{suffix}.opus"


def process_story(story_id, force):
    story_dir = Path(STORIES_DIR) / story_id
    story_file = story_dir / "story.yaml"

    if not story_file.exists():
        print(f"  [skip] no story.yaml found")
        return

    story = load_yaml(story_file)
    default_voice = story.get("narrator", "narrator")
    print(f"  narrator voice: {default_voice}")

    scenes_dir = story_dir / "scenes"
    scene_files = list(scenes_dir.rglob("*.yaml"))

    for scene_file in sorted(scene_files):
        rel = scene_file.relative_to(scenes_dir)
        scene_id = str(rel.with_suffix("")).replace("\\", "/")

        scene = load_yaml(scene_file)
        scene_blocks = blocks_for_scene(scene, default_voice)

        if not scene_blocks:
            continue

        # Check if all block files already exist
        out_paths = [story_dir / block_audio_path(scene_id, raw_index, suffix)
                     for (_, _, raw_index, suffix) in scene_blocks]
        if all(p.exists() for p in out_paths) and not force:
            continue

        out_paths[0].parent.mkdir(parents=True, exist_ok=True)
        print(f"  [gen]  {scene_id} ({len(scene_blocks)} block(s))")

        for (text, voice, raw_index, suffix), out_path in zip(scene_blocks, out_paths):
            label = f"block {raw_index}{suffix}"
            print(f"         {label}: {voice!r}")
            opus = synthesize(text, voice, EXAGGERATION)
            out_path.write_bytes(opus)

        # Remove legacy fields
        scene.pop("audio", None)
        scene.pop("timings", None)
        save_yaml(scene_file, scene)
        print(f"         saved → {[block_audio_path(scene_id, ri, s) for (_, _, ri, s) in scene_blocks]}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Regenerate existing audio")
    parser.add_argument("--story", help="Process one story only")
    args = parser.parse_args()

    manifest_path = Path(STORIES_DIR) / "manifest.yaml"
    if not manifest_path.exists():
        print("Error: stories/manifest.yaml not found")
        sys.exit(1)

    manifest = load_yaml(manifest_path)
    story_ids = manifest.get("stories", [])

    if args.story:
        if args.story not in story_ids:
            print(f"Error: story '{args.story}' not in manifest")
            sys.exit(1)
        story_ids = [args.story]

    for story_id in story_ids:
        print(f"\n── {story_id} ──")
        process_story(story_id, force=args.force)

    print("\nDone.")


if __name__ == "__main__":
    main()
