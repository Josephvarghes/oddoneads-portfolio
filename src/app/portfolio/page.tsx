"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, ZoomIn } from "lucide-react";
import { PORTFOLIO_ITEMS, PortfolioItem } from "@/data/mockData";

const CATEGORIES = ["all", "weddings", "pre-wedding", "destination", "corporate"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter logic
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(PORTFOLIO_ITEMS);
    } else {
      setFilteredItems(PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory));
    }
    setLightboxIndex(null); // Reset lightbox on filter
  }, [activeCategory]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev, handleClose]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-semibold block mb-3">
            Portfolio
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
            Captured Stories
          </h1>
          <p className="text-xs md:text-sm text-charcoal-400 font-light max-w-lg mx-auto leading-relaxed">
            A visual anthology of intimacy, cultural rich traditions, and global celebrations preserved for generations to come.
          </p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-16 border-b border-white/[0.04] pb-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 relative ${
                activeCategory === category ? "text-gold-500" : "text-charcoal-400 hover:text-white"
              }`}
            >
              {category.replace("-", " ")}
              {activeCategory === category && (
                <motion.span
                  layoutId="activeFilterIndicator"
                  className="absolute bottom-0 left-4 right-4 h-[1px] bg-gold-500"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative overflow-hidden bg-charcoal-900 cursor-pointer border border-white/[0.03] aspect-[3/4]"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-[70%]"
                />
                
                {/* Visual hover reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-gold-500 font-semibold mb-1">
                    <MapPin size={10} /> {item.location}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-white mb-0.5">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-charcoal-400 capitalize">
                    {item.category.replace("-", " ")}
                  </span>
                </div>

                {/* Floating zoom indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={14} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 5. LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-950/98 backdrop-blur-md flex flex-col justify-between p-6"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10">
              <div>
                <h3 className="font-serif text-lg text-white">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-[10px] text-gold-500 uppercase tracking-widest flex items-center gap-1">
                  <MapPin size={10} /> {filteredItems[lightboxIndex].location}
                </p>
              </div>
              
              <button
                onClick={handleClose}
                className="w-10 h-10 border border-white/10 hover:border-gold-500 text-white hover:text-gold-500 flex items-center justify-center transition-colors cursor-pointer rounded-none"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Image Viewport */}
            <div className="relative flex-grow flex items-center justify-center my-6 z-0 max-w-6xl mx-auto w-full h-[60vh]">
              {/* Navigation Left */}
              <button
                onClick={handlePrev}
                className="absolute left-0 z-10 w-12 h-12 border border-white/10 hover:border-gold-500 text-white hover:text-gold-500 flex items-center justify-center transition-colors cursor-pointer bg-charcoal-950/50 backdrop-blur-sm"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Image Frame */}
              <div className="relative w-full h-full max-h-[75vh] flex justify-center items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={filteredItems[lightboxIndex].imageUrl}
                      alt={filteredItems[lightboxIndex].title}
                      fill
                      sizes="90vw"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Right */}
              <button
                onClick={handleNext}
                className="absolute right-0 z-10 w-12 h-12 border border-white/10 hover:border-gold-500 text-white hover:text-gold-500 flex items-center justify-center transition-colors cursor-pointer bg-charcoal-950/50 backdrop-blur-sm"
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Counter */}
            <div className="text-center text-xs uppercase tracking-widest text-charcoal-400 z-10">
              {lightboxIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
