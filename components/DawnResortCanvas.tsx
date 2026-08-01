'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DawnResortCanvasProps {
  onCameraExplore?: () => void;
  timeOfDay?: 'dawn' | 'dusk' | 'night';
}

export default function DawnResortCanvas({ onCameraExplore, timeOfDay = 'dawn' }: DawnResortCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetCamPos = useRef({ x: 0, y: 1.8, z: 6 });
  const currentCamPos = useRef({ x: 0, y: 1.8, z: 6 });
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(timeOfDay === 'dawn' ? 0x0f141d : timeOfDay === 'dusk' ? 0x1f1418 : 0x08090c, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(
      timeOfDay === 'dawn' ? 0x2d3a4e : timeOfDay === 'dusk' ? 0x4a2a2e : 0x111622,
      1.2
    );
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(
      timeOfDay === 'dawn' ? 0xffb87a : timeOfDay === 'dusk' ? 0xff6b4a : 0x7a9cff,
      2.5
    );
    sunLight.position.set(-10, 3, -15);
    scene.add(sunLight);

    // Warm Sun Glow Orb
    const sunGeo = new THREE.SphereGeometry(2, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: timeOfDay === 'dawn' ? 0xffca99 : timeOfDay === 'dusk' ? 0xff7b54 : 0x4a6bbf,
      transparent: true,
      opacity: 0.85
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(-15, 2.5, -25);
    scene.add(sunMesh);

    // Water Surface Plane (Infinity Pool / Ocean)
    const waterGeo = new THREE.PlaneGeometry(60, 60, 120, 120);
    const waterMat = new THREE.MeshStandardMaterial({
      color: timeOfDay === 'dawn' ? 0x122436 : timeOfDay === 'dusk' ? 0x1a1224 : 0x0a0f18,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: false,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.4;
    scene.add(water);

    // Animated water vertices wave displacement
    const posAttribute = waterGeo.attributes.position;

    // Balcony Frame Architecture (Pillars & Floor)
    const floorGeo = new THREE.BoxGeometry(10, 0.2, 4);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.6 });
    const floor = new THREE.Mesh(floorGeo, woodMat);
    floor.position.set(0, -0.4, 4.8);
    scene.add(floor);

    // Left & Right Villa Pillars
    const pillarGeo = new THREE.BoxGeometry(0.3, 6, 0.3);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x121418, roughness: 0.8 });
    const pillarLeft = new THREE.Mesh(pillarGeo, pillarMat);
    pillarLeft.position.set(-3.2, 2, 4.5);
    scene.add(pillarLeft);

    const pillarRight = new THREE.Mesh(pillarGeo, pillarMat);
    pillarRight.position.set(3.2, 2, 4.5);
    scene.add(pillarRight);

    // Floating Moving Curtains (Linen cloth effect via parametric grid)
    const curtainGeo = new THREE.PlaneGeometry(1.8, 5, 20, 20);
    const curtainMat = new THREE.MeshStandardMaterial({
      color: 0xe8e3db,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      roughness: 0.9,
    });
    const curtainLeft = new THREE.Mesh(curtainGeo, curtainMat);
    curtainLeft.position.set(-2.8, 1.8, 4.4);
    scene.add(curtainLeft);

    const curtainRight = new THREE.Mesh(curtainGeo, curtainMat);
    curtainRight.position.set(2.8, 1.8, 4.4);
    scene.add(curtainRight);

    // Distant Palm Silhouette Meshes
    const createPalmGroup = (x: number, z: number, scale: number) => {
      const group = new THREE.Group();
      const trunkGeo = new THREE.CylinderGeometry(0.08 * scale, 0.12 * scale, 3 * scale, 8);
      const trunkMat = new THREE.MeshBasicMaterial({ color: 0x090b0e });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = (1.5 * scale) - 0.4;
      trunk.rotation.z = -0.15;
      group.add(trunk);

      // Leaves
      for (let i = 0; i < 6; i++) {
        const leafGeo = new THREE.ConeGeometry(0.3 * scale, 2 * scale, 4);
        const leaf = new THREE.Mesh(leafGeo, trunkMat);
        leaf.position.set(0, 3 * scale - 0.4, 0);
        leaf.rotation.z = Math.PI / 2.5;
        leaf.rotation.y = (i * Math.PI) / 3;
        group.add(leaf);
      }
      group.position.set(x, 0, z);
      return group;
    };

    const palm1 = createPalmGroup(-8, -4, 1.2);
    const palm2 = createPalmGroup(9, -6, 1.5);
    scene.add(palm1);
    scene.add(palm2);

    // Particles (Golden Sun Dust in Dawn Air)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = Math.random() * 4;
      particlePos[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffd9a8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate ocean water ripples
      for (let i = 0; i < posAttribute.count; i++) {
        const u = posAttribute.getX(i);
        const v = posAttribute.getY(i);
        const wave = Math.sin(u * 0.4 + elapsedTime * 1.2) * 0.08 + Math.cos(v * 0.4 + elapsedTime * 1.5) * 0.06;
        posAttribute.setZ(i, wave);
      }
      posAttribute.needsUpdate = true;

      // Animate curtains sway in wind
      const curtainVerticesLeft = curtainGeo.attributes.position;
      for (let i = 0; i < curtainVerticesLeft.count; i++) {
        const y = curtainVerticesLeft.getY(i);
        const zWave = Math.sin(y * 1.2 + elapsedTime * 2) * 0.08 * (y / 5);
        curtainVerticesLeft.setZ(i, zWave);
      }
      curtainVerticesLeft.needsUpdate = true;

      // Particle float
      particles.rotation.y = elapsedTime * 0.02;

      // Camera lerp with mouse parallax
      targetCamPos.current.x = mousePos.current.x * 0.8;
      targetCamPos.current.y = 1.8 + mousePos.current.y * 0.3;

      currentCamPos.current.x += (targetCamPos.current.x - currentCamPos.current.x) * 0.03;
      currentCamPos.current.y += (targetCamPos.current.y - currentCamPos.current.y) * 0.03;
      currentCamPos.current.z += (targetCamPos.current.z - currentCamPos.current.z) * 0.03;

      camera.position.set(currentCamPos.current.x, currentCamPos.current.y, currentCamPos.current.z);
      camera.lookAt(0, 0.4, -10);

      renderer.render(scene, camera);
    };

    animate();
    setIsInteractive(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [timeOfDay]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      {/* Subtle vignette filter */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(8,9,12,0.75)_100%)]" />
    </div>
  );
}
