import styled from 'styled-components';

export const CardWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
  text-decoration: none;
`;

export const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  background: #fafafa;
  margin-bottom: 20px;
`;

export const CardBody = styled.div``;

export const CardName = styled.h3`
  font: normal normal 900 16px/19px Avenir;
  letter-spacing: 0.6px;
  color: #000000;
`;

export const CardDescription = styled.p`
  font: normal normal normal 15px/20px Avenir;
  letter-spacing: 0px;
  color: #000000;
`;

export const CardPrice = styled.span`
  font: normal normal 900 20px/22px Avenir;
  letter-spacing: 0px;
  color: #461E7D;

  &.orange {
    color: #FD6600!important;
  }
`;