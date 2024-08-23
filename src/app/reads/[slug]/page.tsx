/* eslint-disable jsx-a11y/alt-text */
import { getPostBySlug, getReactCachedPost } from '@/services/posts'
import './styles.css';
import Link from 'next/link';
import { Suspense } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LikeSection from '@/components/LikeSection';
import { formatDate, transformSecondsToMinutes } from '@/lib/utils';
import { Category, categoryMapper } from '@/services/home';
import { Metadata, ResolvingMetadata } from 'next';
import AsideComments from '@/components/Post/AsideComments';
import PostSelected from '@/components/Post/PostSelected';

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
            <PostSelected post={post} />
            <div className='flex flex-col gap-1'>
                <Link href='/reads'>
                    <span className='text-uss-black font-thin'>Regresar a <b className='font-bold'>{categoryMapper[Category.READS]}</b> </span>
                </Link>
                <h1 className=' text-4xl md:text-6xl font-normal text-uss-black'>{post.title}</h1>
            </div>
            <div className='w-full flex justify-center'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className='rounded-xl w-1/2' src={post.imageUrl || ''} loading="lazy" alt='' />
            </div>
            <div className='flex flex-row gap-2'>
                <LikeSection id={post.id} likes={post.likes} />
                <AsideComments />
            </div>
            {/* informacion de fecha y author */}
            <div className='flex flex-row gap-4 justify-between items-start w-full text-uss-black'>
                <div className='flex flex-col gap-0 md:gap-2 w-fit md:w-1/3'>
                    <span className='text-uss-black text-xs md:text-base'>Publicado el {formatDate(post.createdAt)}</span>
                    <Link href={`/author/${post.user?.slug}`} className='flex gap-3 items-center'>
                        <span className='text-uss-black text-xs md:text-base font-bold'>Por {post.user?.name ?? post.reference?.author}</span>
                        <img
                            className="w-6 h-6 rounded-lg object-cover"
                            src={
                                post.user?.country?.icon ||
                                "https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/pe.png"
                            }
                            alt={post.user?.country?.name}
                        />
                    </Link>
                    {post.reference && (<a className='text-xs text-blue-500' target='_blank' href={post.reference.url}>Enlace de Referencia</a>)}
                </div>
                <div className='flex flex-col gap-0 md:gap-2 md:justify-center md:text-center w-fit md:w-1/3'>
                    <span className='text-uss-black text-xs md:text-base'>Duración</span>
                    <span className='text-uss-black text-xs md:text-base font-bold'>{transformSecondsToMinutes(post.readingTime)}</span>
                </div>
                <div className='flex flex-col gap-0 md:gap-2 md:justify-end md:text-right w-fit md:w-1/3'>
                    <span className='text-uss-black text-xs md:text-base'>Categoría</span>
                    <span className='text-uss-black text-xs md:text-base font-bold'>Lecturas</span>
                </div>
            </div>

            {/* contenido incrustado html */}
            <div className='max-w-3xl content w-full' dangerouslySetInnerHTML={{ __html: post.content! }}>
            </div>

            {/* botón para descargar el recurso */}
            {post.attachments?.map((a, idx) => (
                <div key={idx} className='flex flex-col md:flex-row gap-4 justify-center w-full text-uss-black'>
                    <div className='flex flex-col gap-2'>
                        <a href={a} target='_blank' rel='noreferrer' className='text-uss-black font-bold text-xl bg-[--uss-green-10] p-4 px-12 rounded-md'>Descargar</a>
                    </div>
                </div>
            ))}

            {/* tags */}
            {post.tags && post.tags.length > 0 && (
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
            )}
        </div>
    )
}
async function Read(request: { params: { slug: string } }) {

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

export default Read