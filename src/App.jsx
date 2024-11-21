import {useRef, useState, useEffect} from 'react';
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

    useEffect(() => {
        const context = canvas.current.getContext("2d");
        context.lineWidth = 5;
        context.lineCap = "round";
        context.lineJoin = "round";
    }, []);

    return (
        <>
            <div>
                <h4>Canva</h4>
                <div>
                    {savedContexts.map((_, index) => (
                        <button key={index} onClick={() => loadContext(index)}>
                            Load Drawing {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={saveContext}>Save Drawing</button>
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
