/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { PostSearch } from '@/components/PostSearch/InstantSearch';
import { Category, categoryMapper } from '@/services/home';
import { HeaderContext, HeaderProvider } from './header.context';
import Image from 'next/image';
import './styles.css';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronLeft, ChevronRight, LogOut, Search, User } from 'lucide-react';
import { Button } from '../ui/button';
import useStore from '@/hooks/useStore';
import { authStore } from '@/app/store/session';
import { usePathname } from 'next/navigation';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

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


  const NAVS = [
    {
      href: '/news',
      name: categoryMapper[Category.NEWS]
    },
    {
      href: '/educating',
      name: categoryMapper[Category.BITS]
    },
    {
      href: '/tube',
      name: categoryMapper[Category.TUBES]
    },
    {
      href: '/reads',
      name: categoryMapper[Category.READS]
    },
    {
      href: '/podcast',
      name: categoryMapper[Category.PODCAST]
    },
    {
      href: '/upload-content',
      name: 'Autores'
    },
    {
      href: '/sala-innovacion-chot',
      name: 'CHOT'
    },
    {
      href: '/eventos',
      name: 'Eventos'
    },
  ]
  return (
    <>
      <header className={cn(
        'flex justify-center absolute top-0 w-full pb-4',
        isOpenSearch ? 'z-10' : 'z-20'
      )}>
        <div className='container flex flex-col gap-4 md:gap-0 md:flex-row justify-between w-full items-center p-0 md:p-8 mt-8 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-md shadow-lg'>
          <div className='flex flex-row gap-1 md:gap-3 items-center justify-center w-fit'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href='/'>
              <Image
                src="/img/logo_gray.png"
                alt="Logo USS"
                // className='w-40'
                width={200}
                height={80}
              />
            </Link>
            <div className='w-[2px] h-8 bg-black'></div>
            <div>
              <h1 className='text-md md:text-xl font-medium'>Observatorio Educativo</h1>
            </div>
          </div>
          <nav className='hidden md:flex items-center gap-2 md:gap-4 text-sm md:text-base'>
            {NAVS.map((nav) => (
              <LinkNav key={nav.href} href={nav.href} name={nav.name} />
            ))}
            <MenuAction isOpenSearch={isOpenSearch} setIsOpenSearch={setIsOpenSearch} />
          </nav>
          <nav className='flex gap-1 md:hidden items-center w-full relative px-8 pb-4'>
            <Swiper
              spaceBetween={-10}
              slidesPerView={4}
              loop={true}
              modules={[Navigation]}
              navigation={{
                nextEl: `.nextMenu`,
                prevEl: `.prevMenu`,
              }}
            >
              {NAVS.map((nav) => (
                <SwiperSlide key={nav.href + 'navs'}>
                  <LinkNav key={nav.href} href={nav.href} name={nav.name} className='text-xs' />
                </SwiperSlide>
              ))}
              <div
                className={`prevMenu absolute top-2/4 z-20 -mt-[16px] flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-200 -left-[10px]`}
                role="button"
              >
                <span className="sr-only">Prev</span>
                <ChevronLeft width={18} height={18} />
              </div>
              <div
                className={`nextMenu absolute top-2/4 z-20 -mt-[16px] flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-200 -right-[10px]`}
                role="button"
              >
                <span className="sr-only">Next</span>
                <ChevronRight width={18} height={18} />
              </div>
            </Swiper>
            <MenuAction isOpenSearch={isOpenSearch} setIsOpenSearch={setIsOpenSearch} classNameButton='h-6 w-6 p-[5px]' classNameIcons='' />
          </nav>
        </div>
      </header>
      <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve absolute top-48 md:top-36" style={{
        position: 'absolute',
      }}>
        <a rel="nofollow" className="rsbtn_play" title="Escucha esta p&aacute;gina utilizando ReadSpeaker webReader" href="https://app-eu.readspeaker.com/cgi-bin/rsent?customerid=13446&amp;lang=es_co&amp;readid=contentRead&amp;url=">
          <span className="rsbtn_left rsimg rspart"><span className="rsbtn_text"><span>Escuchar</span></span></span>
          <span className="rsbtn_right rsimg rsplay rspart"></span>
        </a>
      </div>

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
          <div className='w-full md:w-[600px] lg:w-[1000px] min-w-fit max-w-7xl flex items-end justify-end'>
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

interface LinkNavProps {
  href: string;
  name: string
  className?: string;
}
export const LinkNav = ({ href, name, className }: LinkNavProps) => {
  const pathname = usePathname()
  return (
    <Link className={cn(
      pathname === href ? '' : 'text-black',
      'hover:text-green-500 transition-all duration-300 ease-in-out relative flex flex-col items-center justify-center',
      className
    )} href={href}>
      {name}
      {pathname === href && (
        <span className='w-[70%] md:w-[110%] h-[3px] md:h-[2px] bg-[#50D744] absolute -bottom-[3px] md:-bottom-[2px] rounded-lg'></span>
      )}
    </Link>
  )
}

interface MenuActionProps {
  setIsOpenSearch: (value: boolean) => void;
  isOpenSearch: boolean;
  classNameButton?: string;
  classNameIcons?: string;
}
export const MenuAction = ({
  isOpenSearch, setIsOpenSearch, classNameButton, classNameIcons
}: MenuActionProps) => {
  const session = useStore(authStore, (state) => state)!;
  if (!session) {
    return null;
  }
  const { user, logout } = session;
  return (
    <div className='flex gap-1'>
      <Button
        variant="outline"
        className={cn('bg-[#50D744] hover:bg-green-500 p-3', classNameButton)}
        onClick={() => setIsOpenSearch(!isOpenSearch)}
      >
        <Search className={cn("h-[22px] w-[22px] stroke-2 text-black", classNameIcons)} />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={cn('bg-black hover:bg-slate-600 p-3', classNameButton)}>
            <User className={cn("h-[22px] w-[22px] stroke-2 text-white", classNameIcons)} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {user ? (
            <>
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild onClick={logout} className='cursor-pointer'>
                <div className='flex'>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </div>
              </DropdownMenuItem>
            </>
          ) : (<>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link href="/iniciar-sesion">
                Iniciar sesión
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link href="/registro">
                Regístrate
              </Link>
            </DropdownMenuItem>
          </>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
