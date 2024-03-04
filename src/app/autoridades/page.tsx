/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'

function AutoridadesPage() {
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
                    {Array(6).fill(0).map((_, i) => (
                        <div className='w-full md:w-[300px]' key={i}>
                            <img src="https://via.placeholder.com/150" className='w-full object-cover aspect-square filter hue-rotate-60' alt="" />
                            <h3 className='font-semibold'>Nombre de la persona</h3>
                            <p>Descripción del cargo</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AutoridadesPage