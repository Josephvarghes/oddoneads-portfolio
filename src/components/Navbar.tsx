"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-charcoal-950/80 backdrop-blur-md border-b border-white/[0.06] py-4 shadow-lg shadow-black/10"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-lg md:text-xl font-bold tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-gold-500">
              FILMBY
            </span>
            <span className="font-sans text-[9px] tracking-[0.4em] text-gold-500/80 -mt-1 font-semibold uppercase group-hover:text-white transition-colors duration-300">
              ODD_ONE_ADS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-2 text-xs uppercase tracking-widest text-charcoal-200 hover:text-white transition-colors duration-300 font-medium"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <Link
              href="/contact"
              className="px-5 py-2 text-xs uppercase tracking-widest font-semibold border border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-charcoal-950 rounded-none transition-all duration-300 backdrop-blur-sm"
            >
              Book Your Date
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-gold-500 transition-colors p-2"
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
            className="fixed inset-0 z-40 bg-charcoal-950 flex flex-col justify-center px-8 md:hidden"
          >
            {/* Header backdrop alignment */}
            <div className="absolute top-6 left-6">
              <span className="font-serif text-lg font-bold tracking-[0.25em] text-white">
                FILMBY
              </span>
              <span className="block font-sans text-[9px] tracking-[0.4em] text-gold-500/80 -mt-1 font-semibold uppercase">
                ODD_ONE_ADS
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gold-500 p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl font-serif tracking-widest ${
                      isActive ? "text-gold-500" : "text-white hover:text-gold-400"
                    } transition-colors py-2`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-8 mx-auto px-8 py-3 text-xs uppercase tracking-widest font-semibold border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-charcoal-950 transition-all duration-300 w-full max-w-[280px]"
              >
                Book Your Date
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
