import React, { useState } from 'react';
import { COLLECTIBLE_ENDPOINT } from '../constants/ENDPOINTS';
import { httpGet, httpPost } from '../modules/http';
import { useAuth } from './auth.context';

const CollectibleContext = React.createContext({});
const CollectibleProvider = (props) => {
  const { token, isLoggedIn } = useAuth();

  const getCollectibles = async (data) => {
    const response = {
      data: null,
      error: null,
      status: null
    };

    try {
      const req = await httpGet(`${COLLECTIBLE_ENDPOINT}/list/`, null, data);
      response.data = req.data;
      response.status = req.status;
    } catch (err) {
      response.error = err.response.data;
      response.status = err.response.status;
    }

    return response;
  }
  
  const getSingleCollectible = async (id) => {
    const response = {
      data: null,
      error: null,
      status: null
    };

    try {
      const req = await httpGet(`${COLLECTIBLE_ENDPOINT}/single/${id}/`, null, {});
      response.data = req.data;
      response.status = req.status;
    } catch (err) {
      response.error = err.response.data;
      response.status = err.response.status;
    }

    return response;
  }

  const createCollectible = async (body) => {
    if (!isLoggedIn) return ;

    const response = {
      data: null,
      error: null,
      status: null
    };

    try {
      const req = await httpPost(`${COLLECTIBLE_ENDPOINT}/create/`, token, body);
      response.data = req.data;
      response.status = req.status;
    } catch (err) {
      response.error = err.response.data;
      response.status = err.response.status;
    }

    return response;
  }
  
  const makeBid = async (id, price) => {
    if (!isLoggedIn) return ;

    const response = {
      data: null,
      error: null,
      status: null
    };

    try {
      const req = await httpPost(`${COLLECTIBLE_ENDPOINT}/single/${id}/make-bid/`, token, { price });
      response.data = req.data;
      response.status = req.status;
    } catch (err) {
      response.error = err.response.data;
      response.status = err.response.status;
    }

    return response;
  }

  return (
    <CollectibleContext.Provider value={{
      getCollectibles,
      getSingleCollectible,
      createCollectible,
      makeBid
    }} {...props} />
  )
}

const useCollectible = () => React.useContext(CollectibleContext);
export { useCollectible, CollectibleProvider };