import { ChefHat } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import { getDishesForFood } from "@/lib/dishes";
import { getAllFoods } from "@/lib/foods";
import { foodSymbol } from "@/lib/food-symbols";
import type { Food } from "@/types";

export default function DishIdeas({ food }: { food: Food }) {
  const dishes = getDishesForFood(food.id);
  if (!dishes.length) return null;
  const foods = getAllFoods("tr");

  return (
    <div>
      <SectionHeading title={`${food.name} ile ne pişirilir?`} subtitle="Mevsiminde en güzel olduğu klasik tarifler" align="left" />
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => {
          const partners = dish.foods.filter((id) => id !== food.id).map((id) => foods.find((f) => f.id === id)).filter((f): f is Food => !!f);
          return (
            <li key={dish.id} className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-bark">{dish.name}</h3>
                <span className="shrink-0 rounded-full bg-mint px-2.5 py-1 text-xs font-medium text-forest">{dish.type}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone">{dish.description}</p>
              {!!partners.length && (
                <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-3 text-xs text-stone">
                  <ChefHat size={14} className="text-forest" aria-hidden />
                  Yanında:
                  {partners.map((p) => (
                    <Link key={p.id} href={`/mevsim/${p.slug}`} className="font-medium text-forest hover:underline">
                      <span aria-hidden>{foodSymbol(p.id)} </span>{p.name}
                    </Link>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
