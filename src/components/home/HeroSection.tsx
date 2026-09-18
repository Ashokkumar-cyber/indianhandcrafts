"use client";

import React from "react";
import { PRODUCTS, Product } from "@/lib/data/products";
import PoojaFlowerShowcase from "./PoojaFlowerShowcase";
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Flame
} from "lucide-react";

interface HeroSectionProps {
  onOpenProductModal?: (product: Product) => void;
  onOpenKala?: () => void;
}

export default function HeroSection({ onOpenProductModal, onOpenKala }: HeroSectionProps) {
  const featuredBalaji = PRODUCTS[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#2E2924]/80">
      {/* Background Divine Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[48rem] h-[32rem] rounded-full bg-gradient-to-b from-[#C4683C]/15 via-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-24 right-5 -z-10 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sacred Sanskrit Invocation Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#161412] border border-[#D4AF37]/30 px-4 py-1 text-[11px] text-[#D4AF37] shadow-inner font-serif tracking-widest uppercase">
            <span>❖</span>
            <span>|| శ్రీరస్తు శుభమస్తు అవిఘ్నమస్తు ||</span>
            <span>❖</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Devotional Typographic Hook (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Showroom Open Indicator */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#161412] border border-[#2E2924] px-3.5 py-1.5 w-fit text-xs text-text-stone">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-text-parchment">Kakinada Showroom Open</span>
              <span className="text-[#6E665B]">•</span>
              <span className="text-[#D4AF37] font-medium">Closes 9:00 PM</span>
              <span className="text-[#6E665B] hidden sm:inline">•</span>
              <span className="text-text-muted hidden sm:inline">Shop 6, SRMT Building</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F7F3EE] leading-[1.12]">
                Hand-Carved Divinity, <br />
                <span className="gold-gradient-text">
                  Direct from Master Sthapatis.
                </span>
              </h1>
              <p className="font-telugu text-sm sm:text-base text-[#D4AF37] font-medium tracking-wide">
                సాంప్రదాయ కళా వైభవం • ఘన ఇత్తడి &amp; పంచలోహ విగ్రహాలు, అసలైన కొండపల్లి, ఏటికొప్పాక కళారూపాలు
              </p>
            </div>

            {/* Narrative Subtitle */}
            <p className="text-sm sm:text-base text-text-stone max-w-xl leading-relaxed">
              Step into the flagship digital sanctum of <strong>Indian Handicrafts, Kakinada</strong>. We bring hereditary lost-wax bronze metalwork, GI-certified Andhra woodcraft, and bespoke wedding return gifts directly from artisan foundries to your home — with 100% transparent fair pricing.
            </p>

            {/* Spec Stamps / Trust Credentials */}
            <div className="grid grid-cols-3 gap-3 py-2 max-w-xl">
              <div className="rounded-xl bg-[#161412] border border-[#2E2924] hover:border-[#D4AF37]/40 p-3.5 flex flex-col gap-1 transition-all">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-accent-copper" />
                  Lost-Wax Cast
                </span>
                <span className="text-[11px] text-text-muted">Madhuchishtavidhana traditional foundry metal</span>
              </div>

              <div className="rounded-xl bg-[#161412] border border-[#2E2924] hover:border-[#D4AF37]/40 p-3.5 flex flex-col gap-1 transition-all">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  GI Tag Certified
                </span>
                <span className="text-[11px] text-text-muted">Genuine Kondapalli &amp; Etikoppaka heritage</span>
              </div>

              <div className="rounded-xl bg-[#161412] border border-[#2E2924] hover:border-[#D4AF37]/40 p-3.5 flex flex-col gap-1 transition-all">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-copper" />
                  Fixed Fair Rates
                </span>
                <span className="text-[11px] text-text-muted">Zero middlemen, non-bargain honest pricing</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#catalog-section"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3D874] to-[#C4683C] hover:from-[#e2be42] hover:to-[#db7140] text-[#090807] font-extrabold px-6 py-3.5 text-sm tracking-wide shadow-metallic-glow transition-all active:scale-95"
              >
                <span>Explore Master Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#gifting-calculator"
                className="flex items-center gap-2 rounded-xl bg-[#161412] hover:bg-[#201D1A] border border-[#2E2924] hover:border-[#D4AF37]/50 text-text-parchment font-semibold px-5 py-3.5 text-sm transition-all"
              >
                <span>Return-Gift Calculator</span>
                <span className="text-[11px] text-[#D4AF37] bg-[#090807] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  Bulk Favors
                </span>
              </a>

              <button
                onClick={onOpenKala}
                className="flex items-center gap-2 rounded-xl bg-[#161412] hover:bg-[#201D1A] border border-accent-copper/50 text-accent-copper hover:text-orange-400 font-semibold px-4 py-3.5 text-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-accent-copper" />
                <span>Ask Kala AI (తెలుగు)</span>
              </button>
            </div>

          </div>

          {/* RIGHT: Live Pooja Flower Shower Stage (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Backlight Halo */}
            <div className="absolute inset-0 m-auto w-80 h-80 rounded-full bg-gradient-to-tr from-[#C4683C]/25 via-[#D4AF37]/20 to-transparent blur-3xl pointer-events-none" />

            {/* Interactive Pooja Flower Shower Component */}
            <PoojaFlowerShowcase
              product={featuredBalaji}
              onInspect={() => onOpenProductModal && onOpenProductModal(featuredBalaji)}
            />

          </div>

        </div>
      </div>
    </section>
  );
}
