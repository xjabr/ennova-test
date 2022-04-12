import React, { Children, useEffect, useState } from 'react';
import jwt from 'jwt-decode';

import { AUTH_ENDPOINT } from '../constants/ENDPOINTS';
import { httpPost } from '../modules/http';

const AuthContext = React.createContext({});
const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return ;

    const decodedToken = jwt(accessToken);
    let dateNow = new Date();

    if (decodedToken.exp <= dateNow.getTime()) return ;

    setIsLoggedIn(true);
    setToken(accessToken);
    setUser({
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email
    });
  }, []);

  const signin = async (body) => {
    if (isLoggedIn) return ;

    const response = {
			data: null,
			error: null,
			status: null
		};

		try {
			const req = await httpPost(`${AUTH_ENDPOINT}/login/`, null, body)
      response.data = req.data;
      response.status = req.status;
		} catch (err) {
      response.error = err.response.data;
      response.status = err.response.status
		}

    return response;
  }
  
  const signup = async (body) => {
    if (isLoggedIn) return ;

    const response = {
			data: null,
			error: null,
			status: null
		};

		try {
			const req = await httpPost(`${AUTH_ENDPOINT}/signup/`, null, body)
      response.data = req.data;
      response.status = req.status;
		} catch (err) {
      response.error = err.response.data;
      response.status = err.response.status
		}

    return response;
  }
  
  const logout = () => {
    if (!isLoggedIn) return ;

    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('access_token');
  }

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isLoggedIn,
      signin,
      signup,
      logout
    }} {...props} />
  )
}

const useAuth = () => React.useContext(AuthContext);
export { useAuth, AuthProvider };