---
name: cinematic-frame-sequence-scroll
description: >-
  Advanced GSAP and Canvas techniques for synchronizing a massive extracted video frame sequence (e.g., 800+ frames) perfectly to scroll progress, bypassing mobile video limitations.
---

# Cinematic Frame Sequence Scroll

## Overview
When building heavy cinematic experiences relying on high-fidelity video tied to scroll (e.g., Apple-style product pages or highly stylized edits), native HTML5 `<video>` tags fail critically on mobile devices. They lock up, desync, and fail to scrub backward smoothly. 

This skill documents the exact architecture to solve this: extracting the video into a JPEG frame sequence, preloading it in asynchronous chunks without blocking the main thread, and drawing it perfectly to a WebGL/Canvas context synced to GSAP ScrollTrigger.

## Dependencies
- `gsap` (ScrollTrigger)
- React / Next.js (for the hooks and orchestration)

## Workflow

### 1. Frame Extraction
Always extract the video to sequential JPEG frames at 30fps.
```bash
ffmpeg -i video.mp4 -vf fps=30 -q:v 2 frames/frame-%04d.jpg
```
Store them in the `public/frames` folder.

### 2. The Chunked Preloader (`useFrameLoader.ts`)
To prevent the browser from crashing or hanging while loading 800+ images (200MB+), use a phased preloading strategy:
1. Load the first 40 frames urgently (`PRELOAD_INITIAL`).
2. Yield to `requestAnimationFrame` and load the rest in batches (`PRELOAD_BATCH_SIZE = 30`).
3. Handle async decoding (`img.decoding = 'async'`).

### 3. The Canvas Renderer (`FrameSequenceCanvas.tsx`)
Never use massive arrays of `<img>` tags or CSS background-images. Instead, use a single `<canvas>` element and `requestAnimationFrame`.
- Calculate the exact frame based on GSAP scroll progress (0 to 1).
- Draw the preloaded `HTMLImageElement` directly to the Canvas Context using `drawImage`.
- Scale the image to `cover` the canvas context dynamically using aspect ratio calculations.

### 4. Scene Orchestration (`sequence.ts`)
Map specific scroll percentages (or exact frame numbers) to specific DOM scenes:
```typescript
export const SECTION_FRAMES = {
  hero:     { start: 1,   end: 120 }, // 0–15%
  about:    { start: 120, end: 250 }, // 15–30%
}
```
Pin the parent container using GSAP, and trigger your HTML DOM animations when the ScrollTrigger progress hits the threshold for the corresponding frame.

## Rate Limiting & Performance
- **Mobile RAM Limits:** A single 1080x1920 uncompressed image in RAM is ~8MB. 800 frames is ~6.4GB of RAM. Mobile Safari limits web views to ~1.5GB to 2GB. 
- **Mitigation:** Only keep the `src` references active and rely on the browser's disk cache, OR downscale frames for mobile devices. Never store base64 strings in memory.

## Common Mistakes
- **CSS Animations on Sequences:** Trying to swap `background-image` or `opacity` on 800 DOM nodes. It will crash the browser immediately.
- **Synchronous Loading:** Attempting `Promise.all` on 800 images at once, which blocks the main thread and freezes the preloader UI.
- **Scroll Desync:** Using a low `vh` height for the scroll container. For 800 frames, use at least `900vh` to give the user enough scroll dwell-time to see the animation smoothly.
