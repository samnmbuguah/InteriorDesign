/**
 * AURA & NOIR Atelier - Strapi CMS Integration Client
 * 
 * Provides typed access to Strapi REST API with automatic graceful fallback
 * to local architectural records (src/data/projects.ts) whenever Strapi is
 * offline, in development, or building statically.
 */

import {
  MAIN_SERVICES,
  PROJECTS,
  ServiceItem,
  Project,
} from "@/data/projects";

// Configuration
export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL ||
  "http://localhost:1337";

export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

interface StrapiEntity {
  id: number | string;
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
}

interface StrapiDataResponse {
  data: StrapiEntity[];
}

/**
 * Normalizes media URLs returned by Strapi or fallback assets.
 */
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return "/portfolio/project-01.jpg";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
    return url;
  }
  if (url.startsWith("/")) {
    // If it's a relative path from Strapi uploads (e.g. /uploads/image.jpg), prefix with Strapi URL
    if (url.startsWith("/uploads/")) {
      return `${STRAPI_URL}${url}`;
    }
    return url;
  }
  return `${STRAPI_URL}/${url}`;
}

/**
 * Generic fetch wrapper for Strapi REST API with timeout & error resilience
 */
async function fetchFromStrapi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  const url = `${STRAPI_URL}/api/${endpoint.replace(/^\//, "")}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout for fast fallback

    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      next: { revalidate: 60 }, // ISR 60 seconds
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (_error) {
    // Network error or timeout: seamlessly fall back
    return null;
  }
}

/**
 * 1. Fetch All Services (with local fallback)
 */
export async function getStrapiServices(): Promise<ServiceItem[]> {
  try {
    const data = await fetchFromStrapi<StrapiDataResponse>(
      "services?populate=*&sort=number:asc"
    );

    if (data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data.map((item) => {
        const attr = (item.attributes || item) as Record<string, unknown>;
        const serviceId = String(attr.slug || attr.id || item.id);
        const fallback = MAIN_SERVICES.find((s) => s.id === serviceId) || MAIN_SERVICES[0];

        const heroImg = attr.image as Record<string, unknown> | string | undefined;
        let imgUrl = fallback.image;
        if (typeof heroImg === "string") {
          imgUrl = heroImg;
        } else if (heroImg && typeof heroImg === "object") {
          const dataObj = heroImg.data as Record<string, unknown> | undefined;
          const attrObj = dataObj?.attributes as Record<string, unknown> | undefined;
          if (typeof attrObj?.url === "string") {
            imgUrl = getStrapiMedia(attrObj.url);
          }
        }

        return {
          ...fallback,
          id: serviceId,
          number: String(attr.number || fallback.number),
          title: String(attr.title || fallback.title),
          shortDesc: String(attr.shortDesc || fallback.shortDesc),
          description: String(attr.description || fallback.description),
          features: Array.isArray(attr.features) && attr.features.length > 0 ? (attr.features as string[]) : fallback.features,
          materialsUsed: Array.isArray(attr.materialsUsed) && attr.materialsUsed.length > 0 ? (attr.materialsUsed as string[]) : fallback.materialsUsed,
          typicalTimeline: String(attr.typicalTimeline || fallback.typicalTimeline),
          image: imgUrl,
        };
      });
    }
  } catch {
    // fall through to fallback
  }

  // Graceful fallback to verified atelier catalog
  return MAIN_SERVICES;
}

/**
 * 2. Fetch Single Service by Slug (with local fallback)
 */
export async function getStrapiServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const data = await fetchFromStrapi<StrapiDataResponse>(
      `services?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );

    if (data && Array.isArray(data.data) && data.data.length > 0) {
      const item = data.data[0];
      const attr = (item.attributes || item) as Record<string, unknown>;
      const serviceId = String(attr.slug || slug);
      const fallback = MAIN_SERVICES.find((s) => s.id === serviceId) || MAIN_SERVICES[0];

      return {
        ...fallback,
        id: serviceId,
        number: String(attr.number || fallback.number),
        title: String(attr.title || fallback.title),
        shortDesc: String(attr.shortDesc || fallback.shortDesc),
        description: String(attr.description || fallback.description),
        features: Array.isArray(attr.features) && attr.features.length > 0 ? (attr.features as string[]) : fallback.features,
        materialsUsed: Array.isArray(attr.materialsUsed) && attr.materialsUsed.length > 0 ? (attr.materialsUsed as string[]) : fallback.materialsUsed,
        typicalTimeline: String(attr.typicalTimeline || fallback.typicalTimeline),
        image: typeof attr.image === "string" ? attr.image : fallback.image,
      };
    }
  } catch {
    // fall through to fallback
  }

  const local = MAIN_SERVICES.find((s) => s.id === slug);
  return local || null;
}

/**
 * 3. Fetch Projects (with category filtering and local fallback)
 */
export async function getStrapiProjects(category?: string): Promise<Project[]> {
  try {
    let endpoint = "projects?populate=*&pagination[pageSize]=100&sort=number:asc";
    if (category && category !== "all") {
      endpoint += `&filters[category][$eq]=${encodeURIComponent(category)}`;
    }

    const data = await fetchFromStrapi<StrapiDataResponse>(endpoint);

    if (data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data.map((item) => {
        const attr = (item.attributes || item) as Record<string, unknown>;
        return {
          id: String(attr.projectId || `proj-${item.id}`),
          number: String(attr.number || String(item.id).padStart(2, "0")),
          title: String(attr.title || "Atelier Project"),
          subtitle: String(attr.subtitle || ""),
          category: (attr.category as any) || "staircases",
          categoryLabel: String(attr.categoryLabel || "Joinery"),
          image: typeof attr.image === "string" ? attr.image : "/portfolio/project-01.jpg",
          location: String(attr.location || "Nairobi, Kenya"),
          year: String(attr.year || "2026"),
          area: String(attr.area || "3,500 sq ft"),
          scope: String(attr.scope || "Architectural Joinery"),
          completionTime: String(attr.completionTime || "4 Weeks"),
          aspectRatio: (attr.aspectRatio as any) || "landscape",
          craftStage: (attr.craftStage as any) || "Completed Work",
          description: String(attr.description || ""),
          highlights: Array.isArray(attr.highlights) ? (attr.highlights as string[]) : [],
          materials: Array.isArray(attr.materials) ? (attr.materials as string[]) : [],
          palette: Array.isArray(attr.palette) ? (attr.palette as { name: string; hex: string }[]) : [],
          featured: Boolean(attr.featured),
        };
      });
    }
  } catch {
    // fall through to fallback
  }

  if (category && category !== "all") {
    return PROJECTS.filter((p) => p.category === category);
  }
  return PROJECTS;
}

/**
 * 4. Submit New Client Consultation Inquiry to Strapi
 */
export async function submitStrapiInquiry(inquiryData: {
  name: string;
  email: string;
  phone: string;
  location?: string;
  projectType?: string;
  budget?: string;
  notes?: string;
  reservationId?: string;
}) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        data: {
          ...inquiryData,
          status: "New Inquiry",
          submittedAt: new Date().toISOString(),
        },
      }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("[Strapi] Note: Could not dispatch inquiry to Strapi endpoint (fallback will handle storage):", err);
  }
  return null;
}
