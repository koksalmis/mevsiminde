"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ShoppingBasket, Copy, Check, X, Share2, MessageCircle, ChefHat } from "lucide-react";
import { useTranslations } from "next-intl";
import { getAllFoods } from "@/lib/foods";
import { getCurrentMonth } from "@/lib/utils";
import { foodSymbol } from "@/lib/food-symbols";
import { Link } from "@/i18n/navigation";
import FilterBar from "@/components/mevsim/FilterBar";
import FoodGrid from "@/components/mevsim/FoodGrid";
import { useShopping } from "./ShoppingProvider";
import { getDishSuggestions } from "@/lib/dishes";
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
  const [shareMessage, setShareMessage] = useState("");
  const { ids, toggle, addMany, error } = useShopping();
  const all = getAllFoods();
  const list = all.filter(food => ids.includes(food.id));
  const listSignature = list.map(food => food.id).join(",");
  const copied = copiedList === listSignature;
  const listOnly = params.get("liste") === "1";
  const sharedSlugs = (params.get("paylas") ?? "").split(",").filter(Boolean);
  const shared = all.filter(food => sharedSlugs.includes(food.slug));
  const sharedNew = shared.filter(food => !ids.includes(food.id));
  const suggestions = getDishSuggestions(ids);
  const nameOf = (id: string) => all.find(food => food.id === id)?.name ?? id;
  const foods = all.filter(food => (!month || food.months.includes(month)) && (!season || food.seasons.includes(season)) && (!category || food.category === category) && (!listOnly || ids.includes(food.id)) && food.name.toLocaleLowerCase("tr").includes(query.trim().toLocaleLowerCase("tr")));
  function update(values: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(values).forEach(([key, value]) => { if (value) next.set(key, value); else next.delete(key); });
    window.history.replaceState(null, "", `${window.location.pathname}${next.size ? `?${next}` : ""}`);
  }
  function shareLink() {
    return `${window.location.origin}${window.location.pathname}?paylas=${list.map(food => food.slug).join(",")}`;
  }
  const shareText = `Pazar listem: ${list.map(food => food.name).join(", ")}`;
  async function share() {
    const url = shareLink();
    if (navigator.share) {
      try { await navigator.share({ title: "Pazar listem", text: shareText, url }); setShareMessage(""); return; }
      catch (shareError) { if (shareError instanceof Error && shareError.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(url); setShareMessage("Bağlantı kopyalandı. Listeyi göndermek istediğin kişiye yapıştır."); }
    catch { setShareMessage(`Bu bağlantıyı kopyalayıp gönder: ${url}`); }
  }
  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareLink()}`)}`, "_blank", "noopener,noreferrer");
  }
  async function copy() {
    try { await navigator.clipboard.writeText(`Alışveriş listem — mevsimin.de\n${list.map(food => `□ ${food.name}\n   Pazarcı ipucu: ${food.pickingTips}`).join("\n")}`); setCopiedList(listSignature); setCopyError(""); }
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
      {!!shared.length && <div role="status" className="mt-6 max-w-2xl rounded-3xl border border-sage/40 bg-mint p-5">
        <p className="font-medium text-bark">Seninle bir pazar listesi paylaşıldı</p>
        <p className="mt-1 text-sm leading-relaxed text-stone">{shared.map(food => `${foodSymbol(food.id)} ${food.name}`).join(" · ")}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {sharedNew.length ? <button onClick={() => { addMany(sharedNew.map(food => food.id)); update({ paylas: null, liste: "1", ay: null, mevsim: null, kategori: null, q: null }); }} className="rounded-full bg-forest px-5 py-3 text-sm text-white">Listeme ekle ({sharedNew.length})</button> : <p className="text-sm text-forest">Bu ürünlerin hepsi zaten listende.</p>}
          <button onClick={() => update({ paylas: null })} className="rounded-full border border-sand bg-white px-5 py-3 text-sm text-forest">Kapat</button>
        </div>
      </div>}
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
        <ShoppingBasket className="mb-3 text-forest" size={26}/><h2 className="font-serif text-2xl">Alışveriş listem</h2><p className="mt-2 text-xs leading-relaxed text-stone">Bu tarayıcıda saklanır. Kopyaladığında her ürünün pazarcı ipucu da listeye eklenir.</p>
        {!list.length ? <p className="my-6 text-sm text-stone">İlk ürününü “Listeme ekle” ile seç. Çantan burada dolmaya başlayacak.</p> : <ul className="my-5 divide-y divide-sand">{list.map(food => <li key={food.id} className="py-3"><div className="flex items-center gap-2"><span aria-hidden>{foodSymbol(food.id)}</span><Link href={`/mevsim/${food.slug}`} className="flex-1 text-sm hover:text-forest">{food.name}<span className="block text-xs text-stone">{food.months.includes(current) ? "Bu ay mevsiminde" : "Bu ay takvimde değil"}</span></Link><button aria-label={`${food.name} ürününü listeden çıkar`} onClick={() => { toggle(food.id); setCopiedList(null); }} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-mint"><X size={16}/></button></div><details className="group mt-1 pl-6"><summary className="cursor-pointer list-none text-xs font-medium text-forest [&::-webkit-details-marker]:hidden">Pazarcı ipucu <span aria-hidden className="inline-block transition-transform group-open:rotate-90">›</span></summary><p className="mt-1 text-xs leading-relaxed text-stone">{food.pickingTips}</p></details></li>)}</ul>}
        {!!list.length && <div className="flex flex-col gap-2">
          <button onClick={copy} className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm text-white">{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "Kopyalandı" : "Listeyi kopyala"}</button>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={share} className="flex items-center justify-center gap-2 rounded-full border border-sand px-3 py-3 text-sm text-forest hover:bg-mint"><Share2 size={16}/> Paylaş</button>
            <button onClick={shareWhatsApp} className="flex items-center justify-center gap-2 rounded-full border border-sand px-3 py-3 text-sm text-forest hover:bg-mint"><MessageCircle size={16}/> WhatsApp</button>
          </div>
        </div>}
        <p role="status" className="mt-3 break-words text-xs text-stone">{error || copyError || shareMessage}</p>
        {!!suggestions.length && <div className="mt-5 border-t border-sand pt-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-bark"><ChefHat size={17} className="text-forest"/> Listenle neler pişer?</h3>
          <ul className="mt-3 space-y-3">{suggestions.map(({ dish, missing }) => <li key={dish.id} className="text-sm"><span className="font-medium text-bark">{dish.name}</span><span className="text-xs text-stone"> · {dish.type}</span><span className="block text-xs text-stone">{missing.length ? `Bir de ${missing.map(nameOf).join(", ")} alırsan tamam` : "Mevsim malzemeleri listende"}</span></li>)}</ul>
        </div>}
      </aside>
    </div>
    <p className="mx-auto max-w-6xl px-4 pb-10 text-xs leading-relaxed text-stone">Takvim genel bir rehberdir; hasat zamanı bölgeye, hava koşullarına ve yetiştirme yöntemine göre değişebilir.</p>
  </>;
}
