import ContainerLayout from "@/layouts/container.layout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SALA DE INNOVACIÓN EDUCATIVA CHOT | Observatorio tecnológico - USS',
}
export default function SalaInnovacionChotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <ContainerLayout className="!max-w-full !mx-0 !px-0">
      {children}
    </ContainerLayout>
  );
}