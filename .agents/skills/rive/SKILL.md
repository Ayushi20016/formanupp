---
name: rive
description: Instructions and best practices for implementing interactive vector animations using Rive and its React runtime.
---

# Rive Skill

Rive is a real-time interactive design and animation tool. It allows you to create lightweight vector graphics that respond to state changes, making it ideal for UI animations, game assets, and interactive illustrations.

## Core Principles

1. **State Machines Over Timelines:** While Rive supports linear timelines, its true power lies in State Machines. Animations are driven by changing "Inputs" (Booleans, Numbers, or Triggers) which transition the animation between different states.
2. **Lightweight & Performant:** Rive files (`.riv`) are highly compressed and run directly on the GPU/Canvas, ensuring 60fps+ performance even on mobile devices.
3. **Write Once, Run Anywhere:** The same `.riv` file runs consistently across Web, iOS, Android, and game engines via Rive's runtimes.

## Common Code Patterns (React Web)

When working in React, you typically use `@rive-app/react-canvas`.

### 1. Basic Component Setup

Use the `useRive` hook to initialize the animation and gain access to the Rive instance.

```tsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export default function RiveComponent() {
  const { rive, RiveComponent: RiveCanvas } = useRive({
    src: '/animations/character.riv',
    stateMachines: 'State Machine 1', // Must match the name in the Rive editor
    autoplay: true,
  });

  // Access inputs defined in the Rive State Machine
  const isHoveredInput = useStateMachineInput(rive, 'State Machine 1', 'isHovered');
  const triggerClick = useStateMachineInput(rive, 'State Machine 1', 'onClick');

  return (
    <div 
      style={{ width: '400px', height: '400px' }}
      onMouseEnter={() => isHoveredInput && (isHoveredInput.value = true)}
      onMouseLeave={() => isHoveredInput && (isHoveredInput.value = false)}
      onClick={() => triggerClick && triggerClick.fire()}
    >
      <RiveCanvas />
    </div>
  );
}
```

### 2. Managing Text Runs (Dynamic Text)

Rive allows you to change text dynamically at runtime if text runs are exposed.

```tsx
import { useEffect } from 'react';

// Inside component:
useEffect(() => {
  if (rive) {
    rive.setTextRunValue('ScoreText', '9999');
  }
}, [rive]);
```

## Best Practices

- **Avoid Re-renders:** The `<RiveCanvas />` component should not be unnecessarily re-rendered by React. Wrap it or memorize its parent if needed. Update State Machine inputs directly rather than triggering React state changes that force re-renders.
- **Use Triggers for Events:** For one-off events (like a click or explosion), use `Trigger` inputs (`input.fire()`). For states (like hovering or loading), use `Boolean` inputs. For continuous variables (like scroll progress), use `Number` inputs.
- **Sizing:** The parent container of `RiveCanvas` must have defined dimensions (width/height), otherwise the canvas might collapse to 0x0.
- **Cleanup:** The `useRive` hook handles cleanup automatically. If using the vanilla JS runtime (`@rive-app/canvas`), always call `rive.cleanup()` on unmount to prevent memory leaks.
