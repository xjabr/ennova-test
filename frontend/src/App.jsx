import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/fontello.scss';
import './assets/includes.scss';

import { CollectibleProvider } from './contexts/collectible.context';

import Navbar from './components/navbar';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import CreateCollectible from './pages/CreateCollectible';
import SingleCollectiblePage from './pages/SingleCollectiblePage';
import { useAuth } from './contexts/auth.context';

export const Main = styled.div`
  width: 1440px;
  margin: 20px auto;

  > .container-fluid {
    padding: 0 25px;
  }
`;

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Main>
        <Navbar />
        <CollectibleProvider>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/collectible/:id' element={<SingleCollectiblePage />} />
            {
              !isLoggedIn ?
                <>
                  <Route exact path='/signin' element={<Signin />} />
                  <Route exact path='/signup' element={<Signup />} />
                </>
                :
                <>
                  <Route exact path='/create' element={<CreateCollectible />} />
                </>
            }
          </Routes>
        </CollectibleProvider>
      </Main>
    </Router>
  );
}

export default App;
