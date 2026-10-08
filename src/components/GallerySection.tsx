import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types/restaurant';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dishes' | 'interior' | 'kitchen' | 'moments'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: { id: 'all' | 'dishes' | 'interior' | 'kitchen' | 'moments'; label: string }[] = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'dishes', label: 'Signature Dishes' },
    { id: 'interior', label: 'Interiors & Ambience' },
    { id: 'kitchen', label: 'The Master Kitchen' },
    { id: 'moments', label: 'Dining Moments' },
  ];

  const filteredItems = items.filter((item) =>
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0c] relative border-b border-[#24201a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atmosphere & Culinary Art</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#faf6ee] font-normal leading-tight">
            Visual Gallery
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 mb-5"></div>
          <p className="text-sm sm:text-base text-[#bfb7a7] leading-relaxed">
            Immerse yourself in the craft, the candlelit spaces, and the culinary artistry that define The Golden Fork.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-md shadow-[#d4af37]/20 font-bold'
                    : 'bg-[#151417] text-[#baa78d] hover:text-white hover:bg-[#1f1d22] border border-[#2b2720]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-80 rounded-lg overflow-hidden cursor-pointer border border-[#2b2720] hover:border-[#d4af37]/60 shadow-lg transition-all duration-500 bg-stone-900"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />

              {/* Dark subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4 text-[#d4af37]" />
              </div>

              {/* Text Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif-title text-xl text-[#f9f3e5] font-medium leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#a8a090] mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-[#d4af37] text-white hover:text-black border border-stone-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous image button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-[#d4af37] text-white hover:text-black border border-stone-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next image button */}
          <button
            onClick={handleNext}
            aria-label="Next Image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-[#d4af37] text-white hover:text-black border border-stone-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox content card */}
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <div className="relative rounded-lg overflow-hidden border border-[#d4af37]/40 shadow-2xl max-h-[72vh] flex items-center justify-center bg-black">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="mt-4 text-center max-w-2xl px-4">
              <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest text-[#d4af37] mb-1">
                <span>{activeLightboxItem.category}</span>
                <span>&middot;</span>
                <span>{(lightboxIndex ?? 0) + 1} of {filteredItems.length}</span>
              </div>
              <h3 className="font-serif-title text-2xl text-white font-medium">
                {activeLightboxItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#bfb7a7] mt-1 font-light">
                {activeLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
