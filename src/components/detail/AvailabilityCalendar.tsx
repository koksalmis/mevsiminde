import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Month } from "@/types";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  months: Month[];
}

const allMonths: Month[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function AvailabilityCalendar({ months }: AvailabilityCalendarProps) {
  const t = useTranslations("detail");
  const tMonths = useTranslations("monthsShort");

  return (
    <div>
      <SectionHeading title={t("availability")} align="left" />
      <div className="mt-4 flex gap-1.5 overflow-x-auto scrollbar-hide lg:gap-2">
        {allMonths.map((m) => (
          <div
            key={m}
            className={cn(
              "flex min-w-[3rem] flex-col items-center rounded-lg px-2 py-3 text-center transition-colors lg:min-w-[4rem] lg:px-3",
              months.includes(m)
                ? "bg-forest text-white"
                : "bg-white text-stone"
            )}
          >
            <span className="text-xs font-medium">{tMonths(String(m) as "1")}</span>
            <div
              className={cn(
                "mt-2 h-2 w-2 rounded-full",
                months.includes(m) ? "bg-white" : "bg-sand"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
