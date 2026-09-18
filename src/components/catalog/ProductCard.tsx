"use client";

import React from "react";
import Image from "next/image";
import { Product, getWhatsAppUrl } from "@/lib/data/products";
import { MessageCircle, Eye, ShieldCheck, Scale, Ruler, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const whatsappUrl = getWhatsAppUrl(product);

  return (
    <div className="group relative rounded-2xl bg-gradient-to-b from-[#181614] to-[#11100E] border border-[#2E2924] hover:border-[#D4AF37]/50 p-4 transition-all duration-400 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.12)] hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Top Image Stage */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0A0908] border border-[#2E2924]">
        <Image
          src={product.image_urls[0]}
          alt={product.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Subtle dark gradient overlay at bottom of canvas */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/60 to-transparent pointer-events-none" />

        {/* Material Provenance Badge */}
        <span className="absolute top-3 left-3 rounded-full bg-[#0A0908]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>{product.material}</span>
        </span>

        {/* GI Tag or Custom Badge */}
        {product.gi_tagged && (
          <span className="absolute top-3 right-3 rounded-full bg-emerald-950/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-600/40">
            GI Certified
          </span>
        )}

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onOpenDetail && onOpenDetail(product)}
          className="absolute inset-0 m-auto w-fit h-fit px-4 py-2 rounded-full bg-[#0A0908]/90 backdrop-blur-md border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-xl"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Inspect Specs</span>
        </button>

        {/* Tangible Spec Chips Overlay (Bottom of image) */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#0E0D0C]/90 backdrop-blur-sm border border-[#2E2924] text-[11px] text-text-stone">
          <span className="flex items-center gap-1.5 font-medium text-text-parchment">
            <Scale className="w-3.5 h-3.5 text-accent-copper" />
            <span>{product.weight_grams >= 1000 ? `${(product.weight_grams / 1000).toFixed(2)} kg` : `${product.weight_grams} g`}</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium text-text-parchment">
            <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{product.dimensions.split(' ')[0]}</span>
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-4 flex flex-col gap-2">
        <div>
          <h3 
            onClick={() => onOpenDetail && onOpenDetail(product)}
            className="font-serif text-base font-bold text-[#F7F3EE] line-clamp-1 group-hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            {product.title}
          </h3>
          <p className="font-telugu text-xs text-[#D4AF37]/90 line-clamp-1 mt-0.5">
            {product.title_telugu}
          </p>
        </div>

        {/* Micro-Attribute Details */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-stone">
          <span className="bg-[#100F0D] border border-[#2E2924] px-2 py-0.5 rounded text-text-stone font-medium">
            {product.technique.split(' ')[0]} {product.technique.split(' ')[1] || ''}
          </span>
          <span className="text-[#4E4841]">•</span>
          <span className="text-[11px] text-emerald-400 font-medium">
            Fixed Fair Rate
          </span>
        </div>

        {/* Price & 1-Click WhatsApp Action */}
        <div className="mt-2 pt-3 border-t border-[#2E2924] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
              Authentic Craft
            </span>
            <span className="text-xl font-black text-[#F7F3EE]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-accent-copper hover:bg-accent-copperHover text-white px-3.5 py-2.5 text-xs font-bold tracking-wide transition-all shadow-md active:scale-95"
            title="Order directly via WhatsApp with pre-filled SKU details"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Order</span>
          </a>
        </div>
      </div>

    </div>
  );
}
