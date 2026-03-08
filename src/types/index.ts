export type Season = "spring" | "summer" | "autumn" | "winter";
export type Category = "fruit" | "vegetable";
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Locale = "tr";

export interface NutritionalValues {
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  vitaminC: number;
}

export interface FoodBase {
  id: string;
  category: Category;
  seasons: Season[];
  months: Month[];
  image: string;
  nutritionalValues: NutritionalValues;
}

export interface FoodLocale {
  slug: string;
  name: string;
  description: string;
  healthBenefits: string[];
  pickingTips: string;
  storageTips: string;
}

export interface Food extends FoodBase, FoodLocale {}

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  content: string;
}
