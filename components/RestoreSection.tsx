'use client';

import React, { useState } from 'react';
import { Waves, HeartPulse, Sparkles, Check, Clock } from 'lucide-react';

interface RestoreSectionProps {
  onOpenBooking: () => void;
}

export default function RestoreSection({ onOpenBooking }: RestoreSectionProps) {
  const treatments = [
    {
      title: 'Acoustic Sound Bath & Frequency Ritual',
      duration: '90 Minutes',
      focus: 'Deep Nervous System Reset',
      desc: 'Submerged in a warm mineral pool, custom 432Hz crystal singing bowls vibrate through water acoustics.',
      price: '$420'
    },
    {
      title: 'Volcanic Basalt Thermal Massage',
      duration: '120 Minutes',
      focus: 'Muscle Regeneration & Detox',
      desc: 'Heated ocean basalt stones paired with wild frangipani and sandalwood botanical elixirs.',
      price: '$580'
    },
    {
      title: 'Cryo-Thermal Hydrotherapy Circuit',
      duration: '75 Minutes',
      focus: 'Immune Vitality & Cellular Repair',
      desc: 'Alternating between 38°C geothermal mineral baths and 8°C ocean plunge pools under expert guidance.',
      price: '$350'
    }
  ];

  const [selectedPillar, setSelectedPillar] = useState<'sleep' | 'vitality' | 'detox'>('sleep');

  return (
    <section id="restore" className="relative py-28 bg-[#090a0d] border-t border-[#1a1c23]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1c1f28]">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase block mb-3">
              HOLISTIC REGENERATION
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#f8f5f0] font-light">
              Sanctuary Wellness & Spa
            </h2>
          </div>
          <p className="text-sm text-[#a39e93] tracking-widest font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Science-backed restorative protocols designed to induce parasympathetic recovery and total mental tranquility.
          </p>
        </div>

        {/* Spa Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {treatments.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#0d0f14] border border-[#222633] hover:border-[#c5a880]/50 transition-all duration-500 flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs tracking-widest text-[#d4af37] uppercase">
                  <span className="flex items-center space-x-2">
                    <Clock size={13} />
                    <span>{item.duration}</span>
                  </span>
                  <span>{item.price}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl text-[#f8f5f0] group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#a39e93] font-light leading-relaxed tracking-wider">
                  {item.desc}
                </p>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full bg-[#12141a] group-hover:bg-[#d4af37] text-[#c2bcb2] group-hover:text-[#090a0d] border border-[#2a2d38] text-xs tracking-[0.2em] font-medium py-3 transition-all duration-300 uppercase"
              >
                SCHEDULE TREATMENT
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
