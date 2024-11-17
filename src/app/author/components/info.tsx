import { getAuthorBySlug } from "@/services/author";
import { Suspense } from "react";
import Posts from "./posts";
import SplashScreen from "@/components/SplashScreen";

export const dynamic = 'force-dynamic';
export const dynamicParams = false;
export const fetchCache = 'default-no-store'

async function fetchData({ slug }: { slug: string }) {
    try {
        const author = await getAuthorBySlug(slug)
        return author
    } catch (error) {
        console.error(error)
        return null
    }
}

async function Author({ slug }: { slug: string }) {
    const author = await fetchData({ slug })
    console.log({ author })
    return (
        <Suspense fallback={<SplashScreen />}>
            <div className="bg-gray-200">
                <div
                    className="bg-cover bg-center h-[300px] md:h-[200px] lg:h-[300px] xl:h-[400px] 2xl:h-[500px] flex items-center justify-center bg-[url('/img/author-bg.jpeg')] bg-opacity-50 relative"
                >
                    {author && (
                        <div className="absolute -bottom-[50px] md:-bottom-[75px] lg:-bottom-[100px] xl:-bottom-[125px] 2xl:-bottom-[150px] flex items-center justify-center rounded-full shadow-lg">
                            <img
                                src={author.image ?? ''}
                                alt={author.name}
                                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] 2xl:w-[300px] 2xl:h-[300px] aspect-square object-cover rounded-full shadow-lg"
                            />
                        </div>
                    )}
                </div>

                <div className="h-[50px] md:h-[75px] lg:h-[100px] xl:h-[125px] 2xl:h-[150px]" />
                <div className="flex flex-col py-4 items-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold">
                        {author?.name}
                    </h1>
                    {/* email y rol */}
                    <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light flex gap-3 items-center">
                        Autor
                        {author?.country && (
                            <img
                                className="w-6 h-6 rounded-lg object-cover"
                                src={author?.country.icon}
                                alt={author?.country.name}
                            />
                        )}
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light">
                        {author?.email}
                    </p>
                    <p className="text-md font-light">
                        Nro Posts: {author?.postsCount} || Nro Likes: {author?.postLikes}
                    </p>
                </div>
                {/* Create biography section */}
                {author?.biography && (
                    <section className="w-full bg-transparent p-4 lg:py-12">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2">
                            Biografía
                        </h3>
                        <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light"
                            dangerouslySetInnerHTML={{ __html: author.biography }}
                        />
                    </section>
                )}
                <section className='w-full bg-transparent p-4 lg:py-12'>
                    {author && <Posts id={author.id} />}
                </section>
            </div>
        </Suspense>
    )
}

export default Author