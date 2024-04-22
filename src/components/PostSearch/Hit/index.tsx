/* eslint-disable @next/next/no-img-element */
'use client';
import { HeaderContext } from "@/components/Header/header.context";
import { cn } from "@/lib/cn";
import { categoryMapperLink } from "@/services/home";
import Link from "next/link";
import { useContext } from "react";
import { Highlight } from "react-instantsearch";

export const Hit = ({ hit }: any) => {
  const { setShowHits, setIsOpenSearch } = useContext(HeaderContext);
  console.log({hit})
  return (
    <Link href={`/${categoryMapperLink[hit.category] || 'news'}/${hit.slug}`} onClick={() => {
      setShowHits(false);
      setIsOpenSearch(false);
    }}>
      <article className="flex flex-row gap-1">
        {hit.imageUrl && <img src={hit.imageUrl} alt={hit.title} className={cn(
          "w-2/5 md:w-1/5 object-cover aspect-video ",
        )} />}
        <div className={cn(
          "flex flex-col gap-1",
          hit.imageUrl ? 'w-3/5 md:w-4/5' : 'w-full'
        )}>
          <div className="hit-title">
            <Highlight attribute="title" hit={hit} />
          </div>
          <div className="hit-description">
            <Highlight attribute="description" hit={hit} />
          </div>
        </div>
      </article>
    </Link>
  );
};