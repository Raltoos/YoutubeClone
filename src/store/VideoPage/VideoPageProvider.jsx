/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { VideoPageContext } from "./video-page-context";

export const VideoPageProvider = ({ children }) => {
  const [videoPageOpen, setVideoPageOpen] = useState([false, "", ""]);

  const contextValue = useMemo(
    () => ({
      videoPageOpen,
      setVideoPageOpen,
    }),
    [videoPageOpen]
  );

  return (
    <VideoPageContext.Provider value={contextValue}>
      {children}
    </VideoPageContext.Provider>
  );
};
