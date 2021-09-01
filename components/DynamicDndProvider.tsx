import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const DynamicDndProvider = ({ children }): JSX.Element => {

    const [isMounted, setIsMounted] = useState(false);
    let BackendJSX: any = (
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
    });

    return isMounted ? BackendJSX : '';
};

export default DynamicDndProvider;