"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectLightbox from "@/components/ProjectLightbox";
import ProjectComparator from "@/components/ProjectComparator";
import { useBooking } from "@/context/BookingContext";
import { PROJECTS, Project } from "@/data/projects";

export default function PortfolioPage() {
  const { openBooking } = useBooking();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([]);

  const handleTogglePin = (p: Project) => {
    if (pinnedProjects.some((item) => item.id === p.id)) {
      setPinnedProjects(pinnedProjects.filter((item) => item.id !== p.id));
    } else {
      if (pinnedProjects.length < 3) {
        setPinnedProjects([...pinnedProjects, p]);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar />

      <div className="pt-24">
        {/* Complete 54-Project Gallery + 4 On-site Video Reels */}
        <ProjectGallery
          projects={PROJECTS}
          onSelectProject={(p) => setSelectedProject(p)}
          pinnedIds={pinnedProjects.map((p) => p.id)}
          onTogglePin={handleTogglePin}
        />
      </div>

      {/* Side-by-side Project Comparison Dock */}
      <ProjectComparator
        pinnedProjects={pinnedProjects}
        onRemoveProject={(id: string) =>
          setPinnedProjects(pinnedProjects.filter((item) => item.id !== id))
        }
        onClearAll={() => setPinnedProjects([])}
        onBookProject={(projectName: string) =>
          openBooking(`Consultation for ${projectName}`)
        }
      />

      {/* Blueprint Schematic & Photo Lightbox */}
      {selectedProject && (
        <ProjectLightbox
          project={selectedProject}
          projects={PROJECTS}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
        />
      )}

      <Footer />
    </main>
  );
}
