/**
 * Recipe Corner ("GO COOK SOMETHING.") for FORMANUPP
 * Low-friction, delicious recipes to replace mindless scrolling with sensory cooking.
 * Includes interactive step-by-step cooking mode with timer.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';

const RECIPES_DATA = [
  {
    id: "chili-garlic-noodles",
    title: "10-Min Chili Garlic Butter Noodles",
    category: "10-minute",
    time: "10 min",
    difficulty: "Beginner",
    servings: 1,
    desc: "Savory, spicy, and deeply comforting. Takes less time than watching 15 Instagram reels.",
    ingredients: [
      "1 pack instant noodles (ramen or udon, flavor packet discarded)",
      "2 cloves garlic, finely minced",
      "1 tbsp butter or neutral oil",
      "1.5 tbsp soy sauce",
      "1 tsp chili flakes or chili oil",
      "1 tsp honey or brown sugar",
      "1 green onion (optional garnish)"
    ],
    substitutions: "Swap butter for sesame oil for a nutty Asian profile. Add a fried egg on top for protein.",
    steps: [
      "Boil noodles according to package (3-4 mins) and drain, keeping 2 tbsp of noodle water.",
      "In a hot pan, melt butter and sauté minced garlic and chili flakes for 60 seconds until fragrant.",
      "Stir in soy sauce, sugar, and the reserved noodle water.",
      "Toss the noodles in the pan until coated in glossy sauce. Top with green onions and eat immediately."
    ]
  },
  {
    id: "creamy-tomato-pasta",
    title: "One-Pot Creamy Tomato Pasta",
    category: "student",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    desc: "Rich, velvety student staple made in a single pan with zero fancy equipment.",
    ingredients: [
      "200g penne or rigatoni pasta",
      "1 cup canned crushed tomatoes or marinara",
      "1/2 cup cream, whole milk, or oat milk",
      "2 cloves garlic, crushed",
      "1/4 cup grated parmesan or nutritional yeast",
      "Salt, black pepper, and dried basil"
    ],
    substitutions: "Use coconut cream for dairy-free. Throw in a handful of baby spinach at the end.",
    steps: [
      "Boil pasta in salted water until al dente. Reserve 1/4 cup pasta water and drain.",
      "In the same pot over medium heat, gently warm crushed tomatoes and garlic for 3 minutes.",
      "Pour in cream and pasta water, stirring until a silky pink sauce forms.",
      "Add pasta back into the sauce, stir in parmesan, season with pepper and basil, and serve hot."
    ]
  },
  {
    id: "crispy-chickpea-bowl",
    title: "Crispy Spiced Chickpea & Avocado Bowl",
    category: "vegetarian",
    time: "12 min",
    difficulty: "Easy",
    servings: 1,
    desc: "Protein-packed, crunchy, and fresh. No cooking required besides pan-toasting chickpeas.",
    ingredients: [
      "1 can chickpeas, drained and patted dry",
      "1 tbsp olive oil",
      "1 tsp smoked paprika & cumin",
      "1 ripe avocado, sliced",
      "1 cup mixed greens or baby spinach",
      "Juice of 1/2 lemon, salt, and pepper"
    ],
    substitutions: "Top with tahini drizzle or Greek yogurt dressing.",
    steps: [
      "Toss dry chickpeas in olive oil, paprika, cumin, and salt.",
      "Toast in a dry skillet over medium-high heat for 6-8 minutes until golden and crisp.",
      "Assemble greens in a bowl, top with sliced avocado and hot crispy chickpeas.",
      "Squeeze fresh lemon juice over everything and enjoy the crunch."
    ]
  },
  {
    id: "microwave-mug-cake",
    title: "5-Minute Midnight Molten Mug Cake",
    category: "comfort",
    time: "5 min",
    difficulty: "Very Easy",
    servings: 1,
    desc: "Instant chocolate cake fix when you're tempted to late-night scroll in bed.",
    ingredients: [
      "3 tbsp flour",
      "2 tbsp cocoa powder",
      "2 tbsp sugar",
      "1/4 tsp baking powder",
      "3 tbsp milk",
      "1 tbsp melted butter or oil",
      "1 square dark chocolate (hidden in middle)"
    ],
    substitutions: "Use almond milk and coconut oil for vegan version.",
    steps: [
      "In a microwave-safe mug, whisk dry ingredients together with a fork.",
      "Add milk and melted butter; mix until smooth batter forms.",
      "Push chocolate square gently into the center.",
      "Microwave on high for 70 seconds. Let cool for 1 minute before eating."
    ]
  }
];

let selectedCategory = "all";
let activeCookingRecipe = null;
let cookingStep = 0;

export function renderRecipes(container, navigateTo) {
  function render() {
    if (activeCookingRecipe) {
      renderCookingMode();
      return;
    }

    const filtered = selectedCategory === "all"
      ? RECIPES_DATA
      : RECIPES_DATA.filter(r => r.category === selectedCategory);

    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <!-- Header -->
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">Kitchen Therapy</span>
          <h2 class="text-2xl font-black text-white mt-0.5">“GO COOK SOMETHING.” 🍳</h2>
          <p class="text-xs text-gray-400 mt-1">Real food made with your hands > Scrolling through food videos.</p>
        </div>

        <!-- Cook Instead of Scroll Challenge Banner -->
        <div class="glass-card p-4 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-950/25 to-black flex items-center justify-between">
          <div>
            <span class="text-[10px] font-mono uppercase text-amber-400 font-bold">Offline Quest</span>
            <h4 class="text-xs font-bold text-white mt-0.5">“Cook Instead of Scroll” Challenge</h4>
            <p class="text-[11px] text-gray-400">Complete any recipe to claim the Chef Era badge.</p>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">+80 XP</span>
        </div>

        <!-- Filter Pills -->
        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${[
            { id: "all", label: "All Recipes" },
            { id: "10-minute", label: "⚡ 10-Minute" },
            { id: "student", label: "🎓 Student Meals" },
            { id: "vegetarian", label: "🥗 Vegetarian" },
            { id: "comfort", label: "🍫 Comfort Food" }
          ].map(cat => `
            <button class="recipe-cat-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${selectedCategory === cat.id ? 'bg-amber-500/25 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}" data-cat="${cat.id}">
              ${cat.label}
            </button>
          `).join('')}
        </div>

        <!-- Recipe Cards List -->
        <div class="space-y-4">
          ${filtered.map(r => `
            <div class="glass-card p-5 rounded-3xl border border-white/10 space-y-3 glass-card-hover">
              <div class="flex justify-between items-start">
                <div>
                  <span class="text-[10px] font-mono uppercase text-amber-400 font-bold">⏱ ${r.time} • ${r.difficulty}</span>
                  <h3 class="text-base font-extrabold text-white mt-0.5">${r.title}</h3>
                </div>
                <button class="btn-cook-now px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-bold text-amber-200 transition-all flex items-center gap-1.5" data-rid="${r.id}">
                  <span>Cook</span>
                  <span>➔</span>
                </button>
              </div>

              <p class="text-xs text-gray-400 leading-snug">${r.desc}</p>

              <!-- Ingredients Summary -->
              <div class="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span class="text-[10px] font-mono uppercase text-gray-500 block mb-1">Key Ingredients (${r.ingredients.length})</span>
                <p class="text-xs text-gray-300 line-clamp-2">${r.ingredients.join(', ')}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    bindEvents();
  }

  function renderCookingMode() {
    const r = activeCookingRecipe;
    const isLastStep = cookingStep === r.steps.length - 1;

    container.innerHTML = `
      <div class="p-5 flex flex-col justify-between min-h-full max-w-lg mx-auto pb-28">
        <!-- Cooking Header -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <button id="btn-exit-cooking" class="text-xs text-gray-400 hover:text-white flex items-center gap-1">
              ✕ Exit Cooking Mode
            </button>
            <span class="text-xs font-mono text-amber-400 font-bold">Step ${cookingStep + 1} of ${r.steps.length}</span>
          </div>
          <h2 class="text-xl font-black text-white">${r.title}</h2>
        </div>

        <!-- Current Step Card -->
        <div class="glass-card p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-black my-6 text-center space-y-4">
          <span class="text-4xl inline-block p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 animate-breathe">👩‍🍳</span>
          <div class="space-y-2">
            <span class="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest">INSTRUCTION</span>
            <p class="text-base font-bold text-white leading-relaxed">
              ${r.steps[cookingStep]}
            </p>
          </div>

          <div class="p-3 rounded-2xl bg-white/5 border border-white/10 text-left text-xs text-gray-300">
            <span class="text-[10px] font-mono uppercase text-gray-400 block mb-1">Substitutions / Chef Tip:</span>
            <p class="italic text-amber-200/80">${r.substitutions}</p>
          </div>
        </div>

        <!-- Navigation Controls -->
        <div class="flex gap-3">
          ${cookingStep > 0 ? `
            <button id="btn-prev-step" class="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold">
              Previous
            </button>
          ` : ''}

          <button id="btn-next-step" class="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all">
            ${isLastStep ? 'I Finished Cooking! Claim Chef Era 🍳' : 'Next Step ➔'}
          </button>
        </div>
      </div>
    `;

    bindCookingEvents();
  }

  function bindEvents() {
    container.querySelectorAll('.recipe-cat-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        selectedCategory = btn.getAttribute('data-cat');
        render();
      };
    });

    container.querySelectorAll('.btn-cook-now').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        const rid = btn.getAttribute('data-rid');
        activeCookingRecipe = RECIPES_DATA.find(r => r.id === rid);
        cookingStep = 0;
        render();
      };
    });
  }

  function bindCookingEvents() {
    const exitBtn = container.querySelector('#btn-exit-cooking');
    if (exitBtn) {
      exitBtn.onclick = () => {
        sound.playTap();
        activeCookingRecipe = null;
        render();
      };
    }

    const prevBtn = container.querySelector('#btn-prev-step');
    if (prevBtn) {
      prevBtn.onclick = () => {
        sound.playTap();
        if (cookingStep > 0) {
          cookingStep--;
          render();
        }
      };
    }

    const nextBtn = container.querySelector('#btn-next-step');
    if (nextBtn) {
      nextBtn.onclick = () => {
        const isLastStep = cookingStep === activeCookingRecipe.steps.length - 1;
        if (isLastStep) {
          sound.playSuccess();
          if (window.confetti) window.confetti({ particleCount: 100, spread: 70 });
          store.update(s => {
            if (!s.achievements.unlockedBadges.includes("chef_era")) {
              s.achievements.unlockedBadges.push("chef_era");
            }
          });
          store.addXP(80, "Cooked a real meal instead of scrolling");
          alert("Chef Era Unlocked! 🍳\nYou fed yourself real food instead of algorithms.");
          activeCookingRecipe = null;
          render();
        } else {
          sound.playTap();
          cookingStep++;
          render();
        }
      };
    }
  }

  render();
}
