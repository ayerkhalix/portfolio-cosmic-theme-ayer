"use client"

import React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function HeroLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 120, damping: 18 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  // SSR fallback: static logo without animations
  if (!mounted) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-[#a855f7]/15 to-[#7c3aed]/15 border border-[#a855f7]/20 flex items-center justify-center">
          <div className="w-40 h-40 sm:w-44 sm:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 rounded-full bg-gradient-to-br from-[#a855f7]/30 to-[#22d3ee]/30 flex items-center justify-center">
            <svg className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center lg:-translate-x-[2rem] xl:-translate-x-[6rem]" style={{ perspective: "1000px" }}>
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* 3D tilt container */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative cursor-pointer"
        >
          {/* Ambient glow - always visible, intensifies on hover */}
          <motion.div
            className="absolute -inset-8 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(124, 58, 237, 0.1) 40%, transparent 70%)",
            }}
            animate={{
              scale: isHovered ? 1.15 : 1,
              opacity: isHovered ? 1 : 0.6,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Main logo container - LARGER */}
          <motion.div
            className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            {/* Layered background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/15 via-[#7c3aed]/10 to-[#22d3ee]/15 transition-opacity duration-500" />
            
            {/* Animated gradient ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, rgba(168, 85, 247, 0.2), rgba(124, 58, 237, 0.15), rgba(34, 211, 238, 0.2), rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.2))",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Inner mask to create ring effect */}
            <div className="absolute inset-[3px] rounded-full bg-background transition-colors duration-500" />
            
            {/* Border ring */}
            <div className="absolute inset-0 rounded-full border border-[#a855f7]/25 transition-colors duration-300" />
            
            {/* Inner content with 3D depth */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: "translateZ(30px)" }}
            >
              {/* Inner circle - avatar/logo placeholder - LARGER */}
              <motion.div
                className="relative w-40 h-40 sm:w-44 sm:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 rounded-full bg-gradient-to-br from-[#a855f7]/30 via-[#7c3aed]/25 to-[#22d3ee]/30 border border-[#a855f7]/30 flex items-center justify-center overflow-hidden transition-all duration-300"
                style={{ transform: "translateZ(50px)" }}
              >
                {/* Placeholder icon - replace with actual logo/image */}
                <svg 
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 text-white/70 transition-colors duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>

                {/* Light sweep on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{
                    x: isHovered ? "100%" : "-100%",
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Subtle pulse glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
                  }}
                  animate={{
                    opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative orbiting dots */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{
              duration: 8,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            }}
          >
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i === 0 ? "#a855f7" : i === 1 ? "#7c3aed" : "#22d3ee",
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translateY(-140%) translateX(-50%)`,
                  boxShadow: `0 0 8px ${i === 0 ? "rgba(168, 85, 247, 0.5)" : i === 1 ? "rgba(124, 58, 237, 0.5)" : "rgba(34, 211, 238, 0.5)"}`,
                }}
                animate={{
                  opacity: isHovered ? [0.5, 1, 0.5] : 0.4,
                  scale: isHovered ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
