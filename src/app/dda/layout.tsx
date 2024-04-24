import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'DDA | Observatorio tecnológico - USS',
}
interface Props {
  children: React.ReactNode
}
function Layout({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  )
}

export default Layout