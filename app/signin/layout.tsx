export default function SignnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100vh] w-full justify-center items-center">
      {children}
    </div>
  );
}
