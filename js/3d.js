// import * as THREE from "../three/build/three.module.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.142.0/build/three.module.js";

// import Stats from "../three/examples/jsm/libs/stats.module.js";

// import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.142.0/examples/jsm/controls/OrbitControls.js";
// import { RoomEnvironment } from "../three/examples/jsm/environments/RoomEnvironment.js";

// import { GLTFLoader } from "../three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.142.0/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "../three/examples/jsm/loaders/DRACOLoader.js";
import { DRACOLoader } from "https://cdn.jsdelivr.net/npm/three@0.142.0/examples/jsm/loaders/DRACOLoader.js";

let mixer;
let cube;

const clock = new THREE.Clock();
const container = document.getElementById("modeler");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene({alpha: true});


const light = new THREE.AmbientLight(0x0c0c0c, 0.75)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
  40,
  container.clientWidth / container.clientHeight,
  1,
  100
);
camera.position.set(-20, 30, 30);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = false;
controls.enableRotate = true;
controls.autoRotate = true;
controls.enableZoom = false;


const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("../three/examples/js/libs/draco/gltf/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
  "./../models/scene.gltf",
  // "https://captcha781.github.io/portfolio/models/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.5,0.5,0.5);
    scene.add(model);
    
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();
    cube = model
    animate();
  },
  undefined,
  function (e) {
    console.error(e);
  }
);

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  const delta = clock.getDelta();

  mixer.update(delta);

  controls.update();

  renderer.render(scene, camera);
}