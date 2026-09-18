"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import DeityPillSlider from "@/components/home/DeityPillSlider";
import CatalogSection from "@/components/catalog/CatalogSection";
import ArtisanPolicyBanner from "@/components/home/ArtisanPolicyBanner";
import ReturnGiftCalculator from "@/components/gifting/ReturnGiftCalculator";
import StoreShowroomSection from "@/components/home/StoreShowroomSection";
import Footer from "@/components/layout/Footer";
import KalaChatDrawer from "@/components/chat/KalaChatDrawer";
import ProductDetailModal from "@/components/catalog/ProductDetailModal";
import { Product, STORE_DETAILS } from "@/lib/data/products";
import { Sparkles, MessageCircle } from "lucide-react";

export default function Home() {
  const [isKalaOpen, setIsKalaOpen] = useState(false);
  const [selectedPillQuery, setSelectedPillQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const handleSelectPillQuery = (query: string) => {
    setSelectedPillQuery(query);
    setSearchQuery(query);
  };

  return (
    <main className="min-h-screen bg-[#0F0E0D] text-text-parchment flex flex-col selection:bg-accent-copper selection:text-white">
      {/* 1. Sticky Navigation */}
      <Navbar
        onOpenKala={() => setIsKalaOpen(true)}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* 2. Hero Stage */}
      <HeroSection
        onOpenProductModal={(p) => setActiveModalProduct(p)}
        onOpenKala={() => setIsKalaOpen(true)}
      />

      {/* 3. Quick Craft & Deity Pills Slider */}
      <DeityPillSlider
        onSelectQuery={handleSelectPillQuery}
        activeQuery={selectedPillQuery}
      />

      {/* 4. Curated Master Catalog Section with Facets */}
      <CatalogSection
        initialSearch={searchQuery}
      />

      {/* 5. Artisan Integrity & Showroom No-Photo Policy Banner */}
      <ArtisanPolicyBanner />

      {/* 6. Dynamic Return-Gift & Bulk Calculator */}
      <ReturnGiftCalculator />

      {/* 7. Kakinada Showroom Location & Visiting Info */}
      <StoreShowroomSection />

      {/* 8. Comprehensive Devotional Luxury Footer */}
      <Footer />

      {/* Floating Kala AI Concierge Launcher Bubble (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Floating WhatsApp Quick Action */}
        <a
          href={`https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent("Namaste Indian Handicrafts Kakinada, I would like to inquire about handcrafted items.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
          title="Direct WhatsApp Order Line (+91 99088 44424)"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-14 bg-[#1A1816] text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            WhatsApp Hotline
          </span>
        </a>

        {/* Floating Kala AI Concierge Button */}
        <button
          onClick={() => setIsKalaOpen(!isKalaOpen)}
          className="relative group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C4683C] to-[#8A1C14] p-0.5 shadow-2xl hover:scale-105 active:scale-95 transition-all"
          aria-label="Open Kala AI Shopping Concierge"
        >
          <div className="flex items-center gap-2 rounded-full bg-[#1A1816] px-4 py-3 text-text-parchment">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[#D4AF37] leading-none">
                Ask Kala (కళ)
              </span>
              <span className="text-[10px] text-text-stone font-telugu leading-none mt-0.5">
                AI ఆర్టిసన్ కన్సియర్జ్
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Kala AI Chat Drawer */}
      <KalaChatDrawer
        isOpen={isKalaOpen}
        onClose={() => setIsKalaOpen(false)}
        onOpenProductModal={(p) => setActiveModalProduct(p)}
      />

      {/* Global Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </main>
  );
}
