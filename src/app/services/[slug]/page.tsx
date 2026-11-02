import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MAIN_SERVICES, PROJECTS, WORKSHOP_REELS, CONTACT_INFO, ServiceItem, Project } from "@/data/projects";
import ServiceDetailClient from "./ServiceDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MAIN_SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = MAIN_SERVICES.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Service Not Found | AURA & NOIR",
    };
  }

  return {
    title: `${service.title} | AURA & NOIR Architectural Atelier`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | AURA & NOIR Atelier Nairobi`,
      description: service.description,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 800,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = MAIN_SERVICES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  // Filter projects for this specific discipline
  const relatedProjects = PROJECTS.filter((p) => p.category === service.id);

  // Find associated workshop video reel if one exists for this discipline
  const relatedReels = WORKSHOP_REELS.filter((r) => r.category === service.id);

  // Other services for bottom navigation
  const otherServices = MAIN_SERVICES.filter((s) => s.id !== service.id);

  return (
    <ServiceDetailClient
      service={service}
      relatedProjects={relatedProjects}
      relatedReels={relatedReels}
      otherServices={otherServices}
    />
  );
}
