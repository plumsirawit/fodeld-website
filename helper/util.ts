import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const loadSTL = (src : string) => {
    return new Promise<THREE.BufferGeometry>(resolve => {
        let loader = new STLLoader();
        loader.load(src, (geometry) => {
            resolve(geometry);
        });
    });
}

export const loadPart = (partName : string) => {
    return loadSTL('/assets/'+partName+'.stl').then((geometry) => {
        const material = new THREE.MeshStandardMaterial();
        const tmpmesh = new THREE.Mesh(geometry, material);
        const oldCenter = getCenterCoordinate(tmpmesh);
        geometry.center();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(oldCenter);
        mesh.name = partName;
        return mesh;
    });
}

export const getChild = (group : THREE.Group, target : string, callbackFn : (obj : THREE.Object3D) => any) => {
    group.children.forEach(element => {
        if(element.name === target) return callbackFn(element);
    });
    return null;
}
export const getCenterCoordinate = (obj : THREE.Object3D) => {
    let bbox = new THREE.Box3().setFromObject(obj);
    let v = new THREE.Vector3();
    return bbox.getCenter(v);
}
export const rotateAboutPoint = (obj, point, axis, theta, pointIsWorld) => {
    pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

    if(pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if(pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}