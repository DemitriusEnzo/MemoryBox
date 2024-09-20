import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import { Form, Input, SubmitButton } from '../FormMemory';
import { Title } from '../Title';
import { Text } from '../Text';

const RegisterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(180deg, var(--primary-color), var(--primary-color), var(--primary-color-gradient), var(--primary-color-gradient), var(--primary-color));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(username, password);
      setMessage(data.message);
      if (data.success) {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <RegisterContainer>
      <Title>Register to access the Memory Box!</Title>
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
        <SubmitButton type="submit">Register</SubmitButton>
        <Text fontSize="30px">{message}</Text>
      </Form>
    </RegisterContainer>
  );
}

export default Register;
