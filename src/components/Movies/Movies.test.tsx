import { screen, render } from "@testing-library/react";
import { Movies } from "./Movies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MovieRenderer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Movies search={{ query: "test" }} />
    </QueryClientProvider>
  );
}

describe("Movies", () => {
  it("should get a list of movies from the api", async () => {
    render(<MovieRenderer />);

    expect(await screen.findByText("A Film")).toBeInTheDocument();
  });
});
