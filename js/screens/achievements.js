/**
 * Achievements & XP Gamification Screen for FORMANUPP
 * Tracks player level (Level 1 "Screen Zombie" to Level 10 "Transcendent Offline Being"),
 * XP progress, streaks, and witty badges.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';

const BADGES_DEFINITIONS = [
  {
    id: "social_deceased",
    icon: "🪦",
    title: "SOCIAL LIFE DECEASED",
    desc: "Completed your first digital detox session without checking Instagram.",
    xpReward: 150
  },
  {
    id: "mysterious",
    icon: "🕶️",
    title: "MYSTERIOUS",
    desc: "Completed 3 offline sessions and let people wonder where you went.",
    xpReward: 100
  },
  {
    id: "touch_grass",
    icon: "📵",
    title: "TOUCH GRASS",
    desc: "Stayed off your device for 2+ consecutive hours in 3D reality.",
    xpReward: 200
  },
  {
    id: "brain_cells",
    icon: "🧠",
    title: "BRAIN CELLS RETURNING",
    desc: "Completed 10 deep single-task focus sessions.",
    xpReward: 250
  },
  {
    id: "chef_era",
    icon: "🍳",
    title: "CHEF ERA",
    desc: "Cooked a real meal instead of scrolling food videos.",
    xpReward: 150
  },
  {
    id: "learning",
    icon: "📚",
    title: "ACTUALLY LEARNING",
    desc: "Dedicated real time to offline books and skills.",
    xpReward: 180
  },
  {
    id: "sleep",
    icon: "🌙",
    title: "GO TO SLEEP",
    desc: "Completed a screen-free bedtime wind-down routine.",
    xpReward: 120
  },
  {
    id: "real_life_gt_screen",
    icon: "✨",
    title: "REAL LIFE > SCREEN",
    desc: "Completed the full 7-day digital reset consistency challenge.",
    xpReward: 300
  }
];

export function renderAchievements(container, navigateTo) {
  const state = store.get();
  const xp = state.achievements.xp;
  const level = state.achievements.level;
  const title = store.getLevelTitle(level);
  const unlocked = state.achievements.unlockedBadges || [];

  // XP needed for next level: level * 200
  const currentLevelFloor = (level - 1) * 200;
  const nextLevelCeil = level * 200;
  const levelXP = xp - currentLevelFloor;
  const levelReq = nextLevelCeil - currentLevelFloor;
  const percent = Math.min(100, Math.max(0, (levelXP / levelReq) * 100));

  container.innerHTML = `
    <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
      <!-- Header -->
      <div>
        <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">Trophies & XP</span>
        <h2 class="text-2xl font-black text-white mt-0.5">ACHIEVEMENTS 🏆</h2>
        <p class="text-xs text-gray-400 mt-0.5">Gamifying your exit from digital addiction.</p>
      </div>

      <!-- Level & Rank Card -->
      <div class="glass-card p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-black to-pink-950/20 text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-400/40 text-3xl font-black text-white mb-1">
          ${level}
        </div>
        <div>
          <span class="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">CURRENT RANK</span>
          <h3 class="text-xl font-extrabold text-white mt-0.5">${title}</h3>
          <p class="text-xs text-gray-400 mt-1">${xp} Total XP earned</p>
        </div>

        <!-- Progress bar to next rank -->
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

      <!-- Badges Grid -->
      <div class="space-y-3">
        <h4 class="text-xs font-mono uppercase text-gray-400 font-bold">Badges Unlocked (${unlocked.length} of ${BADGES_DEFINITIONS.length})</h4>

        <div class="grid grid-cols-2 gap-3">
          ${BADGES_DEFINITIONS.map(badge => {
            const hasIt = unlocked.includes(badge.id);
            return `
              <div class="glass-card p-4 rounded-3xl border ${hasIt ? 'border-amber-500/30 bg-amber-950/15' : 'border-white/5 opacity-50'} space-y-2 transition-all">
                <div class="flex justify-between items-start">
                  <span class="text-3xl p-2 rounded-2xl bg-white/5 border border-white/5">${badge.icon}</span>
                  <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${hasIt ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-gray-500'}">
                    ${hasIt ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
                <h5 class="text-xs font-bold text-white leading-snug">${badge.title}</h5>
                <p class="text-[11px] text-gray-400 leading-snug">${badge.desc}</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
