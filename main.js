import * as THREE from "three";
import { TeapotGeometry } from  "three/examples/jsm/geometries/TeapotGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const scale = 1.3;

const spherePolygons = 12;

const sphereGeometry = new THREE.SphereGeometry(
  scale,
  spherePolygons,
  spherePolygons
);

const sphereMaterial = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: true,
});

const teapotGeometry = new TeapotGeometry(2, 4)

const teapotMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);

const tetrahedronGeometry = new THREE.TetrahedronGeometry(2);
const tetrahedronMaterial = new THREE.MeshBasicMaterial({
  color: "lightblue",
  wireframe: true
});
const tetrahedronMesh = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);

const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);


sphereMesh.add(sphereMesh);
teapotMesh.add(teapotMesh);

scene.add(sphereMesh);
scene.add(teapotMesh)
scene.add(tetrahedronMesh);
scene.add(cylinderMesh);

tetrahedronMesh.scale.set(0.75, 0.75,0.75);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 10;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

sphereMesh.position.set(0, 0, -2);
teapotMesh.position.set(-4, 0, 0);

tetrahedronMesh.position.set(1, 1, 3);
cylinderMesh.position.set(-2, -2, -2);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();