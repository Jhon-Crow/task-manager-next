import type { Metadata } from "next";
import { Toaster } from "@/shared/ui";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ТАСК МАНАГЕР",
  description:
    "Приложение для распределения, управления и контроля состояния выполнянеия задач работниками",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
