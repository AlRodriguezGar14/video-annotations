import { useEffect } from 'react';

const Video = ({ videoRef, videoFile }) => {
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoFile;
      videoRef.current.load();
    }
  }, [videoFile]);

  return (
    <div className="w-full">
      <video ref={videoRef} className="w-full">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
