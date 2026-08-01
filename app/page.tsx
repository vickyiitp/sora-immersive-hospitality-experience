'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import CinematicHero from '@/components/CinematicHero';
import StaySection from '@/components/StaySection';
import TasteSection from '@/components/TasteSection';
import RestoreSection from '@/components/RestoreSection';
import ResortMap from '@/components/ResortMap';
import ExperienceSection from '@/components/ExperienceSection';
import LocalGoogleSection from '@/components/LocalGoogleSection';
import AutomationPipeline from '@/components/AutomationPipeline';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedRoom, setPreselectedRoom] = useState<string | undefined>(undefined);
  const [completedBooking, setCompletedBooking] = useState<any>(null);

  const handleOpenBookingWithRoom = (roomName?: string) => {
    if (roomName) {
      setPreselectedRoom(roomName);
    }
    setIsBookingOpen(true);
  };

  const handleBookingComplete = (bookingPayload: any) => {
    setCompletedBooking(bookingPayload);
    // Smooth scroll to automation section to watch guest journey
    const automationEl = document.getElementById('automation');
    if (automationEl) {
      automationEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#090a0d] text-[#e6e2dd] overflow-x-hidden">
      {/* Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenBooking={() => handleOpenBookingWithRoom()}
      />

      {/* Hero Opening Experience */}
      <CinematicHero
        onExploreClick={() => {
          const stayEl = document.getElementById('stay');
          if (stayEl) stayEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBookingWithRoom()}
      />

      {/* STAY — 360 Walkthrough & Rooms */}
      <StaySection
        onSelectRoomToBook={(roomName) => handleOpenBookingWithRoom(roomName)}
      />

      {/* TASTE — Michelin Gastronomy */}
      <TasteSection
        onOpenBooking={() => handleOpenBookingWithRoom()}
      />

      {/* RESTORE — Wellness & Spa */}
      <RestoreSection
        onOpenBooking={() => handleOpenBookingWithRoom()}
      />

      {/* DISCOVER — Interactive 3D Resort Model */}
      <ResortMap
        onSelectDestination={(dest) => console.log('Selected destination:', dest)}
        onOpenBooking={() => handleOpenBookingWithRoom()}
      />

      {/* EXPERIENCE — Curated Moments */}
      <ExperienceSection
        onOpenBooking={() => handleOpenBookingWithRoom()}
      />

      {/* LOCAL & GOOGLE MAPS — Location & SEO */}
      <LocalGoogleSection />

      {/* AUTOMATION EXPERIENCE — Live Journey */}
      <AutomationPipeline
        bookingData={completedBooking}
      />

      {/* FOOTER */}
      <Footer
        onOpenBooking={() => handleOpenBookingWithRoom()}
      />

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialRoomName={preselectedRoom}
        onBookingComplete={handleBookingComplete}
      />
    </main>
  );
}
