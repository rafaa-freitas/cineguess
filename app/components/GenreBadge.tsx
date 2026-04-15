"use client";

import { Zap, Sparkles, Ghost, Heart } from "lucide-react";

export type Genre = "Action" | "Animation" | "Horror" | "Romance";

const genreConfig: Record<Genre, { icon: React.ElementType; className: string; solidClass: string; emoji: string }> = {
  Action: {
    icon: Zap,
    className: "genre-action",
    solidClass: "genre-action-solid",
    emoji: "⚡",
  },
  Animation: {
    icon: Sparkles,
    className: "genre-animation",
    solidClass: "genre-animation-solid",
    emoji: "✨",
  },
  Horror: {
    icon: Ghost,
    className: "genre-horror",
    solidClass: "genre-horror-solid",
    emoji: "👻",
  },
  Romance: {
    icon: Heart,
    className: "genre-romance",
    solidClass: "genre-romance-solid",
    emoji: "💕",
  },
};

interface GenreBadgeProps {
  genre: Genre;
  size?: "sm" | "md" | "lg";
  solid?: boolean;
  selected?: boolean;
  onClick?: () => void;
  showIcon?: boolean;
}

export default function GenreBadge({
  genre,
  size = "md",
  solid = false,
  selected = false,
  onClick,
  showIcon = true,
}: GenreBadgeProps) {
  const config = genreConfig[genre];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-3 py-1 text-xs gap-1",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };

  const baseClasses = `
    inline-flex items-center font-semibold rounded-full border transition-all duration-300 cursor-pointer select-none
    ${sizeClasses[size]}
    ${solid || selected ? `${config.solidClass} text-white border-transparent shadow-lg` : `${config.className} border`}
    ${onClick ? "hover:scale-105 hover:shadow-lg active:scale-95" : ""}
    ${selected ? "ring-2 ring-white/30 ring-offset-2 ring-offset-transparent" : ""}
  `;

  return (
    <button className={baseClasses} onClick={onClick} type="button">
      {showIcon && <Icon size={size === "sm" ? 12 : size === "md" ? 14 : 16} />}
      {genre}
    </button>
  );
}

export { genreConfig };
