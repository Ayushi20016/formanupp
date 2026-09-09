/**
 * FORMANUPP Main Application Controller
 * Orchestrates routing, navigation bar, side drawer, dynamic island,
 * background notification toasts, eye-break alerts, and screen rendering.
 */

import { store } from './state.js';
import { sound } from './audio.js';
import { NOTIFICATION_QUOTES, SCREEN_TIME_ALERTS } from './quotes.js';

import { renderOnboarding } from './screens/onboarding.js';
import { renderHome } from './screens/home.js';
import { renderMind } from './screens/mind.js';
import { renderFocus } from './screens/focus.js';
import { renderFuneral } from './screens/funeral.js';
import { renderMystery } from './screens/mystery.js';
import { renderReset } from './screens/reset.js';
import { renderGlowUp } from './screens/glowup.js';
import { renderRecipes } from './screens/recipes.js';
import { renderCollections } from './screens/collections.js';
import { renderInsights } from './screens/insights.js';
import { renderEyeBreak } from './screens/eye_break.js';
import { renderAchievements } from './screens/achievements.js';
import { renderSettings } from './screens/settings.js';
import { showSignatureModal } from './screens/signature.js';

class App {
  constructor() {
    this.currentScreen = 'home';
    this.drawerOpen = false;
    this.container = document.getElementById('screen-container');
    this.drawer = document.getElementById('side-drawer');
    this.bottomNav = document.getElementById('bottom-nav');
    this.dynamicIsland = document.getElementById('dynamic-island');
    this.toastContainer = document.getElementById('toast-container');
    this.mockupWrapper = document.getElementById('phone-wrapper');

    this.init();
  }

  init() {
    const state = store.get();

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', state.settings.theme || 'dark');
    sound.setMuted(!state.settings.soundEnabled);

    // If not onboarded yet, start on onboarding
    if (!state.profile.onboarded) {
      this.currentScreen = 'onboarding';
    }

    this.bindGlobalEvents();
    this.renderCurrentScreen();
    this.startBackgroundNotificationToasts();

    // Listen for state changes
    store.subscribe((nextState) => {
      this.updateDynamicIsland(nextState);

      // Check for eye break prompt
      if (nextState.eyeBreak.activePrompt && this.currentScreen !== 'eye_break') {
        nextState.eyeBreak.activePrompt = false;
        this.showToast("Your eyes called. They want a meeting. 👁️", "Click here for 20-20-20 ocular reset.", () => {
          this.navigateTo('eye_break');
        });
      }
    });
  }

  navigateTo(screenName) {
    sound.playTap();
    this.currentScreen = screenName;
    this.closeDrawer();
    this.renderCurrentScreen();
    this.updateBottomNavHighlight();
  }

  renderCurrentScreen() {
    const state = store.get();
    const isOb = this.currentScreen === 'onboarding';

    // Show or hide bottom nav during onboarding
    if (this.bottomNav) {
      this.bottomNav.style.display = isOb ? 'none' : 'flex';
    }

    switch (this.currentScreen) {
      case 'onboarding':
        renderOnboarding(this.container, () => {
          this.navigateTo('home');
        });
        break;
      case 'home':
        renderHome(this.container, (s) => this.navigateTo(s));
        break;
      case 'mind':
        renderMind(this.container, (s) => this.navigateTo(s));
        break;
      case 'focus':
        renderFocus(this.container, (s) => this.navigateTo(s));
        break;
      case 'funeral':
        renderFuneral(this.container, (s) => this.navigateTo(s));
        break;
      case 'mystery':
        renderMystery(this.container, (s) => this.navigateTo(s));
        break;
      case 'reset':
        renderReset(this.container, (s) => this.navigateTo(s));
        break;
      case 'glowup':
        renderGlowUp(this.container, (s) => this.navigateTo(s));
        break;
      case 'recipes':
        renderRecipes(this.container, (s) => this.navigateTo(s));
        break;
      case 'collections':
        renderCollections(this.container, (s) => this.navigateTo(s));
        break;
      case 'insights':
        renderInsights(this.container, (s) => this.navigateTo(s));
        break;
      case 'eye_break':
        renderEyeBreak(this.container, (s) => this.navigateTo(s));
        break;
      case 'achievements':
        renderAchievements(this.container, (s) => this.navigateTo(s));
        break;
      case 'settings':
        renderSettings(this.container, (s) => this.navigateTo(s), () => this.toggleMockupWidth());
        break;
      default:
        renderHome(this.container, (s) => this.navigateTo(s));
    }

    // Scroll to top
    if (this.container) {
      this.container.scrollTop = 0;
    }
  }

  updateBottomNavHighlight() {
    const navButtons = document.querySelectorAll('.bottom-nav-btn');
    navButtons.forEach(btn => {
      const target = btn.getAttribute('data-screen');
      if (target === this.currentScreen) {
        btn.classList.add('text-purple-300', 'scale-105');
        btn.classList.remove('text-gray-400');
      } else {
        btn.classList.remove('text-purple-300', 'scale-105');
        btn.classList.add('text-gray-400');
      }
    });
  }

  updateDynamicIsland(state) {
    if (!this.dynamicIsland) return;
    if (state.focus.isRunning) {
      const mins = Math.floor(state.focus.remainingSeconds / 60);
      const secs = state.focus.remainingSeconds % 60;
      this.dynamicIsland.innerHTML = `
        <span class="text-[10px] text-emerald-400 font-mono font-bold">⏱ ${mins}:${secs.toString().padStart(2, '0')}</span>
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      `;
    } else if (state.detox.inFuneral) {
      this.dynamicIsland.innerHTML = `
        <span class="text-[10px] text-rose-300 font-mono font-bold">🪦 Detox</span>
        <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
      `;
    } else if (state.mystery.active) {
      this.dynamicIsland.innerHTML = `
        <span class="text-[10px] text-purple-300 font-mono font-bold">🕶️ Ghost</span>
        <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
      `;
    } else {
      this.dynamicIsland.innerHTML = `
        <div class="w-2.5 h-2.5 rounded-full bg-stone-700"></div>
        <div class="w-2 h-2 rounded-full bg-blue-900/60"></div>
      `;
    }
  }

  showToast(title, body, onClick) {
    if (!this.toastContainer) return;
    sound.playTap();

    const toast = document.createElement('div');
    toast.className = 'glass-card p-3 rounded-2xl border border-purple-500/30 bg-black/85 shadow-xl flex items-center justify-between gap-3 text-left cursor-pointer animate-fadeIn duration-300 pointer-events-auto max-w-xs';
    toast.innerHTML = `
      <div class="flex items-center gap-2.5 flex-1">
        <span class="text-xl">🕶️</span>
        <div>
          <p class="text-xs font-bold text-white leading-tight">${title}</p>
          <p class="text-[10px] text-gray-300 leading-tight mt-0.5">${body}</p>
        </div>
      </div>
      <span class="text-xs text-purple-400">➔</span>
    `;

    toast.onclick = () => {
      toast.remove();
      if (onClick) onClick();
    };

    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 6000);
  }

  startBackgroundNotificationToasts() {
    // Random witty notification pop every 45-60 seconds for immersive demo feel
    setInterval(() => {
      const state = store.get();
      if (!state.settings.notificationsEnabled || this.currentScreen === 'onboarding') return;

      const randomQuote = NOTIFICATION_QUOTES[Math.floor(Math.random() * NOTIFICATION_QUOTES.length)];
      this.showToast(randomQuote.title, randomQuote.body, () => {
        showSignatureModal(() => {
          this.navigateTo('reset');
        });
      });
    }, 45000);
  }

  toggleDrawer() {
    sound.playTap();
    this.drawerOpen = !this.drawerOpen;
    if (this.drawer) {
      if (this.drawerOpen) {
        this.drawer.classList.remove('translate-x-full');
      } else {
        this.drawer.classList.add('translate-x-full');
      }
    }
  }

  closeDrawer() {
    this.drawerOpen = false;
    if (this.drawer) {
      this.drawer.classList.add('translate-x-full');
    }
  }

  toggleMockupWidth() {
    if (this.mockupWrapper) {
      this.mockupWrapper.classList.toggle('full-width');
    }
  }

  bindGlobalEvents() {
    // Bottom Nav items
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
      btn.onclick = () => {
        const target = btn.getAttribute('data-screen');
        this.navigateTo(target);
      };
    });

    // Drawer button
    const menuBtn = document.getElementById('top-menu-btn');
    if (menuBtn) {
      menuBtn.onclick = () => this.toggleDrawer();
    }

    const drawerClose = document.getElementById('drawer-close-btn');
    if (drawerClose) {
      drawerClose.onclick = () => this.closeDrawer();
    }

    // Drawer links
    document.querySelectorAll('.drawer-item-btn').forEach(btn => {
      btn.onclick = () => {
        const target = btn.getAttribute('data-screen');
        this.navigateTo(target);
      };
    });

    // Dynamic Island click -> Reality check
    if (this.dynamicIsland) {
      this.dynamicIsland.onclick = () => {
        showSignatureModal(() => {
          this.navigateTo('reset');
        });
      };
    }

    // App logo click -> Home
    const logoBtn = document.getElementById('app-logo-btn');
    if (logoBtn) {
      logoBtn.onclick = () => this.navigateTo('home');
    }
  }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
