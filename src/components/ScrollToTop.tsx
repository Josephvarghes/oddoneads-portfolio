"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if scrolled down past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Hide the Scroll to Top button completely on admin paths
  if (pathname?.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 left-6 z-50 font-sans">
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 15px rgba(192, 132, 252, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-12 h-12 glass-premium rounded-full flex items-center justify-center text-white hover:text-brand-teal transition-colors shadow-lg cursor-pointer border border-brand-purple/20 bg-charcoal-900/80 backdrop-blur-md"
            aria-label="Scroll to Top"
            title="Scroll to Top"
          >
            <ArrowUp size={20} className="stroke-[2.5]" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
