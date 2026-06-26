import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UAG Online — Plataforma de Equivalencias",
  description: "Gestión de equivalencias y seguimiento académico UAG Programas Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
