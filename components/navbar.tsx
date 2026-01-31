"use client"

import React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

// Text variants for the logo animation
const logoTexts = [
  {
    id: "name",
    text: "Ayer Khali Abrio",
    className: "text-xl sm:text-2xl font-bold"
  },
  {
    id: "title",
    text: "Full-Stack Developer",
    className: "text-xl sm:text-xl font-semibold"
  }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Calculate max width to prevent layout shift
  const maxWidth = useMemo(() => {
    // Approximate widths based on font sizes and text lengths
    const nameWidth = "Ayer Khali Abrio".length * 12 // Approximate character width
    const titleWidth = "Full-Stack Developer".length * 11
    return Math.max(nameWidth, titleWidth)
  }, [])

  // Auto-rotate text every 10 seconds
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Text rotation effect
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return
    
    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      // Short delay before changing text
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % logoTexts.length)
        
        // Short delay after changing text
        setTimeout(() => {
          setIsTransitioning(false)
        }, 200)
      }, 300)
    }, 5000) // 10 seconds
    
    return () => clearInterval(interval)
  }, [])

  // Smooth scroll handler with easing
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.slice(1)
    const element = document.getElementById(targetId)
    
    if (element) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      
      setActiveSection(targetId)
      setIsMobileMenuOpen(false)
    }
  }, [])

  const currentLogo = logoTexts[currentTextIndex]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Animated Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ minWidth: maxWidth, maxWidth: maxWidth }}
            >
              {/* Background glow during transition */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isTransitioning ? 0.6 : 0,
                  scale: isTransitioning ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
                className="absolute -inset-4 rounded-lg bg-gradient-to-r from-[#a855f7]/20 via-[#7c3aed]/20 to-[#22d3ee]/20 blur-xl"
              />
              
              {/* Radial glow behind text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isTransitioning ? 1 : 0,
                  scale: isTransitioning ? [0.8, 1.2, 0.8] : 1
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#a855f7] via-[#7c3aed] to-[#22d3ee] blur-md opacity-30"
              />
              
              {/* Hover glow */}
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#a855f7]/20 to-[#22d3ee]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Text container with fixed width */}
              <div className="relative overflow-hidden" style={{ width: maxWidth, height: 32 }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentLogo.id}
                    initial={{ 
                      opacity: 0,
                      y: 20,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)"
                    }}
                    exit={{ 
                      opacity: 0,
                      y: -20,
                      filter: "blur(4px)"
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1] // Custom ease for cinematic feel
                    }}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      currentLogo.className,
                      "bg-gradient-to-r from-[#a855f7] via-[#7c3aed] to-[#22d3ee] bg-clip-text text-transparent"
                    )}
                  >
                    {currentLogo.text}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              {/* Shimmer effect during transition */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ 
                  x: isTransitioning ? "100%" : "-100%",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors group",
                    activeSection === link.href.slice(1)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  <motion.span 
                    className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-[#a855f7] to-transparent"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ 
                      opacity: activeSection === link.href.slice(1) ? 1 : 0,
                      scaleX: activeSection === link.href.slice(1) ? 1 : 0
                    }}
                    whileHover={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative overflow-hidden group hover:bg-[#a855f7]/10 focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-foreground" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-foreground" />
                  <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/15 to-[#22d3ee]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md" />
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              {/* CTA Button - Desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="hidden md:block"
              >
                <Button
                  asChild
                  className="relative overflow-hidden bg-gradient-to-r from-[#a855f7] to-[#7c3aed] hover:from-[#9333ea] hover:to-[#6d28d9] text-white shadow-lg shadow-[#a855f7]/25 hover:shadow-[#a855f7]/40 transition-all duration-300"
                >
                  <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                    <span className="relative z-10">Get in Touch</span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      activeSection === link.href.slice(1)
                        ? "text-foreground bg-muted/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    )}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <Button
                  asChild
                  className="mt-2 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white"
                >
                  <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                    Get in Touch
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}