const ControlsButton = ({pressedKey, content, action}) => {
    return (
        <button onClick={() => action({key: pressedKey})}
                className="mx-2 bg-[#1A202C] hover:bg-[#283544] text-[#90CCF4] text-xs font-light px-4 py-2 rounded shadow-sm border border-[#90CCF4]">{content}</button>
    )
}

export default ControlsButton;
