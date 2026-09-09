---
name: resq-one-parallax-website-builder
description: >-
  Complete knowledge skill for building Awwwards-quality interactive parallax
  multi-page websites in React/Vite/TypeScript using layered PNG depth images
  that react to cursor movement. Covers: extracting Webflow-style layered hero
  assets, implementing 60fps RAF-throttled mousemove parallax physics, building
  multi-page scroll apps with mixed backgrounds (parallax, video, lamp, WebGL),
  deploying to GitHub and Vercel, and all techniques used to build the RESQ ONE
  disaster response platform. Use this skill whenever building interactive
  parallax sites, cursor-reactive layered scenes, or multi-page React apps with
  cinematic scroll backgrounds.
---

# RESQ ONE — Parallax Website Builder Skill

## Overview

This skill captures every technique used to build the **RESQ ONE Awwwards-quality
disaster response platform**: a 9-page React + Vite + TypeScript app with
interactive cursor-reactive parallax backgrounds, Webflow-extracted 19-layer
hero scenes, video backgrounds, glowing lamp effects, and a full GitHub + Vercel
deployment pipeline.

---

## Part 1: How Layered Parallax Images Work

### Core Concept

A parallax hero is built by slicing a single scene into **depth layers** — PNGs
with transparent backgrounds where each layer represents a different Z-depth
(background → midground → foreground). Each layer moves at a different speed
when the cursor moves, creating the illusion of 3D depth.

```
Layer 1 (hero-01.png)  → Sky / background   → slowest movement
Layer 6 (hero-06.png)  → Far mountains       → slow
Layer 8 (hero-cloud3)  → Mid clouds          → medium
Layer 15 (hero-07.png) → Near mountains      → faster
Layer 19 (hero-11.png) → Closest element     → fastest movement
```

### How to Extract Webflow Parallax Layers

When you find a Webflow site with a parallax hero you want to replicate:

1. Open Chrome DevTools → MCP `chrome-devtools-mcp`
2. Navigate to the Webflow preview URL
3. Run this JS in `evaluate_script` to extract all layer image URLs:

```js
() => {
  const frame = document.querySelectorAll('iframe')[0];
  const doc = frame.contentDocument;
  const imgs = Array.from(doc.querySelectorAll('.hero-wrapper img')).map(img => ({
    className: img.className,
    src: img.src,
    zIndex: getComputedStyle(img).zIndex,
    transform: getComputedStyle(img).transform
  }));
  return imgs;
}
```

4. This gives you all CDN image URLs (e.g. `cdn.prod.website-files.com/...`)
5. Use these URLs directly in your React component — no download needed

**The Webflow asset base URL for the RESQ ONE project:**
```
https://cdn.prod.website-files.com/6a63678e7d9fedf000f78abd/
```

**All 19 layer filenames:**
```
6a6367907d9fedf000f78c1b_hero-01.png   (z:1, background)
6a6367907d9fedf000f78c1c_hero-02.png   (z:2)
6a6367907d9fedf000f78c25_hero-03.png   (z:3)
6a6367907d9fedf000f78c23_hero-04.png   (z:4)
6a6367907d9fedf000f78c2a_hero-05.png   (z:5)
6a6367907d9fedf000f78c2d_hero-06.png   (z:6)
6a6367907d9fedf000f78c1d_hero-cloud1.png  (z:7, clouds)
6a6367907d9fedf000f78c1e_hero-cloud2.png  (z:8)
6a6367907d9fedf000f78c20_hero-cloud3.png  (z:9)
6a6367907d9fedf000f78c22_hero-cloud4.png  (z:10)
6a6367907d9fedf000f78c2b_hero-cloud5.png  (z:11)
6a6367907d9fedf000f78c26_hero-cloud6.png  (z:12)
6a6367907d9fedf000f78c1f_hero-cloud7.png  (z:13)
6a6367907d9fedf000f78c27_hero-cloud8.png  (z:14)
6a6367907d9fedf000f78c24_hero-07.png   (z:15, near mountains)
6a6367907d9fedf000f78c28_hero-08.png   (z:16)
6a6367907d9fedf000f78c29_hero-09.png   (z:17)
6a6367907d9fedf000f78c2e_hero-10.png   (z:18)
6a6367907d9fedf000f78c2c_hero-11.png   (z:19, foreground)
```

---

## Part 2: The Parallax Physics Formula

### Speed Parameters Per Layer

Each layer needs 4 parameters:
- `speedX` — how much it moves left/right (0 = stationary, 0.35 = full movement)
- `speedY` — how much it moves up/down
- `speedZ` — depth/perspective Z-push effect (0 = flat, 0.5 = strong 3D)
- `rotation` — subtle rotateY tilt as cursor moves left/right

**Rule:** Background layers = LOW values. Foreground = HIGH values.

```ts
// Background (hero-01): barely moves
{ speedX: 0.02, speedY: 0.015, speedZ: 0, rotation: 0 }

// Mid clouds: medium horizontal drift, no Z
{ speedX: 0.15, speedY: 0.02, speedZ: 0, rotation: 0 }

// Foreground mountain (hero-11): fast, strong 3D
{ speedX: 0.35, speedY: 0.07, speedZ: 0.5, rotation: 0.2 }
```

### The Transform Calculation

```ts
el.style.transform = `perspective(2000px) translate3d(
  calc(-50% + ${-xVal * speedX}px),
  calc(-50% + ${yVal * speedY}px),
  ${speedZ * 100}px
) rotateY(${rotateDeg * rotation}deg)`;
```

Where:
- `xVal = e.clientX - window.innerWidth / 2`  (distance from screen center)
- `yVal = e.clientY - window.innerHeight / 2`
- `rotateDeg = (xVal / (window.innerWidth / 2)) * 15`  (max 15° tilt)

### Critical Performance Rules

**ALWAYS use `requestAnimationFrame` throttling — never raw mousemove:**

```ts
const rafId = useRef<number | null>(null);

const handleMouseMove = (e: MouseEvent) => {
  if (rafId.current !== null) return; // Skip if RAF pending

  rafId.current = requestAnimationFrame(() => {
    rafId.current = null;
    // Do the transform calculations here
  });
};

window.addEventListener('mousemove', handleMouseMove, { passive: true });
```

**Always use `translate3d` not `translateX/Y` separately** — forces GPU compositing:
```ts
// ✅ Good — single GPU-composited call
translate3d(calc(-50% + Xpx), calc(-50% + Ypx), Zpx)

// ❌ Bad — triggers layout recalculation
translateX(calc(-50% + Xpx)) translateY(calc(-50% + Ypx))
```

**Add to each image element:**
```tsx
<img
  loading="lazy"
  decoding="async"
  className="will-change-transform transition-transform duration-[300ms] ease-out"
  style={{ transform: 'translate3d(-50%, -50%, 0)' }}
/>
```

---

## Part 3: WebflowParallaxHero Component (Full Implementation)

Located at: `src/components/ui/WebflowParallaxHero.tsx`

```tsx
import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export const webflowLayers = [
  { src: 'https://cdn.prod.website-files.com/6a63678e7d9fedf000f78abd/6a6367907d9fedf000f78c1b_hero-01.png', alt: 'hero-01', speedX: 0.02, speedY: 0.015, speedZ: 0, rotation: 0, zIndex: 1 },
  // ... (all 19 layers — see Part 1 for full list)
  { src: 'https://cdn.prod.website-files.com/6a63678e7d9fedf000f78abd/6a6367907d9fedf000f78c2c_hero-11.png', alt: 'hero-11', speedX: 0.35, speedY: 0.07, speedZ: 0.5, rotation: 0.2, zIndex: 19 },
];

export const WebflowParallaxHero = ({ className, children }) => {
  const layerRefs = useRef([]);
  const rafId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const xVal = e.clientX - window.innerWidth / 2;
        const yVal = e.clientY - window.innerHeight / 2;
        const rotateDeg = (xVal / (window.innerWidth / 2)) * 15;
        layerRefs.current.forEach((el, i) => {
          if (!el) return;
          const { speedX, speedY, speedZ, rotation } = webflowLayers[i];
          el.style.transform = `perspective(2000px) translate3d(calc(-50% + ${-xVal * speedX}px), calc(-50% + ${yVal * speedY}px), ${speedZ * 100}px) rotateY(${rotateDeg * rotation}deg)`;
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className={cn('relative min-h-screen w-full overflow-hidden bg-[#070b19]', className)}>
      <div className="absolute inset-0 z-[20] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.65))]" />
      {webflowLayers.map((layer, i) => (
        <img
          key={i}
          ref={el => { if (el) layerRefs.current[i] = el; }}
          src={layer.src} alt={layer.alt}
          loading="lazy" decoding="async"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover pointer-events-none max-w-none will-change-transform transition-transform duration-[300ms] ease-out"
          style={{ zIndex: layer.zIndex, transform: 'translate3d(-50%, -50%, 0)' }}
        />
      ))}
      {children}
    </div>
  );
};
```

### How to Use as Page Background

```tsx
<section className="relative min-h-screen overflow-hidden">
  {/* Parallax fills the entire section behind content */}
  <div className="absolute inset-0 z-0">
    <WebflowParallaxHero className="w-full h-full" />
  </div>

  {/* Content floats above at z-20 */}
  <div className="relative z-20 max-w-7xl mx-auto px-4 py-24">
    <h1 className="text-white text-6xl font-bold">Your Content Here</h1>
  </div>
</section>
```

**Transparent floating content rules (no background blocks):**
- Cards: `bg-slate-950/30 backdrop-blur-md border border-white/20`
- Buttons: `bg-sky-600/90 border border-sky-400/40 backdrop-blur-md`
- Text: `text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]`
- Section wrappers: `bg-transparent` / `bg-slate-950/30 backdrop-blur-xl`

---

## Part 4: Mountain Wilderness Parallax (Pages 1–3)

The `wilderness.tsx` component (from ibb.co hosted PNGs) provides a different
parallax style used on Pages 1, 2, and 3 of RESQ ONE. It uses a more complex
formula that accounts for which side of the screen the layer is on.

**Key formula difference:**
```ts
const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;
el.style.transform = `perspective(2300px) translate3d(
  calc(-50% + ${-xVal * speedX}px),
  calc(-50% + ${yVal * speedY}px),
  ${zValue * speedZ}px
) rotateY(${rotateDeg * rotation}deg)`;
```

This makes layers on the LEFT push further back when cursor is on the right,
and vice versa — creating a real sense of dimensionality.

---

## Part 5: Mixed Background System (RESQ ONE Pages)

| Page | Section | Background Type | Component |
|------|---------|----------------|-----------|
| 1 | HeroEarth | 17-layer mountain parallax | `wilderness.tsx` `<ParallaxHero>` |
| 2 | CrisisStory | 17-layer mountain parallax | `wilderness.tsx` `<ParallaxHero>` |
| 3 | ProblemComparison | 17-layer mountain parallax | `wilderness.tsx` `<ParallaxHero>` |
| 4 | Stakeholders | Blooming flower video loop | `<LoopstackHero>` |
| 5 | LiveMap | Cyan conic glowing lamp | `<LampContainer>` from `lamp.tsx` |
| 6 | AiIntelligence | Webflow 19-layer parallax | `<WebflowParallaxHero>` |
| 7 | TimelineSection + LiveDashboard | Webflow 19-layer parallax | `<WebflowParallaxHero>` |
| 8 | FeaturesGrid + ImpactAndTestimonials | Webflow 19-layer parallax | `<WebflowParallaxHero>` |
| 9 | FinalCtaFooter | Premium black radial gradient | CSS inline `radial-gradient` |

### App.tsx Structure Pattern

```tsx
// Each page section has its background wrapper + content component
<section id="stakeholders">
  <LoopstackHero id="stakeholders">
    <Stakeholders />
  </LoopstackHero>
</section>

<section id="ai-triage" className="relative overflow-hidden">
  <div className="absolute inset-0 z-0">
    <WebflowParallaxHero className="w-full h-full" />
  </div>
  <div className="relative z-20">
    <AiIntelligence />
  </div>
</section>
```

---

## Part 6: LampContainer (Cyan Glow) Background

```tsx
// lamp.tsx — creates conic-gradient glowing lamp effect
export const LampContainer = ({ children, className }) => (
  <div className={cn('relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full', className)}>
    <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
      {/* Left conic gradient lamp */}
      <motion.div
        initial={{ opacity: 0.5, width: '15rem' }}
        whileInView={{ opacity: 1, width: '30rem' }}
        className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
      />
      {/* Right mirror */}
      <motion.div
        initial={{ opacity: 0.5, width: '15rem' }}
        whileInView={{ opacity: 1, width: '30rem' }}
        className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
      />
    </div>
    {children}
  </div>
);
```

---

## Part 7: Video Background (LoopstackHero)

```tsx
// LoopstackHero.tsx — full-bleed autoplay video background
export const LoopstackHero = ({ id, children }) => (
  <div id={id} className="relative min-h-screen overflow-hidden">
    <video
      autoPlay muted loop playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
    </video>
    {/* Dark overlay for text legibility */}
    <div className="absolute inset-0 bg-black/30" />
    {/* Content */}
    <div className="relative z-10">{children}</div>
  </div>
);
```

---

## Part 8: Premium Black Footer

For the final/last page, use this premium deep black background instead of parallax:

```tsx
<footer style={{
  background: 'radial-gradient(ellipse at 50% 0%, #0a0f1e 0%, #050709 40%, #000000 100%)',
}}>
  {/* Top hairline glow */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />
  {/* Ambient orb above CTA */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full bg-sky-600/10 blur-[80px] pointer-events-none" />
  {/* Subtle grid texture */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
      backgroundSize: '48px 48px',
    }}
  />
</footer>
```

---

## Part 9: Transparent Floating Content Rules

When content floats over a parallax/video background, ALL background blocks
must be removed. Use these CSS patterns:

```
Cards/panels:    bg-slate-950/30 backdrop-blur-md border border-white/20
Dark panels:     bg-slate-950/80 backdrop-blur-xl border border-white/10
Inputs/forms:    bg-slate-950/60 border border-white/30 backdrop-blur-md
Primary button:  bg-sky-600/90 border border-sky-400/40 backdrop-blur-md
Ghost button:    bg-transparent border border-red-500/40 backdrop-blur-md
Section headers: bg-slate-950/40 border border-sky-400/40 backdrop-blur-md
Dividers:        border-white/20 (not border-slate-800)
Hero headings:   drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]
```

**Never use** on transparent sections:
- `bg-slate-900`, `bg-slate-950` (solid fills block the parallax)
- `shadow-2xl` without backdrop-blur
- `border-slate-800` (too dark, invisible on parallax)

---

## Part 10: Deployment Workflow

### 1. TypeScript Check
```bash
npx tsc --noEmit
# Must show 0 errors before deploying
```

### 2. Production Build
```bash
npm run build
# Creates /dist folder with optimized assets
```

### 3. vercel.json (required)
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 4. GitHub Push
```powershell
git init
git branch -M main
git add .
git commit -m "feat: initial commit"
gh repo create REPO_NAME --public --source=. --remote=origin --push
```

### 5. Vercel Deploy
```bash
npx vercel --yes         # First deploy (creates project)
npx vercel --prod --yes  # Subsequent deploys to production
```

**Vercel auto-aliases** the production URL as `PROJECT_NAME.vercel.app`

---

## Part 11: How to Make Your Own Layered Parallax Images

To create custom depth-layered images (like the mountain scene):

### Option A: Photoshop / Figma Export
1. Start with a full scene illustration or photo
2. Use selection + layer masking to isolate elements at different depths
3. Export each layer as PNG with **transparent background**
4. Name them `layer-01.png` through `layer-N.png` (back to front)
5. Make sure each PNG covers the **full canvas size** (transparency where no element exists)

### Option B: Use AI Generation
1. Generate a scene (e.g. mountains, forest, city skyline)
2. Use Remove.bg or Photoshop Generative Fill to isolate each depth plane
3. Export as transparent PNGs

### Depth Layering Guidelines
- **3–5 layers**: Basic parallax (background + 2 mid + foreground)
- **7–12 layers**: Good depth illusion
- **15–20 layers**: Premium cinematic depth (like RESQ ONE)

**Speed assignment formula:**
```
speedX = (layerIndex / totalLayers) * maxSpeed
// Example with 19 layers, maxSpeed = 0.35:
// Layer 1:  speedX = (1/19) * 0.35  = 0.018
// Layer 10: speedX = (10/19) * 0.35 = 0.184
// Layer 19: speedX = (19/19) * 0.35 = 0.35
```

---

## Common Mistakes

1. **Using raw `mousemove` without RAF** — causes 60+ DOM updates per second,
   janky animation. Always gate behind `requestAnimationFrame`.

2. **Using `translateX() translateY()` separately** — triggers separate GPU
   layers. Always use a single `translate3d(x, y, z)` call.

3. **Forgetting `will-change-transform`** — browser won't pre-promote the element
   to its own compositor layer, causing paint on every frame.

4. **Putting heavy backgrounds on parallax pages** — solid `bg-slate-900` blocks
   completely hides the parallax behind content. Use `bg-slate-950/30` with
   `backdrop-blur-md` instead.

5. **Not adding `{ passive: true }` to mousemove** — blocks scroll and causes
   browser warnings. Always add `window.addEventListener('mousemove', fn, { passive: true })`.

6. **Parallax inside a CSS `transform` parent** — `perspective()` on a child
   doesn't work correctly if the parent also has a `transform`. Ensure the
   parallax container's parent has no transform.

---

## RESQ ONE Project Reference

- **Live site**: https://resq-one-one.vercel.app
- **GitHub**: https://github.com/Priyanshuf1/github
- **Local path**: `C:\Users\apriy\.gemini\antigravity\scratch\resq-one`
- **Stack**: React 18, Vite 6, TypeScript, Tailwind CSS, Framer Motion, Recharts, Lucide Icons
- **Pages**: 9 sections (HeroEarth → CrisisStory → ProblemComparison → Stakeholders → LiveMap → AiIntelligence → TimelineSection+LiveDashboard → FeaturesGrid+ImpactAndTestimonials → FinalCtaFooter)
