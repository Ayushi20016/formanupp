---
name: spline
description: Instructions and best practices for integrating and interacting with Spline 3D scenes in web applications, primarily using React.
---

# Spline Skill

Spline is a web-based 3D design tool that allows for the creation of interactive 3D scenes. These scenes can be exported as `.splinecode` files and embedded directly into web projects with full interactivity and programmatic control.

## Core Principles

1. **No-Code to Code Bridge:** Scenes are visually built in the Spline editor. Interactivity (like hover states or simple clicks) can be built in the editor via "Events", but developers can also hook into these events or trigger them programmatically via code.
2. **.splinecode Export:** Always export the scene as `.splinecode` (Vanilla JS / React export) rather than an iframe or raw GLTF, as it bundles the Spline runtime for full programmatic control.
3. **Application Instance:** The core of interacting with a Spline scene in code is obtaining the `Application` instance once the scene loads.

## Common Code Patterns (React)

Use the `@splinetool/react-spline` package to embed the scene.

### 1. Basic Embed and Application Access

```tsx
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  // Store the Spline application instance
  const splineApp = useRef<any>(null);

  function onLoad(spline: any) {
    splineApp.current = spline;
    console.log("Spline loaded!");
    
    // Example: Find an object by its name in the Spline editor
    const cube = spline.findObjectByName('Cube');
    if (cube) {
      console.log(cube);
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Spline 
        scene="https://prod.spline.design/your-scene-id/scene.splinecode" 
        onLoad={onLoad} 
      />
    </div>
  );
}
```

### 2. Triggering Events and Modifying Objects Programmatically

You can trigger Spline events (set up in the editor) from your React code.

```tsx
function triggerAnimation() {
  if (splineApp.current) {
    // Trigger an event defined in Spline by its name or UUID
    splineApp.current.emitEvent('mouseHover', 'Cube');
  }
}

function updateVariable() {
  if (splineApp.current) {
    // If you defined a variable in Spline, you can update it
    splineApp.current.setVariable('Score', 100);
  }
}
```

### 3. Listening to Spline Events

You can listen to events happening *inside* the Spline scene (e.g., the user clicks a 3D button).

```tsx
function onLoad(spline: any) {
  splineApp.current = spline;
  
  spline.addEventListener('mouseDown', (e: any) => {
    if (e.target.name === 'StartButton') {
      console.log('Start Button Clicked in 3D!');
    }
  });
}
```

## Best Practices

- **Lazy Loading:** Spline scenes are heavy. Consider lazy loading the `Spline` component (`React.lazy`) or only mounting it when it comes into view (`IntersectionObserver`) to improve initial page load performance.
- **Handling Loading States:** The Spline canvas takes time to load and compile shaders. Use CSS or a React state to show a loading spinner or placeholder image until the `onLoad` callback fires.
- **Performance Optimization:** If the scene runs poorly, the optimization must happen in the Spline Editor (reducing poly count, baking lighting, limiting post-processing). The code runtime can only render what the scene contains.
- **Avoid React State in Spline Callbacks:** Be careful when using React state setters inside Spline event listeners (`addEventListener`), as they may cause excessive re-renders or capture stale closures.
