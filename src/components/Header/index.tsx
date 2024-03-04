/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { PostSearch } from '@/components/PostSearch/InstantSearch'
import { Category, categoryMapper } from '@/services/home';
import { HeaderContext, HeaderProvider } from './header.context';

const variants: Variants = {
  open: {
    opacity: 1,
    y: 10,
  },
  closed: {
    opacity: 0,
    y: 0,
  },
}
export default function Header() {

  return (
    <HeaderProvider>
      <ContentHeader />
    </HeaderProvider>
  )
}

function ContentHeader() {
  const { isOpenSearch, setIsOpenSearch } = useContext(HeaderContext);
  useEffect(() => {
    // efecto para aplicar overflow hidden al body cuando el menú está abierto
    if (isOpenSearch) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpenSearch])
  return (
    <>
      <header className={cn(
        'flex justify-center absolute top-0 w-full pb-4',
        isOpenSearch ? 'z-10' : 'z-20'
      )}>
        <div className='container flex flex-col md:flex-row justify-between w-full items-center p-8 mt-8 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-md shadow-lg'>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href='/'>
              <img src="/img/logo_gray.png" alt="Logo USS" className='w-40' />
            </Link>
          </div>
          <nav className='flex gap-2 md:gap-4'>
            <Link href='/news'>{categoryMapper[Category.NEWS]}</Link>
            <Link href='/educating'>{categoryMapper[Category.BITS]}</Link>
            <Link href='/tube'>{categoryMapper[Category.TUBES]}</Link>
            <Link href='/reads'>{categoryMapper[Category.READS]}</Link>
            <Link href='/podcast'>{categoryMapper[Category.PODCAST]}</Link>
            <button
              onClick={() => setIsOpenSearch(!isOpenSearch)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.9999 21.0004L16.6499 16.6504" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* float search input with framer motion */}
      <motion.div
        animate={isOpenSearch ? "open" : "closed"}
        variants={variants}
        className={cn(
          'fixed w-screen h-full items-center bg-transparent overflow-scroll hidden',
          isOpenSearch ? 'z-20 flex flex-col justify-start' : '-z-10 hidden'
        )}
      >
        <div className='w-fit flex flex-col gap-1 p-3 items-center '>
          <div className='w-full md:w-[600px] lg:w-[1024px] min-w-fit max-w-7xl flex items-end justify-end'>
            <button
              onClick={() => setIsOpenSearch(!isOpenSearch)}
              className='bg-black bg-opacity-40 text-xl font-semibold text-white rounded-full h-7 w-7'>&times;
            </button>
          </div>
          <PostSearch />
        </div>
      </motion.div>
    </>
  )
}
