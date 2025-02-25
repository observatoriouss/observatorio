import { CardArticle, CardRead, CardVideo, Footer, Header, ParticlesBackground } from '@/components';
import SplashScreen from '@/components/SplashScreen';
import HomeLayout from '@/layouts/home.layout';
import { getHomeData } from '@/services';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const dynamicParams = false;
export const fetchCache = 'default-no-store'
async function getData() {
  const sections = await getHomeData()
  return sections
}

async function HomeGrid() {
  const sections = await getData();

  const editorial = sections['editorial'];
  const top = sections['section-1'];
  const secondary = sections['section-2'];
  const tubes = sections['section-3'];
  const reads = sections['section-4'];

  if (!sections) {
    return <div>
      <h1>No hay contenido para mostrar</h1>
    </div>;
  }

  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto,1fr] w-full">
      <Header />
      {/* Section Principal */}
      <section className='w-full bg-transparent py-6 lg:py-12 px-4'>
        <div className='flex flex-col md:flex-row gap-2 w-full container'>
          {/* LEFT COLUMN */}
          <div className='w-full md:w-1/4 flex flex-col gap-4'>
            {/* <CardArticle
                  type='editorial'
                  title='Estamos en constante evolución: ¡cuéntanos lo que piensas!'
                  description='En el Observatorio estamos preparando algunas novedades para el 2024.'
                  user={{ name: 'Karina Fuerte', image: 'https://observatorio.tec.mx/wp-content/uploads/2023/09/Karina-Fuerte-2-150x150.jpg', email: '', id: 0, role: '', isActive: true }}
                  category={Category.EDITORIAL} id={'0'} slug={''} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} /> */}
            {<CardArticle
              type='editorial'
              title={editorial[0].post.title}
              imageUrl={null}
              user={editorial[0].post.user}
              reference={editorial[0].post.reference}
              category={editorial[0].post.category}
              description={editorial[0].post.description}
              slug={`news/${editorial[0].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />}
            {/* --------------------------------------------- */}
            <CardArticle
              title={top[0].post.title}
              imageUrl={top[0].post.imageUrl}
              user={top[0].post.user}
              reference={top[0].post.reference}
              category={top[0].post.category}
              description=''
              slug={`news/${top[0].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />
          </div>

          {/* CENTER COLUMN */}
          <div className='w-full md:w-2/4'>
            <CardArticle
              type='middle'
              title={top[1].post.title}
              imageUrl={top[1].post.imageUrl}
              user={top[1].post.user}
              reference={top[1].post.reference}
              category={top[1].post.category}
              slug={`news/${top[1].post.slug}`} id={'0'} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />
          </div>

          {/* RIGHT COLUMN */}
          <div className='w-full md:w-1/4 flex flex-col gap-4'>
            <CardArticle
              title={top[2].post.title}
              imageUrl={top[2].post.imageUrl}
              user={top[2].post.user}
              reference={top[2].post.reference}
              category={top[2].post.category}
              description=''
              slug={`news/${top[2].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />
            {/* --------------------------------------------- */}
            <CardArticle
              title={top[3].post.title}
              imageUrl={top[3].post.imageUrl}
              user={top[3].post.user}
              reference={top[3].post.reference}
              category={top[3].post.category}
              description=''
              slug={`news/${top[3].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />

          </div>
        </div>
      </section>

      {/* Section Secondary */}
      <section className='w-full bg-transparent py-6 lg:py-12 px-4'>
        <div className="flex flex-col lg:flex-row w-full container">
          <div className='w-full lg:w-1/2 p-1'>
            <CardArticle
              title={secondary[0].post.title}
              imageUrl={secondary[0].post.imageUrl}
              user={secondary[0].post.user}
              reference={secondary[0].post.reference}
              category={secondary[0].post.category}
              spaces={1} id={'0'} slug={`news/${secondary[0].post.slug}`} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />
          </div>
          <div className='w-full lg:w-1/4 p-1'>
            <CardArticle
              title={secondary[1].post.title}
              imageUrl={secondary[1].post.imageUrl}
              user={secondary[1].post.user}
              reference={secondary[1].post.reference}
              category={secondary[1].post.category}
              spaces={1} id={'0'} slug={`news/${secondary[1].post.slug}`} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
            />
          </div>
          <div className='w-full lg:w-1/4 p-1'>
            <CardArticle
              title={secondary[2].post.title}
              imageUrl={secondary[2].post.imageUrl}
              user={secondary[2].post.user}
              reference={secondary[2].post.reference}
              category={secondary[2].post.category}
              spaces={1} id={'0'} slug={`news/${secondary[2].post.slug}`} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
            />
          </div>
        </div>
      </section>

      {/* Section Extras */}
      <section className='w-full bg-transparent py-6 lg:py-12 px-4'>
        <div className="flex flex-col md:flex-row flex-wrap container">
          <div className="w-full md:w-1/2 lg:w-1/4 p-1">
            <CardArticle
              title={secondary[3].post.title}
              imageUrl={secondary[3].post.imageUrl}
              user={secondary[3].post.user}
              reference={secondary[3].post.reference}
              category={secondary[3].post.category}
              description=''
              slug={`news/${secondary[3].post.slug}`}
              id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-1">
            <CardArticle
              title={secondary[4].post.title}
              imageUrl={secondary[4].post.imageUrl}
              user={secondary[4].post.user}
              reference={secondary[4].post.reference}
              category={secondary[4].post.category}
              description=''
              slug={`news/${secondary[4].post.slug}`}
              id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-1">
            <CardArticle
              title={secondary[5].post.title}
              imageUrl={secondary[5].post.imageUrl}
              user={secondary[5].post.user}
              reference={secondary[5].post.reference}
              category={secondary[5].post.category}
              description=''
              slug={`news/${secondary[5].post.slug}`}
              id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-1">
            <CardArticle
              title={secondary[6].post.title}
              imageUrl={secondary[6].post.imageUrl}
              user={secondary[6].post.user}
              reference={secondary[6].post.reference}
              category={secondary[6].post.category}
              description=''
              slug={`news/${secondary[6].post.slug}`}
              id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
            />
          </div>
        </div>
      </section>

      {/* Tubes */}
      <section className='w-full bg-[--uss-green] py-6 lg:py-12 flex justify-center px-4'>
        <div className="flex flex-col container">
          <div className="w-full flex flex-col">
            <h1 className='text-5xl md:text-9xl my-5 text-white font-bold'>AudioVisual</h1>
            <p className='text-xl md:text-3xl text-uss-black w-full md:w-2/3 lg:w-1/3'>Lo último en innovación educativa en video, webinars, entrevistas, conferencias y más.</p>

            <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
              <div className='w-full md:w-1/2 p-1'>
                <CardVideo
                  title={tubes[0].post.title}
                  description='loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
                  imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                  user={tubes[0].post.user}
                  category={tubes[0].post.category}
                  slug={`tube/${tubes[0].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={tubes[0].post.videoUrl} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
                />
              </div>
              <div className='w-full md:w-1/2 p-1'>
                <CardVideo
                  title={tubes[1].post.title}
                  description='loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
                  imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                  user={tubes[1].post.user}
                  category={tubes[1].post.category}
                  slug={`tube/${tubes[1].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={tubes[1].post.videoUrl} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <div className="flex flex-col md:flex-row flex-wrap">
              <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                <CardVideo
                  title={tubes[2].post.title}
                  imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                  user={tubes[2].post.user}
                  category={tubes[2].post.category}
                  slug={`tube/${tubes[2].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={tubes[2].post.videoUrl} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
                  type='small' description={null} />
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                <CardVideo
                  title={tubes[3].post.title}
                  imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                  user={tubes[3].post.user}
                  category={tubes[3].post.category}
                  slug={`tube/${tubes[3].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={tubes[3].post.videoUrl} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
                  type='small' description={null} />
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                <CardVideo
                  title={tubes[4].post.title}
                  imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                  user={tubes[4].post.user}
                  category={tubes[4].post.category}
                  slug={`tube/${tubes[4].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={tubes[4].post.videoUrl} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
                  type='small' description={null} />
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                <CardVideo
                  title={tubes[5].post.title}
                  imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                  user={tubes[5].post.user}
                  category={tubes[5].post.category}
                  slug={`tube/${tubes[5].post.slug}`} id={'0'} subCategory={null} readingTime={0} videoUrl={tubes[5].post.videoUrl} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''}
                  type='small' description={null} />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Reads */}
      <section className='w-full bg-white py-6 lg:py-12 flex justify-center'>
        <div className="flex flex-col container">
          <div className='flex flex-col lg:flex-row justify-between relative gap-8'>
            <div className='order-1 lg:order-2'>
              <h1 className='text-5xl lg:text-9xl my-5 text-uss-green font-bold'>Lecturas</h1>
              <p className='text-xl lg:text-3xl text-uss-black w-full'>Colección de publicaciones con tendencias emergentes de pedagogía y tecnología educativa</p>
            </div>
            <div className='order-2 lg:order-1 w-full flex flex-col md:flex-row'>
              <div className='w-full md:w-1/2 p-1'>
                <CardRead
                  title={reads[0].post.title}
                  category={reads[0].post.category}
                  imageUrl={reads[0].post.imageUrl}
                  user={reads[0].post.user}
                  slug={`reads/${reads[0].post.slug}`} id={'0'} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />
              </div>
              <div className='w-full md:w-1/2 p-1'>
                <CardRead
                  title={reads[1].post.title}
                  category={reads[1].post.category}
                  imageUrl={reads[1].post.imageUrl}
                  user={reads[1].post.user}
                  slug={`reads/${reads[1].post.slug}`} id={'0'} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <HomeLayout>
        <SplashScreen />
      </HomeLayout>
    }>
      <main className={"flex min-h-screen flex-col items-center justify-between mx-0 w-full px-0"}>
        <ParticlesBackground />
        <HomeGrid />
      </main>
    </Suspense>
  )
}
