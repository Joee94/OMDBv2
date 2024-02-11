import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header, Movies } from "./components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}

const Content = () => {
  const [query, setQuery] = useState(() => "");
  return (
    <>
      <Header setQuery={setQuery} />
      <main>{query != "" && <Movies query={query} />}</main>
    </>
  );
};

export default App;
