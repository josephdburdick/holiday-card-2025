import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Christmas Card 2025',
  description: 'A special Christmas card with page-turn animation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
