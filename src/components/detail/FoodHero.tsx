import { useTranslations } from "next-intl";
import SeasonBadge from "@/components/ui/SeasonBadge";
import type { Food } from "@/types";

interface FoodHeroProps {
  food: Food;
}

export default function FoodHero({ food }: FoodHeroProps) {
  const tMonths = useTranslations("months");

  const monthRange = food.months
    .map((m) => tMonths(String(m) as "1"))
    .join(", ");

  return (
    <div className="flex flex-col lg:flex-row lg:gap-12">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-mint lg:aspect-square lg:w-1/2">
        <div className="flex h-full w-full items-center justify-center text-8xl lg:text-9xl">
          {food.category === "fruit" ? "🍎" : "🥬"}
        </div>
      </div>

      <div className="mt-6 flex flex-col lg:mt-0 lg:flex-1 lg:justify-center">
        <div className="flex flex-wrap gap-2">
          {food.seasons.map((s) => (
            <SeasonBadge key={s} season={s} size="md" />
          ))}
        </div>
        <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold text-bark">
          {food.name}
        </h1>
        <p className="mt-2 text-sm text-stone">{monthRange}</p>
        <p className="mt-4 leading-relaxed text-stone">{food.description}</p>
      </div>
    </div>
  );
}
