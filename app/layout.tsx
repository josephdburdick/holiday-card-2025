import type { Metadata } from "next"
import "./globals.css"
import SnowParticles from "./components/SnowParticles/SnowParticles"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Christmas Card 2025",
  description: "A special Christmas card with page-turn animation",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SnowParticles />
        {children}
        <h1 className="z-0 fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2">
          <Image
            src="/img/logo--solid.svg"
            alt="Logo"
            width={70}
            height={16}
            className="invert"
          />
        </h1>
      </body>
    </html>
  )
}
