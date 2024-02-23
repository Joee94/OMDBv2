/// <reference types="vitest" />

import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { Result, SearchResults } from "./src/types";

const results: Result[] = [
  {
    Title: "A Film",
    Year: "1989",
    imdbID: "fghdfgh",
    Type: "Series",
    Poster: "some poster",
  },
];

const response: SearchResults = {
  Response: "True",
  Search: results,
  totalResults: "1",
};

export const restHandlers = [
  http.get("https://www.omdbapi.com", () => {
    return HttpResponse.json(response);
  }),
];
const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
