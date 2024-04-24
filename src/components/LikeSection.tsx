'use client'
import { getIsLikeToPost, setLikesToPost } from '@/lib/actions'
import { cn } from '@/lib/cn'
import React, { useEffect, useState } from 'react'

function LikeSection({ id, likes }: { id: string, likes: number }) {

    const [likesInView, setLikesInView] = useState(likes)
    const [isLike, setIsLike] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    async function fetchData() {
        try {
            setIsLoading(true)
            const isLike = await getIsLikeToPost(id)
            setIsLike(isLike)
        } catch (error) {
            console.error(error)
            setLikesInView(0)
            setIsLike(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const handleLikeButton = async () => {
        try {
            setIsLoading(true)
            setIsLike(!isLike)
            const { likes } = await setLikesToPost({id})
            setLikesInView(likes)
        } catch (error) {
            console.error(error)
            setLikesInView(0)
            setIsLike(false)
        } finally {
            setIsLoading(false)
        }
    }

    // if (isLoading) return <div>Cargando likes...</div>
    return (
        <div className={cn(
            'w-fit flex flex-row gap-1 rounded-md items-center justify-center border border-gray-600 px-4 py-2',
            isLoading && 'cursor-not-allowed opacity-50',
        )}>
            <button
                className={cn('h-5 w-5')}
                onClick={handleLikeButton}
            >
                {isLoading && (
                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="20px" height="20px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve">
                        <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                            C22.32,8.481,24.301,9.057,26.013,10.047z">
                            <animateTransform attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 20 20"
                                to="360 20 20"
                                dur="0.5s"
                                repeatCount="indefinite" />
                        </path>
                    </svg>
                )}
                {!isLoading && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        fill={isLike ? '#FF0000' : "#757575"}
                        aria-hidden="false" viewBox="0 0 32 32">
                        <path d="M17.4 29c-.8.8-2 .8-2.8 0L2.3 16.2C-.8 13.1-.8 8 2.3 4.8c3.1-3.1 8.2-3.1 11.3 0L16 7.6l2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4L17.4 29z" />
                    </svg>
                )}
            </button>
            <div>
                <h1>+{likesInView}</h1>
            </div>
        </div>
    )
}

export default LikeSection