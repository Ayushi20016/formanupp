---
name: GLSL Shaders (WebGL)
description: Fundamentals, patterns, and best practices for writing GLSL shaders in WebGL and WebGL 2 (especially within Three.js / R3F).
---

# GLSL Shaders for WebGL

## 1. Core Principles
- Shaders are small programs written in GLSL (OpenGL Shading Language) that run directly on the GPU.
- **Vertex Shaders** calculate the position of vertices in screen space (`gl_Position`).
- **Fragment Shaders** calculate the color of each pixel (`gl_FragColor`).
- Data is passed via:
  - **Uniforms**: Global variables constant for all vertices/pixels in a draw call (e.g., time, resolution, mouse position).
  - **Attributes**: Data specific to each vertex (e.g., position, normal, uv).
  - **Varyings**: Data passed from the vertex shader to the fragment shader, automatically interpolated across the face of the polygon.

## 2. Common Code Patterns

### Standard Three.js / R3F ShaderMaterial
In R3F, you typically use `<shaderMaterial>` to define custom shaders.

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vec3 color = vec3(vUv.x, vUv.y, sin(uTime) * 0.5 + 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`

export function CustomShaderMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  )
}
```

### Noise and Distortion (GLSL)
A very common pattern is applying simplex noise for liquid/wave effects.
```glsl
// Inside Vertex Shader
uniform float uTime;
varying vec2 vUv;

// (Assuming a noise function like snoise is defined above)

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Displace along the normal based on noise
  float noiseVal = snoise(vec3(pos.x * 5.0, pos.y * 5.0, uTime));
  pos += normal * noiseVal * 0.2;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

## 3. Best Practices
- **Precision**: Always declare precision at the top of fragment shaders in raw WebGL (e.g., `precision mediump float;`). Three.js `ShaderMaterial` injects this automatically.
- **Avoid Branching**: GPUs process pixels in parallel blocks. If one pixel in a block takes an `if` branch and another takes the `else`, both paths are evaluated (divergence). Use mathematical functions like `step()`, `smoothstep()`, `mix()`, and `clamp()` instead of `if/else`.
- **Pre-calculate on CPU**: If a uniform value can be calculated once per frame in JavaScript instead of per-pixel in GLSL, do it in JS and pass it as a uniform.
- **Use `#include` (Three.js)**: If using Three.js, you can use chunks like `#include <fog_fragment>` to easily integrate your custom shader with Three.js's built-in lighting and fog.
