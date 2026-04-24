"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote: "An exceptional developer who brings both technical excellence and creative vision to every project. The attention to detail and user experience is outstanding.",
    author: "Rafael De Jesus",
    role: "Lead Digital Innovator",
    company: "Microgenesis Business Systems",
    initials: "RDJ",
    gradient: "from-[#a855f7] to-[#7c3aed]",
  },
  {
    quote: "The FloppyHous website showcase came out clean, fast, and easy to use. It captured our events perfectly and made the whole brand feel more alive online.",
    author: "Patrick Abrio",
    role: "CEO",
    company: "FloppyHous",
    initials: "PA",
    gradient: "from-[#22d3ee] to-[#3b82f6]",
  },
  {
    quote: "Working with them was a game-changer for our product. They delivered a platform that exceeded our expectations in terms of performance and design.",
    author: "Engr. Val Mangalino",
    role: "Program Coordinator",
    company: "Holy Trinity University",
    initials: "VM",
    gradient: "from-[#7c3aed] to-[#6366f1]",
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-[#a855f7]/50 hover:shadow-2xl hover:shadow-[#a855f7]/10">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quote icon */}
        <motion.div
          initial={{ opacity: 0.3, rotate: 0 }}
          whileHover={{ opacity: 0.5, rotate: 10 }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6"
        >
          <Quote className={`w-8 h-8 sm:w-10 sm:h-10 text-[#a855f7]/30`} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <p className="text-foreground/90 leading-relaxed mb-6 text-sm sm:text-base">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Avatar className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient}`}>
                <AvatarFallback className="bg-transparent text-white font-semibold">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <h4 className="font-semibold text-foreground group-hover:text-[#a855f7] transition-colors duration-300">
                {testimonial.author}
              </h4>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient} origin-left`}
        />
      </div>

      {/* Floating animation */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.5,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -z-10"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
      </motion.div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollTestimonials = (direction: "prev" | "next") => {
    const slider = sliderRef.current
    if (!slider) return

    const firstCard = slider.querySelector<HTMLElement>("[data-testimonial-card]")
    const scrollAmount = (firstCard?.offsetWidth ?? 320) + 24

    slider.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />
      </div>

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
            Testimonials
          </motion.span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What People{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feedback from clients and collaborators I&apos;ve had the pleasure of working with.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div
          ref={sliderRef}
          className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:snap-none max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              data-testimonial-card
              className="snap-start flex-none w-[88%] sm:w-[70%] lg:w-auto"
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-5 lg:hidden">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-9 w-9"
            onClick={() => scrollTestimonials("prev")}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-9 w-9"
            onClick={() => scrollTestimonials("next")}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
