---
name: lenis-smooth-scrolling
description: Implementation guidelines for Lenis, a lightweight and performant smooth scrolling library for the web.
---

# Lenis Smooth Scrolling

Lenis (by darkroom.engineering) is a lightweight, robust, and accessible smooth scrolling library. It interpolates the scroll position instead of hijacking the scrollbar, ensuring better performance and compatibility with native browser features like `position: sticky`.

## Core Principles
1. **Accessibility First**: Scroll hijacking is generally bad; Lenis respects native scroll and enhances it via smooth interpolation.
2. **Performance**: Built to run perfectly at 60+ FPS on a dedicated `requestAnimationFrame` loop.
3. **Integration-friendly**: Seamlessly works with animation libraries like GSAP, particularly ScrollTrigger.

## Common Code Patterns

### Vanilla Setup
```javascript
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
```

### React Setup
Using the official React wrapper (`@studio-freight/react-lenis` or `@darkroom.engineering/react-lenis`):
```jsx
import { ReactLenis, useLenis } from 'lenis/react'

function Layout({ children }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}
```

### GSAP ScrollTrigger Integration
To keep Lenis and GSAP ScrollTrigger in sync:
```javascript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

## Best Practices
- **CSS Requirements**: Ensure your `html` and `body` elements do not have `overflow: hidden` or `height: 100%` if you want the native scrollbar to be interpolated. Often, `width: 100%; min-height: 100vh;` is standard.
- **Stop/Start**: Use `lenis.stop()` and `lenis.start()` when opening modals or menus to prevent background scrolling.
- **Anchor Links**: Lenis provides `lenis.scrollTo(target)` which should be used for all internal anchor links to maintain the smooth scroll behavior.
