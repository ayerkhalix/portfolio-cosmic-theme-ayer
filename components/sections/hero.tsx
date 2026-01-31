"use client"

import { motion } from "framer-motion"
import { Sparkles, Download, MessageCircle, ChevronDown } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { HeroLogo } from "@/components/hero-logo"

export function HeroSection() {
  // Resume/CV download handler
  const handleDownloadCV = () => {
    // Replace with your actual resume URL
    const resumeUrl = '/resume.pdf'
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Ayer_Khali_Abrio_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Contact scroll handler
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const actionIcons = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      action: () => window.open('https://linkedin.com/in/yourusername', '_blank'),
      ariaLabel: "Visit LinkedIn profile",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      action: () => window.open('https://github.com/ayerkhalix', '_blank'),
      ariaLabel: "Visit GitHub profile",
    },
    {
      icon: Download,
      label: "Download CV",
      action: handleDownloadCV,
      ariaLabel: "Download resume PDF",
    },
    {
      icon: MessageCircle,
      label: "Contact",
      action: scrollToContact,
      ariaLabel: "Scroll to contact section",
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 xl:gap-20">
          
          {/* Left Column - Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#a855f7]/10 to-[#22d3ee]/10 border border-[#a855f7]/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#a855f7]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
                Available for new projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="bg-gradient-to-r from-[#a855f7] via-[#7c3aed] to-[#22d3ee] bg-clip-text text-transparent">
                Ayer Khali Abrio
              </span>
              <br />
              <span className="text-foreground text-balance">Full-Stack Developer</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed text-pretty"
            >
              A developer and creative technologist focused on building modern, 
              scalable, and visually stunning digital experiences that push the 
              boundaries of what&apos;s possible on the web.
            </motion.p>

            {/* Icon Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 mb-12"
            >
              {actionIcons.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      y: -4,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={item.action}
                    aria-label={item.ariaLabel}
                    className="group relative p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#a855f7]/50 focus:ring-offset-2 focus:ring-offset-background"
                  >
                    {/* Subtle background gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#a855f7]/0 to-[#22d3ee]/0 group-hover:from-[#a855f7]/10 group-hover:to-[#22d3ee]/10 transition-all duration-300" />
                    
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#a855f7] to-[#22d3ee] p-[1px]">
                      <div className="absolute inset-[1px] rounded-full bg-background" />
                    </div>
                    
                    {/* Icon container */}
                    <div className="relative z-10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors duration-300" />
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 1 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#22d3ee]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Tooltip */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-foreground/90 text-background text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {item.label}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground/90 rotate-45" />
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 pt-8 border-t border-border/50 w-full"
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "50+", label: "Projects Delivered" },
                { value: "30+", label: "Happy Clients" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.0 + index * 0.1, type: "spring" }}
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Hero Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <HeroLogo />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#a855f7]"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}