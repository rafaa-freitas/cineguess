import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CineGuess — Detector de Gênero de Filmes com IA",
  description: "Envie um pôster de filme e deixe nossa IA adivinhar o gênero. Desenvolvido com Teachable Machine.",
  keywords: ["filme", "gênero", "IA", "machine learning", "pôster"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="antialiased min-h-full">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
