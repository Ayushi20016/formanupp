---
name: barba
description: Barba.js is a library used to create fluid and smooth transitions between genuinely separate pages, giving a cinematic, SPA-like feel to multi-page websites.
---

# Barba.js Skill

Barba.js creates smooth transitions between website pages. It uses PJAX (pushState AJAX) to load new pages, update the URL, and animate elements, preventing the default hard page reload.

## Core Principles

- **PJAX Navigation:** Barba intercepts link clicks, fetches the next page via XMLHttpRequest/fetch, replaces the container, and updates the browser history.
- **Transitions over Reloads:** Creates a cinematic, App-like experience on a multi-page site.
- **Use Cases in the Stack:** According to global rules, Barba.js is used specifically for "cinematic transitions between genuinely separate pages."

## Setup and Markup Structure

Barba expects a specific HTML structure using `data-barba` attributes.

```html
<!-- The wrapper keeps the structure intact during transitions -->
<div data-barba="wrapper">
  <!-- The container is the element that will be replaced -->
  <main data-barba="container" data-barba-namespace="home">
    <h1>Home Page</h1>
    <a href="/about.html">Go to About</a>
  </main>
</div>
```

## Common Code Patterns

### Basic Initialization with GSAP
Barba is unopinionated about the animation library. In our stack, GSAP is the preferred tool for these master transitions.

```javascript
import barba from '@barba/core';
import gsap from 'gsap';

barba.init({
  transitions: [{
    name: 'fade-transition',
    // Leave hook: animate current page out
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.5
      });
    },
    // Enter hook: animate next page in
    enter(data) {
      // Set initial state
      gsap.set(data.next.container, { opacity: 0 });
      
      return gsap.to(data.next.container, {
        opacity: 1,
        duration: 0.5
      });
    }
  }],
  views: [{
    namespace: 'home',
    beforeEnter() {
      // Run specific scripts for the home page
    }
  }]
});
```

## Best Practices

- **Clean up memory:** Always destroy or kill GSAP timelines, ScrollTrigger instances, or Three.js contexts in the `leave` or `beforeLeave` hooks to prevent memory leaks across page transitions.
- **Re-initialize scripts:** Third-party scripts (like analytics or custom interactions) need to be re-initialized on `afterEnter` or `enter` because the page is not hard-reloading.
- **CSS loading:** Be mindful of CSS. If you're using page-specific CSS files, Barba won't automatically load them. It's usually best to compile your CSS into a single file or use a bundler setup that handles this smoothly.
- **Promises:** Make sure to return the animation Promise (like the one GSAP returns from `.to()`) in your Barba hooks so Barba knows when the transition finishes.
