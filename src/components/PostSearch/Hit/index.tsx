import { Highlight } from "react-instantsearch";

export const Hit = ({ hit }: any) => {
  return (
    <article className="flex">
      <img src={hit.imageUrl}/>
      <div>
        <div className="hit-title">
          <Highlight attribute="title" hit={hit} />
        </div>
        <div className="hit-description">
          <Highlight attribute="description" hit={hit} />
        </div>
      </div>
    </article>
  );
};