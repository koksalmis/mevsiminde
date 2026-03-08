import { useTranslations } from "next-intl";
import { Frown } from "lucide-react";
import FoodCard from "@/components/ui/FoodCard";
import type { Food } from "@/types";

interface FoodGridProps {
  foods: Food[];
}

export default function FoodGrid({ foods }: FoodGridProps) {
  const t = useTranslations("mevsim");

  if (foods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Frown size={48} className="mb-4 text-sage" />
        <p className="text-lg font-medium text-bark">{t("emptyState")}</p>
        <p className="mt-2 text-sm text-stone">{t("seasonalTip")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} variant="full" />
      ))}
    </div>
  );
}
