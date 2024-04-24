/* eslint-disable jsx-a11y/alt-text */
import { getReactCachedPost } from '@/services/posts'
import './styles.css';
import Link from 'next/link';
import { Suspense } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LikeSection from '@/components/LikeSection';
import { formatDate, transformSecondsToMinutes } from '@/lib/utils';
import { Category, categoryMapper } from '@/services/home';
import { Metadata, ResolvingMetadata } from 'next';

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
            {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
            <div className='flex flex-col gap-1'>
                <Link href='/podcast'>
                    <span className='text-uss-black font-thin'>Regresar a <b className='font-bold'>{categoryMapper[Category.PODCAST]}</b> </span>
                </Link>
                <h1 className=' text-4xl md:text-6xl font-normal text-uss-black'>{post.title}</h1>
            </div>
            <div className='w-full'>
                <iframe className='rounded-xl' src={post.podcastUrl || ''} width="100%" height="152" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <LikeSection id={post.id} likes={post.likes} />
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
                    <span className='text-uss-black text-xs md:text-base font-bold'>Podcast</span>
                </div>
            </div>

            {/* contenido incrustado html */}
            <div className='max-w-3xl content w-full' dangerouslySetInnerHTML={{ __html: post.content! }}>
            </div>

            {/* tags */}
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