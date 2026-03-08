import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import type { NutritionalValues } from "@/types";

interface NutritionTableProps {
  values: NutritionalValues;
}

export default function NutritionTable({ values }: NutritionTableProps) {
  const t = useTranslations("detail");

  const items = [
    { key: "calories", value: values.calories, unit: "kcal", max: 200 },
    { key: "protein", value: values.protein, unit: "g", max: 10 },
    { key: "carbs", value: values.carbs, unit: "g", max: 30 },
    { key: "fiber", value: values.fiber, unit: "g", max: 10 },
    { key: "vitaminC", value: values.vitaminC, unit: "mg", max: 100 },
  ] as const;

  return (
    <div>
      <SectionHeading title={t("nutrition")} align="left" />
      <p className="mt-1 text-xs text-stone">{t("per100g")}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {items.map(({ key, value, unit, max }) => (
          <div key={key} className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-stone">{t(key)}</p>
            <p className="mt-1 text-xl font-bold text-bark">
              {value}
              <span className="ml-0.5 text-xs font-normal text-stone">{unit}</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-forest transition-all"
                style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
