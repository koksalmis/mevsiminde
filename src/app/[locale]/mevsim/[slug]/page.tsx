import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { getAllFoods, getFoodBySlug, getRelatedFoods } from "@/lib/foods";
import FoodHero from "@/components/detail/FoodHero";
import NutritionTable from "@/components/detail/NutritionTable";
import HealthBenefits from "@/components/detail/HealthBenefits";
import AvailabilityCalendar from "@/components/detail/AvailabilityCalendar";
import RelatedFoods from "@/components/detail/RelatedFoods";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const foods = getAllFoods("tr");
  return foods.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const food = getFoodBySlug(slug);
  if (!food) return {};

  return {
    title: food.name,
    description: food.description,
    openGraph: {
      title: `${food.name} - mevsimin.de`,
      description: food.description,
    },
  };
}

export default async function FoodDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const food = getFoodBySlug(slug);

  if (!food) notFound();

  const related = getRelatedFoods(food);
  const t = await getTranslations("detail");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: food.name,
    description: food.description,
    category: food.category === "fruit" ? "Meyve" : "Sebze",
    image: food.image,
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
          <nav className="mb-6 flex items-center gap-1 text-sm text-stone" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest">{t("breadcrumbHome")}</Link>
            <ChevronRight size={14} />
            <Link href="/mevsim" className="hover:text-forest">{t("breadcrumbSeasonal")}</Link>
            <ChevronRight size={14} />
            <span className="font-medium text-bark">{food.name}</span>
          </nav>

          <FoodHero food={food} />

          <div className="mt-12 space-y-12 lg:mt-16 lg:space-y-16">
            <NutritionTable values={food.nutritionalValues} />
            <HealthBenefits benefits={food.healthBenefits} />

            {/* Pick & Store */}
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
              <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-bark">{t("pickingTips")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{food.pickingTips}</p>
              </div>
              <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-bark">{t("storageTips")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{food.storageTips}</p>
              </div>
            </div>

            <AvailabilityCalendar months={food.months} />
            <RelatedFoods foods={related} />
          </div>
        </div>
      </article>
    </>
  );
}
