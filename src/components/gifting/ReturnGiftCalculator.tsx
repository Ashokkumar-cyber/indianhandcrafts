"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { STORE_DETAILS, getBulkQuoteWhatsAppUrl } from "@/lib/data/products";
import { supabaseClient, InquiryRecord } from "@/lib/supabase/client";
import { 
  Gift, 
  Sparkles, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  Clock, 
  User, 
  Phone, 
  Send,
  Loader2,
  CheckCircle2,
  Award
} from "lucide-react";

export default function ReturnGiftCalculator() {
  const [occasion, setOccasion] = useState<string>("Housewarming (గృహప్రవేశం)");
  const [quantity, setQuantity] = useState<number>(100);
  const [budgetPerUnit, setBudgetPerUnit] = useState<number>(350);
  const [selectedBundleIdx, setSelectedBundleIdx] = useState<number>(1);
  
  // Lead Capture Modal
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [quoteSuccess, setQuoteSuccess] = useState<boolean>(false);

  const occasions = [
    { label: "Housewarming (గృహప్రవేశం)", telugu: "గృహప్రవేశం", tag: "Most Popular" },
    { label: "Traditional Wedding (వివాహం)", telugu: "పెళ్లి కానుకలు", tag: "Heirloom" },
    { label: "Upanayanam / Vratam", telugu: "వ్రతాలు, ఉపనయనం", tag: "Sacred" },
    { label: "Corporate & Festive", telugu: "కార్పొరేట్ గిఫ్టింగ్", tag: "Executive" }
  ];

  // Dynamic 3 Curated Bundles based on unit budget with real image previews
  const bundles = useMemo(() => {
    const baseBudget = budgetPerUnit;
    
    // Bundle 1: Shubham Package (~80% of budget)
    const b1Price = Math.max(160, Math.round(baseBudget * 0.75));
    const b1Items = baseBudget < 300 
      ? "Turned Etikoppaka Kumkum Bharina + Raw Silk Drawstring Pouch"
      : baseBudget < 800
      ? "Etikoppaka Organic Agarbatti Stand + Herbal Sindoor Container"
      : "Solid Brass Miniature Kubera Diya + Traditional Velvet Box";

    // Bundle 2: Utsav Package (~100% of budget)
    const b2Price = baseBudget;
    const b2Items = baseBudget < 300
      ? "Solid Brass Peacock Kumkum Box with Spoon + Auspicious Turmeric"
      : baseBudget < 800
      ? "Etikoppaka Lathed Raja-Rani Pair in Hardboard Presentation Box"
      : "Antique Handcrafted Brass Peacock Annam Diya (Single) + Golden Gift Box";

    // Bundle 3: Rajakeeyam Package (~130% of budget)
    const b3Price = Math.round(baseBudget * 1.3);
    const b3Items = baseBudget < 500
      ? "Solid Brass Auspicious Deepam + Etikoppaka Sindoor Bharina Set"
      : baseBudget < 1200
      ? "Kondapalli Traditional Edla Bandi (Miniature Cart) in Teak Box"
      : "Solid Brass Hand-Cast Ganesha / Balaji Sanctum Idol in Silk Brocade Box";

    return [
      {
        name: "Shubham Package (శుభం)",
        tagline: "Essential Traditional Favors",
        itemDesc: b1Items,
        unitPrice: b1Price,
        tier: "Standard Heritage",
        image: "/images/etikoppaka_kumkum.jpg",
        popular: false,
      },
      {
        name: "Utsav Package (ఉత్సవ్)",
        tagline: "Artisan Heritage Keepsake",
        itemDesc: b2Items,
        unitPrice: b2Price,
        tier: "Showroom Recommended",
        image: "/images/brass_kumkum.jpg",
        popular: true,
      },
      {
        name: "Rajakeeyam Package (రాజకీయం)",
        tagline: "Heirloom Brass & Woodcraft",
        itemDesc: b3Items,
        unitPrice: b3Price,
        tier: "Royal Heirloom",
        image: "/images/brass_peacock_diya.jpg",
        popular: false,
      },
    ];
  }, [budgetPerUnit]);

  const activeBundle = bundles[selectedBundleIdx] || bundles[1];
  const grossTotal = activeBundle.unitPrice * quantity;
  // Volume tiered discount: 5% for 50+, 8% for 100+, 12% for 250+
  const discountRate = quantity >= 250 ? 0.12 : quantity >= 100 ? 0.08 : quantity >= 50 ? 0.05 : 0;
  const discountAmount = Math.round(grossTotal * discountRate);
  const netEstimatedTotal = grossTotal - discountAmount;

  const handleOpenQuote = () => {
    setShowQuoteModal(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#D4AF37", "#C4683C", "#8A1C14"]
      });
    } catch (e) {}
  };

  const handleConfirmQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim()) return;

    setSubmitting(true);

    const inquiryRecord: InquiryRecord = {
      customer_name: customerName || "Event Host",
      phone_number: customerPhone,
      occasion: occasion,
      quantity: quantity,
      target_budget_per_unit: activeBundle.unitPrice,
      notes: `Package: ${activeBundle.name} | Items: ${activeBundle.itemDesc} | Net Est: ₹${netEstimatedTotal} | Note: ${notes}`,
      source: 'return_gift_calc'
    };

    await supabaseClient.insertInquiry(inquiryRecord);

    setSubmitting(false);
    setQuoteSuccess(true);

    const waUrl = getBulkQuoteWhatsAppUrl({
      occasion,
      quantity,
      budgetPerUnit: activeBundle.unitPrice,
      selectedBundleName: activeBundle.name,
      totalEst: netEstimatedTotal,
      customerName,
      customerPhone,
    });

    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 800);
  };

  return (
    <section id="gifting-calculator" className="py-16 sm:py-24 bg-gradient-to-b from-[#110F0D] via-[#161412] to-[#110F0D] border-b border-[#2E2924] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#181614] border border-[#D4AF37]/30 px-4 py-1 text-xs text-[#D4AF37] mb-3">
            <Gift className="w-3.5 h-3.5 text-accent-copper" />
            <span>Interactive Bulk &amp; Event Return-Gift Planner</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EE]">
            Return-Gift Concierge Calculator
          </h2>
          <p className="font-telugu text-sm sm:text-base text-[#D4AF37] mt-2">
            గృహప్రవేశం, వివాహం &amp; శుభకార్యాల కోసం బల్క్ ఆర్డర్లు • హోల్ సేల్ రేట్లు • ఉచిత బహుమతి ప్యాకింగ్
          </p>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sliders & Controls (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#181614] border border-[#2E2924] p-6 sm:p-8 space-y-7 shadow-2xl">
            
            {/* 1. Occasion Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2.5">
                1. Select Auspicious Occasion (శుభకార్యం):
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {occasions.map((occ) => {
                  const isSelected = occasion === occ.label;
                  return (
                    <button
                      key={occ.label}
                      onClick={() => setOccasion(occ.label)}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#F7F3EE] shadow-metallic-glow"
                          : "bg-[#0E0D0C] border-[#2E2924] text-text-stone hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">{occ.label.split(' ')[0]}</span>
                        <span className="text-[10px] bg-[#1E1B18] px-1.5 py-0.5 rounded text-[#D4AF37] font-semibold">
                          {occ.tag}
                        </span>
                      </div>
                      <span className="font-telugu text-xs text-[#A89F91] block mt-1">
                        {occ.telugu}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Quantity Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  2. Desired Quantity (యూనిట్లు):
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-3xl font-black text-[#F7F3EE]">
                    {quantity}
                  </span>
                  <span className="text-xs text-text-muted">Units</span>
                  {discountRate > 0 && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                      {(discountRate * 100).toFixed(0)}% Bulk Discount
                    </span>
                  )}
                </div>
              </div>
              <input
                type="range"
                min="25"
                max="500"
                step="5"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-[#C4683C] cursor-pointer h-2 bg-[#0E0D0C] rounded-lg border border-[#2E2924]"
              />
              <div className="flex justify-between text-[11px] text-text-muted mt-1.5 font-medium">
                <span>25 Pcs (Min Order)</span>
                <span>100 Pcs (Housewarming)</span>
                <span>250 Pcs (Weddings)</span>
                <span>500+ Pcs</span>
              </div>
            </div>

            {/* 3. Target Budget per Unit Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  3. Target Budget Per Unit:
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-3xl font-black text-[#F7F3EE]">
                    ₹{budgetPerUnit}
                  </span>
                  <span className="text-xs text-text-muted">/ Gift Box</span>
                </div>
              </div>
              <input
                type="range"
                min="150"
                max="2500"
                step="50"
                value={budgetPerUnit}
                onChange={(e) => setBudgetPerUnit(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer h-2 bg-[#0E0D0C] rounded-lg border border-[#2E2924]"
              />
              <div className="flex justify-between text-[11px] text-text-muted mt-1.5 font-medium">
                <span>₹150 (Etikoppaka Favor)</span>
                <span>₹500 (Brass Kumkum Box)</span>
                <span>₹1,200 (Peacock Diya)</span>
                <span>₹2,500+ (Heirloom)</span>
              </div>
            </div>

            {/* 4. Three Dynamic Package Choices with Real Previews */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2.5">
                4. Select Artisan Curated Bundle (ఫోటో సహిత ఎంపిక):
              </label>
              <div className="space-y-3">
                {bundles.map((bundle, idx) => {
                  const isSelected = selectedBundleIdx === idx;
                  return (
                    <div
                      key={bundle.name}
                      onClick={() => setSelectedBundleIdx(idx)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                        isSelected
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] shadow-metallic-glow"
                          : "bg-[#0E0D0C] border-[#2E2924] hover:border-[#D4AF37]/40"
                      }`}
                    >
                      {/* Bundle Real Photo Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#181614] border border-[#2E2924] flex-shrink-0">
                        <Image
                          src={bundle.image}
                          alt={bundle.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-sm font-bold text-[#F7F3EE]">
                            {bundle.name}
                          </h4>
                          {bundle.popular && (
                            <span className="text-[10px] font-bold text-black bg-[#D4AF37] px-2 py-0.2 rounded-full">
                              Bestseller Choice
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-stone mt-0.5 line-clamp-2">
                          {bundle.itemDesc}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-base font-black text-[#F7F3EE] block">
                          ₹{bundle.unitPrice}
                        </span>
                        <span className="text-[10px] text-text-muted">per favor</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate & Bulk Quote Gateway (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#1C1916] to-[#121110] border border-[#D4AF37]/30 p-6 sm:p-8 space-y-6 shadow-2xl sticky top-28">
            <div className="border-b border-[#2E2924] pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-copper">
                Bulk Order Estimation Summary
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F7F3EE] mt-1">
                {activeBundle.name}
              </h3>
              <p className="text-xs text-[#D4AF37]">
                Custom auspicious packaging for {occasion}
              </p>
            </div>

            {/* Calculations Breakdown Table */}
            <div className="space-y-3 text-xs text-text-stone">
              <div className="flex justify-between py-1 border-b border-[#2E2924]/60">
                <span>Calculated Unit Rate:</span>
                <span className="font-bold text-[#F7F3EE]">₹{activeBundle.unitPrice}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#2E2924]/60">
                <span>Quantity Requested:</span>
                <span className="font-bold text-[#F7F3EE]">{quantity} Units</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#2E2924]/60">
                <span>Subtotal (Base Value):</span>
                <span>₹{grossTotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between py-1 border-b border-[#2E2924]/60 text-emerald-400 font-medium">
                  <span>Showroom Bulk Privilege ({(discountRate * 100).toFixed(0)}%):</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-[#2E2924]/60">
                <span>Gift Packaging &amp; Kumkum Pouch:</span>
                <span className="text-emerald-400 font-bold">Complimentary (ఉచితం)</span>
              </div>
            </div>

            {/* Net Total Highlight */}
            <div className="rounded-xl bg-[#0A0908] border border-[#D4AF37]/30 p-4">
              <span className="text-[11px] text-text-muted uppercase tracking-wider block font-semibold">
                Estimated Net Investment
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-serif text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D874] to-[#C4683C]">
                  ₹{netEstimatedTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-text-stone font-medium">
                  (₹{(netEstimatedTotal / quantity).toFixed(0)} / pc effective)
                </span>
              </div>
            </div>

            {/* Guarantee Pills */}
            <div className="space-y-2 text-[11px] text-text-stone">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Zero breakage guarantee with protective bubble wrap</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Doorstep dispatch across Godavari, Pan-India &amp; NRI shipping</span>
              </div>
            </div>

            {/* Quote Action Trigger */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={handleOpenQuote}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3D874] to-[#C4683C] hover:from-[#e2be42] hover:to-[#db7140] text-[#0A0908] font-black py-3.5 text-sm tracking-wide shadow-metallic-glow transition-all active:scale-95"
              >
                <span>Request Bulk Quote &amp; WhatsApp Connect</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-text-muted">
                Logs directly to Kakinada showroom queue for fast dispatch scheduling.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* LEAD CAPTURE & WHATSAPP GATEWAY MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#1C1916] to-[#121110] border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Kakinada Showroom Bulk Concierge
                  </span>
                </div>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="text-text-muted hover:text-text-parchment text-sm p-1"
                >
                  ✕
                </button>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F7F3EE] mt-1">
                Finalize Bulk Quote for {occasion}
              </h3>
              <p className="text-xs text-[#D4AF37] mt-0.5">
                {quantity} Units of {activeBundle.name} (~₹{netEstimatedTotal.toLocaleString('en-IN')})
              </p>
            </div>

            {quoteSuccess ? (
              <div className="rounded-xl bg-emerald-950/40 border border-emerald-700/40 p-5 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-emerald-300">
                  Quote Logged Successfully!
                </h4>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  Your inquiry has been recorded in our Supabase database. WhatsApp chat is launching with the complete specification summary.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowQuoteModal(false);
                      setQuoteSuccess(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#0A0908] border border-[#2E2924] text-xs text-text-parchment hover:border-[#D4AF37]"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmQuote} className="space-y-4 text-xs">
                <div>
                  <label className="text-text-stone font-medium block mb-1">
                    Your Name (మీ పేరు):
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Varma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#0A0908] border border-[#2E2924] rounded-lg py-2.5 pl-9 pr-3 text-text-parchment placeholder-text-muted focus:outline-none focus:border-[#D4AF37]"
                    />
                    <User className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="text-text-stone font-medium block mb-1">
                    WhatsApp Phone Number (ఫోన్ నెంబర్) <span className="text-accent-copper">*</span>:
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#0A0908] border border-[#2E2924] rounded-lg py-2.5 pl-9 pr-3 text-text-parchment placeholder-text-muted focus:outline-none focus:border-[#D4AF37]"
                    />
                    <Phone className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="text-text-stone font-medium block mb-1">
                    Special Packaging or Delivery Notes (ఆప్షనల్):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Need yellow silk packaging by next Friday in Kakinada / Rajahmundry"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#0A0908] border border-[#2E2924] rounded-lg p-2.5 text-text-parchment placeholder-text-muted focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent-copper hover:bg-accent-copperHover text-white py-3 font-bold text-xs tracking-wide shadow-copper-glow transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MessageCircle className="w-4 h-4" />
                    )}
                    <span>{submitting ? "Saving Inquiry..." : "Confirm & Launch WhatsApp Chat"}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
