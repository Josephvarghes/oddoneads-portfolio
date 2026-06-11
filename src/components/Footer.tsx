import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 border-t border-white/[0.05] pt-16 pb-8 text-charcoal-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Col */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-block flex flex-col mb-4">
            <span className="font-serif text-2xl font-bold tracking-[0.25em] text-white">
              FILMBY
            </span>
            <span className="font-sans text-[10px] tracking-[0.4em] text-gold-500 font-semibold uppercase -mt-1">
              ODD_ONE_ADS
            </span>
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
              <Link href="/" className="hover:text-gold-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-gold-500 transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/films" className="hover:text-gold-500 transition-colors">
                Films
              </Link>
            </li>
            <li>
              <Link href="/stories" className="hover:text-gold-500 transition-colors">
                Stories
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold-500 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold-500 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info Col */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.2em] font-semibold mb-6">
            Get In Touch
          </h4>
          <ul className="space-y-4 text-xs">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-gold-500 flex-shrink-0" />
              <a href="tel:+919497381830" className="hover:text-white transition-colors">
                +91 9497381830
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-gold-500 flex-shrink-0" />
              <a href="mailto:hello@oddoneads.com" className="hover:text-white transition-colors">
                hello@oddoneads.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
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
              className="p-2 border border-white/[0.08] hover:border-gold-500 hover:text-gold-500 rounded-none transition-colors flex items-center justify-center"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/[0.08] hover:border-gold-500 hover:text-gold-500 rounded-none transition-colors flex items-center justify-center"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-charcoal-500">
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
