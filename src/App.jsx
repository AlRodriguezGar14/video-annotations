import {useRef, useState} from 'react';
import useWindow from "./useWindow.js";
import './App.css';

function App() {
    const {dimensions} = useWindow();
    const canvas = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentDrawing, setCurrentDrawing] = useState([]);
    const [savedContexts, setSavedContexts] = useState([]);

    // Start drawing by initializing the current drawing points
    const startDrawing = ({nativeEvent}) => {
        if (isDrawing) return;
        const {offsetX, offsetY} = nativeEvent;
        setCurrentDrawing([{offsetX, offsetY}]);
        setIsDrawing(true);
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        setCurrentDrawing([]);
    };

    // Draw on the canvas and update the current drawing points
    const draw = ({nativeEvent}) => {
        if (!isDrawing) return;
        const {offsetX, offsetY} = nativeEvent;
        const newPoint = {offsetX, offsetY};
        setCurrentDrawing(prevPoints => [...prevPoints, newPoint]);
        drawSegment(currentDrawing[currentDrawing.length - 1], newPoint);
    };

    const drawSegment = (start, end) => {
        if (!start || !end) return;
        const context = canvas.current.getContext("2d");
        context.beginPath();
        context.moveTo(start.offsetX, start.offsetY);
        context.lineTo(end.offsetX, end.offsetY);
        context.strokeStyle = `rgb(150, 96, 116)`;
        context.lineWidth = 5;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    };

    // Save the current canvas context and clear the screen
    const saveContext = () => {
        const context = canvas.current.getContext("2d");
        const imageData = context.getImageData(0, 0, canvas.current.width, canvas.current.height);
        setSavedContexts(prevContexts => [...prevContexts, imageData]);
        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
    };

    // Load a saved context onto the canvas
    const loadContext = (index) => {
        const context = canvas.current.getContext("2d");
        context.putImageData(savedContexts[index], 0, 0);
    };

    return (
        <>
            <div className="p-6">
                <div>
                    {savedContexts.map((_, index) => (
                        <button className="p-2 m-2 bg-gray-800 hover:bg-gray-900 text-white rounded-3xl" key={index} onClick={() => loadContext(index)}>
                            Load Drawing {index + 1}
                        </button>
                    ))}
                <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-3 py-3 m-2 rounded shadow-2xl block border-b-4 border-r-4 border-violet-950" onClick={saveContext}>Save Drawing</button>
                </div>
                <canvas
                    onMouseMove={draw}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    ref={canvas}
                    width={dimensions.width}
                    height={dimensions.height}
                ></canvas>
            </div>
        </>
    );
}

export default App;
