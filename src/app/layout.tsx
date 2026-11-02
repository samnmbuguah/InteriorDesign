import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://interiordesign.akilinova.co.ke"),
  title: "AURA & NOIR | Master Joinery, Gypsum & Home Renovation Atelier",
  description:
    "Specialists in wooden staircases, gypsum ceiling design & installation, wooden flooring, custom kitchen cabinets & wardrobes, TV media walls, door & frame fitting, and roofing & full home renovations in Nairobi.",
  keywords: [
    "wooden staircase Kenya",
    "gypsum designing and installation Nairobi",
    "wooden flooring Kenya",
    "kitchen cabinets and wardrobes Nairobi",
    "custom TV stands Kenya",
    "door and frame fitting Nairobi",
    "roofing and home renovation Kenya",
    "AURA & NOIR Atelier",
  ],
  authors: [{ name: "AURA & NOIR Atelier" }],
  openGraph: {
    title: "AURA & NOIR | Master Joinery, Gypsum & Home Renovation",
    description:
      "Specialists in wooden staircases, gypsum ceiling designs, hardwood flooring, kitchen cabinets, TV stands, door fitting, and turnkey renovations.",
    url: "https://interiordesign.akilinova.co.ke",
    siteName: "AURA & NOIR Atelier",
    images: [
      {
        url: "/portfolio/project-31.jpg",
        width: 1200,
        height: 800,
        alt: "AURA & NOIR Craftsmanship",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Inline Theme Initializer (Defaults to light mode) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] antialiased selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
