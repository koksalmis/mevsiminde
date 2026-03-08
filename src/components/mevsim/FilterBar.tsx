"use client";

import { useTranslations } from "next-intl";
import type { Season, Category, Month } from "@/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedMonth: Month | null;
  selectedSeason: Season | null;
  selectedCategory: Category | null;
  onMonthChange: (month: Month | null) => void;
  onSeasonChange: (season: Season | null) => void;
  onCategoryChange: (category: Category | null) => void;
}

const months: Month[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const seasons: Season[] = ["spring", "summer", "autumn", "winter"];

const seasonAccent: Record<Season, string> = {
  spring: "bg-spring text-green-900",
  summer: "bg-summer text-amber-900",
  autumn: "bg-autumn text-orange-950",
  winter: "bg-winter text-blue-950",
};

export default function FilterBar({
  selectedMonth,
  selectedSeason,
  selectedCategory,
  onMonthChange,
  onSeasonChange,
  onCategoryChange,
}: FilterBarProps) {
  const t = useTranslations();

  return (
    <div className="sticky top-14 z-30 border-b border-sand bg-cream/95 backdrop-blur-sm lg:top-16">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 lg:px-8 lg:py-4">
        {/* Month pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:flex-wrap lg:overflow-visible">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => onMonthChange(selectedMonth === m ? null : m)}
              className={cn(
                "shrink-0 snap-start rounded-full px-3 py-1.5 text-sm font-medium transition-colors min-h-[40px]",
                selectedMonth === m
                  ? "bg-forest text-white"
                  : "bg-white text-bark hover:bg-mint"
              )}
            >
              {t(`monthsShort.${m}`)}
            </button>
          ))}
        </div>

        {/* Season + Category */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div className="flex gap-1.5">
            {seasons.map((s) => (
              <button
                key={s}
                onClick={() => onSeasonChange(selectedSeason === s ? null : s)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors min-h-[36px]",
                  selectedSeason === s
                    ? seasonAccent[s]
                    : "bg-white text-stone hover:bg-mint"
                )}
              >
                {t(`season.${s}`)}
              </button>
            ))}
          </div>

          <div className="mx-2 hidden h-5 w-px bg-sand lg:block" />

          <div className="flex gap-1.5">
            {(["all", "fruit", "vegetable"] as const).map((c) => (
              <button
                key={c}
                onClick={() => onCategoryChange(c === "all" ? null : (c as Category))}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors min-h-[36px]",
                  (c === "all" && !selectedCategory) || selectedCategory === c
                    ? "bg-forest text-white"
                    : "bg-white text-stone hover:bg-mint"
                )}
              >
                {t(`category.${c}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
