'use client'
import { CardArticle } from '@/components';
import { Post, getReads } from '@/services/posts';
import React, { useEffect, useState } from 'react'

function Reads() {
  const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        async function getData() {
            const res = await getReads()
            setPosts(res)
        }
        try {
            setIsLoading(true)
            getData()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [])


    return (
        <main className='h-auto pt-[180px] md:pt-[145px] flex flex-col'>
            <div className='bg-[--uss-green] flex flex-col gap-4 p-10 mt-12'>
                <div className='container mx-auto w-full'>
                    <h1 className='text-4xl font-bold text-[--uss-black]'>Reads</h1>
                    <p className='text-[--uss-black]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                </div>
            </div>

            <section className='w-full bg-transparent p-4 lg:py-12'>
                <div className="flex flex-col md:flex-row container mx-auto flex-nowrap md:flex-wrap w-full">
                    {
                        isLoading && (
                            <div className='flex justify-center items-center h-64'>
                                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-[--uss-green]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            </div>
                        )
                    }
                    {posts && posts.map((item, index) => (
                        <div key={item.slug + index} className="w-full md:w-1/2 lg:w-1/4 p-1">
                            <CardArticle
                                title={item.title}
                                image={item.image}
                                author={item.author}
                                authorImage={item.authorImage}
                                category={item.category}
                                description=''
                                slug={'reads/'+item.slug}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Reads