import React from "react";
import { Footer, Header } from "@/components";

export default function ContainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto,1fr] relative w-full">
      <Header />
      <main className="mx-auto container overflow-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
