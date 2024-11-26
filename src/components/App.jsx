import { useRef, useContext, useState } from 'react';
import Video from './Video.jsx';
import VideoControls from './VideoControls.jsx';
import Canvas from './Canvas.jsx';
import SaveDrawingButton from './SaveDrawingButton';
import LoadDrawingButtons from './LoadDrawingButtons';
import ClearDrawingButton from './ClearDrawingButton';
import GoToTimecode from "./GoToTimecode.jsx";
import VideoControlPanel from './VideoControlPanel.jsx';
import VideoSelector from './VideoSelector.jsx';
import useDrawingContext from '../hooks/useDrawingContext';
import useVideoControls from '../hooks/useVideoControls';
import { VideoContext } from './VideoContext.jsx';
import '../styles/App.css';

function App() {
  const { videoFile } = useContext(VideoContext);
  const [framerate, setFramerate] = useState(23.976);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const {
    savedContexts,
    comment,
    currentComment,
    setComment,
    saveContext,
    loadContext,
    clearDrawing,
    removeDrawing,
  } = useDrawingContext(videoRef, canvasRef);

  const handleKeyDown = useVideoControls(videoRef, framerate, saveContext);

  return (
    <>
      {videoFile && (
        <>
          <VideoControlPanel handleKeyDown={handleKeyDown} />
          <div className="flex flex-col mt-10 md:flex-row h-lvh" tabIndex="0" onKeyDown={handleKeyDown} style={{ outline: 'none' }}>
            <div className="flex flex-col pt-2 ml-2 md:ml-5 space-y-2 md:space-y-4 overflow-y-auto max-h-[70vh] w-full md:w-48 rounded shadow-sm" style={{ outline: 'none' }}>
              <GoToTimecode videoRef={videoRef} framerate={framerate} setFramerate={setFramerate} />
              <ClearDrawingButton clearDrawing={clearDrawing}/>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter comment"
                className="p-1 border rounded text-sm bg-gray-700 text-white"
                onKeyDown={(e) => e.stopPropagation()}
              />
              <SaveDrawingButton saveContext={saveContext}/>
              <LoadDrawingButtons savedContexts={savedContexts} loadContext={loadContext} removeDrawing={removeDrawing}/>
            </div>
            <div className="p-2 relative flex-grow md:-ml-4" style={{outline: 'none'}}>
              <div className="video-container mx-auto max-w-4xl relative">
                <Video videoRef={videoRef} videoFile={videoFile}/>
                <Canvas videoRef={videoRef} canvasRef={canvasRef}/>
                <VideoControls videoRef={videoRef}/>
                <h4 className="text-white font-medium">{currentComment}</h4>
              </div>
            </div>
          </div>
        </>
      )}
      <VideoSelector />
    </>
  );
}

export default App;
