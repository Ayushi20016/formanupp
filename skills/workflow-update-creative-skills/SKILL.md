---
name: /update-creative-skills
description: >
  Maintains the global creative-web skill library by checking official docs, updating examples, and running tests.
---

## Workflow

1. **Research**: Check official documentation (GSAP, Three.js, React) for deprecated APIs or breaking changes.
2. **Update Files**: Modify the relevant global `SKILL.md` files with new lessons or practices.
3. **Regression Testing**: Re-run affected labs within `creative-web-vfx-lab` to verify the updates don't break existing code.
4. **Documentation Sync**: Update the skill's reviewed date and changelog in its frontmatter.
