"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Camera, PenTool, Award, Heart } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/mockData";

const BTS_PHOTOS = [
  "https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?q=80&w=600", // Photographer in action
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600", // Editor workspace
  "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=600"  // Camera gear setup
];

export default function About() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-charcoal-950 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* 1. BRAND STORY SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-28">
          {/* Text Story Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-semibold block mb-3">
                Our Origin
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-8">
                Odd_One_Ads Studio
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-sm text-charcoal-300 font-light leading-relaxed"
            >
              <p className="font-serif italic text-lg text-white/95 leading-relaxed">
                FILMBY ODD_ONE_ADS is a premium creative studio dedicated to capturing genuine emotions and unforgettable moments through timeless photography and cinematic storytelling.
              </p>
              <p>
                Founded on the belief that every love story deserves to be recorded as a work of fine art, we have spent a decade traveling the globe to unwrap the tales of couples who share a passion for luxury, authenticity, and visual storytelling.
              </p>
              <p>
                We eschew standard commercial setups in favor of natural light, deep cinematic palettes, and intimate storytelling. Our lenses don&apos;t just capture faces; they catch the quiet intakes of breath before vows, the fleeting touch of hands, and the laughter that rings out long after the music has stopped.
              </p>
            </motion.div>

            {/* Core Values Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/[0.04]">
              {[
                { icon: Camera, title: "Fine Art" },
                { icon: PenTool, title: "Editorial" },
                { icon: Award, title: "Premium Quality" },
                { icon: Heart, title: "Raw Emotion" }
              ].map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-gold-500/5 flex items-center justify-center text-gold-500 border border-gold-500/10 mb-3">
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-charcoal-300 font-semibold">
                      {val.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Portrait Collage Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative aspect-[4/5] bg-charcoal-900 border border-white/[0.04] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000"
              alt="Artistic wedding portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
          </motion.div>
        </section>

        {/* 2. TEAM SECTION */}
        <section className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-semibold block mb-3">
              The Creators
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
              Meet the Team
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/50 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card flex flex-col items-center text-center p-8 group border border-white/[0.03]"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-gold-500/20 group-hover:border-gold-500 transition-colors duration-300">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                
                <h3 className="font-serif text-xl font-medium text-white mb-1">
                  {member.name}
                </h3>
                
                <span className="text-[9px] uppercase tracking-[0.2em] text-gold-500 font-semibold mb-4">
                  {member.role}
                </span>

                <p className="text-xs text-charcoal-400 font-light leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. BEHIND THE SCENES */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-semibold block mb-3">
              Process & Gear
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
              Behind the Scenes
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/50 mx-auto mt-6" />
          </div>

          {/* BTS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BTS_PHOTOS.map((url, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden bg-charcoal-900 border border-white/[0.03] group"
              >
                <Image
                  src={url}
                  alt={`Behind the Scenes ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles size={12} className="text-gold-500" />
                  <span className="text-[9px] uppercase tracking-widest text-white font-semibold">
                    {idx === 0 ? "Production" : idx === 1 ? "Editing Suite" : "Rigging Setup"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
