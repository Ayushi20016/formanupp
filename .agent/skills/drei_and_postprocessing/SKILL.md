---
name: Drei & React Postprocessing
description: Best practices and patterns for using @react-three/drei and @react-three/postprocessing in React Three Fiber (R3F) applications.
---

# Drei & React Postprocessing Skill

## 1. Core Principles
- **Drei** (`@react-three/drei`) provides high-level helper components and abstractions for R3F, dramatically reducing boilerplate for common Three.js elements (cameras, controls, loaders, environments).
- **React Postprocessing** (`@react-three/postprocessing`) wraps the `postprocessing` library in React components, allowing declarative, performant application of image effects (Bloom, DOF, Vignette) via an `EffectComposer`.
- Performance is key: excessive post-processing passes can tank framerates. Chain effects efficiently and use proper settings (like `mipmapBlur` for Bloom).

## 2. Common Code Patterns

### Setup with Canvas and Drei Controls
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Center, Text } from '@react-three/drei'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* Lighting and Environment */}
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      {/* Content */}
      <Center>
        <Text fontSize={1} color="white">Hello 3D</Text>
      </Center>

      {/* Controls */}
      <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
    </Canvas>
  )
}
```

### Applying Postprocessing Effects
```tsx
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing'

export function PostProcessing() {
  return (
    <EffectComposer disableNormalPass>
      <DepthOfField target={[0, 0, 0]} focalLength={0.02} bokehScale={2} height={480} />
      <Bloom 
        luminanceThreshold={1} 
        mipmapBlur 
        intensity={1.5} 
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}
```

## 3. Best Practices
- **Postprocessing Render Passes**: Always use `disableNormalPass` on `EffectComposer` unless you specifically require depth/normal buffers for effects like SSAO. It saves performance.
- **Bloom**: Use `mipmapBlur={true}` on `<Bloom>` for a smooth, physically accurate glow rather than the standard cross-blur. Set `luminanceThreshold` > 1 if using HDR colors (e.g., `emissiveIntensity={2}`).
- **Drei Preloading**: Use `useGLTF.preload(path)` or `useTexture.preload(path)` outside your components to start downloading heavy assets immediately.
- **Drei Environment**: Use `<Environment preset="night" />` or load an HDR for realistic PBR material reflections without setting up complex lighting manually.
- **Performance Testing**: Keep an eye on draw calls. If combining Drei models and Postprocessing, monitor GPU usage as post-processing is bandwidth-heavy.
