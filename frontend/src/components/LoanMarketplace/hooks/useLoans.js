// hooks/useLoans.js
import { useState, useEffect } from 'react';

export const useLoans = (searchTerm, activeFilter, sortOption, sortDirection) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const url = new URL(`${baseUrl}/api/loans/`);
      
      // Add query parameters
      if (searchTerm) url.searchParams.append('search', searchTerm);
      if (activeFilter !== 'all') url.searchParams.append('status', activeFilter);
      url.searchParams.append('sort', sortOption);
      url.searchParams.append('direction', sortDirection);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please log in to view loans');
        }
        throw new Error('Failed to fetch loans');
      }

      const data = await response.json();
      setLoans(data);
    } catch (err) {
      console.error('Error fetching loans:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [searchTerm, activeFilter, sortOption, sortDirection]);

  const refetchLoans = () => fetchLoans();

  return { loans, loading, error, refetchLoans };
};