import styled from 'styled-components';

export const Pagination = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: center;
  width: 100%;
`;

export const PaginationItems = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const PaginationItem = styled.button`
  background: transparent;
  border: 0;
  color: #00000080;
  font: normal normal 900 12px/22px Avenir;
  letter-spacing: 0.6px;
  padding: 5px 12px;
  margin-right: 5px;
  display: inline;
  border-radius: 100px;

  &:last-of-type {
    margin-right: 0;
  }

  &.active {
    background: #5738FF;
    color: #fff;
  }
`;

export const PaginationMove = styled.div`
  font: normal normal normal 15px/20px Avenir;
  letter-spacing: 0px;
  display: flex;
  align-items: center;
  color: #5738FF;
  
  svg {
    color: #5738FF;
  }

  &.disabled {
    color: #00000080;

    svg {
      color: #00000080;
    }
  }
`;
