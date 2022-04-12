import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { NavbarSectionLink, NavbarWrapper } from './navbar.style';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <NavbarWrapper className='container'>
      <NavbarSectionLink to="/">Home</NavbarSectionLink>
      {
        !isLoggedIn &&
          (
            <>
              <NavbarSectionLink to="/signin">Login</NavbarSectionLink>
              <NavbarSectionLink to="/signup">Registrati</NavbarSectionLink>
            </>
          )
      }
      {
        isLoggedIn &&
          (
            <>
              <NavbarSectionLink to="/create">Crea</NavbarSectionLink>
              <NavbarSectionLink as={'a'} to="#" onClick={() => logout()}>Logout</NavbarSectionLink>
            </>
          )
      }
    </NavbarWrapper>
  )
}

export default Navbar;