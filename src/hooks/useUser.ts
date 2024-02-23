import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const data = await fetch("/user-info");
      const json = await data.json();
      return json;
    },
  });
};
