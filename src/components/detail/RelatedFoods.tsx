import { useTranslations } from "next-intl";
import FoodCard from "@/components/ui/FoodCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Food } from "@/types";

interface RelatedFoodsProps {
  foods: Food[];
}

export default function RelatedFoods({ foods }: RelatedFoodsProps) {
  const t = useTranslations("detail");

  if (foods.length === 0) return null;

  return (
    <div>
      <SectionHeading title={t("relatedFoods")} align="left" />
      {/* Mobile: horizontal scroll */}
      <div className="mt-4 flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory lg:hidden">
        {foods.map((food) => (
          <div key={food.id} className="w-[160px] shrink-0 snap-start">
            <FoodCard food={food} variant="full" />
          </div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className="mt-4 hidden grid-cols-4 gap-6 lg:grid">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} variant="full" />
        ))}
      </div>
    </div>
  );
}
