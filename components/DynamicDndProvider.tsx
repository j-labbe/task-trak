/**
 * Dynamic Provider for React DnD
 * 
 * Switches between HTML5Backend and TouchBackend based on the device being used.
 * (Requires navigator.userAgent to be accurate: i.e. spoofing to the wrong device type will make dnd unusuable)
 */
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

let BackendJSX: any;

const DynamicDndProvider = ({ children }): JSX.Element => {

    const [isMounted, setIsMounted] = useState(false);
    BackendJSX = (
        <DndProvider backend={HTML5Backend}>
            {children}
        </DndProvider>
    );

    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            BackendJSX = (
                <DndProvider backend={TouchBackend}>
                    {children}
                </DndProvider>
            );
        }
        setIsMounted(true);
    }, [setIsMounted, children]);

    return isMounted ? BackendJSX : '';
};

export default DynamicDndProvider;