import type { Metadata } from 'next'
import { Red_Hat_Display } from 'next/font/google'
import './globals.css'

const redhatdisplay = Red_Hat_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watchalot - Stream movies & TV',
  description:
    'Stream HD movies and TV online FOR FREE! With subtitles, multiple servers to choose from, and simple yet elegant ad-free interface, watchalot is the best place for all your entertainment needs!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${redhatdisplay.className} text-white bg-black min-h-svh`}
      >
        {children}
      </body>
    </html>
  )
}
