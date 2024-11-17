"use client";
import SplashScreen from "@/components/SplashScreen";
import ContainerLayout from "@/layouts/container.layout";
import { useAuthStore } from "@/stores/session";
import { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FC } from "react";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
}[] = [
    {
      name: "Mi Cuenta",
      link: "/mi-cuenta",
    },
    {
      name: "Mis Inscripciones",
      link: "/mis-inscripciones",
    },
    {
      name: "Mis Solicitudes",
      link: "/mis-solicitudes",
    },
  ];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const navigate = useRouter();
  const user = useAuthStore(state => state.user);
  const hasHydrated = useAuthStore(state => state._hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return
    if (!user) {
      navigate.push('/iniciar-sesion')
    }
  }, [hasHydrated, user])

  if (!user) return (
    <ContainerLayout>
      <SplashScreen />
    </ContainerLayout>
  )

  return (
    <ContainerLayout>
      <div className="container">
        <div className="mt-14 sm:mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-3xl xl:text-4xl font-semibold">Mi cuenta</h2>
              <span className="mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg block">
                <span className="text-slate-900 dark:text-slate-200 font-semibold">
                  {user.name},
                </span>{" "}
                <span> {user.email}</span>{" "}
              </span>
              {user.role === "professor" && (
                <span className="mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg block">
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">
                    Profesor
                  </span>
                </span>

              )}
            </div>
            <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

            <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
              {pages.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base ${pathname === item.link
                      ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <hr className="border-slate-200 dark:border-slate-700"></hr>
          </div>
        </div>
        <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32 overflow-auto">
          {children}
        </div>
      </div>
    </ContainerLayout>
  );
};

export default CommonLayout;
