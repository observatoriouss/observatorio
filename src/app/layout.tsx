import type { Metadata } from 'next'
import './globals.css'
import { Header, Footer } from '@/components'


export const metadata: Metadata = {
  title: 'Observatorio tecnológico - USS',
  description: 'Somos una unidad de prospectiva educativa y tecnológica, que busca generar conocimiento y desarrollar capacidades para la toma de decisiones en el ámbito de la educación y la tecnología.',
  icons: {
    icon: '/img/favicon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
