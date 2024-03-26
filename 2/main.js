import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry.js";

const scene = new THREE.Scene();

const scale = 1.3;

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("assets/1.jpeg");

const spherePolygons = 12;

const teapotMaterial = new THREE.MeshPhongMaterial({
  color: "red",
});
const teapotGeometry = new TeapotGeometry(1, 4);

const sphereGeometry = new THREE.SphereGeometry(
  scale,
  spherePolygons,
  spherePolygons
);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: "green",
  map: texture,
  opacity: 0.6,
  transparent: true,
});

const tetrahedronMaterial = new THREE.MeshPhongMaterial({
  color: "blue",
  shininess: 100,
});

const cylinderMaterial = new THREE.MeshBasicMaterial({
  color: "green",
});

const cylinderGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1, 64);

const markerMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff000,
  metalness: 0.5,
  roughness: 0.2,
  shininess: 100,
});

const markerGeometry = new THREE.SphereGeometry(0.1, 64, 64);

const tetrahedronGeometry = new THREE.TetrahedronGeometry(2, 1);

const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
const tetrahedronMesh = new THREE.Mesh(
  tetrahedronGeometry,
  tetrahedronMaterial
);
const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

scene.add(teapotMesh);
scene.add(sphereMesh);
scene.add(tetrahedronMesh);
scene.add(cylinderMesh);

teapotMesh.position.set(0, 0, 0);
sphereMesh.position.set(0, 0, 0);
tetrahedronMesh.position.set(5, 0, 0);
cylinderMesh.position.set(0, 0, 5);

const light = new THREE.PointLight(0xffffff, 20);
light.position.set(0, 5, 0);
scene.add(light);

markerMesh.position.copy(light.position);
scene.add(markerMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = -10;
camera.position.y = 4;
camera.position.x = 4;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

document.addEventListener("keydown", (event) => {
  const speed = 0.5;
  const intensityChange = 0.5;
  
  if (event.shiftKey) {
    switch (event.key) {
      case "W":
        light.position.y += speed;
        break;
      case "S":
        light.position.y -= speed;
        break;
    }
  } else {
    switch (event.key) {
      case "w":
        light.position.z -= speed;
        break;
      case "s":
        light.position.z += speed;
        break;
      case "a":
        light.position.x -= speed;
        break;
      case "d":
        light.position.x += speed;
        break;
      case "[":
        ambientLight.intensity = Math.max(0, ambientLight.intensity - intensityChange);
        break;
      case "]":
        ambientLight.intensity = Math.min(100, ambientLight.intensity + intensityChange);
        break;
      case "1":
        ambientLight.color.set(0xff0000);
        break;
      case "2":
        ambientLight.color.set(0x00ff00);
        break;
      case "3":
        ambientLight.color.set(0x0000ff);
        break;
    }
  }
  
  markerMesh.position.copy(light.position);
  updateIntensityDisplay();
});

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
  
  cylinderMesh.rotation.x += 0.01;
  cylinderMesh.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();