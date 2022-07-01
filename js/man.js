import * as THREE from "../three/build/three.module.js";
import { GLTFLoader } from "../three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "../three/examples/jsm/loaders/DRACOLoader.js";
import Stats from "../three/examples/jsm/libs/stats.module.js";

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const light = new THREE.AmbientLight(0xffffff, 0.2);
light.position.y = 1000;
scene.add(light);



const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setSize(
  document.getElementById("modeler").clientWidth,
  document.getElementById("modeler").clientHeight
);
document.getElementById("modeler").appendChild(renderer.domElement);

let cube = null;
const loader = new GLTFLoader();
let stats = new Stats();

var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '../three/examples/js/draco/gltf/' );

loader.setDRACOLoader(dracoLoader)
loader.load(
  "../models/scene.gltf",
  (gltf) => {
    const mymodel = gltf.scene
    const myanime = gltf.animations[0];
    console.log(myanime);
    let mixer = new THREE.AnimationMixer(mymodel);
    mixer.clipAction(myanime).setDuration(1).play()
    
    // let part = mymodel.getObjectByName('body')
    
    // var textureLoader = new THREE.TextureLoader();
    // textureLoader.crossOrigin = true;
    // textureLoader.load('../models/textures/flat_diffuse.png', function(texture) {
        
    //     texture.anisotropy = 16
    //     var material = new THREE.MeshPhongMaterial( { map: texture, opacity:1, transparent: true} );
    //     console.log(part.material);
    //     part.material = material
    // });

    let texture = new THREE.TextureLoader().load('../models/textures/flat_diffuse.png');
    let emtexture = new THREE.TextureLoader().load('../models/textures/pnl_on_emissive.png');
    cube = mymodel;
    scene.add(mymodel);
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);



camera.position.z = 30;
camera.position.y = 10;

let rad = 0;

function rads() {
  return (rad * 3.14) / 180;
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  rad += 45;
  stats.update();
}
