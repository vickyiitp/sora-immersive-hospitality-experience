'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Star, Phone, ShieldCheck, Sun, Compass, ExternalLink, Code } from 'lucide-react';

export default function LocalGoogleSection() {
  const [activeTab, setActiveTab] = useState<'map' | 'reviews' | 'directions' | 'seo'>('map');

  const reviews = [
    {
      author: 'Forbes Travel Guide 2026',
      rating: 5.0,
      title: 'Five-Star Award Winner',
      comment: 'SORA defines the benchmark for 21st-century ultra-luxury hospitality. Total acoustic quiet, immaculate architecture, and intuitive human touch.'
    },
    {
      author: 'Condé Nast Traveler Gold List',
      rating: 5.0,
      title: 'Top 10 Global Sanctuaries',
      comment: 'The 360 overwater villa walkthrough and private cliffside dining are unmatched anywhere in the Indo-Pacific.'
    },
    {
      author: 'Lady Sarah V. (Verified Guest)',
      rating: 5.0,
      title: 'Unforgettable Island Retreat',
      comment: 'From the moment our private helicopter touched down on the SORA pad, every detail was orchestrated seamlessly. We felt we had already arrived before landing.'
    }
  ];

  const directions = [
    { route: 'Denpasar International Airport (DPS)', transport: 'Private SUV Transfer', time: '25 Mins (Escorted VIP highway)' },
    { route: 'DPS Airport Helipad', transport: 'SORA Airbus H130 Helicopter', time: '7 Mins direct to private resort helipad' },
    { route: 'Benoa Luxury Yacht Marina', transport: 'SORA Riva Yacht Transfer', time: '35 Mins scenic coastal cruise' }
  ];

  const nearbyAttractions = [
    { name: 'Uluwatu Sea Cliff Temple', dist: '4.2 km', desc: 'Ancient 11th-century cliffside sanctuary with sunset Kecak ritual.' },
    { name: 'Padang Coral Reef Reserve', dist: '2.8 km', desc: 'Protected marine sanctuary for sea turtles and rare coral species.' },
    { name: 'Nusa Dua Championship Golf', dist: '8.5 km', desc: '18-hole oceanfront championship course with private caddy service.' }
  ];

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Resort",
    "name": "SORA Ultra-Luxury Resort & Sanctuary",
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5.0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.98",
      "reviewCount": "412"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jalan Sanctuary Bay 01",
      "addressLocality": "Uluwatu Peninsula",
      "addressRegion": "Bali",
      "postalCode": "80361",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-8.8142",
      "longitude": "115.0882"
    },
    "priceRange": "$$$$$"
  };

  return (
    <section id="local" className="relative py-28 bg-[#090a0d] border-t border-[#1a1c23]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1c1f28]">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase block mb-3">
              LOCATION & GOOGLE INTEGRATION
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#f8f5f0] font-light">
              Sanctuary Access & Local SEO
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-[#12141a] p-1.5 border border-[#232734] rounded-none">
            {(['map', 'reviews', 'directions', 'seo'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs tracking-[0.2em] px-4 py-2 uppercase font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#c5a880] text-[#090a0d] font-semibold'
                    : 'text-[#a39e93] hover:text-[#f8f5f0]'
                }`}
              >
                {tab === 'seo' ? 'JSON-LD SEO' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Styled Google Map Simulation */}
            <div className="lg:col-span-8 relative aspect-[16/9] bg-[#0c0d12] border border-[#232734] overflow-hidden shadow-2xl group">
              {/* Map Canvas Background image with custom dark warm skin styling */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                alt="SORA Location Map"
                className="w-full h-full object-cover filter brightness-75 contrast-125 saturate-50"
              />
              <div className="absolute inset-0 bg-[#090a0d]/60" />

              {/* Map Pin Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center space-y-2">
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-[#d4af37] text-black items-center justify-center shadow-2xl">
                    <MapPin size={14} />
                  </span>
                </span>
                <div className="bg-[#090a0d]/95 text-[#f8f5f0] px-4 py-2 border border-[#d4af37]/50 shadow-2xl text-center">
                  <span className="font-serif-luxury text-lg block text-[#d4af37]">SORA SANCTUARY</span>
                  <span className="text-[9px] tracking-[0.2em] text-[#a39e93] block">Uluwatu Peninsula • Bali</span>
                </div>
              </div>

              {/* Map Floating Details */}
              <div className="absolute bottom-6 left-6 z-20 bg-[#090a0d]/90 backdrop-blur-md p-4 border border-[#232734] max-w-sm">
                <div className="flex items-center space-x-2 text-xs text-[#d4af37] mb-1 font-semibold">
                  <Star size={13} fill="#d4af37" />
                  <span>4.98 Rating (412 Verified Google Reviews)</span>
                </div>
                <p className="text-xs text-[#c2bcb2] font-light">
                  Jalan Sanctuary Bay 01, Uluwatu Peninsula, Bali 80361
                </p>
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="lg:col-span-4 bg-[#0d0e14] border border-[#232734] p-8 space-y-6">
              <span className="text-xs tracking-[0.25em] text-[#d4af37] font-semibold uppercase block">
                CURATED LOCAL ATTRACTIONS
              </span>

              <div className="space-y-4">
                {nearbyAttractions.map((spot, i) => (
                  <div key={i} className="p-4 bg-[#12141a] border-l-2 border-[#c5a880] space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold text-[#f8f5f0]">
                      <span>{spot.name}</span>
                      <span className="text-[#d4af37] font-serif-luxury">{spot.dist}</span>
                    </div>
                    <p className="text-[11px] text-[#a39e93] font-light">{spot.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div key={idx} className="p-8 bg-[#0d0e14] border border-[#232734] space-y-4">
                <div className="flex items-center space-x-1 text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#d4af37" />
                  ))}
                </div>
                <h3 className="font-serif-luxury text-xl text-[#f8f5f0]">{rev.title}</h3>
                <p className="text-xs text-[#c2bcb2] font-light leading-relaxed italic">
                  &quot;{rev.comment}&quot;
                </p>
                <div className="pt-4 border-t border-[#1c1f28] text-[10px] tracking-widest text-[#a39e93] uppercase font-semibold">
                  {rev.author}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'directions' && (
          <div className="bg-[#0d0e14] border border-[#232734] p-8 space-y-6">
            <h3 className="font-serif-luxury text-3xl text-[#f8f5f0]">Arrival & Transit Logistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {directions.map((dir, i) => (
                <div key={i} className="p-6 bg-[#12141a] border border-[#232734] space-y-2">
                  <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-semibold block">
                    ROUTE 0{i + 1}
                  </span>
                  <h4 className="font-serif-luxury text-xl text-[#f8f5f0]">{dir.route}</h4>
                  <p className="text-xs text-[#a39e93]">{dir.transport}</p>
                  <span className="inline-block text-xs text-[#c5a880] font-semibold pt-2">{dir.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="bg-[#0b0c10] border border-[#232734] p-8 space-y-4 font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#d4af37] mb-2">
              <Code size={16} />
              <span>Structured Data Schema (Google Search & Maps Integration)</span>
            </div>
            <pre className="bg-[#12141d] p-6 text-[#c5a880] overflow-x-auto border border-[#1f2230]">
              {JSON.stringify(jsonLdSchema, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
