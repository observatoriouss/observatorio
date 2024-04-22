import type { Metadata } from 'next'
import './globals.css'
import { Header, Footer } from '@/components'
import Script from 'next/script'


export const metadata: Metadata = {
  title: 'Observatorio tecnológico - USS',
  description: 'Somos una unidad de prospectiva educativa y tecnológica, que busca generar conocimiento y desarrollar capacidades para la toma de decisiones en el ámbito de la educación y la tecnología.',
  icons: {
    icon: '/img/favicon.png',
  },
  keywords: ['observatorio', 'tecnológico', 'educación', 'tecnología', 'innovación', 'educativa', 'prospectiva', 'tecnológica', 'universidad', 'señor', 'sipan', 'uss', 'chiclayo', 'perú', 'aprendizaje', 'investigación', 'desarrollo', 'tecnológico', 'estrategia', 'formación', 'digital', 'elearning', 'educación superior', 'tecnologías de la información', 'enseñanza', 'aprendizaje', 'plataforma', 'online', 'educación virtual', 'transformación digital', 'educación a distancia', 'tecnología educativa', 'innovación educativa', 'tecnologías emergentes', 'enseñanza virtual', 'aprendizaje electrónico', 'aprendizaje virtual', 'formación online', 'plataforma educativa', 'recursos educativos digitales'],
  authors: [{
    name: 'Universidad Señor de Sipán',
    url: 'https://uss.edu.pe',
  }],
  applicationName: 'Observatorio tecnológico - USS',
  robots: 'index, follow',
  creator: 'DDA - USS',
  openGraph: {
    description: 'Somos una unidad de prospectiva educativa y tecnológica, que busca generar conocimiento y desarrollar capacidades para la toma de decisiones en el ámbito de la educación y la tecnología.',
    title: 'Observatorio tecnológico - USS',
    url: 'https://observatorio-tecnologico.uss.edu.pe',
    type: 'website',
    locale: 'es_PE',
    siteName: 'Observatorio tecnológico - USS',
    images: [
      {
        url: '/img/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Observatorio tecnológico - USS',
      },
    ],
    phoneNumbers: ['074 481610'],
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
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}></Script>
        <Script id="google-analytics">
          {process.env.NODE_ENV === 'production' && `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
