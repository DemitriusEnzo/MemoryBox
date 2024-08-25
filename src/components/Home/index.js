import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '../Text';
import { Title } from '../Title';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(180deg, var(--primary-color), var(--primary-color), var(--primary-color-gradient), var(--primary-color-gradient), var(--primary-color));
`;

const HomeContent = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  gap: 30px;
  margin-bottom: 3%;
`;

const HomeButton = styled(Link)`
  padding: 2% 20%;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 2em;
  font-weight: 900;
  text-decoration: none;
  text-align: center;
  transition: .7s;
  
  &:hover {
    background-color: var(--hover-color);
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Title fontSize="6em">Welcome to memory box!</Title>
      <HomeContent>
        <Text>
          Already have an account?
        </Text>
        <HomeButton to="/login">Log in</HomeButton>
        <Text>
          Don't have an account?
        </Text>
        <HomeButton to="/register">Create one now</HomeButton>
      </HomeContent>
    </HomeContainer>
  );
}

export default Home;
