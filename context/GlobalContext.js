'use client';

import { createContext, useState, useContext, useEffect } from 'react'; 

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    return <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};