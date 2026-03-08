"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Leaf, Apple, Carrot } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="whitespace-pre-line text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] text-bark"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-stone md:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 w-full sm:w-auto"
          >
            <Button href="/mevsim" size="lg" className="w-full sm:w-auto">
              {t("cta")}
            </Button>
          </motion.div>
        </div>

        <div className="mt-12 hidden items-center justify-center gap-12 text-sage/60 md:flex">
          <Leaf size={40} className="animate-pulse" style={{ animationDelay: "0s" }} />
          <Apple size={36} className="animate-pulse" style={{ animationDelay: "0.5s" }} />
          <Carrot size={36} className="animate-pulse" style={{ animationDelay: "1s" }} />
          <Leaf size={32} className="animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>
      </div>
    </section>
  );
}
