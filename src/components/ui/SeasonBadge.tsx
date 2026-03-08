import { useTranslations } from "next-intl";
import type { Season } from "@/types";
import { SEASON_COLORS, SEASON_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SeasonBadgeProps {
  season: Season;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

export default function SeasonBadge({
  season,
  size = "sm",
  showIcon = true,
  className,
}: SeasonBadgeProps) {
  const t = useTranslations("season");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        SEASON_COLORS[season],
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      {showIcon && <span>{SEASON_ICONS[season]}</span>}
      {t(season)}
    </span>
  );
}
