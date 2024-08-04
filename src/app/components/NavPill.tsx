"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function NavPill() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <motion.nav
      className="fixed left-0 right-0 top-5 z-10 flex scale-75 items-center justify-center transition-transform duration-300"
      animate={{ top: isScrolled ? -50 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <span className="transition-background absolute left-1/2 top-0 z-20 flex h-14 -translate-x-1/2 transform flex-row items-center gap-2 whitespace-nowrap rounded-full border border-light11/20 bg-black bg-light1/70 bg-opacity-20 px-4 py-2 text-lg font-semibold text-light12 bg-blend-luminosity shadow-sm backdrop-blur-xl transition duration-200 ease-in-out dark:border-dark11/20 dark:bg-dark1/50 dark:text-dark12">
        <div className="">Last update: August 3</div>
      </span>
      <div className="Nav_nav__shaded-logo__3k6S_"></div>
    </motion.nav>
  )
}
