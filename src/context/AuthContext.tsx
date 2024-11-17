// AuthContext.tsx
'use client'
import { ObjectId } from 'mongoose';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
    id: number;
    name: string;
    role?: number;
    username:string
    _id:ObjectId
    // Add other fields in your user profile as needed
}

interface AuthContextType {
    isLoggedIn: boolean;
    profile: UserProfile | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    logIn: (userData: UserData, token: string) => void;
    logOut: () => void;
    updateProfile: (updatedProfile: UserProfile) => void;
}

interface UserData {
    user: UserProfile;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUserData = localStorage.getItem('auth');
        if (storedUserData) {
            const userData: UserData = JSON.parse(storedUserData);
            setIsLoggedIn(true);
            setProfile(userData.user);
            setIsAuthenticated(true);
            if (userData.user && typeof userData.user.role === 'number') {
                setIsAdmin(userData.user.role === 1); // Assuming role 1 indicates admin
            }
        }
    }, []);

    const logIn = (userData: UserData, token: string) => {
        setIsLoggedIn(true);
        setProfile(userData.user);
        localStorage.setItem('auth', JSON.stringify(userData));
        localStorage.setItem('jwtToken', token);
        setIsAuthenticated(true);
        if (userData.user && typeof userData.user.role === 'number') {
            setIsAdmin(userData.user.role === 1); // Assuming role 1 indicates admin
        }
    };

    const logOut = () => {
        setIsLoggedIn(false);
        setProfile(null);
        localStorage.removeItem('auth');
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    const updateProfile = (updatedProfile: UserProfile) => {
        setProfile(updatedProfile);

        // Update the profile in localStorage as well
        const storedUserData = localStorage.getItem('auth');
        if (storedUserData) {
            const userData: UserData = JSON.parse(storedUserData);
            userData.user = updatedProfile;
            localStorage.setItem('auth', JSON.stringify(userData));
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, profile, logIn, logOut, updateProfile, isAuthenticated, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
