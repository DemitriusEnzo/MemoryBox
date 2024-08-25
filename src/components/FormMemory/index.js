import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faSadTear, faHeart, faStar, faSurprise, faLaugh } from '@fortawesome/free-solid-svg-icons';
import { Title } from '../Title';
import { AuthContext } from '../../context/AuthContext';
import { addMemory } from '../../api';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  margin: 2%;
  padding: 10px;
  border: 2px solid var(--secondary-color);
  border-radius: var(--border-radius);
  font-family: var(--font-family);
  font-weight: 900;
  font-size: var(--input-text-size);
  cursor: pointer;

  &::placeholder {
    text-align: center;
  }

  &:focus {
    border-color: var(--focus-color);
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 5%;
  padding: 2% 20%;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: ${props => props.fontSize || 'var(--text-size)'};
  font-weight: 900;
  transition: .7s;
  
  &:hover {
    background-color: var(--hover-color);
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  padding: 5px;
  border: 2px solid ${({ isSelected }) => (isSelected ? 'var(--secondary-color)' : 'transparent')};
  border-radius: 50%;
  transition: border-color 0.3s;

  &:hover {
    border-color: var(--focus-color);
  }

  & > svg {
    color: ${({ isSelected }) => (isSelected ? 'var(--secondary-color)' : 'var(--text-color)')};
    font-size: 2em;
  }
`;

function FormMemory() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedIcon, setSelectedIcon] = useState(null);
  const { user } = useContext(AuthContext);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const date = e.target.elements.date.value;

    if (title && date && selectedIcon) {
      try {
        await addMemory(user.username, title, date, selectedIcon);
        alert('Memory added successfully');
      } catch (error) {
        console.error('Failed to submit memory:', error);
        alert('Failed to submit memory.');
      }
    } else {
      alert('All fields are required');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Detail your memory!</Title>
      <Input 
        name="title"
        type="text" 
        placeholder="Memory Title" 
        maxLength={50} 
      />
      <Input
        name="date"
        type="date" 
        max={today} 
      />
      <IconContainer>
        <IconWrapper isSelected={selectedIcon === 'smile'} onClick={() => handleIconClick('smile')}>
          <FontAwesomeIcon icon={faSmile} size="2x" />
        </IconWrapper>
        <IconWrapper isSelected={selectedIcon === 'sad-tear'} onClick={() => handleIconClick('sad-tear')}>
          <FontAwesomeIcon icon={faSadTear} size="2x" />
        </IconWrapper>
        <IconWrapper isSelected={selectedIcon === 'heart'} onClick={() => handleIconClick('heart')}>
          <FontAwesomeIcon icon={faHeart} size="2x" />
        </IconWrapper>
        <IconWrapper isSelected={selectedIcon === 'star'} onClick={() => handleIconClick('star')}>
          <FontAwesomeIcon icon={faStar} size="2x" />
        </IconWrapper>
        <IconWrapper isSelected={selectedIcon === 'surprise'} onClick={() => handleIconClick('surprise')}>
          <FontAwesomeIcon icon={faSurprise} size="2x" />
        </IconWrapper>
        <IconWrapper isSelected={selectedIcon === 'laugh'} onClick={() => handleIconClick('laugh')}>
          <FontAwesomeIcon icon={faLaugh} size="2x" />
        </IconWrapper>
      </IconContainer>
      <SubmitButton type="submit">Send to Box</SubmitButton>
    </Form>
  );
}

export default FormMemory;
