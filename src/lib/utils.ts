import type { Month, Season } from "@/types";
import { MONTHS_IN_SEASON } from "./constants";

export function getCurrentMonth(): Month {
  return Number(new Intl.DateTimeFormat("en", { month: "numeric", timeZone: "Europe/Istanbul" }).format(new Date())) as Month;
}

/** İstanbul saatine göre gün sayacı (Türkiye sabit UTC+3); gece yarısı bir artar. */
export function getIstanbulDayIndex(): number {
  return Math.floor((Date.now() + 3 * 60 * 60 * 1000) / 86_400_000);
}

export function getCurrentSeason(): Season {
  const month = getCurrentMonth();
  for (const [season, months] of Object.entries(MONTHS_IN_SEASON)) {
    if (months.includes(month)) {
      return season as Season;
    }
  }
  return "spring";
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
