import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '../Text';
import { Div } from '../TextContainer';
import FormMemory from '../FormMemory';
import ModalMemory from '../ModalMemory';

const ButtonDiv = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  border: 3px solid var(--text-color);
  border-radius: var(--border-radius);
  background-color: var(--secondary-color);
  transition: .7s;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border-color: var(--secondary-color);
  }
`;

function Button() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <Div>
      <ButtonDiv onClick={handleClick}>
        <Text fontSize="2em">Store your memories here</Text>
      </ButtonDiv>
      {showForm && (
        <ModalMemory onClose={handleClose}>
          <FormMemory />
        </ModalMemory>
      )}
    </Div>
  );
}

export default Button;
