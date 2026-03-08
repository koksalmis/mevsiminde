import type { Food, Locale, Month, Season, Category } from "@/types";
import { foodsBase } from "@/data/foods/base";
import { foodsTr } from "@/data/foods/tr";

const localeMap: Record<Locale, Record<string, import("@/types").FoodLocale>> = {
  tr: foodsTr,
};

export function getAllFoods(locale: Locale = "tr"): Food[] {
  const localeData = localeMap[locale];
  return foodsBase
    .filter((base) => localeData[base.id])
    .map((base) => ({
      ...base,
      ...localeData[base.id],
    }));
}

export function getFoodBySlug(slug: string, locale: Locale = "tr"): Food | undefined {
  const foods = getAllFoods(locale);
  return foods.find((f) => f.slug === slug);
}

export function getFoodsByMonth(month: Month, locale: Locale = "tr"): Food[] {
  return getAllFoods(locale).filter((f) => f.months.includes(month));
}

export function getFoodsBySeason(season: Season, locale: Locale = "tr"): Food[] {
  return getAllFoods(locale).filter((f) => f.seasons.includes(season));
}

export function getFoodsByCategory(category: Category, locale: Locale = "tr"): Food[] {
  return getAllFoods(locale).filter((f) => f.category === category);
}

export function getFilteredFoods(
  filters: { month?: Month; season?: Season; category?: Category },
  locale: Locale = "tr"
): Food[] {
  let foods = getAllFoods(locale);
  if (filters.month) foods = foods.filter((f) => f.months.includes(filters.month!));
  if (filters.season) foods = foods.filter((f) => f.seasons.includes(filters.season!));
  if (filters.category) foods = foods.filter((f) => f.category === filters.category);
  return foods;
}

export function getRelatedFoods(food: Food, locale: Locale = "tr", limit = 4): Food[] {
  return getAllFoods(locale)
    .filter((f) => f.id !== food.id && (f.category === food.category || f.seasons.some((s) => food.seasons.includes(s))))
    .slice(0, limit);
}

export function getSeasonFoodCount(season: Season, locale: Locale = "tr"): number {
  return getFoodsBySeason(season, locale).length;
}
