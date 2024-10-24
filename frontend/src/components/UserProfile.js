import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UserCircle, Star, TrendingUp, AlertCircle, Shield, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Add this import

// API Service
const apiService = {
    getProfile: async (accessToken) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/profile/', {
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

// Styled Components (keeping your existing styles)
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

const WelcomeMessage = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
`;

const UserProfile = ({ onUserDataFetched }) => {
  const { tokens } = useAuth(); // Use the auth context
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (tokens?.access) {
          const data = await apiService.getProfile(tokens.access);
          setProfileData(data);
          if (onUserDataFetched) {
            onUserDataFetched(data.phone_number);
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [tokens, onUserDataFetched]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      if (!tokens?.access) throw new Error('No access token found');
      
      const response = await fetch('http://localhost:8000/api/auth/upload-profile-image/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const result = await response.json();
      setProfileData(prevData => ({
        ...prevData,
        profile_image: result.imageUrl
      }));
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profileData) return <div>No profile data available</div>;

  return (
    <ProfileContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WelcomeMessage>
        Welcome back, {profileData.first_name || 'User'}!
      </WelcomeMessage>
      
      <ProfileHeader>
        <ProfileImageContainer onClick={() => fileInputRef.current.click()}>
          {profileData.profile_image ? (
            <ProfileImage src={profileData.profile_image} alt="Profile" />
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
          <Name>{`${profileData.first_name} ${profileData.last_name}`}</Name>
          <MemberSince>
            Member since {new Date(profileData.profile?.member_since || Date.now()).getFullYear()}
          </MemberSince>
          <Rating>
            <Star size={16} style={{ marginRight: '5px' }} />
            {profileData.profile?.rating || '4.8'} ({profileData.profile?.rating_count || '120'})
          </Rating>
        </ProfileInfo>
      </ProfileHeader>
      <ProfileDetails>
        <DetailItem>
          <DetailIcon><UserCircle size={16} /></DetailIcon>
          <DetailLabel>Role</DetailLabel>
          <DetailValue>{profileData.role || 'Member'}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><Shield size={16} /></DetailIcon>
          <DetailLabel>Credit Score</DetailLabel>
          <DetailValue>{profileData.profile?.credit_score || 'N/A'}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><TrendingUp size={16} /></DetailIcon>
          <DetailLabel>Invested</DetailLabel>
          <DetailValue>KES {profileData.profile?.total_invested?.toLocaleString() || '0'}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><AlertCircle size={16} /></DetailIcon>
          <DetailLabel>Borrowed</DetailLabel>
          <DetailValue>KES {profileData.profile?.total_borrowed?.toLocaleString() || '0'}</DetailValue>
        </DetailItem>
      </ProfileDetails>
      <CreditScoreBar>
        <CreditScoreFill score={profileData.profile?.credit_score || 0} />
      </CreditScoreBar>
    </ProfileContainer>
  );
};

export default UserProfile;