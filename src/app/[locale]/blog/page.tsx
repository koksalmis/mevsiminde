"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";
import { getAllBlogPosts, getFeaturedPost, getBlogPostsByCategory } from "@/lib/blog";
import { cn } from "@/lib/utils";

const categories = ["all", "nutrition", "recipes", "seasonalGuide", "health"] as const;

export default function BlogPage() {
  const t = useTranslations("blog");
  const tCat = useTranslations("blog.categories");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const featured = getFeaturedPost();
  const allPosts = selectedCategory === "all"
    ? getAllBlogPosts()
    : getBlogPostsByCategory(selectedCategory);

  const nonFeatured = allPosts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <section className="bg-cream py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <FeaturedPost post={featured} />

          {/* Category filters */}
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x lg:flex-wrap lg:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[40px]",
                  selectedCategory === cat
                    ? "bg-forest text-white"
                    : "bg-white text-stone hover:bg-mint"
                )}
              >
                {tCat(cat)}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <BlogGrid posts={nonFeatured} />
          </div>
        </div>
      </section>
    </>
  );
}
