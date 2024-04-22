'use client';
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import './styles.css'
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "../Hit";
import { useContext } from "react";
import { HeaderContext } from "@/components/Header/header.context";

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || '';
const algoliaIndexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || '';

const searchClient = algoliasearch(algoliaAppId, algoliaApiKey);

export const PostSearch = () => {

  console.log({
    algoliaAppId,
    algoliaApiKey,
    algoliaIndexName
  });

  const { showHits, setShowHits } = useContext(HeaderContext);

  return (
    <InstantSearch
      searchClient={searchClient}
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