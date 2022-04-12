import styled from 'styled-components';

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &.gray {
    > span {
      color: #aaa;
    }
  }

  &.reverse {
    flex-direction: row-reverse;

    > span {
      margin-left: 0;
      margin-right: 8px;
    }
  }

  &.bold {
    > span {
      font-weight: bold;
    }
  }
`;

export const CheckboxInput = styled.div`
  width: 20px;
  cursor: pointer;
  height: 20px;
  border: 2px solid #0000001A;
  background: #fff;
  color: #fff;
  transition: all .3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    font-size: 14px;
  } 

  &.checked {
    background: #5738FF;
  }
`;

export const CheckboxLabel = styled.span`
  font: normal normal normal 15px/20px Avenir;
  letter-spacing: 0px;
  color: #000;
  display: flex;
  align-items: center;
  margin-left: 8px;
  transition: all .3s ease;

  &.checked {
    color: #5738FF!important;
    div {
      > svg {
        color: #5738FF!important;
      }
    }
  }

  > span {
    margin-left: 5px;
  }

`;