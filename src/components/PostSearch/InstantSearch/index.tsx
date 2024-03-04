'use client';
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import './styles.css'
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "../Hit";
import { useContext, useState } from "react";
import { HeaderContext } from "@/components/Header/header.context";

const searchClient = algoliasearch("N4AQ3CGJV0", "a234ce86d7d413461f9c512ca0cb4563");

export const PostSearch = () => {

  const { showHits, setShowHits } = useContext(HeaderContext);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="N4AQ3CGJV0"
      // onStateChange={(state) => {
      //   console.log({ query: state.uiState['N4AQ3CGJV0'].query })
      //   if (state.uiState['N4AQ3CGJV0'].query?.length === 0) {
      //     setShowHits(false)
      //   }
      // }}
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