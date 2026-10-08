import React, { useState } from 'react';
import { Utensils, Instagram, Facebook, Twitter, Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { RestaurantInfo } from '../types/restaurant';

interface FooterProps {
  info: RestaurantInfo;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ info, onOpenReservation }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Our Story', href: '#about' },
    { label: 'Restaurant Highlights', href: '#highlights' },
    { label: 'Chef Specials', href: '#specials' },
    { label: 'Full Menu', href: '#menu' },
    { label: 'Visual Gallery', href: '#gallery' },
    { label: 'Table Reservations', href: '#reservations' },
    { label: 'Guest Reviews', href: '#reviews' },
    { label: 'Contact & Location', href: '#contact' },
  ];

  return (
    <footer className="bg-[#070709] border-t border-[#24201a] text-[#c9bfae] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1f1d19]">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#151310] shadow-md shadow-[#d4af37]/15">
                <Utensils className="w-5 h-5 text-[#d4af37] -rotate-12" />
              </div>
              <div>
                <span className="font-cinzel text-lg tracking-[0.2em] font-bold text-[#faf3e3] block">
                  The Golden Fork
                </span>
                <span className="text-[10px] tracking-[0.35em] text-[#d4af37] uppercase font-medium">
                  Restaurant & Café
                </span>
              </div>
            </div>

            <p className="text-xs text-[#a39a89] leading-relaxed max-w-sm">
              An epicurean sanctuary celebrating exquisite gastronomy, imperial heritage, and candlelit ambiance. Where culinary craftsmanship becomes unforgettable memory.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={info.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#151417] border border-[#2b2720] hover:border-[#d4af37] hover:bg-[#d4af37] text-stone-300 hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={info.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#151417] border border-[#2b2720] hover:border-[#d4af37] hover:bg-[#d4af37] text-stone-300 hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={info.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-[#151417] border border-[#2b2720] hover:border-[#d4af37] hover:bg-[#d4af37] text-stone-300 hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Navigation Links (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#f5ebd5] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#9e9484] hover:text-[#d4af37] transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-[#d4af37] text-[10px]">&rsaquo;</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Reservation CTA (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#f5ebd5] font-semibold">
              Hours
            </h4>
            <div className="space-y-2 text-xs text-[#a39a89]">
              <div>
                <span className="text-white block font-medium">Mon – Thu</span>
                <span>12:00 PM – 11:30 PM</span>
              </div>
              <div>
                <span className="text-white block font-medium">Fri – Sun</span>
                <span>12:00 PM – 12:30 AM</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="px-3.5 py-1.5 rounded-sm bg-[#1e1c18] border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black text-[11px] font-semibold uppercase tracking-wider transition-all"
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#f5ebd5] font-semibold">
              Private Tastings & News
            </h4>
            <p className="text-xs text-[#8f8574] leading-relaxed">
              Subscribe to receive invitations to private sommelier tastings, seasonal seasonal chef menus, and culinary events.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-[#171512] border border-[#d4af37]/40 rounded p-3 text-xs text-[#d4af37] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are subscribed to royal updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#141317] border border-[#2e2a22] focus:border-[#d4af37] rounded pl-3 pr-10 py-2 text-xs text-white placeholder-stone-600 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#d4af37] text-black hover:brightness-110 rounded text-xs flex items-center justify-center transition-all"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}

            <div className="pt-2 space-y-1 text-xs text-[#8f8574]">
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3 text-[#d4af37]" />
                <a href={`tel:${info.phone}`} className="hover:text-white">{info.phone}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3 text-[#d4af37]" />
                <a href={`mailto:${info.email}`} className="hover:text-white">{info.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#70685b] gap-4 text-center md:text-left">
          <div>
            &copy; {new Date().getFullYear()} The Golden Fork – Restaurant & Café. All rights reserved.
          </div>
          <div className="text-[11px] text-[#696155] max-w-xl">
            Sample restaurant demonstration. Address, phone, and testimonials can be replaced with real information prior to public deployment.
          </div>
        </div>

      </div>
    </footer>
  );
};
