"use client"

import React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])
  const gradientDeg = useTransform(mouseXSpring, [-0.5, 0.5], [225, 315])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  // SSR fallback: static card without 3D transforms
  if (!mounted) {
    return (
      <div className="w-full max-w-sm aspect-square">
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 shadow-2xl shadow-[#a855f7]/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 via-transparent to-[#22d3ee]/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#a855f7]/30 to-[#7c3aed]/30 border border-[#a855f7]/30" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 30 },
        }}
        className="relative w-full max-w-sm aspect-square rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl shadow-[#a855f7]/20 overflow-hidden cursor-pointer group"
      >
        {/* Holographic light effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(${gradientDeg}deg, transparent 0%, rgba(168, 85, 247, 0.08) 45%, rgba(34, 211, 238, 0.12) 50%, rgba(168, 85, 247, 0.08) 55%, transparent 100%)`,
          }}
        />

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 via-transparent to-[#22d3ee]/10" />

        {/* Placeholder content - Profile Photo / Logo area */}
        <div 
          className="relative h-full flex flex-col items-center justify-center p-8" 
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Avatar placeholder */}
          <motion.div
            style={{ transform: "translateZ(60px)" }}
            className="relative mb-6"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#22d3ee]/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Avatar container */}
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-[#a855f7]/30 to-[#7c3aed]/30 border-2 border-[#a855f7]/40 flex items-center justify-center overflow-hidden">
              {/* Placeholder icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a855f7]/50 to-[#22d3ee]/50 flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-white/70" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              
              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: isHovered ? ["-100%", "100%"] : "-100%",
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 0.5,
                }}
              />
            </div>
          </motion.div>

          {/* Placeholder text */}
          <motion.div 
            style={{ transform: "translateZ(50px)" }}
            className="text-center"
          >
            <div className="h-5 w-32 bg-gradient-to-r from-[#a855f7]/30 to-[#7c3aed]/30 rounded-md mb-3" />
            <div className="h-3 w-24 bg-muted/40 rounded-md mx-auto" />
          </motion.div>

          {/* Decorative elements */}
          <motion.div 
            style={{ transform: "translateZ(30px)" }}
            className="absolute bottom-6 left-6 right-6 flex justify-center gap-3"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#a855f7] to-[#22d3ee] opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </motion.div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(34, 211, 238, 0.3))",
            filter: "blur(15px)",
          }}
        />

        {/* Border gradient */}
        <div 
          className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none" 
          style={{ 
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), transparent, rgba(34, 211, 238, 0.2))",
            WebkitMaskImage: "linear-gradient(black, black)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude"
          }} 
        />
      </motion.div>
    </div>
  )
}
