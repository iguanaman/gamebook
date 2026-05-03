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
    """Return list of (text, voice) tuples for a scene."""
    if "text" not in scene:
        return []
    raw = scene["text"]
    items = raw if isinstance(raw, list) else [raw]
    result = []
    for b in items:
        if isinstance(b, str):
            result.append((b, default_voice))
        else:
            voice, text = next(iter(b.items()))
            result.append((text, voice))
    return result


def block_audio_path(scene_id, index):
    safe = scene_id.replace("/", "-")
    return f"audio/{safe}_block_{index}.opus"


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
            print(f"  [skip] {scene_id} — no text")
            continue

        # Check if all block files already exist
        out_paths = [story_dir / block_audio_path(scene_id, i) for i in range(len(scene_blocks))]
        if all(p.exists() for p in out_paths) and not force:
            print(f"  [skip] {scene_id} — audio exists")
            continue

        out_paths[0].parent.mkdir(parents=True, exist_ok=True)
        print(f"  [gen]  {scene_id} ({len(scene_blocks)} block(s))")

        for i, (text, voice) in enumerate(scene_blocks):
            print(f"         block {i}: {voice!r}")
            opus = synthesize(text, voice, EXAGGERATION)
            out_paths[i].write_bytes(opus)

        # Remove legacy fields
        scene.pop("audio", None)
        scene.pop("timings", None)
        save_yaml(scene_file, scene)
        print(f"         saved → {[block_audio_path(scene_id, i) for i in range(len(scene_blocks))]}")


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
