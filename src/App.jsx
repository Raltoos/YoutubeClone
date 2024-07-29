import Header from "./components/Header.jsx";
import SideBar from "./components/Sidebar/SideBar.jsx";
import VideoHomePage from "./components/ContentDisplay/VideoHomePage.jsx";
import SideBarClosed from "./components/Sidebar/SideBarClosed.jsx";

import { SearchQueryContext } from "./store/search-query-context.jsx";
import { useState } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("f1")
  const [open, setOpen] = useState(true)

  const cntxtValue = {
    searchQuery,
    setSearchQuery
  }

  function handleClick(){
    setOpen((prev) => !prev);
  }

  return (
    <SearchQueryContext.Provider value={cntxtValue}>
      <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col overflow-hidden">
        <Header handleToggle={handleClick}/>
        <div className="flex">
          {open ? <SideBar /> : <SideBarClosed />}
          <VideoHomePage isOpen={open}/>
        </div>
      </div>
    </SearchQueryContext.Provider>
  );
}
