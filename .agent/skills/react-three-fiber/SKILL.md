---
name: react-three-fiber
description: Guidelines for building React-based 3D applications using React Three Fiber (R3F) and the drei ecosystem.
---

# React Three Fiber (R3F)

React Three Fiber is a React renderer for Three.js. It allows you to build 3D scenes declaratively with reusable, self-contained components that react to state.

## Core Principles
1. **Declarative Three.js**: Any Three.js class can be rendered as a JSX element (e.g., `new THREE.Mesh()` becomes `<mesh>`).
2. **Component Lifecycle**: R3F components follow standard React lifecycles. They are mounted, unmounted, and updated automatically.
3. **The `args` Prop**: Constructor arguments in Three.js are passed as an array to the `args` prop in R3F.
4. **Ecosystem**: Relies heavily on `@react-three/drei` for helpful abstractions (controls, environment, loading, text).

## Common Code Patterns

### Basic Canvas Setup
```jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      
      <OrbitControls />
    </Canvas>
  )
}
```

### Animation Loop
To animate objects, use the `useFrame` hook. **Never use React `useState` inside `useFrame`**, as it will trigger a re-render 60 times a second. Instead, mutate the `ref` directly.

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function SpinningBox() {
  const meshRef = useRef(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
```

### Loading Models with Drei
Use `useGLTF` from `@react-three/drei` to load models effortlessly.

```jsx
import { useGLTF } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

// Preloading
useGLTF.preload('/model.glb')
```

## Best Practices
- **Performance - Avoid Re-renders**: Keep your 3D components as pure as possible. If state changes frequently (e.g., mouse position), do not pass it down via props/context. Instead, bind to it inside `useFrame`.
- **Memory - Reusing Geometries/Materials**: If rendering many of the same object, define the material and geometry globally or use `useMemo` so Three.js doesn't create duplicate WebGL buffers.
- **Suspense**: Wrap your async models in `<Suspense>` to show a fallback loader (`<Html>` from Drei is great for this).
- **Post-Processing**: Use `@react-three/postprocessing` instead of vanilla Three.js EffectComposer. It is significantly more optimized for R3F.
