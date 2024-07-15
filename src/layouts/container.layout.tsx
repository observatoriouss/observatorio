import { Footer, Header } from "@/components";

export default function ContainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mx-auto container pt-[180px] md:pt-[145px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
