import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader }  from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const gltfLoader = new GLTFLoader();
var bagel;
gltfLoader.load("assets/everything.glb", function(glb) {
    console.log(glb)
    bagel = glb.scene
    bagel.scale.set(15, 15, 15);
    bagel.position.set(0, 0, 0)
    bagel.rotation.y = (3 * Math.PI) / 2;

    scene.add(bagel)
});

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0x0f0f0f });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
// directionalLight.position.set(20, 20, 10);
// scene.add(directionalLight);

// const directionalLight2 = new THREE.DirectionalLight(0xffffff, .5);
// directionalLight2.position.set(-10, -10, -20);
// scene.add(directionalLight2);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
directionalLight.position.set(0, 0, -5);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

const spotLight = new THREE.SpotLight(0xffffff, 10);
spotLight.position.set(0, 0, -5);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);
scene.add(spotLight.target);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight2.position.set(0, 0, 10);
directionalLight2.target.position.set(0, 0, 0);
scene.add(directionalLight2);
scene.add(directionalLight2.target);




// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Renderer gets updated each time window is resized
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 10);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // this makes background blank
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  bagel.rotateX(0.01)
  camera.position.z -= 0.005
}

animate();