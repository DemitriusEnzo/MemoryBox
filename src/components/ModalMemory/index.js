import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 0;
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  position: relative;
  background-image: linear-gradient(180deg, var(--primary-color), var(--primary-color), var(--primary-color-gradient), var(--primary-color-gradient), var(--primary-color));
  padding: 0.5% 10% 2%;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  transform: translateY(-50px);
  animation: slideIn 0.3s forwards;

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  color: var(--text-color);
  border: none;
  font-size: 1.5em;
  cursor: pointer;

  @media (max-width: 830px) {
    top: 5px;
    right: 5px;
    font-size: 1.2em;
  }
`;

function ModalMemory({ children, onClose }) {
  return (
    <ModalOverlay onClick={onClose} aria-label="Modal overlay for memory actions">
      <ModalContent onClick={(e) => e.stopPropagation()} aria-label="Memory modal content">
        <CloseButton onClick={onClose} aria-label="Close modal">X</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

export default ModalMemory;
