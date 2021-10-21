import axios from 'axios';
import keys from '../configs/keys';
import { displayMsg } from 'common';
import { axiosCng } from 'common';
const serverPath = keys.serverDomain;
const authUrl = `${serverPath}/api/auth`;
const socialAuth = `${serverPath}/api/oauth`;
const userActionUrl = `${serverPath}/api/user`;

// Cache-Control header to be implemented with axios interceptor.
const googleSignIn = () => {
  window.open(`${socialAuth}/google`, '_self');
};
const login = async ({ email, password }, done) => {
  const response = await axios.post(
    `${authUrl}/login`,
    {
      email,
      password
    },
    {
      ...axiosCng,
      withCredentials: true,
      headers: {
        'Cache-Control': 'no-cache'
      }
    }
  );
  displayMsg(response, 'Login Successful!', response.data?.msg);
  done(response.data);
};

const getUser = async (done) => {
  const response = await axios.get(`${authUrl}/getUser`, {
    ...axiosCng,
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  done(response.data);
};
const logout = async (done) => {
  const response = await axios.get(`${authUrl}/logout`, {
    ...axiosCng,
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  displayMsg(response, 'Successfuly logged out!');
  done(response.data);
};

const signUp = async (user, done) => {
  const response = await axios.post(`${authUrl}/signUp`, user, {
    ...axiosCng,
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-cache'
    }
  });

  displayMsg(response, 'User signed Up!', response.data?.msg);
  done(response.data);
};

const addToMyFavourites = async (bookId) => {
  const response = await axios.post(
    `${userActionUrl}/addToMyFavourites`,
    {
      bookId
    },
    {
      ...axiosCng,
      withCredentials: true
    }
  );
  return response.data;
};
const removeFromMyFavourites = async (bookId) => {
  const response = await axios.post(
    `${userActionUrl}/removeFromMyFavourites`,
    {
      bookId
    },
    {
      ...axiosCng,
      withCredentials: true
    }
  );
  return response.data;
};

const UserAuth = {
  login,
  logout,
  signUp,
  getUser,
  googleSignIn,
  addToMyFavourites,
  removeFromMyFavourites
};

export default UserAuth;
