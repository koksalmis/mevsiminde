import { Link } from "@/i18n/navigation";
import { foodSymbol } from "@/lib/food-symbols";
import type { Food, NutritionalValues } from "@/types";

interface Champion {
  key: keyof NutritionalValues;
  label: string;
  unit: string;
  pick: "max" | "min";
  note: string;
}

const CHAMPIONS: Champion[] = [
  { key: "vitaminC", label: "En çok C vitamini", unit: "mg", pick: "max", note: "Bağışıklık sistemini destekleyen vitamin" },
  { key: "fiber", label: "En çok lif", unit: "g", pick: "max", note: "Uzun süre tok tutar, sindirime iyi gelir" },
  { key: "protein", label: "En çok protein", unit: "g", pick: "max", note: "Bitkisel protein arayanlar için" },
  { key: "calories", label: "En hafifi", unit: "kcal", pick: "min", note: "Gönül rahatlığıyla bol bol" },
];

const format = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 1 });

export default function NutritionChampions({ foods, monthName }: { foods: Food[]; monthName: string }) {
  if (foods.length < 2) return null;

  return (
    <section className="pb-12 md:pb-16 lg:pb-24" aria-labelledby="champions-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 id="champions-title" className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight text-bark">
          {monthName} ayının besin şampiyonları
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone md:text-base">
          Bu ay mevsiminde olan {foods.length} ürün arasında, 100 gram başına değerlere göre.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {CHAMPIONS.map((c) => {
            const winner = [...foods].sort((a, b) =>
              c.pick === "max" ? b.nutritionalValues[c.key] - a.nutritionalValues[c.key] : a.nutritionalValues[c.key] - b.nutritionalValues[c.key]
            )[0];
            return (
              <li key={c.key}>
                <Link href={`/mevsim/${winner.slug}`} className="hover-lift flex h-full flex-col rounded-2xl bg-white p-4 shadow-sm md:p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-forest">{c.label}</span>
                  <span className="mt-3 flex items-center gap-2">
                    <span className="text-3xl" aria-hidden>{foodSymbol(winner.id)}</span>
                    <span className="text-lg font-semibold text-bark">{winner.name}</span>
                  </span>
                  <span className="mt-2 text-2xl font-bold tabular-nums text-bark">
                    {format(winner.nutritionalValues[c.key])}
                    <span className="ml-1 text-sm font-medium text-stone">{c.unit}</span>
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-stone">{c.note}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
