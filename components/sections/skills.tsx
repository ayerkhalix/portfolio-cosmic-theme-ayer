"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Server, Palette, Zap, Globe, Layers } from "lucide-react"

const skills = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description:
      "Building responsive, accessible, and component-driven interfaces using React, Next.js, Tailwind CSS, and modern frontend patterns.",
    gradient: "from-[#a855f7] to-[#7c3aed]",
  },
  {
    icon: Server,
    title: "Full-Stack Development",
    description:
      "Owning end-to-end feature development, from frontend logic and APIs to database integration and application flow.",
    gradient: "from-[#7c3aed] to-[#6366f1]",
  },
  {
    icon: Layers,
    title: "Backend & Database Management",
    description:
      "Designing and maintaining backend logic, database schemas, authentication flows, and CRUD systems for real-world projects.",
    gradient: "from-[#6366f1] to-[#22d3ee]",
  },
  {
    icon: Palette,
    title: "UI Implementation",
    description:
      "Translating designs into clean, polished interfaces with strong attention to spacing, typography, and visual hierarchy.",
    gradient: "from-[#22d3ee] to-[#06b6d4]",
  },
  {
    icon: Zap,
    title: "Motion & Interaction",
    description:
      "Enhancing user experience through subtle animations, transitions, and interactive feedback using Framer Motion.",
    gradient: "from-[#06b6d4] to-[#a855f7]",
  },
  {
    icon: Globe,
    title: "Application Structure",
    description:
      "Organizing projects with clear data flow, separation of concerns, and maintainable file and component architecture.",
    gradient: "from-[#a855f7] to-[#ec4899]",
  },
]


function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-500 hover:border-[#a855f7]/50 hover:shadow-xl hover:shadow-[#a855f7]/10">
        {/* Gradient border on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br ${skill.gradient} p-[1px]`}>
          <div className="absolute inset-[1px] rounded-2xl bg-card" />
        </div>

        {/* Glow effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 1 }}
          className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${skill.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${skill.gradient} mb-4`}
          >
            <skill.icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#a855f7] group-hover:to-[#22d3ee] group-hover:bg-clip-text transition-all duration-300">
            {skill.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {skill.description}
          </p>

          {/* Pulse animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            className={`absolute top-6 right-6 w-2 h-2 rounded-full bg-gradient-to-r ${skill.gradient}`}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-24 sm:py-32">
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
            Skills & Expertise
          </motion.span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What I Bring to the{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
              Table
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set spanning the full stack, from pixel-perfect interfaces 
            to robust backend systems.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
