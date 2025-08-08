import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'JSON Formatter - Fast & Clean JSON Beautifier',
  description: 'A blazing fast, ad-free JSON formatter and validator. Format, validate, and beautify JSON with ease.',
  keywords: 'JSON formatter, JSON validator, JSON beautifier, JSON parser, developer tools',
  authors: [{ name: 'JSON Formatter' }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'JSON Formatter - Fast & Clean JSON Beautifier',
    description: 'A blazing fast, ad-free JSON formatter and validator. Format, validate, and beautify JSON with ease.',
    url: 'https://your-domain.com',
    siteName: 'JSON Formatter',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'JSON Formatter Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter - Fast & Clean JSON Beautifier',
    description: 'A blazing fast, ad-free JSON formatter and validator. Format, validate, and beautify JSON with ease.',
    images: ['/logo.svg'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">
        {children}
      </body>
    </html>
  )
}