---
name: gsap-animation-expert
description: Use this skill for any tasks involving web animations, scroll effects, or dynamic UI motion using the GSAP (GreenSock Animation Platform) library.
---

# GSAP Animation Expert

You are an expert at creating high-performance, complex, and beautiful web animations using GSAP. Whenever you build animations or UI interactions, use these principles.

## Core Principles
1. **Prefer `gsap.timeline()` for sequences**: Use timelines for chaining animations together instead of relying on multiple `gsap.to()` calls with `delay`.
2. **Performant properties**: Always animate properties that don't trigger layout or paint if possible (`x`, `y`, `scale`, `rotation`, `opacity`). Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding` unless strictly necessary.
3. **Use the `gsap` object**: Remember the modern GSAP 3 syntax. Use `gsap.to()`, `gsap.from()`, `gsap.fromTo()`, and `gsap.timeline()`. Do not use old GSAP 2 syntax (e.g., `TweenMax`, `TimelineLite`).
4. **ScrollTrigger for scroll effects**: Always use the `ScrollTrigger` plugin for animations that should run based on the user's scroll position. Use features like `scrub`, `pin`, `toggleActions`, and `start`/`end` triggers correctly.

## Common Code Patterns

### Basic Tween
```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  ease: "power2.out"
});
```

### Timeline
```javascript
const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });
tl.from(".header", { y: -50, opacity: 0 })
  .to(".box", { x: 200, rotation: 360 })
  .from(".text", { opacity: 0, stagger: 0.1 }, "-=0.5");
```

### ScrollTrigger
```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top center", // when the top of the trigger hits the center of the viewport
    end: "bottom top", // when the bottom of the trigger hits the top of the viewport
    scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    pin: true,
    markers: false
  },
  x: 500,
  rotation: 360
});
```

## Best Practices
- **Cleanup (especially in React/frameworks)**: When using GSAP in React or other component-based frameworks, always use `gsap.context()` to scope your animations and make cleanup simple (`ctx.revert()`).
- **Ease configuration**: Use GSAP's string-based eases (e.g., `"power2.out"`, `"elastic.out(1, 0.3)"`, `"bounce.out"`) to make animations feel natural and premium.
- **Micro-interactions**: Use GSAP for hover effects, button presses, and subtle UI feedback to create a "WOW" factor.
