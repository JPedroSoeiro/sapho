import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PartProvider } from "@/contexts/PartContext";
import { AircraftProvider } from "@/contexts/AircraftContext";
import { Header } from "@/components/layout/Header";
import { TabNavigation } from "@/components/layout/TabNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAPHO - Helicopter Part Management",
  description: "Sistema de Armazenamento e Predição para Helicópteros e Operações",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <AircraftProvider>
          <PartProvider>
            <Header />
            <TabNavigation />
            <main className="flex-1">{children}</main>
          </PartProvider>
        </AircraftProvider>
      </body>
    </html>
  );
}
