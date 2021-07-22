import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);

camera.rotation.set(new THREE.Vector3( 0, 0, 0));

//camera.position.setZ(100);
document.body.onscroll = moveCamera;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});

var mixertable;
var mixer2Dloc;

scene.background = new THREE.Color( 0x061121 );

var clock = new THREE.Clock();

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(100, 1, 16, 100);
// const material = new THREE.MeshStandardMaterial({color: 0xffffff});
// const torus1 = new THREE.Mesh(geometry, material);

const loader = new GLTFLoader();

// Load 3D models
const table3D = new THREE.Object3D();
const litleo3D = new THREE.Object3D();
const locomocion2D = new THREE.Object3D();

loader.load('/models/glTF/mesa.glb', function ( tablegltf ) {
    renderer.outputEncoding = THREE.sRGBEncoding;
    var table = tablegltf.scene;
    table3D.add(table);
    mixertable = new THREE.AnimationMixer(tablegltf.scene);
    var action = mixertable.clipAction( tablegltf.animations[0] );
    action.play();
    scene.add(tablegltf.scene);
}, undefined, function ( error ) {
    console.error( error );
});

loader.load('/models/glTF/litleo.glb', function ( litleogltf ) {
    var litleo = litleogltf.scene;
    litleo3D.add(litleo);
    scene.add(litleogltf.scene);
}, undefined, function ( error ) {
    console.error( error );
});

loader.load('/models/glTF/locomocion2D.glb', function ( locomociongltf ) {
    renderer.outputEncoding = THREE.sRGBEncoding;
    var locomocion = locomociongltf.scene;
    locomocion2D.add(locomocion);
    locomocion.traverse (function (child) {
        if (child instanceof THREE.Mesh) {
            child.frustumCulled = false;
        }
    });
    mixer2Dloc = new THREE.AnimationMixer(locomociongltf.scene);
    var action = mixer2Dloc.clipAction( locomociongltf.animations[0] );
    action.play();
    scene.add(locomociongltf.scene);
}, undefined, function ( error ) {
    console.error( error );
});

//scene.add(torus1);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,30)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls =  new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

    const randomscale = THREE.MathUtils.randFloat(0.2, 1);

    star.position.set(x, y, z);
    star.scale.set(randomscale, randomscale, randomscale);
    scene.add(star)
}

Array(100).fill().forEach(addStar);

//Textures
const spaceTexture = new THREE.TextureLoader().load('/models/textures/mesalayout.png');

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mixertable.update( delta );

    mixer2Dloc.update( delta );

    renderer.render(scene, camera);
}

animate();

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    litleo3D.rotation.x += 0.05;
    litleo3D.rotation.y += 0.075;
    litleo3D.rotation.z += 0.05;

    camera.position.y = -t * -0.04;
    camera.position.z = t * -0.0002;
    camera.position.x = t * -0.0002;
}

// function animate1() {
//     requestAnimationFrame(animate1);
//     torus1.rotation.x += 0.035;
//     torus1.rotation.y += 0.005;
//     torus1.rotation.z += 0.01;

    
//     renderer.render(scene, camera);
// }

//animate1();