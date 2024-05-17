/* eslint-disable jsx-a11y/alt-text */
import { getReactCachedPost } from '@/services/posts';
import './styles.css';
import Link from 'next/link';
import { Suspense } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LikeSection from '@/components/LikeSection';
import { formatDate, transformSecondsToMinutes } from '@/lib/utils';
import { Category, categoryMapper } from '@/services/home';
import { Metadata, ResolvingMetadata } from 'next';
import VideoEmbed from './video-embed';

export const dynamic = 'force-dynamic';

type Props = {
    params: { slug: string }
    // searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data
    const post = await getReactCachedPost(slug)

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const previusKeywords = (await parent).keywords || []

    return {
        title: post.title,
        description: post.description,
        keywords: [...post.tags ?? [], ...previusKeywords],
        openGraph: {
            images: [post.imageUrl ?? '', ...previousImages],
        },
    }
}
async function Post({ slug }: { slug: string }) {
    const post = await getReactCachedPost(slug)
    return (
        <div className='container max-w-5xl mx-auto flex flex-col gap-8 py-4 md:py-32 items-center'>
            <div className='flex flex-col gap-1'>
                <Link href='/tube'>
                <span className='text-uss-black font-thin'>Regresar a <b className='font-bold'>{categoryMapper[Category.TUBES]}</b> </span>
                </Link>
                <h1 className=' text-4xl md:text-6xl font-normal text-uss-black'>{post.title}</h1>
            </div>
            <VideoEmbed videoUrl={post.videoUrl} title={post.title} />
            <LikeSection id={post.id} likes={post.likes} />
            {/* informacion de fecha y author */}
            <div className='flex flex-row gap-4 justify-between items-start w-full text-uss-black'>
                <div className='flex flex-col gap-0 md:gap-2 w-fit md:w-1/3'>
                    <span className='text-uss-black text-xs md:text-base'>Publicado el {formatDate(post.createdAt)}</span>
                    <span className='text-uss-black text-xs md:text-base font-bold'>Por {post.user?.name ?? post.reference?.author}</span>
                    {post.reference && (<a className='text-xs text-blue-500' target='_blank' href={post.reference.url}>Enlace de Referencia</a>)}
                </div>
                <div className='flex flex-col gap-0 md:gap-2 md:justify-center md:text-center w-fit md:w-1/3'>
                    <span className='text-uss-black text-xs md:text-base'>Duración</span>
                    <span className='text-uss-black text-xs md:text-base font-bold'>{transformSecondsToMinutes(post.readingTime)}</span>
                </div>
                <div className='flex flex-col gap-0 md:gap-2 md:justify-end md:text-right w-fit md:w-1/3'>
                    <span className='text-uss-black text-xs md:text-base'>Categoría</span>
                    <span className='text-uss-black text-xs md:text-base font-bold'>AudioVisual</span>
                </div>
            </div>
            <div className='max-w-3xl content w-full' dangerouslySetInnerHTML={{ __html: post.content || '' }}>
            </div>
            <div className='flex flex-col md:flex-row gap-4 justify-between w-full text-uss-black'>
                <div className='flex flex-col gap-2'>
                    <span className='text-uss-black'>Etiquetas</span>
                    <div className='flex flex-row gap-2 flex-wrap'>
                        {post.tags?.map((item, index) => (
                            <span key={index} className='text-uss-black font-bold text-sm bg-[--uss-green-10] p-2 rounded-md'>{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
async function Tube(request: { params: { slug: string } }) {
    // const post = await getPostBySlug(request.params.slug as string)

    return (
        <Suspense
            key={request.params.slug}
            fallback={<SplashScreen />}
        >
            <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col px-4'>
                <Post slug={request.params.slug} />
            </main>
        </Suspense>
    )
}

export default Tube