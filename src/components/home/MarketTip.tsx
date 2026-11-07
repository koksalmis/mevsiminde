"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { foodSymbol } from "@/lib/food-symbols";
import type { Food } from "@/types";

type TipFood = Pick<Food, "id" | "slug" | "name" | "pickingTips" | "storageTips">;

interface MarketTipProps {
  foods: TipFood[];
  /** Sunucuda günün tarihinden hesaplanır; her gün farklı bir ürünle açılır. */
  startIndex: number;
}

export default function MarketTip({ foods, startIndex }: MarketTipProps) {
  const t = useTranslations("marketTip");
  const [index, setIndex] = useState(startIndex);

  if (!foods.length) return null;
  const food = foods[index % foods.length];

  return (
    <section className="pb-12 md:pb-16 lg:pb-24" aria-labelledby="market-tip-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-6 rounded-[2rem] border border-sand bg-white p-6 shadow-[0_20px_70px_-35px_#2d5a3d55] md:grid-cols-[200px_1fr] md:gap-10 md:p-10">
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-mint text-7xl md:h-48 md:w-48 md:text-8xl" aria-hidden>
            {foodSymbol(food.id)}
          </div>
          <div aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">{t("eyebrow")}</p>
            <h2 id="market-tip-title" className="mt-2 font-serif text-3xl text-bark md:text-4xl">
              {t("title", { name: food.name })}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-bark">{food.pickingTips}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone">
              <span className="font-medium text-forest">{t("storage")}</span> {food.storageTips}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {foods.length > 1 && (
                <button
                  type="button"
                  onClick={() => setIndex((value) => value + 1)}
                  className="inline-flex items-center gap-2 rounded-full border border-sand px-5 py-3 text-sm font-medium text-forest transition-colors hover:bg-mint"
                >
                  <RefreshCw size={16} aria-hidden />
                  {t("next")}
                </button>
              )}
              <Link
                href={`/mevsim/${food.slug}`}
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-forest hover:underline"
              >
                {t("detail", { name: food.name })}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
