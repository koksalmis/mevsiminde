"use client";
import { Check, Plus } from "lucide-react";
import { useShopping } from "./ShoppingProvider";
export default function AddToList({ id, name }: { id: string; name: string }) {
  const { ids, toggle, error } = useShopping();
  const added = ids.includes(id);
  return <><button type="button" onClick={() => toggle(id)} aria-pressed={added} aria-label={`${name}: ${added ? "listeden çıkar" : "alışveriş listesine ekle"}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sand bg-white px-4 text-sm font-medium text-forest hover:bg-mint">{added ? <Check size={16}/> : <Plus size={16}/>} {added ? "Listemde" : "Listeme ekle"}</button>{error && <p role="alert" className="mt-2 text-xs text-stone">{error}</p>}</>;
}
