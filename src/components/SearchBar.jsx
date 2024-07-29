import { useContext, useRef, useState } from "react";
import { SearchQueryContext } from "../store/search-query-context";
import LoadingBar from "./ContentDisplay/LoadingBar";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardVoice } from "react-icons/md";
import debounce from "lodash.debounce";

export default function SearchBar() {
  const text = useRef();
  const [searchText, setSearchText] = useState("");
  const { setSearchQuery } = useContext(SearchQueryContext);
  const [progress, setProgress] = useState(0);

  function handleLoadingBar() {
    setProgress(30);
    setTimeout(() => setProgress(100), 400);
    setTimeout(() => setProgress(0), 1500);
  }

  // Debounced function
  const handleSearch = debounce((query) => {
    handleLoadingBar()
    setSearchQuery(query);
  }, 300);

  function handleClick() {
    handleSearch(searchText);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch(searchText);
    }
  }

  return (
    <div className="h-10 w-full grow flex justify-center mx-3 cursor-vertical-text">
        {progress > 0 && <LoadingBar progress={progress} />}
      <input
        ref={text}
        type="text"
        placeholder="Search"
        className="px-5 pb-1 bg-[#0f0f0f] h-full w-1/2 rounded-l-full focus:outline-none caret-white text-white"
        style={{ border: "2px solid #222222" }}
        onChange={() => setSearchText(text.current.value)}
        onKeyDown={handleKeyDown} // Add key down handler
        value={searchText}
      />
      <button
        className="bg-[#222222] h-10 px-4 rounded-r-3xl"
        onClick={handleClick}
      >
        <FaSearch color="#979797" />
      </button>
      <div className="w-10 bg-[#222222] flex justify-center items-center rounded-full ml-4">
        <MdKeyboardVoice color="white" size="1.5rem" />
      </div>
    </div>
  );
}
