"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Calendar, DollarSign, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "wedding-photography",
    eventDate: "",
    eventLocation: "",
    budgetRange: "luxury-destination",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      // Reset form
      setFormState({
        fullName: "",
        email: "",
        phone: "",
        eventType: "wedding-photography",
        eventDate: "",
        eventLocation: "",
        budgetRange: "luxury-destination",
        message: "",
      });
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // WhatsApp click handler
  const waUrl = "https://wa.me/919497381830?text=Hi%20Odd%20One%20Ads,%20I'd%20like%20to%20check%20availability%20for%20my%20upcoming%20celebration.";

  return (
    <div className="pt-32 pb-24 min-h-screen bg-charcoal-950 text-white font-sans relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-brand-pink/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-brand-teal/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
            Let&apos;s Tell Your Story
          </h1>
          <p className="text-xs md:text-sm text-charcoal-400 font-light max-w-lg mx-auto leading-relaxed">
            Have a question, custom request, or want to explore working together? Reach out using the form below or connect via our direct hotlines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: CONTACT CARDS & DETAILS */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brand-teal font-semibold mb-2 block">
                Direct Inquiries
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Connect With Us
              </h2>
              <p className="text-xs text-charcoal-400 leading-relaxed font-light mb-8">
                For urgent calendar inquiries, custom collaboration requests, or just to say hello, feel free to call or WhatsApp us directly. We serve clients across India, UK, and Dubai.
              </p>
            </div>

            {/* Direct Connect Elements */}
            <div className="space-y-4 text-xs font-light">
              {/* Phone Prominent */}
              <div className="bg-charcoal-900/40 border border-white/[0.04] p-6 flex items-start gap-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-brand-purple/5 border border-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-white font-medium text-sm mb-1">Direct Hotline</h4>
                  <a href="tel:+919497381830" className="text-brand-purple hover:text-brand-pink transition-colors text-base font-semibold block mt-1 tracking-wider">
                    +91 9497381830
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA Prominent */}
              <div className="bg-charcoal-900/40 border border-white/[0.04] p-6 flex items-start gap-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-green-500/5 border border-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0">
                  <MessageSquare size={16} className="fill-current" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-serif text-white font-medium text-sm mb-1">WhatsApp Chat</h4>
                  <p className="text-[11px] text-charcoal-400 mb-4">Chat instantly with our coordinator.</p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-charcoal-950 font-semibold uppercase tracking-widest text-[9px] transition-all duration-300 rounded-none w-full justify-center"
                  >
                    Start Chat
                  </a>
                </div>
              </div>

              {/* Locations Grid */}
              <div className="bg-charcoal-900/40 border border-white/[0.04] p-6 flex items-start gap-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-brand-teal/5 border border-brand-teal/10 flex items-center justify-center text-brand-teal flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-white font-medium text-sm mb-1">Global Regions</h4>
                  <p className="text-charcoal-400 leading-relaxed mt-1">
                    India &bull; Mumbai &amp; Kerala <br />
                    United Kingdom &bull; London <br />
                    UAE &bull; Dubai Marina
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7 bg-charcoal-900/40 border border-white/[0.04] p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
            
            {/* Header / Sub */}
            <div className="mb-8">
              <span className="text-[9px] uppercase tracking-widest text-brand-purple font-semibold mb-1 block">
                Inquiry Form
              </span>
              <h3 className="font-serif text-2xl font-semibold">
                Send A Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formState.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-none px-4 py-3 text-xs text-white placeholder-charcoal-600 focus:outline-none transition-all font-light"
                  placeholder="e.g. Sarah Connor"
                />
              </div>

              {/* Email & Phone Rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-none px-4 py-3 text-xs text-white placeholder-charcoal-600 focus:outline-none transition-all font-light"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-none px-4 py-3 text-xs text-white placeholder-charcoal-600 focus:outline-none transition-all font-light"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Event Type & Date Rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventType" className="block text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formState.eventType}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal-900 border border-white/[0.08] focus:border-brand-purple/50 rounded-none px-4 py-3 text-xs text-white focus:outline-none transition-all cursor-pointer font-light"
                  >
                    <option value="wedding-photography">Wedding Photography</option>
                    <option value="wedding-films">Wedding Films</option>
                    <option value="destination-weddings">Destination Wedding Package</option>
                    <option value="pre-wedding">Pre-Wedding Shoots</option>
                    <option value="corporate-events">Corporate Event Coverage</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2 flex items-center gap-1.5">
                    <Calendar size={12} className="text-brand-teal" /> Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    value={formState.eventDate}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-none px-4 py-3 text-xs text-white focus:outline-none transition-all font-light cursor-pointer"
                  />
                </div>
              </div>

              {/* Event Location & Budget Rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventLocation" className="block text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2 flex items-center gap-1.5">
                    <MapPin size={12} className="text-brand-teal" /> Event Location
                  </label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    required
                    value={formState.eventLocation}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-none px-4 py-3 text-xs text-white placeholder-charcoal-600 focus:outline-none transition-all font-light"
                    placeholder="e.g. Udaipur, India"
                  />
                </div>
                <div>
                  <label htmlFor="budgetRange" className="block text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2 flex items-center gap-1.5">
                    <DollarSign size={12} className="text-brand-teal" /> Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formState.budgetRange}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal-900 border border-white/[0.08] focus:border-brand-purple/50 rounded-none px-4 py-3 text-xs text-white focus:outline-none transition-all cursor-pointer font-light"
                  >
                    <option value="premium">Premium (₹3L - ₹5L / $4k - $6k)</option>
                    <option value="luxury-destination">Luxury Destination (₹5L - ₹10L / $6k - $12k)</option>
                    <option value="elite-bespoke">Elite Custom (₹10L+ / $12k+)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2">
                  Tell Us About Your Vision
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={handleInputChange}
                  className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-none px-4 py-3 text-xs text-white placeholder-charcoal-600 focus:outline-none transition-all font-light resize-none leading-relaxed"
                  placeholder="Tell us about the timeline, culture, vibe and highlights..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-gradient hover:opacity-90 text-charcoal-950 font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-brand-purple/10 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    Send Consultation Request <Send size={12} />
                  </>
                )}
              </button>
            </form>

            {/* Success Overlay Modal */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-charcoal-900/98 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 10 }}
                    className="flex flex-col items-center max-w-sm"
                  >
                    <div className="w-16 h-16 bg-brand-teal/10 border border-brand-teal/30 rounded-full flex items-center justify-center text-brand-teal mb-6 animate-pulse">
                      <CheckCircle2 size={32} />
                    </div>
                    
                    <span className="text-[10px] tracking-[0.4em] text-brand-teal uppercase font-semibold block mb-2">
                      Request Confirmed
                    </span>
                    
                    <h4 className="font-serif text-2xl font-bold mb-4">
                      Your Story is in Safe Hands
                    </h4>
                    
                    <p className="text-xs text-charcoal-400 leading-relaxed font-light mb-8">
                      Thank you for sharing your vision with us. Our coordinator will review your inquiry and contact you via email or phone within 24 hours to schedule a consultation.
                    </p>

                    <button
                      onClick={() => setShowSuccess(false)}
                      className="px-8 py-3 border border-white/10 hover:border-brand-teal text-white hover:text-brand-teal text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer rounded-none"
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
