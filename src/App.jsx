/* eslint-disable react/prop-types */
import Header from "./components/Header.jsx";
import SideBar from "./components/Sidebar/SideBar.jsx";
import VideoHomePage from "./components/ContentDisplay/VideoHomePage.jsx";
import VideoPlayerPage from "./components/VideoPlayerPage/VideoPlayerPage.jsx";
import SideBarClosed from "./components/Sidebar/SideBarClosed.jsx";

import { SearchQueryContext } from "./store/search-query-context.jsx";
import { useState, useContext } from "react";
import { VideoPageContext, VideoPageProvider } from "./store/video-page-context.jsx";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("React JS");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const searchQueryContextValue = {
    searchQuery,
    setSearchQuery,
  };

  function handleToggleSideBar() {
    setIsSideBarOpen((prev) => !prev);
  }

  return (
    <SearchQueryContext.Provider value={searchQueryContextValue}>
      <VideoPageProvider>
        <AppContent handleToggleSideBar={handleToggleSideBar} isSideBarOpen={isSideBarOpen} />
      </VideoPageProvider>
    </SearchQueryContext.Provider>
  );
}

function AppContent({ handleToggleSideBar, isSideBarOpen }) {
  const { videoPageOpen } = useContext(VideoPageContext);

  return (
    <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col overflow-hidden">
      <Header handleToggle={handleToggleSideBar} />
      <div className="flex">
        {videoPageOpen[0] ? (
          <VideoPlayerPage videoId={videoPageOpen[1]} />
        ) : (
          <div className="flex">
            {isSideBarOpen ? <SideBar /> : <SideBarClosed />}
            <VideoHomePage isOpen={isSideBarOpen} />
          </div>
        )}
      </div>
    </div>
  );
}