// import * as THREE from "../three/build/three.module.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.142.0/build/three.module.js";

// import Stats from "../three/examples/jsm/libs/stats.module.js";

// import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";
 import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.142.0/examples/jsm/controls/OrbitControls.js";
// import { RoomEnvironment } from "../three/examples/jsm/environments/RoomEnvironment.js";

// import { GLTFLoader } from "../three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.142.0/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "../three/examples/jsm/loaders/DRACOLoader.js";
// import { SpotLightShadow } from "three";
import { DRACOLoader } from "https://cdn.jsdelivr.net/npm/three@0.142.0/examples/jsm/loaders/DRACOLoader.js";


let mixer;
let cube;

const clock = new THREE.Clock();
const container = document.getElementById("modeler");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene({ alpha: true });
let myfog = new THREE.Fog(0x150e2a,25,100)
myfog.isFog = true
scene.fog = myfog
const light = new THREE.AmbientLight(0x080808, 0.85);
scene.add(light);

const targetObject = new THREE.Object3D();
targetObject.position.set(0, 0, -5);
scene.add(targetObject);

// street lights
const ptlight = new THREE.PointLight(0xdebc00,0.35)
ptlight.distance = 15
ptlight.castShadow = true
ptlight.receiveShadow = true
scene.add(ptlight)


const lightred = new THREE.SpotLight(0xce0000);
lightred.position.set(-5.4, 3, 1.9);
lightred.castShadow = true;
lightred.intensity = 0.25;
lightred.receiveShadow = true;
lightred.angle = Math.PI / 3;
lightred.target.position.set(0,0,-5);
lightred.target.updateMatrixWorld();
scene.add(lightred);
scene.add(lightred.target);




// const cyanlight1 = new THREE.SpotLight(0x00fff7,0.5,18)
// cyanlight1.position.set(2.5,0.001,8.75)
// cyanlight1.distance = 2
// cyanlight1.decay = 2
// cyanlight1.castShadow = true
// cyanlight1.target.position.set(2.5,-10,8.75)
// cyanlight1.shadow = true
// scene.add(cyanlight1)
// scene.add(cyanlight1.target)

// const cyanhelper = new THREE.PointLightHelper(ptlight, 20)
// scene.add(cyanhelper)

const camera = new THREE.PerspectiveCamera(
  40,
  container.clientWidth / container.clientHeight,
  1,
  100
);

camera.position.set(-20, 35, 35);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = false;
controls.enableRotate = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.enableZoom = false;
controls.saveState = true;
controls.reset = true;
controls.maxPolarAngle = Math.PI / 2.3
controls.minPolarAngle = Math.PI / 6

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("../three/examples/js/libs/draco/gltf/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
  // "/models/scene.gltf",
  "/portfolio/models/scene.gltf",
  // "https://captcha781.github.io/portfolio/models/scene.gltf",
  function (gltf) {
    gltf.scene.traverse( (node) => {
    node.castShadow = true ;
} )

    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.5, 0.5, 0.5);
    model.castShadow = true;
    // console.log(scene);
    

    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();
    cube = model;
    animate();
    
  },
  undefined,
  function (e) {
    console.error(e);
  }
);

window.onresize = function () {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
};

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.y += 0.001;
  const delta = clock.getDelta();

  mixer.update(delta);

  controls.update();

  renderer.render(scene, camera);
}
