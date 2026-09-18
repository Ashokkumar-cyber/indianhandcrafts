"use client";

import React from "react";
import Link from "next/link";
import { STORE_DETAILS } from "@/lib/data/products";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Star, 
  ShieldCheck, 
  CameraOff, 
  Heart,
  Sparkles
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0908] border-t border-[#2E2924] text-text-stone text-xs">
      {/* Upper Footer: Heritage Story & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Kakinada Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#C4683C] to-[#8A1C14] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0F0E0D] rounded-[9px] flex items-center justify-center">
                  <span className="text-[#D4AF37] font-serif font-black text-sm">క</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-text-parchment">
                  INDIAN HANDICRAFTS
                </h3>
                <p className="font-telugu text-xs text-[#D4AF37]">
                  ఇండియన్ హ్యాండీక్రాఫ్ట్స్, కాకినాడ
                </p>
              </div>
            </div>

            <p className="text-xs text-text-stone leading-relaxed">
              A sacred bridge between hereditary master artisans of Andhra Pradesh and discerning art lovers across India and overseas. Hand-carved temple brass idols, GI-tagged woodcraft, and bespoke bulk return gifts.
            </p>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <strong className="font-bold">4.8★</strong>
                <span className="text-text-muted">(41 Google Reviews)</span>
              </span>
              <span className="text-[#2E2924]">|</span>
              <span className="text-emerald-400 font-medium">
                Fixed Fair Pricing
              </span>
            </div>
          </div>

          {/* Col 2: Showroom Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Kakinada Showroom
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-copper flex-shrink-0 mt-0.5" />
                <span className="leading-snug text-text-parchment">
                  Shop No. 6, SRMT Staff Association Building, Main Rd, Surya Rao Peta, Kakinada, AP 533001
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Open All 7 Days: 10:00 AM – 9:00 PM</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-text-parchment transition-colors">
                  {STORE_DETAILS.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsapp_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-medium"
                >
                  WhatsApp: +91 99088 44424
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Craft Provenance Clusters (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Craft Clusters
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog-section" className="hover:text-[#D4AF37] transition-colors block">
                  Srikalahasti Temple Brass
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#D4AF37] transition-colors block">
                  Kondapalli Poniki Wood
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#D4AF37] transition-colors block">
                  Etikoppaka Lacquerware
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#D4AF37] transition-colors block">
                  Thanjavur Teak &amp; Gold Foil
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#D4AF37] transition-colors block">
                  Dokra Lost-Wax Bell Metal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Showroom Notice & Assurance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-accent-copper">
              Showroom Notice
            </h4>

            <div className="rounded-xl bg-[#141210] border border-amber-900/40 p-3 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-xs">
                <CameraOff className="w-3.5 h-3.5 text-accent-copper" />
                <span>No Photography Inside</span>
              </div>
              <p className="text-[11px] text-text-stone leading-relaxed">
                In-store photography is strictly barred to safeguard proprietary artisan designs. Digital previews are available via WhatsApp.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Genuine Artisan-Direct Sourcing</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Location Pin */}
      <div className="bg-[#070605] border-t border-[#1F1C18] py-4 px-4 sm:px-6 lg:px-8 text-[11px] text-text-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Indian Handicrafts, Kakinada (ఇండియన్ హ్యాండీక్రాఫ్ట్స్). All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="#catalog-section" className="hover:text-text-parchment">Catalog</a>
            <a href="#gifting-calculator" className="hover:text-text-parchment">Bulk Calculator</a>
            <a href="#store-showroom" className="hover:text-text-parchment">SRMT Building Store</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
