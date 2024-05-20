/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getAuthorities } from '@/services/authorities'
import Image from 'next/image';
import React from 'react'

export const dynamic = 'force-dynamic';

async function fetchData() {
    try {
        const authorities = await getAuthorities()
        return authorities
    } catch (error) {
        console.error(error)
        return []
    }
}

async function AutoridadesPage() {
    const authorities = await fetchData()
    return (
        <div className='pt-6 pb-12 px-6 lg:px-0 flex flex-col gap-4 md:gap-6 w-full items-center text-left'>
            <div className='lg:max-w-[960px] w-full px-0 md:px-12 xl:px-4'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl text-uss-black font-bold '>El Observatorio</h1>
            </div>

            <div className='lg:max-w-[960px] px-0 md:px-12 xl:px-4'>
                <p>Ofrecemos asistencia a profesores de todo el mundo en elementos esenciales de la innovación en el ámbito educativo, mediante la elaboración de recursos didácticos que son de libre acceso para todos. Esto permite que educadores de distintas regiones puedan implementar prácticas educativas innovadoras con facilidad y sin restricciones.</p>
            </div>

            <div className='w-full flex flex-col gap-4 lg:max-w-[960px]'>
                <h2 className='w-full mx-auto px-0 md:px-12 xl:px-4 text-xl md:text-2xl lg:text-3xl'>Conoce al equipo.</h2>
                <div className='flex flex-wrap justify-center my-2 gap-4 text-left'>
                    {authorities
                        .sort((a, b) => a.hierachy - b.hierachy)
                        .map((authority, i) => (
                            <div className='w-full md:w-[300px] relative' key={i}>
                                <Image
                                    src={authority.imageUrl}
                                    className='w-full object-cover aspect-square'
                                    width={300}
                                    height={300}
                                    alt="" />
                                <h3 className='font-semibold'>{authority.name}</h3>
                                <p>{authority.position}</p>
                                {(authority.socialMedia?.length > 0) && (authority.socialMedia[0] !== '') && authority.socialMedia?.map((socialMedia, i) => (
                                    <a href={socialMedia} target='_blank' key={i}>
                                        <div className='absolute top-2 right-2 rounded-md bg-white p-1 aspect-square flex items-center hover:bg-blue-200 transition delay-100 ease-in-out'>
                                            <svg width="20" height="10" viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.9 5C1.9 3.29 3.29 1.9 5 1.9H9V0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8.1H5C3.29 8.1 1.9 6.71 1.9 5ZM6 6H14V4H6V6ZM15 0H11V1.9H15C16.71 1.9 18.1 3.29 18.1 5C18.1 6.71 16.71 8.1 15 8.1H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0Z" fill="#000000"
                                                />
                                            </svg>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default AutoridadesPage