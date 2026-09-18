"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STORE_DETAILS } from "@/lib/data/products";
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  MessageCircle, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  Gift
} from "lucide-react";

interface NavbarProps {
  onOpenKala?: () => void;
  onSearchChange?: (q: string) => void;
  onCategorySelect?: (catId: string) => void;
}

export default function Navbar({ onOpenKala, onSearchChange, onCategorySelect }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* 1. Top Trust Bar */}
      <div className="bg-[#121110] border-b border-[#2E2924] py-1.5 px-4 text-xs text-text-stone">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-[#D4AF37] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Kakinada Showroom Open • Closes 9:00 PM
            </span>
            <span className="hidden sm:inline-block text-[#6E665B]">|</span>
            <span className="hidden sm:flex items-center gap-1 text-text-parchment">
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="font-semibold text-[#D4AF37]">4.8★</span>
              <span className="text-[#A89F91]">(41 Google Reviews)</span>
            </span>
            <span className="hidden md:inline-block text-[#6E665B]">|</span>
            <span className="hidden md:flex items-center gap-1 text-text-stone">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-copper" />
              Fixed Fair Rates • Direct Artisan Foundry
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={`https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent("Namaste Indian Handicrafts, I would like to inquire about visiting your Kakinada showroom.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp Line:</span>
              <span>+91 99088 44424</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="bg-[#0F0E0D]/95 backdrop-blur-md border-b border-[#2E2924] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo with Telugu Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#C4683C] to-[#8A1C14] p-0.5 shadow-metallic-glow flex items-center justify-center">
              <div className="w-full h-full bg-[#0F0E0D] rounded-[10px] flex items-center justify-center">
                <span className="text-[#D4AF37] font-serif font-black text-lg">క</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-lg md:text-xl tracking-wide text-text-parchment group-hover:text-[#D4AF37] transition-colors">
                  INDIAN HANDICRAFTS
                </span>
                <span className="text-xs font-semibold text-accent-copper border border-accent-copper/30 px-1.5 py-0.2 rounded">
                  KAKINADA
                </span>
              </div>
              <span className="text-xs font-telugu text-[#A89F91] tracking-wider">
                ఇండియన్ హ్యాండీక్రాఫ్ట్స్ • సూర్యారావు పేట
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search brass Balaji, Kondapalli, return gifts..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full bg-[#1A1816] border border-[#2E2924] rounded-full py-2 pl-10 pr-4 text-xs text-text-parchment placeholder-text-muted focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-2.5" />
            </form>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a 
              href="#catalog-section" 
              className="text-text-stone hover:text-[#D4AF37] transition-colors"
            >
              Master Catalog
            </a>
            <a 
              href="#gifting-calculator" 
              className="flex items-center gap-1.5 text-accent-copper hover:text-orange-400 transition-colors"
            >
              <Gift className="w-4 h-4" />
              Return-Gift Calc
            </a>
            <a 
              href="#artisan-policy" 
              className="text-text-stone hover:text-[#D4AF37] transition-colors"
            >
              Showroom Notice
            </a>
            <a 
              href="#store-showroom" 
              className="text-text-stone hover:text-[#D4AF37] transition-colors"
            >
              Visit Showroom
            </a>
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Kala AI Trigger Button */}
            <button
              onClick={onOpenKala}
              className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#C4683C]/20 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all shadow-metallic-glow group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>Ask "Kala" AI</span>
              <span className="hidden sm:inline-block text-[10px] bg-[#D4AF37] text-black px-1.5 py-0.2 rounded font-bold">
                తెలుగు
              </span>
            </button>

            {/* Direct WhatsApp Order CTA */}
            <a
              href={`https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent("Namaste Indian Handicrafts, I would like to order handcrafted items directly.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 rounded-full bg-accent-copper hover:bg-accent-copperHover text-white px-4 py-2 text-xs font-semibold tracking-wide transition-all shadow-copper-glow active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#1A1816] border border-[#2E2924] text-text-stone hover:text-text-parchment"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#2E2924] flex flex-col gap-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-1">
              <input
                type="text"
                placeholder="Search brass, Kondapalli, return gifts..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full bg-[#1A1816] border border-[#2E2924] rounded-lg py-2 pl-9 pr-3 text-xs text-text-parchment placeholder-text-muted focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
            </form>

            <a
              href="#catalog-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1A1816] text-text-parchment font-medium text-sm flex items-center justify-between"
            >
              <span>Master Catalog (విగ్రహాలు, బొమ్మలు)</span>
              <span className="text-xs text-[#D4AF37]">Explore →</span>
            </a>
            <a
              href="#gifting-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1A1816] text-accent-copper font-medium text-sm flex items-center justify-between"
            >
              <span>Return-Gift Bulk Calculator</span>
              <span className="text-xs bg-accent-copper/20 px-2 py-0.5 rounded text-accent-copper">25-500 Pcs</span>
            </a>
            <a
              href="#artisan-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1A1816] text-text-stone font-medium text-sm"
            >
              Showroom No-Photo Policy
            </a>
            <a
              href="#store-showroom"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1A1816] text-text-stone font-medium text-sm flex items-center justify-between"
            >
              <span>Showroom Address (SRMT Building, Kakinada)</span>
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenKala) onOpenKala();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-[#C4683C]/20 border border-[#D4AF37]/50 text-[#D4AF37] py-2.5 text-xs font-semibold"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Open "Kala" AI Concierge (తెలుగు / Telgish)</span>
              </button>

              <a
                href={`https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent("Namaste Indian Handicrafts Kakinada, I would like to order directly.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent-copper text-white py-2.5 text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp (+91 99088 44424)</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
