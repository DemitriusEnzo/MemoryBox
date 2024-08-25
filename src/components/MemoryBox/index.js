import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Div } from '../TextContainer';
import ModalBox from '../ModalBox';
import { AuthContext } from '../../context/AuthContext';

const BoxImage = styled.img`
  width: 15%;
  filter: invert(72%) sepia(50%) saturate(9000%) hue-rotate(345deg) brightness(95%) contrast(105%);
  cursor: pointer;
  transition: 0.7s;

  &:hover {
    scale: 1.05;
    filter: invert(55%) sepia(100%) saturate(9000%) hue-rotate(355deg) brightness(90%) contrast(110%);
  }
`;

function MemoryBox() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleMemoryBoxClick = () => {
    setModalOpen(true);
    console.log('MemoryBox clicked, opening modal');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  console.log('MemoryBox rendering with user:', user);

  return (
    <Div height='30%'>
      <BoxImage src="/box-open-solid.svg" alt="Favicon" onClick={handleMemoryBoxClick} />
      {user && <ModalBox isOpen={modalOpen} onClose={handleCloseModal} username={user.username} />}
    </Div>
  );
}

export default MemoryBox;
