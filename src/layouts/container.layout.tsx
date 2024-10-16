import React from "react";
import { Footer, Header } from "@/components";
import ClientComponents from "@/components/ClientComponents";

export default function ContainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <ClientComponents />
      <main className="mx-auto container pt-[180px] md:pt-[145px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
