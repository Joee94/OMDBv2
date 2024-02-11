import "./header.css";

interface FormElements extends HTMLFormControlsCollection {
  "movie-search": HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface Props {
  setQuery(query: string): void;
}

export const Header = ({ setQuery }: Props) => {
  return (
    <header>
      <h1>OMdb V2</h1>
      <search>
        <form
          onSubmit={(e: React.FormEvent<FormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            if (
              formData.has("movie-search") &&
              formData.get("movie-search") !== null
            ) {
              setQuery(formData.get("movie-search") as string);
            }
          }}
        >
          <label htmlFor="movie">Find a Movie</label>
          <input type="search" id="movie" name="movie-search" />
          <button type="submit">Search</button>
        </form>
      </search>
    </header>
  );
};
