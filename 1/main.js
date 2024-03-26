import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry.js";

const scene = new THREE.Scene();

const scale = 1.3;

const spherePolygons = 12;

const teapotMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const teapotGeometry = new TeapotGeometry(1, 4);

const sphereGeometry = new THREE.SphereGeometry(
  scale,
  spherePolygons,
  spherePolygons
);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: true,
});

const tetrahedronMaterial = new THREE.MeshBasicMaterial({
  color: "blue",
  wireframe: true,
});

const cylinderMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});

const tetrahedronGeometry = new THREE.TetrahedronGeometry(2, 1);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 64);

const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
const tetrahedronMesh = new THREE.Mesh(
  tetrahedronGeometry,
  tetrahedronMaterial
);

scene.add(teapotMesh);
scene.add(cylinderMesh);
scene.add(sphereMesh);
scene.add(tetrahedronMesh);

cylinderMesh.position.set(0, 0, 0);
teapotMesh.position.set(0, 0, 0);
sphereMesh.position.set(0, 0, 0);
tetrahedronMesh.position.set(5, 0, 0);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

// const tetrahedronScale = 0.75;

// tetrahedronMesh.scale.set(tetrahedronScale, tetrahedronScale, tetrahedronScale);

camera.position.z = -10;
camera.position.y = 4;
camera.position.x = 4;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

const duration = 3000;
const targetPositionForTeapot = new THREE.Vector3(-5, 0, 0);
const targetPositionForSphere = new THREE.Vector3(0, 0, 5);

let startTime = null;

const tetrahedronStartScale = 0.2;
const tetrahedronEndScale = 0.75;

function animate() {
  requestAnimationFrame(animate);
  
  if (startTime === null) {
    startTime = Date.now();
  }
  
  const elapsedTime = Date.now() - startTime;
  const t = Math.min(elapsedTime / duration, 1);
  
  const newPositionForTeapot = new THREE.Vector3().lerpVectors(
    teapotMesh.position,
    targetPositionForTeapot,
    t
  );
  teapotMesh.position.copy(newPositionForTeapot);
  
  const newPositionForSphere = new THREE.Vector3().lerpVectors(
    sphereMesh.position,
    targetPositionForSphere,
    t
  );
  sphereMesh.position.copy(newPositionForSphere);
  
  const currentScale = THREE.MathUtils.lerp(
    tetrahedronStartScale,
    tetrahedronEndScale,
    t
  );
  tetrahedronMesh.scale.set(currentScale, currentScale, currentScale);
  
  renderer.render(scene, camera);
}

animate();