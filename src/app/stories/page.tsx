"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { STORIES, StoryItem } from "@/data/mockData";

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-charcoal-950 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!selectedStory ? (
            /* STORIES INDEX (MAGAZINE SPREAD) */
            <motion.div
              key="index"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Page Header */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
                  Journal
                </span>
                <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
                  Love Stories
                </h1>
                <p className="text-xs md:text-sm text-charcoal-400 font-light max-w-lg mx-auto leading-relaxed">
                  An editorial compilation of destination celebrations, detailing the emotions, settings, and silent threads that tie two souls together.
                </p>
              </div>

              {/* Stories Editorial Grid */}
              <div className="space-y-24">
                {STORIES.map((story, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                        isEven ? "" : "lg:flex-row-reverse"
                      }`}
                    >
                      {/* Image Block */}
                      <div className="w-full lg:w-1/2 aspect-[3/2] relative overflow-hidden bg-charcoal-900 group cursor-pointer border border-white/[0.04] rounded-xl" onClick={() => setSelectedStory(story)}>
                        <Image
                          src={story.coverUrl}
                          alt={story.coupleName}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                      </div>

                      {/* Text Block */}
                      <div className="w-full lg:w-1/2 flex flex-col items-start">
                        <span className="text-[10px] tracking-widest text-brand-pink uppercase font-semibold mb-3 flex items-center gap-1.5">
                          <Sparkles size={10} /> Case Study {idx + 1}
                        </span>
                        
                        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-white mb-4 leading-tight hover:text-brand-purple transition-colors cursor-pointer" onClick={() => setSelectedStory(story)}>
                          {story.title}
                        </h2>

                        <p className="text-xs text-charcoal-400 tracking-wider uppercase mb-6 flex items-center gap-1">
                          <MapPin size={10} className="text-brand-teal" /> {story.coupleName} &bull; {story.storyDescription.split(",").slice(-1)[0]}
                        </p>

                        <p className="text-sm text-charcoal-300 font-light leading-relaxed mb-8 max-w-lg">
                          {story.storyDescription}
                        </p>

                        <button
                          onClick={() => setSelectedStory(story)}
                          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-brand-teal hover:text-brand-pink transition-colors duration-300 font-semibold cursor-pointer"
                        >
                          Read Editorial Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* MAGAZINE ARTICLE VIEW */
            <motion.div
              key="article"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedStory(null)}
                className="group flex items-center gap-2 text-xs uppercase tracking-widest text-brand-teal hover:text-brand-pink transition-colors mb-12 cursor-pointer font-semibold"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
              </button>

              {/* Editorial Header */}
              <div className="text-center mb-12">
                <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
                  STORIES FROM ODD_ONE_ADS
                </span>
                <h1 className="font-serif text-3xl md:text-6xl font-bold tracking-wide text-white leading-tight max-w-3xl mx-auto mb-6">
                  {selectedStory.title}
                </h1>
                <div className="w-12 h-[1px] bg-brand-purple/55 mx-auto mb-6" />
                <p className="font-serif italic text-lg text-charcoal-300 max-w-xl mx-auto">
                  &ldquo;{selectedStory.heroText}&rdquo;
                </p>
              </div>

              {/* Big Featured Image */}
              <div className="relative aspect-[16/9] w-full mb-16 overflow-hidden border border-white/[0.04] rounded-2xl">
                <Image
                  src={selectedStory.coverUrl}
                  alt={selectedStory.coupleName}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Editorial Body (Multi-column) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 text-charcoal-200 text-sm leading-relaxed font-light font-sans">
                {selectedStory.narrative.map((para, i) => (
                  <p key={i} className={i === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-brand-pink first-letter:font-bold" : ""}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Magazine Photo Grid Spread */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                {selectedStory.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className={`relative aspect-[3/4] overflow-hidden bg-charcoal-900 border border-white/[0.03] rounded-xl ${
                      idx === 1 ? "sm:-translate-y-4" : ""
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Spread item ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Film Embed Heading */}
              <div className="text-center mb-8">
                <span className="text-[10px] tracking-widest text-brand-teal uppercase font-semibold block mb-2">
                  The Film
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Watch the Cinema Release
                </h3>
              </div>

              {/* Centered Video Embed */}
              <div className="relative aspect-[16/9] w-full bg-black mb-20 border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
                <iframe
                  src={selectedStory.filmEmbedUrl}
                  title={`${selectedStory.coupleName} Film`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 absolute top-0 left-0"
                />
              </div>

              {/* Footer Back Button */}
              <div className="text-center border-t border-white/[0.05] pt-12">
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group px-8 py-3 border border-brand-teal text-brand-teal hover:bg-brand-gradient hover:text-charcoal-950 hover:border-transparent transition-all font-semibold uppercase tracking-widest text-xs cursor-pointer rounded-none"
                >
                  Return to Journal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
