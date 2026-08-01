'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, MapPin, Sparkles, ArrowRight, Sun, Waves } from 'lucide-react';

interface ResortMapProps {
  onSelectDestination: (destId: string) => void;
  onOpenBooking: () => void;
}

interface MapLocation {
  id: string;
  name: string;
  type: string;
  x: number; // 3D coordinates relative offset
  z: number;
  color: number;
  desc: string;
  image: string;
}

export default function ResortMap({ onSelectDestination, onOpenBooking }: ResortMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  const locations: MapLocation[] = [
    {
      id: 'villas',
      name: 'Overwater Horizon Villas',
      type: 'ACCOMMODATION',
      x: -3,
      z: 2,
      color: 0xd4af37,
      desc: '12 private timber pavilions floating directly over the coral lagoon.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'restaurant',
      name: 'KAI Culinary Pavilion & Cellar',
      type: 'FINE DINING',
      x: 3,
      z: -1,
      color: 0xc5a880,
      desc: 'Glass floor overwater Michelin restaurant & volcanic wine cellar.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'spa',
      name: 'Sanctuary Hydrotherapy Spa',
      type: 'WELLNESS',
      x: -1,
      z: -3,
      color: 0x92b3a5,
      desc: 'Thermal mineral baths, acoustic sound bath chamber, and private saunas.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'beach',
      name: 'Sunset Private Coral Beach & Pier',
      type: 'PRIVATE RECREATION',
      x: -4,
      z: -2,
      color: 0x88b8d6,
      desc: 'Pristine white sand, catamaran moorings, and luxury sun cabanas.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'helipad',
      name: 'Private Helipad & Adventure Pier',
      type: 'TRANSIT & CONCIERGE',
      x: 4,
      z: 3,
      color: 0xe0c088,
      desc: 'Helicopter arrival point, luxury yacht charter dock, and diving center.',
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=800&auto=format&fit=crop'
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090a0d);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 9, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x222633, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffdca8, 2.2);
    dirLight.position.set(5, 12, 8);
    scene.add(dirLight);

    // Base Island Pedestal (Architectural Model Display Platform)
    const pedestalGeo = new THREE.CylinderGeometry(6.5, 7, 0.4, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      roughness: 0.6,
      metalness: 0.2
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.2;
    scene.add(pedestal);

    // Pedestal Gold Rim
    const rimGeo = new THREE.TorusGeometry(6.55, 0.05, 16, 100);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0;
    scene.add(rim);

    // Lagoon Water Base
    const lagoonGeo = new THREE.CircleGeometry(6.2, 64);
    const lagoonMat = new THREE.MeshStandardMaterial({
      color: 0x0a1420,
      roughness: 0.1,
      metalness: 0.8
    });
    const lagoon = new THREE.Mesh(lagoonGeo, lagoonMat);
    lagoon.rotation.x = -Math.PI / 2;
    lagoon.position.y = 0.01;
    scene.add(lagoon);

    // Building Meshes
    const buildingMeshes: { mesh: THREE.Mesh; loc: MapLocation }[] = [];

    locations.forEach((loc) => {
      const group = new THREE.Group();

      // Building Box
      const bGeo = new THREE.BoxGeometry(1.2, 0.8, 1.2);
      const bMat = new THREE.MeshStandardMaterial({
        color: loc.color,
        roughness: 0.4,
        metalness: 0.3,
        emissive: loc.color,
        emissiveIntensity: 0.1
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.y = 0.4;
      group.add(bMesh);

      // Roof Pyramid
      const roofGeo = new THREE.ConeGeometry(1, 0.5, 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x222633 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 1.0;
      roof.rotation.y = Math.PI / 4;
      group.add(roof);

      // Beacon Pin Light Ring
      const ringGeo = new THREE.RingGeometry(0.8, 1.0, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: loc.color, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.02;
      group.add(ring);

      group.position.set(loc.x, 0, loc.z);
      scene.add(group);

      buildingMeshes.push({ mesh: bMesh, loc });
    });

    // Raycasting for interactive hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes.map(b => b.mesh));

      if (intersects.length > 0) {
        const match = buildingMeshes.find(b => b.mesh === intersects[0].object);
        if (match) {
          setHoveredLocation(match.loc);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredLocation(null);
        container.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      if (hoveredLocation) {
        setSelectedLocation(hoveredLocation);
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // Animation Loop (Slow rotation of resort pedestal)
    let animId: number;
    let angle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      angle += 0.002;
      scene.rotation.y = angle;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="discover" className="relative py-28 bg-[#08090c] border-t border-[#1a1c23]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#1c1f28]">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase block mb-3">
              SPATIAL MASTERPLAN
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#f8f5f0] font-light">
              Interactive 3D Resort Model
            </h2>
          </div>
          <p className="text-sm text-[#a39e93] tracking-widest font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Hover over buildings to illuminate structures and inspect resort destinations.
          </p>
        </div>

        {/* 3D Map & Info Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive 3D Canvas */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-[#0a0b0e] border border-[#222631] shadow-2xl overflow-hidden">
            <div ref={containerRef} className="w-full h-full" />

            {/* Hover Tooltip Overlay */}
            {hoveredLocation && (
              <div className="absolute top-6 left-6 z-20 bg-[#090a0d]/90 backdrop-blur-md p-4 border border-[#d4af37]/40 shadow-2xl space-y-1 animate-in fade-in duration-200">
                <span className="text-[10px] tracking-[0.25em] text-[#d4af37] font-semibold uppercase block">
                  {hoveredLocation.type}
                </span>
                <h4 className="font-serif-luxury text-xl text-[#f8f5f0]">{hoveredLocation.name}</h4>
                <span className="text-[10px] text-[#a39e93] tracking-widest block">CLICK TO INSPECT SPECS</span>
              </div>
            )}
          </div>

          {/* Destination Details Sidecard */}
          <div className="lg:col-span-4 bg-[#0d0e14] border border-[#232733] p-8 space-y-6">
            {selectedLocation ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-xs tracking-[0.25em] text-[#d4af37] uppercase font-semibold block">
                  SELECTED DESTINATION
                </span>
                <h3 className="font-serif-luxury text-3xl text-[#f8f5f0]">{selectedLocation.name}</h3>

                <div className="relative aspect-[16/9] overflow-hidden border border-[#2a2d38]">
                  <img src={selectedLocation.image} alt={selectedLocation.name} className="w-full h-full object-cover" />
                </div>

                <p className="text-xs text-[#c2bcb2] leading-relaxed tracking-wider font-light">
                  {selectedLocation.desc}
                </p>

                <button
                  onClick={onOpenBooking}
                  className="w-full bg-[#d4af37] text-[#090a0d] text-xs tracking-[0.25em] font-semibold py-3.5 flex items-center justify-center space-x-2 shadow-xl hover:bg-[#e8ca74] transition-colors"
                >
                  <span>RESERVE AT THIS LOCATION</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <Compass size={40} className="mx-auto text-[#d4af37]/60 animate-spin-slow" />
                <h4 className="font-serif-luxury text-2xl text-[#f8f5f0]">Select a Building</h4>
                <p className="text-xs text-[#a39e93] leading-relaxed font-light">
                  Click any illuminated structure on the 3D model to reveal specs, private access routes, and availability.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
