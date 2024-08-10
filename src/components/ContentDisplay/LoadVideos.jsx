/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { SearchQueryContext } from "../../store/SearchQuery/search-query-context";
import { VideoPageContext } from "../../store/VideoPage/video-page-context";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function LoadVideos({ handleLoadingBar, isOpen }) {
  const [backEndData, setBackEndData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { searchQuery } = useContext(SearchQueryContext);
  const { setVideoPageOpen } = useContext(VideoPageContext);

  useEffect(() => {
    const cacheKey = `videos_${searchQuery}`;
    const cachedResults = localStorage.getItem(cacheKey);

    if (cachedResults) {
      setBackEndData(JSON.parse(cachedResults));
      setLoading(false);
    }

    axios
      .get(`/api/search?q=${encodeURIComponent(searchQuery)}&no=12`)
      .then((response) => {
        setBackEndData(response.data);
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery]);

  function handleClick(video) {
    handleLoadingBar();
    setVideoPageOpen([video.videoID, video.channelId, video.videoDate]);
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
    <div
      className={`w-full grid sm:grid-cols-1 ${
        isOpen ? "md:grid-cols-3" : "md:grid-cols-4"
      } gap-6 p-4`}
    >
      {backEndData.map((video, index) => (
        <NavLink key={index} to={`/video/${video.videoID}`}>
          <div
            className="rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleClick(video)}
            key={index}
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
              <h4 className="text-gray-400 text-sm mt-1">
                {video.channelName}
              </h4>
              <div className="flex gap-3">
                <h4 className="text-gray-400 text-sm mt-1">
                  {video.viewCount} views
                </h4>
                <h4 className="text-gray-400 text-sm mt-1">
                  {video.videoDate}
                </h4>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
