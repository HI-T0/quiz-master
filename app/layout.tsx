import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Puzzle Quest',
  description: 'A challenging puzzle game for word lovers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
  <link rel="icon" href="/webicon/favicon.ico" sizes="any" />
  <link rel="icon" href="/webicon/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/webicon/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/webicon/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/webicon/favicon-32x32.png" />
</head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

