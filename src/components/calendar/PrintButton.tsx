"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-5 py-3 text-sm font-medium text-forest transition-colors hover:bg-mint print:hidden"
    >
      <Printer size={17} aria-hidden />
      Yazdır ya da PDF olarak kaydet
    </button>
  );
}
