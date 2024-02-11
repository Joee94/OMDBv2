import { useMovies } from "../hooks";

interface Props {
  query: string;
}

export const Movies = ({ query }: Props) => {
  const { data, isLoading, isError, isSuccess } = useMovies(query);

  if (isLoading) return "Loading";
  if (isError) return "Error";
  if (data && isSuccess) {
    return (
      <ul>
        {data.Search.map((value) => {
          return <li>{value.Title}</li>;
        })}
      </ul>
    );
  }
};
