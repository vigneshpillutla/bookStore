import React, { useState } from 'react';
import UserAuth from 'apiCalls/user.js';
import { useSnackbar } from 'notistack';
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const isLoggedIn = () => {
    return !!user;
  };
  const login = (formData, onSuccess) => {
    UserAuth.login(formData, (res) => {
      const { success, user, msg } = res;
      let variant = 'error';
      if (success) {
        setUser(user);
        variant = 'success';
        onSuccess();
      }
      enqueueSnackbar(msg, { variant });
      setLoading(false);
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
      const { success, user, msg } = res;
      let variant = 'error';
      if (success) {
        setUser(user);
        variant = 'success';
        onSuccess();
      }
      enqueueSnackbar(msg, { variant });
      setLoading(false);
    });
  };
  const logout = () => {
    UserAuth.logout((res) => {
      if (res.success) {
        setUser(null);
        enqueueSnackbar(res.msg, { variant: 'success' });
      }
      setLoading(false);
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
