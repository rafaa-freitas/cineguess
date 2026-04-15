import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CineGuess — Detector de Gênero de Filmes com IA',
  description: 'Envie um pôster de filme e desafie nossa IA a adivinhar o gênero.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  )
}
