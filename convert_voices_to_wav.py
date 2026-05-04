#!/usr/bin/env python3
"""Convert all MP3 files in tts_voices/ to WAV using ffmpeg."""
import subprocess
import sys
from pathlib import Path

VOICES_DIR = Path(__file__).parent / "tts_voices"


def main():
    delete = "--delete" in sys.argv
    mp3s = sorted(VOICES_DIR.glob("*.mp3"))
    if not mp3s:
        print("No MP3 files found in tts_voices/")
        return

    for mp3 in mp3s:
        wav = mp3.with_suffix(".wav")
        if wav.exists():
            print(f"skip (exists): {wav.name}")
            continue
        print(f"convert: {mp3.name} -> {wav.name}")
        result = subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(mp3), str(wav)],
        )
        if result.returncode != 0:
            print(f"  FAILED ({result.returncode})")
            continue
        if delete:
            mp3.unlink()
            print(f"  deleted {mp3.name}")


if __name__ == "__main__":
    main()
