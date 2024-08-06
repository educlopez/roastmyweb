import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { VercelToolbar } from "@vercel/toolbar/next"
import { ThemeProvider } from "next-themes"

import { Analytics } from "@/app/components/Analytics"

import "./globals.css"

import { FloatNav } from "@/app/components/FloatNav"
import { NavPill } from "@/app/components/NavPill"

import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })
const pramukhRounded = localFont({
  src: "./fonts/PramukhRounded-Variable.woff",
})
export const metadata: Metadata = {
  metadataBase: new URL("https://roastmyweb.vercel.app/"),
  title: {
    default: "RoasMytWeb",
    template: "%s | RoastMyWeb",
  },
  description:
    "Roast a website with the power of crux api, sdk.vercel.ai and SEO",
  keywords: [
    "crux, ai, vercel, sdk,, web vitals, seo, performance, accessibility, best practices, pwa",
  ],
  openGraph: {
    title: "RoastMyWeb",
    description:
      "Roast a website with the power of crux api, sdk.vercel.ai and SEO",
    url: "https://roastmyweb.vercel.app/",
    siteName: "RoastMyWeb",
    images: [
      {
        url: "https://roastmyweb.vercel.app/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-EN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "RoastMyWeb",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === "development"

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`bg-light1 antialiased transition dark:bg-dark1 ${inter.className} `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative mb-16">
            <div className="fixed inset-x-0 top-0 isolate z-[10] h-[50px]">
              <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[1px]" />
              <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[2px]" />
              <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[3px]" />
              <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[6px]" />
              <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[12px]" />
            </div>
            <div className="fixed inset-x-0 bottom-0 isolate z-[10] h-[100px]">
              <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[1px]" />
              <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[2px]" />
              <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[3px]" />
              <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[6px]" />
              <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[12px]" />
            </div>
            <main>
              <div className="mx-auto w-[90%] overflow-hidden md:w-full">
                {children}
              </div>
            </main>
            <NavPill />
            <FloatNav />
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  )
}
