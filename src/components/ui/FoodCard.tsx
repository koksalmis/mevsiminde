import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { Food } from "@/types";
import SeasonBadge from "./SeasonBadge";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  food: Food;
  variant?: "compact" | "full";
  className?: string;
}

export default function FoodCard({ food, variant = "full", className }: FoodCardProps) {
  const t = useTranslations("category");

  if (variant === "compact") {
    return (
      <Link
        href={`/mevsim/${food.slug}`}
        className={cn(
          "flex w-[140px] shrink-0 snap-start flex-col items-center gap-2 lg:w-auto",
          className
        )}
      >
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-mint lg:h-28 lg:w-28">
          <div className="flex h-full w-full items-center justify-center text-4xl">
            {food.category === "fruit" ? "🍎" : "🥬"}
          </div>
        </div>
        <span className="text-center text-sm font-semibold text-bark">{food.name}</span>
        <span className="text-xs text-stone">
          {food.category === "fruit" ? t("fruit") : t("vegetable")}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/mevsim/${food.slug}`}
      className={cn(
        "hover-lift group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm",
        className
      )}
    >
      <div className="relative aspect-square bg-mint">
        <div className="flex h-full w-full items-center justify-center text-6xl">
          {food.category === "fruit" ? "🍎" : "🥬"}
        </div>
        <div className="absolute left-2 top-2">
          <SeasonBadge season={food.seasons[0]} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3 lg:p-4">
        <h3 className="font-semibold text-bark">{food.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-stone lg:text-sm">
          {food.description}
        </p>
        <div className="mt-auto flex items-center gap-1 pt-3 text-xs font-medium text-forest">
          <span>Detay</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
