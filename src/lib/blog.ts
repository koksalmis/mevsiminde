import type { BlogPost, Locale } from "@/types";
import { blogPostsTr } from "@/data/blog-posts/tr";

const postsByLocale: Record<Locale, BlogPost[]> = {
  tr: blogPostsTr,
};

export function getAllBlogPosts(locale: Locale = "tr"): BlogPost[] {
  return postsByLocale[locale].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string, locale: Locale = "tr"): BlogPost | undefined {
  return postsByLocale[locale].find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string, locale: Locale = "tr"): BlogPost[] {
  if (category === "all") return getAllBlogPosts(locale);
  return getAllBlogPosts(locale).filter((p) => p.category === category);
}

export function getFeaturedPost(locale: Locale = "tr"): BlogPost {
  return getAllBlogPosts(locale)[0];
}

export function getRelatedBlogPosts(post: BlogPost, locale: Locale = "tr", limit = 3): BlogPost[] {
  return getAllBlogPosts(locale)
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}
