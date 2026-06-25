import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiConcierge from "@/components/AiConcierge";
import ScrollToTop from "@/components/ScrollToTop";
import BackgroundOrbs from "@/components/BackgroundOrbs";

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
        <BackgroundOrbs />

        <Navbar />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
        <AiConcierge />
        <ScrollToTop />
      </body>
    </html>
  );
}
