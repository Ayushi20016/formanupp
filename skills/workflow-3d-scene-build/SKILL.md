---
name: /3d-scene-build
description: >
  Audits and builds an optimized React Three Fiber (R3F) or vanilla Three.js scene.
---

## Workflow

1. **Planning Phase**: Formulate a structural implementation plan for the WebGL context. **Do not modify production projects without first producing a plan.**
2. **Implementation**: Set up the core scene using `react-three-fiber-cinematic-scenes` and optimize assets via `gltf-asset-optimization`.
3. **Optimization**: Call `/performance-pass` to ensure stable framerates.
4. **QA**: Call `/visual-qa` upon completion.
