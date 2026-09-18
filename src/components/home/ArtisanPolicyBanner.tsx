"use client";

import React from "react";
import { STORE_DETAILS } from "@/lib/data/products";
import { CameraOff, ShieldCheck, HeartHandshake, Award, Sparkles, MessageCircle } from "lucide-react";

export default function ArtisanPolicyBanner() {
  return (
    <section id="artisan-policy" className="py-12 bg-gradient-to-r from-[#161412] via-[#1A1816] to-[#161412] border-y border-[#2E2924] relative overflow-hidden">
      {/* Subtle metallic diagonal background striping */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl bg-[#0F0E0D]/90 border border-[#D4AF37]/30 p-6 sm:p-8 lg:p-10 shadow-brass-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: High-Contrast No-Photo Guardrail */}
            <div className="lg:col-span-5 rounded-xl bg-gradient-to-br from-amber-950/40 to-[#1A1816] border border-amber-700/40 p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-600/50 text-[#D4AF37]">
                  <CameraOff className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#D4AF37]">
                    Strict Showroom Policy Notice
                  </span>
                  <h3 className="font-serif text-lg font-bold text-text-parchment">
                    No Photography Inside Showroom
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-text-stone leading-relaxed">
                To protect proprietary designs, chisel patterns, and generational intellectual copyright of our hereditary artisans, <strong>photography is strictly prohibited</strong> inside our Kakinada showroom.
              </p>

              <div className="pt-2 border-t border-[#2E2924] flex items-center justify-between">
                <span className="text-xs text-text-muted">
                  High-res previews &amp; 360° videos?
                </span>
                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent("Namaste, I would like to request digital preview photos of artisan items from your Kakinada showroom.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-yellow-300 underline underline-offset-4"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Request WhatsApp Previews</span>
                </a>
              </div>
            </div>

            {/* Right Column: Artisan Integrity & Trust Pillars */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Artisan Integrity &amp; Ethical Remuneration
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-parchment leading-snug">
                Honoring 5 Generations of Andhra Sthapatis &amp; Toymakers
              </h2>

              <p className="text-xs sm:text-sm text-text-stone leading-relaxed">
                Unlike commercial souvenir resellers, every bronze cast, wooden toy, and embossed foil art piece at Indian Handicrafts supports rural craft clusters across Godavari, Krishna, and Visakhapatnam districts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-lg bg-[#141210] border border-[#2E2924] p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-accent-copper" />
                    <span>Fixed Fair Rates</span>
                  </div>
                  <span className="text-[11px] text-text-muted">
                    No artificial markups, no bargaining, 100% fair artisan payment.
                  </span>
                </div>

                <div className="rounded-lg bg-[#141210] border border-[#2E2924] p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>GI-Tag Protection</span>
                  </div>
                  <span className="text-[11px] text-text-muted">
                    Genuine geographical indication verified white Poniki &amp; Ankudu woods.
                  </span>
                </div>

                <div className="rounded-lg bg-[#141210] border border-[#2E2924] p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold">
                    <HeartHandshake className="w-4 h-4 text-accent-copper" />
                    <span>Non-Toxic Dyes</span>
                  </div>
                  <span className="text-[11px] text-text-muted">
                    100% natural tree lacquers, turmeric, indigo, and herbal colors.
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
