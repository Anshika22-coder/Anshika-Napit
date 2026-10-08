import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Edit3, Save, Sparkles, Navigation } from 'lucide-react';
import { RestaurantInfo } from '../types/restaurant';

interface ContactSectionProps {
  info: RestaurantInfo;
  onUpdateInfo: (newInfo: RestaurantInfo) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ info, onUpdateInfo }) => {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editableInfo, setEditableInfo] = useState<RestaurantInfo>(info);

  // Contact Inquiry Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Private Dining Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateInfo(editableInfo);
    setIsEditingInfo(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 700);
  };

  return (
    <section id="contact" className="py-24 bg-[#0d0d10] relative border-b border-[#24201a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect & Visit Us</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#faf6ee] font-normal leading-tight">
            Location & Contact
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 mb-5"></div>
          <p className="text-sm sm:text-base text-[#bfb7a7] leading-relaxed">
            Conveniently nestled in the royal heart of the city. All contact information is editable for restaurant launch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Editable Settings */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center justify-between pb-2 border-b border-[#26231c]">
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                Direct Contact Details
              </span>
              <button
                onClick={() => setIsEditingInfo(!isEditingInfo)}
                className="text-xs text-[#a99e8c] hover:text-[#d4af37] flex items-center space-x-1.5 transition-colors p-1"
                title="Toggle editable contact info for business owner"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingInfo ? 'Cancel Editing' : 'Edit Information'}</span>
              </button>
            </div>

            {isEditingInfo ? (
              <form onSubmit={handleSaveInfo} className="bg-[#141316] border border-[#d4af37]/40 rounded-xl p-5 space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#bfb6a4] mb-1">Street Address</label>
                  <input
                    type="text"
                    value={editableInfo.address}
                    onChange={(e) => setEditableInfo({ ...editableInfo, address: e.target.value })}
                    className="w-full bg-[#1b191e] border border-[#2e2a22] rounded p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#bfb6a4] mb-1">City & Postal</label>
                  <input
                    type="text"
                    value={editableInfo.city}
                    onChange={(e) => setEditableInfo({ ...editableInfo, city: e.target.value })}
                    className="w-full bg-[#1b191e] border border-[#2e2a22] rounded p-2 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#bfb6a4] mb-1">Phone</label>
                    <input
                      type="text"
                      value={editableInfo.phone}
                      onChange={(e) => setEditableInfo({ ...editableInfo, phone: e.target.value })}
                      className="w-full bg-[#1b191e] border border-[#2e2a22] rounded p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#bfb6a4] mb-1">Email</label>
                    <input
                      type="email"
                      value={editableInfo.email}
                      onChange={(e) => setEditableInfo({ ...editableInfo, email: e.target.value })}
                      className="w-full bg-[#1b191e] border border-[#2e2a22] rounded p-2 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#bfb6a4] mb-1">Weekday Hours</label>
                  <input
                    type="text"
                    value={editableInfo.openingHours.weekdays}
                    onChange={(e) => setEditableInfo({
                      ...editableInfo,
                      openingHours: { ...editableInfo.openingHours, weekdays: e.target.value },
                    })}
                    className="w-full bg-[#1b191e] border border-[#2e2a22] rounded p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#bfb6a4] mb-1">Weekend Hours</label>
                  <input
                    type="text"
                    value={editableInfo.openingHours.weekends}
                    onChange={(e) => setEditableInfo({
                      ...editableInfo,
                      openingHours: { ...editableInfo.openingHours, weekends: e.target.value },
                    })}
                    className="w-full bg-[#1b191e] border border-[#2e2a22] rounded p-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#d4af37] text-black font-semibold text-xs uppercase rounded flex items-center justify-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Updated Information</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Address Card */}
                <div className="bg-[#141316] border border-[#2b2720] rounded-xl p-5 flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#1e1c18] border border-[#d4af37]/30 text-[#d4af37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#8e8576] font-medium">Location Address</h4>
                    <p className="text-sm font-medium text-[#f6ebd4] mt-1">{info.address}</p>
                    <p className="text-xs text-[#a39a89]">{info.city}</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-[#d4af37] hover:underline mt-2 space-x-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Get GPS Driving Directions</span>
                    </a>
                  </div>
                </div>

                {/* Contact Numbers & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#141316] border border-[#2b2720] rounded-xl p-4 flex items-start space-x-3">
                    <div className="p-2.5 rounded-full bg-[#1e1c18] border border-[#d4af37]/30 text-[#d4af37] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider text-[#8e8576]">Direct Telephone</h4>
                      <a href={`tel:${info.phone}`} className="text-xs font-semibold text-[#f8f2e4] hover:text-[#d4af37] mt-1 block">
                        {info.phone}
                      </a>
                    </div>
                  </div>

                  <div className="bg-[#141316] border border-[#2b2720] rounded-xl p-4 flex items-start space-x-3">
                    <div className="p-2.5 rounded-full bg-[#1e1c18] border border-[#d4af37]/30 text-[#d4af37] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] uppercase tracking-wider text-[#8e8576]">Email Concierge</h4>
                      <a href={`mailto:${info.email}`} className="text-xs font-semibold text-[#f8f2e4] hover:text-[#d4af37] mt-1 block truncate">
                        {info.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-[#141316] border border-[#2b2720] rounded-xl p-5 flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#1e1c18] border border-[#d4af37]/30 text-[#d4af37] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs uppercase tracking-wider text-[#8e8576] font-medium">Opening Hours</h4>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between text-[#e4dbcc]">
                        <span>Monday – Thursday:</span>
                        <span className="font-semibold text-white">12:00 PM – 11:30 PM</span>
                      </div>
                      <div className="flex justify-between text-[#e4dbcc]">
                        <span>Friday – Sunday:</span>
                        <span className="font-semibold text-white">12:00 PM – 12:30 AM</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-[#8a8070] italic">
                      {info.openingHours.kitchenCloses}
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* Interactive Map Preview Card */}
            <div className="relative rounded-xl overflow-hidden border border-[#2b2720] bg-[#141316] shadow-lg h-60">
              <iframe
                title="The Golden Fork Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113886.60228389659!2d75.72750875459384!3d26.91243364952671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sCivil%20Lines%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert contrast-125 opacity-75"
                loading="lazy"
              ></iframe>
              <div className="absolute bottom-3 left-3 bg-[#0d0c0f]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#d4af37]/30 text-[11px] text-[#f4ecd8] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Civil Lines &middot; Valet Parking Available</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#141316] border border-[#2b2720] hover:border-[#d4af37]/40 rounded-xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
            <h3 className="font-serif-title text-2xl sm:text-3xl text-[#f6ebd4] mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#9e9484] mb-8 font-light">
              Have questions regarding private dining, bespoke catering, or culinary masterclasses? Leave us a note.
            </p>

            {isSent ? (
              <div className="bg-[#1b1a1f] border border-[#d4af37]/50 rounded-lg p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#201d17] border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif-title text-2xl text-white">Inquiry Received</h4>
                <p className="text-xs text-[#b8af9f] max-w-md mx-auto">
                  Thank you for reaching out to The Golden Fork concierge. Our hospitality manager will contact you within 2 business hours.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-4 px-6 py-2 bg-[#d4af37] text-black font-semibold text-xs uppercase rounded tracking-wider hover:brightness-110"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] mb-1.5">
                      Your Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Anshika Napit"
                      className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded-md px-3.5 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] mb-1.5">
                      Email Address <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. anshika@example.com"
                      className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded-md px-3.5 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded-md px-3.5 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded-md px-3.5 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors"
                    >
                      <option value="Private Dining Inquiry">Private Dining Inquiry</option>
                      <option value="Event / Banquet Booking">Event / Banquet Booking</option>
                      <option value="Chef Tasting Experience">Chef Tasting Experience</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#bfb6a4] mb-1.5">
                    Your Message <span className="text-[#d4af37]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us about your event, preferred dates, or specific dietary requests..."
                    className="w-full bg-[#1b191e] border border-[#2e2a22] focus:border-[#d4af37] rounded-md px-3.5 py-2.5 text-sm text-[#f6ebd4] focus:outline-none transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-gradient-to-r from-[#d4af37] to-[#b88a1a] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#d4af37]/20 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
