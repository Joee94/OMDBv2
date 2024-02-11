export interface Result {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResults {
  Response: "True" | "False";
  Search?: Array<Result>;
  totalResults?: string;
  Error?: string;
}
