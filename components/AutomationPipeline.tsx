'use client';

import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Calendar, Key, Star, CheckCircle2, Play, RefreshCw, Smartphone, ChevronRight, Sparkles } from 'lucide-react';

interface AutomationPipelineProps {
  bookingData?: {
    guestName: string;
    suiteName: string;
    checkIn: string;
    checkOut: string;
    totalPrice: string;
  };
}

export default function AutomationPipeline({ bookingData }: AutomationPipelineProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const mockBooking = bookingData || {
    guestName: 'Eleanor Vance',
    suiteName: 'Oceanfront Horizon Pavilion',
    checkIn: 'OCTOBER 14, 2026',
    checkOut: 'OCTOBER 20, 2026',
    totalPrice: '$17,100'
  };

  const steps = [
    {
      id: 'confirmation',
      title: '1. Instant Reservation Confirmation',
      channel: 'EMAIL GATEWAY',
      icon: Mail,
      time: 'Immediate (t + 0s)',
      desc: 'Bespoke HTML confirmation dispatched with encrypted QR reservation token and butler contact.',
      preview: {
        type: 'email',
        subject: 'SORA Sanctuary — Booking Confirmation #SR-9842',
        from: 'concierge@sora-sanctuary.com',
        content: `Dear ${mockBooking.guestName},\n\nWe are honored to confirm your upcoming stay at SORA in the ${mockBooking.suiteName}.\n\nDates: ${mockBooking.checkIn} — ${mockBooking.checkOut}\nPrivate Transfer: SORA Airbus H130 Helicopter arranged.\n\nYour personal butler Juliette will be in touch via WhatsApp to customize your pillow menu and dietary preferences.`
      }
    },
    {
      id: 'whatsapp',
      title: '2. Dedicated WhatsApp Butler Welcome',
      channel: 'WHATSAPP CONCIERGE API',
      icon: MessageSquare,
      time: 't + 10 mins',
      desc: 'Private direct messaging line established with dedicated butler Juliette.',
      preview: {
        type: 'whatsapp',
        sender: 'Juliette — SORA Head Butler',
        messages: [
          `Greetings Ms. Vance! I am Juliette, your head butler at SORA.`,
          `We have noted your arrival on ${mockBooking.checkIn}. May I prepare a chilled bottle of 2012 Dom Pérignon for your suite balcony upon landing?`
        ]
      }
    },
    {
      id: 'calendar',
      title: '3. Calendar Auto-Sync & Itinerary',
      channel: 'GOOGLE / APPLE CALENDAR API',
      icon: Calendar,
      time: 't + 15 mins',
      desc: 'Smart .ics event injected into guest calendar with flight reminders, weather updates, and gate coordinates.',
      preview: {
        type: 'calendar',
        eventTitle: 'SORA Luxury Sanctuary Retreat',
        location: 'Uluwatu Peninsula, Bali (08° 42′ S 115° 08′ E)',
        alert: 'Flight DPS 245 Departs in 12 Hours • Private SUV waiting at Gate 4'
      }
    },
    {
      id: 'key',
      title: '4. Mobile Wallet Key & Check-in Pass',
      channel: 'DIGITAL WALLET / BLE PASS',
      icon: Key,
      time: '48 Hours Prior',
      desc: 'NFC Wallet Key generated for touchless suite entry, private beach cabana access, and automated gate clearance.',
      preview: {
        type: 'wallet',
        passTitle: 'SORA SANCTUARY WALLET PASS',
        suiteNumber: 'PAVILION 04',
        nfcCode: 'BLE-ENCRYPTED-NFC-9941'
      }
    },
    {
      id: 'review',
      title: '5. Post-Stay Curated Membership Invitation',
      channel: 'AUTOMATED GUEST RECOGNITION',
      icon: Star,
      time: 'Day 7 (Post-Checkout)',
      desc: 'Private feedback survey and exclusive invitation to SORA Circle global private owners club.',
      preview: {
        type: 'review',
        subject: 'SORA Circle — Invitation to Private Owners Club',
        score: '5.0 / 5.0 Star Feedback Request'
      }
    }
  ];

  // Auto-play steps loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <section id="automation" className="relative py-28 bg-[#07080b] border-t border-[#1a1c23]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1c1f28]">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase block mb-3">
              INTELLIGENT GUEST AUTOMATION
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#f8f5f0] font-light">
              End-to-End Guest Journey
            </h2>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mt-4 md:mt-0 inline-flex items-center space-x-3 bg-[#12141a] border border-[#d4af37]/60 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#090a0d] px-6 py-3 text-xs tracking-[0.2em] font-semibold transition-all duration-300"
          >
            {isPlaying ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
            <span>{isPlaying ? 'PAUSE AUTOMATION SIMULATION' : 'SIMULATE LIVE GUEST JOURNEY'}</span>
          </button>
        </div>

        {/* Timeline Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps Timeline Navigation */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className={`w-full text-left p-5 border transition-all duration-500 relative flex items-start space-x-4 ${
                    isActive
                      ? 'bg-[#13151c] border-[#c5a880] shadow-2xl scale-[1.02]'
                      : 'bg-[#0a0b0e] border-[#1c1f28] hover:border-[#333847]'
                  }`}
                >
                  <div className={`p-2.5 rounded-none border ${
                    isActive ? 'bg-[#d4af37] text-black border-white' : 'bg-[#12141a] text-[#d4af37] border-[#222631]'
                  }`}>
                    <Icon size={18} />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-semibold block">
                      {step.channel} • {step.time}
                    </span>
                    <h4 className="font-serif-luxury text-lg text-[#f8f5f0]">{step.title}</h4>
                    <p className="text-xs text-[#a39e93] font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {isActive && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Live Smartphone Device Screen Simulation */}
          <div className="lg:col-span-7 bg-[#0d0e13] border border-[#222631] p-8 relative min-h-[480px] flex flex-col justify-between shadow-2xl">
            {/* Device Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1c1f28]">
              <div className="flex items-center space-x-3 text-xs tracking-widest text-[#d4af37] uppercase font-semibold">
                <Smartphone size={15} />
                <span>GUEST DEVICE PREVIEW • STEP 0{activeStep + 1}</span>
              </div>
              <span className="text-[10px] text-[#736e65]">LIVE ENCRYPTED STREAM</span>
            </div>

            {/* Dynamic Step Device Visual Content */}
            <div className="my-auto py-8">
              {steps[activeStep].preview.type === 'email' && (
                <div className="bg-[#12141a] border border-[#2a2d38] p-6 space-y-4 shadow-xl animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-[#222631] pb-3 text-xs text-[#a39e93]">
                    <span>From: concierge@sora-sanctuary.com</span>
                    <span>To: {mockBooking.guestName}</span>
                  </div>
                  <h4 className="font-serif-luxury text-xl text-[#d4af37]">{steps[activeStep].preview.subject}</h4>
                  <p className="text-xs text-[#e6e2dd] whitespace-pre-line font-light leading-relaxed">
                    {steps[activeStep].preview.content}
                  </p>
                </div>
              )}

              {steps[activeStep].preview.type === 'whatsapp' && (
                <div className="bg-[#0b141a] border border-[#1b2b36] p-6 space-y-3 shadow-xl animate-in fade-in duration-300">
                  <div className="flex items-center space-x-3 border-b border-[#17252f] pb-3">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37] text-black font-semibold flex items-center justify-center text-xs">
                      J
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#f8f5f0] block">Juliette (Head Butler)</span>
                      <span className="text-[10px] text-[#25d366] block">● Online • SORA WhatsApp Butler</span>
                    </div>
                  </div>

                  {steps[activeStep].preview.messages?.map((msg, idx) => (
                    <div key={idx} className="bg-[#18252d] text-xs text-[#e6e2dd] p-3 rounded-lg max-w-sm font-light shadow-md border border-[#233541]">
                      {msg}
                    </div>
                  ))}
                </div>
              )}

              {steps[activeStep].preview.type === 'calendar' && (
                <div className="bg-[#12141a] border border-[#2a2d38] p-6 space-y-3 shadow-xl animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-xs text-[#d4af37] font-semibold">
                    <span>GOOGLE CALENDAR EVENT</span>
                    <span>CONFIRMED</span>
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-[#f8f5f0]">{steps[activeStep].preview.eventTitle}</h4>
                  <p className="text-xs text-[#a39e93] font-light">📍 {steps[activeStep].preview.location}</p>
                  <p className="text-xs text-[#c5a880] border-l-2 border-[#d4af37] pl-3 py-1 bg-[#181a24]">
                    🔔 {steps[activeStep].preview.alert}
                  </p>
                </div>
              )}

              {steps[activeStep].preview.type === 'wallet' && (
                <div className="bg-gradient-to-br from-[#1c1f28] to-[#0d0e14] border border-[#c5a880] p-6 space-y-4 shadow-2xl animate-in fade-in duration-300 text-center">
                  <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                    {steps[activeStep].preview.passTitle}
                  </span>
                  <h3 className="font-serif-luxury text-4xl text-[#f8f5f0]">{steps[activeStep].preview.suiteNumber}</h3>
                  <div className="w-24 h-24 mx-auto bg-white p-2 shadow-inner">
                    {/* QR Code Placeholder graphic */}
                    <div className="w-full h-full bg-[#090a0d] grid grid-cols-4 gap-1 p-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className={`h-full w-full ${i % 2 === 0 ? 'bg-[#d4af37]' : 'bg-transparent'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#a39e93] tracking-widest block font-mono">
                    NFC TOUCHLESS ACCESS • READY TO TAP
                  </span>
                </div>
              )}

              {steps[activeStep].preview.type === 'review' && (
                <div className="bg-[#12141a] border border-[#2a2d38] p-6 space-y-4 shadow-xl animate-in fade-in duration-300">
                  <h4 className="font-serif-luxury text-2xl text-[#d4af37]">{steps[activeStep].preview.subject}</h4>
                  <p className="text-xs text-[#c2bcb2] font-light leading-relaxed">
                    Thank you for disappearing to SORA. We invite you to share your feedback and join SORA Circle for complimentary private helicopter upgrades on future stays.
                  </p>
                  <div className="flex items-center space-x-1 text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#d4af37" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Device Footer Status */}
            <div className="pt-4 border-t border-[#1c1f28] flex justify-between items-center text-[10px] text-[#736e65] uppercase tracking-widest">
              <span>AUTOMATION ENGINE v4.2</span>
              <span>100% RELIABLE GUEST ORCHESTRATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
