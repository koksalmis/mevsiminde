import type { Season } from "@/types";

export const SEASON_COLORS: Record<Season, string> = {
  spring: "bg-spring text-green-900",
  summer: "bg-summer text-amber-900",
  autumn: "bg-autumn text-orange-950",
  winter: "bg-winter text-blue-950",
};

export const SEASON_BG_COLORS: Record<Season, string> = {
  spring: "bg-spring/20",
  summer: "bg-summer/20",
  autumn: "bg-autumn/20",
  winter: "bg-winter/20",
};

export const SEASON_ICONS: Record<Season, string> = {
  spring: "🌸",
  summer: "☀️",
  autumn: "🍂",
  winter: "❄️",
};

export const MONTHS_IN_SEASON: Record<Season, number[]> = {
  spring: [3, 4, 5],
  summer: [6, 7, 8],
  autumn: [9, 10, 11],
  winter: [12, 1, 2],
};
