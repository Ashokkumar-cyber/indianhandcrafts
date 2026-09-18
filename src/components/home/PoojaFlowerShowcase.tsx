"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Product } from "@/lib/data/products";
import { 
  Sparkles, 
  Scale, 
  Ruler, 
  Volume2, 
  VolumeX, 
  HeartHandshake,
  Flame,
  Flower2
} from "lucide-react";

interface PoojaFlowerShowcaseProps {
  product: Product;
  onInspect?: () => void;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  type: "yellow_marigold" | "orange_marigold" | "white_jasmine" | "rose_petal" | "sparkle";
  opacity: number;
  depth: number;
}

export default function PoojaFlowerShowcase({ product, onInspect }: PoojaFlowerShowcaseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [poojaBlessingActive, setPoojaBlessingActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize pure temple brass bell sound (గంట నాదం) using Web Audio API
  const playTempleBell = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Multi-harmonic bronze bell frequencies
      const freqs = [587.33, 880, 1174.66, 1760, 2349.32];
      const gains = [0.4, 0.25, 0.15, 0.08, 0.04];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq + (Math.random() * 4 - 2), now);

        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.5);
      });
    } catch (e) {
      console.warn("Audio bell playback error:", e);
    }
  }, [soundEnabled]);

  // Burst flowers on user offering
  const triggerPushparchana = useCallback(() => {
    setPoojaBlessingActive(true);
    playTempleBell();
    setTimeout(() => setPoojaBlessingActive(false), 3000);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Add 40 extra petals burst
    for (let i = 0; i < 40; i++) {
      if ((window as any).__addPoojaPetal) {
        (window as any).__addPoojaPetal(true);
      }
    }
  }, [playTempleBell]);

  // High-performance Petal Physics Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 530);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const petalTypes: Petal["type"][] = [
      "orange_marigold",
      "yellow_marigold",
      "orange_marigold",
      "white_jasmine",
      "rose_petal",
      "sparkle",
    ];

    const createPetal = (fromTop = false): Petal => {
      const type = petalTypes[Math.floor(Math.random() * petalTypes.length)];
      return {
        x: Math.random() * width,
        y: fromTop ? -20 - Math.random() * 40 : Math.random() * height,
        size: type === "sparkle" ? 2 + Math.random() * 3 : 7 + Math.random() * 11,
        speedY: type === "sparkle" ? 0.3 + Math.random() * 0.7 : 0.9 + Math.random() * 1.6,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2.5,
        oscillationSpeed: 0.02 + Math.random() * 0.03,
        oscillationDistance: 0.8 + Math.random() * 1.4,
        type,
        opacity: type === "sparkle" ? 0.5 + Math.random() * 0.5 : 0.8 + Math.random() * 0.2,
        depth: 0.6 + Math.random() * 0.7,
      };
    };

    const petals: Petal[] = [];
    const MAX_PETALS = 48;

    for (let i = 0; i < MAX_PETALS; i++) {
      petals.push(createPetal(false));
    }

    // Allow external burst
    (window as any).__addPoojaPetal = (burst = false) => {
      const p = createPetal(true);
      if (burst) {
        p.speedY *= 1.6;
        p.size *= 1.2;
      }
      petals.push(p);
      if (petals.length > 80) petals.shift();
    };

    // Draw individual botanical petal shapes
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === "sparkle") {
        // Divine golden glowing aarti ember
        ctx.fillStyle = "#FDE68A";
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "orange_marigold") {
        // Saffron Marigold Petal (కేసరి బంతి రేకు)
        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, "#F97316");
        grad.addColorStop(0.6, "#EA580C");
        grad.addColorStop(1, "#C2410C");
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(234, 88, 12, 0.4)";
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.65, p.size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Delicate inner ridge
        ctx.strokeStyle = "rgba(254, 215, 170, 0.5)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.lineTo(0, p.size * 0.7);
        ctx.stroke();
      } else if (p.type === "yellow_marigold") {
        // Pure Gold Marigold Petal (బంగారు బంతి రేకు)
        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, "#FACC15");
        grad.addColorStop(0.6, "#EAB308");
        grad.addColorStop(1, "#CA8A04");
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(234, 179, 8, 0.35)";
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "white_jasmine") {
        // Temple White Jasmine Petal (మల్లె రేకు)
        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, "#FFFFFF");
        grad.addColorStop(0.8, "#F8FAFC");
        grad.addColorStop(1, "#E2E8F0");
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.7, 0, 0, p.size);
        ctx.quadraticCurveTo(-p.size * 0.7, 0, 0, -p.size);
        ctx.fill();
      } else if (p.type === "rose_petal") {
        // Sacred Pink-Red Rose Petal (గులాబీ రేకు)
        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, "#F43F5E");
        grad.addColorStop(0.6, "#E11D48");
        grad.addColorStop(1, "#BE123C");
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(225, 29, 72, 0.35)";
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.75, p.size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Subtle warm divine volumetric light ray from top
      const rayGrad = ctx.createRadialGradient(
        width / 2,
        0,
        10,
        width / 2,
        height * 0.4,
        width * 0.7
      );
      rayGrad.addColorStop(0, "rgba(212, 175, 55, 0.08)");
      rayGrad.addColorStop(0.5, "rgba(196, 104, 60, 0.03)");
      rayGrad.addColorStop(1, "transparent");
      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, width, height);

      // Animate & draw each falling flower petal
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(tick * p.oscillationSpeed) * p.oscillationDistance + p.speedX;
        p.rotation += p.rotationSpeed;

        drawPetal(p);

        // Reset when passing bottom
        if (p.y > height + 20) {
          petals[i] = createPetal(true);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#1C1916] to-[#121110] border border-[#D4AF37]/40 p-3.5 shadow-2xl hover:border-[#D4AF37]/70 transition-all duration-500 group overflow-hidden">
      
      {/* 1. Main Visual Stage with Real Balaji Idol & Falling Flower Particle Canvas */}
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#0A0908] border border-[#2E2924] shadow-inner">
        
        {/* Background Balaji Idol Real Photograph */}
        <Image
          src={product.image_urls[0]}
          alt={product.title}
          fill
          priority
          unoptimized
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Diya Light Glow over the idol */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-[#0A0908]/40 pointer-events-none" />

        {/* Glowing Diya Flame Animation in bottom-right corner */}
        <div className="absolute bottom-14 right-10 pointer-events-none flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-amber-500/20 blur-sm animate-ping" />
          <div className="absolute w-3 h-3 rounded-full bg-yellow-300 blur-[2px] animate-pulse" />
        </div>

        {/* Real-time Falling Flower Petals Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-[#0A0908]/85 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 shadow-lg">
          <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
          <span>Kakinada Showroom Crown Piece</span>
        </div>

        <div className="absolute top-3 right-3 z-20 rounded-full bg-emerald-950/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-600/40">
          Ready in Showroom
        </div>

        {/* Live Pooja Interactive Tag & Offering Control */}
        <div className="absolute top-12 right-3 z-20 flex items-center gap-1.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-full bg-[#0A0908]/80 backdrop-blur-md border border-[#2E2924] hover:border-[#D4AF37] text-[#D4AF37] text-xs transition-all shadow"
            title={soundEnabled ? "Mute temple bell" : "Enable temple bell chime"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-text-muted" />}
          </button>

          <button
            onClick={triggerPushparchana}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600/90 to-[#C4683C] hover:from-amber-500 hover:to-orange-500 text-white text-[11px] font-bold backdrop-blur-md border border-amber-400/40 shadow-copper-glow active:scale-95 transition-all"
            title="Click to shower sacred marigold & jasmine flowers on Lord Balaji"
          >
            <Flower2 className="w-3.5 h-3.5 animate-spin text-yellow-200" style={{ animationDuration: '6s' }} />
            <span>Offer Flowers (పుష్పార్చన)</span>
          </button>
        </div>

        {/* On-Screen Auspicious Blessing Pop-up */}
        {poojaBlessingActive && (
          <div className="absolute inset-x-4 top-1/3 z-30 flex justify-center animate-in zoom-in-95 duration-200 pointer-events-none">
            <div className="rounded-2xl bg-[#0A0908]/90 backdrop-blur-md border border-[#D4AF37] p-3 text-center shadow-2xl">
              <span className="font-serif text-xs font-bold text-[#F3D874] block tracking-wider uppercase">
                || ఓం నమో వేంకటేశాయ ||
              </span>
              <span className="font-telugu text-[11px] text-[#F7F3EE] block mt-0.5">
                పుష్పార్చన స్వీకరించబడింది • స్వామివారి దివ్య కృప
              </span>
            </div>
          </div>
        )}

        {/* Floating Tangible Spec Pills (Bottom Overlay) */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#0E0D0C]/90 backdrop-blur-md border border-[#2E2924]">
          <div className="flex items-center gap-1.5 text-xs text-text-parchment">
            <Scale className="w-3.5 h-3.5 text-accent-copper" />
            <span className="font-bold">1,850g</span>
            <span className="text-text-muted">Solid Brass</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-parchment">
            <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold">8.5" Height</span>
          </div>
          <span className="text-[10px] bg-[#1A1816] text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/20 font-semibold">
            Foundry A+
          </span>
        </div>

      </div>

      {/* 2. Card Bottom Metadata & WhatsApp Direct Ordering */}
      <div className="mt-3.5 p-1 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-text-parchment group-hover:text-[#D4AF37] transition-colors">
            {product.title}
          </h3>
          <span className="text-xs text-text-stone">
            Code: {product.id}
          </span>
        </div>

        <p className="font-telugu text-xs text-[#D4AF37]">
          {product.title_telugu}
        </p>

        {/* Price & Action Row */}
        <div className="mt-1 pt-3 border-t border-[#2E2924] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
              Authentic Cast Price
            </span>
            <span className="text-2xl font-black text-[#F7F3EE]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onInspect && (
              <button
                onClick={onInspect}
                className="px-3 py-2 text-xs font-semibold text-text-stone hover:text-text-parchment border border-[#2E2924] rounded-xl hover:bg-[#121110] transition-colors"
              >
                Inspect Specs
              </button>
            )}

            <a
              href={`https://wa.me/919908844424?text=${encodeURIComponent(`Namaste Indian Handicrafts Kakinada, I am interested in ordering the featured ${product.title} (₹${product.price}). Please confirm availability.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-accent-copper hover:bg-accent-copperHover text-white px-3.5 py-2.5 text-xs font-bold tracking-wide transition-all shadow-copper-glow active:scale-95"
            >
              <span>WhatsApp Order</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
