import type { Month, Season } from "@/types";
import { MONTHS_IN_SEASON } from "./constants";

export function getCurrentMonth(): Month {
  return (new Date().getMonth() + 1) as Month;
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
