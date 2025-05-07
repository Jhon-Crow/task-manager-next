import type { Metadata } from "next";
import { Toaster } from "@/shared/ui";
import "../styles/globals.css";
import { Navbar } from "@/widgets/navbar";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ТАСК МАНАГЕР",
  description:
    "Приложение для распределения, управления и контроля состояния выполнянеия задач работниками",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
