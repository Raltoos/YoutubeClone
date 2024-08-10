/* eslint-disable react/prop-types */
import { useContext } from "react";
import { VideoPageContext } from "../store/VideoPage/video-page-context";
import Header from "./Header/Header";
import SideBar from "./Sidebar/SideBar";
import VideoHomePage from "./ContentDisplay/VideoHomePage";
// import VideoPlayerPage from "./VideoPlayerPage/VideoPlayerPage";
import SideBarClosed from "./Sidebar/SideBarClosed";

export default function AppContent({ handleToggleSideBar, isSideBarOpen }) {
  const { videoPageOpen } = useContext(VideoPageContext);

  if (!videoPageOpen) {
    return <div>Loading....</div>;
  }

  return (
    <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col overflow-hidden">
      <Header handleToggle={handleToggleSideBar} />
      <div className="h-screen">
        <div className="flex">
            {isSideBarOpen ? <SideBar /> : <SideBarClosed />}
            <VideoHomePage isOpen={isSideBarOpen} />
          </div>
      </div>
    </div>
  );
}
