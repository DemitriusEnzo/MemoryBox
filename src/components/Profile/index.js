import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../Text';
import { getUserProfile, updatePassword } from '../../api';

const ProfileContainer = styled.div`
  padding: 20px;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: var(--font-family);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: var(--input-text-size);
  font-family: var(--font-family);
  font-weight: var(--font-weight);

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const CustomButton = styled.button`
  width: 100%;
  display: flex;
  color: var(--text-color);
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 1%;
  border: 3px solid var(--text-color);
  border-radius: var(--border-radius);
  background-color: var(--secondary-color);
  transition: 0.7s;
  cursor: pointer;
  font-size: var(--input-text-size);
  font-family: var(--font-family);
  font-weight: var(--font-weight);

  &:hover {
    background-color: transparent;
    border-color: var(--secondary-color);
  }
`;


function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        console.error('No username found in localStorage');
        return;
      }
      try {
        const profileData = await getUserProfile(username);
        setUserInfo(profileData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(userInfo.username, newPassword);
      alert('Password updated successfully!');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  if (!userInfo) return <Text>Loading...</Text>;

  return (
    <ProfileContainer>
      <Text fontSize="2em">Profile</Text>
      <Text>Username: {userInfo.username}</Text>
      <Form onSubmit={handlePasswordChange}>
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <CustomButton type="submit">Update Password</CustomButton>
      </Form>
      <CustomButton onClick={handleLogout}>Logout</CustomButton>
    </ProfileContainer>
  );
}

export default Profile;
