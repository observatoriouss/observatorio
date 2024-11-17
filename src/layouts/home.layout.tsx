import React from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto,1fr] relative w-full">
      <div />
      <main className="mx-auto container overflow-auto">
        {children}
      </main>
      <div />
    </div>
  );
}
