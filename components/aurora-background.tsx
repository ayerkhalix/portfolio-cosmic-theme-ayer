"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

// Aurora light leak configurations
const AURORA_BLOBS = [
  {
    id: 1,
    initialX: -20,
    initialY: 20,
    size: "60%",
    colors: {
      dark: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(124, 58, 237, 0.06) 40%, transparent 70%)",
      light: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.10) 0%, rgba(124, 58, 237, 0.06) 40%, transparent 70%)", // Changed
    },
    animation: {
      x: [-20, 10, -10, -20],
      y: [20, 10, 30, 20],
    },
    duration: 25,
  },
  {
    id: 2,
    initialX: 60,
    initialY: -10,
    size: "55%",
    colors: {
      dark: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 40%, transparent 70%)",
      light: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.09) 0%, rgba(99, 102, 241, 0.025) 40%, transparent 70%)", // Changed
    },
    animation: {
      x: [60, 70, 50, 60],
      y: [-10, 5, -5, -10],
    },
    duration: 30,
  },
  {
    id: 3,
    initialX: 30,
    initialY: 60,
    size: "50%",
    colors: {
      dark: "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, rgba(168, 85, 247, 0.04) 40%, transparent 70%)",
      light: "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, rgba(168, 85, 247, 0.02) 40%, transparent 70%)", // Changed
    },
    animation: {
      x: [30, 40, 25, 30],
      y: [60, 70, 55, 60],
    },
    duration: 35,
  },
]

export function AuroraBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // SSR fallback - no aurora
  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Optional soft radial glow for light mode */}
      {!isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_60%)]" />
      )}
      
      {AURORA_BLOBS.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute transition-opacity duration-500"
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.initialX}%`,
            top: `${blob.initialY}%`,
            background: isDark ? blob.colors.dark : blob.colors.light,
            filter: "blur(32px)", // Changed from 40px
            opacity: isDark ? 1 : 0.9, // Changed from 0.7
          }}
          animate={{
            x: blob.animation.x.map(v => `${v}%`),
            y: blob.animation.y.map(v => `${v}%`),
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional subtle diagonal sweep */}
      <motion.div
        className="absolute w-full h-full transition-opacity duration-500"
        style={{
          background: isDark
            ? "linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.03) 30%, rgba(59, 130, 246, 0.02) 50%, transparent 70%)"
            : "linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.04) 30%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)", // Changed
          opacity: isDark ? 1 : 0.6,
        }}
        animate={{
          opacity: isDark ? [0.7, 1, 0.7] : [0.5, 0.8, 0.5], // Changed
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}