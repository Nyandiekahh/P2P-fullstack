import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // If you have styles for profile

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://localhost:5000/borrower/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        alert('Failed to fetch profile data. Please log in again.');
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile-container">
      {profileData ? (
        <div>
          <h1>Welcome, {profileData.name}</h1>
          <p>Email: {profileData.email}</p>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default Profile;
