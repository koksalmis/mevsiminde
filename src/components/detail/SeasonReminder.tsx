"use client";

import { useState } from "react";
import { BellRing, CalendarPlus } from "lucide-react";
import { istanbulNow, nextOccurrence, seasonStartMonths } from "@/lib/season";
import type { Month } from "@/types";

interface SeasonReminderProps {
  name: string;
  slug: string;
  months: Month[];
  pickingTips: string;
  /** Başlangıç ayının adı, ör. "Kasım" (sunucuda çevrilir). */
  startMonthName: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (year: number, month: number, day: number) => {
  const d = new Date(Date.UTC(year, month - 1, day));
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
};
/** RFC 5545 metin kaçışları. */
const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

export default function SeasonReminder({ name, slug, months, pickingTips, startMonthName }: SeasonReminderProps) {
  const [message, setMessage] = useState("");
  const starts = seasonStartMonths(months);
  if (!starts.length) return null;

  function details() {
    const url = `${window.location.origin}${window.location.pathname}`;
    const now = istanbulNow();
    const events = starts.map((m) => nextOccurrence(m, now));
    return { url, events, title: `${name} mevsimi başladı`, body: `Pazarcı ipucu: ${pickingTips}\n${url}` };
  }

  function downloadIcs() {
    const { url, events, title, body } = details();
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//mevsimin.de//Mevsim hatirlaticisi//TR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
    for (const e of events) {
      lines.push(
        "BEGIN:VEVENT",
        `UID:${slug}-${e.month}@mevsimin.de`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${ymd(e.year, e.month, 1)}`,
        `DTEND;VALUE=DATE:${ymd(e.year, e.month, 2)}`,
        "RRULE:FREQ=YEARLY",
        `SUMMARY:${icsText(title)}`,
        `DESCRIPTION:${icsText(body)}`,
        `URL:${url}`,
        "TRANSP:TRANSPARENT",
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        `DESCRIPTION:${icsText(title)}`,
        "TRIGGER:PT9H",
        "END:VALARM",
        "END:VEVENT"
      );
    }
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `${slug}-mevsimi.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    setMessage("Takvim dosyası indirildi. Açtığında hatırlatıcı her yıl takvimine eklenir.");
  }

  function openGoogle() {
    const { events, title, body } = details();
    const e = events[0];
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${ymd(e.year, e.month, 1)}/${ymd(e.year, e.month, 2)}`,
      details: body,
      recur: "RRULE:FREQ=YEARLY",
    });
    window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-6 rounded-2xl border border-sand bg-white p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-bark">
        <BellRing size={17} className="text-forest" aria-hidden />
        Mevsimi gelince hatırlat
      </p>
      <p className="mt-1 text-xs leading-relaxed text-stone">
        Her yıl {startMonthName} başında, pazarcı ipucuyla birlikte takvimine düşer. Üyelik gerekmez.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={downloadIcs} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-4 text-sm font-medium text-white hover:bg-forest-light">
          <CalendarPlus size={16} aria-hidden /> Takvimime ekle
        </button>
        <button type="button" onClick={openGoogle} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-sand px-4 text-sm font-medium text-forest hover:bg-mint">
          Google Takvim
        </button>
      </div>
      <p role="status" className="mt-2 text-xs text-stone">{message}</p>
    </div>
  );
}
