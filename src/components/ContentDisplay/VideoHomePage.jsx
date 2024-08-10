/* eslint-disable react/prop-types */
import ScrollableTagDisplay from "./ScrollableTagDisplay";
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
    <div className="w-full h-screen pb-16 overflow-x-hidden">
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
          <ScrollableTagDisplay translation={translation} handleLoadingBar={handleLoadingBar}/>
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
      <LoadVideos handleLoadingBar={handleLoadingBar} isOpen={isOpen}/>
    </div>
  );
}
