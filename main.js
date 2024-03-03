import * as THREE from "three";
import { TeapotGeometry } from  "three/examples/jsm/geometries/TeapotGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/assets/1.jpeg");

const scene = new THREE.Scene();

const scale = 1.3;

const spherePolygons = 12;

const sphereGeometry = new THREE.SphereGeometry(
  scale,
  spherePolygons,
  spherePolygons
);

const sphereMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  opacity: 0.5,
  transparent: true,
  map: texture
});

const teapotGeometry = new TeapotGeometry(2, 4)

const teapotMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  roughness: 0.2
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);

const tetrahedronGeometry = new THREE.TetrahedronGeometry(2);
const tetrahedronMaterial = new THREE.MeshBasicMaterial({
  color: "blue",
  shininess: 100
});
const tetrahedronMesh = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);

const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 64);
const cylinderMaterial = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: true,
});
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);


const markerMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff000,
});
const markerGeometry = new THREE.SphereGeometry(0.1, 64, 64);
const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

const light = new THREE.PointLight(0xffffff, 20);
light.position.set(0, 5, 0);

markerMesh.position.copy(light.position);


sphereMesh.add(sphereMesh);
teapotMesh.add(teapotMesh);

scene.add(sphereMesh);
scene.add(teapotMesh)
scene.add(tetrahedronMesh);
scene.add(cylinderMesh);
scene.add(light);
scene.add(markerMesh);

tetrahedronMesh.scale.set(0.75, 0.75,0.75);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 8;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

sphereMesh.position.set(0, 0, -2);
teapotMesh.position.set(-4, 0, 0);

tetrahedronMesh.position.set(1, 1, 3);
cylinderMesh.position.set(0, 0, -2);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();