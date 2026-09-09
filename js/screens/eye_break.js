/**
 * Eye Break System for FORMANUPP
 * “Your eyes called. They want a meeting.”
 * 20-20-20 rule interactive timer and guided ocular relaxation.
 * No medical diagnoses or claims.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';
import { EYE_BREAK_DIALOG } from '../quotes.js';

let eyeInterval = null;

export function renderEyeBreak(container, navigateTo) {
  const state = store.get();
  let countdownActive = false;
  let countdownSec = 20;

  function render() {
    container.innerHTML = `
      <div class="p-5 flex flex-col justify-between min-h-full max-w-lg mx-auto pb-28 text-center">
        <!-- Header -->
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Ocular Sanity</span>
          <h2 class="text-2xl font-black text-white mt-0.5">Eye Break System 👁️</h2>
          <p class="text-xs text-purple-300 italic mt-1">“${EYE_BREAK_DIALOG.headline} ${EYE_BREAK_DIALOG.punchline}”</p>
        </div>

        <!-- Central 20-20-20 Interactive Eye Guide -->
        <div class="glass-card p-6 rounded-3xl border border-purple-500/25 bg-gradient-to-b from-purple-950/25 to-black my-6 relative overflow-hidden space-y-4">
          <div class="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 ${countdownActive ? 'animate-breathe' : ''}">
            <span class="text-5xl">👀</span>
          </div>

          <h3 class="text-lg font-bold text-white">The 20-20-20 Protocol</h3>
          <p class="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
            Every 20 minutes, look at an object at least <strong>20 feet away</strong> for <strong>20 seconds</strong>. Blink slowly and release the tension around your temples.
          </p>

          <!-- 20-Second Countdown Circle -->
          <div class="p-4 rounded-2xl bg-black/50 border border-white/10 inline-block w-44 mx-auto">
            <span class="text-4xl font-mono font-black text-emerald-300">${countdownSec}s</span>
            <span class="text-[10px] font-mono text-gray-400 block mt-0.5">
              ${countdownActive ? 'Gaze into the distance...' : 'Ready to begin'}
            </span>
          </div>

          <div>
            <button id="btn-start-eye-timer" class="w-full py-3.5 px-6 rounded-2xl ${countdownActive ? 'bg-white/10 text-gray-300' : 'bg-gradient-to-r from-purple-500 to-emerald-400 text-white shadow-lg shadow-purple-500/25'} font-bold text-xs transition-all">
              ${countdownActive ? 'Reset 20s Timer' : 'Start 20-Second Eye Relaxation 🧘'}
            </button>
          </div>
        </div>

        <!-- Interval Config -->
        <div class="glass-card p-4 rounded-3xl border border-white/10 text-left space-y-2">
          <span class="text-[10px] font-mono uppercase text-gray-400 font-bold block">Reminder Interval</span>
          <div class="grid grid-cols-3 gap-2">
            ${[
              { min: 20, label: "Every 20m" },
              { min: 30, label: "Every 30m" },
              { min: 45, label: "Every 45m" }
            ].map(intv => `
              <button class="interval-btn py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${state.eyeBreak.intervalMinutes === intv.min ? 'bg-purple-500/20 border-purple-400 text-purple-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-min="${intv.min}">
                ${intv.label}
              </button>
            `).join('')}
          </div>
        </div>

        <p class="text-[10px] text-gray-500 mt-4 italic">
          FORMANUPP does not provide medical diagnoses or optical advice. Just a friendly reminder to stop burning your retinas with blue light.
        </p>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const timerBtn = container.querySelector('#btn-start-eye-timer');
    if (timerBtn) {
      timerBtn.onclick = () => {
        sound.playChime();
        countdownSec = 20;
        countdownActive = true;
        clearInterval(eyeInterval);

        eyeInterval = setInterval(() => {
          if (countdownSec <= 1) {
            clearInterval(eyeInterval);
            countdownActive = false;
            countdownSec = 20;
            sound.playSuccess();
            store.addXP(25, "Completed Eye Break");
            alert("Your eyes thank you for the meeting. ✨");
            render();
          } else {
            countdownSec -= 1;
            render();
          }
        }, 1000);

        render();
      };
    }

    container.querySelectorAll('.interval-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        const m = parseInt(btn.getAttribute('data-min'), 10);
        store.update(s => {
          s.eyeBreak.intervalMinutes = m;
          s.eyeBreak.secondsUntilNext = m * 60;
        });
        render();
      };
    });
  }

  render();
}
