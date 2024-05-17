'use client'
import { getYoutubeId } from '@/lib/utils';
import React from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function VideoEmbed({
    videoUrl,
    title
}: any) {
    return (
        <div className='w-full'>
            {/* <iframe className='rounded-xl w-full' height="500" src={post.videoUrl || ''} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> */}
            <LiteYouTubeEmbed
                id={getYoutubeId(videoUrl || '') || ''}
                title={title}
            />
        </div>
    )
}
