import { useEffect, useRef, useState } from 'react';

const VideoControls = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handlePlayPause = () => {
      setIsPlaying(!video.paused);
    };

    const handleTimeUpdate = () => {
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(progressPercent);
    };

    const handleClick = (e) => {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickPercent = clickX / rect.width;
      video.currentTime = clickPercent * video.duration;
    };

    video.addEventListener('play', handlePlayPause);
    video.addEventListener('pause', handlePlayPause);
    video.addEventListener('timeupdate', handleTimeUpdate);

    progressRef.current.addEventListener('click', handleClick);

    return () => {
      video.removeEventListener('play', handlePlayPause);
      video.removeEventListener('pause', handlePlayPause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      progressRef.current.removeEventListener('click', handleClick);
    };
  }, [videoRef]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
      <div className="flex flex-col items-center mt-2 w-full">
        <div ref={progressRef} className="w-full bg-gray-300 h-2 mt-2 cursor-pointer relative">
          <div className="bg-cyan-800 h-full" style={{width: `${progress}%`}}></div>
        </div>
        <button onClick={togglePlayPause} className="mt-5 bg-[#1A202C] hover:bg-[#283544] font-bold text-cyan-700 px-4 border-cyan-800 border-2 py-1 rounded-full">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
  );
};

export default VideoControls;
