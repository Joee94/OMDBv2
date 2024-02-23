import { Fragment, useState } from "react";
import { useMovies } from "@/hooks";
import { Search, SearchResults } from "@/types";
import "./movies.css";
import { Card, MovieSkeletons } from "@/components";

interface Props {
  search: Search;
}

export const Movies = ({ search }: Props) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies(search);

  const [open, setOpen] = useState<number | null>(null);

  if (isError) return "Error";
  if (isLoading) {
    return (
      <ul className="cards">
        <MovieSkeletons />
      </ul>
    );
  }
  if (data && isSuccess) {
    if (data.pages[0].Error) {
      return <p className="empty">{data.pages[0].Error}</p>;
    }
    return (
      <>
        <ul className="cards">
          {data.pages.map((group: SearchResults, i) => (
            <Fragment
              key={`${group.totalResults}${i}${group.Search?.at(-1)?.imdbID}`}
            >
              {group.Search?.map((value, j, arr) => {
                let count = i * arr.length + j;
                return (
                  <li key={value.imdbID} className="card">
                    <Card
                      value={value}
                      open={open === count}
                      setOpen={() => setOpen(open !== count ? count : null)}
                    />
                  </li>
                );
              })}
            </Fragment>
          ))}
          {isFetchingNextPage && <MovieSkeletons />}
        </ul>
        {hasNextPage && (
          <button
            className="loadMore"
            onClick={() => fetchNextPage()}
            disabled={isLoading || isFetchingNextPage}
          >
            Load more
          </button>
        )}
      </>
    );
  }
};
