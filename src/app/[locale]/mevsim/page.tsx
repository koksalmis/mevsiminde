"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import FilterBar from "@/components/mevsim/FilterBar";
import FoodGrid from "@/components/mevsim/FoodGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { getFilteredFoods } from "@/lib/foods";
import type { Season, Category, Month } from "@/types";

export default function MevsimPage() {
  const t = useTranslations("mevsim");
  const [selectedMonth, setSelectedMonth] = useState<Month | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const foods = getFilteredFoods({
    month: selectedMonth ?? undefined,
    season: selectedSeason ?? undefined,
    category: selectedCategory ?? undefined,
  });

  return (
    <>
      <section className="bg-cream py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </div>
      </section>

      <FilterBar
        selectedMonth={selectedMonth}
        selectedSeason={selectedSeason}
        selectedCategory={selectedCategory}
        onMonthChange={setSelectedMonth}
        onSeasonChange={setSelectedSeason}
        onCategoryChange={setSelectedCategory}
      />

      <section className="py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <FoodGrid foods={foods} />
        </div>
      </section>
    </>
  );
}
