import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const t = useTranslations("blog");
  const tCat = useTranslations("blog.categories");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="hover-lift group block overflow-hidden rounded-2xl bg-white shadow-sm"
    >
      <div className="relative aspect-[16/9] bg-mint md:aspect-[21/9]">
        <div className="flex h-full w-full items-center justify-center text-6xl">📝</div>
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-forest px-3 py-1 text-xs font-medium text-white">
            {t("featured")}
          </span>
        </div>
      </div>
      <div className="p-5 lg:p-8">
        <span className="text-xs font-medium text-sage">
          {tCat(post.category as "all")}
        </span>
        <h2 className="mt-2 text-xl font-bold text-bark group-hover:text-forest lg:text-2xl">
          {post.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone lg:text-base">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-stone">
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
