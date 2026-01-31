"use client"

import { motion, useReducedMotion, AnimatePresence, useAnimation } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs,
  SiPython,
  SiFramer,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiVercel
} from "react-icons/si"
import { TbApi, TbLock, TbDatabase } from "react-icons/tb"
import { FiCode, FiServer } from "react-icons/fi"

const frontendTools = [
  { name: "React", icon: SiReact, color: "#61DAFB", gradient: "from-[#61DAFB] to-[#7c3aed]" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", gradient: "from-[#000000] to-[#7c3aed]" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", gradient: "from-[#3178C6] to-[#6366f1]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", gradient: "from-[#06B6D4] to-[#22d3ee]" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF", gradient: "from-[#0055FF] to-[#7c3aed]" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", gradient: "from-[#F7DF1E] to-[#ec4899]" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26", gradient: "from-[#E34F26] to-[#a855f7]" },
  { name: "CSS", icon: SiCss3, color: "#1572B6", gradient: "from-[#1572B6] to-[#6366f1]" },
  { name: "Vercel", icon: SiVercel, color: "#000000", gradient: "from-[#000000] to-[#22d3ee]" },
]

const backendTools = [
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", gradient: "from-[#339933] to-[#7c3aed]" },
  { name: "Python", icon: SiPython, color: "#3776AB", gradient: "from-[#3776AB] to-[#6366f1]" },
  { name: "Express", icon: SiExpress, color: "#000000", gradient: "from-[#000000] to-[#a855f7]" },
  { name: "REST APIs", icon: TbApi, color: "#008080", gradient: "from-[#008080] to-[#22d3ee]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", gradient: "from-[#4169E1] to-[#7c3aed]" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", gradient: "from-[#47A248] to-[#06b6d4]" },
  { name: "SQL Databases", icon: TbDatabase, color: "#336791", gradient: "from-[#336791] to-[#6366f1]" },
  { name: "Authentication", icon: TbLock, color: "#FF6B6B", gradient: "from-[#FF6B6B] to-[#a855f7]" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", gradient: "from-[#FFCA28] to-[#ec4899]" },
  { name: "CRUD Systems", icon: FiCode, color: "#4ECDC4", gradient: "from-[#4ECDC4] to-[#22d3ee]" },
]

interface CarouselItemProps {
  tool: typeof frontendTools[0]
  index: number
}

function CarouselItem({ tool, index }: CarouselItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-[280px] h-[180px] will-change-transform transform-gpu"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="relative h-full p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-300 hover:border-[#a855f7]/50 hover:shadow-xl hover:shadow-[#a855f7]/10">
        {/* Gradient border on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-gradient-to-br ${tool.gradient} p-[1px]`}>
          <div className="absolute inset-[1px] rounded-2xl bg-card" />
        </div>

        {/* Glow effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { scale: 1.5, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${tool.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30`}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          {/* Icon container */}
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.gradient} mb-4`}
          >
            <tool.icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Tool name */}
          <h3 className="text-xl font-semibold text-foreground text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#a855f7] group-hover:to-[#22d3ee] group-hover:bg-clip-text transition-all duration-300">
            {tool.name}
          </h3>

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
            className={`absolute top-6 right-6 w-2 h-2 rounded-full bg-gradient-to-r ${tool.gradient}`}
          />
        </div>
      </div>
    </motion.div>
  )
}

interface AutoScrollCarouselProps {
  items: typeof frontendTools
  direction?: 'left' | 'right'
}

function AutoScrollCarousel({ items, direction = 'left' }: AutoScrollCarouselProps) {
  const controls = useAnimation()
  const shouldReduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  
  // Duplicate items for seamless scrolling - only need 2 sets
  const duplicatedItems = [...items, ...items]

  useEffect(() => {
    if (shouldReduceMotion) return

    const startAnimation = async () => {
      await controls.start({
        x: direction === 'left' ? "-50%" : "50%",
        transition: {
          duration: 60, // Very slow for calm, professional feel
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      })
    }

    if (!isHovered) {
      startAnimation()
    }

    return () => {
      controls.stop()
    }
  }, [controls, direction, shouldReduceMotion, isHovered])

  const handleHoverStart = () => {
    setIsHovered(true)
    controls.stop()
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
  }

  return (
    <div 
      className="relative overflow-hidden py-8"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        className="flex gap-6 will-change-transform transform-gpu"
        animate={controls}
        style={{ width: 'max-content' }}
      >
        {duplicatedItems.map((tool, index) => (
          <CarouselItem 
            key={`${tool.name}-${index}`}
            tool={tool}
            index={index % items.length}
          />
        ))}
      </motion.div>
      
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-background via-background/90 to-transparent pointer-events-none" />
    </div>
  )
}

export function TechStackSection() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend'>('frontend')
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 overflow-x-hidden">
      {/* Extended background glow - covers entire width */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a855f7]/10 rounded-full blur-[200px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#22d3ee]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#7c3aed]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#a855f7]/10 text-[#a855f7] text-sm font-medium mb-4"
          >
            Tech Stack
          </motion.span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tools I Use to Build{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
              Modern Full-Stack Applications
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A carefully selected set of technologies for creating performant, scalable, and maintainable solutions.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`relative px-6 py-2.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'frontend' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <FiCode className="w-4 h-4" />
                Frontend
              </div>
              {activeTab === 'frontend' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/20 to-[#22d3ee]/20 rounded-md border border-white/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`relative px-6 py-2.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'backend' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <FiServer className="w-4 h-4" />
                Backend
              </div>
              {activeTab === 'backend' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#22d3ee]/20 to-[#a855f7]/20 rounded-md border border-white/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* Carousel Container - Extended width */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {shouldReduceMotion ? (
                // Reduced motion version: static grid
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-6 lg:px-8">
                  {(activeTab === 'frontend' ? frontendTools : backendTools).map((tool, index) => (
                    <CarouselItem 
                      key={tool.name}
                      tool={tool}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                // Auto-scrolling carousel
                <AutoScrollCarousel 
                  items={activeTab === 'frontend' ? frontendTools : backendTools}
                  direction="left"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tech stack description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-muted-foreground">
            Each tool is chosen for its reliability, performance, and developer experience. 
            This stack enables me to deliver robust solutions that scale with your needs.
          </p>
        </motion.div>
      </div>

      {/* Extended central glow orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#a855f7] to-[#22d3ee] rounded-full blur-3xl opacity-20 hidden lg:block"
      />
    </section>
  )
}