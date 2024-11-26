import { useState, useEffect } from 'react';

const useDrawingContext = (videoRef, canvasRef) => {
  const [savedContexts, setSavedContexts] = useState([]);
  const [currentDrawingIndex, setCurrentDrawingIndex] = useState(null);
  const [comment, setComment] = useState('');
  const [currentComment, setCurrentComment] = useState('');

  const getContext = () => canvasRef.current.getContext('2d');

  const saveContext = () => {
    const context = getContext();
    const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const drawingInfo = {
      imageData,
      videoPath: videoRef.current.currentSrc,
      currentTime: videoRef.current.currentTime,
      comment: comment,
    };
    setSavedContexts([...savedContexts, drawingInfo]);
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setComment('');
  };

  const loadContext = (index) => {
    const context = getContext();
    const { imageData, currentTime, comment } = savedContexts[index];
    context.putImageData(imageData, 0, 0);
    videoRef.current.currentTime = currentTime;
    setCurrentDrawingIndex(index);
    setCurrentComment(comment);
  };

  const clearDrawing = () => {
    const context = getContext();
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setCurrentDrawingIndex(null);
    setCurrentComment('');
  };

  const removeDrawing = (index) => {
    setSavedContexts(savedContexts.filter((_, i) => i !== index));
    if (currentDrawingIndex === index) clearDrawing();
  };

  const handleTimeUpdate = () => {
    const context = getContext();
    const currentTime = videoRef.current.currentTime;
    const savedContext = savedContexts[currentDrawingIndex];

    // 0,67 is a random value that matches with the User Experience I want to achieve. TODO: Improve this logic
    if (savedContext && (currentTime < savedContext.currentTime - 0.67 || currentTime > savedContext.currentTime + 0.67)) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setCurrentDrawingIndex(null);
      setCurrentComment('');
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [currentDrawingIndex, savedContexts, videoRef]);

  return {
    savedContexts,
    currentDrawingIndex,
    comment,
    currentComment,
    setComment,
    saveContext,
    loadContext,
    clearDrawing,
    removeDrawing,
  };
};

export default useDrawingContext;
