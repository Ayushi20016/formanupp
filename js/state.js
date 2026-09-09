/**
 * Central Reactive State Store for FORMANUPP
 * Provides reactive event triggers, localStorage persistence, simulation tickers, and data export.
 */

const STORAGE_KEY = "FORMANUPP_APP_STATE_V1";

const DEFAULT_STATE = {
  profile: {
    name: "Becoming Myself",
    onboarded: false,
    mysteryLevel: 65, // 0 - 100%
    goals: ["Digital detox", "Focus", "Self-care"],
    problems: ["Doomscrolling", "Instagram", "Checking my phone every few minutes"],
    idealDay: "Quiet creative mornings, deep flow, evening walk with no phone.",
    morningVibe: "mysterious"
  },
  screenTime: {
    totalMinutes: 261, // 4h 21m
    instagramMinutes: 102, // 1h 42m
    youtubeMinutes: 58, // 58m
    tiktokMinutes: 45,
    focusMinutes: 130, // 2h 10m
    pickups: 64,
    longestSessionMinutes: 48,
    breaksTaken: 5,
    simulatedActive: true,
    manualMode: false
  },
  focus: {
    mode: 25, // 25, 50, 90, custom
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
    completedTasks: {
      "quick-1": true,
      "skin-1": true,
      "hygiene-1": true
    }
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
    } catch (e) {
      console.warn("Failed to load state from localStorage", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to save state to localStorage", e);
    }
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
      try {
        fn(this.state);
      } catch (err) {
        console.error("Listener error:", err);
      }
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
    // Level formula: level = Math.floor(xp / 200) + 1
    const newLevel = Math.floor(this.state.achievements.xp / 200) + 1;
    const leveledUp = newLevel > this.state.achievements.level;
    this.state.achievements.level = newLevel;
    this.save();
    return { leveledUp, newLevel, xp: this.state.achievements.xp };
  }

  getLevelTitle(level) {
    const titles = [
      "Screen Zombie",
      "Awakening Human",
      "Casual Ghost",
      "Low-Profile Enigma",
      "Main Character in Training",
      "Digital Phantom",
      "Real-Life Alchemist",
      "Serene Disappearer",
      "Master of Solitude",
      "Transcendent Offline Being"
    ];
    return titles[Math.min(level - 1, titles.length - 1)] || "Legend";
  }

  initSimulation() {
    // Ticks every 5 seconds to simulate subtle real-time screen habits & timers
    setInterval(() => {
      let changed = false;

      // Eye break timer countdown
      if (this.state.eyeBreak.secondsUntilNext > 0) {
        this.state.eyeBreak.secondsUntilNext -= 5;
        if (this.state.eyeBreak.secondsUntilNext <= 0) {
          this.state.eyeBreak.activePrompt = true;
          changed = true;
        }
      }

      // Focus timer countdown
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

      // Funeral detox timer countdown
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

      // Mystery mode seconds tracker
      if (this.state.mystery.active) {
        this.state.mystery.elapsedSeconds += 5;
        changed = true;
      }

      // Simulated screen time slow live creep if simulation is on
      if (this.state.screenTime.simulatedActive && !this.state.focus.isRunning && !this.state.detox.inFuneral && !this.state.mystery.active) {
        // Occasionally increment pickups or subtle scroll minutes
        if (Math.random() < 0.1) {
          this.state.screenTime.totalMinutes += 1;
          if (Math.random() < 0.6) {
            this.state.screenTime.instagramMinutes += 1;
          } else {
            this.state.screenTime.youtubeMinutes += 1;
          }
          changed = true;
        }
      }

      if (changed) {
        this.notify();
      }
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
    localStorage.removeItem(STORAGE_KEY);
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
  }
}

export const store = new Store();
