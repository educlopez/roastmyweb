"use client"

import { useSyncExternalStore } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import DarkPaint from "@/app/assets/demon-paint.png"
import LightPaint from "@/app/assets/demon-paintlight.png"

const DarkImage = DarkPaint
const LightImage = LightPaint

export default function ImageDemon() {
  const { theme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!mounted) return null
  return (
    <>
      {theme === "dark" ? (
        <Image
          src={DarkImage}
          className="relative z-10 mx-auto w-[400px]"
          alt="right paint dark"
        />
      ) : (
        <Image
          src={LightImage}
          className="relative z-10 mx-auto w-[400px]"
          alt="right paint light"
        />
      )}
    </>
  )
}
