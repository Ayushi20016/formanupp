/**
 * Real-Life Glow Up Screen for FORMANUPP
 * Focuses strictly on internal wellbeing, habits, sleep, hobbies, and digital detox.
 * 7-Day Consistency Journey with zero toxic beauty or body standards.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';

const GLOW_DAYS = [
  {
    day: 1,
    title: "Clean your space.",
    desc: "Declutter your immediate physical surroundings. Make your room feel like a sanctuary, not an office.",
    xp: 50,
    emoji: "🧹"
  },
  {
    day: 2,
    title: "Try a new recipe.",
    desc: "Cook something warm with your hands instead of ordering delivery or watching food videos.",
    xp: 60,
    emoji: "🍳"
  },
  {
    day: 3,
    title: "Take a screen-free walk.",
    desc: "Leave your phone at home or deep in a zipped pocket. Look at actual trees and architecture.",
    xp: 50,
    emoji: "🌲"
  },
  {
    day: 4,
    title: "Journal your thoughts.",
    desc: "Put pen to paper. Brain dump without expecting an audience to validate it.",
    xp: 50,
    emoji: "✍️"
  },
  {
    day: 5,
    title: "Learn something new.",
    desc: "Read 15 pages of a real physical book or practice an offline skill (guitar, drawing, language).",
    xp: 60,
    emoji: "📚"
  },
  {
    day: 6,
    title: "Do a relaxing self-care routine.",
    desc: "Warm bath or shower, clean clothes, stretch your spine, dim the lights early.",
    xp: 50,
    emoji: "🛁"
  },
  {
    day: 7,
    title: "Have a completely offline hour.",
    desc: "No screens, no notifications, no smartwatch. 60 minutes of pure 3D reality.",
    xp: 100,
    emoji: "✨"
  }
];

export function renderGlowUp(container, navigateTo) {
  const state = store.get();
  const completedDays = state.glowUp.completedDays || [];

  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <!-- Header -->
        <div class="flex items-center gap-2">
          <button id="btn-back-reset" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs">
            ◀ Back
          </button>
          <div>
            <h2 class="text-xl font-black text-white">REAL-LIFE GLOW UP ✨</h2>
            <p class="text-[11px] text-pink-300">Consistent habits > Unrealistic aesthetics</p>
          </div>
        </div>

        <!-- Philosophy Card -->
        <div class="glass-card p-4 rounded-3xl border border-pink-500/20 bg-pink-950/20 text-xs leading-relaxed text-gray-300">
          <p class="font-bold text-pink-200 mb-1">What Glow-Up means here:</p>
          <p>Sleeping deeper, taking care of your nervous system, learning, having offline hobbies, and disappearing from the algorithm's control.</p>
        </div>

        <!-- 7-Day Timeline -->
        <div class="space-y-3">
          ${GLOW_DAYS.map(g => {
            const isCompleted = completedDays.includes(g.day);
            return `
              <div class="glass-card p-4 rounded-3xl border ${isCompleted ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-white/10'} flex items-start justify-between gap-3 transition-all">
                <div class="flex items-start gap-3 flex-1">
                  <span class="text-2xl p-2 rounded-2xl bg-white/5 border border-white/5">${g.emoji}</span>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono uppercase text-purple-400 font-bold">DAY ${g.day}</span>
                      ${isCompleted ? '<span class="text-[10px] text-emerald-400 font-bold font-mono">COMPLETED ✓</span>' : ''}
                    </div>
                    <h3 class="text-sm font-bold text-white mt-0.5">${g.title}</h3>
                    <p class="text-xs text-gray-400 mt-1 leading-snug">${g.desc}</p>
                    <span class="inline-block text-[10px] text-emerald-400 font-mono font-bold mt-2">+${g.xp} XP</span>
                  </div>
                </div>

                <button class="glow-toggle-btn mt-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${isCompleted ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/10 border-white/15 text-white hover:bg-white/20'}" data-day="${g.day}" data-xp="${g.xp}">
                  ${isCompleted ? 'Undo' : 'Complete'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const backBtn = container.querySelector('#btn-back-reset');
    if (backBtn) {
      backBtn.onclick = () => {
        sound.playTap();
        navigateTo('reset');
      };
    }

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
              if (!s.achievements.unlockedBadges.includes("real_life_gt_screen")) {
                s.achievements.unlockedBadges.push("real_life_gt_screen");
              }
            }
          });
          store.addXP(xp, `Completed Glow Up Day ${day}`);
        } else {
          sound.playTap();
          store.update(s => {
            s.glowUp.completedDays = s.glowUp.completedDays.filter(d => d !== day);
          });
        }
        render();
      };
    });
  }

  render();
}
