/* eslint-disable react/prop-types */
import { useContext } from "react";
import { SearchQueryContext } from "../../store/SearchQuery/search-query-context";

export default function TagDisplay({ loadinBar, children }) {
  const { setSearchQuery } = useContext(SearchQueryContext);
  function handleClick() {
    loadinBar();
    setSearchQuery(children)
  }

  return (
    <div
      className="h-8 bg-[#272727] w-fit p-3 shrink-0 flex justify-center items-center text-white rounded-lg hover:bg-[#525252] cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
