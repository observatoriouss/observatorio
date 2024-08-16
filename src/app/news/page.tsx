import { CardArticle } from '@/components'
import HeroSection from '@/components/HeroSection';
import SplashScreen from '@/components/SplashScreen';
import { getNews } from '@/services/posts'
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
async function getData() {
    const res = await getNews()
    return res
}
async function Posts() {
    const posts = await getData()
    return (
        <div className="flex flex-col md:flex-row container mx-auto flex-nowrap md:flex-wrap w-full">
            {posts && posts.map((item, index) => (
                <div key={item.slug + index} className="w-full md:w-1/2 lg:w-1/4 p-1">
                    <CardArticle
                        title={item.title}
                        imageUrl={item.imageUrl}
                        user={item.user}
                        reference={item.reference}
                        category={item.category}
                        description=''
                        numberOfComments={0}
                        slug={'news/' + item.slug} id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
                    />
                </div>
            ))}
        </div>
    )
}
async function News() {
    return (
        <Suspense fallback={<SplashScreen />}>
            <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col'>
                <HeroSection heroImage='/img/hero/hero-edu-news.png' title='Noticias' description='Las notas y artículos más relevantes en el mundo de la educación' />
                <div>

                </div>
                <section className='w-full bg-transparent p-4 lg:py-12'>
                    <Posts />
                </section>
            </main>
        </Suspense>
    )
}

export default News