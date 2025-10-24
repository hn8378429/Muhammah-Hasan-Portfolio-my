import { ReactNode } from 'react'
// @ts-ignore: allow side-effect CSS import without module declarations
import './globals.css'

export const metadata = {
  title: 'Muhammad Hasan | Full Stack Developer & AI Enthusiast',
  description: 'Portfolio of Muhammad Hasan - Full Stack Developer passionate about building modern web experiences with AI integration',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body>{children}</body>
    </html>
  )
}