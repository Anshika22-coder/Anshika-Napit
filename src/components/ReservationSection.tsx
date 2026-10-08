import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, Mail, Sparkles, MessageSquare, Check, AlertCircle, History, Trash2 } from 'lucide-react';
import { ReservationData } from '../types/restaurant';

interface ReservationSectionProps {
  onReservationSuccess: (reservation: ReservationData) => void;
  savedReservations: ReservationData[];
  onCancelReservation: (id: string) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationSuccess,
  savedReservations,
  onCancelReservation,
}) => {
  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: 'Anshika Napit',
    phone: '+91 98765 43210',
    email: 'anshikanapit701@gmail.com',
    date: minDateStr,
    time: '19:30',
    guests: 2,
    seatingArea: 'candlelight-terrace' as 'main-dining' | 'candlelight-terrace' | 'private-salon' | 'chefs-counter',
    occasion: 'Anniversary Dinner',
    specialRequests: 'Candlelit quiet table with city view. Celebrating our anniversary.',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const seatingOptions = [
    { id: 'candlelight-terrace', label: 'Candlelight Terrace' },
    { id: 'main-dining', label: 'The Royal Darbar Dining Hall' },
    { id: 'private-salon', label: "Private Chef's Table & Royal Dining" },
    { id: 'chefs-counter', label: 'Live Tandoor & Chaat Counter' },
  ];

  const occasions = [
    'Dinner Date',
    'Anniversary Dinner',
    'Birthday Celebration',
    'Business / Executive Meeting',
    'Family Gathering',
    'Casual Fine Dining',
  ];

  const timeSlots = [
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (minimum 2 characters)';
    }

    // Phone validation
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = 'Please provide a valid contact phone number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a reservation date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a dining time slot';
    }

    if (!formData.guests || formData.guests < 1 || formData.guests > 20) {
      newErrors.guests = 'Party size must be between 1 and 20 guests';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate backend booking reservation verification
    setTimeout(() => {
      const reservationId = 'GF-' + Math.floor(100000 + Math.random() * 900000);
      const newReservation: ReservationData = {
        id: reservationId,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        date: formData.date,
        time: formData.time,
        guests: Number(formData.guests),
        seatingArea: formData.seatingArea,
        occasion: formData.occasion,
        specialRequests: formData.specialRequests.trim(),
        createdAt: new Date().toISOString(),
      };

      setIsSubmitting(false);
      onReservationSuccess(newReservation);
    }, 600);
  };

  return (
    <section id="reservations" className="py-24 bg-[#0d0d10] relative border-b border-[#24201a]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#faf6ee] font-normal leading-tight">
            Reserve Your Experience
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 mb-5"></div>
          <p className="text-sm sm:text-base text-[#bfb7a7] leading-relaxed">
            Reserve your table in advance to secure our signature candlelight terrace or main salon. Instant confirmation sent via SMS & WhatsApp.
          </p>

          {/* Toggle between Booking Form & Saved Reservations History */}
          <div className="mt-6 flex items-center justify-center space-x-3">
            <button
              onClick={() => setShowHistory(false)}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${
                !showHistory
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'bg-[#1a1815] text-[#baa78d] hover:text-white border border-[#2b2720]'
              }`}
            >
              Book a New Table
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                showHistory
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'bg-[#1a1815] text-[#baa78d] hover:text-white border border-[#2b2720]'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Saved Bookings ({savedReservations.length})</span>
            </button>
          </div>
        </div>

        {/* View Saved Bookings Mode */}
        {showHistory ? (
          <div className="max-w-3xl mx-auto bg-[#141316] border border-[#2b2720] rounded-xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#23201a] pb-4 mb-6">
              <h3 className="font-serif-title text-2xl text-[#f6ebd4]">Your Saved Reservations</h3>
              <span className="text-xs text-[#8f8574]">Saved in browser demo storage</span>
            </div>

            {savedReservations.length === 0 ? (
              <div className="text-center py-12 text-[#9a9182]">
                <Calendar className="w-10 h-10 text-[#d4af37]/40 mx-auto mb-3" />
                <p className="text-sm">No reservations saved in your browser yet.</p>
                <button
                  onClick={() => setShowHistory(false)}
                  className="mt-4 px-5 py-2 rounded bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider"
                >
                  Book Your First Table
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedReservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-lg bg-[#1a191d] border border-[#2e2a22] hover:border-[#d4af37]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-[#d4af37]">{res.id}</span>
                        <span className="text-xs text-stone-400">&middot;</span>
                        <span className="text-sm font-semibold text-white">{res.name}</span>
                        {res.occasion && (
                          <span className="text-[10px] bg-[#23201a] text-[#f7e7b4] px-2 py-0.5 rounded border border-[#d4af37]/30">
                            {res.occasion}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-xs text-[#b8b0a0] flex flex-wrap gap-x-4 gap-y-1">
                        <span>📅 {res.date}</span>
                        <span>⏰ {res.time}</span>
                        <span>👥 {res.guests} Guests</span>
                        <span>📍 {res.seatingArea.replace('-', ' ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => onCancelReservation(res.id)}
                        className="px-3 py-1.5 rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-800/40 text-xs font-medium flex items-center space-x-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Main Reservation Form */
          <div className="max-w-4xl mx-auto bg-[#141316] border border-[#d4af37]/40 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Top decorative badge */}
            <div className="flex items-center justify-between border-b border-[#26231c] pb-6 mb-8">
              <div>
                <h3 className="font-serif-title text-2xl sm:text-3xl text-[#f6ebd4]">
                  Table Reservation Form
                </h3>
                <p className="text-xs text-[#9d9382] mt-1">
                  Complimentary reservation &middot; No booking fee required &middot; Instant confirmation
                </p>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block">Need immediate booking?</span>
                <a href="tel:+919876543210" className="text-xs text-[#f5ebd5] hover:text-[#d4af37] font-mono">
                  +91 98765 43210
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Row 1: Name, Phone, Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                    Customer Name <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7d7464] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anshika Napit"
                      className={`w-full bg-[#1b191e] border ${
                        errors.name ? 'border-red-500' : 'border-[#2e2a22] focus:border-[#d4af37]'
                      } rounded-md pl-10 pr-3 py-2.5 text-sm text-[#f6ebd4] placeholder-[#7d7464] focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                    Phone Number <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7d7464] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full bg-[#1b191e] border ${
                        errors.phone ? 'border-red-500' : 'border-[#2e2a22] focus:border-[#d4af37]'
                      } rounded-md pl-10 pr-3 py-2.5 text-sm text-[#f6ebd4] placeholder-[#7d7464] focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                    Email Address <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7d7464] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. anshika@example.com"
                      className={`w-full bg-[#1b191e] border ${
                        errors.email ? 'border-red-500' : 'border-[#2e2a22] focus:border-[#d4af37]'
                      } rounded-md pl-10 pr-3 py-2.5 text-sm text-[#f6ebd4] placeholder-[#7d7464] focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

              </div>

              {/* Row 2: Date, Time, Number of Guests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Date */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                    Reservation Date <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#7d7464] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full bg-[#1b191e] border ${
                        errors.date ? 'border-red-500' : 'border-[#2e2a22] focus:border-[#d4af37]'
                      } rounded-md pl-10 pr-3 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                    Dining Time <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#7d7464] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={`w-full bg-[#1b191e] border ${
                        errors.time ? 'border-red-500' : 'border-[#2e2a22] focus:border-[#d4af37]'
                      } rounded-md pl-10 pr-3 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors appearance-none`}
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#141316] text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                      {errors.time}
                    </p>
                  )}
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                    Number of Guests <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#7d7464] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                      className={`w-full bg-[#1b191e] border ${
                        errors.guests ? 'border-red-500' : 'border-[#2e2a22] focus:border-[#d4af37]'
                      } rounded-md pl-10 pr-3 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors appearance-none`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num} className="bg-[#141316] text-white">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.guests && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                      {errors.guests}
                    </p>
                  )}
                </div>

              </div>

              {/* Row 3: Seating Preference & Occasion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Seating Preference */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                    Seating Preference
                  </label>
                  <select
                    value={formData.seatingArea}
                    onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value as any })}
                    className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded-md px-3.5 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors"
                  >
                    {seatingOptions.map((opt) => (
                      <option key={opt.id} value={opt.id} className="bg-[#141316] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                    Special Occasion (Optional)
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded-md px-3.5 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ} className="bg-[#141316] text-white">
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Special Requests textarea */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] font-medium mb-1.5">
                  Special Dietary or Dining Requests
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#7d7464] absolute left-3.5 top-3" />
                  <textarea
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Allergies, high chair required, quiet corner booth, cake celebration..."
                    className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded-md pl-10 pr-3 py-2.5 text-sm text-[#f6ebd4] placeholder-[#7d7464] focus:outline-none transition-colors"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#26231c]">
                <div className="text-xs text-[#8e8576] flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#d4af37] mr-1.5 shrink-0" />
                  <span>Free cancellation up to 2 hours prior &middot; Demo storage enabled</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-sm bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b88a1a] text-black font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#d4af37]/25 hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Securing Table...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-black" />
                      <span>Confirm Table Reservation</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
