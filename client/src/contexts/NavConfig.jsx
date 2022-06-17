import { useState, createContext } from "react";

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <NavContext.Provider value={{ isVisible, setIsVisible }}>
            {children}
        </NavContext.Provider>
    );
}