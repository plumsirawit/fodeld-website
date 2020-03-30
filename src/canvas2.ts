import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadSTL, getChild, getCenterCoordinate, rotateAboutPoint, loadPart } from '../helper/util';

let width = document.getElementById('canvas2-root').offsetWidth;
let height = document.getElementById('canvas2-root').offsetHeight;
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
const r = width / height;
const degToRad = (deg: number) => deg * Math.PI / 180;
const radToDeg = (rad: number) => rad * 180 / Math.PI;
const computeHorizontalFOV = (fov: number, aspectRatio: number) => 2 * radToDeg(Math.asin(aspectRatio * Math.sin(degToRad(fov / 2))));
if (computeHorizontalFOV(50, r) < 50) {
    camera.fov = 2 * radToDeg(Math.asin(Math.sin(degToRad(25)) / r));
} else {
    camera.fov = 50;
}
camera.aspect = width / height;
camera.updateProjectionMatrix();
renderer.setSize(width, height);
document.getElementById('canvas2-root').appendChild(renderer.domElement);

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
fodeld.rotation.x = 3 * Math.PI / 2 + Math.PI / 6;
//fodeld.rotation.y = 0;
fodeld.rotation.z = 5*Math.PI / 8;
loadPart('Body', 0xC0C0C0).then((part) => fodeld.add(part)).then(() =>
loadPart('Propeller1')).then((part) => fodeld.add(part)).then(() =>
loadPart('Propeller2')).then((part) => fodeld.add(part)).then(() =>
loadPart('Propeller3')).then((part) => fodeld.add(part)).then(() =>
loadPart('Propeller4')).then((part) => fodeld.add(part)).then(() =>
loadPart('Dropper1', 0xF32013)).then((part) => fodeld.add(part)).then(() =>
loadPart('Dropper2', 0xF32013)).then((part) => fodeld.add(part)).then(() =>
loadPart('Box', 0xABBAD1)).then((part) => fodeld.add(part))
    .then(() => {
        scene.add(fodeld);
        let bbox = new THREE.Box3().setFromObject(fodeld);
        const dx = bbox.max.x - bbox.min.x;
        const dy = bbox.max.y - bbox.min.y;
        const objScale = 1 / Math.max(dx, dy);
        fodeld.scale.multiplyScalar(objScale);
        fodeld.position.set(0, 0, 0);
        bbox = new THREE.Box3().setFromObject(fodeld);
        bbox.getCenter(fodeld.position);
        fodeld.position.multiplyScalar(-1);
        console.log(fodeld);
    })
    .then(() => {
        getChild(fodeld, "Dropper1", (child) => {
            child.position.x -= 10;
            child.position.y -= 10;
            console.log(child.position);
        });
        getChild(fodeld, "Dropper2", (child) => {
            child.position.x += 10;
            child.position.y += 10;
            console.log(child.position);
        });
    }).then(() => {
        getChild(fodeld, "Box", (child) => {
            child.position.z -= 100;
        })
    })

let hemLight = new THREE.HemisphereLight(0xFFFFFF, 0x777777, 1);
scene.add(hemLight);

camera.position.y = 0;
camera.position.z = 1.5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

let frameCount = 0;

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    getChild(fodeld, "Box", (prop) => {
        if(frameCount < 200){
            prop.position.z += 0.5;
            frameCount++;
            console.log(prop.position);
        }
    });
    getChild(fodeld, "Propeller1", (prop) => {
        prop.rotation.z += 0.8;
    });
    getChild(fodeld, "Propeller2", (prop) => {
        prop.rotation.z += 0.8;
    });
    getChild(fodeld, "Propeller3", (prop) => {
        prop.rotation.z += 0.8;
    });
    getChild(fodeld, "Propeller4", (prop) => {
        prop.rotation.z += 0.8;
    });
    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    width = document.getElementById('canvas2-root').offsetWidth;
    height = document.getElementById('canvas2-root').offsetHeight;
    const r = width / height;
    const degToRad = (deg: number) => deg * Math.PI / 180;
    const radToDeg = (rad: number) => rad * 180 / Math.PI;
    const computeHorizontalFOV = (fov: number, aspectRatio: number) => 2 * radToDeg(Math.asin(aspectRatio * Math.sin(degToRad(fov / 2))));
    if (computeHorizontalFOV(50, r) < 50) {
        camera.fov = 2 * radToDeg(Math.asin(Math.sin(degToRad(25)) / r));
    } else {
        camera.fov = 50;
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});