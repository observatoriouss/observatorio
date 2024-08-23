import { getAuthorBySlug } from "@/services/author";
import { Suspense } from "react";
import Posts from "./posts";

export const dynamic = 'force-dynamic';

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
    console.log({author})
    return (
        <Suspense fallback={
            <div>
                <h1>Cargando...</h1>
            </div>
        }>
            <div className="bg-gray-200">
                <div
                    className="bg-cover bg-center h-[300px] md:h-[200px] lg:h-[300px] xl:h-[400px] 2xl:h-[500px] flex items-center justify-center bg-[url('/img/author-bg.jpeg')] bg-opacity-50 relative"
                >
                    {author && (
                        <div className="absolute -bottom-[50px] md:-bottom-[75px] lg:-bottom-[100px] xl:-bottom-[125px] 2xl:-bottom-[150px] flex items-center justify-center rounded-full shadow-lg">
                            <img
                                src={author.image ?? ''}
                                alt={author.name}
                                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] 2xl:w-[300px] 2xl:h-[300px] rounded-full shadow-lg"
                            />
                        </div>
                    )}
                </div>

                <div className="h-[50px] md:h-[75px] lg:h-[100px] xl:h-[125px] 2xl:h-[150px]" />
                <div className="flex flex-col py-4 items-center">
                    <pre>
                        {JSON.stringify(author, null, 2)}
                    </pre>
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
                </div>
                <section className='w-full bg-transparent p-4 lg:py-12'>
                    {author && <Posts id={author.id} />}
                </section>
            </div>
        </Suspense>
    )
}

export default Author