import { Footer, Header } from "@/components";
import SplashScreen from "@/components/SplashScreen";
import { Suspense } from "react";

export default function ContainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto container pt-[180px] md:pt-[145px]">
      <Suspense fallback={<SplashScreen />}>
        {children}
      </Suspense>
    </main>
  );
}
