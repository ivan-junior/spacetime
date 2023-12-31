'use client'

import Link from 'next/link';

export function Hero() {
    return (
        <div className='space-y-5'>
            <div className='max-w[420px] space-y-1'>
                <h1 className='text-5xl font-bold leading-tight text-gray-50'>Your time capsule</h1>
                <p className='text-lg leading-relaxed'>Collect memorable moments from your journey and share them (if you want) with the world!</p>
            </div>
            <Link
                href="/memories/new"
                className='inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600'
            >
                REGISTER MEMORY
            </Link>
        </div>
    )
}