import Image from 'next/image'
import styles from '@/styles/home.module.css';
import { CardArticle, CardRead, CardVideo } from '@/components';
import { getHomeData } from '@/services';
import { Category } from '@/services/home';

export default async function Home() {
  const { top, secondary, extras, tubes, reads } = await getHomeData();
  return (
    <main className={"flex min-h-screen flex-col items-center justify-between"}>

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
                author='Observatorio USS'
                authorImage='https://observatorio.tec.mx/wp-content/uploads/2023/09/Karina-Fuerte-2-150x150.jpg'
                category={Category.Editorial}
              />
              {/* --------------------------------------------- */}
              <CardArticle
                title={top[0].title}
                image={top[0].image}
                author={top[0].author}
                authorImage={top[0].authorImage}
                category={top[0].category}
                description=''
                slug={`news/${top[0].slug}`}
              />
            </div>

            {/* CENTER COLUMN */}
            <div className='w-full md:w-2/4'>
              <CardArticle
                type='middle'
                title={top[1].title}
                image={top[1].image}
                author={top[1].author}
                authorImage={top[1].authorImage}
                category={top[1].category}
                slug={`news/${top[1].slug}`}
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className='w-full md:w-1/4 flex flex-col gap-4'>
              <CardArticle
                title={top[2].title}
                image={top[2].image}
                author={top[2].author}
                authorImage={top[2].authorImage}
                category={top[2].category}
                description=''
                slug={`news/${top[2].slug}`}
              />
              {/* --------------------------------------------- */}
              <CardArticle
                title={top[3].title}
                image={top[3].image}
                author={top[3].author}
                authorImage={top[3].authorImage}
                category={top[3].category}
                description=''
                slug={`news/${top[3].slug}`}
              />

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
              image={secondary[0].image}
              author={secondary[0].author}
              authorImage={secondary[0].authorImage}
              category={secondary[0].category}
              spaces={2}
            />
          </div>
          <div className='w-full lg:w-1/4 p-1'>
            <CardArticle
              title={secondary[1].title}
              image={secondary[1].image}
              author={secondary[1].author}
              authorImage={secondary[1].authorImage}
              category={secondary[1].category}
            />
          </div>
          <div className='w-full lg:w-1/4 p-1'>
            <CardArticle
              title={secondary[2].title}
              image={secondary[2].image}
              author={secondary[2].author}
              authorImage={secondary[2].authorImage}
              category={secondary[2].category}
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
              image={extras[0].image}
              author={extras[0].author}
              authorImage={extras[0].authorImage}
              category={extras[0].category}
              description=''
              slug={`news/${extras[0].slug}`}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-1">
            <CardArticle
              title={extras[1].title}
              image={extras[1].image}
              author={extras[1].author}
              authorImage={extras[1].authorImage}
              category={extras[1].category}
              description=''
              slug={`news/${extras[1].slug}`}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-1">
            <CardArticle
              title={extras[2].title}
              image={extras[2].image}
              author={extras[2].author}
              authorImage={extras[2].authorImage}
              category={extras[2].category}
              description=''
              slug={`news/${extras[2].slug}`}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-1">
            <CardArticle
              title={extras[3].title}
              image={extras[3].image}
              author={extras[3].author}
              authorImage={extras[3].authorImage}
              category={extras[3].category}
              description=''
              slug={`news/${extras[3].slug}`}
            />
          </div>
        </div>
      </section>

      {/* Tubes */}
      <section className='w-full bg-[--uss-green] py-6 lg:py-12 flex justify-center'>
        <div className="flex flex-col">
          <div className="max-w-xs md:max-w-2xl lg:max-w-7xl w-full flex flex-col">
            <h1 className='text-5xl md:text-9xl my-5 text-white font-bold'>Tube</h1>
            <p className='text-xl md:text-3xl text-[--uss-black] w-full md:w-2/3 lg:w-1/3'>Lo último en innovación educativa en video, webinars, entrevistas, conferencias y más.</p>

            <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
              <div className='w-full md:w-1/2 p-1'>
                <CardVideo
                  title={tubes[0].title}
                  description='loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
                  image={tubes[0].image}
                  author={tubes[0].author}
                  authorImage={tubes[0].authorImage}
                  category={tubes[0].category}
                  slug={`tube/${tubes[0].slug}`}
                />
              </div>
              <div className='w-full md:w-1/2 p-1'>
                <CardVideo
                  title={tubes[1].title}
                  description='loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
                  image={tubes[1].image}
                  author={tubes[1].author}
                  authorImage={tubes[1].authorImage}
                  category={tubes[1].category}
                  slug={`tube/${tubes[1].slug}`}
                />
              </div>
            </div>
          </div>

          <div className="max-w-xs md:max-w-2xl lg:max-w-7xl w-full flex flex-col">
            <div className="flex flex-col md:flex-row flex-wrap">
              <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                <CardVideo
                  title={tubes[2].title}
                  image={tubes[2].image}
                  author={tubes[2].author}
                  authorImage={tubes[2].authorImage}
                  category={tubes[2].category}
                  slug={`tube/${tubes[2].slug}`}
                  type='small'
                />
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                <CardVideo
                  title={tubes[3].title}
                  image={tubes[3].image}
                  author={tubes[3].author}
                  authorImage={tubes[3].authorImage}
                  category={tubes[3].category}
                  slug={`tube/${tubes[3].slug}`}
                  type='small'
                />
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                <CardVideo
                  title={tubes[4].title}
                  image={tubes[4].image}
                  author={tubes[4].author}
                  authorImage={tubes[4].authorImage}
                  category={tubes[4].category}
                  slug={`tube/${tubes[4].slug}`}
                  type='small'
                />
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-1 lg:p-3">
                <CardVideo
                  title={tubes[5].title}
                  image={tubes[5].image}
                  author={tubes[5].author}
                  authorImage={tubes[5].authorImage}
                  category={tubes[5].category}
                  slug={`tube/${tubes[5].slug}`}
                  type='small'
                />
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
              <h1 className='text-5xl lg:text-9xl my-5 text-[--uss-green] font-bold'>Reads</h1>
              <p className='text-xl lg:text-3xl text-[--uss-black] w-full'>Colección de publicaciones con tendencias emergentes de pedagogía y tecnología educativa</p>
            </div>
            <div className='order-2 lg:order-1 w-full flex flex-col md:flex-row'>
              <div className='w-full md:w-1/2 p-1'>
                <CardRead
                  title={reads[0].title}
                  image={reads[0].image}
                  category={reads[0].category}
                  author={reads[0].author}
                  authorImage={reads[0].authorImage}
                  slug={`reads/${reads[0].slug}`}
                />
              </div>
              <div className='w-full md:w-1/2 p-1'>
              <CardRead
                  title={reads[1].title}
                  image={reads[1].image}
                  category={reads[1].category}
                  author={reads[1].author}
                  authorImage={reads[1].authorImage}
                  slug={`reads/${reads[1].slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
