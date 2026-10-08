import React, { useEffect } from 'react';
import { CheckCircle2, Calendar, Clock, Users, MapPin, X, Download, Share2, PhoneCall, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReservationData } from '../types/restaurant';

interface BookingConfirmationModalProps {
  reservation: ReservationData | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  reservation,
  onClose,
}) => {
  useEffect(() => {
    if (reservation) {
      // Trigger elegant gold and amber celebratory confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#C5A059', '#AA7C11', '#FFFFFF'],
      });
    }
  }, [reservation]);

  if (!reservation) return null;

  // Format date display
  const formatDateString = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formattedDate = formatDateString(reservation.date);
  const firstName = reservation.name.split(' ')[0] || 'Valued Guest';

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Table Reservation Confirmed at The Golden Fork Fine Dining for ${reservation.name} on ${formattedDate} at ${reservation.time} (${reservation.guests} Guests). Booking ID: ${reservation.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#121115] border border-[#d4af37]/60 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#18171c] border-b border-[#2b2720]">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Official Dining Pass &middot; Confirmed</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content: Inspired directly by the user's reference mockup */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d0d10]">
          
          {/* Left Column: Big Confirmation Badge & Booking Card */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header: Circle Gold Check & Text */}
            <div className="text-center sm:text-left">
              <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] bg-[#1a1714] flex items-center justify-center mx-auto sm:mx-0 shadow-lg shadow-[#d4af37]/20 mb-4">
                <CheckCircle2 className="w-9 h-9 text-[#d4af37]" />
              </div>

              <h2 className="font-serif-title text-3xl sm:text-4xl text-[#faf4e6] font-normal leading-tight">
                Your Booking is Confirmed!
              </h2>

              <p className="text-sm text-[#b5ac9d] mt-2 font-light">
                Thank you for choosing The Golden Fork.
                Your reservation has been successfully confirmed.
              </p>
              
              <div className="w-16 h-[1.5px] bg-[#d4af37] mt-3 mx-auto sm:mx-0"></div>
            </div>

            {/* Details Card (Matching layout from image) */}
            <div className="bg-[#151419] border border-[#2e2a22] rounded-xl p-5 shadow-inner">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Date */}
                <div className="flex items-start space-x-3 p-2">
                  <div className="p-2 rounded bg-[#1e1c18] border border-[#d4af37]/30 text-[#d4af37]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8576] uppercase tracking-wider block">Date</span>
                    <span className="text-sm sm:text-base font-semibold text-[#f8f2e4]">{formattedDate}</span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start space-x-3 p-2">
                  <div className="p-2 rounded bg-[#1e1c18] border border-[#d4af37]/30 text-[#d4af37]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8576] uppercase tracking-wider block">Time</span>
                    <span className="text-sm sm:text-base font-semibold text-[#f8f2e4]">{reservation.time}</span>
                  </div>
                </div>

                {/* Guests */}
                <div className="flex items-start space-x-3 p-2">
                  <div className="p-2 rounded bg-[#1e1c18] border border-[#d4af37]/30 text-[#d4af37]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8576] uppercase tracking-wider block">Guests</span>
                    <span className="text-sm sm:text-base font-semibold text-[#f8f2e4]">{reservation.guests} People</span>
                  </div>
                </div>

                {/* Restaurant */}
                <div className="flex items-start space-x-3 p-2">
                  <div className="p-2 rounded bg-[#1e1c18] border border-[#d4af37]/30 text-[#d4af37]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8576] uppercase tracking-wider block">Restaurant</span>
                    <span className="text-sm sm:text-base font-semibold text-[#f8f2e4] truncate block">The Golden Fork</span>
                    <span className="text-[11px] text-[#d4af37] block">Fine Dining</span>
                  </div>
                </div>

              </div>

              {/* Booking Ref and Special Request Note */}
              <div className="mt-4 pt-4 border-t border-[#26231c] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#a9a08f] gap-2">
                <div>
                  <span className="text-[#6d6557]">Ref Code: </span>
                  <span className="font-mono font-bold text-[#d4af37]">{reservation.id}</span>
                </div>
                {reservation.occasion && (
                  <div className="text-[11px] text-[#e0d6c3]">
                    Occasion: <span className="text-[#f5ebd5] font-medium">{reservation.occasion}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Signature row */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2 text-center sm:text-left">
              <span className="text-xs text-[#a39a89] font-light">
                We can't wait to welcome you!
              </span>
              <span className="font-script text-2xl sm:text-3xl text-[#d4af37]">
                The Golden Fork Team
              </span>
            </div>

          </div>

          {/* Right Column: Realistic Phone Mockup showing instant WhatsApp / SMS Notification */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[290px] bg-[#1a191d] rounded-[32px] p-3 shadow-2xl border-4 border-[#332f26] relative">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-[#0a0a0c] rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-8 h-1 bg-stone-700 rounded-full"></div>
              </div>

              {/* Phone Screen */}
              <div className="bg-[#0b141a] rounded-[24px] p-3 text-white min-h-[360px] flex flex-col justify-between shadow-inner">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pb-2 border-b border-stone-800">
                    <span className="font-medium text-stone-300">12:32</span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2.5 h-2 bg-stone-300 rounded-xs inline-block"></span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 py-2 border-b border-stone-800/80">
                    <div className="w-8 h-8 rounded-full border border-[#d4af37] bg-[#161512] flex items-center justify-center text-[#d4af37] text-xs font-bold">
                      🍴
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">The Golden Fork</div>
                      <div className="text-[10px] text-stone-400">+91 98765 43210</div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Bubble */}
                <div className="my-2 bg-[#005c4b] text-[#e9edef] rounded-lg rounded-tl-none p-3 text-xs shadow-md space-y-1.5 leading-relaxed">
                  <div className="font-semibold text-white">
                    Hi {firstName},
                  </div>
                  <div>
                    Your booking is confirmed! ✅
                  </div>
                  <div className="pt-1 text-[11px] border-t border-emerald-600/50 space-y-0.5">
                    <div><strong>Date:</strong> {formattedDate}</div>
                    <div><strong>Time:</strong> {reservation.time}</div>
                    <div><strong>Guests:</strong> {reservation.guests} People</div>
                    <div><strong>Restaurant:</strong> The Golden Fork</div>
                  </div>
                  <div className="pt-1 text-[10px] text-emerald-200">
                    We look forward to welcoming you!
                  </div>
                  <div className="text-[10px] italic text-emerald-300">
                    – The Golden Fork Team
                  </div>
                  <div className="text-[9px] text-right text-emerald-200 mt-1">
                    12:32 PM &check;&check;
                  </div>
                </div>

                {/* Notification indicator */}
                <div className="bg-[#1f2c34] rounded-md p-1.5 text-center text-[10px] text-stone-400">
                  Instant SMS & WhatsApp Sent
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#16151a] px-6 py-4 border-t border-[#2b2720] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded bg-[#23201a] hover:bg-[#2e2a22] border border-[#d4af37]/40 text-[#f5ebd5] text-xs font-medium flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Print Confirmation Pass</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded bg-[#23201a] hover:bg-[#2e2a22] border border-[#d4af37]/40 text-[#f5ebd5] text-xs font-medium flex items-center space-x-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Share Booking</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-gradient-to-r from-[#d4af37] to-[#b88a1a] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
