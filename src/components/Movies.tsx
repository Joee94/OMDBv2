import { Fragment } from "react";
import { useMovies } from "../hooks";
import { SearchResults } from "../types";

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
        {data.pages.map((group: SearchResults, i) => (
          <Fragment key={i}>
            <ul>
              {group.Search?.map((value) => {
                return <li key={value.imdbID}>{value.Title}</li>;
              })}
            </ul>
          </Fragment>
        ))}
        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>Load more</button>
        )}
      </>
    );
  }
};
