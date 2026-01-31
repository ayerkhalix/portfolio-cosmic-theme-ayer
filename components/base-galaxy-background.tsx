"use client"

import { useTheme } from "next-themes"

export function BaseGalaxyBackground() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div
      className="fixed inset-0 -z-10 transition-colors duration-500"
      style={{
        background: isDark
          ? "#0b0a12"
          : "radial-gradient(circle at 20% 10%, #ede7ff 0%, #f4efff 35%, #faf7ff 60%, #ffffff 100%)",
      }}
    />
  )
}
