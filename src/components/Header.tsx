/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='flex justify-center absolute top-0 w-full pb-4'>
      <div className='container flex flex-col md:flex-row justify-between w-full items-center p-8 mt-8 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-md shadow-lg'>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Link href='/'>
            <img src="/img/logo_gray.png" alt="Logo USS" className='w-40' />
          </Link>
        </div>
        <nav className='flex gap-2 md:gap-4'>
          <Link href='/news'>Noticias</Link>
          <Link href='/educating'>Educando</Link>
          <Link href='/tube'>AudioVisual</Link>
          <Link href='/reads'>Lecturas</Link>
          <Link href='/podcast'>Podcast</Link>
        </nav>
      </div>
    </header>
  )
}
