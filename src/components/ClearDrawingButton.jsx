const ClearDrawingButton = ({ clearDrawing }) => {
  return (
    <button
      className="bg-[#1A202C] hover:bg-[#283544] text-[#90CBF4] font-medium px-3 py-3 m-2 rounded-3xl shadow-2xl border border-[#90CCF4] border-b-4 border-r-4" onClick={clearDrawing}>
      Clear Drawing
    </button>
  );
};

export default ClearDrawingButton;
