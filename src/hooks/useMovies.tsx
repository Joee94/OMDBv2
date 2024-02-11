import { useQuery } from "@tanstack/react-query";

const apikey = ""; //DO NOT COMMIT

interface Result {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchResults {
  Response: "True" | "False";
  Search: Array<Result>;
  totalResults: string;
}

const getMovies = async (query: string) => {
  return await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}`);
};

export const useMovies = (query: string) => {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: async (): Promise<SearchResults> => {
      const movies = await getMovies(query);
      return await movies.json();
    },
  });
};
