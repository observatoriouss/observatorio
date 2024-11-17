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
import { LogOut, Search, User } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { useAuthStore } from "@/stores/session";
import { AnimatedGradientText } from '../ui/gradient-text';

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
      href: '/eventos',
      name: 'Eventos'
    },
    {
      href: '/sala-innovacion-chot',
      name: 'CHOT'
    },
  ]
  return (
    <div className='m-2'>
      <header className={cn(
        'flex justify-center top-0 w-full pb-4',
        isOpenSearch ? 'z-10' : 'z-20'
      )}>
        <div className='container flex flex-col lg:gap-0 xl:flex-row justify-between w-full items-center p-4 lg:p-8 mt-8 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-md shadow-lg'>
          <div className='flex flex-row gap-1 md:gap-3 items-center justify-center w-full mb-6 xl:mb-0'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href='/'>
              <Image
                src="/img/logo_gray.png"
                alt="Logo USS"
                // className='w-40'
                width={200}
                height={0}
                className='w-52 h-auto'
              />
            </Link>
            <div className='w-[2px] h-8 bg-black'></div>
            <div>
              <h1 className='text-lg font-medium'>Observatorio Educativo</h1>
            </div>
          </div>
          <nav className='flex justify-between xl:justify-end w-full items-center gap-4 text-xs lg:text-base'>
            <div className='flex max-w-[250px] sm:max-w-xl md:max-w-3xl lg:max-w-none overflow-y-auto gap-4 py-2 h-10'>
              {NAVS.map((nav) => (
                <LinkNav key={nav.href} href={nav.href} name={nav.name} />
              ))}
            </div>
            <MenuAction isOpenSearch={isOpenSearch} setIsOpenSearch={setIsOpenSearch} />
          </nav>
        </div>
      </header>
      {/* <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve absolute top-52 md:top-60 xl:top-44" style={{
        position: 'absolute',
      }}>
        <a rel="nofollow" className="rsbtn_play" title="Escucha esta p&aacute;gina utilizando ReadSpeaker webReader" href="https://app-eu.readspeaker.com/cgi-bin/rsent?customerid=13446&amp;lang=es_co&amp;readid=contentRead&amp;url=">
          <span className="rsbtn_left rsimg rspart"><span className="rsbtn_text"><span>Escuchar</span></span></span>
          <span className="rsbtn_right rsimg rsplay rspart"></span>
        </a>
      </div> */}

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
    </div>
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
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <div className='flex gap-1 items-center'>
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
              <DropdownMenuItem asChild>
                <Link href="/mi-cuenta" className='cursor-pointer'>
                  Mi cuenta
                </Link>
              </DropdownMenuItem>
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

      <Link href="/magic-uss" className=''>
        <AnimatedGradientText
          className='rounded-md h-full w-full px-4 py-2.5'
        >
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            AI
          </span>
          {/* <Sparkles className="ml-1 size-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 " /> */}
        </AnimatedGradientText>
      </Link>
    </div>
  )
}
