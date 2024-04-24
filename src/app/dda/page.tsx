import { ParticlesBackground } from '@/components'
import React from 'react'

function DDAPage() {
    return (
        <>
            <ParticlesBackground />
            <div className='flex flex-col w-full bg-[--uss-green] justify-center items-center gap-8 h-full md:h-[calc(100vh-272px)] px-6 md:px-0'>
                <div className='max-w-3xl mt-48 md:mt-0'>
                    <h1 className='text-5xl lg:text-7xl my-5 text-black font-bold'>Dirección de Desarrollo Académico</h1>
                </div>
                <div className='max-w-3xl w-full flex justify-between flex-row gap-6'>
                    <h3 className='text-xl text-black'>Jefatura de Capacitación y Evaluación Docente</h3>
                    <h3 className='text-xl text-black'>Jefatura de Innovación Docente</h3>
                </div>
            </div>
        </>
    )
}

export default DDAPage