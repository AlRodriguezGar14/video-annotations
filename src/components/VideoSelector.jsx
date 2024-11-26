import { useState, useEffect, useContext } from 'react';
import { VideoContext } from './VideoContext.jsx';

const fetchVideos = async () => {
  const response = await fetch('/api.json');
  const data = await response.json();
  return data.db;
};

const VideoSelector = () => {
  const { setVideoFile } = useContext(VideoContext);
  const [firstSelection, setFirstSelection] = useState(true);
  const [display, setDisplay] = useState("flex justify-center items-center h-screen")
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');

  useEffect(() => {
    const loadVideos = async () => {
      const videoData = await fetchVideos();
      setVideos(videoData);
    };
    loadVideos();
  }, []);

  const handleChange = (event) => {
    if(firstSelection)
    {
      setFirstSelection(false)
      setDisplay("")
    }
    const selectedPath = event.target.value;
    setSelectedVideo(selectedPath);
    setVideoFile(selectedPath);
  };

  return (
    <div className={display}>
      <select value={selectedVideo} onChange={handleChange}
              className="p-1 border border-[#90CBF4] border-b-4 border-r-4 rounded text-sm bg-gray-700 text-[#90CBF4]">
        <option value="">Select a video</option>
        {videos.map((video, index) => (
          <option key={index} value={video.videoPath}>
            {video.videoTitle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VideoSelector;
