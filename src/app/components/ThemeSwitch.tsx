"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  let otherTheme = theme === "dark" ? "light" : "dark"

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  const handleButtonClick = () => {
    setTheme(otherTheme)
  }

  return (
    <div
      className="flex h-auto w-auto cursor-pointer items-center justify-center gap-4 p-1"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      onClick={handleButtonClick}
    >
      <Sun
        size={16}
        className="fill-light12 stroke-light12 transition dark:hidden"
      />
      <Moon
        size={16}
        className="dark:fill-dark12 hidden transition dark:block"
      />
    </div>
  )
}
