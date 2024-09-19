import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import TextContainer from './components/TextContainer';
import Button from './components/Button';
import MemoryBox from './components/MemoryBox';
import BoxText from './components/BoxText';

const BoxContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(180deg, var(--primary-color), var(--primary-color), var(--primary-color-gradient), var(--primary-color-gradient), var(--primary-color));
`;

function Box() {
  return (
    <BoxContainer>
      <Header />
      <TextContainer />
      <Button text="Store your memories here" ariaLabel="Store your memories here" />
      <MemoryBox />
      <BoxText />
    </BoxContainer>
  );
}

export default Box;
