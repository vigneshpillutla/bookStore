import React, { useState } from 'react';
import UserAuth from 'apiCalls/user.js';
import Cart from 'apiCalls/cart.js';
import { useSnackbar } from 'notistack';
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
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
        getCart(done);
      }
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
  const addToCart = (bookId) => {
    Cart.addToCart(bookId, ({ msg, success, cart }) => {
      enqueueSnackbar(msg, {
        variant: success ? 'success' : 'error'
      });
      if (success) {
        setCart(cart);
      }
    });
  };
  const removeFromCart = (bookId) => {
    Cart.removeFromCart(bookId, ({ msg, success, cart }) => {
      enqueueSnackbar(msg, {
        variant: success ? 'success' : 'error'
      });
      if (success) {
        setCart(cart);
      }
    });
  };
  const getCart = (done = () => {}) => {
    Cart.getCart((data) => {
      if (data.success) {
        setCart(data.cart);
      }
      done();
    });
  };
  const getCartItems = async (done = () => {}) => {
    const data = await Cart.getCartDetails();
    done(data);
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
    setLoading,
    addToCart,
    removeFromCart,
    getCart,
    getCartItems,
    cart
  };
};

export default useProvideAuth;
