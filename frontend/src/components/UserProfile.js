import React, { useState, useEffect } from 'react';
import { UserCircle, Star } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const UserProfile = ({ onUserDataFetched }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
        if (onUserDataFetched) {
          onUserDataFetched(userData.phone_number);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [onUserDataFetched]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="card user-profile">
      <h2>Welcome, {user.name}!</h2>
      <div className="user-info">
        <UserCircle size={64} className="user-icon" />
        <div>
          <h3>{user.name}</h3>
          <p>Member since {new Date(user.dateJoined).getFullYear()}</p>
          <p><Star size={16} /> {user.rating || '4.8'} ({user.ratingCount || '120'} ratings)</p>
        </div>
      </div>
      <div className="user-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone_number}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Credit Score:</strong> {user.creditScore ? user.creditScore.score : 'N/A'}</p>
        <p><strong>Total Invested:</strong> KES {user.totalInvested || '0'}</p>
        <p><strong>Total Borrowed:</strong> KES {user.totalBorrowed || '0'}</p>
      </div>
    </div>
  );
};

export default UserProfile;