"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
interface StarRatingProps {
  maxRating?: number;
  value?: number;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  readonly?: boolean;
}
export function StarRating({
  maxRating = 5,
  value = 0,
  onChange,
  size = "md",
  className,
  readonly = false
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const sizes = {
    sm: {
      star: 18,
      container: "gap-1"
    },
    md: {
      star: 24,
      container: "gap-1.5"
    },
    lg: {
      star: 32,
      container: "gap-2"
    }
  };
  const handleMouseEnter = (rating: number) => {
    if (readonly) return;
    setHoverRating(rating);
  };
  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };
  const handleClick = (rating: number) => {
    if (readonly) return;
    onChange?.(rating);
  };
  return <div className={cn("flex items-center", sizes[size].container, className)} onMouseLeave={handleMouseLeave} data-unique-id="a1a09bc2-47f6-4bc5-a1dd-266ddc6ef125" data-loc="49:9-49:116" data-file-name="components/star-rating.tsx">
      {Array.from({
      length: maxRating
    }).map((_, i) => {
      const rating = i + 1;
      const isActive = rating <= (hoverRating || value);
      return <Star key={i} size={sizes[size].star} className={cn("transition-colors", isActive ? "fill-yellow-400 text-yellow-400" : "fill-none text-slate-300", !readonly && "cursor-pointer hover:text-yellow-400")} onMouseEnter={() => handleMouseEnter(rating)} onClick={() => handleClick(rating)} data-unique-id={`186c4343-08c7-42f3-8742-885c05841261_${i}`} data-loc="55:13-55:299" data-file-name="components/star-rating.tsx" />;
    })}
    </div>;
}