import React from 'react';
import { Calendar, Utensils, Star, Clock, MapPin, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onExploreMenu }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/maharaja_thali.jpg"
          alt="The Royal Imperial Maharaja Feast at The Golden Fork"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
        />
        {/* Deep gradient overlays for mood & legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-[#0a0a0c]/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/90 via-[#0a0a0c]/60 to-[#0a0a0c]/85"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Subtle royal crest kicker */}
        <div className="inline-flex items-center space-x-3 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#171410]/80 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#e8dfc8] font-semibold">
            100% Pure Vegetarian Fine Dining &middot; Est. 2018
          </span>
          <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
        </div>

        {/* Main Headline */}
        <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#fbf8f0] leading-[1.08] max-w-4xl drop-shadow-xl">
          A Culinary Experience <br />
          <span className="italic font-light text-[#f7e7b4] relative inline-block">
            Like No Other
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></span>
          </span>
        </h1>

        {/* User Specified Exact Description */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#ded6c7] max-w-2xl font-light leading-relaxed drop-shadow">
          At The Golden Fork, we serve more than just food — we serve moments.
          Enjoy freshly prepared dishes, crafted with passion, in a warm and
          inviting atmosphere.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-sm border border-[#d4af37] bg-transparent hover:bg-[#d4af37]/10 text-[#f6ecd3] hover:text-white font-medium text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <Utensils className="w-4 h-4 text-[#d4af37] group-hover:rotate-12 transition-transform" />
            <span>View Our Menu</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-9 py-4 rounded-sm bg-gradient-to-r from-[#d4af37] via-[#e2bd4f] to-[#b88a1a] text-black font-semibold text-sm tracking-widest uppercase shadow-xl shadow-[#d4af37]/25 hover:shadow-[#d4af37]/50 hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Book a Table</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-[#d4af37]/20 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5ebd2]">4.9 / 5.0</span>
            <span className="text-xs text-[#a39c8f] tracking-wider uppercase mt-1">1,400+ Verified Diners</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5ebd2]">100% Fresh</span>
            <span className="text-xs text-[#a39c8f] tracking-wider uppercase mt-1">Farm Harvests Daily</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5ebd2]">Michelin</span>
            <span className="text-xs text-[#a39c8f] tracking-wider uppercase mt-1">Trained Master Chefs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5ebd2]">Instant SMS</span>
            <span className="text-xs text-[#a39c8f] tracking-wider uppercase mt-1">& WhatsApp Confirmation</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#highlights"
          aria-label="Scroll to highlights"
          className="mt-12 text-[#a89d89] hover:text-[#d4af37] transition-colors flex flex-col items-center text-xs tracking-widest uppercase animate-bounce"
        >
          <span className="mb-1 text-[10px]">Discover More</span>
          <ChevronDown className="w-4 h-4 text-[#d4af37]" />
        </a>
      </div>
    </section>
  );
};
