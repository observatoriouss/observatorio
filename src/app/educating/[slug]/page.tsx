/* eslint-disable jsx-a11y/alt-text */
// 'use client'
import { getPostBySlug } from '@/services/posts'
import './styles.css';
import Link from 'next/link';
import { Suspense } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LikeSection from '@/components/LikeSection';
import { formatDate, transformSecondsToMinutes } from '@/lib/utils';

async function Educating(request: { params: { slug: string } }) {
    const post = await getPostBySlug(request.params.slug as string)
    return (
        <Suspense
            key={request.params.slug}
            fallback={<SplashScreen />}
        >
            <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col px-4'>
                {post && (
                    <div className='container max-w-5xl mx-auto flex flex-col gap-8 py-4 md:py-32 items-center'>
                        {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
                        <div className='flex flex-col gap-1'>
                            <Link href='/educating'>
                                <span className='text-uss-black font-thin'>Regresar a EDUCATING</span>
                            </Link>
                            <h1 className=' text-4xl md:text-6xl font-normal text-uss-black'>{post.title}</h1>
                        </div>
                        <div className='w-full'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className='rounded-xl' src={post.imageUrl || ''} width="100%" loading="lazy"></img>
                            <p className='text-uss-black font-thin text-sm py-2 text-right'>{post.imageDescription}</p>
                        </div>
                        <LikeSection id={post.id.toString()} slug={post.slug} />
                        {/* informacion de fecha y author */}
                        <div className='flex flex-row gap-4 justify-between w-full text-uss-black'>
                            <div className='flex flex-col gap-0 md:gap-2 w-fit md:w-1/3'>
                                <span className='text-uss-black text-xs md:text-base'>Publicado el {formatDate(post.createdAt)}</span>
                                <span className='text-uss-black text-xs md:text-base font-bold'>Por {post.user?.name}</span>
                            </div>
                            <div className='flex flex-col gap-0 md:gap-2 md:justify-center md:text-center w-fit md:w-1/3'>
                                <span className='text-uss-black text-xs md:text-base'>Duración</span>
                                <span className='text-uss-black text-xs md:text-base font-bold'>{transformSecondsToMinutes(post.readingTime)}</span>
                            </div>
                            <div className='flex flex-col gap-0 md:gap-2 md:justify-end md:text-right w-fit md:w-1/3'>
                                <span className='text-uss-black text-xs md:text-base'>Categoría</span>
                                <span className='text-uss-black text-xs md:text-base font-bold'>Educando</span>
                            </div>
                        </div>

                        {/* contenido incrustado html */}
                        <div className='max-w-3xl content w-full' dangerouslySetInnerHTML={{ __html: post.content! }}>
                        </div>

                        {/* tags */}
                        {post.tags && (
                            <div className='flex flex-col md:flex-row gap-4 justify-between w-full text-uss-black'>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-uss-black'>Etiquetas</span>
                                    <div className='flex flex-row gap-2 flex-wrap'>
                                        {post.tags?.map((item, index) => (
                                            <span key={index} className='text-uss-black font-bold text-sm bg-[--uss-green-10] p-2 rounded-md'>{item.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </Suspense>
    )
}

export default Educating