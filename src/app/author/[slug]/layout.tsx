import { Footer, Header } from '@/components';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Author | Observatorio tecnológico - USS',
}
interface Props {
  children: React.ReactNode
}
function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout