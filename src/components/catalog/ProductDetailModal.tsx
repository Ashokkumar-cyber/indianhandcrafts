"use client";

import React from "react";
import Image from "next/image";
import { Product, STORE_DETAILS, getWhatsAppUrl } from "@/lib/data/products";
import { 
  X, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Scale, 
  Ruler, 
  CameraOff, 
  CheckCircle,
  MapPin,
  HeartHandshake
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  const whatsappUrl = getWhatsAppUrl(product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-gradient-to-b from-[#1A1816] to-[#121110] border border-[#D4AF37]/40 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0A0908]/80 border border-[#2E2924] text-text-stone hover:text-text-parchment hover:border-[#D4AF37] transition-all"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Canvas with Real Photo */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-[#0A0908] border-b md:border-b-0 md:border-r border-[#2E2924] flex items-center justify-center p-4">
            <div className="relative w-full h-80 sm:h-96 md:h-full max-h-[480px]">
              <Image
                src={product.image_urls[0]}
                alt={product.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="rounded-full bg-[#0A0908]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 shadow-md">
                {product.material}
              </span>
              {product.gi_tagged && (
                <span className="rounded-full bg-emerald-950/85 backdrop-blur-md px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-600/40">
                  GI Tagged Heritage
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Full Specifications & Ordering */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Telugu Subtitle */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  {product.category_name}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#F7F3EE] mt-1">
                  {product.title}
                </h2>
                <p className="font-telugu text-sm text-[#D4AF37] mt-0.5">
                  {product.title_telugu}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-[#2E2924]">
                <span className="text-3xl font-extrabold text-[#F7F3EE]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40 font-semibold">
                  Fixed Non-Bargain Fair Rate
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-stone leading-relaxed">
                {product.description}
              </p>

              {/* Tangible Spec Matrix */}
              <div className="rounded-xl bg-[#0F0E0D] border border-[#2E2924] p-3.5 space-y-2 text-xs">
                <div className="font-semibold text-text-parchment flex items-center gap-1.5 pb-1 border-b border-[#2E2924]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Artisanal Spec Sheet</span>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-text-stone">
                  <div>
                    <span className="text-text-muted block text-[11px]">Dimensions:</span>
                    <span className="text-text-parchment font-medium">{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[11px]">Exact Weight:</span>
                    <span className="text-text-parchment font-medium">
                      {product.weight_grams >= 1000 ? `${(product.weight_grams / 1000).toFixed(2)} kg` : `${product.weight_grams} grams`}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[11px]">Casting Technique:</span>
                    <span className="text-text-parchment font-medium">{product.technique}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[11px]">Craft Provenance:</span>
                    <span className="text-text-parchment font-medium">{product.craft_origin}</span>
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              <div className="rounded-xl bg-[#141210] border border-[#2E2924] p-3 text-xs text-text-stone space-y-1">
                <span className="font-medium text-text-parchment flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-copper" />
                  Preservation &amp; Care
                </span>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  {product.care_instructions}
                </p>
              </div>

              {/* Showroom Policy Note */}
              <div className="rounded-xl bg-amber-950/25 border border-amber-800/40 p-2.5 flex items-start gap-2 text-xs text-amber-200/90">
                <CameraOff className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">
                  <strong className="text-[#D4AF37]">In-Store Photography Restriction:</strong> Showroom photography is strictly barred to safeguard artisan copyright. Digital previews and close-ups are provided via WhatsApp.
                </span>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-6 pt-4 border-t border-[#2E2924] flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent-copper hover:bg-accent-copperHover text-white py-3 text-sm font-bold tracking-wide transition-all shadow-copper-glow active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp (+91 99088 44424)</span>
              </a>

              <p className="text-[11px] text-center text-text-muted">
                Pre-filled inquiry includes product code, dimensions, and weight for instant quotation.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
