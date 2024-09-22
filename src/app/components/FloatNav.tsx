"use client"

import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2 } from "lucide-react"

import useUrlStore from "@/app/components/AppContext"
import { ThemeSwitch } from "@/app/components/ThemeSwitch"

export function FloatNav() {
  const currentUrl = useUrlStore((state) => state.currentUrl)
  const clearState = useUrlStore((state) => state.clearState)
  const router = useRouter()

  const handleClick = () => {
    clearState()
    router.push("/", undefined)
    router.refresh()
  }

  const formattedUrl = currentUrl
    ? currentUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : ""

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-full border border-light11/20 bg-light1/70 px-4 py-2 text-light12 bg-blend-luminosity shadow-sm backdrop-blur-xl transition dark:border-dark11/20 dark:bg-dark1/50 dark:text-dark12">
      <AnimatePresence>
        {currentUrl && (
          <>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-[#FF2574]/5 px-2 py-1 font-mono text-[13px] text-[#FF2574] dark:bg-[#FF6B00]/5 dark:text-[#FF6B00]"
              onClick={handleClick}
            >
              <Trash2 size={16} />
              {formattedUrl}
            </motion.span>
          </>
        )}
      </AnimatePresence>
      <a
        href="https://x.com/educalvolpz"
        aria-label="X Profile educalvolpz"
        target="_blank"
        className="flex h-auto w-auto cursor-pointer items-center justify-center gap-4 p-1"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          className="fill-light12 dark:fill-dark12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.773 2.5h2.545l-5.56 6.354 6.54 8.646h-5.12l-4.01-5.244-4.59 5.244H2.032l5.946-6.796L1.704 2.5h5.25l3.626 4.793L14.773 2.5zm-.893 13.477h1.41L6.19 3.943H4.676l9.204 12.034z"></path>
        </svg>
      </a>

      <ThemeSwitch />
    </nav>
  )
}
