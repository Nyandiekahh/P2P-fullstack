import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState(() => {
        const savedTokens = localStorage.getItem('tokens');
        return savedTokens ? JSON.parse(savedTokens) : null;
    });

    useEffect(() => {
        // Check for saved tokens and set initial loading state
        const initializeAuth = async () => {
            try {
                if (tokens) {
                    // You could verify the token here if needed
                    // For now, we'll just update the loading state
                    setLoading(false);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [tokens]);

    useEffect(() => {
        if (tokens) {
            localStorage.setItem('tokens', JSON.stringify(tokens));
        } else {
            localStorage.removeItem('tokens');
        }
    }, [tokens]);

    const login = (userData, userTokens) => {
        setUser(userData);
        setTokens(userTokens);
        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);
        try {
            if (tokens?.refresh) {
                await fetch('http://localhost:8000/api/auth/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokens.access}`
                    },
                    body: JSON.stringify({ refresh_token: tokens.refresh })
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setTokens(null);
            localStorage.removeItem('tokens');
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            tokens,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};