import React, { useState, useEffect } from 'react';
import { Utensils, ShoppingBag, Menu, X, Phone, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Specials', href: '#specials' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reservations', href: '#reservations' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#121114] border-b border-[#d4af37]/15 text-[#c7beaf] text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[#e5d8b8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mr-2 inline-block animate-pulse"></span>
              Open Today: 12:00 PM – 11:30 PM &middot; Fine Dining & Café
            </span>
            <span className="text-stone-500">|</span>
            <span className="text-[#a8a195]">Plot 42, Heritage Boulevard, Civil Lines</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="tel:+919876543210"
              className="flex items-center text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
            >
              <Phone className="w-3 h-3 mr-1.5" />
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0c]/95 backdrop-blur-md shadow-2xl shadow-black/80 border-b border-[#d4af37]/25 py-3'
            : 'bg-gradient-to-b from-[#0a0a0c]/90 via-[#0a0a0c]/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            className="flex items-center space-x-3.5 group focus:outline-none"
            aria-label="The Golden Fork Home"
          >
            <div className="relative w-11 h-11 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-gradient-to-br from-[#1e1c18] to-[#0d0c0a] shadow-lg shadow-[#d4af37]/10 group-hover:border-[#d4af37] transition-all">
              {/* Inner ring */}
              <div className="absolute inset-0.5 rounded-full border border-[#d4af37]/20"></div>
              {/* Golden Fork Icon */}
              <Utensils className="w-5 h-5 text-[#d4af37] transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel tracking-[0.22em] text-lg sm:text-xl font-bold uppercase text-[#f7ecd5] group-hover:text-[#ffffff] transition-colors">
                The Golden Fork
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold -mt-0.5 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 inline-block"></span>
                100% Pure Veg Fine Dining
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#d8cebe] hover:text-[#f3e5ab] transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="View Order Cart"
              className="relative p-2.5 rounded-full text-[#e8dfd2] hover:text-[#d4af37] hover:bg-[#1a1815] transition-colors border border-transparent hover:border-[#d4af37]/30"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#d4af37] to-[#b88a1a] text-black font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Book A Table Gold Button */}
            <button
              onClick={onOpenReservation}
              className="relative group overflow-hidden px-4 sm:px-6 py-2.5 rounded-sm bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b88a1a] text-stone-950 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 transition-all duration-300 active:scale-95 flex items-center space-x-2"
            >
              <CalendarCheck className="w-4 h-4 text-stone-950" />
              <span>Book a Table</span>
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-md text-[#d4af37] hover:bg-[#1f1b16] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-6">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#1a1714]">
                <Utensils className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg font-bold text-[#f7ecd5]">
                  The Golden Fork
                </span>
                <span className="text-[10px] tracking-widest text-[#d4af37]">
                  Fine Dining & Café
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#e5d8b8] hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 py-8 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif-title text-2xl text-[#ede4d4] hover:text-[#d4af37] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-[#d4af37]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b88a1a] text-black font-semibold text-center rounded tracking-wider uppercase shadow-lg shadow-[#d4af37]/20"
            >
              Book a Table Now
            </button>
            <div className="text-center text-xs text-[#a9a193]">
              Need direct assistance? Call{' '}
              <a href="tel:+919876543210" className="text-[#d4af37] underline">
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
