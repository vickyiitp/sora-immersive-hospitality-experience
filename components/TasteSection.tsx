'use client';

import React, { useState } from 'react';
import { Utensils, Wine, Flame, Sparkles, ChevronRight, Calendar } from 'lucide-react';

interface TasteSectionProps {
  onOpenBooking: () => void;
}

export default function TasteSection({ onOpenBooking }: TasteSectionProps) {
  const venues = [
    {
      id: 'kai',
      name: 'KAI — Overwater Michelin Pavilion',
      concept: 'Coastal Japanese & Pacific Omakase',
      chef: 'Executive Chef Hiroshi Tanaka',
      vibe: 'Glass floor dining suspended over the bioluminescent lagoon',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      menuHighlights: [
        { dish: 'Hokkaido Scallop & White Truffle Dashi', detail: 'Charred Yuzu, Ossetra Caviar, Gold Leaf' },
        { dish: 'A5 Miyazaki Wagyu Tenderloin', detail: 'Smoked Bincho-tan Charcoal, Wasabi Root Puree' },
        { dish: 'Bioluminescent Pacific Toro', detail: 'Wild Caught Bluefin, Sea Urchin, Aged Soy Shoyu' }
      ]
    },
    {
      id: 'umbra',
      name: 'UMBRA — Cliff Edge Sunset Lounge',
      concept: 'Botanic Mixology & Woodfired Ember Grill',
      chef: 'Head Mixologist Elena Rostova',
      vibe: 'Perched on high volcanic cliffs overlooking golden ocean horizon',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      menuHighlights: [
        { dish: 'Obsidian Smoked Mezcal Infusion', detail: 'Wild Sage, Desert Agave, Flamed Cinnamon' },
        { dish: 'Charred Coral Lobster Tail', detail: 'Fermented Chili Butter, Sea Salt Blossom' },
        { dish: 'SORA Sunset Spritz', detail: 'Kaffir Lime, Champagne Brut, Elderflower Vapor' }
      ]
    },
    {
      id: 'cellar',
      name: 'CELLAR — Volcanic Basalt Cave',
      concept: 'Private Rare Vintage & Sommelier Tastings',
      chef: 'Master Sommelier Jean-Luc Moreau',
      vibe: 'Subterranean wine vault hosting 1,800 estate bottles',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
      menuHighlights: [
        { dish: '1996 Chateau Margaux Pairing', detail: 'Aged Artisan Goat Cheese, Truffle Honey' },
        { dish: 'Grand Cru Pinot Noir Flight', detail: 'Bespoke Charcuterie & Smoked Duck Breast' },
        { dish: 'Rare Vintage Cognac & Cacao', detail: '70% Ecuadorian Single Origin Chocolate' }
      ]
    }
  ];

  const [activeVenue, setActiveVenue] = useState(venues[0]);

  return (
    <section id="taste" className="relative py-28 bg-[#07080b] border-t border-[#1a1c23]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1c1f28]">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase block mb-3">
              CULINARY ARTISTRY
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#f8f5f0] font-light">
              Gastronomic Excellence
            </h2>
          </div>
          <p className="text-sm text-[#a39e93] tracking-widest font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Ingredients harvested daily from SORA’s private organic gardens and local artisanal sea foragers.
          </p>
        </div>

        {/* Venue Switcher Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Venue Buttons */}
          <div className="lg:col-span-5 space-y-4">
            {venues.map((venue) => (
              <button
                key={venue.id}
                onClick={() => setActiveVenue(venue)}
                className={`w-full text-left p-6 border transition-all duration-500 group ${
                  activeVenue.id === venue.id
                    ? 'bg-[#13151b] border-[#c5a880] shadow-2xl'
                    : 'bg-[#0b0c0f] border-[#1f222b] hover:border-[#383d4c]'
                }`}
              >
                <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase block mb-1">
                  {venue.concept}
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#f8f5f0] group-hover:text-[#d4af37] transition-colors">
                  {venue.name}
                </h3>
                <p className="text-xs text-[#a39e93] mt-2 font-light tracking-wider">
                  {venue.vibe}
                </p>
              </button>
            ))}

            <button
              onClick={onOpenBooking}
              className="w-full bg-transparent border border-[#d4af37]/60 hover:bg-[#d4af37] text-[#f8f5f0] hover:text-[#090a0d] text-xs tracking-[0.25em] font-semibold py-4 flex items-center justify-center space-x-3 transition-all duration-300"
            >
              <Utensils size={15} />
              <span>RESERVE PRIVATE DINING TABLE</span>
            </button>
          </div>

          {/* Right Selected Venue Showcase */}
          <div className="lg:col-span-7 bg-[#0d0e12] border border-[#262a36] p-8 space-y-6">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={activeVenue.image}
                alt={activeVenue.name}
                className="w-full h-full object-cover filter brightness-90 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-[#090a0d]/90 text-[#d4af37] text-[10px] tracking-widest px-3 py-1 border border-[#d4af37]/30 uppercase">
                {activeVenue.chef}
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs tracking-[0.2em] text-[#a39e93] uppercase block">CURATED TASTING HIGHLIGHTS</span>
              <div className="space-y-3">
                {activeVenue.menuHighlights.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#12141a] border-l-2 border-[#d4af37] flex justify-between items-center">
                    <div>
                      <h4 className="font-serif-luxury text-lg text-[#f8f5f0]">{item.dish}</h4>
                      <p className="text-xs text-[#a39e93] font-light tracking-wider">{item.detail}</p>
                    </div>
                    <ChevronRight size={16} className="text-[#d4af37]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
