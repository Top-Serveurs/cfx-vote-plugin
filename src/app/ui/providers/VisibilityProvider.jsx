import { useNuiEvent } from 'fivem-nui-react-lib';
import React, { useState, useContext, createContext } from 'react';

const VisbilityContext = createContext(undefined);

export default function VisibilityProvider({ children }) {
    const [isVisible, setIsVisible] = useState(true);
    const toggleIsVisible = () => {
        setIsVisible(!isVisible)
    }
    useNuiEvent('voteui', 'toggleIsVisible', toggleIsVisible);
    return <VisbilityContext.Provider value={{ isVisible, setIsVisible }}>{children}</VisbilityContext.Provider>
}

export const useIsVisible = () => {
    const { isVisible, setIsVisible } = useContext(VisbilityContext);
    return { isVisible, setIsVisible };
}