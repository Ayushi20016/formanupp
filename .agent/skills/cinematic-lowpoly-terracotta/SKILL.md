---
name: cinematic-lowpoly-terracotta
description: Creates a procedural, low-poly 3D environment with a warm terracotta/rose color palette, cinematic scroll-driven camera storytelling, and non-photorealistic lighting (avoiding HDRs).
---

# Cinematic Low-Poly Terracotta 3D Environment

This skill defines the architectural and visual rules for building a cinematic, scroll-driven 3D web experience based on a stylized, low-poly aesthetic with a specific warm color palette.

## Core Visual Aesthetic
- **Style**: Non-photorealistic, stylized, low-poly geometry.
- **Palette (Terracotta / Rose / Warm)**:
  - Base Terracotta: `#C4766B`
  - Dark Terracotta: `#A85F55`
  - Mid Terracotta: `#D4897E`
  - Light Terracotta: `#E8A898`
  - Pale Terracotta: `#EFC0B5`
  - Warm Sun / Highlights: `#F5C07A`
- **Lighting**: Do **NOT** use HDRI / Environment maps, as they often introduce unwanted realistic reflections and ruin the flat, stylized look of low-poly models. Instead, use:
  - A strong, warm directional light (sunset angle).
  - A softer fill light from the opposite side.
  - A warm ambient light to lift shadows.
- **Atmosphere**: Use Three.js Fog or `Sparkles` for atmosphere. Use simple procedural gradient skies or `@react-three/drei`'s `<Sky>` and `<Cloud>` components with warm colors.

## Scroll-Driven Storytelling
- The user does not freely navigate the 3D space. The camera is locked to a predefined path (e.g., CatmullRomCurve3).
- Scroll progress (0 to 1) drives the camera's position and `lookAt` target along this path.
- The experience is divided into "Chapters" corresponding to sections of the scroll progress.
- 3D assets and HTML overlays are conditionally rendered or faded in based on the current chapter to maintain performance.

## Procedural Generation
- Build environments procedurally using basic primitives (Box, Cylinder, Cone) when possible, rather than relying on heavy external `.glb` files.
- Example: Buildings can be constructed from stacked boxes with slightly varying colors from the palette. Trees can be constructed from a cylinder trunk and layered cone leaves.

## Asset Handling
- If external `.glb` models are necessary (e.g., specific landmarks or characters), ensure they are optimized (Draco compression) and fit the low-poly aesthetic.
- Characters should be viewed in third-person, acting as a proxy for the user, placed in the foreground of the camera view.
