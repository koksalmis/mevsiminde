"use client";

import { createContext, useContext, useSyncExternalStore, useState, type ReactNode } from "react";

const key = "mevsiminde-shopping-v1";
const event = "mevsiminde-shopping-change";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(event, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(event, callback); };
}
function snapshot() { try { return localStorage.getItem(key) ?? "[]"; } catch { return "[]"; } }
const ShoppingContext = createContext<{ ids: string[]; toggle: (id: string) => void; addMany: (ids: string[]) => void; error: string }>({ ids: [], toggle: () => {}, addMany: () => {}, error: "" });
export function ShoppingProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const [error, setError] = useState("");
  let ids: string[] = [];
  try { const parsed: unknown = JSON.parse(raw); if (Array.isArray(parsed)) ids = parsed.filter((id): id is string => typeof id === "string"); } catch {}
  function write(change: (list: string[]) => string[]) {
    try {
      const current: unknown = JSON.parse(snapshot());
      const list: string[] = Array.isArray(current) ? current.filter((item): item is string => typeof item === "string") : [];
      localStorage.setItem(key, JSON.stringify(change(list)));
      window.dispatchEvent(new Event(event));
      setError("");
    } catch { setError("Bu tarayıcıda liste kaydedilemiyor. Tarayıcının depolama izinlerini kontrol edin."); }
  }
  function toggle(id: string) { write(list => list.includes(id) ? list.filter(item => item !== id) : [...list, id]); }
  function addMany(newIds: string[]) { write(list => [...list, ...newIds.filter(id => !list.includes(id))]); }
  return <ShoppingContext.Provider value={{ ids, toggle, addMany, error }}>{children}</ShoppingContext.Provider>;
}
export function useShopping() { return useContext(ShoppingContext); }
