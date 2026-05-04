// Gamebook engine entry point

const app = document.getElementById('app');

function initFullscreen() {
  const btn = document.getElementById('fullscreen-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    btn.title = document.fullscreenElement ? 'Exit fullscreen' : 'Toggle fullscreen';
  });
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
  const manifest = await loadManifest();
  app.innerHTML = `
    <div class="selector-bg">
      <div class="selector">
        <h1 class="selector-title">Choose Your Story</h1>
        <button class="intro-how-to-play" id="how-to-play">How to play</button>
        <div class="story-list">
          ${manifest.stories.length === 0
            ? '<p class="no-stories">No stories available yet.</p>'
            : manifest.stories.map(id => renderStoryCard(id)).join('')}
        </div>
      </div>
    </div>
  `;
  document.getElementById('how-to-play')?.addEventListener('click', () => showIntroSplash('revisit'));
  manifest.stories.forEach(id => attachCardHandlers(id));
}

function showIntroSplash(mode) {
  const isFirst = mode === 'first';
  const overlay = document.createElement('div');
  overlay.className = 'story-splash story-splash-hidden';

  const body = document.createElement('div');
  body.className = 'intro-splash-body';
  body.innerHTML = `
    <p>Stories wait for you here — each its own world, its own rules, its own consequences.</p>
    <p>Read the scene. Make your choices. Some doors close forever.</p>
    <p>Your progress is saved automatically.</p>
  `;

  const btn = document.createElement('button');
  btn.className = 'intro-splash-btn';
  btn.textContent = isFirst ? 'Begin →' : 'Close ✕';
  body.appendChild(btn);
  overlay.appendChild(body);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.remove('story-splash-hidden');
    overlay.classList.add('story-splash-visible');
  });

  function dismiss() {
    overlay.classList.remove('story-splash-visible');
    overlay.classList.add('story-splash-out');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    if (isFirst) {
      localStorage.setItem('gamebook.seen_intro', '1');
      showSelector();
    }
  }

  btn.addEventListener('click', dismiss);
}

function hasSave(storyId) {
  return !!localStorage.getItem(`gamebook.state.${storyId}`);
}

async function loadStoryMeta(storyId) {
  return fetchYaml(`stories/${storyId}/story.yaml`);
}

function renderStoryCard(storyId) {
  return `
    <div class="story-card" data-story="${storyId}" role="button" tabindex="0">
      <img class="story-cover" src="stories/${storyId}/images/cover.jpg" alt="" onerror="this.style.display='none'">
      <div class="story-info">
        <h2 class="story-title" data-story-title="${storyId}">Loading...</h2>
        <p class="story-desc" data-story-desc="${storyId}"></p>
      </div>
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
  } catch (e) { /* theme.css missing — skip */ }
}

function animateCardSelect(storyId) {
  const chosen = document.querySelector(`.story-card[data-story="${storyId}"]`);
  const others = document.querySelectorAll(`.story-card:not([data-story="${storyId}"])`);
  others.forEach(c => c.classList.add('card-fade-out'));
  setTimeout(() => {
    chosen?.classList.add('card-chosen');
    setTimeout(() => startStory(storyId), 350);
  }, 250);
}

async function attachCardHandlers(storyId) {
  try {
    const meta = await loadStoryMeta(storyId);
    const titleEl = document.querySelector(`[data-story-title="${storyId}"]`);
    const descEl = document.querySelector(`[data-story-desc="${storyId}"]`);
    if (titleEl) titleEl.textContent = meta.title;
    if (descEl) descEl.textContent = meta.description;
  } catch (e) { /* story.yaml missing — skip */ }

  applyCardTheme(storyId);

  const card = document.querySelector(`.story-card[data-story="${storyId}"]`);
  if (card) {
    const launch = () => animateCardSelect(storyId);
    card.addEventListener('click', launch);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') launch(); });
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
      return { content: block.else, isSpeech: false, branch: 'b' };
    }

    if (block.text !== undefined) return { content: block.text, isSpeech: false, branch: 'a' };
    const voiceKey = Object.keys(block).find(k => k !== 'if' && k !== 'else' && k !== 'text');
    if (voiceKey) return { content: block[voiceKey], isSpeech: true, branch: 'a' };
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

function stopAudio() {
  if (currentAudio) {
    const audio = currentAudio;
    currentAudio = null;
    audio.pause();
    audio.src = '';
    audio.load();
  }
}

function cancelPlayback() {
  playbackSession++;
  stopAudio();
}

function blockAudioUrl(sceneId, rawIndex, branch) {
  const safe = sceneId.replace(/\//g, '-');
  return `stories/${currentStoryId}/audio/${safe}_block_${rawIndex}${branch}.opus`;
}

function sceneFolder(sceneId) {
  const i = sceneId.indexOf('/');
  return i === -1 ? '' : sceneId.slice(0, i);
}

function actAudioSlug(actText) {
  return actText.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}


function showTitleSplash(text, audioUrl, onDone) {
  app.innerHTML = '';

  const splash = document.createElement('div');
  splash.className = 'story-splash story-splash-hidden';

  const h1 = document.createElement('h1');
  h1.className = 'story-splash-title';
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

  function finish() {
    if (done) return;
    done = true;
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

  const saved = loadState(storyId);
  if (saved) {
    state = saved;
    if (!Array.isArray(state.visited)) state.visited = [];
    if (!state.blockHashes) state.blockHashes = {};
    if (!Array.isArray(state.journal)) state.journal = [];
    if (typeof state.journalSeen !== 'number') state.journalSeen = state.journal.length;
    currentAct = saved.act ?? null;
    currentActFolder = saved.actFolder ?? sceneFolder(state.scene);
  } else {
    initState(storyId, meta.stats ?? {});
    if (meta.journal) {
      state.journal.push({ scene: '__story', text: meta.journal });
    }
    saveState();
  }

  const startScene = saved ? state.scene : meta.start;

  if (!saved) {
    showTitleSplash(meta.title, `stories/${currentStoryId}/audio/story_title.opus`, async () => {
      renderShell(meta);
      await navigateTo(startScene);
    });
  } else {
    renderShell(meta);
    await navigateTo(startScene);
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
      const actAudioUrl = `stories/${currentStoryId}/audio/${actAudioSlug(actTitle)}.opus`;
      showTitleSplash(actTitle, actAudioUrl, () => {
        renderShell(storyMeta);
        clearNarrative();
        const blocks = resolveSceneBlocks(scene);
        state.blockHashes[sceneId] = blocks.map(b => b.hash);
        saveState();
        typeBlocks(blocks, () => renderChoices(scene), sceneId);
      });
    }
  } else if (!alreadyVisited && scene.act && scene.act !== currentAct) {
    showingActTitle = true;
    currentAct = scene.act;
    saveState();
    const actAudioUrl = `stories/${currentStoryId}/audio/${actAudioSlug(scene.act)}.opus`;
    showTitleSplash(scene.act, actAudioUrl, () => {
      renderShell(storyMeta);
      clearNarrative();
      const blocks = resolveSceneBlocks(scene);
      state.blockHashes[sceneId] = blocks.map(b => b.hash);
      saveState();
      renderHud();
      typeBlocks(blocks, () => renderChoices(scene), sceneId);
    });
  }

  if (!showingActTitle) {
    clearNarrative();
    const blocks = resolveSceneBlocks(scene);
    const blockHashes = blocks.map(b => b.hash);

    if (alreadyVisited) {
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
    skip.finished = true;
    para.innerHTML = fullHtml;
    para.classList.remove('block-typing');
    para.classList.add('block-visible');
    scrollNarrativeToBottom();
    onDone();
  }

  const startTime = performance.now();
  let charsShown = 0;

  function tick() {
    if (finished) return;
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

function typeBlocks(blocks, onDone, sceneId) {
  const session = playbackSession;
  let index = 0;
  let done = false;
  const skip = { active: false };
  const blockCount = blocks.length;

  const gameWrap = document.querySelector('.game-wrap');

  function cancelled() { return session !== playbackSession; }

  function onSkip() {
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

  function finish() {
    if (done) return;
    done = true;
    removeClickSkip();
    if (!cancelled()) onDone();
  }

  function next() {
    if (done || cancelled()) { finish(); return; }
    if (index >= blockCount) { finish(); return; }
    const block = blocks[index++];
    skip.finished = false;
    const finishTyping = typeBlock(block, skip, () => { if (!done && !cancelled() && (!sceneId || !currentAudio)) next(); });
    if (sceneId) {
      stopAudio();
      const audio = new Audio(blockAudioUrl(sceneId, block.rawIndex, block.branch));
      currentAudio = audio;
      audio.addEventListener('ended', () => { if (!done && !cancelled() && audio === currentAudio) { finishTyping(); next(); } }, { once: true });
      audio.play().catch(() => { if (!done && !cancelled() && audio === currentAudio) next(); });
    }
  }

  next();
}

function renderChoices(scene) {
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
}

function showUndoConfirm() {
  const overlay = document.createElement('div');
  overlay.className = 'undo-confirm-overlay';
  overlay.innerHTML = `
    <div class="undo-confirm">
      <p class="undo-confirm-msg">Undo last choice?</p>
      <div class="exit-confirm-buttons">
        <button class="btn btn-secondary" id="btn-undo-yes">Yes</button>
        <button class="btn btn-ghost" id="btn-undo-no">No</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const cleanup = () => overlay.remove();

  document.getElementById('btn-undo-yes').addEventListener('click', async () => {
    cleanup();
    const ok = undo();
    if (!ok) return;
    await navigateTo(state.scene);
  });

  document.getElementById('btn-undo-no').addEventListener('click', cleanup);
  overlay.addEventListener('click', e => { if (e.target === overlay) cleanup(); });
}

async function handleUndo() {
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
  if (currentStoryId) toggle.classList.remove('journal-hidden');

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

document.getElementById('journal-toggle')?.addEventListener('click', toggleJournal);
document.getElementById('journal-quit')?.addEventListener('click', () => { closeJournal(); cancelPlayback(); showSelector(); });
document.getElementById('journal-new-game')?.addEventListener('click', () => {
  if (!currentStoryId) return;
  if (!confirm('Start a new game? Your current progress will be lost.')) return;
  closeJournal();
  localStorage.removeItem(`gamebook.state.${currentStoryId}`);
  startStory(currentStoryId);
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
    showIntroSplash('first');
    return;
  }
  const last = localStorage.getItem('gamebook.lastStory');
  if (last && hasSave(last) && !sessionStorage.getItem('gamebook.atSelector')) {
    startStory(last);
  } else {
    showSelector();
  }
})();
