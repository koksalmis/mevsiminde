"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ShoppingBasket, Copy, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { getAllFoods } from "@/lib/foods";
import { getCurrentMonth } from "@/lib/utils";
import { foodSymbol } from "@/lib/food-symbols";
import { Link } from "@/i18n/navigation";
import FilterBar from "@/components/mevsim/FilterBar";
import FoodGrid from "@/components/mevsim/FoodGrid";
import { useShopping } from "./ShoppingProvider";
import type { Month, Season, Category } from "@/types";

const seasons: Season[] = ["spring", "summer", "autumn", "winter"];
export default function SeasonalExplorer() {
  const params = useSearchParams();
  const t = useTranslations("months");
  const current = getCurrentMonth();
  const monthParam = params.get("ay");
  const month = monthParam && Number.isInteger(Number(monthParam)) && Number(monthParam) >= 1 && Number(monthParam) <= 12 ? Number(monthParam) as Month : null;
  const season = seasons.find(value => value === params.get("mevsim")) ?? null;
  const category = (["fruit", "vegetable"] as Category[]).find(value => value === params.get("kategori")) ?? null;
  const query = params.get("q") ?? "";
  const [copiedList, setCopiedList] = useState<string | null>(null);
  const [copyError, setCopyError] = useState("");
  const { ids, toggle, error } = useShopping();
  const all = getAllFoods();
  const list = all.filter(food => ids.includes(food.id));
  const listSignature = list.map(food => food.id).join(",");
  const copied = copiedList === listSignature;
  const listOnly = params.get("liste") === "1";
  const foods = all.filter(food => (!month || food.months.includes(month)) && (!season || food.seasons.includes(season)) && (!category || food.category === category) && (!listOnly || ids.includes(food.id)) && food.name.toLocaleLowerCase("tr").includes(query.trim().toLocaleLowerCase("tr")));
  function update(values: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(values).forEach(([key, value]) => { if (value) next.set(key, value); else next.delete(key); });
    window.history.replaceState(null, "", `${window.location.pathname}${next.size ? `?${next}` : ""}`);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(`Alışveriş listem — mevsimin.de\n${list.map(food => `□ ${food.name}`).join("\n")}`); setCopiedList(listSignature); setCopyError(""); }
    catch { setCopyError("Liste kopyalanamadı. Ürün adlarını seçerek kopyalayabilirsiniz."); }
  }
  return <>
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest">Tarladan tezgâha, zamanında</p>
      <h1 className="font-serif text-4xl md:text-5xl">Pazar çantanı mevsimle doldur.</h1>
      <p className="mt-4 max-w-xl text-stone">Ayını seç, ürünleri keşfet, alacaklarını listene ekle. Küçük bir alışkanlık, daha mevsiminde bir sofra.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-full bg-forest px-5 py-3 text-sm text-white" onClick={() => update({ ay: String(current), mevsim: null, liste: null })}>Şimdi mevsiminde · {t(String(current) as "1")}</button>
        <button aria-pressed={listOnly} className="flex items-center gap-2 rounded-full border border-sand bg-white px-5 py-3 text-sm text-forest" onClick={() => update({ liste: listOnly ? null : "1", ay: null, mevsim: null, kategori: null, q: null })}><ShoppingBasket size={17}/> Listem ({list.length})</button>
      </div>
    </section>
    <FilterBar selectedMonth={month} selectedSeason={season} selectedCategory={category} onMonthChange={value => update({ ay: value ? String(value) : null, mevsim: null })} onSeasonChange={value => update({ mevsim: value, ay: null })} onCategoryChange={value => update({ kategori: value })}/>
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:px-6 lg:grid-cols-[1fr_280px] lg:px-8">
      <section>
        <label className="flex items-center gap-3 rounded-2xl border border-sand bg-white px-4"><Search size={20} className="text-sage"/><span className="sr-only">Ürün ara</span><input value={query} onChange={event => update({ q: event.target.value })} placeholder="Elma, ıspanak, brokoli…" className="min-w-0 flex-1 bg-transparent py-4 outline-none" type="search"/></label>
        <div className="my-5 flex items-center justify-between gap-3"><p role="status" className="text-sm text-stone">{foods.length} ürün{listOnly ? " · alışveriş listemde" : ""}</p><button onClick={() => update({ ay: null, mevsim: null, kategori: null, q: null, liste: null })} className="text-sm text-forest underline underline-offset-4">Filtreleri temizle</button></div>
        <FoodGrid foods={foods}/>
        {!foods.length && <button onClick={() => update({ ay: null, mevsim: null, kategori: null, q: null, liste: null })} className="mx-auto block rounded-full bg-forest px-6 py-3 text-sm text-white">Tüm ürünleri göster</button>}
      </section>
      <aside className="h-fit rounded-3xl border border-sand bg-white p-5 lg:sticky lg:top-48">
        <ShoppingBasket className="mb-3 text-forest" size={26}/><h2 className="font-serif text-2xl">Alışveriş listem</h2><p className="mt-2 text-xs leading-relaxed text-stone">Bu tarayıcıda saklanır. Pazara çıkmadan önce kopyalayıp yanında götür.</p>
        {!list.length ? <p className="my-6 text-sm text-stone">İlk ürününü “Listeme ekle” ile seç. Çantan burada dolmaya başlayacak.</p> : <ul className="my-5 divide-y divide-sand">{list.map(food => <li key={food.id} className="flex items-center gap-2 py-3"><span aria-hidden>{foodSymbol(food.id)}</span><Link href={`/mevsim/${food.slug}`} className="flex-1 text-sm hover:text-forest">{food.name}<span className="block text-xs text-stone">{food.months.includes(current) ? "Bu ay mevsiminde" : "Bu ay takvimde değil"}</span></Link><button aria-label={`${food.name} ürününü listeden çıkar`} onClick={() => { toggle(food.id); setCopiedList(null); }} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-mint"><X size={16}/></button></li>)}</ul>}
        {!!list.length && <button onClick={copy} className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm text-white">{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "Kopyalandı" : "Listeyi kopyala"}</button>}
        <p role="status" className="mt-3 text-xs text-stone">{error || copyError}</p>
      </aside>
    </div>
    <p className="mx-auto max-w-6xl px-4 pb-10 text-xs leading-relaxed text-stone">Takvim genel bir rehberdir; hasat zamanı bölgeye, hava koşullarına ve yetiştirme yöntemine göre değişebilir.</p>
  </>;
}
