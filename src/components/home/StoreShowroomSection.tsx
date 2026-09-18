"use client";

import React from "react";
import { STORE_DETAILS } from "@/lib/data/products";
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Navigation, 
  Star, 
  ShieldCheck, 
  CameraOff,
  Sparkles,
  ExternalLink
} from "lucide-react";

export default function StoreShowroomSection() {
  return (
    <section id="store-showroom" className="py-16 sm:py-24 bg-[#0F0E0D] border-b border-[#2E2924] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-accent-copper" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                Kakinada Showroom &amp; Experience Studio
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-parchment">
              Visit Our Flagship Store
            </h2>
            <p className="font-telugu text-xs sm:text-sm text-text-stone mt-1">
              కాకినాడ మెయిన్ రోడ్డు • ఎస్.ఆర్.ఎమ్.టి స్టాఫ్ అసోసియేషన్ భవనం • షాప్ నం. 6
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-[#1A1816] border border-[#2E2924] px-3.5 py-1.5 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Today Until 9:00 PM
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address, Hours, Contact Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            
            {/* Main Location Card */}
            <div className="rounded-2xl bg-[#1A1816] border border-[#2E2924] p-6 sm:p-8 space-y-5">
              
              {/* Address Row */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#0F0E0D] border border-[#2E2924] text-[#D4AF37] flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#D4AF37]">
                    Full Physical Address
                  </span>
                  <h3 className="font-serif text-lg font-bold text-text-parchment mt-0.5">
                    {STORE_DETAILS.name} ({STORE_DETAILS.telugu_name})
                  </h3>
                  <p className="text-xs sm:text-sm text-text-stone mt-1 leading-relaxed">
                    {STORE_DETAILS.address}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    Landmark: In the heart of Surya Rao Peta, Main Road, near SRMT complex.
                  </p>
                </div>
              </div>

              {/* Timing & Rating Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#2E2924]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0F0E0D] border border-[#2E2924] text-text-stone">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-text-muted block">Operating Hours:</span>
                    <span className="text-xs font-semibold text-text-parchment">{STORE_DETAILS.timings}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0F0E0D] border border-[#2E2924] text-text-stone">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-text-muted block">Google Maps Rating:</span>
                    <span className="text-xs font-semibold text-[#D4AF37]">
                      {STORE_DETAILS.rating}★ <span className="text-text-stone font-normal">({STORE_DETAILS.review_count})</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Showroom Features List */}
              <div className="p-4 rounded-xl bg-[#0F0E0D] border border-[#2E2924] space-y-2">
                <span className="text-xs font-semibold text-text-parchment block">
                  Showroom Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-stone">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>In-person weight &amp; metal purity verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Live samples for bulk return gift testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Custom pooja room idol dimensions consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Safe packing &amp; inter-city parcel dispatch</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={STORE_DETAILS.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C4683C] hover:from-[#e2be42] hover:to-[#db7140] text-[#0F0E0D] font-bold px-4 py-2.5 text-xs tracking-wide shadow-metallic-glow transition-all active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                <a
                  href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 rounded-xl bg-[#0F0E0D] border border-[#2E2924] hover:border-[#D4AF37]/40 text-text-parchment px-4 py-2.5 text-xs font-semibold transition-all"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Direct Call ({STORE_DETAILS.phone})</span>
                </a>

                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent("Namaste, I am planning to visit your Kakinada showroom today. Please share location coordinates.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-accent-copper hover:bg-accent-copperHover text-white px-4 py-2.5 text-xs font-semibold transition-all shadow-copper-glow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Location</span>
                </a>
              </div>

            </div>

            {/* In-Store Photography Restriction Card */}
            <div className="rounded-xl bg-amber-950/20 border border-amber-800/30 p-4 flex items-start gap-3 text-xs text-amber-200/90">
              <CameraOff className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#D4AF37] block font-semibold mb-0.5">
                  Artisan Copyright Notice:
                </strong>
                <span>
                  Please note that photography is strictly disallowed inside the showroom. We are delighted to send official high-definition photos and video previews directly over WhatsApp.
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Preview Stage (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#1A1816] border border-[#2E2924] p-5 flex flex-col justify-between overflow-hidden shadow-brass-card">
            
            {/* Visual Map Representation */}
            <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-[#121110] border border-[#2E2924] flex flex-col items-center justify-center p-6 text-center group">
              {/* Stylized dark map schematic backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#2E2924_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-transparent to-[#0F0E0D]/60" />

              {/* Center Map Pin Graphic */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#C4683C]/20 border border-[#C4683C] flex items-center justify-center shadow-copper-glow animate-bounce">
                  <MapPin className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-bold text-text-parchment">
                    SRMT Staff Association Building
                  </h4>
                  <p className="text-xs text-[#D4AF37] font-medium">
                    Shop No. 6, Main Road, Surya Rao Peta, Kakinada
                  </p>
                  <span className="text-[11px] text-text-stone block mt-1">
                    Easy parking for 2-wheelers &amp; cars on Main Road
                  </span>
                </div>
              </div>

              {/* Map CTA Overlay */}
              <a
                href={STORE_DETAILS.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-center gap-2 rounded-lg bg-[#0F0E0D]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] py-2 text-xs font-semibold hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <span>Open in Google Maps Application</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Travel Times & Local Landmark Hints */}
            <div className="mt-4 pt-4 border-t border-[#2E2924] grid grid-cols-2 gap-3 text-xs text-text-stone">
              <div className="p-2.5 rounded-lg bg-[#0F0E0D] border border-[#2E2924]">
                <span className="text-text-muted block text-[10px]">From Kakinada Town Rly Stn:</span>
                <span className="font-semibold text-text-parchment">~8 mins (2.4 km)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0F0E0D] border border-[#2E2924]">
                <span className="text-text-muted block text-[10px]">From Bhanugudi Junction:</span>
                <span className="font-semibold text-text-parchment">~5 mins (1.6 km)</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
