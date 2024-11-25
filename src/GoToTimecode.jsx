import { useState } from 'react';

const GoToTimecode = ({ videoRef, framerate, setFramerate }) => {
  const [timecode, setTimecode] = useState('');

  const framerates = [23.976, 24, 25, 29.97, 30, 50, 59.94, 60];

  const timecodeToFrame = (timecode, fps) => {
    const [hours, minutes, seconds, frames] = timecode.split(':').map(Number);
    return (
      (hours * 3600 + minutes * 60 + seconds) * fps + frames
    );
  };

  const handleGoToTimecode = () => {
    const frame = timecodeToFrame(timecode, framerate);
    videoRef.current.currentTime = frame / framerate;
  };

  return (
    <div className="flex flex-col items-center mt-2 p-2 border rounded shadow-sm bg-gray-800">
      <select
        value={framerate}
        onChange={(e) => setFramerate(Number(e.target.value))}
        className="mb-1 p-1 border rounded text-sm bg-gray-700 text-white"
      >
        {framerates.map((rate) => (
          <option key={rate} value={rate}>
            {rate}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={timecode}
        onChange={(e) => setTimecode(e.target.value)}
        placeholder="HH:MM:SS:ff"
        className="mb-1 p-1 border rounded text-sm bg-gray-700 text-white"
      />
      <button
        onClick={handleGoToTimecode}
        className="bg-[#1A202C] hover:bg-[#283544] text-[#90CCF4] font-medium px-2 py-1 rounded shadow-sm border border-[#90CCF4] border-b-2 border-r-2 text-sm"
      >
        Go to Timecode
      </button>
    </div>
  );
};

export default GoToTimecode;
