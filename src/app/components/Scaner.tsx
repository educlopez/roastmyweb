"use client"

import { motion } from "framer-motion"

const ScannerWindowAnimation = () => {
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="h-64 w-80 overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Window Title Bar */}
        <div className="flex h-8 items-center bg-gray-200 px-4">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        {/* Window Content */}
        <div className="relative h-56">
          {/* Content placeholder */}
          <div className="p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>

          {/* Scanner ray */}
          <motion.div
            className="absolute left-0 top-0 h-1 w-full bg-blue-400 opacity-50"
            animate={{
              top: ["0%", "100%"],
              opacity: [0.5, 0.8, 0.5],
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
