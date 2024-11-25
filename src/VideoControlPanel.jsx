import ControlsButton from "./ControlsButton.jsx";

const VideoControlPanel = ({ handleKeyDown }) => {
  return (
    <div className="flex justify-center items-center p-4 bg-gray-800 border-t border-gray-700">
      <ControlsButton pressedKey={'k'} content={"Play/Pause (k)"} action={handleKeyDown}/>
      <ControlsButton pressedKey={'j'} content={"Rewind (j)"} action={handleKeyDown}/>
      <ControlsButton pressedKey={'l'} content={"Fast Forward (l)"} action={handleKeyDown}/>
      <ControlsButton pressedKey={'ArrowLeft'} content={"Step Backward (←)"} action={handleKeyDown}/>
      <ControlsButton pressedKey={'ArrowRight'} content={"Step Forward (→)"} action={handleKeyDown}/>
      <ControlsButton pressedKey={','} content={"Previous Frame (,)"} action={handleKeyDown}/>
      <ControlsButton pressedKey={'.'} content={"Next Frame (.)"} action={handleKeyDown}/>
    </div>
  );
};

export default VideoControlPanel;
