'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '@/types/User';

interface IUserContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface IUserProvider {
    children: React.ReactNode;
}

export const UserProvider: React.FC<IUserProvider> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const value = { user, setUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
