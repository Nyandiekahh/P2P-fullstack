import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UserCircle, Star, TrendingUp, AlertCircle, Shield, Camera } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ProfileContainer = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileInfo = styled.div`
  text-align: center;
  width: 100%;
`;

const Name = styled.h2`
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1.4em;
  word-wrap: break-word;
`;

const MemberSince = styled.p`
  margin: 0 0 5px 0;
  color: #666;
  font-size: 0.9em;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFA000;
  font-weight: bold;
  font-size: 0.9em;
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
`;

const DetailItem = styled.div`
  background-color: #f0f4f8;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-size: 0.9em;
`;

const DetailIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #4CAF50;
  border-radius: 50%;
  color: white;
`;

const DetailLabel = styled.span`
  font-size: 0.85em;
  color: #666;
`;

const DetailValue = styled.span`
  font-size: 0.95em;
  font-weight: bold;
  color: #333;
  margin-left: auto;
`;

const CreditScoreBar = styled.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 20px;
`;

const CreditScoreFill = styled.div`
  height: 100%;
  background-color: ${props => {
    if (props.score >= 700) return '#4CAF50';
    if (props.score >= 600) return '#FFA000';
    return '#F44336';
  }};
  width: ${props => (props.score / 850) * 100}%;
`;

const UserProfile = ({ onUserDataFetched }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        headers: {
          'x-auth-token': token
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
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/auth/upload-profile-image`, {
        method: 'POST',
        headers: {
          'x-auth-token': token
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      setUser(prevUser => ({ ...prevUser, profileImageUrl: result.imageUrl }));
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <ProfileContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProfileHeader>
        <ProfileImageContainer onClick={() => fileInputRef.current.click()}>
          {user.profileImageUrl ? (
            <ProfileImage src={`${API_BASE_URL}${user.profileImageUrl}`} alt="Profile" />
          ) : (
            <UserCircle size={120} color="#4CAF50" />
          )}
          <UploadOverlay>
            <Camera size={30} color="#ffffff" />
          </UploadOverlay>
          <HiddenFileInput 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*"
          />
        </ProfileImageContainer>
        <ProfileInfo>
          <Name>{user.name}</Name>
          <MemberSince>Member since {new Date(user.dateJoined).getFullYear()}</MemberSince>
          <Rating>
            <Star size={16} style={{ marginRight: '5px' }} />
            {user.rating || '4.8'} ({user.ratingCount || '120'})
          </Rating>
        </ProfileInfo>
      </ProfileHeader>
      <ProfileDetails>
        <DetailItem>
          <DetailIcon><UserCircle size={16} /></DetailIcon>
          <DetailLabel>Role</DetailLabel>
          <DetailValue>{user.role}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><Shield size={16} /></DetailIcon>
          <DetailLabel>Credit Score</DetailLabel>
          <DetailValue>{user.creditScore ? user.creditScore.score : 'N/A'}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><TrendingUp size={16} /></DetailIcon>
          <DetailLabel>Invested</DetailLabel>
          <DetailValue>KES {user.totalInvested || '0'}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><AlertCircle size={16} /></DetailIcon>
          <DetailLabel>Borrowed</DetailLabel>
          <DetailValue>KES {user.totalBorrowed || '0'}</DetailValue>
        </DetailItem>
      </ProfileDetails>
      <CreditScoreBar>
        <CreditScoreFill score={user.creditScore ? user.creditScore.score : 0} />
      </CreditScoreBar>
    </ProfileContainer>
  );
};

export default UserProfile;