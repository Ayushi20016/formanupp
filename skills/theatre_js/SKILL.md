---
name: Theatre.js
description: Guidelines for implementing cinematic animations, timelines, and UI-based keyframing in WebGL/React apps using Theatre.js and @theatre/r3f.
---

# Theatre.js Skill

## 1. Core Principles
- Theatre.js is a visual animation timeline and state management library. It bridges the gap between code and design by providing a GUI (`@theatre/studio`) to animate properties.
- **Projects & Sheets**: Animations are organized into Projects (the entire app's animation state) and Sheets (individual timelines, like a "Scene 1" or "Camera Intro").
- **Objects & Props**: You define "Theatre Objects" in code with specific props (numbers, colors, vectors) which are then manipulated in the Studio GUI.
- **`@theatre/r3f`**: An extension specifically for React Three Fiber. It provides the `<editable>` (or `e`) component wrapper, allowing you to instantly make any R3F element visually tweakable.

## 2. Common Code Patterns

### Basic R3F Setup with Theatre.js
```tsx
import { Canvas } from '@react-three/fiber'
import { getProject } from '@theatre/core'
import { SheetProvider } from '@theatre/r3f'
import { editable as e } from '@theatre/r3f'
import extension from '@theatre/r3f/dist/extension'
import studio from '@theatre/studio'

// Initialize Studio only in development
if (process.env.NODE_ENV === 'development') {
  studio.initialize()
  studio.extend(extension)
}

// Create or get a project and sheet
const project = getProject('MyCinematicProject')
const sheet = project.sheet('IntroScene')

export function App() {
  return (
    <Canvas>
      <SheetProvider sheet={sheet}>
        <Scene />
      </SheetProvider>
    </Canvas>
  )
}

function Scene() {
  return (
    // 'e.mesh' automatically creates an object named "Box" in Theatre
    <e.mesh theatreKey="Box" position={[0, 0, 0]}>
      <boxGeometry />
      <e.meshStandardMaterial theatreKey="Box Material" color="red" />
    </e.mesh>
  )
}
```

### Playing the Animation
You can trigger the timeline to play sequentially on mount or based on events.
```tsx
import { useEffect } from 'react'
import { useCurrentSheet } from '@theatre/r3f'

function AnimationController() {
  const sheet = useCurrentSheet()
  
  useEffect(() => {
    if (sheet) {
      // Play the sequence from start to finish
      sheet.sequence.play({ iterationCount: 1, range: [0, 5] }) // play first 5 seconds
    }
  }, [sheet])
  
  return null
}
```

## 3. Best Practices
- **Production Export**: In production, do *not* bundle `@theatre/studio`. Export your project state from the Studio UI as a JSON file, and load it into `@theatre/core` via `getProject('Name', { state: importedState })`.
- **Camera Choreography**: Use Theatre.js extensively for complex camera movements (e.g., flying through a 3D scene). Create an `<e.perspectiveCamera theatreKey="Camera" makeDefault />`.
- **Granular Control**: For properties not natively supported by `@theatre/r3f`, manually create Theatre objects using `sheet.object('Name', { value: 0 })` and subscribe to changes using `obj.onValuesChange(values => ...)`.
- **Performance**: Theatre.js updates values on every frame when animating. For heavy 3D scenes, ensure your components aren't doing expensive React re-renders on every frame. Use `onValuesChange` to mutate Three.js objects directly via refs for maximum performance.
