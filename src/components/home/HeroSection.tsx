import { ArrowRight, ShoppingBasket, Sprout } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getFoodsByMonth } from "@/lib/foods";
import { getCurrentMonth } from "@/lib/utils";
import { foodSymbol } from "@/lib/food-symbols";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const month = getCurrentMonth();
  const t = useTranslations("months");
  const foods = getFoodsByMonth(month);
  const previous = (month === 1 ? 12 : month - 1);
  const next = (month === 12 ? 1 : month + 1);
  const arrivals = foods.filter(food => !food.months.some(value => value === previous));
  const departing = foods.filter(food => !food.months.some(value => value === next));
  return <section className="relative overflow-hidden border-b border-sand bg-cream">
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:px-8">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-mint px-4 py-2 text-xs font-medium text-forest"><Sprout size={15}/>{t(String(month) as "1")} tezgâhı açık · {foods.length} mevsimlik ürün</div>
        <h1 className="font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.08] tracking-tight">Her şeyin bir<br/> <span className="italic text-forest">mevsimi var.</span></h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-stone md:text-lg">Bugün ne alacağını doğanın takvimine bırak. Mevsimindeki meyve ve sebzeleri tanı, pazar çantanı keyifle hazırla.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href={`/mevsim?ay=${month}`} className="inline-flex items-center gap-3 rounded-full bg-forest px-6 py-4 text-sm font-medium text-white hover:bg-forest-light">Bu ay ne yemeli? <ArrowRight size={18}/></Link><Link href="/mevsim?liste=1" className="inline-flex items-center gap-2 rounded-full border border-sand px-5 py-4 text-sm font-medium text-forest"><ShoppingBasket size={18}/>Listemi hazırla</Link></div>
        <p className="mt-6 text-xs text-stone">Üyelik yok. Mevsim takvimi, seçim ve saklama ipuçları var.</p>
      </div>
      <div className="relative rounded-[2rem] border border-sand bg-white p-6 shadow-[0_20px_70px_-35px_#2d5a3d55] md:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.2em] text-stone">Doğanın bu ayki seçkisi</p><h2 className="mt-2 font-serif text-3xl">{t(String(month) as "1")} pazarı</h2></div><span className="rounded-full bg-mint p-3 text-forest"><Sprout size={24}/></span></div>
        <div className="mt-6 grid grid-cols-3 gap-3">{foods.slice(0,6).map(food => <Link key={food.id} href={`/mevsim/${food.slug}`} className="rounded-2xl bg-cream p-3 text-center transition-colors hover:bg-mint"><span className="block py-3 text-4xl" aria-hidden>{foodSymbol(food.id)}</span><span className="text-xs font-medium text-bark">{food.name}</span></Link>)}</div>
        <div className="mt-6 space-y-3 border-t border-sand pt-5 text-sm">{!!arrivals.length && <p><span className="font-medium text-forest">Yeni başladı</span><span className="ml-2 text-stone">{arrivals.map(food => food.name).join(", ")}</span></p>}{!!departing.length && <p><span className="font-medium text-autumn">Takvimde son ayı</span><span className="ml-2 text-stone">{departing.map(food => food.name).join(", ")}</span></p>}<Link href={`/mevsim?ay=${month}`} className="flex items-center justify-between pt-1 font-medium text-forest">Tezgâhın tamamını keşfet <ArrowRight size={16}/></Link></div>
      </div>
    </div>
  </section>;
}
