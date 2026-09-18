"use client";

import React from "react";
import { DEITY_QUICK_FILTERS } from "@/lib/data/products";
import { Sparkles, Crown, Flame, Trees, Palette, Sun, Gift } from "lucide-react";

interface DeityPillSliderProps {
  onSelectQuery: (query: string) => void;
  activeQuery?: string;
}

export default function DeityPillSlider({ onSelectQuery, activeQuery }: DeityPillSliderProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Crown": return <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />;
      case "Flame": return <Flame className="w-3.5 h-3.5 text-accent-copper" />;
      case "Trees": return <Trees className="w-3.5 h-3.5 text-emerald-400" />;
      case "Palette": return <Palette className="w-3.5 h-3.5 text-amber-400" />;
      case "Sun": return <Sun className="w-3.5 h-3.5 text-yellow-300" />;
      case "Gift": return <Gift className="w-3.5 h-3.5 text-accent-copper" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />;
    }
  };

  return (
    <section className="bg-[#121110] border-b border-[#2E2924] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-stone">
              Quick Craft &amp; Deity Focus (తక్షణ శోధన)
            </h2>
          </div>
          <span className="text-[11px] text-text-muted hidden sm:inline">
            Curated collections for temple sanctum &amp; home decor
          </span>
        </div>

        {/* Horizontal Scrollable Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth">
          {DEITY_QUICK_FILTERS.map((pill) => {
            const isActive = activeQuery?.toLowerCase() === pill.query.toLowerCase();
            return (
              <button
                key={pill.name}
                onClick={() => {
                  onSelectQuery(isActive ? "" : pill.query);
                  const catalogEl = document.getElementById("catalog-section");
                  if (catalogEl) {
                    catalogEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                  isActive
                    ? "bg-[#D4AF37]/20 border-[#D4AF37] text-text-parchment shadow-metallic-glow"
                    : "bg-[#1A1816] border-[#2E2924] text-text-stone hover:border-[#D4AF37]/40 hover:text-text-parchment"
                }`}
              >
                {getIcon(pill.icon)}
                <span>{pill.name}</span>
                <span className="text-[10px] bg-[#0F0E0D] border border-[#2E2924] text-text-muted px-1.5 py-0.5 rounded-full">
                  {pill.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
