import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            console.log("Token guardado en localStorage:", token);
            // Aquí podrías añadir lógica para validar el token con el servidor o decodificarlo
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = (token, userDetails) => {
        console.log("Setting new token from login:", token);
        setToken(token);
        setUser(userDetails);
        // setUser con la información del usuario si es necesario
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};