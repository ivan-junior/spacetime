'use client'

import { api } from '@/lib/api';
import Cookies from 'js-cookie';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Memory {
    id: string
    userId: string
    coverUrl: string
    content: string
    isPublic: boolean
    createdAt: string
}

export function EditMemoryForm({ memory }: { memory: Memory }) {
    const [preview, setPreview] = useState<string | null>(memory.coverUrl)
    const [hasChangedImage, setHasChangedImage] = useState(false)
    const router = useRouter()

    function onFileSelect(event: ChangeEvent<HTMLInputElement>) {
        setHasChangedImage(true)
        const { files } = event.target

        if (!files) return

        console.log(files)

        const previewUrl = URL.createObjectURL(files[0])

        setPreview(previewUrl)

    }

    async function handleEditMemory(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const fileToUpload = formData.get('coverUrl')
        let coverUrl = ''
        if (fileToUpload && hasChangedImage) {
            const uploadFormData = new FormData()
            uploadFormData.set('file', fileToUpload)

            const uploadResponse = await api.post('/upload', uploadFormData)

            coverUrl = uploadResponse.data.url
        }

        await api.put(`/memories/${memory.id}`, {
            coverUrl,
            content: formData.get('content'),
            isPublic: formData.get('isPublic')
        },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        )

        router.push('/')
    }

    return (
        <form onSubmit={handleEditMemory} className='flex flex-1 flex-col gap-2'>
            <div className="flex items-center gap-4">
                <label
                    htmlFor="media"
                    className='flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100'
                >
                    <Camera className='h-4 w-4' />
                    Edit media
                </label>

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
                    Public memory
                </label>

            </div>
            <input
                type="file"
                name="coverUrl"
                id="media"
                accept='image/*'
                className='invisible h-0 w-0'
                onChange={onFileSelect}
            />
            {preview && (
                <img src={preview} alt='' className='w-full aspect-video rounded-lg object-cover' />
            )}
            <textarea
                name="content"
                id="content"
                spellCheck={false}
                className='w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0'
                placeholder='Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre'
                defaultValue={memory.content}
            />

            <button
                type='submit'
                className='inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600'
            >
                Save
            </button>
        </form>
    )
}