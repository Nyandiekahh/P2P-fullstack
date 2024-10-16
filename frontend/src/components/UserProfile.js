import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UserCircle, Star, TrendingUp, AlertCircle, Shield } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ProfileContainer = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfilePicture = styled(UserCircle)`
  width: 60px;
  height: 60px;
  color: #4CAF50;
  margin-right: 15px;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemberSince = styled.p`
  margin: 3px 0;
  color: #666;
  font-size: 0.8em;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #FFA000;
  font-weight: bold;
  font-size: 0.9em;
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
`;

const DetailItem = styled.div`
  background-color: #f0f4f8;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-size: 0.9em;
`;

const DetailIcon = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #4CAF50;
  border-radius: 50%;
  color: white;
`;

const DetailLabel = styled.span`
  font-size: 0.8em;
  color: #666;
`;

const DetailValue = styled.span`
  font-size: 0.9em;
  font-weight: bold;
  color: #333;
  margin-left: auto;
`;

const CreditScoreBar = styled.div`
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 10px;
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

  useEffect(() => {
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
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
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

    fetchUserData();
  }, [onUserDataFetched]);

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
        <ProfilePicture />
        <ProfileInfo>
          <Name>{user.name}</Name>
          <MemberSince>Member since {new Date(user.dateJoined).getFullYear()}</MemberSince>
          <Rating>
            <Star size={14} style={{ marginRight: '3px' }} />
            {user.rating || '4.8'} ({user.ratingCount || '120'})
          </Rating>
        </ProfileInfo>
      </ProfileHeader>
      <ProfileDetails>
        <DetailItem>
          <DetailIcon><UserCircle size={14} /></DetailIcon>
          <DetailLabel>Role</DetailLabel>
          <DetailValue>{user.role}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><Shield size={14} /></DetailIcon>
          <DetailLabel>Credit Score</DetailLabel>
          <DetailValue>{user.creditScore ? user.creditScore.score : 'N/A'}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><TrendingUp size={14} /></DetailIcon>
          <DetailLabel>Invested</DetailLabel>
          <DetailValue>KES {user.totalInvested || '0'}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailIcon><AlertCircle size={14} /></DetailIcon>
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