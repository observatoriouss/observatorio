'use client';
import { Post } from '@/services/home';
import React, { useRef } from 'react'
import Link from 'next/link';

interface CardArticleProps extends Post {
    type?: 'middle' | 'default' | 'editorial';
    spaces?: number;
    className?: string;
    description?: string;
}
export default function CardArticle({
    type = 'default',
    spaces = 1,
    title,
    description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis mollitia illum accusantium corporis non nulla',
    image,
    slug = '',
    authorImage,
    author,
    className,
    category
}: CardArticleProps) {

    return (
        <div className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-md shadow-lg p-4 h-full ${type === 'middle' ? 'mb-16 md:mb-0' : ''} ${spaces === 1 ? '' : 'flex flex-col md:flex-row gap-4'} ${className}`}
        >
            {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className={`w-full ${type === 'middle' ? 'h-2/4 object-cover' : ''}`} />
            )}
            <div>
                <Link href={slug}>
                    <h1 className={`${type !== 'default' ? 'text-3xl lg:text-5xl font-base' : 'text-xl lg:text-2xl font-thin break-words'} my-3 `}>{title}</h1>
                </Link>
                <p className={`${type === 'middle' ? 'text-base' : 'text-xs'}text-base text-[--uss_gray_50] my-5`}>{description}</p>
                <div className='flex flex-row gap-2 items-center'>
                    {authorImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={authorImage} alt="" className='w-12 h-12 rounded-full' />
                    )}
                    <div className='flex flex-col gap-0'>
                        <h3 className='text-sm p-0 m-0'>{category}</h3>
                        <h3 className='text-sm p-0 m-0'>{author}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
