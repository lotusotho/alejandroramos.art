import './style.css'

import * as THREE from 'three';

import ShaderRuntime from 'shaderfrog-runtime';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);

camera.rotation.set(new THREE.Vector3( 0, 0, 0));

//camera.position.setZ(100);
document.body.onscroll = moveCamera;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});

var mixertable, mixer2Dloc, mixerclay1;

scene.background = new THREE.Color( 0x061121 );

var clock = new THREE.Clock();

var mixers = [];

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(100, 1, 16, 100);
// const material = new THREE.MeshStandardMaterial({color: 0xffffff});
// const torus1 = new THREE.Mesh(geometry, material);

const loader = new GLTFLoader();

// Load 3D models
const table3D = new THREE.Object3D();
const litleo3D = new THREE.Object3D();
const locomocion2D = new THREE.Object3D();
const clay13D = new THREE.Object3D();

loader.load('https://portfoliobuckets3.s3.eu-west-3.amazonaws.com/mesa.glb', function ( tablegltf ) {
    var table = tablegltf.scene;
    table3D.add(table);
    mixertable = new THREE.AnimationMixer(tablegltf.scene);
    mixers.push(mixertable);
    tablegltf.animations.forEach(( clip ) => {
        mixertable.clipAction(clip).play();
    });
    scene.add(table);
    table.renderOrder = 0;
}, undefined, function ( error ) {
    console.error( error );
});

loader.load('https://portfoliobuckets3.s3.eu-west-3.amazonaws.com/litleo.glb', function ( litleogltf ) {
    var litleo = litleogltf.scene;
    litleo3D.add(litleo);
    scene.add(litleo);
}, undefined, function ( error ) {
    console.error( error );
});

loader.load('https://portfoliobuckets3.s3.eu-west-3.amazonaws.com/locomocion2D.glb', function ( locomociongltf ) {
    var locomocion = locomociongltf.scene;
    locomocion2D.add(locomocion);
    mixer2Dloc = new THREE.AnimationMixer(locomociongltf.scene);
    mixers.push(mixer2Dloc);
    locomocion.traverse (function (child) {
        if (child instanceof THREE.Mesh) {
            child.frustumCulled = false;
        }
    });
    locomociongltf.animations.forEach(( clip ) => {
        mixer2Dloc.clipAction(clip).play();
    });
    scene.add(locomocion2D);
    locomocion2D.position.setX(5);
}, undefined, function ( error ) {
    console.error( error );
});

loader.load('https://portfoliobuckets3.s3.eu-west-3.amazonaws.com/clay1.glb', function ( clay1gltf ) {
    var clay1 = clay1gltf.scene;
    clay13D.add(clay1);
    clay1.traverse (function (child) {
        if (child instanceof THREE.Mesh) {
            child.frustumCulled = false;
        }
    });
    mixerclay1 = new THREE.AnimationMixer(clay1gltf.scene);
    mixers.push(mixerclay1);
    clay1gltf.animations.forEach(( clip ) => {
        mixerclay1.clipAction(clip).play();
    });
    scene.add(clay1);
}, undefined, function ( error ) {
    console.error( error );
});

const planegeo = new THREE.PlaneGeometry(1000, 300, 100, 100);
    const planemat = new THREE.MeshPhongMaterial({color: 0x80c1ff, transparent: true, opacity: 0.5, depthTest: true})
    const plane = new THREE.Mesh(planegeo, planemat);
    plane.traverse (function (child) {
        if (child instanceof THREE.Mesh) {
            child.frustumCulled = false;
        }
    });
    scene.add(plane);
    plane.rotation.x = 45;
    plane.position.z = -70;
    plane.renderOrder = 4;

const cubegeo = new THREE.SphereGeometry(3, 30, 30);
const cubemesh = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
const cubepix = new THREE.Mesh(cubegeo, cubemesh);
cubepix.traverse (function (child) {
        if (child instanceof THREE.Mesh) {
            child.frustumCulled = false;
        }
    });
    scene.add(cubepix);
    cubepix.position.setZ(-10);
    cubepix.position.setY(-35);
    cubepix.position.setX(9);
    
 const spheregeo = new THREE.TorusKnotGeometry(1, 0.25, 254, 8, 3, 5);
 const spherepix = new THREE.Mesh(spheregeo);
 spherepix.traverse (function (child) {
         if (child instanceof THREE.Mesh) {
             child.frustumCulled = false;
         }
     });
     spherepix.position.setZ(-10);
     spherepix.position.setY(-66);
     spherepix.position.setX(-5);
     scene.add(spherepix);

const cubestaticgeo = new THREE.BoxGeometry(3, 5);
const cubestaticmaterial = new THREE.MeshBasicMaterial({color: 0xe3ffa6});
const cubestaticpix = new THREE.Mesh(cubestaticgeo, cubestaticmaterial);
cubestaticpix.traverse (function (child) {
            if (child instanceof THREE.Mesh) {
                child.frustumCulled = false;
            }
        });
        cubestaticpix.position.setZ(-10);
        cubestaticpix.position.setY(-47);
        cubestaticpix.position.setX(-5);
        scene.add(cubestaticpix);
//scene.add(torus1);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,30)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls =  new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

function addStar() {
    const geometry = new THREE.SphereGeometry(1.5, 20, 20);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

    const randomscale = THREE.MathUtils.randFloat(0.2, 1);

    star.position.set(x, y, z);
    star.scale.set(randomscale, randomscale, randomscale);
    scene.add(star)
    star.material.shading = THREE.SmoothShading;
}

Array(100).fill().forEach(addStar);

// Shaders
var runtime = new ShaderRuntime();

// // BallDeform
 runtime.load( 'https://portfoliobuckets3.s3.eu-west-3.amazonaws.com/BallDeform.json', function( shaderData ) {
     var ballshadermat = runtime.get( shaderData.name );
    cubepix.material = ballshadermat;
    runtime.updateShaders( clock.getElapsedTime() );
 });

// RippleKnot
 runtime.load( 'https://portfoliobuckets3.s3.eu-west-3.amazonaws.com/RippleKnot.json', function( shaderData ) {
     var starsshadermat = runtime.get( shaderData.name );
     spherepix.material = starsshadermat;
     runtime.updateShaders( clock.getElapsedTime() );
});
// Textures
// Animations
function animate() {
    
    requestAnimationFrame(animate);

     const delta = clock.getDelta();

     for (var i = 0; i < mixers.length; ++ i) {
         mixers[i].update( delta );
     }

    //  mixertable.update( delta );

    var time = clock.getElapsedTime();

    //  mixer2Dloc.update( delta );

    //  mixerclay1.update( delta );

    renderer.render(scene, camera);

    runtime.updateShaders( time );
}

// function animatetorus() {
//     requestAnimationFrame(animatetorus);

//     spherepix.rotation.z += 0.05;
//     spherepix.rotation.z += 0.05;
    

//     renderer.render(scene, camera);
// }

// function render() {
//     requestAnimationFrame(render);
    
//     renderer.render( scene, camera );
// }

// render();
animate();

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    
    cubestaticpix.scale.x += 0.2;
    cubepix.rotation.x += 0.05;

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