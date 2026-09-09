/**
 * Daily Mind Check-In & "Are You Actually Bored?" for FORMANUPP
 * Non-clinical, witty, playful, and deeply reflective.
 * Generates personalized daily action plans and saves answers to My Collections.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';
import { BORED_BRAIN_QUESTIONS, MORNING_VIBES } from '../quotes.js';

export function renderMind(container, navigateTo) {
  const state = store.get();

  let brainTab = "47 browser tabs";
  let secretNeed = "Rest";
  let avoiding = "That one message";
  let generatedPlan = null;
  let activeQuestionIndex = 0;

  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-6 max-w-lg mx-auto pb-28">
        <!-- Section Title -->
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Mind & Presence</span>
          <h2 class="text-2xl font-black text-white mt-0.5">Daily Mind Check-In 🧠</h2>
          <p class="text-xs text-gray-400 mt-1">Not a clinical assessment. Just an honest conversation with yourself.</p>
        </div>

        <!-- Interactive Question 1: Brain Feels Like -->
        <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-3">
          <p class="text-sm font-bold text-gray-200">“Right now, your brain feels like...”</p>
          <div class="grid grid-cols-2 gap-2">
            ${[
              { label: "47 browser tabs", emoji: "📑" },
              { label: "A peaceful library", emoji: "📚" },
              { label: "Loading...", emoji: "⏳" },
              { label: "I have no idea", emoji: "🌀" }
            ].map(item => `
              <button class="brain-opt-btn p-3 rounded-2xl text-left border text-xs font-semibold transition-all ${brainTab === item.label ? 'bg-purple-500/25 border-purple-400 text-purple-200' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${item.label}">
                <span class="mr-1.5">${item.emoji}</span> ${item.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Question 2: Secret Need -->
        <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-3">
          <p class="text-sm font-bold text-gray-200">“What do you secretly need today?”</p>
          <div class="flex flex-wrap gap-2">
            ${["Rest", "Focus", "People", "Alone time", "Fun", "A reset"].map(need => `
              <button class="need-opt-btn px-3.5 py-2 rounded-full border text-xs font-semibold transition-all ${secretNeed === need ? 'bg-pink-500/25 border-pink-400 text-pink-200' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${need}">
                ${need}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Question 3: Avoiding -->
        <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-3">
          <p class="text-sm font-bold text-gray-200">“What are you avoiding right now?”</p>
          <div class="grid grid-cols-2 gap-2">
            ${[
              "That one message",
              "Doing real work",
              "Cleaning my room",
              "Thinking about the future"
            ].map(av => `
              <button class="avoid-opt-btn p-3 rounded-2xl text-left border text-xs font-semibold transition-all ${avoiding === av ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}" data-val="${av}">
                ${av}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Generate Plan Button -->
        <button id="btn-generate-plan" class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-bold text-sm shadow-lg shadow-purple-500/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span>Synthesize My Personalized Daily Plan ✨</span>
        </button>

        <!-- Generated Plan Container -->
        <div id="plan-container" class="${generatedPlan ? '' : 'hidden'} glass-card p-5 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/30 to-black/60 space-y-3 animate-fadeIn">
          ${generatedPlan || ''}
        </div>

        <!-- Divider -->
        <div class="border-t border-white/10 pt-4">
          <span class="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold">Brain Prompt Deck</span>
          <h3 class="text-xl font-bold text-white mt-1">“ARE YOU ACTUALLY BORED?” 🎴</h3>
          <p class="text-xs text-gray-400 mt-0.5">Or is your brain just addicted to dopamine pings?</p>
        </div>

        <!-- Flashcard Carousel -->
        ${renderBrainCard()}
      </div>
    `;

    bindEvents();
  }

  function renderBrainCard() {
    const q = BORED_BRAIN_QUESTIONS[activeQuestionIndex];
    return `
      <div class="glass-card p-6 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold">
            Card ${activeQuestionIndex + 1} of ${BORED_BRAIN_QUESTIONS.length}
          </span>
          <div class="flex gap-2">
            <button id="btn-prev-card" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs">
              ◀
            </button>
            <button id="btn-next-card" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs">
              ▶
            </button>
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold text-white leading-snug mb-1">
            “${q.question}”
          </h4>
          <p class="text-xs text-purple-300/80 italic">${q.subtext}</p>
        </div>

        <textarea id="card-answer-input" rows="3" class="w-full p-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all" placeholder="Write your unfiltered truth here..."></textarea>

        <button id="btn-save-answer" class="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-gray-100 flex items-center justify-center gap-2 transition-all">
          <span>Save to My Private Collections 📂</span>
        </button>
      </div>
    `;
  }

  function bindEvents() {
    container.querySelectorAll('.brain-opt-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        brainTab = btn.getAttribute('data-val');
        render();
      };
    });

    container.querySelectorAll('.need-opt-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        secretNeed = btn.getAttribute('data-val');
        render();
      };
    });

    container.querySelectorAll('.avoid-opt-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        avoiding = btn.getAttribute('data-val');
        render();
      };
    });

    const genBtn = container.querySelector('#btn-generate-plan');
    if (genBtn) {
      genBtn.onclick = () => {
        sound.playSuccess();
        generatedPlan = `
          <div class="flex items-center justify-between border-b border-white/10 pb-2">
            <span class="text-xs font-mono uppercase text-purple-300 font-bold">Your Prescribed Offline Plan</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">+75 XP</span>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed">
            Since your brain is at <strong>${brainTab}</strong> and secretly craving <strong>${secretNeed}</strong> while running away from <em>"${avoiding}"</em>:
          </p>
          <div class="space-y-2 pt-1 text-xs">
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <span class="text-base">1️⃣</span>
              <span class="text-gray-200"><strong>First 15 mins:</strong> Put phone in another room. Drink water, stretch spine.</span>
            </div>
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <span class="text-base">2️⃣</span>
              <span class="text-gray-200"><strong>The Elephant:</strong> Attack "${avoiding}" for exactly 20 minutes on timer. No perfection, just finish.</span>
            </div>
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <span class="text-base">3️⃣</span>
              <span class="text-gray-200"><strong>The Reward:</strong> Dedicated 45 minutes of pure offline ${secretNeed.toLowerCase()}.</span>
            </div>
          </div>
        `;
        store.addXP(75, "Completed mind check-in");
        render();
      };
    }

    const prevCard = container.querySelector('#btn-prev-card');
    const nextCard = container.querySelector('#btn-next-card');

    if (prevCard) {
      prevCard.onclick = () => {
        sound.playTap();
        activeQuestionIndex = (activeQuestionIndex - 1 + BORED_BRAIN_QUESTIONS.length) % BORED_BRAIN_QUESTIONS.length;
        render();
      };
    }

    if (nextCard) {
      nextCard.onclick = () => {
        sound.playTap();
        activeQuestionIndex = (activeQuestionIndex + 1) % BORED_BRAIN_QUESTIONS.length;
        render();
      };
    }

    const saveBtn = container.querySelector('#btn-save-answer');
    if (saveBtn) {
      saveBtn.onclick = () => {
        const textInput = container.querySelector('#card-answer-input');
        const answer = textInput ? textInput.value.trim() : "";
        if (!answer) {
          alert("Write down a quick thought before saving!");
          return;
        }

        sound.playSuccess();
        const currentQ = BORED_BRAIN_QUESTIONS[activeQuestionIndex];
        store.update(state => {
          state.collections.reflections.unshift({
            id: `ref-${Date.now()}`,
            prompt: currentQ.question,
            answer: answer,
            date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        });
        store.addXP(50, "Saved mind reflection");
        alert("Reflection saved securely in My Collections 📂");
        if (textInput) textInput.value = "";
      };
    }
  }

  render();
}
