import { createContext, useState } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoFile, setVideoFile] = useState('');

  return (
    <VideoContext.Provider value={{ videoFile, setVideoFile }}>
      {children}
    </VideoContext.Provider>
  );
};
