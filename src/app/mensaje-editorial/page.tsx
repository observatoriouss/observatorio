/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

function EditorialMessagePage() {
    return (
        <div className='pt-3 md:pt-14 pb-12 flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl'>Mensaje Editorial</h1>
                <p className='text-lg'>Cada semana nuestra editora te comparte sus reflexiones sobre la actualidad educativa.</p>
            </div>

            <div className='w-full flex flex-col items-center'>
                <div className='flex flex-wrap justify-start w-full gap-4'>
                    {Array(6).fill(0).map((_, i) => (
                        <div
                            className='w-full md:w-[312px] lg:w-[312px] xl:w-[300px] flex flex-col gap-4'
                            key={i + 1}
                        >
                            <img src="https://via.placeholder.com/150" className='w-full object-cover aspect-video filter hue-rotate-60' alt="" />
                            <div>
                                <h3 className='font-light text-2xl'>Título del mensaje editorial</h3>
                                <p className='text-sm'>Por <span className='font-semibold'>Nombre Autor</span></p>
                                <p className='text-xs'>MENSAJE <span className='font-semibold'>EDITORIAL</span></p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default EditorialMessagePage