import React from 'react';
import { Leaf, UtensilsCrossed, Sparkles, Flame, ShieldCheck } from 'lucide-react';
import { HIGHLIGHTS } from '../data/restaurantData';

export const Highlights: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-[#d4af37]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-[#d4af37]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#d4af37]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#d4af37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#d4af37]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#d4af37]" />;
    }
  };

  return (
    <section id="highlights" className="relative py-24 bg-[#0a0a0c] border-b border-[#24201a]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            <span>The Pillars of Distinction</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#faf6ee] font-normal leading-tight">
            Crafting Unforgettable Dining
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 mb-5"></div>
          <p className="text-sm sm:text-base text-[#bfb7a7] leading-relaxed">
            Every element of The Golden Fork is orchestrated to deliver unmatched gastronomy, timeless ambiance, and sincere hospitality.
          </p>
        </div>

        {/* 5 Highlights Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-[#131215]/80 hover:bg-[#19181c] border border-[#2b2720] hover:border-[#d4af37]/50 rounded-lg p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between gold-card-hover"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#d4af37]/10 to-transparent rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Icon in gold halo */}
                <div className="w-13 h-13 rounded-full bg-[#1b1915] border border-[#d4af37]/30 flex items-center justify-center mb-6 group-hover:border-[#d4af37] group-hover:bg-[#221e17] transition-all shadow-md shadow-black/50">
                  {getIcon(item.icon)}
                </div>

                <div className="text-[11px] font-mono tracking-widest uppercase text-[#8f8574] mb-1">
                  0{index + 1}
                </div>

                <h3 className="font-serif-title text-xl text-[#f5ebd5] font-medium group-hover:text-[#ffffff] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#a8a090] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#23201a] flex items-center text-[11px] text-[#cbbfa8] font-medium group-hover:text-[#d4af37] transition-colors">
                <span>{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
