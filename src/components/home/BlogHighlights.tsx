import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import BlogCard from "@/components/ui/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { BlogPost } from "@/types";

interface BlogHighlightsProps {
  posts: BlogPost[];
}

export default function BlogHighlights({ posts }: BlogHighlightsProps) {
  const t = useTranslations("blogHighlights");

  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} align="left" />
          <Link
            href="/blog"
            className="hidden items-center gap-1 text-sm font-medium text-forest hover:underline md:flex"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-6">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-forest"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
