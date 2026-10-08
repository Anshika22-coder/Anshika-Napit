/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { AboutUs } from './components/AboutUs';
import { ChefSpecials } from './components/ChefSpecials';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { Toast, ToastMessage } from './components/Toast';

import {
  RESTAURANT_INFO,
  MENU_ITEMS,
  GALLERY_ITEMS,
  REVIEWS,
} from './data/restaurantData';

import {
  MenuItem,
  CartItem,
  ReservationData,
  Review,
  RestaurantInfo,
} from './types/restaurant';

export default function App() {
  // 1. Restaurant Info State (with local persistence)
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(() => {
    try {
      const saved = localStorage.getItem('golden_fork_info_v2');
      return saved ? JSON.parse(saved) : RESTAURANT_INFO;
    } catch {
      return RESTAURANT_INFO;
    }
  });

  // 2. Menu Items State (100% Pure Veg authentic Indian menu)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('golden_fork_menu_prices_v2');
      if (saved) {
        const pricesMap: Record<string, number> = JSON.parse(saved);
        return MENU_ITEMS.map((item) =>
          pricesMap[item.id] !== undefined ? { ...item, price: pricesMap[item.id] } : item
        );
      }
    } catch {
      // Fallback to default
    }
    return MENU_ITEMS;
  });

  // 3. Cart State (filtered to ensure only pure veg items exist)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('golden_fork_cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        return parsed.filter((item) => item.dish && item.dish.isVegetarian);
      }
      return [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('golden_fork_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  // 4. Saved Reservations State (Demo storage requirement)
  const [savedReservations, setSavedReservations] = useState<ReservationData[]>(() => {
    try {
      const saved = localStorage.getItem('golden_fork_reservations');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    // Initial sample reservation matching user mockup
    return [
      {
        id: 'GF-842915',
        name: 'Anshika Napit',
        phone: '+91 98765 43210',
        email: 'anshikanapit701@gmail.com',
        date: '2026-10-15',
        time: '07:30 PM',
        guests: 2,
        seatingArea: 'candlelight-terrace',
        occasion: 'Anniversary Dinner',
        specialRequests: 'Candlelit quiet table with city view.',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Active reservation modal triggered after successful booking
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  // 5. Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('golden_fork_reviews');
      return saved ? JSON.parse(saved) : REVIEWS;
    } catch {
      return REVIEWS;
    }
  });

  // 6. Toasts State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (dish: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
    addToast('success', 'Added to Order Cart', `${dish.name} (₹${dish.price.toLocaleString('en-IN')})`);
  };

  const handleUpdateCartQuantity = (dishId: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.dish.id !== dishId);
      }
      return prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      );
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Reservation handler
  const handleReservationSuccess = (reservation: ReservationData) => {
    const updated = [reservation, ...savedReservations];
    setSavedReservations(updated);
    try {
      localStorage.setItem('golden_fork_reservations', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setConfirmedReservation(reservation);
    addToast(
      'success',
      'Table Confirmed!',
      `Booking ${reservation.id} for ${reservation.guests} guests confirmed.`
    );
  };

  const handleCancelReservation = (id: string) => {
    const updated = savedReservations.filter((r) => r.id !== id);
    setSavedReservations(updated);
    try {
      localStorage.setItem('golden_fork_reservations', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    addToast('info', 'Booking Cancelled', `Reservation #${id} has been removed.`);
  };

  // Menu price editing handler
  const handleUpdateDishPrice = (dishId: string, newPrice: number) => {
    const updatedMenu = menuItems.map((item) =>
      item.id === dishId ? { ...item, price: newPrice } : item
    );
    setMenuItems(updatedMenu);

    // Save prices map to localStorage
    try {
      const map: Record<string, number> = {};
      updatedMenu.forEach((m) => {
        map[m.id] = m.price;
      });
      localStorage.setItem('golden_fork_menu_prices', JSON.stringify(map));
    } catch {
      // Ignore
    }

    addToast('info', 'Price Updated', `Dish price adjusted to ₹${newPrice.toLocaleString('en-IN')}`);
  };

  // Info update handler
  const handleUpdateInfo = (newInfo: RestaurantInfo) => {
    setRestaurantInfo(newInfo);
    try {
      localStorage.setItem('golden_fork_info', JSON.stringify(newInfo));
    } catch {
      // Ignore
    }
    addToast('success', 'Information Saved', 'Restaurant contact and hours updated.');
  };

  // Review add handler
  const handleAddReview = (newReview: Review) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('golden_fork_reviews', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    addToast('success', 'Review Published', 'Thank you for your gracious dining feedback!');
  };

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4efe6] selection:bg-[#d4af37]/30 selection:text-[#f7e7b4]">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReservations}
      />

      <main>
        {/* 2. Hero Section */}
        <Hero
          onOpenReservation={scrollToReservations}
          onExploreMenu={scrollToMenu}
        />

        {/* 3. Restaurant Highlights (5 cards) */}
        <Highlights />

        {/* 4. About Us Section */}
        <AboutUs onOpenReservation={scrollToReservations} />

        {/* 6. Chef's Specials (Signature dishes) */}
        <ChefSpecials
          specials={menuItems.filter((i) => i.isChefSpecial)}
          onAddToCart={handleAddToCart}
        />

        {/* 5. Menu Section (Starters, Main, Veg, Desserts, Beverages) */}
        <MenuSection
          menuItems={menuItems}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onUpdateDishPrice={handleUpdateDishPrice}
        />

        {/* 7. Gallery with Lightbox */}
        <GallerySection items={GALLERY_ITEMS} />

        {/* 8. Table Reservations */}
        <ReservationSection
          onReservationSuccess={handleReservationSuccess}
          savedReservations={savedReservations}
          onCancelReservation={handleCancelReservation}
        />

        {/* 9. Customer Reviews */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* 10. Contact & Location */}
        <ContactSection
          info={restaurantInfo}
          onUpdateInfo={handleUpdateInfo}
        />
      </main>

      {/* 11. Footer */}
      <Footer
        info={restaurantInfo}
        onOpenReservation={scrollToReservations}
      />

      {/* Slide-over Cart & Ordering Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
      />

      {/* Luxury Booking Confirmation Screen (Matches user's uploaded mockup) */}
      <BookingConfirmationModal
        reservation={confirmedReservation}
        onClose={() => setConfirmedReservation(null)}
      />

      {/* Floating Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
