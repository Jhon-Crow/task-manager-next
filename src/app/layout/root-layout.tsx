import type { Metadata } from "next";
import { Toaster } from "@/shared/ui";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { StoreProvider } from "../providers/StoreProvider";
import { ThemeProvider } from "../providers/ThemeProvider";

export const metadata: Metadata = {
  title: "ТАСК МАНАГЕР",
  //todo Поменять название
  description:
    "Приложение для распределения, управления и контроля состояния выполнянеия задач работниками",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <StoreProvider>
          <body className={`antialiased relative vsc-initialized`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </StoreProvider>
      </SessionProvider>
    </html>
  );
}
