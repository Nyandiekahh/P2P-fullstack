// src/components/UserProfile.js
import React from 'react';
import { UserCircle, Star } from 'lucide-react';

const UserProfile = () => (
  <div className="card user-profile">
    <h2>User Profile</h2>
    <div className="user-info">
      <UserCircle size={64} className="user-icon" />
      <div>
        <h3>John Kamau</h3>
        <p>Member since 2021</p>
        <p><Star size={16} /> 4.8 (120 ratings)</p>
      </div>
    </div>
    <div className="user-details">
      <p><strong>Email:</strong> john.kamau@example.com</p>
      <p><strong>Credit Score:</strong> 750</p>
      <p><strong>Total Invested:</strong> KES 500,000</p>
      <p><strong>Total Borrowed:</strong> KES 200,000</p>
    </div>
  </div>
);

export default UserProfile;