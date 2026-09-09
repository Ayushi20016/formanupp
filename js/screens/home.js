/**
 * Home Dashboard for FORMANUPP
 * Displays Today's mood, screen time, focus time, social media time, eye-break status,
 * self-care suggestion, productivity score, digital-life status, and today's mission.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';
import { showSignatureModal } from './signature.js';

export function renderHome(container, navigateTo) {
  const state = store.get();

  function formatTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  }

  const totalMin = state.screenTime.totalMinutes;
  const igMin = state.screenTime.instagramMinutes;
  const ytMin = state.screenTime.youtubeMinutes;
  const focusMin = state.screenTime.focusMinutes;

  // Productivity score calculation: higher focus, lower social media
  const score = Math.min(96, Math.max(35, Math.round((focusMin / (totalMin + 1)) * 100 + 42)));
  let scoreComment = "Decent recovery energy.";
  if (score > 80) scoreComment = "Main character offline energy.";
  else if (score < 50) scoreComment = "The algorithm is currently winning. Reset time.";

  const morningVibesMap = {
    locked_in: { label: "Locked in", emoji: "🎯" },
    slow: { label: "Taking it slow", emoji: "🍵" },
    recovering: { label: "Recovering", emoji: "🛋️" },
    creative: { label: "Creative", emoji: "🎨" },
    social: { label: "Social IRL", emoji: "👯" },
    mysterious: { label: "Mysterious", emoji: "🕶️" },
    clueless: { label: "Floating", emoji: "🌀" }
  };
  const currentVibe = morningVibesMap[state.profile.morningVibe] || morningVibesMap.mysterious;

  container.innerHTML = `
    <div class="p-5 space-y-4 max-w-lg mx-auto pb-24">
      <!-- Top Banner: Signature Experience Trigger -->
      <div id="home-sig-banner" class="glass-card p-3.5 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-pink-900/10 to-transparent flex items-center justify-between cursor-pointer glass-card-hover">
        <div class="flex items-center gap-3">
          <span class="text-2xl animate-bounce">🚨</span>
          <div>
            <p class="text-xs font-bold text-pink-300">Screen Time Reality Check</p>
            <p class="text-[11px] text-gray-400">“...girl. Go live your life.”</p>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono">View ➔</span>
      </div>

      <!-- Header & Morning Vibe -->
      <div class="flex items-center justify-between pt-1">
        <div>
          <p class="text-xs font-mono uppercase text-gray-400">Today's Vibe</p>
          <button id="home-vibe-btn" class="flex items-center gap-2 mt-0.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all">
            <span>${currentVibe.emoji}</span>
            <span class="font-semibold text-gray-200">${currentVibe.label}</span>
            <span class="text-[10px] text-purple-400">change</span>
          </button>
        </div>

        <div class="text-right">
          <p class="text-xs font-mono uppercase text-gray-400">Mystery Era</p>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${state.mystery.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-purple-500/15 text-purple-300 border border-purple-500/20'}">
            <span class="w-2 h-2 rounded-full ${state.mystery.active ? 'bg-emerald-400 animate-pulse' : 'bg-purple-400'}"></span>
            ${state.profile.mysteryLevel}%
          </span>
        </div>
      </div>

      <!-- Core Status Cards -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Social Life Deceased Card -->
        <div id="btn-funeral-card" class="glass-card p-4 rounded-3xl border border-red-500/20 bg-gradient-to-b from-gray-900/60 to-black/80 cursor-pointer glass-card-hover relative overflow-hidden">
          <div class="flex justify-between items-start mb-3">
            <span class="text-xs font-mono uppercase text-gray-400">Social Life</span>
            <span class="text-xl">☠️</span>
          </div>
          <p class="text-base font-extrabold text-gray-200">Currently</p>
          <p class="text-lg font-black text-rose-400">deceased</p>
          <p class="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
            <span>🪦 RIP screen time</span>
            <span class="text-xs">➔</span>
          </p>
        </div>

        <!-- Real Life Loading Card -->
        <div id="btn-reset-card" class="glass-card p-4 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/30 to-black/80 cursor-pointer glass-card-hover relative overflow-hidden">
          <div class="flex justify-between items-start mb-3">
            <span class="text-xs font-mono uppercase text-emerald-400/80">Real Life</span>
            <span class="text-xl">✨</span>
          </div>
          <p class="text-base font-extrabold text-gray-200">Loading</p>
          <p class="text-lg font-black text-emerald-300">beautifully...</p>
          <p class="text-[10px] text-emerald-400/80 mt-2 flex items-center gap-1">
            <span>Reset room</span>
            <span class="text-xs">➔</span>
          </p>
        </div>
      </div>

      <!-- Today's Mission -->
      <div class="glass-card p-4 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-black to-pink-950/20">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[11px] font-mono uppercase tracking-widest text-purple-400 flex items-center gap-1.5 font-bold">
            <span>🎯</span> Today's Mission
          </span>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">+50 XP</span>
        </div>
        <p class="text-sm font-semibold text-gray-100 leading-snug mb-3">
          “Stay off social media for 45 minutes and finish one meaningful task.”
        </p>
        <button id="btn-start-mission" class="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all">
          <span>Start Focus Timer</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </button>
      </div>

      <!-- Screen Time Breakdown Metrics -->
      <div class="glass-card p-5 rounded-3xl border border-white/10">
        <div class="flex justify-between items-baseline mb-4">
          <div>
            <p class="text-xs font-mono uppercase text-gray-400">Total Screen Time</p>
            <h3 class="text-3xl font-extrabold text-white tracking-tight">${formatTime(totalMin)}</h3>
          </div>
          <div class="text-right">
            <span class="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20 font-mono">
              ${state.screenTime.simulatedActive ? '● Live Simulation' : 'Manual Log'}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2.5 mb-4">
          <div class="p-3 rounded-2xl bg-white/5 border border-white/5">
            <p class="text-[10px] text-gray-400 font-medium">Instagram</p>
            <p class="text-base font-bold text-pink-400">${formatTime(igMin)}</p>
            <span class="text-[10px] text-gray-500">39% of total</span>
          </div>
          <div class="p-3 rounded-2xl bg-white/5 border border-white/5">
            <p class="text-[10px] text-gray-400 font-medium">YouTube</p>
            <p class="text-base font-bold text-red-400">${formatTime(ytMin)}</p>
            <span class="text-[10px] text-gray-500">22% of total</span>
          </div>
          <div class="p-3 rounded-2xl bg-white/5 border border-white/5">
            <p class="text-[10px] text-gray-400 font-medium">Focus Time</p>
            <p class="text-base font-bold text-emerald-400">${formatTime(focusMin)}</p>
            <span class="text-[10px] text-gray-500">2 sessions</span>
          </div>
        </div>

        <div class="flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-3">
          <span>Pickups: <strong class="text-gray-200">${state.screenTime.pickups}</strong></span>
          <span>Longest session: <strong class="text-gray-200">${state.screenTime.longestSessionMinutes}m</strong></span>
          <span>Breaks: <strong class="text-gray-200">${state.screenTime.breaksTaken}</strong></span>
        </div>
      </div>

      <!-- Quick Action Grid -->
      <div class="grid grid-cols-4 gap-2">
        <button id="nav-quick-focus" class="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center glass-card-hover">
          <span class="text-xl block mb-1">⏱️</span>
          <span class="text-[11px] font-medium text-gray-300">Focus</span>
        </button>

        <button id="nav-quick-funeral" class="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center glass-card-hover">
          <span class="text-xl block mb-1">🪦</span>
          <span class="text-[11px] font-medium text-gray-300">Detox RIP</span>
        </button>

        <button id="nav-quick-mystery" class="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center glass-card-hover">
          <span class="text-xl block mb-1">🕶️</span>
          <span class="text-[11px] font-medium text-gray-300">Mystery</span>
        </button>

        <button id="nav-quick-recipes" class="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center glass-card-hover">
          <span class="text-xl block mb-1">🍳</span>
          <span class="text-[11px] font-medium text-gray-300">Recipes</span>
        </button>
      </div>

      <!-- Productivity Score & Self-Care Row -->
      <div class="grid grid-cols-2 gap-3">
        <div class="glass-card p-4 rounded-3xl border border-white/10">
          <p class="text-[10px] font-mono uppercase text-gray-400 mb-1">Real-Life Score</p>
          <div class="flex items-baseline gap-1.5 mb-1">
            <span class="text-2xl font-black text-purple-300">${score}</span>
            <span class="text-xs text-gray-500">/100</span>
          </div>
          <p class="text-[11px] text-gray-400 line-clamp-2">${scoreComment}</p>
        </div>

        <div id="btn-quick-eye-break" class="glass-card p-4 rounded-3xl border border-white/10 cursor-pointer glass-card-hover">
          <div class="flex justify-between items-start mb-1">
            <p class="text-[10px] font-mono uppercase text-gray-400">Eye Break</p>
            <span class="text-sm">👁️</span>
          </div>
          <p class="text-xs font-bold text-gray-200 mb-0.5">20-20-20 rule</p>
          <p class="text-[11px] text-purple-400">“Your eyes called” ➔</p>
        </div>
      </div>
    </div>
  `;

  // Bind interactions
  const sigBanner = container.querySelector('#home-sig-banner');
  if (sigBanner) {
    sigBanner.onclick = () => {
      showSignatureModal(() => {
        navigateTo('reset');
      });
    };
  }

  const funeralCard = container.querySelector('#btn-funeral-card');
  if (funeralCard) {
    funeralCard.onclick = () => {
      sound.playTap();
      navigateTo('funeral');
    };
  }

  const resetCard = container.querySelector('#btn-reset-card');
  if (resetCard) {
    resetCard.onclick = () => {
      sound.playTap();
      navigateTo('reset');
    };
  }

  const missionBtn = container.querySelector('#btn-start-mission');
  if (missionBtn) {
    missionBtn.onclick = () => {
      sound.playTap();
      navigateTo('focus');
    };
  }

  const vibeBtn = container.querySelector('#home-vibe-btn');
  if (vibeBtn) {
    vibeBtn.onclick = () => {
      sound.playTap();
      navigateTo('mind');
    };
  }

  container.querySelector('#nav-quick-focus').onclick = () => { sound.playTap(); navigateTo('focus'); };
  container.querySelector('#nav-quick-funeral').onclick = () => { sound.playTap(); navigateTo('funeral'); };
  container.querySelector('#nav-quick-mystery').onclick = () => { sound.playTap(); navigateTo('mystery'); };
  container.querySelector('#nav-quick-recipes').onclick = () => { sound.playTap(); navigateTo('recipes'); };
  container.querySelector('#btn-quick-eye-break').onclick = () => { sound.playTap(); navigateTo('eye_break'); };
}
