/**
 * Settings & Privacy Screen for FORMANUPP
 * Implements privacy disclosures, data export (JSON), account reset,
 * dark/light mode toggle, sound effects, and simulation switch.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';

export function renderSettings(container, navigateTo, toggleMockupWidth) {
  const state = store.get();

  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <!-- Header -->
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Preferences</span>
          <h2 class="text-2xl font-black text-white mt-0.5">SETTINGS & PRIVACY ⚙️</h2>
          <p class="text-xs text-gray-400 mt-0.5">You own your data. We don't even want it.</p>
        </div>

        <!-- Privacy Guarantee Banner -->
        <div class="glass-card p-5 rounded-3xl border border-emerald-500/25 bg-emerald-950/20 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">🔒</span>
            <span class="text-xs font-mono uppercase text-emerald-300 font-bold">100% Local-First Guarantee</span>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">
            FORMANUPP never sends your photos, journal entries, or screen time habits to any remote server or ad network. Everything is saved strictly in your local device browser storage.
          </p>
          <p class="text-[11px] text-gray-400 italic">
            Never posts to social media. Never deletes your external accounts. You are in complete manual control.
          </p>
        </div>

        <!-- Appearance & Audio Toggles -->
        <div class="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
          <h4 class="text-xs font-mono uppercase text-gray-400 font-bold mb-2">Preferences & Audio</h4>

          <!-- Theme Toggle -->
          <div class="flex justify-between items-center py-1">
            <div>
              <p class="text-xs font-bold text-white">Color Theme</p>
              <p class="text-[11px] text-gray-400">Current: ${state.settings.theme === 'dark' ? 'Dark Obsidian' : 'Light Cream'}</p>
            </div>
            <button id="btn-toggle-theme" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-gray-200">
              ${state.settings.theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
            </button>
          </div>

          <!-- Sound Toggle -->
          <div class="flex justify-between items-center border-t border-white/5 pt-2">
            <div>
              <p class="text-xs font-bold text-white">Tactile Web Audio Effects</p>
              <p class="text-[11px] text-gray-400">Clicks, zen chimes, and funeral organ</p>
            </div>
            <button id="btn-toggle-sound" class="px-3 py-1.5 rounded-xl border text-xs font-bold ${state.settings.soundEnabled ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-gray-400'}">
              ${state.settings.soundEnabled ? '🔊 Enabled' : '🔇 Muted'}
            </button>
          </div>

          <!-- Desktop Frame Toggle -->
          <div class="flex justify-between items-center border-t border-white/5 pt-2">
            <div>
              <p class="text-xs font-bold text-white">Desktop Phone Frame</p>
              <p class="text-[11px] text-gray-400">Toggle realistic phone bezel on desktop</p>
            </div>
            <button id="btn-toggle-frame" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-gray-200">
              📱 Toggle Bezel
            </button>
          </div>
        </div>

        <!-- Screen Time Integration Mode -->
        <div class="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
          <h4 class="text-xs font-mono uppercase text-gray-400 font-bold mb-1">Screen Time Engine</h4>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-xs font-bold text-white">Live Simulation Mode</p>
              <p class="text-[11px] text-gray-400">Ticks simulated scroll creep for demo testing</p>
            </div>
            <button id="btn-toggle-sim" class="px-3 py-1.5 rounded-xl border text-xs font-bold ${state.screenTime.simulatedActive ? 'bg-purple-500/20 border-purple-400 text-purple-200' : 'bg-white/5 border-white/10 text-gray-400'}">
              ${state.screenTime.simulatedActive ? 'Active' : 'Off'}
            </button>
          </div>
        </div>

        <!-- Data Management & Backups -->
        <div class="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
          <h4 class="text-xs font-mono uppercase text-gray-400 font-bold mb-1">Data Ownership</h4>

          <div class="space-y-2">
            <button id="btn-export-data" class="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all">
              <span>📥 Export All My Data (JSON Backup)</span>
            </button>

            <button id="btn-restart-onboarding" class="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-purple-300 flex items-center justify-center gap-2 transition-all">
              <span>🔄 Recalibrate Mystery Slider & Onboarding</span>
            </button>

            <button id="btn-reset-data" class="w-full py-3 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-bold text-rose-300 flex items-center justify-center gap-2 transition-all">
              <span>⚠️ Clear All Data & Reset App</span>
            </button>
          </div>
        </div>

        <!-- Version Statement -->
        <div class="text-center pt-2">
          <p class="text-[11px] font-mono text-gray-500">FORMANUPP v1.0.0 • Offline Digital Companion</p>
          <p class="text-[11px] text-purple-400/80 italic mt-0.5">“I am safe. I am offline. I am becoming.”</p>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const themeBtn = container.querySelector('#btn-toggle-theme');
    if (themeBtn) {
      themeBtn.onclick = () => {
        sound.playTap();
        const nextTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
        store.update(s => { s.settings.theme = nextTheme; });
        document.documentElement.setAttribute('data-theme', nextTheme);
        render();
      };
    }

    const soundBtn = container.querySelector('#btn-toggle-sound');
    if (soundBtn) {
      soundBtn.onclick = () => {
        sound.playTap();
        const nextSound = !state.settings.soundEnabled;
        sound.setMuted(!nextSound);
        store.update(s => { s.settings.soundEnabled = nextSound; });
        render();
      };
    }

    const frameBtn = container.querySelector('#btn-toggle-frame');
    if (frameBtn && toggleMockupWidth) {
      frameBtn.onclick = () => {
        sound.playTap();
        toggleMockupWidth();
      };
    }

    const simBtn = container.querySelector('#btn-toggle-sim');
    if (simBtn) {
      simBtn.onclick = () => {
        sound.playTap();
        store.update(s => {
          s.screenTime.simulatedActive = !s.screenTime.simulatedActive;
        });
        render();
      };
    }

    const exportBtn = container.querySelector('#btn-export-data');
    if (exportBtn) {
      exportBtn.onclick = () => {
        sound.playSuccess();
        store.exportData();
      };
    }

    const restartObBtn = container.querySelector('#btn-restart-onboarding');
    if (restartObBtn) {
      restartObBtn.onclick = () => {
        sound.playTap();
        store.update(s => { s.profile.onboarded = false; });
        navigateTo('onboarding');
      };
    }

    const resetBtn = container.querySelector('#btn-reset-data');
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm("Are you sure you want to erase all local data, milestones, and photo capsules?")) {
          sound.playFuneral();
          store.resetAllData();
          alert("All local data reset. Welcome back to day zero.");
          location.reload();
        }
      };
    }
  }

  render();
}
