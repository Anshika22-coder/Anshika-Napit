import React from 'react';
import { Sparkles, Plus, Star, Wine } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface ChefSpecialsProps {
  specials: MenuItem[];
  onAddToCart: (dish: MenuItem) => void;
}

export const ChefSpecials: React.FC<ChefSpecialsProps> = ({ specials, onAddToCart }) => {
  return (
    <section id="specials" className="py-24 bg-[#0a0a0c] relative border-b border-[#24201a]">
      {/* Background soft ambient radial light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masterpiece Creations</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#faf6ee] font-normal leading-tight">
            Chef’s Signature Specials
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 mb-5"></div>
          <p className="text-sm sm:text-base text-[#bfb7a7] leading-relaxed">
            Four iconic dishes that define our culinary soul — meticulously developed, slow-cooked to perfection, and presented as edible art.
          </p>
        </div>

        {/* Signature Specials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {specials.slice(0, 6).map((dish) => (
            <div
              key={dish.id}
              className="group bg-[#131215] border border-[#2b2720] hover:border-[#d4af37]/60 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between gold-card-hover"
            >
              <div>
                {/* Photo container with badge */}
                <div className="relative h-64 overflow-hidden bg-stone-900">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131215] via-transparent to-black/30"></div>

                  {/* Golden Chef's Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-lg flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-black text-black" />
                    <span>Chef's Special</span>
                  </div>

                  {/* Pure Veg Badge */}
                  <div className="absolute top-3 right-3 bg-[#111013]/90 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-700/60 flex items-center space-x-1 shadow">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] text-emerald-200 font-semibold tracking-wider">Pure Veg</span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5">
                  <h3 className="font-serif-title text-xl text-[#f9f3e5] font-medium group-hover:text-white transition-colors leading-snug min-h-[3rem]">
                    {dish.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#a49d8e] leading-relaxed line-clamp-3">
                    {dish.description}
                  </p>

                  {/* Pairing Recommendation */}
                  {dish.pairing && (
                    <div className="mt-4 pt-3 border-t border-[#23201a] flex items-center text-[11px] text-[#cfc2a8]">
                      <Wine className="w-3.5 h-3.5 text-[#d4af37] mr-1.5 shrink-0" />
                      <span className="truncate">Pairing: {dish.pairing}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-[#23201a]">
                  <div>
                    <span className="text-[10px] text-[#8c8374] uppercase tracking-wider block">Price</span>
                    <span className="font-cinzel text-lg sm:text-xl font-bold text-[#f7e7b4]">
                      ₹{dish.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(dish)}
                    className="px-3.5 py-2 rounded-sm bg-[#1e1c18] hover:bg-[#d4af37] text-[#d4af37] hover:text-black border border-[#d4af37]/40 hover:border-[#d4af37] text-xs font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 flex items-center space-x-1.5 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
