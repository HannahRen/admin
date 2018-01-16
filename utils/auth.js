import moment from 'moment';
import Cookie from 'js-cookie';
const TOKEN_KEY = 'hoolai-admin-token';

export const setToken = token => {
  if (process.server) return;
  let tokenStr = JSON.stringify(token);
  window.localStorage.setItem(TOKEN_KEY, tokenStr);
  Cookie.set(TOKEN_KEY, token.token, {
    expires: new Date(moment(token.endTime))
  });
};

export const removeToken = () => {
  if (process.server) return;
  window.localStorage.removeItem(TOKEN_KEY);
  Cookie.remove(TOKEN_KEY);
};

export const getToken = () => {
  if (process.server) return;
  let tokenStr = window.localStorage[TOKEN_KEY];
  if (tokenStr) {
    tokenStr = JSON.parse(tokenStr);
  }
  return tokenStr;
};

export const getCookieKey = () => {
  return TOKEN_KEY;
};
