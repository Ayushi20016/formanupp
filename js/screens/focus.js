/**
 * Focus Mode Screen for FORMANUPP
 * Single-tasking focus timer (25 min, 50 min, 90 min, custom)
 * "ONE THING. Not twelve things. One."
 * "Look at you actually doing things."
 */

import { store } from '../state.js';
import { sound } from '../audio.js';
import { FOCUS_PUNCHLINES } from '../quotes.js';

let timerInterval = null;

export function renderFocus(container, navigateTo) {
  const state = store.get();

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
        <!-- Top Bar -->
        <div class="text-center">
          <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Zen Tunnel</span>
          <h2 class="text-2xl font-black text-white mt-0.5">Focus Mode ⏱️</h2>
          <p class="text-xs text-purple-300 italic mt-1 font-medium">“${FOCUS_PUNCHLINES.start}”</p>
        </div>

        <!-- Task Input Commitment -->
        <div class="glass-card p-4 rounded-3xl border border-white/10 mt-4">
          <label class="text-[10px] font-mono uppercase text-gray-400 block mb-1.5">My Single Target Task</label>
          <input type="text" id="focus-task-input" value="${focusState.task}" ${isRunning ? 'disabled' : ''} class="w-full p-3 rounded-2xl bg-black/40 border border-white/10 text-sm font-semibold text-emerald-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all" placeholder="What one thing are you conquering?">
        </div>

        <!-- Central Timer Circle & Breathing Ring -->
        <div class="my-8 flex flex-col items-center justify-center relative">
          <div class="relative w-64 h-64 flex items-center justify-center">
            <!-- Ambient Breathing Ring -->
            <div class="absolute inset-0 rounded-full border-2 border-emerald-500/20 ${isRunning ? 'animate-pulse-ring' : ''}"></div>
            <div class="absolute inset-2 rounded-full border border-emerald-400/10 ${isRunning ? 'animate-breathe' : ''}"></div>

            <!-- SVG Circular Progress -->
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

            <!-- Countdown Display -->
            <div class="absolute flex flex-col items-center justify-center text-center">
              <span class="text-5xl font-black tracking-tight text-white font-mono">${formatTime(remaining)}</span>
              <span class="text-xs text-gray-400 mt-2 font-mono uppercase">${isRunning ? 'Deep in session' : 'Ready when you are'}</span>
            </div>
          </div>
        </div>

        <!-- Duration Selection Pills (Disabled while running) -->
        <div class="flex justify-center gap-2 mb-6">
          ${[
            { min: 25, label: "25 min" },
            { min: 50, label: "50 min" },
            { min: 90, label: "90 min" }
          ].map(d => `
            <button class="dur-btn px-4 py-2 rounded-full border text-xs font-bold transition-all ${focusState.mode === d.min ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'} ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}" data-min="${d.min}">
              ${d.label}
            </button>
          `).join('')}
          <button id="btn-custom-focus" class="px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 hover:bg-white/10 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}">
            Custom
          </button>
        </div>

        <!-- Controls -->
        <div class="space-y-3">
          <button id="btn-toggle-focus" class="w-full py-4 px-6 rounded-2xl ${isRunning ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30' : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-600 text-white shadow-xl shadow-emerald-500/20 hover:opacity-95'} font-extrabold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>${isRunning ? 'Pause Focus Session ⏸' : 'Lock In & Start Session 🚀'}</span>
          </button>

          ${isRunning ? `
            <button id="btn-cancel-focus" class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-400 font-semibold border border-white/5 transition-all">
              Cancel Session (No Judgment)
            </button>
          ` : ''}

          <!-- Streaks & History -->
          <div class="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
            <span class="text-gray-400">Completed today: <strong class="text-emerald-300">${focusState.completedToday}</strong></span>
            <span class="text-gray-400">Daily Streak: <strong class="text-purple-300">🔥 ${focusState.streakDays} days</strong></span>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const taskInput = container.querySelector('#focus-task-input');
    if (taskInput) {
      taskInput.onchange = (e) => {
        store.update(s => {
          s.focus.task = e.target.value;
        });
      };
    }

    container.querySelectorAll('.dur-btn').forEach(btn => {
      btn.onclick = () => {
        if (store.get().focus.isRunning) return;
        sound.playTap();
        const min = parseInt(btn.getAttribute('data-min'), 10);
        store.update(s => {
          s.focus.mode = min;
          s.focus.remainingSeconds = min * 60;
        });
        render();
      };
    });

    const customBtn = container.querySelector('#btn-custom-focus');
    if (customBtn) {
      customBtn.onclick = () => {
        if (store.get().focus.isRunning) return;
        const entered = prompt("Enter focus duration in minutes (e.g. 15, 45, 60):", "45");
        if (entered && !isNaN(entered) && parseInt(entered) > 0) {
          const min = parseInt(entered);
          sound.playTap();
          store.update(s => {
            s.focus.mode = min;
            s.focus.remainingSeconds = min * 60;
          });
          render();
        }
      };
    }

    const toggleBtn = container.querySelector('#btn-toggle-focus');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        const currentRunning = store.get().focus.isRunning;
        if (currentRunning) {
          // Pause
          sound.playTap();
          clearInterval(timerInterval);
          store.update(s => { s.focus.isRunning = false; });
          render();
        } else {
          // Start
          sound.playChime();
          store.update(s => { s.focus.isRunning = true; });
          clearInterval(timerInterval);
          timerInterval = setInterval(() => {
            const f = store.get().focus;
            if (f.remainingSeconds <= 1) {
              clearInterval(timerInterval);
              sound.playSuccess();
              // Trigger confetti
              if (window.confetti) {
                window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              }
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
        store.update(s => {
          s.focus.isRunning = false;
          s.focus.remainingSeconds = s.focus.mode * 60;
        });
        render();
      };
    }
  }

  render();
}
