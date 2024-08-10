/* eslint-disable react/prop-types */
import YoutubeEmbed from "./Player/YoutubeEmbed";
import VideoDescription from "./VideoDescription";
import SideRelatedVideos from "./SideRelatedVideos";
import { useContext } from "react";
import { VideoPageContext } from "../../store/VideoPage/video-page-context";

const VideoPlayerPage = () => {
  const { videoPageOpen } = useContext(VideoPageContext);
  return (
    <div className="h-screen overflow-y-scroll mt-5 flex pb-32 overflow-x-hidden">
      <div className="w-[950px] flex flex-col pl-14 ">
        <div className="w-[950px] h-[500px]">
          <YoutubeEmbed videoId={videoPageOpen[0]} />
        </div>
        <VideoDescription
          videoId={videoPageOpen[0]}
          channelId={videoPageOpen[1]}
          videoDate={videoPageOpen[2]}
        />
      </div>
      <SideRelatedVideos />
    </div>
  );
};

export default VideoPlayerPage;
