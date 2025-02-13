import React from "react";
import { Footer, Header } from "@/components";
import { cn } from "@/lib/cn";

export default function ContainerLayout({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto,1fr] relative w-full">
      <Header />
      <main className={cn("mx-auto container overflow-auto", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
