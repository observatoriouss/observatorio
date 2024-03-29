'use client';
import { getYoutubeId } from '@/lib/utils';
import { categoryMapper } from '@/services/home';
import { Post } from '@/services/posts';
import Link from 'next/link';
import React from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

interface CardVideoProps extends Post {
    type?: 'small' | 'default';
    // description?: string;
    className?: string;
}
export default function CardVideo(
    { type = 'default', title, description, imageUrl, category, slug = '', videoUrl }: CardVideoProps
) {
    return (
        <div className={`w-full flex flex-col ${type === 'small' ? '' : 'lg:flex-row'} gap-4`}>
            <div className={`w-full ${type === 'small' ? '' : 'lg:w-1/2'} flex flex-col gap-2`}>
                <LiteYouTubeEmbed
                    id={getYoutubeId(videoUrl || '') || ''}
                    title={title}
                />
            </div>
            <div className={`w-full ${type === 'small' ? '' : 'lg:w-1/2'} flex flex-col gap-2`}>
                <span className='text-uss-black text-sm'>{categoryMapper[category]}</span>
                <Link href={slug}>
                    <h1 className='text-uss-black font-bold'>{title}</h1>
                </Link>
                <p className='text-uss-black text-sm font-thin'>
                    {description}
                </p>
            </div>
        </div>
    )
}
