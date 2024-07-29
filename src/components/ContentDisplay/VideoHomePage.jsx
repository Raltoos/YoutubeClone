/* eslint-disable react/prop-types */
import TagDisplay from "./TagDisplay";
import LoadingBar from "./LoadingBar";
import { useState } from "react";
import LoadVideos from "./LoadVideos";

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

export default function VideoHomePage({ isOpen }) {
  const [progress, setProgress] = useState(0);
  const [translation, setTranslation] = useState(0);

  function handleLoadingBar() {
    setProgress(30);
    setTimeout(() => setProgress(100), 400);
    setTimeout(() => setProgress(0), 1500);
  }

  function handleClick(direction) {
    if (direction == "right") {
      setTranslation((prev) => prev + 140);
      console.log(translation);
    }else{

      setTranslation((prev)=>prev-140)
    }
  }

  return (
    <div className="w-auto h-screen overflow-y-auto overflow-x-hidden pl-6">
      {progress > 0 && <LoadingBar progress={progress} />}
      <div className="w-full flex items-center">
        <div className="w-10">
          {translation > 0 && <MdOutlineKeyboardArrowLeft
            color="white"
            size="1.8rem"
            className="hover: bg-{#525252] cursor-pointer"
            onClick={() => handleClick("left")}
          />}
        </div>
        <div className="w-12/12 overflow-hidden">
          <div
            style={{ transform: `translateX(-${translation}px)` }}
            className="h-12 w-full my-1 flex items-center gap-3 transition-all"
          >
            <TagDisplay>All</TagDisplay>
            <TagDisplay>Gaming</TagDisplay>
            <TagDisplay>Fomula 1</TagDisplay>
            <TagDisplay>Development</TagDisplay>
            <TagDisplay>Mixes</TagDisplay>
            <TagDisplay>Playlists</TagDisplay>
            <TagDisplay>Trackmania</TagDisplay>
            <TagDisplay>Comedy</TagDisplay>
            <TagDisplay>Anime</TagDisplay>
            <TagDisplay>Role-Playing Games</TagDisplay>
            <TagDisplay>Recently Uploaded</TagDisplay>
            <TagDisplay>Watched</TagDisplay>
            <TagDisplay>New to you</TagDisplay>
          </div>
        </div>
        <div className="w-10">
          <MdOutlineKeyboardArrowRight
            color="white"
            size="1.8rem"
            className="hover: bg-{#525252] cursor-pointer"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
      <LoadVideos handleClick={handleLoadingBar} isOpen={isOpen}/>
    </div>
  );
}
