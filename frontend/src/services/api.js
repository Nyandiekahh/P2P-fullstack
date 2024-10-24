// src/services/api.js
const API_BASE_URL = 'http://localhost:8000/api';

export const apiService = {
    getProfile: async (accessToken) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) throw new Error('Failed to fetch profile');
            return await response.json();
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }
};