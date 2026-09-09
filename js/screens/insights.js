/**
 * Productivity Analysis & Screen Time Insights for FORMANUPP
 * Visual trend charts for Today, This Week, This Month.
 * Natural language positive insights. Zero judgmental wording.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';

let activePeriod = "week"; // "today", "week", "month"

export function renderInsights(container, navigateTo) {
  const state = store.get();

  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <!-- Header -->
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Self-Awareness</span>
          <h2 class="text-2xl font-black text-white mt-0.5">Productivity Analysis 📊</h2>
          <p class="text-xs text-gray-400 mt-0.5">Evidence that your real life is steadily reclaiming territory.</p>
        </div>

        <!-- Period Toggle -->
        <div class="flex gap-2 p-1 rounded-2xl bg-white/5 border border-white/10">
          ${[
            { id: "today", label: "Today" },
            { id: "week", label: "This Week" },
            { id: "month", label: "This Month" }
          ].map(p => `
            <button class="period-tab-btn flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activePeriod === p.id ? 'bg-purple-500/25 text-purple-200 border border-purple-500/30' : 'text-gray-400 hover:text-white'}" data-period="${p.id}">
              ${p.label}
            </button>
          `).join('')}
        </div>

        <!-- Natural-Language AI Insight Card -->
        <div class="glass-card p-5 rounded-3xl border border-purple-500/25 bg-gradient-to-r from-purple-950/30 to-pink-950/20 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">✨</span>
            <span class="text-xs font-mono uppercase text-purple-300 font-bold">Gentle Progress Insight</span>
          </div>
          <p class="text-sm font-semibold text-gray-100 leading-relaxed">
            “This week you spent <span class="text-emerald-400 font-bold">7% less time scrolling</span> and completed <span class="text-purple-300 font-bold">4 more focus sessions</span> than last week.”
          </p>
          <p class="text-xs text-gray-400 italic">
            You don't need a total life overhaul. Small offline moments add up to a completely different human.
          </p>
        </div>

        <!-- Visual Bar Chart Component -->
        <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-4">
          <div class="flex justify-between items-baseline">
            <h4 class="text-xs font-mono uppercase text-gray-400 font-bold">Time Allocation Breakdown</h4>
            <span class="text-xs text-gray-500 font-mono">Hours logged</span>
          </div>

          <div class="space-y-3">
            <!-- Screen Time Bar -->
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">Social Media Scrolling</span>
                <span class="font-mono font-bold text-rose-400">${activePeriod === 'today' ? '2.7h' : activePeriod === 'week' ? '18.4h' : '68.2h'}</span>
              </div>
              <div class="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500" style="width: ${activePeriod === 'today' ? '55%' : '48%'}"></div>
              </div>
            </div>

            <!-- Focus Time Bar -->
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">Deep Focus (One Task)</span>
                <span class="font-mono font-bold text-emerald-400">${activePeriod === 'today' ? '2.2h' : activePeriod === 'week' ? '15.6h' : '54.0h'}</span>
              </div>
              <div class="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style="width: ${activePeriod === 'today' ? '45%' : '42%'}"></div>
              </div>
            </div>

            <!-- Self-Care & Offline Bar -->
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-300">Self-Care & Rest</span>
                <span class="font-mono font-bold text-purple-400">${activePeriod === 'today' ? '1.8h' : activePeriod === 'week' ? '12.3h' : '41.5h'}</span>
              </div>
              <div class="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500" style="width: 35%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trends Grid -->
        <div class="grid grid-cols-2 gap-3">
          <div class="glass-card p-4 rounded-3xl border border-white/10">
            <span class="text-[10px] font-mono uppercase text-gray-400 block mb-1">Scroll Drop</span>
            <span class="text-2xl font-black text-emerald-400">- 42 min</span>
            <p class="text-[11px] text-gray-400 mt-1">Average daily reduction</p>
          </div>
          <div class="glass-card p-4 rounded-3xl border border-white/10">
            <span class="text-[10px] font-mono uppercase text-gray-400 block mb-1">Focus Sessions</span>
            <span class="text-2xl font-black text-purple-300">14 total</span>
            <p class="text-[11px] text-gray-400 mt-1">Single-tasking blocks</p>
          </div>
        </div>

        <!-- OS Screen Time Integration Explainer -->
        <div class="glass-card p-4 rounded-3xl border border-white/10 text-xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-gray-200">Device Integration Status</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
              ${state.screenTime.simulatedActive ? 'Simulated Demo Mode' : 'Manual Entry'}
            </span>
          </div>
          <p class="text-gray-400 leading-relaxed">
            On Android: connects via Digital Wellbeing UsageStats API when granted.
            On iOS: connects via DeviceActivity / FamilyControls API where authorized.
            Zero telemetry is uploaded to remote servers.
          </p>
          <div class="pt-2 flex gap-2">
            <button id="btn-manual-time-entry" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-300 font-bold">
              Adjust Screen Time Manually ✍️
            </button>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    container.querySelectorAll('.period-tab-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        activePeriod = btn.getAttribute('data-period');
        render();
      };
    });

    const manualBtn = container.querySelector('#btn-manual-time-entry');
    if (manualBtn) {
      manualBtn.onclick = () => {
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
