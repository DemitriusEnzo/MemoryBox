import styled from 'styled-components';

export const Text = styled.h3`
  color: ${props => props.color || 'var(--text-color)'};
  font-size: ${props => props.fontSize || 'var(--text-size)'};
  text-align: ${props => props.align || 'center'};
  margin: 0;
  padding: ${props => props.padding || 0};
  border-bottom: ${props => props.borderB || 0};
`;
