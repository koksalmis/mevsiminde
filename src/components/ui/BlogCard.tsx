import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export default function BlogCard({ post, className }: BlogCardProps) {
  const t = useTranslations("blog");
  const tCat = useTranslations("blog.categories");

  const categoryColors: Record<string, string> = {
    nutrition: "bg-spring/30 text-green-800",
    recipes: "bg-summer/30 text-amber-800",
    seasonalGuide: "bg-winter/30 text-blue-800",
    health: "bg-autumn/30 text-orange-800",
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "hover-lift group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm",
        className
      )}
    >
      <div className="relative aspect-[16/9] bg-mint">
        <div className="flex h-full w-full items-center justify-center text-4xl">📝</div>
        <div className="absolute left-3 top-3">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              categoryColors[post.category] || "bg-sage/30 text-forest"
            )}
          >
            {tCat(post.category as "all")}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug text-bark group-hover:text-forest lg:text-lg">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-stone">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-stone">
          <span>{new Date(post.publishedAt).toLocaleDateString("tr-TR")}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {t("readingTime", { minutes: post.readingTime })}
          </span>
        </div>
      </div>
    </Link>
  );
}
