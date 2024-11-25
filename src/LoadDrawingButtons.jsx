const LoadDrawingButtons = ({ savedContexts, loadContext, removeDrawing }) => {
  return (
      <div className="space-y-2 overflow-y-auto max-h-96 mt-2">
        {savedContexts.map((_, index) => (
            <div key={index} className="relative flex justify-center w-full">
              <div className="relative w-4/5">
                {/* Main Button */}
                <button
                    className="py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded shadow-2xl border-b-2 border-r-2 border-gray-950 w-full"
                    onClick={() => loadContext(index)}
                >
                  Load Issue {index + 1}
                </button>

                {/* Close (X) Button */}
                <button
                    className="absolute top-1/4 right-[-5px] bg-red-600 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ transform: 'translateY(-50%)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDrawing(index);
                    }}
                >
                  &times;
                </button>
              </div>
            </div>
        ))}
      </div>
  );
};

export default LoadDrawingButtons;
