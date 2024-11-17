/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import SplashScreen from '@/components/SplashScreen';
import { getEditorials } from '@/services/posts';
import Link from 'next/link';
import React, { Suspense } from 'react'

export const dynamic = 'force-dynamic';
export const dynamicParams = false;
export const fetchCache = 'default-no-store'
async function fetchData() {
    try {
        const editorials = await getEditorials()
        return { editorials }
    } catch (error) {
        console.error(error)
        return { editorials: [] }
    }
}
async function EditorialFetch() {
    const { editorials } = await fetchData()
    return (
        <div className='pt-3 md:pt-14 pb-12 flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl'>Mensaje Editorial</h1>
                <p className='text-lg'>Cada semana nuestra editora te comparte sus reflexiones sobre la actualidad educativa.</p>
            </div>

            <div className='w-full flex flex-col items-center'>
                <div className='flex flex-wrap justify-start w-full gap-4'>
                    {editorials.map((editorial, i) => (
                        <Link href={`/news/${editorial.slug}`} key={i}>
                            <div
                                className='w-full md:w-[312px] lg:w-[312px] xl:w-[300px] flex flex-col gap-4 cursor-pointer'
                                key={i + 1}
                            >
                                <img src={editorial.imageUrl ||
                                    'https://res.cloudinary.com/uss/image/upload/v1634563284/uss-education/hero/hero-edu-news.png'
                                } className='w-full object-cover aspect-video ' alt="" />
                                <div>
                                    <h3 className='font-light text-2xl'>{editorial.title}</h3>
                                    <p className='text-sm'>Por <span className='font-semibold'>{editorial.user.name}</span></p>
                                    <p className='text-xs'>MENSAJE <span className='font-semibold'>EDITORIAL</span></p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}

function EditorialMessagePage() {
    return (
        <Suspense fallback={<SplashScreen />}>
            <EditorialFetch />
        </Suspense>
    )
}
export default EditorialMessagePage