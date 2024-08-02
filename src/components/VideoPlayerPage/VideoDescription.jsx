/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

import ImagePreloader from "./ImagePreLoader";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { GoDownload } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";

const VideoDescription = ({ videoId, channelId, videoDate }) => {
  const [backEndData, setBackEndData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(
          `Fetching data for videoId: ${videoId}, channelId: ${channelId}`
        );
        const response = await axios.get(
          `/api/video/${videoId}/channel/${channelId}`
        );
        console.log("API Response:", response);
        setBackEndData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId, channelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Prepare image URLs for preloading and for comments
  const commentsWithImages = backEndData.comments.map((comment) => ({
    ...comment,
    imageUrl: comment.authorProfileImageUrl,
  }));

  const imageUrls = commentsWithImages.map((comment) => comment.imageUrl);

  const handleImagesLoaded = () => {
    setImagesLoaded(true);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-screen">
      <div className="h-fit w-[900px] mt-5 text-white flex flex-col">
        <ImagePreloader imageUrls={imageUrls} onLoaded={handleImagesLoaded} />
        <h2 className="text-2xl font-semibold p-2">
          {backEndData.videoInfo.title}
        </h2>
        <div className="h-10 flex items-center justify-between p-1 mt-2">
          <div className="flex gap-3">
            <img
              src={backEndData.channelInfo.thumbnailUrl}
              alt='channel logo'
              className="w-10 h-10 rounded-full"
            />
            <div className="w-40 flex flex-col">
              <h3 className="text-sm">{backEndData.channelInfo.title}</h3>
              <h4 className="text-xs font-innterTight">
                {backEndData.channelInfo.subscriberCount} subscribers
              </h4>
            </div>
            <button className="ml-4 px-3 bg-white text-sm text-black rounded-3xl">
              Subscribe
            </button>
          </div>

          <div>
            <div className="flex gap-3">
              <div className="flex items-center">
                <div className="flex items-center justify-center  bg-[#262626] rounded-3xl">
                  <button className="flex gap-1  bg-[#262626]   hover:bg-[#434343] rounded-l-3xl pl-4 p-3 text-sm">
                    <AiOutlineLike color="white" size="1.2rem" />{" "}
                    {backEndData.videoInfo.likes}
                  </button>
                  <div className="h-5 border border-white"></div>
                  <button className="bg-[#262626] hover:bg-[#434343] pr-4 p-3 rounded-r-3xl flex gap-1 items-center">
                    <AiOutlineDislike color="white" size="1.2rem" />
                  </button>
                </div>
              </div>

              <button className="px-3 text-sm bg-[#262626] rounded-3xl flex gap-2 items-center py-2 hover:bg-[#434343]">
                <RiShareForwardLine color="white" size="1.5rem" />
                Share
              </button>

              <button className="px-3 text-sm bg-[#262626] rounded-3xl flex gap-1 items-center py-2 hover:bg-[#434343]">
                <GoDownload color="white" size="1.3rem" />
                Download
              </button>
              <button className="px-3 text-sm bg-[#262626] rounded-3xl flex gap-1 items-center py-2 hover:bg-[#434343]">
                <BsThreeDots color="white" size="1.3rem" />
              </button>
            </div>
          </div>
        </div>

        <div className={`bg-[#2F2E2F] rounded-xl mt-7 p-3 flex flex-col`}>
          <div className="flex gap-3 text-sm text-gray-400 mb-2">
            <p>{backEndData.videoInfo.views} views</p>
            <p>{videoDate}</p>
          </div>
          <div className={`${isExpanded ? "h-auto" : "h-12"} overflow-hidden`}>
            {backEndData.videoInfo.description}
          </div>
          <button
            onClick={handleExpand}
            className="self-end mt-auto text-sm text-gray-400"
          >
            {isExpanded ? "Less" : "More"}
          </button>
        </div>

        {imagesLoaded ? (
          <div className="h-fit w-full mt-10 pb-24">
            <h2 className="text-xl font-semibold p-2">Comments</h2>
            <div className="flex flex-col gap-2">
              {commentsWithImages.map((comment, indx) => {
                return (
                  <div key={indx} className="p-3 flex flex-col gap-2">
                    <div className="flex gap-2">
                      {comment.imageUrl && (
                        <img
                          src={comment.imageUrl}
                          alt={`Author ${indx + 1}`}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div className="flex gap-1 items-center">
                        <h3 className="text-sm">{comment.authorDisplayName}</h3>
                        <p className="text-xs text-gray-500">
                          {comment.publishedAt}
                        </p>
                      </div>
                    </div>
                    <p>{comment.textDisplay}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-5">Comments Loading....</div>
        )}
      </div>
    </div>
  );
};

export default VideoDescription;
