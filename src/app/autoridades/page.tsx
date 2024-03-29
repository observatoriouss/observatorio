/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getAuthorities } from '@/services/authorities'
import React from 'react'

export const dynamic = 'force-dynamic';

async function fetchData() {
    try {
        const authorities = await getAuthorities()
        console.log(authorities)
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
                <p>Apoyamos a educadores de todo el mundo en áreas críticas de innovación educativa mediante la creación de recursos educativos abiertos.</p>
            </div>

            <div className='w-full flex flex-col gap-4 lg:max-w-[960px]'>
                <h2 className='w-full mx-auto px-0 md:px-12 xl:px-4 text-xl md:text-2xl lg:text-3xl'>Conoce al equipo.</h2>
                <div className='flex flex-wrap justify-center my-2 gap-4 text-left'>
                    {authorities
                    .sort((a, b) => a.hierachy - b.hierachy)
                    .map((authority, i) => (
                        <div className='w-full md:w-[300px]' key={i}>
                            <img src={authority.imageUrl} className='w-full object-cover aspect-square filter hue-rotate-60' alt="" />
                            <h3 className='font-semibold'>{authority.name}</h3>
                            <p>{authority.position}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AutoridadesPage