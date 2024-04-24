'use client';
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import './styles.css';
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "../Hit";
import { useContext, useRef } from "react";
import { HeaderContext } from "@/components/Header/header.context";
import { config } from '@/config/app';


export const PostSearch = () => {

  const { algoliaAppId, algoliaApiKey, algoliaIndexName } = config;

  const searchClient = useRef(algoliasearch(algoliaAppId, algoliaApiKey));

  const { showHits, setShowHits } = useContext(HeaderContext);

  return (
    <InstantSearch
      searchClient={searchClient.current}
      indexName={algoliaIndexName}
    >
      <Configure hitsPerPage={5} />
      <div className="w-[360px] md:w-[600px] lg:w-[1024px] min-w-fit max-w-7xl ">
        <SearchBox
          onFocus={() => setShowHits(true)}
          onChangeCapture={() => setShowHits(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowHits(false)
            }
          }} />
        {
          showHits && <Hits hitComponent={Hit} />
        }
      </div>
    </InstantSearch>
  );
};