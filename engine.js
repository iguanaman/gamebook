// Gamebook engine entry point

if (new URLSearchParams(location.search).has('fresh')) {
  Object.keys(localStorage).filter(k => k.startsWith('gamebook.')).forEach(k => localStorage.removeItem(k));
}

const app = document.getElementById('app');

// ── UI hints ─────────────────────────────────────────────────────────────────

const HINT_QUEUE = ['fullscreen', 'back', 'journal', 'undo'];
const HINT_KEY = key => `gamebook.hint_seen.${key}`;
const HINTS_ALWAYS_SHOW = false; // dev flag: show hints repeatedly, revert by setting false

const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

function showSkipHint() {
  const el = document.getElementById('hint-skip');
  if (!el || el.classList.contains('hint-visible')) return;
  el.querySelector('.ui-hint-text').textContent = isTouchDevice()
    ? 'Double-tap to skip'
    : 'Space to skip';
  el.classList.toggle('hint-skip-used', !!localStorage.getItem('gamebook.hint_skip_used'));
  el.classList.add('hint-visible');
}

function hideSkipHint() {
  const el = document.getElementById('hint-skip');
  if (!el || !el.classList.contains('hint-visible')) return;
  el.classList.remove('hint-visible');
  el.classList.add('hint-gone');
  el.addEventListener('animationend', () => el.classList.remove('hint-gone'), { once: true });
}

function isHintSeen(key) { return !HINTS_ALWAYS_SHOW && !!localStorage.getItem(HINT_KEY(key)); }
function markHintSeen(key) { if (!HINTS_ALWAYS_SHOW) localStorage.setItem(HINT_KEY(key), '1'); }

function dismissHint(key) {
  const el = document.getElementById(`hint-${key}`);
  if (!el || !el.classList.contains('hint-visible')) return;
  markHintSeen(key);
  el.classList.remove('hint-visible');
  el.classList.add('hint-gone');
  el.addEventListener('animationend', () => { el.classList.remove('hint-gone'); }, { once: true });
  setTimeout(showNextHint, 450);
}

function isHintTargetReady(key) {
  if (key === 'fullscreen') return true;
  if (key === 'back') return !document.getElementById('back-btn')?.classList.contains('back-hidden');
  if (key === 'journal') return !document.getElementById('journal-toggle')?.classList.contains('journal-hidden');
  if (key === 'undo') return !!document.getElementById('btn-undo') && !document.getElementById('btn-undo').classList.contains('undo-disabled');
  return false;
}

function showNextHint() {
  for (const key of HINT_QUEUE) {
    if (isHintSeen(key)) continue;
    if (!isHintTargetReady(key)) break;
    const el = document.getElementById(`hint-${key}`);
    if (!el) break;
    el.classList.add('hint-visible');
    return;
  }
}

function initFullscreen() {
  const btn = document.getElementById('fullscreen-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) dismissHint('fullscreen');
  });
showNextHint();
}


// ── Manifest / selector ───────────────────────────────────────────────────────

async function fetchYaml(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load: ${url}`);
  return jsyaml.load(await res.text());
}

async function loadManifest() {
  return fetchYaml('stories/manifest.yaml');
}

async function showSelector() {
  sessionStorage.setItem('gamebook.atSelector', '1');
  removeStoryTheme();
  currentStoryId = null;
  state = null;
  document.getElementById('journal-toggle')?.classList.add('journal-hidden');
  document.getElementById('journal-toggle')?.classList.remove('journal-toggle-open');
  document.getElementById('journal-panel')?.classList.add('journal-panel-closed');
  document.getElementById('back-btn')?.classList.add('back-hidden');
  const manifest = await loadManifest();
  app.innerHTML = `
    <div class="selector-bg">
      <div class="selector">
        <h1 class="selector-title">Choose Your Story</h1>
        <div class="story-list">
          ${manifest.stories.length === 0
            ? '<p class="no-stories">No stories available yet.</p>'
            : manifest.stories.map(id => renderStoryCard(id)).join('')}
        </div>
      </div>
    </div>
  `;
  manifest.stories.forEach(id => attachCardHandlers(id));
}

function showIntroSplash(mode, manifest) {
  const isFirst = mode === 'first';
  const introLines = manifest?.intro?.lines ?? [
    'Stories await',
    'Each its own world',
    'Read the scene',
    'Choose your path',
    'There will be consequences',
  ];
  const introNarrator = manifest?.intro?.narrator ?? null;

  document.body.classList.add('splash-active');
  const overlay = document.createElement('div');
  overlay.className = 'story-splash story-splash-hidden';

  const body = document.createElement('div');
  body.className = 'intro-splash-body';

  const parsedLines = introLines.map(l =>
    typeof l === 'string' ? { text: l, voice: introNarrator } : { text: Object.values(l)[0], voice: Object.keys(l)[0] }
  );

  const paras = parsedLines.map(() => {
    const p = document.createElement('p');
    p.className = 'intro-line intro-line-visible';
    body.appendChild(p);
    return p;
  });

  const btn = document.createElement('button');
  btn.className = 'intro-splash-btn intro-line';
  btn.textContent = isFirst ? 'Begin →' : 'Close ✕';
  body.appendChild(btn);
  overlay.appendChild(body);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.remove('story-splash-hidden');
    overlay.classList.add('story-splash-visible');
  });

  async function dismiss() {
    document.body.classList.remove('splash-active');
    stopAudio();
    overlay.classList.remove('story-splash-visible');
    overlay.classList.add('story-splash-out-slow');
    if (isFirst) {
      localStorage.setItem('gamebook.seen_intro', '1');
      await showSelector();
    }
    overlay.addEventListener('transitionend', () => {
      overlay.remove();
      if (isFirst) {
        document.querySelectorAll('.story-card-wrap').forEach((wrap, idx) => {
          wrap.style.setProperty('--card-pop-delay', `${idx * 120}ms`);
          wrap.classList.add('card-pop-in');
        });
      }
    }, { once: true });
  }

  btn.addEventListener('click', dismiss);

  const LINE_PAUSE_MS = 1000;
  const INITIAL_DELAY_MS = 600;

  function revealLines() {
    let i = 0;
    function showNext() {
      if (i >= paras.length) {
        btn.classList.add('intro-line-visible');
        return;
      }
      const el = paras[i];
      const { text, voice } = parsedLines[i];
      i++;

      // type the line character by character
      const startTime = performance.now();
      let pos = 0;
      let typingDone = false;
      let audioDone = !voice;

      function afterBoth() {
        if (typingDone && audioDone) setTimeout(showNext, LINE_PAUSE_MS);
      }

      function tick() {
        if (document.hidden) { document.addEventListener('visibilitychange', onVisible, { once: true }); return; }
        const targetChars = Math.floor((performance.now() - startTime) / TYPING_MS_PER_CHAR);
        while (pos < text.length && pos < targetChars) { pos++; }
        el.textContent = text.slice(0, pos);
        if (pos >= text.length) { typingDone = true; afterBoth(); return; }
        requestAnimationFrame(tick);
      }
      function onVisible() { requestAnimationFrame(tick); }
      requestAnimationFrame(tick);

      if (voice) {
        const url = `stories/audio/intro_line_${i - 1}.opus`;
        currentAudio = new Audio(url);
        let settled = false;
        function afterAudio() {
          if (settled) return;
          settled = true;
          currentAudio = null;
          audioDone = true;
          afterBoth();
        }
        currentAudio.addEventListener('ended', afterAudio, { once: true });
        currentAudio.addEventListener('error', afterAudio, { once: true });
        currentAudio.play().catch(afterAudio);
      }
    }
    showNext();
  }

  setTimeout(revealLines, INITIAL_DELAY_MS);
}

function hasSave(storyId) {
  return !!localStorage.getItem(`gamebook.state.${storyId}`);
}

async function loadStoryMeta(storyId) {
  return fetchYaml(`stories/${storyId}/story.yaml`);
}

function renderStoryCard(storyId) {
  const saved = hasSave(storyId);
  return `
    <div class="story-card-wrap">
      <div class="story-card" data-story="${storyId}" role="button" tabindex="0">
<div class="story-info">
          <span class="story-genre" data-story-genre="${storyId}"></span>
          <h2 class="story-title"><span class="story-prefix" data-story-prefix="${storyId}"></span><span data-story-title="${storyId}">Loading...</span></h2>
          <p class="story-desc" data-story-desc="${storyId}"></p>
        </div>
      </div>
      ${saved ? `<button class="card-delete-btn" data-delete="${storyId}" aria-label="Wipe save">🗑</button>` : ''}
    </div>
  `;
}

async function applyCardTheme(storyId) {
  try {
    const res = await fetch(`stories/${storyId}/theme.css`);
    if (!res.ok) return;
    const css = await res.text();

    // Inject @import rules for fonts (deduplicated by href)
    const imports = [...css.matchAll(/@import\s+url\(['"]?([^'")\s]+)['"]?\)[^;]*;/g)];
    imports.forEach(([rule, url]) => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
      }
    });

    // Inject @font-face blocks (deduplicated by family name)
    const fontFaces = [...css.matchAll(/@font-face\s*\{[^}]+\}/g)];
    fontFaces.forEach(([block]) => {
      const familyMatch = block.match(/font-family\s*:\s*['"]?([^'";]+)['"]?/);
      if (familyMatch && !document.querySelector(`style[data-font-family="${familyMatch[1].trim()}"]`)) {
        const style = document.createElement('style');
        style.setAttribute('data-font-family', familyMatch[1].trim());
        style.textContent = block;
        document.head.appendChild(style);
      }
    });

    // Extract CSS custom properties from the :root block
    const rootMatch = css.match(/:root\s*\{([^}]+)\}/s);
    if (!rootMatch) return;
    const vars = [...rootMatch[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)];
    if (!vars.length) return;

    const card = document.querySelector(`.story-card[data-story="${storyId}"]`);
    if (!card) return;
    vars.forEach(([, name, value]) => card.style.setProperty(name, value.trim()));
    card.style.color = 'var(--text)';
    card.style.fontFamily = 'var(--font-body)';
    card.style.background = 'var(--surface)';
    card.style.outline = 'none';
    card.style.border = '3px solid var(--border-outer)';
    card.style.boxShadow = 'inset 0 0 0 2px var(--border-inner), inset 0 0 0 10px var(--bg), 0 0 0 2px var(--border-outer)';
    card.style.borderRadius = 'var(--border-corner-radius)';
    card.style.padding = 'calc(1.5rem + 10px)';
    const titleEl = card.querySelector('.story-title');
    if (titleEl) titleEl.style.fontFamily = 'var(--font-heading)';
  } catch (e) { /* theme.css missing — skip */ }
}

function animateCardSelect(storyId) {
  const others = document.querySelectorAll(`.story-card:not([data-story="${storyId}"])`);
  others.forEach(c => c.classList.add('card-fade-out'));
  setTimeout(() => {
    const cover = document.createElement('div');
    cover.className = 'screen-fade-cover';
    document.body.appendChild(cover);
    requestAnimationFrame(() => cover.classList.add('screen-fade-cover-in'));
    setTimeout(() => {
      startStory(storyId);
      cover.classList.remove('screen-fade-cover-in');
      cover.addEventListener('transitionend', () => cover.remove(), { once: true });
    }, 600);
  }, 500);
}

async function attachCardHandlers(storyId) {
  try {
    const meta = await loadStoryMeta(storyId);
    const titleEl = document.querySelector(`[data-story-title="${storyId}"]`);
    const prefixEl = document.querySelector(`[data-story-prefix="${storyId}"]`);
    const descEl = document.querySelector(`[data-story-desc="${storyId}"]`);
    const genreEl = document.querySelector(`[data-story-genre="${storyId}"]`);
    if (titleEl) titleEl.textContent = meta.title;
    if (prefixEl && meta.prefix) prefixEl.textContent = meta.prefix + ' — ';
    if (descEl) descEl.textContent = meta.description;
    if (genreEl && meta.genre) genreEl.textContent = meta.genre;
  } catch (e) { /* story.yaml missing — skip */ }

  applyCardTheme(storyId);

  const card = document.querySelector(`.story-card[data-story="${storyId}"]`);
  if (card) {
    const launch = () => animateCardSelect(storyId);
    card.addEventListener('click', launch);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') launch(); });

    const delBtn = document.querySelector(`[data-delete="${storyId}"]`);
    if (delBtn) {
      delBtn.addEventListener('click', e => {
        e.stopPropagation();
        showConfirm('Wipe saved progress?', () => {
          localStorage.removeItem(stateKey(storyId));
          delBtn.remove();
        });
        return;
      });
    }
  }
}

// ── State ─────────────────────────────────────────────────────────────────────

let currentStoryId = null;
let currentAct = null;
let currentActFolder = null;
let storyMeta = null;
let state = null;

function stateKey(storyId) {
  return `gamebook.state.${storyId}`;
}

function resumeKey(storyId) {
  return `gamebook.resume.${storyId}`;
}

function saveResume(sceneId, blockIndex) {
  localStorage.setItem(resumeKey(currentStoryId), JSON.stringify({ scene: sceneId, blockIndex }));
}

function clearResume() {
  localStorage.removeItem(resumeKey(currentStoryId));
}

function loadResume(storyId) {
  const raw = localStorage.getItem(resumeKey(storyId));
  return raw ? JSON.parse(raw) : null;
}

function initState(storyId, startingStats) {
  currentStoryId = storyId;
  currentAct = null;
  currentActFolder = null;
  state = { scene: null, stats: { ...startingStats }, flags: {}, visited: [], history: [], blockHashes: {}, journal: [], journalSeen: 0 };
}

function saveState() {
  localStorage.setItem(stateKey(currentStoryId), JSON.stringify({ ...state, act: currentAct, actFolder: currentActFolder }));
}

function loadState(storyId) {
  const raw = localStorage.getItem(stateKey(storyId));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function pushHistory() {
  state.history.push({
    scene: state.scene,
    stats: { ...state.stats },
    flags: { ...state.flags },
    visited: [...state.visited],
    journal: [...(state.journal ?? [])],
    journalSeen: state.journalSeen ?? 0,
    act: currentAct,
    actFolder: currentActFolder
  });
}

function undo() {
  if (state.history.length === 0) return false;
  const prev = state.history.pop();
  state.scene = prev.scene;
  state.stats = prev.stats;
  state.flags = prev.flags;
  state.visited = prev.visited ?? [];
  state.journal = prev.journal ?? [];
  state.journalSeen = prev.journalSeen ?? 0;
  currentAct = prev.act ?? null;
  currentActFolder = prev.actFolder ?? null;
  saveState();
  return true;
}

function setFlag(key, value = true) {
  state.flags[key] = value;
}

function applyEffects(effects) {
  if (!effects) return;
  if (effects.stats) {
    for (const [k, delta] of Object.entries(effects.stats)) {
      state.stats[k] = (state.stats[k] ?? 0) + delta;
    }
  }
  if (effects.flags) {
    for (const [k, v] of Object.entries(effects.flags)) {
      state.flags[k] = v;
    }
  }
}

function meetsRequirements(requires) {
  if (!requires) return true;
  if (requires.flags) {
    for (const flag of requires.flags) {
      if (!state.flags[flag]) return false;
    }
  }
  if (requires.flags_unset) {
    for (const flag of requires.flags_unset) {
      if (state.flags[flag]) return false;
    }
  }
  if (requires.stats) {
    for (const [k, min] of Object.entries(requires.stats)) {
      if ((state.stats[k] ?? 0) < min) return false;
    }
  }
  return true;
}


function resolveBlock(block, sceneId) {
  // Plain string — no condition
  if (typeof block === 'string') return { content: block, isSpeech: false, branch: '' };

  // Conditional block: has an 'if' key
  if ('if' in block) {
    const cond = block.if;
    const pass = cond === 'visited'
      ? state.visited.includes(sceneId)
      : meetsRequirements(cond);

    if (!pass) {
      if (block.else === undefined) return null;
      return { content: block.else, isSpeech: false, branch: 'b0' };
    }

    if (block.text !== undefined) return { content: block.text, isSpeech: false, branch: 'a0' };
    const voiceKey = Object.keys(block).find(k => k !== 'if' && k !== 'else' && k !== 'text');
    if (voiceKey) return { content: block[voiceKey], isSpeech: true, branch: 'a0' };
    return null;
  }

  // Voice-tagged block (no condition): e.g. {male1: "..."}
  const key = Object.keys(block)[0];
  return { content: block[key], isSpeech: true, branch: '' };
}

function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33 ^ str.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

// ── Audio ─────────────────────────────────────────────────────────────────────

const ACT_TITLE_PAUSE_MS = 2000;
let currentAudio = null;
let playbackSession = 0;

function playChoiceCue() {
  const ac = new (window.AudioContext || window.webkitAudioContext)();
  const bufLen = Math.floor(ac.sampleRate * 0.008);
  const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 1.5);
  const src = ac.createBufferSource(); src.buffer = buf;
  const filter = ac.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 1800; filter.Q.value = 1.2;
  const gain = ac.createGain();
  src.connect(filter); filter.connect(gain); gain.connect(ac.destination);
  gain.gain.setValueAtTime(0.275, ac.currentTime);
  src.start();
}

function stopAudio() {
  if (currentAudio) {
    const audio = currentAudio;
    currentAudio = null;
    audio.pause();
    audio.src = '';
    audio.load();
  }
}

document.addEventListener('visibilitychange', () => {
  if (!currentAudio) return;
  if (document.hidden) {
    currentAudio.pause();
  } else {
    currentAudio.play().catch(() => {});
  }
});

function cancelPlayback() {
  playbackSession++;
  stopAudio();
}

function blockAudioUrl(sceneId, rawIndex, branch) {
  const safe = sceneId.replace(/\//g, '-');
  const slash = sceneId.indexOf('/');
  const act = slash === -1 ? '' : sceneId.slice(0, slash);
  const scene = slash === -1 ? sceneId : sceneId.slice(slash + 1);
  return `stories/${currentStoryId}/audio/${act}/${scene}/${safe}_block_${rawIndex}${branch}.opus`;
}

function sceneFolder(sceneId) {
  const i = sceneId.indexOf('/');
  return i === -1 ? '' : sceneId.slice(0, i);
}

function actAudioSlug(actText) {
  return actText.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}


function splitActTitle(title) {
  const sep = ' — ';
  const idx = title.indexOf(sep);
  if (idx === -1) return { label: null, subtitle: title };
  return { label: title.slice(0, idx), subtitle: title.slice(idx + sep.length) };
}

function showTitleSplash(text, audioUrl, onDone, { label = null, isStoryTitle = false } = {}) {
  app.innerHTML = '';
  document.body.classList.add('splash-active');

  const splash = document.createElement('div');
  splash.className = 'story-splash story-splash-hidden';

  if (label) {
    const lbl = document.createElement('p');
    lbl.className = 'story-splash-label';
    lbl.textContent = label;
    splash.appendChild(lbl);
  }

  const h1 = document.createElement('h1');
  h1.className = isStoryTitle ? 'story-splash-title story-splash-title--story' : 'story-splash-title';
  h1.textContent = text;
  splash.appendChild(h1);

  document.body.appendChild(splash);

  const animDuration = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--anim-act-title-duration')
  ) || 600;

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    document.body.classList.remove('splash-active');
    stopAudio();
    splash.classList.remove('story-splash-visible');
    splash.classList.add('story-splash-out');
    setTimeout(() => {
      splash.remove();
      onDone();
    }, animDuration);
  }

  splash.addEventListener('click', dismiss, { once: true });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      splash.classList.remove('story-splash-hidden');
      splash.classList.add('story-splash-visible');
    });
  });

  setTimeout(() => {
    currentAudio = new Audio(audioUrl);
    let settled = false;
    function settle() {
      if (settled) return;
      settled = true;
      setTimeout(dismiss, ACT_TITLE_PAUSE_MS);
    }
    currentAudio.addEventListener('ended', settle, { once: true });
    currentAudio.addEventListener('error', settle, { once: true });
    currentAudio.play().catch(settle);
  }, animDuration);
}

function playBlocks(sceneId, blocks, onBlockStart, onDone) {
  const session = playbackSession;
  let index = 0;
  let done = false;
  const blockCount = blocks.length;

  const gameWrap = document.querySelector('.game-wrap');

  function cancelled() { return session !== playbackSession; }

  function onSkip() {
    localStorage.setItem('gamebook.hint_skip_used', '1');
    hideSkipHint();
    stopAudio();
    playNext();
  }

  function onKeySkip(e) {
    if (e.key === ' ') { e.preventDefault(); onSkip(); }
  }

  function removeClickSkip() {
    gameWrap?.removeEventListener('dblclick', onSkip);
    document.removeEventListener('keydown', onKeySkip);
  }

  gameWrap?.addEventListener('dblclick', onSkip);
  document.addEventListener('keydown', onKeySkip);
  showSkipHint();

  function finish() {
    if (done) return;
    done = true;
    hideSkipHint();
    removeClickSkip();
    if (!cancelled()) onDone();
  }

  function playNext() {
    if (done || cancelled()) { finish(); return; }
    stopAudio();
    if (index >= blockCount) { finish(); return; }
    const i = index++;
    const block = blocks[i];
    onBlockStart(block);
    currentAudio = new Audio(blockAudioUrl(sceneId, block.rawIndex, block.branch));
    currentAudio.addEventListener('ended', () => { if (!done && !cancelled()) playNext(); }, { once: true });
    currentAudio.play().catch(() => {
      if (done || cancelled()) { finish(); return; }
      for (let j = i; j < blockCount; j++) onBlockStart(blocks[j]);
      finish();
    });
  }

  playNext();
}

// ── Game shell ────────────────────────────────────────────────────────────────

function applyStoryTheme(storyId) {
  document.getElementById('frame').classList.remove('frame-neutral');
  document.getElementById('story-theme')?.remove();
  const link = document.createElement('link');
  link.id = 'story-theme';
  link.rel = 'stylesheet';
  link.href = `stories/${storyId}/theme.css`;
  document.head.appendChild(link);
}

function removeStoryTheme() {
  document.getElementById('story-theme')?.remove();
}

async function startStory(storyId) {
  sessionStorage.removeItem('gamebook.atSelector');
  localStorage.setItem('gamebook.lastStory', storyId);
  const meta = await loadStoryMeta(storyId);
  currentStoryId = storyId;
  storyMeta = meta;
  if (!storyMeta.flags) storyMeta.flags = {};
  applyStoryTheme(storyId);

  const _rawSaved = loadState(storyId);
  if (_rawSaved && !_rawSaved.scene) {
    localStorage.removeItem(stateKey(storyId));
  }
  const saved = _rawSaved?.scene ? _rawSaved : null;
  if (saved) {
    state = saved;
    if (!Array.isArray(state.visited)) state.visited = [];
    if (!state.blockHashes) state.blockHashes = {};
    if (!Array.isArray(state.journal)) state.journal = [];
    if (typeof state.journalSeen !== 'number') state.journalSeen = state.journal.length;
    currentAct = saved.act ?? null;
    currentActFolder = saved.actFolder ?? (state.scene ? sceneFolder(state.scene) : '');
  } else {
    initState(storyId, meta.stats ?? {});
    if (meta.journal) {
      state.journal.push({ scene: '__story', text: meta.journal });
    }
  }

  const startScene = saved ? state.scene : meta.start;

  if (!saved) {
    const splashStoryId = currentStoryId;
    showTitleSplash(meta.title, `stories/${currentStoryId}/audio/story_title.opus`, async () => {
      if (currentStoryId !== splashStoryId || !state) return;
      renderShell(meta);
      await navigateTo(startScene);
    }, { isStoryTitle: true });
  } else {
    renderShell(meta);
    await navigateTo(startScene);
    scrollNarrativeToBottom();
  }
}

function renderShell(meta) {
  app.innerHTML = `
    <div class="hud-wrap">
    </div>
    <div class="game-wrap">
      <div class="narrative-area">
        <div class="narrative at-bottom" id="narrative"></div>
        <hr class="choices-divider choices-hidden" id="choices-divider">
        <div class="choices-footer" id="choices-footer"></div>
      </div>
    </div>
    <button class="btn-undo-fixed undo-disabled" id="btn-undo">↩</button>
  `;
  const narrative = document.getElementById('narrative');
  if (narrative) {
    const updateAtBottom = () => {
      const atBottom = narrative.scrollTop + narrative.clientHeight >= narrative.scrollHeight - 2;
      narrative.classList.toggle('at-bottom', atBottom);
    };
    narrative.addEventListener('scroll', updateAtBottom, { passive: true });
  }
  document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
}

async function loadScene(storyId, sceneId) {
  return fetchYaml(`stories/${storyId}/scenes/${sceneId}.yaml`);
}


async function navigateTo(sceneId) {
  cancelPlayback();
  if (state.scene && !state.visited.includes(state.scene)) {
    state.visited.push(state.scene);
  }
  state.scene = sceneId;
  saveState();

  const scene = await loadScene(currentStoryId, sceneId);
  recordJournal(scene, sceneId);
  updateUndoButton();
  renderJournal();

  const alreadyVisited = state.visited.includes(sceneId);

  const folder = sceneFolder(sceneId);
  const folderChanged = folder !== '' && folder !== currentActFolder;
  let showingActTitle = false;

  if (folderChanged) currentActFolder = folder;

  if (!alreadyVisited && folderChanged) {
    let actTitle = null;
    try {
      const actMeta = await fetchYaml(`stories/${currentStoryId}/scenes/${folder}/_act.yaml`);
      actTitle = actMeta?.title ?? null;
      if (actMeta?.journal) {
        const key = `__act:${folder}`;
        if (!state.journal.some(e => e.scene === key)) {
          state.journal.push({ scene: key, text: actMeta.journal });
        }
      }
    } catch { /* no _act.yaml — no act title */ }
    // fallback: honour inline act: if _act.yaml wasn't found
    if (!actTitle && scene.act && scene.act !== currentAct) actTitle = scene.act;

    if (actTitle) {
      showingActTitle = true;
      currentAct = actTitle;
      saveState();
      const actAudioUrl = `stories/${currentStoryId}/audio/${folder}/${actAudioSlug(actTitle)}.opus`;
      const { label: actLabel, subtitle: actSubtitle } = splitActTitle(actTitle);
      showTitleSplash(actSubtitle, actAudioUrl, () => {
        renderShell(storyMeta);
        clearNarrative();
        const blocks = resolveSceneBlocks(scene);
        state.blockHashes[sceneId] = blocks.map(b => b.hash);
        saveState();
        typeBlocks(blocks, () => renderChoices(scene), sceneId);
      }, { label: actLabel });
    }
  } else if (!alreadyVisited && scene.act && scene.act !== currentAct) {
    showingActTitle = true;
    currentAct = scene.act;
    saveState();
    const actAudioUrl = `stories/${currentStoryId}/audio/${actAudioSlug(scene.act)}.opus`;
    const { label: actLabel2, subtitle: actSubtitle2 } = splitActTitle(scene.act);
    showTitleSplash(actSubtitle2, actAudioUrl, () => {
      renderShell(storyMeta);
      clearNarrative();
      const blocks = resolveSceneBlocks(scene);
      state.blockHashes[sceneId] = blocks.map(b => b.hash);
      saveState();
      renderHud();
      typeBlocks(blocks, () => renderChoices(scene), sceneId);
    }, { label: actLabel2 });
  }

  if (!showingActTitle) {
    clearNarrative();
    const blocks = resolveSceneBlocks(scene);
    const blockHashes = blocks.map(b => b.hash);

    if (alreadyVisited) {
      const resume = loadResume(currentStoryId);
      const resumeIndex = (resume && resume.scene === sceneId) ? resume.blockIndex : null;

      if (resumeIndex !== null) {
        blocks.slice(0, resumeIndex).forEach(b => showBlockInstant(b));
        state.blockHashes[sceneId] = blockHashes;
        saveState();
        typeBlocks(blocks.slice(resumeIndex), () => renderChoices(scene), sceneId, resumeIndex);
      } else {
        const seenHashes = new Set(state.blockHashes[sceneId] ?? []);
        const newIndices = new Set();
        blocks.forEach((b, i) => { if (!seenHashes.has(b.hash)) newIndices.add(i); });

        if (newIndices.size === 0) {
          blocks.forEach(b => showBlockInstant(b));
          renderChoices(scene);
        } else {
          let i = 0;
          function step() {
            if (i >= blocks.length) {
              state.blockHashes[sceneId] = [...new Set([...seenHashes, ...blockHashes])];
              saveState();
              renderChoices(scene);
              return;
            }
            const block = blocks[i++];
            if (!newIndices.has(i - 1)) {
              showBlockInstant(block);
              step();
            } else {
              playBlocks(sceneId, [block], (b) => showBlockReveal(b), step);
            }
          }
          step();
        }
      }
    } else {
      state.blockHashes[sceneId] = blockHashes;
      saveState();
      typeBlocks(blocks, () => renderChoices(scene), sceneId);
    }
  }
}

function resolveSceneBlocks(scene) {
  const el = document.getElementById('narrative');
  const isFirstScene = el && el.querySelector('p') === null;
  const rawBlocks = Array.isArray(scene.text) ? scene.text : [scene.text];

  const blocks = [];

  function pushResolved(resolved, rawIndex, branchPrefix) {
    if (Array.isArray(resolved.content)) {
      let subI = 0;
      resolved.content.forEach(sub => {
        const subResolved = resolveBlock(sub, scene.id);
        if (!subResolved) return;
        pushResolved(subResolved, rawIndex, `${branchPrefix}${subI++}`);
      });
    } else {
      const branch = branchPrefix;
      blocks.push({
        ...resolved,
        branch,
        rawIndex,
        isOpener: blocks.length === 0 && isFirstScene,
        hash: hashString(resolved.content),
      });
    }
  }

  rawBlocks.forEach((b, rawIndex) => {
    const resolved = resolveBlock(b, scene.id);
    if (!resolved) return;
    pushResolved(resolved, rawIndex, resolved.branch);
  });
  return blocks;
}

// Paralinguistic tags like [sigh], [chuckle] — sent to TTS, hidden from viewer.
// Strip the tag and any surrounding whitespace it leaves behind.
const PARALINGUISTIC_TAGS = ['clear throat', 'sigh', 'shush', 'cough', 'groan', 'sniff', 'gasp', 'chuckle', 'laugh'];
const PARALINGUISTIC_RE = new RegExp(`\\s*\\[(?:${PARALINGUISTIC_TAGS.join('|')})\\]\\s*`, 'gi');
function stripParalinguisticTags(text) {
  return text
    .replace(PARALINGUISTIC_RE, ' ')
    .replace(/ +([,.!?;:])/g, '$1')
    .replace(/ {2,}/g, ' ')
    .replace(/(^|\n) +/g, '$1')
    .replace(/ +(\n|$)/g, '$1')
    .trim();
}

function buildBlockPara(block) {
  const { content, isSpeech, branch, rawIndex, isOpener, hash } = block;
  const html = stripParalinguisticTags(content).replace(/\n\n/g, '</p><p>');
  const p = document.createElement('p');
  p.dataset.rawIndex = rawIndex;
  p.dataset.audioBranch = branch;
  p.dataset.contentHash = hash;
  if (isOpener) p.classList.add('scene-opener');
  if (isSpeech) {
    p.classList.add('speech-block');
    p.innerHTML = `"${html}"`;
  } else {
    p.innerHTML = html;
  }
  return p;
}

function clearNarrative() {
  const el = document.getElementById('narrative');
  if (el) el.innerHTML = '';
  const footer = document.getElementById('choices-footer');
  if (footer) footer.innerHTML = '';
  const divider = document.getElementById('choices-divider');
  if (divider) divider.classList.add('choices-hidden');
}

function scrollNarrativeToBottom() {
  const el = document.getElementById('narrative');
  if (el) el.scrollTop = el.scrollHeight;
}

function appendBlockPara(block) {
  const el = document.getElementById('narrative');
  if (!el) return null;
  const p = buildBlockPara(block);
  el.appendChild(p);
  scrollNarrativeToBottom();
  return p;
}

function showBlockInstant(block) {
  const p = appendBlockPara(block);
  if (p) p.classList.add('block-visible');
  return p;
}

function appendChosenChoice(text) {
  const el = document.getElementById('narrative');
  if (!el) return;
  const p = document.createElement('p');
  p.className = 'chosen-choice';
  p.textContent = text;
  el.appendChild(p);
  scrollNarrativeToBottom();
  requestAnimationFrame(() => p.classList.add('block-visible'));
}

function showBlockReveal(block) {
  const p = appendBlockPara(block);
  if (p) requestAnimationFrame(() => p.classList.add('block-visible'));
  return p;
}

// Typewriter speed: milliseconds per character. Higher = slower.
const TYPING_MS_PER_CHAR = 64;

function typeBlock(block, skip, onDone) {
  const para = appendBlockPara(block);
  if (!para) { onDone(); return () => {}; }

  const fullHtml = para.innerHTML;
  para.dataset.fullHtml = fullHtml;
  para.innerHTML = '';
  para.classList.add('block-typing');

  let pos = 0;
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    document.removeEventListener('visibilitychange', handleVisibility);
    skip.finished = true;
    para.innerHTML = fullHtml;
    para.classList.remove('block-typing');
    para.classList.add('block-visible');
    scrollNarrativeToBottom();
    onDone();
  }

  let startTime = performance.now();
  let charsShown = 0;
  let pausedAt = null;

  function handleVisibility() {
    if (document.hidden) {
      pausedAt = performance.now();
    } else if (pausedAt !== null) {
      // Shift startTime forward by the duration we were hidden,
      // so targetChars doesn't jump ahead.
      startTime += performance.now() - pausedAt;
      pausedAt = null;
      if (!finished) requestAnimationFrame(tick);
    }
  }
  document.addEventListener('visibilitychange', handleVisibility);

  function tick() {
    if (finished) return;
    if (document.hidden) return; // wait for visibilitychange to re-enter
    if (skip.active) { skip.active = false; finish(); return; }
    if (pos >= fullHtml.length) { finish(); return; }

    // HTML tags and entities emit atomically without consuming time
    if (fullHtml[pos] === '<') {
      const end = fullHtml.indexOf('>', pos);
      if (end !== -1) { pos = end + 1; tick(); return; }
    }
    if (fullHtml[pos] === '&') {
      const end = fullHtml.indexOf(';', pos);
      if (end !== -1) { pos = end + 1; charsShown++; para.innerHTML = fullHtml.slice(0, pos); requestAnimationFrame(tick); return; }
    }

    // Reveal up to the number of chars that should be visible by now
    const targetChars = Math.floor((performance.now() - startTime) / TYPING_MS_PER_CHAR);
    if (charsShown >= targetChars) { requestAnimationFrame(tick); return; }

    pos++;
    charsShown++;
    para.innerHTML = fullHtml.slice(0, pos);
    requestAnimationFrame(tick);
  }

  tick();
  return finish;
}

function typeBlocks(blocks, onDone, sceneId, indexOffset = 0) {
  const session = playbackSession;
  let index = 0;
  let done = false;
  const skip = { active: false };
  const blockCount = blocks.length;

  const gameWrap = document.querySelector('.game-wrap');

  function cancelled() { return session !== playbackSession; }

  function onSkip() {
    localStorage.setItem('gamebook.hint_skip_used', '1');
    hideSkipHint();
    skip.active = true;
    stopAudio();
    if (skip.finished) next();
  }

  function onKeySkip(e) {
    if (e.key === ' ') { e.preventDefault(); onSkip(); }
  }

  function removeClickSkip() {
    gameWrap?.removeEventListener('dblclick', onSkip);
    document.removeEventListener('keydown', onKeySkip);
  }

  gameWrap?.addEventListener('dblclick', onSkip);
  document.addEventListener('keydown', onKeySkip);
  showSkipHint();

  function finish() {
    if (done) return;
    done = true;
    hideSkipHint();
    removeClickSkip();
    if (!cancelled()) onDone();
  }

  function next() {
    if (done || cancelled()) { finish(); return; }
    if (index >= blockCount) { finish(); return; }
    const block = blocks[index++];
    if (sceneId) saveResume(sceneId, indexOffset + index - 1);
    skip.finished = false;
    const finishTyping = typeBlock(block, skip, () => { if (!done && !cancelled() && (!sceneId || !currentAudio)) next(); });
    if (sceneId) {
      stopAudio();
      const audio = new Audio(blockAudioUrl(sceneId, block.rawIndex, block.branch));
      currentAudio = audio;
      audio.addEventListener('ended', () => { if (!done && !cancelled() && audio === currentAudio) { finishTyping(); next(); } }, { once: true });
      audio.play().catch(() => { if (!done && !cancelled() && audio === currentAudio) { currentAudio = null; } });
    }
  }

  next();
}

function renderChoices(scene) {
  clearResume();
  const el = document.getElementById('choices-footer');
  if (!el) return;

  const divider = document.getElementById('choices-divider');

  const allChoices = scene.choices ?? [];
  const passing = allChoices.filter(c => meetsRequirements(c.requires));

  if (passing.length === 0) {
    if (divider) divider.classList.remove('choices-hidden');
    el.innerHTML = `
      <p class="end-message">— The End —</p>
      <button class="btn btn-secondary" id="btn-restart">↺ Restart</button>
      <button class="btn btn-secondary" id="btn-selector">Back to Stories</button>
    `;
    document.getElementById('btn-restart')?.addEventListener('click', () => { localStorage.removeItem(stateKey(currentStoryId)); startStory(currentStoryId); });
    document.getElementById('btn-selector')?.addEventListener('click', () => showSelector());
    return;
  }

  const passingHtml = passing.map((c, i) =>
    `<button class="btn-choice" data-index="${i}"><span class="choice-num">${i + 1}</span>${c.text}</button>`
  ).join('');

  el.innerHTML = `
    <div class="choice-list">
      ${passingHtml}
    </div>
  `;
  updateUndoButton();

  const choiceList = el.querySelector('.choice-list');
  if (choiceList) {
    requestAnimationFrame(() => {
      if (divider) { divider.style.opacity = ''; divider.style.transition = ''; divider.classList.remove('choices-hidden'); }
      requestAnimationFrame(() => choiceList.classList.add('choices-visible'));
    });
  }

  passing.forEach((choice, i) => {
    el.querySelector(`[data-index="${i}"]`).addEventListener('click', (e) => {
      playChoiceCue();
      const chosenBtn = e.currentTarget;
      const allBtns = el.querySelectorAll('.btn-choice');
      allBtns.forEach(b => { b.disabled = true; });
      chosenBtn.classList.add('btn-choice-selected');

      const root = getComputedStyle(document.documentElement);
      const fastMs = parseFloat(root.getPropertyValue('--anim-choice-fade-fast')) || 250;
      const lingerMs = parseFloat(root.getPropertyValue('--anim-choice-linger-ms')) || 1200;
      const slowMs = parseFloat(root.getPropertyValue('--anim-choice-fade-slow')) || 500;

      const divider = document.getElementById('choices-divider');
      if (divider) {
        divider.style.transition = `opacity ${fastMs}ms ease`;
        divider.style.opacity = '0';
      }

      allBtns.forEach(btn => {
        if (btn === chosenBtn) return;
        btn.style.transition = `opacity ${fastMs}ms ease`;
        btn.style.opacity = '0';
      });

      setTimeout(() => {
        chosenBtn.style.opacity = '0';
        setTimeout(() => {
          appendChosenChoice(choice.text);
          handleChoice(choice);
        }, slowMs);
      }, fastMs + lingerMs);
    });
  });
}

function resolveNext(next) {
  if (typeof next === 'string') return next;
  // weighted random: [{scene, weight}, ...] — weight defaults to 1
  const total = next.reduce((sum, e) => sum + (e.weight ?? 1), 0);
  let roll = Math.random() * total;
  for (const entry of next) {
    roll -= (entry.weight ?? 1);
    if (roll <= 0) return entry.scene;
  }
  return next[next.length - 1].scene;
}

async function handleChoice(choice) {
  pushHistory();
  applyEffects(choice.effects);
  saveState();
  await navigateTo(resolveNext(choice.next));
}

function updateUndoButton() {
  const btn = document.getElementById('btn-undo');
  if (!btn) return;
  const empty = !state || state.history.length === 0;
  btn.classList.toggle('undo-disabled', empty);
  if (!empty) showNextHint();
}

function showConfirm(message, onYes) {
  const overlay = document.createElement('div');
  overlay.className = 'undo-confirm-overlay';
  overlay.innerHTML = `
    <div class="undo-confirm">
      <p class="undo-confirm-msg">${message}</p>
      <div class="exit-confirm-buttons">
        <button class="btn btn-secondary" data-yes>Yes <kbd>Y</kbd></button>
        <button class="btn btn-ghost" data-no>No <kbd>N</kbd></button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const cleanup = () => { overlay.remove(); document.removeEventListener('keydown', onKey); };

  const onKey = e => {
    if (e.key === 'y' || e.key === 'Y') { cleanup(); onYes(); }
    else if (e.key === 'n' || e.key === 'N' || e.key === 'Escape') cleanup();
  };

  overlay.querySelector('[data-yes]').addEventListener('click', () => { cleanup(); onYes(); });
  overlay.querySelector('[data-no]').addEventListener('click', cleanup);
  overlay.addEventListener('click', e => { if (e.target === overlay) cleanup(); });
  document.addEventListener('keydown', onKey);
}

function showUndoConfirm() {
  showConfirm('Undo last choice?', async () => {
    const ok = undo();
    if (!ok) return;
    await navigateTo(state.scene);
    scrollNarrativeToBottom();
  });
}

async function handleUndo() {
  dismissHint('undo');
  showUndoConfirm();
}

// ── Journal ───────────────────────────────────────────────────────────────────

function recordJournal(scene, sceneId) {
  if (!scene.journal) return;
  if (!Array.isArray(state.journal)) state.journal = [];
  if (state.journal.some(e => e.scene === sceneId)) return;
  state.journal.push({ scene: sceneId, text: scene.journal });
  saveState();
}

function renderJournal() {
  const toggle = document.getElementById('journal-toggle');
  const panel = document.getElementById('journal-panel');
  const entriesEl = document.getElementById('journal-entries');
  if (!toggle || !panel || !entriesEl) return;

  const entries = state?.journal ?? [];
  if (currentStoryId) {
    toggle.classList.remove('journal-hidden');
    document.getElementById('back-btn')?.classList.remove('back-hidden');
    showNextHint();
  }

  const sceneEntries = entries.filter(e => !e.scene.startsWith('__'));
  entriesEl.innerHTML = sceneEntries.length === 0
    ? '<p class="journal-empty">Nothing recorded yet.</p>'
    : sceneEntries.map(e => `<div class="journal-entry"><p>${e.text.replace(/\n\n/g, '</p><p>')}</p></div>`).join('');
}

function closeJournal() {
  const panel = document.getElementById('journal-panel');
  const toggle = document.getElementById('journal-toggle');
  if (!panel) return;
  panel.classList.add('journal-panel-closed');
  panel.setAttribute('aria-hidden', 'true');
  toggle?.classList.remove('journal-toggle-open');
}

function toggleJournal() {
  const panel = document.getElementById('journal-panel');
  const toggle = document.getElementById('journal-toggle');
  if (!panel) return;
  const isOpen = !panel.classList.contains('journal-panel-closed');
  if (isOpen) {
    closeJournal();
  } else {
    panel.classList.remove('journal-panel-closed');
    panel.setAttribute('aria-hidden', 'false');
    toggle?.classList.add('journal-toggle-open');
    state.journalSeen = (state.journal ?? []).length;
    saveState();
    renderJournal();
  }
}

document.getElementById('journal-toggle')?.addEventListener('click', () => { dismissHint('journal'); toggleJournal(); });
document.getElementById('back-btn')?.addEventListener('click', () => { dismissHint('back'); cancelPlayback(); showSelector(); });
document.getElementById('journal-quit')?.addEventListener('click', () => { closeJournal(); cancelPlayback(); showSelector(); });
document.getElementById('journal-new-game')?.addEventListener('click', () => {
  if (!currentStoryId) return;
  showConfirm('Start a new game? Progress will be lost.', () => {
    closeJournal();
    localStorage.removeItem(`gamebook.state.${currentStoryId}`);
    startStory(currentStoryId);
  });
});

document.addEventListener('click', e => {
  const panel = document.getElementById('journal-panel');
  const toggle = document.getElementById('journal-toggle');
  if (!panel || panel.classList.contains('journal-panel-closed')) return;
  if (!panel.contains(e.target) && !toggle?.contains(e.target)) closeJournal();
});

// ── Keyboard ──────────────────────────────────────────────────────────────────

function inGame() {
  return !!document.getElementById('choices-footer');
}

function confirmExit() {
  cancelPlayback();
  showSelector();
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = e.target?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;

  if (e.key === 'Escape' && inGame()) {
    e.preventDefault();
    confirmExit();
    return;
  }

  if (e.key >= '1' && e.key <= '9' && inGame()) {
    const footer = document.getElementById('choices-footer');
    const buttons = footer?.querySelectorAll('.btn-choice:not([disabled])');
    const idx = parseInt(e.key, 10) - 1;
    if (buttons && buttons[idx]) {
      e.preventDefault();
      buttons[idx].click();
    }
  }
});

// ── Boot ──────────────────────────────────────────────────────────────────────

(async () => {
  initFullscreen();
  if (!localStorage.getItem('gamebook.seen_intro')) {
    const manifest = await loadManifest();
    showIntroSplash('first', manifest);
    return;
  }
  const last = localStorage.getItem('gamebook.lastStory');
  if (last && hasSave(last) && !sessionStorage.getItem('gamebook.atSelector')) {
    startStory(last);
  } else {
    showSelector();
  }
})();
