import * as THREE from 'three';

let width = document.getElementById('canvas-root').offsetWidth;
let height = document.getElementById('canvas-root').offsetHeight;

let scene = new THREE.Scene();
//scene.background = new THREE.Color("white");
let camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
let renderer = new THREE.WebGLRenderer( {antialias : true} );
renderer.setSize(width, height);
document.getElementById('canvas-root').appendChild(renderer.domElement);

let testGeom = new THREE.BoxGeometry();
let testMat = new THREE.MeshNormalMaterial();
let testObj = new THREE.Mesh(testGeom, testMat);
testObj.position.set(0,0,0);
scene.add(testObj);

camera.position.y = 0;
camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    testObj.rotation.x += 0.01;
    testObj.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();