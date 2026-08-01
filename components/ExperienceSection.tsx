'use client';

import React from 'react';
import { Compass, Plane, Anchor, Moon, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface ExperienceSectionProps {
  onOpenBooking: () => void;
}

export default function ExperienceSection({ onOpenBooking }: ExperienceSectionProps) {
  const experiences = [
    {
      title: 'Helicopter Sunset Volcano Flyover',
      icon: Plane,
      category: 'AERIAL ADVENTURE',
      desc: 'Private Airbus H130 departure from SORA Helipad for a champagne sunset flight over active volcanic caldera.',
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Private Yacht Charter & Secret Cove Exploration',
      icon: Anchor,
      category: 'OCEAN NAVIGATION',
      desc: 'Custom 72ft Riva Yacht with private crew, sommelier, and underwater sea scooters for isolated reef exploration.',
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Celestial Stargazing with Resident Astronomer',
      icon: Moon,
      category: 'NOCTURNAL SANCTUARY',
      desc: 'Deep-sky observation on a secluded white sand beach with research-grade telescope and fireside single-malt whiskey.',
      image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section id="experience" className="relative py-28 bg-[#07080b] border-t border-[#1a1c23]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1c1f28]">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase block mb-3">
              BESPOKE ADVENTURES
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#f8f5f0] font-light">
              Curated Guest Experiences
            </h2>
          </div>
          <p className="text-sm text-[#a39e93] tracking-widest font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Tailored journeys crafted by SORA’s private adventure concierge team.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#0b0c10] border border-[#222631] hover:border-[#c5a880] transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover filter brightness-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#090a0d]/90 text-[#d4af37] text-[10px] tracking-widest px-3 py-1 border border-[#d4af37]/30 uppercase flex items-center space-x-1">
                    <Icon size={12} />
                    <span>{exp.category}</span>
                  </div>
                </div>

                <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif-luxury text-2xl text-[#f8f5f0] group-hover:text-[#d4af37] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-[#a39e93] font-light leading-relaxed tracking-wider">
                      {exp.desc}
                    </p>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="pt-4 flex items-center space-x-2 text-xs tracking-[0.2em] text-[#d4af37] hover:text-[#f8f5f0] transition-colors uppercase font-medium"
                  >
                    <span>ARRANGE WITH CONCIERGE</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
