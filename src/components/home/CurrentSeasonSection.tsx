"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import FoodCard from "@/components/ui/FoodCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Food, Month } from "@/types";

interface CurrentSeasonSectionProps {
  foods: Food[];
  currentMonth: Month;
}

export default function CurrentSeasonSection({ foods, currentMonth }: CurrentSeasonSectionProps) {
  const t = useTranslations("currentMonth");
  const tMonths = useTranslations("months");

  const monthName = tMonths(String(currentMonth) as "1");

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <SectionHeading title={t("title", { month: monthName })} align="left" />
          <Link
            href="/mevsim"
            className="hidden items-center gap-1 text-sm font-medium text-forest hover:underline md:flex"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory lg:hidden">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} variant="compact" />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="mt-8 hidden grid-cols-4 gap-6 lg:grid">
          {foods.slice(0, 8).map((food) => (
            <FoodCard key={food.id} food={food} variant="full" />
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/mevsim"
            className="inline-flex items-center gap-1 text-sm font-medium text-forest"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
