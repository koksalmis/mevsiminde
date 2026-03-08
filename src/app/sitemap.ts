import type { MetadataRoute } from "next";
import { getAllFoods } from "@/lib/foods";
import { getAllBlogPosts } from "@/lib/blog";

const BASE_URL = "https://mevsimin.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const foods = getAllFoods("tr");
  const posts = getAllBlogPosts("tr");

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/mevsim`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const foodPages: MetadataRoute.Sitemap = foods.map((f) => ({
    url: `${BASE_URL}/mevsim/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...foodPages, ...blogPages];
}
