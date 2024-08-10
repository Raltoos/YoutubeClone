import VideoPlayerPage from "../components/VideoPlayerPage/VideoPlayerPage";
import Header from "../components/Header/Header";

const SideBarVideoPage = () => {
  return (
    <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col overflow-hidden">
      <Header />
      <VideoPlayerPage />
    </div>
  );
};

export default SideBarVideoPage;
