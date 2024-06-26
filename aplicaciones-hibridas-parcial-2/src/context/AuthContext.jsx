import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // console.log("Token guardado en localStorage:", token);
            
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            // console.log("User guardado en localStorage:", user);
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (token, user) => {
        // console.log("Setting new token from login:", token);
        // console.log("Setting user details from login:", user);
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};