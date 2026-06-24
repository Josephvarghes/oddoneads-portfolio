import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiConcierge from "@/components/AiConcierge";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FILMBY ODD_ONE_ADS | Premium Wedding & Event Storytellers",
  description: "Unwrap the tale of your perfect day. Cinematic wedding films, luxury pre-wedding shoots, destination weddings, and corporate events across India, UK, and Dubai.",
  keywords: "Wedding Photography, Wedding Films, Destination Weddings, Pre-Wedding Shoots, Corporate Events, Odd_One_Ads, India Wedding Photographer, UK Wedding Film, Dubai Luxury Wedding",
  openGraph: {
    title: "FILMBY ODD_ONE_ADS | Premium Wedding & Event Storytellers",
    description: "Unwrap the tale of your perfect day. Timeless photos and cinematic films by Odd_One_Ads in India, UK, and Dubai.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased bg-charcoal-950 text-white min-h-screen flex flex-col relative`}
      >
        {/* Floating Watercolor Background Orbs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-25">
          <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-gradient-to-tr from-brand-pink to-brand-purple blur-[100px] sm:blur-[150px] animate-float-slow" />
          <div className="absolute bottom-[15%] right-[-10%] w-[55vw] h-[55vw] max-w-[550px] rounded-full bg-gradient-to-tr from-brand-teal to-brand-purple blur-[120px] sm:blur-[170px] animate-float-delayed" />
          <div className="absolute top-[45%] left-[25%] w-[40vw] h-[40vw] max-w-[400px] rounded-full bg-gradient-to-tr from-brand-peach to-brand-pink blur-[110px] sm:blur-[140px] animate-pulse-slow" />
        </div>

        <Navbar />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
        <AiConcierge />
      </body>
    </html>
  );
}
