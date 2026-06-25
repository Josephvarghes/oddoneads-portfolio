"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 border-t border-brand-purple/10 pt-16 pb-8 text-charcoal-400 relative overflow-hidden">
      {/* Ambient background blur in footer */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-brand-pink/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* Brand Col */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-white/10 shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:border-brand-purple/40">
              <Image
                src="/logo.jpg"
                alt="Odd One Ads Logo"
                fill
                sizes="48px"
                className="object-cover scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-brand-purple">
                ODD_ONE_ADS
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] text-brand-teal -mt-1 font-semibold uppercase group-hover:text-brand-pink transition-colors duration-300">
                PHOTOGRAPHY & WEDDING FILM
              </span>
            </div>
          </Link>
          <p className="font-serif italic text-white/70 max-w-sm mb-6 leading-relaxed">
            &ldquo;Unwrap the tale of your perfect day.&rdquo;
          </p>
          <p className="text-xs text-charcoal-400 max-w-sm leading-relaxed">
            Capturing premium, storytelling-focused wedding photography and cinema. Serving couples locally and at destination celebrations worldwide.
          </p>
        </div>

        {/* Quick Links Col */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.2em] font-semibold mb-6">
            Explore
          </h4>
          <ul className="space-y-3 text-xs uppercase tracking-widest">
            <li>
              <Link href="/" className="hover:text-brand-teal transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-brand-teal transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/films" className="hover:text-brand-teal transition-colors">
                Films
              </Link>
            </li>
            <li>
              <Link href="/stories" className="hover:text-brand-teal transition-colors">
                Stories
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-teal transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-brand-teal transition-colors">
                Booking
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-teal transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-brand-purple transition-colors text-[10px] text-charcoal-500 font-medium">
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info Col */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.2em] font-semibold mb-6">
            Get In Touch
          </h4>
          <ul className="space-y-4 text-xs font-light">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-brand-teal flex-shrink-0" />
              <a href="tel:+919497381830" className="hover:text-white transition-colors text-charcoal-300">
                +91 9497381830
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-brand-teal flex-shrink-0" />
              <a href="mailto:hello@oddoneads.com" className="hover:text-white transition-colors text-charcoal-300">
                hello@oddoneads.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-brand-teal mt-0.5 flex-shrink-0" />
              <div className="leading-relaxed">
                <p className="text-white font-medium mb-1">Service Regions</p>
                <p className="text-charcoal-400">India &bull; United Kingdom &bull; Dubai</p>
              </div>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/[0.08] hover:border-brand-pink hover:text-brand-pink rounded-none transition-colors flex items-center justify-center"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/[0.08] hover:border-brand-teal hover:text-brand-teal rounded-none transition-colors flex items-center justify-center"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-charcoal-500 relative z-10">
        <p>&copy; {currentYear} FILMBY ODD_ONE_ADS. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
