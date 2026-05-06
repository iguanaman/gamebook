"""
Audition a voice line across multiple narrators.

Usage:
    python audition.py "Your line here" narrator1 narrator2 ...

Output goes to tmp/audition/{narrator}_{slug}.opus for easy comparison.
"""

import re
import sys
from pathlib import Path

import requests

TTS_URL_TURBO = "http://localhost:5500/tts"
TTS_URL_ML    = "http://localhost:5501/tts"
EXAGGERATION  = 2.0

ML_VOICE_PREFIXES = {"japanese_": "ja"}


def ml_language(voice_id):
    for prefix, lang in ML_VOICE_PREFIXES.items():
        if voice_id.startswith(prefix):
            return lang
    return None


def tts_url(voice_id):
    return TTS_URL_ML if ml_language(voice_id) else TTS_URL_TURBO


def normalize_text(text):
    return re.sub(r'\b[A-Z]{2,}\b', lambda m: m.group().lower(), text)


def synthesize(text, voice_id):
    payload = {"text": normalize_text(text), "voice_id": voice_id, "exaggeration": EXAGGERATION}
    lang = ml_language(voice_id)
    if lang:
        payload["language_id"] = lang
    resp = requests.post(tts_url(voice_id), json=payload, timeout=120)
    resp.raise_for_status()
    return resp.content


def slug(voice_id):
    return re.sub(r'[^a-z0-9]+', '_', voice_id.lower()).strip('_')


def main():
    if len(sys.argv) < 3:
        print("Usage: python audition.py \"Your line here\" narrator1 narrator2 ...")
        sys.exit(1)

    text = sys.argv[1]
    voices = sys.argv[2:]

    out_dir = Path("tmp/audition")
    out_dir.mkdir(parents=True, exist_ok=True)

    for voice in voices:
        out_path = out_dir / f"{slug(voice)}.opus"
        print(f"  {voice} → {out_path} ... ", end="", flush=True)
        try:
            audio = synthesize(text, voice)
            out_path.write_bytes(audio)
            print("done")
        except Exception as e:
            print(f"FAILED: {e}")

    print(f"\nFiles in {out_dir}/")


if __name__ == "__main__":
    main()
