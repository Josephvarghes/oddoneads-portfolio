"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function BackgroundOrbs() {
  const pathname = usePathname();

  // Hide the watercolor background orbs on admin paths to preserve visual contrast and prevent distraction
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-25">
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-gradient-to-tr from-brand-pink to-brand-purple blur-[100px] sm:blur-[150px] animate-float-slow" />
      <div className="absolute bottom-[15%] right-[-10%] w-[55vw] h-[55vw] max-w-[550px] rounded-full bg-gradient-to-tr from-brand-teal to-brand-purple blur-[120px] sm:blur-[170px] animate-float-delayed" />
      <div className="absolute top-[45%] left-[25%] w-[40vw] h-[40vw] max-w-[400px] rounded-full bg-gradient-to-tr from-brand-peach to-brand-pink blur-[110px] sm:blur-[140px] animate-pulse-slow" />
    </div>
  );
}
