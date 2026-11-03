import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { BookingProvider } from "@/context/BookingContext";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eliteinteriors.co.ke"),
  title: "ELITE INTERIORS | Master Joinery, Gypsum & Home Renovation Atelier",
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
    "ELITE INTERIORS Atelier",
  ],
  authors: [{ name: "ELITE INTERIORS Atelier" }],
  openGraph: {
    title: "ELITE INTERIORS | Master Joinery, Gypsum & Home Renovation",
    description:
      "Specialists in wooden staircases, gypsum ceiling designs, hardwood flooring, kitchen cabinets, TV stands, door fitting, and turnkey renovations.",
    url: "https://eliteinteriors.co.ke",
    siteName: "ELITE INTERIORS Atelier",
    images: [
      {
        url: "/portfolio/project-31.jpg",
        width: 1200,
        height: 800,
        alt: "ELITE INTERIORS Craftsmanship",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "ELITE INTERIORS Atelier",
  "image": "https://eliteinteriors.co.ke/portfolio/project-31.jpg",
  "@id": "https://eliteinteriors.co.ke",
  "url": "https://eliteinteriors.co.ke",
  "telephone": "+254728541775",
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
        <ThemeProvider>
          <BookingProvider>{children}</BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
