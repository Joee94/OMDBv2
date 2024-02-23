import { Search, Type } from "@/types";
import "./header.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Login } from "@/components";
import { useUser } from "@/hooks";

interface FormElements extends HTMLFormControlsCollection {
  "movie-search": HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface Props {
  setSearch(search: Search): void;
}

export const Header = ({ setSearch }: Props) => {
  const [open, setOpen] = useState(false);
  const { data, isSuccess, refetch } = useUser();

  return (
    <header>
      <div className="top">
        <h1>OMDb V2</h1>
        <search>
          <form
            onSubmit={(e: React.FormEvent<FormElement>) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              setSearch({
                query: formData.get("movie-search") as string,
                year: Number(formData.get("year")),
                type: formData.get("type") as Type,
              });
            }}
            id="search-form"
          >
            <div className="search">
              <label htmlFor="movie">Find a Movie</label>
              <input type="search" id="movie" name="movie-search" />
              <button type="submit" className="containedButton">
                Search
              </button>
            </div>
          </form>
        </search>
        {isSuccess && data.user ? (
          <button
            className="textButton"
            onClick={() => {
              fetch("/logout");
              refetch();
            }}
          >
            Logout
          </button>
        ) : (
          <button className="textButton" onClick={() => setOpen(true)}>
            Login
          </button>
        )}
      </div>
      <div className="filters">
        <label htmlFor="year">Enter a year</label>
        <input
          type="number"
          id="year"
          name="year"
          min="1888"
          step="1"
          placeholder={new Date().getFullYear().toString()}
          form="search-form"
        />

        <label htmlFor="type">Choose a type:</label>

        <select name="type" id="type" form="search-form">
          <option value="">Any</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>
      {open &&
        createPortal(<Login onClose={() => setOpen(false)} />, document.body)}
    </header>
  );
};
