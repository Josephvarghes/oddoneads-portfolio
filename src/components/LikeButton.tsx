"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface LikeButtonProps {
  initialCount?: number;
  className?: string;
}

export default function LikeButton({ initialCount = 0, className = "" }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialCount);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent clicks like lightbox
    setLiked((prev) => {
      const nextState = !prev;
      setLikesCount((count) => (nextState ? count + 1 : count - 1));
      return nextState;
    });
  };

  return (
    <button
      onClick={toggleLike}
      aria-label="Like image"
      className={`group/like flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:border-brand-pink/50 transition-all duration-300 cursor-pointer ${className}`}
    >
      <motion.div
        animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={14}
          className={`transition-colors duration-300 ${
            liked
              ? "fill-brand-pink text-brand-pink"
              : "text-white/80 group-hover/like:text-brand-pink"
          }`}
        />
      </motion.div>
      {likesCount > 0 && (
        <span className={`text-[10px] font-bold tracking-wider ${liked ? "text-brand-pink" : "text-white/80"}`}>
          {likesCount}
        </span>
      )}
    </button>
  );
}
