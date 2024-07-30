import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { VercelToolbar } from "@vercel/toolbar/next"
import { ThemeProvider } from "next-themes"

import { Analytics } from "@/app/components/Analytics"

import "./globals.css"

import { FloatNav } from "@/app/components/FloatNav"

const inter = Inter({ subsets: ["latin"] })
const pramukhRounded = localFont({
  src: "./fonts/PramukhRounded-Variable.woff",
})
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "RoastWeb",
    template: "%s | RoastWeb",
  },
  description: "Roast a website with the power of Lighthouse",
  keywords: [
    "lighthouse, web vitals, seo, performance, accessibility, best practices, pwa",
  ],
  openGraph: {
    title: "RoastWeb",
    description: "Roast a website with the power of Lighthouse",
    url: "http://localhost:3000",
    siteName: "RoastWeb",
    images: [
      {
        url: "http://localhost:3000/og.jpg",
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
    title: "RoastWeb",
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
        <ThemeProvider attribute="class">
          <FloatNav />
          <main>
            <div className="overflow-hidden">{children}</div>
          </main>
          <Analytics />
        </ThemeProvider>
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  )
}
