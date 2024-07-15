import { Footer, Header } from '@/components';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Podcast | Observatorio tecnológico - USS',
}

interface Props {
  children: React.ReactNode;
}
function NewsLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default NewsLayout