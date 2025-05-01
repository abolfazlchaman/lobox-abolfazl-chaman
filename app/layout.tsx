import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lobox technical assesment - Abolfazl chaman",
  description: "A dropdown selectable menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
