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

    @media (min-width: 321px) and (max-width: 780px) {
      width: 25%;
    }

    @media (min-width: 781px) and (max-width: 1280px) {
      width: 20%;
    }
`;

function MemoryBox() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleMemoryBoxClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Div height='30%'>
      <BoxImage src="/box-open-solid.svg" alt="Open Memory Box" onClick={handleMemoryBoxClick} aria-label="Open Memory Box" />
      {user && <ModalBox isOpen={modalOpen} onClose={handleCloseModal} username={user.username} />}
    </Div>
  );
}

export default MemoryBox;
