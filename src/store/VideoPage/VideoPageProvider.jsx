/* eslint-disable react/prop-types */
import { useState } from "react";
import { VideoPageContext } from "./video-page-context";

export const VideoPageProvider = ({ children }) => {
  const [videoPageOpen, setVideoPageOpen] = useState(["", "", ""]);

  return (
    <VideoPageContext.Provider value={{videoPageOpen, setVideoPageOpen}}>
      {children}
    </VideoPageContext.Provider>
  );
};