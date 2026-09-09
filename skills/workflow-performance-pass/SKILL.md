---
name: /performance-pass
description: >
  Measures and mitigates CPU, GPU, memory, and bundle size costs for web experiences.
---

## Workflow

1. **Metrics Gathering**: Measure WebGL frame timings and check for excessive DOM reflows or CPU spikes.
2. **LOD & Scaling**: Implement dynamic pixel-ratio scaling and texture compression using `responsive-vfx-performance`.
3. **Memory Management**: Dispose of unused WebGL materials/geometries and check for React unmount memory leaks.
4. **Reporting**: Generate a performance optimization artifact.
