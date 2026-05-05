import asyncio
import io
import os
import warnings
from contextlib import asynccontextmanager
from pathlib import Path

# Suppress noisy warnings from dependencies
warnings.filterwarnings("ignore", category=FutureWarning, module="diffusers")
os.environ.setdefault("HF_HUB_DISABLE_PROGRESS_BARS", "1")
os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")

# Skip network check if model is already cached
def _check_model_cached(repo_id: str) -> bool:
    try:
        from huggingface_hub import scan_cache_dir
        cache = scan_cache_dir()
        return any(r.repo_id == repo_id for r in cache.repos)
    except Exception:
        return False

if _check_model_cached("ResembleAI/chatterbox"):
    os.environ.setdefault("HF_HUB_OFFLINE", "1")

import logging
import subprocess
import soundfile as sf
import torch

logging.getLogger("torch.utils.flop_counter").setLevel(logging.ERROR)
from chatterbox.tts import ChatterboxTTS
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel

VOICES_DIR = Path(__file__).parent / "tts_voices"
PORT = 5501
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
_DEFAULT_VOICE = os.environ.get("TTS_DEFAULT_VOICE", "narrator")

_model: ChatterboxTTS | None = None
_lock: asyncio.Lock | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _model, _lock
    print(f"[tts-ml] Loading Chatterbox Multilingual on {DEVICE}...")
    _model = ChatterboxTTS.from_pretrained(DEVICE)
    _lock = asyncio.Lock()
    print("[tts-ml] Model ready.")
    yield
    _model = None


app = FastAPI(lifespan=lifespan)


def _voice_path(voice_id: str) -> Path | None:
    p = VOICES_DIR / f"{voice_id}.wav"
    if p.exists():
        return p
    fallback = VOICES_DIR / f"{_DEFAULT_VOICE}.wav"
    if fallback.exists():
        return fallback
    return None


class TTSRequest(BaseModel):
    text: str
    voice_id: str = _DEFAULT_VOICE
    exaggeration: float = 1.0


@app.post("/tts")
async def synthesize(req: TTSRequest):
    if _model is None:
        raise HTTPException(503, "Model not loaded")

    voice_path = _voice_path(req.voice_id)
    kwargs = {"audio_prompt_path": str(voice_path)} if voice_path else {}

    async with _lock:
        wav = await asyncio.to_thread(_model.generate, req.text, **kwargs)

    wav_buf = io.BytesIO()
    sf.write(wav_buf, wav.squeeze().cpu().numpy(), _model.sr, format="wav")

    proc = subprocess.run(
        ["ffmpeg", "-y", "-f", "wav", "-i", "pipe:0",
         "-c:a", "libopus", "-b:a", "48k", "-f", "opus", "pipe:1"],
        input=wav_buf.getvalue(), capture_output=True, check=True,
    )
    return Response(content=proc.stdout, media_type="audio/ogg; codecs=opus")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
