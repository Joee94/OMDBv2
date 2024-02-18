import { Fragment, useState } from "react";
import { useMovies } from "@/hooks";
import { SearchResults } from "@/types";
import "./movies.css";
import { Card, Skeleton, MovieSkeletons } from "@/components";

interface Props {
  query: string;
}

export const Movies = ({ query }: Props) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies(query);

  const [open, setOpen] = useState<number | null>(null);

  console.log(data?.pages);

  if (isError) return "Error";
  if (isLoading) {
    return <MovieSkeletons />;
  }
  if (data && isSuccess) {
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
