import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadSTL, getChild, getCenterCoordinate, rotateAboutPoint, loadPart } from '../helper/util';

let width = document.getElementById('canvas-root').offsetWidth;
let height = document.getElementById('canvas-root').offsetHeight;

let scene = new THREE.Scene();
//scene.background = new THREE.Color("white");
let camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
let renderer = new THREE.WebGLRenderer( {antialias : true} );
renderer.setSize(width, height);
document.getElementById('canvas-root').appendChild(renderer.domElement);

interface Fodeld {
    body: THREE.Object3D | undefined;
    propeller1: THREE.Object3D | undefined;
    propeller2: THREE.Object3D | undefined;
    propeller3: THREE.Object3D | undefined;
    propeller4: THREE.Object3D | undefined;
    box: THREE.Object3D | undefined;
    switch1: THREE.Object3D | undefined;
    switch2: THREE.Object3D | undefined;
}

const fodeld = new THREE.Group();
fodeld.rotation.x = 3*Math.PI/2 + Math.PI/6;
fodeld.rotation.z = Math.PI/4;
loadPart('Body').then((part) => fodeld.add(part)).then(() =>
loadPart('Propeller1')).then((part) => fodeld.add(part)).then(() =>
loadPart('Propeller2')).then((part) => fodeld.add(part)).then(() =>
loadPart('Propeller3')).then((part) => fodeld.add(part)).then(() =>
loadPart('Propeller4')).then((part) => fodeld.add(part)).then(() =>
loadPart('Dropper1')).then((part) => fodeld.add(part)).then(() =>
loadPart('Dropper2')).then((part) => fodeld.add(part))
.then(() => {
    scene.add(fodeld);
    let bbox = new THREE.Box3().setFromObject(fodeld);
    const dx = bbox.max.x - bbox.min.x;
    const dy = bbox.max.y - bbox.min.y;
    const objScale = 1 / Math.max(dx, dy);
    fodeld.scale.multiplyScalar(objScale);
    fodeld.position.set(0,0,0);
    bbox = new THREE.Box3().setFromObject(fodeld);
    bbox.getCenter(fodeld.position);
    fodeld.position.multiplyScalar(-1);
    console.log(fodeld);
});

let hemLight = new THREE.HemisphereLight(0xFFFFFF, 0x555555, 1);
scene.add(hemLight);

camera.position.y = 0;
camera.position.z = 1.2;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    getChild(fodeld, "Propeller1", (prop) => {
        prop.rotation.z += 1.1;
    });
    getChild(fodeld, "Propeller2", (prop) => {
        prop.rotation.z += 1.1;
    });
    getChild(fodeld, "Propeller3", (prop) => {
        prop.rotation.z += 1.1;
    });
    getChild(fodeld, "Propeller4", (prop) => {
        prop.rotation.z += 1.1;
    });
    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    width = document.getElementById('canvas-root').offsetWidth;
    height = document.getElementById('canvas-root').offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});