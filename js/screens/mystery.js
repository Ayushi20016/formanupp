/**
 * Mystery Mode Screen (🕶️) for FORMANUPP
 * "You have entered your mysterious era."
 * Tracks offline elapsed time, procedural lo-fi ambient audio, and tactical ghosting advice.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';

export function renderMystery(container, navigateTo) {
  const state = store.get();

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
        <!-- Header -->
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Ghost Protocol</span>
          <h2 class="text-2xl font-black text-white mt-0.5">MYSTERY MODE 🕶️</h2>
          <p class="text-xs text-gray-400 mt-1">Leave no trace. Let them wonder what version of you is loading.</p>
        </div>

        <!-- Central Mystery Era Card -->
        <div class="glass-card p-6 rounded-3xl border border-purple-500/25 bg-gradient-to-b from-purple-950/30 to-black/80 my-6 relative overflow-hidden">
          <div class="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 mb-4 ${isActive ? 'animate-pulse-ring' : ''}">
            <span class="text-5xl">🕶️</span>
          </div>

          <h3 class="text-lg font-black text-white mb-1">
            ${isActive ? '“You have entered your mysterious era.”' : 'Ready to disappear for a while?'}
          </h3>

          <p class="text-xs text-purple-300/80 mb-6 italic">
            ${isActive ? 'Digitally quiet. Physical life in full focus.' : 'Turn down the noise. Turn up your presence.'}
          </p>

          <!-- Live Stopwatch -->
          <div class="p-4 rounded-2xl bg-black/60 border border-white/10 mb-6">
            <span class="text-[10px] uppercase font-mono text-gray-400 block mb-1">Time Spent Digitally Quiet</span>
            <span class="text-4xl font-mono font-black text-emerald-300">${formatElapsed(mystery.elapsedSeconds)}</span>
          </div>

          <!-- Activate / Deactivate Button -->
          <button id="btn-toggle-mystery" class="w-full py-3.5 px-6 rounded-2xl ${isActive ? 'bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30' : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-xl shadow-purple-500/25 hover:opacity-95'} font-extrabold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>${isActive ? 'Exit Mysterious Era 🕊️' : 'Activate Mysterious Era 🕶️'}</span>
          </button>
        </div>

        <!-- Ambient Sound Generator Controls -->
        <div class="glass-card p-4 rounded-3xl border border-white/10 mb-6 text-left">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-mono uppercase text-gray-400 font-semibold flex items-center gap-1.5">
              <span>🎧</span> Ambient Offline Soundscape
            </span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">Web Audio</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            ${[
              { id: "rain", label: "🌧️ Rain", desc: "Gentle pink noise" },
              { id: "lofi", label: "📻 Vinyl", desc: "Lo-fi crackle" },
              { id: "whitenoise", label: "💨 Wind", desc: "White focus noise" }
            ].map(snd => `
              <button class="sound-btn p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${mystery.ambientSound === snd.id && isActive ? 'bg-purple-500/20 border-purple-400 text-purple-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-snd="${snd.id}">
                ${snd.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Tactical Advice Deck -->
        <div class="glass-card p-4 rounded-3xl border border-white/10 text-left space-y-2">
          <p class="text-[10px] font-mono uppercase text-purple-400 font-bold">Mystery Mode Playbook</p>
          <div class="space-y-1.5 text-xs text-gray-300">
            <div class="flex items-start gap-2">
              <span class="text-purple-400">•</span>
              <span><strong>Mute non-essential notifications:</strong> The world will not collapse if you reply in 3 hours.</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-purple-400">•</span>
              <span><strong>Take a break from posting stories:</strong> Experience something without showing the audience.</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-purple-400">•</span>
              <span><strong>Hide social icons:</strong> Move Instagram & TikTok to an obscure folder off your home screen.</span>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const toggleBtn = container.querySelector('#btn-toggle-mystery');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        const currentlyActive = store.get().mystery.active;
        if (currentlyActive) {
          sound.playTap();
          sound.stopAmbient();
          store.update(s => { s.mystery.active = false; });
          render();
        } else {
          sound.playSuccess();
          store.update(s => {
            s.mystery.active = true;
            s.mystery.startedAt = Date.now();
          });
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
        if (store.get().mystery.active) {
          sound.startAmbient(sndType);
        }
        render();
      };
    });
  }

  render();
}
