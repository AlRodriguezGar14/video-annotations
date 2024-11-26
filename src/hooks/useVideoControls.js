import {useCallback} from 'react';

const useVideoControls = (videoRef, framerate, saveContext) => {
  return useCallback((event) => {
    switch (event.key) {
      case ' ':
      case 'k':
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
        break;
      case 's':
        saveContext();
        break;
      case 'j':
        videoRef.current.currentTime -= 3;
        break;
      case 'l':
        videoRef.current.currentTime += 3;
        break;
      case 'ArrowLeft':
        videoRef.current.currentTime -= 1;
        break;
      case 'ArrowRight':
        videoRef.current.currentTime += 1;
        break;
      case ',':
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 1 / framerate, 0);
        break;
      case '.':
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime + 1 / framerate, 0);
        break;
      default:
        break;
    }
  }, [videoRef, framerate, saveContext]);
};

export default useVideoControls;
