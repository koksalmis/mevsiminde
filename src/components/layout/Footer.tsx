import { Leaf } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand bg-mint/50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:gap-16 lg:text-left">
          <div className="max-w-xs">
            <div className="mb-3 flex items-center justify-center gap-1.5 lg:justify-start">
              <Leaf size={20} className="text-forest" />
              <span className="text-lg font-bold text-forest">mevsimin.de</span>
            </div>
            <p className="text-sm leading-relaxed text-stone">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-bark">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-stone transition-colors hover:text-forest">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/mevsim" className="text-sm text-stone transition-colors hover:text-forest">
                  {t("nav.seasonal")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-stone transition-colors hover:text-forest">
                  {t("nav.blog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-bark">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-stone">{t("footer.about")}</span>
              </li>
              <li>
                <span className="text-sm text-stone">{t("footer.contact")}</span>
              </li>
              <li>
                <span className="text-sm text-stone">{t("footer.privacy")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-sand pt-6 text-center">
          <p className="text-xs text-stone">
            {t("footer.copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
