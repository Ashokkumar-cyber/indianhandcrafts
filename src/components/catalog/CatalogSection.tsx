"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, Product } from "@/lib/data/products";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import { 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Search,
  Check
} from "lucide-react";

interface CatalogSectionProps {
  initialSearch?: string;
  initialCategory?: string;
}

export default function CatalogSection({ initialSearch = "", initialCategory = "all" }: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Sync prop changes if parent updates
  React.useEffect(() => {
    if (initialSearch !== undefined) setSearchQuery(initialSearch);
  }, [initialSearch]);

  React.useEffect(() => {
    if (initialCategory !== undefined) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Unique Materials
  const materials = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.material.includes("Brass")) set.add("Brass");
      else if (p.material.includes("Bronze") || p.material.includes("Panchaloha")) set.add("Panchaloha / Bronze");
      else if (p.material.includes("Poniki")) set.add("Poniki Wood (Kondapalli)");
      else if (p.material.includes("Ankudu")) set.add("Ankudu Wood (Etikoppaka)");
      else if (p.material.includes("Gold")) set.add("22K Gold Foil / Teak");
      else set.add(p.material);
    });
    return Array.from(set);
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }

      // Material filter
      if (selectedMaterial !== "all") {
        if (selectedMaterial === "Brass" && !p.material.toLowerCase().includes("brass")) return false;
        if (selectedMaterial === "Panchaloha / Bronze" && !p.material.toLowerCase().includes("bronze") && !p.material.toLowerCase().includes("panchaloha")) return false;
        if (selectedMaterial === "Poniki Wood (Kondapalli)" && !p.material.toLowerCase().includes("poniki")) return false;
        if (selectedMaterial === "Ankudu Wood (Etikoppaka)" && !p.material.toLowerCase().includes("ankudu")) return false;
        if (selectedMaterial === "22K Gold Foil / Teak" && !p.material.toLowerCase().includes("gold")) return false;
      }

      // Price filter
      if (p.price > maxPrice) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q) || p.title_telugu.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesMat = p.material.toLowerCase().includes(q);
        const matchesOccasion = p.occasions.some(o => o.toLowerCase().includes(q));
        const matchesCat = p.category_name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesMat && !matchesOccasion && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "weight_desc") return b.weight_grams - a.weight_grams;
      // Default: featured first
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [selectedCategory, selectedMaterial, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedMaterial("all");
    setSearchQuery("");
    setMaxPrice(10000);
    setSortBy("featured");
  };

  return (
    <section id="catalog-section" className="py-14 sm:py-20 bg-[#0F0E0D] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                Master Artisan Collection (కళాఖండాల వివరాలు)
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-parchment">
              Curated Andhra Heritage Catalog
            </h2>
            <p className="font-telugu text-xs sm:text-sm text-text-stone mt-1">
              ఇత్తడి విగ్రహాలు, కొండపల్లి బొమ్మలు, ఏటికొప్పాక లక్క కళ, తంజావూరు పటాలు &amp; ప్రత్యేక రిటర్న్ గిఫ్ట్స్
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 text-xs text-text-stone">
            <span className="bg-[#1A1816] border border-[#2E2924] px-3 py-1.5 rounded-lg text-text-parchment font-medium">
              Showing <strong className="text-[#D4AF37]">{filteredProducts.length}</strong> Authentic Works
            </span>
          </div>
        </div>

        {/* 1. Category Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2E2924] no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[#D4AF37] text-[#0F0E0D] shadow-metallic-glow"
                    : "bg-[#1A1816] text-text-stone hover:text-text-parchment hover:bg-[#25221F] border border-[#2E2924]"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] hidden sm:inline ${isSelected ? "text-stone-900" : "text-text-muted"}`}>
                  ({cat.telugu})
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Facet Filter Controls Bar */}
        <div className="mt-6 p-4 rounded-xl bg-[#1A1816] border border-[#2E2924] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Search inside catalog */}
          <div className="relative">
            <label className="text-[11px] font-medium text-text-muted block mb-1">
              Search Craft / Deity / Keyword:
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Balaji, Nataraja, Brass..."
                className="w-full bg-[#0F0E0D] border border-[#2E2924] rounded-lg py-2 pl-8 pr-3 text-xs text-text-parchment placeholder-text-muted focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Material Provenance Selector */}
          <div>
            <label className="text-[11px] font-medium text-text-muted block mb-1">
              Material Provenance:
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full bg-[#0F0E0D] border border-[#2E2924] rounded-lg py-2 px-3 text-xs text-text-parchment focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Materials (అన్ని రకాలు)</option>
              {materials.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] font-medium text-text-muted mb-1">
              <span>Max Budget:</span>
              <span className="text-[#D4AF37] font-semibold">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C4683C] cursor-pointer h-1.5 bg-[#2E2924] rounded-lg"
            />
          </div>

          {/* Sort By Dropdown & Reset */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="text-[11px] font-medium text-text-muted block mb-1">
                Sort By:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#0F0E0D] border border-[#2E2924] rounded-lg py-2 px-3 text-xs text-text-parchment focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="weight_desc">Heaviest Metal (Weight)</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              title="Reset all filters"
              className="p-2 rounded-lg bg-[#0F0E0D] border border-[#2E2924] text-text-stone hover:text-text-parchment hover:border-[#D4AF37] transition-all flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={(p) => setActiveModalProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 p-12 rounded-2xl bg-[#1A1816] border border-[#2E2924] text-center flex flex-col items-center gap-3">
            <SlidersHorizontal className="w-8 h-8 text-text-muted" />
            <h3 className="font-serif text-lg font-semibold text-text-parchment">
              No matching artisan creations found
            </h3>
            <p className="text-xs text-text-stone max-w-md">
              We couldn't find items matching your active filters. Try adjusting your search query, increasing the budget slider, or selecting "All Masterpieces".
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 rounded-lg bg-accent-copper hover:bg-accent-copperHover text-white text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}
