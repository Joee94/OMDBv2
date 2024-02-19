import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header, Movies } from "./components";
import { Search } from "./types";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}

const Content = () => {
  const [search, setSearch] = useState<null | Search>(null);
  return (
    <>
      <Header setSearch={setSearch} />
      <main>{search && <Movies search={search} />}</main>
    </>
  );
};

export default App;
