"use client"

import { ChevronLeftCircle } from "lucide-react"

import useUrlStore from "@/app/components/AppContext"
import { ThemeSwitch } from "@/app/components/ThemeSwitch"

export function FloatNav() {
  const currentUrl = useUrlStore((state) => state.currentUrl)
  const updateStoreUrl = useUrlStore((state) => state.updateUrl)

  const handleClick = () => {
    updateStoreUrl("")
  }

  const formattedUrl = currentUrl
    ? currentUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : ""

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-full border border-light11/20 bg-light1/70 px-4 py-2 text-light12 bg-blend-luminosity shadow-sm backdrop-blur-xl transition dark:border-dark11/20 dark:bg-dark1/50 dark:text-dark12">
      {currentUrl && (
        <>
          <ChevronLeftCircle size={24} onClick={handleClick} />
          <span className="rounded-md bg-[#FF2574]/5 px-1 py-0.5 font-mono text-[13px] text-[#FF2574] dark:bg-[#00DDA6]/5 dark:text-[#00DDA6]">
            {formattedUrl}
          </span>
        </>
      )}
      <a
        href="https://x.com/educlopez93"
        aria-label="X Profile educlopez93"
        target="_blank"
        className="flex h-auto w-auto cursor-pointer items-center justify-center gap-4 p-1"
      >
        <svg
          width="20"
          height="20"
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
