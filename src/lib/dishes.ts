import { dishesTr, type Dish } from "@/data/dishes/tr";

export function getDishesForFood(foodId: string): Dish[] {
  return dishesTr.filter((dish) => dish.foods.includes(foodId));
}

export interface DishSuggestion {
  dish: Dish;
  /** Yemeğin listede olmayan mevsim malzemeleri. */
  missing: string[];
}

/**
 * Alışveriş listesindeki ürünlerle yapılabilecek yemekler.
 * Önce eksiği olmayanlar, sonra listeden en çok malzeme kullananlar gelir.
 */
export function getDishSuggestions(listIds: string[], limit = 4): DishSuggestion[] {
  return dishesTr
    .map((dish) => ({
      dish,
      matched: dish.foods.filter((id) => listIds.includes(id)).length,
      missing: dish.foods.filter((id) => !listIds.includes(id)),
    }))
    .filter((item) => item.matched > 0 && item.missing.length <= 1)
    .sort((a, b) => a.missing.length - b.missing.length || b.matched - a.matched)
    .slice(0, limit)
    .map(({ dish, missing }) => ({ dish, missing }));
}
