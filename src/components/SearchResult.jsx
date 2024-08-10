/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { SearchQueryContext } from "../store/SearchQuery/search-query-context";
import { VideoPageContext } from "../store/VideoPage/video-page-context";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const SearchResultPage = () => {
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
      .get(`/api/searchbar?q=${encodeURIComponent(searchQuery)}&no=12`)
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
  }, [searchQuery]);

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
    <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col items-center overflow-x-hidden mb-10">
      <div className="flex w-screen justify-between">
        <div className="flex flex-col gap-4 w-full mt-5 mb-10">
          {backEndData.map((item, index) => {
            if (item.type === "channel") {
              return (
                <div
                  key={index}
                  className="flex gap-10 items-center w-[1200px] justify-around p-16 cursor-pointer"
                >
                  <div className="flex gap-16">
                    <div className="w-32 rounded-full">
                      <img
                        src={item.thumbnailUrl}
                        className="bg-cover rounded-full"
                      />
                    </div>
                    <div className="flex flex-col text-white">
                      <p className="text-lg">{item.channelTitle}</p>
                      <p>{item.subscriberCount} subscribers</p>
                      <p>{item.videoNumber} videos</p>
                      <p>{item.description}</p>
                    </div>
                  </div>

                  <div>
                    <button className="bg-red-600 text-white p-2 rounded-3xl">
                      Subscribe
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <NavLink key={index} to={`/video/${item.videoID}`}>
                  <div
                    className="rounded-lg overflow-hidden transition-transform transform hover:scale-[101%] cursor-pointer flex gap-5 shadow-md"
                    onClick={()=>handleClick(item)}
                  >
                    <div className="w-[500px] h-[280px] bg-[#272727] rounded-xl">
                      <img
                        src={item.thumbnailUrl}
                        alt={`Thumbnail ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[700px] p-4 flex justify-between">
                      <div className="flex flex-col">
                        <h2 className="text-md font-innterTight text-white">
                          {item.videoTitle}
                        </h2>
                        <div className="flex gap-3">
                          <h4 className="text-gray-400 text-sm mt-1">
                            {item.viewCount} views
                          </h4>
                          <h4 className="text-gray-400 text-sm mt-1">
                            {item.videoDate}
                          </h4>
                        </div>
                        <h4 className="text-gray-400 text-sm mt-1">
                          {item.channelName}
                        </h4>

                        <p className="text-white text-xs mt-5">
                          {item.description}
                        </p>
                      </div>
                      <div>
                        <BsThreeDotsVertical color="white" size="1.3rem" />
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
