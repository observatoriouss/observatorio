import React from "react";
import { Footer, Header } from "@/components";

export default function PrincipalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // relative -> para que splash screen se muestre sobre el footer
    <div className="grid min-h-[100dvh] grid-rows-[auto,1fr] relative w-full">
      <Header />
      <main className="mx-auto container overflow-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
