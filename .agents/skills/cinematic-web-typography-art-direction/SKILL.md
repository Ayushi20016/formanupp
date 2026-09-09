---
name: cinematic-web-typography-art-direction
description: Design readable, premium typography over moving video, image-sequence and WebGL backgrounds. Solves font hierarchy, contrast, occlusion, and GSAP typography choreography.
---

# Cinematic Web Typography Art Direction

## PURPOSE
This skill must design readable, premium typography over moving video, image-sequence and WebGL backgrounds.

It solves:
- Font hierarchy
- Font pairing
- Optical kerning
- Responsive title wrapping
- Background-aware colour selection
- Text contrast over changing frames
- Local contrast fields
- Sharp text edges
- Restrained glow
- SVG strokes
- Scene-specific text placement
- Negative-space detection
- GSAP SplitText choreography
- Foreground occlusion
- Mobile typography
- Accessibility
- Performance

## LEARN THESE TOPICS

### 1. Typography hierarchy
Define roles for: Display title, Technical title, Body copy, Metadata, Labels, CTA text. Never use one font style for every role.

### 2. Background-aware colour design
For each scene:
- Examine multiple frames, not one still image.
- Identify dominant warm and cool colours.
- Identify the darkest stable negative space.
- Select a text colour that contrasts with the worst background frame.
- Add a dark edge when the background changes rapidly.
- Never depend entirely on glow.
- Never use essential text with unstable mix-blend-mode.

### 3. Contrast
Target:
- At least 4.5:1 for ordinary text
- At least 3:1 for sufficiently large text
- Stronger contrast for small metadata over moving video
Test the actual pixels behind each text region.

### 4. Text compositing
Learn to use: Multi-layer text construction, Sharp fill layer, SVG stroke layer, Tight shadow layer, Low-opacity glow layer, Local radial contrast field, Luma masks, Clip paths, Foreground occlusion, Isolation and stacking contexts.

### 5. GSAP motion typography
Master: SplitText lines, SplitText words, Masked reveals, autoSplit, responsive re-splitting, gsap.context(), useGSAP(), ScrollTrigger scrub, enter / hold / exit timelines, reverse scrolling, reduced-motion fallback, cleanup.

### 6. Responsive art direction
Create different text positions, widths and sizes for Desktop landscape, Tablet, and Mobile portrait. Do not merely scale desktop typography down.

### 7. Scene composition
Text must use negative space. It must avoid: Faces, Eyes, Weapons, Character silhouettes, Bright explosions, Important architecture, High-motion areas.

### 8. Glow discipline
Glow is an accent, not the readability mechanism.
Rules:
- Keep the foreground letters sharp
- Maximum outer blur generally 8–12px
- Body text receives no glow
- Small metadata receives no glow
- Avoid constant pulsing
- Avoid full-screen bloom

## PRACTICE LAB
Before modifying any main website, obtain six screenshots and create static typography redesigns for these themes/sections:
1. PRIYANSHU AWASTHI
2. ENGINEERING MEETS IMAGINATION
3. CLOUD ARCHITECTURE
4. DEVOPS PIPELINES
5. ARTIFICIAL INTELLIGENCE
6. DESIGN

For each redesign provide:
- Desktop version
- Mobile version
- Chosen fonts
- Text colours
- Edge colours
- Glow values
- Text position
- Local contrast treatment
- Explanation of why the text contrasts with the background

**DO NOT modify the main website until all redesigns are visually approved by the user.**

## FINAL SKILL RULE
Premium typography over moving visuals requires:
sharp core text + stable contrast + scene-aware placement + controlled hierarchy + restrained motion.
It does not require stronger glow.
