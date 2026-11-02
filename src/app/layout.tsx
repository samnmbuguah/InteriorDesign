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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "AURA & NOIR Atelier",
  "image": "https://interiordesign.akilinova.co.ke/portfolio/project-31.jpg",
  "@id": "https://interiordesign.akilinova.co.ke",
  "url": "https://interiordesign.akilinova.co.ke",
  "telephone": "+254700892411",
  "priceRange": "$$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "The Pavilion, Riverside Drive",
    "addressLocality": "Westlands, Nairobi",
    "addressRegion": "Nairobi",
    "addressCountry": "KE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -1.2683,
    "longitude": 36.8044
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:30",
    "closes": "18:00"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#090A0B] text-[#F4EFE6] antialiased selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
