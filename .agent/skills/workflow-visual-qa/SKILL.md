---
name: /visual-qa
description: >
  Executes rigorous cross-browser, screenshot, performance, and accessibility checks.
---

## Workflow

1. **Server Boot**: Start the development server (Vite, Next.js, etc.).
2. **Visual Capture**: Use Chrome DevTools MCP to capture desktop and mobile screenshots.
3. **Console Verification**: Check the browser console and guarantee exactly 0 errors or warnings.
4. **A11y Check**: Verify `prefers-reduced-motion` compliance.
5. **Resolution**: Fix any discovered errors before reporting success.
