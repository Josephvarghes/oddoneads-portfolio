"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, MapPin } from "lucide-react";
import { FILMS } from "@/data/mockData";

const CATEGORIES = ["all", "featured", "highlight", "destination"];

export default function Films() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const filteredFilms = activeCategory === "all"
    ? FILMS
    : FILMS.filter((film) => film.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
            Cinematography
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
            Wedding & Event Films
          </h1>
          <p className="text-xs md:text-sm text-charcoal-400 font-light max-w-lg mx-auto leading-relaxed">
            Dynamic, narrative-driven stories captured in motion. Experience the laughter, music, and emotional whispers crafted as pure cinema.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-16 border-b border-white/[0.04] pb-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 relative ${
                activeCategory === category ? "text-brand-teal" : "text-charcoal-400 hover:text-white"
              }`}
            >
              {category === "highlight" ? "Highlight Reels" : category.replace("-", " ")}
              {activeCategory === category && (
                <motion.span
                  layoutId="activeFilmFilterIndicator"
                  className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-brand-teal to-brand-pink"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFilms.map((film, idx) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setActiveVideoUrl(film.videoEmbedUrl)}
              className="group relative cursor-pointer overflow-hidden bg-charcoal-900 border border-white/[0.03] flex flex-col rounded-xl"
            >
              {/* Cover Image Frame */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={film.coverUrl}
                  alt={film.coupleName}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-[65%]"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-charcoal-950/75 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-gradient group-hover:text-charcoal-950 transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:border-transparent">
                    <Play size={20} className="fill-current ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-widest uppercase text-white font-semibold border border-white/10 rounded-md">
                  <Clock size={10} className="text-brand-pink" />
                  {film.duration}
                </div>
              </div>

              {/* Text Meta Info */}
              <div className="p-6 bg-charcoal-900 border-t border-white/[0.03] flex flex-col justify-between flex-grow rounded-b-xl">
                <div>
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-brand-teal font-semibold mb-1">
                    <MapPin size={10} /> {film.location}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-white mb-2 group-hover:text-brand-purple transition-colors">
                    {film.coupleName}
                  </h3>
                  <p className="font-serif italic text-xs text-charcoal-300">
                    &ldquo;{film.title}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            {/* Close trigger */}
            <div className="absolute top-6 right-6 flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold hidden md:inline">
                Click anywhere outside or press ESC to close
              </span>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="w-10 h-10 border border-white/10 hover:border-brand-pink text-white hover:text-brand-pink flex items-center justify-center transition-colors cursor-pointer rounded-none bg-charcoal-950"
                aria-label="Close Player"
              >
                <X size={20} />
              </button>
            </div>

            {/* Click-out blocker */}
            <div className="absolute inset-0 -z-10" onClick={() => setActiveVideoUrl(null)} />

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl aspect-[16/9] bg-black shadow-2xl relative border border-white/10"
            >
              <iframe
                src={activeVideoUrl}
                title="Cinematic Wedding Film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 absolute top-0 left-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
