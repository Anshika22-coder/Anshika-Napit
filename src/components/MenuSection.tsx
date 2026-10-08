import React, { useState } from 'react';
import { Search, Plus, Minus, Check, Edit2, Flame, Sparkles } from 'lucide-react';
import { MenuItem, MenuCategory, CartItem } from '../types/restaurant';

interface MenuSectionProps {
  menuItems: MenuItem[];
  cartItems: CartItem[];
  onAddToCart: (dish: MenuItem) => void;
  onUpdateCartQuantity: (dishId: string, quantity: number) => void;
  onUpdateDishPrice: (dishId: string, newPrice: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onUpdateDishPrice,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'specials' | 'mild' | 'spicy'>('all');
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [editPriceInput, setEditPriceInput] = useState<string>('');

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'starters', label: 'Tandoor & Starters' },
    { id: 'main-course', label: 'Main Course & Dals' },
    { id: 'breads-rice', label: 'Breads & Biryani' },
    { id: 'desserts', label: 'Royal Desserts' },
    { id: 'beverages', label: 'Beverages & Lassi' },
  ];

  const filteredItems = menuItems.filter((dish) => {
    // Category match
    const matchesCategory =
      activeCategory === 'all' ? true : dish.category === activeCategory;

    // Search query match
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter match
    let matchesDietary = true;
    if (dietaryFilter === 'specials') matchesDietary = !!dish.isChefSpecial;
    if (dietaryFilter === 'mild') matchesDietary = (dish.spiceLevel || 0) <= 1;
    if (dietaryFilter === 'spicy') matchesDietary = (dish.spiceLevel || 0) >= 2;

    return matchesCategory && matchesSearch && matchesDietary;
  });

  const getCartQuantity = (dishId: string) => {
    const found = cartItems.find((item) => item.dish.id === dishId);
    return found ? found.quantity : 0;
  };

  const handleStartEditPrice = (dish: MenuItem) => {
    setEditingDishId(dish.id);
    setEditPriceInput(dish.price.toString());
  };

  const handleSavePrice = (dishId: string) => {
    const parsed = parseInt(editPriceInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateDishPrice(dishId, parsed);
    }
    setEditingDishId(null);
  };

  return (
    <section id="menu" className="py-24 bg-[#0d0d10] relative border-b border-[#24201a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            <span>The Gastronomic Repertoire</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#faf6ee] font-normal leading-tight">
            Our Curated Menu
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 mb-5"></div>
          <p className="text-sm sm:text-base text-[#bfb7a7] leading-relaxed">
            Freshly prepared dishes with prices in Indian Rupees (₹). Click “Add to Cart” or “Order Now” to taste culinary excellence.
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#141316] p-4 rounded-lg border border-[#2b2720]">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8f8574] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1b191d] border border-[#2e2a22] focus:border-[#d4af37] rounded-md pl-10 pr-4 py-2 text-sm text-[#f4efe6] placeholder-[#807666] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8f8574] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Buttons (Pure Veg & Specialty filters) */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                dietaryFilter === 'all'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'bg-[#1b191d] text-[#bfb7a7] hover:text-white border border-[#2e2a22]'
              }`}
            >
              All Delicacies
            </button>
            <button
              onClick={() => setDietaryFilter('specials')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center space-x-1.5 ${
                dietaryFilter === 'specials'
                  ? 'bg-[#e5c158] text-black font-semibold'
                  : 'bg-[#1b191d] text-[#bfb7a7] hover:text-white border border-[#2e2a22]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>Chef's Signatures</span>
            </button>
            <button
              onClick={() => setDietaryFilter('mild')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                dietaryFilter === 'mild'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-[#1b191d] text-[#bfb7a7] hover:text-white border border-[#2e2a22]'
              }`}
            >
              Mild & Fragrant
            </button>
            <button
              onClick={() => setDietaryFilter('spicy')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center space-x-1 ${
                dietaryFilter === 'spicy'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'bg-[#1b191d] text-[#bfb7a7] hover:text-white border border-[#2e2a22]'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Royal Spiced</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 border-b border-[#24201a] no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 uppercase tracking-wider ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b88a1a] text-black font-bold shadow-lg shadow-[#d4af37]/20'
                    : 'text-[#baa78d] hover:text-white hover:bg-[#1a1815] border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Items Count & Tip */}
        <div className="flex items-center justify-between text-xs text-[#8e8576] mb-6">
          <div>Showing {filteredItems.length} delicacies</div>
          <div className="text-[11px] text-[#baa78d] flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mr-1.5 inline-block"></span>
            Prices displayed in Indian Rupees (₹) &middot; Click pencil icon to edit price
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#131215] rounded-lg border border-[#2b2720] p-8">
            <p className="text-lg text-[#ded6c7] font-serif-title">No dishes found matching your selection.</p>
            <p className="text-xs text-[#8c8273] mt-2">Try clearing your search or switching categories.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => {
              const qtyInCart = getCartQuantity(dish.id);
              const isEditingThisPrice = editingDishId === dish.id;

              return (
                <div
                  key={dish.id}
                  className="group bg-[#141316] border border-[#2b2720] hover:border-[#d4af37]/50 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between gold-card-hover"
                >
                  <div>
                    {/* Top image thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-stone-900">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141316] via-transparent to-black/30"></div>

                      {/* 100% Pure Veg indicator */}
                      <div className="absolute top-3 left-3 bg-[#111013]/90 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-700/60 flex items-center space-x-1.5 shadow">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span className="text-[10px] text-emerald-200 uppercase font-semibold tracking-wider">
                          Pure Veg
                        </span>
                      </div>

                      {/* Chef Special Badge if applicable */}
                      {dish.isChefSpecial && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow">
                          Chef's Pick
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif-title text-lg text-[#f8f1e2] font-medium group-hover:text-white transition-colors leading-snug">
                          {dish.name}
                        </h3>

                        {/* Spice Level badge */}
                        {dish.spiceLevel !== undefined && dish.spiceLevel > 0 && (
                          <div
                            className="flex items-center text-amber-400 shrink-0 text-[10px] font-medium bg-[#1e1a14] px-2 py-0.5 rounded border border-amber-800/40"
                            title={`Spice level: ${dish.spiceLevel}/3`}
                          >
                            <Flame className="w-3 h-3 fill-amber-500 mr-1" />
                            <span>
                              {dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Spicy'}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-[#a39c8e] leading-relaxed line-clamp-2">
                        {dish.description}
                      </p>

                      {dish.allergens && dish.allergens.length > 0 && (
                        <div className="mt-3 text-[11px] text-[#7d7568]">
                          Contains: {dish.allergens.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Price & Order Actions */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-[#23201a] flex items-center justify-between">
                      {/* Price Section with inline editor option */}
                      <div className="flex items-center space-x-2">
                        {isEditingThisPrice ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-[#d4af37]">₹</span>
                            <input
                              type="number"
                              value={editPriceInput}
                              onChange={(e) => setEditPriceInput(e.target.value)}
                              className="w-20 px-2 py-1 bg-black border border-[#d4af37] text-white text-xs rounded focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSavePrice(dish.id)}
                              className="p-1 rounded bg-[#d4af37] text-black hover:brightness-110"
                              title="Save Price"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-baseline space-x-1.5 group/price">
                            <span className="font-cinzel text-lg font-bold text-[#f7e7b4]">
                              ₹{dish.price.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => handleStartEditPrice(dish)}
                              className="text-[#786f60] hover:text-[#d4af37] opacity-60 group-hover/price:opacity-100 transition-opacity p-0.5"
                              title="Edit price (restaurant manager demo)"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Add to Cart / Quantity controls */}
                      <div>
                        {qtyInCart > 0 ? (
                          <div className="flex items-center bg-[#1e1c18] border border-[#d4af37]/60 rounded p-1 space-x-2">
                            <button
                              onClick={() => onUpdateCartQuantity(dish.id, qtyInCart - 1)}
                              aria-label={`Decrease ${dish.name} quantity`}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white px-1">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() => onUpdateCartQuantity(dish.id, qtyInCart + 1)}
                              aria-label={`Increase ${dish.name} quantity`}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddToCart(dish)}
                            className="px-4 py-2 rounded-sm bg-[#1e1c18] hover:bg-[#d4af37] text-[#d4af37] hover:text-black border border-[#d4af37]/40 hover:border-[#d4af37] text-xs font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 flex items-center space-x-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
