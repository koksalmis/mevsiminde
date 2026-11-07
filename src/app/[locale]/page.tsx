import HeroSection from "@/components/home/HeroSection";
import CurrentSeasonSection from "@/components/home/CurrentSeasonSection";
import SeasonPreview from "@/components/home/SeasonPreview";
import WhySeasonal from "@/components/home/WhySeasonal";
import BlogHighlights from "@/components/home/BlogHighlights";
import MarketTip from "@/components/home/MarketTip";
import { getFoodsByMonth, getSeasonFoodCount } from "@/lib/foods";
import { getAllBlogPosts } from "@/lib/blog";
import { getCurrentMonth, getIstanbulDayIndex } from "@/lib/utils";
import type { Season } from "@/types";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const currentMonth = getCurrentMonth();
  const currentFoods = getFoodsByMonth(currentMonth);
  const posts = getAllBlogPosts("tr");
  // Pazarcı ipucu her gün başka bir mevsim ürünüyle açılır.
  const dayIndex = getIstanbulDayIndex();
  const tipFoods = currentFoods.map(({ id, slug, name, pickingTips, storageTips }) => ({ id, slug, name, pickingTips, storageTips }));

  const seasons: Season[] = ["spring", "summer", "autumn", "winter"];
  const seasonCounts = Object.fromEntries(
    seasons.map((s) => [s, getSeasonFoodCount(s)])
  ) as Record<Season, number>;

  return (
    <>
      <HeroSection />
      <CurrentSeasonSection foods={currentFoods} currentMonth={currentMonth} />
      <MarketTip foods={tipFoods} startIndex={tipFoods.length ? dayIndex % tipFoods.length : 0} />
      <SeasonPreview seasonCounts={seasonCounts} />
      <WhySeasonal />
      <BlogHighlights posts={posts} />
    </>
  );
}
