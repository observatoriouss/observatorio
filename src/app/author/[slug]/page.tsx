import SplashScreen from "@/components/SplashScreen"
import { getAuthorBySlug } from "@/services/author"
import { Metadata, ResolvingMetadata } from "next"
import { Suspense } from "react"
import Author from "../components/info"
import RedirectAuthorUndefined from "./redirect"

export const dynamic = 'force-dynamic';
export const dynamicParams = false;
export const fetchCache = 'default-no-store'

type Props = {
    params: { slug: string }
    // searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data
    const author = await getAuthorBySlug(slug)

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const previusKeywords = (await parent).keywords || []

    return {
        title: author.name,
        description: author.role,
        openGraph: {
            images: [author.image ?? '', ...previousImages],
        },
    }
}

async function Educating(request: { params: { slug: string } }) {

    return (
        <Suspense
            key={request.params.slug}
            fallback={<SplashScreen />}
        >
            <RedirectAuthorUndefined params={request.params} />
            <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col'>
                <Author slug={request.params.slug} />
            </main>
        </Suspense>
    )
}

export default Educating