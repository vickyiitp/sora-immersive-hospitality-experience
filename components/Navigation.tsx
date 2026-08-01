'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Calendar, Menu, X, Compass, MapPin, Sparkles } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenBooking: () => void;
}

export default function Navigation({ activeSection, setActiveSection, onOpenBooking }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.4);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundscape, setSoundscape] = useState<'dawn' | 'spa' | 'night' | 'cliff'>('dawn');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    if (!soundEngine) return;
    const playing = soundEngine.toggleSound();
    setIsAudioPlaying(playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAudioVolume(val);
    if (soundEngine) {
      soundEngine.setVolume(val);
    }
  };

  const handleSoundscapeChange = (preset: 'dawn' | 'spa' | 'night' | 'cliff') => {
    setSoundscape(preset);
    if (soundEngine) {
      soundEngine.setPreset(preset);
    }
  };

  const navItems = [
    { id: 'stay', label: 'STAY' },
    { id: 'taste', label: 'TASTE' },
    { id: 'restore', label: 'RESTORE' },
    { id: 'discover', label: 'DISCOVER' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'local', label: 'LOCAL & MAP' },
    { id: 'automation', label: 'JOURNEY FLOW' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'bg-[#090a0d]/85 backdrop-blur-xl border-b border-[#c5a880]/15 py-4 shadow-2xl'
          : 'bg-gradient-to-b from-[#08090c]/90 via-[#08090c]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveSection('hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group text-left focus:outline-none"
        >
          <span className="font-serif-luxury text-2xl md:text-3xl tracking-[0.3em] font-light text-[#f3ede2] group-hover:text-[#d4af37] transition-colors duration-500">
            SORA
          </span>
          <span className="block text-[9px] tracking-[0.25em] text-[#a39e93] font-light uppercase group-hover:text-[#e6e2dd] transition-colors">
            SANCTUARY & RESORT
          </span>
        </button>

        {/* Desktop Nav Destinations */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-xs tracking-[0.22em] font-medium transition-all duration-300 relative py-1 ${
                activeSection === item.id
                  ? 'text-[#d4af37]'
                  : 'text-[#c2bcb2] hover:text-[#f8f5f0]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#d4af37] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions & Audio Bar */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Audio Toggle & Selector */}
          <div className="flex items-center space-x-3 bg-[#13151a]/80 border border-[#2a2d35] rounded-full px-3.5 py-1.5 shadow-inner">
            <button
              onClick={toggleAudio}
              className={`p-1 rounded-full transition-all duration-300 ${
                isAudioPlaying
                  ? 'text-[#d4af37] bg-[#d4af37]/15 animate-pulse'
                  : 'text-[#8c867a] hover:text-[#f3ede2]'
              }`}
              title={isAudioPlaying ? 'Mute Coastal Soundscape' : 'Enable Subtle Soundscape'}
            >
              {isAudioPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {isAudioPlaying && (
              <div className="flex items-center space-x-2 text-[10px] tracking-wider text-[#a39e93]">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioVolume}
                  onChange={handleVolumeChange}
                  className="w-12 h-1 accent-[#d4af37] bg-[#2a2d35] rounded-lg cursor-pointer"
                />
                <select
                  value={soundscape}
                  onChange={(e) => handleSoundscapeChange(e.target.value as any)}
                  className="bg-transparent text-[#d4af37] focus:outline-none cursor-pointer border-none font-sans text-[10px]"
                >
                  <option value="dawn" className="bg-[#121418] text-[#e6e2dd]">Dawn Ocean</option>
                  <option value="spa" className="bg-[#121418] text-[#e6e2dd]">Spa Zen</option>
                  <option value="cliff" className="bg-[#121418] text-[#e6e2dd]">Cliff Winds</option>
                  <option value="night" className="bg-[#121418] text-[#e6e2dd]">Night Lagoon</option>
                </select>
              </div>
            )}
          </div>

          {/* Reserve Button */}
          <button
            onClick={onOpenBooking}
            className="group relative overflow-hidden bg-gradient-to-r from-[#c5a880] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e8ca74] text-[#090a0d] text-xs tracking-[0.2em] font-semibold px-6 py-2.5 rounded-none shadow-lg transition-all duration-500 hover:shadow-[#d4af37]/20 hover:scale-[1.02]"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Calendar size={13} />
              <span>RESERVE</span>
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full border border-[#2a2d35] ${
              isAudioPlaying ? 'text-[#d4af37] bg-[#d4af37]/20' : 'text-[#8c867a]'
            }`}
          >
            {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#e6e2dd] hover:text-[#d4af37] transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090a0d]/95 backdrop-blur-2xl border-b border-[#2a2d35] px-6 py-8 space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left text-sm tracking-[0.2em] py-2 border-b border-[#1c1f26] transition-colors ${
                  activeSection === item.id ? 'text-[#d4af37] font-semibold' : 'text-[#c2bcb2]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full bg-[#d4af37] text-[#090a0d] text-xs tracking-[0.2em] font-semibold py-3 flex items-center justify-center space-x-2 shadow-xl"
          >
            <Calendar size={15} />
            <span>RESERVE SUITE</span>
          </button>
        </div>
      )}
    </header>
  );
}
