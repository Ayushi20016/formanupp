/**
 * Social Media Funeral Screen ("RIP: My Social Life")
 * Gamified digital detox feature with virtual tombstone, candle lighting, flower tributes,
 * and detox countdown timers (15m, 30m, 1h, 3h, 6h, 24h).
 */

import { store } from '../state.js';
import { sound } from '../audio.js';
import { FUNERAL_EPITAPHS } from '../quotes.js';

let funeralTimer = null;

export function renderFuneral(container, navigateTo) {
  const state = store.get();

  function formatDetoxTime(totalSec) {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hours > 0) {
      return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    }
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
        <!-- Header -->
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-gray-400 font-semibold">Gamified Detox</span>
          <h2 class="text-2xl font-black text-white mt-0.5">RIP: My Social Life 🪦</h2>
          <p class="text-xs text-gray-400 mt-1">Lay your screen addiction to rest. Your real life is waiting outside.</p>
        </div>

        <!-- The Virtual Tombstone -->
        <div class="my-6 relative flex justify-center">
          <!-- Tombstone Structure -->
          <div class="w-72 rounded-t-[70px] rounded-b-2xl bg-gradient-to-b from-stone-800 via-stone-900 to-black p-6 border-2 border-stone-700/60 shadow-2xl relative overflow-hidden text-center transition-all duration-300">
            <!-- Stone Texture subtle highlight -->
            <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

            <!-- Engraving Header -->
            <div class="pt-4 pb-2 border-b border-stone-700/60 mb-4">
              <span class="text-xs font-serif tracking-widest text-stone-400 uppercase">IN LOVING MEMORY OF</span>
              <h3 class="text-2xl font-black text-stone-200 tracking-tight font-serif mt-0.5">MY SCREEN TIME</h3>
            </div>

            <!-- Born & Last Seen -->
            <div class="space-y-1 text-xs text-stone-400 font-mono mb-4">
              <p>BORN: <span class="text-stone-300">${bornDate}</span></p>
              <p>LAST SEEN: <span class="text-stone-300">${lastSeen}</span></p>
            </div>

            <!-- Cause of Death -->
            <div class="p-2.5 rounded-xl bg-black/50 border border-stone-800 mb-4">
              <span class="text-[10px] uppercase font-mono text-stone-500 block mb-0.5">Cause of Death</span>
              <p class="text-xs font-serif italic text-rose-300/90 font-medium">“Too much scrolling.”</p>
            </div>

            <!-- Interactive Candlesticks & Flowers -->
            <div class="flex justify-around items-end pt-2 border-t border-stone-800">
              <!-- Left Candle -->
              <button id="btn-candle-1" class="flex flex-col items-center cursor-pointer group">
                <span class="text-sm ${detox.candleLit ? 'animate-candle-flame' : 'opacity-30'} transition-opacity">
                  ${detox.candleLit ? '🔥' : '🕯️'}
                </span>
                <span class="text-[10px] text-stone-400 font-mono mt-0.5">${detox.candleLit ? 'Lit' : 'Light'}</span>
              </button>

              <!-- Flower Tributes -->
              <button id="btn-add-flower" class="flex flex-col items-center cursor-pointer group">
                <span class="text-base group-hover:scale-125 transition-transform">💐</span>
                <span class="text-[10px] text-stone-400 font-mono mt-0.5">${detox.flowersCount} Tributes</span>
              </button>

              <!-- Right Candle -->
              <button id="btn-candle-2" class="flex flex-col items-center cursor-pointer group">
                <span class="text-sm ${detox.candleLit ? 'animate-candle-flame' : 'opacity-30'} transition-opacity">
                  ${detox.candleLit ? '🔥' : '🕯️'}
                </span>
                <span class="text-[10px] text-stone-400 font-mono mt-0.5">${detox.candleLit ? 'Lit' : 'Light'}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Active Detox Status OR Duration Picker -->
        ${inDetox ? `
          <!-- Active Detox Countdown -->
          <div class="glass-card p-5 rounded-3xl border border-purple-500/30 bg-purple-950/20 mb-4 space-y-2">
            <span class="text-xs font-mono uppercase text-purple-300 font-bold flex items-center justify-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Detox Session in Progress
            </span>
            <div class="text-4xl font-black text-white font-mono my-2 tracking-tight">
              ${formatDetoxTime(detox.remainingSeconds)}
            </div>
            <p class="text-xs text-purple-200/80 italic">“The internet is surviving just fine without you.”</p>

            <button id="btn-abandon-funeral" class="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-400 font-medium border border-white/5">
              End Session Early
            </button>
          </div>
        ` : `
          <!-- Detox Duration Selection -->
          <div class="space-y-3 mb-4">
            <p class="text-xs font-mono uppercase text-gray-400">Select Burial / Detox Duration</p>
            <div class="grid grid-cols-3 gap-2">
              ${[
                { min: 15, label: "15 min" },
                { min: 30, label: "30 min" },
                { min: 60, label: "1 hour" },
                { min: 180, label: "3 hours" },
                { min: 360, label: "6 hours" },
                { min: 1440, label: "24 hours" }
              ].map(opt => `
                <button class="detox-dur-btn py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all ${detox.durationMinutes === opt.min ? 'bg-stone-700/80 border-stone-500 text-stone-100 shadow-md' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-min="${opt.min}">
                  ${opt.label}
                </button>
              `).join('')}
            </div>

            <!-- Start Detox Button -->
            <button id="btn-start-funeral" class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-stone-700 via-stone-800 to-stone-900 text-stone-100 font-extrabold text-sm border border-stone-600 shadow-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span>Begin Social Media Detox 🪦</span>
            </button>
          </div>
        `}

        <!-- Stats Footer -->
        <div class="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
          <span class="text-gray-400">Detoxes Completed: <strong class="text-stone-300">${detox.sessionsCompleted}</strong></span>
          <span class="text-gray-400">Offline Time: <strong class="text-purple-300">${Math.round(detox.totalDetoxMinutes / 60)}h ${detox.totalDetoxMinutes % 60}m</strong></span>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const candle1 = container.querySelector('#btn-candle-1');
    const candle2 = container.querySelector('#btn-candle-2');
    const toggleCandle = () => {
      sound.playTap();
      store.update(s => { s.detox.candleLit = !s.detox.candleLit; });
      render();
    };
    if (candle1) candle1.onclick = toggleCandle;
    if (candle2) candle2.onclick = toggleCandle;

    const flowerBtn = container.querySelector('#btn-add-flower');
    if (flowerBtn) {
      flowerBtn.onclick = () => {
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
        store.update(s => {
          s.detox.durationMinutes = min;
          s.detox.remainingSeconds = min * 60;
        });
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
            if (window.confetti) {
              window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
            }
            store.update(s => {
              s.detox.inFuneral = false;
              s.detox.sessionsCompleted += 1;
              s.detox.totalDetoxMinutes += s.detox.durationMinutes;
              // Unlock badges
              if (!s.achievements.unlockedBadges.includes("social_deceased")) {
                s.achievements.unlockedBadges.push("social_deceased");
              }
              if (s.detox.durationMinutes >= 120 && !s.achievements.unlockedBadges.includes("touch_grass")) {
                s.achievements.unlockedBadges.push("touch_grass");
              }
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

    const abandonBtn = container.querySelector('#btn-abandon-funeral');
    if (abandonBtn) {
      abandonBtn.onclick = () => {
        sound.playTap();
        clearInterval(funeralTimer);
        store.update(s => {
          s.detox.inFuneral = false;
        });
        render();
      };
    }
  }

  render();
}
