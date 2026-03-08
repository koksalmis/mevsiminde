import { useTranslations } from "next-intl";
import { Heart, Sparkles, TreePine } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function WhySeasonal() {
  const t = useTranslations("whySeasonal");

  const items = [
    { icon: Heart, titleKey: "nutritious" as const, color: "text-spring" },
    { icon: Sparkles, titleKey: "tasty" as const, color: "text-summer" },
    { icon: TreePine, titleKey: "sustainable" as const, color: "text-forest" },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:gap-8">
          {items.map(({ icon: Icon, titleKey, color }) => (
            <div
              key={titleKey}
              className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm lg:flex-1 lg:flex-col lg:items-center lg:p-8 lg:text-center"
            >
              <div className={`shrink-0 rounded-xl bg-mint p-3 ${color}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-bark lg:text-lg">{t(`${titleKey}.title`)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone lg:mt-2">
                  {t(`${titleKey}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
