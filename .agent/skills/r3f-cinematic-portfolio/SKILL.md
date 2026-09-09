---
name: r3f-cinematic-portfolio
description: >-
  Architects a high-performance, scroll-driven 3D web experience using Next.js, 
  React Three Fiber (R3F), GSAP, Lenis, and Zustand. Separates Canvas and HTML 
  layers, handles camera splines, performance tiers, and reduced-motion fallback.
---

# R3F Cinematic Portfolio

## Overview
This skill guides the construction of immersive, scroll-driven 3D web experiences (like portfolios or high-end product pages). It strictly enforces an architecture that separates the 3D WebGL Canvas from HTML UI overlays to maintain high frame rates. Scroll progress drives the 3D camera along a defined spline, while Zustand manages global state.

## Dependencies
- **`gsap-animation-expert`**: Use for timeline management and orchestrating complex UI reveal animations.
- **`lenis-smooth-scrolling`**: Use for scroll hijacking and piping normalized progress values into the state.
- **`react-three-fiber`**: Standard best practices for componentizing 3D elements.
- **`accessibility-for-motion`**: Strict enforcement of `prefers-reduced-motion` to bypass camera animation for sensitive users.

## Workflow

### 1. Project Scaffolding
- Initialize Next.js (App Router, TypeScript, Tailwind CSS).
- Install dependencies: `three @react-three/fiber @react-three/drei @react-three/postprocessing gsap lenis zustand`.

### 2. Global State Management (Zustand)
Create a store (`experienceStore.ts`) to manage:
- `scrollProgress` (number 0-1)
- `currentChapter` (string/enum)
- `qualityTier` ('LOW' | 'BALANCED' | 'HIGH')
- `reducedMotion` (boolean)
- `webGLAvailable` (boolean)
- `hasEntered` (boolean for loading screen bypass)

### 3. Smooth Scrolling (Lenis)
- Initialize Lenis in a client-side wrapper (e.g., `app/page.tsx` inside `useEffect`).
- Hook into Lenis' `on('scroll')` event to update `scrollProgress` in Zustand.
- **Crucial**: Do *not* pass scroll progress via React Context or props to avoid re-rendering the entire component tree on every frame. Rely on `useExperienceStore.getState()` inside R3F's `useFrame`.

### 4. Canvas vs. UI Architecture
Strictly separate the DOM:
```tsx
// app/page.tsx
<>
  <div id="canvas-container" className="fixed inset-0 z-0 pointer-events-none">
    <ExperienceCanvas />
  </div>
  <div id="ui-layer" className="fixed inset-0 z-10 pointer-events-none">
    {/* UI components go here; toggle pointer-events-auto on interactive elements */}
  </div>
  <div id="scroll-container" className="h-[800vh]">
    {/* Invisible div to force native scrolling */}
  </div>
</>
```

### 5. Camera Spline Rigging
Create a `CameraRig.tsx` inside the Canvas:
- Define waypoints (Start Scroll, End Scroll, Position `[x,y,z]`, Target `[x,y,z]`).
- In `useFrame`, read the current scroll progress directly from Zustand.
- Calculate the current spline segment.
- Use `THREE.MathUtils.lerp` or `new THREE.Vector3().lerp()` to interpolate the camera's position and look-at target.
- Apply a subtle pointer parallax effect (only on desktop).

### 6. Performance Scaling
Implement graceful degradation based on `qualityTier`:
- **LOW (Mobile / Low memory)**: Disable shadows, set DPR to 1, completely remove `<EffectComposer>` (Bloom, Depth of Field, Vignette).
- **BALANCED**: Enable basic shadows, DPR to 1-1.5, lightweight Postprocessing.
- **HIGH**: High-res shadows, DPR to 2, full Postprocessing (Multisampling 4).
- Use `<AdaptiveDpr pixelated />` and `<AdaptiveEvents />` from `drei` to maintain framerates during camera movement.

### 7. Accessibility (Reduced Motion)
- Detect `prefers-reduced-motion: reduce` on initial load.
- If true, bypass the camera spline interpolation entirely. Snap the camera to a static wide shot and allow the user to scroll through standard HTML sections instead.

## Common Mistakes
- **Prop Drilling Scroll State:** Passing `scrollProgress` via props will cause React to re-render the whole app 60 times a second. Always read it inside `useFrame` directly from the Zustand store.
- **Forgetting `pointer-events: none` on the UI wrapper:** If the UI wrapper blocks pointer events, `OrbitControls` or Raycasting in the 3D canvas won't work.
- **Invalid EffectComposer Children:** Postprocessing effects do not accept conditional React nodes (`false | Element`). Cast falsey conditions to `null as any` or use `@ts-ignore` to avoid TypeScript build failures.
