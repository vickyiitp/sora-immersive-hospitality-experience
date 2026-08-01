'use client';

import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <footer className="bg-[#06070a] text-[#c2bcb2] border-t border-[#191b22] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-6">
            <span className="font-serif-luxury text-4xl tracking-[0.3em] font-light text-[#f3ede2] block">
              SORA
            </span>
            <p className="font-serif-luxury text-xl italic text-[#d4af37] font-light">
              &quot;Somewhere worth disappearing to.&quot;
            </p>
            <p className="text-xs text-[#a39e93] font-light leading-relaxed max-w-sm">
              SORA is an ultra-exclusive coastal sanctuary designed for absolute acoustic quiet, architectural harmony, and uncompromised human discretion.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4 text-xs tracking-widest font-light">
            <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-semibold block mb-2">
              DESTINATIONS
            </span>
            <ul className="space-y-2.5 text-[#a39e93]">
              <li><a href="#stay" className="hover:text-[#f8f5f0] transition-colors">Horizon Suites & Pavilions</a></li>
              <li><a href="#taste" className="hover:text-[#f8f5f0] transition-colors">KAI Overwater Gastronomy</a></li>
              <li><a href="#restore" className="hover:text-[#f8f5f0] transition-colors">Sanctuary Hydrotherapy Spa</a></li>
              <li><a href="#discover" className="hover:text-[#f8f5f0] transition-colors">3D Miniature Masterplan</a></li>
              <li><a href="#local" className="hover:text-[#f8f5f0] transition-colors">Location & Transit Routes</a></li>
            </ul>
          </div>

          {/* Contact Coordinates */}
          <div className="md:col-span-4 space-y-4 text-xs tracking-widest font-light">
            <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-semibold block mb-2">
              SANCTUARY COORDINATES
            </span>
            <p className="text-[#a39e93]">08° 42′ S  115° 08′ E • Uluwatu Peninsula, Bali</p>
            <p className="text-[#a39e93]">Direct Concierge: +62 361 984 000</p>
            <p className="text-[#a39e93]">Inquiries: concierge@sora-sanctuary.com</p>

            <button
              onClick={onOpenBooking}
              className="mt-4 inline-flex items-center space-x-2 bg-[#12141a] border border-[#d4af37]/60 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#090a0d] px-6 py-3 text-xs tracking-[0.2em] font-semibold transition-all"
            >
              <span>CHECK SUITE AVAILABILITY</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#171920] pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#736e65] tracking-widest uppercase">
          <span>© 2026 SORA SANCTUARY & RESORTS. ALL RIGHTS RESERVED.</span>
          <span className="mt-2 sm:mt-0">FORBES 5-STAR CERTIFIED HOSPITALLITY</span>
        </div>
      </div>
    </footer>
  );
}
