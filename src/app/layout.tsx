import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://interiordesign.akilinova.co.ke"),
  title: "AURA & NOIR | Bespoke Architectural Interior Design & Studio",
  description:
    "Award-winning interior architecture and turnkey interior design studio crafting timeless, sculptural residential and commercial sanctuaries in Nairobi and across East Africa.",
  keywords: [
    "interior design Nairobi",
    "luxury interior design Kenya",
    "architectural interiors",
    "bespoke furniture",
    "residential renovation",
    "AURA & NOIR",
    "turnkey interior studio",
  ],
  authors: [{ name: "AURA & NOIR Atelier" }],
  openGraph: {
    title: "AURA & NOIR | Bespoke Architectural Interior Design",
    description:
      "Sculpting Light, Space & Materiality. Explore over 37 curated residential and commercial transformations.",
    url: "https://interiordesign.akilinova.co.ke",
    siteName: "AURA & NOIR Atelier",
    images: [
      {
        url: "/portfolio/project-31.jpg",
        width: 1200,
        height: 800,
        alt: "AURA & NOIR Interior Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090A0B] text-[#F4EFE6] antialiased selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
