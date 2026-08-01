'use client';

import React, { useState, useEffect } from 'react';
import DawnResortCanvas from './DawnResortCanvas';
import { Volume2, VolumeX, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

interface CinematicHeroProps {
  onExploreClick: () => void;
  onOpenBooking: () => void;
}

export default function CinematicHero({ onExploreClick, onOpenBooking }: CinematicHeroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'dusk' | 'night'>('dawn');

  useEffect(() => {
    // Subtle initial black screen fade in
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleStartWithSound = () => {
    if (soundEngine) {
      soundEngine.play();
      setSoundEnabled(true);
    }
    onExploreClick();
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#07080b]">
      {/* 3D WebGL Canvas Background */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
        <DawnResortCanvas timeOfDay={timeOfDay} />
      </div>

      {/* Atmospheric Film Grain Overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none z-10" />

      {/* Ambient Gradient Shadows */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-[#090a0d]/60 pointer-events-none z-10" />

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between py-24 md:py-28 pointer-events-none">
        {/* Top Minimal Eyebrow Tag */}
        <div className="flex items-center justify-between text-xs tracking-[0.3em] text-[#a39e93] uppercase font-light pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
            <span>08° 42′ S  115° 08′ E  •  SECLUDED OCEANFRONT SANCTUARY</span>
          </div>

          {/* Time of Day Mood Switcher */}
          <div className="hidden sm:flex items-center space-x-2 bg-[#121419]/60 backdrop-blur-md px-3 py-1 border border-[#2a2d35] rounded-full text-[11px]">
            {(['dawn', 'dusk', 'night'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTimeOfDay(mode)}
                className={`capitalize px-2.5 py-0.5 rounded-full transition-all ${
                  timeOfDay === mode ? 'bg-[#c5a880] text-[#090a0d] font-medium' : 'text-[#a39e93] hover:text-[#f3ede2]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Center Typography & Call to Action */}
        <div className="my-auto max-w-3xl space-y-8 pointer-events-auto">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="font-serif-luxury text-6xl sm:text-8xl md:text-9xl tracking-[0.25em] font-extralight text-[#f8f5f0] drop-shadow-2xl">
              SORA
            </h1>
            <p className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl italic font-light text-[#d4af37] tracking-wide leading-relaxed">
              Somewhere worth disappearing to.
            </p>
          </div>

          <p className="text-sm md:text-base text-[#c2bcb2] font-light tracking-widest max-w-xl leading-relaxed border-l-2 border-[#d4af37]/40 pl-5">
            An ultra-exclusive coastal haven where time decelerates, architecture dissolves into raw nature, and luxury is experienced as total silence.
          </p>

          {/* Primary Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={handleStartWithSound}
              className="group relative inline-flex items-center space-x-4 bg-transparent border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f8f5f0] hover:text-[#090a0d] hover:bg-[#d4af37] px-8 py-4 transition-all duration-500 shadow-2xl tracking-[0.25em] text-xs font-semibold"
            >
              <span>EXPLORE THE STAY</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
            </button>

            <button
              onClick={onOpenBooking}
              className="group inline-flex items-center space-x-3 text-xs tracking-[0.22em] text-[#c2bcb2] hover:text-[#d4af37] transition-colors py-3"
            >
              <span>CHECK SUITE AVAILABILITY</span>
              <span className="w-6 h-[1px] bg-[#c2bcb2] group-hover:bg-[#d4af37] group-hover:w-10 transition-all" />
            </button>
          </div>
        </div>

        {/* Bottom Bar Metrics & Sound prompt */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 pointer-events-auto border-t border-[#1f222b] pt-6">
          <div className="flex items-center space-x-8 text-xs tracking-widest text-[#a39e93]">
            <div>
              <span className="block text-[10px] uppercase text-[#736e65]">Climatic Ambient</span>
              <span className="text-[#e6e2dd] font-serif-luxury text-base">29°C  Balmy Water</span>
            </div>
            <div className="hidden md:block w-[1px] h-8 bg-[#1f222b]" />
            <div className="hidden md:block">
              <span className="block text-[10px] uppercase text-[#736e65]">Privacy Index</span>
              <span className="text-[#e6e2dd] font-serif-luxury text-base">100% Gated Peninsula</span>
            </div>
          </div>

          <div className="text-right">
            <span className="block text-[10px] tracking-[0.2em] text-[#736e65] uppercase">Interactive 3D Horizon</span>
            <span className="text-xs text-[#c5a880] tracking-widest font-serif-luxury italic">
              Move cursor for spatial pan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
