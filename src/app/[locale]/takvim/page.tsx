import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllFoods } from "@/lib/foods";
import { getCurrentMonth, cn } from "@/lib/utils";
import { foodSymbol } from "@/lib/food-symbols";
import PrintButton from "@/components/calendar/PrintButton";
import type { Food, Month } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yıllık hasat takvimi: hangi ay hangi meyve ve sebze?",
  description: "Meyve ve sebzelerin Türkiye'de hangi aylarda mevsiminde olduğunu tek tabloda gör. Yazdırıp mutfağına as.",
};

const MONTHS: Month[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function CalendarRows({ foods, current, monthName }: { foods: Food[]; current: Month; monthName: (m: Month) => string }) {
  return foods.map((food) => (
    <tr key={food.id} className="group">
      <th scope="row" className="sticky left-0 z-10 bg-white py-1.5 pr-3 text-left font-medium group-hover:bg-mint print:static">
        <Link href={`/mevsim/${food.slug}`} className="flex items-center gap-2 whitespace-nowrap text-sm text-bark hover:text-forest">
          <span aria-hidden>{foodSymbol(food.id)}</span>
          {food.name}
        </Link>
      </th>
      {MONTHS.map((m) => {
        const inSeason = food.months.includes(m);
        return (
          <td key={m} className={cn("px-0.5 py-1.5", m === current && "bg-mint/70 print:bg-transparent")}>
            <span
              className={cn(
                "block h-6 rounded-md",
                inSeason ? "bg-forest print:border print:border-forest" : "bg-sand/50"
              )}
              title={`${food.name} · ${monthName(m)}: ${inSeason ? "mevsiminde" : "mevsimi değil"}`}
            >
              <span className="sr-only">{inSeason ? "mevsiminde" : "mevsimi değil"}</span>
            </span>
          </td>
        );
      })}
    </tr>
  ));
}

export default async function HarvestCalendarPage() {
  const tMonths = await getTranslations("months");
  const tShort = await getTranslations("monthsShort");
  const current = getCurrentMonth();
  const foods = getAllFoods("tr");
  const byName = (a: Food, b: Food) => a.name.localeCompare(b.name, "tr");
  const fruits = foods.filter((f) => f.category === "fruit").sort(byName);
  const vegetables = foods.filter((f) => f.category === "vegetable").sort(byName);
  const monthName = (m: Month) => tMonths(String(m) as "1");
  const inSeasonNow = foods.filter((f) => f.months.includes(current)).length;

  const head = (label: string) => (
    <tr>
      <th scope="col" className="sticky left-0 z-10 bg-white pb-2 pt-6 pr-3 text-left font-serif text-xl font-normal text-bark print:static">
        {label}
      </th>
      {MONTHS.map((m) => (
        <th
          key={m}
          scope="col"
          className={cn(
            "px-0.5 pb-2 pt-6 text-center text-xs font-medium",
            m === current ? "text-forest" : "text-stone"
          )}
        >
          <abbr title={monthName(m)} className="no-underline">{tShort(String(m) as "1")}</abbr>
        </th>
      ))}
    </tr>
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8 print:max-w-none print:py-0">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest">Yıllık hasat takvimi</p>
          <h1 className="font-serif text-4xl text-bark md:text-5xl">Hangi ay ne yenir?</h1>
          <p className="mt-4 leading-relaxed text-stone">
            {foods.length} meyve ve sebzenin mevsimi tek tabloda. Koyu yeşil kutular ürünün tezgâhta en bol ve en lezzetli olduğu ayları gösterir. {monthName(current)} sütunu vurgulu: bu ay {inSeasonNow} ürün mevsiminde.
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-sand bg-white p-4 md:p-6 print:overflow-visible print:border-0 print:p-0">
        <table className="w-full min-w-[640px] border-collapse">
          <caption className="sr-only">Meyve ve sebzelerin aylara göre mevsim takvimi</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Ürün</th>
              {MONTHS.map((m) => <th key={m} scope="col">{monthName(m)}</th>)}
            </tr>
          </thead>
          <tbody>
            {head("Meyveler")}
            <CalendarRows foods={fruits} current={current} monthName={monthName} />
            {head("Sebzeler")}
            <CalendarRows foods={vegetables} current={current} monthName={monthName} />
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-5 rounded bg-forest" aria-hidden />Mevsiminde</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-5 rounded bg-sand/50" aria-hidden />Mevsimi değil</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-5 rounded bg-mint" aria-hidden />İçinde bulunduğumuz ay</span>
      </div>
      <p className="mt-6 max-w-2xl text-xs leading-relaxed text-stone">
        Takvim Türkiye geneli için bir rehberdir; hasat zamanı bölgeye, hava koşullarına ve yetiştirme yöntemine göre birkaç hafta kayabilir.
      </p>
    </section>
  );
}
