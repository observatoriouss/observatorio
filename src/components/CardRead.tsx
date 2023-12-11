import { Post } from '@/services/home';
import Link from 'next/link';
import React from 'react'

interface CardReadProps extends Post {
    type?: 'small' | 'default';
    description?: string;
    className?: string;
}
export default function CardRead(
    { type = 'default', title, description, image, category, slug = '' }: CardReadProps
) {
    return (
        <div className={`w-full flex flex-col gap-4`}>
            <div className={`w-full relative flex`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className='w-full rounded-xl' />
            </div>
            <div className={`w-full flex flex-col gap-2`}>
                <Link href={slug}>
                    <h1 className='text-[--uss-black] font-base text-2xl'>{title}</h1>
                </Link>
                <span className='text-[--uss-black] text-sm'>{category}</span>
                <p className='text-[--uss-black] text-sm font-thin'>
                    {description}
                </p>
            </div>
        </div>
    )
}
