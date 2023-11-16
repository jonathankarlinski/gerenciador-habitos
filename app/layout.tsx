import Image from '@/node_modules/next/image'
import Link from '@/node_modules/next/link'
import type { Metadata } from 'next'
import { Inter, Dosis } from 'next/font/google'
import './globals.css'

const dosis = Dosis({ subsets: ["latin"], variable: "--font-dosis" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="pt-BR">
      <body className={`${dosis.variable} ${inter.variable} flex items-center flex-col mt-10 bg-neutral-900`}>
        <Link
          href='/'
        >
          <Image src="/images/logo.svg" width={200} height={200} alt="Logo do projeto" />
        </Link>
        {children}</body>
    </html>
  )
}
