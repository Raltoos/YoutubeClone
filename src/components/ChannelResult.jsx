/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { VideoPageContext } from "../store/VideoPage/video-page-context";
import { NavLink } from "react-router-dom";
import axios from "axios";

const ChannelResultPage = ({ channelId }) => {
  console.log(channelId);
  const [backEndData, setBackEndData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setVideoPageOpen } = useContext(VideoPageContext);
  useEffect(() => {
    const cacheKey = `videos_${channelId}`;
    const cachedResults = localStorage.getItem(cacheKey);

    if (cachedResults) {
      setBackEndData(JSON.parse(cachedResults));
      setLoading(false);
    }

    axios
      .get(`/api/channel?channelId=${channelId}&no=12`)
      .then((response) => {
        console.log(response.data);
        setBackEndData(response.data);
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [channelId]);

    function handleClick(video) {
      // handleLoadingBar();
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
    <div className="flex flex-col items-center w-full">
      <div className="w-[1300px] h-[204px] mt-2">
        <img
          src={backEndData.channel.bannerUrl}
          alt="No Channel Banner Available"
          className="object-cover w-[1300px] h-[202px] rounded-xl text-white"
        />
      </div>
      <div className="h-[200px] flex items-center ml-16 self-start">
        <div className="w-[160px]">
          <img
            src={backEndData.channel.thumbnailUrl}
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col text-white justify-center ml-4">
          <p className="text-4xl font-bold">
            {backEndData.channel.channelTitle}
          </p>
          <div className="flex gap-3 mt-1">
            <p className="text-sm font-innterTight">
              {backEndData.channel.subscriberCount} subscribers
            </p>
            <p className="text-sm font-innterTight">
              {backEndData.channel.videoCount} videos
            </p>
          </div>
          <p className="mt-3">{backEndData.channel.channelDescription}</p>

          <button className="bg-red-600 p-2 rounded-full mt-3 w-fit text-sm">
            Subscribe
          </button>
        </div>
      </div>

      <div className="self-start ml-16 mt-5 flex flex-col items-center">
        <p className="text-white text-2xl font-sans self-start">Latest Videos</p>
        <div className="h-[1px] w-full my-3 mr-2 bg-gray-500 "></div>

        <div className={`w-full grid sm:grid-cols-1 md:grid-cols-4 gap-6 p-4`}>
          {backEndData.videos.map((video, index) => (
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
      </div>
    </div>
  );
};

export default ChannelResultPage;
