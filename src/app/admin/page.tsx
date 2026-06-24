"use client";

import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  Trash2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Share2, 
  Download, 
  Printer, 
  TrendingUp, 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Check,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types matching planner schema
interface EventSelection {
  photo: boolean;
  video: boolean;
}

interface AdditionalService {
  helicam: boolean;
  live: boolean;
  spotEdit: boolean;
}

interface PreWeddingSelection {
  shoot1Photo: boolean;
  shoot1Video: boolean;
  shoot2Photo: boolean;
  shoot2Video: boolean;
}

interface DeliverableSelection {
  album1: boolean;
  album2: boolean;
  highlights1: boolean;
  highlights2: boolean;
  documentary: boolean;
  reels: boolean;
}

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  weddingVenue: string;
  hasEngagement: boolean;
  engagementDate: string;
  engagementVenue: string;
  category: string;
  events: Record<string, EventSelection>;
  preWedding: PreWeddingSelection;
  deliverables: DeliverableSelection;
  additionalServices: Record<string, AdditionalService>;
  totalPrice: number;
  createdAt: string;
}

// Display labels mapping for events
const EVENT_LABELS: Record<string, string> = {
  "betrothal-eve": "Betrothal Eve",
  "betrothal-day-bride": "Betrothal Day (Bride)",
  "betrothal-day-groom": "Betrothal Day (Groom)",
  "wedding-eve": "Wedding Eve",
  "wedding-day-bride": "Wedding Day (Bride)",
  "wedding-day-groom": "Wedding Day (Groom)",
  "haldi-day": "Haldi Ceremony",
  "mehendi-eve": "Mehendi Eve",
  "sangeet-eve": "Sangeet & Dance Eve",
  "wedding-day": "Wedding Ceremony (Muhurtham)",
  "reception-day": "Wedding Reception Day",
  "mylanchi-eve": "Mylanchi (Mehendi) Eve",
  "bride-eve": "Bride's Eve / Salkaram",
  "groom-eve": "Groom's Eve / Salkaram",
  "nikkah-day": "Nikkah Day Ceremony",
  "muslim-reception": "Wedding Reception Party"
};

export default function AdminPortal() {
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Bookings list state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  // Hydration safeguard and session auth check
  useEffect(() => {
    setMounted(true);
    const logged = sessionStorage.getItem("admin_logged") === "true";
    setIsLogged(logged);
  }, []);

  // Seed sample mock data on first load if localStorage database is empty
  useEffect(() => {
    if (!mounted) return;
    const existing = localStorage.getItem("oddone_bookings");
    if (!existing || JSON.parse(existing).length === 0) {
      const mockBookings: Booking[] = [
        {
          id: "book-mock-1",
          fullName: "Maria & Joseph",
          email: "maria.joseph@gmail.com",
          phone: "+919497381830",
          weddingDate: "2026-11-20",
          weddingVenue: "St. Mary's Cathedral, Ernakulam",
          hasEngagement: true,
          engagementDate: "2026-11-18",
          engagementVenue: "Grand Lakeside Pavilions, Kumarakom",
          category: "christian",
          events: {
            "betrothal-eve": { photo: true, video: true },
            "betrothal-day-bride": { photo: true, video: false },
            "betrothal-day-groom": { photo: false, video: true },
            "wedding-eve": { photo: true, video: true },
            "wedding-day-bride": { photo: true, video: true },
            "wedding-day-groom": { photo: true, video: true }
          },
          preWedding: {
            shoot1Photo: true,
            shoot1Video: true,
            shoot2Photo: false,
            shoot2Video: false
          },
          deliverables: {
            album1: true,
            album2: true,
            highlights1: true,
            highlights2: false,
            documentary: true,
            reels: true
          },
          additionalServices: {
            "betrothal-eve": { helicam: false, live: true, spotEdit: false },
            "betrothal-day": { helicam: false, live: false, spotEdit: false },
            "wedding-eve": { helicam: false, live: false, spotEdit: false },
            "wedding-day": { helicam: true, live: true, spotEdit: true }
          },
          totalPrice: 284000,
          createdAt: "2026-06-24T12:00:00.000Z"
        },
        {
          id: "book-mock-2",
          fullName: "Shruti & Rohan",
          email: "shruti.rohan@yahoo.com",
          phone: "+919876543210",
          weddingDate: "2026-12-15",
          weddingVenue: "City Palace, Udaipur",
          hasEngagement: false,
          engagementDate: "",
          engagementVenue: "",
          category: "hindu",
          events: {
            "haldi-day": { photo: true, video: false },
            "mehendi-eve": { photo: true, video: true },
            "sangeet-eve": { photo: true, video: true },
            "wedding-day": { photo: true, video: true },
            "reception-day": { photo: true, video: true }
          },
          preWedding: {
            shoot1Photo: true,
            shoot1Video: false,
            shoot2Photo: false,
            shoot2Video: false
          },
          deliverables: {
            album1: true,
            album2: false,
            highlights1: true,
            highlights2: false,
            documentary: false,
            reels: true
          },
          additionalServices: {
            "mehendi-eve": { helicam: false, live: false, spotEdit: false },
            "sangeet-eve": { helicam: false, live: false, spotEdit: false },
            "wedding-day": { helicam: true, live: false, spotEdit: false },
            "reception-day": { helicam: false, live: true, spotEdit: false }
          },
          totalPrice: 198000,
          createdAt: "2026-06-23T15:30:00.000Z"
        },
        {
          id: "book-mock-3",
          fullName: "Aisha & Kabir",
          email: "aisha.kabir@outlook.com",
          phone: "+971501234567",
          weddingDate: "2027-01-08",
          weddingVenue: "Burj Al Arab Ballroom, Dubai",
          hasEngagement: true,
          engagementDate: "2027-01-06",
          engagementVenue: "Jumeirah Beach Resort, Dubai",
          category: "muslim",
          events: {
            "mylanchi-eve": { photo: true, video: true },
            "bride-eve": { photo: true, video: true },
            "groom-eve": { photo: true, video: true },
            "nikkah-day": { photo: true, video: true },
            "muslim-reception": { photo: true, video: true }
          },
          preWedding: {
            shoot1Photo: true,
            shoot1Video: true,
            shoot2Photo: true,
            shoot2Video: true
          },
          deliverables: {
            album1: true,
            album2: true,
            highlights1: true,
            highlights2: true,
            documentary: true,
            reels: true
          },
          additionalServices: {
            "mylanchi-eve": { helicam: false, live: false, spotEdit: false },
            "bride-eve": { helicam: false, live: false, spotEdit: false },
            "nikkah-day": { helicam: true, live: true, spotEdit: false },
            "muslim-reception": { helicam: false, live: true, spotEdit: true }
          },
          totalPrice: 322000,
          createdAt: "2026-06-22T08:45:00.000Z"
        }
      ];
      localStorage.setItem("oddone_bookings", JSON.stringify(mockBookings));
      setBookings(mockBookings);
    } else {
      setBookings(JSON.parse(existing));
    }
  }, [mounted]);

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "nikhil" && password === "nikhil@123") {
      sessionStorage.setItem("admin_logged", "true");
      setIsLogged(true);
      setLoginError("");
    } else {
      setLoginError("Invalid admin credentials. Please try again.");
    }
  };

  // Sign out handler
  const handleSignOut = () => {
    sessionStorage.removeItem("admin_logged");
    setIsLogged(false);
    setUsername("");
    setPassword("");
  };

  // Delete booking handler
  const handleDeleteBooking = (id: string) => {
    if (!confirm("Are you sure you want to delete this booking entry?")) return;
    const list = bookings.filter((b) => b.id !== id);
    setBookings(list);
    localStorage.setItem("oddone_bookings", JSON.stringify(list));
    if (expandedId === id) setExpandedId(null);
  };

  // Calculates stats metrics
  const getAnalytics = () => {
    const total = bookings.length;
    const revenue = bookings.reduce((sum, item) => sum + item.totalPrice, 0);
    const christian = bookings.filter(b => b.category === "christian").length;
    const hindu = bookings.filter(b => b.category === "hindu").length;
    const muslim = bookings.filter(b => b.category === "muslim").length;
    return { total, revenue, christian, hindu, muslim };
  };

  const stats = getAnalytics();

  // Export spreadsheet as BOM-prefixed CSV (Excel readable)
  const handleExportCSV = () => {
    let csvContent = "ID,Couple Name,Email,Phone,Category,Wedding Date,Wedding Venue,Engagement Date,Engagement Venue,Events Covered,Pre-Wedding Sessions,Deliverables,Additional Upgrades,Estimated Quote (INR),Created At\r\n";
    
    bookings.forEach((b) => {
      // 1. Events Covered details compiler
      const activeEvts: string[] = [];
      Object.keys(b.events).forEach((key) => {
        const s = b.events[key];
        const items = [];
        if (s.photo) items.push("Photo");
        if (s.video) items.push("Video");
        if (items.length > 0) {
          activeEvts.push(`${EVENT_LABELS[key] || key} (${items.join(" & ")})`);
        }
      });
      const eventsStr = activeEvts.join(" | ");

      // 2. Pre-Wedding Sessions compiler
      const activePreWeds = [];
      if (b.preWedding.shoot1Photo) activePreWeds.push("Shoot 1 Photo");
      if (b.preWedding.shoot1Video) activePreWeds.push("Shoot 1 Video");
      if (b.preWedding.shoot2Photo) activePreWeds.push("Shoot 2 Photo");
      if (b.preWedding.shoot2Video) activePreWeds.push("Shoot 2 Video");
      const preWedsStr = activePreWeds.join(" | ");

      // 3. Deliverables selections compiler
      const activeDelivs: string[] = [];
      const delivLabels: Record<string, string> = {
        album1: "Premium Album 1",
        album2: "Premium Album 2",
        highlights1: "Highlights Film 1",
        highlights2: "Highlights Film 2",
        documentary: "Full Film",
        reels: "Teaser Reels"
      };
      Object.keys(b.deliverables).forEach((k) => {
        if (b.deliverables[k as keyof DeliverableSelection]) {
          activeDelivs.push(delivLabels[k] || k);
        }
      });
      const delivsStr = activeDelivs.join(" | ");

      // 4. Additional Upgrades matrix compiler
      const activeUpgrades: string[] = [];
      Object.keys(b.additionalServices).forEach((dayKey) => {
        const srv = b.additionalServices[dayKey];
        const dayLabel = getServiceDayLabel(dayKey);
        if (srv.helicam) activeUpgrades.push(`Helicam on ${dayLabel}`);
        if (srv.live) activeUpgrades.push(`YouTube Live on ${dayLabel}`);
        if (srv.spotEdit) activeUpgrades.push(`Spot Edit on ${dayLabel}`);
      });
      const upgradesStr = activeUpgrades.join(" | ");

      const row = [
        b.id,
        `"${b.fullName.replace(/"/g, '""')}"`,
        b.email,
        `"${b.phone}"`,
        b.category,
        b.weddingDate,
        `"${b.weddingVenue.replace(/"/g, '""')}"`,
        b.hasEngagement ? b.engagementDate : "N/A",
        b.hasEngagement ? `"${b.engagementVenue.replace(/"/g, '""')}"` : "N/A",
        `"${eventsStr.replace(/"/g, '""')}"`,
        `"${preWedsStr.replace(/"/g, '""')}"`,
        `"${delivsStr.replace(/"/g, '""')}"`,
        `"${upgradesStr.replace(/"/g, '""')}"`,
        b.totalPrice,
        b.createdAt
      ].join(",");
      csvContent += row + "\r\n";
    });

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `oddone_bookings_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper formatting for printing/PDF trigger
  const handlePrint = (id: string | null) => {
    if (id) {
      setExpandedId(id);
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  // Build template share to WhatsApp
  const handleWhatsAppShare = (b: Booking) => {
    const categoriesDisplay: Record<string, string> = {
      christian: "Christian Wedding",
      hindu: "Hindu Wedding",
      muslim: "Muslim Wedding"
    };

    let msg = `*ODD_ONE_ADS WEDDINGS - BOOKING SUMMARY*\n`;
    msg += `-------------------------------------------\n`;
    msg += `*Couple Name:* ${b.fullName}\n`;
    msg += `*Vibe Category:* ${categoriesDisplay[b.category] || b.category}\n`;
    msg += `*Email Address:* ${b.email}\n`;
    msg += `*Phone Contact:* ${b.phone}\n`;
    msg += `*Wedding Date:* ${b.weddingDate}\n`;
    msg += `*Wedding Venue:* ${b.weddingVenue}\n`;
    
    if (b.hasEngagement) {
      msg += `*Engagement Date:* ${b.engagementDate}\n`;
      msg += `*Engagement Venue:* ${b.engagementVenue}\n`;
    }
    
    msg += `-------------------------------------------\n`;
    msg += `*Estimated Quotation Total:* ₹${b.totalPrice.toLocaleString()}\n`;
    msg += `*Generated On:* ${new Date(b.createdAt).toLocaleDateString()}\n`;
    msg += `\nThank you for choosing Odd_One_Ads. Timeless stories captured.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  // Build dynamic helper text representing event matrix checks
  const renderCheckSummary = (b: Booking) => {
    const list: string[] = [];
    Object.keys(b.events).forEach(key => {
      const selection = b.events[key];
      const items: string[] = [];
      if (selection.photo) items.push("Photo");
      if (selection.video) items.push("Video");
      if (items.length > 0) {
        list.push(`${EVENT_LABELS[key] || key} (${items.join(" & ")})`);
      }
    });
    return list;
  };

  // Filter bookings list
  const filteredBookings = bookings.filter((b) => {
    if (activeCategoryFilter === "all") return true;
    return b.category === activeCategoryFilter;
  });

  // Render loading safe page if not mounted yet
  if (!mounted) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-charcoal-950 flex items-center justify-center text-charcoal-400 text-xs tracking-widest uppercase font-sans">
        Loading Staff Portal...
      </div>
    );
  }

  // 1. LOGIN SCREEN CONTAINER
  if (!isLogged) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-charcoal-950 flex items-center justify-center px-6 relative overflow-hidden font-sans">
        {/* Background glow graphics */}
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-pink/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-teal/5 blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-charcoal-900/60 border border-white/[0.04] p-8 md:p-10 rounded-2xl backdrop-blur-xl shadow-2xl relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-brand-purple/10 border border-brand-purple/20 rounded-full flex items-center justify-center text-brand-purple mx-auto mb-4">
              <Lock size={20} className="stroke-[1.8]" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-white">Staff Login</h1>
            <p className="text-[11px] text-charcoal-400 font-light mt-1.5 uppercase tracking-widest">ODD_ONE_ADS Weddings Admin</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {loginError && (
              <div className="bg-brand-pink/10 border border-brand-pink/20 p-3 rounded-lg flex items-center gap-2 text-xs text-brand-pink">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-charcoal-400 font-bold mb-2">Username</label>
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. nikhil"
                className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-lg px-3.5 py-3 text-xs text-white placeholder-charcoal-500 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-charcoal-400 font-bold mb-2">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-charcoal-950/40 border border-white/[0.08] rounded-lg px-3.5 py-3 text-xs text-white placeholder-charcoal-500 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 focus:outline-none transition-colors"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-brand-gradient hover:opacity-95 text-charcoal-950 text-[11px] uppercase tracking-widest font-black transition-opacity rounded-lg shadow-lg shadow-brand-purple/10 flex items-center justify-center gap-2 cursor-pointer mt-3 font-sans"
            >
              Authenticate login <Unlock size={12} className="stroke-[2.5]" />
            </button>
          </form>

          <div className="mt-8 text-center text-[10px] text-charcoal-500 border-t border-white/[0.04] pt-4 font-light">
            Demo Credentials: <span className="text-charcoal-400 font-semibold font-mono">nikhil / nikhil@123</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. MAIN ADMIN PORTAL DASHBOARD
  return (
    <div className="pt-32 pb-24 min-h-screen bg-charcoal-950 text-white relative overflow-hidden font-sans print:bg-white print:text-black print:pt-4 print:pb-4">
      {/* Decorative ambient blur vectors (hidden during printing) */}
      <div className="absolute top-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none -z-10 print:hidden" />
      <div className="absolute bottom-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-brand-teal/5 blur-[120px] pointer-events-none -z-10 print:hidden" />

      {/* A. PRINT ONLY INVOICE / RECEIPT GENERATOR CONTAINER */}
      <div className="hidden print:block max-w-4xl mx-auto p-4 bg-white text-black font-sans leading-relaxed">
        {expandedId ? (
          // Print single detailed receipt/invoice
          (() => {
            const selected = bookings.find(b => b.id === expandedId);
            if (!selected) return null;
            return (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b-2 border-black pb-4">
                  <div>
                    <h1 className="font-serif text-3xl font-bold tracking-wider">ODD_ONE_ADS</h1>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-semibold block mt-0.5">PHOTOGRAPHY & WEDDING FILMS</span>
                  </div>
                  <div className="text-right">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-700">Booking Invoice</h2>
                    <span className="text-xs text-neutral-500 block">ID: {selected.id}</span>
                    <span className="text-[10px] text-neutral-400 block">Date: {new Date(selected.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-xs">
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-neutral-500 border-b pb-1 mb-2">Customer Details</h4>
                    <p className="font-bold text-sm">{selected.fullName}</p>
                    <p>Email: {selected.email}</p>
                    <p>Phone: {selected.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-neutral-500 border-b pb-1 mb-2">Ceremony Specifications</h4>
                    <p className="capitalize">Style: {selected.category} Wedding</p>
                    <p>Wedding Date: {selected.weddingDate}</p>
                    <p>Wedding Venue: {selected.weddingVenue}</p>
                    {selected.hasEngagement && (
                      <>
                        <p>Engagement Date: {selected.engagementDate}</p>
                        <p>Engagement Venue: {selected.engagementVenue}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Table details item list */}
                <div className="pt-4">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-neutral-300 font-bold uppercase text-[9px] tracking-wider">
                        <th className="py-2">Description of Services</th>
                        <th className="py-2 text-right">Demo Rate (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Events listed */}
                      {Object.keys(selected.events).map((key) => {
                        const sel = selected.events[key];
                        if (!sel.photo && !sel.video) return null;
                        const services = [];
                        let rate = 0;
                        if (sel.photo) { services.push("Photography"); rate += 15000; }
                        if (sel.video) { services.push("Videography"); rate += 18000; }
                        return (
                          <tr key={key} className="border-b border-neutral-100">
                            <td className="py-2.5 font-medium">{EVENT_LABELS[key] || key} coverage - <span className="text-neutral-500 font-light italic">{services.join(" & ")}</span></td>
                            <td className="py-2.5 text-right">₹{rate.toLocaleString()}</td>
                          </tr>
                        );
                      })}

                      {/* Prewedding listed */}
                      {selected.preWedding.shoot1Photo && (
                        <tr className="border-b border-neutral-100">
                          <td className="py-2.5 font-medium">Pre-Wedding Session 1 (Photography)</td>
                          <td className="py-2.5 text-right">₹20,000</td>
                        </tr>
                      )}
                      {selected.preWedding.shoot1Video && (
                        <tr className="border-b border-neutral-100">
                          <td className="py-2.5 font-medium">Pre-Wedding Session 1 (Videography)</td>
                          <td className="py-2.5 text-right">₹25,000</td>
                        </tr>
                      )}
                      {selected.preWedding.shoot2Photo && (
                        <tr className="border-b border-neutral-100">
                          <td className="py-2.5 font-medium">Pre-Wedding Session 2 (Photography)</td>
                          <td className="py-2.5 text-right">₹20,000</td>
                        </tr>
                      )}
                      {selected.preWedding.shoot2Video && (
                        <tr className="border-b border-neutral-100">
                          <td className="py-2.5 font-medium">Pre-Wedding Session 2 (Videography)</td>
                          <td className="py-2.5 text-right">₹25,000</td>
                        </tr>
                      )}

                      {/* Deliverables listed */}
                      {Object.keys(selected.deliverables).filter(k => selected.deliverables[k as keyof DeliverableSelection]).map((k) => {
                        const deliverableLabels: Record<string, string> = {
                          album1: "Premium Custom Album Book 1",
                          album2: "Premium Custom Album Book 2",
                          highlights1: "Cinema Highlights Cut Video (3 to 7 Min) - 1",
                          highlights2: "Cinema Highlights Cut Video (3 to 7 Min) - 2",
                          documentary: "Full Length Film Documentary (30 to 45 Min)",
                          reels: "Teaser Instagram Reels (30 Sec)"
                        };
                        const rates: Record<string, number> = {
                          album1: 12000,
                          album2: 10000,
                          highlights1: 15000,
                          highlights2: 12000,
                          documentary: 25000,
                          reels: 5000
                        };
                        return (
                          <tr key={k} className="border-b border-neutral-100">
                            <td className="py-2.5 font-medium">{deliverableLabels[k] || k}</td>
                            <td className="py-2.5 text-right">₹{rates[k].toLocaleString()}</td>
                          </tr>
                        );
                      })}

                      {/* Upgrades listed */}
                      {Object.keys(selected.additionalServices).map((dayKey) => {
                        const srv = selected.additionalServices[dayKey];
                        const rows = [];
                        if (srv.helicam) rows.push({ label: "Helicam swept", rate: 12000 });
                        if (srv.live) rows.push({ label: "YouTube Livestream", rate: 10000 });
                        if (srv.spotEdit) rows.push({ label: "Same Day Spot Video edit", rate: 15000 });
                        
                        return rows.map((r, i) => (
                          <tr key={`${dayKey}-${i}`} className="border-b border-neutral-100">
                            <td className="py-2.5 font-medium">{r.label} on {getServiceDayLabel(dayKey)}</td>
                            <td className="py-2.5 text-right">₹{r.rate.toLocaleString()}</td>
                          </tr>
                        ));
                      })}

                      {/* Total */}
                      <tr className="border-t-2 border-black font-extrabold text-sm">
                        <td className="py-4">Grand Total Invoice (Calculated Demo)</td>
                        <td className="py-4 text-right text-lg">₹{selected.totalPrice.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-10 text-[10px] text-neutral-400 text-center border-t border-neutral-100 font-light">
                  This invoice has been programmatically generated from the ODD_ONE_ADS Weddings client portal. Estimates are subject to adjustments pending final location permit reviews.
                </div>
              </div>
            );
          })()
        ) : (
          // Print full listing summary
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="text-2xl font-bold">ODD_ONE_ADS WEDDINGS</h1>
                <span className="text-[10px] text-neutral-500">STAFF ALL BOOKINGS SUMMARY</span>
              </div>
              <span className="text-xs text-neutral-500">Date: {new Date().toLocaleDateString()}</span>
            </div>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-300 font-bold uppercase text-[9px] tracking-wider">
                  <th className="py-2">Couple Name</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Wedding Date & Venue</th>
                  <th className="py-2">Contact Details</th>
                  <th className="py-2 text-right">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-neutral-100 py-3">
                    <td className="py-3 font-bold">{b.fullName}</td>
                    <td className="py-3 capitalize">{b.category}</td>
                    <td className="py-3">
                      <span className="block font-medium">{b.weddingDate}</span>
                      <span className="text-neutral-500 text-[10px] block">{b.weddingVenue}</span>
                    </td>
                    <td className="py-3">
                      <span className="block">{b.email}</span>
                      <span className="text-neutral-500 block">{b.phone}</span>
                    </td>
                    <td className="py-3 text-right font-bold">₹{b.totalPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* B. MAIN CORE WORKSPACE DASHBOARD (Hidden during printing) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 print:hidden">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-white/[0.04] pb-6">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-brand-teal uppercase font-extrabold block">Management panel</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mt-1">Bookings Dashboard</h1>
            <p className="text-xs text-charcoal-400 font-light mt-1">Check client planner responses, review estimated rates, and dispatch summaries.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              type="button" 
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-brand-teal hover:text-brand-teal text-[10px] uppercase font-bold tracking-widest transition-colors cursor-pointer rounded-lg font-sans"
            >
              <Download size={12} />
              Export Spreadsheet
            </button>
            
            <button 
              type="button" 
              onClick={() => handlePrint(null)}
              className="flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-brand-pink hover:text-brand-pink text-[10px] uppercase font-bold tracking-widest transition-colors cursor-pointer rounded-lg font-sans"
            >
              <Printer size={12} />
              Print Summary PDF
            </button>

            <button 
              type="button" 
              onClick={handleSignOut}
              className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-neutral-100 text-charcoal-950 text-[10px] uppercase font-extrabold tracking-widest transition-colors cursor-pointer rounded-lg font-sans"
            >
              Log Out Staff
            </button>
          </div>
        </div>

        {/* Analytics stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {/* Total bookings card */}
          <div className="bg-charcoal-900/60 border border-white/[0.04] p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group hover:border-brand-purple/20 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center flex-shrink-0">
              <Users size={18} />
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-charcoal-500 font-bold">Total Clients</span>
              <span className="block font-serif text-2xl font-bold text-white mt-0.5">{stats.total}</span>
            </div>
          </div>

          {/* Revenue projected card */}
          <div className="bg-charcoal-900/60 border border-white/[0.04] p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group hover:border-brand-teal/20 transition-colors sm:col-span-2 lg:col-span-2">
            <div className="w-10 h-10 rounded-lg bg-brand-teal/10 border border-brand-teal/20 text-brand-teal flex items-center justify-center flex-shrink-0">
              <TrendingUp size={18} />
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-charcoal-500 font-bold">Projected Income (Demo)</span>
              <span className="block font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple mt-0.5">₹{stats.revenue.toLocaleString()}</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="bg-charcoal-900/60 border border-white/[0.04] p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group hover:border-brand-pink/20 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-brand-pink/10 border border-brand-pink/20 text-brand-pink flex items-center justify-center flex-shrink-0 font-serif font-bold text-sm">
              ✙
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-charcoal-500 font-bold">Christian</span>
              <span className="block font-serif text-2xl font-bold text-white mt-0.5">{stats.christian}</span>
            </div>
          </div>

          <div className="bg-charcoal-900/60 border border-white/[0.04] p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group hover:border-brand-peach/20 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-brand-peach/10 border border-brand-peach/20 text-brand-peach flex items-center justify-center flex-shrink-0 font-serif font-bold text-sm">
              ॐ
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-charcoal-500 font-bold">Hindu / Muslim</span>
              <span className="block font-serif text-2xl font-bold text-white mt-0.5">{stats.hindu + stats.muslim}</span>
            </div>
          </div>
        </div>

        {/* Categories Tab Filter toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All Categories" },
              { id: "christian", label: "Christian" },
              { id: "hindu", label: "Hindu" },
              { id: "muslim", label: "Muslim" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveCategoryFilter(tab.id); setExpandedId(null); }}
                className={`px-4 py-2 text-[9px] uppercase tracking-wider font-bold rounded-lg cursor-pointer transition-colors border ${
                  activeCategoryFilter === tab.id
                    ? "bg-brand-teal/10 border-brand-teal text-brand-teal"
                    : "bg-charcoal-900/40 border-white/[0.04] text-charcoal-400 hover:border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-charcoal-500 uppercase tracking-widest font-light">Showing {filteredBookings.length} entries</span>
        </div>

        {/* C. BOOKINGS LIST GRID */}
        {filteredBookings.length === 0 ? (
          <div className="bg-charcoal-900/30 border border-white/[0.04] p-12 text-center rounded-2xl">
            <FileText size={40} className="text-charcoal-500 mx-auto mb-4 stroke-[1.2]" />
            <h4 className="font-serif text-lg font-bold text-white mb-2">No bookings matching filter</h4>
            <p className="text-xs text-charcoal-400 font-light max-w-xs mx-auto">Create a new booking by filling out the form on the Contact page!</p>
          </div>
        ) : (
          <div className="space-y-4 font-sans">
            <AnimatePresence>
              {filteredBookings.map((b) => {
                const isExpanded = expandedId === b.id;
                const cleanPhone = b.phone.replace(/[^0-9+]/g, "");
                
                return (
                  <motion.div 
                    key={b.id}
                    layout="position"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-charcoal-900/60 border rounded-2xl overflow-hidden transition-all duration-300 relative ${
                      isExpanded 
                        ? "border-brand-purple/40 shadow-xl shadow-brand-purple/5" 
                        : "border-white/[0.04] hover:border-white/10"
                    }`}
                  >
                    {/* Basic Row Overview (Click to toggle expansion) */}
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : b.id)}
                      className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.01] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-charcoal-950/80 border border-white/[0.04] flex items-center justify-center text-sm font-serif font-black flex-shrink-0">
                          {b.category === "christian" && "✙"}
                          {b.category === "hindu" && "ॐ"}
                          {b.category === "muslim" && "☪"}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                            {b.fullName}
                          </h3>
                          <p className="text-[10px] text-charcoal-500 font-light tracking-wide flex items-center gap-1.5 uppercase mt-0.5 font-sans">
                            <span className="text-brand-teal font-extrabold">{b.category} wedding</span> &bull; 
                            <Calendar size={10} /> {b.weddingDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right md:block hidden">
                          <span className="block text-[9px] uppercase tracking-widest text-charcoal-500 font-bold">Estimated Cost</span>
                          <span className="block font-mono text-white font-black text-sm">₹{b.totalPrice.toLocaleString()}</span>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-charcoal-950 flex items-center justify-center text-charcoal-400 hover:text-white transition-colors border border-white/[0.04]">
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Card Expanded Segment */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="border-t border-white/[0.04] bg-charcoal-950/20 overflow-hidden font-sans"
                        >
                          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-light">
                            {/* Left details grid */}
                            <div className="md:col-span-8 space-y-6">
                              {/* Contact & Venues details */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-charcoal-950/40 p-4 border border-white/[0.02] rounded-xl">
                                <div className="space-y-2.5">
                                  <span className="text-[9px] uppercase tracking-wider text-brand-teal font-extrabold block">Client Contacts</span>
                                  <div>
                                    <span className="text-charcoal-500 block text-[10px]">Email Address</span>
                                    <span className="text-white font-medium block">{b.email}</span>
                                  </div>
                                  <div>
                                    <span className="text-charcoal-500 block text-[10px]">Phone Contact</span>
                                    <span className="text-white font-medium block">{b.phone}</span>
                                  </div>
                                </div>
                                <div className="space-y-2.5">
                                  <span className="text-[9px] uppercase tracking-wider text-brand-purple font-extrabold block">Event Venues</span>
                                  <div>
                                    <span className="text-charcoal-500 block text-[10px]">Wedding day location</span>
                                    <span className="text-white font-medium block">{b.weddingVenue}</span>
                                  </div>
                                  {b.hasEngagement && (
                                    <div>
                                      <span className="text-charcoal-500 block text-[10px]">Engagement location</span>
                                      <span className="text-white font-medium block">{b.engagementVenue} ({b.engagementDate})</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Checklist elements summary */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                {/* Ceremony matrix coverage */}
                                <div className="space-y-2.5">
                                  <span className="text-[9px] uppercase tracking-wider text-brand-pink font-extrabold block">Ceremony Days coverage</span>
                                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                                    {renderCheckSummary(b).map((val, i) => (
                                      <div key={i} className="flex items-center gap-2 p-2 bg-charcoal-900 border border-white/[0.04] rounded-lg">
                                        <Check size={10} className="text-brand-pink stroke-[3.5]" />
                                        <span className="text-[11px] text-charcoal-200">{val}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Prewedding and deliverables checklist */}
                                <div className="space-y-4">
                                  {/* Prewedding summary */}
                                  {[
                                    b.preWedding.shoot1Photo, b.preWedding.shoot1Video,
                                    b.preWedding.shoot2Photo, b.preWedding.shoot2Video
                                  ].some(Boolean) && (
                                    <div className="space-y-2.5">
                                      <span className="text-[9px] uppercase tracking-wider text-brand-teal font-extrabold block">Pre-Wedding Shoots</span>
                                      <div className="flex flex-wrap gap-2">
                                        {b.preWedding.shoot1Photo && <span className="px-2.5 py-1 text-[9px] uppercase bg-charcoal-900 border border-white/[0.04] rounded-full text-brand-teal font-semibold">Session 1 Photo</span>}
                                        {b.preWedding.shoot1Video && <span className="px-2.5 py-1 text-[9px] uppercase bg-charcoal-900 border border-white/[0.04] rounded-full text-brand-pink font-semibold">Session 1 Video</span>}
                                        {b.preWedding.shoot2Photo && <span className="px-2.5 py-1 text-[9px] uppercase bg-charcoal-900 border border-white/[0.04] rounded-full text-brand-teal font-semibold">Session 2 Photo</span>}
                                        {b.preWedding.shoot2Video && <span className="px-2.5 py-1 text-[9px] uppercase bg-charcoal-900 border border-white/[0.04] rounded-full text-brand-pink font-semibold">Session 2 Video</span>}
                                      </div>
                                    </div>
                                  )}

                                  {/* Deliverables summary */}
                                  <div className="space-y-2.5">
                                    <span className="text-[9px] uppercase tracking-wider text-brand-purple font-extrabold block">Deliverables Selection</span>
                                    <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                                      {Object.keys(b.deliverables).filter(k => b.deliverables[k as keyof DeliverableSelection]).map((k) => {
                                        const labels: Record<string, string> = {
                                          album1: "Album 1",
                                          album2: "Album 2",
                                          highlights1: "Highlights 1",
                                          highlights2: "Highlights 2",
                                          documentary: "Full Film",
                                          reels: "Teaser Reels"
                                        };
                                        return (
                                          <span key={k} className="px-2.5 py-1 text-[9px] uppercase bg-charcoal-950 border border-white/[0.04] rounded-md text-charcoal-300 font-medium">
                                            {labels[k]}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Upgrades grid matrix */}
                              {Object.keys(b.additionalServices).some(dayKey => Object.values(b.additionalServices[dayKey]).some(Boolean)) && (
                                <div className="space-y-2.5 pt-2 border-t border-white/[0.04]">
                                  <span className="text-[9px] uppercase tracking-wider text-brand-peach font-extrabold block">Production Upgrades Matrix</span>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {Object.keys(b.additionalServices).map((dayKey) => {
                                      const srv = b.additionalServices[dayKey];
                                      const activeSrvs = [
                                        srv.helicam && "Drone",
                                        srv.live && "Live",
                                        srv.spotEdit && "Spot Edit"
                                      ].filter(Boolean);
                                      if (activeSrvs.length === 0) return null;
                                      return (
                                        <div key={dayKey} className="p-2.5 bg-charcoal-950 border border-white/[0.02] rounded-lg">
                                          <span className="block text-[9px] text-white font-bold truncate capitalize mb-1">{getServiceDayLabel(dayKey)}</span>
                                          <span className="block text-[8px] text-charcoal-500 uppercase tracking-widest font-light">{activeSrvs.join(" / ")}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Right client contact panel */}
                            <div className="md:col-span-4 bg-charcoal-950/40 p-5 border border-white/[0.04] rounded-xl flex flex-col justify-between h-[300px]">
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-charcoal-500 font-extrabold block border-b border-white/[0.04] pb-2 mb-3">Booking Cost</span>
                                <div className="mb-4">
                                  <span className="block text-2xl font-mono font-black text-white">₹{b.totalPrice.toLocaleString()}</span>
                                  <span className="text-[8px] uppercase tracking-widest text-charcoal-500 font-light block mt-0.5">Estimated proposal</span>
                                </div>
                                <span className="block text-[9px] text-charcoal-500 font-light mt-1.5 leading-relaxed">
                                  Recorded on: {new Date(b.createdAt).toLocaleString()}
                                </span>
                              </div>

                              {/* Communications buttons */}
                              <div className="space-y-2">
                                <div className="grid grid-cols-3 gap-2">
                                  <a 
                                    href={`tel:${cleanPhone}`} 
                                    className="p-3 border border-white/5 hover:border-brand-teal hover:text-brand-teal bg-charcoal-900 rounded-lg flex items-center justify-center text-charcoal-400 transition-colors"
                                    title="Call Client"
                                  >
                                    <Phone size={14} />
                                  </a>
                                  
                                  <a 
                                    href={`mailto:${b.email}?subject=Odd_One_Ads%20Wedding%20Booking%20Consultation`} 
                                    className="p-3 border border-white/5 hover:border-brand-purple hover:text-brand-purple bg-charcoal-900 rounded-lg flex items-center justify-center text-charcoal-400 transition-colors"
                                    title="Send Email"
                                  >
                                    <Mail size={14} />
                                  </a>

                                  <a 
                                    href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent("Greetings from Odd_One_Ads weddings team. We received your booking request! Let's arrange a call.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 border border-white/5 hover:border-brand-peach hover:text-brand-peach bg-charcoal-900 rounded-lg flex items-center justify-center text-charcoal-400 transition-colors"
                                    title="Direct WhatsApp Chat"
                                  >
                                    <MessageSquare size={14} />
                                  </a>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <button 
                                    type="button"
                                    onClick={() => handleWhatsAppShare(b)}
                                    className="py-2.5 px-3 border border-white/5 bg-charcoal-900 hover:border-brand-teal hover:text-brand-teal text-[9px] uppercase font-bold tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors text-charcoal-300"
                                  >
                                    <Share2 size={10} /> Share
                                  </button>

                                  <button 
                                    type="button"
                                    onClick={() => handlePrint(b.id)}
                                    className="py-2.5 px-3 border border-white/5 bg-charcoal-900 hover:border-brand-pink hover:text-brand-pink text-[9px] uppercase font-bold tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors text-charcoal-300"
                                  >
                                    <Printer size={10} /> Print Invoice
                                  </button>
                                </div>

                                <button 
                                  type="button"
                                  onClick={() => handleDeleteBooking(b.id)}
                                  className="w-full py-2.5 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/30 text-brand-pink text-[9px] uppercase font-bold tracking-widest rounded-lg flex items-center justify-center gap-1.5 cursor-pointer mt-2 transition-colors"
                                >
                                  <Trash2 size={11} /> Delete booking
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper label resolver for Additional service day codes in general usage
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
