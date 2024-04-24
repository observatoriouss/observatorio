import { CardArticle } from '@/components';
import HeroSection from '@/components/HeroSection';
import SplashScreen from '@/components/SplashScreen';
import { getReads } from '@/services/posts';
import { Suspense } from 'react';
export const dynamic = 'force-dynamic';
async function getData() {
    const res = await getReads()
    return res
}
async function Reads() {
    const reads = await getData()
    return (
        <div className="flex flex-col md:flex-row container mx-auto flex-nowrap md:flex-wrap w-full">
            {reads && reads.map((item, index) => (
                <div key={item.slug + index} className="w-full md:w-1/2 lg:w-1/4 p-1">
                    <CardArticle
                        title={item.title}
                        imageUrl={item.imageUrl}
                        user={item.user}
                        reference={item.reference}
                        category={item.category}
                        description=''
                        slug={'reads/' + item.slug} id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />
                </div>
            ))}
        </div>
    )
}
function ReadsPage() {
    return (
        <Suspense fallback={<SplashScreen />}>
            <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col'>
                <HeroSection heroImage='/img/hero/hero-edu-reads.png' title='Lecturas' description='Reportes, eBooks y lecturas sobre innovación educativa y estrategias docentes.' />

                <section className='w-full bg-transparent p-4 lg:py-12'>
                    <div className="flex flex-col md:flex-row container mx-auto flex-nowrap md:flex-wrap w-full">
                        <Reads />
                    </div>
                </section>
            </main>
        </Suspense>
    )
}

export default ReadsPage