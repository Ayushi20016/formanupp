/**
 * Reset Room (Self-Care & Digital Reset) for FORMANUPP
 * Healthy, realistic self-care across 11 categories:
 * Quick reset, Skin care, Hair care, Hygiene, Relaxation, Sleep, Movement, Journaling, Cooking, Room reset, Digital reset.
 * Strictly avoids unrealistic beauty standards, unsafe diets, or appearance-based transformations.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';

const RESET_CATEGORIES = [
  {
    id: "quick",
    name: "Quick Reset",
    emoji: "⚡",
    tasks: [
      { id: "q1", title: "Take a deep breath and drink a full glass of cold water.", time: "1 min", xp: 15 },
      { id: "q2", title: "Put your phone facedown across the room.", time: "30 sec", xp: 15 },
      { id: "q3", title: "Look out the window and spot 3 green things.", time: "1 min", xp: 15 }
    ]
  },
  {
    id: "hygiene",
    name: "Hygiene & Refresh",
    emoji: "🚿",
    tasks: [
      { id: "h1", title: "Take a warm shower and put on fresh, comfortable clothes.", time: "15 min", xp: 30 },
      { id: "h2", title: "Brush your teeth and splash cool water on your face.", time: "3 min", xp: 20 },
      { id: "h3", title: "Put on clean socks and moisturize your hands.", time: "2 min", xp: 15 }
    ]
  },
  {
    id: "skincare",
    name: "Skin & Face",
    emoji: "🧴",
    tasks: [
      { id: "s1", title: "Wash your face with gentle cleanser. No rushed rubbing.", time: "3 min", xp: 20 },
      { id: "s2", title: "Apply basic moisturizer or lip balm for hydration.", time: "1 min", xp: 15 },
      { id: "s3", title: "Rest a cool damp cloth over your closed eyes.", time: "5 min", xp: 25 }
    ]
  },
  {
    id: "movement",
    name: "Gentle Movement",
    emoji: "🧘",
    tasks: [
      { id: "m1", title: "Stretch your neck, shoulders, and spine after sitting.", time: "4 min", xp: 20 },
      { id: "m2", title: "Take a 10-minute screen-free walk outside.", time: "10 min", xp: 35 },
      { id: "m3", title: "Shake out your hands and wrists from holding the phone.", time: "1 min", xp: 15 }
    ]
  },
  {
    id: "room",
    name: "Room & Space",
    emoji: "🪴",
    tasks: [
      { id: "r1", title: "Clean your desk surface for 5 minutes. Throw away trash.", time: "5 min", xp: 25 },
      { id: "r2", title: "Make your bed so your space feels peaceful tonight.", time: "2 min", xp: 20 },
      { id: "r3", title: "Open a window to let fresh outdoor air into the room.", time: "1 min", xp: 15 }
    ]
  },
  {
    id: "digital",
    name: "Digital Reset",
    emoji: "📵",
    tasks: [
      { id: "d1", title: "Turn on 'Do Not Disturb' mode for the next hour.", time: "1 min", xp: 25 },
      { id: "d2", title: "Unfollow 3 accounts that make you feel anxious or inferior.", time: "3 min", xp: 30 },
      { id: "d3", title: "Delete or hide 1 app that eats up all your free time.", time: "2 min", xp: 35 }
    ]
  },
  {
    id: "sleep",
    name: "Sleep & Wind-Down",
    emoji: "🌙",
    tasks: [
      { id: "sl1", title: "Charge your phone outside of arm's reach from bed.", time: "1 min", xp: 30 },
      { id: "sl2", title: "Dim bright overhead lights 30 minutes before sleep.", time: "1 min", xp: 20 },
      { id: "sl3", title: "Listen to rainfall audio with eyes closed.", time: "10 min", xp: 25 }
    ]
  },
  {
    id: "journaling",
    name: "Journaling",
    emoji: "✍️",
    tasks: [
      { id: "j1", title: "Write down 3 real things you are grateful for today.", time: "3 min", xp: 20 },
      { id: "j2", title: "Brain dump everything bothering you onto scrap paper.", time: "5 min", xp: 25 }
    ]
  },
  {
    id: "cooking",
    name: "Cooking & Fuel",
    emoji: "🍳",
    tasks: [
      { id: "c1", title: "Cook a real 10-minute warm meal instead of scrolling.", time: "10 min", xp: 40 },
      { id: "c2", title: "Eat something nourishing slowly without looking at a screen.", time: "15 min", xp: 35 }
    ]
  }
];

let activeTab = "quick";

export function renderReset(container, navigateTo) {
  const state = store.get();
  const completed = state.resetRoom.completedTasks || {};

  function render() {
    const currentCategory = RESET_CATEGORIES.find(c => c.id === activeTab) || RESET_CATEGORIES[0];
    const totalDone = Object.values(completed).filter(Boolean).length;

    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <!-- Header -->
        <div class="flex justify-between items-start">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Self-Care Sanity</span>
            <h2 class="text-2xl font-black text-white mt-0.5">Reset Room ✨</h2>
            <p class="text-xs text-gray-400 mt-0.5">Realistic, non-toxic resets to bring you back to life.</p>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
            ${totalDone} Completed
          </span>
        </div>

        <!-- Horizontal Category Pills -->
        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${RESET_CATEGORIES.map(cat => `
            <button class="reset-cat-btn flex-shrink-0 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === cat.id ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-cat="${cat.id}">
              <span>${cat.emoji}</span>
              <span>${cat.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Active Category Task List -->
        <div class="space-y-3">
          ${currentCategory.tasks.map(task => {
            const isDone = !!completed[task.id];
            return `
              <div class="glass-card p-4 rounded-3xl border ${isDone ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-white/10'} flex items-center justify-between gap-3 transition-all">
                <div class="flex items-start gap-3 flex-1">
                  <button class="task-checkbox-btn mt-0.5 w-6 h-6 rounded-xl border flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-white/20 bg-white/5 hover:border-emerald-400'}" data-tid="${task.id}" data-xp="${task.xp}">
                    ${isDone ? '✓' : ''}
                  </button>
                  <div>
                    <p class="text-xs font-semibold ${isDone ? 'text-gray-400 line-through' : 'text-gray-100'} leading-snug">
                      ${task.title}
                    </p>
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

        <!-- Real-Life Glow Up Teaser -->
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

    bindEvents();
  }

  function bindEvents() {
    container.querySelectorAll('.reset-cat-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        activeTab = btn.getAttribute('data-cat');
        render();
      };
    });

    container.querySelectorAll('.task-checkbox-btn').forEach(btn => {
      btn.onclick = () => {
        const tid = btn.getAttribute('data-tid');
        const xp = parseInt(btn.getAttribute('data-xp'), 10);
        const wasDone = !!completed[tid];

        if (!wasDone) {
          sound.playSuccess();
          store.update(s => {
            s.resetRoom.completedTasks[tid] = true;
          });
          store.addXP(xp, "Reset room task completed");
        } else {
          sound.playTap();
          store.update(s => {
            delete s.resetRoom.completedTasks[tid];
          });
        }
        render();
      };
    });

    const glowBtn = container.querySelector('#btn-open-glowup');
    if (glowBtn) {
      glowBtn.onclick = () => {
        sound.playTap();
        navigateTo('glowup');
      };
    }
  }

  render();
}
