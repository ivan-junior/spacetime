import { BackToTimeline } from '@/components/BackToTimeline'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { Pencil, Trash } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
interface Memory {
    id: string
    userId: string
    coverUrl: string
    content: string
    isPublic: boolean
    createdAt: string
}
export default async function View({ params }: { params: { id: string } }) {
    const isAuthenticated = cookies().has('token')

    if (!isAuthenticated) {
        return (
            <div className='p-16'>Unauthenticated</div>
        )
    }

    const token = cookies().get('token')?.value
    const response = await api.get(`/memories/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const memory: Memory = response.data

    return (
        <>
            <div className='p-8'>
                <BackToTimeline />
            </div>
            <div className='flex flex-col gap-10 p-8'>
                <div className='space-y-4'>
                    <time className='flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50'>
                        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
                    </time>
                    <label
                        htmlFor='isPublic'
                        className='flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100'
                    >
                        <input
                            type='checkbox'
                            name='isPublic'
                            value="true"
                            defaultChecked={memory.isPublic}
                            className='h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500'
                        />
                        Public Memory
                    </label>
                    <Image
                        src={memory.coverUrl}
                        alt=''
                        width={592}
                        height={280}
                        className='w-full aspect-video object-cover rounded-lg'
                    />

                    <p className='text-lg leading-relaxed text-gray-100'>
                        {memory.content}
                    </p>
                    <div className='flex items-center gap-4 justify-start'>
                        <Link href={`/memories/edit/${memory.id}`} className='flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100'>
                            Edit
                            <Pencil className='w-4 h-4' />
                        </Link>
                        <Link href={`/memories/delete/${memory.id}`} className='flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100'>
                            Delete
                            <Trash className='w-4 h-4' />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}