import { CardArticle } from '@/components';
import HeroSection from '@/components/HeroSection';
import SplashScreen from '@/components/SplashScreen';
import { getEducatings } from '@/services/posts';
import { Suspense } from 'react'

async function getData() {
    const res = await getEducatings()
    return res
}
async function Educating() {
    const tubes = await getData()
    return (
        <div className="flex flex-col md:flex-row container mx-auto flex-nowrap md:flex-wrap w-full">
            {tubes && tubes.map((item, index) => (
                <div key={item.slug + index} className="w-full md:w-1/2 lg:w-1/4 p-1">
                    <CardArticle
                        title={item.title}
                        imageUrl={item.imageUrl}
                        user={item.user}
                        category={item.category}
                        description=''
                        slug={'educating/' + item.slug} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />
                </div>
            ))}
        </div>
    )
}
function EducatingPage() {

    return (
        <Suspense fallback={<SplashScreen />}>
            <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col'>
                <HeroSection heroImage='/img/hero/hero-edu-bits.png' title='Educando' description='Experiencias pedagógicas y buenas prácticas en la enseñanza. De profesores para profesores.' />
                <section className='w-full bg-transparent p-4 lg:py-12'>
                    <Educating />
                </section>
            </main>
        </Suspense>
    )
}

export default EducatingPage