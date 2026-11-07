import type { Month } from "@/types";

/** Bir ürünün mevsiminin başladığı aylar (ayın bir önceki ayı listede yoksa o ay bir başlangıçtır). */
export function seasonStartMonths(months: Month[]): Month[] {
  return months.filter((m) => !months.includes((m === 1 ? 12 : m - 1) as Month));
}

/**
 * Verilen başlangıç ayının bir sonraki 1'ini döndürür.
 * İçinde bulunulan ay bir başlangıç ayıysa, o başlangıç geçmiş sayılır ve gelecek yıla atılır.
 */
export function nextOccurrence(month: Month, now: { year: number; month: Month }): { year: number; month: Month } {
  return { year: month > now.month ? now.year : now.year + 1, month };
}

/** İstanbul saatine göre bugünün yılı ve ayı. */
export function istanbulNow(): { year: number; month: Month } {
  const parts = new Intl.DateTimeFormat("en", { year: "numeric", month: "numeric", timeZone: "Europe/Istanbul" }).formatToParts(new Date());
  return {
    year: Number(parts.find((p) => p.type === "year")?.value),
    month: Number(parts.find((p) => p.type === "month")?.value) as Month,
  };
}
