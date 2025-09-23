import React, { createContext, useState, useEffect } from "react";
import { LocalStorageManager } from "../utils/localStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [sessionTimer, setSessionTimer] = useState(null);
    const [showRenewalModal, setShowRenewalModal] = useState(false);

    // Cargar datos de autenticación desde localStorage al inicializar
    useEffect(() => {
        const savedAuth = LocalStorageManager.getItem(LocalStorageManager.AUTH_KEY);
        if (savedAuth) {
            setUser(savedAuth.user);
            setAccessToken(savedAuth.accessToken);
            // Reiniciar el timer de sesión
            if (savedAuth.accessToken) {
                startSessionTimer();
            }
        }
    }, []);

    // Guardar en localStorage cada vez que cambie la autenticación
    useEffect(() => {
        if (user && accessToken) {
            LocalStorageManager.setItem(LocalStorageManager.AUTH_KEY, {
                user,
                accessToken
            });
        } else if (!user && !accessToken) {
            LocalStorageManager.removeItem(LocalStorageManager.AUTH_KEY);
        }
    }, [user, accessToken]);

    // Función para limpiar la sesión
    const clearSession = () => {
        setUser(null);
        setAccessToken(null);
        setShowRenewalModal(false);
        if (sessionTimer) {
            clearTimeout(sessionTimer);
            setSessionTimer(null);
        }
        LocalStorageManager.removeItem(LocalStorageManager.AUTH_KEY);
    };

    // Función para iniciar el temporizador de sesión (4 minutos)
    const startSessionTimer = () => {
        if (sessionTimer) {
            clearTimeout(sessionTimer);
        }

        const timer = setTimeout(() => {
            setShowRenewalModal(true);
        }, 4 * 60 * 1000); // 4 minutos

        setSessionTimer(timer);
    };

    // Función para actualizar el token (renovación)
    const updateAccessToken = (newToken) => {
        setAccessToken(newToken);
        startSessionTimer();
    };

    // Cuando se establece un accessToken, iniciar el temporizador
    useEffect(() => {
        if (accessToken) {
            startSessionTimer();
        }
        return () => {
            if (sessionTimer) {
                clearTimeout(sessionTimer);
            }
        };
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            accessToken,
            setAccessToken,
            updateAccessToken,
            clearSession,
            showRenewalModal,
            setShowRenewalModal,
            startSessionTimer
        }}>
            {children}
        </AuthContext.Provider>
    );
};