"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const links = [
    { href: "/", label: t("home") },
    { href: "/mevsim", label: t("seasonal") },
    { href: "/blog", label: t("blog") },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-forest"
        >
          <div className="flex h-14 items-center justify-between px-4">
            <span className="text-lg font-bold text-white">mevsimin.de</span>
            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center text-white"
              aria-label="Menüyü kapat"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center gap-8 pt-20">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-3xl font-semibold text-white transition-colors hover:text-mint"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
