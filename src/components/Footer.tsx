import Link from 'next/link'
import React from 'react'

interface FooterProps {
  alternative?: boolean
}
export default function Footer({ alternative = false }: FooterProps) {
  return (
    <footer className={`${alternative ? 'bg-[--uss-green]' : 'bg-[--uss-green]'} w-full flex justify-center py-10`}>
      <div className='max-w-7xl w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-3/6 items-center md:items-start pb-4 md:pb-0 flex flex-col gap-8 px-8'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo_gray.png" alt="" className='w-44' />
          <p className='text-sm text-[--uss-black] font-light'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptas animi mollitia, distinctio aliquam consectetur soluta reiciendis quae quaerat.
          </p>
        </div>
        <div className='w-full md:w-1/6 pb-2 md:pb-0 items-center md:items-start flex flex-col gap-10'>
          <p className={`font-bold ${alternative ? 'text-[--uss-black]' : 'text-[--uss-black]'}`}>Acerca de</p>
          <div className='hidden md:flex flex-col gap-1 text-[--uss-black]'>
            <Link href='/'>Observatorio</Link>
          </div>
        </div>
        <div className='w-full md:w-1/6 pb-2 md:pb-0 items-center md:items-start flex flex-col gap-8'>
          <p className={`font-bold ${alternative ? 'text-[--uss-black]' : 'text-[--uss-black]'}`}>Sitemap</p>
          <div className='hidden md:flex flex-col gap-1 text-[--uss-black]'>
            <Link href='/'>News</Link>
            <Link href='/'>Educating</Link>
            <Link href='/'>Tube</Link>
            <Link href='/'>Reads</Link>
            <Link href='/'>Podcast</Link>
          </div>
        </div>
        <div className='w-full md:w-1/6 pb-2 md:pb-0 items-center md:items-start flex flex-col gap-1 md:gap-8'>
          <p className={`font-bold ${alternative ? 'text-[--uss-black]' : 'text-[--uss-black]'}`}>Síguenos</p>
          <div className='flex flex-col gap-1 text-[--uss-black] items-center md:items-start'>
            <Link href='/'>Facebook</Link>
            <Link href='/'>Instagram</Link>
            <Link href='/'>YouTube</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
