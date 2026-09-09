/**
 * My Collections & "Offline Me" Memory Capsule for FORMANUPP
 * Private client-side vault for offline photo proof, journal reflections, and personal milestones.
 * Strictly 100% private to the device.
 */

import { store } from '../state.js';
import { sound } from '../audio.js';

let activeTab = "photos";

export function renderCollections(container, navigateTo) {
  const state = store.get();
  const collections = state.collections;

  function render() {
    container.innerHTML = `
      <div class="p-5 space-y-5 max-w-lg mx-auto pb-28">
        <!-- Header -->
        <div class="flex justify-between items-start">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Private Memory Vault</span>
            <h2 class="text-2xl font-black text-white mt-0.5">MY COLLECTIONS 📂</h2>
            <p class="text-xs text-gray-400 mt-0.5">“Proof that you existed outside the internet.”</p>
          </div>
          <span class="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center gap-1">
            <span>🔒</span> 100% Private
          </span>
        </div>

        <!-- Offline Me Photo Uploader Callout -->
        <div class="glass-card p-4 rounded-3xl border border-pink-500/25 bg-gradient-to-r from-pink-950/30 to-purple-950/20 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-2xl">📷</span>
              <div>
                <h3 class="text-xs font-bold text-pink-200">“OFFLINE ME”</h3>
                <p class="text-[11px] text-gray-400">Capture real-life moments for yourself, not followers.</p>
              </div>
            </div>
            <label class="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-xs font-bold text-pink-200 cursor-pointer transition-all">
              <span>+ Add Photo</span>
              <input type="file" id="offline-photo-input" accept="image/*" class="hidden">
            </label>
          </div>
          <p class="text-[10px] text-gray-400 italic">
            Never uploaded to any server or social media. Stored strictly in your browser's private local vault.
          </p>
        </div>

        <!-- Tab Bar -->
        <div class="flex gap-2 border-b border-white/10 pb-2">
          <button class="col-tab-btn text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${activeTab === 'photos' ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30' : 'text-gray-400 hover:text-white'}" data-tab="photos">
            Offline Photos (${collections.photos.length})
          </button>
          <button class="col-tab-btn text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${activeTab === 'reflections' ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30' : 'text-gray-400 hover:text-white'}" data-tab="reflections">
            Journal Entries (${collections.reflections.length})
          </button>
        </div>

        <!-- Tab Contents -->
        ${activeTab === 'photos' ? renderPhotosTab() : renderReflectionsTab()}
      </div>
    `;

    bindEvents();
  }

  function renderPhotosTab() {
    if (collections.photos.length === 0) {
      return `
        <div class="p-8 text-center glass-card rounded-3xl border border-white/10 space-y-2">
          <span class="text-4xl block mb-2">📸</span>
          <p class="text-sm font-bold text-gray-200">No offline photos yet</p>
          <p class="text-xs text-gray-400">Take a photo after a walk or a meal and add it here as proof that 3D life happened.</p>
        </div>
      `;
    }

    return `
      <div class="grid grid-cols-2 gap-3">
        ${collections.photos.map(p => `
          <div class="glass-card rounded-3xl border border-white/10 overflow-hidden group">
            <div class="h-36 bg-black/40 relative overflow-hidden">
              <img src="${p.src}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-3">
              <p class="text-xs font-bold text-white truncate">${p.title}</p>
              <p class="text-[10px] text-gray-400 font-mono mt-0.5">${p.date}</p>
              ${p.notes ? `<p class="text-[11px] text-purple-300/90 mt-1 line-clamp-2 italic">${p.notes}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderReflectionsTab() {
    if (collections.reflections.length === 0) {
      return `
        <div class="p-8 text-center glass-card rounded-3xl border border-white/10 space-y-2">
          <span class="text-4xl block mb-2">✍️</span>
          <p class="text-sm font-bold text-gray-200">No reflections saved yet</p>
          <p class="text-xs text-gray-400">Answer questions in the Mind Check-in or "Are you actually bored?" cards to save them here.</p>
        </div>
      `;
    }

    return `
      <div class="space-y-3">
        ${collections.reflections.map(r => `
          <div class="glass-card p-4 rounded-3xl border border-white/10 space-y-2">
            <div class="flex justify-between items-baseline">
              <span class="text-[10px] font-mono uppercase text-purple-400 font-bold">Thought Capsule</span>
              <span class="text-[10px] text-gray-500 font-mono">${r.date}</span>
            </div>
            <h4 class="text-xs font-bold text-white">“${r.prompt}”</h4>
            <p class="text-xs text-gray-300 bg-white/5 p-3 rounded-2xl border border-white/5 leading-relaxed italic">
              “${r.answer}”
            </p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function bindEvents() {
    container.querySelectorAll('.col-tab-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playTap();
        activeTab = btn.getAttribute('data-tab');
        render();
      };
    });

    const photoInput = container.querySelector('#offline-photo-input');
    if (photoInput) {
      photoInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const title = prompt("Give this offline moment a title (e.g. 'Coffee without phone', 'Sunset walk'):", "Offline moment");
            if (title) {
              sound.playSuccess();
              store.update(s => {
                s.collections.photos.unshift({
                  id: `photo-${Date.now()}`,
                  title: title,
                  date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  src: event.target.result,
                  notes: "Proof that you existed outside the internet."
                });
              });
              store.addXP(40, "Added photo to Offline Me capsule");
              render();
            }
          };
          reader.readAsDataURL(file);
        }
      };
    }
  }

  render();
}
