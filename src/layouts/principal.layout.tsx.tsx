import React from "react";
import { Footer, Header } from "@/components";
import ClientComponents from "@/components/ClientComponents";

export default function PrincipalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <ClientComponents />
      {children}
      <Footer />
    </>
  );
}
