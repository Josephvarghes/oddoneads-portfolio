"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, Heart, Compass, Briefcase, ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SERVICES, PORTFOLIO_ITEMS, TESTIMONIALS } from "@/data/mockData";

// Dynamic icon resolver
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Camera: Camera,
  Film: Film,
  Heart: Heart,
  Compass: Compass,
  Briefcase: Briefcase,
};

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Ken Burns Zoom Effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000"
              alt="Cinematic Wedding Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-45 grayscale-[20%] brightness-[40%]"
            />
          </motion.div>
          {/* Ambient Video Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-charcoal-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 via-transparent to-charcoal-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-[10px] md:text-xs tracking-[0.5em] text-gold-500 uppercase font-semibold">
              FILMBY ODD_ONE_ADS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-4xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide leading-tight mb-6"
          >
            Unwrap the tale of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-champagne font-serif italic">
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
              className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 text-center"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/20 hover:border-gold-500 text-white hover:text-gold-500 text-xs uppercase tracking-widest font-semibold transition-all duration-300 backdrop-blur-sm text-center"
            >
              Book Your Date
            </Link>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-charcoal-500">
            Scroll
          </span>
          <div className="w-[18px] h-[30px] border border-charcoal-500 rounded-full flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-gold-500 rounded-full"
            />
          </div>
        </div>
      </section>

      {/* 2. FEATURED PORTFOLIO */}
      <section className="py-24 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-semibold block mb-3">
                Curated Moments
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
                Featured Portfolio
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-gold-500 hover:text-white transition-colors duration-300 mt-4 md:mt-0 font-semibold"
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
                className={`group relative overflow-hidden aspect-[4/5] bg-charcoal-900 cursor-pointer ${
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
                  <span className="text-[9px] uppercase tracking-widest text-gold-500 font-semibold mb-1">
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

      {/* 3. SERVICES SECTION */}
      <section className="py-24 bg-charcoal-900/40 border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-semibold block mb-3">
              Crafting Legacies
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-6">
              Our Creative Services
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/50 mx-auto" />
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
                  className="glass-card p-8 flex flex-col justify-between h-[300px] group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-none bg-gold-500/5 flex items-center justify-center border border-gold-500/10 text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all duration-300">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="font-serif text-xl font-medium mb-3 group-hover:text-gold-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-charcoal-400 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href={service.id === "films" ? "/films" : "/portfolio"}
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gold-500 font-semibold group-hover:text-white transition-colors duration-300 mt-4"
                  >
                    {service.ctaText} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Block */}
          <div>
            <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-semibold block mb-3">
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
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
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
                className="bg-charcoal-900/60 border border-white/[0.04] p-8 flex flex-col justify-center items-center text-center aspect-square"
              >
                <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gold-500 mb-2">
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

      {/* 5. TESTIMONIALS CAROUSEL */}
      <section className="py-24 bg-charcoal-900/20 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-semibold block mb-3">
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
                <div className="flex gap-1 mb-6 text-gold-500">
                  {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif italic text-lg md:text-2xl text-charcoal-100 leading-relaxed mb-8 max-w-2xl">
                  &ldquo;{TESTIMONIALS[currentTestimonial].quote}&rdquo;
                </p>

                {/* Profile */}
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-500/20">
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
              className="p-2 border border-white/10 hover:border-gold-500 text-white hover:text-gold-500 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentTestimonial === i ? "bg-gold-500 w-4" : "bg-charcoal-700"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 border border-white/10 hover:border-gold-500 text-white hover:text-gold-500 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="relative py-28 bg-charcoal-950 flex justify-center items-center text-center">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000"
            alt="CTA backdrop"
            fill
            sizes="100vw"
            className="object-cover opacity-15 brightness-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-transparent to-charcoal-950" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-[10px] tracking-[0.5em] text-gold-500 uppercase font-semibold block mb-4">
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
            className="inline-block px-10 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg shadow-gold-500/10"
          >
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
