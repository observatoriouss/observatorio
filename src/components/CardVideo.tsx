import { Post } from '@/services/home';
import Link from 'next/link';
import React from 'react'

interface CardVideoProps extends Post {
    type?: 'small' | 'default';
    description?: string;
    className?: string;
}
export default function CardVideo(
    { type = 'default', title, description, image, category, slug = '' }: CardVideoProps
) {
    return (
        <div className={`w-full flex flex-col ${type==='small' ? '' : 'lg:flex-row'} gap-4`}>
            <div className={`w-full relative flex justify-center items-center`}>
                <div className="absolute bg-[--uss-green-10] w-16 h-16 backdrop:blur-sm rounded-full top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] z-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/play-icon.png" alt="play" className='w-8 absolute left-[54%] top-1/2 transform translate-x-[-50%] translate-y-[-50%]' />
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className='w-full' />

            </div>
            <div className={`w-full ${type==='small' ? '' : 'lg:w-1/2'} flex flex-col gap-2`}>
                <span className='text-[--uss-black] text-sm'>{category}</span>
                <Link href={slug}>
                    <h1 className='text-[--uss-black] font-bold'>{title}</h1>
                </Link>
                <p className='text-[--uss-black] text-sm font-thin'>
                    {description}
                </p>
            </div>
        </div>
    )
}
