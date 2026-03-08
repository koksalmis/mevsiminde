"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Season } from "@/types";
import { SEASON_BG_COLORS, SEASON_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SeasonPreviewProps {
  seasonCounts: Record<Season, number>;
}

const seasons: Season[] = ["spring", "summer", "autumn", "winter"];

export default function SeasonPreview({ seasonCounts }: SeasonPreviewProps) {
  const t = useTranslations();

  return (
    <section className="bg-white py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <SectionHeading
          title={t("seasonPreview.title")}
          subtitle={t("seasonPreview.subtitle")}
        />

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {seasons.map((season) => (
            <Link
              key={season}
              href={`/mevsim?mevsim=${season}`}
              className={cn(
                "hover-lift flex flex-col items-center gap-3 rounded-2xl p-6 transition-shadow lg:p-8",
                SEASON_BG_COLORS[season]
              )}
            >
              <span className="text-4xl lg:text-5xl">{SEASON_ICONS[season]}</span>
              <h3 className="text-lg font-semibold text-bark">{t(`season.${season}`)}</h3>
              <p className="text-sm text-stone">
                {t("seasonPreview.products", { count: seasonCounts[season] })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
