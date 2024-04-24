import { CardArticle } from '@/components';
import HeroSection from '@/components/HeroSection';
import SplashScreen from '@/components/SplashScreen';
import { getPodcasts } from '@/services/posts';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
async function getData() {
  const res = await getPodcasts()
  return res
}
async function Podcasts() {
  const podcast = await getData()
  return (
    <div className="flex flex-col md:flex-row container mx-auto flex-nowrap md:flex-wrap w-full">
      {podcast && podcast.map((item, index) => (
        <div key={item.slug + index} className="w-full md:w-1/2 lg:w-1/4 p-1">
          <CardArticle
            title={item.title}
            imageUrl={item.imageUrl}
            user={item.user}
            reference={item.reference}
            category={item.category}
            slug={'podcast/' + item.slug}
            description='' id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
          />
        </div>
      ))}
    </div>
  )
}
function PodcastsPage() {

  return (
    <Suspense fallback={<SplashScreen />}>
      <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col'>
        <HeroSection title='Podcast' description='Escuche este viaje de descubrimiento y creación del futuro de la educación superior.' />

        <section className='w-full bg-transparent p-4 lg:py-12'>
          <Podcasts />
        </section>
      </main>
    </Suspense>
  )
}

export default PodcastsPage