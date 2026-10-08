import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, PlusCircle, CheckCircle, Sparkles, X } from 'lucide-react';
import { Review } from '../types/restaurant';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [authorInput, setAuthorInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [occasionInput, setOccasionInput] = useState('Dinner with Friends');
  const [dishInput, setDishInput] = useState('');

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorInput.trim() || !commentInput.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      author: authorInput.trim(),
      rating: ratingInput,
      date: 'Just now',
      occasion: occasionInput,
      comment: commentInput.trim(),
      dishRecommended: dishInput.trim() || 'Chef Specials',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };

    onAddReview(newRev);
    setModalOpen(false);
    setAuthorInput('');
    setCommentInput('');
    setDishInput('');
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section id="reviews" className="py-24 bg-[#0a0a0c] relative border-b border-[#24201a]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guest Reflections</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#faf6ee] font-normal leading-tight">
            Customer Testimonials
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 mb-5"></div>
          <p className="text-sm sm:text-base text-[#bfb7a7] leading-relaxed">
            Read what esteemed guests cherish about their evenings with us. Clearly identified sample testimonials editable for real launch.
          </p>

          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-[#8f8574]">
            <span className="px-2.5 py-0.5 rounded bg-[#18171a] border border-[#2e2a22]">
              Sample Testimonials &middot; 4.9/5.0 Overall Rating
            </span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Main Testimonial Card */}
          <div className="bg-[#131216] border border-[#2e2a22] hover:border-[#d4af37]/40 rounded-xl p-8 sm:p-12 shadow-2xl relative transition-all duration-300">
            {/* Top quote icon & rating */}
            <div className="flex items-center justify-between mb-6">
              <Quote className="w-10 h-10 text-[#d4af37]/40" />

              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < currentReview.rating
                        ? 'text-[#d4af37] fill-[#d4af37]'
                        : 'text-stone-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial body */}
            <blockquote className="font-serif-title text-xl sm:text-2xl text-[#f9f3e5] leading-relaxed font-light italic mb-8">
              "{currentReview.comment}"
            </blockquote>

            {/* Diner Profile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-[#23201a] gap-4">
              <div className="flex items-center space-x-4">
                {currentReview.avatar ? (
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.author}
                    className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/40"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#1e1c18] border border-[#d4af37] flex items-center justify-center text-white font-bold">
                    {currentReview.author.charAt(0)}
                  </div>
                )}

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-[#faf4e6] text-base">
                      {currentReview.author}
                    </span>
                    {currentReview.verified && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-1.5 py-0.5 rounded flex items-center space-x-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>Verified Diner</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#8f8574] mt-0.5">
                    {currentReview.occasion} &middot; {currentReview.date}
                  </div>
                </div>
              </div>

              {currentReview.dishRecommended && (
                <div className="text-right sm:text-right">
                  <span className="text-[10px] text-[#736c5f] uppercase tracking-wider block">Recommended Dish</span>
                  <span className="text-xs text-[#d4af37] font-medium">{currentReview.dishRecommended}</span>
                </div>
              )}
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between">
            {/* Indicators */}
            <div className="flex items-center space-x-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    i === currentIndex ? 'w-8 bg-[#d4af37]' : 'w-2 bg-stone-700 hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>

            {/* Next / Prev Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={prevReview}
                aria-label="Previous Testimonial"
                className="p-2.5 rounded-full bg-[#17161b] hover:bg-[#d4af37] text-stone-300 hover:text-black border border-[#2b2720] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextReview}
                aria-label="Next Testimonial"
                className="p-2.5 rounded-full bg-[#17161b] hover:bg-[#d4af37] text-stone-300 hover:text-black border border-[#2b2720] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Leave a review button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors py-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Share Your Dining Review</span>
            </button>
          </div>

        </div>

      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="bg-[#141316] border border-[#d4af37]/40 rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-title text-2xl text-[#f6ebd4] mb-1">
              Add Your Dining Review
            </h3>
            <p className="text-xs text-[#8f8574] mb-6">
              Saved directly to your browser demo reviews list.
            </p>

            <form onSubmit={handleCreateReview} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#baa78d] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  placeholder="e.g. Anshika Napit"
                  className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded p-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#baa78d] mb-1">Star Rating</label>
                  <select
                    value={ratingInput}
                    onChange={(e) => setRatingInput(Number(e.target.value))}
                    className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded p-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#baa78d] mb-1">Occasion</label>
                  <input
                    type="text"
                    value={occasionInput}
                    onChange={(e) => setOccasionInput(e.target.value)}
                    placeholder="e.g. Birthday Dinner"
                    className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded p-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#baa78d] mb-1">Favorite Dish</label>
                <input
                  type="text"
                  value={dishInput}
                  onChange={(e) => setDishInput(e.target.value)}
                  placeholder="e.g. Charcoal-Seared Tenderloin"
                  className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded p-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#baa78d] mb-1">Review Comments</label>
                <textarea
                  rows={3}
                  required
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Tell us about the flavors, service, and ambiance..."
                  className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded p-2.5 text-sm text-white focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b88a1a] text-black font-semibold text-xs uppercase tracking-widest rounded shadow hover:brightness-110 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
