import React, { useState } from 'react';
import UserAuth from 'apiCalls/user.js';
const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const login = (email, password, onSuccess) => {
    UserAuth.login(email, password, (res) => {
      if (res.success) {
        setUser(res.user);
        onSuccess();
      }
    });
  };
  const googleSignIn = () => {
    UserAuth.googleSignIn();
  };
  const getUser = () => {
    UserAuth.getUser((res) => {
      if (res.success) {
        setUser(res.user);
      }
    });
  };
  const signUp = (user, onSuccess) => {
    UserAuth.signUp(user, (res) => {
      if (res.success) {
        setUser(res.user);
        onSuccess();
      }
    });
  };
  const logout = (onSuccess) => {
    UserAuth.logout((res) => {
      if (res.success) {
        setUser(null);
        onSuccess();
      }
    });
  };
  return {
    user,
    login,
    signUp,
    logout,
    getUser,
    googleSignIn
  };
};

export default useProvideAuth;
