import styled from 'styled-components';

export const ButtonPrimary = styled.button`
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 100px;
  padding: 10px 20px;
  display: inline-block;
  font: normal normal 900 12px/20px Avenir;
  letter-spacing: 0.6px;

  &.disabled {
    color: #fffa;
    border-color: #fffa;
    cursor: not-allowed;
  }
`;