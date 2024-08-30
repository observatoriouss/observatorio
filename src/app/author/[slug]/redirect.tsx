
'use client'
import { useRouter } from 'next/navigation'

interface Props {
    params: { slug: string }
}
function RedirectAuthorUndefined({ params }: Props) {
    const router = useRouter()
    if (params.slug === 'undefined') {
        router.replace('/404')
        return null
    }
    return (
        <div>RedirectAuthorUndefined</div>
    )
}

export default RedirectAuthorUndefined