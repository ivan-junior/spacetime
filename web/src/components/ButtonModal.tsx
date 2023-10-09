'use client'

import { api } from '@/lib/api';
import Cookies from 'js-cookie';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ButtonModal({ isOpen, memoryId }: { isOpen?: boolean, memoryId: string }) {
    const [showModal, setShowModal] = useState(isOpen);
    const router = useRouter()

    async function deleteMemory(id: string) {
        await api.delete(`/memories/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        window.location.href = '/'
    }
    return (
        <>
            <button className='flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100' onClick={() => setShowModal(!showModal)}>
                Excluir
                <Trash className='w-4 h-4' />
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-500 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-700 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modal Title
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                        Tem certeza que deseja deletar a memória cadastrada?
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end border-t border-solid border-gray-700 rounded-b p-6 gap-4">
                                    <button className='p-2 rounded-lg border-2 border-red-500 text-red-500 cursor-pointer' onClick={() => setShowModal(false)}>
                                        CANCELAR
                                    </button>
                                    <button
                                        className='p-2 rounded-lg border-2 border-green-500 bg-green-500 text-white cursor-pointer font-semibold'
                                        onClick={() => deleteMemory(memoryId)}
                                    >
                                        DELETAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
