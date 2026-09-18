"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Product, PRODUCTS, STORE_DETAILS, getWhatsAppUrl } from "@/lib/data/products";
import { supabaseClient, InquiryRecord } from "@/lib/supabase/client";
import { 
  Sparkles, 
  X, 
  Send, 
  MessageCircle, 
  Bot, 
  User, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Minimize2,
  PhoneCall,
  Loader2,
  Gift
} from "lucide-react";

interface Message {
  id: string;
  sender: "kala" | "user";
  text: string;
  teluguText?: string;
  products?: Product[];
  actionPrompt?: {
    type: "lead_form" | "whatsapp_redirect";
    data?: any;
  };
  timestamp: string;
}

interface KalaChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProductModal?: (p: Product) => void;
}

export default function KalaChatDrawer({ isOpen, onClose, onOpenProductModal }: KalaChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "kala",
      text: "Namaste! I am Kala, your AI artisan concierge for Indian Handicrafts, Kakinada. How may I assist you today? You can ask me in English, Telugu (తెలుగు), or Telgish!",
      teluguText: "నమస్కారం! నేను కళ. కాకినాడ ఇండియన్ హ్యాండీక్రాఫ్ట్స్ ఆర్టిసన్ సహాయకురాలిని. మీకు కావలసిన విగ్రహాలు, కొండపల్లి బొమ్మలు, లేదా రిటర్న్ గిఫ్ట్స్ గురించి అడగవచ్చు.",
      timestamp: "Just now"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadFormState, setLeadFormState] = useState<{
    show: boolean;
    name: string;
    phone: string;
    occasion: string;
    qty: string;
  }>({
    show: false,
    name: "",
    phone: "",
    occasion: "Housewarming",
    qty: "50"
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const quickChips = [
    { label: "Return gifts under ₹300", telugu: "₹300 లోపు గిఫ్ట్స్" },
    { label: "Etikoppaka toys unnaaya?", telugu: "ఏటికొప్పాక బొమ్మలు" },
    { label: "Solid brass Balaji 8-inch idol", telugu: "ఇత్తడి బాలాజీ విగ్రహం" },
    { label: "Showroom address & timings", telugu: "షాప్ అడ్రస్, సమయాలు" },
  ];

  // Client-side NLP & RAG matcher for instant response + API route sync
  const processUserQuery = async (query: string) => {
    const qLower = query.toLowerCase();
    let replyText = "";
    let replyTelugu = "";
    let matchedProducts: Product[] = [];
    let showLead = false;

    // 1. Bulk / Return gifts inquiry intent
    if (
      qLower.includes("return gift") || 
      qLower.includes("bulk") || 
      qLower.includes("gift") || 
      qLower.includes("wedding") || 
      qLower.includes("housewarming") || 
      qLower.includes("gruhapravesam") || 
      qLower.includes("గృహప్రవేశం") ||
      qLower.includes("కానుకలు")
    ) {
      matchedProducts = PRODUCTS.filter(p => p.category === "return_gifts" || p.category === "etikoppaka").slice(0, 3);
      replyText = "We specialize in authentic Andhra return favors starting from ₹190 to ₹500+ with complimentary festive gift packaging. For bulk quantities (25 to 500+ pieces), our Kakinada showroom offers direct artisan pricing!";
      replyTelugu = "మా వద్ద ₹190 నుండి ప్రారంభమయ్యే ఏటికొప్పాక లక్క కుంకుమ భరిణలు, ఇత్తడి దీపాలు ఉన్నాయి. 50 కంటే ఎక్కువ యూనిట్లకు హోల్ సేల్ డిస్కౌంట్ లభిస్తుంది.";
      showLead = true;
    }
    // 2. Balaji / Venkateswara inquiry
    else if (qLower.includes("balaji") || qLower.includes("venkateswara") || qLower.includes("బాలాజీ") || qLower.includes("తిరుపతి")) {
      matchedProducts = PRODUCTS.filter(p => p.title.toLowerCase().includes("balaji"));
      replyText = "Here is our master hand-cast solid temple brass Lord Venkateswara Balaji idol. Handcrafted using traditional lost-wax technique (1,850 grams, 8.5 inches) with authentic temple patina.";
      replyTelugu = "ఇది మా ప్రముఖ 8.5 అంగుళాల ఘన ఇత్తడి తిరుపతి బాలాజీ విగ్రహం (1.85 కేజీలు). చేతితో చెక్కిన ప్రాచీన కళాఖండం.";
    }
    // 3. Etikoppaka toys inquiry (including Telgish "unnaaya")
    else if (qLower.includes("etikoppaka") || qLower.includes("లక్క") || qLower.includes("unnaaya") || qLower.includes("unnaya") || qLower.includes("bommalu")) {
      matchedProducts = PRODUCTS.filter(p => p.category === "etikoppaka" || p.category === "kondapalli").slice(0, 3);
      replyText = "Yes, absolutely! We have genuine GI-tagged Etikoppaka turned wood lacquerware made with Ankudu wood and organic vegetable dyes (turmeric, indigo). 100% natural, non-toxic, and child-safe.";
      replyTelugu = "అవును, మా కాకినాడ షోరూంలో ఒరిజినల్ ఏటికొప్పాక లక్క బొమ్మలు, కుంకుమ భరిణలు అందుబాటులో ఉన్నాయి.";
    }
    // 4. Kondapalli wooden toys inquiry
    else if (qLower.includes("kondapalli") || qLower.includes("కొండపల్లి") || qLower.includes("dasavatara")) {
      matchedProducts = PRODUCTS.filter(p => p.category === "kondapalli");
      replyText = "Our Kondapalli toys are carved from lightweight Tella Poniki wood by generational artisans in Krishna district. Featured pieces include the 10-piece Dasavatara set and the traditional Bullock Cart.";
      replyTelugu = "తెల్ల పొనికి చెక్కతో చేసిన సంప్రదాయ కొండపల్లి దశావతారాల సెట్ మరియు ఎడ్ల బండి బొమ్మలు అందుబాటులో ఉన్నాయి.";
    }
    // 5. Showroom address, timings, or location
    else if (qLower.includes("address") || qLower.includes("timing") || qLower.includes("location") || qLower.includes("where") || qLower.includes("ఎక్కడ") || qLower.includes("సమయం")) {
      replyText = `Our showroom is located at ${STORE_DETAILS.address}. We are open 10:00 AM to 9:00 PM every day! Note: In-store photography is restricted to protect artisan designs, but digital previews are readily sent via WhatsApp.`;
      replyTelugu = `మా షోరూం కాకినాడ మెయిన్ రోడ్డులోని SRMT స్టాఫ్ అసోసియేషన్ బిల్డింగ్, షాప్ నం. 6 లో ఉంది. ఉదయం 10:00 నుండి రాత్రి 9:00 వరకు తెరిచి ఉంటుంది.`;
    }
    // 6. Generic search across catalog
    else {
      matchedProducts = await supabaseClient.searchProducts(query);
      if (matchedProducts.length > 0) {
        replyText = `I found ${matchedProducts.length} authentic handcrafted items matching "${query}" in our Kakinada catalog:`;
        replyTelugu = `మీరు అడిగిన ప్రశ్నకు సరిపడే కళాఖండాల వివరాలు ఇక్కడ ఉన్నాయి:`;
      } else {
        replyText = "I would be delighted to assist you with our temple brass idols, Kondapalli toys, Etikoppaka lacquerware, or custom return gifts. You can also chat directly with our Kakinada showroom master on WhatsApp!";
        replyTelugu = "మా వద్ద ఇత్తడి విగ్రహాలు, ఏటికొప్పాక లక్క వస్తువులు మరియు శుభకార్యాల రిటర్న్ గిఫ్ట్స్ ఉన్నాయి. మీరు వాట్సాప్ ద్వారా కూడా మమ్మల్ని సంప్రదించవచ్చు.";
      }
    }

    return {
      replyText,
      replyTelugu,
      matchedProducts: matchedProducts.slice(0, 3),
      showLead
    };
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    try {
      // Primary: Call the RAG Gemini API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-4).map(m => ({
            role: m.sender === "kala" ? "model" : "user",
            text: m.text
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setIsTyping(false);

        const botMsg: Message = {
          id: `kala-${Date.now()}`,
          sender: "kala",
          text: data.reply || "Namaste! How may I assist you with our handcrafted treasures today?",
          teluguText: data.replyTelugu,
          products: data.products || [],
          timestamp: "Just now"
        };
        setMessages(prev => [...prev, botMsg]);

        if (data.isLeadQualified) {
          setLeadFormState(prev => ({ ...prev, show: true }));
        }
        return;
      }
      throw new Error("Chat API returned status " + response.status);
    } catch (err) {
      console.warn("API Chat unavailable, falling back to local client processor:", err);
      // Fallback: Client-side local NLP processor
      try {
        const result = await processUserQuery(textToSend);
        setIsTyping(false);
        const botMsg: Message = {
          id: `kala-${Date.now()}`,
          sender: "kala",
          text: result.replyText,
          teluguText: result.replyTelugu,
          products: result.matchedProducts,
          timestamp: "Just now"
        };
        setMessages(prev => [...prev, botMsg]);

        if (result.showLead) {
          setLeadFormState(prev => ({ ...prev, show: true }));
        }
      } catch (fallbackErr) {
        setIsTyping(false);
      }
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormState.phone.trim()) return;

    const record: InquiryRecord = {
      customer_name: leadFormState.name || "Kala Chat Shopper",
      phone_number: leadFormState.phone,
      occasion: leadFormState.occasion,
      quantity: Number(leadFormState.qty) || 50,
      target_budget_per_unit: 300,
      source: "kala_ai_chat",
      notes: "Lead qualified through Kala AI concierge in chat drawer"
    };

    await supabaseClient.insertInquiry(record);

    setLeadFormState(prev => ({ ...prev, show: false }));

    const confirmMsg: Message = {
      id: `kala-confirm-${Date.now()}`,
      sender: "kala",
      text: `Dhanyavadalu ${leadFormState.name || ''}! Your requirement for ${leadFormState.qty} units (${leadFormState.occasion}) has been logged in our Kakinada showroom inquiries. Would you like to connect directly on WhatsApp now?`,
      teluguText: `ధన్యవాదాలు! మీ విచారణ నమోదు చేయబడింది. మా కాకినాడ స్టోర్ మేనేజర్ వెంటనే వాట్సాప్‌లో కనెక్ట్ అవుతారు.`,
      timestamp: "Just now"
    };
    setMessages(prev => [...prev, confirmMsg]);

    const waUrl = `https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent(
      `Namaste, I just qualified my bulk gifting inquiry with Kala AI Concierge:\n👤 Name: ${leadFormState.name}\n📱 Phone: ${leadFormState.phone}\n🎉 Occasion: ${leadFormState.occasion}\n📦 Quantity: ${leadFormState.qty} units`
    )}`;

    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] h-[600px] max-h-[90vh] rounded-2xl bg-gradient-to-b from-[#1C1916] to-[#11100E] border border-[#D4AF37]/50 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      
      {/* 1. Header: Filigree Brass Bar */}
      <div className="bg-gradient-to-r from-[#1C1916] via-[#2A241E] to-[#1C1916] border-b border-[#D4AF37]/30 p-3.5 px-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F3D874] to-[#C4683C] p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0B0A09]">
              <Image
                src="/images/nataraja_logo.jpg"
                alt="Lord Nataraja Emblem"
                fill
                sizes="36px"
                className="object-cover object-center scale-110"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1A1816]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif text-sm font-bold text-[#F7F3EE]">
                Kala (కళ)
              </h3>
              <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-1.5 py-0.2 rounded font-bold">
                AI Concierge
              </span>
            </div>
            <p className="text-[11px] font-telugu text-[#D4AF37]">
              మీ సాంప్రదాయ కళా సహాయకురాలు • Bilingual &amp; Telgish
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={`https://wa.me/${STORE_DETAILS.whatsapp_number}?text=${encodeURIComponent("Namaste Indian Handicrafts, I would like to speak directly with the Kakinada showroom.")}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat directly on WhatsApp"
            className="p-1.5 rounded-lg text-emerald-400 hover:bg-[#0B0A09] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-stone hover:text-text-parchment hover:bg-[#0B0A09] transition-colors"
            aria-label="Close Kala Chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0A0908]/95">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div className="flex items-start gap-2 max-w-[88%]">
                {!isUser && (
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
                    isUser
                      ? "bg-accent-copper text-white rounded-tr-none shadow-md"
                      : "bg-[#161412] text-text-parchment border border-[#2E2924] rounded-tl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.teluguText && (
                    <p className="font-telugu text-[11px] text-[#D4AF37] mt-1.5 pt-1.5 border-t border-[#2E2924]">
                      {msg.teluguText}
                    </p>
                  )}

                  {/* Render inline product cards with real photos */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-[#2E2924]">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] block">
                        Matching Showroom Pieces:
                      </span>
                      {msg.products.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0E0D0C] border border-[#2E2924] hover:border-[#D4AF37]/50 transition-all"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#161412]">
                            <Image
                              src={prod.image_urls[0]}
                              alt={prod.title}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-[11px] font-bold text-text-parchment truncate">
                              {prod.title}
                            </h4>
                            <span className="text-[10px] text-text-stone block">
                              {prod.dimensions.split(' ')[0]} • {prod.material}
                            </span>
                            <span className="text-xs font-bold text-[#D4AF37]">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <a
                            href={getWhatsAppUrl(prod)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-accent-copper hover:bg-accent-copperHover text-white text-[10px] font-semibold flex-shrink-0"
                            title="Order via WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

              <span className="text-[9px] text-text-muted mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-text-stone">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <Loader2 className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
            </div>
            <span className="text-[11px] font-telugu text-[#D4AF37]">
              కళ విశ్లేషిస్తోంది... (Kala is consulting the artisan catalog)
            </span>
          </div>
        )}

        {/* Lead Capture Form inside Chat */}
        {leadFormState.show && (
          <div className="rounded-2xl bg-[#161412] border border-[#D4AF37]/50 p-4 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-accent-copper" />
              <h4 className="font-serif text-xs font-bold text-text-parchment">
                Quick Bulk Quote Dispatch (బల్క్ ఆర్డర్ వివరాలు)
              </h4>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-2.5 text-xs">
              <input
                type="text"
                placeholder="Your Name (మీ పేరు)"
                value={leadFormState.name}
                onChange={(e) => setLeadFormState({ ...leadFormState, name: e.target.value })}
                className="w-full bg-[#0E0D0C] border border-[#2E2924] rounded-lg p-2 text-text-parchment text-xs placeholder-text-muted focus:border-[#D4AF37]"
              />

              <input
                type="tel"
                required
                placeholder="WhatsApp Phone Number (+91...)"
                value={leadFormState.phone}
                onChange={(e) => setLeadFormState({ ...leadFormState, phone: e.target.value })}
                className="w-full bg-[#0E0D0C] border border-[#2E2924] rounded-lg p-2 text-text-parchment text-xs placeholder-text-muted focus:border-[#D4AF37]"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Occasion (e.g. Wedding)"
                  value={leadFormState.occasion}
                  onChange={(e) => setLeadFormState({ ...leadFormState, occasion: e.target.value })}
                  className="bg-[#0E0D0C] border border-[#2E2924] rounded-lg p-2 text-text-parchment text-xs placeholder-text-muted"
                />
                <input
                  type="number"
                  placeholder="Quantity (e.g. 100)"
                  value={leadFormState.qty}
                  onChange={(e) => setLeadFormState({ ...leadFormState, qty: e.target.value })}
                  className="bg-[#0E0D0C] border border-[#2E2924] rounded-lg p-2 text-text-parchment text-xs placeholder-text-muted"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-accent-copper hover:bg-accent-copperHover text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-copper-glow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Submit &amp; Open WhatsApp Direct</span>
              </button>
            </form>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 3. Quick Suggestion Prompt Chips */}
      <div className="p-2 bg-[#121110] border-t border-[#2E2924] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => handleSendMessage(chip.label)}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#1A1816] border border-[#2E2924] hover:border-[#D4AF37]/50 text-[11px] text-text-stone hover:text-text-parchment transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 4. Chat Input Box */}
      <div className="p-3 bg-[#181614] border-t border-[#2E2924]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type in English, Telugu (తెలుగు), or Telgish..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-[#0A0908] border border-[#2E2924] rounded-xl py-2 px-3 text-xs text-text-parchment placeholder-text-muted focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2 rounded-xl bg-[#D4AF37] hover:bg-[#e0bb3e] disabled:opacity-40 text-black transition-all flex-shrink-0 font-bold"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
