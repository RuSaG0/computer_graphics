import * as THREE from "three";
import { TeapotGeometry } from  "three/examples/jsm/geometries/TeapotGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("public/assets/1.jpeg");

const sphereMaterial = new THREE.MeshPhongMaterial({
  color: "yellow",
  opacity: 0.5,
  transparent: true,
  map: texture
});

const tetrahedronMaterial = new THREE.MeshPhongMaterial({
  color: "blue",
  shininess: 100
});

const teapotMaterial = new THREE.MeshPhysicalMaterial({
  color: "red",
  roughness: 0.2
});

const markerMaterial = new THREE.MeshBasicMaterial({
  color: 'orange',
  shininess: 100
});

const cylinderMaterial = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: true,
});

const teapotGeometry = new TeapotGeometry(2, 4)
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 64);
const sphereGeometry = new THREE.SphereGeometry(1.3, 20, 20);
const tetrahedronGeometry = new THREE.TetrahedronGeometry(2);
const markerGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const light = new THREE.PointLight(0xffffff, 60);

const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
const tetrahedronMesh = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

teapotMesh.position.set(4, 0, 0);
sphereMesh.position.set(-6, 0, 0);
cylinderMesh.position.set(-6, 0, 0);
tetrahedronMesh.position.set(-1.5, 0, 0);
light.position.set(0, 5, 0);
markerMesh.position.copy(light.position);

scene.add(teapotMesh);
scene.add(cylinderMesh);
scene.add(sphereMesh);
scene.add(tetrahedronMesh);
scene.add(light);
scene.add(markerMesh);



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

document.addEventListener("keydown", (event) => {
  const speed = 0.5;
  
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
    }
  }
  
  markerMesh.position.copy(light.position);
});


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();