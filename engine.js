// Gamebook engine entry point

const app = document.getElementById('app');

let currentNarrativeOffset = 0;

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
  removeStoryTheme();
  const manifest = await loadManifest();
  app.innerHTML = `
    <div class="selector">
      <h1 class="selector-title">Choose Your Story</h1>
      <div class="story-list">
        ${manifest.stories.length === 0
          ? '<p class="no-stories">No stories available yet.</p>'
          : manifest.stories.map(id => renderStoryCard(id)).join('')}
      </div>
    </div>
  `;
  manifest.stories.forEach(id => attachCardHandlers(id));
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
    <div class="story-card" data-story="${storyId}">
      <img class="story-cover" src="stories/${storyId}/images/cover.jpg" alt="" onerror="this.style.display='none'">
      <div class="story-info">
        <h2 class="story-title" data-story-title="${storyId}">Loading...</h2>
        <p class="story-desc" data-story-desc="${storyId}"></p>
        <div class="story-actions">
          ${saved
            ? `<button class="btn btn-primary" data-action="continue" data-story="${storyId}">Continue</button>
               <button class="btn btn-secondary" data-action="new" data-story="${storyId}">New Game</button>`
            : `<button class="btn btn-primary" data-action="play" data-story="${storyId}">Play</button>`}
        </div>
      </div>
    </div>
  `;
}

async function attachCardHandlers(storyId) {
  try {
    const meta = await loadStoryMeta(storyId);
    const titleEl = document.querySelector(`[data-story-title="${storyId}"]`);
    const descEl = document.querySelector(`[data-story-desc="${storyId}"]`);
    if (titleEl) titleEl.textContent = meta.title;
    if (descEl) descEl.textContent = meta.description;
  } catch (e) { /* story.json missing — skip */ }

  document.querySelectorAll(`[data-story="${storyId}"]`).forEach(btn => {
    if (!btn.dataset.action) return;
    btn.addEventListener('click', () => handleCardAction(btn.dataset.action, storyId));
  });
}

function handleCardAction(action, storyId) {
  if (action === 'new') {
    if (!confirm('Start a new game? Your current progress will be lost.')) return;
    localStorage.removeItem(`gamebook.state.${storyId}`);
  }
  startStory(storyId);
}

// ── State ─────────────────────────────────────────────────────────────────────

let currentStoryId = null;
let currentAct = null;
let state = null;

function stateKey(storyId) {
  return `gamebook.state.${storyId}`;
}

function initState(storyId, startingStats) {
  currentStoryId = storyId;
  currentAct = null;
  state = { scene: null, stats: { ...startingStats }, flags: {}, visited: [], history: [] };
}

function saveState() {
  localStorage.setItem(stateKey(currentStoryId), JSON.stringify({ ...state, act: currentAct }));
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
    act: currentAct
  });
}

function undo() {
  if (state.history.length === 0) return false;
  const prev = state.history.pop();
  state.scene = prev.scene;
  state.stats = prev.stats;
  state.flags = prev.flags;
  state.visited = prev.visited ?? [];
  currentAct = prev.act ?? null;
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

// ── Audio ─────────────────────────────────────────────────────────────────────

const ACT_TITLE_PAUSE_MS = 2000;
let currentAudio = null;

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
}

function blockAudioUrl(sceneId, index) {
  const safe = sceneId.replace(/\//g, '-');
  return `stories/${currentStoryId}/audio/${safe}_block_${index}.opus`;
}

function actAudioSlug(actText) {
  return actText.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function playActTitleAudio(actText, onDone) {
  const slug = actAudioSlug(actText);
  const url = `stories/${currentStoryId}/audio/${slug}.opus`;
  const animDuration = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--anim-act-title-duration')
  ) || 600;

  setTimeout(() => {
    currentAudio = new Audio(url);
    let settled = false;
    function settle() {
      if (settled) return;
      settled = true;
      setTimeout(onDone, ACT_TITLE_PAUSE_MS);
    }
    currentAudio.addEventListener('ended', settle, { once: true });
    currentAudio.addEventListener('error', settle, { once: true });
    currentAudio.play().catch(settle);
  }, animDuration);
}

function playBlocks(sceneId, blockCount, onBlockStart, onDone) {
  let index = 0;

  function playNext() {
    stopAudio();
    if (index >= blockCount) { onDone(); return; }
    const i = index++;
    onBlockStart(i);
    currentAudio = new Audio(blockAudioUrl(sceneId, i));
    currentAudio.addEventListener('ended', playNext, { once: true });
    currentAudio.play().catch(() => {
      // Audio missing or autoplay blocked — reveal remaining blocks and finish
      for (let j = index; j < blockCount; j++) onBlockStart(j);
      onDone();
    });
  }

  playNext();
}

// ── Game shell ────────────────────────────────────────────────────────────────

function applyStoryTheme(storyId) {
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
  const meta = await loadStoryMeta(storyId);
  currentStoryId = storyId;
  applyStoryTheme(storyId);

  const saved = loadState(storyId);
  if (saved) {
    state = saved;
    if (!Array.isArray(state.visited)) state.visited = [];
    currentAct = saved.act ?? null;
  } else {
    initState(storyId, meta.stats ?? {});
    state.scene = meta.start;
    saveState();
  }

  renderShell(meta);
  await navigateTo(state.scene);
}

function renderShell(meta) {
  app.innerHTML = `
    <div class="hud" id="hud"></div>
    <div class="game-wrap">
      <div class="narrative-area">
        <div class="narrative" id="narrative"></div>
        <div class="choices-divider"></div>
        <div class="choices-footer" id="choices-footer"></div>
      </div>
    </div>
  `;
}

async function loadScene(storyId, sceneId) {
  return fetchYaml(`stories/${storyId}/scenes/${sceneId}.yaml`);
}

function injectActTitle(actText) {
  const el = document.getElementById('narrative');
  if (!el) return;
  el.innerHTML = '';
  currentNarrativeOffset = 0;
  const div = document.createElement('div');
  div.className = 'act-title act-title-hidden';
  div.dataset.act = actText;

  const ruleTop = document.createElement('hr');
  ruleTop.className = 'act-rule act-rule-top';

  const h2 = document.createElement('h2');
  h2.className = 'act-heading';
  h2.textContent = actText;

  const ruleBottom = document.createElement('hr');
  ruleBottom.className = 'act-rule act-rule-bottom';

  div.appendChild(ruleTop);
  div.appendChild(h2);
  div.appendChild(ruleBottom);
  el.appendChild(div);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      div.classList.remove('act-title-hidden');
      div.classList.add('act-title-visible');
    });
  });
}

async function navigateTo(sceneId) {
  if (state.scene && !state.visited.includes(state.scene)) {
    state.visited.push(state.scene);
  }
  state.scene = sceneId;
  saveState();

  const scene = await loadScene(currentStoryId, sceneId);
  renderHud();

  const blocks = Array.isArray(scene.text) ? scene.text : [scene.text];

  if (scene.act && scene.act !== currentAct) {
    currentAct = scene.act;
    saveState();
    injectActTitle(scene.act);
    renderNarrative(scene);
    playActTitleAudio(scene.act, () => {
      playBlocks(sceneId, blocks.length,
        (i) => revealBlock(i),
        () => renderChoices(scene),
      );
    });
  } else {
    renderNarrative(scene);
    playBlocks(sceneId, blocks.length,
      (i) => revealBlock(i),
      () => renderChoices(scene),
    );
  }
}

function renderHud() {
  const hud = document.getElementById('hud');
  if (!hud) return;
  hud.innerHTML = Object.entries(state.stats)
    .map(([k, v]) => `<span class="hud-stat"><span class="hud-key">${k}</span><span class="hud-val">${v}</span></span>`)
    .join('');
}

function renderNarrative(scene) {
  const el = document.getElementById('narrative');
  if (!el) return;
  const blocks = Array.isArray(scene.text) ? scene.text : [scene.text];

  currentNarrativeOffset = el.querySelectorAll('p').length;

  // Add scene separator only between scenes (not after act title)
  if (el.querySelector('p') !== null) {
    const sep = document.createElement('hr');
    sep.className = 'scene-separator';
    el.appendChild(sep);
  }

  const isFirstBlock = el.querySelector('p') === null;

  blocks.forEach((b, i) => {
    const text = typeof b === 'string' ? b : Object.values(b)[0];
    const isSpeech = typeof b === 'object';
    const isOpener = i === 0 && isFirstBlock;

    const html = text.replace(/\n\n/g, '</p><p>');
    const p = document.createElement('p');
    p.classList.add('block-hidden');
    if (isOpener) p.classList.add('scene-opener');
    if (isSpeech) {
      p.classList.add('speech-block');
      p.innerHTML = `"${html}"`;
    } else {
      p.innerHTML = html;
    }
    el.appendChild(p);
  });
}

function revealBlock(index) {
  const paras = document.querySelectorAll('#narrative p');
  const para = paras[currentNarrativeOffset + index];
  if (para) {
    para.classList.remove('block-hidden');
    para.classList.add('block-visible');
    para.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function renderChoices(scene) {
  const el = document.getElementById('choices-footer');
  if (!el) return;

  const visible = (scene.choices ?? []).filter(c => meetsRequirements(c.requires));

  if (visible.length === 0) {
    el.innerHTML = `
      <p class="end-message">— The End —</p>
      <button class="btn btn-secondary" id="btn-selector">Back to Stories</button>
      <button class="btn btn-secondary" id="btn-undo">↩ Undo</button>
    `;
    document.getElementById('btn-selector')?.addEventListener('click', () => showSelector());
    document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
    return;
  }

  el.innerHTML = `
    <div class="choice-list">
      ${visible.map((c, i) => `<button class="btn-choice" data-index="${i}">${c.text}</button>`).join('')}
    </div>
    <div class="choice-meta">
      <button class="btn btn-ghost" id="btn-undo" ${state.history.length === 0 ? 'disabled' : ''}>↩ Undo</button>
    </div>
  `;

  const choiceList = el.querySelector('.choice-list');
  if (choiceList) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => choiceList.classList.add('choices-visible'));
    });
  }

  visible.forEach((choice, i) => {
    el.querySelector(`[data-index="${i}"]`).addEventListener('click', (e) => {
      const allBtns = el.querySelectorAll('.btn-choice');
      allBtns.forEach(b => { b.disabled = true; });

      const fadeDuration = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--anim-choice-fade-duration')
      ) || 250;

      allBtns.forEach(btn => {
        btn.style.transition = `opacity ${fadeDuration}ms ease`;
        btn.style.opacity = btn === e.currentTarget ? '0' : '0.2';
      });

      setTimeout(() => handleChoice(choice), fadeDuration);
    });
  });
  document.getElementById('btn-undo')?.addEventListener('click', handleUndo);
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

async function handleUndo() {
  const ok = undo();
  if (!ok) return;
  const el = document.getElementById('narrative');
  if (el) { el.innerHTML = ''; currentNarrativeOffset = 0; }
  await navigateTo(state.scene);
}

// ── Boot ──────────────────────────────────────────────────────────────────────

showSelector();
