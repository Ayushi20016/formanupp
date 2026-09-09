---
name: gltf-transform
description: Instructions and best practices for manipulating and optimizing 3D models using glTF Transform, including Draco and KTX2 compression.
---

# glTF Transform Skill

glTF Transform is a TypeScript/JavaScript library for reading, editing, and writing glTF 3D models. It provides a modular approach to model optimization and manipulation, making it ideal for automation, build pipelines, and web applications.

## Core Principles

1. **Graph-Based Document Model:** A glTF file is represented as a `Document`, containing elements like Nodes, Materials, Meshes, and Textures.
2. **Extensions as Plugins:** Capabilities like Draco compression (`KHR_draco_mesh_compression`) or Basis Universal/KTX2 textures (`KHR_texture_basisu`) are implemented as extensions that must be registered with the I/O class.
3. **Functional Transformations:** The `@gltf-transform/functions` package provides ready-to-use transformations (e.g., `simplify`, `resample`, `dedup`, `textureCompress`) that operate on the `Document`.

## Common Code Patterns

### 1. Basic I/O and Setup

```javascript
import { NodeIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';

async function setupIO() {
  const io = new NodeIO()
    .registerExtensions(KHRONOS_EXTENSIONS)
    .registerDependencies({
      'draco3d.decoder': await draco3d.createDecoderModule(),
      'draco3d.encoder': await draco3d.createEncoderModule(),
    });
  return io;
}
```

### 2. Applying Optimizations (Draco & KTX2)

To aggressively optimize a glTF model for web delivery, combine deduplication, Draco mesh compression, and KTX2 texture compression.

```javascript
import { dedup, resample, prune, textureCompress } from '@gltf-transform/functions';
import sharp from 'sharp'; // Required for texture compression
import { KHR_draco_mesh_compression } from '@gltf-transform/extensions';

async function optimizeModel(io, inputPath, outputPath) {
  const document = await io.read(inputPath);

  await document.transform(
    // Remove unused nodes, textures, or materials
    prune(),
    // Deduplicate identical vertex attributes or textures
    dedup(),
    // Resample animations to reduce file size
    resample(),
    // Compress textures to WebP or KTX2
    // Ensure you register the KHR_texture_basisu extension for KTX2
    textureCompress({
      encoder: sharp,
      targetFormat: 'webp', // or 'ktx2'
      resize: [1024, 1024]
    })
  );

  // Apply Draco compression
  document.createExtension(KHR_draco_mesh_compression)
    .setRequired(true)
    .setEncoderOptions({
      method: KHR_draco_mesh_compression.EncoderMethod.EDGEBREAKER,
      encodeSpeed: 5,
      decodeSpeed: 5,
    });

  await io.write(outputPath, document);
}
```

## Best Practices

- **Use WebP or KTX2:** For web delivery, always compress standard PNG/JPG textures. Use WebP for general web compatibility, or KTX2 (Basis Universal) to reduce GPU memory (VRAM) footprint for heavy scenes.
- **Deduplicate First:** Always run `dedup()` before expensive operations like texture compression or Draco encoding to avoid processing identical data multiple times.
- **NodeIO vs. WebIO:** Use `NodeIO` for server-side/CLI scripts and `WebIO` when running in the browser.
- **Dispose Resources:** If processing many models in a loop, be mindful of garbage collection and explicitly dispose of unused documents if necessary.
