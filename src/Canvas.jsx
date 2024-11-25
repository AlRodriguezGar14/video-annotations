import { useState, useEffect } from 'react';

const Canvas = ({ videoRef, canvasRef }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawing, setCurrentDrawing] = useState([]);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const updateCanvasSize = () => {
        const width = video.clientWidth;
        const height = video.clientHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      };
      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);
      return () => window.removeEventListener('resize', updateCanvasSize);
    }
  }, [videoRef, canvasRef]);

  const startDrawing = ({ nativeEvent }) => {
    if (isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    setCurrentDrawing([{ offsetX, offsetY }]);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setCurrentDrawing([]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const newPoint = { offsetX, offsetY };
    setCurrentDrawing(prevPoints => [...prevPoints, newPoint]);
    drawSegment(currentDrawing[currentDrawing.length - 1], newPoint);
  };

  const drawSegment = (start, end) => {
    if (!start || !end) return;
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(start.offsetX, start.offsetY);
    context.lineTo(end.offsetX, end.offsetY);
    context.strokeStyle = `rgb(255, 187, 51)`;
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  };

  return (
    <canvas
      onMouseMove={draw}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      ref={canvasRef}
      className="absolute top-0 left-0"
    ></canvas>
  );
};

export default Canvas;
