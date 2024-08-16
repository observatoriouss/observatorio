import { CardArticle } from "@/components";
import { getAuthorPosts } from "@/services/author";
import { Suspense } from "react";


export const dynamic = 'force-dynamic';

async function fetchData({ id }: { id: string }) {
    try {
        const posts = await getAuthorPosts(id)
        return posts
    } catch (error) {
        console.error(error)
        return []
    }
}

async function Posts({ id }: { id: string }) {
    const posts = await fetchData({ id })
    return (
        <Suspense
            fallback={
                <div>
                    <h1>Cargando Posts...</h1>
                </div>
            }
        >
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
                        slug={'educating/' + item.slug} id={'0'} subCategory={null} readingTime={0} videoUrl={null} podcastUrl={null} imageDescription={null} likes={0} userId={'0'} attachments={[]} createdAt={''} updatedAt={''} />
                </div>
            ))}
        </div>
        </Suspense>
    )
}

export default Posts