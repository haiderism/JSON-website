import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JSON Formatter - Fast & Clean JSON Beautifier',
  description: 'A blazing fast, ad-free JSON formatter and validator. Format, validate, and beautify JSON with ease.',
  keywords: 'JSON formatter, JSON validator, JSON beautifier, JSON parser, developer tools',
  authors: [{ name: 'JSON Formatter' }],
  viewport: 'width=device-width, initial-scale=1',
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