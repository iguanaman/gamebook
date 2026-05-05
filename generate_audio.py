"""
Generate TTS audio for all scenes in all stories.

Requires the TTS server running on localhost:5500 (python tts_server.py).

Usage:
    python generate_audio.py                          # skip scenes that already have audio
    python generate_audio.py --force                  # regenerate everything
    python generate_audio.py --story demo             # one story only
    python generate_audio.py --suffix a               # regen only conditional if-branch blocks (a0, a1, ...)
    python generate_audio.py --migrate-conditional    # delete old _block_Na/Nb.opus and regen for scenes with existing audio
"""

# ── Config ────────────────────────────────────────────────────────────────────

TTS_URL       = "http://localhost:5500/tts"
STORIES_DIR   = "stories"
EXAGGERATION  = 2.0  # max expressiveness; turbo may ignore but worth sending

# ─────────────────────────────────────────────────────────────────────────────

import argparse
import re
import sys
from pathlib import Path

import requests
import yaml


def act_audio_slug(text):
    """Convert act title to audio slug (matching engine.js actAudioSlug)."""
    return re.sub(r'[^a-z0-9]+', '_', text.lower()).strip('_')


def load_yaml(path):
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def save_yaml(path, data):
    with open(path, "w", encoding="utf-8") as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)


def normalize_text(text):
    """Lowercase all-caps words so TTS doesn't shout them."""
    return re.sub(r'\b[A-Z]{2,}\b', lambda m: m.group().lower(), text)


def synthesize(text, voice_id, exaggeration=1.0):
    resp = requests.post(TTS_URL, json={"text": normalize_text(text), "voice_id": voice_id, "exaggeration": exaggeration},
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
            if isinstance(if_text, list):
                sub_i = 0
                for sub in if_text:
                    if isinstance(sub, str):
                        result.append((sub, default_voice, raw_index, f"a{sub_i}"))
                        sub_i += 1
                    elif isinstance(sub, dict) and "if" not in sub:
                        voice, text = next(iter(sub.items()))
                        result.append((text, voice, raw_index, f"a{sub_i}"))
                        sub_i += 1
            elif isinstance(if_text, dict):
                voice, text = next(iter(if_text.items()))
                result.append((text, voice, raw_index, "a0"))
            elif if_text:
                result.append((if_text, default_voice, raw_index, "a0"))
            if isinstance(else_text, list):
                sub_i = 0
                for sub in else_text:
                    if isinstance(sub, str):
                        result.append((sub, default_voice, raw_index, f"b{sub_i}"))
                        sub_i += 1
                    elif isinstance(sub, dict) and "if" not in sub:
                        voice, text = next(iter(sub.items()))
                        result.append((text, voice, raw_index, f"b{sub_i}"))
                        sub_i += 1
            elif isinstance(else_text, dict):
                voice, text = next(iter(else_text.items()))
                result.append((text, voice, raw_index, "b0"))
            elif else_text:
                result.append((else_text, default_voice, raw_index, "b0"))
        else:
            voice, text = next(iter(b.items()))
            result.append((text, voice, raw_index, ""))
    return result


def block_audio_path(scene_id, raw_index, suffix=""):
    safe = scene_id.replace("/", "-")
    slash = scene_id.find("/")
    act = scene_id[:slash] if slash != -1 else ""
    scene = scene_id[slash + 1:] if slash != -1 else scene_id
    return f"audio/{act}/{scene}/{safe}_block_{raw_index}{suffix}.opus"


def process_story(story_id, force, suffix_filter=None):
    story_dir = Path(STORIES_DIR) / story_id
    story_file = story_dir / "story.yaml"

    if not story_file.exists():
        print(f"  [skip] no story.yaml found")
        return

    story = load_yaml(story_file)
    default_voice = story.get("narrator", "narrator")
    print(f"  narrator voice: {default_voice}")

    process_story_title(story_id, story, default_voice, force)
    process_act_titles(story_id, story, default_voice, force)

    scenes_dir = story_dir / "scenes"
    scene_files = list(scenes_dir.rglob("*.yaml"))

    for scene_file in sorted(scene_files):
        if scene_file.name.startswith('_'):
            continue

        rel = scene_file.relative_to(scenes_dir)
        scene_id = str(rel.with_suffix("")).replace("\\", "/")

        scene = load_yaml(scene_file)
        scene_blocks = blocks_for_scene(scene, default_voice)

        if not scene_blocks:
            continue

        out_paths = [story_dir / block_audio_path(scene_id, raw_index, suffix)
                     for (_, _, raw_index, suffix) in scene_blocks]
        if suffix_filter:
            todo = [i for i, (_, _, _, sfx) in enumerate(scene_blocks) if sfx.startswith(suffix_filter)]
        elif force:
            todo = list(range(len(scene_blocks)))
        else:
            todo = [i for i, p in enumerate(out_paths) if not p.exists()]
        if not todo:
            continue

        out_paths[0].parent.mkdir(parents=True, exist_ok=True)
        print(f"  [gen]  {scene_id} ({len(todo)}/{len(scene_blocks)} block(s))")

        for i in todo:
            text, voice, raw_index, suffix = scene_blocks[i]
            label = f"block {raw_index}{suffix}"
            print(f"         {label}: {voice!r}")
            opus = synthesize(text, voice, EXAGGERATION)
            out_paths[i].write_bytes(opus)

        # Remove legacy fields
        scene.pop("audio", None)
        scene.pop("timings", None)
        save_yaml(scene_file, scene)
        print(f"         saved → {[block_audio_path(scene_id, ri, s) for (_, _, ri, s) in scene_blocks]}")


def process_story_title(story_id, story, default_voice, force):
    """Generate story_title.opus from story.yaml title field."""
    story_dir = Path(STORIES_DIR) / story_id
    title = story.get("title", "")
    if not title:
        return
    out_path = story_dir / "audio" / "story_title.opus"
    if out_path.exists() and not force:
        return
    out_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"  [gen]  story_title: {default_voice!r}")
    opus = synthesize(title, default_voice, EXAGGERATION)
    out_path.write_bytes(opus)
    print(f"         saved → audio/story_title.opus")


def process_act_titles(story_id, story, default_voice, force):
    """Generate act title audio from _act.yaml files."""
    story_dir = Path(STORIES_DIR) / story_id
    scenes_dir = story_dir / "scenes"
    if not scenes_dir.exists():
        return
    for act_file in sorted(scenes_dir.rglob("_act.yaml")):
        act = load_yaml(act_file)
        title = act.get("title", "")
        if not title:
            continue
        slug = act_audio_slug(title)
        act_dir = act_file.parent.name
        out_path = story_dir / "audio" / act_dir / f"{slug}.opus"
        if out_path.exists() and not force:
            continue
        out_path.parent.mkdir(parents=True, exist_ok=True)
        print(f"  [gen]  act title '{title}': {default_voice!r}")
        opus = synthesize(title, default_voice, EXAGGERATION)
        out_path.write_bytes(opus)
        print(f"         saved -> audio/{act_dir}/{slug}.opus")


def migrate_conditional(story_id):
    """Delete old _block_Na/Nb.opus files and regen conditional sub-blocks for scenes that have other audio done."""
    import re as _re
    story_dir = Path(STORIES_DIR) / story_id
    story_file = story_dir / "story.yaml"
    if not story_file.exists():
        print(f"  [skip] no story.yaml found")
        return

    story = load_yaml(story_file)
    default_voice = story.get("narrator", "narrator")
    audio_dir = story_dir / "audio"

    # Delete old single-letter conditional files: _block_N[ab].opus (no digit after letter)
    old_pattern = _re.compile(r'_block_\d+[ab]\.opus$')
    deleted = 0
    for f in audio_dir.rglob("*.opus"):
        if old_pattern.search(f.name):
            f.unlink()
            print(f"  [del]  {f.name}")
            deleted += 1
    if deleted:
        print(f"  deleted {deleted} legacy conditional file(s)")

    scenes_dir = story_dir / "scenes"
    scene_files = list(scenes_dir.rglob("*.yaml"))

    for scene_file in sorted(scene_files):
        if scene_file.name.startswith('_'):
            continue

        rel = scene_file.relative_to(scenes_dir)
        scene_id = str(rel.with_suffix("")).replace("\\", "/")
        scene = load_yaml(scene_file)
        scene_blocks = blocks_for_scene(scene, default_voice)
        if not scene_blocks:
            continue

        out_paths = [story_dir / block_audio_path(scene_id, raw_index, suffix)
                     for (_, _, raw_index, suffix) in scene_blocks]

        # Only process scenes where at least one non-conditional block already exists
        non_conditional = [p for (_, _, _, sfx), p in zip(scene_blocks, out_paths) if not sfx]
        if not any(p.exists() for p in non_conditional):
            continue

        todo = [i for i, p in enumerate(out_paths) if not p.exists()]
        if not todo:
            continue

        out_paths[0].parent.mkdir(parents=True, exist_ok=True)
        print(f"  [gen]  {scene_id} ({len(todo)} new block(s))")
        for i in todo:
            text, voice, raw_index, suffix = scene_blocks[i]
            print(f"         block {raw_index}{suffix}: {voice!r}")
            opus = synthesize(text, voice, EXAGGERATION)
            out_paths[i].write_bytes(opus)


def process_intro(manifest, force):
    """Generate intro_line_N.opus files from manifest.yaml intro block."""
    intro = manifest.get("intro")
    if not intro:
        return
    lines = intro.get("lines", [])
    default_narrator = intro.get("narrator", "narrator")
    if not lines:
        return
    audio_dir = Path(STORIES_DIR) / "audio"
    audio_dir.mkdir(parents=True, exist_ok=True)
    print("\n── intro ──")
    for i, line in enumerate(lines):
        if isinstance(line, dict):
            voice, text = next(iter(line.items()))
        else:
            voice, text = default_narrator, line
        out_path = audio_dir / f"intro_line_{i}.opus"
        if out_path.exists() and not force:
            continue
        print(f"  [gen]  intro_line_{i}: {voice!r}")
        opus = synthesize(text, voice, EXAGGERATION)
        out_path.write_bytes(opus)
        print(f"         saved → audio/intro_line_{i}.opus")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Regenerate existing audio")
    parser.add_argument("--story", help="Process one story only")
    parser.add_argument("--suffix", help="Regenerate only blocks whose suffix matches this pattern (e.g. 'a0')")
    parser.add_argument("--migrate-conditional", action="store_true",
                        help="Delete old _block_Na/Nb.opus files and regen conditional blocks for scenes that already have other audio")
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

    if not args.story and not args.migrate_conditional:
        process_intro(manifest, force=args.force)

    for story_id in story_ids:
        print(f"\n── {story_id} ──")
        if args.migrate_conditional:
            migrate_conditional(story_id)
        else:
            process_story(story_id, force=args.force, suffix_filter=args.suffix)

    print("\nDone.")


if __name__ == "__main__":
    main()
