import styled from 'styled-components';

export const StarItems = styled.div`
  display: flex;
  align-items: center;
`;

export const StarItem = styled.div`
  margin-right: 5px;
  
  &:last-of-type {
    margin-right: 0;
  }

  svg {
    fill: #461E7D;
    color: #461E7D;
  }
`;