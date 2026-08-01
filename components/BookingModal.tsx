'use client';

import React, { useState } from 'react';
import { X, Calendar, User, CreditCard, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Plane, GlassWater } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomName?: string;
  onBookingComplete: (data: any) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialRoomName,
  onBookingComplete
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSuite, setSelectedSuite] = useState(initialRoomName || 'Oceanfront Horizon Pavilion');
  const [checkInDate, setCheckInDate] = useState('2026-10-14');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-20');
  const [guestsCount, setGuestsCount] = useState(2);
  const [enhancements, setEnhancements] = useState<{ [key: string]: boolean }>({
    helicopter: true,
    champagne: true,
    spa: false
  });

  const [guestInfo, setGuestInfo] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'e.vance@sovereign-holdings.com',
    phone: '+1 (555) 382-9901',
    specialRequests: 'High floor pavilion facing west for sunset.'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const suitePrices: { [key: string]: number } = {
    'Oceanfront Horizon Pavilion': 2850,
    'Cliff Edge Sanctuary Villa': 3600,
    'SORA Grand Penthouse Estate': 6500
  };

  const calculateTotal = () => {
    const base = suitePrices[selectedSuite] || 2850;
    const nights = 6;
    let extra = 0;
    if (enhancements.helicopter) extra += 1200;
    if (enhancements.champagne) extra += 450;
    if (enhancements.spa) extra += 800;

    return (base * nights + extra).toLocaleString();
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const bookingPayload = {
      guestName: `${guestInfo.firstName} ${guestInfo.lastName}`,
      suiteName: selectedSuite,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice: `$${calculateTotal()}`
    };

    setTimeout(() => {
      onBookingComplete(bookingPayload);
      setIsSubmitted(false);
      setStep(1);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#090a0d] border border-[#d4af37]/40 shadow-2xl p-6 md:p-10 text-[#e6e2dd] overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#a39e93] hover:text-[#d4af37] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-8 border-b border-[#1f222b] pb-6">
          <span className="text-[10px] tracking-[0.3em] text-[#d4af37] font-semibold uppercase block mb-1">
            BESPOKE RESERVATION PORTAL
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#f8f5f0]">
            SORA Sanctuary Reservation
          </h2>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1c1f28] text-xs">
          {[
            { num: 1, label: 'DATES' },
            { num: 2, label: 'SUITE' },
            { num: 3, label: 'ENHANCEMENTS' },
            { num: 4, label: 'GUEST DETAILS' }
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center space-x-2 ${
                step === s.num ? 'text-[#d4af37] font-semibold' : 'text-[#736e65]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                step === s.num ? 'bg-[#d4af37] text-black border-white' : 'border-[#2a2d38]'
              }`}>
                {s.num}
              </span>
              <span className="hidden sm:inline tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: Dates & Guests */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-serif-luxury text-2xl text-[#f8f5f0]">Select Stay Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-[#a39e93] uppercase tracking-wider mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-[#12141a] border border-[#2a2d38] p-3 text-xs text-[#f8f5f0] focus:border-[#d4af37] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a39e93] uppercase tracking-wider mb-2">Check-out Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full bg-[#12141a] border border-[#2a2d38] p-3 text-xs text-[#f8f5f0] focus:border-[#d4af37] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#a39e93] uppercase tracking-wider mb-2">Guests Count</label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                className="w-full bg-[#12141a] border border-[#2a2d38] p-3 text-xs text-[#f8f5f0] focus:border-[#d4af37] outline-none"
              >
                <option value={1}>1 Guest (Solo Sanctuary)</option>
                <option value={2}>2 Guests (Couples Retreat)</option>
                <option value={4}>4 Guests (Family Villa)</option>
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#d4af37] text-black text-xs tracking-[0.25em] font-semibold py-4 flex items-center justify-center space-x-2"
            >
              <span>CONTINUE TO SUITE SELECTION</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* STEP 2: Suite Selection */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-serif-luxury text-2xl text-[#f8f5f0]">Choose Your Sanctuary Suite</h3>
            <div className="space-y-4">
              {Object.keys(suitePrices).map((suite) => (
                <button
                  key={suite}
                  onClick={() => setSelectedSuite(suite)}
                  className={`w-full text-left p-5 border transition-all flex justify-between items-center ${
                    selectedSuite === suite
                      ? 'bg-[#13151c] border-[#c5a880]'
                      : 'bg-[#0f1015] border-[#222631] hover:border-[#333847]'
                  }`}
                >
                  <div>
                    <h4 className="font-serif-luxury text-xl text-[#f8f5f0]">{suite}</h4>
                    <span className="text-xs text-[#a39e93]">Includes Personal Butler & Helicopter Transfer</span>
                  </div>
                  <span className="font-serif-luxury text-xl text-[#d4af37]">
                    ${suitePrices[suite]} / night
                  </span>
                </button>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 border border-[#2a2d38] text-xs tracking-widest py-4"
              >
                BACK
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 bg-[#d4af37] text-black text-xs tracking-[0.25em] font-semibold py-4 flex items-center justify-center space-x-2"
              >
                <span>CONTINUE TO ENHANCEMENTS</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Bespoke Enhancements */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-serif-luxury text-2xl text-[#f8f5f0]">Bespoke Arrivals & Enhancements</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-[#12141a] border border-[#222631] cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Plane className="text-[#d4af37]" size={20} />
                  <div>
                    <span className="text-xs font-semibold text-[#f8f5f0] block">Private Airbus H130 Helicopter Transfer</span>
                    <span className="text-[10px] text-[#a39e93]">Airport direct to resort helipad (7 mins flight)</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enhancements.helicopter}
                  onChange={(e) => setEnhancements({ ...enhancements, helicopter: e.target.checked })}
                  className="accent-[#d4af37] h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-[#12141a] border border-[#222631] cursor-pointer">
                <div className="flex items-center space-x-3">
                  <GlassWater className="text-[#d4af37]" size={20} />
                  <div>
                    <span className="text-xs font-semibold text-[#f8f5f0] block">Dom Pérignon 2012 Vintage on Arrival</span>
                    <span className="text-[10px] text-[#a39e93]">Chilled bottle & artisanal caviar board in suite</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enhancements.champagne}
                  onChange={(e) => setEnhancements({ ...enhancements, champagne: e.target.checked })}
                  className="accent-[#d4af37] h-4 w-4"
                />
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 border border-[#2a2d38] text-xs tracking-widest py-4"
              >
                BACK
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-2/3 bg-[#d4af37] text-black text-xs tracking-[0.25em] font-semibold py-4 flex items-center justify-center space-x-2"
              >
                <span>GUEST DETAILS & CONFIRM</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Guest Info & Final Reserve */}
        {step === 4 && (
          <form onSubmit={handleConfirmBooking} className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-serif-luxury text-2xl text-[#f8f5f0]">Guest Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={guestInfo.firstName}
                onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                required
                className="bg-[#12141a] border border-[#2a2d38] p-3 text-xs text-[#f8f5f0] focus:border-[#d4af37] outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={guestInfo.lastName}
                onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                required
                className="bg-[#12141a] border border-[#2a2d38] p-3 text-xs text-[#f8f5f0] focus:border-[#d4af37] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                value={guestInfo.email}
                onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                required
                className="bg-[#12141a] border border-[#2a2d38] p-3 text-xs text-[#f8f5f0] focus:border-[#d4af37] outline-none"
              />
              <input
                type="tel"
                placeholder="Mobile / WhatsApp Number"
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                required
                className="bg-[#12141a] border border-[#2a2d38] p-3 text-xs text-[#f8f5f0] focus:border-[#d4af37] outline-none"
              />
            </div>

            {/* Total Tariff Summary */}
            <div className="p-4 bg-[#12141a] border border-[#d4af37]/40 flex justify-between items-center">
              <div>
                <span className="text-[10px] tracking-widest text-[#a39e93] uppercase block">TOTAL RESERVATION TARIFF</span>
                <span className="font-serif-luxury text-2xl text-[#d4af37]">${calculateTotal()} USD</span>
              </div>
              <span className="text-[10px] text-[#736e65]">INCLUDES TAXES & BUTLER SERVICE</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-[#d4af37] hover:bg-[#e8ca74] text-black text-xs tracking-[0.25em] font-semibold py-4 flex items-center justify-center space-x-2 transition-all"
            >
              {isSubmitted ? (
                <span>DISPATCHING RESERVATION PIPELINE...</span>
              ) : (
                <>
                  <span>CONFIRM & TRIGGER AUTOMATION PIPELINE</span>
                  <CheckCircle2 size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
