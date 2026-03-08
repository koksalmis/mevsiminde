import HeroSection from "@/components/home/HeroSection";
import CurrentSeasonSection from "@/components/home/CurrentSeasonSection";
import SeasonPreview from "@/components/home/SeasonPreview";
import WhySeasonal from "@/components/home/WhySeasonal";
import BlogHighlights from "@/components/home/BlogHighlights";
import { getFoodsByMonth, getSeasonFoodCount } from "@/lib/foods";
import { getAllBlogPosts } from "@/lib/blog";
import { getCurrentMonth } from "@/lib/utils";
import type { Season } from "@/types";

export default function HomePage() {
  const currentMonth = getCurrentMonth();
  const currentFoods = getFoodsByMonth(currentMonth);
  const posts = getAllBlogPosts("tr");

  const seasons: Season[] = ["spring", "summer", "autumn", "winter"];
  const seasonCounts = Object.fromEntries(
    seasons.map((s) => [s, getSeasonFoodCount(s)])
  ) as Record<Season, number>;

  return (
    <>
      <HeroSection />
      <CurrentSeasonSection foods={currentFoods} currentMonth={currentMonth} />
      <SeasonPreview seasonCounts={seasonCounts} />
      <WhySeasonal />
      <BlogHighlights posts={posts} />
    </>
  );
}
