/**
 * FORMANUPP Consolidated Bundle
 * Self-contained, zero-dependency, instant startup on any browser / mobile device.
 */

// ==========================================
// 1. BRAND QUOTES & PERSONALITY
// ==========================================
const BRAND_TAGLINE = "I am safe. I am offline. I am becoming.";
const BRAND_PHILOSOPHY = "Let your social media life die for a while. Let your real life come alive.";

const SIGNATURE_DIALOG = {
  greeting: "Welcome back.",
  check: "We checked your screen time.",
  reaction: "...girl.",
  advice: "Go live your life.",
  socialStatus: "☠️ deceased",
  realStatus: "✨ waiting for you",
  actionBtn: "START MY RESET"
};

const SCREEN_TIME_ALERTS = [
  "Your screen time is getting suspicious.",
  "Maybe the world can survive without your Instagram story today.",
  "Your phone doesn't need you right now.",
  "Go exist offline for a little.",
  "Your social media life is currently deceased. Excellent.",
  "Main character activity detected.",
  "Close the app. Open your life.",
  "You disappeared. Proud of you.",
  "Instagram has officially become your full-time employer.",
  "Your eyes have been staring at this rectangle long enough."
];

const NOTIFICATION_QUOTES = [
  { id: 1, title: "Unsubscribe From The Screen", body: "Your eyes would like to unsubscribe from this screen." },
  { id: 2, title: "Ghost Mode Active", body: "Your mysterious era is going well. Keep them wondering." },
  { id: 3, title: "Reality Calling", body: "Tiny reminder: your real life is still happening right now." },
  { id: 4, title: "Incoming Call", body: "Your phone is calling. You don't have to answer." },
  { id: 5, title: "Quiet Power", body: "Five minutes of silence won't kill you. Promise." },
  { id: 6, title: "Offline Energy", body: "You have been scrolling for a while. Go exist in 3D." }
];

const FUNERAL_EPITAPHS = [
  "Cause of death: Too much scrolling.",
  "Survived by: Unread books, clean laundry, and sunlight.",
  "Here lies endless notifications. May they stay on Do Not Disturb forever.",
  "Died doing what it loved: wasting 4 hours on 7-second videos.",
  "Gone but not missed. Real life took over."
];

const FOCUS_PUNCHLINES = {
  start: "ONE THING. Not twelve things. One.",
  midway: "The group chat will survive. Stay locked in.",
  end: "Look at you actually doing things. Proud of you."
};

const EYE_BREAK_DIALOG = {
  headline: "Your eyes called.",
  punchline: "They want an urgent meeting.",
  instructions: "Look away from the screen. Gaze at something 20 feet away for 20 seconds. Blink slowly 5 times.",
  button: "I gave my eyes peace"
};

const BORED_BRAIN_QUESTIONS = [
  { id: "bored-1", question: "What would you do if your phone disappeared for 24 hours?", subtext: "No panic. Just an empty room and free hours." },
  { id: "bored-2", question: "What is something you keep postponing because scrolling is easier?", subtext: "Be honest. Nobody else is reading this." },
  { id: "bored-3", question: "What version of yourself are you trying to become?", subtext: "Offline, confident, calm, or elusive?" },
  { id: "bored-4", question: "Which matters more to you right now: attention or peace?", subtext: "One feeds the ego. One feeds the nervous system." },
  { id: "bored-5", question: "What is one thing you would do if nobody could judge you?", subtext: "No Instagram validation needed." },
  { id: "bored-6", question: "What is one habit you know you should stop feeding?", subtext: "Starve the distraction." },
  { id: "bored-7", question: "What is something you want to learn just because it fascinates you?", subtext: "Not for your resume. Just for your brain." }
];

const MORNING_VIBES = [
  { id: "locked_in", label: "Locked in", emoji: "🎯", desc: "Laser focus today. Zero nonsense." },
  { id: "slow", label: "Taking it slow", emoji: "🍵", desc: "Gentle pacing, low stimulation, hot tea energy." },
  { id: "recovering", label: "Recovering", emoji: "🛋️", desc: "Digital burnout triage. Minimal screens." },
  { id: "creative", label: "Creative", emoji: "🎨", desc: "Making things in the physical world." },
  { id: "social", label: "Social (IRL)", emoji: "👯", desc: "Meeting real humans face to face." },
  { id: "mysterious", label: "Mysterious", emoji: "🕶️", desc: "Full incognito. Disappeared from the radar." },
  { id: "clueless", label: "I have no idea", emoji: "🌀", desc: "Just trying to make it to tonight peacefully." }
];

// ==========================================
// 2. PROCEDURAL WEB AUDIO SYNTHESIZER
// ==========================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.ambientSource = null;
    this.ambientGain = null;
    this.currentAmbient = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (muted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else if (!muted && this.ambientGain && this.currentAmbient && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    }
  }

  playTap() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + (idx * 0.07);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {}
  }

  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [440, 880, 1320].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 2.5);
      });
    } catch (e) {}
  }

  playFuneral() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [130.81, 155.56, 196.00].forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch (e) {}
  }

  startAmbient(type = 'rain') {
    this.init();
    if (!this.ctx) return;
    this.stopAmbient();
    this.currentAmbient = type;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      if (type === 'rain') {
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }
      } else if (type === 'lofi') {
        for (let i = 0; i < bufferSize; i++) {
          const isCrack = Math.random() > 0.9985;
          data[i] = isCrack ? (Math.random() * 2 - 1) * 0.4 : (Math.random() * 2 - 1) * 0.03;
        }
      } else {
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 0.1 - 0.05;
        }
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.value = type === 'rain' ? 800 : 1200;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.muted ? 0 : 0.15, this.ctx.currentTime);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
      this.ambientSource = noise;
      this.ambientGain = gain;
    } catch (e) {}
  }

  stopAmbient() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
      } catch (e) {}
      this.ambientSource = null;
    }
    this.currentAmbient = null;
  }
}

const sound = new SoundEngine();

// ==========================================
// 3. REACTIVE STATE STORE
// ==========================================
const STORAGE_KEY = "FORMANUPP_APP_STATE_V1";

const DEFAULT_STATE = {
  profile: {
    name: "Becoming Myself",
    onboarded: false,
    mysteryLevel: 65,
    goals: ["Digital detox", "Focus", "Self-care"],
    problems: ["Doomscrolling", "Instagram", "Checking my phone every few minutes"],
    idealDay: "Quiet creative mornings, deep flow, evening walk with no phone.",
    morningVibe: "mysterious"
  },
  screenTime: {
    totalMinutes: 261, // 4h 21m
    instagramMinutes: 102, // 1h 42m
    youtubeMinutes: 58,
    tiktokMinutes: 45,
    focusMinutes: 130, // 2h 10m
    pickups: 64,
    longestSessionMinutes: 48,
    breaksTaken: 5,
    simulatedActive: true,
    manualMode: false
  },
  focus: {
    mode: 25,
    remainingSeconds: 25 * 60,
    isRunning: false,
    task: "One meaningful offline task",
    completedToday: 2,
    streakDays: 4
  },
  detox: {
    inFuneral: false,
    durationMinutes: 30,
    remainingSeconds: 30 * 60,
    candleLit: false,
    flowersCount: 4,
    sessionsCompleted: 3,
    totalDetoxMinutes: 195
  },
  mystery: {
    active: false,
    startedAt: null,
    elapsedSeconds: 0,
    ambientSound: "rain"
  },
  resetRoom: {
    completedTasks: { "quick-1": true, "skin-1": true, "hygiene-1": true }
  },
  glowUp: {
    currentDay: 3,
    completedDays: [1, 2],
    streak: 2
  },
  collections: {
    photos: [
      {
        id: "photo-1",
        title: "Golden hour screen-free walk",
        date: "Yesterday, 6:45 PM",
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        notes: "Proof that the sky exists in 4K resolution."
      },
      {
        id: "photo-2",
        title: "Homemade garlic pasta",
        date: "2 days ago",
        src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
        notes: "Cooked instead of watching 40 TikToks about cooking."
      }
    ],
    reflections: [
      {
        id: "ref-1",
        prompt: "What would you do if your phone disappeared for 24 hours?",
        answer: "I would probably finish my book, sleep 9 hours without blue light, and walk around without taking photos of everything.",
        date: "Today, 10:15 AM"
      }
    ],
    savedRecipes: ["chili-garlic-noodles", "mug-cake"]
  },
  eyeBreak: {
    intervalMinutes: 20,
    secondsUntilNext: 20 * 60,
    activePrompt: false
  },
  achievements: {
    xp: 450,
    level: 3,
    unlockedBadges: ["social_deceased", "mysterious", "touch_grass"]
  },
  settings: {
    theme: "dark",
    soundEnabled: true,
    notificationsEnabled: true,
    signatureAlertShown: false
  },
  signatureModalOpen: false
};

class Store {
  constructor() {
    this.state = this.load();
    this.listeners = [];
    this.initSimulation();
  }

  load() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_STATE,
            ...parsed,
            profile: { ...DEFAULT_STATE.profile, ...parsed.profile },
            screenTime: { ...DEFAULT_STATE.screenTime, ...parsed.screenTime },
            settings: { ...DEFAULT_STATE.settings, ...parsed.settings }
          };
        }
      }
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  save() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      }
    } catch (e) {}
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.state); } catch (err) {}
    });
  }

  get() {
    return this.state;
  }

  update(updater) {
    if (typeof updater === "function") {
      updater(this.state);
    } else {
      Object.assign(this.state, updater);
    }
    this.save();
  }

  addXP(amount, reason = "") {
    this.state.achievements.xp += amount;
    const newLevel = Math.floor(this.state.achievements.xp / 200) + 1;
    this.state.achievements.level = newLevel;
    this.save();
    return { newLevel, xp: this.state.achievements.xp };
  }

  getLevelTitle(level) {
    const titles = [
      "Screen Zombie", "Awakening Human", "Casual Ghost", "Low-Profile Enigma",
      "Main Character in Training", "Digital Phantom", "Real-Life Alchemist",
      "Serene Disappearer", "Master of Solitude", "Transcendent Offline Being"
    ];
    return titles[Math.min(level - 1, titles.length - 1)] || "Legend";
  }

  initSimulation() {
    setInterval(() => {
      let changed = false;
      if (this.state.eyeBreak.secondsUntilNext > 0) {
        this.state.eyeBreak.secondsUntilNext -= 5;
        if (this.state.eyeBreak.secondsUntilNext <= 0) {
          this.state.eyeBreak.activePrompt = true;
          changed = true;
        }
      }
      if (this.state.focus.isRunning && this.state.focus.remainingSeconds > 0) {
        this.state.focus.remainingSeconds -= 5;
        if (this.state.focus.remainingSeconds <= 0) {
          this.state.focus.isRunning = false;
          this.state.focus.completedToday += 1;
          this.state.screenTime.focusMinutes += this.state.focus.mode;
          this.addXP(100, "Completed focus session");
          changed = true;
        }
      }
      if (this.state.detox.inFuneral && this.state.detox.remainingSeconds > 0) {
        this.state.detox.remainingSeconds -= 5;
        if (this.state.detox.remainingSeconds <= 0) {
          this.state.detox.inFuneral = false;
          this.state.detox.sessionsCompleted += 1;
          this.state.detox.totalDetoxMinutes += this.state.detox.durationMinutes;
          this.addXP(150, "Completed digital funeral");
          changed = true;
        }
      }
      if (this.state.mystery.active) {
        this.state.mystery.elapsedSeconds += 5;
        changed = true;
      }
      if (this.state.screenTime.simulatedActive && !this.state.focus.isRunning && !this.state.detox.inFuneral && !this.state.mystery.active) {
        if (Math.random() < 0.1) {
          this.state.screenTime.totalMinutes += 1;
          if (Math.random() < 0.6) this.state.screenTime.instagramMinutes += 1;
          else this.state.screenTime.youtubeMinutes += 1;
          changed = true;
        }
      }
      if (changed) this.notify();
    }, 5000);
  }

  exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `formanupp_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  resetAllData() {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEY);
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
  }
}

const store = new Store();

// ==========================================
// 4. SIGNATURE EXPERIENCE MODAL
// ==========================================
function showSignatureModal(onStartReset) {
  const existing = document.getElementById('signature-modal-overlay');
  if (existing) existing.remove();
  sound.playFuneral();

  const overlay = document.createElement('div');
  overlay.id = 'signature-modal-overlay';
  overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn';
  overlay.innerHTML = `
    <div class="glass-card max-w-sm w-full p-6 rounded-3xl border border-white/15 shadow-2xl relative text-center overflow-hidden animate-scaleUp">
      <div class="absolute -top-20 -left-20 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-20 -right-20 w-48 h-48 bg-pink-600/25 rounded-full blur-3xl pointer-events-none"></div>
      <button id="sig-close" class="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-white/5 border border-white/10 text-xs">✕</button>
      <div class="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 mb-4 animate-breathe">
        <span class="text-4xl">☠️</span>
      </div>
      <h2 class="text-2xl font-extrabold tracking-tight text-white mb-1">${SIGNATURE_DIALOG.greeting}</h2>
      <p class="text-xs font-mono uppercase text-gray-400 tracking-wider mb-2">${SIGNATURE_DIALOG.check}</p>
      <div class="my-4 py-2 px-4 rounded-2xl bg-white/5 border border-white/10 inline-block">
        <span class="text-2xl font-black text-gradient-mystery italic">${SIGNATURE_DIALOG.reaction}</span>
      </div>
      <p class="text-base font-semibold text-pink-300 mb-6">${SIGNATURE_DIALOG.advice}</p>
      <div class="grid grid-cols-2 gap-3 mb-6">
        <div class="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800 text-left">
          <p class="text-[10px] font-mono uppercase text-gray-400 mb-1">Social Life</p>
          <p class="text-sm font-bold text-gray-300 flex items-center gap-1.5">${SIGNATURE_DIALOG.socialStatus}</p>
        </div>
        <div class="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-left">
          <p class="text-[10px] font-mono uppercase text-emerald-400/80 mb-1">Real Life</p>
          <p class="text-sm font-bold text-emerald-200 flex items-center gap-1.5">${SIGNATURE_DIALOG.realStatus}</p>
        </div>
      </div>
      <button id="sig-action-btn" class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 text-white font-bold text-sm shadow-xl shadow-purple-500/30 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
        <span>${SIGNATURE_DIALOG.actionBtn}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </button>
      <p class="text-[11px] text-gray-400 mt-4 italic">“I am safe. I am offline. I am becoming.”</p>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#sig-close').onclick = () => { sound.playTap(); overlay.remove(); };
  overlay.querySelector('#sig-action-btn').onclick = () => {
    sound.playSuccess();
    overlay.remove();
    if (onStartReset) onStartReset();
  };
}

// ==========================================
// 5. ONBOARDING SCREEN
// ==========================================
let obStep = 1;
const OB_TOTAL = 5;
const IMPROVEMENT_OPTS = ["Productivity", "Digital detox", "Better sleep", "Focus", "Self-care", "Confidence", "Learning", "All of the above"];
const PROBLEM_OPTS = ["Doomscrolling", "Instagram", "YouTube", "Gaming", "Constant notifications", "Checking my phone every few minutes", "I don't know... my phone owns me"];

function renderOnboarding(container, onComplete) {
  const state = store.get();
  let selectedImp = [...state.profile.goals];
  let selectedProb = state.profile.problems[0] || "Doomscrolling";
  let mysteryVal = state.profile.mysteryLevel;
  let idealDay = state.profile.idealDay;

  function render() {
    let content = "";
    if (obStep === 1) {
      content = `
        <div class="text-center py-6">
          <div class="inline-block p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 mb-6 animate-pulse-ring">
            <span class="text-5xl">🕶️</span>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight mb-2 text-gradient-mystery">FORMANUPP</h1>
          <p class="text-sm font-medium text-pink-300/90 italic mb-6">“${BRAND_TAGLINE}”</p>
          <div class="glass-card p-5 rounded-3xl border border-white/10 text-left mb-6">
            <p class="text-xs uppercase tracking-widest text-purple-300/70 font-mono mb-2">The Philosophy</p>
            <p class="text-base text-gray-200 font-medium leading-relaxed">“${BRAND_PHILOSOPHY}”</p>
          </div>
          <p class="text-xs text-gray-400 px-4">
            Not a traditional productivity tracker. A mysterious digital-life companion that understands your mood, screen habits, and need to unplug.
          </p>
        </div>
      `;
    } else if (obStep === 2) {
      content = `
        <div>
          <h2 class="text-2xl font-bold mb-2">What are you trying to improve?</h2>
          <p class="text-xs text-gray-400 mb-6">Select everything your real self is asking for.</p>
          <div class="grid grid-cols-2 gap-2.5">
            ${IMPROVEMENT_OPTS.map(opt => {
              const active = selectedImp.includes(opt);
              return `
                <button type="button" class="ob-imp-btn p-3.5 rounded-2xl text-left border text-sm font-medium transition-all ${active ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-sm shadow-purple-500/20' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${opt}">
                  <span class="mr-1.5">${active ? '✨' : '○'}</span> ${opt}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else if (obStep === 3) {
      content = `
        <div>
          <h2 class="text-2xl font-bold mb-2">What is your biggest digital problem?</h2>
          <p class="text-xs text-gray-400 mb-6">Zero judgment here. We know the algorithms are ruthless.</p>
          <div class="space-y-2.5">
            ${PROBLEM_OPTS.map(opt => {
              const active = selectedProb === opt;
              return `
                <button type="button" class="ob-prob-btn w-full p-4 rounded-2xl text-left border text-sm font-medium transition-all flex items-center justify-between ${active ? 'bg-pink-500/20 border-pink-400 text-pink-100 shadow-sm shadow-pink-500/20' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${opt}">
                  <span>${opt}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full ${active ? 'bg-pink-400/20 text-pink-300' : 'text-gray-500'}">${active ? 'Selected' : 'Select'}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else if (obStep === 4) {
      let tier = "Casual Ghost";
      let description = "Reducing subtle pings and keeping social updates on a quiet schedule.";
      if (mysteryVal > 30 && mysteryVal <= 70) {
        tier = "Low-Profile Enigma";
        description = "Hiding addictive apps, setting tight 30-min caps, and vanishing for hours at a time.";
      } else if (mysteryVal > 70) {
        tier = "Digital Phantom / Full Offline Incognito";
        description = "Complete disappearance era. Zero stories posted, accounts paused, 3D real life fully activated.";
      }
      content = `
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-2">“How mysterious do you want to become?”</h2>
          <p class="text-xs text-gray-400 mb-8">Higher mystery triggers stronger digital detox challenges.</p>
          <div class="glass-card p-6 rounded-3xl border border-white/10 mb-6">
            <div class="flex justify-between items-baseline mb-4">
              <span class="text-xs font-mono uppercase text-gray-400">Mystery Level</span>
              <span class="text-3xl font-extrabold text-gradient-mystery">${mysteryVal}%</span>
            </div>
            <input type="range" min="0" max="100" value="${mysteryVal}" id="ob-mystery-range" class="mystery-slider mb-6">
            <div class="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-left">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-base">🕶️</span>
                <span class="text-sm font-bold text-purple-200">${tier}</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">${description}</p>
            </div>
          </div>
        </div>
      `;
    } else if (obStep === 5) {
      content = `
        <div>
          <h2 class="text-2xl font-bold mb-2">What does your ideal day look like?</h2>
          <p class="text-xs text-gray-400 mb-5">When you don't spend 5 hours staring at a rectangle.</p>
          <div class="space-y-4">
            <textarea id="ob-ideal-day" rows="3" class="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all" placeholder="e.g. Quiet morning walk, 2 hours of creative focus, cooking real food, zero phone in bed.">${idealDay}</textarea>
            <div class="glass-card p-4 rounded-2xl border border-white/10">
              <p class="text-xs font-semibold text-purple-300 mb-2 font-mono uppercase">Quick Mind Check</p>
              <p class="text-sm text-gray-300 italic mb-3">“If nobody could see your life today, what would you actually do?”</p>
              <div class="flex flex-wrap gap-2">
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">Sleep without alarms</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">Read in sunlight</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">Cook a messy meal</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">Walk without headphones</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="min-h-full flex flex-col justify-between p-6 max-w-lg mx-auto transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <span class="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">Step ${obStep} of ${OB_TOTAL}</span>
          <div class="flex gap-1.5">
            ${Array.from({ length: OB_TOTAL }).map((_, i) => `
              <div class="h-1.5 w-6 rounded-full transition-all duration-300 ${i + 1 <= obStep ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-white/10'}"></div>
            `).join('')}
          </div>
        </div>
        <div class="flex-1 flex flex-col justify-center">${content}</div>
        <div class="mt-8 flex gap-3">
          ${obStep > 1 ? `
            <button id="ob-prev" class="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium">Back</button>
          ` : ''}
          <button id="ob-next" class="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>${obStep === OB_TOTAL ? 'Enter Your Mysterious Era 🕶️' : 'Continue'}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    `;

    const nextBtn = container.querySelector('#ob-next');
    const prevBtn = container.querySelector('#ob-prev');
    if (nextBtn) {
      nextBtn.onclick = () => {
        sound.playTap();
        if (obStep === OB_TOTAL) {
          const inp = container.querySelector('#ob-ideal-day');
          if (inp) idealDay = inp.value.trim() || idealDay;
          store.update(s => {
            s.profile.onboarded = true;
            s.profile.goals = selectedImp;
            s.profile.problems = [selectedProb];
            s.profile.mysteryLevel = mysteryVal;
            s.profile.idealDay = idealDay;
          });
          sound.playSuccess();
          onComplete();
        } else {
          obStep++;
          render();
        }
      };
    }
    if (prevBtn) {
      prevBtn.onclick = () => {
        sound.playTap();
        if (obStep > 1) { obStep--; render(); }
      };
    }
    container.querySelectorAll('.ob-imp-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        const v = btn.getAttribute('data-val');
        if (v === "All of the above") selectedImp = [...IMPROVEMENT_OPTS];
        else if (selectedImp.includes(v)) selectedImp = selectedImp.filter(i => i !== v);
        else selectedImp.push(v);
        render();
      };
    });
    container.querySelectorAll('.ob-prob-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        selectedProb = btn.getAttribute('data-val');
        render();
      };
    });
    const slider = container.querySelector('#ob-mystery-range');
    if (slider) {
      slider.oninput = (e) => {
        mysteryVal = parseInt(e.target.value, 10);
        render();
      };
    }
  }

  render();
}

// ==========================================
// 6. HOME DASHBOARD
// ==========================================
function renderHome(container, navigateTo) {
  const state = store.get();
  function formatTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h === 0 ? `${m}m` : `${h}h ${m}m`;
  }

  const totalMin = state.screenTime.totalMinutes;
  const igMin = state.screenTime.instagramMinutes;
  const ytMin = state.screenTime.youtubeMinutes;
  const focusMin = state.screenTime.focusMinutes;
  const score = Math.min(96, Math.max(35, Math.round((focusMin / (totalMin + 1)) * 100 + 42)));
  let scoreComment = score > 80 ? "Main character offline energy." : score < 50 ? "The algorithm is currently winning. Reset time." : "Decent recovery energy.";

  const morningVibesMap = {
    locked_in: { label: "Locked in", emoji: "🎯" },
    slow: { label: "Taking it slow", emoji: "🍵" },
    recovering: { label: "Recovering", emoji: "🛋️" },
    creative: { label: "Creative", emoji: "🎨" },
    social: { label: "Social IRL", emoji: "👯" },
    mysterious: { label: "Mysterious", emoji: "🕶️" },
    clueless: { label: "Floating", emoji: "🌀" }
  };
  const currentVibe = morningVibesMap[state.profile.morningVibe] || morningVibesMap.mysterious;

  container.innerHTML = `
    <div class="p-5 space-y-4 max-w-lg mx-auto pb-24">
      <div id="home-sig-banner" class="glass-card p-3.5 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-pink-900/10 to-transparent flex items-center justify-between cursor-pointer glass-card-hover">
        <div class="flex items-center gap-3">
          <span class="text-2xl animate-bounce">🚨</span>
          <div>
            <p class="text-xs font-bold text-pink-300">Screen Time Reality Check</p>
            <p class="text-[11px] text-gray-400">“...girl. Go live your life.”</p>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono">View ➔</span>
      </div>

      <div class="flex items-center justify-between pt-1">
        <div>
          <p class="text-xs font-mono uppercase text-gray-400">Today's Vibe</p>
          <button id="home-vibe-btn" class="flex items-center gap-2 mt-0.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all">
            <span>${currentVibe.emoji}</span>
            <span class="font-semibold text-gray-200">${currentVibe.label}</span>
            <span class="text-[10px] text-purple-400">change</span>
          </button>
        </div>
        <div class="text-right">
          <p class="text-xs font-mono uppercase text-gray-400">Mystery Era</p>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${state.mystery.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-purple-500/15 text-purple-300 border border-purple-500/20'}">
            <span class="w-2 h-2 rounded-full ${state.mystery.active ? 'bg-emerald-400 animate-pulse' : 'bg-purple-400'}"></span>
            ${state.profile.mysteryLevel}%
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div id="btn-funeral-card" class="glass-card p-4 rounded-3xl border border-red-500/20 bg-gradient-to-b from-gray-900/60 to-black/80 cursor-pointer glass-card-hover relative overflow-hidden">
          <div class="flex justify-between items-start mb-3">
            <span class="text-xs font-mono uppercase text-gray-400">Social Life</span>
            <span class="text-xl">☠️</span>
          </div>
          <p class="text-base font-extrabold text-gray-200">Currently</p>
          <p class="text-lg font-black text-rose-400">deceased</p>
          <p class="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
            <span>🪦 RIP screen time</span>
            <span class="text-xs">➔</span>
          </p>
        </div>

        <div id="btn-reset-card" class="glass-card p-4 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/30 to-black/80 cursor-pointer glass-card-hover relative overflow-hidden">
          <div class="flex justify-between items-start mb-3">
            <span class="text-xs font-mono uppercase text-emerald-400/80">Real Life</span>
            <span class="text-xl">✨</span>
          </div>
          <p class="text-base font-extrabold text-gray-200">Loading</p>
          <p class="text-lg font-black text-emerald-300">beautifully...</p>
          <p class="text-[10px] text-emerald-400/80 mt-2 flex items-center gap-1">
            <span>Reset room</span>
            <span class="text-xs">➔</span>
          </p>
        </div>
      </div>

      <div class="glass-card p-4 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-black to-pink-950/20">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[11px] font-mono uppercase tracking-widest text-purple-400 flex items-center gap-1.5 font-bold">
            <span>🎯</span> Today's Mission
          </span>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">+50 XP</span>
        </div>
        <p class="text-sm font-semibold text-gray-100 leading-snug mb-3">
          “Stay off social media for 45 minutes and finish one meaningful task.”
        </p>
        <button id="btn-start-mission" class="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all">
          <span>Start Focus Timer</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </button>
      </div>

      <div class="glass-card p-5 rounded-3xl border border-white/10">
        <div class="flex justify-between items-baseline mb-4">
          <div>
            <p class="text-xs font-mono uppercase text-gray-400">Total Screen Time</p>
            <h3 class="text-3xl font-extrabold text-white tracking-tight">${formatTime(totalMin)}</h3>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20 font-mono">
            ${state.screenTime.simulatedActive ? '● Live Simulation' : 'Manual Log'}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2.5 mb-4">
          <div class="p-3 rounded-2xl bg-white/5 border border-white/5">
            <p class="text-[10px] text-gray-400 font-medium">Instagram</p>
            <p class="text-base font-bold text-pink-400">${formatTime(igMin)}</p>
            <span class="text-[10px] text-gray-500">39% of total</span>
          </div>
          <div class="p-3 rounded-2xl bg-white/5 border border-white/5">
            <p class="text-[10px] text-gray-400 font-medium">YouTube</p>
            <p class="text-base font-bold text-red-400">${formatTime(ytMin)}</p>
            <span class="text-[10px] text-gray-500">22% of total</span>
          </div>
          <div class="p-3 rounded-2xl bg-white/5 border border-white/5">
            <p class="text-[10px] text-gray-400 font-medium">Focus Time</p>
            <p class="text-base font-bold text-emerald-400">${formatTime(focusMin)}</p>
            <span class="text-[10px] text-gray-500">2 sessions</span>
          </div>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-3">
          <span>Pickups: <strong class="text-gray-200">${state.screenTime.pickups}</strong></span>
          <span>Longest session: <strong class="text-gray-200">${state.screenTime.longestSessionMinutes}m</strong></span>
          <span>Breaks: <strong class="text-gray-200">${state.screenTime.breaksTaken}</strong></span>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-2">
        <button id="nav-quick-focus" class="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center glass-card-hover">
          <span class="text-xl block mb-1">⏱️</span>
          <span class="text-[11px] font-medium text-gray-300">Focus</span>
        </button>
        <button id="nav-quick-funeral" class="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center glass-card-hover">
          <span class="text-xl block mb-1">🪦</span>
          <span class="text-[11px] font-medium text-gray-300">Detox RIP</span>
        </button>
        <button id="nav-quick-mystery" class="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center glass-card-hover">
          <span class="text-xl block mb-1">🕶️</span>
          <span class="text-[11px] font-medium text-gray-300">Mystery</span>
        </button>
        <button id="nav-quick-recipes" class="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center glass-card-hover">
          <span class="text-xl block mb-1">🍳</span>
          <span class="text-[11px] font-medium text-gray-300">Recipes</span>
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="glass-card p-4 rounded-3xl border border-white/10">
          <p class="text-[10px] font-mono uppercase text-gray-400 mb-1">Real-Life Score</p>
          <div class="flex items-baseline gap-1.5 mb-1">
            <span class="text-2xl font-black text-purple-300">${score}</span>
            <span class="text-xs text-gray-500">/100</span>
          </div>
          <p class="text-[11px] text-gray-400 line-clamp-2">${scoreComment}</p>
        </div>
        <div id="btn-quick-eye-break" class="glass-card p-4 rounded-3xl border border-white/10 cursor-pointer glass-card-hover">
          <div class="flex justify-between items-start mb-1">
            <p class="text-[10px] font-mono uppercase text-gray-400">Eye Break</p>
            <span class="text-sm">👁️</span>
          </div>
          <p class="text-xs font-bold text-gray-200 mb-0.5">20-20-20 rule</p>
          <p class="text-[11px] text-purple-400">“Your eyes called” ➔</p>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#home-sig-banner').onclick = () => showSignatureModal(() => navigateTo('reset'));
  container.querySelector('#btn-funeral-card').onclick = () => { sound.playTap(); navigateTo('funeral'); };
  container.querySelector('#btn-reset-card').onclick = () => { sound.playTap(); navigateTo('reset'); };
  container.querySelector('#btn-start-mission').onclick = () => { sound.playTap(); navigateTo('focus'); };
  container.querySelector('#home-vibe-btn').onclick = () => { sound.playTap(); navigateTo('mind'); };
  container.querySelector('#nav-quick-focus').onclick = () => { sound.playTap(); navigateTo('focus'); };
  container.querySelector('#nav-quick-funeral').onclick = () => { sound.playTap(); navigateTo('funeral'); };
  container.querySelector('#nav-quick-mystery').onclick = () => { sound.playTap(); navigateTo('mystery'); };
  container.querySelector('#nav-quick-recipes').onclick = () => { sound.playTap(); navigateTo('recipes'); };
  container.querySelector('#btn-quick-eye-break').onclick = () => { sound.playTap(); navigateTo('eye_break'); };
}

// ==========================================
// 7. MIND CHECK-IN & BORED CARDS
// ==========================================
let brainTab = "47 browser tabs";
let secretNeed = "Rest";
let avoiding = "That one message";
let generatedPlan = null;
let activeQuestionIndex = 0;

function renderMind(container, navigateTo) {
  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-6 max-w-lg mx-auto pb-28">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Mind & Presence</span>
          <h2 class="text-2xl font-black text-white mt-0.5">Daily Mind Check-In 🧠</h2>
          <p class="text-xs text-gray-400 mt-1">Not a clinical assessment. Just an honest check-in with your real self.</p>
        </div>

        <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-3">
          <p class="text-sm font-bold text-gray-200">“Right now, your brain feels like...”</p>
          <div class="grid grid-cols-2 gap-2">
            ${[
              { label: "47 browser tabs", emoji: "📑" },
              { label: "A peaceful library", emoji: "📚" },
              { label: "Loading...", emoji: "⏳" },
              { label: "I have no idea", emoji: "🌀" }
            ].map(item => `
              <button class="brain-opt-btn p-3 rounded-2xl text-left border text-xs font-semibold transition-all ${brainTab === item.label ? 'bg-purple-500/25 border-purple-400 text-purple-200' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${item.label}">
                <span class="mr-1.5">${item.emoji}</span> ${item.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-3">
          <p class="text-sm font-bold text-gray-200">“What do you secretly need today?”</p>
          <div class="flex flex-wrap gap-2">
            ${["Rest", "Focus", "People", "Alone time", "Fun", "A reset"].map(need => `
              <button class="need-opt-btn px-3.5 py-2 rounded-full border text-xs font-semibold transition-all ${secretNeed === need ? 'bg-pink-500/25 border-pink-400 text-pink-200' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${need}">
                ${need}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-3">
          <p class="text-sm font-bold text-gray-200">“What are you avoiding right now?”</p>
          <div class="grid grid-cols-2 gap-2">
            ${["That one message", "Doing real work", "Cleaning my room", "Thinking about the future"].map(av => `
              <button class="avoid-opt-btn p-3 rounded-2xl text-left border text-xs font-semibold transition-all ${avoiding === av ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${av}">
                ${av}
              </button>
            `).join('')}
          </div>
        </div>

        <button id="btn-generate-plan" class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-bold text-sm shadow-lg shadow-purple-500/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span>Synthesize My Personalized Daily Plan ✨</span>
        </button>

        <div id="plan-container" class="${generatedPlan ? '' : 'hidden'} glass-card p-5 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/30 to-black/60 space-y-3">
          ${generatedPlan || ''}
        </div>

        <div class="border-t border-white/10 pt-4">
          <span class="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold">Brain Prompt Deck</span>
          <h3 class="text-xl font-bold text-white mt-1">“ARE YOU ACTUALLY BORED?” 🎴</h3>
          <p class="text-xs text-gray-400 mt-0.5">Or is your nervous system just craving dopamine pings?</p>
        </div>

        ${renderBrainPromptCard()}
      </div>
    `;

    container.querySelectorAll('.brain-opt-btn').forEach(btn => {
      btn.onclick = () => { sound.playTap(); brainTab = btn.getAttribute('data-val'); render(); };
    });
    container.querySelectorAll('.need-opt-btn').forEach(btn => {
      btn.onclick = () => { sound.playTap(); secretNeed = btn.getAttribute('data-val'); render(); };
    });
    container.querySelectorAll('.avoid-opt-btn').forEach(btn => {
      btn.onclick = () => { sound.playTap(); avoiding = btn.getAttribute('data-val'); render(); };
    });
    const genBtn = container.querySelector('#btn-generate-plan');
    if (genBtn) {
      genBtn.onclick = () => {
        sound.playSuccess();
        generatedPlan = `
          <div class="flex items-center justify-between border-b border-white/10 pb-2">
            <span class="text-xs font-mono uppercase text-purple-300 font-bold">Your Prescribed Offline Plan</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">+75 XP</span>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">
            Since your brain is at <strong>${brainTab}</strong> and secretly craving <strong>${secretNeed}</strong> while running away from <em>"${avoiding}"</em>:
          </p>
          <div class="space-y-2 pt-1 text-xs">
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <span class="text-base">1️⃣</span>
              <span class="text-gray-200"><strong>First 15 mins:</strong> Put phone in another room. Drink ice water, stretch neck.</span>
            </div>
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <span class="text-base">2️⃣</span>
              <span class="text-gray-200"><strong>The Elephant:</strong> Attack "${avoiding}" for exactly 20 minutes on timer. No perfection, just finish.</span>
            </div>
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <span class="text-base">3️⃣</span>
              <span class="text-gray-200"><strong>The Reward:</strong> Dedicated 45 minutes of pure offline ${secretNeed.toLowerCase()}.</span>
            </div>
          </div>
        `;
        store.addXP(75, "Completed mind check-in");
        render();
      };
    }

    const prevCard = container.querySelector('#btn-prev-card');
    const nextCard = container.querySelector('#btn-next-card');
    if (prevCard) {
      prevCard.onclick = () => {
        sound.playTap();
        activeQuestionIndex = (activeQuestionIndex - 1 + BORED_BRAIN_QUESTIONS.length) % BORED_BRAIN_QUESTIONS.length;
        render();
      };
    }
    if (nextCard) {
      nextCard.onclick = () => {
        sound.playTap();
        activeQuestionIndex = (activeQuestionIndex + 1) % BORED_BRAIN_QUESTIONS.length;
        render();
      };
    }
    const saveBtn = container.querySelector('#btn-save-answer');
    if (saveBtn) {
      saveBtn.onclick = () => {
        const textInput = container.querySelector('#card-answer-input');
        const answer = textInput ? textInput.value.trim() : "";
        if (!answer) { alert("Write down a quick thought before saving!"); return; }
        sound.playSuccess();
        const currentQ = BORED_BRAIN_QUESTIONS[activeQuestionIndex];
        store.update(s => {
          s.collections.reflections.unshift({
            id: `ref-${Date.now()}`,
            prompt: currentQ.question,
            answer: answer,
            date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        });
        store.addXP(50, "Saved mind reflection");
        alert("Reflection saved securely in My Collections 📂");
        if (textInput) textInput.value = "";
      };
    }
  }

  function renderBrainPromptCard() {
    const q = BORED_BRAIN_QUESTIONS[activeQuestionIndex];
    return `
      <div class="glass-card p-6 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold">
            Card ${activeQuestionIndex + 1} of ${BORED_BRAIN_QUESTIONS.length}
          </span>
          <div class="flex gap-2">
            <button id="btn-prev-card" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs">◀</button>
            <button id="btn-next-card" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs">▶</button>
          </div>
        </div>
        <div>
          <h4 class="text-base font-bold text-white leading-snug mb-1">“${q.question}”</h4>
          <p class="text-xs text-purple-300/80 italic">${q.subtext}</p>
        </div>
        <textarea id="card-answer-input" rows="3" class="w-full p-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all" placeholder="Write your unfiltered truth here..."></textarea>
        <button id="btn-save-answer" class="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-gray-100 flex items-center justify-center gap-2 transition-all">
          <span>Save to My Private Collections 📂</span>
        </button>
      </div>
    `;
  }

  render();
}

// ==========================================
// 8. FOCUS TIMER
// ==========================================
let timerInterval = null;
function renderFocus(container, navigateTo) {
  function formatTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function render() {
    const focusState = store.get().focus;
    const isRunning = focusState.isRunning;
    const remaining = focusState.remainingSeconds;
    const totalDuration = focusState.mode * 60;
    const progressPercent = Math.min(100, Math.max(0, ((totalDuration - remaining) / totalDuration) * 100));

    container.innerHTML = `
      <div class="p-5 flex flex-col justify-between min-h-full max-w-lg mx-auto pb-28">
        <div class="text-center">
          <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Zen Tunnel</span>
          <h2 class="text-2xl font-black text-white mt-0.5">Focus Mode ⏱️</h2>
          <p class="text-xs text-purple-300 italic mt-1 font-medium">“${FOCUS_PUNCHLINES.start}”</p>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-white/10 mt-4">
          <label class="text-[10px] font-mono uppercase text-gray-400 block mb-1.5">My Single Target Task</label>
          <input type="text" id="focus-task-input" value="${focusState.task}" ${isRunning ? 'disabled' : ''} class="w-full p-3 rounded-2xl bg-black/40 border border-white/10 text-sm font-semibold text-emerald-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all">
        </div>

        <div class="my-8 flex flex-col items-center justify-center relative">
          <div class="relative w-64 h-64 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full border-2 border-emerald-500/20 ${isRunning ? 'animate-pulse-ring' : ''}"></div>
            <div class="absolute inset-2 rounded-full border border-emerald-400/10 ${isRunning ? 'animate-breathe' : ''}"></div>
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="4" fill="transparent" class="text-white/5"/>
              <circle cx="50" cy="50" r="44" stroke="url(#focus-gradient)" stroke-width="4.5" fill="transparent" stroke-dasharray="276.46" stroke-dashoffset="${276.46 - (276.46 * progressPercent / 100)}" stroke-linecap="round" class="transition-all duration-1000"/>
              <defs>
                <linearGradient id="focus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#34d399"/>
                  <stop offset="100%" stop-color="#c084fc"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="absolute flex flex-col items-center justify-center text-center">
              <span class="text-5xl font-black tracking-tight text-white font-mono">${formatTime(remaining)}</span>
              <span class="text-xs text-gray-400 mt-2 font-mono uppercase">${isRunning ? 'Deep in session' : 'Ready when you are'}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-2 mb-6">
          ${[{ min: 25, label: "25 min" }, { min: 50, label: "50 min" }, { min: 90, label: "90 min" }].map(d => `
            <button class="dur-btn px-4 py-2 rounded-full border text-xs font-bold transition-all ${focusState.mode === d.min ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'} ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}" data-min="${d.min}">
              ${d.label}
            </button>
          `).join('')}
          <button id="btn-custom-focus" class="px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 hover:bg-white/10 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}">Custom</button>
        </div>

        <div class="space-y-3">
          <button id="btn-toggle-focus" class="w-full py-4 px-6 rounded-2xl ${isRunning ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30' : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-600 text-white shadow-xl shadow-emerald-500/20 hover:opacity-95'} font-extrabold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>${isRunning ? 'Pause Focus Session ⏸' : 'Lock In & Start Session 🚀'}</span>
          </button>
          ${isRunning ? `
            <button id="btn-cancel-focus" class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-400 font-semibold border border-white/5 transition-all">Cancel Session (No Judgment)</button>
          ` : ''}
          <div class="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
            <span class="text-gray-400">Completed today: <strong class="text-emerald-300">${focusState.completedToday}</strong></span>
            <span class="text-gray-400">Daily Streak: <strong class="text-purple-300">🔥 ${focusState.streakDays} days</strong></span>
          </div>
        </div>
      </div>
    `;

    const taskInput = container.querySelector('#focus-task-input');
    if (taskInput) taskInput.onchange = (e) => { store.update(s => { s.focus.task = e.target.value; }); };

    container.querySelectorAll('.dur-btn').forEach(btn => {
      btn.onclick = () => {
        if (store.get().focus.isRunning) return;
        sound.playTap();
        const min = parseInt(btn.getAttribute('data-min'), 10);
        store.update(s => { s.focus.mode = min; s.focus.remainingSeconds = min * 60; });
        render();
      };
    });

    const customBtn = container.querySelector('#btn-custom-focus');
    if (customBtn) {
      customBtn.onclick = () => {
        if (store.get().focus.isRunning) return;
        const entered = prompt("Enter focus duration in minutes:", "45");
        if (entered && !isNaN(entered) && parseInt(entered) > 0) {
          sound.playTap();
          const min = parseInt(entered);
          store.update(s => { s.focus.mode = min; s.focus.remainingSeconds = min * 60; });
          render();
        }
      };
    }

    const toggleBtn = container.querySelector('#btn-toggle-focus');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        const currentRunning = store.get().focus.isRunning;
        if (currentRunning) {
          sound.playTap();
          clearInterval(timerInterval);
          store.update(s => { s.focus.isRunning = false; });
          render();
        } else {
          sound.playChime();
          store.update(s => { s.focus.isRunning = true; });
          clearInterval(timerInterval);
          timerInterval = setInterval(() => {
            const f = store.get().focus;
            if (f.remainingSeconds <= 1) {
              clearInterval(timerInterval);
              sound.playSuccess();
              if (window.confetti) window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              store.update(s => {
                s.focus.isRunning = false;
                s.focus.completedToday += 1;
                s.screenTime.focusMinutes += s.focus.mode;
                s.focus.remainingSeconds = s.focus.mode * 60;
              });
              store.addXP(100, "Completed Focus Session");
              alert(FOCUS_PUNCHLINES.end);
              render();
            } else {
              store.update(s => { s.focus.remainingSeconds -= 1; });
              render();
            }
          }, 1000);
          render();
        }
      };
    }

    const cancelBtn = container.querySelector('#btn-cancel-focus');
    if (cancelBtn) {
      cancelBtn.onclick = () => {
        sound.playTap();
        clearInterval(timerInterval);
        store.update(s => { s.focus.isRunning = false; s.focus.remainingSeconds = s.focus.mode * 60; });
        render();
      };
    }
  }

  render();
}

// ==========================================
// 9. SOCIAL MEDIA FUNERAL (RIP: My Social Life)
// ==========================================
let funeralTimer = null;
function renderFuneral(container, navigateTo) {
  function formatDetoxTime(totalSec) {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hours > 0) return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function render() {
    const detox = store.get().detox;
    const inDetox = detox.inFuneral;
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 3);
    const bornDate = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const lastSeen = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    container.innerHTML = `
      <div class="p-5 flex flex-col justify-between min-h-full max-w-lg mx-auto pb-28 text-center">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-gray-400 font-semibold">Gamified Detox</span>
          <h2 class="text-2xl font-black text-white mt-0.5">RIP: My Social Life 🪦</h2>
          <p class="text-xs text-gray-400 mt-1">Lay your screen addiction to rest. Your real life is waiting outside.</p>
        </div>

        <div class="my-6 relative flex justify-center">
          <div class="w-72 rounded-t-[70px] rounded-b-2xl bg-gradient-to-b from-stone-800 via-stone-900 to-black p-6 border-2 border-stone-700/60 shadow-2xl relative overflow-hidden text-center transition-all duration-300">
            <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
            <div class="pt-4 pb-2 border-b border-stone-700/60 mb-4">
              <span class="text-xs font-serif tracking-widest text-stone-400 uppercase">IN LOVING MEMORY OF</span>
              <h3 class="text-2xl font-black text-stone-200 tracking-tight font-serif mt-0.5">MY SCREEN TIME</h3>
            </div>
            <div class="space-y-1 text-xs text-stone-400 font-mono mb-4">
              <p>BORN: <span class="text-stone-300">${bornDate}</span></p>
              <p>LAST SEEN: <span class="text-stone-300">${lastSeen}</span></p>
            </div>
            <div class="p-2.5 rounded-xl bg-black/50 border border-stone-800 mb-4">
              <span class="text-[10px] uppercase font-mono text-stone-500 block mb-0.5">Cause of Death</span>
              <p class="text-xs font-serif italic text-rose-300/90 font-medium">“Too much scrolling.”</p>
            </div>
            <div class="flex justify-around items-end pt-2 border-t border-stone-800">
              <button id="btn-candle-1" class="flex flex-col items-center cursor-pointer group">
                <span class="text-sm ${detox.candleLit ? 'animate-candle-flame' : 'opacity-30'} transition-opacity">
                  ${detox.candleLit ? '🔥' : '🕯️'}
                </span>
                <span class="text-[10px] text-stone-400 font-mono mt-0.5">${detox.candleLit ? 'Lit' : 'Light'}</span>
              </button>
              <button id="btn-add-flower" class="flex flex-col items-center cursor-pointer group">
                <span class="text-base group-hover:scale-125 transition-transform">💐</span>
                <span class="text-[10px] text-stone-400 font-mono mt-0.5">${detox.flowersCount} Tributes</span>
              </button>
              <button id="btn-candle-2" class="flex flex-col items-center cursor-pointer group">
                <span class="text-sm ${detox.candleLit ? 'animate-candle-flame' : 'opacity-30'} transition-opacity">
                  ${detox.candleLit ? '🔥' : '🕯️'}
                </span>
                <span class="text-[10px] text-stone-400 font-mono mt-0.5">${detox.candleLit ? 'Lit' : 'Light'}</span>
              </button>
            </div>
          </div>
        </div>

        ${inDetox ? `
          <div class="glass-card p-5 rounded-3xl border border-purple-500/30 bg-purple-950/20 mb-4 space-y-2">
            <span class="text-xs font-mono uppercase text-purple-300 font-bold flex items-center justify-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Detox Session in Progress
            </span>
            <div class="text-4xl font-black text-white font-mono my-2 tracking-tight">${formatDetoxTime(detox.remainingSeconds)}</div>
            <p class="text-xs text-purple-200/80 italic">“The internet is surviving just fine without you.”</p>
            <button id="btn-abandon-funeral" class="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-400 font-medium border border-white/5">End Session Early</button>
          </div>
        ` : `
          <div class="space-y-3 mb-4">
            <p class="text-xs font-mono uppercase text-gray-400">Select Burial / Detox Duration</p>
            <div class="grid grid-cols-3 gap-2">
              ${[
                { min: 15, label: "15 min" }, { min: 30, label: "30 min" }, { min: 60, label: "1 hour" },
                { min: 180, label: "3 hours" }, { min: 360, label: "6 hours" }, { min: 1440, label: "24 hours" }
              ].map(opt => `
                <button class="detox-dur-btn py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all ${detox.durationMinutes === opt.min ? 'bg-stone-700/80 border-stone-500 text-stone-100 shadow-md' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-min="${opt.min}">
                  ${opt.label}
                </button>
              `).join('')}
            </div>
            <button id="btn-start-funeral" class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-stone-700 via-stone-800 to-stone-900 text-stone-100 font-extrabold text-sm border border-stone-600 shadow-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span>Begin Social Media Detox 🪦</span>
            </button>
          </div>
        `}

        <div class="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
          <span class="text-gray-400">Detoxes Completed: <strong class="text-stone-300">${detox.sessionsCompleted}</strong></span>
          <span class="text-gray-400">Offline Time: <strong class="text-purple-300">${Math.round(detox.totalDetoxMinutes / 60)}h ${detox.totalDetoxMinutes % 60}m</strong></span>
        </div>
      </div>
    `;

    const toggleCandle = () => { sound.playTap(); store.update(s => { s.detox.candleLit = !s.detox.candleLit; }); render(); };
    const c1 = container.querySelector('#btn-candle-1'); if (c1) c1.onclick = toggleCandle;
    const c2 = container.querySelector('#btn-candle-2'); if (c2) c2.onclick = toggleCandle;

    const flBtn = container.querySelector('#btn-add-flower');
    if (flBtn) {
      flBtn.onclick = () => {
        sound.playTap();
        store.update(s => { s.detox.flowersCount += 1; });
        store.addXP(10, "Left flower tribute");
        render();
      };
    }

    container.querySelectorAll('.detox-dur-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        const min = parseInt(btn.getAttribute('data-min'), 10);
        store.update(s => { s.detox.durationMinutes = min; s.detox.remainingSeconds = min * 60; });
        render();
      };
    });

    const startBtn = container.querySelector('#btn-start-funeral');
    if (startBtn) {
      startBtn.onclick = () => {
        sound.playFuneral();
        store.update(s => {
          s.detox.inFuneral = true;
          s.detox.remainingSeconds = s.detox.durationMinutes * 60;
          s.detox.candleLit = true;
        });
        clearInterval(funeralTimer);
        funeralTimer = setInterval(() => {
          const d = store.get().detox;
          if (d.remainingSeconds <= 1) {
            clearInterval(funeralTimer);
            sound.playSuccess();
            if (window.confetti) window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
            store.update(s => {
              s.detox.inFuneral = false;
              s.detox.sessionsCompleted += 1;
              s.detox.totalDetoxMinutes += s.detox.durationMinutes;
              if (!s.achievements.unlockedBadges.includes("social_deceased")) s.achievements.unlockedBadges.push("social_deceased");
              if (s.detox.durationMinutes >= 120 && !s.achievements.unlockedBadges.includes("touch_grass")) s.achievements.unlockedBadges.push("touch_grass");
            });
            store.addXP(150, "Survived Social Media Funeral");
            alert("Congratulations.\nYou disappeared from the internet and somehow survived. ✨");
            render();
          } else {
            store.update(s => { s.detox.remainingSeconds -= 1; });
            render();
          }
        }, 1000);
        render();
      };
    }

    const abBtn = container.querySelector('#btn-abandon-funeral');
    if (abBtn) {
      abBtn.onclick = () => {
        sound.playTap();
        clearInterval(funeralTimer);
        store.update(s => { s.detox.inFuneral = false; });
        render();
      };
    }
  }

  render();
}

// ==========================================
// 10. MYSTERY MODE
// ==========================================
function renderMystery(container, navigateTo) {
  function formatElapsed(totalSec) {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function render() {
    const mystery = store.get().mystery;
    const isActive = mystery.active;

    container.innerHTML = `
      <div class="p-5 flex flex-col justify-between min-h-full max-w-lg mx-auto pb-28 text-center">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Ghost Protocol</span>
          <h2 class="text-2xl font-black text-white mt-0.5">MYSTERY MODE 🕶️</h2>
          <p class="text-xs text-gray-400 mt-1">Leave no trace. Let them wonder what version of you is loading.</p>
        </div>

        <div class="glass-card p-6 rounded-3xl border border-purple-500/25 bg-gradient-to-b from-purple-950/30 to-black/80 my-6 relative overflow-hidden">
          <div class="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 mb-4 ${isActive ? 'animate-pulse-ring' : ''}">
            <span class="text-5xl">🕶️</span>
          </div>
          <h3 class="text-lg font-black text-white mb-1">${isActive ? '“You have entered your mysterious era.”' : 'Ready to disappear for a while?'}</h3>
          <p class="text-xs text-purple-300/80 mb-6 italic">${isActive ? 'Digitally quiet. Physical life in full focus.' : 'Turn down the noise. Turn up your presence.'}</p>
          <div class="p-4 rounded-2xl bg-black/60 border border-white/10 mb-6">
            <span class="text-[10px] uppercase font-mono text-gray-400 block mb-1">Time Spent Digitally Quiet</span>
            <span class="text-4xl font-mono font-black text-emerald-300">${formatElapsed(mystery.elapsedSeconds)}</span>
          </div>
          <button id="btn-toggle-mystery" class="w-full py-3.5 px-6 rounded-2xl ${isActive ? 'bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30' : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-xl shadow-purple-500/25 hover:opacity-95'} font-extrabold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>${isActive ? 'Exit Mysterious Era 🕊️' : 'Activate Mysterious Era 🕶️'}</span>
          </button>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-white/10 mb-6 text-left">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-mono uppercase text-gray-400 font-semibold flex items-center gap-1.5">
              <span>🎧</span> Ambient Offline Soundscape
            </span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">Web Audio</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            ${[
              { id: "rain", label: "🌧️ Rain" },
              { id: "lofi", label: "📻 Vinyl" },
              { id: "whitenoise", label: "💨 Wind" }
            ].map(snd => `
              <button class="sound-btn p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${mystery.ambientSound === snd.id && isActive ? 'bg-purple-500/20 border-purple-400 text-purple-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-snd="${snd.id}">
                ${snd.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-white/10 text-left space-y-2">
          <p class="text-[10px] font-mono uppercase text-purple-400 font-bold">Mystery Mode Playbook</p>
          <div class="space-y-1.5 text-xs text-gray-300">
            <div class="flex items-start gap-2"><span class="text-purple-400">•</span><span><strong>Mute non-essential alerts:</strong> The world will survive if you reply in 3 hours.</span></div>
            <div class="flex items-start gap-2"><span class="text-purple-400">•</span><span><strong>Take a break from stories:</strong> Experience reality without showing the audience.</span></div>
            <div class="flex items-start gap-2"><span class="text-purple-400">•</span><span><strong>Hide social icons:</strong> Move social apps to an obscure folder away from your home screen.</span></div>
          </div>
        </div>
      </div>
    `;

    const toggleBtn = container.querySelector('#btn-toggle-mystery');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        const active = store.get().mystery.active;
        if (active) {
          sound.playTap();
          sound.stopAmbient();
          store.update(s => { s.mystery.active = false; });
          render();
        } else {
          sound.playSuccess();
          store.update(s => { s.mystery.active = true; s.mystery.startedAt = Date.now(); });
          store.addXP(50, "Activated Mystery Mode");
          sound.startAmbient(store.get().mystery.ambientSound);
          render();
        }
      };
    }

    container.querySelectorAll('.sound-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        const sndType = btn.getAttribute('data-snd');
        store.update(s => { s.mystery.ambientSound = sndType; });
        if (store.get().mystery.active) sound.startAmbient(sndType);
        render();
      };
    });
  }

  render();
}

// ==========================================
// 11. RESET ROOM
// ==========================================
const RESET_CATS = [
  {
    id: "quick", name: "Quick Reset", emoji: "⚡",
    tasks: [
      { id: "q1", title: "Take a deep breath and drink a full glass of cold water.", time: "1 min", xp: 15 },
      { id: "q2", title: "Put your phone facedown across the room.", time: "30 sec", xp: 15 },
      { id: "q3", title: "Look out the window and spot 3 green things.", time: "1 min", xp: 15 }
    ]
  },
  {
    id: "hygiene", name: "Hygiene & Refresh", emoji: "🚿",
    tasks: [
      { id: "h1", title: "Take a warm shower and put on fresh, comfortable clothes.", time: "15 min", xp: 30 },
      { id: "h2", title: "Brush your teeth and splash cool water on your face.", time: "3 min", xp: 20 },
      { id: "h3", title: "Put on clean socks and moisturize your hands.", time: "2 min", xp: 15 }
    ]
  },
  {
    id: "skincare", name: "Skin & Face", emoji: "🧴",
    tasks: [
      { id: "s1", title: "Wash your face with gentle cleanser. No rushed rubbing.", time: "3 min", xp: 20 },
      { id: "s2", title: "Apply basic moisturizer or lip balm for hydration.", time: "1 min", xp: 15 },
      { id: "s3", title: "Rest a cool damp cloth over your closed eyes.", time: "5 min", xp: 25 }
    ]
  },
  {
    id: "movement", name: "Gentle Movement", emoji: "🧘",
    tasks: [
      { id: "m1", title: "Stretch your neck, shoulders, and spine after sitting.", time: "4 min", xp: 20 },
      { id: "m2", title: "Take a 10-minute screen-free walk outside.", time: "10 min", xp: 35 },
      { id: "m3", title: "Shake out your hands and wrists from holding the phone.", time: "1 min", xp: 15 }
    ]
  },
  {
    id: "room", name: "Room & Space", emoji: "🪴",
    tasks: [
      { id: "r1", title: "Clean your desk surface for 5 minutes. Throw away trash.", time: "5 min", xp: 25 },
      { id: "r2", title: "Make your bed so your space feels peaceful tonight.", time: "2 min", xp: 20 },
      { id: "r3", title: "Open a window to let fresh outdoor air into the room.", time: "1 min", xp: 15 }
    ]
  },
  {
    id: "digital", name: "Digital Reset", emoji: "📵",
    tasks: [
      { id: "d1", title: "Turn on 'Do Not Disturb' mode for the next hour.", time: "1 min", xp: 25 },
      { id: "d2", title: "Unfollow 3 accounts that make you feel anxious or inferior.", time: "3 min", xp: 30 },
      { id: "d3", title: "Delete or hide 1 app that eats up all your free time.", time: "2 min", xp: 35 }
    ]
  },
  {
    id: "sleep", name: "Sleep & Wind-Down", emoji: "🌙",
    tasks: [
      { id: "sl1", title: "Charge your phone outside of arm's reach from bed.", time: "1 min", xp: 30 },
      { id: "sl2", title: "Dim bright overhead lights 30 minutes before sleep.", time: "1 min", xp: 20 },
      { id: "sl3", title: "Listen to rainfall audio with eyes closed.", time: "10 min", xp: 25 }
    ]
  },
  {
    id: "journaling", name: "Journaling", emoji: "✍️",
    tasks: [
      { id: "j1", title: "Write down 3 real things you are grateful for today.", time: "3 min", xp: 20 },
      { id: "j2", title: "Brain dump everything bothering you onto scrap paper.", time: "5 min", xp: 25 }
    ]
  },
  {
    id: "cooking", name: "Cooking & Fuel", emoji: "🍳",
    tasks: [
      { id: "c1", title: "Cook a real 10-minute warm meal instead of scrolling.", time: "10 min", xp: 40 },
      { id: "c2", title: "Eat something nourishing slowly without looking at a screen.", time: "15 min", xp: 35 }
    ]
  }
];

let resetTab = "quick";
function renderReset(container, navigateTo) {
  const state = store.get();
  const completed = state.resetRoom.completedTasks || {};

  function render() {
    const curCat = RESET_CATS.find(c => c.id === resetTab) || RESET_CATS[0];
    const totalDone = Object.values(completed).filter(Boolean).length;

    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <div class="flex justify-between items-start">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Self-Care Sanity</span>
            <h2 class="text-2xl font-black text-white mt-0.5">Reset Room ✨</h2>
            <p class="text-xs text-gray-400 mt-0.5">Realistic, non-toxic resets to bring you back to life.</p>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">${totalDone} Done</span>
        </div>

        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${RESET_CATS.map(cat => `
            <button class="reset-cat-btn flex-shrink-0 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 ${resetTab === cat.id ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-cat="${cat.id}">
              <span>${cat.emoji}</span><span>${cat.name}</span>
            </button>
          `).join('')}
        </div>

        <div class="space-y-3">
          ${curCat.tasks.map(task => {
            const isDone = !!completed[task.id];
            return `
              <div class="glass-card p-4 rounded-3xl border ${isDone ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-white/10'} flex items-center justify-between gap-3 transition-all">
                <div class="flex items-start gap-3 flex-1">
                  <button class="task-checkbox-btn mt-0.5 w-6 h-6 rounded-xl border flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-white/20 bg-white/5 hover:border-emerald-400'}" data-tid="${task.id}" data-xp="${task.xp}">
                    ${isDone ? '✓' : ''}
                  </button>
                  <div>
                    <p class="text-xs font-semibold ${isDone ? 'text-gray-400 line-through' : 'text-gray-100'} leading-snug">${task.title}</p>
                    <div class="flex items-center gap-2 mt-1.5">
                      <span class="text-[10px] text-gray-500 font-mono">⏱ ${task.time}</span>
                      <span class="text-[10px] text-emerald-400 font-mono font-bold">+${task.xp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div id="btn-open-glowup" class="glass-card p-4 rounded-3xl border border-pink-500/20 bg-gradient-to-r from-pink-950/25 to-purple-950/25 flex items-center justify-between cursor-pointer glass-card-hover mt-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🌱</span>
            <div>
              <p class="text-xs font-bold text-pink-200">Real-Life Glow Up Journey</p>
              <p class="text-[11px] text-gray-400">7-Day consistency quest (no toxic standards)</p>
            </div>
          </div>
          <span class="text-xs text-pink-300 font-mono">View ➔</span>
        </div>
      </div>
    `;

    container.querySelectorAll('.reset-cat-btn').forEach(btn => {
      btn.onclick = () => { sound.playTap(); resetTab = btn.getAttribute('data-cat'); render(); };
    });
    container.querySelectorAll('.task-checkbox-btn').forEach(btn => {
      btn.onclick = () => {
        const tid = btn.getAttribute('data-tid');
        const xp = parseInt(btn.getAttribute('data-xp'), 10);
        const wasDone = !!completed[tid];
        if (!wasDone) {
          sound.playSuccess();
          store.update(s => { s.resetRoom.completedTasks[tid] = true; });
          store.addXP(xp, "Reset room task completed");
        } else {
          sound.playTap();
          store.update(s => { delete s.resetRoom.completedTasks[tid]; });
        }
        render();
      };
    });
    const glowBtn = container.querySelector('#btn-open-glowup');
    if (glowBtn) glowBtn.onclick = () => { sound.playTap(); navigateTo('glowup'); };
  }

  render();
}

// ==========================================
// 12. REAL-LIFE GLOW UP
// ==========================================
const GLOW_DAYS_LIST = [
  { day: 1, title: "Clean your space.", desc: "Declutter your immediate physical surroundings. Make your room a sanctuary.", xp: 50, emoji: "🧹" },
  { day: 2, title: "Try a new recipe.", desc: "Cook something warm with your hands instead of watching food reels.", xp: 60, emoji: "🍳" },
  { day: 3, title: "Take a screen-free walk.", desc: "Leave your phone in a zipped pocket. Look at actual trees.", xp: 50, emoji: "🌲" },
  { day: 4, title: "Journal your thoughts.", desc: "Put pen to paper. Brain dump without performing for an audience.", xp: 50, emoji: "✍️" },
  { day: 5, title: "Learn something new.", desc: "Read 15 pages of a real physical book or practice an offline skill.", xp: 60, emoji: "📚" },
  { day: 6, title: "Do a relaxing self-care routine.", desc: "Warm shower, clean clothes, stretch your spine, dim lights early.", xp: 50, emoji: "🛁" },
  { day: 7, title: "Have a completely offline hour.", desc: "No screens, no notifications. 60 minutes of pure 3D reality.", xp: 100, emoji: "✨" }
];

function renderGlowUp(container, navigateTo) {
  const completedDays = store.get().glowUp.completedDays || [];
  container.innerHTML = `
    <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
      <div class="flex items-center gap-2">
        <button id="btn-back-reset" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs">◀ Back</button>
        <div>
          <h2 class="text-xl font-black text-white">REAL-LIFE GLOW UP ✨</h2>
          <p class="text-[11px] text-pink-300">Consistent habits > Unrealistic aesthetics</p>
        </div>
      </div>
      <div class="glass-card p-4 rounded-3xl border border-pink-500/20 bg-pink-950/20 text-xs leading-relaxed text-gray-300">
        <p class="font-bold text-pink-200 mb-1">What Glow-Up means here:</p>
        <p>Sleeping deeper, taking care of your nervous system, having offline hobbies, and escaping the algorithm's grip.</p>
      </div>
      <div class="space-y-3">
        ${GLOW_DAYS_LIST.map(g => {
          const isDone = completedDays.includes(g.day);
          return `
            <div class="glass-card p-4 rounded-3xl border ${isDone ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-white/10'} flex items-start justify-between gap-3 transition-all">
              <div class="flex items-start gap-3 flex-1">
                <span class="text-2xl p-2 rounded-2xl bg-white/5 border border-white/5">${g.emoji}</span>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-mono uppercase text-purple-400 font-bold">DAY ${g.day}</span>
                    ${isDone ? '<span class="text-[10px] text-emerald-400 font-bold font-mono">COMPLETED ✓</span>' : ''}
                  </div>
                  <h3 class="text-sm font-bold text-white mt-0.5">${g.title}</h3>
                  <p class="text-xs text-gray-400 mt-1 leading-snug">${g.desc}</p>
                  <span class="inline-block text-[10px] text-emerald-400 font-mono font-bold mt-2">+${g.xp} XP</span>
                </div>
              </div>
              <button class="glow-toggle-btn mt-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${isDone ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/10 border-white/15 text-white hover:bg-white/20'}" data-day="${g.day}" data-xp="${g.xp}">
                ${isDone ? 'Undo' : 'Complete'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelector('#btn-back-reset').onclick = () => { sound.playTap(); navigateTo('reset'); };
  container.querySelectorAll('.glow-toggle-btn').forEach(btn => {
    btn.onclick = () => {
      const day = parseInt(btn.getAttribute('data-day'), 10);
      const xp = parseInt(btn.getAttribute('data-xp'), 10);
      const isDone = completedDays.includes(day);
      if (!isDone) {
        sound.playSuccess();
        if (window.confetti) window.confetti({ particleCount: 70, spread: 60 });
        store.update(s => {
          s.glowUp.completedDays.push(day);
          if (s.glowUp.completedDays.length === 7) {
            if (!s.achievements.unlockedBadges.includes("real_life_gt_screen")) s.achievements.unlockedBadges.push("real_life_gt_screen");
          }
        });
        store.addXP(xp, `Glow Up Day ${day}`);
      } else {
        sound.playTap();
        store.update(s => { s.glowUp.completedDays = s.glowUp.completedDays.filter(d => d !== day); });
      }
      renderGlowUp(container, navigateTo);
    };
  });
}

// ==========================================
// 13. RECIPE CORNER
// ==========================================
const RECIPES = [
  {
    id: "chili-garlic-noodles",
    title: "10-Min Chili Garlic Butter Noodles",
    category: "10-minute", time: "10 min", difficulty: "Beginner",
    desc: "Savory, spicy, and comforting. Takes less time than watching 15 Instagram reels.",
    ingredients: ["1 pack instant noodles (flavor packet discarded)", "2 cloves garlic, minced", "1 tbsp butter", "1.5 tbsp soy sauce", "1 tsp chili flakes", "1 tsp honey", "1 green onion"],
    substitutions: "Swap butter for sesame oil. Add a fried egg on top for easy protein.",
    steps: [
      "Boil noodles (3 mins) and drain, keeping 2 tbsp noodle water.",
      "Melt butter in a hot pan; sauté garlic and chili flakes for 60 seconds.",
      "Stir in soy sauce, sugar, and reserved noodle water.",
      "Toss noodles in sauce until glossy. Top with green onions and eat immediately."
    ]
  },
  {
    id: "creamy-tomato-pasta",
    title: "One-Pot Creamy Tomato Pasta",
    category: "student", time: "15 min", difficulty: "Easy",
    desc: "Velvety student staple made in a single pan with zero fancy equipment.",
    ingredients: ["200g penne pasta", "1 cup crushed tomatoes", "1/2 cup cream or whole milk", "2 cloves garlic", "1/4 cup parmesan", "Salt, pepper, basil"],
    substitutions: "Use oat milk or coconut cream for dairy-free.",
    steps: [
      "Boil pasta until al dente. Reserve 1/4 cup pasta water and drain.",
      "In the same pot over medium heat, gently warm crushed tomatoes and garlic.",
      "Pour in cream and pasta water, stirring until silky pink sauce forms.",
      "Toss pasta back in sauce, stir in cheese, and serve hot."
    ]
  },
  {
    id: "crispy-chickpea-bowl",
    title: "Crispy Spiced Chickpea & Avocado Bowl",
    category: "vegetarian", time: "12 min", difficulty: "Easy",
    desc: "Protein-packed, crunchy, and fresh. No heavy cooking required.",
    ingredients: ["1 can chickpeas, rinsed & dried", "1 tbsp olive oil", "1 tsp paprika & cumin", "1 sliced avocado", "1 cup mixed greens", "Lemon juice"],
    substitutions: "Top with tahini drizzle or Greek yogurt.",
    steps: [
      "Toss dry chickpeas in olive oil, paprika, cumin, and salt.",
      "Toast in a dry skillet over medium-high heat for 6-8 mins until golden.",
      "Assemble greens in a bowl, top with sliced avocado and hot crispy chickpeas.",
      "Squeeze fresh lemon juice over everything and enjoy the crunch."
    ]
  },
  {
    id: "microwave-mug-cake",
    title: "5-Minute Midnight Molten Mug Cake",
    category: "comfort", time: "5 min", difficulty: "Very Easy",
    desc: "Instant warm chocolate cake when you're tempted to late-night doomscroll.",
    ingredients: ["3 tbsp flour", "2 tbsp cocoa powder", "2 tbsp sugar", "1/4 tsp baking powder", "3 tbsp milk", "1 tbsp melted butter", "1 square dark chocolate"],
    substitutions: "Use almond milk and coconut oil for vegan.",
    steps: [
      "In a microwave-safe mug, whisk dry ingredients together with a fork.",
      "Add milk and melted butter; mix until smooth batter forms.",
      "Push chocolate square gently into the center.",
      "Microwave on high for 70 seconds. Let cool 1 min before eating."
    ]
  }
];

let recipeCat = "all";
let cookingRecipe = null;
let cStep = 0;

function renderRecipes(container, navigateTo) {
  function render() {
    if (cookingRecipe) {
      const isLast = cStep === cookingRecipe.steps.length - 1;
      container.innerHTML = `
        <div class="p-5 flex flex-col justify-between min-h-full max-w-lg mx-auto pb-28">
          <div>
            <div class="flex items-center justify-between mb-2">
              <button id="btn-exit-cooking" class="text-xs text-gray-400 hover:text-white">✕ Exit</button>
              <span class="text-xs font-mono text-amber-400 font-bold">Step ${cStep + 1} of ${cookingRecipe.steps.length}</span>
            </div>
            <h2 class="text-xl font-black text-white">${cookingRecipe.title}</h2>
          </div>
          <div class="glass-card p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-black my-6 text-center space-y-4">
            <span class="text-4xl inline-block p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 animate-breathe">👩‍🍳</span>
            <div class="space-y-2">
              <span class="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest">INSTRUCTION</span>
              <p class="text-base font-bold text-white leading-relaxed">${cookingRecipe.steps[cStep]}</p>
            </div>
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 text-left text-xs text-gray-300">
              <span class="text-[10px] font-mono uppercase text-gray-400 block mb-1">Chef Tip:</span>
              <p class="italic text-amber-200/80">${cookingRecipe.substitutions}</p>
            </div>
          </div>
          <div class="flex gap-3">
            ${cStep > 0 ? `<button id="btn-prev-step" class="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold">Previous</button>` : ''}
            <button id="btn-next-step" class="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all">
              ${isLast ? 'I Finished Cooking! Claim Chef Era 🍳' : 'Next Step ➔'}
            </button>
          </div>
        </div>
      `;
      container.querySelector('#btn-exit-cooking').onclick = () => { sound.playTap(); cookingRecipe = null; render(); };
      const prevB = container.querySelector('#btn-prev-step'); if (prevB) prevB.onclick = () => { sound.playTap(); if (cStep > 0) { cStep--; render(); } };
      container.querySelector('#btn-next-step').onclick = () => {
        if (isLast) {
          sound.playSuccess();
          if (window.confetti) window.confetti({ particleCount: 100, spread: 70 });
          store.update(s => {
            if (!s.achievements.unlockedBadges.includes("chef_era")) s.achievements.unlockedBadges.push("chef_era");
          });
          store.addXP(80, "Cooked a real meal");
          alert("Chef Era Unlocked! 🍳\nYou fed your body real food instead of algorithms.");
          cookingRecipe = null;
          render();
        } else {
          sound.playTap();
          cStep++;
          render();
        }
      };
      return;
    }

    const filtered = recipeCat === "all" ? RECIPES : RECIPES.filter(r => r.category === recipeCat);
    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">Kitchen Therapy</span>
          <h2 class="text-2xl font-black text-white mt-0.5">“GO COOK SOMETHING.” 🍳</h2>
          <p class="text-xs text-gray-400 mt-1">Real food made with your hands > Scrolling food videos.</p>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-950/25 to-black flex items-center justify-between">
          <div>
            <span class="text-[10px] font-mono uppercase text-amber-400 font-bold">Offline Quest</span>
            <h4 class="text-xs font-bold text-white mt-0.5">“Cook Instead of Scroll” Challenge</h4>
            <p class="text-[11px] text-gray-400">Complete any recipe to claim the Chef Era badge.</p>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">+80 XP</span>
        </div>

        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${[
            { id: "all", label: "All Recipes" },
            { id: "10-minute", label: "⚡ 10-Minute" },
            { id: "student", label: "🎓 Student Meals" },
            { id: "vegetarian", label: "🥗 Vegetarian" },
            { id: "comfort", label: "🍫 Comfort Food" }
          ].map(cat => `
            <button class="rc-cat-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${recipeCat === cat.id ? 'bg-amber-500/25 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-cat="${cat.id}">
              ${cat.label}
            </button>
          `).join('')}
        </div>

        <div class="space-y-4">
          ${filtered.map(r => `
            <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-3 glass-card-hover">
              <div class="flex justify-between items-start">
                <div>
                  <span class="text-[10px] font-mono uppercase text-amber-400 font-bold">⏱ ${r.time} • ${r.difficulty}</span>
                  <h3 class="text-base font-extrabold text-white mt-0.5">${r.title}</h3>
                </div>
                <button class="btn-cook-recipe px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-bold text-amber-200 transition-all flex items-center gap-1.5" data-rid="${r.id}">
                  <span>Cook</span><span>➔</span>
                </button>
              </div>
              <p class="text-xs text-gray-400 leading-snug">${r.desc}</p>
              <div class="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span class="text-[10px] font-mono uppercase text-gray-500 block mb-1">Key Ingredients (${r.ingredients.length})</span>
                <p class="text-xs text-gray-300 line-clamp-2">${r.ingredients.join(', ')}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.rc-cat-btn').forEach(btn => {
      btn.onclick = () => { sound.playTap(); recipeCat = btn.getAttribute('data-cat'); render(); };
    });
    container.querySelectorAll('.btn-cook-recipe').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        const rid = btn.getAttribute('data-rid');
        cookingRecipe = RECIPES.find(r => r.id === rid);
        cStep = 0;
        render();
      };
    });
  }

  render();
}

// ==========================================
// 14. MY COLLECTIONS ("OFFLINE ME")
// ==========================================
let colTab = "photos";
function renderCollections(container, navigateTo) {
  const state = store.get();
  const collections = state.collections;

  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <div class="flex justify-between items-start">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Private Memory Vault</span>
            <h2 class="text-2xl font-black text-white mt-0.5">MY COLLECTIONS 📂</h2>
            <p class="text-xs text-gray-400 mt-0.5">“Proof that you existed outside the internet.”</p>
          </div>
          <span class="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center gap-1">
            <span>🔒</span> 100% Private
          </span>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-pink-500/25 bg-gradient-to-r from-pink-950/30 to-purple-950/20 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-2xl">📷</span>
              <div>
                <h3 class="text-xs font-bold text-pink-200">“OFFLINE ME”</h3>
                <p class="text-[11px] text-gray-400">Capture real-life moments for yourself, not followers.</p>
              </div>
            </div>
            <label class="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-xs font-bold text-pink-200 cursor-pointer transition-all">
              <span>+ Add Photo</span>
              <input type="file" id="offline-photo-input" accept="image/*" class="hidden">
            </label>
          </div>
          <p class="text-[10px] text-gray-400 italic">
            Never uploaded to any server or social media. Stored strictly in your browser's private local vault.
          </p>
        </div>

        <div class="flex gap-2 border-b border-white/10 pb-2">
          <button class="col-tab-btn text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${colTab === 'photos' ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30' : 'text-gray-400 hover:text-white'}" data-tab="photos">
            Offline Photos (${collections.photos.length})
          </button>
          <button class="col-tab-btn text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${colTab === 'reflections' ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30' : 'text-gray-400 hover:text-white'}" data-tab="reflections">
            Journal Entries (${collections.reflections.length})
          </button>
        </div>

        ${colTab === 'photos' ? `
          <div class="grid grid-cols-2 gap-3">
            ${collections.photos.map(p => `
              <div class="glass-card rounded-3xl border border-white/10 overflow-hidden group">
                <div class="h-36 bg-black/40 relative overflow-hidden">
                  <img src="${p.src}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-3">
                  <p class="text-xs font-bold text-white truncate">${p.title}</p>
                  <p class="text-[10px] text-gray-400 font-mono mt-0.5">${p.date}</p>
                  ${p.notes ? `<p class="text-[11px] text-purple-300/90 mt-1 line-clamp-2 italic">${p.notes}</p>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="space-y-3">
            ${collections.reflections.map(r => `
              <div class="glass-card p-4 rounded-3xl border border-white/10 space-y-2">
                <div class="flex justify-between items-baseline">
                  <span class="text-[10px] font-mono uppercase text-purple-400 font-bold">Thought Capsule</span>
                  <span class="text-[10px] text-gray-500 font-mono">${r.date}</span>
                </div>
                <h4 class="text-xs font-bold text-white">“${r.prompt}”</h4>
                <p class="text-xs text-gray-300 bg-white/5 p-3 rounded-2xl border border-white/5 leading-relaxed italic">“${r.answer}”</p>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    container.querySelectorAll('.col-tab-btn').forEach(btn => {
      btn.onclick = () => { sound.playTap(); colTab = btn.getAttribute('data-tab'); render(); };
    });
    const photoInput = container.querySelector('#offline-photo-input');
    if (photoInput) {
      photoInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const title = prompt("Give this offline moment a title (e.g. 'Coffee with no phone', 'Sunset walk'):", "Offline moment");
            if (title) {
              sound.playSuccess();
              store.update(s => {
                s.collections.photos.unshift({
                  id: `photo-${Date.now()}`,
                  title: title,
                  date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  src: event.target.result,
                  notes: "Proof that you existed outside the internet."
                });
              });
              store.addXP(40, "Added photo to Offline Me capsule");
              render();
            }
          };
          reader.readAsDataURL(file);
        }
      };
    }
  }

  render();
}

// ==========================================
// 15. INSIGHTS & EYE BREAK & ACHIEVEMENTS & SETTINGS
// ==========================================
let insightPeriod = "week";
function renderInsights(container, navigateTo) {
  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Self-Awareness</span>
          <h2 class="text-2xl font-black text-white mt-0.5">Productivity Analysis 📊</h2>
          <p class="text-xs text-gray-400 mt-0.5">Evidence that your real life is steadily reclaiming territory.</p>
        </div>

        <div class="flex gap-2 p-1 rounded-2xl bg-white/5 border border-white/10">
          ${[{ id: "today", label: "Today" }, { id: "week", label: "This Week" }, { id: "month", label: "This Month" }].map(p => `
            <button class="pi-btn flex-1 py-2 rounded-xl text-xs font-bold transition-all ${insightPeriod === p.id ? 'bg-purple-500/25 text-purple-200 border border-purple-500/30' : 'text-gray-400 hover:text-white'}" data-period="${p.id}">
              ${p.label}
            </button>
          `).join('')}
        </div>

        <div class="glass-card p-5 rounded-3xl border border-purple-500/25 bg-gradient-to-r from-purple-950/30 to-pink-950/20 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">✨</span>
            <span class="text-xs font-mono uppercase text-purple-300 font-bold">Gentle Progress Insight</span>
          </div>
          <p class="text-sm font-semibold text-gray-100 leading-relaxed">
            “This week you spent <span class="text-emerald-400 font-bold">7% less time scrolling</span> and completed <span class="text-purple-300 font-bold">4 more focus sessions</span> than last week.”
          </p>
          <p class="text-xs text-gray-400 italic">Small offline moments add up to a completely different human.</p>
        </div>

        <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-4">
          <h4 class="text-xs font-mono uppercase text-gray-400 font-bold">Time Allocation Breakdown</h4>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">Social Media Scrolling</span>
                <span class="font-mono font-bold text-rose-400">${insightPeriod === 'today' ? '2.7h' : insightPeriod === 'week' ? '18.4h' : '68.2h'}</span>
              </div>
              <div class="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500" style="width: ${insightPeriod === 'today' ? '55%' : '48%'}"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">Deep Focus</span>
                <span class="font-mono font-bold text-emerald-400">${insightPeriod === 'today' ? '2.2h' : insightPeriod === 'week' ? '15.6h' : '54.0h'}</span>
              </div>
              <div class="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style="width: ${insightPeriod === 'today' ? '45%' : '42%'}"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">Self-Care & Rest</span>
                <span class="font-mono font-bold text-purple-400">${insightPeriod === 'today' ? '1.8h' : insightPeriod === 'week' ? '12.3h' : '41.5h'}</span>
              </div>
              <div class="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500" style="width: 35%"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-white/10 text-xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-gray-200">Device Integration Status</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
              ${store.get().screenTime.simulatedActive ? 'Simulated Demo Mode' : 'Manual Entry'}
            </span>
          </div>
          <p class="text-gray-400 leading-relaxed">
            On Android: connects via Digital Wellbeing UsageStats API when granted.
            On iOS: connects via DeviceActivity / FamilyControls API where authorized.
            Zero telemetry is uploaded to remote servers.
          </p>
          <button id="btn-manual-time-entry" class="mt-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-300 font-bold">
            Adjust Screen Time Manually ✍️
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll('.pi-btn').forEach(btn => {
      btn.onclick = () => { sound.playTap(); insightPeriod = btn.getAttribute('data-period'); render(); };
    });
    const mBtn = container.querySelector('#btn-manual-time-entry');
    if (mBtn) {
      mBtn.onclick = () => {
        const hours = prompt("Enter today's screen time in hours (e.g. 3.5):", "4.0");
        if (hours && !isNaN(hours)) {
          sound.playSuccess();
          const mins = Math.round(parseFloat(hours) * 60);
          store.update(s => {
            s.screenTime.totalMinutes = mins;
            s.screenTime.instagramMinutes = Math.round(mins * 0.4);
            s.screenTime.youtubeMinutes = Math.round(mins * 0.25);
            s.screenTime.simulatedActive = false;
          });
          render();
        }
      };
    }
  }

  render();
}

let eyeCountdownSec = 20;
let eyeTimerRunning = false;
let eyeTimerObj = null;
function renderEyeBreak(container, navigateTo) {
  function render() {
    container.innerHTML = `
      <div class="p-5 flex flex-col justify-between min-h-full max-w-lg mx-auto pb-28 text-center">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Ocular Sanity</span>
          <h2 class="text-2xl font-black text-white mt-0.5">Eye Break System 👁️</h2>
          <p class="text-xs text-purple-300 italic mt-1">“${EYE_BREAK_DIALOG.headline} ${EYE_BREAK_DIALOG.punchline}”</p>
        </div>

        <div class="glass-card p-6 rounded-3xl border border-purple-500/25 bg-gradient-to-b from-purple-950/25 to-black my-6 relative overflow-hidden space-y-4">
          <div class="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 ${eyeTimerRunning ? 'animate-breathe' : ''}">
            <span class="text-5xl">👀</span>
          </div>
          <h3 class="text-lg font-bold text-white">The 20-20-20 Protocol</h3>
          <p class="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
            Every 20 minutes, gaze at something at least <strong>20 feet away</strong> for <strong>20 seconds</strong>. Blink slowly 5 times.
          </p>
          <div class="p-4 rounded-2xl bg-black/50 border border-white/10 inline-block w-44 mx-auto">
            <span class="text-4xl font-mono font-black text-emerald-300">${eyeCountdownSec}s</span>
            <span class="text-[10px] font-mono text-gray-400 block mt-0.5">${eyeTimerRunning ? 'Gaze into distance...' : 'Ready to begin'}</span>
          </div>
          <div>
            <button id="btn-start-eye-timer" class="w-full py-3.5 px-6 rounded-2xl ${eyeTimerRunning ? 'bg-white/10 text-gray-300' : 'bg-gradient-to-r from-purple-500 to-emerald-400 text-white shadow-lg shadow-purple-500/25'} font-bold text-xs transition-all">
              ${eyeTimerRunning ? 'Reset Timer' : 'Start 20-Second Eye Relaxation 🧘'}
            </button>
          </div>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-white/10 text-left space-y-2">
          <span class="text-[10px] font-mono uppercase text-gray-400 font-bold block">Reminder Interval</span>
          <div class="grid grid-cols-3 gap-2">
            ${[{ min: 20, label: "Every 20m" }, { min: 30, label: "Every 30m" }, { min: 45, label: "Every 45m" }].map(intv => `
              <button class="eye-intv-btn py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${store.get().eyeBreak.intervalMinutes === intv.min ? 'bg-purple-500/20 border-purple-400 text-purple-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-min="${intv.min}">
                ${intv.label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const btn = container.querySelector('#btn-start-eye-timer');
    if (btn) {
      btn.onclick = () => {
        sound.playChime();
        eyeCountdownSec = 20;
        eyeTimerRunning = true;
        clearInterval(eyeTimerObj);
        eyeTimerObj = setInterval(() => {
          if (eyeCountdownSec <= 1) {
            clearInterval(eyeTimerObj);
            eyeTimerRunning = false;
            eyeCountdownSec = 20;
            sound.playSuccess();
            store.addXP(25, "Completed Eye Break");
            alert("Your eyes thank you for the meeting. ✨");
            render();
          } else {
            eyeCountdownSec -= 1;
            render();
          }
        }, 1000);
        render();
      };
    }
    container.querySelectorAll('.eye-intv-btn').forEach(b => {
      b.onclick = () => {
        sound.playTap();
        const m = parseInt(b.getAttribute('data-min'), 10);
        store.update(s => { s.eyeBreak.intervalMinutes = m; s.eyeBreak.secondsUntilNext = m * 60; });
        render();
      };
    });
  }

  render();
}

const BADGES = [
  { id: "social_deceased", icon: "🪦", title: "SOCIAL LIFE DECEASED", desc: "Completed your first digital detox session." },
  { id: "mysterious", icon: "🕶️", title: "MYSTERIOUS", desc: "Completed 3 offline sessions and let them wonder." },
  { id: "touch_grass", icon: "📵", title: "TOUCH GRASS", desc: "Stayed off your phone for 2+ hours in real life." },
  { id: "brain_cells", icon: "🧠", title: "BRAIN CELLS RETURNING", desc: "Completed 10 deep single-task focus sessions." },
  { id: "chef_era", icon: "🍳", title: "CHEF ERA", desc: "Cooked a real meal instead of scrolling food reels." },
  { id: "learning", icon: "📚", title: "ACTUALLY LEARNING", desc: "Dedicated real time to offline books & learning." },
  { id: "sleep", icon: "🌙", title: "GO TO SLEEP", desc: "Completed a screen-free bedtime wind-down routine." },
  { id: "real_life_gt_screen", icon: "✨", title: "REAL LIFE > SCREEN", desc: "Completed the 7-day digital reset consistency challenge." }
];

function renderAchievements(container, navigateTo) {
  const state = store.get();
  const xp = state.achievements.xp;
  const level = state.achievements.level;
  const title = store.getLevelTitle(level);
  const unlocked = state.achievements.unlockedBadges || [];

  const currentLevelFloor = (level - 1) * 200;
  const nextLevelCeil = level * 200;
  const levelXP = xp - currentLevelFloor;
  const levelReq = nextLevelCeil - currentLevelFloor;
  const percent = Math.min(100, Math.max(0, (levelXP / levelReq) * 100));

  container.innerHTML = `
    <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
      <div>
        <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">Trophies & XP</span>
        <h2 class="text-2xl font-black text-white mt-0.5">ACHIEVEMENTS 🏆</h2>
        <p class="text-xs text-gray-400 mt-0.5">Gamifying your exit from digital addiction.</p>
      </div>

      <div class="glass-card p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-black to-pink-950/20 text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-400/40 text-3xl font-black text-white mb-1">
          ${level}
        </div>
        <div>
          <span class="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">CURRENT RANK</span>
          <h3 class="text-xl font-extrabold text-white mt-0.5">${title}</h3>
          <p class="text-xs text-gray-400 mt-1">${xp} Total XP earned</p>
        </div>
        <div class="pt-2">
          <div class="flex justify-between text-[11px] font-mono text-gray-400 mb-1">
            <span>Level ${level}</span>
            <span>${levelXP} / ${levelReq} XP</span>
            <span>Level ${level + 1}</span>
          </div>
          <div class="w-full h-3 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
            <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" style="width: ${percent}%"></div>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-mono uppercase text-gray-400 font-bold">Badges Unlocked (${unlocked.length} of ${BADGES.length})</h4>
        <div class="grid grid-cols-2 gap-3">
          ${BADGES.map(b => {
            const has = unlocked.includes(b.id);
            return `
              <div class="glass-card p-4 rounded-3xl border ${has ? 'border-amber-500/30 bg-amber-950/15' : 'border-white/5 opacity-50'} space-y-2 transition-all">
                <div class="flex justify-between items-start">
                  <span class="text-3xl p-2 rounded-2xl bg-white/5 border border-white/5">${b.icon}</span>
                  <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${has ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-gray-500'}">
                    ${has ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
                <h5 class="text-xs font-bold text-white leading-snug">${b.title}</h5>
                <p class="text-[11px] text-gray-400 leading-snug">${b.desc}</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderSettings(container, navigateTo, toggleMockupWidth) {
  const state = store.get();
  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Preferences</span>
          <h2 class="text-2xl font-black text-white mt-0.5">SETTINGS & PRIVACY ⚙️</h2>
          <p class="text-xs text-gray-400 mt-0.5">You own your data. We don't even want it.</p>
        </div>

        <div class="glass-card p-5 rounded-3xl border border-emerald-500/25 bg-emerald-950/20 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">🔒</span>
            <span class="text-xs font-mono uppercase text-emerald-300 font-bold">100% Local-First Guarantee</span>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">
            FORMANUPP never sends your photos, journal entries, or screen time habits to any remote server or ad network. Everything is saved strictly in your local device browser storage.
          </p>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
          <h4 class="text-xs font-mono uppercase text-gray-400 font-bold mb-2">Preferences & Audio</h4>
          <div class="flex justify-between items-center py-1">
            <div>
              <p class="text-xs font-bold text-white">Color Theme</p>
              <p class="text-[11px] text-gray-400">Current: ${state.settings.theme === 'dark' ? 'Dark Obsidian' : 'Light Cream'}</p>
            </div>
            <button id="btn-toggle-theme" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-gray-200">
              ${state.settings.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
          <div class="flex justify-between items-center border-t border-white/5 pt-2">
            <div>
              <p class="text-xs font-bold text-white">Web Audio Clicks & Chimes</p>
              <p class="text-[11px] text-gray-400">Procedural sound effects</p>
            </div>
            <button id="btn-toggle-sound" class="px-3 py-1.5 rounded-xl border text-xs font-bold ${state.settings.soundEnabled ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-gray-400'}">
              ${state.settings.soundEnabled ? '🔊 Enabled' : '🔇 Muted'}
            </button>
          </div>
          <div class="flex justify-between items-center border-t border-white/5 pt-2">
            <div>
              <p class="text-xs font-bold text-white">Desktop Phone Bezel</p>
              <p class="text-[11px] text-gray-400">Toggle realistic phone frame on desktop</p>
            </div>
            <button id="btn-toggle-frame" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-gray-200">
              📱 Toggle Bezel
            </button>
          </div>
        </div>

        <div class="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
          <h4 class="text-xs font-mono uppercase text-gray-400 font-bold mb-1">Data Ownership</h4>
          <div class="space-y-2">
            <button id="btn-export-data" class="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2">
              <span>📥 Export All My Data (JSON Backup)</span>
            </button>
            <button id="btn-restart-onboarding" class="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-purple-300 flex items-center justify-center gap-2">
              <span>🔄 Recalibrate Mystery Slider & Onboarding</span>
            </button>
            <button id="btn-reset-data" class="w-full py-3 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-bold text-rose-300 flex items-center justify-center gap-2">
              <span>⚠️ Clear All Data & Reset App</span>
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-toggle-theme').onclick = () => {
      sound.playTap();
      const nextTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
      store.update(s => { s.settings.theme = nextTheme; });
      document.documentElement.setAttribute('data-theme', nextTheme);
      render();
    };
    container.querySelector('#btn-toggle-sound').onclick = () => {
      sound.playTap();
      const nextSound = !state.settings.soundEnabled;
      sound.setMuted(!nextSound);
      store.update(s => { s.settings.soundEnabled = nextSound; });
      render();
    };
    container.querySelector('#btn-toggle-frame').onclick = () => {
      sound.playTap();
      if (toggleMockupWidth) toggleMockupWidth();
    };
    container.querySelector('#btn-export-data').onclick = () => {
      sound.playSuccess();
      store.exportData();
    };
    container.querySelector('#btn-restart-onboarding').onclick = () => {
      sound.playTap();
      store.update(s => { s.profile.onboarded = false; });
      navigateTo('onboarding');
    };
    container.querySelector('#btn-reset-data').onclick = () => {
      if (confirm("Erase all local data, milestones, and photo capsules?")) {
        sound.playFuneral();
        store.resetAllData();
        location.reload();
      }
    };
  }

  render();
}

// ==========================================
// 16. MAIN APP ORCHESTRATOR
// ==========================================
class App {
  constructor() {
    this.currentScreen = 'home';
    this.drawerOpen = false;
    this.container = document.getElementById('screen-container');
    this.drawer = document.getElementById('side-drawer');
    this.bottomNav = document.getElementById('bottom-nav');
    this.dynamicIsland = document.getElementById('dynamic-island');
    this.toastContainer = document.getElementById('toast-container');
    this.mockupWrapper = document.getElementById('phone-wrapper');

    this.init();
  }

  init() {
    const state = store.get();
    document.documentElement.setAttribute('data-theme', state.settings.theme || 'dark');
    sound.setMuted(!state.settings.soundEnabled);

    if (!state.profile.onboarded) {
      this.currentScreen = 'onboarding';
    }

    this.bindGlobalEvents();
    this.renderCurrentScreen();
    this.startBackgroundNotificationToasts();

    store.subscribe((nextState) => {
      this.updateDynamicIsland(nextState);
      if (nextState.eyeBreak.activePrompt && this.currentScreen !== 'eye_break') {
        nextState.eyeBreak.activePrompt = false;
        this.showToast("Your eyes called. They want a meeting. 👁️", "Click here for 20-20-20 ocular reset.", () => {
          this.navigateTo('eye_break');
        });
      }
    });
  }

  navigateTo(screenName) {
    sound.playTap();
    this.currentScreen = screenName;
    this.closeDrawer();
    this.renderCurrentScreen();
    this.updateBottomNavHighlight();
  }

  renderCurrentScreen() {
    const isOb = this.currentScreen === 'onboarding';
    if (this.bottomNav) {
      this.bottomNav.style.display = isOb ? 'none' : 'flex';
    }

    switch (this.currentScreen) {
      case 'onboarding':
        renderOnboarding(this.container, () => this.navigateTo('home'));
        break;
      case 'home':
        renderHome(this.container, (s) => this.navigateTo(s));
        break;
      case 'mind':
        renderMind(this.container, (s) => this.navigateTo(s));
        break;
      case 'focus':
        renderFocus(this.container, (s) => this.navigateTo(s));
        break;
      case 'funeral':
        renderFuneral(this.container, (s) => this.navigateTo(s));
        break;
      case 'mystery':
        renderMystery(this.container, (s) => this.navigateTo(s));
        break;
      case 'reset':
        renderReset(this.container, (s) => this.navigateTo(s));
        break;
      case 'glowup':
        renderGlowUp(this.container, (s) => this.navigateTo(s));
        break;
      case 'recipes':
        renderRecipes(this.container, (s) => this.navigateTo(s));
        break;
      case 'collections':
        renderCollections(this.container, (s) => this.navigateTo(s));
        break;
      case 'insights':
        renderInsights(this.container, (s) => this.navigateTo(s));
        break;
      case 'eye_break':
        renderEyeBreak(this.container, (s) => this.navigateTo(s));
        break;
      case 'achievements':
        renderAchievements(this.container, (s) => this.navigateTo(s));
        break;
      case 'settings':
        renderSettings(this.container, (s) => this.navigateTo(s), () => this.toggleMockupWidth());
        break;
      default:
        renderHome(this.container, (s) => this.navigateTo(s));
    }

    if (this.container) this.container.scrollTop = 0;
  }

  updateBottomNavHighlight() {
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
      const target = btn.getAttribute('data-screen');
      if (target === this.currentScreen) {
        btn.classList.add('text-purple-300', 'scale-105');
        btn.classList.remove('text-gray-400');
      } else {
        btn.classList.remove('text-purple-300', 'scale-105');
        btn.classList.add('text-gray-400');
      }
    });
  }

  updateDynamicIsland(state) {
    if (!this.dynamicIsland) return;
    if (state.focus.isRunning) {
      const mins = Math.floor(state.focus.remainingSeconds / 60);
      const secs = state.focus.remainingSeconds % 60;
      this.dynamicIsland.innerHTML = `
        <span class="text-[10px] text-emerald-400 font-mono font-bold">⏱ ${mins}:${secs.toString().padStart(2, '0')}</span>
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      `;
    } else if (state.detox.inFuneral) {
      this.dynamicIsland.innerHTML = `
        <span class="text-[10px] text-rose-300 font-mono font-bold">🪦 Detox</span>
        <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
      `;
    } else if (state.mystery.active) {
      this.dynamicIsland.innerHTML = `
        <span class="text-[10px] text-purple-300 font-mono font-bold">🕶️ Ghost</span>
        <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
      `;
    } else {
      this.dynamicIsland.innerHTML = `
        <div class="w-2.5 h-2.5 rounded-full bg-stone-700"></div>
        <div class="w-2 h-2 rounded-full bg-blue-900/60"></div>
      `;
    }
  }

  showToast(title, body, onClick) {
    if (!this.toastContainer) return;
    sound.playTap();
    const toast = document.createElement('div');
    toast.className = 'glass-card p-3 rounded-2xl border border-purple-500/30 bg-black/85 shadow-xl flex items-center justify-between gap-3 text-left cursor-pointer animate-fadeIn duration-300 pointer-events-auto max-w-xs';
    toast.innerHTML = `
      <div class="flex items-center gap-2.5 flex-1">
        <span class="text-xl">🕶️</span>
        <div>
          <p class="text-xs font-bold text-white leading-tight">${title}</p>
          <p class="text-[10px] text-gray-300 leading-tight mt-0.5">${body}</p>
        </div>
      </div>
      <span class="text-xs text-purple-400">➔</span>
    `;
    toast.onclick = () => { toast.remove(); if (onClick) onClick(); };
    this.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 6000);
  }

  startBackgroundNotificationToasts() {
    setInterval(() => {
      const state = store.get();
      if (!state.settings.notificationsEnabled || this.currentScreen === 'onboarding') return;
      const randomQuote = NOTIFICATION_QUOTES[Math.floor(Math.random() * NOTIFICATION_QUOTES.length)];
      this.showToast(randomQuote.title, randomQuote.body, () => {
        showSignatureModal(() => this.navigateTo('reset'));
      });
    }, 45000);
  }

  toggleDrawer() {
    sound.playTap();
    this.drawerOpen = !this.drawerOpen;
    if (this.drawer) {
      if (this.drawerOpen) this.drawer.classList.remove('translate-x-full');
      else this.drawer.classList.add('translate-x-full');
    }
  }

  closeDrawer() {
    this.drawerOpen = false;
    if (this.drawer) this.drawer.classList.add('translate-x-full');
  }

  toggleMockupWidth() {
    if (this.mockupWrapper) this.mockupWrapper.classList.toggle('full-width');
  }

  bindGlobalEvents() {
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
      btn.onclick = () => this.navigateTo(btn.getAttribute('data-screen'));
    });
    const menuBtn = document.getElementById('top-menu-btn');
    if (menuBtn) menuBtn.onclick = () => this.toggleDrawer();
    const drawerClose = document.getElementById('drawer-close-btn');
    if (drawerClose) drawerClose.onclick = () => this.closeDrawer();
    document.querySelectorAll('.drawer-item-btn').forEach(btn => {
      btn.onclick = () => this.navigateTo(btn.getAttribute('data-screen'));
    });
    if (this.dynamicIsland) {
      this.dynamicIsland.onclick = () => showSignatureModal(() => this.navigateTo('reset'));
    }
    const logoBtn = document.getElementById('app-logo-btn');
    if (logoBtn) logoBtn.onclick = () => this.navigateTo('home');
  }
}

// Immediate robust startup hook
function startApplication() {
  try {
    if (!window.app) {
      window.app = new App();
    }
  } catch (err) {
    console.error("App startup error:", err);
    const c = document.getElementById('screen-container');
    if (c) {
      c.innerHTML = `
        <div class="p-8 text-center text-rose-400">
          <p class="font-bold">Startup Notice</p>
          <p class="text-xs mt-2 text-gray-300">${err.message}</p>
        </div>
      `;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApplication);
} else {
  startApplication();
}
