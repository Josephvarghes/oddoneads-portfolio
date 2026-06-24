"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  Camera, 
  Film, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Check, 
  Info, 
  Mail, 
  User,
  DollarSign
} from "lucide-react";

// Event selections for Photographer/Videographer
interface EventSelection {
  photo: boolean;
  video: boolean;
}

// Additional production services (Helicam, YouTube Live, Spot Video Edit)
interface AdditionalService {
  helicam: boolean;
  live: boolean;
  spotEdit: boolean;
}

// Pre-wedding shoot selections
interface PreWeddingSelection {
  shoot1Photo: boolean;
  shoot1Video: boolean;
  shoot2Photo: boolean;
  shoot2Video: boolean;
}

// Deliverables selection checklist
interface DeliverableSelection {
  album1: boolean;
  album2: boolean;
  highlights1: boolean;
  highlights2: boolean;
  documentary: boolean;
  reels: boolean;
}

// Confetti Particle Interface
interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  angle: number;
}

const CONFETTI_COLORS = ["#22d3ee", "#c084fc", "#ec4899", "#fb923c", "#34d399"];

// Custom Lightweight React-Confetti Component
function CustomConfetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage width
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 8 + 6,
      delay: Math.random() * 1.5,
      angle: Math.random() * 360
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm opacity-80"
          style={{
            left: `${p.x}%`,
            top: `-20px`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.angle}deg)`
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [`${p.x}%`, `${p.x + (Math.random() * 20 - 10)}%`],
            rotate: [p.angle, p.angle + 360 + Math.random() * 360]
          }}
          transition={{
            duration: Math.random() * 2.5 + 2.5,
            delay: p.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 1
          }}
        />
      ))}
    </div>
  );
}

// Dynamic display labels for cultural events
const EVENT_LABELS: Record<string, string> = {
  // Christian Wedding Events
  "betrothal-eve": "Betrothal Eve",
  "betrothal-day-bride": "Betrothal Day (Bride)",
  "betrothal-day-groom": "Betrothal Day (Groom)",
  "wedding-eve": "Wedding Eve",
  "wedding-day-bride": "Wedding Day (Bride)",
  "wedding-day-groom": "Wedding Day (Groom)",
  
  // Hindu Wedding Events
  "haldi-day": "Haldi Ceremony",
  "mehendi-eve": "Mehendi Eve",
  "sangeet-eve": "Sangeet & Dance Eve",
  "wedding-day": "Wedding Ceremony (Muhurtham)",
  "reception-day": "Wedding Reception Day",
  
  // Muslim Wedding Events
  "mylanchi-eve": "Mylanchi (Mehendi) Eve",
  "bride-eve": "Bride's Eve / Salkaram",
  "groom-eve": "Groom's Eve / Salkaram",
  "nikkah-day": "Nikkah Day Ceremony",
  "muslim-reception": "Wedding Reception Party"
};

const CATEGORIES = [
  { 
    id: "christian", 
    name: "Christian Wedding", 
    icon: "✙", 
    desc: "Betrothal ceremonies, custom Wedding Eves, separate Bride & Groom preparation and main service captures." 
  },
  { 
    id: "hindu", 
    name: "Hindu Wedding", 
    icon: "ॐ", 
    desc: "Vibrant Haldi, Mehendi and Sangeet celebrations, followed by the Muhurtham and Grand Reception." 
  },
  { 
    id: "muslim", 
    name: "Muslim Wedding", 
    icon: "☪", 
    desc: "Elegant Mylanchi Night, Bride & Groom Eves, traditional Nikkah ceremony, and Salkaram reception feasts." 
  }
];

interface ContactPlannerFormProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  weddingDate: string;
  setWeddingDate: React.Dispatch<React.SetStateAction<string>>;
  weddingVenue: string;
  setWeddingVenue: React.Dispatch<React.SetStateAction<string>>;
  hasEngagement: boolean;
  setHasEngagement: React.Dispatch<React.SetStateAction<boolean>>;
  engagementDate: string;
  setEngagementDate: React.Dispatch<React.SetStateAction<string>>;
  engagementVenue: string;
  setEngagementVenue: React.Dispatch<React.SetStateAction<string>>;
  events: Record<string, EventSelection>;
  preWedding: PreWeddingSelection;
  setPreWedding: React.Dispatch<React.SetStateAction<PreWeddingSelection>>;
  deliverables: DeliverableSelection;
  setDeliverables: React.Dispatch<React.SetStateAction<DeliverableSelection>>;
  additionalServices: Record<string, AdditionalService>;
  calculateTotal: () => number;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  showSuccess: boolean;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  handleEventToggle: (evtKey: string, type: "photo" | "video") => void;
  handleServiceToggle: (dayKey: string, service: keyof AdditionalService) => void;
  resetAllFields: () => void;
}

function ContactPlannerForm({
  step,
  setStep,
  category,
  setCategory,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  weddingDate,
  setWeddingDate,
  weddingVenue,
  setWeddingVenue,
  hasEngagement,
  setHasEngagement,
  engagementDate,
  setEngagementDate,
  engagementVenue,
  setEngagementVenue,
  events,
  preWedding,
  setPreWedding,
  deliverables,
  setDeliverables,
  additionalServices,
  calculateTotal,
  isSubmitting,
  setIsSubmitting,
  showSuccess,
  setShowSuccess,
  errors,
  setErrors,
  handleEventToggle,
  handleServiceToggle,
  resetAllFields
}: ContactPlannerFormProps) {

  const handleDeliverableToggle = (key: keyof DeliverableSelection) => {
    setDeliverables((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Validates if the user can proceed to the next step
  const validateStep = (): boolean => {
    const newErrors: string[] = [];
    
    if (step === 1 && !category) {
      newErrors.push("Please select your wedding style category to proceed.");
    }
    if (step === 2) {
      if (!fullName.trim()) newErrors.push("Please enter your couple name.");
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.push("Please enter a valid email address.");
      if (!phone.trim()) newErrors.push("Please enter a contact phone number.");
    }
    if (step === 3) {
      if (!weddingDate) newErrors.push("Please pick your wedding day date.");
      if (!weddingVenue.trim()) newErrors.push("Please specify the wedding day location venue.");
      if (hasEngagement) {
        if (!engagementDate) newErrors.push("Please select the engagement date or toggle 'No Engagement Ceremony planned'.");
        if (!engagementVenue.trim()) newErrors.push("Please specify the engagement venue location.");
      }
    }
    if (step === 4) {
      const selectedAny = Object.values(events).some((e) => e.photo || e.video);
      if (!selectedAny) {
        newErrors.push("Please select at least one photography or videography event day service.");
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setErrors([]);
      setStep((s) => s + 1);
    }
  };

  const handlePrevStep = () => {
    setErrors([]);
    setStep((s) => s - 1);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    // Simulate API request call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1800);
  };

  const stepLabels = ["Style", "Couple Info", "Dates & Venues", "Ceremonies", "Deliverables", "Production Matrix", "Live Quote"];

  // Helper label resolver for Additional service day codes
  const getServiceDayLabel = (key: string): string => {
    if (key === "betrothal-eve") return "Betrothal Eve";
    if (key === "betrothal-day") return "Betrothal Day";
    if (key === "wedding-eve") return "Wedding Eve";
    if (key === "wedding-day") return "Wedding Day";
    if (key === "mehendi-eve") return "Mehendi Eve";
    if (key === "sangeet-eve") return "Sangeet Eve";
    if (key === "reception-day" || key === "reception") return "Reception Day";
    if (key === "mylanchi-eve") return "Mylanchi Eve";
    if (key === "bride-eve") return "Bride/Groom Eve";
    if (key === "nikkah-day") return "Nikkah Day";
    return key.replace("-", " ");
  };

  return (
    <div className="w-full bg-charcoal-900/40 border border-white/[0.04] p-6 md:p-10 relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-xl">
      {/* Top Progress bar and labels */}
      <div className="mb-10">
        <div className="flex justify-between text-[8px] md:text-[10px] uppercase tracking-widest text-charcoal-400 font-bold mb-3 font-sans">
          {stepLabels.map((lbl, idx) => (
            <span 
              key={idx} 
              className={`transition-colors duration-300 ${
                step >= idx + 1 ? "text-brand-teal font-extrabold" : "opacity-60"
              }`}
            >
              {lbl}
            </span>
          ))}
        </div>
        <div className="w-full h-1.5 bg-charcoal-950 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-gradient" 
            initial={{ width: "14%" }} 
            animate={{ width: `${(step / 7) * 100}%` }} 
            transition={{ duration: 0.5, ease: "easeOut" }} 
          />
        </div>
      </div>

      {/* Errors warning popup */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="bg-brand-pink/10 border border-brand-pink/30 p-4 rounded-xl mb-6 text-xs text-brand-pink font-medium flex flex-col gap-1.5"
          >
            {errors.map((err, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                <span>{err}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmitForm} className="space-y-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Cultural Style & Vibe Selection */}
          {step === 1 && (
            <motion.div 
              key="step-1" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-brand-purple font-bold block mb-1">Step 01 / Style category</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">Select Your Wedding Cultural Tradition</h3>
                <p className="text-xs text-charcoal-400 font-light mt-1">Our booking wizard tailors all package options, schedules, and custom layouts to suit your specific wedding timeline.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button 
                      type="button" 
                      key={cat.id} 
                      onClick={() => { 
                        setCategory(cat.id); 
                        setTimeout(() => setStep(2), 350); 
                      }} 
                      className={`text-left p-6 rounded-xl border relative transition-all duration-300 group cursor-pointer ${
                        isSelected 
                          ? "bg-charcoal-900/80 border-brand-purple shadow-lg shadow-brand-purple/10" 
                          : "bg-charcoal-950/20 border-white/[0.04] hover:border-white/10 hover:bg-charcoal-950/40"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-purple flex items-center justify-center text-[10px] text-charcoal-950 font-bold">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                      )}
                      <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                      <h4 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">{cat.name}</h4>
                      <p className="text-[11px] text-charcoal-400 leading-relaxed font-light">{cat.desc}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Core Details */}
          {step === 2 && (
            <motion.div 
              key="step-2" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-brand-purple font-bold block mb-1">Step 02 / Couple Details</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">Introduce Yourselves</h3>
                <p className="text-xs text-charcoal-400 font-light mt-1">Share your contact detail so we can send your custom compiled timeline proposal after review.</p>
              </div>

              <div className="space-y-5 pt-3 font-sans">
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-charcoal-400 mb-2 font-bold flex items-center gap-1.5">
                    <User size={12} className="text-brand-teal" /> Couple Names <span className="text-brand-pink font-serif">*</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-xl px-4 py-3.5 text-xs text-white placeholder-charcoal-500 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 focus:outline-none transition-colors duration-300" 
                    placeholder="e.g. Maria & Joseph (Your romantic journey)" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-charcoal-400 mb-2 font-bold flex items-center gap-1.5">
                      <Mail size={12} className="text-brand-teal" /> Email Address <span className="text-brand-pink font-serif">*</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-xl px-4 py-3.5 text-xs text-white placeholder-charcoal-500 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 focus:outline-none transition-colors duration-300" 
                      placeholder="e.g. josephvarghese98128@gmail.com" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-charcoal-400 mb-2 font-bold flex items-center gap-1.5">
                      <Phone size={12} className="text-brand-teal" /> Phone Number <span className="text-brand-pink font-serif">*</span>
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-xl px-4 py-3.5 text-xs text-white placeholder-charcoal-500 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 focus:outline-none transition-colors duration-300" 
                      placeholder="e.g. +91 9497381830" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Dates & Venues */}
          {step === 3 && (
            <motion.div 
              key="step-3" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-brand-purple font-bold block mb-1">Step 03 / Dates & Venues</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">Dates & Venues</h3>
                <p className="text-xs text-charcoal-400 font-light mt-1">Specify where and when the main chapters of your wedding will unfold.</p>
              </div>

              <div className="space-y-6 pt-3 font-sans">
                {/* Wedding Day Fields */}
                <div className="bg-charcoal-950/20 border border-white/[0.02] p-5 rounded-xl space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand-teal font-extrabold block border-b border-white/[0.04] pb-2">
                    Wedding Day Details
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-charcoal-400 mb-1.5 font-bold flex items-center gap-1"><Calendar size={11} /> Wedding Ceremony Date *</label>
                      <input 
                        type="date" 
                        required 
                        value={weddingDate} 
                        onChange={(e) => setWeddingDate(e.target.value)} 
                        className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white focus:border-brand-teal focus:outline-none transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-charcoal-400 mb-1.5 font-bold flex items-center gap-1"><MapPin size={11} /> Wedding Venue Location *</label>
                      <input 
                        type="text" 
                        required 
                        value={weddingVenue} 
                        onChange={(e) => setWeddingVenue(e.target.value)} 
                        className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-charcoal-500 focus:border-brand-teal focus:outline-none" 
                        placeholder="e.g. St. Mary's Cathedral, Ernakulam" 
                      />
                    </div>
                  </div>
                </div>

                {/* Engagement / Betrothal Switch & Fields */}
                <div className="bg-charcoal-950/20 border border-white/[0.02] p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-brand-purple font-extrabold block">
                      Engagement / Betrothal Details
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-light text-charcoal-300">
                      <input 
                        type="checkbox" 
                        checked={hasEngagement} 
                        onChange={() => setHasEngagement(!hasEngagement)} 
                        className="accent-brand-purple rounded"
                      />
                      Includes Engagement
                    </label>
                  </div>

                  {hasEngagement ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 transition-all">
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-charcoal-400 mb-1.5 font-bold flex items-center gap-1"><Calendar size={11} /> Engagement Ceremony Date *</label>
                        <input 
                          type="date" 
                          required={hasEngagement}
                          value={engagementDate} 
                          onChange={(e) => setEngagementDate(e.target.value)} 
                          className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white focus:border-brand-teal focus:outline-none transition-colors" 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-charcoal-400 mb-1.5 font-bold flex items-center gap-1"><MapPin size={11} /> Engagement Venue Location *</label>
                        <input 
                          type="text" 
                          required={hasEngagement}
                          value={engagementVenue} 
                          onChange={(e) => setEngagementVenue(e.target.value)} 
                          className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-charcoal-500 focus:border-brand-teal focus:outline-none" 
                          placeholder="e.g. Grand Convention Center Hall" 
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-charcoal-500 italic py-2">No Engagement or Betrothal day coverage is selected in the timeline planner.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Custom Event Matrix */}
          {step === 4 && (
            <motion.div 
              key="step-4" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-brand-purple font-bold block mb-1">Step 04 / Ceremony Coverage</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">Event Coverage Matrix</h3>
                <p className="text-xs text-charcoal-400 font-light mt-1">Select whether Photographer or Videographer coverage is required for each event day.</p>
              </div>

              <div className="space-y-3 pt-3 max-h-[380px] overflow-y-auto pr-1">
                {Object.keys(events).map((evtKey) => (
                  <div 
                    key={evtKey} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-charcoal-950/30 border border-white/[0.02] rounded-xl gap-3 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-6 bg-brand-gradient rounded-full" />
                      <div>
                        <span className="font-serif text-sm font-bold text-white block">
                          {EVENT_LABELS[evtKey] || evtKey}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-charcoal-500">
                          {category} schedule
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        type="button" 
                        onClick={() => handleEventToggle(evtKey, "photo")} 
                        className={`flex items-center gap-2 px-4 py-2 border text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer rounded-lg ${
                          events[evtKey]?.photo 
                            ? "bg-brand-teal/10 border-brand-teal text-brand-teal shadow-[0_0_12px_-4px_rgba(34,211,238,0.4)]" 
                            : "bg-charcoal-950/20 border-white/[0.04] text-charcoal-400 hover:border-white/10"
                        }`}
                      >
                        <Camera size={12} />
                        Photo
                        {events[evtKey]?.photo && <Check size={10} className="stroke-[3]" />}
                      </button>

                      <button 
                        type="button" 
                        onClick={() => handleEventToggle(evtKey, "video")} 
                        className={`flex items-center gap-2 px-4 py-2 border text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer rounded-lg ${
                          events[evtKey]?.video 
                            ? "bg-brand-pink/10 border-brand-pink text-brand-pink shadow-[0_0_12px_-4px_rgba(236,72,153,0.4)]" 
                            : "bg-charcoal-950/20 border-white/[0.04] text-charcoal-400 hover:border-white/10"
                        }`}
                      >
                        <Film size={12} />
                        Video
                        {events[evtKey]?.video && <Check size={10} className="stroke-[3]" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Pre-Wedding & Deliverables */}
          {step === 5 && (
            <motion.div 
              key="step-5" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-brand-purple font-bold block mb-1">Step 05 / Upgrades</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">Pre-Wedding & Deliverables</h3>
                <p className="text-xs text-charcoal-400 font-light mt-1">Configure narrative pre-wedding storytelling shoots and select your final premium media assets.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
                {/* Pre-wedding section */}
                <div className="bg-charcoal-950/20 border border-white/[0.02] p-5 rounded-xl space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand-teal font-extrabold block border-b border-white/[0.04] pb-2">
                    Pre-Wedding Sessions
                  </span>
                  
                  {/* Shoot 1 */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-white font-medium block">Pre-Wedding Shoot Session 1</span>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setPreWedding(prev => ({...prev, shoot1Photo: !prev.shoot1Photo}))}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest font-bold border rounded-lg transition-all ${
                          preWedding.shoot1Photo ? "bg-brand-teal/10 border-brand-teal text-brand-teal" : "border-white/[0.04] text-charcoal-400"
                        }`}
                      >
                        Photographer
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPreWedding(prev => ({...prev, shoot1Video: !prev.shoot1Video}))}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest font-bold border rounded-lg transition-all ${
                          preWedding.shoot1Video ? "bg-brand-pink/10 border-brand-pink text-brand-pink" : "border-white/[0.04] text-charcoal-400"
                        }`}
                      >
                        Videographer
                      </button>
                    </div>
                  </div>

                  {/* Shoot 2 */}
                  <div className="space-y-2.5 pt-2 border-t border-white/[0.02]">
                    <span className="text-[10px] text-white font-medium block">Pre-Wedding Shoot Session 2</span>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setPreWedding(prev => ({...prev, shoot2Photo: !prev.shoot2Photo}))}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest font-bold border rounded-lg transition-all ${
                          preWedding.shoot2Photo ? "bg-brand-teal/10 border-brand-teal text-brand-teal" : "border-white/[0.04] text-charcoal-400"
                        }`}
                      >
                        Photographer
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPreWedding(prev => ({...prev, shoot2Video: !prev.shoot2Video}))}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest font-bold border rounded-lg transition-all ${
                          preWedding.shoot2Video ? "bg-brand-pink/10 border-brand-pink text-brand-pink" : "border-white/[0.04] text-charcoal-400"
                        }`}
                      >
                        Videographer
                      </button>
                    </div>
                  </div>
                </div>

                {/* Deliverables section */}
                <div className="bg-charcoal-950/20 border border-white/[0.02] p-5 rounded-xl space-y-3.5">
                  <span className="text-[10px] uppercase tracking-widest text-brand-purple font-extrabold block border-b border-white/[0.04] pb-2">
                    Media Assets & Books
                  </span>
                  
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {[
                      { id: "album1" as const, label: "Premium Album 1" },
                      { id: "album2" as const, label: "Premium Album 2" },
                      { id: "highlights1" as const, label: "Highlights Video (3 to 7 Min) - 1" },
                      { id: "highlights2" as const, label: "Highlights Video (3 to 7 Min) - 2" },
                      { id: "documentary" as const, label: "Full Length Film (30 to 45 Min)" },
                      { id: "reels" as const, label: "Teaser Reels (30 Sec)" }
                    ].map((item) => (
                      <label 
                        key={item.id} 
                        className={`flex items-center justify-between p-2.5 border rounded-lg text-xs transition-colors cursor-pointer ${
                          deliverables[item.id] 
                            ? "bg-charcoal-900 border-brand-purple/40 text-white" 
                            : "bg-charcoal-950/40 border-white/[0.02] text-charcoal-400 hover:border-white/10"
                        }`}
                      >
                        <span className="font-light">{item.label}</span>
                        <input 
                          type="checkbox" 
                          checked={deliverables[item.id]} 
                          onChange={() => handleDeliverableToggle(item.id)} 
                          className="accent-brand-purple w-4 h-4 ml-3"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Additional Production Services Matrix */}
          {step === 6 && (
            <motion.div 
              key="step-6" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-brand-purple font-bold block mb-1">Step 06 / Service Upgrades</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">Additional Production Grid</h3>
                <p className="text-xs text-charcoal-400 font-light mt-1">Add highly specialized production capabilities to specific ceremony days in your timeline.</p>
              </div>

              <div className="pt-3 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="py-3 text-[10px] uppercase tracking-widest text-charcoal-400 font-bold w-1/4">Advanced Upgrades</th>
                      {Object.keys(additionalServices).map((dayKey) => (
                        <th key={dayKey} className="py-3 text-center text-[10px] uppercase tracking-widest text-white font-bold">
                          {getServiceDayLabel(dayKey)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Helicam Service Row */}
                    <tr className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                      <td className="py-4 text-xs font-medium text-charcoal-200">
                        <span className="block font-semibold">Helicam (4K Drone)</span>
                        <span className="text-[9px] text-charcoal-500">Aerial cinematic sweeps</span>
                      </td>
                      {Object.keys(additionalServices).map((dayKey) => (
                        <td key={dayKey} className="py-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={additionalServices[dayKey]?.helicam || false} 
                            onChange={() => handleServiceToggle(dayKey, "helicam")} 
                            className="accent-brand-teal w-4.5 h-4.5 cursor-pointer mx-auto"
                          />
                        </td>
                      ))}
                    </tr>

                    {/* YouTube Live Service Row */}
                    <tr className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                      <td className="py-4 text-xs font-medium text-charcoal-200">
                        <span className="block font-semibold">YouTube Live Broadcast</span>
                        <span className="text-[9px] text-charcoal-500">Multi-cam HD livestream</span>
                      </td>
                      {Object.keys(additionalServices).map((dayKey) => (
                        <td key={dayKey} className="py-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={additionalServices[dayKey]?.live || false} 
                            onChange={() => handleServiceToggle(dayKey, "live")} 
                            className="accent-brand-purple w-4.5 h-4.5 cursor-pointer mx-auto"
                          />
                        </td>
                      ))}
                    </tr>

                    {/* Spot Video Editing Service Row */}
                    <tr className="hover:bg-white/[0.01]">
                      <td className="py-4 text-xs font-medium text-charcoal-200">
                        <span className="block font-semibold">Spot Video Edit (Same Day)</span>
                        <span className="text-[9px] text-charcoal-500">Edited teaser shown at reception</span>
                      </td>
                      {Object.keys(additionalServices).map((dayKey) => (
                        <td key={dayKey} className="py-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={additionalServices[dayKey]?.spotEdit || false} 
                            onChange={() => handleServiceToggle(dayKey, "spotEdit")} 
                            className="accent-brand-pink w-4.5 h-4.5 cursor-pointer mx-auto"
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* STEP 7: Live Quote & Request Consultation */}
          {step === 7 && (
            <motion.div 
              key="step-7" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-brand-purple font-bold block mb-1">Step 07 / Confirmation</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">Your Curated Quote</h3>
                <p className="text-xs text-charcoal-400 font-light mt-1">Review your calculated estimate and submit to block your consultation meeting.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-3">
                {/* Total Quote Ticker */}
                <div className="md:col-span-5 bg-gradient-to-tr from-brand-teal/10 via-brand-purple/10 to-brand-pink/10 border border-brand-purple/20 p-6 rounded-xl flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-[10px] uppercase tracking-widest text-brand-teal font-extrabold flex items-center gap-1">
                    <DollarSign size={10} /> Live Estimate
                  </div>
                  
                  <span className="text-xs uppercase tracking-widest text-charcoal-400 font-bold mb-2 font-sans">Estimated Package Cost</span>
                  <motion.h3 
                    key={calculateTotal()}
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-purple to-brand-pink font-serif tracking-wide"
                  >
                    ₹{calculateTotal().toLocaleString()}
                  </motion.h3>
                  <p className="text-[9px] text-charcoal-500 font-light mt-4 leading-relaxed max-w-[200px] font-sans">
                    *Custom pricing tailored. Taxes and local permit fees computed during consultations.
                  </p>
                </div>

                {/* Itemized Selection Summary */}
                <div className="md:col-span-7 bg-charcoal-950/30 border border-white/[0.04] p-5 rounded-xl space-y-4 font-sans">
                  <span className="text-[10px] uppercase tracking-widest text-white font-extrabold block border-b border-white/[0.04] pb-2">
                    Planner Summary
                  </span>
                  
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto text-xs pr-1">
                    {/* Category summary */}
                    <div className="flex justify-between">
                      <span className="text-charcoal-400 font-light">Culture Vibe:</span>
                      <span className="text-white font-bold capitalize">{category} Wedding</span>
                    </div>

                    {/* Contact details summary */}
                    <div className="flex justify-between">
                      <span className="text-charcoal-400 font-light">Couple:</span>
                      <span className="text-white font-medium truncate max-w-[180px]">{fullName}</span>
                    </div>

                    {/* Venue & dates summary */}
                    <div className="flex justify-between">
                      <span className="text-charcoal-400 font-light">Dates:</span>
                      <span className="text-white font-medium text-right text-[11px]">
                        {weddingDate} &bull; {weddingVenue}
                      </span>
                    </div>

                    {/* Ceremony details summary */}
                    <div className="border-t border-white/[0.02] pt-2 mt-2 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-widest text-brand-teal font-bold block mb-1">Ceremonies Covered</span>
                      {Object.keys(events).filter(k => events[k].photo || events[k].video).map((k) => (
                        <div key={k} className="flex justify-between text-[11px] font-light">
                          <span className="text-charcoal-400 truncate max-w-[180px]">&bull; {EVENT_LABELS[k] || k}</span>
                          <span className="text-white text-[10px] uppercase font-bold">
                            {[events[k].photo && "Photo", events[k].video && "Video"].filter(Boolean).join(" & ")}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Deliverables summary */}
                    {Object.values(deliverables).some(Boolean) && (
                      <div className="border-t border-white/[0.02] pt-2 mt-2 space-y-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-brand-purple font-bold block mb-1">Deliverables Selection</span>
                        {Object.keys(deliverables).filter(k => deliverables[k as keyof DeliverableSelection]).map((k) => {
                          const labels: Record<keyof DeliverableSelection, string> = {
                            album1: "Premium Album 1",
                            album2: "Premium Album 2",
                            highlights1: "Highlights Film 1",
                            highlights2: "Highlights Film 2",
                            documentary: "Full Length Film",
                            reels: "Teaser Reels"
                          };
                          return (
                            <div key={k} className="text-charcoal-400 font-light text-[11px]">&bull; {labels[k as keyof DeliverableSelection]}</div>
                          );
                        })}
                      </div>
                    )}

                    {/* Additional Production summary */}
                    {Object.keys(additionalServices).some(dayKey => Object.values(additionalServices[dayKey]).some(Boolean)) && (
                      <div className="border-t border-white/[0.02] pt-2 mt-2 space-y-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-brand-pink font-bold block mb-1">Production Upgrades</span>
                        {Object.keys(additionalServices).map((dayKey) => {
                          const srv = additionalServices[dayKey];
                          const activeSrvs = [
                            srv.helicam && "Helicam",
                            srv.live && "Livestream",
                            srv.spotEdit && "Spot Video"
                          ].filter(Boolean);
                          if (activeSrvs.length === 0) return null;
                          return (
                            <div key={dayKey} className="flex justify-between text-[11px] font-light">
                              <span className="text-charcoal-400">&bull; {getServiceDayLabel(dayKey)}:</span>
                              <span className="text-white text-[10px]">{activeSrvs.join(", ")}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Wizard Bottom Navigation Controls */}
        <div className="flex justify-between pt-6 border-t border-white/[0.04]">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={handlePrevStep} 
              className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-white text-[10px] uppercase font-bold tracking-widest cursor-pointer hover:bg-white/[0.02] transition-colors rounded-lg font-sans"
            >
              <ArrowLeft size={12} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 7 ? (
            <button 
              type="button" 
              onClick={handleNextStep} 
              className="flex items-center gap-2 px-6 py-3 bg-brand-gradient hover:opacity-95 text-charcoal-950 text-[10px] uppercase font-extrabold tracking-widest cursor-pointer transition-opacity rounded-lg shadow-lg shadow-brand-purple/10 font-sans"
            >
              Next Step
              <ArrowRight size={12} />
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex items-center gap-2 px-8 py-3 bg-white text-charcoal-950 text-[10px] uppercase font-extrabold tracking-widest cursor-pointer hover:bg-neutral-100 transition-colors rounded-lg shadow-lg shadow-white/10 font-sans"
            >
              {isSubmitting ? "Recording Response..." : "Submit Consultation Request"}
              <Send size={12} />
            </button>
          )}
        </div>
      </form>

      {/* Success Popup Screen with Custom Confetti animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-charcoal-900/98 backdrop-blur-xl flex flex-col items-center justify-center p-8 z-40 text-center relative font-sans"
          >
            {/* Run Confetti Stream */}
            <CustomConfetti />

            <div className="relative z-10 max-w-md space-y-6">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center border border-brand-teal/30 text-brand-teal mx-auto"
              >
                <CheckCircle2 size={40} className="stroke-[1.5]" />
              </motion.div>
              
              <div className="space-y-2">
                <h4 className="font-serif text-3xl font-bold text-white tracking-wide">Planner Saved!</h4>
                <p className="text-xs text-charcoal-400 font-light">Greetings From Odd_One_Ads weddings team. Your romantic journey specifications have been successfully recorded.</p>
              </div>

              {/* Submitted summaries */}
              <div className="bg-charcoal-950/40 border border-white/[0.04] p-4 rounded-xl text-left text-[11px] text-charcoal-300 space-y-2 max-w-xs mx-auto">
                <div>
                  <span className="text-charcoal-500 font-medium uppercase tracking-wider block text-[8px]">Client Couple</span>
                  <span className="text-white font-bold">{fullName}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 font-medium uppercase tracking-wider block text-[8px]">Proposal Sent To</span>
                  <span className="text-white font-bold">{email}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 font-medium uppercase tracking-wider block text-[8px]">Phone Number</span>
                  <span className="text-white font-bold">{phone}</span>
                </div>
                <div className="border-t border-white/[0.02] pt-2 flex justify-between font-bold">
                  <span className="text-brand-teal">Calculated Estimate:</span>
                  <span className="text-white">₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[10px] text-charcoal-500 italic max-w-xs mx-auto">
                We will reach out to you within 24 hours to schedule an online alignment consultation and unwrap the details.
              </p>

              <button 
                onClick={resetAllFields} 
                className="px-8 py-3 bg-brand-gradient hover:opacity-90 text-charcoal-950 text-[10px] uppercase font-bold tracking-widest transition-opacity rounded-lg cursor-pointer inline-block"
              >
                Plan Another Wedding
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ContactSidebarSummaryProps {
  category: string;
  fullName: string;
  weddingDate: string;
  events: Record<string, EventSelection>;
  preWedding: PreWeddingSelection;
  deliverables: DeliverableSelection;
  additionalServices: Record<string, AdditionalService>;
  calculateTotal: () => number;
}

// Side dashboard panel showing current selections state
function ContactSidebarSummary({
  category,
  fullName,
  weddingDate,
  events,
  preWedding,
  deliverables,
  additionalServices,
  calculateTotal
}: ContactSidebarSummaryProps) {
  const selectedEventsCount = Object.values(events).filter(e => e.photo || e.video).length;
  
  const selectedPreWeddingCount = [
    preWedding.shoot1Photo, preWedding.shoot1Video,
    preWedding.shoot2Photo, preWedding.shoot2Video
  ].filter(Boolean).length;

  const selectedDeliverablesCount = Object.values(deliverables).filter(Boolean).length;

  let totalUpgradesCount = 0;
  Object.values(additionalServices).forEach(srv => {
    if (srv.helicam) totalUpgradesCount++;
    if (srv.live) totalUpgradesCount++;
    if (srv.spotEdit) totalUpgradesCount++;
  });

  return (
    <div className="lg:col-span-4 space-y-8 animate-fade-in font-sans">
      <div className="space-y-4">
        <span className="text-[10px] tracking-[0.4em] text-brand-teal uppercase font-extrabold block">
          Interactive Planner
        </span>
        <h1 className="font-serif text-4xl font-bold leading-tight text-white">Let&apos;s Tell Your Story</h1>
        <p className="text-xs text-charcoal-400 font-light leading-relaxed">
          Configure physical premium albums, aerial captures, live broadcasts, and multi-day photography timelines custom tailored to your tradition.
        </p>
      </div>

      {/* Visual Live Selection Widget */}
      {category && (
        <div className="bg-charcoal-900/60 border border-white/[0.04] p-5 rounded-2xl space-y-5 shadow-lg backdrop-blur-md">
          <span className="text-[9px] uppercase tracking-widest text-brand-purple font-extrabold block border-b border-white/[0.04] pb-2">
            Selection Status
          </span>
          
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between">
              <span className="text-charcoal-400">Wedding Style:</span>
              <span className="text-white font-bold uppercase">{category} Category</span>
            </div>

            {fullName && (
              <div className="flex justify-between">
                <span className="text-charcoal-400">Couple:</span>
                <span className="text-white font-medium truncate max-w-[150px]">{fullName}</span>
              </div>
            )}

            {weddingDate && (
              <div className="flex justify-between">
                <span className="text-charcoal-400">Wedding Date:</span>
                <span className="text-white font-medium text-[11px]">{weddingDate}</span>
              </div>
            )}

            <div className="border-t border-white/[0.02] pt-3 mt-3 grid grid-cols-2 gap-3 text-center">
              <div className="bg-charcoal-950/40 p-2 border border-white/[0.02] rounded-lg">
                <span className="block text-brand-teal font-black text-sm">{selectedEventsCount}</span>
                <span className="text-[8px] uppercase tracking-widest text-charcoal-500 block mt-0.5">Events</span>
              </div>
              <div className="bg-charcoal-950/40 p-2 border border-white/[0.02] rounded-lg">
                <span className="block text-brand-purple font-black text-sm">{selectedPreWeddingCount}</span>
                <span className="text-[8px] uppercase tracking-widest text-charcoal-500 block mt-0.5">Pre-Wed Sessions</span>
              </div>
              <div className="bg-charcoal-950/40 p-2 border border-white/[0.02] rounded-lg">
                <span className="block text-brand-pink font-black text-sm">{selectedDeliverablesCount}</span>
                <span className="text-[8px] uppercase tracking-widest text-charcoal-500 block mt-0.5">Deliverables</span>
              </div>
              <div className="bg-charcoal-950/40 p-2 border border-white/[0.02] rounded-lg">
                <span className="block text-brand-peach font-black text-sm">{totalUpgradesCount}</span>
                <span className="text-[8px] uppercase tracking-widest text-charcoal-500 block mt-0.5">Upgrades</span>
              </div>
            </div>

            <div className="border-t border-brand-purple/20 pt-4 mt-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 font-bold">Running Estimate</span>
              <motion.span 
                key={calculateTotal()}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-lg font-black text-white font-mono"
              >
                ₹{calculateTotal().toLocaleString()}
              </motion.span>
            </div>
          </div>
        </div>
      )}

      {/* Info panel */}
      <div className="flex gap-4 p-4 border border-white/[0.04] bg-charcoal-950/20 rounded-xl">
        <Info size={18} className="text-brand-teal flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bespoke Production</h4>
          <p className="text-[10px] text-charcoal-400 leading-relaxed font-light">
            Once submitted, your planner will be compiled into an itemized visual proposal by our directors. We limit bookings to 15 weddings per calendar season.
          </p>
        </div>
      </div>
    </div>
  );
}

// Client container passing state coordinates to sidebar and planner form
function ContactPlannerContainer() {
  const searchParams = useSearchParams();
  const initialVibe = searchParams.get("vibe");
  const initialType = searchParams.get("type");

  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [weddingVenue, setWeddingVenue] = useState("");
  const [hasEngagement, setHasEngagement] = useState(true);
  const [engagementDate, setEngagementDate] = useState("");
  const [engagementVenue, setEngagementVenue] = useState("");
  const [events, setEvents] = useState<Record<string, EventSelection>>({});
  
  const [preWedding, setPreWedding] = useState<PreWeddingSelection>({
    shoot1Photo: false,
    shoot1Video: false,
    shoot2Photo: false,
    shoot2Video: false
  });
  
  const [deliverables, setDeliverables] = useState<DeliverableSelection>({
    album1: false,
    album2: false,
    highlights1: false,
    highlights2: false,
    documentary: false,
    reels: false
  });
  
  const [additionalServices, setAdditionalServices] = useState<Record<string, AdditionalService>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Reset fields function
  const resetAllFields = () => {
    setShowSuccess(false);
    setStep(1);
    setCategory("");
    setFullName("");
    setEmail("");
    setPhone("");
    setWeddingDate("");
    setWeddingVenue("");
    setEngagementDate("");
    setEngagementVenue("");
    setPreWedding({
      shoot1Photo: false,
      shoot1Video: false,
      shoot2Photo: false,
      shoot2Video: false
    });
    setDeliverables({
      album1: false,
      album2: false,
      highlights1: false,
      highlights2: false,
      documentary: false,
      reels: false
    });
    setErrors([]);
  };

  useEffect(() => {
    if (!category) return;
    
    let eventList: string[] = [];
    let serviceDaysList: string[] = [];
    
    if (category === "christian") {
      eventList = ["betrothal-eve", "betrothal-day-bride", "betrothal-day-groom", "wedding-eve", "wedding-day-bride", "wedding-day-groom"];
      serviceDaysList = ["betrothal-eve", "betrothal-day", "wedding-eve", "wedding-day"];
    } else if (category === "hindu") {
      eventList = ["haldi-day", "mehendi-eve", "sangeet-eve", "wedding-day", "reception-day"];
      serviceDaysList = ["mehendi-eve", "sangeet-eve", "wedding-day", "reception-day"];
    } else if (category === "muslim") {
      eventList = ["mylanchi-eve", "bride-eve", "groom-eve", "nikkah-day", "muslim-reception"];
      serviceDaysList = ["mylanchi-eve", "bride-eve", "nikkah-day", "muslim-reception"];
    }
    
    const initialEvents: Record<string, EventSelection> = {};
    eventList.forEach((evt) => {
      const isMainDay = evt.includes("wedding-day") || evt.includes("nikkah") || evt === "wedding-day-bride" || evt === "wedding-day-groom";
      initialEvents[evt] = { photo: isMainDay, video: isMainDay };
    });
    setEvents(initialEvents);

    const initialServices: Record<string, AdditionalService> = {};
    serviceDaysList.forEach((day) => {
      initialServices[day] = { helicam: false, live: false, spotEdit: false };
    });
    setAdditionalServices(initialServices);
  }, [category]);

  useEffect(() => {
    if (initialType) {
      if (["christian", "hindu", "muslim"].includes(initialType.toLowerCase())) {
        setCategory(initialType.toLowerCase());
        setStep(2);
      }
    } else if (initialVibe) {
      if (initialVibe === "ethereal-dreamer") setCategory("christian");
      else if (initialVibe === "raw-storyteller") setCategory("hindu");
      else if (initialVibe === "cinematic-luxury" || initialVibe === "modern-editorial") setCategory("muslim");
      setStep(2);
    }
  }, [initialVibe, initialType]);

  const handleEventToggle = (evtKey: string, type: "photo" | "video") => {
    setEvents((prev) => ({
      ...prev,
      [evtKey]: {
        ...prev[evtKey],
        [type]: !prev[evtKey][type]
      }
    }));
  };

  const handleServiceToggle = (dayKey: string, service: keyof AdditionalService) => {
    setAdditionalServices((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [service]: !prev[dayKey][service]
      }
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    
    Object.values(events).forEach((evt) => {
      if (evt.photo) total += 15000;
      if (evt.video) total += 18000;
    });

    if (preWedding.shoot1Photo) total += 20000;
    if (preWedding.shoot1Video) total += 25000;
    if (preWedding.shoot2Photo) total += 20000;
    if (preWedding.shoot2Video) total += 25000;

    if (deliverables.album1) total += 12000;
    if (deliverables.album2) total += 10000;
    if (deliverables.highlights1) total += 15000;
    if (deliverables.highlights2) total += 12000;
    if (deliverables.documentary) total += 25000;
    if (deliverables.reels) total += 5000;

    Object.values(additionalServices).forEach((srv) => {
      if (srv.helicam) total += 12000;
      if (srv.live) total += 10000;
      if (srv.spotEdit) total += 15000;
    });

    return total;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
      {!showSuccess && (
        <ContactSidebarSummary 
          category={category}
          fullName={fullName}
          weddingDate={weddingDate}
          events={events}
          preWedding={preWedding}
          deliverables={deliverables}
          additionalServices={additionalServices}
          calculateTotal={calculateTotal}
        />
      )}
      <div className={showSuccess ? "lg:col-span-12 w-full flex justify-center" : "lg:col-span-8"}>
        <ContactPlannerForm 
          step={step}
          setStep={setStep}
          category={category}
          setCategory={setCategory}
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          weddingDate={weddingDate}
          setWeddingDate={setWeddingDate}
          weddingVenue={weddingVenue}
          setWeddingVenue={setWeddingVenue}
          hasEngagement={hasEngagement}
          setHasEngagement={setHasEngagement}
          engagementDate={engagementDate}
          setEngagementDate={setEngagementDate}
          engagementVenue={engagementVenue}
          setEngagementVenue={setEngagementVenue}
          events={events}
          preWedding={preWedding}
          setPreWedding={setPreWedding}
          deliverables={deliverables}
          setDeliverables={setDeliverables}
          additionalServices={additionalServices}
          calculateTotal={calculateTotal}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          errors={errors}
          setErrors={setErrors}
          handleEventToggle={handleEventToggle}
          handleServiceToggle={handleServiceToggle}
          resetAllFields={resetAllFields}
        />
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-charcoal-950 text-white font-sans relative overflow-hidden">
      {/* Decorative Blur Background Graphic */}
      <div className="absolute top-[20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-brand-pink/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-brand-teal/5 blur-[120px] pointer-events-none -z-10" />
      
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-6 text-center py-20 text-charcoal-400 text-xs tracking-widest uppercase">
          Loading Booking Wizard...
        </div>
      }>
        <ContactPlannerContainer />
      </Suspense>
    </div>
  );
}
