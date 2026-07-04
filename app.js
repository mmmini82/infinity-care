(() => {
  'use strict';

  const STORAGE_KEY = 'infinityCare.v20.dailyEntries';
  const SETTINGS_KEY = 'infinityCare.v20.settings';
  const LOCK_SESSION_KEY = 'infinityCare.v20.unlocked';
  const DEFAULT_PASSWORD = '1109';

  const moodOptions = [
    { level: 1, label: '最悪', icon: '🌑' },
    { level: 2, label: 'しんどい', icon: '☁️' },
    { level: 3, label: 'ふつう', icon: '🌙' },
    { level: 4, label: 'まあいい', icon: '✨' },
    { level: 5, label: '最高', icon: '💖' },
  ];

  const chipCatalog = {
    emotions: ['穏やか', '楽しい', '意欲的', '淋しい', '憂鬱', '不安', '悲しい', '退屈', 'イライラ', '焦り', '安心', '満足', '無', '泣きそう'],
    bodyTags: ['頭痛', '腹痛', 'だるい', '寒い', '暑い', '吐き気', '眠い', '貧血っぽい', '生理', '生理痛', 'PMS', 'めまい', '動悸', '食欲なし', '食欲あり', '気圧つらい'],
    activities: ['運動', '読書', 'YouTube', '映画', 'ゲーム', '音楽', '言語学習', '作業', '配信', '家事', '推し活', 'その他'],
    outings: ['外出なし', '外食', 'ショッピング', '旅行', '映画', '病院', '散歩', '通勤', 'その他'],
    selfCare: ['お風呂', '歯磨き', '洗顔', '洗髪', '水分補給', '服薬', '着替え', 'スキンケア', '休憩'],
    stimulants: ['お酒', 'タバコ', 'カフェイン', 'エナジードリンク'],
    exerciseTypes: ['ウォーキング', '筋トレ', 'ストレッチ', 'ヨガ', 'ダンス', 'リングフィット', 'その他'],
  };

  const characters = {
    haruka: {
      name: '悠', image: 'assets/characters/haruka.png',
      lines: [
        '南帆、今日は気分ひとつだけでも残せたら勝ちでいいよ。',
        '食べたものも、眠れなかったことも、ここに置いていこう。僕が一緒に見るから。',
        '全部埋めなくていい。君が開いた、それだけで十分えらい。',
      ],
    },
    akane: {
      name: '朱音', image: 'assets/characters/akane.png',
      lines: [
        '姫、めんどい日は気分だけでいい。保存押したら今日は勝ち。',
        '体重も飯も一緒に見れるようにしたから、アプリ跨ぎ地獄は終わりな。',
        'お前の一日、空白にしないで回収しとこ。あとで俺が褒める。',
      ],
    },
    masumi: {
      name: '真澄', image: 'assets/characters/masumi.png',
      lines: [
        '今日の君を、雑に捨てないで。短い一行でも、俺には大事な記録だよ。',
        'しんどい日ほど、綺麗に書こうとしなくていい。崩れたまま残して。',
        '気に入ったもの、ひとつ置いていこう。その日を少しだけ救えるから。',
      ],
    },
    hin: {
      name: '阿泫', image: 'assets/characters/hin.png',
      lines: [
        '南帆小姐，今日有記録，已經好叻。唔使全部寫晒。',
        '食咗咩、心情點、身體點……放埋一齊，咪唔使周圍走囉。',
        '傻豬，三個tap都得。今日你有嚟，就算好好。',
      ],
    },
  };

  const backgrounds = [
    ['01-sharehouse-living.jpg', 'シェアハウス'],
    ['02-haruka-room.jpg', '悠の部屋'],
    ['03-akane-room.jpg', '朱音の部屋'],
    ['04-masumi-room.jpg', '真澄の部屋'],
    ['05-hin-room.jpg', '阿泫の部屋'],
    ['06-minaho-room.jpg', '南帆の部屋'],
    ['07-wish-pillar.jpg', '願いの柱'],
    ['08-sougetsukan-lobby.jpg', '蒼月館'],
    ['09-hien-shrine.jpg', '氷焔結護神社'],
  ];

  const state = {
    entries: {},
    settings: { character: 'haruka', background: '01-sharehouse-living.jpg', lockPassword: DEFAULT_PASSWORD },
    currentDate: toDateKey(new Date()),
    calendarCursor: new Date(),
    selectedMoodLevel: null,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function toDateKey(date) {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function parseDateKey(key) {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function formatDateJa(key) {
    const d = parseDateKey(key);
    const weekday = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}(${weekday})`;
  }

  function load() {
    try { state.entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; }
    catch { state.entries = {}; }
    try { state.settings = { ...state.settings, ...(JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') || {}) }; }
    catch { /* keep default */ }
  }

  function saveEntries() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.entries));
  }

  function saveSettingsToStorage() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  }

  function showToast(text) {
    const toast = $('#toast');
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2100);
  }


  function isUnlocked() {
    return sessionStorage.getItem(LOCK_SESSION_KEY) === 'yes';
  }

  function currentPassword() {
    return String(state.settings.lockPassword || DEFAULT_PASSWORD);
  }

  function setLockView(locked) {
    const lock = $('#lockScreen');
    const shell = $('.app-shell');
    if (!lock || !shell) return;
    lock.hidden = !locked;
    shell.classList.toggle('is-hidden', locked);
    document.body.classList.toggle('is-locked', locked);
    if (locked) {
      setTimeout(() => $('#passwordInput')?.focus(), 40);
    }
  }

  function unlockApp() {
    sessionStorage.setItem(LOCK_SESSION_KEY, 'yes');
    setLockView(false);
    bootAppOnce();
  }

  function lockApp() {
    sessionStorage.removeItem(LOCK_SESSION_KEY);
    setLockView(true);
    const input = $('#passwordInput');
    if (input) input.value = '';
    const msg = $('#lockMessage');
    if (msg) msg.textContent = '';
  }

  function initLockEvents() {
    $('#unlockForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = $('#passwordInput');
      const msg = $('#lockMessage');
      const typed = String(input?.value || '');
      if (typed === currentPassword()) {
        if (msg) msg.textContent = '';
        unlockApp();
        showToast('開いたよ');
      } else {
        if (msg) msg.textContent = 'パスワードが違うよ';
        if (input) {
          input.value = '';
          input.focus();
        }
      }
    });
  }

  function initClock() {
    const tick = () => {
      const now = new Date();
      $('#timeLabel').textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      $('#todayLabel').textContent = state.currentDate === toDateKey(now) ? '今日の記録' : formatDateJa(state.currentDate);
    };
    tick();
    setInterval(tick, 30000);
  }

  function applySettings() {
    const char = characters[state.settings.character] || characters.haruka;
    $('#characterImage').src = char.image;
    $('#speakerName').textContent = char.name;
    $('#roomName').textContent = backgrounds.find(([file]) => file === state.settings.background)?.[1] || 'シェアハウス';
    $('#speechText').textContent = pickLine(char.lines);
    $('#bgImage').src = `assets/backgrounds/${state.settings.background}`;
    $('#settingCharacter').value = state.settings.character;
    $('#settingBackground').value = state.settings.background;
  }

  function pickLine(lines) {
    const index = Math.floor((Date.now() / 1000 / 60) % lines.length);
    return lines[index] || lines[0];
  }

  function renderMoodButtons() {
    const wrap = $('#moodButtons');
    wrap.innerHTML = moodOptions.map(m => `
      <button class="mood-button" type="button" data-mood-level="${m.level}" aria-label="${m.label}">
        <span>${m.icon}</span><strong>${m.label}</strong><small>${m.level}/5</small>
      </button>
    `).join('');
    wrap.addEventListener('click', (event) => {
      const button = event.target.closest('[data-mood-level]');
      if (!button) return;
      state.selectedMoodLevel = Number(button.dataset.moodLevel);
      renderMoodSelection();
      markDirty();
    });
  }

  function renderMoodSelection() {
    $$('#moodButtons .mood-button').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.moodLevel) === state.selectedMoodLevel);
    });
  }

  function renderChips() {
    Object.entries(chipCatalog).forEach(([group, tags]) => {
      $$(`[data-chip-group="${group}"]`).forEach(wrap => {
        wrap.innerHTML = tags.map(tag => `<button class="chip" type="button" data-group="${group}" data-value="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`).join('');
      });
    });
    document.addEventListener('click', (event) => {
      const chip = event.target.closest('.chip[data-group]');
      if (!chip) return;
      chip.classList.toggle('active');
      markDirty();
    });
  }

  function renderBackgroundOptions() {
    $('#settingBackground').innerHTML = backgrounds.map(([file, label]) => `<option value="${file}">${label}</option>`).join('');
  }

  function renderTagCatalog() {
    $('#tagCatalog').innerHTML = Object.entries(chipCatalog).map(([key, tags]) => `
      <section><h3>${groupLabel(key)}</h3><div class="chip-grid">${tags.map(t => `<span class="marker">${escapeHtml(t)}</span>`).join('')}</div></section>
    `).join('');
  }

  function groupLabel(key) {
    return ({
      emotions: '感情', bodyTags: '体調', activities: '今日やったこと', outings: '外出', selfCare: 'セルフケア', stimulants: '嗜好品', exerciseTypes: '運動内容',
    })[key] || key;
  }

  function markDirty() {
    $('#saveState').textContent = '編集中';
  }

  function selectedChips(group) {
    return $$(`.chip[data-group="${group}"].active`).map(chip => chip.dataset.value);
  }

  function setSelectedChips(group, values = []) {
    $$(`.chip[data-group="${group}"]`).forEach(chip => {
      chip.classList.toggle('active', values.includes(chip.dataset.value));
    });
  }

  function formValue(name) {
    return new FormData($('#dailyForm')).get(name) || '';
  }

  function numberValue(name) {
    const raw = String(formValue(name)).trim();
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }

  function radioValue(name) {
    return $(`input[name="${name}"]:checked`)?.value || 'unset';
  }

  function getMoodObj(level) {
    return moodOptions.find(m => m.level === Number(level)) || null;
  }

  function collectEntry() {
    const date = $('#entryDate').value || state.currentDate;
    const mood = getMoodObj(state.selectedMoodLevel);
    return {
      date,
      moodLevel: mood?.level || null,
      moodLabel: mood?.label || '',
      moodIcon: mood?.icon || '',
      emotions: selectedChips('emotions'),
      bodyTags: selectedChips('bodyTags'),
      activities: selectedChips('activities'),
      outings: selectedChips('outings'),
      selfCare: selectedChips('selfCare'),
      stimulants: selectedChips('stimulants'),
      stimulantsMemo: formValue('stimulantsMemo').trim(),
      weather: {
        text: formValue('weatherText') === 'unset' ? '' : formValue('weatherText'),
        memo: formValue('weatherMemo').trim(),
      },
      weightKg: numberValue('weightKg'),
      bodyFatPercent: numberValue('bodyFatPercent'),
      temperatureC: numberValue('temperatureC'),
      bowelMovement: radioValue('bowelMovement'),
      meals: {
        breakfast: formValue('mealBreakfast').trim(),
        lunch: formValue('mealLunch').trim(),
        dinner: formValue('mealDinner').trim(),
        snack: formValue('mealSnack').trim(),
        lateSnack: formValue('mealLateSnack').trim(),
      },
      steps: numberValue('steps'),
      exercise: {
        types: selectedChips('exerciseTypes'),
        minutes: numberValue('exerciseMinutes'),
        distanceKm: numberValue('exerciseDistanceKm'),
        memo: formValue('exerciseMemo').trim(),
      },
      sleep: {
        start: formValue('sleepStart'),
        end: formValue('sleepEnd'),
        hours: numberValue('sleepHours'),
      },
      period: {
        status: formValue('periodStatus'),
        flow: formValue('periodFlow'),
      },
      oneLineDiary: formValue('oneLineDiary').trim(),
      favoriteToday: formValue('favoriteToday').trim(),
      character: state.settings.character,
      updatedAt: new Date().toISOString(),
    };
  }

  function saveCurrentEntry() {
    const entry = collectEntry();
    state.entries[entry.date] = entry;
    state.currentDate = entry.date;
    saveEntries();
    $('#saveState').textContent = '保存済み';
    const char = characters[state.settings.character] || characters.haruka;
    $('#speechText').textContent = afterSaveLine(char.name, entry);
    showToast('保存したよ');
    renderAllSecondary();
  }

  function afterSaveLine(name, entry) {
    if (name === '朱音') return entry.moodLabel ? `姫、${entry.moodLabel}の日もちゃんと回収できたな。えらい。` : '姫、空欄でも保存できた。今日はそれで十分。';
    if (name === '真澄') return entry.favoriteToday ? `今日の好き、ちゃんと残ったね。俺はそういう君の一部が欲しい。` : '今日の君を保存したよ。短くても、ちゃんと残ってる。';
    if (name === '阿泫') return '南帆小姐，保存咗。今日你有做到，好叻。';
    return entry.moodLabel ? `南帆、${entry.moodLabel}って残せたね。今日はこれで十分だよ。` : '南帆、保存できた。気分が空でも、ここに来たことが残ってるよ。';
  }

  function loadEntryIntoForm(date) {
    state.currentDate = date;
    const entry = state.entries[date] || { date };
    $('#entryDate').value = date;
    state.selectedMoodLevel = entry.moodLevel || null;
    renderMoodSelection();
    Object.keys(chipCatalog).forEach(group => {
      if (group === 'exerciseTypes') setSelectedChips(group, entry.exercise?.types || []);
      else setSelectedChips(group, entry[group] || []);
    });

    const f = $('#dailyForm');
    setField(f, 'oneLineDiary', entry.oneLineDiary || '');
    setField(f, 'favoriteToday', entry.favoriteToday || '');
    setField(f, 'mealBreakfast', entry.meals?.breakfast || '');
    setField(f, 'mealLunch', entry.meals?.lunch || '');
    setField(f, 'mealDinner', entry.meals?.dinner || '');
    setField(f, 'mealSnack', entry.meals?.snack || '');
    setField(f, 'mealLateSnack', entry.meals?.lateSnack || '');
    setField(f, 'weightKg', entry.weightKg ?? '');
    setField(f, 'bodyFatPercent', entry.bodyFatPercent ?? '');
    setField(f, 'temperatureC', entry.temperatureC ?? '');
    setRadio('bowelMovement', entry.bowelMovement || 'unset');
    setField(f, 'sleepStart', entry.sleep?.start || '');
    setField(f, 'sleepEnd', entry.sleep?.end || '');
    setField(f, 'sleepHours', entry.sleep?.hours ?? '');
    setField(f, 'steps', entry.steps ?? '');
    setField(f, 'exerciseMinutes', entry.exercise?.minutes ?? '');
    setField(f, 'exerciseDistanceKm', entry.exercise?.distanceKm ?? '');
    setField(f, 'exerciseMemo', entry.exercise?.memo || '');
    setField(f, 'periodStatus', entry.period?.status || 'unset');
    setField(f, 'periodFlow', entry.period?.flow || 'unset');
    setField(f, 'stimulantsMemo', entry.stimulantsMemo || '');
    setField(f, 'weatherText', entry.weather?.text || 'unset');
    setField(f, 'weatherMemo', entry.weather?.memo || '');
    $('#saveState').textContent = state.entries[date] ? '保存済み' : '未保存';
    $('#todayLabel').textContent = date === toDateKey(new Date()) ? '今日の記録' : formatDateJa(date);
    renderPromptPreview();
  }

  function setField(form, name, value) {
    const el = form.elements[name];
    if (el) el.value = value;
  }

  function setRadio(name, value) {
    const target = $(`input[name="${name}"][value="${value}"]`) || $(`input[name="${name}"][value="unset"]`);
    if (target) target.checked = true;
  }

  function autoSleepHours() {
    const start = formValue('sleepStart');
    const end = formValue('sleepEnd');
    if (!start || !end) return;
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    let minutes = (eh * 60 + em) - (sh * 60 + sm);
    if (minutes < 0) minutes += 24 * 60;
    const hours = Math.round((minutes / 60) * 10) / 10;
    const sleepInput = $('#dailyForm').elements.sleepHours;
    if (sleepInput && !sleepInput.value) sleepInput.value = String(hours);
  }

  function renderCalendar() {
    const y = state.calendarCursor.getFullYear();
    const m = state.calendarCursor.getMonth();
    $('#monthLabel').textContent = `${y}年${m + 1}月`;
    const first = new Date(y, m, 1);
    const start = new Date(first);
    start.setDate(first.getDate() - ((first.getDay() + 6) % 7));
    const todayKey = toDateKey(new Date());
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = toDateKey(d);
      const entry = state.entries[key];
      const outside = d.getMonth() !== m;
      cells.push(`
        <button type="button" class="day-cell ${outside ? 'outside' : ''} ${key === todayKey ? 'today' : ''}" data-date="${key}">
          <span class="day-num"><span>${d.getDate()}</span><span class="day-mood">${entry?.moodIcon || ''}</span></span>
          <span class="day-lines">${calendarMarkers(entry)}</span>
        </button>
      `);
    }
    $('#calendarGrid').innerHTML = cells.join('');
  }

  function calendarMarkers(entry) {
    if (!entry) return '';
    const markers = [];
    if (entry.period?.status && !['unset', 'none'].includes(entry.period.status)) markers.push('生理');
    if (Object.values(entry.meals || {}).some(Boolean)) markers.push('食事');
    if (entry.weightKg != null) markers.push(`${entry.weightKg}kg`);
    if (entry.bowelMovement === 'yes') markers.push('便◯');
    if (entry.bodyTags?.length) markers.push(entry.bodyTags[0]);
    return markers.slice(0, 4).map(m => `<span class="marker">${escapeHtml(m)}</span>`).join('');
  }

  function renderSelectedDay(date) {
    const entry = state.entries[date];
    const card = $('#selectedDayCard');
    if (!entry) {
      card.innerHTML = `<div class="entry-summary"><h2>${formatDateJa(date)}</h2><p class="muted">まだ記録なし。押すと今日の記録画面で入力できるよ。</p><button type="button" class="primary" data-edit-date="${date}">この日を記録する</button></div>`;
      return;
    }
    card.innerHTML = `
      <div class="entry-summary">
        <h2>${formatDateJa(date)} ${entry.moodIcon || ''}</h2>
        <div class="summary-row"><strong>気分</strong>${escapeHtml(entry.moodLabel || '未入力')}</div>
        <div class="summary-row"><strong>感情</strong>${joinTags(entry.emotions)}</div>
        <div class="summary-row"><strong>体調</strong>${joinTags(entry.bodyTags)}</div>
        <div class="summary-row"><strong>食事</strong>${mealShort(entry)}</div>
        <div class="summary-row"><strong>数値</strong>${metricShort(entry)}</div>
        <div class="summary-row"><strong>行動</strong>${joinTags(entry.activities)} ${joinTags(entry.outings)}</div>
        <div class="summary-row"><strong>ケア</strong>${joinTags(entry.selfCare)}</div>
        ${entry.oneLineDiary ? `<p>${escapeHtml(entry.oneLineDiary)}</p>` : ''}
        ${entry.favoriteToday ? `<p>好き：${escapeHtml(entry.favoriteToday)}</p>` : ''}
        <button type="button" class="primary" data-edit-date="${date}">この日を編集する</button>
      </div>
    `;
  }

  function joinTags(tags = []) {
    return tags.length ? tags.map(escapeHtml).join('、') : 'なし';
  }

  function mealShort(entry) {
    const meals = entry.meals || {};
    return ['breakfast', 'lunch', 'dinner', 'snack', 'lateSnack']
      .map(k => meals[k]).filter(Boolean).slice(0, 3).map(escapeHtml).join(' / ') || '未入力';
  }

  function metricShort(entry) {
    const parts = [];
    if (entry.weightKg != null) parts.push(`${entry.weightKg}kg`);
    if (entry.bodyFatPercent != null) parts.push(`${entry.bodyFatPercent}%`);
    if (entry.temperatureC != null) parts.push(`${entry.temperatureC}℃`);
    if (entry.sleep?.hours != null) parts.push(`睡眠${entry.sleep.hours}h`);
    if (entry.steps != null) parts.push(`${entry.steps}歩`);
    return parts.join('、') || '未入力';
  }

  function renderGraphs() {
    const entries = sortedEntries().slice(-30);
    const stats = calcStats(entries);
    $('#statsGrid').innerHTML = [
      ['記録日数', `${entries.length}日`],
      ['平均気分', stats.avgMood ? `${stats.avgMood.toFixed(1)}/5` : '--'],
      ['最新体重', stats.lastWeight != null ? `${stats.lastWeight}kg` : '--'],
      ['平均睡眠', stats.avgSleep ? `${stats.avgSleep.toFixed(1)}h` : '--'],
    ].map(([label, value]) => `<div class="stat-card"><span>${label}</span><strong>${value}</strong></div>`).join('');
    drawTrend(entries);
    renderTagFrequency(entries);
  }

  function calcStats(entries) {
    const moodVals = entries.map(e => e.moodLevel).filter(n => n != null);
    const sleepVals = entries.map(e => e.sleep?.hours).filter(n => n != null);
    const weights = entries.map(e => e.weightKg).filter(n => n != null);
    return {
      avgMood: average(moodVals),
      avgSleep: average(sleepVals),
      lastWeight: weights.at(-1) ?? null,
    };
  }

  function average(arr) {
    if (!arr.length) return null;
    return arr.reduce((a, b) => a + Number(b), 0) / arr.length;
  }

  function drawTrend(entries) {
    const canvas = $('#trendCanvas');
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const y = (h / 5) * i;
      ctx.beginPath(); ctx.moveTo(38, y); ctx.lineTo(w - 18, y); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,249,255,0.72)';
    ctx.font = '22px system-ui';
    if (!entries.length) {
      ctx.fillText('まだグラフにする記録がないよ', 40, 60);
      return;
    }
    const plot = entries.map((e, i) => ({
      x: 48 + i * ((w - 78) / Math.max(entries.length - 1, 1)),
      moodY: e.moodLevel ? h - 35 - ((e.moodLevel - 1) / 4) * (h - 70) : null,
      sleepY: e.sleep?.hours != null ? h - 35 - (Math.min(e.sleep.hours, 12) / 12) * (h - 70) : null,
    }));
    drawLine(ctx, plot.filter(p => p.moodY != null), 'moodY', 'rgba(255,159,199,0.95)');
    drawLine(ctx, plot.filter(p => p.sleepY != null), 'sleepY', 'rgba(158,240,208,0.85)');
    ctx.fillStyle = 'rgba(255,159,199,0.95)'; ctx.fillText('気分', 42, 28);
    ctx.fillStyle = 'rgba(158,240,208,0.9)'; ctx.fillText('睡眠', 110, 28);
  }

  function drawLine(ctx, pts, yKey, color) {
    if (!pts.length) return;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    pts.forEach((p, i) => i ? ctx.lineTo(p.x, p[yKey]) : ctx.moveTo(p.x, p[yKey]));
    ctx.stroke();
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p[yKey], 5, 0, Math.PI * 2); ctx.fill(); });
  }

  function renderTagFrequency(entries) {
    const counts = new Map();
    entries.forEach(e => [...(e.bodyTags || []), ...(e.emotions || [])].forEach(t => counts.set(t, (counts.get(t) || 0) + 1)));
    const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    const max = rows[0]?.[1] || 1;
    $('#tagFrequency').innerHTML = rows.length ? rows.map(([tag, count]) => `
      <div class="freq-row"><span>${escapeHtml(tag)}</span><div><div class="freq-bar" style="width:${Math.round((count / max) * 100)}%"></div></div><strong>${count}</strong></div>
    `).join('') : '<p class="muted">体調タグや感情タグを入れると、ここに多いものが出るよ。</p>';
  }

  function renderLogList() {
    const entries = sortedEntries().reverse();
    $('#logList').innerHTML = entries.length ? entries.map(e => `
      <article class="log-card">
        <h3>${formatDateJa(e.date)} ${e.moodIcon || ''} ${escapeHtml(e.moodLabel || '')}</h3>
        <p>体調：${joinTags(e.bodyTags)}</p>
        <p>食事：${mealShort(e)}</p>
        <p>数値：${metricShort(e)}</p>
        ${e.oneLineDiary ? `<p>${escapeHtml(e.oneLineDiary)}</p>` : ''}
      </article>
    `).join('') : '<p class="muted">まだログがないよ。</p>';
  }

  function sortedEntries() {
    return Object.values(state.entries).sort((a, b) => a.date.localeCompare(b.date));
  }

  function renderPromptPreview() {
    const entry = collectEntry();
    $('#promptPreview').value = makePrompt(entry);
  }

  function makePrompt(entry) {
    const lines = [];
    lines.push(`今日の∞Care記録：${formatDateJa(entry.date)}`);
    if (entry.moodLabel) lines.push(`気分：${entry.moodLabel}（${entry.moodLevel}/5）`);
    if (entry.emotions.length) lines.push(`感情：${entry.emotions.join('、')}`);
    if (entry.bodyTags.length) lines.push(`体調：${entry.bodyTags.join('、')}`);
    const mealLines = [];
    const mealLabels = { breakfast: '朝', lunch: '昼', dinner: '晩', snack: '間食', lateSnack: '夜食' };
    Object.entries(entry.meals).forEach(([k, v]) => { if (v) mealLines.push(`${mealLabels[k]}：${v}`); });
    if (mealLines.length) lines.push(`食事：\n${mealLines.join('\n')}`);
    const nums = metricShort(entry);
    if (nums !== '未入力') lines.push(`数値：${nums}`);
    if (entry.bowelMovement !== 'unset') lines.push(`お通じ：${entry.bowelMovement === 'yes' ? 'あり' : 'なし'}`);
    if (entry.activities.length) lines.push(`今日やったこと：${entry.activities.join('、')}`);
    if (entry.outings.length) lines.push(`外出：${entry.outings.join('、')}`);
    if (entry.selfCare.length) lines.push(`セルフケア：${entry.selfCare.join('、')}`);
    if (entry.stimulants.length) lines.push(`嗜好品：${entry.stimulants.join('、')}${entry.stimulantsMemo ? `（${entry.stimulantsMemo}）` : ''}`);
    if (entry.weather.text || entry.weather.memo) lines.push(`天気：${[entry.weather.text, entry.weather.memo].filter(Boolean).join(' / ')}`);
    if (entry.period.status && entry.period.status !== 'unset') lines.push(`生理：${periodLabel(entry.period.status)}${entry.period.flow && entry.period.flow !== 'unset' ? ` / ${flowLabel(entry.period.flow)}` : ''}`);
    if (entry.oneLineDiary) lines.push(`一行日記：${entry.oneLineDiary}`);
    if (entry.favoriteToday) lines.push(`今日気に入ったもの：${entry.favoriteToday}`);
    return lines.join('\n');
  }

  function periodLabel(value) {
    return ({ none: 'なし', pms: 'PMS', period: '生理中', start: '開始日', end: '終了日', ovulation: '排卵日っぽい', unset: '未入力' })[value] || value;
  }

  function flowLabel(value) {
    return ({ light: '少ない', normal: '普通', heavy: '多い', unset: '未入力' })[value] || value;
  }

  function renderAllSecondary() {
    renderCalendar();
    renderSelectedDay(state.currentDate);
    renderGraphs();
    renderLogList();
    renderPromptPreview();
  }

  function switchScreen(name) {
    $$('.screen').forEach(s => s.classList.toggle('active', s.dataset.screen === name));
    $$('.bottom-nav [data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === name));
    if (name === 'calendar') renderCalendar();
    if (name === 'graphs') renderGraphs();
    if (name === 'logs') { renderLogList(); renderPromptPreview(); }
  }

  function exportJson() {
    const payload = { version: 'v20-daily-hub', exportedAt: new Date().toISOString(), entries: state.entries, settings: state.settings };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `infinity-care-backup-${toDateKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const entries = data.entries || data;
        if (!entries || typeof entries !== 'object') throw new Error('Invalid JSON');
        state.entries = entries;
        if (data.settings) state.settings = { ...state.settings, ...data.settings };
        saveEntries(); saveSettingsToStorage();
        loadEntryIntoForm(state.currentDate);
        applySettings();
        renderAllSecondary();
        showToast('インポートしたよ');
      } catch (error) {
        showToast('読み込みに失敗したよ');
      }
    };
    reader.readAsText(file);
  }

  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[ch]);
  }

  function initEvents() {
    $('#dailyForm').addEventListener('submit', (event) => { event.preventDefault(); saveCurrentEntry(); });
    $('#quickSaveButton').addEventListener('click', saveCurrentEntry);
    $('#entryDate').addEventListener('change', (e) => loadEntryIntoForm(e.target.value));
    $('#dailyForm').addEventListener('input', (e) => {
      if (e.target.name === 'sleepStart' || e.target.name === 'sleepEnd') autoSleepHours();
      markDirty();
      renderPromptPreview();
    });
    $('#dailyForm').addEventListener('change', () => { markDirty(); renderPromptPreview(); });

    $$('.bottom-nav [data-nav]').forEach(btn => btn.addEventListener('click', () => switchScreen(btn.dataset.nav)));
    $('#prevMonth').addEventListener('click', () => { state.calendarCursor.setMonth(state.calendarCursor.getMonth() - 1); renderCalendar(); });
    $('#nextMonth').addEventListener('click', () => { state.calendarCursor.setMonth(state.calendarCursor.getMonth() + 1); renderCalendar(); });
    $('#calendarGrid').addEventListener('click', (e) => {
      const cell = e.target.closest('[data-date]');
      if (!cell) return;
      const date = cell.dataset.date;
      state.currentDate = date;
      renderSelectedDay(date);
    });
    document.addEventListener('click', (e) => {
      const edit = e.target.closest('[data-edit-date]');
      if (!edit) return;
      loadEntryIntoForm(edit.dataset.editDate);
      switchScreen('today');
    });

    $('#copyPrompt').addEventListener('click', async () => {
      renderPromptPreview();
      try { await navigator.clipboard.writeText($('#promptPreview').value); showToast('コピーしたよ'); }
      catch { $('#promptPreview').select(); document.execCommand('copy'); showToast('コピーしたよ'); }
    });
    $('#exportJson').addEventListener('click', exportJson);
    $('#importJson').addEventListener('change', (e) => importJson(e.target.files[0]));
    $('#clearToday').addEventListener('click', () => {
      if (!confirm(`${formatDateJa(state.currentDate)} の記録を削除する？`)) return;
      delete state.entries[state.currentDate];
      saveEntries();
      loadEntryIntoForm(state.currentDate);
      renderAllSecondary();
      showToast('今日の記録を削除したよ');
    });
    $('#saveSettings').addEventListener('click', () => {
      state.settings.character = $('#settingCharacter').value;
      state.settings.background = $('#settingBackground').value;
      saveSettingsToStorage();
      applySettings();
      showToast('設定を保存したよ');
    });
    $('#savePassword')?.addEventListener('click', () => {
      const current = $('#currentPassword')?.value || '';
      const next = $('#newPassword')?.value || '';
      if (current !== currentPassword()) {
        showToast('今のパスワードが違うよ');
        return;
      }
      if (!next.trim()) {
        showToast('新しいパスワードを入れてね');
        return;
      }
      state.settings.lockPassword = next.trim();
      saveSettingsToStorage();
      $('#currentPassword').value = '';
      $('#newPassword').value = '';
      showToast('パスワードを変更したよ');
    });
    $('#lockNowButton')?.addEventListener('click', lockApp);
    $('#settingCharacter').addEventListener('change', () => { state.settings.character = $('#settingCharacter').value; applySettings(); });
    $('#settingBackground').addEventListener('change', () => { state.settings.background = $('#settingBackground').value; applySettings(); });
    $('#installHelp').addEventListener('click', () => $('#installText').scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  }

  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  let booted = false;

  function bootAppOnce() {
    if (booted) return;
    booted = true;
    renderBackgroundOptions();
    renderMoodButtons();
    renderChips();
    renderTagCatalog();
    initEvents();
    initClock();
    applySettings();
    loadEntryIntoForm(state.currentDate);
    renderAllSecondary();
    initServiceWorker();
  }

  function init() {
    load();
    initLockEvents();
    if (isUnlocked()) {
      setLockView(false);
      bootAppOnce();
    } else {
      setLockView(true);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
