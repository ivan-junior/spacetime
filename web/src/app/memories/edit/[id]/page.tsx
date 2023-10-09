import { BackToTimeline } from '@/components/BackToTimeline';
import { EditMemoryForm } from '@/components/EditMemoryForm';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';
interface Memory {
    id: string
    userId: string
    coverUrl: string
    content: string
    isPublic: boolean
    createdAt: string
}
export default async function Edit({ params }: { params: { id: string } }) {
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
        <div className='flex flex-1 flex-col gap-4 p-16'>
            <BackToTimeline />
            <EditMemoryForm memory={memory} />
        </div>
    )
}