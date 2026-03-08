"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const t = useTranslations("blog");
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="rounded-xl bg-white p-4 shadow-sm lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-sm font-semibold text-bark"
        >
          {t("tableOfContents")}
          <ChevronDown
            size={18}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </button>
        {isOpen && (
          <nav className="mt-3 space-y-2 border-t border-sand pt-3">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block text-sm text-stone hover:text-forest",
                  item.level > 2 && "pl-4"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <h3 className="text-sm font-semibold text-bark">{t("tableOfContents")}</h3>
          <nav className="mt-3 space-y-2 border-l-2 border-sand pl-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block text-sm text-stone transition-colors hover:text-forest",
                  item.level > 2 && "pl-3 text-xs"
                )}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
