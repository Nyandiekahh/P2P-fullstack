import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit2, Check, X } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ProfileContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  margin: 0;
  color: #2c3e50;
`;

const Role = styled.p`
  margin: 5px 0 0;
  color: #7f8c8d;
  font-size: 16px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const FieldIcon = styled.span`
  margin-right: 15px;
  color: #3498db;
`;

const FieldContent = styled.div`
  flex: 1;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 5px;
`;

const FieldValue = styled.div`
  font-size: 16px;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  color: #2c3e50;
`;

const EditButton = styled(motion.button)`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 10px;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setEditedUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(editedUser)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user data');
      }

      const updatedUserData = await response.json();
      setUser(updatedUserData);
      setEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
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
        <ProfilePicture>
          <User size={50} color="#ffffff" />
        </ProfilePicture>
        <ProfileInfo>
          <Name>{editing ? (
            <Input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
          ) : user.name}</Name>
          <Role>{user.role}</Role>
        </ProfileInfo>
      </ProfileHeader>

      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        <Field>
          <FieldIcon><Mail /></FieldIcon>
          <FieldContent>
            <FieldLabel>Email</FieldLabel>
            {editing ? (
              <Input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            ) : (
              <FieldValue>{user.email}</FieldValue>
            )}
          </FieldContent>
        </Field>
        <Field>
          <FieldIcon><Phone /></FieldIcon>
          <FieldContent>
            <FieldLabel>Phone</FieldLabel>
            {editing ? (
              <Input
                type="tel"
                name="phone_number"
                value={editedUser.phone_number}
                onChange={handleChange}
              />
            ) : (
              <FieldValue>{user.phone_number}</FieldValue>
            )}
          </FieldContent>
        </Field>
        <Field>
          <FieldIcon><MapPin /></FieldIcon>
          <FieldContent>
            <FieldLabel>Country</FieldLabel>
            {editing ? (
              <Input
                type="text"
                name="country"
                value={editedUser.country}
                onChange={handleChange}
              />
            ) : (
              <FieldValue>{user.country}</FieldValue>
            )}
          </FieldContent>
        </Field>
      </Section>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {editing ? (
        <div>
          <EditButton
            onClick={handleSave}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Check size={20} style={{ marginRight: '5px' }} />
            Save Changes
          </EditButton>
          <EditButton
            onClick={handleCancel}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}
          >
            <X size={20} style={{ marginRight: '5px' }} />
            Cancel
          </EditButton>
        </div>
      ) : (
        <EditButton
          onClick={handleEdit}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Edit2 size={20} style={{ marginRight: '5px' }} />
          Edit Profile
        </EditButton>
      )}
    </ProfileContainer>
  );
};

export default Profile;