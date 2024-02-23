import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const data = await fetch("/login");
      const json = await data.json();
      return json;
    },
  });
};
