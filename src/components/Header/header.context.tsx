import { useState, createContext } from 'react';

interface HeaderContextType {
    isOpenSearch: boolean;
    setIsOpenSearch: (value: boolean) => void;
    showHits: boolean;
    setShowHits: (value: boolean) => void;
}

export const HeaderContext = createContext<HeaderContextType>({} as any);

interface Props {
    children: React.ReactNode;
}
export const HeaderProvider = ({ children }: Props) => {
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [showHits, setShowHits] = useState(false);

    const contextValue: HeaderContextType = {
        isOpenSearch,
        setIsOpenSearch,
        showHits,
        setShowHits,
    };

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
};
