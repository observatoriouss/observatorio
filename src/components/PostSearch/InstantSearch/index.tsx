'use client';
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import './styles.css'
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "../Hit";
import { useState } from "react";

const searchClient = algoliasearch("N4AQ3CGJV0", "a234ce86d7d413461f9c512ca0cb4563");

export const PostSearch = () => {

  const [showHits, setShowHits] = useState(false)

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="N4AQ3CGJV0"
    >
      <Configure hitsPerPage={5} />
      <div className="ais-InstantSearch">
        <SearchBox onFocus={()=>setShowHits(true)} onBlur={()=>setShowHits(false)}/>
        {
          showHits && <Hits hitComponent={Hit} />
        }
      </div>
    </InstantSearch>
  );
};