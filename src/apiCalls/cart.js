import axios from 'axios';
import keys from '../configs/keys';
import { axiosCng } from 'common';
const serverPath = keys.serverDomain;
const cartUrl = `${serverPath}/api/cart`;

const defFunction = () => {};

export const addToCart = async (bookId, done = defFunction) => {
  const res = await axios.put(
    cartUrl,
    {
      bookId
    },
    { ...axiosCng, withCredentials: true }
  );

  done(res.data);
};

export const removeFromCart = async (bookId, done = defFunction) => {
  const res = await axios.delete(`${cartUrl}/${bookId}`, {
    ...axiosCng,
    withCredentials: true
  });

  done(res.data);
};

export const getCart = async (done = defFunction) => {
  const res = await axios.get(cartUrl, {
    ...axiosCng,
    withCredentials: true
  });

  done(res.data);
};

export const getCartDetails = async (done = defFunction) => {
  const res = await axios.get(`${cartUrl}/details`, {
    ...axiosCng,
    withCredentials: true
  });

  return res.data;
};

export const addCartToMyBooks = async () => {
  const res = await axios.get(`${cartUrl}/addCartToMyBooks`, {
    ...axiosCng,
    withCredentials: true
  });
  return res.data;
};

export const emptyCart = async (done = defFunction) => {
  const res = await axios.get(`${cartUrl}/empty`, {
    ...axiosCng,
    withCredentials: true
  });
  done(res.data);
};

const Cart = {
  addToCart,
  removeFromCart,
  getCart,
  getCartDetails,
  emptyCart,
  addCartToMyBooks
};
export default Cart;
