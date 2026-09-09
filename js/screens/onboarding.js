/**
 * Onboarding Flow for FORMANUPP
 * Implements the 5 requested questionnaire steps, the mystery slider (0-100%), and smooth transitions.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';
import { BRAND_TAGLINE, BRAND_PHILOSOPHY } from '../quotes.js';

let currentStep = 1;
const totalSteps = 5;

const IMPROVEMENT_OPTIONS = [
  "Productivity",
  "Digital detox",
  "Better sleep",
  "Focus",
  "Self-care",
  "Confidence",
  "Learning",
  "All of the above"
];

const PROBLEM_OPTIONS = [
  "Doomscrolling",
  "Instagram",
  "YouTube",
  "Gaming",
  "Constant notifications",
  "Checking my phone every few minutes",
  "I don't know... my phone owns me"
];

export function renderOnboarding(container, onComplete) {
  const state = store.get();
  let selectedImprovements = [...state.profile.goals];
  let selectedProblem = state.profile.problems[0] || "Doomscrolling";
  let mysteryVal = state.profile.mysteryLevel;
  let idealDay = state.profile.idealDay;

  function update() {
    container.innerHTML = `
      <div class="min-h-full flex flex-col justify-between p-6 max-w-lg mx-auto transition-all duration-300">
        <!-- Top Indicator -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">Step ${currentStep} of ${totalSteps}</span>
          </div>
          <div class="flex gap-1.5">
            ${Array.from({ length: totalSteps }).map((_, i) => `
              <div class="h-1.5 w-6 rounded-full transition-all duration-300 ${i + 1 <= currentStep ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-white/10'}"></div>
            `).join('')}
          </div>
        </div>

        <!-- Step Contents -->
        <div class="flex-1 flex flex-col justify-center">
          ${getStepContent()}
        </div>

        <!-- Bottom Controls -->
        <div class="mt-8 flex gap-3">
          ${currentStep > 1 ? `
            <button id="ob-prev" class="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all">
              Back
            </button>
          ` : ''}
          <button id="ob-next" class="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>${currentStep === totalSteps ? 'Enter Your Mysterious Era 🕶️' : 'Continue'}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    `;

    bindEvents();
  }

  function getStepContent() {
    if (currentStep === 1) {
      return `
        <div class="text-center py-6">
          <div class="inline-block p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 mb-6 animate-pulse-ring">
            <span class="text-5xl">🕶️</span>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight mb-2 text-gradient-mystery">FORMANUPP</h1>
          <p class="text-sm font-medium text-pink-300/90 italic mb-6">“${BRAND_TAGLINE}”</p>
          <div class="glass-card p-5 rounded-3xl border border-white/10 text-left mb-6">
            <p class="text-xs uppercase tracking-widest text-purple-300/70 font-mono mb-2">The Philosophy</p>
            <p class="text-base text-gray-200 font-medium leading-relaxed">
              “${BRAND_PHILOSOPHY}”
            </p>
          </div>
          <p class="text-xs text-gray-400 px-4">
            Not a boring corporate productivity tracker. A mysterious digital-life companion that respects your peace and understands the doomscroll.
          </p>
        </div>
      `;
    }

    if (currentStep === 2) {
      return `
        <div>
          <h2 class="text-2xl font-bold mb-2">What are you trying to improve?</h2>
          <p class="text-xs text-gray-400 mb-6">Select everything your soul is asking for right now.</p>
          <div class="grid grid-cols-2 gap-2.5">
            ${IMPROVEMENT_OPTIONS.map(opt => {
              const active = selectedImprovements.includes(opt);
              return `
                <button type="button" class="imp-btn p-3.5 rounded-2xl text-left border text-sm font-medium transition-all ${active ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-sm shadow-purple-500/20' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${opt}">
                  <span class="mr-1.5">${active ? '✨' : '○'}</span> ${opt}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    if (currentStep === 3) {
      return `
        <div>
          <h2 class="text-2xl font-bold mb-2">What is your biggest digital problem?</h2>
          <p class="text-xs text-gray-400 mb-6">No shame here. We know the algorithm is aggressive.</p>
          <div class="space-y-2.5">
            ${PROBLEM_OPTIONS.map(opt => {
              const active = selectedProblem === opt;
              return `
                <button type="button" class="prob-btn w-full p-4 rounded-2xl text-left border text-sm font-medium transition-all flex items-center justify-between ${active ? 'bg-pink-500/20 border-pink-400 text-pink-100 shadow-sm shadow-pink-500/20' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${opt}">
                  <span>${opt}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full ${active ? 'bg-pink-400/20 text-pink-300' : 'text-gray-500'}">${active ? 'Selected' : 'Select'}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    if (currentStep === 4) {
      let tier = "Casual Ghost";
      let description = "Reducing subtle pings and keeping social updates on a quiet schedule.";
      if (mysteryVal > 30 && mysteryVal <= 70) {
        tier = "Low-Profile Enigma";
        description = "Hiding addictive apps, setting tight 30-min caps, and vanishing for hours at a time.";
      } else if (mysteryVal > 70) {
        tier = "Digital Phantom / Full Offline Incognito";
        description = "Complete disappearance era. Zero stories posted, accounts paused, 3D real life fully activated.";
      }

      return `
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-2">“How mysterious do you want to become?”</h2>
          <p class="text-xs text-gray-400 mb-8">Higher mystery triggers stronger digital detox challenges.</p>

          <div class="glass-card p-6 rounded-3xl border border-white/10 mb-6">
            <div class="flex justify-between items-baseline mb-4">
              <span class="text-xs font-mono uppercase text-gray-400">Mystery Level</span>
              <span class="text-3xl font-extrabold text-gradient-mystery">${mysteryVal}%</span>
            </div>

            <input type="range" min="0" max="100" value="${mysteryVal}" id="mystery-range" class="mystery-slider mb-6">

            <div class="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-left">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-base">🕶️</span>
                <span class="text-sm font-bold text-purple-200">${tier}</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">${description}</p>
            </div>
          </div>
        </div>
      `;
    }

    if (currentStep === 5) {
      return `
        <div>
          <h2 class="text-2xl font-bold mb-2">What does your ideal day look like?</h2>
          <p class="text-xs text-gray-400 mb-5">When you don't spend 5 hours staring at a glass slab.</p>

          <div class="space-y-4">
            <textarea id="ideal-day-input" rows="3" class="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all" placeholder="e.g. Quiet coffee morning, 2 hours of creative focus, cooking a real dinner, no phone in bed.">${idealDay}</textarea>

            <div class="glass-card p-4 rounded-2xl border border-white/10">
              <p class="text-xs font-semibold text-purple-300 mb-2 font-mono uppercase">Quick Mind Check</p>
              <p class="text-sm text-gray-300 italic mb-3">“If nobody could see your life today, what would you actually do?”</p>
              <div class="flex flex-wrap gap-2">
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">Sleep with zero alarms</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">Read in sunlight</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">Cook a messy meal</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">Take a walk with no headphones</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  function bindEvents() {
    const nextBtn = container.querySelector('#ob-next');
    const prevBtn = container.querySelector('#ob-prev');

    if (nextBtn) {
      nextBtn.onclick = () => {
        sound.playTap();
        if (currentStep === 5) {
          const idealInput = container.querySelector('#ideal-day-input');
          if (idealInput) idealDay = idealInput.value.trim() || idealDay;

          store.update(state => {
            state.profile.onboarded = true;
            state.profile.goals = selectedImprovements;
            state.profile.problems = [selectedProblem];
            state.profile.mysteryLevel = mysteryVal;
            state.profile.idealDay = idealDay;
            // Award first achievement
            if (!state.achievements.unlockedBadges.includes("mysterious")) {
              state.achievements.unlockedBadges.push("mysterious");
            }
          });

          sound.playSuccess();
          onComplete();
        } else {
          currentStep++;
          update();
        }
      };
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        sound.playTap();
        if (currentStep > 1) {
          currentStep--;
          update();
        }
      };
    }

    // Step 2 Improvement Buttons
    container.querySelectorAll('.imp-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        const val = btn.getAttribute('data-val');
        if (val === "All of the above") {
          selectedImprovements = [...IMPROVEMENT_OPTIONS];
        } else if (selectedImprovements.includes(val)) {
          selectedImprovements = selectedImprovements.filter(i => i !== val);
        } else {
          selectedImprovements.push(val);
        }
        update();
      };
    });

    // Step 3 Problem Buttons
    container.querySelectorAll('.prob-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        selectedProblem = btn.getAttribute('data-val');
        update();
      };
    });

    // Step 4 Slider
    const slider = container.querySelector('#mystery-range');
    if (slider) {
      slider.oninput = (e) => {
        mysteryVal = parseInt(e.target.value, 10);
        update();
      };
    }
  }

  update();
}
