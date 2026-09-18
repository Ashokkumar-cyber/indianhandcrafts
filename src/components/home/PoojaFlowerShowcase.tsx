"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/lib/data/products";
import { 
  Sparkles, 
  Scale, 
  Ruler, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface PoojaFlowerShowcaseProps {
  product: Product;
  onInspect?: () => void;
}

export default function PoojaFlowerShowcase({ product, onInspect }: PoojaFlowerShowcaseProps) {
  return (
    <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#1C1916] to-[#121110] border border-[#D4AF37]/40 p-3.5 shadow-2xl hover:border-[#D4AF37]/70 transition-all duration-500 group overflow-hidden">
      
      {/* 1. Main Visual Stage with Real Balaji Idol Photograph */}
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#0A0908] border border-[#2E2924] shadow-inner">
        
        {/* Real Photograph */}
        <Image
          src={product.image_urls[0]}
          alt={product.title}
          fill
          priority
          unoptimized
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-[#0A0908]/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-[#0A0908]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 shadow-lg">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>Showroom Crown Piece</span>
        </div>

        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-600/40">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>In Stock</span>
        </div>

        {/* Floating Tangible Spec Pills (Bottom Overlay) */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#0E0D0C]/90 backdrop-blur-md border border-[#2E2924]">
          <div className="flex items-center gap-1.5 text-xs text-text-parchment">
            <Scale className="w-3.5 h-3.5 text-accent-copper" />
            <span className="font-bold">1,850g</span>
            <span className="text-text-muted">Solid Brass</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-parchment">
            <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold">8.5" Height</span>
          </div>
          <span className="text-[10px] bg-[#1A1816] text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/20 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            Foundry A+
          </span>
        </div>

      </div>

      {/* 2. Card Bottom Metadata & WhatsApp Direct Ordering */}
      <div className="mt-3.5 p-1 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-text-parchment group-hover:text-[#D4AF37] transition-colors">
            {product.title}
          </h3>
          <span className="text-xs text-text-stone">
            Code: {product.id}
          </span>
        </div>

        <p className="font-telugu text-xs text-[#D4AF37]">
          {product.title_telugu}
        </p>

        {/* Price & Action Row */}
        <div className="mt-1 pt-3 border-t border-[#2E2924] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
              Authentic Cast Price
            </span>
            <span className="text-2xl font-black text-[#F7F3EE]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onInspect && (
              <button
                onClick={onInspect}
                className="px-3 py-2 text-xs font-semibold text-text-stone hover:text-text-parchment border border-[#2E2924] rounded-xl hover:bg-[#121110] transition-colors"
              >
                Inspect Specs
              </button>
            )}

            <a
              href={`https://wa.me/919908844424?text=${encodeURIComponent(`Namaste Indian Handicrafts Kakinada, I am interested in ordering the featured ${product.title} (₹${product.price}). Please confirm availability.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-accent-copper hover:bg-accent-copperHover text-white px-3.5 py-2.5 text-xs font-bold tracking-wide transition-all shadow-copper-glow active:scale-95"
            >
              <span>WhatsApp Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
