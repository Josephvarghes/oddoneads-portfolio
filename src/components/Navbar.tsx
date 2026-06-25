"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/films", label: "Films" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Toggle scroll lock on body when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-charcoal-950/85 backdrop-blur-md border-b border-brand-purple/15 py-4 shadow-lg shadow-black/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-11 md:h-11 overflow-hidden rounded-full border border-white/10 shadow-md transition-all duration-500 group-hover:scale-105 group-hover:border-brand-purple/40">
              <Image
                src="/logo.jpg"
                alt="Odd One Ads Logo"
                fill
                sizes="(max-width: 768px) 40px, 44px"
                className="object-cover scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm md:text-base font-bold tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-brand-purple">
                ODD_ONE_ADS
              </span>
              <span className="font-sans text-[8px] tracking-[0.3em] text-brand-teal -mt-1 font-semibold uppercase group-hover:text-brand-pink transition-colors duration-300">
                PHOTOGRAPHY & WEDDING FILM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-2 text-xs uppercase tracking-widest text-charcoal-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-brand-teal via-brand-purple to-brand-pink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <Link
              href="/booking"
              className="px-5 py-2 text-xs uppercase tracking-widest font-semibold border border-brand-teal/40 text-brand-teal hover:bg-brand-gradient hover:text-charcoal-950 transition-all duration-500 backdrop-blur-sm hover:border-transparent shadow-lg shadow-brand-teal/5 hover:shadow-brand-pink/20"
            >
              Book Your Date
            </Link>

            <Link
              href="/admin"
              className="p-2 text-charcoal-400 hover:text-brand-purple transition-colors duration-300 flex items-center justify-center"
              title="Staff Admin Portal"
            >
              <Lock size={14} />
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-brand-teal transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-charcoal-950 flex flex-col justify-center px-8 md:hidden overflow-hidden"
          >
            {/* Ambient Background Glow in mobile drawer */}
            <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-brand-pink/10 blur-[80px]" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-brand-teal/10 blur-[80px]" />

            <nav className="flex flex-col gap-6 text-center z-10 relative">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl font-serif tracking-widest ${
                      isActive ? "text-brand-purple" : "text-white hover:text-brand-teal"
                    } transition-colors py-2`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="mt-8 mx-auto px-8 py-3 text-xs uppercase tracking-widest font-semibold border border-brand-teal text-brand-teal hover:bg-brand-gradient hover:text-charcoal-950 transition-all duration-300 w-full max-w-[280px]"
              >
                Book Your Date
              </Link>

              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-charcoal-500 hover:text-brand-purple py-2 transition-colors font-sans"
              >
                <Lock size={12} />
                Staff Admin Portal
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
