export const SET_LOGIN_DATA = 'SET_LOGIN_DATA';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';

export const SetLoginData = res => {
  return {type: SET_LOGIN_DATA, response: res};
};

export const SetUserToken = res => {
  return {type: SET_USER_TOKEN, response: res};
};
