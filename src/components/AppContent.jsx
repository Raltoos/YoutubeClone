/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { VideoPageContext } from "../store/VideoPage/video-page-context";
import Header from "./Header/Header";
import SideBar from "./Sidebar/SideBar";
import VideoHomePage from "./ContentDisplay/VideoHomePage";
// import VideoPlayerPage from "./VideoPlayerPage/VideoPlayerPage";
import SideBarClosed from "./Sidebar/SideBarClosed";
import { SearchQueryContext } from "../store/SearchQuery/search-query-context";

export default function AppContent({ handleToggleSideBar, isSideBarOpen }) {
  const [progress, setProgress] = useState(0);
  const { videoPageOpen } = useContext(VideoPageContext);
  const { setSearchQuery } = useContext(SearchQueryContext);

  const handleExploreClick = (term) => {
    setSearchQuery(term);
  };

  function handleLoadingBar() {
    setProgress(30);
    setTimeout(() => setProgress(100), 400);
    setTimeout(() => setProgress(0), 1500);
  }

  if (!videoPageOpen) {
    return <div>Loading....</div>;
  }

  return (
    <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col overflow-hidden">
      <Header handleToggle={handleToggleSideBar} />
      <div className="h-screen">
        <div className="flex">
          {isSideBarOpen ? (
            <SideBar handleExploreClick={handleExploreClick} handleLoadingBar={handleLoadingBar}/>
          ) : (
            <SideBarClosed />
          )}
          <VideoHomePage
            isOpen={isSideBarOpen}
            progress={progress}
            setProgress={setProgress}
          />
        </div>
      </div>
    </div>
  );
}
