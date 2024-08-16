'use client';
import { PostStore } from '@/app/store/post'
import { Post } from '@/services/posts'
import React, { useEffect } from 'react'

interface PostSelectedProps {
    post: Post
}
function PostSelected({ post }: PostSelectedProps) {
    const { setPostSelected } = PostStore()
    useEffect(() => {
        setPostSelected(post)

        return () => {
            setPostSelected(null)
        }
    }, [])

    return <></>
}

export default PostSelected