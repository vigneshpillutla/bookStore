import React, { useState } from 'react';
import UserAuth from 'apiCalls/user.js';
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = () => {
    return !!user;
  };
  const login = (email, password, onSuccess) => {
    UserAuth.login(email, password, (res) => {
      if (res.success) {
        setUser(res.user);
        onSuccess();
      }
    });
  };
  const googleSignIn = (done = () => {}) => {
    UserAuth.googleSignIn(done);
  };
  const getUser = (done = () => {}) => {
    UserAuth.getUser((res) => {
      if (res.success) {
        setUser(res.user);
      }
      done();
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
    googleSignIn,
    isLoggedIn,
    loading,
    setLoading
  };
};

export default useProvideAuth;
