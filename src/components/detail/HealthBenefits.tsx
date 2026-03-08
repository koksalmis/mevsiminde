import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface HealthBenefitsProps {
  benefits: string[];
}

export default function HealthBenefits({ benefits }: HealthBenefitsProps) {
  const t = useTranslations("detail");

  return (
    <div>
      <SectionHeading title={t("healthBenefits")} align="left" />
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {benefits.map((benefit, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
            <div className="shrink-0 rounded-full bg-mint p-1.5 text-forest">
              <Check size={16} />
            </div>
            <p className="text-sm leading-relaxed text-bark">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
