---
name: threejs-webgl
description: Guidelines for creating WebGL 3D scenes using vanilla Three.js.
---

# Three.js

Three.js is the most popular JavaScript library for creating 3D graphics on the web using WebGL. It abstracts the complexities of raw WebGL into a manageable scene graph API.

## Core Principles
1. **The Scene Graph**: Every Three.js application revolves around a `THREE.Scene`.
2. **Camera**: You view the scene through a `Camera` (usually `PerspectiveCamera` or `OrthographicCamera`).
3. **Renderer**: The `WebGLRenderer` draws the scene and camera onto an HTML `<canvas>`.
4. **Meshes**: Objects in the scene are typically `Meshes`, consisting of a `Geometry` (shape) and a `Material` (appearance).
5. **Animation Loop**: A continuous `requestAnimationFrame` loop updates the scene and re-renders.

## Common Code Patterns

### Basic Boilerplate
```javascript
import * as THREE from 'three';

// 1. Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Add an Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 3. Add Lighting
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

camera.position.z = 5;

// 4. Animation Loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

### Handling Window Resize
```javascript
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

### Loading Models
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

loader.load('model.glb', (gltf) => {
    scene.add(gltf.scene);
});
```

## Best Practices
- **Resource Management**: WebGL contexts are limited. Always `.dispose()` geometries, materials, and textures when removing them from the scene to prevent memory leaks.
- **Pixel Ratio**: Clamp `setPixelRatio` to `Math.min(window.devicePixelRatio, 2)` to save performance on high-DPI screens (like mobile phones) while maintaining visual fidelity.
- **Asset Optimization**: Always use compressed models (glTF via glTF-Transform or Draco compression) and compressed textures (KTX2) for faster loading times.
- **Instancing**: If you need thousands of identical objects (e.g., grass, particles), use `THREE.InstancedMesh` rather than creating individual mesh objects.
