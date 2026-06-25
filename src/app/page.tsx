"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, Heart, Compass, Briefcase, ArrowRight, ChevronLeft, ChevronRight, Star, Sparkles, ChevronDown } from "lucide-react";
import { SERVICES, PORTFOLIO_ITEMS, TESTIMONIALS } from "@/data/mockData";

// Dynamic icon resolver
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Camera: Camera,
  Film: Film,
  Heart: Heart,
  Compass: Compass,
  Briefcase: Briefcase,
};

// Interactive Vibes data
interface Vibe {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: "pre-wedding" | "destination" | "weddings" | "corporate";
  colorClass: string;
  glowColor: string;
  gradient: string;
  keywords: string[];
}

const VIBES: Vibe[] = [
  {
    id: "ethereal-dreamer",
    name: "Ethereal Dreamer",
    tagline: "Whimsical & Airy Canvas",
    description: "Soft lighting, breezy natural landscapes, and glowing shorelines. Perfect for couples who seek a romantic, light-filled, and whimsical visual keeping.",
    category: "pre-wedding",
    colorClass: "text-brand-teal",
    glowColor: "from-brand-teal/20 via-brand-purple/10 to-transparent",
    gradient: "from-brand-teal to-brand-purple",
    keywords: ["Airy Light", "Coastal Breeze", "Raw Chemistry", "Natural Landscapes"]
  },
  {
    id: "cinematic-luxury",
    name: "Cinematic Luxury",
    tagline: "Dramatic & Motion-Picture Scales",
    description: "Grand heritage architecture, majestic destination venues, high contrast night captures, and complex motion-picture grade scales.",
    category: "destination",
    colorClass: "text-brand-purple",
    glowColor: "from-brand-purple/20 via-brand-pink/10 to-transparent",
    gradient: "from-brand-purple to-brand-pink",
    keywords: ["Grand Scale", "Dramatic Contrast", "Royal Heritage", "Slow Motion"]
  },
  {
    id: "raw-storyteller",
    name: "Raw Storyteller",
    tagline: "Intimate & Candid Realism",
    description: "Unscripted expressions, soft golden-hour rays, teary-eyed family hugs, and real, heart-warming laughter recorded as it unfolds.",
    category: "weddings",
    colorClass: "text-brand-peach",
    glowColor: "from-brand-peach/20 via-brand-pink/10 to-transparent",
    gradient: "from-brand-peach to-brand-pink",
    keywords: ["Candid Tears", "Golden Hour", "Family Hugs", "Unposed Love"]
  },
  {
    id: "modern-editorial",
    name: "Modern Editorial",
    tagline: "High-Fashion & Framed Arts",
    description: "High-fashion style grids, neat geometric compositions, bold layouts, and creative studio styling inspired by luxury editorial magazines.",
    category: "corporate",
    colorClass: "text-brand-pink",
    glowColor: "from-brand-pink/20 via-brand-teal/10 to-transparent",
    gradient: "from-brand-pink to-brand-teal",
    keywords: ["Editorial Grid", "Artistic Framing", "High-Fashion", "Clean Lines"]
  }
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedVibe, setSelectedVibe] = useState<string>("ethereal-dreamer");

  // Get current active vibe details
  const activeVibe = VIBES.find((v) => v.id === selectedVibe) || VIBES[0];

  // Get portfolio items for active vibe
  const activeVibePortfolio = PORTFOLIO_ITEMS.filter(
    (item) => item.category === activeVibe.category
  ).slice(0, 3);

  // Testimonials auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative overflow-hidden bg-charcoal-950">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video with Fallback Poster Image */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000"
            className="absolute inset-0 w-full h-full object-cover opacity-75 md:opacity-55 brightness-[85%] md:brightness-[70%] transition-opacity duration-1000"
          >
            <source
              src="/hero-wedding.mp4"
              type="video/mp4"
            />
          </video>
          {/* Ambient Video Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-charcoal-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 via-transparent to-charcoal-950/80 hidden md:block" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-[10px] md:text-xs tracking-[0.5em] text-brand-teal uppercase font-semibold">
              STORIES FROM ODD_ONE_ADS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-4xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide leading-tight mb-6"
          >
            Unwrap the tale of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-purple to-brand-pink font-serif italic">
              your perfect day
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-sm md:text-lg text-charcoal-300 font-light tracking-wide max-w-2xl mb-12 leading-relaxed"
          >
            Celebrating and capturing life through timeless wedding photos and cinematic films across India, UK, and Dubai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-brand-gradient hover:opacity-90 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg shadow-brand-purple/20 text-center"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/20 hover:border-brand-teal text-white hover:text-brand-teal text-xs uppercase tracking-widest font-semibold transition-all duration-300 backdrop-blur-sm text-center"
            >
              Book Your Date
            </Link>
          </motion.div>
        </div>

        {/* Enhanced Animated Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-charcoal-400 font-semibold mb-1">
            Scroll Down
          </span>
          <motion.div
            animate={{
              y: [0, 6, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            <div className="w-[20px] h-[32px] border border-white/20 rounded-full flex justify-center p-1.5 mb-1 bg-charcoal-950/40 backdrop-blur-sm">
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 bg-brand-teal rounded-full"
              />
            </div>
            <ChevronDown size={14} className="text-brand-purple -mt-0.5" />
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE VIBE CURATOR (USER HOOK) */}
      <section className="py-24 bg-charcoal-950/60 relative overflow-hidden border-y border-brand-purple/10">
        {/* Animated background glow that shifts depending on chosen vibe */}
        <div className="absolute inset-0 pointer-events-none z-0 transition-all duration-1000">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] rounded-full bg-gradient-to-tr ${activeVibe.glowColor} blur-[120px] opacity-40 transition-all duration-1000`} />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
              Interactive Storyteller
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-6">
              Curate Your Story Vibe
            </h2>
            <div className="w-12 h-[1.5px] bg-brand-gradient mx-auto mb-6" />
            <p className="text-xs md:text-sm text-charcoal-400 font-light max-w-md mx-auto leading-relaxed">
              Every couple is a distinct universe. Select a visual mood below to dynamically tailor the ambient layout, filter the portfolio grids, and match your unique aesthetic.
            </p>
          </div>

          {/* Vibe Selection Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {VIBES.map((vibe) => {
              const isActive = selectedVibe === vibe.id;
              return (
                <button
                  key={vibe.id}
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`relative p-6 flex flex-col items-start text-left rounded-xl transition-all duration-500 cursor-pointer border ${
                    isActive
                      ? "bg-charcoal-900 border-brand-purple shadow-lg shadow-brand-purple/5"
                      : "bg-charcoal-950/40 border-white/[0.05] hover:border-white/15"
                  }`}
                >
                  {/* Subtle hover splash effect */}
                  {isActive && (
                    <motion.div
                      layoutId="vibeTabBg"
                      className="absolute inset-0 rounded-xl bg-gradient-to-tr from-brand-purple/5 via-brand-pink/5 to-transparent -z-10"
                    />
                  )}
                  <span className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${vibe.colorClass}`}>
                    {vibe.tagline.split(" & ")[0]}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {vibe.name}
                  </h3>
                  <p className="text-[11px] text-charcoal-400 leading-relaxed font-light mt-1">
                    {vibe.tagline.split(" & ")[1] || vibe.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Dynamic Vibe Dashboard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVibe}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass p-8 rounded-2xl border border-white/[0.05] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left descriptions and CTAs */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-2 text-brand-teal">
                  <Sparkles size={16} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Aesthetic Match
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                  The {activeVibe.name} Vibe
                </h3>
                <p className="text-xs md:text-sm text-charcoal-300 leading-relaxed font-light">
                  {activeVibe.description}
                </p>

                {/* Keywords caps */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeVibe.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[9px] uppercase tracking-widest bg-charcoal-900 border border-white/[0.08] text-white rounded-full font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/contact?vibe=${activeVibe.id}`}
                    className={`px-6 py-3 text-xs uppercase tracking-widest font-bold text-charcoal-950 bg-gradient-to-r ${activeVibe.gradient} text-center shadow-lg transition-transform duration-300 hover:scale-[1.02]`}
                  >
                    Check Vibe Date
                  </Link>
                  <Link
                    href="/portfolio"
                    className="px-6 py-3 text-xs uppercase tracking-widest font-semibold border border-white/10 hover:border-white/30 text-white text-center transition-colors duration-300"
                  >
                    Explore Category
                  </Link>
                </div>
              </div>

              {/* Right Vibe Portfolio Gallery Previews */}
              <div className="lg:col-span-7 grid grid-cols-3 gap-3">
                {activeVibePortfolio.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg group bg-charcoal-900 border border-white/[0.04]"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 30vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <span className="text-[8px] text-brand-teal uppercase tracking-widest font-semibold">
                        {item.location.split(",").slice(-1)[0]}
                      </span>
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. FEATURED PORTFOLIO */}
      <section className="py-24 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
                Curated Moments
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
                Featured Portfolio
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-brand-teal hover:text-brand-pink transition-colors duration-300 mt-4 md:mt-0 font-semibold"
            >
              View Full Gallery <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Masonry Grid (8 photos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTFOLIO_ITEMS.slice(0, 8).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`group relative overflow-hidden aspect-[4/5] bg-charcoal-900 cursor-pointer border border-white/[0.04] ${
                  idx === 1 || idx === 6 ? "lg:col-span-2 lg:aspect-auto lg:h-[450px]" : ""
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-[75%]"
                />
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-[9px] uppercase tracking-widest text-brand-teal font-semibold mb-1">
                    {item.location}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-white">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-charcoal-400 capitalize mt-0.5">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-24 bg-charcoal-900/20 border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
              Crafting Legacies
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-6">
              Our Creative Services
            </h2>
            <div className="w-12 h-[1px] bg-brand-purple/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => {
              const IconComponent = iconMap[service.iconName] || Camera;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-card p-8 flex flex-col justify-between h-[310px] group border border-white/[0.04]"
                >
                  <div>
                    <div className="w-12 h-12 rounded-none bg-brand-teal/5 flex items-center justify-center border border-brand-teal/15 text-brand-teal mb-6 group-hover:bg-brand-gradient group-hover:text-charcoal-950 transition-all duration-500">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="font-serif text-xl font-medium mb-3 group-hover:text-brand-purple transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-charcoal-400 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href={service.id === "films" ? "/films" : "/portfolio"}
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-teal font-semibold group-hover:text-brand-pink transition-colors duration-300 mt-4"
                  >
                    {service.ctaText} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-24 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Block */}
          <div>
            <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
              Beyond Borders
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-6">
              Storytelling Without Boundaries
            </h2>
            <p className="text-sm text-charcoal-300 font-light leading-relaxed mb-8">
              We travel wherever love leads us. Based in India, we routinely cover events across the United Kingdom and Dubai, bringing our signature luxury cinematic style to every destination. Our approach is quiet, intentional, and deeply emotional.
            </p>

            {/* Check Points */}
            <div className="space-y-4 mb-10">
              {[
                { title: "Storytelling Approach", desc: "No stiff poses. We focus on genuine laughter, soft whispers, and real tears." },
                { title: "Cinematic Wedding Films", desc: "Crafted like motion pictures with Hollywood-grade color grading and audio." },
                { title: "Experienced Global Team", desc: "Over a decade of shooting in extreme light conditions and diverse cultures." }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-white font-medium text-sm mb-1">{point.title}</h4>
                    <p className="text-xs text-charcoal-400">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Statistics Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:pl-8">
            {[
              { num: "2400+", label: "Projects Completed" },
              { num: "20K+", label: "Instagram Family" },
              { num: "15+", label: "Countries Served" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-charcoal-900/40 border border-white/[0.04] p-8 flex flex-col justify-center items-center text-center aspect-square rounded-xl hover:border-brand-purple/20 transition-colors duration-500"
              >
                <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-pink mb-2">
                  {stat.num}
                </span>
                <span className="text-[10px] text-charcoal-400 uppercase tracking-widest font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="py-24 bg-charcoal-900/10 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold block mb-3">
            Words of Love
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-12">
            Client Testimonials
          </h2>

          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-brand-pink">
                  {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif italic text-lg md:text-2xl text-charcoal-200 leading-relaxed mb-8 max-w-2xl">
                  &ldquo;{TESTIMONIALS[currentTestimonial].quote}&rdquo;
                </p>

                {/* Profile */}
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-purple/20">
                    <Image
                      src={TESTIMONIALS[currentTestimonial].imageUrl}
                      alt={TESTIMONIALS[currentTestimonial].name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs uppercase tracking-widest text-white font-semibold">
                      {TESTIMONIALS[currentTestimonial].name}
                    </span>
                    <span className="block text-[10px] text-charcoal-400 uppercase tracking-widest">
                      {TESTIMONIALS[currentTestimonial].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={prevTestimonial}
              className="p-2 border border-white/10 hover:border-brand-purple text-white hover:text-brand-purple transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    currentTestimonial === i ? "bg-brand-purple w-4" : "bg-charcoal-700"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 border border-white/10 hover:border-brand-purple text-white hover:text-brand-purple transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="relative py-28 bg-charcoal-950 flex justify-center items-center text-center">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000"
            alt="CTA backdrop"
            fill
            sizes="100vw"
            className="object-cover opacity-10 brightness-[25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-transparent to-charcoal-950" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-[10px] tracking-[0.5em] text-brand-teal uppercase font-semibold block mb-4">
            Begin Your Legacy
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
            Let&apos;s tell your story.
          </h2>
          <p className="text-xs md:text-sm text-charcoal-300 font-light max-w-md mx-auto mb-10 leading-relaxed">
            Spaces in our calendar are limited to ensure every couple receives our absolute dedication. Get in touch to check date availability.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-brand-gradient hover:opacity-90 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg shadow-brand-purple/20"
          >
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
