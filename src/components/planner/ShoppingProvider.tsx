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
const ShoppingContext = createContext<{ ids: string[]; toggle: (id: string) => void; error: string }>({ ids: [], toggle: () => {}, error: "" });
export function ShoppingProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const [error, setError] = useState("");
  let ids: string[] = [];
  try { const parsed: unknown = JSON.parse(raw); if (Array.isArray(parsed)) ids = parsed.filter((id): id is string => typeof id === "string"); } catch {}
  function toggle(id: string) {
    try {
      const current: unknown = JSON.parse(snapshot());
      const list: string[] = Array.isArray(current) ? current.filter((item): item is string => typeof item === "string") : [];
      localStorage.setItem(key, JSON.stringify(list.includes(id) ? list.filter(item => item !== id) : [...list, id]));
      window.dispatchEvent(new Event(event));
      setError("");
    } catch { setError("Bu tarayıcıda liste kaydedilemiyor. Tarayıcının depolama izinlerini kontrol edin."); }
  }
  return <ShoppingContext.Provider value={{ ids, toggle, error }}>{children}</ShoppingContext.Provider>;
}
export function useShopping() { return useContext(ShoppingContext); }
