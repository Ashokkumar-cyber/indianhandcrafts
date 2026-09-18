import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0F0E0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://indianhandicrafts-kakinada.com"),
  title: "Indian Handicrafts (ఇండియన్ హ్యాండీక్రాఫ్ట్స్) | Kakinada Heritage Storefront & Kala AI",
  description: "Authentic Andhra Pradesh master handicrafts directly from hereditary sthapatis & artisans. Explore lost-wax brass & bronze idols, GI-tagged Kondapalli toys, Etikoppaka lacquerware, Tanjore paintings, and wedding return gifts. Visit our Kakinada showroom at SRMT Building, Main Rd.",
  keywords: [
    "Indian Handicrafts Kakinada",
    "ఇండియన్ హ్యాండీక్రాఫ్ట్స్ కాకినాడ",
    "Kakinada brass idols",
    "Kondapalli toys",
    "Etikoppaka lacquerware",
    "Tanjore paintings",
    "wedding return gifts Kakinada",
    "Bhimonee decor style",
    "temple brass idols"
  ],
  authors: [{ name: "Indian Handicrafts Kakinada" }],
  openGraph: {
    title: "Indian Handicrafts Kakinada - Sacred Devotional Art & Andhra Craft Heritage",
    description: "Hand-carved divinity, GI-tagged folk woodcraft, and bespoke bulk return gifts. Direct from Kakinada showroom to your home.",
    url: "https://indianhandicrafts-kakinada.com",
    siteName: "Indian Handicrafts Kakinada",
    images: [
      {
        url: "/images/brass_balaji.jpg",
        width: 1200,
        height: 1600,
        alt: "Hand-Cast Solid Brass Tirupati Balaji Idol - Indian Handicrafts Kakinada",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/nataraja_logo.jpg",
    shortcut: "/images/nataraja_logo.jpg",
    apple: "/images/nataraja_logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-canvas-dark text-text-parchment antialiased selection:bg-accent-copper selection:text-white">
        {children}
      </body>
    </html>
  );
}
