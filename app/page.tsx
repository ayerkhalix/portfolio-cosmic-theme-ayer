"use client"

import { Navbar } from "@/components/navbar"
import { ParticleBackground } from "@/components/particle-background"
import { AuroraBackground } from "@/components/aurora-background"
import { LensFlareBackground } from "@/components/light-leaks"
import { BaseGalaxyBackground } from "@/components/base-galaxy-background"
import { HeroSection } from "@/components/sections/hero"
import { SkillsSection } from "@/components/sections/skills"
import { ProjectsSection } from "@/components/sections/projects"
import { TechStackSection } from "@/components/sections/workflow"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* Base canvas */}
      <BaseGalaxyBackground />
      {/* Layered animated backgrounds */}

      <ParticleBackground />
      <LensFlareBackground />
      <AuroraBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Skills / About Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Workflow / Philosophy Section */}
        <TechStackSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
