import { useInfiniteQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils";
import { Search, SearchResults } from "@/types";

const apikey = ""; //DO NOT COMMIT
const RESULTS_PER_PAGE = 10;

interface GetMoviesProps extends Search {
  pageParam: number;
}

const urlBuilder = ({ query, year, type, pageParam }: GetMoviesProps) => {
  let url = `https://www.omdbapi.com/?apikey=${apikey}&s=${query}&page=${pageParam}`;
  if (year) url += `&y=${year}`;
  if (type) url += `&type=${type}`;
  return url;
};

const getMovies = async (search: GetMoviesProps) => {
  return await fetch(urlBuilder(search));
};

export const useMovies = (search: Search) => {
  return useInfiniteQuery({
    queryKey: ["movies", search],
    queryFn: async ({ pageParam }): Promise<SearchResults> => {
      try {
        const movies = await getMovies({ ...search, pageParam });
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
