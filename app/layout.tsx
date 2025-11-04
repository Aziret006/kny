import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Montserrat, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] })
const playfairDisplay = Playfair_Display({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "КНУ — Кыргызский национальный университет имени Жусупа Баласагына",
  description: "Официальная информация о КНУ: факультеты, поступление, научная и культурная деятельность, новости и события университета.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ky">
      <body className={`${montserrat.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
