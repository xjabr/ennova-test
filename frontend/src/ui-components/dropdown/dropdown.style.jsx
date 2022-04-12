import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;
  width: max-content;
  z-index: 101;

  &.min {
    min-width: 150px;
  }
`;

export const DropdownInput = styled.div`
  background: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  
  span {
    margin-right: 15px;
    color: #5738FF;
    display: flex;
    align-items: center;
    font: normal normal normal 15px/20px Avenir;
    letter-spacing: 0px;

    img {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }
`;

export const DropdownIcon = styled.div`
  svg {
    transition: all .3s ease;
    margin-left: auto;
    color: #5738FF;
    fill: #5738FF;
  }

  &.upside {
    > svg {
      transform: rotateZ(-180deg)
    }
  }
`;

export const DropdownOptions = styled.div`
  position: absolute;
  top: 41px;
  border-radius: 6px;
  opacity: 0;
  background: #fff;
  width: 100%;
  transition: all .3s ease;
  z-index: 999;
  visibility: hidden;

  &.open {
    visibility: visible;
    opacity: 1;
  }
`;

export const DropdownOption = styled.div`
  color: #5738FF;
  font: normal normal normal 15px/20px Avenir;
  letter-spacing: 0px;
  padding: 10px;
  cursor: pointer;
`;