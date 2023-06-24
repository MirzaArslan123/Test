// eslint-disable-next-line no-unused-vars
import React from 'react';
import {SET_LOGIN_DATA, SET_USER_TOKEN} from '../actions/ApiData';

const initialState = {
  loginData: '',
  token: '',
};

const ApiData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        loginData: action.response,
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.response,
      };
    default:
      return state;
  }
};

export default ApiData;
