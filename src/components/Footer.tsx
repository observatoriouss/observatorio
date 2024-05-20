import { Category, categoryMapper } from '@/services/home'
import Link from 'next/link'
import React from 'react'

interface FooterProps {
  alternative?: boolean
}
export default function Footer({ alternative = false }: FooterProps) {
  return (
    <footer className={`${alternative ? 'bg-[--uss-green]' : 'bg-[--uss-green]'} w-full flex justify-center py-10`}>
      <div className='max-w-7xl w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-2/8 items-center md:items-start pb-4 md:pb-0 flex flex-col gap-8 px-8'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo_gray.png" alt="" className='w-44' />
          <div className='text-center md:text-left'>
            <p className='text-sm text-uss-black font-medium'>
              UNIVERSIDAD SEÑOR DE SIPAN S.A.C.
            </p>
            <p className='text-sm text-uss-black font-medium'>
              R.U.C N° 20479748102
            </p>
            <p className='text-sm text-uss-black font-light'>
              Km 5 Carretera a Pimentel
            </p>
            <p className='text-sm text-uss-black font-light'>
              Chiclayo, Perú
            </p>
            <p className='text-sm text-uss-black font-light'>
              Teléfono (074) 481610
            </p>
          </div>
        </div>
        <div className='w-full md:w-2/8 pb-2 md:pb-0 items-center md:items-start flex flex-col gap-1 md:gap-8'>
          <p className={`font-bold ${alternative ? 'text-uss-black' : 'text-uss-black'}`}>Acerca de</p>
          <div className='flex flex-col gap-1 text-uss-black text-center md:text-left'>
            <Link className='hover:text-white transition duration-100 ease-in-out' href='/autoridades'>Observatorio | USS</Link>
            <Link className='hover:text-white transition duration-100 ease-in-out' href='/mensaje-editorial'>Mensaje Editorial</Link>
            <Link className='hover:text-white transition duration-100 ease-in-out' href='/innovacion-educativa'>¿Qué es innovación educativa?</Link>
            <Link className='hover:text-white transition duration-100 ease-in-out' href='/reads/glosario-de-innovacion-educativa'>Glosario de Innovación Educativa</Link>
          </div>
        </div>
        <div className='w-full md:w-2/8 pb-2 md:pb-0 items-center md:items-start flex flex-col gap-1 md:gap-8'>
          <p className={`font-bold ${alternative ? 'text-uss-black' : 'text-uss-black'}`}>Sitemap</p>
          <div className='flex flex-col gap-1 text-uss-black text-center md:text-left'>
            <Link href='/news' className='hover:text-white transition duration-100 ease-in-out'>{categoryMapper[Category.NEWS]}</Link>
            <Link href='/educating' className='hover:text-white transition duration-100 ease-in-out'>{categoryMapper[Category.BITS]}</Link>
            <Link href='/tube' className='hover:text-white transition duration-100 ease-in-out'>{categoryMapper[Category.TUBES]}</Link>
            <Link href='/reads' className='hover:text-white transition duration-100 ease-in-out'>{categoryMapper[Category.READS]}</Link>
            <Link href='/podcast' className='hover:text-white transition duration-100 ease-in-out'>{categoryMapper[Category.PODCAST]}</Link>
          </div>
        </div>
        <div className='w-full md:w-2/8 pb-2 md:pb-0 items-center md:items-start flex flex-col gap-1 md:gap-8'>
          <p className={`font-bold ${alternative ? 'text-uss-black' : 'text-uss-black'}`}>Síguenos</p>
          <div className='flex flex-col gap-1 text-uss-black items-center md:items-start'>
            <Link href='https://www.facebook.com/ussipan' target='_blank' className='hover:text-white transition duration-100 ease-in-out'>Facebook</Link>
            <Link href='https://www.instagram.com/ussipan/' target='_blank' className='hover:text-white transition duration-100 ease-in-out'>Instagram</Link>
            <Link href='https://www.youtube.com/@ussipan' target='_blank' className='hover:text-white transition duration-100 ease-in-out'>YouTube</Link>
            <Link href='https://www.linkedin.com/school/ussipan/' target='_blank' className='hover:text-white transition duration-100 ease-in-out'>LinkedIn</Link>
            <Link href='/dda' className='hover:text-white transition duration-100 ease-in-out'>DDA</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
