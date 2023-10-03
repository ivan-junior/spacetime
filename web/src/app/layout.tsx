import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { Signin } from '@/components/Signin'
import type { Metadata } from 'next'
import { Bai_Jamjuree as BaiJamJuree, Roboto_Flex as Roboto } from 'next/font/google'
import { cookies } from 'next/headers'
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

  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamJuree.variable} font-sans text-gray-100 bg-gray-900`}>

        <main className='grid grid-cols-2 min-h-screen'>
          {/* Left */}
          <div className='flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover'>

            {/* Blur */}
            <div className='absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full' />

            {/* Stripes */}
            <div className='absolute right-2 top-0 bottom-0 w-2 bg-stripes' />

            {isAuthenticated ? <Profile /> : <Signin />}
            <Hero />
          </div>

          {/* Right */}
          <div className='flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
