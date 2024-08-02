/* eslint-disable react/prop-types */
import { useState } from "react";
import { SearchQueryContext } from "./search-query-context";

export const SearchQueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("React Js");

  const cntxtValue = {
    searchQuery,
    setSearchQuery,
  };

  return (
    <SearchQueryContext.Provider value={cntxtValue}>
      {children}
    </SearchQueryContext.Provider>
  );
};
