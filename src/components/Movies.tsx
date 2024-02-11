import { Fragment } from "react";
import { useMovies } from "../hooks";

interface Props {
  query: string;
}

interface Result {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchResults {
  Response: "True" | "False";
  Search?: Array<Result>;
  totalResults?: string;
  Error?: string;
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
