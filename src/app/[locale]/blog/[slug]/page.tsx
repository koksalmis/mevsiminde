import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Clock } from "lucide-react";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogCard from "@/components/ui/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts("tr");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

function extractTocItems(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }
  return items;
}

function renderMarkdown(content: string): string {
  const html = content
    .replace(/^### (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ\s-]/g, "").replace(/\s+/g, "-");
      return `<h3 id="${id}">${text}</h3>`;
    })
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ\s-]/g, "").replace(/\s+/g, "-");
      return `<h2 id="${id}">${text}</h2>`;
    })
    .replace(/^# (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ\s-]/g, "").replace(/\s+/g, "-");
      return `<h1 id="${id}">${text}</h1>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/^(?!<[hulo])/gm, (match) => match ? `<p>${match}` : match);

  return html;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const t = await getTranslations("blog");
  const related = getRelatedBlogPosts(post);
  const tocItems = extractTocItems(post.content);
  const htmlContent = renderMarkdown(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1 text-sm text-stone">
            <Link href="/" className="hover:text-forest">Anasayfa</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-forest">Blog</Link>
            <ChevronRight size={14} />
            <span className="line-clamp-1 font-medium text-bark">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-bark">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-stone">
              <span>{post.author}</span>
              <span>{new Date(post.publishedAt).toLocaleDateString("tr-TR")}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {t("readingTime", { minutes: post.readingTime })}
              </span>
            </div>
          </header>

          {/* Mobile ToC */}
          <div className="mb-8 lg:hidden">
            <TableOfContents items={tocItems} />
          </div>

          {/* Content + Desktop ToC */}
          <div className="flex gap-12">
            <div
              className="prose prose-stone max-w-none flex-1 prose-headings:font-semibold prose-headings:text-bark prose-a:text-forest lg:max-w-[720px]"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <div className="hidden w-64 shrink-0 lg:block">
              <TableOfContents items={tocItems} />
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <SectionHeading title={t("relatedPosts")} align="left" />
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
