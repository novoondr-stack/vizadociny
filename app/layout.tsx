import type { Metadata } from 'next'
import './globals.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Víza do Číny | VízadoČíny.cz — Rychle a spolehlivě od roku 2008',
  description: 'Zajistíme čínské vízum L, M, X, Z kompletně za vás. 100% úspěšnost od roku 2008. Turistická víza od 4 499 Kč, obchodní od 5 999 Kč.',
  keywords: 'vízum do Číny, čínské vízum, turistické vízum Čína, obchodní vízum Čína, vízový servis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
