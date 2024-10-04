import { Metadata } from 'next';
import './styles/style.css';
export const metadata: Metadata = {
  title: 'Magic USS ✨ | Observatorio tecnológico - USS',
}

interface Layout {
  children: React.ReactNode
}
export default function MagicUSS({
  children,
}: Layout) {
  return (
    <main className="">
      {children}
    </main>
  )
}