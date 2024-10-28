import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokens, setTokens] = useState(() => {
        const savedTokens = localStorage.getItem('tokens');
        return savedTokens ? JSON.parse(savedTokens) : null;
    });

    useEffect(() => {
        // Check for saved tokens and set initial loading state
        const initializeAuth = async () => {
            try {
                const savedTokens = localStorage.getItem('tokens');
                if (savedTokens) {
                    const parsedTokens = JSON.parse(savedTokens);
                    setTokens(parsedTokens);
                    setIsAuthenticated(true);
                    
                    // Set access token for API calls
                    localStorage.setItem('accessToken', parsedTokens.access);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Clear potentially corrupted tokens
                localStorage.removeItem('tokens');
                localStorage.removeItem('accessToken');
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    useEffect(() => {
        if (tokens) {
            localStorage.setItem('tokens', JSON.stringify(tokens));
            localStorage.setItem('accessToken', tokens.access);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('tokens');
            localStorage.removeItem('accessToken');
            setIsAuthenticated(false);
        }
    }, [tokens]);

    const login = (userData, userTokens) => {
        setUser(userData);
        setTokens(userTokens);
        setIsAuthenticated(true);
        
        // Store tokens both ways for compatibility
        localStorage.setItem('tokens', JSON.stringify(userTokens));
        localStorage.setItem('accessToken', userTokens.access);
        
        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);
        try {
            if (tokens?.refresh) {
                const response = await fetch('http://localhost:8000/api/auth/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokens.access}`
                    },
                    body: JSON.stringify({ refresh_token: tokens.refresh })
                });

                if (!response.ok) {
                    console.error('Logout failed:', await response.text());
                }
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setTokens(null);
            setIsAuthenticated(false);
            localStorage.removeItem('tokens');
            localStorage.removeItem('accessToken');
            setLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            if (!tokens?.refresh) {
                throw new Error('No refresh token available');
            }

            const response = await fetch('http://localhost:8000/api/auth/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: tokens.refresh })
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const newTokens = await response.json();
            setTokens(prev => ({
                ...prev,
                access: newTokens.access
            }));
            localStorage.setItem('accessToken', newTokens.access);
            return newTokens.access;
        } catch (error) {
            console.error('Token refresh error:', error);
            logout();
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            tokens,
            login,
            logout,
            loading,
            isAuthenticated,
            refreshToken
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