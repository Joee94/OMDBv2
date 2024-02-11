import { Fragment } from "react";
import { useMovies } from "@/hooks";
import { SearchResults } from "@/types";
import "./movies.css";

interface Props {
  query: string;
}

export const Movies = ({ query }: Props) => {
  const { data, isLoading, isError, isSuccess, fetchNextPage, hasNextPage } =
    useMovies(query);
  if (isLoading) return "Loading";
  if (isError) return "Error";
  if (data && isSuccess) {
    return (
      <>
        <ul className="cards">
          {data.pages.map((group: SearchResults, i) => (
            <Fragment key={i}>
              {group.Search?.map((value) => {
                return (
                  <li key={value.imdbID} className="card">
                    <div>{value.Title}</div>
                    <div>{value.Year}</div>
                  </li>
                );
              })}
            </Fragment>
          ))}
        </ul>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>Load more</button>
        )}
      </>
    );
  }
};
