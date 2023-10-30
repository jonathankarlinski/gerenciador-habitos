import Image from '@/node_modules/next/image'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gerenciador de Hábitos',
  description: 'Um gerenciador para poder controlar tarefas diárias ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Image src="/images/logo.svg" width={200} height={200} alt="oi" />
        {children}</body>
    </html>
  )
}
