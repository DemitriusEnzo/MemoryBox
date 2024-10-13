import styled from 'styled-components';

export const Title = styled.h1`
  color: ${props => props.color || 'var(--text-color)'};
  font-size: ${props => props.fontSize || 'var(--title-size)'};
  text-align: ${props => props.align || 'center'};
  margin: 0;
  padding-bottom: ${props => props.paddingBottom || 0};

  @media (max-width: 400px) {
    font-size: 3em;
  }
`;
