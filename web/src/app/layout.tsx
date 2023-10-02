import type { Metadata } from 'next'
import { Bai_Jamjuree as BaiJamJuree, Roboto_Flex as Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamJuree = BaiJamJuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jam-juree' })

export const metadata: Metadata = {
  title: 'Spacetime',
  description: 'Uma capsula do tempo construída com React, Next.js, Tailwind e TypeScript.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamJuree.variable} font-sans text-gray-100 bg-gray-900`}>{children}</body>
    </html>
  )
}
