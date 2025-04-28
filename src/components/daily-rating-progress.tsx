"use client";

import { getUserDailyRatingCount } from "@/lib/data";
import { useEffect, useState } from "react";
interface DailyRatingProgressProps {
  userId: string;
  className?: string;
}
export function DailyRatingProgress({
  userId,
  className
}: DailyRatingProgressProps) {
  const [dailyRatingCount, setDailyRatingCount] = useState(0);
  useEffect(() => {
    if (userId) {
      const count = getUserDailyRatingCount(userId);
      setDailyRatingCount(count);
    }
  }, [userId]);
  const percentage = Math.min(100, dailyRatingCount / 50 * 100);
  return <div className={`flex flex-col items-center ${className}`} data-unique-id="ef82efa6-debe-451d-8bf7-298a04604d53" data-loc="24:4-24:63" data-file-name="components/daily-rating-progress.tsx">
      <div className="w-full max-w-md bg-slate-100 h-2 rounded-full overflow-hidden" data-unique-id="79e9b4ea-9cb9-4b19-aee5-3701d57cedf3" data-loc="25:6-25:85" data-file-name="components/daily-rating-progress.tsx">
        <div className="bg-blue-600 h-full rounded-full" style={{
        width: `${percentage}%`
      }} data-unique-id="c81e8f2b-3bc2-4ada-bcf4-a975406f6cd2" data-loc="26:8-29:9" data-file-name="components/daily-rating-progress.tsx"></div>
      </div>
      <p className="text-sm text-slate-500 mt-2" data-unique-id="44b61edc-5ffe-47fb-b54e-52ae6dc3de93" data-loc="31:6-31:49" data-file-name="components/daily-rating-progress.tsx">
        {dailyRatingCount}/50 avaliações hoje
      </p>
    </div>;
}