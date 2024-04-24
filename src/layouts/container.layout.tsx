export default function ContainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto container pt-[180px] md:pt-[145px]">
        {children}
    </main>
  );
}
