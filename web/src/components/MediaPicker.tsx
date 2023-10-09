'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
    const [preview, setPreview] = useState<string | null>(null)

    function onFileSelect(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target

        if (!files) return

        console.log(files)

        const previewUrl = URL.createObjectURL(files[0])

        setPreview(previewUrl)
    }
    return (
        <>
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
        </>
    )
}