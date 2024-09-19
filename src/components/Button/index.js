import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '../Text';
import { Div } from '../TextContainer';
import FormMemory from '../FormMemory';
import ModalMemory from '../ModalMemory';

const ButtonDiv = styled.div`
  width: ${(props) => props.width || '20%'};
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 0.5%;
  border: 3px solid var(--text-color);
  border-radius: var(--border-radius);
  background-color: var(--secondary-color);
  transition: 0.7s;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border-color: var(--secondary-color);
  }
`;

function Button({ text, ariaLabel }) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <Div>
      <ButtonDiv onClick={handleClick} aria-label={ariaLabel}>
        <Text fontSize="2em">{text}</Text>
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
