/* eslint-disable react/prop-types */
import YoutubeEmbed from "./Player/YoutubeEmbed";
import VideoDescription from "./VideoDescription";
import SideRelatedVideos from "./SideRelatedVideos";

const VideoPlayerPage = ({ videoId, channelId, videoDate }) => {
  console.log(videoId, channelId);
  return (
    <div className="h-screen overflow-y-scroll mt-5 flex pb-32 overflow-x-hidden">
      <div className="w-8/12 flex flex-col pl-14 ">
        <div className="w-[950px] h-[500px]">
          <YoutubeEmbed videoId={videoId} />
        </div>
        <VideoDescription
          videoId={videoId}
          channelId={channelId}
          videoDate={videoDate}
        />
      </div>
      <SideRelatedVideos />
    </div>
  );
};

export default VideoPlayerPage;
