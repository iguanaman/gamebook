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
import time
from pathlib import Path

import requests
import yaml


def load_yaml(path):
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def save_yaml(path, data):
    with open(path, "w", encoding="utf-8") as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)


def synthesize(text, voice_id, exaggeration=1.0, raw=False):
    resp = requests.post(TTS_URL, json={"text": text, "voice_id": voice_id, "exaggeration": exaggeration},
                         params={"raw": "true"} if raw else {}, timeout=120)
    resp.raise_for_status()
    return resp.content


def blocks_for_scene(scene, default_voice):
    """
    Return list of (text, voice) tuples for a scene.

    text: "plain string"        -> one block, default_voice
    text:                       -> list of blocks
      - "narrator text"         -> default_voice
      - male1: "spoken text"    -> voice male1
    """
    if "text" not in scene:
        return []
    raw = scene["text"]
    items = raw if isinstance(raw, list) else [raw]
    result = []
    for b in items:
        if isinstance(b, str):
            result.append((b, default_voice))
        else:
            # single-key dict: {voice_name: "text"}
            voice, text = next(iter(b.items()))
            result.append((text, voice))
    return result


def audio_path_for_scene(scene_id):
    """audio/act1-crossroads.opus from scene ID act1/crossroads"""
    safe = scene_id.replace("/", "-")
    return f"audio/{safe}.opus"


def process_story(story_id, force):
    story_dir = Path(STORIES_DIR) / story_id
    story_file = story_dir / "story.yaml"

    if not story_file.exists():
        print(f"  [skip] no story.yaml found")
        return

    story = load_yaml(story_file)
    default_voice = story.get("narrator", "narrator")
    print(f"  narrator voice: {default_voice}")

    audio_dir = story_dir / "audio"

    scenes_dir = story_dir / "scenes"
    scene_files = list(scenes_dir.rglob("*.yaml"))

    for scene_file in sorted(scene_files):
        # Derive scene ID from path relative to scenes/
        rel = scene_file.relative_to(scenes_dir)
        scene_id = str(rel.with_suffix("")).replace("\\", "/")

        scene = load_yaml(scene_file)
        scene_blocks = blocks_for_scene(scene, default_voice)

        if not scene_blocks:
            print(f"  [skip] {scene_id} — no text")
            continue

        # Determine output path
        out_rel = audio_path_for_scene(scene_id)
        out_abs = story_dir / out_rel

        if out_abs.exists() and not force:
            print(f"  [skip] {scene_id} — audio exists")
            continue

        out_abs.parent.mkdir(parents=True, exist_ok=True)

        # If multiple blocks with same voice, we could concatenate — but simpler
        # to just join text and send as one request per contiguous voice run
        runs = []
        for text, voice in scene_blocks:
            if runs and runs[-1][1] == voice:
                runs[-1] = (runs[-1][0] + "\n\n" + text, voice)
            else:
                runs.append((text, voice))

        if len(runs) == 1:
            # Single voice — one file
            print(f"  [gen]  {scene_id} ({runs[0][1]})")
            audio = synthesize(runs[0][0], runs[0][1], EXAGGERATION)
            out_abs.write_bytes(audio)
        else:
            # Multiple voices — fetch raw WAV, concatenate, encode to opus
            import io
            import subprocess
            import soundfile as sf
            import numpy as np
            print(f"  [gen]  {scene_id} ({len(runs)} voice runs)")
            arrays = []
            sr = None
            for i, (text, voice) in enumerate(runs):
                print(f"         run {i+1}: {voice!r}")
                wav_bytes = synthesize(text, voice, EXAGGERATION, raw=True)
                arr, rate = sf.read(io.BytesIO(wav_bytes))
                if sr is None:
                    sr = rate
                arrays.append(arr)
            combined = np.concatenate(arrays)
            wav_buf = io.BytesIO()
            sf.write(wav_buf, combined, sr, format="wav")
            proc = subprocess.run(
                ["ffmpeg", "-y", "-f", "wav", "-i", "pipe:0",
                 "-c:a", "libopus", "-b:a", "48k", "-f", "opus", "pipe:1"],
                input=wav_buf.getvalue(), capture_output=True, check=True,
            )
            out_abs.write_bytes(proc.stdout)

        # Update scene yaml with audio field
        scene["audio"] = out_rel
        save_yaml(scene_file, scene)
        print(f"         saved → {out_rel}")


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
