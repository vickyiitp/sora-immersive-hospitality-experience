'use client';

import React, { useState } from 'react';
import { Sparkles, Bed, Eye, Maximize2, Check, ArrowRight, Shield, Heart } from 'lucide-react';

interface StaySectionProps {
  onSelectRoomToBook: (roomName: string) => void;
}

interface RoomOption {
  id: string;
  name: string;
  tagline: string;
  size: string;
  view: string;
  price: string;
  image: string;
  description: string;
  hotspots: {
    id: string;
    label: string;
    x: number; // percentage
    y: number; // percentage
    title: string;
    detail: string;
  }[];
  amenities: string[];
}

export default function StaySection({ onSelectRoomToBook }: StaySectionProps) {
  const rooms: RoomOption[] = [
    {
      id: 'oceanfront-pavilion',
      name: 'Oceanfront Horizon Pavilion',
      tagline: 'Perched directly above the breaking surf with private heated saltwater infinity pool.',
      size: '320 m² / 3,440 ft²',
      view: '180° Unobstructed Pacific Horizon',
      price: '$2,850 / night',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
      description: 'Framed by custom floor-to-ceiling glass doors that fold into the walls, creating a seamless transition between indoor luxury and ocean breeze.',
      hotspots: [
        {
          id: 'bed',
          label: 'Master Sanctuarium Bed',
          x: 35,
          y: 52,
          title: 'Custom Floating Silk Bed',
          detail: 'Hand-tufted organic cashmere mattress, 1,000-thread-count Italian linen, and a bespoke 12-option pillow menu.'
        },
        {
          id: 'pool',
          label: 'Private Infinity Edge Pool',
          x: 72,
          y: 65,
          title: 'Saltwater Horizon Pool',
          detail: 'Temperature-regulated to 29°C year-round with underwater sound system and submerged loungers.'
        },
        {
          id: 'bathroom',
          label: 'Monolithic Stone Bath',
          x: 18,
          y: 68,
          title: 'Freestanding Lava Stone Tub',
          detail: 'Carved from a single block of volcanic basalt, featuring custom SORA organic botanical bath oils.'
        },
        {
          id: 'balcony',
          label: 'Floating Sunset Deck',
          x: 82,
          y: 38,
          title: 'Teak Sundeck & Fire Pit',
          detail: 'Built-in double daybeds, automated shade canopy, and evening bio-ethanol fireplace.'
        }
      ],
      amenities: [
        'Dedicated 24/7 Personal Butler',
        'Private Airport Helicopter Transfer',
        'In-Villa Wine Cellar & Sommelier',
        'Custom Sound Bath Chamber',
        'Bespoke Botanical Spa Amenities'
      ]
    },
    {
      id: 'cliffside-sanctuary',
      name: 'Cliff Edge Sanctuary Villa',
      tagline: 'Cascading over dramatic sea cliffs with total private isolation.',
      size: '410 m² / 4,410 ft²',
      view: 'Panorama Cliff Edge & Sunset',
      price: '$3,600 / night',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1600&auto=format&fit=crop',
      description: 'Suspended 80 meters above the ocean, offering complete acoustic privacy, private sauna, and double plunge pools.',
      hotspots: [
        {
          id: 'bed',
          label: 'Cliffside Suite Bed',
          x: 48,
          y: 50,
          title: 'Zero-Gravity Sleep Matrix',
          detail: 'Acoustically insulated chamber with automated circadian rhythm lighting.'
        },
        {
          id: 'pool',
          label: 'Dual Temperature Pools',
          x: 78,
          y: 72,
          title: 'Hot & Cold Plunge Circuit',
          detail: 'Private hydrotherapy pool circuit perched over the ocean cliff.'
        },
        {
          id: 'bathroom',
          label: 'Cliffside Rain Shower',
          x: 22,
          y: 60,
          title: 'Open-Air Waterfall Shower',
          detail: 'Double overhead rainwater heads overlooking the private garden cove.'
        }
      ],
      amenities: [
        'Private Chef on Demand',
        'In-Suite Hydrotherapy Sauna',
        'Unlimited Daily Spa Treatments',
        'E-Bike & Private Buggy Fleet'
      ]
    },
    {
      id: 'grand-penthouse',
      name: 'SORA Grand Penthouse Estate',
      tagline: 'The ultimate sanctuary crowning the highest point of the resort.',
      size: '680 m² / 7,320 ft²',
      view: '360° Island & Ocean Panorama',
      price: '$6,500 / night',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop',
      description: 'Three regal bedroom wings, private rooftop infinity pool, personal Michelin dining room, and dedicated staff quarters.',
      hotspots: [
        {
          id: 'bed',
          label: 'Presidential Master Suite',
          x: 50,
          y: 45,
          title: 'Panoramic Master Chamber',
          detail: 'Motorized glass walls revealing 360° sunrise-to-sunset horizon views.'
        },
        {
          id: 'pool',
          label: 'Rooftop Infinity Sky Pool',
          x: 70,
          y: 58,
          title: '25m Rooftop Lap Pool',
          detail: 'Cantilevered glass-bottom pool hovering over the central atrium.'
        }
      ],
      amenities: [
        'Full Private Villa Staff (Chef, Butler, Concierge)',
        'Exclusive Private Yacht Access',
        'Helipad Priority Landing Slot',
        'Custom Curated Wine & Spirit Cellar'
      ]
    }
  ];

  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const currentRoom = rooms[activeRoomIndex];
  const [activeHotspot, setActiveHotspot] = useState<typeof currentRoom.hotspots[0] | null>(
    currentRoom.hotspots[0]
  );
  const [panAngle, setPanAngle] = useState(0);

  return (
    <section id="stay" className="relative py-28 bg-[#090a0d] border-t border-[#1a1c23]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1c1f28]">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase block mb-3">
              SPATIAL SANCTUARIES
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#f8f5f0] font-light">
              Architectural Living Spaces
            </h2>
          </div>
          <p className="text-sm text-[#a39e93] tracking-widest font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Every pavilion is engineered for total acoustic silence, unobstructed ocean immersion, and uncompromised privacy.
          </p>
        </div>

        {/* Room Tabs Selector */}
        <div className="flex flex-wrap gap-4 mb-10">
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoomIndex(idx);
                setActiveHotspot(rooms[idx].hotspots[0] || null);
              }}
              className={`text-xs tracking-[0.2em] px-6 py-3.5 border transition-all duration-500 uppercase font-medium ${
                activeRoomIndex === idx
                  ? 'bg-[#c5a880] text-[#090a0d] border-[#c5a880] font-semibold shadow-lg'
                  : 'bg-[#121419] text-[#a39e93] border-[#222631] hover:text-[#f8f5f0] hover:border-[#a39e93]'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Interactive 360 Walkthrough / Hotspot Showcase Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Display Frame */}
          <div className="lg:col-span-8 relative rounded-none overflow-hidden group border border-[#2a2d38] bg-[#0c0d12] shadow-2xl">
            {/* Background High Res Room Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={currentRoom.image}
                alt={currentRoom.name}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-90"
                style={{
                  transform: `scale(1.05) translateX(${panAngle}px)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-black/30" />

              {/* Pan Slider Control for 360 feel */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20 bg-[#0c0d12]/80 backdrop-blur-md p-3 border border-[#2a2d38]">
                <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase flex items-center space-x-2">
                  <Maximize2 size={12} />
                  <span>360° SPATIAL VIEW MODE</span>
                </span>
                <div className="flex items-center space-x-3 w-1/2">
                  <span className="text-[10px] text-[#736e65]">PAN</span>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={panAngle}
                    onChange={(e) => setPanAngle(parseInt(e.target.value))}
                    className="w-full accent-[#d4af37] h-1 bg-[#222631] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Interactive Hotspot Pins */}
              {currentRoom.hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none`}
                >
                  <span className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    activeHotspot?.id === spot.id
                      ? 'bg-[#d4af37] border-white scale-125 shadow-[0_0_20px_rgba(212,175,55,0.8)]'
                      : 'bg-[#090a0d]/80 border-[#d4af37]/80 hover:bg-[#d4af37]/30'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${activeHotspot?.id === spot.id ? 'bg-black' : 'bg-[#d4af37]'}`} />
                    <span className="absolute -inset-2 rounded-full border border-[#d4af37] animate-ping opacity-40" />
                  </span>

                  {/* Pin Hover Tag */}
                  <span className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#090a0d]/90 text-[10px] tracking-widest text-[#f8f5f0] px-3 py-1 border border-[#c5a880]/30 shadow-xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                    {spot.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Room Overview Strip */}
            <div className="p-6 bg-[#111319] border-t border-[#1c1f28] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#736e65] uppercase block">DIMENSIONS & VIEW</span>
                <span className="font-serif-luxury text-xl text-[#e6e2dd]">{currentRoom.size}  •  {currentRoom.view}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] tracking-[0.2em] text-[#736e65] uppercase block">NIGHTLY TARIFF</span>
                <span className="font-serif-luxury text-2xl text-[#d4af37]">{currentRoom.price}</span>
              </div>
            </div>
          </div>

          {/* Contextual Detail Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Selected Hotspot Card */}
            {activeHotspot && (
              <div className="p-8 bg-[#12141a] border border-[#c5a880]/30 shadow-2xl space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-semibold">
                  <Sparkles size={13} />
                  <span>FEATURED ARCHITECTURAL DETAIL</span>
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#f8f5f0]">{activeHotspot.title}</h3>
                <p className="text-xs text-[#c2bcb2] leading-relaxed tracking-wider font-light">
                  {activeHotspot.detail}
                </p>
              </div>
            )}

            {/* Room Description & Bespoke Amenities */}
            <div className="p-8 bg-[#0e0f14] border border-[#222631] space-y-6">
              <div>
                <h4 className="text-xs tracking-[0.2em] text-[#a39e93] uppercase mb-2">SUITE ESSENCE</h4>
                <p className="text-sm text-[#e6e2dd] font-serif-luxury italic leading-relaxed">
                  &quot;{currentRoom.description}&quot;
                </p>
              </div>

              <div>
                <h4 className="text-xs tracking-[0.2em] text-[#a39e93] uppercase mb-4">INCLUDED PRIVILEGES</h4>
                <ul className="space-y-2.5">
                  {currentRoom.amenities.map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-xs text-[#c2bcb2] tracking-wider font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectRoomToBook(currentRoom.name)}
                className="w-full bg-[#d4af37] hover:bg-[#e8ca74] text-[#090a0d] text-xs tracking-[0.25em] font-semibold py-4 flex items-center justify-center space-x-3 transition-all duration-300 shadow-xl"
              >
                <span>RESERVE {currentRoom.name.toUpperCase()}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
