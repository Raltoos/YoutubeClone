/* eslint-disable react/prop-types */
import AppContent from "./components/AppContent.jsx";

import { useState } from "react";
import { VideoPageProvider } from "./store/VideoPage/VideoPageProvider.jsx";
import { SearchQueryProvider } from "./store/SearchQuery/SearchQueryProvider.jsx";

export default function App() {
  
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  function handleToggleSideBar() {
    setIsSideBarOpen((prev) => !prev);
  }

  return (
    <SearchQueryProvider>
      <VideoPageProvider>
        <AppContent
          handleToggleSideBar={handleToggleSideBar}
          isSideBarOpen={isSideBarOpen}
        />
      </VideoPageProvider>
    </SearchQueryProvider>
  );
}


