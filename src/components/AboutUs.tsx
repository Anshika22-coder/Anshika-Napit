import React from 'react';
import { Calendar, Award, Sparkles, HeartHandshake } from 'lucide-react';

interface AboutUsProps {
  onOpenReservation: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenReservation }) => {
  return (
    <section id="about" className="py-24 bg-[#0d0d10] relative overflow-hidden border-b border-[#24201a]">
      {/* Decorative ambient gradients */}
      <div className="absolute -left-40 top-1/3 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Restaurant Interior Imagery with overlapping badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#d4af37]/30 shadow-2xl shadow-black/80">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=85"
                alt="The Golden Fork Royal Darbar dining hall interior"
                className="w-full h-[460px] sm:h-[540px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

              {/* Bottom tag inside photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#100f13]/85 backdrop-blur-md border border-[#d4af37]/25 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">The Royal Darbar Dining Hall</div>
                  <div className="text-sm text-[#ded6c7] font-light">Imperial sandstone arches, hand-inlaid crystal chandeliers & gold silk diwan seating</div>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-xs text-[#9d9382]">Capacity</div>
                  <div className="text-sm font-semibold text-white">90 Guests</div>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Heritage Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-gradient-to-br from-[#1c1914] to-[#12110e] border border-[#d4af37] p-5 rounded-lg shadow-2xl shadow-black/90 flex-col items-center text-center max-w-[190px]">
              <Award className="w-8 h-8 text-[#d4af37] mb-2" />
              <span className="font-cinzel text-lg font-bold text-[#faf3e3]">Excellence</span>
              <span className="text-[11px] text-[#b0a797] uppercase tracking-wider mt-0.5">
                Voted Best Fine Dining 2024 &middot; 2025
              </span>
            </div>
          </div>

          {/* Right Column: Our Story Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Heritage & Culinary Passion</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#faf6ee] font-normal leading-tight">
              Our Story
            </h2>

            <div className="w-16 h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent"></div>

            <div className="space-y-4 text-sm sm:text-base text-[#c7beaf] font-light leading-relaxed">
              <p>
                Founded with a singular vision to redefine luxury gastronomy, <strong className="text-[#f7e7b4] font-medium">The Golden Fork</strong> was born from a deep reverence for authentic culinary traditions paired with daring contemporary technique.
              </p>
              <p>
                Every morning begins with the freshest harvest: hand-selected micro-greens from organic hydroponic farms, heirloom spices crushed in small batches, and fresh malai paneer and churned makhan prepared daily. We believe royal vegetarian dining is not simply a meal, but an orchestrated multisensory ritual that awakens nostalgia while crafting new, unforgettable memories.
              </p>
              <p>
                Whether you join us for an intimate candlelit anniversary, an artisan afternoon café roast, or a celebratory banquet with loved ones, our team welcomes you with royal warmth and uncompromising hospitality.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#26231c]">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-[#1c1a16] border border-[#d4af37]/30 text-[#d4af37]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5ebd5]">Artisan Craft</h4>
                  <p className="text-xs text-[#9d9484] mt-0.5">Slow-cooked reductions and tableside culinary theatrics.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-[#1c1a16] border border-[#d4af37]/30 text-[#d4af37]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5ebd5]">Sincere Hospitality</h4>
                  <p className="text-xs text-[#9d9484] mt-0.5">Personalized sommelier pairings and custom dietary menus.</p>
                </div>
              </div>
            </div>

            {/* Chef signature & CTA button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="font-script text-3xl sm:text-4xl text-[#d4af37]">
                  Vikramaditya & Team
                </div>
                <div className="text-xs text-[#9d9382] uppercase tracking-widest mt-0.5">
                  Executive Chef & Co-Founder
                </div>
              </div>

              <button
                onClick={onOpenReservation}
                className="px-6 py-3 rounded-sm bg-gradient-to-r from-[#d4af37] to-[#b88a1a] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#d4af37]/20"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Reserve Your Table</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
