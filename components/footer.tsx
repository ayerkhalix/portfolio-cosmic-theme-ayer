"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Dribbble } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Dribbble, href: "#", label: "Dribbble" },
]

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="relative pt-12 pb-8 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#a855f7]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group mb-8"
          >
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#a855f7] via-[#7c3aed] to-[#22d3ee] bg-clip-text text-transparent">
              Portfolio
            </span>
            <span className="absolute -inset-2 bg-gradient-to-r from-[#a855f7]/20 to-[#22d3ee]/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#a855f7] to-[#22d3ee] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group p-2.5 rounded-full bg-card/50 border border-border/50 hover:border-[#a855f7]/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-[#a855f7] transition-colors duration-300" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#22d3ee]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground text-center"
          >
            © {new Date().getFullYear()} Portfolio. Crafted with passion and{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
              cosmic energy
            </span>
            .
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
