import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const NavbarSectionLink = styled(NavLink)`
  font: normal normal normal 15px/20px Avenir;
  color: #000;
  padding: 15px 15px 15px 0;
  text-decoration: none;
  transation: all .3s ease;
  
  &.active, &:hover {
    color: #5738FF;
  }
`;