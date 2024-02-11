import { useInfiniteQuery } from "@tanstack/react-query";
import { getErrorMessage } from "../utils";
import { SearchResults } from "../types";

const apikey = ""; //DO NOT COMMIT
const RESULTS_PER_PAGE = 10;

const getMovies = async ({
  query,
  pageParam,
}: {
  query: string;
  pageParam: number;
}) => {
  return await fetch(
    `https://www.omdbapi.com/?apikey=${apikey}&s=${query}&page=${pageParam}`
  );
};

export const useMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["movies", query],
    queryFn: async ({ pageParam }): Promise<SearchResults> => {
      try {
        const movies = await getMovies({ query, pageParam });
        return await movies.json();
      } catch (e) {
        throw new Error(getErrorMessage(e));
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPageParam >= Number(lastPage.totalResults) / RESULTS_PER_PAGE)
        return undefined;
      if (lastPage.Response === "False") return undefined;
      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
