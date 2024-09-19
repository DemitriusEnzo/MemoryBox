import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';
import { Form, Input, SubmitButton } from '../FormMemory';
import { Title } from '../Title';
import { Text } from '../Text';
import { AuthContext } from '../../context/AuthContext';

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(180deg, var(--primary-color), var(--primary-color), var(--primary-color-gradient), var(--primary-color-gradient), var(--primary-color));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Username and password are required.');
      return;
    }

    try {
      const data = await loginUser(username, password);
      if (data.success) {
        login(username);
        localStorage.setItem('username', username);
        setMessage('Login successful!');
        navigate('/box');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error logging in. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <Title>Log in to access the Memory Box!</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <SubmitButton type="submit">Login</SubmitButton>
        <Text fontSize="30px" marginTop="20px">{message}</Text>
      </Form>
    </LoginContainer>
  );
}

export default Login;
