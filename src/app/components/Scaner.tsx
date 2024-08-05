"use client"

import { motion } from "framer-motion"

const ScannerWindowAnimation = () => {
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="h-64 w-80 overflow-hidden rounded-lg bg-light2 shadow-sm dark:bg-dark2">
        <div className="flex h-8 items-center bg-light4 px-4 dark:bg-dark4">
          <div className="mr-2 h-3 w-3 rounded-full border-[1px] border-[#FF2574] bg-[#FF2574]/30 dark:border-[#FF6B00] dark:bg-[#FF6B00]/30" />
          <div className="mr-2 h-3 w-3 rounded-full border-[1px] border-[#FF2574] bg-[#FF2574]/30 dark:border-[#FF6B00] dark:bg-[#FF6B00]/30" />
          <div className="h-3 w-3 rounded-full border-[1px] border-[#FF2574] bg-[#FF2574]/30 dark:border-[#FF6B00] dark:bg-[#FF6B00]/30" />
        </div>

        <div className="relative h-56">
          <div className="p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-light4 dark:bg-dark4" />
            <div className="mb-2 h-8 w-8 rounded bg-light4 dark:bg-dark4" />
            <div className="mb-2 h-4 w-1/2 rounded bg-light4 dark:bg-dark4" />
            <div className="mb-2 h-4 w-5/6 rounded bg-light4 dark:bg-dark4" />
            <div className="mb-2 h-4 w-full rounded bg-light4 dark:bg-dark4" />
            <div className="mb-2 h-4 w-1/2 rounded bg-light4 dark:bg-dark4" />
            <div className="h-4 w-5/6 rounded bg-light4 dark:bg-dark4" />
          </div>

          <motion.div
            className="absolute left-0 top-0 h-1 w-full bg-[#FF2574] shadow-[0_0_2px_#FF2574,inset_0_0_2px_#FF2574,0_0_5px_#FF2574,0_0_15px_#FF2574,0_0_30px_#FF2574] dark:bg-[#FF6B00] dark:shadow-[0_0_2px_#FF6B00,inset_0_0_2px_#FF6B00,0_0_5px_#FF6B00,0_0_15px_#FF6B00,0_0_30px_#FF6B00]"
            animate={{
              top: ["0%", "100%"],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ScannerWindowAnimation
