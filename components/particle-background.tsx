"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"

// Color palettes for particles - purple, blue, pink
const PARTICLE_COLORS = {
  dark: [
    "rgba(168, 85, 247, 0.6)",   // violet
    "rgba(124, 58, 237, 0.5)",   // purple
    "rgba(99, 102, 241, 0.5)",   // indigo
    "rgba(59, 130, 246, 0.5)",   // blue
    "rgba(236, 72, 153, 0.4)",   // pink
    "rgba(34, 211, 238, 0.4)",   // cyan
  ],
  light: [
    "rgba(168, 85, 247, 0.5)",   // violet - Changed from 0.35
    "rgba(124, 58, 237, 0.45)",  // purple - Changed from 0.3
    "rgba(99, 102, 241, 0.45)",  // indigo - Changed from 0.3
    "rgba(59, 130, 246, 0.45)",  // blue - Changed from 0.3
    "rgba(236, 72, 153, 0.4)",   // pink - Changed from 0.25
    "rgba(34, 211, 238, 0.4)",   // cyan - Changed from 0.25
  ],
}

const THEME_CONFIG = {
  dark: {
    particleCount: 80,
    sizeRange: [1.5, 4],
    speedRange: [0.08, 0.25],
  },
  light: {
    particleCount: 75, // Changed from 55
    sizeRange: [1.5, 3.5], // Changed from [1, 3]
    speedRange: [0.05, 0.18],
  },
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  colorIndex: number
  pulsePhase: number
  pulseSpeed: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate particles with seeded pseudo-random values
  const generateParticles = useCallback((width: number, height: number, count: number, config: typeof THEME_CONFIG.dark) => {
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const seed1 = (i * 7919 + 1) % 1000 / 1000
      const seed2 = (i * 104729 + 1) % 1000 / 1000
      const seed3 = (i * 15485863 + 1) % 1000 / 1000
      const seed4 = (i * 32452843 + 1) % 1000 / 1000
      const seed5 = (i * 49979687 + 1) % 1000 / 1000
      const seed6 = (i * 67867967 + 1) % 1000 / 1000
      const seed7 = (i * 86028121 + 1) % 1000 / 1000

      const size = config.sizeRange[0] + seed3 * (config.sizeRange[1] - config.sizeRange[0])
      const speed = config.speedRange[0] + seed4 * (config.speedRange[1] - config.speedRange[0])
      
      // Larger particles move slower (depth illusion)
      const depthFactor = 1 - (size - config.sizeRange[0]) / (config.sizeRange[1] - config.sizeRange[0])
      
      particles.push({
        x: seed1 * width,
        y: seed2 * height,
        size,
        speedX: (seed4 - 0.5) * speed * (0.5 + depthFactor * 0.5),
        speedY: (seed5 - 0.35) * speed * (0.5 + depthFactor * 0.5), // Slight upward bias
        opacity: 0.4 + seed6 * 0.5,
        colorIndex: Math.floor(seed7 * 6),
        pulsePhase: seed1 * Math.PI * 2,
        pulseSpeed: 0.01 + seed2 * 0.015,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      
      const isDark = resolvedTheme === "dark"
      const config = isDark ? THEME_CONFIG.dark : THEME_CONFIG.light
      particlesRef.current = generateParticles(width, height, config.particleCount, config)
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      time++
      const width = window.innerWidth
      const height = window.innerHeight
      const isDark = resolvedTheme === "dark"
      const colors = isDark ? PARTICLE_COLORS.dark : PARTICLE_COLORS.light

      ctx.clearRect(0, 0, width, height)

      for (const particle of particlesRef.current) {
        // Move particle with smooth drift
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20

        // Subtle pulse animation
        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulsePhase)
        const baseOpacity = isDark ? 1 : 1.15 // Changed: light mode contrast lift
        const currentOpacity = particle.opacity * baseOpacity * (0.7 + pulse * 0.3) // Changed
        const currentSize = particle.size * (0.9 + pulse * 0.1)

        // Draw particle with soft glow
        const color = colors[particle.colorIndex]
        
        // Outer soft halo
        ctx.globalAlpha = currentOpacity * 0.45 // Changed from 0.3
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, resolvedTheme, generateParticles])

  // SSR fallback
  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Base background - smooth transition */}
      <div className="absolute inset-0 bg-background transition-colors duration-500 ease-in-out" />
      
      {/* Animated particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 transition-opacity duration-500"
      />
    </div>
  )
}