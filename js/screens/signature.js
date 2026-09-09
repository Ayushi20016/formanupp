/**
 * The Signature Experience Modal for FORMANUPP
 *
 * “Welcome back.
 *  We checked your screen time.
 *  ...girl.
 *  Go live your life.”
 *
 * YOUR SOCIAL LIFE: ☠️ deceased
 * YOUR REAL LIFE: ✨ waiting for you
 * [START MY RESET]
 */

import { store } from '../state.js';
import { sound } from '../audio.js';
import { SIGNATURE_DIALOG } from '../quotes.js';

export function showSignatureModal(onStartReset) {
  const existing = document.getElementById('signature-modal-overlay');
  if (existing) existing.remove();

  sound.playFuneral();

  const overlay = document.createElement('div');
  overlay.id = 'signature-modal-overlay';
  overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn';

  overlay.innerHTML = `
    <div class="glass-card max-w-sm w-full p-6 rounded-3xl border border-white/15 shadow-2xl relative text-center overflow-hidden animate-scaleUp">
      <!-- Ambient Glow Aura -->
      <div class="absolute -top-20 -left-20 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-20 -right-20 w-48 h-48 bg-pink-600/25 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Dismiss button -->
      <button id="sig-close" class="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-white/5 border border-white/10 text-xs">
        ✕
      </button>

      <!-- Signature Icon -->
      <div class="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 mb-4 animate-breathe">
        <span class="text-4xl">☠️</span>
      </div>

      <!-- Dramatic Dialogue -->
      <h2 class="text-2xl font-extrabold tracking-tight text-white mb-1">
        ${SIGNATURE_DIALOG.greeting}
      </h2>
      <p class="text-xs font-mono uppercase text-gray-400 tracking-wider mb-2">
        ${SIGNATURE_DIALOG.check}
      </p>

      <div class="my-4 py-2 px-4 rounded-2xl bg-white/5 border border-white/10 inline-block">
        <span class="text-2xl font-black text-gradient-mystery italic">${SIGNATURE_DIALOG.reaction}</span>
      </div>

      <p class="text-base font-semibold text-pink-300 mb-6">
        ${SIGNATURE_DIALOG.advice}
      </p>

      <!-- Status Cards -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <div class="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800 text-left">
          <p class="text-[10px] font-mono uppercase text-gray-400 mb-1">Social Life</p>
          <p class="text-sm font-bold text-gray-300 flex items-center gap-1.5">
            ${SIGNATURE_DIALOG.socialStatus}
          </p>
        </div>
        <div class="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-left">
          <p class="text-[10px] font-mono uppercase text-emerald-400/80 mb-1">Real Life</p>
          <p class="text-sm font-bold text-emerald-200 flex items-center gap-1.5">
            ${SIGNATURE_DIALOG.realStatus}
          </p>
        </div>
      </div>

      <!-- Action Button -->
      <button id="sig-action-btn" class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 text-white font-bold text-sm shadow-xl shadow-purple-500/30 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
        <span>${SIGNATURE_DIALOG.actionBtn}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </button>

      <p class="text-[11px] text-gray-400 mt-4 italic">
        “I am safe. I am offline. I am becoming.”
      </p>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('#sig-close');
  const actionBtn = overlay.querySelector('#sig-action-btn');

  const close = () => {
    sound.playTap();
    overlay.remove();
  };

  closeBtn.onclick = close;
  actionBtn.onclick = () => {
    sound.playSuccess();
    overlay.remove();
    if (onStartReset) onStartReset();
  };
}
