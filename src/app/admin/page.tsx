"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Unlock, 
  Trash2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Share2, 
  Download, 
  Printer, 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  AlertCircle,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Inbox
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
  createdAt: string;
}

// Contact Request Interface
interface ContactRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  message: string;
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

const EVENT_TYPE_LABELS: Record<string, string> = {
  "wedding-photography": "Wedding Photography",
  "wedding-films": "Wedding Films",
  "destination-weddings": "Destination Wedding",
  "pre-wedding": "Pre-Wedding Shoot"
};

export default function AdminPortal() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Dashboard Section Tabs: "bookings" (Wedding Enquiries) or "contacts" (Simple Contact Requests)
  const [activeTab, setActiveTab] = useState<"bookings" | "contacts">("bookings");

  // Bookings list state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  // Contact requests list state
  const [contacts, setContacts] = useState<ContactRequest[]>([]);

  // Hydration safeguard and session auth check
  useEffect(() => {
    setMounted(true);
    const logged = sessionStorage.getItem("admin_logged") === "true";
    setIsLogged(logged);
  }, []);

  // Seed sample mock data on first load if localStorage database is empty
  useEffect(() => {
    if (!mounted) return;
    
    // 1. Seed Bookings
    const existingBookings = localStorage.getItem("oddone_bookings");
    if (!existingBookings || JSON.parse(existingBookings).length === 0) {
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
          createdAt: "2026-06-22T08:45:00.000Z"
        }
      ];
      localStorage.setItem("oddone_bookings", JSON.stringify(mockBookings));
      setBookings(mockBookings);
    } else {
      setBookings(JSON.parse(existingBookings));
    }

    // 2. Seed Contact Requests
    const existingContacts = localStorage.getItem("oddone_contacts");
    if (!existingContacts || JSON.parse(existingContacts).length === 0) {
      const mockContacts: ContactRequest[] = [
        {
          id: "contact-mock-1",
          fullName: "Vikram & Ananya Sethi",
          email: "ananya.sethi@gmail.com",
          phone: "+919820123456",
          eventType: "wedding-photography",
          eventDate: "2026-12-10",
          eventLocation: "Udaipur, Rajasthan",
          message: "We love your visual documentary style! We're planning a 3-day royal palace wedding in Udaipur and would love to check your team's availability and review proposal options.",
          createdAt: "2026-06-25T10:15:00.000Z"
        },
        {
          id: "contact-mock-2",
          fullName: "Daniel & Priya Sharma",
          email: "daniel.priya@outlook.com",
          phone: "+447700900077",
          eventType: "destination-weddings",
          eventDate: "2027-02-14",
          eventLocation: "Leela Kovalam, Kerala",
          message: "Hi team, we are based in London and organizing a luxury cliffside destination wedding in Kovalam. We would love a call to discuss multi-cam cinematic film options.",
          createdAt: "2026-06-24T18:30:00.000Z"
        }
      ];
      localStorage.setItem("oddone_contacts", JSON.stringify(mockContacts));
      setContacts(mockContacts);
    } else {
      setContacts(JSON.parse(existingContacts));
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
    router.push("/");
  };

  // Delete booking handler
  const handleDeleteBooking = (id: string) => {
    if (!confirm("Are you sure you want to delete this wedding enquiry entry?")) return;
    const list = bookings.filter((b) => b.id !== id);
    setBookings(list);
    localStorage.setItem("oddone_bookings", JSON.stringify(list));
    if (expandedId === id) setExpandedId(null);
  };

  // Delete contact request handler
  const handleDeleteContact = (id: string) => {
    if (!confirm("Are you sure you want to delete this contact request entry?")) return;
    const list = contacts.filter((c) => c.id !== id);
    setContacts(list);
    localStorage.setItem("oddone_contacts", JSON.stringify(list));
  };

  // Analytics metrics
  const getAnalytics = () => {
    const totalBookings = bookings.length;
    const totalContacts = contacts.length;
    const christian = bookings.filter(b => b.category === "christian").length;
    const hindu = bookings.filter(b => b.category === "hindu").length;
    const muslim = bookings.filter(b => b.category === "muslim").length;
    return { totalBookings, totalContacts, christian, hindu, muslim };
  };

  const stats = getAnalytics();

  // Export spreadsheet as BOM-prefixed CSV
  const handleExportCSV = () => {
    if (activeTab === "contacts") {
      let csvContent = "ID,Full Name,Email,Phone,Event Type,Event Date,Event Location,Message,Created At\r\n";
      contacts.forEach((c) => {
        const row = [
          c.id,
          `"${c.fullName.replace(/"/g, '""')}"`,
          c.email,
          `"${c.phone}"`,
          `"${EVENT_TYPE_LABELS[c.eventType] || c.eventType}"`,
          c.eventDate,
          `"${c.eventLocation.replace(/"/g, '""')}"`,
          `"${c.message.replace(/"/g, '""')}"`,
          c.createdAt
        ].join(",");
        csvContent += row + "\r\n";
      });
      const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `oddone_contact_requests_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    let csvContent = "ID,Couple Name,Email,Phone,Category,Wedding Date,Wedding Venue,Engagement Date,Engagement Venue,Events Covered,Pre-Wedding Sessions,Deliverables,Additional Upgrades,Created At\r\n";
    
    bookings.forEach((b) => {
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

      const activePreWeds = [];
      if (b.preWedding.shoot1Photo) activePreWeds.push("Shoot 1 Photo");
      if (b.preWedding.shoot1Video) activePreWeds.push("Shoot 1 Video");
      if (b.preWedding.shoot2Photo) activePreWeds.push("Shoot 2 Photo");
      if (b.preWedding.shoot2Video) activePreWeds.push("Shoot 2 Video");
      const preWedsStr = activePreWeds.join(" | ");

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
        b.createdAt
      ].join(",");
      csvContent += row + "\r\n";
    });

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `oddone_wedding_enquiries_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const handleWhatsAppShare = (b: Booking) => {
    const categoriesDisplay: Record<string, string> = {
      christian: "Christian Wedding",
      hindu: "Hindu Wedding",
      muslim: "Muslim Wedding"
    };

    let msg = `*ODD_ONE_ADS WEDDINGS - WEDDING ENQUIRY SUMMARY*\n`;
    msg += `-------------------------------------------\n`;
    msg += `*Couple Name:* ${b.fullName}\n`;
    msg += `*Category:* ${categoriesDisplay[b.category] || b.category}\n`;
    msg += `*Email Address:* ${b.email}\n`;
    msg += `*Phone Contact:* ${b.phone}\n`;
    msg += `*Wedding Date:* ${b.weddingDate}\n`;
    msg += `*Wedding Venue:* ${b.weddingVenue}\n`;
    
    if (b.hasEngagement) {
      msg += `*Engagement Date:* ${b.engagementDate}\n`;
      msg += `*Engagement Venue:* ${b.engagementVenue}\n`;
    }
    
    msg += `-------------------------------------------\n`;
    msg += `*Submitted On:* ${new Date(b.createdAt).toLocaleDateString()}\n`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

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

  const filteredBookings = bookings.filter((b) => {
    if (activeCategoryFilter === "all") return true;
    return b.category === activeCategoryFilter;
  });

  if (!mounted) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-xs tracking-widest uppercase font-sans">
        Loading Staff Portal...
      </div>
    );
  }

  // 1. PROFESSIONAL WHITE STAFF LOGIN SCREEN
  if (!isLogged) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-slate-100/70 flex items-center justify-center px-6 relative font-sans text-slate-800">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white border border-slate-200 p-8 md:p-10 rounded-2xl shadow-xl relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4 shadow-xs">
              <ShieldCheck size={26} />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Admin Staff Portal</h1>
            <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Odd_One_Ads Portfolio & Management</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {loginError && (
              <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-red-600 font-medium">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-2">Username</label>
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 focus:outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-2">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 focus:outline-none transition-all font-medium"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs uppercase tracking-wider font-bold transition-all rounded-xl shadow-md hover:shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              Sign In to Dashboard <Unlock size={14} />
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500 border-t border-slate-100 pt-4 font-normal">
            Default Admin Login: <span className="text-slate-800 font-semibold font-mono bg-slate-100 px-2 py-0.5 rounded">nikhil / nikhil@123</span>
          </div>

          <div className="mt-4 text-center">
            <Link 
              href="/" 
              className="text-xs uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors font-bold inline-flex items-center gap-1.5"
            >
              ← Back to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. PROFESSIONAL LIGHT ADMIN PORTAL DASHBOARD
  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 text-slate-900 relative font-sans print:bg-white print:text-black print:pt-4 print:pb-4">
      
      {/* A. PRINT ONLY SUMMARY RECEIPT GENERATOR CONTAINER */}
      <div className="hidden print:block max-w-4xl mx-auto p-4 bg-white text-slate-900 font-sans leading-relaxed">
        {expandedId ? (
          (() => {
            const selected = bookings.find(b => b.id === expandedId);
            if (!selected) return null;
            return (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4">
                  <div>
                    <h1 className="font-serif text-3xl font-bold tracking-wider text-slate-900">ODD_ONE_ADS</h1>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold block mt-0.5">PHOTOGRAPHY & WEDDING FILMS</span>
                  </div>
                  <div className="text-right">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-slate-700">Wedding Enquiry Summary</h2>
                    <span className="text-xs text-slate-500 block">ID: {selected.id}</span>
                    <span className="text-[10px] text-slate-400 block">Date: {new Date(selected.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-xs">
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-slate-500 border-b pb-1 mb-2">Customer Details</h4>
                    <p className="font-bold text-sm text-slate-900">{selected.fullName}</p>
                    <p>Email: {selected.email}</p>
                    <p>Phone: {selected.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-slate-500 border-b pb-1 mb-2">Ceremony Specifications</h4>
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

                <div className="pt-4">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-300 font-bold uppercase text-[9px] tracking-wider text-slate-600">
                        <th className="py-2">Selected Services Breakdown</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(selected.events).map((key) => {
                        const sel = selected.events[key];
                        if (!sel.photo && !sel.video) return null;
                        const services = [];
                        if (sel.photo) { services.push("Photography"); }
                        if (sel.video) { services.push("Videography"); }
                        return (
                          <tr key={key} className="border-b border-slate-200">
                            <td className="py-2.5 font-medium">{EVENT_LABELS[key] || key} coverage - <span className="text-slate-500 font-light italic">{services.join(" & ")}</span></td>
                          </tr>
                        );
                      })}

                      {selected.preWedding.shoot1Photo && (
                        <tr className="border-b border-slate-200">
                          <td className="py-2.5 font-medium">Pre-Wedding Session 1 (Photography)</td>
                        </tr>
                      )}
                      {selected.preWedding.shoot1Video && (
                        <tr className="border-b border-slate-200">
                          <td className="py-2.5 font-medium">Pre-Wedding Session 1 (Videography)</td>
                        </tr>
                      )}
                      {selected.preWedding.shoot2Photo && (
                        <tr className="border-b border-slate-200">
                          <td className="py-2.5 font-medium">Pre-Wedding Session 2 (Photography)</td>
                        </tr>
                      )}
                      {selected.preWedding.shoot2Video && (
                        <tr className="border-b border-slate-200">
                          <td className="py-2.5 font-medium">Pre-Wedding Session 2 (Videography)</td>
                        </tr>
                      )}

                      {Object.keys(selected.deliverables).filter(k => selected.deliverables[k as keyof DeliverableSelection]).map((k) => {
                        const deliverableLabels: Record<string, string> = {
                          album1: "Premium Custom Album Book 1",
                          album2: "Premium Custom Album Book 2",
                          highlights1: "Cinema Highlights Cut Video (3 to 7 Min) - 1",
                          highlights2: "Cinema Highlights Cut Video (3 to 7 Min) - 2",
                          documentary: "Full Length Film Documentary (30 to 45 Min)",
                          reels: "Teaser Instagram Reels (30 Sec)"
                        };
                        return (
                          <tr key={k} className="border-b border-slate-200">
                            <td className="py-2.5 font-medium">{deliverableLabels[k] || k}</td>
                          </tr>
                        );
                      })}

                      {Object.keys(selected.additionalServices).map((dayKey) => {
                        const srv = selected.additionalServices[dayKey];
                        const rows = [];
                        if (srv.helicam) rows.push("Helicam swept");
                        if (srv.live) rows.push("YouTube Livestream");
                        if (srv.spotEdit) rows.push("Same Day Spot Video edit");
                        
                        return rows.map((r, i) => (
                          <tr key={`${dayKey}-${i}`} className="border-b border-slate-200">
                            <td className="py-2.5 font-medium">{r} on {getServiceDayLabel(dayKey)}</td>
                          </tr>
                        ));
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="text-2xl font-bold">ODD_ONE_ADS WEDDINGS</h1>
                <span className="text-[10px] text-slate-500">STAFF ALL ENQUIRIES SUMMARY</span>
              </div>
              <span className="text-xs text-slate-500">Date: {new Date().toLocaleDateString()}</span>
            </div>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 font-bold uppercase text-[9px] tracking-wider text-slate-600">
                  <th className="py-2">Couple Name</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Wedding Date & Venue</th>
                  <th className="py-2">Contact Details</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-slate-200 py-3">
                    <td className="py-3 font-bold text-slate-900">{b.fullName}</td>
                    <td className="py-3 capitalize">{b.category}</td>
                    <td className="py-3">
                      <span className="block font-medium">{b.weddingDate}</span>
                      <span className="text-slate-500 text-[10px] block">{b.weddingVenue}</span>
                    </td>
                    <td className="py-3">
                      <span className="block">{b.email}</span>
                      <span className="text-slate-500 block">{b.phone}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* B. MAIN CORE WORKSPACE DASHBOARD */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 print:hidden">
        
        {/* Top Header Bar */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] text-indigo-600 uppercase font-bold">Staff Management Dashboard</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">Inquiries & Client Overview</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Review wedding planner enquiries and direct contact messages in one place.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              type="button" 
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer rounded-xl shadow-2xs"
            >
              <Download size={14} className="text-slate-500" />
              Export CSV
            </button>
            
            <button 
              type="button" 
              onClick={() => handlePrint(null)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer rounded-xl shadow-2xs"
            >
              <Printer size={14} className="text-slate-500" />
              Print Summary
            </button>

            <button 
              type="button" 
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer rounded-xl shadow-sm"
            >
              Sign Out Staff
            </button>
          </div>
        </div>

        {/* Analytics Overview Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Total Wedding Enquiries */}
          <div 
            onClick={() => setActiveTab("bookings")}
            className={`bg-white border p-5 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
              activeTab === "bookings" ? "border-indigo-600 ring-2 ring-indigo-600/10 shadow-md" : "border-slate-200/80 hover:shadow-md"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Users size={22} />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">Wedding Enquiries</span>
              <span className="block font-serif text-2xl font-bold text-slate-900 mt-0.5">{stats.totalBookings} Entries</span>
            </div>
          </div>

          {/* Simple Contact Requests Card */}
          <div 
            onClick={() => setActiveTab("contacts")}
            className={`bg-white border p-5 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
              activeTab === "contacts" ? "border-indigo-600 ring-2 ring-indigo-600/10 shadow-md" : "border-slate-200/80 hover:shadow-md"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Inbox size={22} />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">Contact Requests</span>
              <span className="block font-serif text-2xl font-bold text-emerald-700 mt-0.5">{stats.totalContacts} Messages</span>
            </div>
          </div>

          {/* Christian Weddings Metric */}
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 font-serif font-bold text-lg">
              ✙
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">Christian Tradition</span>
              <span className="block font-serif text-2xl font-bold text-slate-900 mt-0.5">{stats.christian}</span>
            </div>
          </div>

          {/* Hindu & Muslim Metric */}
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 font-serif font-bold text-lg">
              ॐ / ☪
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">Hindu & Muslim</span>
              <span className="block font-serif text-2xl font-bold text-slate-900 mt-0.5">{stats.hindu + stats.muslim}</span>
            </div>
          </div>

        </div>

        {/* Primary View Selector Tabs (Wedding Enquiries vs Simple Contact Requests) */}
        <div className="flex border-b border-slate-200 mb-6 gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "bookings"
                ? "border-indigo-600 text-indigo-600 font-extrabold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles size={16} />
            Wedding Details Enquiries ({bookings.length})
          </button>
          
          <button
            onClick={() => setActiveTab("contacts")}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "contacts"
                ? "border-indigo-600 text-indigo-600 font-extrabold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Mail size={16} />
            Contact Requests ({contacts.length})
          </button>
        </div>

        {/* SECTION 1: WEDDING DETAILS ENQUIRIES TAB */}
        {activeTab === "bookings" && (
          <div>
            {/* Filter Categories Tab Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {[
                  { id: "all", label: "All Submissions" },
                  { id: "christian", label: "Christian ✙" },
                  { id: "hindu", label: "Hindu ॐ" },
                  { id: "muslim", label: "Muslim ☪" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveCategoryFilter(tab.id); setExpandedId(null); }}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all border ${
                      activeCategoryFilter === tab.id
                        ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <span className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-800">{filteredBookings.length}</strong> of {bookings.length} entries
              </span>
            </div>

            {/* BOOKINGS LIST MATRIX */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white border border-slate-200/80 p-12 text-center rounded-2xl shadow-sm">
                <FileText size={44} className="text-slate-300 mx-auto mb-4" />
                <h4 className="font-serif text-lg font-bold text-slate-800 mb-1">No wedding enquiries match the filter</h4>
                <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">New enquiries submitted via the booking planner will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4 font-sans">
                <AnimatePresence>
                  {filteredBookings.map((b) => {
                    const isExpanded = expandedId === b.id;
                    const cleanPhone = b.phone.replace(/[^0-9+]/g, "");

                    let categoryBadgeClass = "bg-purple-50 text-purple-700 border-purple-200";
                    if (b.category === "hindu") categoryBadgeClass = "bg-amber-50 text-amber-700 border-amber-200";
                    if (b.category === "muslim") categoryBadgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
                    
                    return (
                      <motion.div 
                        key={b.id}
                        layout="position"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-2xs ${
                          isExpanded 
                            ? "border-indigo-600 shadow-md ring-2 ring-indigo-600/10" 
                            : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
                        }`}
                      >
                        {/* Summary Row */}
                        <div 
                          onClick={() => setExpandedId(isExpanded ? null : b.id)}
                          className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-serif font-black flex-shrink-0 text-slate-800">
                              {b.category === "christian" && "✙"}
                              {b.category === "hindu" && "ॐ"}
                              {b.category === "muslim" && "☪"}
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-serif text-lg font-bold text-slate-900">
                                  {b.fullName}
                                </h3>
                                <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md border ${categoryBadgeClass}`}>
                                  {b.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1"><Calendar size={12} className="text-slate-400" /> {b.weddingDate}</span>
                                <span>&bull;</span>
                                <span className="truncate max-w-[260px] text-slate-600">{b.weddingVenue}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-[11px] text-slate-400 font-medium">
                              Submitted {new Date(b.createdAt).toLocaleDateString()}
                            </span>

                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                              isExpanded 
                                ? "bg-indigo-600 text-white border-indigo-600" 
                                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                            }`}>
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
                              className="border-t border-slate-200 bg-slate-50/70 overflow-hidden font-sans"
                            >
                              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-medium">
                                
                                {/* Left details breakdown */}
                                <div className="lg:col-span-8 space-y-5">
                                  
                                  {/* Contact & Venue information grid */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    
                                    {/* Contact Card */}
                                    <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 shadow-2xs">
                                      <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold block border-b border-slate-100 pb-1.5">
                                        Client Information
                                      </span>
                                      <div>
                                        <span className="text-slate-400 block text-[10px]">Email Address</span>
                                        <a href={`mailto:${b.email}`} className="text-slate-800 font-semibold hover:text-indigo-600 transition-colors block">{b.email}</a>
                                      </div>
                                      <div>
                                        <span className="text-slate-400 block text-[10px]">Phone Contact</span>
                                        <a href={`tel:${cleanPhone}`} className="text-slate-800 font-semibold hover:text-indigo-600 transition-colors block">{b.phone}</a>
                                      </div>
                                    </div>

                                    {/* Venue Card */}
                                    <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 shadow-2xs">
                                      <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold block border-b border-slate-100 pb-1.5">
                                        Event Locations
                                      </span>
                                      <div>
                                        <span className="text-slate-400 block text-[10px]">Wedding Location</span>
                                        <span className="text-slate-800 font-semibold block">{b.weddingVenue}</span>
                                      </div>
                                      {b.hasEngagement && (
                                        <div>
                                          <span className="text-slate-400 block text-[10px]">Engagement Location</span>
                                          <span className="text-slate-800 font-semibold block">{b.engagementVenue} ({b.engagementDate})</span>
                                        </div>
                                      )}
                                    </div>

                                  </div>

                                  {/* Ceremonies Covered & Upgrades */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    
                                    {/* Ceremony matrix */}
                                    <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2.5 shadow-2xs">
                                      <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold block border-b border-slate-100 pb-1.5">
                                        Ceremony Days Coverage
                                      </span>
                                      <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                                        {renderCheckSummary(b).map((val, i) => (
                                          <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200/60 rounded-lg text-slate-700 text-xs">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span>{val}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Pre-wedding & Deliverables */}
                                    <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3 shadow-2xs">
                                      {/* Prewedding */}
                                      {[
                                        b.preWedding.shoot1Photo, b.preWedding.shoot1Video,
                                        b.preWedding.shoot2Photo, b.preWedding.shoot2Video
                                      ].some(Boolean) && (
                                        <div className="space-y-1.5">
                                          <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold block">Pre-Wedding Shoots</span>
                                          <div className="flex flex-wrap gap-1.5">
                                            {b.preWedding.shoot1Photo && <span className="px-2 py-0.5 text-[10px] bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded">Session 1 Photo</span>}
                                            {b.preWedding.shoot1Video && <span className="px-2 py-0.5 text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded">Session 1 Video</span>}
                                            {b.preWedding.shoot2Photo && <span className="px-2 py-0.5 text-[10px] bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded">Session 2 Photo</span>}
                                            {b.preWedding.shoot2Video && <span className="px-2 py-0.5 text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded">Session 2 Video</span>}
                                          </div>
                                        </div>
                                      )}

                                      {/* Deliverables */}
                                      <div className="space-y-1.5">
                                        <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold block">Deliverables Selected</span>
                                        <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto pr-1">
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
                                              <span key={k} className="px-2 py-0.5 text-[10px] bg-slate-100 border border-slate-200 text-slate-800 font-medium rounded">
                                                {labels[k]}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>

                                  </div>

                                  {/* Additional Upgrades Matrix */}
                                  {Object.keys(b.additionalServices).some(dayKey => Object.values(b.additionalServices[dayKey]).some(Boolean)) && (
                                    <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 shadow-2xs">
                                      <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold block border-b border-slate-100 pb-1.5">
                                        Production Upgrades Matrix
                                      </span>
                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                                        {Object.keys(b.additionalServices).map((dayKey) => {
                                          const srv = b.additionalServices[dayKey];
                                          const activeSrvs = [
                                            srv.helicam && "Drone",
                                            srv.live && "Live Stream",
                                            srv.spotEdit && "Spot Edit"
                                          ].filter(Boolean);
                                          if (activeSrvs.length === 0) return null;
                                          return (
                                            <div key={dayKey} className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                                              <span className="block text-xs font-bold text-slate-800 capitalize truncate">{getServiceDayLabel(dayKey)}</span>
                                              <span className="block text-[10px] text-indigo-600 font-semibold">{activeSrvs.join(" / ")}</span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                </div>

                                {/* Right Client Actions Card */}
                                <div className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-xl shadow-2xs flex flex-col justify-between h-auto min-h-[240px]">
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block border-b border-slate-100 pb-2 mb-3">Enquiry Details</span>
                                    <div className="mb-4 space-y-1">
                                      <span className="text-xs font-bold text-slate-800 block">Wedding Style: {b.category}</span>
                                      <span className="text-[11px] text-slate-500 font-medium block">Received: {new Date(b.createdAt).toLocaleDateString()}</span>
                                    </div>
                                  </div>

                                  {/* Communications & Share Actions */}
                                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                                    <div className="grid grid-cols-3 gap-2">
                                      <a 
                                        href={`tel:${cleanPhone}`} 
                                        className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center font-bold text-xs transition-colors"
                                        title="Call Client"
                                      >
                                        <Phone size={14} />
                                      </a>
                                      
                                      <a 
                                        href={`mailto:${b.email}?subject=Odd_One_Ads%20Wedding%20Booking%20Inquiry`} 
                                        className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center font-bold text-xs transition-colors"
                                        title="Send Email"
                                      >
                                        <Mail size={14} />
                                      </a>

                                      <a 
                                        href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent("Greetings from Odd_One_Ads weddings team. We received your booking request! Let's arrange a call.")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center font-bold text-xs transition-colors"
                                        title="WhatsApp Chat"
                                      >
                                        <MessageSquare size={14} />
                                      </a>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                      <button 
                                        type="button"
                                        onClick={() => handleWhatsAppShare(b)}
                                        className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                      >
                                        <Share2 size={12} /> Share
                                      </button>

                                      <button 
                                        type="button"
                                        onClick={() => handlePrint(b.id)}
                                        className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                      >
                                        <Printer size={12} /> Print
                                      </button>
                                    </div>

                                    <button 
                                      type="button"
                                      onClick={() => handleDeleteBooking(b.id)}
                                      className="w-full py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors mt-1"
                                    >
                                      <Trash2 size={13} /> Delete Entry
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
        )}

        {/* SECTION 2: SIMPLE CONTACT REQUESTS TAB */}
        {activeTab === "contacts" && (
          <div>
            {contacts.length === 0 ? (
              <div className="bg-white border border-slate-200/80 p-12 text-center rounded-2xl shadow-sm">
                <Inbox size={44} className="text-slate-300 mx-auto mb-4" />
                <h4 className="font-serif text-lg font-bold text-slate-800 mb-1">No contact requests found</h4>
                <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">Simple inquiry messages submitted via the Contact page will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                <AnimatePresence>
                  {contacts.map((c) => {
                    const cleanPhone = c.phone.replace(/[^0-9+]/g, "");
                    const eventTypeTag = EVENT_TYPE_LABELS[c.eventType] || c.eventType;

                    return (
                      <motion.div
                        key={c.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                      >
                        {/* Contact Header */}
                        <div>
                          <div className="flex justify-between items-start gap-3 mb-3">
                            <div>
                              <h3 className="font-serif text-lg font-bold text-slate-900">{c.fullName}</h3>
                              <span className="inline-block mt-1 px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                                {eventTypeTag}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                              <Clock size={11} />
                              {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Contact & Location Details */}
                          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 border border-slate-200/70 p-3 rounded-xl mb-4">
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Email</span>
                              <a href={`mailto:${c.email}`} className="text-slate-800 font-medium hover:text-indigo-600 truncate block">
                                {c.email}
                              </a>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Phone</span>
                              <a href={`tel:${cleanPhone}`} className="text-slate-800 font-medium hover:text-indigo-600 block">
                                {c.phone}
                              </a>
                            </div>
                            {c.eventDate && (
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold flex items-center gap-1">
                                  <Calendar size={10} /> Date
                                </span>
                                <span className="text-slate-800 font-medium">{c.eventDate}</span>
                              </div>
                            )}
                            {c.eventLocation && (
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold flex items-center gap-1">
                                  <MapPin size={10} /> Location
                                </span>
                                <span className="text-slate-800 font-medium truncate block">{c.eventLocation}</span>
                              </div>
                            )}
                          </div>

                          {/* Client Message */}
                          <div className="bg-slate-100/60 border-l-2 border-indigo-500 p-3.5 rounded-r-xl text-xs text-slate-700 leading-relaxed font-light italic">
                            &quot;{c.message}&quot;
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${cleanPhone}`}
                              className="w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center transition-colors"
                              title="Call Client"
                            >
                              <Phone size={14} />
                            </a>
                            <a
                              href={`mailto:${c.email}?subject=Odd_One_Ads%20Inquiry%20Response`}
                              className="w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center transition-colors"
                              title="Send Email"
                            >
                              <Mail size={14} />
                            </a>
                            <a
                              href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent("Hi! Greetings from Odd_One_Ads. We received your inquiry and would love to chat.")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-9 h-9 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center transition-colors"
                              title="WhatsApp Chat"
                            >
                              <MessageSquare size={14} />
                            </a>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteContact(c.id)}
                            className="px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

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
