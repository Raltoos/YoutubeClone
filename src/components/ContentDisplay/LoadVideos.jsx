/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { SearchQueryContext } from "../../store/SearchQuery/search-query-context";
import { VideoPageContext } from "../../store/VideoPage/video-page-context";
import useSearchFetch from "../../helper/SearchFetch";

export default function LoadVideos({ handleLoadingBar, isOpen }) {
  const [backEndData, setBackEndData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { searchQuery } = useContext(SearchQueryContext);
  const { setVideoPageOpen } = useContext(VideoPageContext);

  useSearchFetch(searchQuery, setLoading, setError, setBackEndData);

  function handleClick(video) {
    handleLoadingBar();
    setVideoPageOpen([true, video.videoID, video.channelId, video.videoDate]);
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className={`w-full grid sm:grid-cols-1 ${isOpen ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 p-4`}>
      {backEndData.map((video, index) => (
        <div
          key={index}
          className="rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => handleClick(video)}
        >
          <div className="relative w-full h-0 bg-[#272727] pb-[56.25%]">
            <img
              src={video.thumbnailUrl}
              alt={`Thumbnail ${index}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col">
            <h2 className="text-md font-innterTight text-white">
              {video.videoTitle}
            </h2>
            <h4 className="text-gray-400 text-sm mt-1">{video.channelName}</h4>
            <div className="flex gap-3">
              <h4 className="text-gray-400 text-sm mt-1">
                {video.viewCount} views
              </h4>
              <h4 className="text-gray-400 text-sm mt-1">{video.videoDate}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
