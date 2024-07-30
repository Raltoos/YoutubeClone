/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const VideoPageContext = createContext();

export const VideoPageProvider = ({ children }) => {
  const [videoPageOpen, setVideoPageOpen] = useState([false, ""]);

  return (
    <VideoPageContext.Provider value={{ videoPageOpen, setVideoPageOpen }}>
      {children}
    </VideoPageContext.Provider>
  );
};