'use client'
import { Post, getPostBySlug } from '@/services/posts'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import './styles.css';
import Link from 'next/link';

function Tube() {
    const [post, setPost] = useState<Post | null>(null)
    // obtener el slug de la url
    const { slug } = useParams()
    useEffect(() => {
        async function load() {
            const res = await getPostBySlug(slug as string)
            setPost(res)
        }
        try {
            load()
        } catch (error) {
            console.log(error)
        }
    }, [slug])

    return (
        <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col'>
            {post && (
                <div className='container max-w-5xl mx-auto flex flex-col gap-8 py-32 items-center'>
                    {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
                    <div className='flex flex-col gap-1'>
                        <Link href='/tube'>
                        <span className='text-[--uss-black] font-thin'>Regresar a TUBES</span>
                        </Link>
                        <h1 className=' text-4xl md:text-6xl font-normal text-[--uss-black]'>{post.title}</h1>
                    </div>
                    <div className='w-full'>
                        <iframe className='rounded-xl w-full' height="500" src={post.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    {/* informacion de fecha y author */}
                    <div className='flex flex-col md:flex-row gap-4 justify-between w-full text-[--uss-black]'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[--uss-black]'>Publicado el {post.date}</span>
                            <span className='text-[--uss-black] font-bold'>Por {post.author}</span>
                        </div>
                        <div className='flex flex-col gap-2 justify-center text-center'>
                            <span className='text-[--uss-black]'>Duración</span>
                            <span className='text-[--uss-black] font-bold'>{post.readingTime}</span>
                        </div>
                        <div className='flex flex-col gap-2 justify-end text-right'>
                            <span className='text-[--uss-black]'>Categoría</span>
                            <span className='text-[--uss-black] font-bold'>TUBES</span>
                        </div>
                    </div>

                    {/* contenido incrustado html */}
                    <div className='max-w-3xl content w-full' dangerouslySetInnerHTML={{ __html: post.content }}>
                    </div>

                    {/* tags */}
                    <div className='flex flex-col md:flex-row gap-4 justify-between w-full text-[--uss-black]'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[--uss-black]'>Etiquetas</span>
                            <div className='flex flex-row gap-2'>
                            {post.tags.map((item, index) => (
                                <span key={index} className='text-[--uss-black] font-bold text-sm bg-[--uss-green-10] p-2 rounded-md'>{item}</span>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Tube