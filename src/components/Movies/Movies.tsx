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
            <>
              <Fragment key={i}>
                {group.Search?.map((value, index) => {
                  return (
                    <li key={value.imdbID} className="card">
                      <Card
                        value={value}
                        open={open === index}
                        setOpen={() => setOpen(open !== index ? index : null)}
                      />
                    </li>
                  );
                })}
              </Fragment>
            </>
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
