"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Microgenesis Central Hub",
    description: "A centralized access system implementing Microsoft SSO and role-based permissions to manage users across internal tools. Designed for secure authentication, scalable user management, and streamlined internal workflows.",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    tags: ["Next.js", "Django", "Node.js"],
    link: "#",
    github: "#",
  },
  {
    title: "TrinitySync",
    description: "A centralized scheduling system that allows departments to assign subjects without time or room conflicts, while giving students a clear, unified view of their schedules. Includes conflict detection, role-based access, and real-time updates.",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    tags: ["Next.js", "Django", "Node.js"],
    link: "#",
    github: "#",
  },
  {
    title: "CaulerID",
    description: "A mobile app that uses machine learning to identify lato (sea grapes) species and assess freshness through image recognition. Built to support quality control and informed decision-making using on-device and server-side inference.",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    tags: ["Flutter", "Python", "Tensorflow", "Django"],
    link: "#",
    github: "#",
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Image */}
      <motion.div
        ref={cardRef}
        style={{ y: index % 2 === 0 ? y : undefined }}
        className={`relative group ${index % 2 === 1 ? "lg:order-2" : ""}`}
      >
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
          {/* Gradient placeholder */}
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ background: project.image }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
              asChild
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
          </div>
          
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#a855f7]/50 to-[#22d3ee]/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
        </div>
      </motion.div>

      {/* Content */}
      <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        >
          <h3
            className="text-2xl sm:text-3xl font-bold text-foreground mb-4 hover:text-transparent hover:bg-gradient-to-r hover:from-[#a855f7] hover:to-[#22d3ee] hover:bg-clip-text transition-all duration-300 cursor-pointer"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-[#a855f7]/10 text-[#a855f7] hover:bg-[#a855f7]/20 border-[#a855f7]/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Links */}
          <div className="flex gap-4">
            <Button
              asChild
              variant="outline"
              className="border-[#a855f7]/50 hover:border-[#a855f7] hover:bg-[#a855f7]/10 group bg-transparent"
            >
              <a href={project.link}>
                View Project
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="hover:bg-muted/50"
            >
              <a href={project.github}>
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#a855f7]/10 text-[#a855f7] text-sm font-medium mb-4"
          >
            Portfolio
          </motion.span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Selected Work &{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
              Experiments
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of projects that showcase my approach to solving 
            complex problems with elegant solutions.
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
