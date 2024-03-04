import styles from '@/styles/home.module.css';
import { CardArticle, CardRead, CardVideo, ParticlesBackground } from '@/components';
import { getHomeData } from '@/services';
import { Category } from '@/services/home';
import SplashScreen from '@/components/SplashScreen';
import { Suspense } from 'react';

export default async function Home() {
  const { top, secondary, extras, tubes, reads } = await getHomeData();

  if (!top || !secondary || !extras || !tubes || !reads) {
    return <div>
      <h1>No hay contenido para mostrar</h1>
    </div>;
  }
  return (
    <Suspense fallback={<SplashScreen />}>
      <main className={"flex min-h-screen flex-col items-center justify-between"}>
        <ParticlesBackground />
        {/* Section Principal */}
        <section className={styles.container}>
          <div className='max-w-xs md:max-w-2xl lg:max-w-7xl w-full flex bg-transparent'>

            <div className='flex flex-col md:flex-row gap-2 w-full'>
              {/* LEFT COLUMN */}
              <div className='w-full md:w-1/4 flex flex-col gap-4'>
                <CardArticle
                  type='editorial'
                  title='Estamos en constante evolución: ¡cuéntanos lo que piensas!'
                  description='En el Observatorio estamos preparando algunas novedades para el 2024.'
                  user={{ name: 'Karina Fuerte', image: 'https://observatorio.tec.mx/wp-content/uploads/2023/09/Karina-Fuerte-2-150x150.jpg', email: '', id: 0, role: '', isActive: true }}
                  category={Category.Editorial} id={0} slug={''} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />
                {/* --------------------------------------------- */}
                <CardArticle
                  title={top[0].title}
                  imageUrl={top[0].imageUrl}
                  user={top[0].user}
                  category={top[0].category}
                  description=''
                  slug={`news/${top[0].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />
              </div>

              {/* CENTER COLUMN */}
              <div className='w-full md:w-2/4'>
                <CardArticle
                  type='middle'
                  title={top[1].title}
                  imageUrl={top[1].imageUrl}
                  user={top[1].user}
                  category={top[1].category}
                  slug={`news/${top[1].slug}`} id={0} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />
              </div>

              {/* RIGHT COLUMN */}
              <div className='w-full md:w-1/4 flex flex-col gap-4'>
                <CardArticle
                  title={top[2].title}
                  imageUrl={top[2].imageUrl}
                  user={top[2].user}
                  category={top[2].category}
                  description=''
                  slug={`news/${top[2].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />
                {/* --------------------------------------------- */}
                <CardArticle
                  title={top[3].title}
                  imageUrl={top[3].imageUrl}
                  user={top[3].user}
                  category={top[3].category}
                  description=''
                  slug={`news/${top[3].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />

              </div>
            </div>


          </div>
        </section>

        {/* Section Secondary */}
        <section className='max-w-xs md:max-w-2xl lg:max-w-7xl w-full flex bg-transparent py-6 lg:py-12'>
          <div className="flex flex-col lg:flex-row">
            <div className='w-full lg:w-1/2 p-1'>
              <CardArticle
                title={secondary[0].title}
                imageUrl={secondary[0].imageUrl}
                user={secondary[0].user}
                category={secondary[0].category}
                spaces={1} id={0} slug={''} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />
            </div>
            <div className='w-full lg:w-1/4 p-1'>
              <CardArticle
                title={secondary[1].title}
                imageUrl={secondary[1].imageUrl}
                user={secondary[1].user}
                category={secondary[1].category}
                spaces={1} id={0} slug={''} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
              />
            </div>
            <div className='w-full lg:w-1/4 p-1'>
              <CardArticle
                title={secondary[2].title}
                imageUrl={secondary[2].imageUrl}
                user={secondary[2].user}
                category={secondary[2].category}
                spaces={1} id={0} slug={''} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
              />
            </div>
          </div>
        </section>

        {/* Section Extras */}
        <section className='max-w-xs md:max-w-2xl lg:max-w-7xl w-full bg-transparent py-6 lg:py-12'>
          <div className="flex flex-col md:flex-row flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/4 p-1">
              <CardArticle
                title={extras[0].title}
                imageUrl={extras[0].imageUrl}
                user={extras[0].user}
                category={extras[0].category}
                description=''
                slug={`news/${extras[0].slug}`}
                id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-1">
              <CardArticle
                title={extras[1].title}
                imageUrl={extras[1].imageUrl}
                user={extras[1].user}
                category={extras[1].category}
                description=''
                slug={`news/${extras[1].slug}`}
                id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-1">
              <CardArticle
                title={extras[2].title}
                imageUrl={extras[2].imageUrl}
                user={extras[2].user}
                category={extras[2].category}
                description=''
                slug={`news/${extras[2].slug}`}
                id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-1">
              <CardArticle
                title={extras[3].title}
                imageUrl={extras[3].imageUrl}
                user={extras[3].user}
                category={extras[3].category}
                description=''
                slug={`news/${extras[3].slug}`}
                id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
              />
            </div>
          </div>
        </section>

        {/* Tubes */}
        <section className='w-full bg-[--uss-green] py-6 lg:py-12 flex justify-center'>
          <div className="flex flex-col">
            <div className="max-w-xs md:max-w-2xl lg:max-w-7xl w-full flex flex-col">
              <h1 className='text-5xl md:text-9xl my-5 text-white font-bold'>Tube</h1>
              <p className='text-xl md:text-3xl text-uss-black w-full md:w-2/3 lg:w-1/3'>Lo último en innovación educativa en video, webinars, entrevistas, conferencias y más.</p>

              <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
                <div className='w-full md:w-1/2 p-1'>
                  <CardVideo
                    title={tubes[0].title}
                    description='loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
                    imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                    user={tubes[0].user}
                    category={tubes[0].category}
                    slug={`tube/${tubes[0].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
                  />
                </div>
                <div className='w-full md:w-1/2 p-1'>
                  <CardVideo
                    title={tubes[1].title}
                    description='loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
                    imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                    user={tubes[1].user}
                    category={tubes[1].category}
                    slug={`tube/${tubes[1].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
                  />
                </div>
              </div>
            </div>

            <div className="max-w-xs md:max-w-2xl lg:max-w-7xl w-full flex flex-col">
              <div className="flex flex-col md:flex-row flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                  <CardVideo
                    title={tubes[2].title}
                    imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                    user={tubes[2].user}
                    category={tubes[2].category}
                    slug={`tube/${tubes[2].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
                    type='small' description={null} />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                  <CardVideo
                    title={tubes[3].title}
                    imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                    user={tubes[3].user}
                    category={tubes[3].category}
                    slug={`tube/${tubes[3].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
                    type='small' description={null} />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                  <CardVideo
                    title={tubes[4].title}
                    imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                    user={tubes[4].user}
                    category={tubes[4].category}
                    slug={`tube/${tubes[4].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
                    type='small' description={null} />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                  <CardVideo
                    title={tubes[5].title}
                    imageUrl={'https://res.cloudinary.com/dndpjrsa5/image/upload/v1707415170/gwyaoqzuwkam0iznnlm7.svg'}
                    user={tubes[5].user}
                    category={tubes[5].category}
                    slug={`tube/${tubes[5].slug}`} id={0} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''}
                    type='small' description={null} />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Reads */}
        <section className='w-full bg-white py-6 lg:py-12 flex justify-center'>
          <div className="max-w-xs md:max-w-2xl lg:max-w-7xl w-full flex flex-col">
            <div className='flex flex-col lg:flex-row justify-between relative gap-8'>
              <div className='order-1 lg:order-2'>
                <h1 className='text-5xl lg:text-9xl my-5 text-uss-green font-bold'>Reads</h1>
                <p className='text-xl lg:text-3xl text-uss-black w-full'>Colección de publicaciones con tendencias emergentes de pedagogía y tecnología educativa</p>
              </div>
              <div className='order-2 lg:order-1 w-full flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 p-1'>
                  <CardRead
                    title={reads[0].title}
                    category={reads[0].category}
                    imageUrl={reads[0].imageUrl}
                    user={reads[0].user}
                    slug={`reads/${reads[0].slug}`} id={0} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />
                </div>
                <div className='w-full md:w-1/2 p-1'>
                  <CardRead
                    title={reads[1].title}
                    category={reads[1].category}
                    imageUrl={reads[1].imageUrl}
                    user={reads[1].user}
                    slug={`reads/${reads[1].slug}`} id={0} subCategory={null} readingTime={0} description={null} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={0} attachments={[]} createdAt={''} updatedAt={''} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  )
}
