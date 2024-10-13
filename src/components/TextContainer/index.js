import React from 'react';
import { Text } from '../Text';
import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.height || '20%'};
`;

function TextContainer() {
  return (
    <Div>
      <Text fontSize="2.5em" aria-label="Keep your retrospectives, cherish the little moments!">Keep your retrospectives, cherish the little moments!</Text>
    </Div>
  );
}

export default TextContainer;
