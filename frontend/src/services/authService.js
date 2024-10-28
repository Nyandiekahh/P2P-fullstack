// src/services/authService.js
const API_URL = 'http://localhost:8000/api';

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            return { success: true, data };
        } else {
            throw new Error(data.detail || 'Login failed');
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    return token ? `Bearer ${token}` : '';
};