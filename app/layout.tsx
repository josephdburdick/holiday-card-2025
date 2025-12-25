import type { Metadata } from "next"
import "./globals.css"
import SnowParticles from "./components/SnowParticles/SnowParticles"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Christmas Card 2025",
  description: "A special Christmas card with page-turn animation",
  icons: {
    icon: "img/logo--solid.svg",
  },
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
        <h1 className="fixed bottom-4 left-1/2 z-0 -translate-x-1/2 md:bottom-6">
          <Image
            src="img/logo--solid.svg"
            alt="Logo"
            width={40}
            height={20}
            className="invert"
          />
        </h1>
      </body>
    </html>
  )
}
