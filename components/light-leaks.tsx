"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function LensFlareBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const baseOpacity = isDark ? 1 : 0.75 // FIX 2: Increased light mode opacity

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base diffusion layer - FIX 3: Less opacity, more blur */}
      <div 
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.03) 100%)"
            : "linear-gradient(135deg, rgba(139, 92, 246, 0.02) 0%, rgba(236, 72, 153, 0.01) 100%)",
          opacity: isDark ? 0.25 : 0.15, // Reduced opacity
          filter: "blur(140px)", // Increased blur
        }}
      />
      
      {/* THE MAGIC LAYER - Directional overexposure camera leak */}
      <motion.div
        className="absolute"
        style={{
          width: "120px",
          height: "220vh",
          left: "35%",
          top: "-60%",
          background:
            "linear-gradient(0deg, transparent 0%, rgba(236,72,153,0.75) 40%, rgba(255,255,255,0.45) 50%, rgba(168,85,247,0.6) 60%, transparent 80%)",
          filter: "blur(70px)",
          mixBlendMode: "screen",
          opacity: baseOpacity,
          transform: "rotate(-6deg)",
        }}
        animate={{
          y: ["-60%", "40%", "-60%"],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Vertical magenta streak - FIX 1: Boosted alpha */}
      <motion.div
        className="absolute"
        style={{
          width: "60px",
          height: "200vh",
          left: "25%",
          top: "-50%",
          background: "linear-gradient(0deg, transparent, rgba(219, 39, 119, 0.6), transparent)", // Increased alpha
          filter: "blur(40px)",
          mixBlendMode: "screen",
          opacity: baseOpacity * 0.7,
          transformOrigin: "center center",
        }}
        animate={{
          y: ["-50%", "50%", "-50%"],
          rotate: [0, 1, -1, 0],
          opacity: [baseOpacity * 0.5, baseOpacity * 0.9, baseOpacity * 0.5],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Diagonal purple streak - FIX 1: Boosted alpha */}
      <motion.div
        className="absolute"
        style={{
          width: "100px",
          height: "150vh",
          left: "60%",
          top: "-25%",
          background: "linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.55), rgba(99, 102, 241, 0.4), transparent)", // Increased alpha
          filter: "blur(60px)",
          mixBlendMode: "lighten",
          opacity: baseOpacity * 0.6,
          transform: "rotate(45deg)",
          transformOrigin: "center center",
        }}
        animate={{
          x: ["0%", "5%", "-5%", "0%"],
          y: ["-25%", "75%", "-25%"],
          opacity: [baseOpacity * 0.4, baseOpacity * 0.8, baseOpacity * 0.4],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Soft white highlight - FIX 1: Boosted alpha */}
      <motion.div
        className="absolute"
        style={{
          width: "40px",
          height: "180vh",
          left: "45%",
          top: "-40%",
          background: "linear-gradient(0deg, transparent, rgba(255, 255, 255, 0.35), transparent)", // Increased alpha
          filter: "blur(80px)",
          mixBlendMode: "screen",
          opacity: baseOpacity * 0.5,
          transformOrigin: "center center",
        }}
        animate={{
          y: ["-40%", "60%", "-40%"],
          rotate: [-2, 0, 2, -2],
          opacity: [baseOpacity * 0.3, baseOpacity * 0.6, baseOpacity * 0.3],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Horizontal flare - FIX 1: Boosted alpha */}
      <motion.div
        className="absolute"
        style={{
          width: "80vw",
          height: "30px",
          left: "-10%",
          top: "70%",
          background: "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.25), rgba(168, 85, 247, 0.35), rgba(236, 72, 153, 0.25), transparent)", // Increased alpha
          filter: "blur(50px)",
          mixBlendMode: "lighten",
          opacity: baseOpacity * 0.4,
        }}
        animate={{
          x: ["-10%", "30%", "-10%"],
          opacity: [baseOpacity * 0.2, baseOpacity * 0.5, baseOpacity * 0.2],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional bloom highlight for depth */}
      <motion.div
        className="absolute"
        style={{
          width: "250px",
          height: "250px",
          left: "70%",
          top: "20%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.3) 30%, transparent 70%)",
          filter: "blur(80px)",
          mixBlendMode: "screen",
          opacity: baseOpacity * 0.3,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [baseOpacity * 0.2, baseOpacity * 0.4, baseOpacity * 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle top-left glow */}
      <motion.div
        className="absolute"
        style={{
          width: "300px",
          height: "300px",
          left: "10%",
          top: "10%",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(219, 39, 119, 0.2) 40%, transparent 80%)",
          filter: "blur(90px)",
          mixBlendMode: "screen",
          opacity: baseOpacity * 0.2,
        }}
        animate={{
          x: ["10%", "12%", "8%", "10%"],
          y: ["10%", "12%", "8%", "10%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}