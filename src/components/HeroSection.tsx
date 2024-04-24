import { cn } from '@/lib/cn'
import React from 'react'

interface Props {
    heroImage?: string,
    title: string,
    description: string
}
function HeroSection({ heroImage, title, description }: Props) {
    return (
        <div className={cn(
            'bg-contain bg-center bg-no-repeat flex flex-col gap-4 p-3 md:p-10 mt-12 bg-uss-green-10 h-[100px] md:h-[190px] lg:h-[358px]',
        )}
            {...(heroImage && { style: { backgroundImage: `url(${heroImage})` } })}
            >
            <div className='container mx-auto w-full flex flex-col gap-2 md:gap-4 py-0 md:py-1 lg:py-6'>
                <h1 className='md:text-2xl lg:text-5xl font-semibold text-uss-black'>{title}</h1>
                <p className='text-uss-black font-light md:text-xl text-xs lg:text-3xl w-ful max-w-[190px] md:max-w-sm lg:max-w-3xl'>{description}</p>
            </div>
        </div>
    )
}

export default HeroSection