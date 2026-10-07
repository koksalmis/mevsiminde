import { Suspense } from "react";
import type { Metadata } from "next";
import SeasonalExplorer from "@/components/planner/SeasonalExplorer";
export const metadata: Metadata = { title: "Mevsim takvimi ve alışveriş listesi", description: "Aya göre meyve ve sebzeleri keşfet, ürün ara ve kendi mevsimlik alışveriş listeni oluştur." };
export default function MevsimPage() {
  return <Suspense fallback={<p className="p-12 text-center text-stone">Mevsim takvimi hazırlanıyor…</p>}><SeasonalExplorer/></Suspense>;
}
