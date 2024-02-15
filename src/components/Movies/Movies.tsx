import { Fragment, useState } from "react";
import { useMovies } from "@/hooks";
import { SearchResults } from "@/types";
import "./movies.css";
import { Card } from "./Card";

interface Props {
  query: string;
}

export const Movies = ({ query }: Props) => {
  const { data, isLoading, isError, isSuccess, fetchNextPage, hasNextPage } =
    useMovies(query);

  const [open, setOpen] = useState<number | null>(null);

  if (isLoading) return "Loading";
  if (isError) return "Error";
  if (data && isSuccess) {
    return (
      <>
        <ul className="cards">
          {data.pages.map((group: SearchResults, i) => (
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
          ))}
        </ul>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>Load more</button>
        )}
      </>
    );
  }
};
