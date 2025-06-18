import {
  parseAsString,
  createSearchParamsCache,
  parseAsInteger,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:

export const userSearchParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  page: parseAsInteger.withDefault(1),
  firstname: parseAsString.withDefault(""),
  lastname: parseAsString.withDefault(""),
  role: parseAsString.withDefault(""),
});
