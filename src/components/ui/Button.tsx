import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest/50 focus:ring-offset-2";

  const variants = {
    primary: "bg-forest text-white hover:bg-forest-light active:scale-[0.98]",
    secondary: "bg-mint text-forest hover:bg-sage/30 active:scale-[0.98]",
    outline: "border-2 border-forest text-forest hover:bg-forest hover:text-white active:scale-[0.98]",
  };

  const sizes = {
    sm: "min-h-[40px] px-4 text-sm",
    md: "min-h-[44px] px-6 text-sm",
    lg: "min-h-[48px] px-8 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
