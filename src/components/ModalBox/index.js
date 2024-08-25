import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faSadTear, faHeart, faStar, faSurprise, faLaugh } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../Text';
import { Title } from '../Title';
import { getMemories } from '../../api';
import { SubmitButton, Input, IconContainer, IconWrapper } from '../FormMemory';
import { CloseButton } from '../ModalMemory';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

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
`;

const ModalContent = styled.div`
  position: relative;
  width: 90vw; /* Ajuste a largura para caber melhor em diferentes tamanhos de tela */
  max-width: 800px; /* Defina uma largura máxima */
  height: 80vh; /* Ajuste a altura conforme necessário */
  background-image: linear-gradient(180deg, var(--primary-color), var(--primary-color), var(--primary-color-gradient), var(--primary-color-gradient), var(--primary-color));
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: var(--text-color);
  text-align: center;
  overflow: auto;

  @media (max-width: 600px) {
    width: 100vw;
    height: 90vh; /* Ajuste a altura para preencher a tela */
  }
`;

const ModalMemories = styled.div`
  width: 100%;
  height: auto; /* Permite que a altura seja ajustada automaticamente */
  display: flex;
  flex-direction: row;
  justify-content: center; /* Centraliza os cards horizontalmente */
  flex-wrap: wrap;
  gap: 10px; /* Reduza o espaço entre os cards */
  padding: 10px 0; /* Adiciona um pouco de espaço acima e abaixo dos cards */
  
  @media (max-width: 600px) {
    flex-direction: column; /* Alinha os cards verticalmente em telas pequenas */
    align-items: center; /* Centraliza os cards horizontalmente */
  }
`;

const MemoryCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--focus-color);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: var(--text-color);
  text-align: center;
  width: 300px; /* Defina uma largura fixa para os cards */
  margin: 10px; /* Adiciona espaço ao redor dos cards */

  @media (max-width: 600px) {
    width: 80vw; /* Ajusta a largura para caber melhor em telas menores */
  }
`;

const MemoryInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--secondary-color);
  padding: 20px;
  border: 3px solid var(--text-color);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  color: var(--text-color);
  text-align: left;
`;

const iconMapping = {
  'smile': faSmile,
  'sad-tear': faSadTear,
  'heart': faHeart,
  'star': faStar,
  'surprise': faSurprise,
  'laugh': faLaugh
};

function ModalBox({ isOpen, onClose, username }) {
  const [memories, setMemories] = useState([]);
  const [editingMemory, setEditingMemory] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newIcon, setNewIcon] = useState('');

  useEffect(() => {
    if (isOpen && username) {
      getMemories(username)
        .then(data => {
          setMemories(data);
        })
        .catch(error => {
          console.error('Error fetching memories:', error);
        });
    }
  }, [isOpen, username]);

  const editMemory = (memory) => {
    setEditingMemory(memory);
    setNewTitle(memory.title);
    setNewDate(memory.date);
    setNewIcon(memory.icon);
  };

  const saveMemory = async () => {
    if (!editingMemory) return;

    try {
      const response = await axios.put(`${API_URL}/api/memories/${editingMemory.id}`, {
        title: newTitle,
        date: newDate,
        icon: newIcon
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Memory updated successfully:', response.data);

      setMemories(memories.map(memory => 
        memory.id === editingMemory.id 
          ? { ...memory, title: newTitle, date: newDate, icon: newIcon } 
          : memory
      ));
      setEditingMemory(null);
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  const deleteMemory = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMemories(memories.filter(memory => memory.id !== id));
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  const cancelEdit = () => {
    setEditingMemory(null);
  };

  const handleIconClick = (icon) => {
    setNewIcon(icon);
  };

  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Text borderB="3px solid var(--text-color)">Remember your memories!</Text>
        <ModalMemories>
          {memories.map((memory) => (
            <MemoryCard key={memory.id}>
              {editingMemory && editingMemory.id === memory.id ? (
                <>
                  <CloseButton onClick={cancelEdit}>X</CloseButton>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <Input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="Date"
                    max={today}
                  />
                  <IconContainer>
                    <IconWrapper isSelected={newIcon === 'smile'} onClick={() => handleIconClick('smile')}>
                      <FontAwesomeIcon icon={faSmile} size="2x" />
                    </IconWrapper>
                    <IconWrapper isSelected={newIcon === 'sad-tear'} onClick={() => handleIconClick('sad-tear')}>
                      <FontAwesomeIcon icon={faSadTear} size="2x" />
                    </IconWrapper>
                    <IconWrapper isSelected={newIcon === 'heart'} onClick={() => handleIconClick('heart')}>
                      <FontAwesomeIcon icon={faHeart} size="2x" />
                    </IconWrapper>
                    <IconWrapper isSelected={newIcon === 'star'} onClick={() => handleIconClick('star')}>
                      <FontAwesomeIcon icon={faStar} size="2x" />
                    </IconWrapper>
                    <IconWrapper isSelected={newIcon === 'surprise'} onClick={() => handleIconClick('surprise')}>
                      <FontAwesomeIcon icon={faSurprise} size="2x" />
                    </IconWrapper>
                    <IconWrapper isSelected={newIcon === 'laugh'} onClick={() => handleIconClick('laugh')}>
                      <FontAwesomeIcon icon={faLaugh} size="2x" />
                    </IconWrapper>
                  </IconContainer>
                  <SubmitButton onClick={saveMemory}>Save</SubmitButton>
                </>
              ) : (
                <>
                  <MemoryInfos>
                    <Title>{memory.title}</Title>
                    <Text>{memory.date}</Text>
                    <FontAwesomeIcon icon={iconMapping[memory.icon]} size="2x" />
                  </MemoryInfos>
                  <SubmitButton fontSize="2em" onClick={() => editMemory(memory)}>Edit Memory</SubmitButton>
                  <SubmitButton fontSize="2em" onClick={() => deleteMemory(memory.id)}>Delete Memory</SubmitButton>
                </>
              )}
            </MemoryCard>
          ))}
        </ModalMemories>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ModalBox;
