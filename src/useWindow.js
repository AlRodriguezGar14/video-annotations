import {useEffect, useState} from "react";

const useWindow = () => {
    const [dimensions, setDimensions] = useState({width: 0, height: 0});
    const resize = () => {
       setDimensions({
           width: window.innerWidth,
           height: window.outerHeight
       })
    };

    useEffect(() => {
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return {dimensions};
}

export default useWindow
