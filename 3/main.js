import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Цвет, интенсивность
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, 5); // Позиционирование направленного света
scene.add(directionalLight);

const coneGeometry = new THREE.ConeGeometry(0.2, 0.5, 32);
const coneMaterial = new THREE.MeshPhongMaterial({ color: "yellow" });
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
scene.add(coneMesh);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: "blue" });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(2, 0, 0);
coneMesh.position.set(-2, 0, -2);
scene.add(cubeMesh);

const particles = [];
const maxParticles = 100;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function addParticle() {
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array([0, 0.2, 0]);
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: new THREE.Color(1, 1, 1),
  });

  const particle = new THREE.Points(particleGeometry, particleMaterial);
  particle.velocity = new THREE.Vector3(
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.02
  );
  particle.position.copy(coneMesh.position);
  scene.add(particle);
  particles.push(particle);
}

function animate() {
  requestAnimationFrame(animate);

  if (particles.length < maxParticles) {
    addParticle();
  }

  particles.forEach((particle, index) => {
    const directionToCube = cubeMesh.position
      .clone()
      .sub(particle.position)
      .normalize();
    const distanceToCube = particle.position.distanceTo(cubeMesh.position);

    if (distanceToCube < 2) {
      const colorIntensity = Math.max(distanceToCube / 2, 0);
      particle.material.color.set(
        new THREE.Color(1, colorIntensity, colorIntensity)
      );
    }

    if (distanceToCube < 2) {
      const attractSpeed = 0.02;
      particle.velocity.add(directionToCube.multiplyScalar(attractSpeed));
    }

    particle.position.add(particle.velocity);

    if (
      distanceToCube < 0.1 ||
      particle.position.distanceTo(coneMesh.position) > 5
    ) {
      scene.remove(particle);
      particles.splice(index, 1);
    }
  });

  renderer.render(scene, camera);
}

animate();
